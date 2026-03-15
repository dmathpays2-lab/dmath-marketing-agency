# Smart File Organization System (SFOS)

**Purpose:** Automatically route every file, document, and conversation artifact to the correct location.

---

## Folder Structure

```
/root/.openclaw/workspace/
│
├── 📁 businesses/                    # BUSINESS VERTICALS
│   ├── mca/                         # MCA Brokerage
│   │   ├── docs/
│   │   ├── leads/
│   │   ├── scripts/
│   │   └── templates/
│   ├── more-mito/                   # Health & Wellness
│   │   ├── docs/                    # ✅ compensation-plan.pdf
│   │   ├── products/
│   │   ├── marketing/
│   │   └── leads/
│   ├── think-energy/                # Energy Business
│   │   ├── docs/
│   │   ├── territories/
│   │   └── customers/
│   ├── momentum-tech/               # AI Tools Education
│   │   ├── docs/
│   │   ├── projects/
│   │   └── notes/
│   └── dmath-marketing/             # AI Agency (already exists)
│       ├── website/
│       ├── portfolio/
│       └── proposals/
│
├── 📁 memory/                        # PERSONAL MEMORY (already exists)
│   ├── YYYY-MM-DD.md               # Daily logs
│   └── archive/                     # Compressed old files
│
├── 📁 system/                        # SYSTEM FILES
│   ├── identity/                    # Who I am
│   │   ├── IDENTITY.md
│   │   ├── SOUL.md
│   │   └── USER.md
│   ├── config/                      # Settings, API keys
│   │   ├── cron-jobs.json
│   │   └── api-keys.env
│   ├── skills/                      # Tools and capabilities
│   │   └── github-memory/
│   └── archives/                    # Backups
│
├── 📁 projects/                      # ACTIVE PROJECTS
│   ├── mytowdirectory/              # Towing site (already exists)
│   ├── command-center/              # Damon's HQ
│   └── [new-projects]/
│
├── 📁 shared/                        # CROSS-CUTTING RESOURCES
│   ├── scripts/                     # Reusable scripts (already exists)
│   ├── templates/                   # Document templates
│   ├── designs/                     # CodeMojo design system
│   └── research/                    # Research reports
│
└── 📁 inbox/                         # TEMPORARY / UNCLASSIFIED
    └── (files here get sorted within 24h)
```

---

## Auto-Routing Rules

### When You Give Me a File...

| File Type | Keyword Detected | Destination |
|-----------|-----------------|-------------|
| **More MITO** | "more mito", "mormito", "health", "compensation" | `businesses/more-mito/docs/` |
| **MCA** | "mca", "funding", "merchant cash", "david allen" | `businesses/mca/docs/` |
| **Think Energy** | "think energy", "electricity", "solar", "energy advisor" | `businesses/think-energy/docs/` |
| **Momentum Tech** | "momentum", "ai tools", "build ai" | `businesses/momentum-tech/` |
| **D Math Marketing** | "agency", "portfolio", "client" | `businesses/dmath-marketing/` |
| **Personal/Memory** | "remember", "my", "i need", "todo" | `memory/` or `system/identity/` |
| **Research** | "research", "study", "analysis" | `shared/research/` |
| **Scripts/Tools** | ".py", ".sh", "script", "automation" | `shared/scripts/` |

---

## Search Index

Every file gets indexed with metadata:

```json
{
  "file": "compensation-plan.pdf",
  "path": "businesses/more-mito/docs/",
  "category": "more-mito",
  "type": "pdf",
  "tags": ["compensation", "mlm", "business-doc"],
  "date_added": "2026-03-16",
  "source": "user-upload",
  "related_to": ["more-mito-health", "business-verticals"]
}
```

**Search commands:**
```bash
# Find anything
python3 system/filer.py search "compensation"

# Find by business
python3 system/filer.py list more-mito

# Find by type
python3 system/filer.py type pdf

# Find recent
python3 system/filer.py recent 7  # last 7 days
```

---

## GitHub Sync Strategy

| Folder | GitHub Repo | Frequency |
|--------|-------------|-----------|
| `businesses/more-mito/` | `more-mito-health` | Real-time |
| `businesses/mca/` | `american-backbone-mca` | Real-time |
| `businesses/think-energy/` | `think-energy-business` | Real-time |
| `system/identity/` + `memory/` | `dmath-marketing-agency/kimi-claw-memory` | 15 min |
| `shared/scripts/` | `dmath-marketing-agency/kimi-claw-memory` | 15 min |

---

## Implementation Status

- [x] Structure designed
- [ ] Create folder hierarchy
- [ ] Build filer.py auto-router
- [ ] Move existing files
- [ ] Set up sync rules
- [ ] Test search functionality
