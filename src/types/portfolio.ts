export interface PersonaInspiration {
  name: string;
  role: string;
  image: string;
  lessons: string[];
}

export interface Experience {
  title: string;
  description: string;
  date: string;
  tags: string[];
  link?: string;
  videoUrl?: string;
  imageUrl?: string;
  pdfUrl?: string;
}

export interface Persona {
  id: PersonaId;
  title: string;
  emoji: string;
  color: string;
  description: string;
  inspirations: PersonaInspiration[];
  experiences: Experience[];
}

export type PersonaId = 'engineer' | 'educator' | 'movement-builder';

export interface DevRelPillar {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
} 