/**
 * ClaveViva — Main Application Controller
 */
(function (global) {
  const STORAGE_KEY = "claveviva_progress_v1";

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return { xp: 0, bestStreak: 0, stars: {} };
  }

  function saveProgress(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (_) {}
  }

  function renderStarsText(count) {
    const filled = "★".repeat(count);
    const empty = "☆".repeat(Math.max(0, 3 - count));
    return filled + empty;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const progress = loadProgress();
    let currentStreak = 0;
    let currentLessonId = "1.2";
    let currentExerciseIndex = 0;
    let showHints = false;
    let showLineGuides = true;

    // DOM refs
    const statStreak = document.getElementById("stat-streak");
    const statXp = document.getElementById("stat-xp");
    const midiDot = document.getElementById("midi-dot");
    const midiLabel = document.getElementById("midi-label");
    const btnMic = document.getElementById("btn-mic");
    const micLabel = document.getElementById("mic-label");
    const micMeterFill = document.getElementById("mic-meter-fill");

    const lessonIndex = document.getElementById("lesson-index");
    const rhythmGuide = document.getElementById("rhythm-guide");
    const moduleBadge = document.getElementById("current-module-badge");
    const lessonTitle = document.getElementById("lesson-title");
    const lessonGoal = document.getElementById("lesson-goal");
    const exerciseList = document.getElementById("exercise-list");
    const exerciseTip = document.getElementById("exercise-tip");

    const exerciseTitle = document.getElementById("exercise-title");
    const exerciseSubtitle = document.getElementById("exercise-subtitle");
    const exerciseStars = document.getElementById("exercise-stars");
    const sheetPaper = document.getElementById("sheet-paper");

    const feedbackMsg = document.getElementById("feedback-message");
    const metricProgress = document.getElementById("metric-progress");
    const metricAccuracy = document.getElementById("metric-accuracy");
    const beatDots = Array.from(document.querySelectorAll("#beat-indicator .beat-dot"));
    const metronomeBeats = Array.from(document.querySelectorAll("#metronome-beats .m-beat"));
    const metronomeSweep = document.getElementById("metronome-sweep");
    const lastNotePlayed = document.getElementById("last-note-played");

    const btnModeStep = document.getElementById("mode-step");
    const btnModeTempo = document.getElementById("mode-tempo");
    const bpmSlider = document.getElementById("bpm-slider");
    const bpmValue = document.getElementById("bpm-value");
    const toggleLineGuides = document.getElementById("toggle-line-guides");
    const toggleHints = document.getElementById("toggle-note-names");
    const toggleMetronome = document.getElementById("toggle-metronome");

    const btnListen = document.getElementById("btn-listen");
    const btnStart = document.getElementById("btn-start");
    const btnReset = document.getElementById("btn-reset");

    const roadmapModal = document.getElementById("roadmap-modal");
    const roadmapBody = document.getElementById("roadmap-body");
    const btnRoadmap = document.getElementById("btn-roadmap");
    const btnCloseRoadmap = document.getElementById("btn-close-roadmap");

    const resultModal = document.getElementById("result-modal");
    const resultStars = document.getElementById("result-stars");
    const resultTitle = document.getElementById("result-title");
    const resultSummary = document.getElementById("result-summary");
    const resultAccuracy = document.getElementById("result-accuracy");
    const resultXp = document.getElementById("result-xp");
    const btnRetryExercise = document.getElementById("btn-retry-exercise");
    const btnNextExercise = document.getElementById("btn-next-exercise");

    const btnAuth = document.getElementById("btn-auth");
    const authModal = document.getElementById("auth-modal");
    const btnCloseAuth = document.getElementById("btn-close-auth");
    const authForm = document.getElementById("auth-form");
    const authEmail = document.getElementById("auth-email");
    const authPassword = document.getElementById("auth-password");
    const authError = document.getElementById("auth-error");
    const btnAuthSignup = document.getElementById("btn-auth-signup");
    const authLoggedPanel = document.getElementById("auth-logged-panel");
    const authUserEmail = document.getElementById("auth-user-email");
    const btnAuthSignout = document.getElementById("btn-auth-signout");

    // Initialize engines
    const notation = new global.ClaveNotation(sheetPaper);

    let engine = null;

    const piano = new global.ClavePianoUI(
      document.getElementById("piano-wrapper"),
      (midi) => {
        lastNotePlayed.textContent = global.ClaveAudio.constructor.midiToPtLabel(midi);
        if (engine) engine.handleNoteInput(midi);
      },
      (connected, label) => {
        midiDot.classList.toggle("connected", connected);
        midiLabel.textContent = label;
      }
    );

    const micDetector = new global.ClaveMicDetector({
      onNoteDetected: (midi) => {
        // Ignore mic input while demo audio is playing to avoid speaker feedback
        if (engine && engine.isListening) return;
        lastNotePlayed.textContent = `${global.ClaveAudio.constructor.midiToPtLabel(midi)} (Mic)`;
        piano.flashKey(midi, "active", 180);
        if (engine) engine.handleNoteInput(midi);
      },
      onStatusChange: (active, label) => {
        btnMic.classList.toggle("active", active);
        micLabel.textContent = `🎙️ ${label}`;
        if (active) {
          progress.micEnabled = true;
          saveProgress(progress);
        }
      },
      onLevel: (level) => {
        micMeterFill.style.width = `${Math.round(level * 100)}%`;
      }
    });

    btnMic.addEventListener("click", () => {
      if (micDetector.isActive) {
        progress.micEnabled = false;
        saveProgress(progress);
      }
      micDetector.toggle();
    });

    if (progress.micEnabled) {
      micDetector.start();
    }

    engine = new global.ClavePracticeEngine({
      notation,
      audio: global.ClaveAudio,
      piano,
      callbacks: {
        onProgress: (done, total) => {
          metricProgress.textContent = `${done}/${total}`;
        },
        onAccuracy: (acc) => {
          metricAccuracy.textContent = `${acc}%`;
        },
        onFeedback: (html, type) => {
          feedbackMsg.innerHTML = html;
          feedbackMsg.className = "feedback-message";
          if (type === "ok") feedbackMsg.classList.add("ok");
          if (type === "err") feedbackMsg.classList.add("err");
        },
        onBeat: (beatIdx, isAccent) => {
          beatDots.forEach((dot, idx) => {
            dot.classList.remove("active", "accent");
            if (idx === beatIdx) {
              dot.classList.add(isAccent ? "accent" : "active");
            }
          });
          metronomeBeats.forEach((cell, idx) => {
            cell.classList.remove("active", "accent");
            if (idx === beatIdx) {
              cell.classList.add(isAccent ? "accent" : "active");
            }
          });
        },
        onBeatSweep: (pct) => {
          if (metronomeSweep) metronomeSweep.style.width = `${pct}%`;
        },
        onStateChange: (isPracticing, isListening) => {
          btnStart.textContent = isPracticing ? "⏹ Parar" : "▶ Praticar";
          btnStart.classList.toggle("playing", isPracticing);
          btnListen.textContent = isListening ? "⏹ Parar Áudio" : "🔊 Ouvir Exemplo";
        },
        onStreakIncrement: () => {
          currentStreak++;
          statStreak.textContent = String(currentStreak);
        },
        onStreakBreak: () => {
          currentStreak = 0;
          statStreak.textContent = "0";
        },
        onComplete: ({ exerciseId, accuracy, stars, xpEarned }) => {
          const prevStars = progress.stars[exerciseId] || 0;
          if (stars > prevStars) progress.stars[exerciseId] = stars;
          progress.xp += xpEarned;
          if (currentStreak > (progress.bestStreak || 0)) progress.bestStreak = currentStreak;
          saveProgress(progress);
          updateHeaderStats();
          renderSidebar();

          if (global.ClaveCloud && global.ClaveCloud.user) {
            global.ClaveCloud.saveCloudProgress(progress, currentLessonId).catch(() => {});
            global.ClaveCloud.recordAttempt({
              lessonId: currentLessonId,
              exerciseId,
              accuracy,
              stars,
              xpEarned,
              mode: engine.mode,
              bpm: engine.bpm
            }).catch(() => {});
          }

          resultStars.textContent = renderStarsText(stars);
          resultTitle.textContent = stars === 3 ? "Excelente Leitura!" : "Exercício Concluído!";
          resultSummary.textContent =
            stars === 3
              ? "Você leu e tocou a partitura com precisão profissional. Avance para o próximo desafio!"
              : "Bom trabalho! Você pode repetir para buscar 3 estrelas ou avançar para o próximo.";
          resultAccuracy.textContent = `${accuracy}%`;
          resultXp.textContent = `+${xpEarned}`;
          resultModal.classList.remove("hidden");
        }
      }
    });

    function updateHeaderStats() {
      statXp.textContent = String(progress.xp);
      statStreak.textContent = String(currentStreak);
    }

    function getCurrentLesson() {
      return global.ClaveCurriculum.LESSONS[currentLessonId];
    }

    function getCurrentExercise() {
      const lesson = getCurrentLesson();
      return lesson.exercises[currentExerciseIndex];
    }

    function renderLessonIndex() {
      lessonIndex.innerHTML = "";
      global.ClaveCurriculum.ROADMAP.forEach((mod) => {
        const hasAnyAvailable = mod.lessons.some((l) => Boolean(global.ClaveCurriculum.LESSONS[l.id]));
        if (!hasAnyAvailable) return;

        const modTitle = document.createElement("div");
        modTitle.className = "index-module-title";
        modTitle.textContent = `Módulo ${mod.moduleId}`;
        lessonIndex.appendChild(modTitle);

        mod.lessons.forEach((l) => {
          const isAvailable = Boolean(global.ClaveCurriculum.LESSONS[l.id]);
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = `index-lesson-btn ${l.id === currentLessonId ? "active" : ""} ${!isAvailable ? "locked" : ""}`;
          btn.innerHTML = `<span>${l.title.replace(/^Aula\s+/, "")}</span><span>${isAvailable ? "" : "🔒"}</span>`;
          if (isAvailable) {
            btn.addEventListener("click", () => {
              currentLessonId = l.id;
              currentExerciseIndex = 0;
              loadCurrentExercise();
            });
          }
          lessonIndex.appendChild(btn);
        });
      });
    }

    function renderRhythmGuide() {
      const items = global.ClaveCurriculum.RHYTHM_GUIDE || [];
      rhythmGuide.innerHTML = "";
      items.forEach((item) => {
        const card = document.createElement("div");
        card.className = "rhythm-card";
        card.innerHTML = `
          <div class="rhythm-glyph">${item.svg}</div>
          <div class="rhythm-info">
            <h4>${item.name}</h4>
            <p>${item.desc}</p>
          </div>
          <button type="button" class="btn-rhythm-play">▶ Ouvir</button>
        `;
        card.querySelector(".btn-rhythm-play").addEventListener("click", () => {
          const bpm = parseInt(bpmSlider.value, 10) || 75;
          global.ClaveAudio.playRhythmExample(item.beats, bpm);
        });
        rhythmGuide.appendChild(card);
      });
    }

    function renderSidebar() {
      renderLessonIndex();
      const lesson = getCurrentLesson();
      moduleBadge.textContent = lesson.module;
      lessonTitle.textContent = lesson.title;
      lessonGoal.textContent = lesson.goal;

      exerciseList.innerHTML = "";
      lesson.exercises.forEach((ex, idx) => {
        const li = document.createElement("li");
        li.className = `exercise-item ${idx === currentExerciseIndex ? "active" : ""}`;
        const starsCount = progress.stars[ex.id] || 0;
        li.innerHTML = `
          <div>
            <div class="exercise-item-title">${ex.title}</div>
            <div class="exercise-item-meta">${ex.notes.length} notas • ${ex.timeSignature}</div>
          </div>
          <div class="exercise-item-stars">${renderStarsText(starsCount)}</div>
        `;
        li.addEventListener("click", () => {
          currentExerciseIndex = idx;
          loadCurrentExercise();
        });
        exerciseList.appendChild(li);
      });
    }

    function loadCurrentExercise() {
      const ex = getCurrentExercise();
      exerciseTitle.textContent = ex.title;
      exerciseSubtitle.textContent = ex.subtitle;
      exerciseTip.textContent = ex.tip;
      exerciseStars.textContent = renderStarsText(progress.stars[ex.id] || 0);

      const bpm = ex.defaultBpm || 70;
      bpmSlider.value = String(bpm);
      bpmValue.textContent = String(bpm);
      engine.setBpm(bpm);

      notation.render(ex, { showHints, showLineGuides });
      engine.loadExercise(ex);
      renderSidebar();
    }

    function renderRoadmap() {
      roadmapBody.innerHTML = "";
      global.ClaveCurriculum.ROADMAP.forEach((mod) => {
        const modEl = document.createElement("div");
        modEl.className = "roadmap-module";
        const isAvail = mod.status === "available";
        modEl.innerHTML = `
          <div class="roadmap-module-header">
            <h3>${mod.title}</h3>
            <span class="badge-status ${isAvail ? "available" : "upcoming"}">
              ${isAvail ? "Em andamento" : "Próximas aulas"}
            </span>
          </div>
          <div class="roadmap-lessons">
            ${mod.lessons
              .map((l) => {
                const clickable = Boolean(global.ClaveCurriculum.LESSONS[l.id]);
                return `<div class="roadmap-lesson-pill ${clickable ? "clickable" : ""}" data-lesson="${l.id}">
                  <strong>${clickable ? "▶ " : "🔒 "}${l.title}</strong>
                </div>`;
              })
              .join("")}
          </div>
        `;
        modEl.querySelectorAll(".roadmap-lesson-pill.clickable").forEach((pill) => {
          pill.addEventListener("click", () => {
            currentLessonId = pill.dataset.lesson;
            currentExerciseIndex = 0;
            roadmapModal.classList.add("hidden");
            loadCurrentExercise();
          });
        });
        roadmapBody.appendChild(modEl);
      });
    }

    // Event bindings
    btnModeStep.addEventListener("click", () => {
      btnModeStep.classList.add("active");
      btnModeTempo.classList.remove("active");
      engine.setMode("step");
    });

    btnModeTempo.addEventListener("click", () => {
      btnModeTempo.classList.add("active");
      btnModeStep.classList.remove("active");
      engine.setMode("tempo");
    });

    bpmSlider.addEventListener("input", () => {
      const val = parseInt(bpmSlider.value, 10);
      bpmValue.textContent = String(val);
      engine.setBpm(val);
    });

    toggleLineGuides.addEventListener("change", () => {
      showLineGuides = toggleLineGuides.checked;
      const ex = getCurrentExercise();
      notation.render(ex, { showHints, showLineGuides });
      engine.loadExercise(ex);
    });

    toggleHints.addEventListener("change", () => {
      showHints = toggleHints.checked;
      const ex = getCurrentExercise();
      notation.render(ex, { showHints, showLineGuides });
      engine.loadExercise(ex);
    });

    toggleMetronome.addEventListener("change", () => {
      engine.setMetronome(toggleMetronome.checked);
    });

    btnStart.addEventListener("click", () => engine.startPractice());
    btnListen.addEventListener("click", () => engine.startListenDemo());
    btnReset.addEventListener("click", () => engine.reset());

    // Keyboard shortcut: Space to Start/Stop practice
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space" && e.target.tagName !== "INPUT" && e.target.tagName !== "BUTTON") {
        e.preventDefault();
        engine.startPractice();
      }
    });

    btnRoadmap.addEventListener("click", () => {
      renderRoadmap();
      roadmapModal.classList.remove("hidden");
    });
    btnCloseRoadmap.addEventListener("click", () => roadmapModal.classList.add("hidden"));
    roadmapModal.addEventListener("click", (e) => {
      if (e.target === roadmapModal) roadmapModal.classList.add("hidden");
    });

    btnRetryExercise.addEventListener("click", () => {
      resultModal.classList.add("hidden");
      engine.reset();
    });

    btnNextExercise.addEventListener("click", () => {
      resultModal.classList.add("hidden");
      const lesson = getCurrentLesson();
      if (currentExerciseIndex + 1 < lesson.exercises.length) {
        currentExerciseIndex++;
        loadCurrentExercise();
      } else {
        const nextNum = (parseFloat(currentLessonId) + 0.1).toFixed(1);
        if (global.ClaveCurriculum.LESSONS[nextNum]) {
          currentLessonId = nextNum;
          currentExerciseIndex = 0;
          loadCurrentExercise();
        } else {
          engine.reset();
          feedbackMsg.innerHTML = `<strong>Aula ${currentLessonId} concluída!</strong> Me avise no chat para eu liberar a <strong>Aula ${nextNum}</strong>.`;
          feedbackMsg.className = "feedback-message ok";
        }
      }
    });

    // Auth & Supabase Cloud Sync
    function showAuthError(msg) {
      authError.textContent = msg;
      authError.classList.remove("hidden");
    }

    function clearAuthError() {
      authError.classList.add("hidden");
    }

    async function handleCloudUser(user) {
      if (user) {
        btnAuth.textContent = user.email.split("@")[0];
        authForm.classList.add("hidden");
        authLoggedPanel.classList.remove("hidden");
        authUserEmail.textContent = user.email;

        try {
          const cloud = await global.ClaveCloud.loadCloudProgress();
          if (cloud) {
            progress.xp = Math.max(progress.xp || 0, cloud.xp || 0);
            progress.bestStreak = Math.max(progress.bestStreak || 0, cloud.best_streak || 0);
            const mergedStars = { ...(cloud.stars || {}) };
            for (const [k, v] of Object.entries(progress.stars || {})) {
              mergedStars[k] = Math.max(mergedStars[k] || 0, v);
            }
            progress.stars = mergedStars;
            saveProgress(progress);
            updateHeaderStats();
            renderSidebar();
          }
          await global.ClaveCloud.saveCloudProgress(progress, currentLessonId);
        } catch (_) {}
      } else {
        btnAuth.textContent = "Entrar / Salvar";
        authForm.classList.remove("hidden");
        authLoggedPanel.classList.add("hidden");
      }
    }

    btnAuth.addEventListener("click", () => {
      clearAuthError();
      authModal.classList.remove("hidden");
    });
    btnCloseAuth.addEventListener("click", () => authModal.classList.add("hidden"));
    authModal.addEventListener("click", (e) => {
      if (e.target === authModal) authModal.classList.add("hidden");
    });

    authForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearAuthError();
      try {
        await global.ClaveCloud.signIn(authEmail.value.trim(), authPassword.value);
        authModal.classList.add("hidden");
      } catch (err) {
        showAuthError(err.message || "Erro ao entrar.");
      }
    });

    btnAuthSignup.addEventListener("click", async () => {
      clearAuthError();
      try {
        const res = await global.ClaveCloud.signUp(authEmail.value.trim(), authPassword.value);
        if (res && !res.session) {
          showAuthError("Conta criada! Verifique seu e-mail para confirmar o cadastro.");
        } else {
          authModal.classList.add("hidden");
        }
      } catch (err) {
        showAuthError(err.message || "Erro ao criar conta.");
      }
    });

    btnAuthSignout.addEventListener("click", async () => {
      await global.ClaveCloud.signOut();
      authModal.classList.add("hidden");
    });

    // Initial boot
    updateHeaderStats();
    renderRhythmGuide();
    loadCurrentExercise();

    if (global.ClaveCloud) {
      global.ClaveCloud.init((user) => {
        handleCloudUser(user);
      });
    }
  });
})(window);
