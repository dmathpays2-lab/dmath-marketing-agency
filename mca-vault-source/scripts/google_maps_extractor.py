#!/usr/bin/env python3
"""
Google Maps Lead Extractor for MCA Business
Uses Apify to scrape Box Truck, Roofing, and Motel businesses
"""

import requests
import json
import time
import csv
from datetime import datetime

APIFY_TOKEN = "apify_api_HbUkbiKl8g3ldJJXawiQ2fC6sFeWDF0nSD6F"
APIFY_BASE_URL = "https://api.apify.com/v2"

# Target industries for MCA
TARGET_CATEGORIES = {
    "box_truck": [
        "box truck company",
        "hot shot trucking", 
        "expedited freight",
        "owner operator trucking",
        "delivery service"
    ],
    "roofing": [
        "roofing contractor",
        "roof repair",
        "commercial roofing",
        "residential roofing",
        "roofing company"
    ],
    "motels": [
        "motel",
        "hotel",
        "inn",
        "lodging",
        "extended stay"
    ]
}

# Iowa cities (expandable)
IOWA_LOCATIONS = [
    "Des Moines, IA",
    "Cedar Rapids, IA",
    "Davenport, IA",
    "Sioux City, IA",
    "Iowa City, IA",
    "Waterloo, IA",
    "Ames, IA",
    "West Des Moines, IA",
    "Council Bluffs, IA",
    "Dubuque, IA"
]

def run_google_maps_scraper(category, location, max_results=100):
    """
    Run Google Maps scraper for a specific category and location
    """
    print(f"\n🔍 Searching: {category} in {location}")
    
    # Apify Google Maps Scraper actor: compass/crawler-google-places
    actor_input = {
        "searchStringsArray": [f"{category} near {location}"],
        "maxCrawledPlacesPerSearch": max_results,
        "maxImages": 0,  # Skip images for speed
        "maxReviews": 10,  # Get some reviews for revenue indicators
        "includeHistogram": False,
        "includeOpeningHours": False,
        "includePeopleAlsoSearch": False,
        "scrapeReviewerName": False,
        "scrapeReviewerId": False,
        "scrapeReviewId": False,
        "scrapeReviewUrl": False,
        "searchMatching": "all",
        "placeMinimumStars": "any",
        "skipClosedPlaces": False,
        "language": "en",
        "maximumNumberOfScrapedPlaces": max_results
    }
    
    print(f"📡 Starting Apify actor...")
    
    # Start the actor run
    response = requests.post(
        f"{APIFY_BASE_URL}/acts/compass~crawler-google-places/runs?token={APIFY_TOKEN}",
        json={"runInput": actor_input}
    )
    
    if response.status_code != 201:
        print(f"❌ Error starting actor: {response.status_code}")
        print(f"Response: {response.text}")
        return None
    
    run_data = response.json()
    run_id = run_data["data"]["id"]
    dataset_id = run_data["data"]["defaultDatasetId"]
    
    print(f"✅ Actor started (Run ID: {run_id[:8]}...)")
    print("⏳ Waiting for completion...")
    
    # Poll for completion
    max_wait = 300  # 5 minutes
    waited = 0
    while waited < max_wait:
        time.sleep(5)
        waited += 5
        
        status_response = requests.get(
            f"{APIFY_BASE_URL}/actor-runs/{run_id}?token={APIFY_TOKEN}"
        )
        
        if status_response.status_code == 200:
            status_data = status_response.json()
            status = status_data["data"]["status"]
            
            if status == "SUCCEEDED":
                print(f"✅ Scraping complete! ({waited}s)")
                break
            elif status in ["FAILED", "ABORTED", "TIMED_OUT"]:
                print(f"❌ Run failed with status: {status}")
                return None
            else:
                if waited % 15 == 0:
                    print(f"⏳ Still running... ({waited}s)")
    
    # Get the results
    print("📥 Fetching results...")
    results_response = requests.get(
        f"{APIFY_BASE_URL}/datasets/{dataset_id}/items?token={APIFY_TOKEN}"
    )
    
    if results_response.status_code != 200:
        print(f"❌ Error fetching results: {results_response.status_code}")
        return None
    
    businesses = results_response.json()
    print(f"✅ Retrieved {len(businesses)} businesses")
    
    return businesses

