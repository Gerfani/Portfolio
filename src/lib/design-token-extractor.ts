/**
 * Design Token Extractor
 * 
 * This module extracts design tokens from the current portfolio codebase
 * and prepares them for synchronization with Figma.
 */

import { portfolioData } from '@/config/portfolio-data';

// Design token interfaces
export interface ColorToken {
  name: string;
  value: string;
  description?: string;
  category: 'primary' | 'accent' | 'semantic' | 'gradient';
}

export interface TypographyToken {
  name: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  lineHeight?: string;
  letterSpacing?: string;
  description?: string;
}

export interface SpacingToken {
  name: string;
  value: string;
  description?: string;
}

export interface AnimationToken {
  name: string;
  duration: string;
  easing?: string;
  description?: string;
}

export interface ComponentToken {
  name: string;
  type: 'bubble' | 'card' | 'timeline' | 'header' | 'navigation';
  styles: Record<string, any>;
  animations?: AnimationToken[];
  description?: string;
}

export interface DesignTokens {
  colors: ColorToken[];
  typography: TypographyToken[];
  spacing: SpacingToken[];
  animations: AnimationToken[];
  components: ComponentToken[];
  metadata: {
    extractedAt: string;
    version: string;
    source: 'portfolio-code';
  };
}

/**
 * Extract color tokens from the current design system
 */
export const extractColorTokens = (): ColorToken[] => {
  const colors: ColorToken[] = [
    // Primary brand colors
    {
      name: 'accent1',
      value: '#6366F1',
      description: 'Primary indigo accent color',
      category: 'accent'
    },
    {
      name: 'accent2',
      value: '#8B5CF6',
      description: 'Secondary purple accent color',
      category: 'accent'
    },
    {
      name: 'accent3',
      value: '#EC4899',
      description: 'Tertiary pink accent color',
      category: 'accent'
    },
    {
      name: 'hover',
      value: '#4B5563',
      description: 'Hover state color',
      category: 'semantic'
    },
    
    // Persona colors (extracted from portfolio data)
    ...Object.entries(portfolioData).map(([key, persona]) => ({
      name: `persona-${key}`,
      value: persona.color,
      description: `Color for ${persona.title} persona`,
      category: 'primary' as const
    })),

    // Gradient definitions
    {
      name: 'main-gradient',
      value: 'linear-gradient(45deg, #3B82F6 0%, #60A5FA 40%, #8B5CF6 60%, #EC4899 100%)',
      description: 'Main bubble gradient',
      category: 'gradient'
    },
    {
      name: 'shimmer-gradient',
      value: 'linear-gradient(110deg, #fff 15%, #6366F1 35%, #8B5CF6 50%, #EC4899 65%, #fff 85%)',
      description: 'Shimmer animation gradient',
      category: 'gradient'
    }
  ];

  return colors;
};

/**
 * Extract typography tokens from the design system
 */
export const extractTypographyTokens = (): TypographyToken[] => {
  return [
    {
      name: 'heading-xl',
      fontFamily: 'var(--font-inter)',
      fontSize: '3rem',
      fontWeight: '700',
      lineHeight: '1.2',
      description: 'Extra large headings'
    },
    {
      name: 'heading-lg',
      fontFamily: 'var(--font-inter)',
      fontSize: '2rem',
      fontWeight: '600',
      lineHeight: '1.3',
      description: 'Large headings'
    },
    {
      name: 'heading-md',
      fontFamily: 'var(--font-inter)',
      fontSize: '1.5rem',
      fontWeight: '600',
      lineHeight: '1.4',
      description: 'Medium headings'
    },
    {
      name: 'body-lg',
      fontFamily: 'var(--font-inter)',
      fontSize: '1.125rem',
      fontWeight: '400',
      lineHeight: '1.6',
      description: 'Large body text'
    },
    {
      name: 'body-md',
      fontFamily: 'var(--font-inter)',
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.5',
      description: 'Medium body text'
    },
    {
      name: 'body-sm',
      fontFamily: 'var(--font-inter)',
      fontSize: '0.875rem',
      fontWeight: '400',
      lineHeight: '1.4',
      description: 'Small body text'
    },
    {
      name: 'mono',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.875rem',
      fontWeight: '400',
      lineHeight: '1.4',
      description: 'Monospace text'
    }
  ];
};

