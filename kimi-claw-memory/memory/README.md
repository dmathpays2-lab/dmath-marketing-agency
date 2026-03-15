# Memory Structure

This folder uses the PARA method + Tacit Knowledge layer, inspired by Nat Eliason's 3-layer memory system.

## Folder Structure

```
memory/
├── daily/          # Daily notes (YYYY-MM-DD.md) - what's happening now
├── projects/       # Active projects - specific goals with deadlines
├── areas/          # Ongoing responsibilities - no end date
├── resources/      # Reference materials - things to refer back to
├── archives/       # Completed/inactive items from above
└── tacit/          # Communication preferences, habits, hard rules
```

## The 3 Layers

### Layer 1: Knowledge Graph (PARA)
**projects/** - Things you're actively working on  
**areas/** - Ongoing responsibilities (health, finance, relationships)  
**resources/** - Reference materials (books, courses, research)  
**archives/** - Completed or no longer relevant items

### Layer 2: Daily Notes
**daily/** - Dated markdown files (YYYY-MM-DD.md)  
- Log what happened during conversations  
- Raw notes, not polished  
- Bot writes to this during conversations  
- Extract important items to Layer 1 during consolidation

### Layer 3: Tacit Knowledge
**tacit/** + USER.md + SOUL.md  
- Communication preferences  
- Workflow habits  
- Hard rules and boundaries  
- Lessons learned from mistakes  
- This is what makes the bot feel like it knows you

## Consolidation Workflow

### Daily (11 PM)
1. Review today's daily note
2. Extract important facts → update relevant project/area/resource files
3. Extract lessons learned → update tacit knowledge

### Weekly (Sunday)
1. Review week's daily notes for patterns
2. Update MEMORY.md with distilled learnings
3. Archive old daily notes (>30 days) to archives/daily/

### Monthly
1. Archive completed projects
2. Review and clean up areas/resources
3. Update tacit knowledge based on observed patterns

## File Naming

- Daily: `YYYY-MM-DD.md` (e.g., `2025-01-20.md`)
- Projects: `project-name.md` or folders for large projects
- Areas: `area-name.md` (e.g., `health.md`, `finance.md`)
- Resources: `topic-name.md` or `author-title.md`

## Tips

- Keep files focused - one topic per file
- Use links between files when related
- Summaries at the top of long files
- Bot reads tacit + relevant project/area + recent daily notes

---

*Structure inspired by: Nat Eliason's Felix bot setup (PARA + 3-layer memory)*
*Reference: https://fortelabs.com/blog/para/*
