import Image from 'next/image';
import { Heart } from 'lucide-react';

export default function PhotoCard({ photo }) {
  return (
    <figure className="group relative aspect-square overflow-hidden rounded-3xl shadow-glass">
      {photo.src ? (
        <Image
          src={photo.src}
          alt={photo.caption}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${photo.gradient}`}
        >
          <Heart size={32} className="text-cream/70" strokeWidth={1.5} />
        </div>
      )}

      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent px-3 pb-3 pt-8">
        <span className="text-xs font-semibold text-cream sm:text-sm">
          {photo.caption}
        </span>
      </figcaption>
    </figure>
  );
}
