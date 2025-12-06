'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/8bit/button';
import { useAudioManager } from '@/lib/hooks/use-audio-manager';
import { notFound } from 'next/navigation';
import { allAssignments } from 'content-collections';
import { MDXContent } from '@content-collections/mdx/react';

export default function AssignmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { play } = useAudioManager({ preload: true });
  const [useNormalFont, setUseNormalFont] = useState(false);

  const assignment = allAssignments.find((a) => a.slug === slug);

  if (!assignment) {
    notFound();
  }

  const handleBackClick = () => {
    play('buttonClick');
    setTimeout(() => {
      router.push('/assignments');
    }, 100);
  };

  const toggleFont = () => {
    play('buttonClick');
    setUseNormalFont(!useNormalFont);
  };

  const fontClass = useNormalFont ? '' : 'retro';

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Top Navigation Bar */}
        <div className="mb-8 flex w-full items-center justify-between border-b-2 border-white pb-6">
          <Button
            font="retro"
            size="lg"
            onClick={handleBackClick}
            onMouseEnter={() => play('buttonHover')}
            className="bg-white text-black uppercase hover:bg-gray-200"
          >
            Terug
          </Button>

          <div className="mx-6 h-0.5 flex-1 bg-white" />

          <Button
            font="retro"
            size="lg"
            onClick={toggleFont}
            onMouseEnter={() => play('buttonHover')}
            className="bg-white text-black uppercase hover:bg-gray-200"
          >
            {useNormalFont ? 'Retro Font' : 'Standaard Font'}
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className={`${fontClass} mb-2 text-xs text-white/50 uppercase`}>LEVEL {assignment.level}</div>
          <h1 className={`${fontClass} glow-white mb-2 text-2xl text-white uppercase md:text-4xl`}>
            {assignment.title}
          </h1>
          <p className={`${fontClass} text-sm text-white/70`}>{assignment.subtitle}</p>
        </div>

        {/* Content Container */}
        <div className="relative mb-8 border-4 border-white bg-black/50 p-6 md:p-8">
          {/* Pixelated corner decorations */}
          <div className="absolute top-0 left-0 h-3 w-3 bg-white" />
          <div className="absolute top-0 right-0 h-3 w-3 bg-white" />
          <div className="absolute bottom-0 left-0 h-3 w-3 bg-white" />
          <div className="absolute right-0 bottom-0 h-3 w-3 bg-white" />

          <article className="prose prose-invert prose-sm max-w-none">
            <div className={`${fontClass} space-y-6 text-xs leading-relaxed text-white md:text-sm`}>
              <MDXContent code={assignment.mdx} />
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
