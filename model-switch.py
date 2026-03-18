#!/usr/bin/env python3
"""
Model Switcher for OpenClaw
Switches between AI models (Kimi, Gemini, etc.)
"""

import json
import sys
import os

CONFIG_PATH = os.path.expanduser("~/.openclaw/openclaw.json")

MODELS = {
    "kimi": "kimi-coding/k2p5",
    "k2.5": "kimi-coding/k2p5",
    "flash": "google/gemini-2.0-flash",
    "gemini-flash": "google/gemini-2.0-flash",
    "pro": "google/gemini-2.0-pro",
    "gemini-pro": "google/gemini-2.0-pro"
}

def get_current_model():
    """Get current model from config"""
    try:
        with open(CONFIG_PATH, 'r') as f:
            config = json.load(f)
        return config['agents']['defaults']['model']['primary']
    except:
        return "unknown"

def set_model(model_id):
    """Set model in config"""
    try:
        with open(CONFIG_PATH, 'r') as f:
            config = json.load(f)
        
        config['agents']['defaults']['model']['primary'] = model_id
        
        with open(CONFIG_PATH, 'w') as f:
            json.dump(config, f, indent=2)
        
        return True
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        return False

def main():
    if len(sys.argv) < 2 or sys.argv[1] in ['--help', '-h']:
        print("🧠 Model Switcher for OpenClaw")
        print("")
        print("Usage: model-switch.py [model]")
        print("")
        print("Available models:")
        print("  kimi, k2.5       - Kimi K2.5 (default, main system)")
        print("  flash            - Gemini 2.0 Flash (fast, cheap)")
        print("  pro              - Gemini 2.0 Pro (accurate)")
        print("")
        print("Current model:", get_current_model())
        return
    
    alias = sys.argv[1].lower()
    
    if alias == "current":
        print("Current model:", get_current_model())
        return
    
    if alias not in MODELS:
        print(f"❌ Unknown model: {alias}")
        print(f"Available: {', '.join(MODELS.keys())}")
        sys.exit(1)
    
    model_id = MODELS[alias]
    
    print(f"🔄 Switching to {model_id}...")
    
    if set_model(model_id):
        print(f"✅ Model switched to: {model_id}")
        print("")
        print("⚠️  IMPORTANT: You must restart OpenClaw for changes to take effect:")
        print("   openclaw restart")
        print("")
        print("   Or start a new session.")
    else:
        print("❌ Failed to switch model")
        sys.exit(1)

if __name__ == '__main__':
    main()
