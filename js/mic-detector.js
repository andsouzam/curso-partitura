/**
 * Microphone Pitch Detector (McLeod Pitch Method / NSDF + Onset Detection)
 * Detects notes played on an acoustic or digital piano via the device microphone.
 */
(function (global) {
  class MicPitchDetector {
    constructor({ onNoteDetected, onStatusChange, onLevel }) {
      this.onNoteDetected = onNoteDetected;
      this.onStatusChange = onStatusChange;
      this.onLevel = onLevel;

      this.ctx = null;
      this.stream = null;
      this.analyser = null;
      this.buffer = null;
      this.rafId = null;
      this.isActive = false;

      // Detection state
      this.minRms = 0.026;
      this.candidateMidi = null;
      this.candidateFrames = 0;
      this.lastTriggeredMidi = null;
      this.lastTriggerTime = 0;
      this.prevRms = 0;
      this.readyForRetrigger = true;
    }

    async start() {
      if (this.isActive) return;
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        this.onStatusChange(false, "Microfone não suportado neste navegador");
        return;
      }

      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false
          }
        });

        const AudioCtx = global.AudioContext || global.webkitAudioContext;
        this.ctx = new AudioCtx();
        const source = this.ctx.createMediaStreamSource(this.stream);

        // High-pass filter at 95 Hz to reject room rumble, desk bumps, and fan hum
        const highpass = this.ctx.createBiquadFilter();
        highpass.type = "highpass";
        highpass.frequency.value = 95;

        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 2048;
        this.buffer = new Float32Array(this.analyser.fftSize);
        source.connect(highpass);
        highpass.connect(this.analyser);

        this.isActive = true;
        this.onStatusChange(true, "Microfone: Ativo (Ouvindo piano)");
        this.loop();
      } catch (err) {
        const msg =
          err && err.name === "NotAllowedError"
            ? "Microfone: Permissão negada"
            : "Microfone: Erro ao acessar";
        this.onStatusChange(false, msg);
      }
    }

    stop() {
      this.isActive = false;
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
      if (this.stream) {
        this.stream.getTracks().forEach((t) => t.stop());
        this.stream = null;
      }
      if (this.ctx) {
        this.ctx.close().catch(() => {});
        this.ctx = null;
      }
      if (this.onLevel) this.onLevel(0);
      this.onStatusChange(false, "Microfone: Desligado");
    }

    toggle() {
      if (this.isActive) this.stop();
      else this.start();
    }

    setSensitivity(rmsThreshold) {
      this.minRms = rmsThreshold;
    }

    loop() {
      if (!this.isActive) return;
      this.analyser.getFloatTimeDomainData(this.buffer);

      // Compute RMS energy
      let sumSq = 0;
      for (let i = 0; i < this.buffer.length; i++) {
        sumSq += this.buffer[i] * this.buffer[i];
      }
      const rms = Math.sqrt(sumSq / this.buffer.length);
      if (this.onLevel) this.onLevel(Math.min(1, rms * 10));

      const now = performance.now();

      // Silence resets retrigger gate
      if (rms < this.minRms * 0.7) {
        this.readyForRetrigger = true;
        this.candidateMidi = null;
        this.candidateFrames = 0;
      } else if (rms > this.prevRms * 1.75 && rms > this.minRms * 1.4 && now - this.lastTriggerTime > 110) {
        // Sharp attack/onset allows repeating the same key (e.g., Mi-Mi-Mi)
        this.readyForRetrigger = true;
      }

      if (rms >= this.minRms) {
        const freq = this.detectPitchNSDF(this.buffer, this.ctx.sampleRate);
        if (freq && freq >= 100 && freq <= 1150) {
          const exactMidi = 69 + 12 * Math.log2(freq / 440);
          const midi = Math.round(exactMidi);
          const centsOff = Math.abs(exactMidi - midi) * 100;

          // Reject out-of-tune background noises (> 35 cents away from a piano key)
          if (centsOff <= 35) {
            if (midi === this.candidateMidi) {
              this.candidateFrames++;
            } else {
              this.candidateMidi = midi;
              this.candidateFrames = 1;
            }

            // Require 3 consecutive stable frames (~48ms)
            if (this.candidateFrames >= 3) {
              const isNewNote = midi !== this.lastTriggeredMidi;
              if ((isNewNote || this.readyForRetrigger) && now - this.lastTriggerTime > 130) {
                this.lastTriggeredMidi = midi;
                this.lastTriggerTime = now;
                this.readyForRetrigger = false;
                if (this.onNoteDetected) this.onNoteDetected(midi);
              }
            }
          }
        }
      }

      this.prevRms = rms;
      this.rafId = requestAnimationFrame(() => this.loop());
    }

    /**
     * Normalized Square Difference Function (McLeod Pitch Method)
     * Robust against strong piano harmonics.
     */
    detectPitchNSDF(buf, sampleRate) {
      const n = buf.length;
      const maxLag = Math.floor(sampleRate / 65); // ~65 Hz (C2)
      const minLag = Math.floor(sampleRate / 1200); // ~1200 Hz (D6)
      const nsdf = new Float32Array(maxLag);

      for (let tau = minLag; tau < maxLag; tau++) {
        let acf = 0;
        let divisor = 0;
        for (let i = 0; i < n - tau; i++) {
          const a = buf[i];
          const b = buf[i + tau];
          acf += a * b;
          divisor += a * a + b * b;
        }
        nsdf[tau] = divisor > 0 ? (2 * acf) / divisor : 0;
      }

      // Find first major peak after zero-crossing above strict tonal clarity threshold
      const threshold = 0.85;
      let bestTau = -1;
      let bestVal = -1;
      let inPositiveRegion = false;

      for (let tau = minLag; tau < maxLag - 1; tau++) {
        const val = nsdf[tau];
        if (val > 0) {
          inPositiveRegion = true;
          if (val > bestVal) {
            bestVal = val;
            bestTau = tau;
          }
        } else if (inPositiveRegion) {
          if (bestVal >= threshold) break;
          inPositiveRegion = false;
          bestVal = -1;
        }
      }

      if (bestTau <= minLag || bestVal < threshold) return null;

      // Parabolic interpolation for sub-sample frequency accuracy
      const y1 = nsdf[bestTau - 1];
      const y2 = nsdf[bestTau];
      const y3 = nsdf[bestTau + 1];
      const denom = 2 * (2 * y2 - y1 - y3);
      const shift = denom !== 0 ? (y3 - y1) / denom : 0;
      const refinedTau = bestTau + Math.max(-0.5, Math.min(0.5, shift));

      return sampleRate / refinedTau;
    }
  }

  global.ClaveMicDetector = MicPitchDetector;
})(window);
