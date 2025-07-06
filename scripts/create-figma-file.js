/**
 * Create Figma File for Ghazal's Portfolio
 * 
 * This script creates a design specification and connects to your Figma project
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_TEAM_ID = process.env.FIGMA_TEAM_ID;

// Figma API client
const figmaApi = axios.create({
  baseURL: 'https://api.figma.com/v1',
  headers: {
    'X-Figma-Token': FIGMA_TOKEN,
    'Content-Type': 'application/json',
  },
});

// Your portfolio design specification
const portfolioDesign = {
  name: 'Ghazal Erfani Portfolio',
  colors: {
    accent1: '#6366F1',    // Engineer - Indigo
    accent2: '#8B5CF6',    // Educator - Purple  
    accent3: '#EC4899',    // Movement Builder - Pink
    background: '#0F172A', // Dark background
    text: '#FFFFFF'        // White text
  },
  personas: [
    { name: 'Engineer', color: '#6366F1', emoji: '⚡', description: 'Technical expertise and innovation' },
    { name: 'Educator', color: '#8B5CF6', emoji: '📚', description: 'Knowledge sharing and mentoring' },
    { name: 'Movement Builder', color: '#EC4899', emoji: '🌟', description: 'Community building and leadership' }
  ]
};

async function createFigmaConnection() {
  try {
    console.log('🚀 Connecting to Figma...');
    console.log(`👤 Account: ghazal.erfani.2140@gmail.com`);
    console.log(`🏢 Team ID: ${FIGMA_TEAM_ID}`);
    
    // Test the connection by getting user info
    console.log('\n🔍 Testing Figma connection...');
    const userResponse = await figmaApi.get('/me');
    console.log(`✅ Connected as: ${userResponse.data.email}`);
    
    // Get team projects
    console.log('\n📁 Getting your projects...');
    const teamResponse = await figmaApi.get(`/teams/${FIGMA_TEAM_ID}/projects`);
    console.log('✅ Successfully accessed your team');
    
    const projects = teamResponse.data.projects;
    console.log(`📋 Found ${projects.length} projects:`);
    projects.forEach(p => console.log(`   - ${p.name} (ID: ${p.id})`));
    
    // Find your portfolio project
    const portfolioProject = projects.find(p => p.name.includes('Ghazal') || p.name.includes('Portfolio'));
    if (portfolioProject) {
      console.log(`✅ Found your portfolio project: "${portfolioProject.name}"`);
    }
    
    // Since direct file creation via API has limitations, let's create a comprehensive design guide
    console.log('\n🎨 Creating design specification...');
    
    const designSpec = {
      projectInfo: {
        teamId: FIGMA_TEAM_ID,
        projectName: 'Ghazal Erfani Portfolio',
        createdAt: new Date().toISOString(),
        userEmail: userResponse.data.email
      },
      portfolioDesign: portfolioDesign,
      figmaInstructions: {
        step1: 'Go to your Figma team and create a new file',
        step2: 'Name it "Ghazal Erfani Portfolio - Design System"',
        step3: 'Use the component specifications below to create your design',
        step4: 'Your VS Code project will sync with this file'
      },
      components: {
        mainBubble: {
          name: 'Main Portfolio Bubble',
          type: 'Circle',
          size: '200x200px',
          fill: {
            type: 'Linear Gradient',
            angle: '45°',
            stops: [
              { color: '#3B82F6', position: '0%' },
              { color: '#60A5FA', position: '40%' },
              { color: '#8B5CF6', position: '60%' },
              { color: '#EC4899', position: '100%' }
            ]
          },
          effects: 'Drop shadow: rgba(99, 102, 241, 0.3) 0px 4px 15px',
          text: {
            content: 'GE',
            font: 'Inter Bold',
            size: '24px',
            color: 'White',
            alignment: 'Center'
          }
        },
        personaBubbles: portfolioDesign.personas.map(persona => ({
          name: `${persona.name} Bubble`,
          type: 'Circle',
          size: '120x120px',
          fill: {
            type: 'Solid',
            color: persona.color
          },
          effects: `Drop shadow: ${persona.color} 0px 2px 8px`,
          text: {
            content: persona.emoji,
            size: '20px',
            alignment: 'Center'
          },
          description: persona.description
        })),
        colorPalette: Object.entries(portfolioDesign.colors).map(([name, color]) => ({
          name: `Color Swatch: ${name}`,
          type: 'Rectangle',
          size: '100x100px',
          fill: color,
          cornerRadius: '8px',
          label: {
            text: name,
            position: 'Below',
            font: 'Inter Medium 12px'
          }
        }))
      },
      layout: {
        canvas: {
          background: '#0F172A',
          size: '1200x800px'
        },
        arrangement: {
          mainBubble: { x: 100, y: 300 },
          engineerBubble: { x: 400, y: 200 },
          educatorBubble: { x: 400, y: 350 },
          movementBuilderBubble: { x: 400, y: 500 },
          colorPalette: { x: 50, y: 600, spacing: '120px' }
        }
      }
    };
    
    // Save the design specification
    const specPath = path.join(__dirname, '..', 'FIGMA_DESIGN_SPEC.json');
    fs.writeFileSync(specPath, JSON.stringify(designSpec, null, 2));
    console.log(`💾 Design specification saved to: ${specPath}`);
    
    // Create step-by-step Figma instructions
    const instructionsPath = path.join(__dirname, '..', 'CREATE_IN_FIGMA.md');
    const instructions = `# 🎨 Create Your Portfolio in Figma

## ✅ Connection Successful!
- **Your Figma account:** ${userResponse.data.email}
- **Team connected:** ${FIGMA_TEAM_ID}
- **Projects found:** ${projects.length}

## 📋 Step-by-Step Instructions:

### 1. Create New File
1. Go to your Figma team: https://www.figma.com/files/team/${FIGMA_TEAM_ID}
2. Click "Create new file"
3. Name it: **"Ghazal Erfani Portfolio - Design System"**

### 2. Set Up Canvas
- **Background color:** #0F172A (dark)
- **Canvas size:** 1200x800px

### 3. Create Main Portfolio Bubble
- **Shape:** Circle (200x200px)
- **Position:** x: 100, y: 300
- **Fill:** Linear gradient at 45°
  - #3B82F6 at 0%
  - #60A5FA at 40%
  - #8B5CF6 at 60%
  - #EC4899 at 100%
- **Effect:** Drop shadow (rgba(99, 102, 241, 0.3), 0px 4px 15px)
- **Text:** "GE" (Inter Bold, 24px, White, Centered)

### 4. Create Persona Bubbles

#### Engineer Bubble ⚡
- **Shape:** Circle (120x120px)
- **Position:** x: 400, y: 200
- **Fill:** #6366F1
- **Effect:** Drop shadow (#6366F1, 0px 2px 8px)
- **Text:** "⚡" (20px, Centered)

#### Educator Bubble 📚
- **Shape:** Circle (120x120px)
- **Position:** x: 400, y: 350
- **Fill:** #8B5CF6
- **Effect:** Drop shadow (#8B5CF6, 0px 2px 8px)
- **Text:** "📚" (20px, Centered)

#### Movement Builder Bubble 🌟
- **Shape:** Circle (120x120px)
- **Position:** x: 400, y: 500
- **Fill:** #EC4899
- **Effect:** Drop shadow (#EC4899, 0px 2px 8px)
- **Text:** "🌟" (20px, Centered)

### 5. Create Color Palette
Create rectangles (100x100px, 8px corner radius) starting at x: 50, y: 600:

1. **accent1:** #6366F1 (Engineer color)
2. **accent2:** #8B5CF6 (Educator color)
3. **accent3:** #EC4899 (Movement Builder color)
4. **background:** #0F172A (Dark background)
5. **text:** #FFFFFF (White text)

Space them 120px apart horizontally.

### 6. Add Labels
- Add text labels below each color swatch
- Font: Inter Medium, 12px, White
- Text: Color name (accent1, accent2, etc.)

## 🔗 After Creating the File:

1. **Copy the file URL** from your browser
2. **Extract the file key** (the part after /file/ in the URL)
3. **Add it to your VS Code** `.env.local` file as FIGMA_FILE_KEY
4. **Your code and Figma will be connected!**

## 🎯 Your Design System:
- **Main bubble:** Interactive portfolio center
- **Persona bubbles:** Your three professional roles
- **Color palette:** Consistent design tokens
- **Typography:** Inter font family
- **Effects:** Subtle shadows and gradients

**Happy designing! 🎨**

Once you create the file, your VS Code portfolio will be connected to Figma!
`;
    
    fs.writeFileSync(instructionsPath, instructions);
    console.log(`📋 Step-by-step instructions saved to: ${instructionsPath}`);

    console.log('\n🎉 SUCCESS! Figma connection established!');
    console.log('\n📋 Next steps:');
    console.log('1. Open your Figma team:', `https://www.figma.com/files/team/${FIGMA_TEAM_ID}`);
    console.log('2. Create a new file named "Ghazal Erfani Portfolio - Design System"');
    console.log('3. Follow the instructions in CREATE_IN_FIGMA.md');
    console.log('4. Copy the file URL and extract the file key');
    console.log('5. Add the file key to your .env.local file');
    
    return {
      success: true,
      userEmail: userResponse.data.email,
      teamId: FIGMA_TEAM_ID,
      projects: projects,
      designSpec: designSpec,
      figmaTeamUrl: `https://www.figma.com/files/team/${FIGMA_TEAM_ID}`
    };
    
  } catch (error) {
    console.error('\n❌ Error:', error.response?.data || error.message);
    throw error;
  }
}

// Run the script
if (require.main === module) {
  createFigmaConnection()
    .then((result) => {
      console.log('\n✨ Connection complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Connection failed');
      process.exit(1);
    });
}

module.exports = { createFigmaConnection };
