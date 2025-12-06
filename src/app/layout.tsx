import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { pressStart2P } from '@/styles/fonts';
import { StarBackground } from '@/components/star-background';
import '../styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PD3 Portfolio - 8-bit Edition',
  description: 'Personal Development 3 Portfolio - A gamified retro experience',
  keywords: ['portfolio', 'personal development', '8-bit', 'retro', 'gaming'],
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} ${pressStart2P.variable} bg-black antialiased`}>
        <StarBackground density={100} speed={0.5} />
        {children}
      </body>
    </html>
  );
}
