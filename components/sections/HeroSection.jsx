import { Heart, Sparkles } from "lucide-react";
import Blob from "@/components/ui/Blob";
import TimeCounter from "@/components/sections/TimeCounter";
import MiniGameLauncher from "@/components/sections/MiniGameLauncher";
import { couple } from "@/lib/data";

export default function HeroSection() {
  return (
    <section className="relative z-10 flex flex-col items-center px-6 text-center">
      <Blob
        className="-left-16 -top-10"
        size={220}
        color="bg-sage"
        opacity="opacity-40"
      />
      <Blob
        className="-right-20 top-24"
        size={280}
        color="bg-apricot"
        animate="animate-float-slow"
      />
      <Blob
        className="left-1/2 top-[420px] -translate-x-1/2"
        size={200}
        color="bg-peach"
        opacity="opacity-30"
      />

      <span className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-terracotta animate-fade-in-up">
        <Heart size={14} />
        para {couple.partnerName}
      </span>

      <h1 className="font-display max-w-xl text-4xl font-medium leading-[1.1] text-ink animate-fade-in-up sm:text-6xl">
        Tres años juntitos <br />
        <span className="italic text-coral">llenos de amor</span>
      </h1>

      <p className="mt-5 max-w-md font-body text-base text-ink/70 animate-fade-in-up sm:text-lg">
        Tengo algo especial preparado para ti mi amor, espero que te llegue
        gustar muchísimo, que encuentres las sorpresas que tengo para ti, te amo
        muchísimo.
      </p>

      {/* GIF animado. El archivo debe estar en: public/images/hero.gif
          Si usas otro nombre, cambia el "src" de abajo. */}
      <div className="relative mt-8 aspect-square w-40 animate-fade-in-up overflow-hidden rounded-3xl shadow-glass sm:w-48">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero.gif"
          alt="Nosotros"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-10 w-full max-w-md animate-fade-in-up">
        <TimeCounter />
        <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-ink/50">
          juntos desde el 19 de julio de 2023
        </p>
      </div>

      <MiniGameLauncher />
    </section>
  );
}
