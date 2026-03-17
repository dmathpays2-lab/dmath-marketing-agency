# 🏢 BULLETPROOF BUSINESS REPOSITORY
## New Bot Onboarding Guide

**If you're reading this, you're the new bot.**
Welcome. Everything you need is in this repo.

---

## 🚀 QUICK START (Do This First)

```bash
# 1. Read the Business Registry
cat businesses/BUSINESS_REGISTRY.md

# 2. Check current status of all ventures
cat briefings/2026-03-17.md

# 3. Pick up where the last bot left off
```

---

## 📁 REPOSITORY STRUCTURE

```
/
├── README.md                    ← YOU ARE HERE (start here)
├── BOOTSTRAP.md                 ← First-time setup (if exists)
├── SOUL.md                      ← Who you are (personality)
├── USER.md                      ← Who you're helping
├── TOOLS.md                     ← API keys & credentials
├── AGENTS.md                    ← Agent system configuration
│
├── businesses/                  ← ALL BUSINESS VENTURES
│   ├── BUSINESS_REGISTRY.md     ← Master index of all businesses
│   ├── TRANSFER_GUIDE.md        ← How to move systems
│   ├── mca/                     ← MCA Lead Business
│   ├── think-plus-energy/       ← Energy Broker Business
│   └── momentum-tech/           ← AI Agent Infrastructure
│
├── docs/                        ← SYSTEM DOCUMENTATION
│   ├── AGENT_SELF_IMPROVEMENT.md
│   ├── EMAIL_WRITING_AGENT.md
│   └── [agent training docs]
│
├── memory/                      ← DAILY CONVERSATION LOGS
│   └── 2026-03-17.md            ← Today + recent context
│
├── briefings/                   ← CURRENT STATUS BRIEFINGS
│   └── 2026-03-17.md            ← Where things stand
│
├── scripts/                     ← AUTOMATION SCRIPTS
│   ├── github_sync.sh           ← Backs up to GitHub
│   └── memory_manager.py        ← Handles memory
│
└── [project folders]            ← Deployed applications
    ├── mca-crm-simple/          ← CRM (Vercel)
    ├── mca-lead-generator-pro/  ← Lead Generator (Vercel)
    └── [other apps]
```

---

## 🎯 ACTIVE BUSINESSES

### 1. MCA Lead Generation 🟢 ACTIVE
**What:** Merchant Cash Advance lead generation
**Status:** 50 leads loaded, CRM deployed, ready to sell
**Location:** `businesses/mca/`
**Revenue Potential:** $5,000/month target

**Quick Access:**
- CRM: https://mca-crm-simple.vercel.app
- Leads: `businesses/mca/leads/MCA_LEADS_50_EXPORT.csv`

### 2. Think Plus Energy Broker 🟡 RESEARCH PHASE
**What:** Independent energy broker for Texas electricity
**Status:** Deep research in progress (verify before launching)
**Location:** `businesses/think-plus-energy/`
**Revenue Potential:** $2,000/month target

**Quick Access:**
- Research: `businesses/think-plus-energy/research/`

### 3. Agent Ecosystem 🟢 ACTIVE
**What:** 4 specialized AI agents working together
**Status:** Fully operational
**Agents:**
- MAIN (you) - Strategy & coordination
- QOA - Quality assurance
- RSA - Research & facts
- EWA - Email writing

---

## 🤖 YOUR AGENT ECOSYSTEM

**You are MAIN.** You coordinate everything.

### How to Use Other Agents

```javascript
// Research something
sessions_spawn({
  label: "research-[topic]",
  agentId: "research-fact-agent",
  task: "Research [topic]"
})

// Write emails
sessions_spawn({
  label: "write-emails",
  agentId: "email-writer-agent",
  task: "Write cold emails for [leads]"
})

// Quality check
sessions_spawn({
  label: "qa-check",
  agentId: "quality-overseer-agent",
  task: "Review [deliverable]"
})
```

---

## 📋 DAILY ROUTINE

**Every Session, Do This:**

1. **Read SOUL.md** - Remember who you are
2. **Read USER.md** - Remember who you're helping
3. **Read memory/2026-03-17.md** - Recent context
4. **Read briefings/2026-03-17.md** - Current status
5. **Check BUSINESS_REGISTRY.md** - Active ventures

**Then:** Pick up where the last bot left off.

---

## 🔑 CRITICAL FILES (Never Delete)

| File | Purpose | If Missing |
|------|---------|------------|
| `TOOLS.md` | API keys | Can't access services |
| `SOUL.md` | Your personality | Lose consistency |
| `USER.md` | User preferences | Poor service |
| `BUSINESS_REGISTRY.md` | Business tracking | Chaos |

---

## 🆘 EMERGENCY RECOVERY

**If system crashes and you need to rebuild:**

1. Clone this repo:
```bash
git clone https://github.com/dmathpays2-lab/dmath-marketing-agency.git
```

2. Read this README (you're doing that now ✅)

3. Read BUSINESS_REGISTRY.md

4. Pick up where it says "Status" for each business

5. All customer data, research, and strategies are in the folders

---

## 💰 REVENUE TRACKING

Track in BUSINESS_REGISTRY.md:
- Monthly targets
- Current status
- Next actions

---

## ✅ SYSTEM CHECKLIST

**Verify these are working:**
- [ ] Can read all files in `businesses/`
- [ ] Can see lead data in `businesses/mca/leads/`
- [ ] Can access Vercel deployments (links in BUSINESS_REGISTRY)
- [ ] Can spawn subagents
- [ ] GitHub sync is running (cron every 15 min)

---

## 📝 LAST UPDATED

**Date:** 2026-03-17
**By:** Previous bot session
**Status:** All systems operational, 4 agents active, 2 businesses running

---

**If you're the new bot: Welcome. You're all set. Start by reading BUSINESS_REGISTRY.md.**

**If you're the user: This repo is now bulletproof. Any new bot can clone it and be productive in 5 minutes.**
