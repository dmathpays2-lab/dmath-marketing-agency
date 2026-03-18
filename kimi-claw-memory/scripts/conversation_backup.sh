#!/bin/bash
# Conversation Backup Trigger
# Called automatically during/after conversations

WORKSPACE="/root/.openclaw/workspace"
CONVERSATION_DIR="$WORKSPACE/memory/conversations"
DATE=$(date +%Y-%m-%d)
TIME=$(date +%H%M%S)

# Ensure directory exists
mkdir -p "$CONVERSATION_DIR/$DATE"

# Log the backup trigger
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Conversation backup triggered" >> "$CONVERSATION_DIR/backup.log"

# Run GitHub sync
export GITHUB_TOKEN='[REDACTED_GITHUB_TOKEN]'
cd "$WORKSPACE" && bash scripts/github_sync.sh >> "$CONVERSATION_DIR/backup.log" 2>&1

echo "✅ Conversation backed up at $(date '+%Y-%m-%d %H:%M:%S')"