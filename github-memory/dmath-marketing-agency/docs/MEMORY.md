# MEMORY.md - Long-Term Memory

## Core Facts

### User
- **Name:** Damon Mathews
- **Business:** MCA Broker, Think Energy Advisor, More MITO
- **Goals:** Build wealth fast through MLM + tech ownership
- **Style:** Direct, fast-paced, no fluff
- **Timezone:** GMT+8

### Projects

#### 1. mytowdirectory.com - Towing Directory Website ✅ COMPLETE
- **Live URL:** https://dc-tow-directory-dm.netlify.app
- **Status:** Deployed and functional
- **Pages Built:** 16 total
  - Home (index.html)
  - Services hub (/services/)
  - 5 Service pages (emergency, flatbed, motorcycle, long-distance, heavy-duty, roadside)
  - 3 Company profiles (Capitol City Towing, Metro Tow Pros, DC Roadside Rescue)
  - Blog (/blog/)
  - Contact (/contact/)
  - Search (/search/)
  - Admin panel (/admin/ with login)
- **Features:**
  - $30K premium design (GSAP animations, parallax, magnetic buttons)
  - Real Unsplash images (no placeholders)
  - Google-style reviews section
  - LocalBusiness Schema markup
  - Admin dashboard for client management
- **Hosting:** Netlify (site ID: 82abf5ad-140c-4f65-a998-a301191e89e0)
- **Admin Login:** admin / towdirectory2026

#### 2. Kimi Claw - AI Assistant (Me)
- **Goal:** Self-improving digital employee
- **Current Focus:** YouTube extraction, automation, skills
- **API Keys:**
  - **Brave Search:** `BSApqnJJZan2KhiBK5By_jODVBuDw9l` ✅ WORKING - Active
  - **Netlify:** `nfp_itEQH4Q8xVdwJGoyh7yWe45gC8k6cRPr797b`
- **Important:** Never share these keys publicly

#### 3. D Math Marketing - AI Agency (Just Launched)
**Status:** Website live, building portfolio
**URL:** https://dc-tow-directory-dm.netlify.app (will move to custom domain)

**Services:**
- Premium website design ($30K quality at $5K-15K)
- AI chatbots ($2.5K-10K setup)
- Lead generation systems ($15K-35K)
- Full AI agency transformation ($25K-50K)

**Target Clients:** Local service businesses (plumbers, HVAC, lawyers, etc.)

**Files:**
- `/root/.openclaw/workspace/dmath-marketing/` - Agency website
- `/root/.openclaw/workspace/dmath-marketing/BRAND_IDENTITY.md` - Brand guidelines
- `/root/.openclaw/workspace/ai-agency-business-model.md` - Business plan

**Portfolio Pieces Needed:**
- [x] Towing directory (demo)
- [ ] Plumber lead gen site
- [ ] HVAC company site
- [ ] Roofer showcase
- [ ] Law firm site

**Next Steps:**
- Purchase dmathmarketing.com
- Build 2 more portfolio sites
- Create proposal templates
- Launch outreach campaign

---

### System Configuration Updates

