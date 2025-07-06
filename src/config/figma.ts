/**
 * Figma API Configuration
 * 
 * This file contains the configuration for connecting to the Figma API.
 * Make sure to set up your environment variables in .env.local
 */

export const figmaConfig = {
  // Base URL for Figma API
  baseURL: 'https://api.figma.com/v1',
  
  // Your Figma personal access token
  accessToken: process.env.FIGMA_ACCESS_TOKEN,
  
  // Default file key (can be overridden in API calls)
  defaultFileKey: process.env.FIGMA_FILE_KEY,
  
  // Team ID for accessing team files
  teamId: process.env.FIGMA_TEAM_ID,
  
  // API request headers
  headers: {
    'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN || '',
    'Content-Type': 'application/json',
  },
  
  // Request timeout in milliseconds
  timeout: 10000,
};

/**
 * Validate Figma configuration
 */
export const validateFigmaConfig = (): boolean => {
  if (!figmaConfig.accessToken) {
    console.error('FIGMA_ACCESS_TOKEN is not set in environment variables');
    return false;
  }
  
  if (!figmaConfig.defaultFileKey) {
    console.warn('FIGMA_FILE_KEY is not set - you will need to provide file keys manually');
  }
  
  return true;
};

/**
 * Extract file key from Figma URL
 * @param url - Figma file URL
 * @returns File key or null if invalid URL
 */
export const extractFileKeyFromUrl = (url: string): string | null => {
  const match = url.match(/\/file\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
};

/**
 * Extract node ID from Figma URL
 * @param url - Figma file URL with node selection
 * @returns Node ID or null if not found
 */
export const extractNodeIdFromUrl = (url: string): string | null => {
  const match = url.match(/node-id=([^&]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};
