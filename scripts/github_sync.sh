#!/bin/bash
# GitHub Sync Script for Kimi Claw Memory System
# Pushes memory files to: github.com/dmathpays2-lab/kimi-claw-memory

REPO_URL="https://dmathpays2-lab:${GITHUB_TOKEN}@github.com/dmathpays2-lab/kimi-claw-memory.git"
WORKSPACE="/root/.openclaw/workspace"

cd "$WORKSPACE" || exit 1

# Configure git (idempotent)
git config user.email "kimi-claw@automated.sync" 2>/dev/null
git config user.name "Kimi Claw" 2>/dev/null

# Check if remote exists, add if not
if ! git remote get-url origin >/dev/null 2>&1; then
    git remote add origin "$REPO_URL"
    echo "Remote 'origin' added"
fi

# Stage all memory-related files
git add AGENTS.md BOOTSTRAP.md IDENTITY.md SOUL.md USER.md MEMORY.md README.md
git add memory/ scripts/ docs/ 2>/dev/null

# Check if there are changes to commit
if git diff --cached --quiet 2>/dev/null; then
    echo "No changes to sync at $(date '+%Y-%m-%d %H:%M:%S')"
    exit 0
fi

# Commit with timestamp
git commit -m "Memory sync: $(date '+%Y-%m-%d %H:%M:%S') GMT+8"

# Push to GitHub
git push origin master 2>/dev/null || git push origin main 2>/dev/null || {
    echo "⚠️ Push failed. Repo may not exist yet or GITHUB_TOKEN not set."
    echo "To create repo: https://github.com/new"
    echo "Repo name: kimi-claw-memory"
    echo "Then: git push -u origin master"
}

echo "Memory sync completed at $(date '+%Y-%m-%d %H:%M:%S')"
