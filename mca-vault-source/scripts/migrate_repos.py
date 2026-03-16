#!/usr/bin/env python3
"""
Migrate files from mca-vault to organized business repositories
Uses GitHub API to copy and organize files
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

# File categorization rules
FILE_CATEGORIES = {
    "american-backbone-mca": [
        "100_AGENT_THEORY.md",
        "20_AGENT_SWARM.md",
        "COMMAND_CENTER.md",
        "FEW_HOURS_ANALYSIS.md",
        "HOT_LEAD_MODE.md",
        "INTEGRATION_COMPLETE.md",
        "INTEGRATION_PLAN.md",
        "LEAD_HUNTER_V2.md",
        "RAPID_DEPLOYMENT_PLAN.md",
        "SYSTEM_SUMMARY.md",
        "TOP_10_MCA_TOOLS_RESEARCH.md",
        "TONIGHT_LEAD_GEN_PLAN.md",
        "orchestrator.py",
        "mcp-config.json",
        "README.md"
    ],
    "think-energy-business": [
        # Energy-specific files (none yet in mca-vault)
    ],
    "more-mito-health": [
        # Health-specific files (none yet in mca-vault)
    ],
    "dmath-marketing-agency": [
        "AI_RESUME_GUIDE.md",
        "AI_SUPER_TEAM_RESEARCH.md",
        "ALEX_FINN_IMPLEMENTATION.md",
        "nick-ponte-analysis.md",
        "revenue-maximization-strategy.md",
        "ai-agency-business-model.md",
        "kimi-claw-automation-plan.md",
        "kimi-claw-business-plan.md"
    ]
}

def get_file_from_repo(repo, file_path):
    """Get file content from a repository"""
    response = requests.get(
        f"{GITHUB_API}/repos/dmathpays2-lab/{repo}/contents/{file_path}",
        headers=HEADERS
    )
    
    if response.status_code == 200:
        data = response.json()
        content = base64.b64decode(data["content"]).decode('utf-8')
        return content, data["sha"]
    else:
        print(f"❌ Error getting {file_path}: {response.status_code}")
        return None, None

def create_or_update_file(repo, file_path, content, message):
    """Create or update a file in a repository"""
    # Check if file exists
    response = requests.get(
        f"{GITHUB_API}/repos/dmathpays2-lab/{repo}/contents/{file_path}",
        headers=HEADERS
    )
    
    # Encode content
    content_encoded = base64.b64encode(content.encode()).decode()
    
    data = {
        "message": message,
        "content": content_encoded
    }
    
    if response.status_code == 200:
        # File exists, update it
        existing_sha = response.json()["sha"]
        data["sha"] = existing_sha
        print(f"   📝 Updating: {file_path}")
    else:
        print(f"   ➕ Creating: {file_path}")
    
    response = requests.put(
        f"{GITHUB_API}/repos/dmathpays2-lab/{repo}/contents/{file_path}",
        headers=HEADERS,
        json=data
    )
    
    if response.status_code in [200, 201]:
        return True
    else:
        print(f"   ❌ Error: {response.status_code} - {response.text[:100]}")
        return False

def copy_directory(source_repo, target_repo, source_dir, target_dir=""):
    """Copy all files from a directory"""
    print(f"\n📁 Copying directory: {source_dir}")
    
    response = requests.get(
        f"{GITHUB_API}/repos/dmathpays2-lab/{source_repo}/contents/{source_dir}",
        headers=HEADERS
    )
    
    if response.status_code != 200:
        print(f"❌ Error listing directory: {response.status_code}")
        return
    
    items = response.json()
    
    for item in items:
        if item["type"] == "file":
            file_name = item["name"]
            source_path = f"{source_dir}/{file_name}" if source_dir else file_name
            target_path = f"{target_dir}/{file_name}" if target_dir else file_name
            
            # Get content
            content, sha = get_file_from_repo(source_repo, source_path)
            if content:
                # Create in target
                message = f"Migrate {file_name} from mca-vault"
                create_or_update_file(target_repo, target_path, content, message)
        
        elif item["type"] == "dir":
            # Recursively copy subdirectory
            subdir = item["name"]
            new_source = f"{source_dir}/{subdir}" if source_dir else subdir
            new_target = f"{target_dir}/{subdir}" if target_dir else subdir
            copy_directory(source_repo, target_repo, new_source, new_target)

def migrate_files():
    """Main migration function"""
    print("="*70)
    print("🚀 MIGRATING FILES FROM mca-vault TO ORGANIZED REPOS")
    print("="*70)
    
    source_repo = "mca-vault"
    
    # 1. Copy MCA files
    print("\n" + "="*70)
    print("🇺🇸 MIGRATING TO: american-backbone-mca")
    print("="*70)
    
    mca_files = [
        "100_AGENT_THEORY.md",
        "20_AGENT_SWARM.md",
        "COMMAND_CENTER.md",
        "FEW_HOURS_ANALYSIS.md",
        "HOT_LEAD_MODE.md",
        "INTEGRATION_COMPLETE.md",
        "INTEGRATION_PLAN.md",
        "LEAD_HUNTER_V2.md",
        "RAPID_DEPLOYMENT_PLAN.md",
        "SYSTEM_SUMMARY.md",
        "TOP_10_MCA_TOOLS_RESEARCH.md",
        "TONIGHT_LEAD_GEN_PLAN.md",
        "orchestrator.py",
        "mcp-config.json",
        "swarm_status.txt"
    ]
    
    for file in mca_files:
        content, sha = get_file_from_repo(source_repo, file)
        if content:
            create_or_update_file("american-backbone-mca", file, content, f"Migrate {file}")
    
    # Copy directories
    copy_directory(source_repo, "american-backbone-mca", "agents", "agents")
    copy_directory(source_repo, "american-backbone-mca", "swarm_deployment", "swarm_deployment")
    
    # 2. Copy D Math Marketing files
    print("\n" + "="*70)
    print("🚀 MIGRATING TO: dmath-marketing-agency")
    print("="*70)
    
    marketing_files = [
        "AI_RESUME_GUIDE.md",
        "AI_SUPER_TEAM_RESEARCH.md",
        "ALEX_FINN_IMPLEMENTATION.md",
        "nick-ponte-analysis.md",
        "revenue-maximization-strategy.md",
        "ai-agency-business-model.md",
        "kimi-claw-automation-plan.md",
        "kimi-claw-business-plan.md"
    ]
    
    for file in marketing_files:
        content, sha = get_file_from_repo(source_repo, file)
        if content:
            create_or_update_file("dmath-marketing-agency", file, content, f"Migrate {file}")
    
    # Copy codemojo-clone if it exists
    try:
        copy_directory(source_repo, "dmath-marketing-agency", "codemojo-clone", "portfolio/codemojo-clone")
    except:
        print("   ⚠️ codemojo-clone directory not found or error copying")
    
    # 3. Copy core memory files to all repos (for backup)
    print("\n" + "="*70)
    print("💾 COPYING CORE FILES TO ALL REPOS (Backup)")
    print("="*70)
    
    core_files = {
        "AGENTS.md": "docs/AGENTS.md",
        "BOOTSTRAP.md": "docs/BOOTSTRAP.md",
        "IDENTITY.md": "docs/IDENTITY.md",
        "MEMORY.md": "docs/MEMORY.md",
        "SOUL.md": "docs/SOUL.md",
        "USER.md": "docs/USER.md"
    }
    
    for source_file, target_path in core_files.items():
        content, sha = get_file_from_repo(source_repo, source_file)
        if content:
            for repo in ["american-backbone-mca", "think-energy-business", "more-mito-health", "dmath-marketing-agency"]:
                create_or_update_file(repo, target_path, content, f"Add core context: {source_file}")
    
    # 4. Copy memory directory
    print("\n" + "="*70)
    print("📚 COPYING MEMORY DIRECTORY")
    print("="*70)
    
    for repo in ["american-backbone-mca", "dmath-marketing-agency"]:
        try:
            copy_directory(source_repo, repo, "memory", "docs/memory")
        except:
            print(f"   ⚠️ Error copying memory to {repo}")
    
    # Summary
    print("\n" + "="*70)
    print("✅ MIGRATION COMPLETE!")
    print("="*70)
    print("\n📊 Files migrated:")
    print("\n🇺🇸 american-backbone-mca:")
    print("   - All MCA agent files")
    print("   - Lead generation docs")
    print("   - System architecture")
    print("   - Agents/ directory")
    
    print("\n🚀 dmath-marketing-agency:")
    print("   - Agency business docs")
    print("   - Research files")
    print("   - Portfolio projects")
    
    print("\n💾 All repositories:")
    print("   - Core memory files (docs/)")
    print("   - Context for AI assistant")
    
    print("\n⚡ think-energy-business & 💚 more-mito-health:")
    print("   - Ready for new content")
    print("   - Core context added")
    
    print("\n" + "="*70)
    print("🔗 REPOSITORY LINKS:")
    print("="*70)
    print("1. https://github.com/dmathpays2-lab/american-backbone-mca")
    print("2. https://github.com/dmathpays2-lab/think-energy-business")
    print("3. https://github.com/dmathpays2-lab/more-mito-health")
    print("4. https://github.com/dmathpays2-lab/dmath-marketing-agency")
    print("\n5. https://github.com/dmathpays2-lab/mca-vault (original)")

if __name__ == "__main__":
    migrate_files()
