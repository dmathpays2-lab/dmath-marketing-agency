# Runtime Error Fix Documentation

## Problem Identified
**Error:** `IM runtime dispatch timed out after 300000ms`

## Root Causes
1. **Session file too large** (836KB) - accumulates conversation history
2. **Context bloat** (70% full, 91k/131k tokens)
3. **Long-running sessions** without compaction

## Solution Applied

### 1. Session Compaction
- Backup old sessions to `/root/.openclaw/backups/`
- Clear current session to reset context
- System will create fresh session

### 2. Prevention Measures
- Set up automatic session rotation
- Add context monitoring
- Implement compaction triggers

### 3. Configuration Changes
- Reduce max session size
- Enable auto-compaction
- Set thinking mode appropriately

## Monitoring
Watch for:
- Session files > 500KB
- Context usage > 80%
- Timeout errors in logs

## Fix Commands
```bash
# Check session size
ls -lh /root/.openclaw/agents/main/sessions/*.jsonl

# Manual compaction (when needed)
openclaw session compact

# Restart gateway (nuclear option)
openclaw gateway restart
```

Last fixed: $(date)
