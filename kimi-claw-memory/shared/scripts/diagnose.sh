#!/bin/bash
# Runtime Error Diagnostic Script

echo "=== OpenClaw Runtime Diagnostics ==="
echo ""

echo "1. Session Context Usage:"
grep -o '"tokens":[0-9]*' /root/.openclaw/agents/main/sessions/*.jsonl 2>/dev/null | tail -1
echo ""

echo "2. Memory System Status:"
ls -la /root/.openclaw/workspace/*.md 2>/dev/null | wc -l
echo "Memory files found: $(ls /root/.openclaw/workspace/*.md 2>/dev/null | wc -l)"
echo ""

echo "3. Recent Errors in Log:"
grep -i "error\|exception\|fail" /root/.openclaw/logs/openclaw.log 2>/dev/null | tail -20
echo ""

echo "4. Session File Sizes:"
ls -lh /root/.openclaw/agents/main/sessions/*.jsonl 2>/dev/null
echo ""

echo "5. Cron Jobs Status:"
cat /root/.openclaw/cron/jobs.json 2>/dev/null | jq '.jobs | length' 2>/dev/null || echo "No cron jobs file"
echo ""

echo "6. Disk Space:"
df -h /root/.openclaw 2>/dev/null | tail -1
echo ""

echo "7. Plugin Errors:"
grep -i "error\|fail\|exception" /root/.openclaw/logs/openclaw.log 2>/dev/null | grep -i "plugin" | tail -10
echo ""

echo "=== Diagnostics Complete ==="
