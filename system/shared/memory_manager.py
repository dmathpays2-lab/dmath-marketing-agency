#!/usr/bin/env python3
"""
Smart Memory Manager - Prevents session overload while keeping full memory system
"""
import os
import json
import gzip
import shutil
from datetime import datetime, timedelta
from pathlib import Path

WORKSPACE = Path("/root/.openclaw/workspace")
MEMORY_DIR = WORKSPACE / "memory"
ARCHIVE_DIR = WORKSPACE / "memory" / "archive"
SESSIONS_DIR = Path("/root/.openclaw/agents/main/sessions")
MAX_SESSION_SIZE_KB = 300  # Compact before this
MAX_MEMORY_AGE_DAYS = 30   # Archive daily files older than this

class MemoryManager:
    def __init__(self):
        MEMORY_DIR.mkdir(exist_ok=True)
        ARCHIVE_DIR.mkdir(exist_ok=True)
        
    def get_session_size(self):
        """Check current session file size in KB"""
        if not SESSIONS_DIR.exists():
            return 0
        session_files = list(SESSIONS_DIR.glob("*.jsonl"))
        if not session_files:
            return 0
        # Get the most recent session file
        latest = max(session_files, key=lambda p: p.stat().st_mtime)
        return latest.stat().st_size / 1024
    
    def compact_session_if_needed(self):
        """Compact session if it's getting too large"""
        size_kb = self.get_session_size()
        if size_kb > MAX_SESSION_SIZE_KB:
            print(f"⚠️ Session size {size_kb:.0f}KB > {MAX_SESSION_SIZE_KB}KB, compacting...")
            self._do_compaction()
            return True
        return False
    
    def _do_compaction(self):
        """Archive old session content, keep recent context"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_dir = Path("/root/.openclaw/backups")
        backup_dir.mkdir(exist_ok=True)
        
        if not SESSIONS_DIR.exists():
            return
            
        for session_file in SESSIONS_DIR.glob("*.jsonl"):
            # Keep last 50 lines (recent context), archive the rest
            lines = session_file.read_text().strip().split('\n')
            
            if len(lines) > 100:
                # Archive older lines
                archive_lines = lines[:-50]  # All but last 50
                keep_lines = lines[-50:]     # Last 50 for context
                
                # Write archive
                archive_path = backup_dir / f"{session_file.stem}_{timestamp}.jsonl.gz"
                with gzip.open(archive_path, 'wt') as f:
                    f.write('\n'.join(archive_lines))
                
                # Write trimmed session
                session_file.write_text('\n'.join(keep_lines) + '\n')
                print(f"✅ Archived {len(archive_lines)} lines to {archive_path.name}")
    
    def archive_old_daily_files(self):
        """Compress daily memory files older than MAX_MEMORY_AGE_DAYS"""
        if not MEMORY_DIR.exists():
            return
            
        cutoff = datetime.now() - timedelta(days=MAX_MEMORY_AGE_DAYS)
        archived = 0
        
        for file in MEMORY_DIR.glob("2026-*.md"):
            try:
                # Parse date from filename (2026-03-06.md format)
                file_date = datetime.strptime(file.stem, "%Y-%m-%d")
                if file_date < cutoff:
                    # Compress to archive
                    archive_path = ARCHIVE_DIR / f"{file.stem}.md.gz"
                    with open(file, 'rb') as f_in:
                        with gzip.open(archive_path, 'wb') as f_out:
                            shutil.copyfileobj(f_in, f_out)
                    file.unlink()  # Remove original
                    archived += 1
            except ValueError:
                continue  # Skip files that don't match date format
        
        if archived:
            print(f"✅ Archived {archived} old daily memory files")
    
    def get_memory_stats(self):
        """Get current memory system stats"""
        stats = {
            "session_size_kb": round(self.get_session_size(), 1),
            "daily_files": len(list(MEMORY_DIR.glob("2026-*.md"))),
            "archived_files": len(list(ARCHIVE_DIR.glob("*.gz"))),
            "memory_md_lines": 0
        }
        
        if (WORKSPACE / "MEMORY.md").exists():
            stats["memory_md_lines"] = len((WORKSPACE / "MEMORY.md").read_text().split('\n'))
        
        return stats
    
    def health_check(self):
        """Return health status and warnings"""
        warnings = []
        stats = self.get_memory_stats()
        
        if stats["session_size_kb"] > MAX_SESSION_SIZE_KB * 0.8:
            warnings.append(f"Session at {stats['session_size_kb']}KB - approaching limit")
        
        if stats["daily_files"] > 60:
            warnings.append(f"{stats['daily_files']} daily files - consider archiving")
        
        return {"healthy": len(warnings) == 0, "warnings": warnings, "stats": stats}

if __name__ == "__main__":
    import sys
    
    mm = MemoryManager()
    
    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        if cmd == "compact":
            mm.compact_session_if_needed()
        elif cmd == "archive":
            mm.archive_old_daily_files()
        elif cmd == "stats":
            print(json.dumps(mm.get_memory_stats(), indent=2))
        elif cmd == "health":
            print(json.dumps(mm.health_check(), indent=2))
        else:
            print("Usage: memory_manager.py [compact|archive|stats|health]")
    else:
        # Run maintenance
        mm.compact_session_if_needed()
        mm.archive_old_daily_files()
