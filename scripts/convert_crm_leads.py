#!/usr/bin/env python3
"""
Convert trucking leads to CRM format and add to mca-crm-simple/index.html
"""

import json
import re

# Load the new trucking leads
with open('/root/.openclaw/workspace/research/mca_leads_trucking_2025-03-18.json', 'r') as f:
    new_leads = json.load(f)

# Convert to CRM format
crm_leads = []
start_id = 51  # Continue from existing leads

for i, lead in enumerate(new_leads):
    # Extract state from location
    location = lead.get('location', '')
    state_match = re.search(r',\s*([A-Z]{2})', location)
    state = state_match.group(1) if state_match else 'TX'
    
    # Estimate years in business from notes
    years = 5  # default
    notes = lead.get('notes', '')
    if '25+ years' in notes or 'since 1929' in notes:
        years = 25
    elif 'since 1976' in notes or '50 years' in notes:
        years = 25
    elif 'since 2005' in notes:
        years = 20
    elif 'since 2006' in notes:
        years = 19
    elif 'since 1987' in notes:
        years = 38
    elif 'since 2011' in notes:
        years = 14
    elif '5-10 trucks' in lead.get('fleet_size', ''):
        years = 3
    
    # Calculate estimated monthly revenue based on fleet size
    fleet = lead.get('fleet_size', '')
    if '30-50' in fleet or '80' in fleet:
        monthly_revenue = 120000
    elif '25-35' in fleet:
        monthly_revenue = 90000
    elif '20-30' in fleet:
        monthly_revenue = 75000
    elif '15-25' in fleet or '15-20' in fleet:
        monthly_revenue = 60000
    elif '12-18' in fleet or '10-20' in fleet:
        monthly_revenue = 45000
    elif '10-15' in fleet:
        monthly_revenue = 35000
    elif '5-10' in fleet:
        monthly_revenue = 25000
    else:
        monthly_revenue = 40000
    
    # Calculate score based on factors
    score = 70  # base
    if years >= 20:
        score += 10
    elif years >= 10:
        score += 5
    
    if monthly_revenue >= 80000:
        score += 10
    elif monthly_revenue >= 50000:
        score += 5
    
    if 'expansion' in notes.lower() or 'growth' in notes.lower() or 'growing' in notes.lower():
        score += 5
        temperature = "HOT"
    else:
        temperature = "WARM"
    
    score = min(95, score)  # cap at 95
    
    crm_lead = {
        "id": str(start_id + i),
        "business_name": lead['company_name'],
        "industry": "Trucking",
        "contact_name": lead['owner_name'],
        "phone": lead['phone'],
        "email": lead['email'] if lead['email'] else "",
        "monthly_revenue": monthly_revenue,
        "years_in_business": years,
        "temperature": temperature,
        "stage": "new_lead",
        "score": score,
        "state": state,
        "minority_owned": "family-owned" in notes.lower() or "family owned" in notes.lower(),
        "minority_type": "Family-Owned" if "family" in notes.lower() else None
    }
    
    crm_leads.append(crm_lead)

print(f"Converted {len(crm_leads)} leads to CRM format")
for lead in crm_leads:
    print(f"  {lead['id']}: {lead['business_name']} ({lead['state']}) - Score: {lead['score']} - {lead['temperature']}")

# Save the converted leads
with open('/root/.openclaw/workspace/research/crm_format_leads.json', 'w') as f:
    json.dump(crm_leads, f, indent=2)

print(f"\nSaved to /root/.openclaw/workspace/research/crm_format_leads.json")