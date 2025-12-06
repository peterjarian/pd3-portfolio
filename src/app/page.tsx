'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/8bit/button';
import { useAudioManager } from '@/lib/hooks/use-audio-manager';

export default function Home() {
  const router = useRouter();
  const { play } = useAudioManager({ preload: true });

  const handleStartGame = () => {
    play('startGame');
    setTimeout(() => {
      router.push('/assignments');
    }, 100);
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="flex flex-col items-center gap-8 text-center">
        <h1 className="retro glow-white animate-pulse text-4xl text-white uppercase md:text-6xl">
          {'PD3 Portfolio'.split('').map((char, i) => (
            <span key={i} className="inline-block cursor-pointer transition-colors hover:text-yellow-300">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
        <p className="retro max-w-md text-sm text-white/80 uppercase md:text-base">Personal Development</p>
        <div className="mt-8">
          <Button
            font="retro"
            size="lg"
            onClick={handleStartGame}
            className="bg-white px-8 py-6 text-lg uppercase hover:bg-gray-200 md:text-xl"
          >
            Begin
          </Button>
        </div>
        <p className="retro mt-8 text-xs text-white/50 uppercase">Druk op de knop om verder te gaan</p>
      </div>
    </main>
  );
}
