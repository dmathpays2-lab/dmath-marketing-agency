#!/bin/bash
# Bot Self-Test Script
# Run this to verify vault access and API connectivity

echo "🤖 BOT SELF-TEST"
echo "================"
echo ""

cd "$(dirname "$0")"

# Test 1: Vault exists
echo -n "📁 Vault directory exists... "
if [ -d ".vault/keys" ]; then
    echo "✅"
else
    echo "❌ FAIL"
    exit 1
fi

# Test 2: Keys are readable
echo -n "🔑 Keys are readable... "
key_count=$(ls -1 .vault/keys/ 2>/dev/null | wc -l)
if [ "$key_count" -gt 0 ]; then
    echo "✅ ($key_count keys found)"
else
    echo "❌ FAIL (no keys found)"
    exit 1
fi

# Test 3: Decode works
echo -n "🔓 Key decoding works... "
if command -v python3 &> /dev/null; then
    decoded=$(python3 -c "
import base64
with open('.vault/keys/github', 'r') as f:
    encoded = f.read().strip()
    decoded = base64.b64decode(encoded).decode()
    print(decoded[::-1])
" 2>/dev/null)
    if [ -n "$decoded" ] && [[ "$decoded" == ghp_* ]]; then
        echo "✅"
    else
        echo "❌ FAIL (decode error)"
    fi
else
    echo "⚠️  SKIP (python3 not available)"
fi

# Test 4: Load vault script works
echo -n "📜 Vault loader works... "
if [ -f "load_vault.sh" ]; then
    # Source it
    set -a
    source ./load_vault.sh 2>/dev/null || true
    set +a
    
    if [ -n "$GITHUB_TOKEN" ]; then
        echo "✅"
    else
        echo "⚠️  PARTIAL (keys loaded but GITHUB_TOKEN not set)"
    fi
else
    echo "❌ FAIL (load_vault.sh not found)"
fi

# Test 5: GitHub API access
echo -n "🐙 GitHub API access... "
if [ -n "$GITHUB_TOKEN" ]; then
    user=$(curl -s -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user 2>/dev/null | grep -o '"login": "[^"]*"' | cut -d'"' -f4)
    if [ -n "$user" ]; then
        echo "✅ (authenticated as: $user)"
    else
        echo "❌ FAIL (API rejected token)"
    fi
else
    echo "⚠️  SKIP (no GITHUB_TOKEN)"
fi

echo ""
echo "================"
echo "✅ Self-test complete!"
echo ""
echo "Available keys:"
ls -1 .vault/keys/ | sed 's/^/  - /'
