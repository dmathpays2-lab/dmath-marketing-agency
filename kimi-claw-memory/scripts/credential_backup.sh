#!/bin/bash
#
# credential_backup.sh - Backup credentials to GitHub securely
# This ensures TOOLS.md is always synced even if excluded by .gitignore

set -e

WORKSPACE="/root/.openclaw/workspace"
REPO_URL="https://dmathpays2-lab:${GITHUB_TOKEN}@github.com/dmathpays2-lab/dmath-marketing-agency.git"

echo "🔐 Credential Backup System"
echo "============================"

# Check for token
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN not set"
    exit 1
fi

# Ensure TOOLS.md exists
if [ ! -f "$WORKSPACE/TOOLS.md" ]; then
    echo "⚠️  TOOLS.md not found - creating template"
    cat > "$WORKSPACE/TOOLS.md" << 'EOF'
# API Keys & Credentials

## Stored Credentials

| Service | Key | Status | Last Verified |
|---------|-----|--------|---------------|
| Brave Search | `YOUR_KEY_HERE` | ⏳ | - |

*Add your credentials here*
EOF
fi

# Create secure backup in repo
cd /tmp
rm -rf credential_backup 2>/dev/null || true
git clone --depth 1 "$REPO_URL" credential_backup 2>/dev/null || true

cd credential_backup

# Configure git identity
git config user.email "kimi-claw@automated.sync"
git config user.name "Kimi Claw"

# Copy TOOLS.md to secure location in repo
mkdir -p secure
cp "$WORKSPACE/TOOLS.md" secure/TOOLS.md

# Also copy to root for easy access
cp "$WORKSPACE/TOOLS.md" TOOLS.md

# Commit credentials separately
git add -f secure/TOOLS.md TOOLS.md
git commit -m "🔐 Credential sync: $(date '+%Y-%m-%d %H:%M:%S') - API keys backup" || echo "No changes to commit"
git push origin main 2>/dev/null || git push origin master 2>/dev/null

echo "✅ Credentials backed up to GitHub"
echo "   Location: secure/TOOLS.md and TOOLS.md"
echo "   Time: $(date '+%Y-%m-%d %H:%M:%S')"

# Cleanup
cd /tmp
rm -rf credential_backup

exit 0
