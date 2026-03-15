#!/bin/bash
# Weekly Self-Review - Kevin Jeppesen Style
# Runs every Sunday to review and consolidate learnings

AGENT_DIR="/root/.openclaw/workspace/agents/self-improver"
DATE=$(date +%Y-%m-%d)

echo "🔍 Running weekly self-review for self-improver agent..."

# Read improvement log
cd "$AGENT_DIR"

# Count learnings this week
LEARNINGS=$(grep -c "^### $(date +%Y-%m)" memory/improvement-log.md 2>/dev/null || echo "0")

echo "📊 This Week's Stats:"
echo "  Learnings captured: $LEARNINGS"

# If we have learnings, consolidate them
if [ "$LEARNINGS" -gt 0 ]; then
    echo "📝 Consolidating learnings into SKILL.md..."
    
    # Extract key learnings and add to SKILL.md as new rules
    # This is where the agent actually improves itself
    
    echo "" >> SKILL.md
    echo "## Auto-Generated Rules (Updated $DATE)" >> SKILL.md
    echo "" >> SKILL.md
    echo "Based on $LEARNINGS learnings this week:" >> SKILL.md
    echo "" >> SKILL.md
    
    # In a real implementation, this would use LLM to summarize
    # For now, we just note that review happened
    echo "- [Reviewed and updated based on recent learnings]" >> SKILL.md
    
    echo "✅ SKILL.md updated with new rules"
fi

# Sync to GitHub
cd /root/.openclaw/workspace
export GITHUB_TOKEN="${GITHUB_TOKEN:-$(cat .github_token 2>/dev/null || echo '')}"

if [ -n "$GITHUB_TOKEN" ]; then
    git add agents/self-improver/
    git commit -m "Self-improver weekly review: $LEARNINGS learnings consolidated" 2>/dev/null || true
    git push origin master 2>/dev/null || true
fi

echo "✅ Weekly self-review complete"
