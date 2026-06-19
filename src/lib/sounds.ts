'use client';

/**
 * HandQuiz AR — Sound Effects System
 * -----------------------------------
 * Self-contained Web Audio API sound generator.
 * NO external audio files — every sound is synthesized at runtime
 * using OscillatorNode + GainNode with proper ADSR envelopes so there
 * are no clicks/pops at the start or end of a sound.
 *
 * The AudioContext is created lazily on first use (after a user gesture)
 * to comply with browser autoplay policies. Every public method is
 * wrapped in try/catch so the game never breaks if audio is unavailable.
 */

import { useEffect } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ToneOptions {
  /** Frequency in Hz (start of the tone). */
  freq: number;
  /** Oscillator waveform. */
  type: OscillatorType;
  /** Offset from "now" (seconds) at which the tone should start. */
  startOffset: number;
  /** Total duration of the tone in seconds. */
  duration: number;
  /** Peak gain (0..1). Defaults to 0.2. */
  peak?: number;
  /** Attack time in seconds (gain ramps 0 → peak). Defaults to 0.005. */
  attack?: number;
  /** Release time in seconds (gain ramps → 0 at the end). Defaults to 0.04. */
  release?: number;
  /** Optional end frequency for a frequency sweep (pitch glide). */
  freqEnd?: number;
  /** Optional secondary oscillator detuned for a thicker/fizzy texture. */
  detune?: number;
}

// ---------------------------------------------------------------------------
// SoundManager — singleton
// ---------------------------------------------------------------------------

export class SoundManager {
  /** Lazily-created AudioContext. */
  private ctx: AudioContext | null = null;
  /** Master gain node (created together with the context). */
  private master: GainNode | null = null;
  /** Global enable/disable flag. When false, all calls are no-ops. */
  private enabled: boolean = true;
  /** Whether we're running in a browser (SSR guard). */
  private readonly isBrowser: boolean;

  constructor() {
    this.isBrowser =
      typeof window !== 'undefined' && typeof window.AudioContext !== 'undefined';
  }

  // -------------------------------------------------------------------------
  // Public configuration API
  // -------------------------------------------------------------------------

