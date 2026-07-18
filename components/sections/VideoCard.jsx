"use client";

import { useState } from "react";
import { Play } from "lucide-react";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export default function VideoCard({ publicId, title }) {
  const [loaded, setLoaded] = useState(false);

  const videoUrl = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto/${publicId}.mp4`;
  const thumbnailUrl = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_0/${publicId}.jpg`;

  return (
    <div className="mx-auto w-full max-w-lg overflow-hidden rounded-3xl shadow-glass">
      <div className="relative aspect-video w-full bg-ink">
        {loaded ? (
          <video
            src={videoUrl}
            controls
            autoPlay
            className="absolute inset-0 h-full w-full object-contain"
          />
        ) : (
          <button
            type="button"
            onClick={() => setLoaded(true)}
            aria-label={`Reproducir video: ${title}`}
            className="group absolute inset-0 flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-0 bg-ink/30 transition-colors duration-200 group-hover:bg-ink/40" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-coral text-cream shadow-glass transition-transform duration-200 group-hover:scale-110">
              <Play size={26} className="ml-1 fill-current" />
            </span>
          </button>
        )}
      </div>

      {title && (
        <div className="glass px-5 py-4 text-center">
          <p className="font-display text-lg font-medium text-ink">{title}</p>
        </div>
      )}
    </div>
  );
}
