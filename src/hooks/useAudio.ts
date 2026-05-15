import { useRef, useCallback, useEffect, useState } from "react";

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
export function useAudio({
  volume = 0.9,
  onEnd,
}: UseAudioOptions = {}): AudioControls {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
      setIsPlaying(false);
    }
  }, []);

  const play = useCallback(
    (src: string) => {
      stop();

      const audio = new Audio(src.startsWith("/") ? src : `/audio/${src}`);
      audio.volume = volume;
      audio.onended = () => {
        setIsPlaying(false);
        onEnd?.();
      };
      audio.onerror = () => {
        // File missing or unsupported — fail silently, text is shown anyway
        setIsPlaying(false);
      };

      audioRef.current = audio;
      setIsPlaying(true);

      audio.play().catch(() => {
        setIsPlaying(false);
      });
    },
    [stop, volume, onEnd],
  );

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, []);

  const setVolume = useCallback((v: number) => {
    if (audioRef.current) audioRef.current.volume = Math.max(0, Math.min(1, v));
  }, []);

  return { play, stop, pause, resume, setVolume, isPlaying };
}
