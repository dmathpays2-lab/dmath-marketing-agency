#!/usr/bin/env python3
"""
GitHub Memory Manager - Incremental Backup System
Prevents timeouts by batching operations into <30 second chunks
"""
import base64
import os
import sys
import json
import subprocess
import time
from pathlib import Path

GITHUB_USER = "dmathpays2-lab"

# Load token from vault
WORKSPACE = Path("/root/.openclaw/workspace")
VAULT_KEY_FILE = WORKSPACE / ".vault" / "keys" / "github"

def load_token():
    """Load GitHub token from vault"""
    if VAULT_KEY_FILE.exists():
        encoded = VAULT_KEY_FILE.read_text().strip()
        return base64.b64decode(encoded).decode('utf-8')
    # Fallback to environment
    return os.environ.get('GITHUB_TOKEN', '')

TOKEN = load_token()
MEMORY_DIR = WORKSPACE / "github-memory"
STATE_FILE = WORKSPACE / ".github_backup_state.json"

def api_call(endpoint):
    """Make GitHub API call with timeout protection"""
    url = f"https://api.github.com{endpoint}"
    cmd = [
        "curl", "-s", "-m", "25",  # 25 second max per call
        "-H", f"Authorization: token {TOKEN}",
        "-H", "Accept: application/vnd.github.v3+json",
        url
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    if result.returncode != 0:
        return None
    try:
        return json.loads(result.stdout)
    except:
        return None

def get_repos():
    """List all repos (quick, <5 seconds)"""
    data = api_call(f"/users/{GITHUB_USER}/repos?per_page=100")
    return data if data else []

def get_tree(owner, repo, sha="HEAD", recursive=True):
    """Get file tree with pagination (limited to prevent timeout)"""
    endpoint = f"/repos/{owner}/{repo}/git/trees/{sha}?recursive={'1' if recursive else '0'}"
    return api_call(endpoint)

def backup_repo(repo_name, batch_size=100):
    """Backup one repo in batches"""
    repo_dir = MEMORY_DIR / repo_name
    repo_dir.mkdir(parents=True, exist_ok=True)
    
    print(f"📦 Backing up: {repo_name}")
    
    # Get tree
    tree_data = get_tree(GITHUB_USER, repo_name)
    if not tree_data or "tree" not in tree_data:
        print(f"  ❌ Failed to get tree for {repo_name}")
        return False
    
    files = [item for item in tree_data["tree"] if item["type"] == "blob"]
    print(f"  📄 Found {len(files)} files")
    
    # Load state to resume
    state = json.loads(STATE_FILE.read_text()) if STATE_FILE.exists() else {}
    key = f"{repo_name}_cursor"
    cursor = state.get(key, 0)
    
    # Process batch
    batch = files[cursor:cursor + batch_size]
    for i, file in enumerate(batch):
        file_path = repo_dir / file["path"]
        file_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Only download if new/changed (simple check: exists)
        if not file_path.exists():
            # Get content (skip binary files for memory efficiency)
            if any(file["path"].endswith(ext) for ext in ['.py', '.md', '.txt', '.json', '.js', '.html', '.css', '.yml', '.yaml']):
                content_data = api_call(f"/repos/{GITHUB_USER}/{repo_name}/contents/{file['path']}")
                if content_data and "content" in content_data:
                    import base64
                    try:
                        content = base64.b64decode(content_data["content"]).decode('utf-8', errors='ignore')
                        file_path.write_text(content, encoding='utf-8')
                    except:
                        pass
            else:
                # Just record metadata for binary files
                file_path.with_suffix(file_path.suffix + '.meta').write_text(
                    json.dumps({"size": file.get("size", 0), "sha": file.get("sha", "")}, indent=2)
                )
        
        if (i + 1) % 10 == 0:
            print(f"  ⏳ {i+1}/{len(batch)} in this batch...")
    
    # Save state
    new_cursor = cursor + len(batch)
    state[key] = new_cursor
    STATE_FILE.write_text(json.dumps(state, indent=2))
    
    remaining = len(files) - new_cursor
    if remaining > 0:
        print(f"  ⏸️  Paused at {new_cursor}/{len(files)}. {remaining} remaining.")
        print(f"  🔄 Run again to continue.")
    else:
        print(f"  ✅ Complete! {len(files)} files backed up.")
        state[key] = 0  # Reset for next full backup
        STATE_FILE.write_text(json.dumps(state, indent=2))
    
    return remaining == 0

def status():
    """Show backup status"""
    repos = get_repos()
    state = json.loads(STATE_FILE.read_text()) if STATE_FILE.exists() else {}
    
    print("📊 GitHub Memory Backup Status\n")
    for repo in repos:
        name = repo["name"]
        cursor = state.get(f"{name}_cursor", 0)
        total = repo.get("size", 0)  # Approximate
        
        repo_dir = MEMORY_DIR / name
        if repo_dir.exists():
            local_files = len(list(repo_dir.rglob("*")))
            status_icon = "✅" if cursor == 0 else "⏳"
            print(f"{status_icon} {name}: ~{local_files} files cached")
        else:
            print(f"❌ {name}: Not backed up")
    
    print(f"\n💾 Storage: {MEMORY_DIR}")
    print(f"📁 State: {STATE_FILE}")

def main():
    if len(sys.argv) < 2:
        print("Usage: github_memory.py [index|backup REPO|backup-all|status]")
        return
    
    cmd = sys.argv[1]
    
    if cmd == "index":
        repos = get_repos()
        print(f"Found {len(repos)} repositories:")
        for r in repos:
            print(f"  - {r['name']} ({r['size']}KB)")
    
    elif cmd == "backup" and len(sys.argv) > 2:
        backup_repo(sys.argv[2])
    
    elif cmd == "backup-all":
        repos = get_repos()
        for repo in repos:
            name = repo["name"]
            repo_dir = MEMORY_DIR / name
            if not repo_dir.exists():
                print(f"\n🆕 New repo found: {name}")
                backup_repo(name, batch_size=50)  # Small batches
            else:
                # Check if incomplete
                state = json.loads(STATE_FILE.read_text()) if STATE_FILE.exists() else {}
                if state.get(f"{name}_cursor", 0) > 0:
                    print(f"\n⏳ Resuming: {name}")
                    backup_repo(name, batch_size=50)
                else:
                    print(f"✅ {name} already complete")
    
    elif cmd == "status":
        status()
    
    else:
        print("Unknown command")

if __name__ == "__main__":
    main()
