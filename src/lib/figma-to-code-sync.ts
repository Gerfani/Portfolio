/**
 * Figma-to-Code Sync System
 * 
 * This module handles real-time synchronization of changes from Figma
 * back to the portfolio codebase, updating styles and components automatically.
 */

import { getFigmaFile, getFigmaNodes, FigmaNode, FigmaColor } from './figma-api';
import { DesignTokens } from './design-token-extractor';

// Sync configuration
export interface SyncConfig {
  fileKey: string;
  watchedNodes: string[];
  syncInterval: number; // milliseconds
  autoApply: boolean;
}

// Change detection interfaces
export interface DesignChange {
  nodeId: string;
  nodeName: string;
  changeType: 'color' | 'typography' | 'spacing' | 'effects' | 'layout';
  oldValue: any;
  newValue: any;
  cssProperty: string;
  affectedComponents: string[];
}

export interface SyncResult {
  changes: DesignChange[];
  appliedChanges: DesignChange[];
  errors: string[];
  timestamp: string;
}

/**
 * Convert Figma color to CSS format
 */
export const figmaColorToCss = (color: FigmaColor): string => {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a;
  
  return a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`;
};

/**
 * Convert Figma gradient to CSS gradient
 */
export const figmaGradientToCss = (gradient: any): string => {
  if (!gradient.gradientStops) return '';
  
  const stops = gradient.gradientStops.map((stop: any) => {
    const color = figmaColorToCss(stop.color);
    const position = Math.round(stop.position * 100);
    return `${color} ${position}%`;
  }).join(', ');
  
  return `linear-gradient(45deg, ${stops})`;
};

/**
 * Extract design tokens from Figma nodes
 */
export const extractTokensFromFigmaNodes = (nodes: Record<string, FigmaNode>): Partial<DesignTokens> => {
  const colors: any[] = [];
  const typography: any[] = [];
  const spacing: any[] = [];
  
  Object.entries(nodes).forEach(([nodeId, node]) => {
    // Extract colors from fills
    if (node.fills) {
      node.fills.forEach((fill, index) => {
        if (fill.type === 'SOLID' && fill.color) {
          colors.push({
            name: `${node.name.toLowerCase().replace(/\s+/g, '-')}-fill-${index}`,
            value: figmaColorToCss(fill.color),
            description: `Color from ${node.name}`,
            category: 'primary'
          });
        } else if (fill.type.includes('GRADIENT')) {
          colors.push({
            name: `${node.name.toLowerCase().replace(/\s+/g, '-')}-gradient-${index}`,
            value: figmaGradientToCss(fill),
            description: `Gradient from ${node.name}`,
            category: 'gradient'
          });
        }
      });
    }
    
    // Extract typography from text nodes
    if (node.type === 'TEXT' && node.style) {
      typography.push({
        name: node.name.toLowerCase().replace(/\s+/g, '-'),
        fontFamily: node.style.fontFamily || 'Inter',
        fontSize: `${node.style.fontSize || 16}px`,
        fontWeight: `${node.style.fontWeight || 400}`,
        lineHeight: node.style.lineHeightPx ? `${node.style.lineHeightPx}px` : '1.5',
        description: `Typography from ${node.name}`
      });
    }
    
    // Extract spacing from layout properties
    if (node.width && node.height) {
      spacing.push({
        name: `${node.name.toLowerCase().replace(/\s+/g, '-')}-width`,
        value: `${node.width}px`,
        description: `Width from ${node.name}`
      });
      spacing.push({
        name: `${node.name.toLowerCase().replace(/\s+/g, '-')}-height`,
        value: `${node.height}px`,
        description: `Height from ${node.name}`
      });
    }
  });
  
  return { colors, typography, spacing };
};

/**
 * Detect changes between current and new design tokens
 */
export const detectDesignChanges = (
  currentTokens: DesignTokens,
  newTokens: Partial<DesignTokens>
): DesignChange[] => {
  const changes: DesignChange[] = [];
  
  // Compare colors
  if (newTokens.colors) {
    newTokens.colors.forEach(newColor => {
      const currentColor = currentTokens.colors.find(c => c.name === newColor.name);
      if (currentColor && currentColor.value !== newColor.value) {
        changes.push({
          nodeId: newColor.name,
          nodeName: newColor.name,
          changeType: 'color',
          oldValue: currentColor.value,
          newValue: newColor.value,
          cssProperty: 'color',
          affectedComponents: getAffectedComponents(newColor.name)
        });
      }
    });
  }
  
  // Compare typography
  if (newTokens.typography) {
    newTokens.typography.forEach(newTypo => {
      const currentTypo = currentTokens.typography.find(t => t.name === newTypo.name);
      if (currentTypo) {
        if (currentTypo.fontSize !== newTypo.fontSize) {
          changes.push({
            nodeId: newTypo.name,
            nodeName: newTypo.name,
            changeType: 'typography',
            oldValue: currentTypo.fontSize,
            newValue: newTypo.fontSize,
            cssProperty: 'font-size',
            affectedComponents: getAffectedComponents(newTypo.name)
          });
        }
        if (currentTypo.fontWeight !== newTypo.fontWeight) {
          changes.push({
            nodeId: newTypo.name,
            nodeName: newTypo.name,
            changeType: 'typography',
            oldValue: currentTypo.fontWeight,
            newValue: newTypo.fontWeight,
            cssProperty: 'font-weight',
            affectedComponents: getAffectedComponents(newTypo.name)
          });
        }
      }
    });
  }
  
  return changes;
};

/**
 * Get components affected by a design token change
 */
const getAffectedComponents = (tokenName: string): string[] => {
  const componentMap: Record<string, string[]> = {
    'accent1': ['BubbleChart', 'Header', 'PersonaSection'],
    'accent2': ['BubbleChart', 'PersonaSection'],
    'accent3': ['BubbleChart', 'PersonaSection'],
    'main-gradient': ['BubbleChart'],
    'shimmer-gradient': ['Header', 'MainBubbleBio'],
    'heading-xl': ['MainBubbleBio'],
    'heading-lg': ['PersonaSection'],
    'body-md': ['InspirationCard', 'ExperienceTimeline']
  };
  
  return componentMap[tokenName] || [];
};

/**
 * Generate CSS updates from design changes
 */
export const generateCssUpdates = (changes: DesignChange[]): Record<string, string> => {
  const cssUpdates: Record<string, string> = {};
  
  changes.forEach(change => {
    const selector = getCssSelector(change.nodeId, change.changeType);
    if (selector) {
      cssUpdates[selector] = `${change.cssProperty}: ${change.newValue};`;
    }
  });
  
  return cssUpdates;
};

/**
 * Get CSS selector for a design token
 */
const getCssSelector = (tokenName: string, changeType: string): string | null => {
  const selectorMap: Record<string, string> = {
    'accent1': '.text-accent1, .bg-accent1, .border-accent1',
    'accent2': '.text-accent2, .bg-accent2, .border-accent2',
    'accent3': '.text-accent3, .bg-accent3, .border-accent3',
    'main-gradient': '.main-bubble',
    'shimmer-gradient': '.animate-shimmer',
    'heading-xl': '.text-3xl',
    'heading-lg': '.text-2xl',
    'body-md': '.text-base'
  };
  
  return selectorMap[tokenName] || null;
};

/**
 * Apply design changes to the codebase
 */
export const applyDesignChanges = async (changes: DesignChange[]): Promise<DesignChange[]> => {
  const appliedChanges: DesignChange[] = [];
  
  for (const change of changes) {
    try {
      // Generate CSS updates
      const cssUpdates = generateCssUpdates([change]);
      
      // In a real implementation, you would:
      // 1. Update CSS variables in globals.css
      // 2. Update Tailwind config if needed
      // 3. Update component styles
      // 4. Trigger hot reload
      
      console.log(`Applied change: ${change.cssProperty} = ${change.newValue}`);
      console.log('CSS Updates:', cssUpdates);
      
      appliedChanges.push(change);
    } catch (error) {
      console.error(`Failed to apply change for ${change.nodeId}:`, error);
    }
  }
  
  return appliedChanges;
};

/**
 * Start real-time sync with Figma
 */
export class FigmaSync {
  private config: SyncConfig;
  private intervalId: NodeJS.Timeout | null = null;
  private lastSyncTime: string = '';
  private currentTokens: DesignTokens | null = null;
  
  constructor(config: SyncConfig) {
    this.config = config;
  }
  
  /**
   * Start the sync process
   */
  async start(): Promise<void> {
    console.log('Starting Figma sync...');
    
    // Initial sync
    await this.performSync();
    
    // Set up interval for continuous sync
    this.intervalId = setInterval(async () => {
      await this.performSync();
    }, this.config.syncInterval);
  }
  
  /**
   * Stop the sync process
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    console.log('Figma sync stopped');
  }
  
  /**
   * Perform a single sync operation
   */
  private async performSync(): Promise<SyncResult> {
    try {
      // Fetch current state from Figma
      const figmaFile = await getFigmaFile(this.config.fileKey);
      const watchedNodes = await getFigmaNodes(this.config.fileKey, this.config.watchedNodes);
      
      // Extract tokens from Figma
      const newTokens = extractTokensFromFigmaNodes(watchedNodes.nodes);
      
      let changes: DesignChange[] = [];
      let appliedChanges: DesignChange[] = [];
      
      // Compare with current tokens if available
      if (this.currentTokens) {
        changes = detectDesignChanges(this.currentTokens, newTokens);
        
        // Apply changes if auto-apply is enabled
        if (this.config.autoApply && changes.length > 0) {
          appliedChanges = await applyDesignChanges(changes);
        }
      }
      
      // Update current tokens
      this.currentTokens = { ...this.currentTokens, ...newTokens } as DesignTokens;
      this.lastSyncTime = new Date().toISOString();
      
      const result: SyncResult = {
        changes,
        appliedChanges,
        errors: [],
        timestamp: this.lastSyncTime
      };
      
      if (changes.length > 0) {
        console.log('Figma sync detected changes:', result);
      }
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown sync error';
      console.error('Figma sync error:', errorMessage);
      
      return {
        changes: [],
        appliedChanges: [],
        errors: [errorMessage],
        timestamp: new Date().toISOString()
      };
    }
  }
  
  /**
   * Get the current sync status
   */
  getStatus(): { isRunning: boolean; lastSync: string; currentTokens: DesignTokens | null } {
    return {
      isRunning: this.intervalId !== null,
      lastSync: this.lastSyncTime,
      currentTokens: this.currentTokens
    };
  }
}