def analyze_business(business):
    """
    Extract MCA-relevant data from business
    """
    # Basic info
    name = business.get("title", "N/A")
    address = business.get("address", "N/A")
    phone = business.get("phone", "N/A")
    website = business.get("website", "N/A")
    
    # Revenue indicators
    review_count = business.get("reviewsCount", 0)
    rating = business.get("totalScore", 0)
    
    # Estimate revenue potential
    revenue_indicator = "Unknown"
    if review_count > 50:
        revenue_indicator = "High (Established)"
    elif review_count > 20:
        revenue_indicator = "Medium (Growing)"
    elif review_count > 5:
        revenue_indicator = "Low (New/Small)"
    
    # Check for funding signals in reviews
    reviews = business.get("reviews", [])
    funding_signals = []
    signal_keywords = ["expanding", "growth", "hiring", "new location", "busy", "slow", "cash flow"]
    
    for review in reviews[:5]:  # Check first 5 reviews
        text = review.get("text", "").lower()
        for keyword in signal_keywords:
            if keyword in text:
                funding_signals.append(keyword)
    
    # Business category
    categories = business.get("categories", [])
    category = categories[0] if categories else "N/A"
    
    # Website domain for email hunting
    domain = "N/A"
    if website and website != "N/A":
        try:
            from urllib.parse import urlparse
            parsed = urlparse(website)
            domain = parsed.netloc.replace("www.", "")
        except:
            pass
    
    return {
        "business_name": name,
        "category": category,
        "address": address,
        "phone": phone,
        "website": website,
        "domain": domain,
        "review_count": review_count,
        "rating": rating,
        "revenue_indicator": revenue_indicator,
        "funding_signals": ", ".join(set(funding_signals)) if funding_signals else "None detected",
        "google_maps_url": business.get("url", "N/A"),
        "scraped_date": datetime.now().strftime("%Y-%m-%d")
    }

def run_full_extraction(locations=None, industries=None, max_per_search=50):
    """
    Run full extraction across multiple locations and industries
    """
    if locations is None:
        locations = IOWA_LOCATIONS
    
    if industries is None:
        industries = ["box_truck", "roofing", "motels"]
    
    all_leads = []
    
    print("=" * 70)
    print("GOOGLE MAPS LEAD EXTRACTOR - MCA Business Generator")
    print("=" * 70)
    print(f"\n📍 Locations: {len(locations)}")
    print(f"🏢 Industries: {len(industries)}")
    print(f"📊 Max per search: {max_per_search}")
    print("=" * 70)
    
    total_estimated = len(locations) * len(industries) * max_per_search
    print(f"\n🎯 Estimated total leads: {total_estimated}")
    print("=" * 70)
    
    for industry in industries:
        categories = TARGET_CATEGORIES.get(industry, [industry])
        
        for location in locations:
            for category in categories:
                print(f"\n{'='*70}")
                print(f"🏢 Industry: {industry.upper()}")
                print(f"📍 Location: {location}")
                print(f"🔍 Category: {category}")
                print(f"{'='*70}")
                
                try:
                    businesses = run_google_maps_scraper(category, location, max_per_search)
                    
                    if businesses:
                        for biz in businesses:
                            lead = analyze_business(biz)
                            lead["search_category"] = category
                            lead["search_location"] = location
                            lead["industry"] = industry
                            all_leads.append(lead)
                        
                        print(f"✅ Added {len(businesses)} leads from this search")
                    else:
                        print("⚠️ No results from this search")
                        
                except Exception as e:
                    print(f"❌ Error: {e}")
                    continue
                
                # Small delay between searches
                time.sleep(2)
    
    return all_leads

