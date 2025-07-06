# 🎨 Connect VS Code to Your Figma Project

## Your Figma Project:
**URL:** https://www.figma.com/files/team/1522772323245093069/project/411372033/Ghazal-Erfani-Portfolio
**Team ID:** 1522772323245093069
**Project ID:** 411372033

## Step 1: Get Your Figma Token (2 minutes)

1. **Open Figma Developer Settings**:
   - Go to: https://www.figma.com/developers/api#access-tokens
   - Sign in with: `ghazal.erfani.2140@gmail.com`

2. **Create Token**:
   - Click "Create new personal access token"
   - Name: `VS Code Portfolio Integration`
   - Click "Create token"
   - **Copy the token** (starts with `figd_`)

## Step 2: Add Token to VS Code

1. **Open `.env.local` file** (already configured with your project details)

2. **Replace the placeholder**:
   ```env
   FIGMA_ACCESS_TOKEN=figd_your_actual_token_here
   ```

   Replace `figd_your_actual_token_here` with your actual token

## Step 3: Connect to Your Project

1. **Open VS Code Terminal** (Ctrl + `)

2. **Run the command**:
   ```bash
   npm run figma:connect
   ```

3. **This will**:
   - Connect directly to your existing Figma project
   - Create a new file "Ghazal Erfani Portfolio - Design System"
   - Generate design specifications for your portfolio
   - Give you the exact Figma file URL
   - Create manual setup instructions

## What Gets Created:

- 🎯 **Main Portfolio Bubble** with your gradient colors
- ⚡ **Engineer Bubble** (#6366F1 - Indigo)
- 📚 **Educator Bubble** (#8B5CF6 - Purple)
- 🌟 **Movement Builder Bubble** (#EC4899 - Pink)
- 🎨 **Color Palette** with all your exact design tokens
- 📋 **Manual setup guide** for creating components in Figma

## After Connection:

- Your Figma file will be created in your existing project
- You'll get a direct URL to the file
- Manual instructions will guide you to create the components
- Your VS Code and Figma will be connected

## Need Help?

If you get any errors:
1. Make sure your Figma token is correct and has team access
2. Check that you're signed in to Figma with ghazal.erfani.2140@gmail.com
3. Ensure you have access to the team/project

**Ready? Run `npm run figma:connect` in your terminal!** 🚀
