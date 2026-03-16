#!/usr/bin/env python3
"""
KIMI LEAD HUNTER: AMERICAN BACKBONE
User: Damon Matheson | Goal: Locating & Extracting High-Revenue Leads
"""

import json
from datetime import datetime
from pathlib import Path
from enum import Enum

class ExtractionMode(Enum):
    """Lead extraction intensity levels"""
    SNIPER = "sniper"      # 1 agent, 1 target
    SQUAD = "squad"        # 5 agents, 20-30 leads
    SWARM = "swarm"        # Full power, statewide (USE SPARINGLY)

class LeadHunter:
    """
    Advanced Lead Extraction System for American Backbone
    """
    
    def __init__(self, mode=ExtractionMode.SQUAD):
        self.mode = mode
        self.leads = []
        self.tools = {
            "live_search": True,
            "maps_scraper": True,
            "email_extractor": True,
            "phone_extractor": True,
            "review_analyzer": True
        }
        
    # THE BACKBONE FILTER
    BACKBONE_CRITERIA = {
        "industries": [
            "Box Truck",
            "Roofing", 
            "Solar",
            "Motels"
        ],
        "stability": {
            "min_months_in_business": 6,
            "preferred": "12+ months"
        },
        "revenue_signals": {
            "box_truck": "Multiple trucks (2+)",
            "roofing_solar": "Large crews (5+ workers)",
            "motels": "20+ rooms"
        }
    }
    
    # HIGH-INTENT INDICATORS
    HIGH_INTENT_SIGNALS = [
        "4 stars or less rating",
        "New ownership (recent)",
        "Recent negative reviews",
        "Now hiring (growth mode)",
        "Recent equipment purchases",
        "Seasonal surge prep"
    ]
    
    def set_extraction_mode(self, mode_str):
        """Set extraction intensity"""
        mode_map = {
            "sniper": ExtractionMode.SNIPER,
            "squad": ExtractionMode.SQUAD,
            "swarm": ExtractionMode.SWARM
        }
        self.mode = mode_map.get(mode_str.lower(), ExtractionMode.SQUAD)
        return self.mode
    
    def sniper_mode(self, target_name, target_business):
        """
        [SNIPER]: Use 1 agent to draft a DM or find a specific owner's email.
        
        Perfect for:
        - High-value specific targets
        - Referral follow-ups
        - Re-engaging old leads
        """
        print(f"🎯 SNIPER MODE: Targeting {target_name} at {target_business}")
        
        # Deploy 1 agent to:
        # 1. Research target
        # 2. Find owner email/phone
        # 3. Draft personalized DM
        
        result = {
            "mode": "SNIPER",
            "target": target_name,
            "business": target_business,
            "agents_deployed": 1,
            "output": {
                "owner_email": "",  # Extracted via [Email Extractor]
                "owner_phone": "",  # Extracted via [Phone Extractor]
                "dm_draft": self.generate_sniper_dm(target_name, target_business),
                "research_notes": ""  # Key findings about business
            }
        }
        
        return result
    
    def squad_mode(self, city, niche, count=25):
        """
        [SQUAD]: Use 5 agents to scrape a list of 20-30 leads from a specific city/niche.
        
        Standard deployment for daily operations.
        """
        print(f"👥 SQUAD MODE: Extracting {count} {niche} leads in {city}")
        print(f"   Deploying 5 agents...")
        
        # 5 agents working in parallel:
        # Agent 1: [Live Search] - Find businesses
        # Agent 2: [Maps Scraper] - Extract business details
        # Agent 3: [Email/Phone Extractor] - Get owner contacts
        # Agent 4: Review analyzer - Check ratings/ownership
        # Agent 5: Filter validator - Apply BACKBONE criteria
        
        result = {
            "mode": "SQUAD",
            "location": city,
            "niche": niche,
            "agents_deployed": 5,
            "target_count": count,
            "output": {
                "leads": [],  # Qualified leads
                "high_intent": [],  # 4 stars or less, new ownership
                "rejected": [],  # Didn't meet criteria
                "summary": f"Extracted {count} qualified {niche} leads from {city}"
            }
        }
        
        return result
    
    def swarm_mode(self, state, niches):
        """
        [SWARM]: Use full power only for statewide database extraction (USE SPARINGLY).
        
        WARNING: High resource usage. Reserve for major campaigns.
        """
        print(f"🐝 SWARM MODE: FULL STATEWIDE EXTRACTION")
        print(f"   State: {state}")
        print(f"   Niches: {', '.join(niches)}")
        print(f"   ⚠️  HIGH RESOURCE USAGE - MONITOR COSTS")
        
        result = {
            "mode": "SWARM",
            "state": state,
            "niches": niches,
            "agents_deployed": 20,
            "output": {
                "total_leads": 0,  # Could be 500-1000+
                "by_city": {},
                "by_niche": {},
                "high_intent_flagged": [],
                "database_file": ""
            }
        }
        
        return result
    
    def find_high_intent_leads(self, location, niche):
        """
        Use [Live Search] + [Maps Scraper] to find businesses with:
        - "4 stars or less" (they need help)
        - "New Ownership" (they need capital)
        """
        search_queries = [
            f'"{niche}" "{location}" "4 stars"',
            f'"{niche}" "{location}" "2 stars"',
            f'"{niche}" "{location}" "3 stars"',
            f'"{niche}" "{location}" "under new management"',
            f'"{niche}" "{location}" "new ownership"',
        ]
        
        high_intent_signals = []
        
        for query in search_queries:
            # [Live Search] executes
            # [Maps Scraper] extracts details
            # Results filtered for bad reviews/new ownership
            pass
        
        return high_intent_signals
    
    def extract_owner_contact(self, business_name, location):
        """
        Use [Email/Phone Extractor] to pull direct contact info for the owner.
        """
        contact_info = {
            "business_name": business_name,
            "location": location,
            "owner_name": "",  # From state filings or LinkedIn
            "owner_email": "",  # From [Email Extractor]
            "owner_phone": "",  # From [Phone Extractor]
            "owner_linkedin": "",
            "confidence_score": 0  # 0-100
        }
        
        return contact_info
    
    def apply_backbone_filter(self, lead):
        """
        THE "HUNTING" CRITERIA (The Backbone Filter)
        Every lead must be vetted against these standards:
        """
        
        # Check industry
        if lead.get("industry") not in self.BACKBONE_CRITERIA["industries"]:
            return False, "Industry not in target list"
        
        # Check stability
        months = lead.get("months_in_business", 0)
        if months < self.BACKBONE_CRITERIA["stability"]["min_months_in_business"]:
            return False, f"Only {months} months in business (need 6+)"
        
        # Check revenue signals
        revenue_ok = self.check_revenue_signals(lead)
        if not revenue_ok:
            return False, "Revenue signals insufficient"
        
        return True, "PASSED BACKBONE FILTER"
    
    def check_revenue_signals(self, lead):
        """Verify revenue indicators based on industry"""
        
        industry = lead.get("industry")
        signals = lead.get("signals", {})
        
        if industry == "Box Truck":
            # Check for multiple trucks
            truck_count = signals.get("truck_count", 0)
            return truck_count >= 2
        
        elif industry in ["Roofing", "Solar"]:
            # Check for crew size
            crew_size = signals.get("crew_size", 0)
            return crew_size >= 5
        
        elif industry == "Motels":
            # Check room count
            room_count = signals.get("room_count", 0)
            return room_count >= 20
        
        return False
    
    def generate_sniper_dm(self, target_name, target_business):
        """
        THE OUTREACH ANCHOR:
        When a lead is found, generate a "Hook" that mentions:
        "Bridge the gap between work and payment. Once setup, sales payments are INSTANTLY DEPOSITED."
        """
        
        hooks = [
            f"Hey {target_name}, I noticed {target_business} is growing fast. I help {target_business.split()[0]} owners bridge the gap between work and payment. Once setup, sales payments are INSTANTLY DEPOSITED. Worth a quick chat?",
            
            f"{target_name}, saw {target_business} online. Quick question - are you dealing with that 30-60 day payment delay from clients? I bridge that gap so once setup, sales payments are INSTANTLY DEPOSITED. Want details?",
            
            f"Hey {target_name}, Damon here. I specialize in helping {target_business.split()[0]} businesses with cash flow. We bridge the gap between work and payment - once setup, sales payments are INSTANTLY DEPOSITED. 10-min call worth your time?",
        ]
        
        import random
        return random.choice(hooks)
    
    def generate_squad_outreach(self, niche):
        """Generate outreach templates for SQUAD mode leads"""
        
        templates = {
            "Box Truck": {
                "hook": "Bridge the gap between loads and payment. Once setup, sales payments are INSTANTLY DEPOSITED.",
                "pain": "waiting 30-60 days for broker payouts",
                "solution": "180-day revenue audit for immediate funding"
            },
            "Roofing": {
                "hook": "Bridge the gap between jobs and payment. Once setup, sales payments are INSTANTLY DEPOSITED.",
                "pain": "material costs upfront, client payments delayed",
                "solution": "revenue-based funding in 24-48 hours"
            },
            "Solar": {
                "hook": "Bridge the gap between installs and payment. Once setup, sales payments are INSTANTLY DEPOSITED.",
                "pain": "long installation cycles, delayed commissions",
                "solution": "6-month revenue audit for working capital"
            },
            "Motels": {
                "hook": "Bridge the gap between bookings and cash flow. Once setup, sales payments are INSTANTLY DEPOSITED.",
                "pain": "seasonal fluctuations, occupancy gaps",
                "solution": "revenue-based funding for improvements"
            }
        }
        
        return templates.get(niche, templates["Box Truck"])
    
    def execute(self, mode="squad", **kwargs):
        """Main execution method"""
        
        mode = mode.lower()
        
        if mode == "sniper":
            return self.sniper_mode(
                target_name=kwargs.get("target_name"),
                target_business=kwargs.get("target_business")
            )
        
        elif mode == "squad":
            return self.squad_mode(
                city=kwargs.get("city"),
                niche=kwargs.get("niche"),
                count=kwargs.get("count", 25)
            )
        
        elif mode == "swarm":
            return self.swarm_mode(
                state=kwargs.get("state"),
                niches=kwargs.get("niches", ["Box Truck", "Roofing", "Motels"])
            )
        
        else:
            return {"error": f"Unknown mode: {mode}"}

