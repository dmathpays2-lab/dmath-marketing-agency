#!/usr/bin/env python3
"""
GitHub Repository Organizer for Damon's 3 Businesses
Creates separate repos for MCA, Think Energy, and More MITO
"""

import requests
import json
import base64
from datetime import datetime

GITHUB_TOKEN = "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"
GITHUB_API = "https://api.github.com"
HEADERS = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

def create_repository(name, description, private=False):
    """Create a new GitHub repository"""
    print(f"\n📁 Creating repository: {name}")
    
    data = {
        "name": name,
        "description": description,
        "private": private,
        "auto_init": True,
        "gitignore_template": "Python",
        "license_template": "mit"
    }
    
    response = requests.post(
        f"{GITHUB_API}/user/repos",
        headers=HEADERS,
        json=data
    )
    
    if response.status_code == 201:
        repo_data = response.json()
        print(f"✅ Created: {repo_data['html_url']}")
        return repo_data
    elif response.status_code == 422:
        print(f"⚠️ Repository '{name}' already exists")
        return None
    else:
        print(f"❌ Error: {response.status_code}")
        print(response.text)
        return None

def create_file_in_repo(repo_name, file_path, content, message="Initial commit"):
    """Create a file in a repository"""
    # Encode content to base64
    content_encoded = base64.b64encode(content.encode()).decode()
    
    data = {
        "message": message,
        "content": content_encoded
    }
    
    response = requests.put(
        f"{GITHUB_API}/repos/dmathpays2-lab/{repo_name}/contents/{file_path}",
        headers=HEADERS,
        json=data
    )
    
    if response.status_code in [201, 200]:
        return True
    else:
        print(f"❌ Error creating {file_path}: {response.status_code}")
        return False

def setup_mca_repo():
    """Setup MCA (American Backbone) repository"""
    print("\n" + "="*60)
    print("🏢 SETTING UP: American Backbone MCA")
    print("="*60)
    
    repo = create_repository(
        name="american-backbone-mca",
        description="American Backbone - MCA Lead Generation System. AI-powered funding solutions for small businesses.",
        private=False
    )
    
    if not repo:
        return
    
    # Create README
    readme_content = """# 🇺🇸 American Backbone - MCA System

**AI-Powered Lead Generation for Merchant Cash Advance**

## Overview
Complete system for generating MCA leads using AI agents. Targets Construction, Trucking, and Motels with $15K+ revenue.

## The 3 AI Agents

### 1. Hunter AI (Lead Generation)
- Scrapes Google Maps, Yelp for businesses
- Filters: $15K+ revenue, 6+ months, 500+ FICO
- Output: 60 qualified leads/day

### 2. Social AI (Facebook Infiltration)
- Posts "UNSTOPPABLE" content 12x/day
- Monitors groups for funding pain signals
- Auto-drafts "Search & Rescue" responses

### 3. Closer AI (DM Automation)
- Sends closing scripts via DM
- 7-day automated follow-up
- Books calls when prospects ready

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Run orchestrator
python orchestrator.py

# Or run individual agents
python agents/hunter_ai.py
python agents/social_ai.py
python agents/closer_ai.py
```

## Financial Impact

| Metric | Without AI | With AI |
|--------|-----------|---------|
| Time/Day | 9 hours | 5 hours |
| Leads/Day | 10-15 | 60 |
| Monthly Cost | $12,000 | $450 |
| **Savings** | - | **$11,550/mo** |

## Contact
**Damon Mathewson**  
📧 damon@bizfunds.net  
🌐 American Backbone - "Funding the American Dream"

---
*AI Agents Ready. Awaiting Your Command.* 🇺🇸
"""
    
    create_file_in_repo("american-backbone-mca", "README.md", readme_content, "Initial MCA setup")
    
    # Create .gitignore
    gitignore = """# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
*.env

# API Keys (NEVER commit these)
*.key
config/secrets.json

# Data files
leads/*.csv
leads/*.json
data/

# Logs
*.log
logs/

# IDE
.vscode/
.idea/
*.swp
*.swo
"""
    
    create_file_in_repo("american-backbone-mca", ".gitignore", gitignore, "Add gitignore")
    
    print("✅ MCA repository configured")

