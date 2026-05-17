import { useRef, useCallback, useEffect, useState } from "react";

interface UseAudioOptions {
  volume?: number;
  onEnd?: () => void;
  startPlaying?: boolean;
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
 * Audio files live in /public/audios/{lang}/.
 * Reference them as relative paths, e.g. 'audios/pt/H1BAPT.mp3'.
 * The Vite BASE_URL is prepended automatically so GitHub Pages deployments work.
 * If the file is missing the error is silently swallowed — the
 * text fallback in NarratorBox is always visible.
 */
export function useAudio({
  volume = 0.9,
  onEnd,
  startPlaying = false,
}: UseAudioOptions = {}): AudioControls {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(startPlaying);

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
      audioRef.current = null;
      setIsPlaying(false);
    }
  }, []);

  const play = useCallback(
    (src: string) => {
      stop();

      const base = import.meta.env.BASE_URL.replace(/\/$/, "");
      const resolvedSrc = src.startsWith("http")
        ? src
        : `${base}/${src.replace(/^\//, "")}`;
      const audio = new Audio(resolvedSrc);
      audio.volume = volume;
      // Guard every async callback: if this audio has already been replaced
      // (e.g. by StrictMode's double-effect or a scenario change), ignore it.
      audio.onended = () => {
        if (audioRef.current === audio) {
          setIsPlaying(false);
          onEnd?.();
        }
      };
      audio.onerror = () => {
        if (audioRef.current === audio) setIsPlaying(false);
      };

      audioRef.current = audio;
      setIsPlaying(true);

      audio.play().catch(() => {
        if (audioRef.current === audio) setIsPlaying(false);
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
