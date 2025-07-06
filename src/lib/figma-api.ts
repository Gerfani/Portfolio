/**
 * Figma API Utilities
 * 
 * This module provides utility functions for interacting with the Figma API.
 * It includes functions for fetching files, nodes, images, and other design data.
 */

import axios, { AxiosResponse } from 'axios';
import { figmaConfig, validateFigmaConfig } from '@/config/figma';

// Type definitions for Figma API responses
export interface FigmaFile {
  document: FigmaNode;
  components: Record<string, FigmaComponent>;
  schemaVersion: number;
  styles: Record<string, FigmaStyle>;
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  role: string;
  editorType: string;
  linkAccess: string;
}

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  backgroundColor?: FigmaColor;
  fills?: FigmaFill[];
  strokes?: FigmaStroke[];
  strokeWeight?: number;
  strokeAlign?: string;
  cornerRadius?: number;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  rotation?: number;
  opacity?: number;
  blendMode?: string;
  isMask?: boolean;
  effects?: FigmaEffect[];
  characters?: string;
  style?: FigmaTextStyle;
}

export interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface FigmaFill {
  type: string;
  color?: FigmaColor;
  gradientStops?: FigmaGradientStop[];
  gradientTransform?: number[][];
}

export interface FigmaStroke {
  type: string;
  color?: FigmaColor;
}

export interface FigmaEffect {
  type: string;
  color?: FigmaColor;
  offset?: { x: number; y: number };
  radius?: number;
  spread?: number;
  visible?: boolean;
  blendMode?: string;
}

export interface FigmaTextStyle {
  fontFamily: string;
  fontPostScriptName: string;
  fontWeight: number;
  fontSize: number;
  lineHeightPx: number;
  letterSpacing: number;
  textAlignHorizontal: string;
  textAlignVertical: string;
}

export interface FigmaGradientStop {
  color: FigmaColor;
  position: number;
}

export interface FigmaComponent {
  key: string;
  name: string;
  description: string;
  componentSetId?: string;
  documentationLinks: any[];
}

export interface FigmaStyle {
  key: string;
  name: string;
  description: string;
  styleType: string;
}

export interface FigmaImageResponse {
  images: Record<string, string>;
}

/**
 * Create axios instance with Figma API configuration
 */
const createFigmaApiClient = () => {
  if (!validateFigmaConfig()) {
    throw new Error('Invalid Figma configuration');
  }

  return axios.create({
    baseURL: figmaConfig.baseURL,
    headers: figmaConfig.headers,
    timeout: figmaConfig.timeout,
  });
};

/**
 * Fetch a Figma file by its key
 * @param fileKey - The Figma file key
 * @returns Promise with file data
 */
export const getFigmaFile = async (fileKey?: string): Promise<FigmaFile> => {
  const client = createFigmaApiClient();
  const key = fileKey || figmaConfig.defaultFileKey;
  
  if (!key) {
    throw new Error('File key is required');
  }

  try {
    const response: AxiosResponse<FigmaFile> = await client.get(`/files/${key}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Figma file:', error);
    throw error;
  }
};

/**
 * Fetch specific nodes from a Figma file
 * @param fileKey - The Figma file key
 * @param nodeIds - Array of node IDs to fetch
 * @returns Promise with nodes data
 */
export const getFigmaNodes = async (
  fileKey: string,
  nodeIds: string[]
): Promise<{ nodes: Record<string, FigmaNode> }> => {
  const client = createFigmaApiClient();
  
  try {
    const response = await client.get(`/files/${fileKey}/nodes`, {
      params: {
        ids: nodeIds.join(','),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Figma nodes:', error);
    throw error;
  }
};

/**
 * Get image URLs for specific nodes
 * @param fileKey - The Figma file key
 * @param nodeIds - Array of node IDs to get images for
 * @param format - Image format (jpg, png, svg, pdf)
 * @param scale - Image scale (1, 2, 4)
 * @returns Promise with image URLs
 */
export const getFigmaImages = async (
  fileKey: string,
  nodeIds: string[],
  format: 'jpg' | 'png' | 'svg' | 'pdf' = 'png',
  scale: 1 | 2 | 4 = 1
): Promise<FigmaImageResponse> => {
  const client = createFigmaApiClient();
  
  try {
    const response: AxiosResponse<FigmaImageResponse> = await client.get(`/images/${fileKey}`, {
      params: {
        ids: nodeIds.join(','),
        format,
        scale,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Figma images:', error);
    throw error;
  }
};

/**
 * Search for nodes in a Figma file by name
 * @param fileKey - The Figma file key
 * @param searchTerm - Term to search for
 * @returns Promise with matching nodes
 */
export const searchFigmaNodes = async (
  fileKey: string,
  searchTerm: string
): Promise<FigmaNode[]> => {
  try {
    const file = await getFigmaFile(fileKey);
    const matchingNodes: FigmaNode[] = [];
    
    const searchInNode = (node: FigmaNode) => {
      if (node.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        matchingNodes.push(node);
      }
      
      if (node.children) {
        node.children.forEach(searchInNode);
      }
    };
    
    searchInNode(file.document);
    return matchingNodes;
  } catch (error) {
    console.error('Error searching Figma nodes:', error);
    throw error;
  }
};

/**
 * Get all components from a Figma file
 * @param fileKey - The Figma file key
 * @returns Promise with components data
 */
export const getFigmaComponents = async (fileKey?: string): Promise<Record<string, FigmaComponent>> => {
  try {
    const file = await getFigmaFile(fileKey);
    return file.components;
  } catch (error) {
    console.error('Error fetching Figma components:', error);
    throw error;
  }
};

/**
 * Get all styles from a Figma file
 * @param fileKey - The Figma file key
 * @returns Promise with styles data
 */
export const getFigmaStyles = async (fileKey?: string): Promise<Record<string, FigmaStyle>> => {
  try {
    const file = await getFigmaFile(fileKey);
    return file.styles;
  } catch (error) {
    console.error('Error fetching Figma styles:', error);
    throw error;
  }
};

/**
 * Create a new Figma file (requires team access)
 * @param name - Name for the new file
 * @returns Promise with file creation response
 */
export const createFigmaFile = async (name: string): Promise<any> => {
  const client = createFigmaApiClient();

  try {
    const response = await client.post('/files', {
      name,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Figma file:', error);
    throw error;
  }
};

/**
 * Post nodes to a Figma file (create/update design elements)
 * @param fileKey - The Figma file key
 * @param nodes - Array of nodes to create
 * @returns Promise with creation response
 */
export const postFigmaNodes = async (
  fileKey: string,
  nodes: any[]
): Promise<any> => {
  const client = createFigmaApiClient();

  try {
    const response = await client.post(`/files/${fileKey}/nodes`, {
      nodes,
    });
    return response.data;
  } catch (error) {
    console.error('Error posting nodes to Figma:', error);
    throw error;
  }
};
