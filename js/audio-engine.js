/**
 * Web Audio API Synthesizer + Metronome
 * Produces a warm polyphonic piano-like tone without external samples.
 */
(function (global) {
  class AudioEngine {
    constructor() {
      this.ctx = null;
      this.masterGain = null;
    }

    ensureContext() {
      if (!this.ctx) {
        const AudioCtx = global.AudioContext || global.webkitAudioContext;
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.7;
        this.masterGain.connect(this.ctx.destination);
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    }

    static midiToFreq(midi) {
      return 440 * Math.pow(2, (midi - 69) / 12);
    }

    static noteNameToMidi(noteName) {
      if (!noteName || noteName === "REST") return null;
      const match = /^([A-G])([#b]?)(-?\d)$/.exec(noteName.trim());
      if (!match) return null;
      const semitones = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
      let midi = (parseInt(match[3], 10) + 1) * 12 + semitones[match[1]];
      if (match[2] === "#") midi += 1;
      if (match[2] === "b") midi -= 1;
      return midi;
    }

    static midiToPtLabel(midi) {
      const names = ["Dó", "Dó#", "Ré", "Ré#", "Mi", "Fá", "Fá#", "Sol", "Sol#", "Lá", "Lá#", "Si"];
      const octave = Math.floor(midi / 12) - 1;
      return `${names[midi % 12]}${octave}`;
    }

    playNote(midi, durationSec = 0.65, velocity = 0.8) {
      if (midi === null || midi === undefined) return;
      this.ensureContext();
      const now = this.ctx.currentTime;
      const freq = AudioEngine.midiToFreq(midi);

      const noteGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(Math.min(4800, freq * 6), now);
      filter.frequency.exponentialRampToValueAtTime(Math.max(500, freq * 1.8), now + durationSec);

      // Harmonics for warm piano timbre
      const partials = [
        { mult: 1, type: "triangle", amp: 0.65 },
        { mult: 2, type: "sine", amp: 0.25 },
        { mult: 3, type: "sine", amp: 0.1 }
      ];

      const peak = 0.35 * velocity;
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(peak, now + 0.012);
      noteGain.gain.exponentialRampToValueAtTime(peak * 0.45, now + 0.14);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec + 0.18);

      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      partials.forEach((p) => {
        const osc = this.ctx.createOscillator();
        const pGain = this.ctx.createGain();
        osc.type = p.type;
        osc.frequency.setValueAtTime(freq * p.mult, now);
        pGain.gain.value = p.amp;
        osc.connect(pGain);
        pGain.connect(filter);
        osc.start(now);
        osc.stop(now + durationSec + 0.22);
      });
    }

    playClick(isAccent = false) {
      this.ensureContext();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(isAccent ? 1200 : 820, now);
      gain.gain.setValueAtTime(isAccent ? 0.28 : 0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.06);
    }

    playErrorBuzz() {
      this.ensureContext();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(145, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.15);
    }

    /**
     * Plays a 4-beat metronome bar and holds a reference note (E4) for `beats` beats
     * so the student hears the exact difference between quarter (1), half (2), and whole (4) notes.
     */
    playRhythmExample(beats, bpm = 75) {
      this.ensureContext();
      const beatSec = 60 / bpm;
      const totalBeats = 4;

      for (let b = 0; b < totalBeats; b++) {
        setTimeout(() => {
          this.playClick(b === 0);
        }, b * beatSec * 1000);
      }

      // Play note on beat 1 and hold for `beats`
      this.playNote(64, beats * beatSec * 0.92, 0.85);
      // If 1 beat, also play a second quarter note on beat 3 for clear contrast
      if (beats === 1) {
        setTimeout(() => {
          this.playNote(64, beatSec * 0.92, 0.85);
        }, beatSec * 2 * 1000);
      }
    }
  }

  global.ClaveAudio = new AudioEngine();
})(window);
