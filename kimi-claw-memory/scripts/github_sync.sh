#!/bin/bash
# GitHub Sync Script for Kimi Claw Memory System
# Pushes to: github.com/dmathpays2-lab/dmath-marketing-agency/kimi-claw-memory/

REPO_URL="https://dmathpays2-lab:${GITHUB_TOKEN}@github.com/dmathpays2-lab/dmath-marketing-agency.git"
WORKSPACE="/root/.openclaw/workspace"
SYNC_DIR="kimi-claw-memory"

cd "$WORKSPACE" || exit 1

# Check for token
if [ -z "$GITHUB_TOKEN" ]; then
    echo "⚠️ GITHUB_TOKEN not set"
    exit 1
fi

# Configure git
git config user.email "kimi-claw@automated.sync" 2>/dev/null
git config user.name "Kimi Claw" 2>/dev/null

# Ensure remote uses token
if ! git remote get-url origin | grep -q "${GITHUB_TOKEN}"; then
    git remote set-url origin "$REPO_URL"
fi

# Create sync directory and copy files
mkdir -p "$SYNC_DIR"
cp AGENTS.md BOOTSTRAP.md IDENTITY.md SOUL.md USER.md MEMORY.md README.md TOOLS.md "$SYNC_DIR/" 2>/dev/null || true
cp -r memory/ scripts/ docs/ briefings/ research/ "$SYNC_DIR/" 2>/dev/null || true

# Stage everything
git add "$SYNC_DIR/"

# Check for changes
if git diff --cached --quiet 2>/dev/null; then
    echo "No changes to sync at $(date '+%Y-%m-%d %H:%M:%S')"
    exit 0
fi

# Commit and push
git commit -m "Memory sync: $(date '+%Y-%m-%d %H:%M:%S') GMT+8"
git push origin master 2>/dev/null || git push origin main 2>/dev/null

echo "✅ Memory synced at $(date '+%Y-%m-%d %H:%M:%S')"
