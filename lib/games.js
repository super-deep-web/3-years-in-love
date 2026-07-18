import { Heart, HeartPulse, Brain } from 'lucide-react';
import BalloonPopGame from '@/components/games/BalloonPopGame';
import CardPickGame from '@/components/games/CardPickGame';
import GiftBoxGame from '@/components/games/GiftBoxGame';

export const GAMES_META = {
    historia: {
        title: 'Explota burbujas',
        icon: Heart,
        rules: [
            'Toca las burbujas con corazones para conseguir puntos.',
            'Evita las burbujas bomba porque te pueden quitar 1 vida.',
            'Tienes 3 vidas. Llega a 30 puntos para ganar.',
            'La velocidad aumenta mientras más avanzas.',
        ],
        component: BalloonPopGame,
    },
    cartas: {
        title: 'Llena el corazón',
        icon: HeartPulse,
        rules: [
            'Toca el botón tan rápido como puedas.',
            'Cada toque llena un poco más el corazón.',
            'Complétalo antes de que se acabe el tiempo.',
            'Son 3 niveles, cada uno más difícil que el anterior.',
        ],
        component: CardPickGame,
    },
    motivos: {
        title: 'Memoriza la secuencia',
        icon: Brain,
        rules: [
            'Observa el orden en que se iluminan los íconos.',
            'Repite la secuencia tocando en el mismo orden.',
            'Si te equivocas, pierdes una vida y aparece una secuencia nueva.',
            'Tienes 3 vidas para completarlo.',
        ],
        component: GiftBoxGame,
    },
};