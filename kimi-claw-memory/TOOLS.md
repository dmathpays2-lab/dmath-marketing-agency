# API Keys & Credentials

Secure storage for API keys and sensitive credentials.

## ⚠️ SECURITY WARNING

This file contains sensitive API keys. **Never share this file publicly.**

## Stored Credentials

### Search & Data
| Service | Key | Status | Last Verified |
|---------|-----|--------|---------------|
| Brave Search | `BSApqnJJZan2KhiBK5By_jODVBuDw9l` | ✅ Working | 2026-03-06 |
| Google Places | `[PENDING - From Vercel]` | ⏳ Need to retrieve | - |

### Hosting & Deployment
| Service | Key/Token | Status | Last Verified |
|---------|-----------|--------|---------------|
| Netlify | `nfp_itEQH4Q8xVdwJGoyh7yWe45gC8k6cRPr797b` | ✅ Working | 2026-03-06 |
| Vercel | `vcp_8YuDrL50k9QWlZbyVTlnOi3CR0g7NGMe7777dLPDS8bql1TtYX2ig6RZ` | ✅ Working | 2026-03-16 |
| GitHub | `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` | ✅ Working | 2026-03-16 |

### Communication (Future)
| Service | Key | Status | Purpose |
|---------|-----|--------|---------|
| Twilio | `[NEED]` | ⏳ | SMS/Voice |
| SendGrid | `[NEED]` | ⏳ | Email |
| Telegram Bot | `[NEED]` | ⏳ | Notifications |

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
