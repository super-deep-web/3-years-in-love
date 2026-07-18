import { notFound } from 'next/navigation';
import GameShell from '@/components/games/GameShell';
import { CORE_SECTIONS } from '@/lib/unlocks';

export function generateStaticParams() {
    return CORE_SECTIONS.map((key) => ({ key }));
}

export default async function JuegoPage({ params }) {
    const { key } = await params;

    if (!CORE_SECTIONS.includes(key)) {
        notFound();
    }

    return <GameShell gameKey={key} />;
}