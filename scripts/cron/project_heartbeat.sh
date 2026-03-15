#!/bin/bash
#
# project_heartbeat.sh - Daily project check for active work
# Surfaces risks, deadlines, and progress

set -e

WORKSPACE="/root/.openclaw/workspace"
DATE=$(date +%Y-%m-%d)
PROJECTS_DIR="$WORKSPACE/memory/projects"

echo "🏗️ Project Heartbeat - $DATE"
echo "========================================"

# Check if projects directory exists
if [ ! -d "$PROJECTS_DIR" ]; then
    echo "⚠️  No projects directory found"
    mkdir -p "$PROJECTS_DIR"
    exit 0
fi

# Count active projects
PROJECT_COUNT=$(find "$PROJECTS_DIR" -name "*.md" -type f 2>/dev/null | wc -l)

if [ "$PROJECT_COUNT" -eq 0 ]; then
    echo "📭 No active projects found"
    echo "Create project files in memory/projects/ to track them"
    exit 0
fi

echo "📁 Active projects: $PROJECT_COUNT"
echo ""

# Check each project
find "$PROJECTS_DIR" -name "*.md" -type f | while read -r project; do
    PROJECT_NAME=$(basename "$project" .md)
    LAST_MODIFIED=$(stat -c %Y "$project" 2>/dev/null || stat -f %m "$project" 2>/dev/null || echo "0")
    DAYS_SINCE=$(( ( $(date +%s) - LAST_MODIFIED ) / 86400 ))
    
    echo "🔍 Project: $PROJECT_NAME"
    echo "   Last modified: $DAYS_SINCE days ago"
    
    # Check for deadlines in project file
    if grep -q -i "deadline\|due\|milestone" "$project" 2>/dev/null; then
        echo "   ⚠️  Has deadlines/milestones - check for upcoming dates"
    fi
    
    # Warn if stale (>7 days)
    if [ "$DAYS_SINCE" -gt 7 ]; then
        echo "   🚧 STALE: No activity for $DAYS_SINCE days"
    fi
    
    echo ""
done

# Create project status summary
cat > "$WORKSPACE/briefings/project_status_${DATE}.md" << EOF
# 🏗️ Project Status - $DATE

## 📊 Summary
- Total active projects: $PROJECT_COUNT
- Last checked: $(date '+%Y-%m-%d %H:%M:%S %Z')

## 🚨 Attention Needed
$(find "$PROJECTS_DIR" -name "*.md" -mtime +7 -exec basename {} .md \; 2>/dev/null | sed 's/^/- ⚠️ /; s/$/ (stale)/')

## 📅 All Active Projects
$(find "$PROJECTS_DIR" -name "*.md" -exec basename {} .md \; 2>/dev/null | sed 's/^/- /')

---
*Projects with no activity for 7+ days are flagged as stale*
EOF

echo "✅ Project status saved: briefings/project_status_${DATE}.md"
echo "========================================"

exit 0
