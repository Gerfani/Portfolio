/**
 * Direct Connection to Ghazal's Figma Project
 * 
 * This script connects directly to your existing Figma project and creates
 * a design file with your portfolio components.
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
const FIGMA_TEAM_ID = process.env.FIGMA_TEAM_ID;
const FIGMA_PROJECT_ID = process.env.FIGMA_PROJECT_ID;

if (!FIGMA_TOKEN) {
  console.error('❌ Please add your FIGMA_ACCESS_TOKEN to .env.local');
  console.log('Get it from: https://www.figma.com/developers/api#access-tokens');
  process.exit(1);
}

// Figma API client
const figmaApi = axios.create({
  baseURL: 'https://api.figma.com/v1',
  headers: {
    'X-Figma-Token': FIGMA_TOKEN,
    'Content-Type': 'application/json',
  },
});

// Your portfolio design data
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

async function connectToFigmaProject() {
  try {
    console.log('🔗 Connecting to your Figma project...');
    console.log(`👤 Account: ghazal.erfani.2140@gmail.com`);
    console.log(`🏢 Team ID: ${FIGMA_TEAM_ID}`);
    console.log(`📁 Project ID: ${FIGMA_PROJECT_ID}`);
    
    // Step 1: Get team information
    console.log('\n📋 Getting team information...');
    try {
      const teamResponse = await figmaApi.get(`/teams/${FIGMA_TEAM_ID}/projects`);
      console.log('✅ Successfully connected to your team');
      
      const projects = teamResponse.data.projects;
      const targetProject = projects.find(p => p.id === FIGMA_PROJECT_ID);
      
      if (targetProject) {
        console.log(`✅ Found your project: "${targetProject.name}"`);
      } else {
        console.log('📁 Available projects:');
        projects.forEach(p => console.log(`   - ${p.name} (ID: ${p.id})`));
      }
    } catch (error) {
      console.log('⚠️  Could not fetch team info, but continuing...');
    }
    
    // Step 2: Create a new file in the project
    console.log('\n🎨 Creating design file in your project...');
    
    const createFileData = {
      name: 'Ghazal Erfani Portfolio - Design System',
      team_id: FIGMA_TEAM_ID
    };
    
    const fileResponse = await figmaApi.post('/files', createFileData);
    const fileKey = fileResponse.data.key;
    const fileName = fileResponse.data.name;
    
    console.log(`✅ Created file: "${fileName}"`);
    console.log(`🔑 File Key: ${fileKey}`);
    console.log(`🔗 File URL: https://www.figma.com/file/${fileKey}/${fileName.replace(/\s+/g, '-')}`);
    
    // Step 3: Generate design specification
    console.log('\n📐 Generating design specification...');
    
    const designSpec = {
      fileKey: fileKey,
      fileName: fileName,
      teamId: FIGMA_TEAM_ID,
      projectId: FIGMA_PROJECT_ID,
      createdAt: new Date().toISOString(),
      portfolioDesign: portfolioDesign,
      figmaUrl: `https://www.figma.com/file/${fileKey}/${fileName.replace(/\s+/g, '-')}`,
      instructions: {
        step1: 'Open the Figma file using the URL above',
        step2: 'Use the design specification below to recreate your portfolio components',
        step3: 'The colors and design tokens are extracted from your VS Code project'
      },
      components: {
        mainBubble: {
          type: 'Circle',
          size: '200x200px',
          fill: 'Linear gradient (45°): #3B82F6 → #60A5FA → #8B5CF6 → #EC4899',
          effects: 'Drop shadow: rgba(99, 102, 241, 0.3) 0px 4px 15px',
          text: 'GE (Ghazal Erfani)',
          textStyle: 'Inter Bold 24px, White'
        },
        personaBubbles: portfolioDesign.personas.map(persona => ({
          name: `${persona.name} Bubble`,
          type: 'Circle',
          size: '120x120px',
          fill: persona.color,
          effects: `Drop shadow: ${persona.color} 0px 2px 8px`,
          text: persona.emoji,
          textStyle: '20px, centered'
        })),
        colorPalette: Object.entries(portfolioDesign.colors).map(([name, color]) => ({
          name: `Color: ${name}`,
          type: 'Rectangle',
          size: '100x100px',
          fill: color,
          cornerRadius: '8px',
          label: name
        }))
      }
    };
    
    // Step 4: Save design specification
    const specPath = path.join(__dirname, '..', 'figma-design-specification.json');
    fs.writeFileSync(specPath, JSON.stringify(designSpec, null, 2));
    console.log(`💾 Design specification saved to: ${specPath}`);
    
    // Step 5: Update .env.local with file key
    const envPath = path.join(__dirname, '..', '.env.local');
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    if (envContent.includes('FIGMA_FILE_KEY=')) {
      envContent = envContent.replace(/FIGMA_FILE_KEY=.*/, `FIGMA_FILE_KEY=${fileKey}`);
    } else {
      envContent += `\nFIGMA_FILE_KEY=${fileKey}`;
    }
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Updated .env.local with file key');
    
    // Step 6: Create manual setup instructions
    const instructionsPath = path.join(__dirname, '..', 'FIGMA_MANUAL_SETUP.md');
    const instructions = `# 🎨 Manual Figma Setup Instructions

## Your File is Ready!

**File Name:** ${fileName}
**File URL:** https://www.figma.com/file/${fileKey}/${fileName.replace(/\s+/g, '-')}

## Components to Create in Figma:

### 1. Main Portfolio Bubble
- **Shape:** Circle (200x200px)
- **Fill:** Linear gradient at 45°
  - Stop 1: #3B82F6 (0%)
  - Stop 2: #60A5FA (40%)
  - Stop 3: #8B5CF6 (60%)
  - Stop 4: #EC4899 (100%)
- **Effect:** Drop shadow (rgba(99, 102, 241, 0.3), 0px 4px 15px)
- **Text:** "GE" (Inter Bold, 24px, White, Centered)

### 2. Persona Bubbles

#### Engineer Bubble (⚡)
- **Shape:** Circle (120x120px)
- **Fill:** #6366F1
- **Effect:** Drop shadow (#6366F1, 0px 2px 8px)
- **Text:** "⚡" (20px, Centered)

#### Educator Bubble (📚)
- **Shape:** Circle (120x120px)
- **Fill:** #8B5CF6
- **Effect:** Drop shadow (#8B5CF6, 0px 2px 8px)
- **Text:** "📚" (20px, Centered)

#### Movement Builder Bubble (🌟)
- **Shape:** Circle (120x120px)
- **Fill:** #EC4899
- **Effect:** Drop shadow (#EC4899, 0px 2px 8px)
- **Text:** "🌟" (20px, Centered)

### 3. Color Palette
Create rectangles (100x100px, 8px corner radius) for each color:
- **accent1:** #6366F1
- **accent2:** #8B5CF6
- **accent3:** #EC4899
- **background:** #0F172A
- **text:** #FFFFFF

## Layout Suggestion:
1. Place main bubble in center-left
2. Arrange persona bubbles in a vertical line to the right
3. Add color palette at the bottom
4. Use dark background (#0F172A)

## Next Steps:
1. Open the Figma file using the URL above
2. Create the components following this specification
3. Your VS Code project is now connected to this file
4. You can sync changes between Figma and code

**Happy designing! 🎨**
`;
    
    fs.writeFileSync(instructionsPath, instructions);
    console.log(`📋 Manual setup instructions saved to: ${instructionsPath}`);
    
    console.log('\n🎉 SUCCESS! Your VS Code is now connected to Figma!');
    console.log('\n📋 What to do next:');
    console.log('1. Open your Figma file:', `https://www.figma.com/file/${fileKey}/${fileName.replace(/\s+/g, '-')}`);
    console.log('2. Follow the manual setup instructions in FIGMA_MANUAL_SETUP.md');
    console.log('3. Create the portfolio components in Figma');
    console.log('4. Your code and Figma are now connected!');
    
    return {
      success: true,
      fileKey,
      fileName,
      figmaUrl: `https://www.figma.com/file/${fileKey}/${fileName.replace(/\s+/g, '-')}`,
      designSpec
    };
    
  } catch (error) {
    console.error('\n❌ Error connecting to Figma:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('\n🔑 Authentication Error:');
      console.log('- Check that your FIGMA_ACCESS_TOKEN is correct');
      console.log('- Make sure the token has the right permissions');
      console.log('- Get a new token from: https://www.figma.com/developers/api#access-tokens');
    } else if (error.response?.status === 403) {
      console.log('\n🚫 Permission Error:');
      console.log('- Make sure you have access to the team/project');
      console.log('- Check that your token has team access permissions');
    }
    
    throw error;
  }
}

// Run the script
if (require.main === module) {
  connectToFigmaProject()
    .then((result) => {
      console.log('\n✨ Integration complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Integration failed');
      process.exit(1);
    });
}

module.exports = { connectToFigmaProject };
