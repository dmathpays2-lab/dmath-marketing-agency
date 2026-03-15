#!/usr/bin/env python3
"""
CLOSER AI - DM Automation & Closing Agent for American Backbone
Sends personalized DMs, follows up, books calls
"""

import json
from datetime import datetime, timedelta
from pathlib import Path

class CloserAI:
    """AI Agent that automates closing sequence via DM"""
    
    def __init__(self, prospect_name="", business_type=""):
        self.prospect_name = prospect_name
        self.business_type = business_type
        self.sequence_stage = 0
        self.last_contact = None
        
    # CLOSING SCRIPT (From American Backbone Manual)
    
    def get_initial_dm(self):
        """First DM - The Consultant Closing Script"""
        
        script = f"""Hey {self.prospect_name}, I'm Damon with American Backbone. Here is that info on bridging the 30-60 day gap.

We use a 180-day revenue audit to get you funded while you wait on those slow broker payouts.

**OUR 2026 BENCHMARKS:**
• $15k+ Monthly Revenue (Last 6 Months)
• 500+ FICO Score
• 6 Months in Business

**Note:** Once your account is set up, all payments from sales will be instantly deposited to your account.

Here is the Strategy Guide: [LINK]

Want to see your funding capacity today?"""
        
        return script
    
    def get_follow_up_24h(self):
        """Follow up after 24 hours if no response"""
        
        script = f"""Hey {self.prospect_name}, wanted to make sure you got the strategy guide I sent yesterday.

Quick question: Are you seeing that 30-60 day gap affecting your {self.business_type} operations right now?

If so, I can run a quick funding capacity check using your last 6 months of revenue - takes 2 minutes, no impact on credit.

Worth a look?"""
        
        return script
    
    def get_follow_up_48h(self):
        """Follow up after 48 hours"""
        
        script = f"""{self.prospect_name}, I know you're busy running a {self.business_type}, so I'll keep this short.

I just helped another {self.business_type} owner secure $XX,XXX in working capital within 48 hours using this same revenue audit approach.

They were dealing with the same broker delay issues.

If you want me to run your numbers real quick, just say "RUN IT" and I'll calculate your funding capacity.

No obligation, just information.

- Damon"""
        
        return script
    
    def get_value_nurture(self):
        """Value-add message (not asking for anything)"""
        
        tips = [
            "Quick tip: Most {business_type} owners don't realize their revenue history is worth more than their credit score when it comes to fast funding.",
            "Did you know? A 6-month revenue audit can qualify you for immediate working capital while traditional lenders take 30-60 days?",
            "Fun fact: 73% of {business_type} owners use revenue-based funding to bridge cash flow gaps from slow-paying clients.",
            "Here's something most brokers won't tell you: Your deposit history is leverage. 6 months of consistent revenue = funding options."
        ]
        
        import random
        tip = random.choice(tips).format(business_type=self.business_type)
        
        script = f"""Hey {self.prospect_name},

{tip}

Food for thought as you navigate those payment delays.

- Damon"""
        
        return script
    
    def get_booking_script(self):
        """Script to book a call"""
        
        script = f"""{self.prospect_name}, based on what you've shared, I think I can help bridge that gap pretty quickly.

I'd like to run your numbers and show you exactly what funding capacity you have available.

Takes 10 minutes. I just need:
• Last 6 months of business bank statements
• Basic business info

When's a good time for a quick call this week?

I have:
• Tuesday 2pm or 4pm
• Wednesday 10am or 3pm
• Thursday 11am or 2pm

What works?"""
        
        return script
    
    def get_objection_handler(self, objection):
        """Handle common objections"""
        
        handlers = {
            "too_expensive": f"""I hear you, {self.prospect_name}. Here's the thing - this isn't an expense, it's bridge capital that gets you paid immediately instead of waiting 30-60 days.

Most {self.business_type} owners see it as a tool to maintain cash flow, not a cost.

Plus, you only use it when you need it. No monthly fees sitting around.

Want to see what the numbers actually look like for your situation?""",
            
            "bad_credit": f"""Good news, {self.prospect_name} - this isn't based on your personal credit.

We use your 6-month revenue history. If you're doing $15K+/month consistently, that's what matters.

I've funded {self.business_type} owners with 500 FICO scores because their revenue was solid.

Want me to check what you qualify for based on deposits, not credit?""",
            
            "not_interested": f"""No problem, {self.prospect_name}. I know timing isn't always right.

Quick question though - are you currently using any other strategy to bridge that 30-60 day gap from brokers?

Just curious what other {self.business_type} owners are doing to handle cash flow.

- Damon""",
            
            "need_to_think": f"""Absolutely, {self.prospect_name}. Smart to think it through.

Here's what I can do to help with that decision:

I'll run your exact funding capacity with real numbers - no obligation, no credit pull.

Then you'll know exactly what's available if/when you need it.

Sound fair?""",
            
            "too_busy": f"""I get it, {self.prospect_name}. Running a {self.business_type} is 24/7.

That's exactly why I built this to be fast - 10 minutes to see your numbers, funding in 24-48 hours if you decide to move forward.

No lengthy applications, no back-and-forth for weeks.

Worth 10 minutes to see if it's a fit?"""
        }
        
        return handlers.get(objection, handlers["not_interested"])
    
    # AUTOMATED SEQUENCES
    
    def create_closing_sequence(self):
        """Create full 7-day closing sequence"""
        
        sequence = [
            {
                "day": 0,
                "time": "immediate",
                "message": self.get_initial_dm(),
                "goal": "Send strategy guide, introduce service"
            },
            {
                "day": 1,
                "time": "24_hours",
                "message": self.get_follow_up_24h(),
                "goal": "Check if they got guide, ask about urgency"
            },
            {
                "day": 2,
                "time": "48_hours",
                "message": self.get_follow_up_48h(),
                "goal": "Social proof, soft CTA"
            },
            {
                "day": 4,
                "time": "96_hours",
                "message": self.get_value_nurture(),
                "goal": "Provide value, stay top of mind"
            },
            {
                "day": 7,
                "time": "7_days",
                "message": f"""Hey {self.prospect_name}, last follow-up from me.

I know timing isn't always right. If you ever need to bridge that cash flow gap quickly, here's my info:

Damon | American Backbone
📧 dmathsales@gmail.com

No pressure - just keep me in mind when those broker delays start hurting.

Best of luck with the {self.business_type}!

- Damon""",
                "goal": "Final touch, leave door open"
            }
        ]
        
        return sequence
    
    def personalize_script(self, template, prospect_data):
        """Personalize any script with prospect data"""
        
        personalized = template.replace("[Name]", prospect_data.get("name", ""))
        personalized = personalized.replace("[Business Type]", prospect_data.get("business_type", ""))
        personalized = personalized.replace("[Monthly Revenue]", str(prospect_data.get("monthly_revenue", "")))
        personalized = personalized.replace("[Location]", prospect_data.get("location", ""))
        
        return personalized
    
    def track_response(self, prospect_id, message_sent, response_received=None):
        """Track all prospect interactions"""
        
        interaction = {
            "prospect_id": prospect_id,
            "timestamp": datetime.now().isoformat(),
            "message_sent": message_sent,
            "response_received": response_received,
            "sequence_stage": self.sequence_stage,
            "next_action": self.determine_next_action(response_received)
        }
        
        return interaction
    
    def determine_next_action(self, response):
        """Determine next action based on prospect response"""
        
        if not response:
            return "follow_up_24h"
        
        response_lower = response.lower()
        
        # Positive signals
        if any(word in response_lower for word in ["interested", "yes", "tell me", "how much", "run it", "numbers"]):
            return "send_calendly"
        
        # Objections
        if any(word in response_lower for word in ["expensive", "cost", "price"]):
            return "handle_objection_expensive"
        
        if any(word in response_lower for word in ["credit", "fico", "score"]):
            return "handle_objection_credit"
        
        if any(word in response_lower for word in ["busy", "later", "not now"]):
            return "handle_objection_timing"
        
        # Negative
        if any(word in response_lower for word in ["no", "not interested", "unsubscribe"]):
            return "remove_from_sequence"
        
        return "nurture_value"
    
    def generate_daily_dms(self, prospects_list):
        """Generate all DMs for the day"""
        
        daily_dms = []
        
        for prospect in prospects_list:
            closer = CloserAI(
                prospect_name=prospect.get("name"),
                business_type=prospect.get("business_type")
            )
            
            # Determine which message to send based on where they are in sequence
            sequence = closer.create_closing_sequence()
            
            daily_dms.append({
                "prospect": prospect,
                "message": closer.get_initial_dm(),
                "sequence": sequence
            })
        
        return daily_dms

# Execution
def main():
    """Run Closer AI daily"""
    
    print("💬 CLOSER AI: Generating closing sequences")
    
    # Example prospects
    prospects = [
        {"name": "Mike", "business_type": "trucking company"},
        {"name": "Sarah", "business_type": "construction business"},
        {"name": "John", "business_type": "motel"}
    ]
    
    for prospect in prospects:
        closer = CloserAI(
            prospect_name=prospect["name"],
            business_type=prospect["business_type"]
        )
        
        print(f"\n🎯 Prospect: {prospect['name']}")
        print(f"📧 Initial DM:\n{closer.get_initial_dm()[:200]}...")
        
        sequence = closer.create_closing_sequence()
        print(f"📋 Sequence length: {len(sequence)} messages")
    
    print("\n💬 CLOSER AI Complete")

if __name__ == "__main__":
    main()
