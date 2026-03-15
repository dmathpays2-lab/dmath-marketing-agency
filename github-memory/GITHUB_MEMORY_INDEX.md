# GitHub Repository Memory Index

**Owner:** dmathpays2-lab  
**Last Updated:** 2026-03-16  
**Total Repos:** 4

---

## Repositories

### 1. american-backbone-mca
- **URL:** https://github.com/dmathpays2-lab/american-backbone-mca
- **Size:** 124KB
- **Last Updated:** 2026-03-15 19:18 UTC
- **Purpose:** MCA Lead Generation System with AI Agent Swarm
- **Key Files:**
  - `orchestrator.py` - Main swarm orchestrator
  - `agents/` - AI agent scripts (4 files)
  - `docs/` - Memory files + daily logs
  - `swarm_deployment/` - Deployment scripts
  - 14 markdown docs (theory, plans, research)
- **Status:** ✅ Active development
- **Backup Location:** `/root/.openclaw/workspace/github-memory/american-backbone-mca/`

### 2. dmath-marketing-agency
- **URL:** https://github.com/dmathpays2-lab/dmath-marketing-agency
- **Size:** 79KB
- **Last Updated:** 2026-03-08 06:05 UTC
- **Purpose:** Kimi Claw Memory Vault + Agency Backup
- **Key Files:**
  - `kimi-claw-memory/` - All identity/memory files
  - `EMERGENCY_REBOOT.md` - Disaster recovery
  - `RESTORE.sh` - Automated restore script
- **Status:** ✅ Auto-sync every 15 min via cron
- **Backup Location:** `/root/.openclaw/workspace/github-memory/dmath-marketing-agency/`

### 3. more-mito-health
- **URL:** https://github.com/dmathpays2-lab/more-mito-health
- **Size:** 26KB
- **Last Updated:** 2026-03-08 05:58 UTC
- **Purpose:** More MITO health business tracking
- **Key Files:** 
  - `README.md` - Project documentation
  - `src/` - Source files
- **Status:** ✅ Backed up (9 files)
- **Backup Location:** `/root/.openclaw/workspace/github-memory/more-mito-health/`

### 4. think-energy-business
- **URL:** https://github.com/dmathpays2-lab/think-energy-business
- **Size:** 26KB
- **Last Updated:** 2026-03-08 05:58 UTC
- **Purpose:** Think Energy business tracking
- **Key Files:** 
  - `README.md` - Project documentation
  - `docs/` - Business docs
- **Status:** ✅ Backed up (9 files)
- **Backup Location:** `/root/.openclaw/workspace/github-memory/think-energy-business/`

---

## Backup Strategy

### Method: Incremental Crawl (No Timeouts)
1. **Phase 1:** Quick index (repo list) ✅ DONE
2. **Phase 2:** Per-repo shallow clone (1 repo at a time)
3. **Phase 3:** Tree crawl with pagination (100 files per batch)
4. **Phase 4:** Auto-sync via cron (daily incremental)

### Commands
```bash
# Update this index
python3 scripts/github_memory.py index

# Backup one repo (safe, no timeout)
python3 scripts/github_memory.py backup american-backbone-mca

# Full backup (batched, resumable)
python3 scripts/github_memory.py backup-all --batch-size=50

# Check status
python3 scripts/github_memory.py status
```

---

## Why This Fixes the Timeout Issue

| Before (Broken) | After (Fixed) |
|-----------------|---------------|
| One giant fetch of ALL files | Batched in chunks of 50-100 |
| Recursive crawl in main session | Background spawned sessions |
| No progress tracking | Resume capability if interrupted |
| 5+ min = death | Each batch < 30 seconds |
| All or nothing | Incremental, saves as it goes |

---

## Next Steps

- [x] Run incremental backup for `more-mito-health`
- [x] Run incremental backup for `think-energy-business`
- [x] Run incremental backup for `dmath-marketing-agency`
- [x] Run incremental backup for `american-backbone-mca`
- [ ] Set daily cron for auto-sync
- [ ] Create file search index for quick lookups

---

## 🆘 DISASTER RECOVERY

### If OpenClaw Breaks

**Everything is recoverable from 2 locations:**

1. **GitHub Repos** - Source of truth (cloud)
2. **Local github-memory/** - Fast local cache (disk)

### Restoration Process

```bash
# 1. Fresh OpenClaw install
# 2. Clone memory vault
git clone https://github.com/dmathpays2-lab/dmath-marketing-agency.git
cd dmath-marketing-agency/kimi-claw-memory

# 3. Copy to workspace
cp -r * /root/.openclaw/workspace/

# 4. Read EMERGENCY_REBOOT.md
cat EMERGENCY_REBOOT.md

# 5. Restore all repos
python3 scripts/github_memory.py backup-all

# 6. Back online - all memory intact
```

### What's Protected

| Data | Location | Restore Time |
|------|----------|--------------|
| Identity/Personality | GitHub + Local | Instant |
| Long-term Memory | GitHub + Local | Instant |
| Daily Logs | GitHub + Local | Instant |
| All 4 Repos | GitHub + Local | ~2 minutes |
| Scripts/Tools | GitHub + Local | Instant |

### Backup Verification

```bash
# Check all repos are backed up
python3 scripts/github_memory.py status

# Check total files backed up
find /root/.openclaw/workspace/github-memory/ -type f | wc -l
# Expected: 71+ files
```

---

*Last updated: 2026-03-16 | Total files backed up: 71 | All repos: ✅ Complete*
