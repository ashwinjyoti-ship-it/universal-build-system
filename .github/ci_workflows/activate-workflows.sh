#!/bin/bash

# Activate GitHub Actions Workflows
# This script moves workflow files from ci_workflows/ to workflows/

set -e

echo "🚀 Activating GitHub Actions Workflows..."
echo ""

# Check if we're in the right directory
if [ ! -d ".github/ci_workflows" ]; then
    echo "❌ Error: Must be run from repository root"
    echo "   Current directory: $(pwd)"
    exit 1
fi

# Create workflows directory if it doesn't exist
mkdir -p .github/workflows

# Count workflow files
WORKFLOW_COUNT=$(ls -1 .github/ci_workflows/*.yml 2>/dev/null | wc -l)

if [ "$WORKFLOW_COUNT" -eq 0 ]; then
    echo "❌ No workflow files found in .github/ci_workflows/"
    exit 1
fi

echo "Found $WORKFLOW_COUNT workflow file(s) to activate:"
ls -1 .github/ci_workflows/*.yml | xargs -n 1 basename
echo ""

# Move workflow files
echo "Moving workflow files..."
for file in .github/ci_workflows/*.yml; do
    filename=$(basename "$file")
    echo "  ✓ $filename"
    mv "$file" ".github/workflows/$filename"
done

echo ""
echo "✅ Workflow files activated!"
echo ""
echo "📋 Next steps:"
echo "   1. Review the changes: git status"
echo "   2. Commit the changes: git add .github/workflows/ && git commit -m 'Activate workflow files'"
echo "   3. Push to GitHub: git push"
echo "   4. Configure required secrets in repository settings"
echo "   5. Test workflows via Actions tab"
echo ""
echo "🔐 Required secrets:"
echo "   - GH_PAT"
echo "   - CLOUDFLARE_API_TOKEN"
echo "   - CLOUDFLARE_ACCOUNT_ID"
echo "   - VERCEL_TOKEN (if using Vercel)"
echo ""
echo "📖 See .github/ci_workflows/README.md for more details"
