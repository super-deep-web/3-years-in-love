import { Music2 } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import TimelineItem from '@/components/sections/TimelineItem';
import TimelinePhotoReveal from '@/components/sections/TimelinePhotoReveal';
import Blob from '@/components/ui/Blob';
import LockedGuard from '@/components/layout/LockedGuard';
import { SECTION_KEYS } from '@/lib/unlocks';
import { timeline, historiaLink } from '@/lib/data';

export const metadata = {
  title: 'Recuerdos - 3 Años',
};

export default function HistoriaPage() {
  return (
    <LockedGuard sectionKey={SECTION_KEYS.HISTORIA}>
      <PageWrapper className="px-6">
        <Blob className="-right-16 top-0" size={220} color="bg-sage" opacity="opacity-30" />

        <header className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-coral">
            Felices 3 añitos
          </p>
          <h1 className="font-display mt-2 text-3xl font-medium text-ink sm:text-5xl">
            Nuestros recuerdos
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink/70 sm:text-base">
            Desde aquel momento hasta ahora, cada instante ha sido perfecto.
          </p>
        </header>

        <div className="mx-auto max-w-lg">
          {timeline.map((item, index) => (
            <div key={item.date}>
              <TimelineItem item={item} isLast={index === timeline.length - 1} />
              <TimelinePhotoReveal photo={item.photo} />
            </div>
          ))}


          <a
            href={historiaLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-3.5 text-sm font-semibold text-cream shadow-glass transition-all duration-200 hover:bg-peach active:scale-95"
          >
            <Music2 size={18} />
            {historiaLink.label}
          </a>
        </div>
      </PageWrapper>
    </LockedGuard>
  );
}