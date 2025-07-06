/**
 * Code-to-Figma Converter
 * 
 * This module converts React components and design tokens from the portfolio
 * into Figma-compatible design elements and pushes them to Figma.
 */

import { extractAllDesignTokens, convertTokensToFigmaFormat, ComponentToken } from './design-token-extractor';
import { postFigmaNodes, createFigmaFile } from './figma-api';

// Figma node interfaces for creation
export interface FigmaCreateNode {
  type: string;
  name: string;
  fills?: FigmaFill[];
  strokes?: FigmaStroke[];
  effects?: FigmaEffect[];
  cornerRadius?: number;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  children?: FigmaCreateNode[];
  characters?: string;
  style?: any;
}

export interface FigmaFill {
  type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL';
  color?: { r: number; g: number; b: number; a: number };
  gradientStops?: Array<{
    color: { r: number; g: number; b: number; a: number };
    position: number;
  }>;
  gradientTransform?: number[][];
}

export interface FigmaStroke {
  type: 'SOLID';
  color: { r: number; g: number; b: number; a: number };
}

export interface FigmaEffect {
  type: 'DROP_SHADOW' | 'INNER_SHADOW' | 'LAYER_BLUR';
  color?: { r: number; g: number; b: number; a: number };
  offset?: { x: number; y: number };
  radius: number;
  spread?: number;
  visible: boolean;
  blendMode?: string;
}

/**
 * Convert hex color to Figma RGB format
 */
export const hexToFigmaRgb = (hex: string): { r: number; g: number; b: number; a: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return { r: 0, g: 0, b: 0, a: 1 };
  }
  
  return {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
    a: 1
  };
};

/**
 * Create Figma gradient from CSS gradient string
 */
export const createFigmaGradient = (gradientString: string): FigmaFill => {
  // Parse linear-gradient(45deg, #3B82F6 0%, #60A5FA 40%, #8B5CF6 60%, #EC4899 100%)
  const colorMatches = gradientString.match(/#[a-fA-F0-9]{6}/g) || [];
  const percentMatches = gradientString.match(/(\d+)%/g) || [];
  
  const gradientStops = colorMatches.map((color, index) => ({
    color: hexToFigmaRgb(color),
    position: percentMatches[index] ? parseInt(percentMatches[index]) / 100 : index / (colorMatches.length - 1)
  }));

  return {
    type: 'GRADIENT_LINEAR',
    gradientStops,
    gradientTransform: [[1, 0, 0], [0, 1, 0]] // Default transform
  };
};

/**
 * Convert main bubble component to Figma nodes
 */
export const createMainBubbleFigmaNode = (): FigmaCreateNode => {
  return {
    type: 'ELLIPSE',
    name: 'Main Bubble',
    width: 200,
    height: 200,
    x: 100,
    y: 100,
    fills: [createFigmaGradient('linear-gradient(45deg, #3B82F6 0%, #60A5FA 40%, #8B5CF6 60%, #EC4899 100%)')],
    effects: [
      {
        type: 'DROP_SHADOW',
        color: { r: 0.4, g: 0.4, b: 1, a: 0.3 },
        offset: { x: 0, y: 4 },
        radius: 15,
        spread: 0,
        visible: true,
        blendMode: 'NORMAL'
      }
    ],
    children: [
      {
        type: 'TEXT',
        name: 'Main Bubble Text',
        characters: '@',
        x: 85,
        y: 85,
        width: 30,
        height: 30,
        style: {
          fontFamily: 'Inter',
          fontSize: 24,
          fontWeight: 700,
          textAlignHorizontal: 'CENTER',
          textAlignVertical: 'CENTER'
        },
        fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 1 } }]
      }
    ]
  };
};

/**
 * Convert persona bubbles to Figma nodes
 */
export const createPersonaBubblesFigmaNodes = (): FigmaCreateNode[] => {
  const personas = [
    { name: 'Engineer', color: '#6366F1', emoji: '⚡', x: 350, y: 50 },
    { name: 'Educator', color: '#8B5CF6', emoji: '📚', x: 350, y: 200 },
    { name: 'Movement Builder', color: '#EC4899', emoji: '🌟', x: 350, y: 350 }
  ];

  return personas.map(persona => ({
    type: 'ELLIPSE',
    name: `${persona.name} Bubble`,
    width: 120,
    height: 120,
    x: persona.x,
    y: persona.y,
    fills: [{ type: 'SOLID', color: hexToFigmaRgb(persona.color) }],
    effects: [
      {
        type: 'DROP_SHADOW',
        color: hexToFigmaRgb(persona.color),
        offset: { x: 0, y: 2 },
        radius: 8,
        spread: 0,
        visible: true,
        blendMode: 'NORMAL'
      }
    ],
    children: [
      {
        type: 'TEXT',
        name: `${persona.name} Emoji`,
        characters: persona.emoji,
        x: persona.x + 45,
        y: persona.y + 45,
        width: 30,
        height: 30,
        style: {
          fontSize: 20,
          textAlignHorizontal: 'CENTER',
          textAlignVertical: 'CENTER'
        }
      }
    ]
  }));
};

/**
 * Convert inspiration card to Figma node
 */
