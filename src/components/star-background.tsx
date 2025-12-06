'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

type StarBackgroundProps = {
  density?: number;
  speed?: number;
  className?: string;
};

type Star = {
  x: number;
  y: number;
  size: number;
  speed: number;
  layer: number;
};

export function StarBackground({ density = 100, speed = 1, className = '' }: StarBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize stars
    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < density; i++) {
        const layer = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + (layer === 1 ? 0.5 : layer === 2 ? 1 : 1.5),
          speed: (layer / 3) * speed,
          layer,
        });
      }
    };
    initStars();

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        // Draw star as a pixel
        const opacity = star.layer === 1 ? 0.3 : star.layer === 2 ? 0.6 : 1;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;

        // Draw pixelated star
        const pixelSize = Math.ceil(star.size);
        ctx.fillRect(Math.floor(star.x), Math.floor(star.y), pixelSize, pixelSize);

        // Add a small twinkle effect randomly
        if (Math.random() > 0.99) {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
          ctx.fillRect(Math.floor(star.x) - 1, Math.floor(star.y), 1, pixelSize);
          ctx.fillRect(Math.floor(star.x) + pixelSize, Math.floor(star.y), 1, pixelSize);
        }

        star.y += star.speed;

        if (star.y > canvas.height) {
          star.y = -star.size;
          star.x = Math.random() * canvas.width;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // clean up on unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [density, speed]);

  return (
    <canvas ref={canvasRef} className={cn('fixed inset-0 -z-10', className)} style={{ imageRendering: 'pixelated' }} />
  );
}
