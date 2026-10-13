/**
 * Web Audio API procedural sound engine for Ekibastuz Chronicle.
 * Generates ambient soundscapes without external media dependencies.
 */

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private activeNodes: { stop: () => void } | null = null;
  private currentType: string | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public stopSound() {
    if (this.activeNodes) {
      try {
        this.activeNodes.stop();
      } catch {
        // ignore
      }
      this.activeNodes = null;
    }
    this.currentType = null;
  }

  public isPlaying(type: string): boolean {
    return this.currentType === type;
  }

  public getCurrentType(): string | null {
    return this.currentType;
  }

  public playSound(type: string) {
    if (this.currentType === type) {
      this.stopSound();
      return;
    }
    this.stopSound();

    const ctx = this.initCtx();
    this.currentType = type;

    switch (type) {
      case 'steam_train':
        this.activeNodes = this.createSteamTrain(ctx);
        break;
      case 'excavator':
        this.activeNodes = this.createExcavatorRumble(ctx);
        break;
      case 'turbine':
        this.activeNodes = this.createTurbineHum(ctx);
        break;
      case 'wind':
        this.activeNodes = this.createSteppeWind(ctx);
        break;
      case 'culture':
        this.activeNodes = this.createCultureHarmonics(ctx);
        break;
      case 'museum':
        this.activeNodes = this.createMuseumClock(ctx);
        break;
      case 'mine_glory':
        this.activeNodes = this.createMiningChime(ctx);
        break;
      case 'library':
        this.activeNodes = this.createLibraryZen(ctx);
        break;
      case 'park':
        this.activeNodes = this.createParkAmbience(ctx);
        break;
      case 'monument':
      default:
        this.activeNodes = this.createSolemnChime(ctx);
        break;
    }
  }

  // Steam locomotive soundscape: rhythmic piston chuffs + distant steam whistle
  private createSteamTrain(ctx: AudioContext) {
    let isRunning = true;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.3, ctx.currentTime);
    masterGain.connect(ctx.destination);

    // Chuff generator
    let chuffCount = 0;
    const interval = setInterval(() => {
      if (!isRunning) return;
      chuffCount++;

      // Create white noise burst for steam exhaust
      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 600 + (chuffCount % 4) * 80;
      filter.Q.value = 1.8;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      noise.start();
    }, 280);

    // Occasional steam whistle
    const whistleInterval = setInterval(() => {
      if (!isRunning) return;
      const whistleOsc1 = ctx.createOscillator();
      const whistleOsc2 = ctx.createOscillator();
      const whistleGain = ctx.createGain();

      whistleOsc1.type = 'sawtooth';
      whistleOsc2.type = 'triangle';
      whistleOsc1.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      whistleOsc2.frequency.setValueAtTime(880.0, ctx.currentTime); // A5

      const now = ctx.currentTime;
      whistleGain.gain.setValueAtTime(0.001, now);
      whistleGain.gain.linearRampToValueAtTime(0.12, now + 0.2);
      whistleGain.gain.setValueAtTime(0.12, now + 0.9);
      whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1200;

      whistleOsc1.connect(filter);
      whistleOsc2.connect(filter);
      filter.connect(whistleGain);
      whistleGain.connect(masterGain);

      whistleOsc1.start(now);
      whistleOsc2.start(now);
      whistleOsc1.stop(now + 1.5);
      whistleOsc2.stop(now + 1.5);
    }, 4500);

    return {
      stop: () => {
        isRunning = false;
        clearInterval(interval);
        clearInterval(whistleInterval);
        masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      },
    };
  }

  // Giant Bogatyr excavator: deep low bass motor + rhythmic metallic rotations
  private createExcavatorRumble(ctx: AudioContext) {
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.25, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const osc1 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 bass

    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(82.4, ctx.currentTime); // E2

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, ctx.currentTime);

    // LFO to simulate rotating bucket wheel
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.4, ctx.currentTime); // 0.4 Hz wheel period

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(80, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(masterGain);

    osc1.start();
    osc2.start();
    lfo.start();

    return {
      stop: () => {
        masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        setTimeout(() => {
          try {
            osc1.stop();
            osc2.stop();
            lfo.stop();
          } catch {
            // ignore
          }
        }, 350);
      },
    };
  }

  // Power Station GRES: electric 50Hz grid resonance + high-speed steam turbine whine
  private createTurbineHum(ctx: AudioContext) {
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.2, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const hum50Hz = ctx.createOscillator();
    hum50Hz.type = 'sine';
    hum50Hz.frequency.setValueAtTime(50, ctx.currentTime); // 50 Hz Eurasian power grid

    const hum100Hz = ctx.createOscillator();
    hum100Hz.type = 'sine';
    hum100Hz.frequency.setValueAtTime(100, ctx.currentTime);

    const turbineHigh = ctx.createOscillator();
    turbineHigh.type = 'sine';
    turbineHigh.frequency.setValueAtTime(850, ctx.currentTime); // 3000 RPM generator whine

    const turbineGain = ctx.createGain();
    turbineGain.gain.setValueAtTime(0.04, ctx.currentTime);

    hum50Hz.connect(masterGain);
    hum100Hz.connect(masterGain);
    turbineHigh.connect(turbineGain);
    turbineGain.connect(masterGain);

    hum50Hz.start();
    hum100Hz.start();
    turbineHigh.start();

    return {
      stop: () => {
        masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        setTimeout(() => {
          try {
            hum50Hz.stop();
            hum100Hz.stop();
            turbineHigh.stop();
          } catch {
            // ignore
          }
        }, 350);
      },
    };
  }

  // Steppe wind (Saryarka breeze)
  private createSteppeWind(ctx: AudioContext) {
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(320, ctx.currentTime);
    filter.Q.setValueAtTime(2.5, ctx.currentTime);

    // Wind modulation
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.25, ctx.currentTime);

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(180, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.2, ctx.currentTime);

    noise.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    noise.start();
    lfo.start();

    return {
      stop: () => {
        masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        setTimeout(() => {
          try {
            noise.stop();
            lfo.stop();
          } catch {
            // ignore
          }
        }, 350);
      },
    };
  }

  // Culture & Dombra harmonic resonances
  private createCultureHarmonics(ctx: AudioContext) {
    let isRunning = true;
    const notes = [293.66, 440.0, 587.33, 659.25, 880.0]; // D4, A4, D5, E5, A5 pentatonic dombra chords
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.2, ctx.currentTime);
    masterGain.connect(ctx.destination);

    let idx = 0;
    const interval = setInterval(() => {
      if (!isRunning) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(notes[idx % notes.length], ctx.currentTime);

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 1.2);

      idx++;
    }, 700);

    return {
      stop: () => {
        isRunning = false;
        clearInterval(interval);
        masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      },
    };
  }

  // Museum clock and quiet archive chime
  private createMuseumClock(ctx: AudioContext) {
    let isRunning = true;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.2, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const interval = setInterval(() => {
      if (!isRunning) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, ctx.currentTime);

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.06);
    }, 1000);

    return {
      stop: () => {
        isRunning = false;
        clearInterval(interval);
        masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      },
    };
  }

  // Mining Glory: Industrial metallic echoes
  private createMiningChime(ctx: AudioContext) {
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.2, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(329.63, ctx.currentTime); // E4

    const sub = ctx.createOscillator();
    sub.type = 'triangle';
    sub.frequency.setValueAtTime(164.81, ctx.currentTime); // E3

    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    osc.connect(gain);
    sub.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    sub.start(now);

    return {
      stop: () => {
        masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        setTimeout(() => {
          try {
            osc.stop();
            sub.stop();
          } catch {
            // ignore
          }
        }, 250);
      },
    };
  }

  // Library Zen
  private createLibraryZen(ctx: AudioContext) {
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(220, ctx.currentTime);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(330, ctx.currentTime);

    osc1.connect(masterGain);
    osc2.connect(masterGain);

    osc1.start();
    osc2.start();

    return {
      stop: () => {
        masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        setTimeout(() => {
          try {
            osc1.stop();
            osc2.stop();
          } catch {
            // ignore
          }
        }, 350);
      },
    };
  }

  // Park: Light chirping birds & breezy music
  private createParkAmbience(ctx: AudioContext) {
    let isRunning = true;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.18, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const interval = setInterval(() => {
      if (!isRunning) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';

      const baseFreq = 2200 + Math.random() * 800;
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.linearRampToValueAtTime(baseFreq + 600, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.15);
    }, 1800);

    return {
      stop: () => {
        isRunning = false;
        clearInterval(interval);
        masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      },
    };
  }

  private createSolemnChime(ctx: AudioContext) {
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.2, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);

    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);

    return {
      stop: () => {
        masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        setTimeout(() => {
          try {
            osc.stop();
          } catch {
            // ignore
          }
        }, 250);
      },
    };
  }
}

export const soundscape = new SoundscapeEngine();
