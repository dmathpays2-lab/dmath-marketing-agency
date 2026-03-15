#!/bin/bash
# Self-Reflection Script - Run after each task

AGENT_DIR="/root/.openclaw/workspace/agents/self-improver"
TASK_ID="$1"
TASK_RESULT="$2"

echo "🤔 Running self-reflection for task: $TASK_ID"

# This would be called by the agent after task completion
# In practice, the agent does this internally via its SOUL.md rules

echo "✅ Self-reflection complete. Check $AGENT_DIR/memory/improvement-log.md"
