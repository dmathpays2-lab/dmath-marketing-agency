# QMD Implementation Guide
## Based on Kevin Jeppesen's / The Operator Vault Approach

**Video Reference:** https://youtu.be/IbtLtQ1vLto  
**Channel:** Kevin Jeppesen - The Operator Vault  
**Website:** https://theoperatorvault.io

---

## What is QMD?

**QMD (Query-Memory-Document)** is a hybrid search backend for OpenClaw that dramatically improves memory recall.

Instead of the default SQLite vector search, QMD runs **three parallel search strategies**:

| Strategy | Purpose | Speed |
|----------|---------|-------|
| **BM25 Keyword** | Exact matches, names, IDs | ⚡ Instant |
| **Vector Semantic** | Conceptual similarity | 🚀 Fast |
| **LLM Re-ranking** | Combines & scores results | ⚡ Fast |

---

## Why Kevin Jeppesen Recommends QMD

### 1. **Better Recall**
- Finds memories even when you use different words than what was originally written
- Example: Search "deployment strategy" → finds notes about "server rollout" even if "deployment" wasn't used

### 2. **Source Citations**
- Every result includes the exact file path and line number
- Know exactly where information came from

### 3. **Automatic Indexing**
- Re-indexes every 5 minutes automatically
- No manual maintenance required

### 4. **Zero API Costs**
- All embeddings happen locally using GGUF models
- **Savings: $67-510/month** in API costs

### 5. **Privacy**
- Your data never leaves your machine
- No cloud services required

---

## Installation (One-Time Setup)

### Step 1: Install Bun Runtime
```bash
curl -fsSL https://bun.sh/install | bash
export PATH="$HOME/.bun/bin:$PATH"
```

### Step 2: Install QMD
```bash
bun install -g @tobilu/qmd

# If build is needed:
cd ~/.bun/install/global/node_modules/@tobilu/qmd
bun install
bun run build
```

### Step 3: Verify Installation
```bash
qmd --version
```

---

## Configuration

Add this to your OpenClaw gateway config:

```javascript
memory: {
  backend: "qmd",
  citations: "auto",
  
  qmd: {
    includeDefaultMemory: true,
    
    update: {
      interval: "5m",        // Re-index every 5 minutes
      debounceMs: 15000,     // Wait 15s after last change
      onBoot: true,          // Update on startup
      waitForBootSync: false // Don't block boot
    },
    
    limits: {
      maxResults: 6,
      maxSnippetChars: 700,
      timeoutMs: 4000
    },
    
    // Only index direct messages (keeps group chat noise out)
    scope: {
      default: "deny",
      rules: [
        { action: "allow", match: { chatType: "direct" } }
      ]
    },
    
    // Additional collections (optional)
    paths: [
      // { name: "obsidian", path: "~/Documents/Obsidian", pattern: "**/*.md" },
      // { name: "notes", path: "~/notes", pattern: "**/*.md" }
    ]
  }
}
```

---

## Creating Collections

Collections are how QMD organizes your memory:

```bash
# Set environment variables
export XDG_CONFIG_HOME="$HOME/.openclaw/agents/main/qmd/xdg-config"
export XDG_CACHE_HOME="$HOME/.openclaw/agents/main/qmd/xdg-cache"

# Create collections for our memory structure
qmd collection add /root/.openclaw/workspace --name workspace --mask "**/*.md"
qmd collection add /root/.openclaw/workspace/memory/daily --name daily-logs --mask "*.md"
qmd collection add /root/.openclaw/workspace/memory/projects --name projects --mask "**/*.md"

# Build the index
qmd update
qmd embed
```

---

## Search Modes

| Mode | Command | Best For |
|------|---------|----------|
| **Keyword** | `qmd search "query"` | Exact terms, names, IDs |
| **Vector** | `qmd vsearch "query"` | Conceptual similarity |
| **Hybrid** | `qmd query "query"` | Best quality (recommended) |

In OpenClaw config:
```javascript
qmd: {
  searchMode: "query"  // or "search" (keyword) or "vsearch" (vector)
}
```

---

## Kevin's Key Recommendations

### 1. **Enable Memory Flush**
```javascript
agents: {
  defaults: {
    compaction: {
      memoryFlush: {
        enabled: true,
        softThresholdTokens: 4000
      }
    }
  }
}
```
This ensures important memories are written to disk before context compaction.

### 2. **Scope to Direct Messages Only**
Keep group chat noise out of your personal memory index.

### 3. **Keep Rich Memory Files**
The richer your `MEMORY.md` and daily notes, the better QMD retrieval gets.

### 4. **Check Citations**
Always verify which file/line the information came from.

---

## Testing QMD

```bash
# Set environment
export PATH="$HOME/.bun/bin:$PATH"
export XDG_CONFIG_HOME="$HOME/.openclaw/agents/main/qmd/xdg-config"
export XDG_CACHE_HOME="$HOME/.openclaw/agents/main/qmd/xdg-cache"

# Test search
qmd search "deployment" -c workspace -n 5

# Test semantic search
qmd vsearch "server setup" -c workspace -n 5

# Test hybrid (best quality)
qmd query "deployment strategy" -c workspace -n 5
```

---

## Cost Savings

| With API Embeddings | With QMD Local |
|---------------------|----------------|
| $67-510/month | $0/month |

**One-time setup, forever free searches.**

---

## Files Created

- `config/qmd-memory.config.js` - OpenClaw configuration
- `scripts/setup-qmd.sh` - Automated setup script
- `docs/QMD_IMPLEMENTATION.md` - This guide

---

## Next Steps

1. ✅ Install Bun and QMD (see Step 1-3 above)
2. ✅ Add QMD config to OpenClaw gateway
3. ✅ Create collections for our memory structure
4. ✅ Build initial index
5. ✅ Restart OpenClaw
6. ✅ Test with a memory search query

---

## Resources

- **Kevin's Channel:** https://youtube.com/@TheOperatorVault
- **Free Course:** https://theoperatorvault.io/openclaw
- **QMD GitHub:** https://github.com/tobi/qmd
- **OpenClaw Docs:** https://docs.openclaw.ai

---

*"Stop paying for memory. Start compounding knowledge."* - As Above Technologies