def setup_think_energy_repo():
    """Setup Think Energy repository"""
    print("\n" + "="*60)
    print("⚡ SETTING UP: Think Energy / Think+")
    print("="*60)
    
    repo = create_repository(
        name="think-energy-business",
        description="Think Energy / Think+ - Energy Advisor Business. Deregulated electricity and solar solutions.",
        private=False
    )
    
    if not repo:
        return
    
    # Create README
    readme_content = """# ⚡ Think Energy / Think+ Business System

**Energy Advisor - Deregulated Electricity & Solar**

## Overview
Complete business system for Think Energy. Help customers save on electricity and earn residual income.

## Products

### 1. Deregulated Electricity
- Fixed rates: 6, 12, 18, 24, 36 months
- $100 cash gift card for new customers
- Competitive vs utility rates

### 2. Community Solar
- No rooftop required
- 5-20% guaranteed savings
- Up to 20 years of savings

### 3. Rooftop Solar
- Full installation + battery storage
- Split commission (25% at contract, 75% at activation)

### 4. Free Energy Club
- Refer 3+ customers → monthly rebates
- Up to 100% of supply charges rebated

## Compensation Plan

### Personal Income
- **Customer Acquisition Bonus (CAB)** - One-time per customer
- **Residual Commissions** - Monthly ongoing
- **Rank Advancement Bonuses** - One-time for rank-ups

### Team Income
- **Level Commissions** - Up to 10 levels deep
- **2-Level Mentor Pay** - Bonus on personally sponsored
- **Rank Infinity Pay** - Infinite levels down
- **Coded Infinity Pay** - 12 coded positions
- **Partner Pool Pay** - Company-wide pool share

## Geographic Markets
16 states + DC: TX, CT, ME, IL, NY, OR, VA, DE, CO, MD, MA, MN, NJ, NM, RI, DC

## Quick Start

```bash
# Customer enrollment
$59 upfront + $149/year renewal

# No monthly fees
# Independent contractor status
```

## Lead Generation
- Target: Homeowners, renters, small businesses
- Pain point: High electricity bills
- Solution: Fixed rates + solar savings

## Contact
**Damon Mathewson - Energy Advisor**  
📧 talkhealthwithme@gmail.com  
🌐 thinkenergy.com | thinkenergy.plus

---
*Powering Homes. Empowering People.* ⚡
"""
    
    create_file_in_repo("think-energy-business", "README.md", readme_content, "Initial Think Energy setup")
    
    print("✅ Think Energy repository configured")

def setup_more_mito_repo():
    """Setup More MITO repository"""
    print("\n" + "="*60)
    print("💚 SETTING UP: More MITO - Health & Wellness")
    print("="*60)
    
    repo = create_repository(
        name="more-mito-health",
        description="More MITO - Health & Wellness Business. Life Is Precious.",
        private=False
    )
    
    if not repo:
        return
    
    # Create README
    readme_content = """# 💚 More MITO - Health & Wellness

**Life Is Precious**

## Overview
Health and wellness lifestyle brand focused on daily wellness and healthy living.

## Mission
Help people live healthier, more vibrant lives through:
- Premium health products
- Wellness education
- Lifestyle coaching
- Community support

## Business Model
Direct sales / MLM structure with focus on:
- Product retail
- Team building
- Residual income
- Lifestyle transformation

## Target Market
- Health-conscious individuals
- Families seeking wellness
- People with chronic health concerns
- Fitness enthusiasts
- Aging adults (longevity focus)

## Products
[To be documented - need product details from Damon]

## Compensation
[To be documented - need comp plan details]

## Lead Generation Strategies
- Health forums and groups
- Wellness events
- Social media (transformation stories)
- Referral programs
- Doctor/health practitioner partnerships

## Contact
**Damon Mathewson**  
📧 talkhealthwithme@gmail.com  
🌐 moremito.com

---
*Life Is Precious. Live It Well.* 💚
"""
    
    create_file_in_repo("more-mito-health", "README.md", readme_content, "Initial More MITO setup")
    
    print("✅ More MITO repository configured")

