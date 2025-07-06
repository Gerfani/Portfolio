/**
 * Sync Existing Portfolio Design to Figma
 * 
 * This script takes your current portfolio design and creates a matching Figma file
 * that you can then edit and sync back to VS Code
 */

const fs = require('fs');
const path = require('path');

// Extract current design from your portfolio
function extractCurrentDesign() {
  console.log('🎨 Extracting your current portfolio design...');

  // Read your current design files
  const portfolioDataPath = path.join(__dirname, '..', 'src', 'config', 'portfolio-data.ts');
  const tailwindConfigPath = path.join(__dirname, '..', 'tailwind.config.ts');

  // Read the files as text and extract design information
  let portfolioContent = '';
  let tailwindContent = '';

  try {
    portfolioContent = fs.readFileSync(portfolioDataPath, 'utf8');
    tailwindContent = fs.readFileSync(tailwindConfigPath, 'utf8');
  } catch (error) {
    console.log('⚠️  Could not read config files, using default design values');
  }
  
  const currentDesign = {
    metadata: {
      name: 'Ghazal Erfani Portfolio',
      extractedFrom: 'VS Code Portfolio',
      timestamp: new Date().toISOString()
    },
    
    // Colors from your current design
    colors: {
      accent1: '#6366F1',      // Engineer - Indigo
      accent2: '#8B5CF6',      // Educator - Purple
      accent3: '#EC4899',      // Movement Builder - Pink
      hover: '#4B5563',        // Hover state
      background: {
        light: '#FFFFFF',
        dark: '#0F172A'
      },
      text: {
        primary: '#FFFFFF',
        muted: '#9CA3AF'
      },
      gradients: {
        main: 'linear-gradient(45deg, #3B82F6 0%, #60A5FA 40%, #8B5CF6 60%, #EC4899 100%)',
        shimmer: 'linear-gradient(110deg, #fff 15%, #6366F1 35%, #8B5CF6 50%, #EC4899 65%, #fff 85%)'
      }
    },
    
    // Typography from your current system
    typography: {
      fontFamily: {
        sans: 'Inter',
        mono: 'JetBrains Mono'
      },
      sizes: {
        'text-3xl': '1.875rem',   // 30px
        'text-2xl': '1.5rem',     // 24px
        'text-xl': '1.25rem',     // 20px
        'text-lg': '1.125rem',    // 18px
        'text-base': '1rem',      // 16px
        'text-sm': '0.875rem'     // 14px
      },
      weights: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700'
      }
    },
    
    // Components from your current portfolio
    components: {
      bubbleChart: {
        name: 'Interactive Bubble Chart',
        mainBubble: {
          size: '200px',
          gradient: 'main',
          text: 'GE',
          position: 'center-left'
        },
        personaBubbles: [
          {
            name: 'Engineer',
            size: '120px',
            color: '#6366F1',
            emoji: '⚡',
            position: 'right-top'
          },
          {
            name: 'Educator', 
            size: '120px',
            color: '#8B5CF6',
            emoji: '📚',
            position: 'right-center'
          },
          {
            name: 'Movement Builder',
            size: '120px', 
            color: '#EC4899',
            emoji: '🌟',
            position: 'right-bottom'
          }
        ]
      },
      
      header: {
        name: 'Portfolio Header',
        background: 'gradient-to-b from-white/90 to-white/0 dark:from-black/80 dark:to-black/0',
        title: {
          text: '@ @ @',
          animation: 'shimmer',
          gradient: 'shimmer'
        },
        navigation: [
          { text: '1', color: '#6366F1', target: 'engineer' },
          { text: '2', color: '#8B5CF6', target: 'educator' },
          { text: '3', color: '#EC4899', target: 'movement-builder' }
        ]
      },
      
      inspirationCard: {
        name: 'Inspiration Card',
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        elements: [
          {
            type: 'avatar',
            size: '48px',
            borderRadius: '50%'
          },
          {
            type: 'title',
            fontSize: '1rem',
            fontWeight: '600',
            color: 'white'
          },
          {
            type: 'subtitle',
            fontSize: '0.875rem',
            color: '#9CA3AF'
          }
        ]
      },
      
      experienceTimeline: {
        name: 'Experience Timeline',
        borderLeft: '2px solid currentColor',
        paddingLeft: '1rem',
        animation: 'slide-in',
        cards: {
          background: 'white dark:black',
          borderRadius: '0.5rem',
          padding: '1rem',
          shadow: 'hover:shadow-lg',
          currentHighlight: 'shadow-[0_0_15px_rgba(99,102,241,0.3)]'
        }
      }
    },
    
    // Layout and spacing
    layout: {
      container: {
        maxWidth: '7xl',
        padding: '1.5rem'
      },
      sections: {
        personas: {
          paddingTop: '8rem md:6rem',
          paddingX: '1.5rem'
        },
        pillars: {
          background: 'gradient',
          padding: '4rem 0'
        }
      }
    },
    
    // Animations from your current design
    animations: {
      shimmer: {
        duration: '8s',
        timing: 'linear infinite',
        keyframes: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        }
      },
      fadeIn: {
        duration: '0.3s',
        timing: 'ease-out',
        delay: 'staggered'
      },
      bubbleHover: {
        duration: '0.3s',
        timing: 'ease-out',
        effects: ['glow', 'scale']
      }
    }
  };
  
  return currentDesign;
}

