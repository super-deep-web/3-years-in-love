import PageWrapper from '@/components/layout/PageWrapper';
import VideoCard from '@/components/sections/VideoCard';
import Blob from '@/components/ui/Blob';
import LockedGuard from '@/components/layout/LockedGuard';
import { SECTION_KEYS } from '@/lib/unlocks';
import { motivosVideos, couple } from '@/lib/data';

export const metadata = {
  title: 'Motivos - 3 Años',
};

export default function MotivosPage() {
  return (
    <LockedGuard sectionKey={SECTION_KEYS.MOTIVOS}>
      <PageWrapper className="px-6">
        <Blob className="-right-16 top-16" size={200} color="bg-sage" opacity="opacity-30" />

        <header className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-coral">
            solo algunos de tantos
          </p>
          <h1 className="font-display mt-2 text-3xl font-medium text-ink sm:text-5xl">
            Por qué te amo, {couple.partnerName}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink/70 sm:text-base">
            Podría escribir muchos más, pero empecemos por estos.
          </p>
        </header>

        <div className="mx-auto flex max-w-lg flex-col gap-6">
          {motivosVideos.map((video) => (
            <VideoCard
              key={video.publicId}
              publicId={video.publicId}
              title={video.title}
            />
          ))}
        </div>
      </PageWrapper>
    </LockedGuard>
  );
}