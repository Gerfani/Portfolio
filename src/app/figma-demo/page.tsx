import React from 'react';
import FigmaIntegration from '@/components/FigmaIntegration';

export default function FigmaDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className="animate-shimmer bg-[linear-gradient(110deg,#fff,15%,#6366F1,35%,#8B5CF6,50%,#EC4899,65%,#fff,85%,#fff)] bg-[length:200%_100%] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                Ghazal Erfani Portfolio
              </span>
            </h1>
            <h2 className="text-2xl font-semibold text-white mb-2">
              🎨 Figma ↔ Code Integration
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Bidirectional sync between your portfolio code and Figma designs.
              Push your current design to Figma and sync changes back in real-time.
            </p>
          </div>
          
          <div className="mb-8">
            <FigmaIntegration className="bg-gray-800 border border-gray-700 text-white" />
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">🚀 Portfolio Design Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-900/50 border border-blue-700 p-4 rounded">
                <h3 className="font-semibold text-blue-300 mb-2">🎯 Interactive Bubbles</h3>
                <p className="text-sm text-blue-200">
                  D3.js powered bubble chart with persona selection and smooth animations.
                </p>
              </div>

              <div className="bg-purple-900/50 border border-purple-700 p-4 rounded">
                <h3 className="font-semibold text-purple-300 mb-2">🎨 Design Tokens</h3>
                <p className="text-sm text-purple-200">
                  Extract colors, typography, and spacing from your code to sync with Figma.
                </p>
              </div>

              <div className="bg-pink-900/50 border border-pink-700 p-4 rounded">
                <h3 className="font-semibold text-pink-300 mb-2">🔄 Real-time Sync</h3>
                <p className="text-sm text-pink-200">
                  Bidirectional sync between Figma designs and your React components.
                </p>
              </div>

              <div className="bg-green-900/50 border border-green-700 p-4 rounded">
                <h3 className="font-semibold text-green-300 mb-2">📱 Responsive Design</h3>
                <p className="text-sm text-green-200">
                  Mobile-first design with dark mode and smooth transitions.
                </p>
              </div>

              <div className="bg-indigo-900/50 border border-indigo-700 p-4 rounded">
                <h3 className="font-semibold text-indigo-300 mb-2">⚡ Framer Motion</h3>
                <p className="text-sm text-indigo-200">
                  Smooth animations and transitions throughout the portfolio.
                </p>
              </div>

              <div className="bg-orange-900/50 border border-orange-700 p-4 rounded">
                <h3 className="font-semibold text-orange-300 mb-2">🎭 Persona System</h3>
                <p className="text-sm text-orange-200">
                  Multi-faceted portfolio showcasing Engineer, Educator, and Movement Builder roles.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-yellow-300 mb-3">🚀 Setup Instructions for Ghazal</h2>
            <div className="space-y-4">
              <div className="bg-gray-900/50 p-4 rounded border border-gray-700">
                <h3 className="font-semibold text-white mb-2">Step 1: Get Figma Access Token</h3>
                <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1">
                  <li>Go to <a href="https://www.figma.com/developers/api#access-tokens" target="_blank" className="text-blue-400 hover:underline">Figma Developer Settings</a></li>
                  <li>Click "Create new personal access token"</li>
                  <li>Name it "Portfolio Integration"</li>
                  <li>Copy the token and add it to your <code className="bg-gray-800 px-1 rounded">.env.local</code> file</li>
                </ol>
              </div>

              <div className="bg-gray-900/50 p-4 rounded border border-gray-700">
                <h3 className="font-semibold text-white mb-2">Step 2: Create or Use Figma File</h3>
                <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1">
                  <li>Create a new Figma file or use an existing one</li>
                  <li>Copy the file key from the URL (e.g., <code className="bg-gray-800 px-1 rounded">figma.com/file/ABC123/...</code> → ABC123)</li>
                  <li>Add the file key to your <code className="bg-gray-800 px-1 rounded">.env.local</code> file</li>
                </ol>
              </div>

              <div className="bg-gray-900/50 p-4 rounded border border-gray-700">
                <h3 className="font-semibold text-white mb-2">Step 3: Start Syncing</h3>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                  <li>Use "Push Design to Figma" to convert your portfolio to Figma components</li>
                  <li>Enable "Real-time Sync" to monitor changes from Figma</li>
                  <li>Make changes in Figma and see them reflected in your code</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
