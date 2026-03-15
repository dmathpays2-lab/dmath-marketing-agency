# 🗂️ Smart Filing System - Quick Start Guide

**Created:** 2026-03-16  
**Purpose:** Everything automatically organized and searchable

---

## ✅ What's Done

Your files are now organized into a **smart filing system** with auto-routing:

```
/root/.openclaw/workspace/
├── 📁 businesses/          ← Your 5 business verticals
│   ├── more-mito/         ← Health business (compensation plan here!)
│   ├── mca/               ← Funding business
│   ├── think-energy/      ← Energy business
│   ├── momentum-tech/     ← AI learning
│   └── dmath-marketing/   ← AI agency
├── 📁 system/             ← My brain & config
│   ├── identity/          ← IDENTITY.md, SOUL.md, MEMORY.md, USER.md
│   ├── filer.py           ← File organizer
│   └── smart-sync.sh      ← Multi-repo sync
├── 📁 shared/             ← Reusable resources
│   ├── scripts/           ← All automation scripts
│   ├── research/          ← Research reports
│   └── templates/         ← Document templates
├── 📁 memory/             ← Daily conversation logs
└── 📁 inbox/              ← Temporary holding
```

---

## 🔍 How to Find Anything

### Search by keyword:
```bash
python3 system/filer.py search "compensation"
python3 system/filer.py search "mca"
python3 system/filer.py search "script"
```

### List by business:
```bash
python3 system/filer.py list more-mito
python3 system/filer.py list mca
python3 system/filer.py list think-energy
```

### See full tree:
```bash
python3 system/filer.py tree
```

---

## 📤 How Files Get Organized

**When you give me a file, I auto-detect and route it:**

| You Say / File Contains | Goes To | GitHub Repo |
|------------------------|---------|-------------|
| "More MITO", "health", "wellness" | `businesses/more-mito/docs/` | more-mito-health |
| "MCA", "funding", "merchant cash" | `businesses/mca/docs/` | american-backbone-mca |
| "Think Energy", "solar", "electricity" | `businesses/think-energy/docs/` | think-energy-business |
| "Remember this", "my", "personal" | `memory/` or `system/identity/` | dmath-marketing-agency |
| "Script", ".py", "automation" | `shared/scripts/` | dmath-marketing-agency |

---

## 🔄 Sync Everything to GitHub

**One command backs up ALL businesses:**
```bash
bash system/smart-sync.sh
```

This pushes:
- More MITO files → `more-mito-health` repo
- MCA files → `american-backbone-mca` repo
- Think Energy files → `think-energy-business` repo
- System/Memory files → `dmath-marketing-agency/kimi-claw-memory`

---

## 📂 More MITO Compensation Plan

**Location:** `businesses/more-mito/docs/compensation-plan.pdf`

**Backed up to:**
- ✅ Local workspace
- ✅ GitHub: `more-mito-health` repo
- ✅ GitHub: `dmath-marketing-agency/kimi-claw-memory` (secondary)

**Status:** 16 pages, 1.1MB, safely stored in 3 locations

---

## 🆘 Emergency Recovery

If everything breaks:

```bash
# 1. Clone memory vault
git clone https://github.com/dmathpays2-lab/dmath-marketing-agency.git

# 2. Restore system
cp -r dmath-marketing-agency/kimi-claw-memory/system/* /root/.openclaw/workspace/system/

# 3. Rebuild index
python3 /root/.openclaw/workspace/system/filer.py index

# 4. Restore all businesses
bash /root/.openclaw/workspace/system/smart-sync.sh
```

---

## 📊 Current Stats

- **Total Files:** 143
- **Businesses:** 5 verticals organized
- **Search Index:** Active and updated
- **Backup Repos:** 4 GitHub repositories
- **Auto-Routing:** Enabled for all new files

---

## 🎯 Next Steps (Optional)

- [ ] Set up cron job for automatic `smart-sync.sh` (daily)
- [ ] Extract key details from More MITO compensation plan
- [ ] Move existing research reports to `shared/research/`
- [ ] Create templates in `shared/templates/`

---

**From now on, everything you give me gets automatically filed. No more lost files.**