export const createInspirationCardFigmaNode = (x: number, y: number): FigmaCreateNode => {
  return {
    type: 'RECTANGLE',
    name: 'Inspiration Card',
    width: 300,
    height: 200,
    x,
    y,
    cornerRadius: 8,
    fills: [
      {
        type: 'SOLID',
        color: { r: 0, g: 0, b: 0, a: 0.6 }
      }
    ],
    effects: [
      {
        type: 'LAYER_BLUR',
        radius: 8,
        visible: true
      },
      {
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.1 },
        offset: { x: 0, y: 4 },
        radius: 12,
        spread: 0,
        visible: true
      }
    ],
    children: [
      {
        type: 'ELLIPSE',
        name: 'Avatar Placeholder',
        width: 48,
        height: 48,
        x: x + 24,
        y: y + 24,
        fills: [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5, a: 1 } }]
      },
      {
        type: 'TEXT',
        name: 'Card Title',
        characters: 'Inspiration Name',
        x: x + 90,
        y: y + 24,
        width: 180,
        height: 24,
        style: {
          fontFamily: 'Inter',
          fontSize: 16,
          fontWeight: 600,
          textAlignHorizontal: 'LEFT'
        },
        fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 1 } }]
      },
      {
        type: 'TEXT',
        name: 'Card Subtitle',
        characters: 'Role/Position',
        x: x + 90,
        y: y + 52,
        width: 180,
        height: 20,
        style: {
          fontFamily: 'Inter',
          fontSize: 14,
          fontWeight: 400,
          textAlignHorizontal: 'LEFT'
        },
        fills: [{ type: 'SOLID', color: { r: 0.7, g: 0.7, b: 0.7, a: 1 } }]
      }
    ]
  };
};

/**
 * Create a complete portfolio design frame in Figma
 */
export const createPortfolioDesignFrame = (): FigmaCreateNode => {
  const inspirationCards = [
    createInspirationCardFigmaNode(50, 400),
    createInspirationCardFigmaNode(400, 400),
    createInspirationCardFigmaNode(750, 400)
  ];

  return {
    type: 'FRAME',
    name: 'Portfolio Design System',
    width: 1200,
    height: 800,
    x: 0,
    y: 0,
    fills: [{ type: 'SOLID', color: { r: 0.02, g: 0.02, b: 0.02, a: 1 } }], // Dark background
    children: [
      createMainBubbleFigmaNode(),
      ...createPersonaBubblesFigmaNodes(),
      ...inspirationCards,
      // Add title
      {
        type: 'TEXT',
        name: 'Portfolio Title',
        characters: 'Ghazal Erfani Portfolio Design System',
        x: 50,
        y: 50,
        width: 500,
        height: 40,
        style: {
          fontFamily: 'Inter',
          fontSize: 28,
          fontWeight: 700,
          textAlignHorizontal: 'LEFT'
        },
        fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 1 } }]
      }
    ]
  };
};

/**
 * Push current portfolio design to Figma
 */
export const pushDesignToFigma = async (fileKey?: string): Promise<any> => {
  try {
    // Extract design tokens
    const tokens = extractAllDesignTokens();
    console.log('Extracted design tokens:', tokens);

    // Create the main design frame
    const portfolioFrame = createPortfolioDesignFrame();

    // If no file key provided, create a new file
    let targetFileKey = fileKey;
    if (!targetFileKey) {
      const newFile = await createFigmaFile('Ghazal Erfani Portfolio - Generated from Code');
      targetFileKey = newFile.key;
      console.log('Created new Figma file:', newFile);
    }

    // Push the design to Figma
    const result = await postFigmaNodes(targetFileKey, [portfolioFrame]);
    
    return {
      success: true,
      fileKey: targetFileKey,
      tokens,
      figmaResult: result,
      message: 'Portfolio design successfully pushed to Figma!'
    };
  } catch (error) {
    console.error('Error pushing design to Figma:', error);
    throw error;
  }
};

/**
 * Create color palette frame in Figma
 */
export const createColorPaletteFigmaFrame = (): FigmaCreateNode => {
  const tokens = extractAllDesignTokens();
  const colorSwatches = tokens.colors.map((color, index) => ({
    type: 'RECTANGLE',
    name: color.name,
    width: 100,
    height: 100,
    x: (index % 6) * 120 + 50,
    y: Math.floor(index / 6) * 120 + 100,
    cornerRadius: 8,
    fills: color.category === 'gradient' 
      ? [createFigmaGradient(color.value)]
      : [{ type: 'SOLID', color: hexToFigmaRgb(color.value) }],
    children: [
      {
        type: 'TEXT',
        name: `${color.name} Label`,
        characters: color.name,
        x: (index % 6) * 120 + 50,
        y: Math.floor(index / 6) * 120 + 210,
        width: 100,
        height: 20,
        style: {
          fontFamily: 'Inter',
          fontSize: 12,
          fontWeight: 500,
          textAlignHorizontal: 'CENTER'
        },
        fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 1 } }]
      }
    ]
  }));

  return {
    type: 'FRAME',
    name: 'Color Palette',
    width: 800,
    height: 600,
    x: 0,
    y: 0,
    fills: [{ type: 'SOLID', color: { r: 0.05, g: 0.05, b: 0.05, a: 1 } }],
    children: [
      {
        type: 'TEXT',
        name: 'Palette Title',
        characters: 'Portfolio Color Palette',
        x: 50,
        y: 30,
        width: 300,
        height: 40,
        style: {
          fontFamily: 'Inter',
          fontSize: 24,
          fontWeight: 700
        },
        fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 1 } }]
      },
      ...colorSwatches
    ]
  };
};
