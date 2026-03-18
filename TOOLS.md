# API Keys & Credentials

Secure storage for API keys and sensitive credentials.

## ⚠️ SECURITY WARNING

This file contains sensitive API keys. **Never share this file publicly.**

## Stored Credentials

### Search & Data
| Service | Key | Status | Last Verified |
|---------|-----|--------|---------------|
| Brave Search | `[REDACTED]` | ✅ Working | 2026-03-06 |
| Google Places | `[Stored in Vercel - see below]` | ✅ Active | 2026-03-16 |

### Hosting & Deployment
| Service | Key/Token | Status | Last Verified |
|---------|-----------|--------|---------------|
| Netlify | `[REDACTED]` | ✅ Working | 2026-03-06 |
| Vercel | `[REDACTED]` | ✅ Working | 2026-03-16 |
| GitHub | `[REDACTED]` | ✅ Working | 2026-03-16 |

### Communication (Future)
| Service | Key | Status | Purpose |
|---------|-----|--------|---------|
| Twilio | `[NEED]` | ⏳ | SMS/Voice |
| SendGrid | `[NEED]` | ⏳ | Email |
| Telegram Bot | `[NEED]` | ⏳ | Notifications |

## 🔍 Environment Variables in Vercel

The following API keys are securely stored in your Vercel projects:

| Project | Variable | Environments |
|---------|----------|--------------|
| mca-pro-ai | GOOGLE_PLACES_API_KEY | production |
| mca-lead-generator | GOOGLE_PLACES_API_KEY | dev, preview, production |
| mca-lead-generator-pro | GOOGLE_PLACES_API_KEY | dev, preview, production |

**To view/decrypt the Google Places key:**
1. Go to https://vercel.com/dashboard
2. Select project (e.g., mca-pro-ai)
3. Settings → Environment Variables
4. Click on GOOGLE_PLACES_API_KEY to reveal

**Note:** Vercel encrypts environment variables for security. The key is active and working in your deployments.

## How to Add New Credentials

1. **Add to this file** (TOOLS.md)
2. **Update the table above** with service details
3. **Verify it works** before marking as ✅
4. **GitHub will auto-sync** via the memory sync cron job

## Credential Recovery

If credentials are lost:
1. Check this file in the GitHub repo
2. If not there, check `.env` or local backups
3. Regenerate from service dashboard if necessary
4. Update this file with new credentials

## Security Best Practices

- ✅ Store in this file (private repo)
- ✅ Never commit to public repos
- ✅ Rotate keys every 90 days
- ❌ Never share in chat messages
- ❌ Never paste in logs
- ❌ Never expose in error messages

---

*Last updated: 2026-03-16*
