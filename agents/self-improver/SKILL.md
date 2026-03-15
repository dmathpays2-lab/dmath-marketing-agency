# Self-Improving Agent Skill

## When to Use This Agent

Spawn this agent when:
- You want a task done by an agent that learns from mistakes
- The task is recurring or pattern-based
- You want continuous improvement without manual prompt updates
- You're building a long-running automation

## How It Works

1. **Initial Execution**: Agent performs the task
2. **Self-Reflection**: Agent analyzes its own performance
3. **Skill Update**: Agent updates its own SKILL.md with learnings
4. **Knowledge Archive**: Agent writes insights to its memory/

## Commands

### Run a task with self-improvement
```
sessions_spawn: {
  agentId: "self-improver",
  task: "Your task here",
  label: "task-001"
}
```

### Review the agent's learnings
Read `agents/self-improver/memory/improvement-log.md`

### Check improvement metrics
```
openclaw skill run self-improver metrics
```

## Agent Capabilities

This agent can:
- ✅ Self-reflect after tasks
- ✅ Update its own instructions
- ✅ Track performance metrics
- ✅ Learn from user corrections
- ✅ Document successful patterns
- ✅ Request clarification when uncertain

## Example Workflow

**User**: "Research QMD memory systems and implement the best one"

**Agent Execution**:
1. Research QMD implementations
2. Compare options (official vs skills)
3. Implement chosen solution
4. **SELF-REFLECT**: "I should have asked which implementation preference first"
5. **UPDATE**: Add "Always ask implementation preference" to SKILL.md
6. **ARCHIVE**: Write learnings to memory/

**Next Time**: Agent asks for preference upfront

## Integration with QMD

This agent benefits from QMD because:
- It can search its own improvement history
- It finds patterns across past tasks
- It recalls what worked before

Make sure QMD is enabled for best results.
