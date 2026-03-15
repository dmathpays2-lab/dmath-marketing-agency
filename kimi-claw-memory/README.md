# Kimi Claw Memory Repository

Central backup for all memory files, documentation, and system configuration.

## Structure

```
/
├── AGENTS.md           # Workspace guidelines
├── BOOTSTRAP.md        # First-run instructions
├── IDENTITY.md         # Who Kimi Claw is
├── SOUL.md            # Personality and behavior
├── USER.md            # Damon's profile and preferences
├── MEMORY.md          # Long-term curated memory
├── memory/            # Daily raw logs
│   └── 2026-03-06.md
├── scripts/           # Automation scripts
│   ├── memory_manager.py
│   ├── github_sync.sh
│   └── preflight.sh
├── docs/              # Documentation
│   └── SMART_MEMORY_SYSTEM.md
└── .github/           # GitHub configurations
    └── workflows/     # CI/CD automation
```

## Sync Schedule

- **Every 15 minutes**: Auto-commit memory changes
- **Daily**: Full system health check
- **On significant events**: Manual snapshots

## Access

Local workspace: `/root/.openclaw/workspace/`
Last sync: Auto
