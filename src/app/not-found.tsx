'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/8bit/button';
import { useAudioManager } from '@/lib/hooks/use-audio-manager';
import { Home } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();
  const { play } = useAudioManager({ preload: true });

  const handleHomeClick = () => {
    play('buttonClick');
    setTimeout(() => {
      router.push('/');
    }, 100);
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="retro glow-red animate-pulse text-8xl text-white md:text-9xl">404</div>
        <h1 className="retro text-2xl text-white md:text-4xl">GAME OVER</h1>
        <p className="retro max-w-md text-sm text-white/70 md:text-base">
          THE PAGE YOU ARE LOOKING FOR
          <br />
          DOES NOT EXIST
        </p>
        <div className="mt-8">
          <Button
            font="retro"
            size="lg"
            onClick={handleHomeClick}
            onMouseEnter={() => play('buttonHover')}
            className="flex items-center gap-2 bg-white text-black hover:bg-gray-200"
          >
            <Home className="h-4 w-4" />
            RETURN HOME
          </Button>
        </div>
      </div>
    </main>
  );
}