def setup_dmath_marketing_repo():
    """Setup D Math Marketing (AI Agency) repository"""
    print("\n" + "="*60)
    print("🚀 SETTING UP: D Math Marketing - AI Agency")
    print("="*60)
    
    repo = create_repository(
        name="dmath-marketing-agency",
        description="D Math Marketing - AI Agency selling websites, chatbots, and AI automation to local businesses.",
        private=False
    )
    
    if not repo:
        return
    
    # Create README
    readme_content = """# 🚀 D Math Marketing - AI Agency

**$30K Premium Websites at $5K-15K Prices**

## Services

### 1. Premium Website Design
- **$30K quality at $5K-15K**
- GSAP animations, parallax, custom cursor
- Real Unsplash images (no placeholders)
- Mobile-first responsive design
- SEO optimized

### 2. AI Chatbots
- **$2.5K-10K setup**
- 24/7 customer support
- Lead qualification
- Appointment booking
- Integration with CRM

### 3. Lead Generation Systems
- **$15K-35K**
- Google Maps scraping
- Facebook automation
- Email/SMS sequences
- CRM integration

### 4. Full AI Agency Transformation
- **$25K-50K**
- Complete business automation
- AI agent deployment
- Custom tool development
- Training + support

## Portfolio

### Completed Projects
- ✅ Towing Directory (mytowdirectory.com clone)
- [ ] Plumber Lead Gen Site
- [ ] HVAC Company Site  
- [ ] Roofer Showcase
- [ ] Law Firm Site

## Tech Stack
- Next.js / React
- GSAP animations
- Tailwind CSS
- Node.js backend
- Apify scraping
- OpenClaw automation

## Process
1. **Discovery** - Understand business needs
2. **Design** - Create $30K premium mockup
3. **Build** - Develop with real images + animations
4. **Deploy** - Netlify hosting + domain setup
5. **Train** - Show client how to manage

## Target Clients
- Local service businesses
- Plumbers, HVAC, roofers, lawyers
- Any business needing online presence
- Companies wanting AI automation

## Contact
**Damon Mathewson**  
📧 dmathsales@gmail.com  
🌐 [Website coming soon]

---
*Building the Future of Business.* 🚀
"""
    
    create_file_in_repo("dmath-marketing-agency", "README.md", readme_content, "Initial agency setup")
    
    print("✅ D Math Marketing repository configured")

def print_summary():
    """Print summary of created repositories"""
    print("\n" + "="*60)
    print("📊 REPOSITORY SETUP COMPLETE")
    print("="*60)
    print("\n✅ Created 4 organized repositories:")
    print("\n1. 🇺🇸 american-backbone-mca")
    print("   MCA lead generation + AI agents")
    print("   https://github.com/dmathpays2-lab/american-backbone-mca")
    
    print("\n2. ⚡ think-energy-business")
    print("   Energy advisor business")
    print("   https://github.com/dmathpays2-lab/think-energy-business")
    
    print("\n3. 💚 more-mito-health")
    print("   Health & wellness products")
    print("   https://github.com/dmathpays2-lab/more-mito-health")
    
    print("\n4. 🚀 dmath-marketing-agency")
    print("   AI agency services")
    print("   https://github.com/dmathpays2-lab/dmath-marketing-agency")
    
    print("\n" + "="*60)
    print("NEXT STEPS:")
    print("="*60)
    print("1. Visit each repository on GitHub")
    print("2. Copy relevant files from mca-vault")
    print("3. Organize code/scripts per business")
    print("4. Set up automated syncing if needed")
    
if __name__ == "__main__":
    print("="*60)
    print("🗂️  GITHUB REPOSITORY ORGANIZER")
    print("   Creating separate repos for 3 businesses")
    print("="*60)
    
    # Create all 4 repositories
    setup_mca_repo()
    setup_think_energy_repo()
    setup_more_mito_repo()
    setup_dmath_marketing_repo()
    
    # Print summary
    print_summary()
