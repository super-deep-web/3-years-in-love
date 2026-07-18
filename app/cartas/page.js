import { Youtube } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import LetterCard from '@/components/sections/LetterCard';
import Blob from '@/components/ui/Blob';
import LockedGuard from '@/components/layout/LockedGuard';
import { SECTION_KEYS } from '@/lib/unlocks';
import { letters, songLink } from '@/lib/data';

export const metadata = {
  title: 'Cartas - 3 Años',
};

export default function CartasPage() {
  return (
    <LockedGuard sectionKey={SECTION_KEYS.CARTAS}>
      <PageWrapper className="px-6">
        <Blob className="-left-20 top-10" size={240} color="bg-apricot" opacity="opacity-30" />

        <header className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-coral">
            Felices 3 añitos
          </p>
          <h1 className="font-display mt-2 text-3xl font-medium text-ink sm:text-5xl">
            Cartas para ti mi amor
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink/70 sm:text-base">
            Toca un sobre para abrirlo.
          </p>
        </header>

        <div className="mx-auto flex max-w-lg flex-col gap-4">
        {letters.map((letter) => (
          <LetterCard key={letter.id} letter={letter} />
        ))}

        <a
          href={songLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center mt-4 gap-2 rounded-full bg-coral px-6 py-3.5 text-sm font-semibold text-cream shadow-glass transition-all duration-200 hover:bg-peach active:scale-95"
        >
          <Youtube size={18} />
          {songLink.label}
        </a>
      </div>
    </PageWrapper>
    </LockedGuard>
  );
}