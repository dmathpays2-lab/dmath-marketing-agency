#!/usr/bin/env python3
"""
Key Redaction System - Clean ALL exposed keys from repository
"""

import re
import os
from pathlib import Path

WORKSPACE = Path("/root/.openclaw/workspace")

# Key patterns with their replacements
KEY_PATTERNS = [
    (r'ghp_[a-zA-Z0-9]{36}', '[REDACTED_GITHUB_TOKEN]'),
    (r'ghp_[a-zA-Z0-9]{40}', '[REDACTED_GITHUB_TOKEN]'),
    (r'sk-[a-zA-Z0-9]{48}', '[REDACTED_OPENAI_KEY]'),
    (r'vcp_[a-zA-Z0-9_]{50,}', '[REDACTED_VERCEL_TOKEN]'),
    (r'nfp_[a-zA-Z0-9]{40,}', '[REDACTED_NETLIFY_TOKEN]'),
    (r'BSAp[a-zA-Z0-9_]{30,}', '[REDACTED_BRAVE_KEY]'),
    (r'apify_api_[a-zA-Z0-9]{30,}', '[REDACTED_APIFY_TOKEN]'),
    (r'AIza[a-zA-Z0-9_-]{35}', '[REDACTED_GEMINI_KEY]'),
]

# Files/directories to skip
SKIP_PATTERNS = [
    '.vault',
    'node_modules',
    '__pycache__',
    '.git',
    '.pyc',
    'vault_manager.py',
    'setup_vault.sh',
]

def should_skip(path):
    """Check if path should be skipped"""
    path_str = str(path)
    for pattern in SKIP_PATTERNS:
        if pattern in path_str:
            return True
    return False

def redact_file(file_path):
    """Redact keys from a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except Exception as e:
        return 0
    
    original = content
    total_replacements = 0
    
    for pattern, replacement in KEY_PATTERNS:
        content, count = re.subn(pattern, replacement, content)
        total_replacements += count
    
    if total_replacements > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ {file_path.relative_to(WORKSPACE)}: {total_replacements} keys redacted")
    
    return total_replacements

def scan_and_redact():
    """Scan workspace and redact all exposed keys"""
    print("🔍 Scanning for exposed keys...")
    print("=" * 60)
    
    total_files = 0
    total_keys = 0
    
    # File extensions to check
    extensions = ['.md', '.py', '.sh', '.json', '.txt', '.yaml', '.yml', '.js', '.ts']
    
    for ext in extensions:
        for file_path in WORKSPACE.rglob(f'*{ext}'):
            if should_skip(file_path):
                continue
            
            count = redact_file(file_path)
            if count > 0:
                total_files += 1
                total_keys += count
    
    print("=" * 60)
    print(f"✅ Redaction complete: {total_keys} keys redacted in {total_files} files")
    
    return total_keys

if __name__ == '__main__':
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == '--dry-run':
        print("DRY RUN MODE - No changes will be made")
        # Would implement dry run here
    else:
        confirm = input("⚠️  This will redact keys from ALL files. Continue? [y/N]: ")
        if confirm.lower() == 'y':
            scan_and_redact()
        else:
            print("Aborted.")