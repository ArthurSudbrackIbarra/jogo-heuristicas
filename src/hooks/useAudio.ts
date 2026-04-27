import { useRef, useCallback, useEffect } from 'react';

interface UseAudioOptions {
  volume?: number;
  onEnd?: () => void;
}

interface AudioControls {
  play: (src: string) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  setVolume: (v: number) => void;
  isPlaying: boolean;
}

/**
 * Lightweight hook for narrator audio playback.
 *
 * Audio files live in /public/audio/.
 * Reference them by filename only: play('h01-bad-before.mp3')
 * If the file is missing the error is silently swallowed — the
 * text fallback in NarratorBox is always visible.
 */
export function useAudio({ volume = 0.9, onEnd }: UseAudioOptions = {}): AudioControls {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      isPlayingRef.current = false;
    }
  }, []);

  const play = useCallback(
    (src: string) => {
      // Stop any currently playing audio first
      stop();

      const audio = new Audio(src.startsWith('/') ? src : `/audio/${src}`);
      audio.volume = volume;
      audio.onended = () => {
        isPlayingRef.current = false;
        onEnd?.();
      };
      audio.onerror = () => {
        // File missing or unsupported — fail silently, text is shown anyway
        isPlayingRef.current = false;
      };

      audioRef.current = audio;
      isPlayingRef.current = true;

      // play() returns a Promise in modern browsers
      audio.play().catch(() => {
        isPlayingRef.current = false;
      });
    },
    [stop, volume, onEnd],
  );

  const pause = useCallback(() => {
    audioRef.current?.pause();
    isPlayingRef.current = false;
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      isPlayingRef.current = true;
    }
  }, []);

  const setVolume = useCallback((v: number) => {
    if (audioRef.current) audioRef.current.volume = Math.max(0, Math.min(1, v));
  }, []);

  return {
    play,
    stop,
    pause,
    resume,
    setVolume,
    get isPlaying() { return isPlayingRef.current; },
  };
}
