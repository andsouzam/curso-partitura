/**
 * Interactive Piano Keyboard + Computer Keyboard + Web MIDI API
 */
(function (global) {
  const KEY_DEFS = [
    { midi: 60, note: "C4", label: "Dó4", black: false, kbd: "A" },
    { midi: 61, note: "C#4", label: "Dó#", black: true, kbd: "W" },
    { midi: 62, note: "D4", label: "Ré4", black: false, kbd: "S" },
    { midi: 63, note: "D#4", label: "Ré#", black: true, kbd: "E" },
    { midi: 64, note: "E4", label: "Mi4", black: false, kbd: "D" },
    { midi: 65, note: "F4", label: "Fá4", black: false, kbd: "F" },
    { midi: 66, note: "F#4", label: "Fá#", black: true, kbd: "T" },
    { midi: 67, note: "G4", label: "Sol4", black: false, kbd: "G" },
    { midi: 68, note: "G#4", label: "Sol#", black: true, kbd: "Y" },
    { midi: 69, note: "A4", label: "Lá4", black: false, kbd: "H" },
    { midi: 70, note: "A#4", label: "Lá#", black: true, kbd: "U" },
    { midi: 71, note: "B4", label: "Si4", black: false, kbd: "J" },
    { midi: 72, note: "C5", label: "Dó5", black: false, kbd: "K" },
    { midi: 73, note: "C#5", label: "Dó#5", black: true, kbd: "O" },
    { midi: 74, note: "D5", label: "Ré5", black: false, kbd: "L" },
    { midi: 75, note: "D#5", label: "Ré#5", black: true, kbd: "P" },
    { midi: 76, note: "E5", label: "Mi5", black: false, kbd: ";" }
  ];

  class PianoUI {
    constructor(container, onNoteInput, onMidiStatus) {
      this.container = container;
      this.onNoteInput = onNoteInput;
      this.onMidiStatus = onMidiStatus;
      this.keyElements = new Map();
      this.kbdMap = new Map();
      this.pressedKeys = new Set();

      this.render();
      this.bindKeyboard();
      this.initMIDI();
    }

    render() {
      this.container.innerHTML = "";
      const keysWrap = document.createElement("div");
      keysWrap.className = "piano-keys";

      let whiteIndex = 0;
      const whiteWidth = 54;

      KEY_DEFS.forEach((k) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.dataset.midi = String(k.midi);
        btn.setAttribute("aria-label", `${k.label} (${k.note})`);

        if (!k.black) {
          btn.className = "key-white";
          btn.innerHTML = `<span>${k.label}</span><span class="key-kbd">${k.kbd}</span>`;
          whiteIndex++;
        } else {
          btn.className = "key-black";
          // Position black key between previous white key and next
          const leftPx = whiteIndex * whiteWidth - 17;
          btn.style.left = `${leftPx}px`;
          btn.innerHTML = `<span>${k.kbd}</span>`;
        }

        const trigger = (e) => {
          e.preventDefault();
          this.triggerNote(k.midi, 0.85);
        };
        btn.addEventListener("mousedown", trigger);
        btn.addEventListener("touchstart", trigger, { passive: false });

        keysWrap.appendChild(btn);
        this.keyElements.set(k.midi, btn);
        this.kbdMap.set(k.kbd.toLowerCase(), k.midi);
      });

      this.container.appendChild(keysWrap);
    }

    bindKeyboard() {
      window.addEventListener("keydown", (e) => {
        if (e.repeat || e.target.tagName === "INPUT") return;
        const keyChar = e.key.toLowerCase();
        const midi = this.kbdMap.get(keyChar);
        if (midi !== undefined && !this.pressedKeys.has(keyChar)) {
          this.pressedKeys.add(keyChar);
          this.triggerNote(midi, 0.85);
        }
      });

      window.addEventListener("keyup", (e) => {
        this.pressedKeys.delete(e.key.toLowerCase());
      });
    }

    initMIDI() {
      if (!navigator.requestMIDIAccess) {
        this.onMidiStatus(false, "MIDI não suportado neste navegador");
        return;
      }
      navigator.requestMIDIAccess().then(
        (access) => {
          const updateInputs = () => {
            const inputs = Array.from(access.inputs.values());
            if (inputs.length > 0) {
              this.onMidiStatus(true, `MIDI: ${inputs[0].name}`);
              inputs.forEach((input) => {
                input.onmidimessage = (msg) => {
                  const [status, note, velocity] = msg.data;
                  const cmd = status & 0xf0;
                  if (cmd === 0x90 && velocity > 0) {
                    this.triggerNote(note, velocity / 127);
                  }
                };
              });
            } else {
              this.onMidiStatus(false, "MIDI: Desconectado");
            }
          };
          updateInputs();
          access.onstatechange = updateInputs;
        },
        () => {
          this.onMidiStatus(false, "MIDI: Permissão negada");
        }
      );
    }

    triggerNote(midi, velocity = 0.85) {
      global.ClaveAudio.playNote(midi, 0.65, velocity);
      this.flashKey(midi, "active", 180);
      if (this.onNoteInput) {
        this.onNoteInput(midi);
      }
    }

    flashKey(midi, className, durationMs = 240) {
      const el = this.keyElements.get(midi);
      if (!el) return;
      el.classList.add(className);
      setTimeout(() => el.classList.remove(className), durationMs);
    }
  }

  global.ClavePianoUI = PianoUI;
})(window);