#### Daily Morning Briefing System (2026-03-07)
**Created:** Automated daily revenue idea + focus briefing (like Alex Finn's Mission Control)

**Schedule:** Every morning at 8:00 AM (Asia/Shanghai)
**Job ID:** 2ef549ef-b47f-4388-9f14-efad879938e7

**What's in each briefing:**
- 💡 **New Revenue Idea** - One actionable money-making strategy daily
- 📊 **Weekly Focus** - Goals for each business vertical
- 🔥 **Hot Lead Opportunities** - Current opportunities to pursue
- 💬 **Daily Affirmation** - Motivation for the day
- ⚡ **Quick Wins** - 4 action items to complete today
- 📈 **Tracking** - Total ideas generated, deals tracked

**How it works:**
- I think of revenue ideas constantly (even when we're not talking)
- Each morning, I generate a new briefing
- Ideas rotate through categories: MCA, Think Energy, More MITO, Lead Gen, Cross-Sell, Automation
- Briefings saved to: `/root/.openclaw/workspace/briefings/`

**Goal:** One new revenue idea every day = 365 ideas/year = massive business growth

#### Emergency STOP System (2026-03-07)
**Created:** File-based stop signal for interrupting long tasks

**How to STOP me immediately:**
```bash
stopkimi                    # Type this anywhere
# OR
echo "STOP" > /root/.openclaw/workspace/STOP
```

**How it works:**
- I check for STOP signal every 10 seconds during long tasks
- When detected, I halt work immediately and report progress
- Files: `STOP`, `STOP_ACK`, `scripts/stop_system.py`
- Full docs: `/root/.openclaw/workspace/STOP_SYSTEM.md`

**Use when:**
- You gave wrong specifications
- You want to change approach mid-task
- You found what you needed (research)
- Any time you need me to stop

#### Cron Jobs - Smart Monitoring Setup (2026-03-06)
**Changed:** Reduced notification spam, added smart alerting

| Job | Frequency | Notifies | Purpose |
|-----|-----------|----------|---------|
| Dashboard Auto-Update | Every 15 min | ❌ NO (was YES) | Silent progress tracking |
| Smart Monitor | Every 30 min | ✅ Only on issues | Alert on problems only |
| Memory Maintenance | Daily 2 AM | ❌ NO | Memory organization |
| Memory Compression | Weekly Sun | ❌ NO | Old file compression |

**Alert Triggers:**
- ⚠️ 3+ consecutive cron errors
- 💰 Budget usage > 85%
- 🔴 System failures

**Result:** ~50 notifications/day → ~0-2 notifications/day

---

## Today's Session (2026-03-06)

### YouTube Video Analysis
**Video:** "3 Tools to Make OpenClaw FINALLY Functional" by Zac Frulloni
- **URL:** https://youtu.be/gRBGoKx7bhY
- **Attempted extraction:** Blocked by YouTube bot detection
- **Alternative found:** "3 Tools That Make OpenClaw Actually Useful" (similar content)

**The 3 Tools Zac Recommends:**
1. **Email Integration Tool** - Gives OpenClaw its own email address for autonomous communication
2. **Enhanced Memory System** - Upgrades memory beyond basic files (JUST IMPLEMENTED)
3. **Agentic Web Browsing** - Advanced web interaction beyond simple search

### YouTube Extraction Solutions Tested
| Method | Result | Notes |
|--------|--------|-------|
| yt-dlp direct | ❌ Blocked | IP detected as bot |
| youtube-transcript-api | ❌ Blocked | "Sign in to confirm" |
| Browser automation (Playwright) | ❌ Blocked | JavaScript fingerprinting detected |
| Free transcript APIs | ❌ Failed | Require auth or blocked |

**Working Solution:** TranscriptAPI skill ($4.50/mo, 1,000 credits)
```
npx clawhub@latest install transcriptapi
```

### Memory System Overhaul (Zac's Fix) ✅ IMPLEMENTED
**Created:**
- MEMORY.md (this file) - Long-term curated memory
- diary/ folder - Private thoughts space
- memory_compress.py - Auto-compress old sessions

**Cron Jobs Set:**
1. **Daily (2 AM):** Memory maintenance - extract learnings, update MEMORY.md
2. **Weekly (Sunday 3 AM):** Compress memory files older than 7 days

**Memory Protocol:**
- Read MEMORY.md every session
- Read memory/YYYY-MM-DD.md every session
- Capture everything first, refine later
- Move important facts from daily → MEMORY.md

#### 2. Damon's HQ - Custom Command Center 🏗️ IN DESIGN

**Research Source:** Alex Finn's "Mission Control" setup

**What Alex Has:**
- Agent "Henry" - 24/7 AI employee
- Kanban task board with live activity feed
- Real-time status updates
- API integration with OpenClaw

**Tools Available:**
1. ClawDeck (clawdeck.io) - Ruby/Rails, hosted or self-hosted
2. Mission Control (crshdn/mission-control) - Next.js, Docker-ready

**Damon's Custom Design:**
- **Multi-business:** Separate pipelines for MCA, Think Energy, More MITO, Tech
- **Income tracking:** Real-time commission tracking per business
- **Lead management:** Capture, assign, track follow-ups
- **Agent management:** Spawn specialized agents per business
- **Mobile-friendly:** WhatsApp/Telegram updates

**Design Doc:** `/root/.openclaw/workspace/damon-command-center-design.md`

**Options:**
- A) Use existing Mission Control + customize (1-2 days)
- B) Build custom Next.js dashboard (3-5 days)  
- C) Start with Notion/Airtable (1 day) ← RECOMMENDED

