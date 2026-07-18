"use client";

import { useMemo, useState } from "react";
import { Download, X } from "lucide-react";

const SIZE_VARIANTS = [
  "max-h-52 sm:max-h-56",
  "max-h-64 sm:max-h-72",
  "max-h-80 sm:max-h-96",
  "max-h-72 sm:max-h-80",
];

export default function AutoGallery({ images }) {
  const [selected, setSelected] = useState(null);
  const [closing, setClosing] = useState(false);

  const sizedImages = useMemo(
    () =>
      images.map((src) => ({
        src,
        sizeClass:
          SIZE_VARIANTS[Math.floor(Math.random() * SIZE_VARIANTS.length)],
      })),
    [images],
  );

  if (images.length === 0) return null;

  const openImage = (src) => {
    setClosing(false);
    setSelected(src);
  };

  const closeImage = () => {
    setClosing(true);
    setTimeout(() => {
      setSelected(null);
      setClosing(false);
    }, 250);
  };

  return (
    <>
      <div className="mx-auto max-w-4xl columns-2 gap-3 sm:columns-3 sm:gap-4">
        {sizedImages.map(({ src, sizeClass }, index) => (
          <button
            key={src}
            type="button"
            onClick={() => openImage(src)}
            style={{
              animationDelay: `${Math.min(index, 10) * 60}ms`,
              breakInside: "avoid",
            }}
            className="group mb-3 block w-full animate-fade-in-up overflow-hidden rounded-2xl shadow-glass sm:mb-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt="Foto de nuestros recuerdos"
              loading="lazy"
              className={`block w-full object-cover transition-transform duration-300 group-hover:scale-105 ${sizeClass}`}
            />
          </button>
        ))}
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Foto en vista completa"
          onClick={closeImage}
          className={`fixed inset-0 z-[70] flex flex-col items-center justify-center gap-4 bg-ink/70 px-6 py-10 backdrop-blur-sm transition-opacity duration-300 ${
            closing ? "opacity-0" : "opacity-100"
          }`}
        >
          <button
            type="button"
            onClick={closeImage}
            aria-label="Cerrar"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ivory text-ink/70 transition-colors hover:bg-coral hover:text-cream"
          >
            <X size={20} />
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selected}
            alt="Foto en vista completa"
            onClick={(e) => e.stopPropagation()}
            className={`max-h-[75vh] max-w-full rounded-2xl object-contain shadow-glass transition-transform duration-300 ${
              closing ? "scale-95" : "animate-photo-in"
            }`}
          />

          <a
            href={selected}
            download
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-cream shadow-glass transition-all duration-200 hover:bg-peach active:scale-95"
          >
            <Download size={16} />
            Descargar foto
          </a>
        </div>
      )}
    </>
  );
}
