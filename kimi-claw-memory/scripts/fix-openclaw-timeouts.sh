#!/bin/bash
# OpenClaw Timeout Fix Script
# Applies timeout fixes to prevent Kimi Claw session timeouts

set -e

echo "🔧 OpenClaw Timeout Fix Script"
echo "================================"

CONFIG_FILE="$HOME/.openclaw/openclaw.json"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Error: Config file not found at $CONFIG_FILE"
    exit 1
fi

echo "📁 Config file: $CONFIG_FILE"

# Backup original config
cp "$CONFIG_FILE" "$CONFIG_FILE.backup.$(date +%Y%m%d_%H%M%S)"
echo "💾 Backup created"

# Function to update JSON using jq if available, otherwise use sed
update_config() {
    local key="$1"
    local value="$2"
    
    if command -v jq &> /dev/null; then
        # Use jq for proper JSON manipulation
        jq "$key = $value" "$CONFIG_FILE" > "${CONFIG_FILE}.tmp" && mv "${CONFIG_FILE}.tmp" "$CONFIG_FILE"
    else
        echo "⚠️  jq not found, using sed (less reliable)"
        # Fallback to sed for simple replacements
        sed -i "s/$key/$value/g" "$CONFIG_FILE"
    fi
}

echo ""
echo "📝 Applying timeout fixes..."

# Fix 1: Increase prompt timeout from 5 min to 30 min
if grep -q '"promptTimeoutMs": 300000' "$CONFIG_FILE"; then
    sed -i 's/"promptTimeoutMs": 300000/"promptTimeoutMs": 1800000/' "$CONFIG_FILE"
    echo "✅ Fixed: promptTimeoutMs 5min → 30min"
else
    echo "ℹ️  promptTimeoutMs already updated or not found"
fi

# Fix 2: Add subagent timeout settings
if ! grep -q '"runTimeoutSeconds"' "$CONFIG_FILE"; then
    # Add subagent timeout settings after maxConcurrent
    sed -i 's/"maxConcurrent": 8/"maxConcurrent": 8,\n        "runTimeoutSeconds": 900,\n        "maxSpawnDepth": 2,\n        "maxChildrenPerAgent": 5/' "$CONFIG_FILE"
    echo "✅ Fixed: Added subagent timeout settings (15min)"
else
    echo "ℹ️  Subagent timeout already configured"
fi

echo ""
echo "🔍 Verifying configuration..."

# Verify changes
if grep -q '"promptTimeoutMs": 1800000' "$CONFIG_FILE"; then
    echo "✅ Prompt timeout: 30 minutes"
else
    echo "❌ Prompt timeout not set correctly"
fi

if grep -q '"runTimeoutSeconds": 900' "$CONFIG_FILE"; then
    echo "✅ Subagent timeout: 15 minutes"
else
    echo "❌ Subagent timeout not set correctly"
fi

if grep -q '"maxSpawnDepth": 2' "$CONFIG_FILE"; then
    echo "✅ Nested subagents: Enabled (depth 2)"
else
    echo "❌ Nested subagents not enabled"
fi

echo ""
echo "🚀 Restarting OpenClaw gateway..."
openclaw gateway restart || echo "⚠️  Gateway restart failed (may need manual restart)"

echo ""
echo "✅ Timeout fixes applied successfully!"
echo ""
echo "📊 Summary of Changes:"
echo "  • Prompt timeout: 5min → 30min"
echo "  • Subagent timeout: Added 15min default"
echo "  • Nested subagents: Enabled (orchestrator pattern)"
echo ""
echo "📖 Usage Tips:"
echo "  • Long tasks now have 30min instead of 5min"
echo "  • Subagents get 15min timeout by default"
echo "  • Use 'sessions_spawn' with longer timeouts for very long tasks:"
echo "    runTimeoutSeconds: 1800  # 30 minutes"
echo ""
