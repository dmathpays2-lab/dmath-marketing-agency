#!/bin/bash
#
# weekly_review.sh - Weekly review every Sunday at 6 PM
# Pattern analysis, long-term memory updates, git commit

set -e

WORKSPACE="/root/.openclaw/workspace"
DATE=$(date +%Y-%m-%d)
WEEK_START=$(date -d "last sunday" +%Y-%m-%d 2>/dev/null || date -v-7d +%Y-%m-%d 2>/dev/null || echo "unknown")

echo "📅 Weekly Review - Week of $WEEK_START"
echo "========================================"

# Ensure directories exist
mkdir -p "$WORKSPACE/memory/archives"
mkdir -p "$WORKSPACE/briefings"

# Count daily notes from this week
DAILY_COUNT=$(find "$WORKSPACE/memory/daily" -name "*.md" -mtime -7 2>/dev/null | wc -l)
echo "📄 Daily notes this week: $DAILY_COUNT"

# Count total files changed
FILES_CHANGED=$(find "$WORKSPACE" -name "*.md" -mtime -7 2>/dev/null | wc -l)
echo "📝 Files modified this week: $FILES_CHANGED"

# Create weekly review template
cat > "$WORKSPACE/briefings/weekly_${WEEK_START}.md" << EOF
# 📅 Weekly Review - Week of $WEEK_START

Generated: $(date '+%Y-%m-%d %H:%M:%S %Z')

## 📊 This Week in Numbers
- Daily notes created: $DAILY_COUNT
- Files modified: $FILES_CHANGED
- Active projects: $(find "$WORKSPACE/memory/projects" -name "*.md" 2>/dev/null | wc -l)

## 🔍 Patterns Observed
- [What themes came up this week?]
- [What worked well?]
- [What didn't work?]

## 📚 Key Learnings
- [Extract lessons for USER.md]
- [New preferences discovered]

## 🎯 Next Week Priorities
1. 
2. 
3. 

## 🧹 Maintenance
- [ ] Archive old daily notes (>30 days)
- [ ] Review and update MEMORY.md
- [ ] Check USER.md for new lessons
- [ ] Git commit changes

## ✅ Completed Projects
- [ ] Move finished projects to archives

---
EOF

echo "✅ Weekly review template created: briefings/weekly_${WEEK_START}.md"

# Auto-archive old daily notes (>30 days)
ARCHIVE_DIR="$WORKSPACE/memory/archives/daily"
mkdir -p "$ARCHIVE_DIR"

OLD_NOTES=$(find "$WORKSPACE/memory/daily" -name "*.md" -mtime +30 2>/dev/null || true)
if [ -n "$OLD_NOTES" ]; then
    echo "📦 Archiving old daily notes..."
    echo "$OLD_NOTES" | while read -r file; do
        if [ -f "$file" ]; then
            mv "$file" "$ARCHIVE_DIR/"
            echo "  Archived: $(basename "$file")"
        fi
    done
    echo "✅ Archived $(echo "$OLD_NOTES" | wc -l) old notes"
else
    echo "📭 No old notes to archive"
fi

# Git commit if there are changes
cd "$WORKSPACE"
if [ -d ".git" ]; then
    if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
        git add -A
        git commit -m "Weekly sync: $(date +%Y-%m-%d) - auto backup" || true
        echo "✅ Changes committed to git"
    else
        echo "📭 No changes to commit"
    fi
else
    echo "⚠️  Not a git repository"
fi

echo "========================================"
echo "Weekly review complete!"

exit 0