---

#### 3. Damon's HQ - Notion Command Center 🏗️ IN PROGRESS

**Status:** Setup files created, ready for Notion workspace
**Approach:** Option C - Notion-based (fast start, upgrade later)

**What's Built:**
- `/root/.openclaw/workspace/damon-hq/` - Complete setup package
- `NOTION_SETUP.md` - Step-by-step Notion configuration
- `notion_integration.py` - Python API integration
- `setup.sh` - One-command setup script
- `README.md` - User guide

**Features:**
- Multi-business tracking (MCA, Think Energy, More MITO, Tech)
- Lead pipeline management
- Project kanban boards  
- Agent task assignment
- Income tracking
- Mobile access via Notion app
- Ready for WhatsApp/Telegram notifications

**Next Steps:**
1. Create Notion workspace
2. Run `./setup.sh`
3. Configure API integration
4. Start tracking leads and projects

---

#### 3. MCA AI Tools Research - Top Tools to Rebuild 🏗️ COMPLETE

**Research Date:** 2026-03-06
**Tools Analyzed:** 40+ MCA software solutions
**Full Report:** `/root/.openclaw/workspace/mca-tools-research.md`

**TOP TOOLS TO RECREATE:**

| Tool | Monthly Cost | Build Time | Savings |
|------|--------------|------------|---------|
| Apollo.io (Lead DB) | $59-149 | 2-3 days | $59-149/mo |
| Instantly/Smartlead | $39-99 | 1-2 days | $39-99/mo |
| Richie AI CRM | $99-299 | 3-5 days | $99-299/mo |
| Hunter.io | $49-199 | 1 day | $49-199/mo |
| Analytics Dashboard | $29-99 | 2 days | $29-99/mo |
| **TOTAL** | **$275-845/mo** | **1-2 weeks** | **$3,300-10,140/year** |

**Phase 1 (Week 1) Ready to Build:**
1. Lead Database Scraper
2. Email Finder Tool
3. Simple CRM with Commission Tracking

**Decision:** Build vs Buy = Save $3,300-10,140/year

---

## Active TODOs
- [ ] Install TranscriptAPI skill for YouTube extraction
- [ ] Research Zac's other 2 tools (Email Integration, Agentic Web Browsing)
- [ ] Scale towing directory with real companies/numbers
- [ ] Move towing site to GoDaddy (when ready)

## Key Decisions
- **Images:** Real Unsplash only (no placeholders)
- **Design:** $30K premium standard (GSAP, animations, custom cursor)
- **PDF Compliance:** Match exact URL structure from specifications
- **Multi-agent:** Use parallel subagents for faster building
- **YouTube:** Use TranscriptAPI instead of fighting bot detection

## Preferences
- **Communication:** Direct, fast, no fluff
- **Design:** Premium, animations, real photos
- **Hosting:** Netlify (current), considering GoDaddy for future
- **Images:** Unsplash real photos only
- **Work Style:** Action-oriented, implement fast

