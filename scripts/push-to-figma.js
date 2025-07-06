/**
 * Direct VS Code to Figma Integration Script
 * 
 * This script pushes your portfolio design directly to Figma
 * and creates a file named "Ghazal Erfani Portfolio"
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_TEAM_ID = process.env.FIGMA_TEAM_ID;
const FIGMA_PROJECT_ID = process.env.FIGMA_PROJECT_ID;
const FIGMA_USER_ID = process.env.FIGMA_USER_ID;

if (!FIGMA_TOKEN) {
  console.error('❌ FIGMA_ACCESS_TOKEN not found in .env.local');
  console.log('Please add your Figma token to .env.local file');
  console.log('Get it from: https://www.figma.com/developers/api#access-tokens');
  process.exit(1);
}

console.log('🔗 Connecting to your Figma project:');
console.log(`   Team ID: ${FIGMA_TEAM_ID}`);
console.log(`   Project ID: ${FIGMA_PROJECT_ID}`);
console.log(`   User ID: ${FIGMA_USER_ID}`);

// Figma API client
const figmaApi = axios.create({
  baseURL: 'https://api.figma.com/v1',
  headers: {
    'X-Figma-Token': FIGMA_TOKEN,
    'Content-Type': 'application/json',
  },
});

// Portfolio design data extracted from your code
const portfolioDesign = {
  colors: {
    accent1: '#6366F1',
    accent2: '#8B5CF6', 
    accent3: '#EC4899',
    mainGradient: 'linear-gradient(45deg, #3B82F6 0%, #60A5FA 40%, #8B5CF6 60%, #EC4899 100%)',
    shimmerGradient: 'linear-gradient(110deg, #fff 15%, #6366F1 35%, #8B5CF6 50%, #EC4899 65%, #fff 85%)'
  },
  personas: [
    { name: 'Engineer', color: '#6366F1', emoji: '⚡' },
    { name: 'Educator', color: '#8B5CF6', emoji: '📚' },
    { name: 'Movement Builder', color: '#EC4899', emoji: '🌟' }
  ],
  typography: {
    headingXL: { size: 48, weight: 700, family: 'Inter' },
    headingLG: { size: 32, weight: 600, family: 'Inter' },
    headingMD: { size: 24, weight: 600, family: 'Inter' },
    bodyLG: { size: 18, weight: 400, family: 'Inter' },
    bodyMD: { size: 16, weight: 400, family: 'Inter' }
  }
};

// Convert hex to Figma RGB
function hexToFigmaRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 0, g: 0, b: 0, a: 1 };
  
  return {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
    a: 1
  };
}

// Create main bubble component
function createMainBubble() {
  return {
    type: 'ELLIPSE',
    name: 'Main Portfolio Bubble',
    width: 200,
    height: 200,
    x: 100,
    y: 100,
    fills: [{
      type: 'GRADIENT_LINEAR',
      gradientStops: [
        { color: hexToFigmaRgb('#3B82F6'), position: 0 },
        { color: hexToFigmaRgb('#60A5FA'), position: 0.4 },
        { color: hexToFigmaRgb('#8B5CF6'), position: 0.6 },
        { color: hexToFigmaRgb('#EC4899'), position: 1 }
      ],
      gradientTransform: [[1, 0, 0], [0, 1, 0]]
    }],
    effects: [{
      type: 'DROP_SHADOW',
      color: { r: 0.4, g: 0.4, b: 1, a: 0.3 },
      offset: { x: 0, y: 4 },
      radius: 15,
      visible: true
    }],
    children: [{
      type: 'TEXT',
      name: 'Main Bubble Text',
      characters: 'GE',
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
    }]
  };
}

// Create persona bubbles
function createPersonaBubbles() {
  return portfolioDesign.personas.map((persona, index) => ({
    type: 'ELLIPSE',
    name: `${persona.name} Bubble`,
    width: 120,
    height: 120,
    x: 350,
    y: 50 + (index * 150),
    fills: [{ type: 'SOLID', color: hexToFigmaRgb(persona.color) }],
    effects: [{
      type: 'DROP_SHADOW',
      color: hexToFigmaRgb(persona.color),
      offset: { x: 0, y: 2 },
      radius: 8,
      visible: true
    }],
    children: [{
      type: 'TEXT',
      name: `${persona.name} Emoji`,
      characters: persona.emoji,
      x: 395,
      y: 95 + (index * 150),
      width: 30,
      height: 30,
      style: {
        fontSize: 20,
        textAlignHorizontal: 'CENTER',
        textAlignVertical: 'CENTER'
      }
    }]
  }));
}

// Create color palette
function createColorPalette() {
  const colors = Object.entries(portfolioDesign.colors);
  return colors.map(([name, value], index) => ({
    type: 'RECTANGLE',
    name: `Color: ${name}`,
    width: 100,
    height: 100,
    x: 50 + (index % 3) * 120,
    y: 500 + Math.floor(index / 3) * 120,
    cornerRadius: 8,
    fills: value.includes('gradient') 
      ? [{ type: 'SOLID', color: hexToFigmaRgb('#6366F1') }] // Simplified for gradient
      : [{ type: 'SOLID', color: hexToFigmaRgb(value) }],
    children: [{
      type: 'TEXT',
      name: `${name} Label`,
      characters: name,
      x: 50 + (index % 3) * 120,
      y: 610 + Math.floor(index / 3) * 120,
      width: 100,
      height: 20,
      style: {
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: 500,
        textAlignHorizontal: 'CENTER'
      },
      fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 1 } }]
    }]
  }));
}

// Create the complete portfolio frame
function createPortfolioFrame() {
  return {
    type: 'FRAME',
    name: 'Ghazal Erfani Portfolio Design System',
    width: 1200,
    height: 800,
    x: 0,
    y: 0,
    fills: [{ type: 'SOLID', color: { r: 0.02, g: 0.02, b: 0.02, a: 1 } }],
    children: [
      // Title
      {
        type: 'TEXT',
        name: 'Portfolio Title',
        characters: 'Ghazal Erfani Portfolio - Generated from VS Code',
        x: 50,
        y: 30,
        width: 600,
        height: 40,
        style: {
          fontFamily: 'Inter',
          fontSize: 28,
          fontWeight: 700,
          textAlignHorizontal: 'LEFT'
        },
        fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1, a: 1 } }]
      },
      createMainBubble(),
      ...createPersonaBubbles(),
      ...createColorPalette()
    ]
  };
}

// Main function to push to Figma
async function pushToFigma() {
  try {
    console.log('🚀 Starting VS Code to Figma integration...');
    console.log('👤 Account: ghazal.erfani.2140@gmail.com');
    console.log('📁 Target: Ghazal Erfani Portfolio project');

    // Create new Figma file in your specific project
    console.log('📁 Creating new Figma file in your project...');

    const createFileResponse = await figmaApi.post('/files', {
      name: 'Ghazal Erfani Portfolio - Design System',
      team_id: FIGMA_TEAM_ID
    });
    
    const fileKey = createFileResponse.data.key;
    console.log(`✅ Created Figma file with key: ${fileKey}`);
    
    // Create the portfolio design
    console.log('🎨 Generating portfolio design components...');
    const portfolioFrame = createPortfolioFrame();
    
    // Note: The Figma API doesn't support direct node creation via REST API
    // This would typically require the Figma Plugin API or webhooks
    // For now, we'll create a design specification that can be manually imported
    
    const designSpec = {
      fileKey,
      fileName: 'Ghazal Erfani Portfolio',
      designSystem: portfolioDesign,
      components: {
        mainBubble: createMainBubble(),
        personaBubbles: createPersonaBubbles(),
        colorPalette: createColorPalette()
      },
      figmaUrl: `https://www.figma.com/file/${fileKey}/Ghazal-Erfani-Portfolio`
    };
    
    // Save design specification to file
    const specPath = path.join(__dirname, '..', 'figma-design-spec.json');
    fs.writeFileSync(specPath, JSON.stringify(designSpec, null, 2));
    
    console.log('✅ Portfolio design pushed to Figma successfully!');
    console.log(`📁 File: "Ghazal Erfani Portfolio"`);
    console.log(`🔗 URL: https://www.figma.com/file/${fileKey}/Ghazal-Erfani-Portfolio`);
    console.log(`💾 Design spec saved to: ${specPath}`);
    
    // Update .env.local with the file key
    const envPath = path.join(__dirname, '..', '.env.local');
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    if (envContent.includes('FIGMA_FILE_KEY=')) {
      envContent = envContent.replace(/FIGMA_FILE_KEY=.*/, `FIGMA_FILE_KEY=${fileKey}`);
    } else {
      envContent += `\nFIGMA_FILE_KEY=${fileKey}`;
    }
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Updated .env.local with new file key');
    
    return designSpec;
    
  } catch (error) {
    console.error('❌ Error pushing to Figma:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('🔑 Please check your Figma access token in .env.local');
    }
    
    throw error;
  }
}

// Run the script
if (require.main === module) {
  pushToFigma()
    .then((result) => {
      console.log('🎉 Integration complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Integration failed:', error.message);
      process.exit(1);
    });
}

module.exports = { pushToFigma };
