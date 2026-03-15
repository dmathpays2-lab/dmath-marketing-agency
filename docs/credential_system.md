# Credential Management System

## Overview

System to ensure API keys and credentials are always backed up to GitHub for recovery.

## How It Works

### 1. TOOLS.md - The Credential Vault

All API keys stored in `/root/.openclaw/workspace/TOOLS.md`:
- Organized by service category
- Status tracking (working/needs update)
- Last verified timestamps

### 2. Auto-Backup Every 6 Hours

**Cron Job:** `credential-backup`
- Runs every 6 hours (00:00, 06:00, 12:00, 18:00)
- Backs up TOOLS.md to GitHub
- Stores in two locations:
  - `secure/TOOLS.md` - Primary backup
  - `TOOLS.md` - Quick access

### 3. Manual Backup

```bash
# Run anytime
/root/.openclaw/workspace/scripts/credential_backup.sh
```

### 4. Recovery

If credentials are lost:
```bash
# From GitHub repo
git clone https://github.com/dmathpays2-lab/dmath-marketing-agency.git
cat marketing-agency/secure/TOOLS.md
```

## Security

- ✅ Private GitHub repo
- ✅ Keys never logged
- ✅ Encrypted in transit (HTTPS)
- ✅ Separate backup script
- ❌ Never share TOOLS.md publicly

## Adding New Credentials

1. Edit `TOOLS.md`
2. Add to correct table
3. Mark status
4. Save - auto-backup within 6 hours
5. Or run manual backup immediately

## Current Backup Status

| Service | Status | Backup Location |
|---------|--------|-----------------|
| GitHub Token | ✅ Backed up | GitHub repo |
| Brave Search | ✅ Backed up | GitHub repo |
| Netlify | ✅ Backed up | GitHub repo |
| Vercel | ❌ Missing | Need to add |

---

*System created: 2026-03-16*
*Backup frequency: Every 6 hours*
