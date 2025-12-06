'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface AudioManagerOptions {
  volume?: number;
  preload?: boolean;
}

interface SoundMap {
  [key: string]: HTMLAudioElement;
}

const SOUND_FILES = {
  buttonClick: '/sounds/button-click.wav',
  buttonHover: '/sounds/button-hover.wav',
  navigation: '/sounds/navigation.wav',
  startGame: '/sounds/start-game.wav',
};

export type SoundName = keyof typeof SOUND_FILES;

export function useAudioManager(options: AudioManagerOptions = {}) {
  const { volume = 0.5, preload = true } = options;
  const soundsRef = useRef<SoundMap>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (preload) {
      // Preload all sounds
      Object.entries(SOUND_FILES).forEach(([key, path]) => {
        const audio = new Audio(path);
        audio.volume = volume;
        audio.preload = 'auto';
        soundsRef.current[key] = audio;
      });

      // Check if at least one sound is ready
      const firstSound = Object.values(soundsRef.current)[0];
      if (firstSound) {
        firstSound.addEventListener('canplaythrough', () => {
          setIsLoaded(true);
        });
      }
    }

    // Capture current sounds reference for cleanup
    const currentSounds = soundsRef.current;

    return () => {
      // Cleanup - use captured reference
      Object.values(currentSounds).forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
    };
  }, [preload, volume]);

  const play = useCallback(
    (soundName: SoundName) => {
      if (isMuted) return;

      try {
        const audio = soundsRef.current[soundName];

        if (!audio) {
          // Lazy load if not preloaded
          const newAudio = new Audio(SOUND_FILES[soundName]);
          newAudio.volume = volume;
          soundsRef.current[soundName] = newAudio;

          // Reset to start and play
          newAudio.currentTime = 0;
          newAudio.play().catch((error) => {
            console.warn(`Failed to play sound: ${soundName}`, error);
          });
        } else {
          // Reset to start and play
          audio.currentTime = 0;
          audio.play().catch((error) => {
            console.warn(`Failed to play sound: ${soundName}`, error);
          });
        }
      } catch (error) {
        console.warn(`Error playing sound: ${soundName}`, error);
      }
    },
    [volume, isMuted],
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    Object.values(soundsRef.current).forEach((audio) => {
      audio.volume = clampedVolume;
    });
  }, []);

  return {
    play,
    isLoaded,
    isMuted,
    toggleMute,
    setVolume,
  };
}
