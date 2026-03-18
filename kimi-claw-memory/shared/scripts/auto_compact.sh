#!/bin/bash
# Auto-compaction script for OpenClaw sessions
# Run this daily to prevent context bloat

MAX_SESSION_SIZE=500000  # 500KB threshold
MAX_CONTEXT_PERCENT=75   # 75% context threshold

SESSION_DIR="/root/.openclaw/agents/main/sessions"
LARGE_SESSIONS=$(find "$SESSION_DIR" -name "*.jsonl" -size +${MAX_SESSION_SIZE}c 2>/dev/null)

if [ -n "$LARGE_SESSIONS" ]; then
    echo "Found large session files:"
    echo "$LARGE_SESSIONS"
    
    # Backup
    mkdir -p /root/.openclaw/backups/auto/$(date +%Y%m%d_%H%M%S)
    cp $LARGE_SESSIONS /root/.openclaw/backups/auto/$(date +%Y%m%d_%H%M%S)/
    
    # Truncate to last 50 entries
    for file in $LARGE_SESSIONS; do
        echo "Compacting: $file"
        tail -n 50 "$file" > "${file}.tmp" && mv "${file}.tmp" "$file"
    done
    
    echo "Compaction complete at $(date)"
else
    echo "No large sessions found at $(date)"
fi
