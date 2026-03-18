# 🔐 Secure Bot Handoff Package

## For: New Bot Instance
## From: Previous Bot
## Date: 2026-03-18

---

## TL;DR - Get Operational in 10 Seconds

```bash
# 1. Load all API keys
source /root/.openclaw/workspace/load_vault.sh

# 2. Verify everything works
/root/.openclaw/workspace/bot_self_test.sh

# 3. Done! Use keys via environment variables
```

---

## 🔑 What You Have Access To

After running `source load_vault.sh`, these variables are set:

| Variable | Value Preview | Service |
|----------|---------------|---------|
| `GITHUB_TOKEN` | `ghp_6afa...` | GitHub API |
| `GITHUB_OLD_TOKEN` | `ghp_KWdi...` | Backup GitHub |
| `GITHUB_VAULT_TOKEN` | `ghp_FdSj...` | MCA Vault GitHub |
| `BRAVE_TOKEN` | `BSApqnJJ...` | Brave Search |
| `VERCEL_TOKEN` | `vcp_8YuD...` | Vercel Deploy |
| `NETLIFY_TOKEN` | `nfp_itEQ...` | Netlify Deploy |
| `GEMINI_TOKEN` | `AIzaSyBI...` | Google Gemini |
| `APIFY_TOKEN` | `apify_ap...` | Web Scraping |

---

## 📂 Vault Location

```
/root/.openclaw/workspace/
├── .vault/
│   ├── keys/
│   │   ├── github          ← Your main GitHub token
│   │   ├── brave           ← Brave Search API
│   │   ├── vercel          ← Vercel token
│   │   ├── netlify         ← Netlify token
│   │   ├── gemini          ← Google Gemini
│   │   ├── apify           ← Apify scraper
│   │   ├── github_old      ← Backup token
│   │   └── github_vault    ← MCA vault token
│   └── secrets.json        ← Registry (hashes only)
│
├── load_vault.sh           ← ⭐ USE THIS
├── bot_self_test.sh        ← Verify setup
├── vault_manager.py        ← Manage keys
└── NEW_BOT_GUIDE.md        ← Full documentation
```

---

## 🔓 How to Decode (If load_vault.sh Fails)

### Method 1: Python (Recommended)
```python
import base64

def get_key(key_name):
    with open(f'/root/.openclaw/workspace/.vault/keys/{key_name}', 'r') as f:
        encoded = f.read().strip()
        reversed_str = base64.b64decode(encoded).decode()
        return reversed_str[::-1]  # Un-reverse

# Usage
github_token = get_key('github')
```

### Method 2: Bash One-Liner
```bash
decode_key() { cat "/root/.openclaw/workspace/.vault/keys/$1" | base64 -d | rev; }
GITHUB_TOKEN=$(decode_key github)
```

### Method 3: Manual Decode
```bash
# 1. Read the file
cat .vault/keys/github
# Output: [BASE64_ENCODED_STRING]

# 2. Base64 decode
echo "[BASE64_ENCODED_STRING]" | base64 -d
# Output: [REVERSED_TOKEN]

# 3. Reverse it
echo "[REVERSED_TOKEN]" | rev
# Output: [YOUR_GITHUB_TOKEN]
```

---

## 🧪 Test Your Access

```bash
# Test GitHub
curl -s -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/user | grep login

# Test Brave Search
curl -s "https://api.search.brave.com/res/v1/web/search?q=test" \
  -H "X-Subscription-Token: $BRAVE_TOKEN" | head -c 100

# Test Vercel
curl -s -H "Authorization: Bearer $VERCEL_TOKEN" \
  https://api.vercel.com/v9/user | grep email
```

---

## 🛡️ Security Rules (NEVER Break These)

1. **NEVER commit raw keys** - Use the vault
2. **NEVER type keys in chat** - This gets logged
3. **NEVER share vault files** - Only bots in this workspace
4. **NEVER disable pre-commit hook** - It protects you
5. **ALWAYS use environment variables** - Never hardcode

---

## 🆘 Troubleshooting

### "Permission denied" on vault files
```bash
chmod 600 /root/.openclaw/workspace/.vault/keys/*
```

### "Key not found"
```bash
# List available keys
ls -la /root/.openclaw/workspace/.vault/keys/
```

### "Bad credentials" from API
```bash
# Re-decode and verify
python3 -c "
import base64
with open('.vault/keys/github') as f:
    e = f.read().strip()
    print(base64.b64decode(e).decode()[::-1])
"
```

### load_vault.sh not found
```bash
# Manual load
for key in /root/.openclaw/workspace/.vault/keys/*; do
  name=$(basename "$key" | tr '[:lower:]' '[:upper:]')_TOKEN
  val=$(cat "$key" | base64 -d | rev)
  export "$name"="$val"
  echo "Loaded $name"
done
```

---

## 📋 Handoff Checklist

For the bot giving handoff:
- [ ] Vault has all 8 keys
- [ ] All keys have 600 permissions
- [ ] load_vault.sh works
- [ ] bot_self_test.sh passes
- [ ] GitHub push works
- [ ] NEW_BOT_GUIDE.md is current

For the bot receiving handoff:
- [ ] Can run `source load_vault.sh`
- [ ] Can see all 9 environment variables
- [ ] GitHub API responds correctly
- [ ] Can push to GitHub

---

## 🔗 Quick Reference

| Task | Command |
|------|---------|
| Load all keys | `source load_vault.sh` |
| Test setup | `./bot_self_test.sh` |
| View vault | `ls .vault/keys/` |
| Get one key | `python3 -c "from vault_manager import load_key; print(load_key('github'))"` |
| Scan for exposed keys | `python3 vault_manager.py scan` |
| Add new key | `python3 vault_manager.py save name value` |

---

**You're ready! Start with `source load_vault.sh` and go build things.** 🚀
