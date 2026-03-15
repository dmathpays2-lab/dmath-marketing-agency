# Smart Memory System - Documentation

## Overview
Same memory structure (MEMORY.md + memory/YYYY-MM-DD.md), but with **automatic overload prevention**.

## What's New

### 1. Smart Session Management
- **Auto-compaction**: Session automatically compacts when it hits 300KB (before it causes timeouts)
- **Keeps context**: Last 50 conversation lines preserved for continuity
- **Archives history**: Older lines compressed to `/root/.openclaw/backups/`

### 2. Automated Maintenance (Cron Jobs)

| Job | Frequency | Action |
|-----|-----------|--------|
| Smart Memory Compact | Daily | Compact session if >300KB, archive old daily files |
| Health Check | Hourly | Monitor stats, alert on warnings |
| GitHub Sync | Every 15 min | Backup memory files to GitHub |

### 3. Health Monitoring
Real-time stats tracked:
- Session size (currently: ~64KB ✅)
- Daily file count
- Archive status
- MEMORY.md size

## File Structure

```
/root/.openclaw/workspace/
├── MEMORY.md                    # Long-term curated memory (400 lines)
├── memory/
│   ├── 2026-03-06.md           # Daily raw logs
│   └── archive/                # Compressed old dailies (30+ days)
│       └── 2026-02-15.md.gz
├── scripts/
│   ├── memory_manager.py       # Core management logic
│   └── preflight.sh            # Pre-flight session check
└── docs/
    └── SMART_MEMORY_SYSTEM.md  # This file
```

## Usage

### For You (Damon)
Just keep using the memory system normally:
- I'll write to `memory/YYYY-MM-DD.md` daily
- I'll update `MEMORY.md` for important facts
- Everything auto-manages in the background

### Manual Commands
```bash
# Check current stats
python3 /root/.openclaw/workspace/scripts/memory_manager.py stats

# Check health (shows warnings if any)
python3 /root/.openclaw/workspace/scripts/memory_manager.py health

# Force compact session
python3 /root/.openclaw/workspace/scripts/memory_manager.py compact

# Archive old daily files
python3 /root/.openclaw/workspace/scripts/memory_manager.py archive
```

## Thresholds

| Metric | Warning At | Action At |
|--------|-----------|-----------|
| Session size | 240KB (80%) | 300KB (compact) |
| Daily files | 60 files | Archive 30+ days old |
| Context usage | 80% | Auto-compact triggers |

## What Changed vs. Old System

| Before | After |
|--------|-------|
| Session grew until timeout | Auto-compact at 300KB |
| Manual intervention needed | Fully automated |
| Lost context on reset | Preserves last 50 lines |
| No visibility into size | Hourly health checks |
| All history in session | Archived to compressed files |

## Recovery

If timeouts still happen:
```bash
# Nuclear option - reset session
openclaw gateway restart

# Check what happened
cat /root/.openclaw/backups/*.gz | gunzip | tail -100
```

---
*System active: Session at 64KB/300KB ✅*