/**
 * Extract spacing tokens from the design system
 */
export const extractSpacingTokens = (): SpacingToken[] => {
  return [
    { name: 'xs', value: '0.25rem', description: '4px' },
    { name: 'sm', value: '0.5rem', description: '8px' },
    { name: 'md', value: '1rem', description: '16px' },
    { name: 'lg', value: '1.5rem', description: '24px' },
    { name: 'xl', value: '2rem', description: '32px' },
    { name: '2xl', value: '3rem', description: '48px' },
    { name: '3xl', value: '4rem', description: '64px' },
    { name: '4xl', value: '6rem', description: '96px' },
    { name: 'container-padding', value: '2rem', description: 'Container padding' },
    { name: 'section-spacing', value: '6rem', description: 'Section spacing' }
  ];
};

/**
 * Extract animation tokens from the design system
 */
export const extractAnimationTokens = (): AnimationToken[] => {
  return [
    {
      name: 'shimmer',
      duration: '8s',
      easing: 'linear',
      description: 'Shimmer text animation'
    },
    {
      name: 'fade-in',
      duration: '0.3s',
      easing: 'ease-out',
      description: 'Fade in animation'
    },
    {
      name: 'slide-in',
      duration: '0.3s',
      easing: 'ease-out',
      description: 'Slide in animation'
    },
    {
      name: 'hover-transition',
      duration: '0.2s',
      easing: 'ease-in-out',
      description: 'Hover state transition'
    },
    {
      name: 'bubble-glow',
      duration: '0.3s',
      easing: 'ease-out',
      description: 'Bubble glow effect'
    }
  ];
};

/**
 * Extract component tokens from the design system
 */
export const extractComponentTokens = (): ComponentToken[] => {
  return [
    {
      name: 'main-bubble',
      type: 'bubble',
      styles: {
        size: '200px',
        gradient: 'url(#gradient)',
        filter: 'url(#main-glow)',
        borderRadius: '50%'
      },
      animations: [
        { name: 'glow', duration: '0.3s', easing: 'ease-out' }
      ],
      description: 'Main interactive bubble component'
    },
    {
      name: 'persona-bubble',
      type: 'bubble',
      styles: {
        size: '120px',
        borderRadius: '50%',
        transition: 'all 0.3s ease'
      },
      description: 'Persona selection bubbles'
    },
    {
      name: 'inspiration-card',
      type: 'card',
      styles: {
        padding: '1.5rem',
        borderRadius: '0.5rem',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)'
      },
      description: 'Inspiration cards in persona sections'
    },
    {
      name: 'experience-timeline',
      type: 'timeline',
      styles: {
        borderLeft: '2px solid currentColor',
        paddingLeft: '1rem'
      },
      animations: [
        { name: 'slide-in', duration: '0.3s', easing: 'ease-out' }
      ],
      description: 'Experience timeline component'
    }
  ];
};

/**
 * Extract all design tokens from the current codebase
 */
export const extractAllDesignTokens = (): DesignTokens => {
  return {
    colors: extractColorTokens(),
    typography: extractTypographyTokens(),
    spacing: extractSpacingTokens(),
    animations: extractAnimationTokens(),
    components: extractComponentTokens(),
    metadata: {
      extractedAt: new Date().toISOString(),
      version: '1.0.0',
      source: 'portfolio-code'
    }
  };
};

/**
 * Convert design tokens to Figma-compatible format
 */
export const convertTokensToFigmaFormat = (tokens: DesignTokens) => {
  const figmaTokens = {
    colors: tokens.colors.map(color => ({
      name: color.name,
      value: color.value,
      type: 'color',
      description: color.description
    })),
    typography: tokens.typography.map(typo => ({
      name: typo.name,
      fontFamily: typo.fontFamily,
      fontSize: parseFloat(typo.fontSize),
      fontWeight: parseInt(typo.fontWeight),
      lineHeight: typo.lineHeight ? parseFloat(typo.lineHeight) : undefined,
      type: 'typography',
      description: typo.description
    })),
    spacing: tokens.spacing.map(space => ({
      name: space.name,
      value: parseFloat(space.value),
      type: 'spacing',
      description: space.description
    }))
  };

  return figmaTokens;
};
