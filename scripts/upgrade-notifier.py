#!/usr/bin/env python3
"""
OpenClaw Upgrade Notifier
Check for pending upgrades and format notification for user
"""

import os
from pathlib import Path

WORKSPACE = Path("/root/.openclaw/workspace")
UPGRADE_FILE = WORKSPACE / ".upgrade-available"

def check_upgrade():
    """Check if upgrade is available and return notification"""
    if not UPGRADE_FILE.exists():
        return None
    
    try:
        notification = UPGRADE_FILE.read_text()
        return notification
    except:
        return None

def get_upgrade_info():
    """Get current and latest version info"""
    try:
        # Current version
        import subprocess
        result = subprocess.run(['openclaw', 'version'], capture_output=True, text=True)
        current = result.stdout.strip() if result.returncode == 0 else "Unknown"
        
        # Latest version
        result = subprocess.run(['npm', 'view', 'openclaw', 'version'], 
                              capture_output=True, text=True)
        latest = result.stdout.strip() if result.returncode == 0 else "Unknown"
        
        return current, latest
    except:
        return "Unknown", "Unknown"

if __name__ == '__main__':
    notification = check_upgrade()
    if notification:
        print(notification)
        print("\nType 'upgrade openclaw' to upgrade, or ignore to skip.")
    else:
        current, latest = get_upgrade_info()
        if current != latest and current != "Unknown":
            print(f"🦞 OpenClaw upgrade available: {current} → {latest}")
            print("Type 'upgrade openclaw' to upgrade.")
        else:
            print(f"✅ OpenClaw is up to date ({current})")
