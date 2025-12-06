'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/8bit/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/8bit/card';
import { useAudioManager } from '@/lib/hooks/use-audio-manager';
import { ChevronLeft } from 'lucide-react';
import { allAssignments } from 'content-collections';

export default function AssignmentsPage() {
  const router = useRouter();
  const { play } = useAudioManager({ preload: true });

  const handleAssignmentClick = (slug: string) => {
    play('navigation');
    setTimeout(() => {
      router.push(`/assignments/${slug}`);
    }, 100);
  };

  const handleBackClick = () => {
    play('buttonClick');
    setTimeout(() => {
      router.push('/');
    }, 100);
  };

  return (
    <main className="min-h-screen px-4 py-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="retro glow-white mb-4 text-2xl text-white uppercase md:text-4xl">Kies de opdracht</h1>
          <p className="retro text-xs text-white/70 uppercase md:text-sm">Kies je eigen missie</p>
        </div>

        {/* Assignment Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allAssignments
            .sort((a, b) => a.level - b.level)
            .map((assignment) => (
              <Card
                key={assignment.slug}
                onClick={() => handleAssignmentClick(assignment.slug)}
                onMouseEnter={() => play('buttonHover')}
                className="group cursor-pointer transition-all duration-100 hover:scale-105 active:scale-95"
              >
                <CardHeader>
                  <CardDescription className="text-center text-sm text-white/50">
                    LEVEL {assignment.level}
                  </CardDescription>
                  <CardTitle className="text-center text-lg text-white transition-colors group-hover:text-yellow-300">
                    {assignment.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-xs text-white/70">{assignment.subtitle}</p>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <Button
            font="retro"
            size="lg"
            onClick={handleBackClick}
            onMouseEnter={() => play('buttonHover')}
            className="flex items-center gap-2 bg-white text-black hover:bg-gray-200"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="uppercase">Terug</span>
          </Button>
        </div>
      </div>
    </main>
  );
}
