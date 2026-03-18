#!/bin/bash
# Weekly OpenClaw Upgrade Checker
# Runs every Sunday at 9 AM
# Notifies user if upgrade is available

LOG_FILE="/root/.openclaw/workspace/logs/upgrade-checks.log"
mkdir -p "$(dirname "$LOG_FILE")"

echo "$(date '+%Y-%m-%d %H:%M:%S') - Checking for OpenClaw upgrades..." >> "$LOG_FILE"

# Get current version
CURRENT_VERSION=$(openclaw version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)
if [ -z "$CURRENT_VERSION" ]; then
    CURRENT_VERSION=$(cat /usr/lib/node_modules/openclaw/package.json 2>/dev/null | grep '"version"' | head -1 | sed 's/.*"version": "\([^"]*\)".*/\1/')
fi

# Get latest version from npm
LATEST_VERSION=$(npm view openclaw version 2>/dev/null)

if [ -z "$LATEST_VERSION" ]; then
    echo "$(date '+%Y-%m-%d %H:%M:%S') - ERROR: Could not fetch latest version" >> "$LOG_FILE"
    exit 1
fi

echo "$(date '+%Y-%m-%d %H:%M:%S') - Current: $CURRENT_VERSION | Latest: $LATEST_VERSION" >> "$LOG_FILE"

# Compare versions
if [ "$CURRENT_VERSION" != "$LATEST_VERSION" ]; then
    # New version available!
    cat > /tmp/upgrade-notification.txt << EOF
🦞 OPENCLAW UPGRADE AVAILABLE

Current: $CURRENT_VERSION
Latest:  $LATEST_VERSION

Run to upgrade:
  openclaw upgrade

Or manually:
  npm i -g openclaw@$LATEST_VERSION

Changelog: https://docs.openclaw.ai/changelog
EOF

    # Store notification for user
    cp /tmp/upgrade-notification.txt /root/.openclaw/workspace/.upgrade-available
    
    echo "$(date '+%Y-%m-%d %H:%M:%S') - UPGRADE AVAILABLE: $LATEST_VERSION" >> "$LOG_FILE"
    
    # Also log to memory
    echo "## Upgrade Available - $(date '+%Y-%m-%d')" >> /root/.openclaw/workspace/memory/upgrade-notifications.md
    echo "- Current: $CURRENT_VERSION" >> /root/.openclaw/workspace/memory/upgrade-notifications.md
    echo "- Latest: $LATEST_VERSION" >> /root/.openclaw/workspace/memory/upgrade-notifications.md
    echo "- Status: Pending user approval" >> /root/.openclaw/workspace/memory/upgrade-notifications.md
    echo "" >> /root/.openclaw/workspace/memory/upgrade-notifications.md
    
else
    echo "$(date '+%Y-%m-%d %H:%M:%S') - No upgrade needed. Running latest." >> "$LOG_FILE"
    rm -f /root/.openclaw/workspace/.upgrade-available
fi
