# QMD Configuration for OpenClaw
# Based on Kevin Jeppesen's / The Operator Vault recommendations
# https://theoperatorvault.io

memory: {
  # Use QMD as the backend (hybrid BM25 + vector + reranking)
  backend: "qmd",
  
  # Enable automatic citations (shows source file:line for each result)
  citations: "auto",
  
  qmd: {
    # Include default memory files (MEMORY.md + memory/**/*.md)
    includeDefaultMemory: true,
    
    # Auto-index workspace memory files
    update: {
      # Re-index every 5 minutes
      interval: "5m",
      # Wait 15 seconds after last change before re-indexing (debounce)
      debounceMs: 15000,
      # Update index on boot
      onBoot: true,
      # Don't block boot on first index (runs in background)
      waitForBootSync: false
    },
    
    # Search result limits
    limits: {
      maxResults: 6,
      maxSnippetChars: 700,
      timeoutMs: 4000
    },
    
    # Scope: Only index direct messages (not group chats) by default
    # This keeps noise out of your personal memory
    scope: {
      default: "deny",
      rules: [
        { action: "allow", match: { chatType: "direct" } }
      ]
    },
    
    # Additional collections (optional)
    # Add external directories you want searchable
    paths: [
      # Example: Add Obsidian vault or other notes
      # { name: "notes", path: "~/Documents/Obsidian", pattern: "**/*.md" },
      # { name: "projects", path: "~/projects", pattern: "**/*.md" }
    ]
  }
}

# Enable automatic memory flush before context compaction
# This ensures important memories are written to disk before they're lost
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
