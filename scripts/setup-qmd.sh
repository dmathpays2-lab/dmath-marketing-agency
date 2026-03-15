#!/bin/bash
# QMD Setup Script for OpenClaw
# Based on Kevin Jeppesen's / The Operator Vault recommendations
# https://theoperatorvault.io

set -e

echo "🔧 QMD Setup for OpenClaw"
echo "=========================="
echo ""

# Check if Bun is installed
if ! command -v ~/.bun/bin/bun &> /dev/null; then
    echo "📦 Installing Bun..."
    curl -fsSL https://bun.sh/install | bash
fi

export PATH="$HOME/.bun/bin:$PATH"

# Check if QMD is installed
if ! command -v qmd &> /dev/null; then
    echo "📦 Installing QMD..."
    bun install -g @tobilu/qmd
    
    # Build QMD if needed
    if [ ! -d "$HOME/.bun/install/global/node_modules/@tobilu/qmd/dist" ]; then
        echo "🔨 Building QMD from source..."
        cd "$HOME/.bun/install/global/node_modules/@tobilu/qmd"
        bun install
        bun run build
    fi
fi

# Verify installation
echo "✅ Verifying QMD installation..."
qmd --version

echo ""
echo "📝 Setting up QMD collections..."

# Set up XDG directories for OpenClaw integration
export XDG_CONFIG_HOME="${OPENCLAW_STATE_DIR:-$HOME/.openclaw}/agents/main/qmd/xdg-config"
export XDG_CACHE_HOME="${OPENCLAW_STATE_DIR:-$HOME/.openclaw}/agents/main/qmd/xdg-cache"

mkdir -p "$XDG_CONFIG_HOME" "$XDG_CACHE_HOME"

# Create collections for our memory structure
echo "  Creating workspace collection..."
qmd collection add /root/.openclaw/workspace --name workspace --mask "**/*.md" 2>/dev/null || echo "    Collection already exists"

echo "  Creating daily-logs collection..."
qmd collection add /root/.openclaw/workspace/memory/daily --name daily-logs --mask "*.md" 2>/dev/null || echo "    Collection already exists"

echo "  Creating projects collection..."
qmd collection add /root/.openclaw/workspace/memory/projects --name projects --mask "**/*.md" 2>/dev/null || echo "    Collection already exists"

echo ""
echo "🔄 Initial indexing (this may take a few minutes on first run)..."
qmd update
qmd embed

echo ""
echo "🧪 Testing QMD..."
qmd query "test" -c workspace --json > /dev/null 2>&1 && echo "✅ QMD is working!"

echo ""
echo "📋 Next Steps:"
echo "=============="
echo "1. Add the QMD config to your OpenClaw gateway config"
echo "   (See: config/qmd-memory.config.js)"
echo ""
echo "2. Restart OpenClaw gateway to apply changes"
echo ""
echo "3. Your memory will now use QMD hybrid search (BM25 + vectors + reranking)"
echo ""
echo "💰 Cost Savings: ~$67-510/month in API costs eliminated!"
echo ""
