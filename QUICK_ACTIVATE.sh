#!/bin/bash

# Quick Activation Script for CI/CD Workflows
# This script helps you activate the workflows with minimal effort

set -e

echo "🚀 CI/CD Workflow Quick Activation Script"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Repository details
REPO_URL="https://github.com/ashwinjyoti-ship-it/theprolificpoppin.git"
REPO_NAME="theprolificpoppin"
PACKAGE_DIR="/home/ubuntu/workflow_activation_package"

echo -e "${BLUE}This script will help you activate the CI/CD workflows.${NC}"
echo ""
echo "Choose your activation method:"
echo "1) Git Clone & Push (Recommended)"
echo "2) Copy files to existing clone"
echo "3) Show manual instructions"
echo "4) Exit"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo -e "${YELLOW}Method 1: Git Clone & Push${NC}"
        echo "================================"
        echo ""
        
        # Check if git is installed
        if ! command -v git &> /dev/null; then
            echo -e "${RED}Error: git is not installed${NC}"
            exit 1
        fi
        
        # Create temporary directory
        TEMP_DIR="/tmp/theprolificpoppin_activation"
        
        echo -e "${BLUE}Step 1: Cleaning up any previous attempts...${NC}"
        rm -rf "$TEMP_DIR"
        
        echo -e "${BLUE}Step 2: Cloning repository...${NC}"
        git clone "$REPO_URL" "$TEMP_DIR"
        
        echo -e "${BLUE}Step 3: Copying workflow files...${NC}"
        cp -r "$PACKAGE_DIR/.github" "$TEMP_DIR/"
        cp "$PACKAGE_DIR/projects.json" "$TEMP_DIR/"
        cp "$PACKAGE_DIR/WORKFLOW_ACTIVATION_GUIDE.md" "$TEMP_DIR/"
        
        echo -e "${BLUE}Step 4: Staging files...${NC}"
        cd "$TEMP_DIR"
        git add .github/ projects.json WORKFLOW_ACTIVATION_GUIDE.md
        
        echo -e "${BLUE}Step 5: Creating commit...${NC}"
        git commit -m "Add CI/CD workflows for automated deployment

- Add deployment workflow for Vercel and Cloudflare Pages
- Add D1 database manager for database operations
- Add secrets sync workflow for credential management
- Add project configuration and documentation"
        
        echo ""
        echo -e "${YELLOW}Ready to push!${NC}"
        echo ""
        echo "The files are staged and committed. To complete activation:"
        echo ""
        echo -e "${GREEN}cd $TEMP_DIR${NC}"
        echo -e "${GREEN}git push origin main${NC}"
        echo ""
        echo "Or run this command now:"
        read -p "Push to GitHub now? (y/n): " push_now
        
        if [ "$push_now" = "y" ] || [ "$push_now" = "Y" ]; then
            echo ""
            echo -e "${BLUE}Pushing to GitHub...${NC}"
            git push origin main
            echo ""
            echo -e "${GREEN}✅ Success! Workflows activated!${NC}"
            echo ""
            echo "Next steps:"
            echo "1. Configure secrets in repository settings"
            echo "2. Go to Actions tab: https://github.com/ashwinjyoti-ship-it/theprolificpoppin/actions"
            echo "3. Test the 'Deploy Project' workflow"
        else
            echo ""
            echo -e "${YELLOW}Push skipped. Run these commands when ready:${NC}"
            echo -e "${GREEN}cd $TEMP_DIR${NC}"
            echo -e "${GREEN}git push origin main${NC}"
        fi
        ;;
        
    2)
        echo ""
        echo -e "${YELLOW}Method 2: Copy to Existing Clone${NC}"
        echo "=================================="
        echo ""
        
        EXISTING_CLONE="/home/ubuntu/github_repos/theprolificpoppin"
        
        if [ ! -d "$EXISTING_CLONE" ]; then
            echo -e "${RED}Error: Repository not found at $EXISTING_CLONE${NC}"
            echo "Please use Method 1 instead."
            exit 1
        fi
        
        echo -e "${BLUE}Step 1: Updating repository...${NC}"
        cd "$EXISTING_CLONE"
        git fetch origin
        git checkout main
        git pull origin main
        
        echo -e "${BLUE}Step 2: Copying workflow files...${NC}"
        cp -r "$PACKAGE_DIR/.github" .
        cp "$PACKAGE_DIR/projects.json" .
        cp "$PACKAGE_DIR/WORKFLOW_ACTIVATION_GUIDE.md" .
        
        echo -e "${BLUE}Step 3: Staging files...${NC}"
        git add .github/ projects.json WORKFLOW_ACTIVATION_GUIDE.md
        
        echo -e "${BLUE}Step 4: Creating commit...${NC}"
        git commit -m "Add CI/CD workflows for automated deployment"
        
        echo ""
        echo -e "${YELLOW}Ready to push!${NC}"
        echo ""
        read -p "Push to GitHub now? (y/n): " push_now
        
        if [ "$push_now" = "y" ] || [ "$push_now" = "Y" ]; then
            echo ""
            echo -e "${BLUE}Pushing to GitHub...${NC}"
            git push origin main
            echo ""
            echo -e "${GREEN}✅ Success! Workflows activated!${NC}"
        else
            echo ""
            echo -e "${YELLOW}Push skipped. Run this command when ready:${NC}"
            echo -e "${GREEN}cd $EXISTING_CLONE && git push origin main${NC}"
        fi
        ;;
        
    3)
        echo ""
        echo -e "${YELLOW}Manual Activation Instructions${NC}"
        echo "=============================="
        echo ""
        echo "Option A: GitHub Web UI"
        echo "----------------------"
        echo "1. Go to: https://github.com/ashwinjyoti-ship-it/theprolificpoppin"
        echo "2. Click 'Add file' → 'Create new file'"
        echo "3. Type: .github/workflows/deploy-project.yml"
        echo "4. Copy content from: $PACKAGE_DIR/.github/workflows/deploy-project.yml"
        echo "5. Commit the file"
        echo "6. Repeat for other .yml files and projects.json"
        echo ""
        echo "Option B: Git Commands"
        echo "---------------------"
        echo "git clone $REPO_URL"
        echo "cd $REPO_NAME"
        echo "cp -r $PACKAGE_DIR/.github ."
        echo "cp $PACKAGE_DIR/projects.json ."
        echo "git add ."
        echo "git commit -m 'Add CI/CD workflows'"
        echo "git push origin main"
        echo ""
        echo "Option C: GitHub CLI"
        echo "-------------------"
        echo "gh auth login"
        echo "gh repo clone ashwinjyoti-ship-it/theprolificpoppin"
        echo "cd theprolificpoppin"
        echo "cp -r $PACKAGE_DIR/.github ."
        echo "cp $PACKAGE_DIR/projects.json ."
        echo "git add ."
        echo "git commit -m 'Add CI/CD workflows'"
        echo "git push"
        echo ""
        ;;
        
    4)
        echo ""
        echo "Exiting. Files are ready at: $PACKAGE_DIR"
        exit 0
        ;;
        
    *)
        echo ""
        echo -e "${RED}Invalid choice. Please run the script again.${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${BLUE}📚 Additional Resources:${NC}"
echo "- Interactive Guide: file://$PACKAGE_DIR/index.html"
echo "- Detailed Instructions: $PACKAGE_DIR/WORKFLOW_ACTIVATION_GUIDE.md"
echo "- Status Report: $PACKAGE_DIR/AUTOMATION_STATUS.md"
echo ""
echo -e "${GREEN}🎉 Thank you for using the Quick Activation Script!${NC}"
