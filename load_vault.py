#!/usr/bin/env python3
"""
Universal Vault Loader - Works with any bot, any shell
Simple, reliable, no dependencies beyond Python 3
"""

import base64
import os
import sys
from pathlib import Path

def load_vault_keys():
    """Load all vault keys and return as dictionary"""
    workspace = Path(__file__).parent
    vault_dir = workspace / '.vault' / 'keys'
    
    if not vault_dir.exists():
        print(f"❌ Vault not found at {vault_dir}", file=sys.stderr)
        return {}
    
    keys = {}
    for key_file in vault_dir.iterdir():
        if key_file.is_file():
            try:
                encoded = key_file.read_text().strip()
                # Decode: base64 -> reverse
                reversed_str = base64.b64decode(encoded).decode()
                decoded = reversed_str[::-1]
                
                # Store with consistent naming
                key_name = key_file.name.upper() + '_TOKEN'
                keys[key_name] = decoded
                
            except Exception as e:
                print(f"⚠️  Failed to decode {key_file.name}: {e}", file=sys.stderr)
    
    return keys

def export_to_env(keys=None):
    """Export keys to environment variables"""
    if keys is None:
        keys = load_vault_keys()
    
    for name, value in keys.items():
        os.environ[name] = value
        print(f"✅ Exported {name}")
    
    return keys

def print_shell_exports(keys=None):
    """Print export statements for shell sourcing"""
    if keys is None:
        keys = load_vault_keys()
    
    print("# Copy-paste these into your shell:")
    for name, value in keys.items():
        # Escape for shell safety
        escaped = value.replace("'", "'\\''")
        print(f"export {name}='{escaped}'")

def test_keys(keys=None):
    """Test that keys work"""
    if keys is None:
        keys = load_vault_keys()
    
    print("\n🧪 Testing keys...")
    
    # Test GitHub
    if 'GITHUB_TOKEN' in keys:
        import urllib.request
        import urllib.error
        try:
            req = urllib.request.Request(
                'https://api.github.com/user',
                headers={'Authorization': f'token {keys["GITHUB_TOKEN"]}'}
            )
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = resp.read().decode()
                if '"login"' in data:
                    print("✅ GitHub token works")
                else:
                    print("❌ GitHub token invalid")
        except Exception as e:
            print(f"❌ GitHub test failed: {e}")
    
    print(f"\n📊 Total keys loaded: {len(keys)}")

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Universal Vault Loader")
        print("Usage: python3 load_vault.py [command]")
        print("")
        print("Commands:")
        print("  export    - Export keys to environment (use with 'eval')")
        print("  print     - Print shell export statements")
        print("  test      - Test keys are working")
        print("  list      - List available keys")
        print("")
        print("Quick start:")
        print("  eval $(python3 load_vault.py export)")
        sys.exit(0)
    
    command = sys.argv[1]
    
    if command == 'export':
        keys = export_to_env()
        # Also print for eval
        for name, value in keys.items():
            escaped = value.replace("'", "'\\''")
            print(f"export {name}='{escaped}'")
    elif command == 'print':
        print_shell_exports()
    elif command == 'test':
        test_keys()
    elif command == 'list':
        keys = load_vault_keys()
        print("Available keys:")
        for name in sorted(keys.keys()):
            preview = keys[name][:10] + "..." if len(keys[name]) > 10 else keys[name]
            print(f"  {name}: {preview}")
    else:
        print(f"Unknown command: {command}")