  /** Enable or disable all sound effects at runtime. */
  setEnabled(value: boolean): void {
    this.enabled = value;
    // Reflect the setting on the master gain immediately if audio is live.
    if (this.master && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.master.gain.cancelScheduledValues(now);
        this.master.gain.setTargetAtTime(value ? 1 : 0, now, 0.02);
      } catch {
        /* no-op */
      }
    }
  }

  /** Returns whether sound effects are currently enabled. */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Resume the AudioContext if it was suspended (browsers often suspend it
   * until a user gesture). Safe to call repeatedly.
   */
  resume(): void {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (this.ctx && this.ctx.state === 'suspended') {
        void this.ctx.resume();
      }
    } catch {
      /* no-op */
    }
  }

  // -------------------------------------------------------------------------
  // Public sound methods
  // -------------------------------------------------------------------------

  /**
   * Pleasant ascending arpeggio (C5 – E5 – G5), ~300ms total.
   * Sine + triangle waves with a soft envelope. Played on a correct answer.
   */
  correct(): void {
    if (!this.enabled) return;
    try {
      const now = this.now();
      // C5, E5, G5 — major triad, ascending.
      this.playTone({
        freq: 523.25, type: 'triangle', startOffset: 0.0,
        duration: 0.18, peak: 0.22, attack: 0.006, release: 0.06,
      });
      this.playTone({
        freq: 659.25, type: 'sine', startOffset: 0.09,
        duration: 0.18, peak: 0.22, attack: 0.006, release: 0.06,
      });
      this.playTone({
        freq: 783.99, type: 'triangle', startOffset: 0.18,
        duration: 0.22, peak: 0.26, attack: 0.006, release: 0.08,
      });
    } catch {
      /* no-op */
    }
  }

  /**
   * Short descending dissonant "buzz", ~250ms. Sawtooth, low pitch.
   * Played on a wrong answer.
   */
  wrong(): void {
    if (!this.enabled) return;
    try {
      // Primary descending tone A3 -> A2 (sawtooth = buzzy).
      this.playTone({
        freq: 220, freqEnd: 110, type: 'sawtooth',
        startOffset: 0.0, duration: 0.25,
        peak: 0.18, attack: 0.005, release: 0.05,
      });
      // Dissonant layer a tritone above, also descending, thinner.
      this.playTone({
        freq: 233.08, freqEnd: 116.54, type: 'square',
        startOffset: 0.0, duration: 0.25,
        peak: 0.06, attack: 0.005, release: 0.05,
      });
    } catch {
      /* no-op */
    }
  }

  /**
   * Short rising "blip", ~80ms, high sine. Played when grabbing a card.
   */
  pickup(): void {
    if (!this.enabled) return;
    try {
      this.playTone({
        freq: 600, freqEnd: 950, type: 'sine',
        startOffset: 0.0, duration: 0.08,
        peak: 0.22, attack: 0.004, release: 0.04,
      });
    } catch {
      /* no-op */
    }
  }

  /**
   * Short soft "thud", ~100ms, low sine. Played when releasing a card.
   */
  drop(): void {
    if (!this.enabled) return;
    try {
      this.playTone({
        freq: 150, freqEnd: 70, type: 'sine',
        startOffset: 0.0, duration: 0.1,
        peak: 0.32, attack: 0.003, release: 0.06,
      });
    } catch {
      /* no-op */
    }
  }

  /**
   * Very short click, ~40ms. Played each second during the last 5 seconds
   * of the timer countdown.
   */
  tick(): void {
    if (!this.enabled) return;
    try {
      this.playTone({
        freq: 1800, type: 'square',
        startOffset: 0.0, duration: 0.04,
        peak: 0.12, attack: 0.001, release: 0.025,
      });
    } catch {
      /* no-op */
    }
  }

  /**
   * Cheerful 2-note chime (C5 → G5). Played when a game starts.
   */
  start(): void {
    if (!this.enabled) return;
    try {
      this.playTone({
        freq: 523.25, type: 'triangle',
        startOffset: 0.0, duration: 0.18,
        peak: 0.24, attack: 0.006, release: 0.07,
      });
      this.playTone({
        freq: 783.99, type: 'sine',
        startOffset: 0.14, duration: 0.28,
        peak: 0.26, attack: 0.006, release: 0.1,
      });
    } catch {
      /* no-op */
    }
  }

  /**
   * Triumphant fanfare — 5 ascending notes (C5, E5, G5, C6, E6), ~1.2s.
   * Played on the results screen.
   */
  victory(): void {
    if (!this.enabled) return;
    try {
      // C major arpeggio spanning two octaves, with a final sustained note.
      const notes: Array<{ freq: number; off: number; dur: number; peak: number }> = [
        { freq: 523.25, off: 0.0,  dur: 0.18, peak: 0.22 }, // C5
        { freq: 659.25, off: 0.14, dur: 0.18, peak: 0.22 }, // E5
        { freq: 783.99, off: 0.28, dur: 0.18, peak: 0.24 }, // G5
        { freq: 1046.5, off: 0.42, dur: 0.22, peak: 0.26 }, // C6
        { freq: 1318.51, off: 0.6,  dur: 0.6,  peak: 0.3 },  // E6 (sustained)
      ];
      for (const n of notes) {
        this.playTone({
          freq: n.freq, type: 'triangle',
          startOffset: n.off, duration: n.dur,
          peak: n.peak, attack: 0.008, release: 0.12,
        });
        // Soft sine octave-up shimmer layer for a "sparkly" fanfare feel.
        this.playTone({
          freq: n.freq * 2, type: 'sine',
          startOffset: n.off, duration: n.dur,
          peak: n.peak * 0.18, attack: 0.008, release: 0.12,
        });
      }
    } catch {
      /* no-op */
    }
  }

  /**
   * Subtle UI click, ~50ms. Played on generic button presses.
   */
  click(): void {
    if (!this.enabled) return;
    try {
      this.playTone({
        freq: 800, type: 'sine',
        startOffset: 0.0, duration: 0.05,
        peak: 0.14, attack: 0.002, release: 0.035,
      });
    } catch {
      /* no-op */
    }
  }

  // -------------------------------------------------------------------------
  // Internals
  // -------------------------------------------------------------------------

  /**
   * Lazily create the AudioContext + master gain. Called on first sound.
   * Returns true if audio is ready to use.
   */
  private ensureContext(): boolean {
    if (!this.isBrowser) return false;
    if (this.ctx && this.master) return true;

    try {
      const Ctor: typeof AudioContext =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.enabled ? 1 : 0;
      this.master.connect(this.ctx.destination);
      return true;
    } catch {
      this.ctx = null;
      this.master = null;
      return false;
    }
  }

  /** Current AudioContext time (seconds), or 0 if unavailable. */
  private now(): number {
    if (!this.ensureContext() || !this.ctx) return 0;
    return this.ctx.currentTime;
  }

  /**
   * Core tone synthesizer. Schedules one oscillator (with its own gain
   * envelope) on the master bus. The gain ramps 0 → peak (attack) then
   * peak → 0 (release) so there are no clicks at the boundaries.
   */
  private playTone(opts: ToneOptions): void {
    if (!this.ensureContext() || !this.ctx || !this.master) return;

    const {
      freq,
      type,
      startOffset,
      duration,
      peak = 0.2,
      attack = 0.005,
      release = 0.04,
      freqEnd,
    } = opts;

    const ctx = this.ctx;
    const start = ctx.currentTime + Math.max(0, startOffset);
    const end = start + Math.max(0.02, duration);

    // Oscillator
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    if (freqEnd !== undefined && freqEnd !== freq) {
      // Exponential pitch glide (sounds smoother than linear for glides).
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(1, freqEnd),
        end,
      );
    }

    // Gain envelope (attack → sustain → release to 0)
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), start + attack);
    // Hold until release, then ramp out.
    const releaseStart = Math.max(start + attack, end - release);
    gain.gain.setValueAtTime(Math.max(0.0002, peak), releaseStart);
    gain.gain.exponentialRampToValueAtTime(0.0001, end);

    // Connect & schedule
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(start);
    osc.stop(end + 0.02); // tiny tail so the release ramp completes cleanly
  }
}

// ---------------------------------------------------------------------------
// Default singleton instance
// ---------------------------------------------------------------------------

export const sounds = new SoundManager();

// ---------------------------------------------------------------------------
// React hook: useSoundFx
// ---------------------------------------------------------------------------

/**
 * React hook that keeps the global `sounds` singleton's `enabled` flag in
 * sync with a component-level boolean (e.g. a settings toggle) and returns
 * the singleton so components can call `sounds.correct()` etc.
 *
 * SSR-safe: it never touches `window` during render.
 *
 * @example
 * const sounds = useSoundFx(soundEnabled);
 * const onSubmit = () => { sounds.correct(); };
 */
export function useSoundFx(enabled: boolean): SoundManager {
  useEffect(() => {
    sounds.setEnabled(enabled);
    // Resume the context on the first user-gesture-driven effect run so
    // browsers that require a gesture don't keep audio suspended.
    if (enabled) {
      sounds.resume();
    }
  }, [enabled]);

  return sounds;
}