## Technical Setup
- **Brave Search API:** BSApqnJJZan2KhiBK5By_jODVBuDw9l ✅ WORKING
- **YouTube extraction:** Blocked (need TranscriptAPI)
- **Browser automation:** Playwright installed (blocked by YouTube)
- **Cron jobs:** Memory maintenance active

## Lessons Learned
- YouTube aggressively blocks datacenter IPs and headless browsers
- Subagents timeout on complex tasks (10 min limit)
- Manual completion often faster for urgent work
- Damon learns fast and wants immediate implementation

## CodeMojo Premium Design System ($30K Standard)
**Created: 2026-03-07**

**Rule: EVERY website must have $30K agency quality.**

### Design System Files:
- `/root/.openclaw/workspace/codemojo-design-system.md` - Full documentation
- `/root/.openclaw/workspace/mytowdirectory-v2/premium-styles.css` - Reusable CSS
- `/root/.openclaw/workspace/mytowdirectory-v2/premium-animations.js` - GSAP library

### Required on Every Site:
| Feature | Implementation |
|---------|---------------|
| Preloader | Branded loading animation with progress bar |
| Custom Cursor | Gold ring that follows mouse, scales on hover |
| Typography | Space Grotesk (body) + Cormorant Garamond (headlines) |
| Colors | Navy (#050D18) + Gold (#D4AF37) palette |
| Cards | Glassmorphism (blur + gold border) |
| Buttons | Gold gradient with glow on hover |
| Animations | GSAP scroll reveals, parallax, stagger effects |
| Sections | Label + Title + Gold Line + Description pattern |
| Images | Real Unsplash photos only |

### Voice Commands for CodeMojo:
- "Build a premium [type] site" → Uses full design system
- "Add glass cards" → Glassmorphism cards with hover lift
- "Add hero with parallax" → Full hero with parallax background
- "Add review marquee" → Infinite scrolling testimonials
- "Add stats with counters" → Animated counting numbers

**Reference Site:** https://dc-tow-directory-dm.netlify.app

## Files Created Today
- /root/.openclaw/workspace/MEMORY.md (this file)
- /root/.openclaw/workspace/diary/2026-03-06.md (first diary entry)
- /root/.openclaw/workspace/scripts/memory_compress.py
- /root/.openclaw/workspace/youtube_transcript.py (attempted, blocked)

---

## AI Resume & Job Search Guide - MASTERED (2026-03-08)

**Source:** Damon Mathewson  
**Status:** Mastered and ready for use  
**File:** `/root/.openclaw/workspace/AI_RESUME_GUIDE.md`

### Key Principles:
- **ATS Reality:** 90% of companies use ATS - resumes without right keywords get rejected by robots
- **Google XYZ Formula:** "Accomplished [X] as measured by [Y] by doing [Z]"
- **STAR Method:** Situation → Task → Action → Result

### 12 Master Prompts:

| # | Prompt | Purpose |
|---|--------|---------|
| 1 | Match Score | Get ATS match % + missing keywords |
| 2 | Experience Optimizer | Rewrite using XYZ formula |
| 3 | ATS Scanner | Check formatting issues |
| 4 | Technical Interview | Hardest 3 questions + perfect answers |
| 5 | Cover Letter | Under 300 words, hook + achievements |
| 6 | LinkedIn Headline | 5 options, 120 chars, keywords |
| 7 | LinkedIn About | 200 words, story + keywords |
| 8 | Behavioral Questions | Top 5 + STAR method answers |
| 9 | Salary Negotiation | Fairness check + counter email |
| 10 | Follow Up Email | Post-interview, under 150 words |
| 11 | Company Finder | 20 companies based on skills |
| 12 | Company Research | Summary + smart questions |

### ATS Best Practices:
- ❌ No tables, text boxes, headers, footers
- ❌ No images or unusual fonts
- ✅ Use standard section headings
- ✅ Include exact keywords from job description

---

*Last updated: 2026-03-08 02:00 GMT+8*
