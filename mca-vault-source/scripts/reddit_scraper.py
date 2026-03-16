#!/usr/bin/env python3
"""
Reddit Scraper for Kimi Claw Discord Research
Uses Apify to scrape Reddit posts about Discord integration
"""

import requests
import json
import time
from datetime import datetime

APIFY_TOKEN = "apify_api_HbUkbiKl8g3ldJJXawiQ2fC6sFeWDF0nSD6F"
APIFY_BASE_URL = "https://api.apify.com/v2"

def run_reddit_scraper():
    """
    Run Reddit scraper for specific search terms
    """
    print("=" * 70)
    print("REDDIT SCRAPER - Kimi Claw Discord Research")
    print("=" * 70)
    
    # Apify Reddit Scraper actor: macrocosmos/reddit-scraper
    actor_input = {
        "searches": [
            "kimi claw discord",
            "allegretto discord workaround", 
            "openclaw discord integration",
            "kimi $39 subscription discord",
            "kimi claw byoc bridge discord"
        ],
        "sort": "relevance",
        "time": "all",
        "maxItems": 100,
        "includeComments": True
    }
    
    print("\n🔍 Search queries:")
    for q in actor_input["searches"]:
        print(f"   - {q}")
    print(f"\n📡 Starting Apify actor (macrocosmos/reddit-scraper)...")
    
    # Start the actor run
    response = requests.post(
        f"{APIFY_BASE_URL}/acts/macrocosmos~reddit-scraper/runs?token={APIFY_TOKEN}",
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
    max_wait = 180  # 3 minutes
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
    print("\n📥 Fetching results...")
    results_response = requests.get(
        f"{APIFY_BASE_URL}/datasets/{dataset_id}/items?token={APIFY_TOKEN}"
    )
    
    if results_response.status_code != 200:
        print(f"❌ Error fetching results: {results_response.status_code}")
        return None
    
    posts = results_response.json()
    print(f"✅ Retrieved {len(posts)} posts")
    
    return posts

def analyze_posts(posts):
    """
    Analyze scraped posts for relevant Discord/Kimi Claw discussions
    """
    print("\n" + "=" * 70)
    print("ANALYSIS RESULTS")
    print("=" * 70)
    
    if not posts:
        print("❌ No posts found")
        return []
    
    relevant_posts = []
    
    keywords = [
        "discord", "kimi claw", "allegretto", "$39", "subscription",
        "integration", "workaround", "openclaw", "connection", "byoc", "bridge"
    ]
    
    for post in posts:
        title = post.get("title", "").lower()
        body = post.get("body", "").lower()
        text = f"{title} {body}"
        
        # Check if post contains relevant keywords
        relevance_score = sum(1 for kw in keywords if kw in text)
        
        if relevance_score >= 2:  # At least 2 relevant keywords
            relevant_posts.append({
                "title": post.get("title", "N/A"),
                "subreddit": post.get("subreddit", "N/A"),
                "author": post.get("author", "N/A"),
                "url": post.get("url", post.get("permalink", "N/A")),
                "body": post.get("body", "")[:500] + "..." if len(post.get("body", "")) > 500 else post.get("body", ""),
                "score": post.get("score", 0),
                "comments": post.get("numComments", 0),
                "relevance": relevance_score,
                "created": post.get("created", "N/A")
            })
    
    # Sort by relevance score
    relevant_posts.sort(key=lambda x: x["relevance"], reverse=True)
    
    print(f"\n📊 Total posts scraped: {len(posts)}")
    print(f"🎯 Relevant posts found: {len(relevant_posts)}")
    print()
    
    if relevant_posts:
        print("=" * 70)
        print("TOP RELEVANT DISCUSSIONS:")
        print("=" * 70)
        
        for i, post in enumerate(relevant_posts[:10], 1):
            print(f"\n--- Post #{i} (Relevance: {post['relevance']}/11) ---")
            print(f"📌 Title: {post['title'][:100]}...")
            print(f"📍 Subreddit: r/{post['subreddit']}")
            print(f"👤 Author: u/{post['author']}")
            print(f"⬆️ Score: {post['score']} | 💬 Comments: {post['comments']}")
            print(f"🔗 URL: {post['url']}")
            if post['body'] and post['body'] != "...":
                print(f"📝 Preview: {post['body'][:200]}...")
            print("-" * 70)
    else:
        print("\n⚠️ No highly relevant posts found")
        print("\n📋 Showing all scraped posts (titles only):")
        for i, post in enumerate(posts[:20], 1):
            title = post.get('title', 'N/A')[:70]
            sub = post.get('subreddit', 'N/A')
            print(f"{i:2}. [{sub}] {title}...")
    
    # Save results
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_file = f"/root/.openclaw/workspace/reddit_scrape_{timestamp}.json"
    
    with open(output_file, 'w') as f:
        json.dump({
            "search_date": datetime.now().isoformat(),
            "search_queries": [
                "kimi claw discord",
                "allegretto discord workaround", 
                "openclaw discord integration",
                "kimi $39 subscription discord",
                "kimi claw byoc bridge discord"
            ],
            "total_posts": len(posts),
            "relevant_posts": len(relevant_posts),
            "all_posts": posts,
            "filtered_results": relevant_posts
        }, f, indent=2)
    
    print(f"\n💾 Results saved to: {output_file}")
    
    return relevant_posts

if __name__ == "__main__":
    print("\n🔧 Starting Reddit scraper using Apify...")
    print("   Actor: macrocosmos/reddit-scraper\n")
    
    # Run the scraper
    posts = run_reddit_scraper()
    
    if posts:
        results = analyze_posts(posts)
        
        print("\n" + "=" * 70)
        print("SUMMARY")
        print("=" * 70)
        print(f"✅ Successfully scraped {len(posts)} Reddit posts")
        print(f"🎯 Found {len(results)} relevant discussions")
        
        if results:
            print("\n📌 Top findings:")
            for i, r in enumerate(results[:5], 1):
                print(f"   {i}. [{r['subreddit']}] {r['title'][:60]}...")
        else:
            print("\n💡 No highly relevant posts found. Try:")
            print("   - Broadening search terms")
            print("   - Checking different subreddits")
            print("   - Searching Google/Discord communities instead")
    else:
        print("\n❌ Scraping failed")
        print("\n💡 Alternative: Manual search on Reddit:")
        print("   https://www.reddit.com/search/?q=kimi%20claw%20discord")
        print("   https://www.reddit.com/r/OpenClaw/search/?q=discord")
