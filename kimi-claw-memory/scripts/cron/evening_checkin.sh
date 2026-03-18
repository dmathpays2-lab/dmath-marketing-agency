#!/bin/bash
#
# evening_checkin.sh - Daily evening check-in at 6 PM
# Checks for blockers, summarizes day, flags items for tomorrow

set -e

WORKSPACE="/root/.openclaw/workspace"
DATE=$(date +%Y-%m-%d)
DAILY_FILE="$WORKSPACE/memory/daily/$DATE.md"
BRIEFINGS_DIR="$WORKSPACE/briefings"

echo "🌆 Evening Check-in - $DATE"
echo "========================================"

# Ensure directories exist
mkdir -p "$WORKSPACE/memory/daily"
mkdir -p "$BRIEFINGS_DIR"
mkdir -p "$WORKSPACE/memory/projects"

# Check if there's a daily note from today
if [ -f "$DAILY_FILE" ]; then
    echo "📄 Found today's daily note"
    TODAY_CONTENT=$(cat "$DAILY_FILE")
else
    echo "📝 No daily note found for today"
    TODAY_CONTENT=""
fi

# Check for active projects
ACTIVE_PROJECTS=$(find "$WORKSPACE/memory/projects" -name "*.md" -type f 2>/dev/null | wc -l)
echo "📁 Active projects: $ACTIVE_PROJECTS"

# Create evening check-in summary
cat > "$BRIEFINGS_DIR/${DATE}_evening.md" << EOF
# 🌆 Evening Check-in - $DATE

## 📊 Day Summary
Generated: $(date '+%Y-%m-%d %H:%M:%S %Z')

## ✅ Accomplishments
- [To be filled during review]

## 🚧 Blockers / Stuck Items
- [Check for any tasks waiting on user input]
- [Flag anything that needs attention]

## 📋 For Tomorrow
- [Pull from today's incomplete items]
- [Flag any deadlines approaching]

## 📝 Daily Note Status
$(if [ -n "$TODAY_CONTENT" ]; then echo "Present - $(wc -l < "$DAILY_FILE") lines"; else echo "None created today"; fi)

## 🏗️ Active Projects
$(if [ "$ACTIVE_PROJECTS" -gt 0 ]; then find "$WORKSPACE/memory/projects" -name "*.md" -exec basename {} .md \; | sed 's/^/- /'; else echo "No active projects tracked"; fi)

---
*This is a template. The actual evening check-in should review today's activity and update accordingly.*
EOF

echo "✅ Evening check-in template created: briefings/${DATE}_evening.md"

# If we're in a cron context, just log success
if [ -n "$CRON_JOB_ID" ]; then
    echo "Evening check-in completed at $(date)"
fi

exit 0
