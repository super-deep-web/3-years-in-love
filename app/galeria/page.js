import fs from 'fs';
import path from 'path';
import PageWrapper from '@/components/layout/PageWrapper';
import LockedGuard from '@/components/layout/LockedGuard';
import AutoGallery from '@/components/sections/AutoGallery';
import { SECTION_KEYS } from '@/lib/unlocks';
import { EXCLUDED_IMAGES } from '@/lib/gallery';

export const metadata = {
  title: 'Galería — 3 Años',
};

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'];

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getGalleryImages() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');

  let files = [];
  try {
    files = fs.readdirSync(imagesDir);
  } catch (error) {
    return [];
  }

  const filtered = files
    .filter((file) => !file.startsWith('.'))
    .filter((file) => IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase()))
    .filter((file) => !EXCLUDED_IMAGES.includes(file))
    .map((file) => `/images/${file}`);

  return shuffle(filtered);
}

export default function GaleriaPage() {
  const images = getGalleryImages();

  return (
    <LockedGuard sectionKey={SECTION_KEYS.GALERIA}>
      <PageWrapper className="px-6">
        <header className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-coral">
            nuestros recuerdos
          </p>
          <h1 className="font-display mt-2 text-3xl font-medium text-ink sm:text-5xl">
            Galería
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink/70 sm:text-base">
            {images.length > 0
              ? 'Toca cualquier foto para verla en grande y descargarla.'
              : 'Todavía no hay fotos aquí.'}
          </p>
        </header>

        <AutoGallery images={images} />
      </PageWrapper>
    </LockedGuard>
  );
}