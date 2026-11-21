/**
 * Practice Engine
 * Handles Step-by-Step, Real-Time Metronome Mode, and Demo Playback.
 */
(function (global) {
  const DUR_BEATS = { w: 4, "h.": 3, h: 2, "q.": 1.5, q: 1, "8": 0.5 };

  class PracticeEngine {
    constructor({ notation, audio, piano, callbacks }) {
      this.notation = notation;
      this.audio = audio;
      this.piano = piano;
      this.cb = callbacks;

      this.exercise = null;
      this.mode = "step"; // 'step' | 'tempo'
      this.bpm = 70;
      this.metronomeEnabled = true;

      this.isRunning = false;
      this.isListening = false;
      this.isArmed = false;
      this.hasPlayedDemo = false;
      this.armTargetMidi = 60;
      this.currentIndex = 0;
      this.hits = 0;
      this.attempts = 0;
      this.noteAnsweredInTempo = false;

      this.timers = [];
      this.metronomeTimer = null;
      this.sweepRafId = null;
    }

    loadExercise(exercise) {
      this.stop();
      this.exercise = exercise;
      this.hasPlayedDemo = false;
      this.currentIndex = 0;
      this.hits = 0;
      this.attempts = 0;
      this.notation.resetAllStates();
      this.cb.onProgress(0, this.getPlayableCount());
      this.cb.onAccuracy(100);
      this.cb.onFeedback("Clique em <strong>Praticar</strong> ou toque a primeira nota!", "neutral");
    }

    getPlayableCount() {
      if (!this.exercise) return 0;
      return this.exercise.notes.filter((n) => n.pitch !== "REST").length;
    }

    setMode(mode) {
      if (this.isRunning) this.stop();
      this.mode = mode;
    }

    setBpm(bpm) {
      this.bpm = bpm;
    }

    setMetronome(enabled) {
      this.metronomeEnabled = enabled;
    }

    clearTimers() {
      this.timers.forEach((t) => clearTimeout(t));
      this.timers = [];
      if (this.metronomeTimer) {
        clearInterval(this.metronomeTimer);
        this.metronomeTimer = null;
      }
      if (this.sweepRafId) {
        cancelAnimationFrame(this.sweepRafId);
        this.sweepRafId = null;
      }
      this.cb.onBeat(-1);
      if (this.cb.onBeatSweep) this.cb.onBeatSweep(0);
    }

    stop() {
      this.isRunning = false;
      this.isListening = false;
      this.isArmed = false;
      this.clearTimers();
      this.cb.onStateChange(false, false);
    }

    reset() {
      this.stop();
      if (!this.exercise) return;
      this.currentIndex = 0;
      this.hits = 0;
      this.attempts = 0;
      this.notation.resetAllStates();
      this.cb.onProgress(0, this.getPlayableCount());
      this.cb.onAccuracy(100);
      this.cb.onFeedback("Exercício reiniciado. Vamos tocar!", "neutral");
    }

    startPractice() {
      if (!this.exercise) return;
      if (this.isRunning || this.isArmed || this.isListening) {
        this.stop();
        return;
      }

      if (!this.hasPlayedDemo) {
        this.runAutoDemoThenArm();
        return;
      }

      this.armOrStartPractice();
    }

    runAutoDemoThenArm() {
      this.reset();
      this.isListening = true;
      this.cb.onStateChange(true, true);
      this.cb.onFeedback(
        "🔊 <strong>Demonstração primeiro:</strong> ouça e acompanhe a linha do tempo na pauta...",
        "neutral"
      );
      this.runTempoPlayback(false, () => {
        this.hasPlayedDemo = true;
        this.isListening = false;
        this.notation.resetAllStates();
        this.armOrStartPractice();
      });
    }

    armOrStartPractice() {
      this.reset();
      this.isRunning = true;
      this.cb.onStateChange(true, false);

      if (this.mode === "step") {
        this.advanceToNextPlayableInStep();
        this.cb.onFeedback("Sua vez! Modo Passo a Passo: toque a nota destacada em azul na pauta.", "neutral");
      } else {
        const firstPlayable = this.exercise.notes.find((n) => n.pitch !== "REST");
        this.armTargetMidi = firstPlayable
          ? global.ClaveAudio.constructor.noteNameToMidi(firstPlayable.pitch)
          : 60;
        const targetPt = global.ClaveAudio.constructor.midiToPtLabel(this.armTargetMidi);
        this.isArmed = true;
        this.cb.onFeedback(
          `🎹 Sua vez! Toque a nota <strong>${targetPt}</strong> no piano para iniciar (contagem de 3s)...`,
          "neutral"
        );
      }
    }

    startCountdownThenTempo() {
      let sec = 3;
      const stepCountdown = () => {
        if (!this.isRunning) return;
        if (sec > 0) {
          this.cb.onFeedback(`⏳ Começando em <strong>${sec}</strong>...`, "neutral");
          sec--;
          this.timers.push(setTimeout(stepCountdown, 1000));
        } else {
          this.startTempoMode();
        }
      };
      stepCountdown();
    }

    startNotationTimeline(beatMs, initialBeat = 0) {
      if (this.sweepRafId) cancelAnimationFrame(this.sweepRafId);
      const startTime = performance.now();
      const tick = () => {
        if (!this.isRunning && !this.isListening) return;
        const currentBeat = initialBeat + (performance.now() - startTime) / beatMs;
        this.notation.updatePlayheadByBeat(currentBeat);
        this.sweepRafId = requestAnimationFrame(tick);
      };
      this.sweepRafId = requestAnimationFrame(tick);
    }

    advanceToNextPlayableInStep() {
      if (!this.exercise) return;
      while (
        this.currentIndex < this.exercise.notes.length &&
        this.exercise.notes[this.currentIndex].pitch === "REST"
      ) {
        this.notation.setNoteState(this.currentIndex, "correct");
        this.currentIndex++;
      }

      if (this.currentIndex >= this.exercise.notes.length) {
        this.finishExercise();
        return;
      }

      this.notation.setNoteState(this.currentIndex, "active");
    }

    startTempoMode() {
      const beatMs = 60000 / this.bpm;
      const beatsPerMeasure = parseInt((this.exercise.timeSignature || "4/4").split("/")[0], 10) || 4;
      let countInBeat = 0;

      this.cb.onFeedback(`Prepare-se... Contagem: 1, 2, 3, 4 (${this.bpm} BPM)`, "neutral");
      // Timeline starts at point zero of the staff and reaches note 0 right on beat 1
      this.startNotationTimeline(beatMs, -beatsPerMeasure);

      // Count-in
      const doCountIn = () => {
        if (!this.isRunning) return;
        if (countInBeat < beatsPerMeasure) {
          this.cb.onBeat(countInBeat, countInBeat === 0);
          if (this.metronomeEnabled) this.audio.playClick(countInBeat === 0);
          this.cb.onFeedback(`Contagem: ${countInBeat + 1}...`, "neutral");
          countInBeat++;
          this.timers.push(setTimeout(doCountIn, beatMs));
        } else {
          this.runTempoPlayback(true);
        }
      };
      doCountIn();
    }

    startListenDemo() {
      if (!this.exercise) return;
      if (this.isListening) {
        this.stop();
        return;
      }
      this.reset();
      this.isListening = true;
      this.cb.onStateChange(false, true);
      this.cb.onFeedback("🔊 Ouvindo exemplo... Acompanhe as notas na partitura!", "neutral");
      this.runTempoPlayback(false);
    }

    runTempoPlayback(isPractice, onDemoEnd = null) {
      const beatMs = 60000 / this.bpm;
      const beatsPerMeasure = parseInt((this.exercise.timeSignature || "4/4").split("/")[0], 10) || 4;
      const notes = this.exercise.notes;

      // Start metronome pulse
      let beatNum = 0;
      const tickMetronome = () => {
        if ((!this.isRunning && !this.isListening)) return;
        const beatInBar = beatNum % beatsPerMeasure;
        this.cb.onBeat(beatInBar, beatInBar === 0);
        if (this.metronomeEnabled) {
          this.audio.playClick(beatInBar === 0);
        }
        beatNum++;
      };
      tickMetronome();
      this.metronomeTimer = setInterval(tickMetronome, beatMs);
      this.startNotationTimeline(beatMs, 0);

      let elapsedMs = 0;
      notes.forEach((noteObj, idx) => {
        const durBeats = DUR_BEATS[noteObj.dur || "q"] || 1;
        const durMs = durBeats * beatMs;

        const startTimer = setTimeout(() => {
          if (!this.isRunning && !this.isListening) return;
          this.currentIndex = idx;
          this.noteAnsweredInTempo = false;

          if (noteObj.pitch === "REST") {
            this.notation.setNoteState(idx, "correct");
            return;
          }

          this.notation.setNoteState(idx, "active", false);

          if (!isPractice) {
            const midi = global.ClaveAudio.constructor.noteNameToMidi(noteObj.pitch);
            this.audio.playNote(midi, (durMs / 1000) * 0.9, 0.8);
            this.piano.flashKey(midi, "active", Math.min(durMs * 0.8, 350));
          }
        }, elapsedMs);

        const endTimer = setTimeout(() => {
          if (!this.isRunning && !this.isListening) return;
          if (noteObj.pitch === "REST") return;

          if (isPractice) {
            if (!this.noteAnsweredInTempo) {
              this.attempts++;
              this.notation.setNoteState(idx, "wrong");
              this.cb.onStreakBreak();
              this.updateMetrics();
            }
          } else {
            this.notation.setNoteState(idx, "correct");
          }
        }, elapsedMs + durMs - 30);

        this.timers.push(startTimer, endTimer);
        elapsedMs += durMs;
      });

      const finishTimer = setTimeout(() => {
        if (!this.isRunning && !this.isListening) return;
        if (isPractice) {
          this.finishExercise();
        } else if (onDemoEnd) {
          this.stop();
          onDemoEnd();
        } else {
          this.stop();
          this.cb.onFeedback("Exemplo concluído! Agora clique em <strong>Praticar</strong>.", "neutral");
        }
      }, elapsedMs + 120);
      this.timers.push(finishTimer);
    }

    handleNoteInput(playedMidi) {
      // If armed in Tempo mode, only the specific target note triggers the 3s countdown
      if (this.isArmed) {
        if (playedMidi === this.armTargetMidi) {
          this.isArmed = false;
          this.piano.flashKey(playedMidi, "correct-flash", 220);
          this.startCountdownThenTempo();
        }
        return;
      }

      // Allow starting step mode automatically if user starts playing right away
      if (!this.isRunning && !this.isListening && this.mode === "step" && this.exercise) {
        this.startPractice();
      }
      if (!this.isRunning || !this.exercise) return;

      const targetNote = this.exercise.notes[this.currentIndex];
      if (!targetNote || targetNote.pitch === "REST") return;

      const targetMidi = global.ClaveAudio.constructor.noteNameToMidi(targetNote.pitch);
      const targetPt = global.ClaveAudio.constructor.midiToPtLabel(targetMidi);

      if (this.mode === "step") {
        this.attempts++;
        if (playedMidi === targetMidi) {
          this.hits++;
          this.notation.setNoteState(this.currentIndex, "correct");
          this.piano.flashKey(playedMidi, "correct-flash", 220);
          this.cb.onStreakIncrement();
          this.cb.onFeedback(`✓ Ótimo! (${targetPt})`, "ok");
          this.currentIndex++;
          this.updateMetrics();
          this.advanceToNextPlayableInStep();
        } else {
          this.audio.playErrorBuzz();
          this.piano.flashKey(playedMidi, "wrong-flash", 240);
          this.notation.setNoteState(this.currentIndex, "wrong");
          this.cb.onStreakBreak();
          const playedPt = global.ClaveAudio.constructor.midiToPtLabel(playedMidi);
          this.cb.onFeedback(`✗ Você tocou ${playedPt}, mas a partitura pede outra nota. Tente novamente!`, "err");
          this.updateMetrics();
        }
      } else {
        // Tempo mode
        if (this.noteAnsweredInTempo) return;
        this.attempts++;
        this.noteAnsweredInTempo = true;
        if (playedMidi === targetMidi) {
          this.hits++;
          this.notation.setNoteState(this.currentIndex, "correct");
          this.piano.flashKey(playedMidi, "correct-flash", 200);
          this.cb.onStreakIncrement();
          this.cb.onFeedback(`✓ No tempo! (${targetPt})`, "ok");
        } else {
          this.audio.playErrorBuzz();
          this.piano.flashKey(playedMidi, "wrong-flash", 220);
          this.notation.setNoteState(this.currentIndex, "wrong");
          this.cb.onStreakBreak();
          this.cb.onFeedback(`✗ Nota errada no compasso!`, "err");
        }
        this.updateMetrics();
      }
    }

    updateMetrics() {
      const total = this.getPlayableCount();
      const acc = this.attempts > 0 ? Math.round((this.hits / this.attempts) * 100) : 100;
      this.cb.onProgress(this.hits, total);
      this.cb.onAccuracy(acc);
    }

    finishExercise() {
      this.stop();
      const total = this.getPlayableCount();
      const acc = this.attempts > 0 ? Math.round((this.hits / this.attempts) * 100) : 100;
      const stars = acc >= 92 ? 3 : acc >= 75 ? 2 : 1;
      const xpEarned = stars * 25 + (this.mode === "tempo" ? 25 : 0);
      this.cb.onComplete({
        exerciseId: this.exercise.id,
        accuracy: acc,
        stars,
        xpEarned,
        totalNotes: total
      });
    }
  }

  global.ClavePracticeEngine = PracticeEngine;
})(window);
