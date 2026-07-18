import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import BottomNav from '@/components/layout/BottomNav';
import { UnlocksProvider } from '@/components/providers/UnlocksProvider';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata = {
  title: '3 Años - Mi Princesita',
  description: 'Un pequeño rincón en internet dedicado a nosotros.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#fb9361',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="font-body antialiased min-h-screen bg-cream">
        <UnlocksProvider>
          <main className="relative min-h-screen">{children}</main>
          <BottomNav />
        </UnlocksProvider>
      </body>
    </html>
  );
}
