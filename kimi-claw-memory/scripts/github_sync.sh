#!/bin/bash
# GitHub Sync Script for Kimi Claw Memory System
# Pushes to: github.com/dmathpays2-lab/dmath-marketing-agency/kimi-claw-memory/

REPO_URL="https://dmathpays2-lab:${GITHUB_TOKEN}@github.com/dmathpays2-lab/dmath-marketing-agency.git"
WORKSPACE="/root/.openclaw/workspace"
SYNC_DIR="kimi-claw-memory"

cd "$WORKSPACE" || exit 1

# Check for token
if [ -z "$GITHUB_TOKEN" ]; then
    echo "⚠️ GITHUB_TOKEN not set. Add to ~/.bashrc:"
    echo "export GITHUB_TOKEN='ghp_your_token_here'"
    exit 1
fi

# Configure git
git config user.email "kimi-claw@automated.sync" 2>/dev/null
git config user.name "Kimi Claw" 2>/dev/null

# Check/add remote
if ! git remote get-url origin >/dev/null 2>&1; then
    git remote add origin "$REPO_URL"
fi

# Create sync directory structure in repo
mkdir -p "$SYNC_DIR"

# Copy all memory files to sync directory
cp AGENTS.md BOOTSTRAP.md IDENTITY.md SOUL.md USER.md MEMORY.md README.md "$SYNC_DIR/" 2>/dev/null
cp -r memory/ scripts/ docs/ "$SYNC_DIR/" 2>/dev/null

# Stage the kimi-claw-memory folder
git add "$SYNC_DIR/"

# Check for changes
if git diff --cached --quiet 2>/dev/null; then
    echo "No changes to sync at $(date '+%Y-%m-%d %H:%M:%S')"
    exit 0
fi

# Commit and push
git commit -m "Memory sync: $(date '+%Y-%m-%d %H:%M:%S') GMT+8"
git push origin master 2>/dev/null || git push origin main 2>/dev/null || echo "Push failed - check token/repo"

echo "✅ Memory synced to MCA vault/kimi-claw-memory/ at $(date '+%Y-%m-%d %H:%M:%S')"
