# 📦 SYSTEM TRANSFER GUIDE
## How to Move Your Business to a New System

---

## 📁 What Gets Transferred

### Essential Folders
```
businesses/
├── BUSINESS_REGISTRY.md      ← Master index of all ventures
├── README.md                  ← System documentation
├── mca/                       ← MCA Lead Business
├── think-plus-energy/         ← Energy Broker Business
├── momentum-tech/             ← Agent/Tech Infrastructure
└── shared/                    ← Cross-business tools
```

### Also Backup
- `AGENTS.md` - Your agent configuration
- `SOUL.md` - Your identity/personality
- `TOOLS.md` - API keys and credentials
- `memory/` folder - Conversation history
- `docs/` folder - Documentation

---

## 🔄 Transfer Steps

### Step 1: Export
```bash
cd /root/.openclaw/workspace

# Create backup archive
tar -czvf business-backup-$(date +%Y%m%d).tar.gz \
  businesses/ \
  AGENTS.md \
  SOUL.md \
  TOOLS.md \
  memory/ \
  docs/

# Or use the sync script
export GITHUB_TOKEN='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'
bash scripts/github_sync.sh
```

### Step 2: Transfer
- Download backup file
- Or clone from GitHub repository
- Or use OpenClaw's built-in sync

### Step 3: Import to New System
```bash
# Unzip to new workspace
cd /new/workspace
tar -xzvf business-backup-20260317.tar.gz

# Verify structure
ls -la businesses/
cat businesses/BUSINESS_REGISTRY.md
```

### Step 4: Reconnect Services
- Reconnect Vercel deployments
- Update API keys in new system
- Test CRM and lead generator links
- Verify agent functionality

---

## 📊 Business Continuity

Each business folder is **SELF-CONTAINED**:
- ✅ All research included
- ✅ All customer data included
- ✅ All templates included
- ✅ README explains everything
- ✅ Can operate independently

---

## 🆘 Emergency Contacts

If transfer fails:
1. Check GitHub backup (auto-synced)
2. Review BUSINESS_REGISTRY.md for status
3. Contact support with backup file

---

## 💾 Current Backup Status

| Component | Last Backup | Status |
|-----------|-------------|--------|
| MCA Business | Auto | ✅ Current |
| Think Plus | Auto | ✅ Current |
| Agent System | Auto | ✅ Current |
| GitHub Repo | Auto | ✅ Current |

---

*Your business data is organized, documented, and portable.*
