# 🎨 Figma Integration Setup Guide for Ghazal Erfani

This guide will help you set up the bidirectional Figma integration for your portfolio, allowing you to sync designs between your code and Figma in real-time.

## 📋 Prerequisites

- Figma account: **ghazal.erfani.2140@gmail.com**
- Portfolio running locally on `http://localhost:3001`
- Access to Figma Developer settings

## 🚀 Step-by-Step Setup

### Step 1: Get Your Figma Personal Access Token

1. **Go to Figma Developer Settings**
   - Visit: https://www.figma.com/developers/api#access-tokens
   - Sign in with your account: `ghazal.erfani.2140@gmail.com`

2. **Create New Token**
   - Click "Create new personal access token"
   - Name: `Portfolio Integration`
   - Description: `Bidirectional sync for Ghazal Erfani Portfolio`
   - Click "Create token"

3. **Copy the Token**
   - **IMPORTANT**: Copy the token immediately (you won't see it again)
   - It should look like: `figd_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

### Step 2: Configure Environment Variables

1. **Open your `.env.local` file** (already created in your project)

2. **Add your token**:
   ```env
   FIGMA_ACCESS_TOKEN=figd_your_actual_token_here
   ```

3. **Get your Figma file key** (if you have an existing file):
   - Open your Figma file
   - Copy the file key from URL: `https://www.figma.com/file/FILE_KEY/FILE_NAME`
   - Add to `.env.local`:
   ```env
   FIGMA_FILE_KEY=your_file_key_here
   ```

### Step 3: Access the Integration

1. **Start your development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Open the Figma integration page**:
   - Go to: http://localhost:3001/figma-demo
   - You should see the Figma Integration interface

### Step 4: Push Your Portfolio Design to Figma

1. **Click "Push Design to Figma"**
   - This will create Figma components from your current portfolio
   - If you don't have a file key, it will create a new Figma file for you

2. **What gets created in Figma**:
   - 🎯 Main interactive bubble with gradient
   - 🔵 Persona bubbles (Engineer, Educator, Movement Builder)
   - 🎨 Color palette with all your design tokens
   - 📱 Inspiration card components
   - 🎭 Typography styles

### Step 5: Enable Real-time Sync

1. **Click "Start Real-time Sync"**
   - This monitors your Figma file for changes every 5 seconds
   - Changes will be detected and shown in the interface

2. **Make changes in Figma**:
   - Change colors of the bubbles
   - Modify text styles
   - Adjust spacing or sizes
   - The sync will detect these changes

3. **Apply changes to your code**:
   - Review detected changes in the interface
   - Click "Apply Changes" to update your portfolio

## 🎨 What You Can Sync

### From Code → Figma:
- ✅ Interactive bubble chart design
- ✅ Color palette (accent1, accent2, accent3, gradients)
- ✅ Typography system (headings, body text)
- ✅ Component layouts (cards, timelines)
- ✅ Spacing and sizing tokens
- ✅ Animation properties

### From Figma → Code:
- ✅ Color changes
- ✅ Typography updates
- ✅ Spacing modifications
- ✅ Component styling
- ✅ Layout adjustments

## 🔧 Advanced Features

### Design Token Extraction
Your portfolio's design tokens are automatically extracted:
- **Colors**: All accent colors, persona colors, gradients
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Margins, paddings, component dimensions
- **Animations**: Duration, easing, effects

### Component Mapping
- `BubbleChart` → Figma interactive bubbles
- `InspirationCard` → Figma card components
- `PersonaSection` → Figma persona layouts
- `Header` → Figma navigation components

## 🚨 Troubleshooting

### Common Issues:

1. **"Invalid Figma configuration" error**
   - Check that your `FIGMA_ACCESS_TOKEN` is correctly set
   - Ensure the token starts with `figd_`
   - Restart your development server after adding the token

2. **"File key is required" error**
   - Add a `FIGMA_FILE_KEY` to your `.env.local`
   - Or let the system create a new file for you

3. **"Failed to push design" error**
   - Check your internet connection
   - Verify your Figma token has the right permissions
   - Check the browser console for detailed error messages

4. **Sync not detecting changes**
   - Make sure you're editing the correct Figma file
   - Changes need to be saved in Figma
   - Check that the watched nodes exist in your file

## 📱 Mobile Testing

The integration works on mobile devices:
- Responsive design for the integration interface
- Touch-friendly controls
- Mobile-optimized sync status indicators

## 🎯 Next Steps

1. **Experiment with the sync**:
   - Push your design to Figma
   - Make changes in Figma
   - See them reflected in your portfolio

2. **Customize the integration**:
   - Modify which components get synced
   - Add new design tokens
   - Customize the sync frequency

3. **Build your design system**:
   - Use Figma as your design source of truth
   - Keep your code and designs in perfect sync
   - Collaborate with designers seamlessly

## 🆘 Need Help?

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your Figma token and file permissions
3. Ensure your `.env.local` file is properly configured
4. Restart your development server after making changes

---

**Happy designing! 🎨✨**

Your portfolio now has a powerful bidirectional connection with Figma, making it easy to iterate on designs and keep everything in sync.
