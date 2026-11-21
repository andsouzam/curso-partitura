/**
 * Custom SVG Sheet Music Engraver
 * Renders Treble / Bass clefs, time signatures, ledger lines, noteheads, stems,
 * rests, accidentals, barlines, multi-line wrapping, and live practice highlights.
 */
(function (global) {
  const SVG_NS = "http://www.w3.org/2000/svg";

  const DIATONIC_INDEX = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 };
  const PT_NAMES = { C: "Dó", D: "Ré", E: "Mi", F: "Fá", G: "Sol", A: "Lá", B: "Si" };

  const DURATION_BEATS = {
    w: 4,
    "h.": 3,
    h: 2,
    q: 1,
    "8": 0.5
  };

  function el(tag, attrs = {}, textContent = null) {
    const node = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) {
      node.setAttribute(k, String(v));
    }
    if (textContent !== null) node.textContent = textContent;
    return node;
  }

  function parseNote(noteStr) {
    if (!noteStr || noteStr === "REST") return { isRest: true };
    const m = /^([A-G])([#b]?)(-?\d)$/.exec(noteStr.trim());
    if (!m) return { isRest: true };
    const letter = m[1];
    const accidental = m[2] || "";
    const octave = parseInt(m[3], 10);
    const step = octave * 7 + DIATONIC_INDEX[letter];
    return { isRest: false, letter, accidental, octave, step };
  }

  class NotationRenderer {
    constructor(container) {
      this.container = container;
      this.noteElements = [];
      this.cursorEl = null;
      this.notePositions = [];
      this.timelineSegments = [];
      this.leadInSegment = null;
      this.lastScrolledLine = -1;
      this.svgHeight = 200;
    }

    render(exercise, options = {}) {
      const { showHints = false, showLineGuides = true } = options;
      this.container.innerHTML = "";
      this.noteElements = [];
      this.notePositions = [];
      this.timelineSegments = [];
      this.leadInSegment = null;
      this.lastScrolledLine = -1;

      const clef = exercise.clef || "treble";
      const timeSig = exercise.timeSignature || "4/4";
      const beatsPerMeasure = parseInt(timeSig.split("/")[0], 10) || 4;
      const notes = exercise.notes || [];

      // Group notes into measures
      const measures = [];
      let currentMeasure = [];
      let beatAcc = 0;
      notes.forEach((n, idx) => {
        const durBeats = DURATION_BEATS[n.dur || "q"] || 1;
        currentMeasure.push({ ...n, index: idx, durBeats });
        beatAcc += durBeats;
        if (beatAcc >= beatsPerMeasure - 0.001) {
          measures.push(currentMeasure);
          currentMeasure = [];
          beatAcc = 0;
        }
      });
      if (currentMeasure.length > 0) measures.push(currentMeasure);

      // Layout constants
      const measuresPerLine = 4;
      const numLines = Math.max(1, Math.ceil(measures.length / measuresPerLine));
      const lineSpacing = 12; // px between staff lines
      const halfStep = lineSpacing / 2; // 6px
      const staffHeight = lineSpacing * 4; // 48px
      const systemHeight = 145;
      const topPadding = 46;
      const leftMargin = showLineGuides ? 46 : 20;
      const rightMargin = 24;
      const clefWidth = 68;
      const svgWidth = 880;
      const svgHeight = topPadding + numLines * systemHeight + 16;
      this.svgHeight = svgHeight;

      const svg = el("svg", {
        viewBox: `0 0 ${svgWidth} ${svgHeight}`,
        width: "100%",
        role: "img",
        "aria-label": `Partitura: ${exercise.title}`
      });

      // Reference bottom line diatonic step
      // Treble bottom line = E4 (4*7+2 = 30), Bass bottom line = G2 (2*7+4 = 18)
      const bottomLineStep = clef === "bass" ? 18 : 30;
      const middleLineStep = bottomLineStep + 4;

      for (let lineIdx = 0; lineIdx < numLines; lineIdx++) {
        const staffTop = topPadding + lineIdx * systemHeight;
        const staffBottom = staffTop + staffHeight;
        const lineMeasures = measures.slice(lineIdx * measuresPerLine, (lineIdx + 1) * measuresPerLine);

        // 5 Staff lines
        const lineLabels =
          clef === "bass"
            ? ["Lá3", "Fá3", "Ré3", "Si2", "Sol2"]
            : ["Fá5", "Ré5", "Si4", "Sol4", "Mi4"];
        const anchorIdx = clef === "bass" ? 1 : 3; // Fá3 (4ª linha) ou Sol4 (2ª linha)

        for (let l = 0; l < 5; l++) {
          const y = staffTop + l * lineSpacing;
          svg.appendChild(
            el("line", {
              x1: leftMargin,
              y1: y,
              x2: svgWidth - rightMargin,
              y2: y,
              stroke: showLineGuides && l === anchorIdx ? "#111113" : "#262b38",
              "stroke-width": showLineGuides && l === anchorIdx ? 1.6 : 1.3
            })
          );

          if (showLineGuides) {
            const isAnchor = l === anchorIdx;
            svg.appendChild(
              el(
                "text",
                {
                  x: leftMargin - 6,
                  y: y + 3.5,
                  "text-anchor": "end",
                  "font-size": isAnchor ? 10.5 : 9.5,
                  "font-weight": isAnchor ? "700" : "500",
                  "font-family": "system-ui, -apple-system, sans-serif",
                  fill: isAnchor ? "#111113" : "#71717a"
                },
                lineLabels[l]
              )
            );
          }
        }

        // Left barline
        svg.appendChild(
          el("line", {
            x1: leftMargin,
            y1: staffTop,
            x2: leftMargin,
            y2: staffBottom,
            stroke: "#171a24",
            "stroke-width": 2
          })
        );

        // Clef glyph
        const clefGlyph = clef === "bass" ? "𝄢" : "𝄞";
        svg.appendChild(
          el(
            "text",
            {
              x: leftMargin + 10,
              y: clef === "bass" ? staffTop + 38 : staffTop + 44,
              "font-size": clef === "bass" ? 42 : 58,
              "font-family": "'Bravura', 'Segoe UI Symbol', 'Apple Symbols', serif",
              fill: "#171a24"
            },
            clefGlyph
          )
        );

        // Time signature (on first line)
        let cursorX = leftMargin + clefWidth;
        if (lineIdx === 0) {
          const [topNum, botNum] = timeSig.split("/");
          svg.appendChild(
            el(
              "text",
              {
                x: cursorX - 10,
                y: staffTop + 21,
                "font-size": 22,
                "font-weight": "700",
                "font-family": "Georgia, serif",
                fill: "#171a24"
              },
              topNum
            )
          );
          svg.appendChild(
            el(
              "text",
              {
                x: cursorX - 10,
                y: staffTop + 43,
                "font-size": 22,
                "font-weight": "700",
                "font-family": "Georgia, serif",
                fill: "#171a24"
              },
              botNum
            )
          );
          cursorX += 24;
        }

        const usableWidth = svgWidth - rightMargin - cursorX;
        const measureWidth = usableWidth / Math.max(1, lineMeasures.length);
        const beatWidth = measureWidth / beatsPerMeasure;
        const notePadLeft = 18;

        lineMeasures.forEach((measureNotes, mIdx) => {
          const mStartX = cursorX + mIdx * measureWidth;
          const mEndX = mStartX + measureWidth;

          // Beat grid markers (1, 2, 3, 4) above the staff aligned to exact note positions
          for (let b = 0; b < beatsPerMeasure; b++) {
            const bx = mStartX + notePadLeft + b * beatWidth;
            svg.appendChild(
              el(
                "text",
                {
                  x: bx,
                  y: staffTop - 12,
                  "text-anchor": "middle",
                  "font-size": 9,
                  "font-weight": b === 0 ? "700" : "500",
                  "font-family": "system-ui, sans-serif",
                  fill: b === 0 ? "#71717a" : "#a1a1aa"
                },
                String(b + 1)
              )
            );
            svg.appendChild(
              el("line", {
                x1: bx,
                y1: staffTop - 7,
                x2: bx,
                y2: staffTop - 2,
                stroke: b === 0 ? "#71717a" : "#d4d4d8",
                "stroke-width": 1
              })
            );
          }

          let beatOffset = 0;

          measureNotes.forEach((noteObj) => {
            const noteX = mStartX + notePadLeft + beatOffset * beatWidth;
            beatOffset += noteObj.durBeats;

            const parsed = parseNote(noteObj.pitch);
            const group = el("g", {
              class: "music-note",
              "data-index": noteObj.index
            });

            if (parsed.isRest) {
              const restY = staffTop + 28;
              const restGlyph = noteObj.dur === "h" ? "𝄼" : noteObj.dur === "w" ? "𝄻" : "𝄽";
              group.appendChild(
                el(
                  "text",
                  {
                    x: noteX - 6,
                    y: restY + 6,
                    "font-size": 30,
                    "font-family": "'Segoe UI Symbol', Georgia, serif",
                    fill: "#171a24"
                  },
                  restGlyph
                )
              );
              this.notePositions[noteObj.index] = {
                x: noteX,
                yTop: staffTop - 10,
                yBottom: staffBottom + 10,
                lineIdx,
                staffTop,
                mEndX,
                beatWidth,
                durBeats: noteObj.durBeats
              };
            } else {
              const stepsAboveBottom = parsed.step - bottomLineStep;
              const noteY = staffBottom - stepsAboveBottom * halfStep;

              // Ledger lines below staff
              for (let s = -2; s >= stepsAboveBottom; s -= 2) {
                const ly = staffBottom - s * halfStep;
                group.appendChild(
                  el("line", {
                    x1: noteX - 13,
                    y1: ly,
                    x2: noteX + 13,
                    y2: ly,
                    stroke: "#171a24",
                    "stroke-width": 1.5
                  })
                );
              }
              // Ledger lines above staff
              for (let s = 10; s <= stepsAboveBottom; s += 2) {
                const ly = staffBottom - s * halfStep;
                group.appendChild(
                  el("line", {
                    x1: noteX - 13,
                    y1: ly,
                    x2: noteX + 13,
                    y2: ly,
                    stroke: "#171a24",
                    "stroke-width": 1.5
                  })
                );
              }

              // Accidental
              if (parsed.accidental) {
                const accSymbol = parsed.accidental === "#" ? "♯" : "♭";
                group.appendChild(
                  el(
                    "text",
                    {
                      x: noteX - 20,
                      y: noteY + 5,
                      "font-size": 18,
                      fill: "#171a24"
                    },
                    accSymbol
                  )
                );
              }

              // Guitar-Hero-style sustain bar for held notes (half / whole)
              if (noteObj.durBeats >= 2) {
                const sustainW = Math.max(12, noteObj.durBeats * beatWidth - 16);
                group.appendChild(
                  el("rect", {
                    x: noteX + 6,
                    y: noteY - 4,
                    width: sustainW,
                    height: 8,
                    rx: 4,
                    fill: "rgba(2, 132, 199, 0.34)",
                    stroke: "rgba(2, 132, 199, 0.7)",
                    "stroke-width": 1.2,
                    class: "note-sustain"
                  })
                );
              }

              // Highlight halo (hidden until active)
              group.appendChild(
                el("circle", {
                  cx: noteX,
                  cy: noteY,
                  r: 14,
                  class: "note-halo",
                  fill: "transparent"
                })
              );

              // Notehead
              const dur = noteObj.dur || "q";
              const isOpen = dur === "w" || dur === "h" || dur === "h.";
              group.appendChild(
                el("ellipse", {
                  cx: noteX,
                  cy: noteY,
                  rx: 7.4,
                  ry: 5.4,
                  transform: `rotate(-18 ${noteX} ${noteY})`,
                  fill: isOpen ? "#fcfaf2" : "#171a24",
                  stroke: "#171a24",
                  "stroke-width": isOpen ? 2.2 : 1.2,
                  class: "note-head"
                })
              );

              // Augmentation dot for dotted half
              if (dur === "h.") {
                group.appendChild(
                  el("circle", {
                    cx: noteX + 12,
                    cy: noteY,
                    r: 2.3,
                    fill: "#171a24",
                    class: "note-dot"
                  })
                );
              }

              // Stem (all except whole note)
              if (dur !== "w") {
                const stemUp = parsed.step < middleLineStep;
                const stemX = stemUp ? noteX + 6.8 : noteX - 6.8;
                const stemY2 = stemUp ? noteY - 34 : noteY + 34;
                group.appendChild(
                  el("line", {
                    x1: stemX,
                    y1: noteY,
                    x2: stemX,
                    y2: stemY2,
                    stroke: "#171a24",
                    "stroke-width": 1.8,
                    class: "note-stem"
                  })
                );

                // Flag for eighth note
                if (dur === "8") {
                  const flagPath = stemUp
                    ? `M ${stemX} ${stemY2} Q ${stemX + 10} ${stemY2 + 8} ${stemX + 6} ${stemY2 + 18}`
                    : `M ${stemX} ${stemY2} Q ${stemX + 10} ${stemY2 - 8} ${stemX + 6} ${stemY2 - 18}`;
                  group.appendChild(
                    el("path", {
                      d: flagPath,
                      fill: "none",
                      stroke: "#171a24",
                      "stroke-width": 2,
                      class: "note-flag"
                    })
                  );
                }
              }

              // Optional hint label (e.g., Dó, Ré, Mi)
              if (showHints) {
                const label = `${PT_NAMES[parsed.letter]}${parsed.accidental}`;
                group.appendChild(
                  el(
                    "text",
                    {
                      x: noteX,
                      y: staffBottom + 30,
                      "text-anchor": "middle",
                      "font-size": 11,
                      "font-weight": "700",
                      fill: "#475569"
                    },
                    label
                  )
                );
              }

              this.notePositions[noteObj.index] = {
                x: noteX,
                yTop: staffTop - 12,
                yBottom: staffBottom + 12,
                lineIdx,
                staffTop,
                mEndX,
                beatWidth,
                durBeats: noteObj.durBeats
              };
            }

            svg.appendChild(group);
            this.noteElements[noteObj.index] = group;
          });

          // Measure barline
          const isFinalMeasure =
            lineIdx === numLines - 1 && mIdx === lineMeasures.length - 1;
          if (isFinalMeasure) {
            svg.appendChild(
              el("line", {
                x1: mEndX - 5,
                y1: staffTop,
                x2: mEndX - 5,
                y2: staffBottom,
                stroke: "#171a24",
                "stroke-width": 1.5
              })
            );
            svg.appendChild(
              el("line", {
                x1: mEndX,
                y1: staffTop,
                x2: mEndX,
                y2: staffBottom,
                stroke: "#171a24",
                "stroke-width": 4
              })
            );
          } else {
            svg.appendChild(
              el("line", {
                x1: mEndX,
                y1: staffTop,
                x2: mEndX,
                y2: staffBottom,
                stroke: "#475569",
                "stroke-width": 1.3
              })
            );
          }
        });
      }

      // Build timeline segments with 100% constant linear speed (px per beat)
      let runningBeat = 0;
      for (let i = 0; i < this.notePositions.length; i++) {
        const pos = this.notePositions[i];
        if (!pos) continue;
        const nextPos = this.notePositions[i + 1];
        const xEnd =
          nextPos && nextPos.lineIdx === pos.lineIdx
            ? nextPos.x
            : pos.x + pos.durBeats * pos.beatWidth;
        this.timelineSegments.push({
          startBeat: runningBeat,
          endBeat: runningBeat + pos.durBeats,
          xStart: pos.x,
          xEnd,
          yTop: pos.yTop,
          yBottom: pos.yBottom,
          lineIdx: pos.lineIdx,
          staffTop: pos.staffTop
        });
        runningBeat += pos.durBeats;
      }

      if (this.timelineSegments.length > 0) {
        const first = this.timelineSegments[0];
        this.leadInSegment = {
          startBeat: -beatsPerMeasure,
          endBeat: 0,
          xStart: leftMargin + clefWidth + 24,
          xEnd: first.xStart,
          yTop: first.yTop,
          yBottom: first.yBottom,
          lineIdx: 0,
          staffTop: first.staffTop
        };
      }

      // Playhead timeline cursor
      this.cursorEl = el("line", {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        stroke: "#0284c7",
        "stroke-width": 2.5,
        opacity: 0
      });
      svg.appendChild(this.cursorEl);

      this.container.appendChild(svg);
    }

    scrollToLineIfNeeded(lineIdx, staffTop) {
      if (lineIdx === this.lastScrolledLine) return;
      this.lastScrolledLine = lineIdx;
      const svg = this.container.querySelector("svg");
      if (svg && this.svgHeight > 0) {
        const scale = svg.getBoundingClientRect().height / this.svgHeight;
        const targetTop = Math.max(0, (staffTop - 36) * scale);
        this.container.scrollTo({ top: targetTop, behavior: "smooth" });
      }
    }

    updatePlayheadByBeat(currentBeat) {
      if (!this.cursorEl || this.timelineSegments.length === 0) return;
      let seg = null;
      if (currentBeat < 0 && this.leadInSegment) {
        seg = this.leadInSegment;
      } else {
        seg = this.timelineSegments.find(
          (s) => currentBeat >= s.startBeat && currentBeat < s.endBeat
        );
      }
      if (!seg) {
        seg =
          currentBeat < 0
            ? this.timelineSegments[0]
            : this.timelineSegments[this.timelineSegments.length - 1];
      }
      const span = Math.max(0.001, seg.endBeat - seg.startBeat);
      const t = Math.max(0, Math.min(1, (currentBeat - seg.startBeat) / span));
      const x = seg.xStart + t * (seg.xEnd - seg.xStart);

      this.cursorEl.setAttribute("x1", x);
      this.cursorEl.setAttribute("x2", x);
      this.cursorEl.setAttribute("y1", seg.yTop);
      this.cursorEl.setAttribute("y2", seg.yBottom);
      this.cursorEl.setAttribute("opacity", "0.9");
      this.scrollToLineIfNeeded(seg.lineIdx, seg.staffTop);
    }

    setNoteState(index, state, snapCursor = true) {
      const group = this.noteElements[index];
      if (!group) return;
      const head = group.querySelector(".note-head");
      const stem = group.querySelector(".note-stem");
      const halo = group.querySelector(".note-halo");

      const colors = {
        default: { ink: "#171a24", halo: "transparent" },
        active: { ink: "#0284c7", halo: "rgba(56, 189, 248, 0.28)" },
        correct: { ink: "#059669", halo: "rgba(16, 185, 129, 0.18)" },
        wrong: { ink: "#e11d48", halo: "rgba(244, 63, 94, 0.25)" }
      };
      const c = colors[state] || colors.default;
      if (head) {
        head.setAttribute("stroke", c.ink);
        if (head.getAttribute("fill") !== "#fcfaf2") {
          head.setAttribute("fill", c.ink);
        }
      }
      if (stem) stem.setAttribute("stroke", c.ink);
      if (halo) halo.setAttribute("fill", c.halo);

      if (state === "active" && this.cursorEl && this.notePositions[index]) {
        const pos = this.notePositions[index];
        if (snapCursor) {
          this.cursorEl.setAttribute("x1", pos.x);
          this.cursorEl.setAttribute("x2", pos.x);
          this.cursorEl.setAttribute("y1", pos.yTop);
          this.cursorEl.setAttribute("y2", pos.yBottom);
          this.cursorEl.setAttribute("opacity", "0.9");
        }
        this.scrollToLineIfNeeded(pos.lineIdx, pos.staffTop);
      }
    }

    resetAllStates() {
      this.noteElements.forEach((_, i) => this.setNoteState(i, "default"));
      if (this.cursorEl) this.cursorEl.setAttribute("opacity", "0");
      this.lastScrolledLine = -1;
      if (this.container) this.container.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  global.ClaveNotation = NotationRenderer;
})(window);
