#!/usr/bin/env python3
"""
Vault Key Loader - Python Module
Loads API keys from .vault/keys/ directory

Usage:
    from vault import load_key, get_key
    
    github_token = load_key('github')
    os.environ['GITHUB_TOKEN'] = get_key('github')
"""

import base64
import os
from pathlib import Path

VAULT_DIR = Path(__file__).parent / '.vault' / 'keys'

def load_key(key_name: str) -> str:
    """
    Load and decode a key from the vault.
    
    Args:
        key_name: Name of the key file (e.g., 'github', 'vercel')
    
    Returns:
        Decoded API key string
    
    Raises:
        FileNotFoundError: If key doesn't exist
    """
    key_file = VAULT_DIR / key_name
    
    if not key_file.exists():
        raise FileNotFoundError(f"Key '{key_name}' not found in vault")
    
    encoded = key_file.read_text().strip()
    return base64.b64decode(encoded).decode('utf-8')

def get_key(key_name: str, env_var: str = None) -> str:
    """
    Get a key and optionally set it as environment variable.
    
    Args:
        key_name: Name of the key file
        env_var: Environment variable name to set (optional)
    
    Returns:
        Decoded API key string
    """
    value = load_key(key_name)
    
    if env_var:
        os.environ[env_var] = value
    
    return value

def list_keys() -> list:
    """List all available keys in the vault."""
    if not VAULT_DIR.exists():
        return []
    return [f.name for f in VAULT_DIR.iterdir() if f.is_file()]

def export_all():
    """Export all keys as environment variables."""
    mapping = {
        'github': 'GITHUB_TOKEN',
        'vercel': 'VERCEL_TOKEN',
        'brave': 'BRAVE_API_KEY',
        'netlify': 'NETLIFY_TOKEN',
        'gemini': 'GEMINI_API_KEY'
    }
    
    for key_name, env_var in mapping.items():
        try:
            os.environ[env_var] = load_key(key_name)
            print(f"✓ Exported {env_var}")
        except FileNotFoundError:
            print(f"✗ Key '{key_name}' not found")

if __name__ == '__main__':
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python vault.py [command] [args]")
        print("")
        print("Commands:")
        print("  load <key>     - Load and display a key")
        print("  export <key>   - Export key as env var")
        print("  list           - List available keys")
        print("  export-all     - Export all keys")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == 'load' and len(sys.argv) > 2:
        print(load_key(sys.argv[2]))
    elif command == 'export' and len(sys.argv) > 2:
        key_name = sys.argv[2]
        env_var = sys.argv[3] if len(sys.argv) > 3 else f"{key_name.upper()}_TOKEN"
        get_key(key_name, env_var)
        print(f"Exported {env_var}")
    elif command == 'list':
        for key in list_keys():
            print(f"  - {key}")
    elif command == 'export-all':
        export_all()
    else:
        print("Unknown command")