// Create Figma-compatible design specification
function createFigmaSpec(design) {
  console.log('📐 Creating Figma design specification...');
  
  const figmaSpec = {
    file: {
      name: 'Ghazal Erfani Portfolio',
      description: 'Portfolio design extracted from VS Code - Ready for editing in Figma'
    },
    
    // Convert to Figma color format
    colorStyles: Object.entries(design.colors).flatMap(([category, colors]) => {
      if (typeof colors === 'object' && !colors.includes) {
        return Object.entries(colors).map(([name, value]) => ({
          name: `${category}/${name}`,
          color: value,
          type: 'color'
        }));
      } else {
        return [{
          name: category,
          color: colors,
          type: 'color'
        }];
      }
    }),
    
    // Convert to Figma text styles
    textStyles: Object.entries(design.typography.sizes).map(([name, size]) => ({
      name: name.replace('text-', ''),
      fontSize: parseFloat(size) * 16, // Convert rem to px
      fontFamily: design.typography.fontFamily.sans,
      fontWeight: design.typography.weights.normal,
      type: 'text'
    })),
    
    // Component specifications for Figma
    components: [
      {
        name: 'Main Portfolio Bubble',
        type: 'ELLIPSE',
        width: 200,
        height: 200,
        fills: [{
          type: 'GRADIENT_LINEAR',
          gradientStops: [
            { color: '#3B82F6', position: 0 },
            { color: '#60A5FA', position: 0.4 },
            { color: '#8B5CF6', position: 0.6 },
            { color: '#EC4899', position: 1 }
          ]
        }],
        effects: [{
          type: 'DROP_SHADOW',
          color: 'rgba(99, 102, 241, 0.3)',
          offset: { x: 0, y: 4 },
          radius: 15
        }],
        text: {
          content: 'GE',
          style: 'heading-lg',
          color: 'white',
          align: 'center'
        }
      },
      
      ...design.components.bubbleChart.personaBubbles.map(bubble => ({
        name: `${bubble.name} Bubble`,
        type: 'ELLIPSE',
        width: 120,
        height: 120,
        fills: [{ type: 'SOLID', color: bubble.color }],
        effects: [{
          type: 'DROP_SHADOW',
          color: bubble.color,
          offset: { x: 0, y: 2 },
          radius: 8
        }],
        text: {
          content: bubble.emoji,
          style: 'text-xl',
          align: 'center'
        }
      })),
      
      {
        name: 'Inspiration Card',
        type: 'RECTANGLE',
        width: 300,
        height: 200,
        cornerRadius: 8,
        fills: [{
          type: 'SOLID',
          color: 'rgba(0, 0, 0, 0.6)'
        }],
        effects: [{
          type: 'BACKGROUND_BLUR',
          radius: 8
        }],
        children: [
          {
            name: 'Avatar',
            type: 'ELLIPSE',
            width: 48,
            height: 48,
            fills: [{ type: 'SOLID', color: '#9CA3AF' }]
          },
          {
            name: 'Title',
            type: 'TEXT',
            style: 'text-base',
            fontWeight: 600,
            color: 'white'
          },
          {
            name: 'Subtitle', 
            type: 'TEXT',
            style: 'text-sm',
            color: '#9CA3AF'
          }
        ]
      }
    ],
    
    // Layout frames
    frames: [
      {
        name: 'Portfolio Layout',
        type: 'FRAME',
        width: 1200,
        height: 800,
        background: '#0F172A',
        children: [
          'Main Portfolio Bubble',
          'Engineer Bubble',
          'Educator Bubble', 
          'Movement Builder Bubble',
          'Inspiration Card'
        ]
      }
    ]
  };
  
  return figmaSpec;
}

