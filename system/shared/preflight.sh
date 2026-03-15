#!/bin/bash
# Pre-flight check - runs before every session to prevent overload

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
python3 "$SCRIPT_DIR/memory_manager.py" compact

# Check health
HEALTH=$(python3 "$SCRIPT_DIR/memory_manager.py" health)
if echo "$HEALTH" | grep -q '"healthy": false'; then
    echo "⚠️ Memory system warning:"
    echo "$HEALTH" | grep -o '"warnings":\[.*\]' | tr ',' '\n' | tr -d '[]"'
fi
