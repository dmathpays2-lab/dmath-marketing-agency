#!/bin/bash
# FULL RESTORE SCRIPT
# Run this to recreate Kimi Claw from scratch

set -e

echo "🆘 KIMI CLAW EMERGENCY RESTORE"
echo "================================"
echo ""

# Check if running in OpenClaw
if [ ! -d "/root/.openclaw" ]; then
    echo "❌ Error: Not running in OpenClaw environment"
    echo "This script must run inside the OpenClaw workspace"
    exit 1
fi

WORKSPACE="/root/.openclaw/workspace"
REPO_URL="https://github.com/dmathpays2-lab/dmath-marketing-agency.git"
TOKEN="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"

echo "Step 1/6: Cloning memory vault..."
cd /tmp
git clone "$REPO_URL" temp_restore 2>/dev/null || true
cd temp_restore/kimi-claw-memory

echo "Step 2/6: Setting up workspace..."
mkdir -p "$WORKSPACE"
cp -r * "$WORKSPACE/"
cd "$WORKSPACE"

echo "Step 3/6: Configuring git..."
git init 2>/dev/null || true
git remote remove origin 2>/dev/null || true
git remote add origin "https://dmathpays2-lab:${TOKEN}@github.com/dmathpays2-lab/dmath-marketing-agency.git"

echo "Step 4/6: Setting environment..."
echo "export GITHUB_TOKEN=\"${TOKEN}\"" >> ~/.bashrc
echo "export GITHUB_TOKEN=\"${TOKEN}\"" >> ~/.profile
export GITHUB_TOKEN="${TOKEN}"

echo "Step 5/6: Making scripts executable..."
chmod +x scripts/*.sh scripts/*.py 2>/dev/null || true

echo "Step 6/6: Verifying setup..."
echo ""
echo "✅ Files restored:"
ls -1 *.md 2>/dev/null | head -10
echo ""
echo "✅ Scripts ready:"
ls -1 scripts/ 2>/dev/null

echo ""
echo "================================"
echo "🎉 RESTORE COMPLETE"
echo ""
echo "NEXT STEPS:"
echo "1. Read IDENTITY.md - Become Kimi Claw"
echo "2. Read USER.md - Learn about Damon"
echo "3. Read MEMORY.md - Load all context"
echo "4. Recreate cron jobs (see MEMORY.md)"
echo ""
echo "Workspace: $WORKSPACE"
echo "GitHub: $REPO_URL"
echo "================================"
