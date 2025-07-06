'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  getFigmaFile,
  getFigmaComponents,
  getFigmaImages,
  searchFigmaNodes,
  FigmaFile,
  FigmaComponent,
  FigmaNode
} from '@/lib/figma-api';
import { extractAllDesignTokens } from '@/lib/design-token-extractor';
import { pushDesignToFigma, createColorPaletteFigmaFrame } from '@/lib/code-to-figma-converter';
import { FigmaSync, SyncConfig, DesignChange } from '@/lib/figma-to-code-sync';

interface FigmaIntegrationProps {
  fileKey?: string;
  className?: string;
}

export const FigmaIntegration: React.FC<FigmaIntegrationProps> = ({
  fileKey,
  className = ''
}) => {
  const [file, setFile] = useState<FigmaFile | null>(null);
  const [components, setComponents] = useState<Record<string, FigmaComponent>>({});
  const [searchResults, setSearchResults] = useState<FigmaNode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // New state for bidirectional sync
  const [syncEnabled, setSyncEnabled] = useState(false);
  const [syncChanges, setSyncChanges] = useState<DesignChange[]>([]);
  const [pushStatus, setPushStatus] = useState<string>('');
  const figmaSyncRef = useRef<FigmaSync | null>(null);

  // Load Figma file data
  const loadFigmaFile = async () => {
    if (!fileKey) {
      setError('No file key provided');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [fileData, componentsData] = await Promise.all([
        getFigmaFile(fileKey),
        getFigmaComponents(fileKey)
      ]);

      setFile(fileData);
      setComponents(componentsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Figma data');
      console.error('Figma API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Search for nodes
  const handleSearch = async () => {
    if (!fileKey || !searchTerm.trim()) return;

    setLoading(true);
    try {
      const results = await searchFigmaNodes(fileKey, searchTerm);
      setSearchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  // Export images for selected nodes
  const exportImages = async (nodeIds: string[]) => {
    if (!fileKey || nodeIds.length === 0) return;

    setLoading(true);
    try {
      const imageData = await getFigmaImages(fileKey, nodeIds, 'png', 2);
      
      // Open images in new tabs (for demonstration)
      Object.entries(imageData.images).forEach(([nodeId, imageUrl]) => {
        if (imageUrl) {
          window.open(imageUrl, '_blank');
        }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image export failed');
    } finally {
      setLoading(false);
    }
  };

  // Push current portfolio design to Figma
  const handlePushToFigma = async () => {
    if (!fileKey) {
      setError('File key is required to push designs');
      return;
    }

    setLoading(true);
    setPushStatus('Extracting design tokens...');

    try {
      const result = await pushDesignToFigma(fileKey);
      setPushStatus(`✅ Successfully pushed design to Figma! File: ${result.fileKey}`);
      console.log('Push result:', result);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to push design';
      setError(errorMsg);
      setPushStatus(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  // Toggle real-time sync
  const toggleSync = async () => {
    if (!fileKey) {
      setError('File key is required for sync');
      return;
    }

    if (syncEnabled) {
      // Stop sync
      if (figmaSyncRef.current) {
        figmaSyncRef.current.stop();
        figmaSyncRef.current = null;
      }
      setSyncEnabled(false);
      setSyncChanges([]);
    } else {
      // Start sync
      const syncConfig: SyncConfig = {
        fileKey,
        watchedNodes: ['main-bubble', 'persona-bubbles', 'color-palette'],
        syncInterval: 5000, // 5 seconds
        autoApply: false // Manual approval for now
      };

      figmaSyncRef.current = new FigmaSync(syncConfig);

      try {
        await figmaSyncRef.current.start();
        setSyncEnabled(true);

        // Set up periodic check for changes
        const checkChanges = setInterval(() => {
          if (figmaSyncRef.current) {
            const status = figmaSyncRef.current.getStatus();
            // In a real implementation, you'd get changes from the sync instance
            // For now, we'll simulate this
          }
        }, 1000);

        // Clean up interval when component unmounts
        return () => clearInterval(checkChanges);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to start sync');
      }
    }
  };

  useEffect(() => {
    if (fileKey) {
      loadFigmaFile();
    }

    // Cleanup sync on unmount
    return () => {
      if (figmaSyncRef.current) {
        figmaSyncRef.current.stop();
      }
    };
  }, [fileKey]);

  return (
    <div className={`figma-integration p-6 bg-white rounded-lg shadow-lg ${className}`}>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Figma Integration</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      )}

      {/* Bidirectional Sync Controls */}
      <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">🔄 Bidirectional Figma Sync</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">📤 Push Code → Figma</h4>
            <p className="text-sm text-gray-600 mb-3">Convert your current portfolio design to Figma components</p>
            <button
              onClick={handlePushToFigma}
              disabled={loading || !fileKey}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Push Design to Figma
            </button>
            {pushStatus && (
              <p className="text-sm mt-2 p-2 bg-white rounded border">{pushStatus}</p>
            )}
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">📥 Sync Figma → Code</h4>
            <p className="text-sm text-gray-600 mb-3">Real-time sync of Figma changes to your code</p>
            <button
              onClick={toggleSync}
              disabled={loading || !fileKey}
              className={`w-full px-4 py-2 rounded font-medium ${
                syncEnabled
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {syncEnabled ? '⏹️ Stop Sync' : '▶️ Start Real-time Sync'}
            </button>
            {syncEnabled && (
              <div className="mt-2 p-2 bg-green-100 rounded border border-green-300">
                <p className="text-sm text-green-800">🟢 Sync active - monitoring Figma changes...</p>
              </div>
            )}
          </div>
        </div>

        {syncChanges.length > 0 && (
          <div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-300">
            <h4 className="font-medium text-yellow-800 mb-2">⚠️ Pending Changes from Figma</h4>
            <div className="space-y-2">
              {syncChanges.map((change, index) => (
                <div key={index} className="text-sm bg-white p-2 rounded border">
                  <strong>{change.nodeName}:</strong> {change.cssProperty} changed from {change.oldValue} to {change.newValue}
                </div>
              ))}
            </div>
            <button className="mt-2 px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm">
              Apply Changes
            </button>
          </div>
        )}
      </div>

      {/* File Information */}
      {file && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">File Information</h3>
          <div className="bg-gray-50 p-4 rounded">
            <p><strong>Name:</strong> {file.name}</p>
            <p><strong>Last Modified:</strong> {new Date(file.lastModified).toLocaleString()}</p>
            <p><strong>Version:</strong> {file.version}</p>
            <p><strong>Components:</strong> {Object.keys(components).length}</p>
          </div>
        </div>
      )}

      {/* Search Functionality */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Search Nodes</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for nodes by name..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={loading || !searchTerm.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Search
          </button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Search Results ({searchResults.length})</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {searchResults.map((node) => (
                <div key={node.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div>
                    <span className="font-medium">{node.name}</span>
                    <span className="text-sm text-gray-500 ml-2">({node.type})</span>
                  </div>
                  <button
                    onClick={() => exportImages([node.id])}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Export Image
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Components List */}
      {Object.keys(components).length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
            {Object.entries(components).map(([key, component]) => (
              <div key={key} className="bg-gray-50 p-3 rounded">
                <h4 className="font-medium">{component.name}</h4>
                {component.description && (
                  <p className="text-sm text-gray-600 mt-1">{component.description}</p>
                )}
                <button
                  onClick={() => exportImages([key])}
                  className="mt-2 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Export
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      {!file && !loading && (
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Setup Instructions:</h3>
          <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
            <li>Get your Figma Personal Access Token from <a href="https://www.figma.com/developers/api#access-tokens" target="_blank" rel="noopener noreferrer" className="underline">Figma Developer Settings</a></li>
            <li>Add your token to <code className="bg-blue-100 px-1 rounded">.env.local</code> as <code className="bg-blue-100 px-1 rounded">FIGMA_ACCESS_TOKEN</code></li>
            <li>Add your Figma file key to <code className="bg-blue-100 px-1 rounded">.env.local</code> as <code className="bg-blue-100 px-1 rounded">FIGMA_FILE_KEY</code></li>
            <li>Restart your development server</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default FigmaIntegration;
