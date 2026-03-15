# 📁 MASTER FILE INDEX

**Last Updated:** 2026-03-16  
**Total Files:** 136+  
**Organization:** Smart Filing System (SFOS)

---

## Quick Navigation

| Category | Path | Files | GitHub Repo |
|----------|------|-------|-------------|
| **More MITO** | `businesses/more-mito/` | Health business docs | more-mito-health |
| **MCA** | `businesses/mca/` | Funding business docs | american-backbone-mca |
| **Think Energy** | `businesses/think-energy/` | Energy business docs | think-energy-business |
| **Momentum Tech** | `businesses/momentum-tech/` | AI learning projects | (local only) |
| **D Math Marketing** | `businesses/dmath-marketing/` | AI agency files | dmath-marketing-agency |
| **Memory** | `memory/` + `system/identity/` | All memory/identity | dmath-marketing-agency/kimi-claw-memory |
| **Shared** | `shared/` | Scripts, research, templates | dmath-marketing-agency/kimi-claw-memory |

---

## 🔍 Search Commands

```bash
# Find any file
python3 system/filer.py search "compensation"

# List files by business
python3 system/filer.py list more-mito
python3 system/filer.py list mca
python3 system/filer.py list think-energy

# Show folder tree
python3 system/filer.py tree
```

---

## 📂 Key Files by Location

### businesses/more-mito/
```
more-mito/
├── docs/
│   └── compensation-plan.pdf      ⭐ More MITO Compensation Plan (16 pages)
├── products/
├── marketing/
└── leads/
```

### businesses/mca/
```
mca/
├── docs/
├── leads/
├── scripts/
└── templates/
```

### businesses/think-energy/
```
think-energy/
├── docs/
├── territories/
└── customers/
```

### system/
```
system/
├── identity/
│   ├── IDENTITY.md               ⭐ Who I am
│   ├── SOUL.md                   ⭐ My personality
│   ├── USER.md                   ⭐ Damon's profile
│   └── MEMORY.md                 ⭐ Long-term memory
├── config/
├── skills/
│   ├── filer.py                  ⭐ File organizer
│   └── smart-sync.sh             ⭐ Multi-repo sync
└── file_index.json               ⭐ Searchable file index
```

### shared/
```
shared/
├── scripts/                       ⭐ Reusable automation scripts
│   ├── memory_manager.py
│   ├── github_memory.py
│   └── github_sync.sh
├── templates/                     Document templates
├── designs/                       CodeMojo design system
└── research/                      Research reports
```

---

## 🔄 Sync Strategy

**Command:** `bash system/smart-sync.sh`

| Source | Destination | When |
|--------|-------------|------|
| `businesses/more-mito/` | more-mito-health repo | On demand / cron |
| `businesses/mca/` | american-backbone-mca repo | On demand / cron |
| `businesses/think-energy/` | think-energy-business repo | On demand / cron |
| `system/` + `memory/` | dmath-marketing-agency/kimi-claw-memory | Every 15 min |
| `shared/` | dmath-marketing-agency/kimi-claw-memory | Every 15 min |

---

## 📋 Auto-Route Rules

When you give me a file, I detect keywords and route automatically:

| Keywords | Goes To |
|----------|---------|
| "more mito", "health", "wellness" | `businesses/more-mito/docs/` |
| "mca", "funding", "merchant cash" | `businesses/mca/docs/` |
| "think energy", "electricity", "solar" | `businesses/think-energy/docs/` |
| "momentum", "ai tools" | `businesses/momentum-tech/` |
| "remember", "my", "personal" | `memory/` |
| "script", "automation", ".py" | `shared/scripts/` |

---

## 🆘 Emergency Recovery

If everything breaks:

```bash
# 1. Clone the memory vault
git clone https://github.com/dmathpays2-lab/dmath-marketing-agency.git

# 2. Restore system files
cp -r dmath-marketing-agency/kimi-claw-memory/system/* /root/.openclaw/workspace/system/
cp -r dmath-marketing-agency/kimi-claw-memory/shared/* /root/.openclaw/workspace/shared/

# 3. Restore business files
python3 /root/.openclaw/workspace/system/filer.py index
bash /root/.openclaw/workspace/system/smart-sync.sh --reverse
```

---

*This index is auto-updated whenever files are added or moved.*