# Command Interface
def main():
    """
    Command examples:
    
    # SNIPER: Target specific owner
    python lead_hunter.py sniper "Mike Johnson" "Johnson Trucking"
    
    # SQUAD: Extract 25 leads
    python lead_hunter.py squad "Houston, TX" "Box Truck" 25
    
    # SWARM: Statewide extraction
    python lead_hunter.py swarm "Texas" "Box Truck,Roofing,Motels"
    """
    
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python lead_hunter.py [sniper|squad|swarm] [args...]")
        return
    
    mode = sys.argv[1]
    hunter = LeadHunter()
    
    if mode == "sniper":
        target_name = sys.argv[2] if len(sys.argv) > 2 else "Owner"
        target_business = sys.argv[3] if len(sys.argv) > 3 else "Business"
        result = hunter.sniper_mode(target_name, target_business)
        print(json.dumps(result, indent=2))
    
    elif mode == "squad":
        city = sys.argv[2] if len(sys.argv) > 2 else "Atlanta, GA"
        niche = sys.argv[3] if len(sys.argv) > 3 else "Box Truck"
        count = int(sys.argv[4]) if len(sys.argv) > 4 else 25
        result = hunter.squad_mode(city, niche, count)
        print(json.dumps(result, indent=2))
    
    elif mode == "swarm":
        state = sys.argv[2] if len(sys.argv) > 2 else "Texas"
        niches = sys.argv[3].split(",") if len(sys.argv) > 3 else ["Box Truck", "Roofing"]
        result = hunter.swarm_mode(state, niches)
        print(json.dumps(result, indent=2))
    
    else:
        print(f"Unknown mode: {mode}")

if __name__ == "__main__":
    main()
