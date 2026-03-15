#!/usr/bin/env python3
"""
memory_consolidation.py - Smart daily memory consolidation
Extracts key learnings from daily notes and updates long-term memory
"""

import os
import sys
import re
import shutil
from datetime import datetime, timedelta
from pathlib import Path

WORKSPACE = Path("/root/.openclaw/workspace")
MEMORY_DIR = WORKSPACE / "memory"
DAILY_DIR = MEMORY_DIR / "daily"
ARCHIVE_DIR = MEMORY_DIR / "archives" / "daily"
PROJECTS_DIR = MEMORY_DIR / "projects"
AREAS_DIR = MEMORY_DIR / "areas"

def ensure_dirs():
    """Create necessary directories."""
    for d in [DAILY_DIR, ARCHIVE_DIR, PROJECTS_DIR, AREAS_DIR]:
        d.mkdir(parents=True, exist_ok=True)

def get_today_file():
    """Get today's daily note file."""
    today = datetime.now().strftime("%Y-%m-%d")
    filepath = DAILY_DIR / f"{today}.md"
    return filepath if filepath.exists() else None

def extract_key_facts(content):
    """Extract key facts from daily note content."""
    facts = []
    
    # Look for decision patterns
    decision_patterns = [
        r'(?i)(decided|decision):?\s*(.+?)(?:\n|$)',
        r'(?i)(agreed|agreement):?\s*(.+?)(?:\n|$)',
        r'(?i)(concluded|conclusion):?\s*(.+?)(?:\n|$)',
    ]
    
    for pattern in decision_patterns:
        matches = re.findall(pattern, content)
        for match in matches:
            facts.append(f"Decision: {match[1].strip()}")
    
    # Look for project mentions
    project_pattern = r'(?i)(project|working on|building):?\s+([\w\-]+)'
    matches = re.findall(project_pattern, content)
    for match in matches:
        facts.append(f"Project activity: {match[1].strip()}")
    
    return facts

def extract_lessons(content):
    """Extract lessons learned."""
    lessons = []
    
    # Look for lesson patterns
    lesson_patterns = [
        r'(?i)(learned|lesson):?\s*(.+?)(?:\n|$)',
        r'(?i)(realized|realization):?\s*(.+?)(?:\n|$)',
        r'(?i)(note to self):?\s*(.+?)(?:\n|$)',
    ]
    
    for pattern in lesson_patterns:
        matches = re.findall(pattern, content)
        for match in matches:
            lessons.append(match[1].strip())
    
    return lessons

def archive_old_notes(days=30):
    """Archive daily notes older than specified days."""
    ARCHIVE_DIR.mkdir(parents=True, exist_ok=True)
    
    cutoff = datetime.now() - timedelta(days=days)
    archived = 0
    
    if not DAILY_DIR.exists():
        return 0
    
    for file in DAILY_DIR.glob("*.md"):
        try:
            # Extract date from filename
            date_str = file.stem
            file_date = datetime.strptime(date_str, "%Y-%m-%d")
            
            if file_date < cutoff:
                shutil.move(str(file), str(ARCHIVE_DIR / file.name))
                archived += 1
        except (ValueError, OSError):
            continue
    
    return archived

def update_project_file(project_name, facts):
    """Update or create a project file with new facts."""
    project_file = PROJECTS_DIR / f"{project_name}.md"
    
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
    
    if project_file.exists():
        # Append to existing file
        with open(project_file, 'a') as f:
            f.write(f"\n\n## Update - {timestamp}\n")
            for fact in facts:
                f.write(f"- {fact}\n")
    else:
        # Create new project file
        with open(project_file, 'w') as f:
            f.write(f"# {project_name.replace('-', ' ').title()}\n\n")
            f.write(f"Created: {timestamp}\n\n")
            f.write("## Latest Activity\n")
            for fact in facts:
                f.write(f"- {fact}\n")
            f.write("\n## Notes\n\n")

def main():
    """Main consolidation routine."""
    print("🔔 Nightly Memory Consolidation")
    print("=" * 50)
    
    ensure_dirs()
    
    # Check for today's daily note
    today_file = get_today_file()
    
    if not today_file:
        print("📝 No daily note found for today")
        print("   Create one during conversations to capture learnings")
    else:
        print(f"📄 Found daily note: {today_file.name}")
        
        with open(today_file, 'r') as f:
            content = f.read()
        
        # Extract information
        facts = extract_key_facts(content)
        lessons = extract_lessons(content)
        
        print(f"   Found {len(facts)} key facts")
        print(f"   Found {len(lessons)} lessons")
        
        # If there are project-related facts, suggest project file updates
        project_facts = [f for f in facts if "Project activity:" in f]
        if project_facts:
            print("\n🏗️  Project updates suggested:")
            for pf in project_facts:
                print(f"   - {pf}")
        
        if lessons:
            print("\n📚 Lessons learned:")
            for lesson in lessons[:5]:  # Show first 5
                print(f"   - {lesson}")
    
    # Archive old notes
    print("\n📦 Archiving old notes...")
    archived = archive_old_notes(days=30)
    if archived > 0:
        print(f"   Archived {archived} notes >30 days old")
    else:
        print("   No old notes to archive")
    
    # Summary
    print("\n" + "=" * 50)
    print("✅ Consolidation complete!")
    print(f"   Active projects: {len(list(PROJECTS_DIR.glob('*.md')))}")
    print(f"   Daily notes: {len(list(DAILY_DIR.glob('*.md')))}")
    print(f"   Archived notes: {len(list(ARCHIVE_DIR.glob('*.md')))}")
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
