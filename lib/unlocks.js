import { BookHeart, Mail, HeartHandshake, Image as ImageIcon } from 'lucide-react';

export const SECTION_KEYS = {
    HISTORIA: 'historia',
    CARTAS: 'cartas',
    MOTIVOS: 'motivos',
    GALERIA: 'galeria',
};

export const CORE_SECTIONS = [
    SECTION_KEYS.HISTORIA,
    SECTION_KEYS.CARTAS,
    SECTION_KEYS.MOTIVOS,
];

export const SECTION_META = {
    [SECTION_KEYS.HISTORIA]: { label: 'Recuerdos', href: '/historia', icon: BookHeart },
    [SECTION_KEYS.CARTAS]: { label: 'Cartas', href: '/cartas', icon: Mail },
    [SECTION_KEYS.MOTIVOS]: { label: 'Motivos', href: '/motivos', icon: HeartHandshake },
    [SECTION_KEYS.GALERIA]: { label: 'Galería', href: '/galeria', icon: ImageIcon },
};

export const STORAGE_KEY = 'beatriz-unlocks-v1';

export const DEFAULT_UNLOCKS = {
    [SECTION_KEYS.HISTORIA]: false,
    [SECTION_KEYS.CARTAS]: false,
    [SECTION_KEYS.MOTIVOS]: false,
    [SECTION_KEYS.GALERIA]: false,
};