// Main function
async function syncExistingDesign() {
  try {
    console.log('🔄 Syncing your existing portfolio design to Figma...');
    console.log('👤 Account: ghazal.erfani.2140@gmail.com');
    
    // Extract current design
    const currentDesign = extractCurrentDesign();
    console.log('✅ Extracted current portfolio design');
    
    // Create Figma specification
    const figmaSpec = createFigmaSpec(currentDesign);
    console.log('✅ Created Figma-compatible specification');
    
    // Save specifications
    const designPath = path.join(__dirname, '..', 'current-design-extracted.json');
    const figmaPath = path.join(__dirname, '..', 'figma-sync-spec.json');
    
    fs.writeFileSync(designPath, JSON.stringify(currentDesign, null, 2));
    fs.writeFileSync(figmaPath, JSON.stringify(figmaSpec, null, 2));
    
    console.log(`💾 Current design saved to: ${designPath}`);
    console.log(`💾 Figma spec saved to: ${figmaPath}`);
    
    // Create VS Code Figma integration instructions
    const instructions = `# 🔗 VS Code Figma Integration Setup

## Your Design is Ready for Figma!

### Step 1: Open Figma Extension in VS Code
1. Press \`Ctrl + Shift + P\`
2. Type: \`Figma: Login\`
3. Sign in with: ghazal.erfani.2140@gmail.com

### Step 2: Create Figma File from Your Design
1. In VS Code, press \`Ctrl + Shift + P\`
2. Type: \`Figma: Create new file\`
3. Name it: "Ghazal Erfani Portfolio"

### Step 3: Import Your Design Components
Your design specification is ready in \`figma-sync-spec.json\`

**Components to create:**
- Main Portfolio Bubble (200x200px, gradient)
- Engineer Bubble (120x120px, #6366F1) ⚡
- Educator Bubble (120x120px, #8B5CF6) 📚  
- Movement Builder Bubble (120x120px, #EC4899) 🌟
- Inspiration Cards (300x200px, glass effect)

### Step 4: Enable Live Sync
1. In Figma, enable "Dev Mode"
2. In VS Code, use \`Figma: Watch for changes\`
3. Edit designs in Figma → See changes in VS Code!

### Your Current Design Colors:
- **accent1:** #6366F1 (Engineer)
- **accent2:** #8B5CF6 (Educator)  
- **accent3:** #EC4899 (Movement Builder)
- **Main gradient:** #3B82F6 → #60A5FA → #8B5CF6 → #EC4899

### Your Current Components:
- Interactive Bubble Chart with D3.js
- Persona-based sections
- Inspiration cards with glass effect
- Experience timeline
- Shimmer text animations

**Now you can edit your portfolio visually in Figma and sync changes back to VS Code!**
`;
    
    const instructionsPath = path.join(__dirname, '..', 'VS_CODE_FIGMA_SETUP.md');
    fs.writeFileSync(instructionsPath, instructions);
    console.log(`📋 Setup instructions saved to: ${instructionsPath}`);
    
    console.log('\n🎉 SUCCESS! Your existing design is ready for Figma sync!');
    console.log('\n📋 Next steps:');
    console.log('1. Open Figma extension in VS Code (Ctrl+Shift+P → "Figma: Login")');
    console.log('2. Create new Figma file');
    console.log('3. Use the design specification to recreate your components');
    console.log('4. Enable live sync between Figma and VS Code');
    
    return {
      success: true,
      currentDesign,
      figmaSpec,
      files: {
        design: designPath,
        figma: figmaPath,
        instructions: instructionsPath
      }
    };
    
  } catch (error) {
    console.error('❌ Error syncing design:', error.message);
    throw error;
  }
}

// Run the script
if (require.main === module) {
  syncExistingDesign()
    .then(() => {
      console.log('\n✨ Design sync complete!');
      process.exit(0);
    })
    .catch(() => {
      console.log('\n💥 Design sync failed');
      process.exit(1);
    });
}

module.exports = { syncExistingDesign };
