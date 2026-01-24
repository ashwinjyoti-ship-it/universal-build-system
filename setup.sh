#!/bin/bash

# Universal Build System Setup
# Run once to configure everything for cross-device access

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🚀 Universal Build System Setup${NC}"
echo ""

# Check if running from Claude Cowork or similar
if [ -f "../claude-deploy-template/.env" ]; then
    echo -e "${GREEN}✓ Found existing Cloudflare credentials${NC}"
    cp ../claude-deploy-template/.env .env
    cp ../claude-deploy-template/deploy ./
    cp ../claude-deploy-template/preview ./
    chmod +x deploy preview
else
    echo -e "${YELLOW}⚠ Cloudflare credentials not found${NC}"
    echo "Please set up your .env file with:"
    echo "  CLOUDFLARE_API_TOKEN=your_token"
    echo "  CLOUDFLARE_ACCOUNT_ID=your_account_id"
fi

# Install dependencies
echo ""
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

# Create GitHub workflow for cross-device deployment
echo ""
echo -e "${BLUE}📝 Setting up GitHub Actions...${NC}"
mkdir -p .github/workflows

cat > .github/workflows/universal-deploy.yml << 'WORKFLOW'
name: Universal Deploy

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: ${{ github.event.repository.name }}
          directory: ./
WORKFLOW

# Create .gitignore
cat > .gitignore << 'GITIGNORE'
node_modules/
.env
*.log
.DS_Store
.wrangler/
dist/
build/
GITIGNORE

# Create README
cat > README.md << 'README'
# Universal Build System

Build any app from any device with simple commands.

## Quick Start

1. **Preview locally:**
   ```bash
   ./preview
   ```

2. **Deploy to Cloudflare:**
   ```bash
   ./deploy my-app-name
   ```

## Works From Anywhere

- Claude.ai (web browser)
- Claude Desktop
- Any computer with Git installed

See `HOW_TO_USE.md` for complete documentation.
README

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Push this repository to GitHub"
echo "2. Add GitHub secrets: CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID"
echo "3. Start building! Just describe what you want to Claude."
echo ""
echo "Example: 'Build me a landing page for my coffee shop'"
