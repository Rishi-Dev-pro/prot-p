class SoundService {
  private ctx: AudioContext | null = null;
  private enabled = false;

  private initCtx(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public isSoundEnabled(): boolean {
    return this.enabled;
  }

  public setSoundEnabled(enable: boolean): void {
    this.enabled = enable;
    if (enable) {
      this.initCtx();
      this.playBeep(880, 0.05, 'sine');
    }
  }

  public toggleSound(): boolean {
    this.setSoundEnabled(!this.enabled);
    return this.enabled;
  }

  public playClick(): void {
    if (!this.enabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // AudioContext policy safe catch
    }
  }

  public playBeep(freq = 660, duration = 0.08, type: OscillatorType = 'sine'): void {
    if (!this.enabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext policy safe catch
    }
  }

  public playSuccess(): void {
    if (!this.enabled) return;
    this.playBeep(523.25, 0.08, 'sine'); // C5
    window.setTimeout(() => {
      this.playBeep(659.25, 0.08, 'sine'); // E5
    }, 70);
    window.setTimeout(() => {
      this.playBeep(783.99, 0.14, 'sine'); // G5
    }, 140);
  }
}

export const soundEffects = new SoundService();

