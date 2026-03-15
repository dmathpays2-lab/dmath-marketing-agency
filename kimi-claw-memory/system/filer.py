#!/usr/bin/env python3
"""
Smart Filer - Auto-routes files to correct folders
Usage: python3 system/filer.py <command> [args]
"""
import os
import sys
import json
import shutil
from pathlib import Path
from datetime import datetime

WORKSPACE = Path("/root/.openclaw/workspace")
INDEX_FILE = WORKSPACE / "system" / "file_index.json"

# Routing rules: keywords -> destination
ROUTES = {
    "more-mito": {
        "keywords": ["more mito", "mormito", "mito", "health", "wellness", "life is precious"],
        "dest": "businesses/more-mito/",
        "repo": "more-mito-health"
    },
    "mca": {
        "keywords": ["mca", "merchant cash", "david allen capital", "dac", "mom and pop", "business funding", "iso"],
        "dest": "businesses/mca/",
        "repo": "american-backbone-mca"
    },
    "think-energy": {
        "keywords": ["think energy", "think+", "electricity", "solar", "energy advisor", "deregulated"],
        "dest": "businesses/think-energy/",
        "repo": "think-energy-business"
    },
    "momentum-tech": {
        "keywords": ["momentum tech", "momentumtech", "ai tools", "build ai", "course creator"],
        "dest": "businesses/momentum-tech/",
        "repo": None  # No repo yet
    },
    "dmath-marketing": {
        "keywords": ["d math", "dmath", "agency", "portfolio", "client", "web design"],
        "dest": "businesses/dmath-marketing/",
        "repo": "dmath-marketing-agency"
    },
    "memory": {
        "keywords": ["memory", "remember", "identity", "soul", "user profile"],
        "dest": "system/identity/",
        "repo": "dmath-marketing-agency/kimi-claw-memory"
    },
    "research": {
        "keywords": ["research", "study", "analysis", "report"],
        "dest": "shared/research/",
        "repo": "dmath-marketing-agency/kimi-claw-memory"
    }
}

def classify_file(filepath, content_hint=""):
    """Determine where a file should go"""
    filepath = str(filepath).lower()
    content_hint = content_hint.lower()
    
    for category, config in ROUTES.items():
        for keyword in config["keywords"]:
            if keyword in filepath or keyword in content_hint:
                return config["dest"], config["repo"], category
    
    return None, None, None

def add_to_index(filepath, category, tags=None):
    """Add file to search index"""
    index = {}
    if INDEX_FILE.exists():
        index = json.loads(INDEX_FILE.read_text())
    
    rel_path = str(filepath).replace(str(WORKSPACE) + "/", "")
    index[rel_path] = {
        "path": rel_path,
        "category": category,
        "tags": tags or [],
        "added": datetime.now().isoformat(),
        "type": filepath.suffix if hasattr(filepath, 'suffix') else "unknown"
    }
    
    INDEX_FILE.write_text(json.dumps(index, indent=2))

def route_file(source_path, content_hint=""):
    """Route a file to its proper destination"""
    source = Path(source_path)
    if not source.exists():
        print(f"❌ File not found: {source}")
        return False
    
    dest_folder, repo, category = classify_file(source.name, content_hint)
    
    if not dest_folder:
        # Default to inbox for manual sorting
        dest_folder = "inbox/"
        category = "unclassified"
        repo = None
    
    dest_path = WORKSPACE / dest_folder / source.name
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Copy file
    shutil.copy2(source, dest_path)
    print(f"✅ {source.name} → {dest_folder}")
    
    # Add to index
    add_to_index(dest_path, category)
    
    # Suggest sync
    if repo:
        print(f"   📤 Sync to: {repo}")
    
    return True

def search_files(query):
    """Search indexed files"""
    if not INDEX_FILE.exists():
        print("No index yet. Run 'index' command first.")
        return
    
    index = json.loads(INDEX_FILE.read_text())
    query = query.lower()
    
    results = []
    for path, meta in index.items():
        if (query in path.lower() or 
            query in meta.get("category", "").lower() or
            any(query in tag.lower() for tag in meta.get("tags", []))):
            results.append((path, meta))
    
    print(f"\n🔍 Found {len(results)} results for '{query}':\n")
    for path, meta in results[:20]:
        print(f"  📄 {path}")
        print(f"     Category: {meta.get('category', 'unknown')}")
        print(f"     Added: {meta.get('added', 'unknown')[:10]}")
        print()

def list_by_category(category):
    """List files in a category"""
    if not INDEX_FILE.exists():
        print("No index yet.")
        return
    
    index = json.loads(INDEX_FILE.read_text())
    results = [(p, m) for p, m in index.items() if m.get("category") == category]
    
    print(f"\n📁 {category}: {len(results)} files\n")
    for path, meta in results:
        print(f"  {path}")

def show_tree():
    """Show current organization"""
    print("\n📂 Current File Organization:\n")
    
    for folder in ["businesses", "projects", "system", "shared", "memory"]:
        path = WORKSPACE / folder
        if path.exists():
            count = len(list(path.rglob("*")))
            print(f"  📁 {folder}/ ({count} items)")
            # Show subdirs
            for subdir in sorted(path.iterdir()):
                if subdir.is_dir():
                    subcount = len(list(subdir.rglob("*")))
                    print(f"     └─ {subdir.name}/ ({subcount} items)")

def main():
    if len(sys.argv) < 2:
        print("Usage: filer.py [route <file> | search <query> | list <category> | tree | index]")
        return
    
    cmd = sys.argv[1]
    
    if cmd == "route" and len(sys.argv) > 2:
        hint = sys.argv[3] if len(sys.argv) > 3 else ""
        route_file(sys.argv[2], hint)
    
    elif cmd == "search" and len(sys.argv) > 2:
        search_files(sys.argv[2])
    
    elif cmd == "list" and len(sys.argv) > 2:
        list_by_category(sys.argv[2])
    
    elif cmd == "tree":
        show_tree()
    
    elif cmd == "index":
        # Rebuild index from existing files
        print("🔄 Rebuilding index...")
        count = 0
        for root, dirs, files in os.walk(WORKSPACE):
            # Skip node_modules, .git, etc
            dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules']]
            
            for file in files:
                filepath = Path(root) / file
                rel = str(filepath.relative_to(WORKSPACE))
                
                # Detect category from path
                category = "other"
                if "more-mito" in rel:
                    category = "more-mito"
                elif "mca" in rel or "american-backbone" in rel:
                    category = "mca"
                elif "think-energy" in rel:
                    category = "think-energy"
                elif "dmath-marketing" in rel:
                    category = "dmath-marketing"
                elif "memory" in rel:
                    category = "memory"
                
                add_to_index(filepath, category)
                count += 1
        
        print(f"✅ Indexed {count} files")
    
    else:
        print("Unknown command")

if __name__ == "__main__":
    main()