def save_results(leads, filename=None):
    """
    Save leads to CSV and JSON
    """
    if filename is None:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"google_maps_leads_{timestamp}"
    
    # Save as JSON
    json_file = f"/root/.openclaw/workspace/{filename}.json"
    with open(json_file, 'w') as f:
        json.dump({
            "extraction_date": datetime.now().isoformat(),
            "total_leads": len(leads),
            "leads": leads
        }, f, indent=2)
    
    # Save as CSV
    csv_file = f"/root/.openclaw/workspace/{filename}.csv"
    if leads:
        with open(csv_file, 'w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=leads[0].keys())
            writer.writeheader()
            writer.writerows(leads)
    
    print(f"\n💾 Results saved:")
    print(f"   📄 JSON: {json_file}")
    print(f"   📊 CSV: {csv_file}")
    
    return json_file, csv_file

def filter_hot_leads(leads):
    """
    Filter leads with high MCA potential
    """
    hot_leads = []
    
    for lead in leads:
        score = 0
        reasons = []
        
        # Review count indicates established business
        if lead["review_count"] > 30:
            score += 2
            reasons.append("Established (30+ reviews)")
        elif lead["review_count"] > 10:
            score += 1
            reasons.append("Growing (10+ reviews)")
        
        # Funding signals detected
        if lead["funding_signals"] != "None detected":
            score += 2
            reasons.append(f"Funding signals: {lead['funding_signals']}")
        
        # Has website (more legitimate)
        if lead["website"] != "N/A":
            score += 1
            reasons.append("Has website")
        
        # High rating (good business)
        if lead["rating"] >= 4.0:
            score += 1
            reasons.append("High rating")
        
        if score >= 3:  # Hot lead threshold
            lead["hot_score"] = score
            lead["hot_reasons"] = "; ".join(reasons)
            hot_leads.append(lead)
    
    # Sort by hot score
    hot_leads.sort(key=lambda x: x["hot_score"], reverse=True)
    
    return hot_leads

if __name__ == "__main__":
    print("\n" + "="*70)
    print("🚀 GOOGLE MAPS LEAD EXTRACTOR")
    print("   For American Backbone MCA Business")
    print("="*70)
    
    # Quick mode - just Des Moines for testing
    test_locations = ["Des Moines, IA"]
    
    # Full mode - all Iowa cities
    # test_locations = IOWA_LOCATIONS
    
    print(f"\n📍 Running extraction for: {', '.join(test_locations)}")
    print("🏢 Industries: Box Truck, Roofing, Motels")
    
    # Run extraction
    leads = run_full_extraction(
        locations=test_locations,
        industries=["box_truck", "roofing", "motels"],
        max_per_search=30  # Adjust based on needs
    )
    
    if leads:
        # Save all leads
        json_file, csv_file = save_results(leads)
        
        # Filter hot leads
        hot_leads = filter_hot_leads(leads)
        
        print("\n" + "="*70)
        print("📊 EXTRACTION SUMMARY")
        print("="*70)
        print(f"✅ Total leads extracted: {len(leads)}")
        print(f"🔥 Hot leads (score 3+): {len(hot_leads)}")
        
        if hot_leads:
            print(f"\n🎯 TOP 10 HOT LEADS:")
            print("="*70)
            for i, lead in enumerate(hot_leads[:10], 1):
                print(f"\n{i}. {lead['business_name']}")
                print(f"   📍 {lead['address']}")
                print(f"   📞 {lead['phone']}")
                print(f"   🌐 {lead['website']}")
                print(f"   ⭐ Rating: {lead['rating']} ({lead['review_count']} reviews)")
                print(f"   💰 Revenue: {lead['revenue_indicator']}")
                print(f"   🔥 Score: {lead['hot_score']}/6")
                print(f"   📝 {lead['hot_reasons']}")
        
        print(f"\n💾 Files saved:")
        print(f"   📄 {json_file}")
        print(f"   📊 {csv_file}")
        
        print("\n" + "="*70)
        print("🚀 READY FOR OUTREACH")
        print("="*70)
        print("Next steps:")
        print("1. Review hot leads CSV")
        print("2. Use Email Finder tool to get contact emails")
        print("3. Import to CRM")
        print("4. Start calling!")
        
    else:
        print("\n❌ No leads extracted. Check errors above.")
