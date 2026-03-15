# Smart Cron System - Complete Schedule

All cron jobs now use lightweight script calls (prevents timeouts).

---

## 📋 Complete Cron Schedule

| Time | Job | Purpose | Script |
|------|-----|---------|--------|
| 8:00 AM | daily-morning-briefing | Start day with focus + revenue idea | Agent (isolated) |
| 12:00 PM | project-heartbeat | Check active projects for stale items | `scripts/cron/project_heartbeat.sh` |
| 6:00 PM | evening-checkin | Flag blockers, prep for tomorrow | `scripts/cron/evening_checkin.sh` |
| 11:00 PM | daily-memory-consolidation | Extract learnings from daily notes | `scripts/cron/helpers/memory_consolidation.py` |
| Sundays 6PM | weekly-review | Pattern analysis + git commit | `scripts/cron/weekly_review.sh` |
| Every 15min | github-memory-sync | Auto backup to GitHub | Inline |
| Every hour | memory-health-check | Monitor memory health | Inline |
| Daily | smart-memory-compact | Compact large sessions | Inline |

---

## 🗂️ Script Structure

```
scripts/cron/
├── evening_checkin.sh          # Daily 6 PM - Check blockers
├── weekly_review.sh            # Sundays 6 PM - Weekly analysis
├── project_heartbeat.sh        # Daily 12 PM - Project status
└── helpers/
    └── memory_consolidation.py # Smart daily note processing
```

---

## 🧠 Smart Features

### memory_consolidation.py
- Extracts key facts from daily notes
- Identifies decisions, project activity, lessons learned
- Auto-archives notes >30 days old
- Updates project files with new information
- No timeouts - runs as standalone Python script

### weekly_review.sh
- Auto-archives old files
- Git commits all changes
- Creates weekly summary template
- Counts activity metrics

### project_heartbeat.sh
- Checks all projects in memory/projects/
- Flags stale projects (>7 days no activity)
- Identifies projects with deadlines
- Creates daily status report

### evening_checkin.sh
- Creates template for tomorrow's focus
- Lists active projects
- Flags items needing attention

---

## 🎯 How It Works

**Main session jobs** (systemEvent):
- Just run scripts and log output
- Fast, no AI processing during run

**Isolated session jobs** (agentTurn):
- Run scripts + AI analysis
- Can create summaries/recommendations
- Results announced back to you

---

## ✅ To Test

Run any script manually:
```bash
# Evening checkin
/root/.openclaw/workspace/scripts/cron/evening_checkin.sh

# Weekly review
/root/.openclaw/workspace/scripts/cron/weekly_review.sh

# Project heartbeat
/root/.openclaw/workspace/scripts/cron/project_heartbeat.sh

# Memory consolidation
python3 /root/.openclaw/workspace/scripts/cron/helpers/memory_consolidation.py
```

---

## 📝 Next Steps

1. **Create project files** in `memory/projects/` to activate project tracking
2. **Start using daily notes** during conversations
3. **The system will auto-consolidate** at 11 PM daily
4. **Weekly reviews** will auto-commit to git

---

*System created: 2026-03-16*
*Inspired by: Nat Eliason's Felix bot setup*
