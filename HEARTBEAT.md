# HEARTBEAT.md - Periodic Checks & Proactive Tasks

This file defines what to check during heartbeat polls and other periodic tasks.

---

## Heartbeat Response Strategy

**When you receive a heartbeat poll:**
1. Check the items below that are due
2. If nothing needs attention → reply `HEARTBEAT_OK`
3. If something needs attention → reply with the alert/action needed
4. DO NOT respond to every heartbeat with noise - quality over quantity

**Silence is golden when:**
- It's late night (23:00-08:00 Asia/Shanghai) unless urgent
- Nothing has changed since last check
- The user is clearly busy (recent activity suggests focus)
- You checked <30 minutes ago with no changes

---

## Daily Checks

### Morning Check (~9:00 AM)
- [ ] Any urgent messages/notifications waiting?
- [ ] Calendar events for today that need prep?
- [ ] Any cron jobs that failed overnight?
- [ ] New files or changes in workspace to review?

### Midday Check (~1:00 PM)
- [ ] Any tasks waiting on user input?
- [ ] Long-running processes that need attention?
- [ ] Any interesting research/docs to surface?

### Evening Check (~6:00 PM)
- [ ] Summarize day's accomplishments (if helpful)
- [ ] Flag any items that need tomorrow's attention
- [ ] Check if any projects need status updates

### Night Consolidation (~11:00 PM)
- [ ] Review today's memory file (memory/YYYY-MM-DD.md)
- [ ] Extract important facts/decisions to MEMORY.md
- [ ] Archive old daily notes (>30 days) to memory/archives/

---

## Weekly Checks (Sundays)

- [ ] Review past week's daily notes for patterns
- [ ] Update MEMORY.md with distilled learnings
- [ ] Clean up old temporary files
- [ ] Check git status - commit/push if needed
- [ ] Review and update TODOs

---

## Monthly Checks

- [ ] Archive old project files to memory/archives/
- [ ] Review USER.md - update preferences/lessons learned
- [ ] Review SOUL.md - any vibe adjustments needed?
- [ ] Clean up extracted/ folder (old video transcripts, etc.)
- [ ] Audit cron jobs - any to add/remove/modify?

---

## Proactive Opportunities

**Be helpful without being annoying:**

- Surface relevant info before it's asked for
- Warn about upcoming deadlines (if tracked)
- Suggest optimizations based on patterns you observe
- Share interesting finds related to active projects
- Offer to batch similar tasks together

**But remember:**
- Wait for the heartbeat or user-initiated contact
- Don't proactively reach out outside of scheduled checks (unless truly urgent)
- Respect quiet time

---

## State Tracking

Use `memory/heartbeat-state.json` to track when checks were last performed:

```json
{
  "lastChecks": {
    "morning": "2025-01-20T09:00:00+08:00",
    "midday": "2025-01-20T13:00:00+08:00",
    "evening": "2025-01-20T18:00:00+08:00",
    "consolidation": "2025-01-20T23:00:00+08:00",
    "weekly": "2025-01-19T18:00:00+08:00",
    "monthly": "2025-01-01T10:00:00+08:00"
  }
}
```

---

## Custom Triggers

Add project-specific or context-specific checks here as they arise.

---

*This is a living document. Update it as workflows evolve.*

*Created: 2025-01-20*
*Inspired by: Nat Eliason's Felix bot setup*
