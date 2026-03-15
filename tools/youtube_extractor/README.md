# YouTube Video Extractor

A tool to extract transcripts and metadata from YouTube videos for analysis.

## Installation

```bash
# Install yt-dlp and youtube-transcript-api
pip install yt-dlp youtube-transcript-api
```

## Usage

### Extract Transcript Only
```python
from youtube_transcript_api import YouTubeTranscriptApi

def get_transcript(video_id):
    """Get transcript from YouTube video ID."""
    try:
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        full_text = ' '.join([item['text'] for item in transcript_list])
        return full_text
    except Exception as e:
        return f"Error: {e}"

# Example: https://youtu.be/nSBKCZQkmYw
video_id = "nSBKCZQkmYw"
transcript = get_transcript(video_id)
print(transcript)
```

### Extract Video Metadata
```bash
# Get video info
yt-dlp --dump-json "https://youtu.be/nSBKCZQkmYw" > video_info.json

# Download audio only
yt-dlp -x --audio-format mp3 "https://youtu.be/nSBKCZQkmYw"
```

### Full Python Script
```python
#!/usr/bin/env python3
"""
yt_extract.py - Extract YouTube video content for analysis
"""

import sys
import json
import re
from urllib.parse import urlparse, parse_qs

def extract_video_id(url):
    """Extract video ID from various YouTube URL formats."""
    patterns = [
        r'(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/)([a-zA-Z0-9_-]{11})',
        r'youtube\.com/watch\?.*v=([a-zA-Z0-9_-]{11})',
    ]
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None

def get_transcript(video_id):
    """Fetch transcript using youtube-transcript-api."""
    try:
        from youtube_transcript_api import YouTubeTranscriptApi
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        return transcript
    except Exception as e:
        return {"error": str(e)}

def format_transcript(transcript):
    """Format transcript with timestamps."""
    if isinstance(transcript, dict) and "error" in transcript:
        return transcript["error"]
    
    lines = []
    for item in transcript:
        start = item['start']
        duration = item.get('duration', 0)
        text = item['text']
        timestamp = f"[{int(start//60):02d}:{int(start%60):02d}]"
        lines.append(f"{timestamp} {text}")
    return '\n'.join(lines)

def main():
    if len(sys.argv) < 2:
        print("Usage: python yt_extract.py <youtube_url>")
        sys.exit(1)
    
    url = sys.argv[1]
    video_id = extract_video_id(url)
    
    if not video_id:
        print("Error: Could not extract video ID from URL")
        sys.exit(1)
    
    print(f"Extracting content for video: {video_id}")
    
    transcript = get_transcript(video_id)
    
    # Save raw transcript
    with open(f"{video_id}_transcript.json", 'w') as f:
        json.dump(transcript, f, indent=2)
    
    # Save formatted transcript
    formatted = format_transcript(transcript)
    with open(f"{video_id}_transcript.txt", 'w') as f:
        f.write(formatted)
    
    print(f"Saved transcript to {video_id}_transcript.txt")
    print(f"Saved raw data to {video_id}_transcript.json")

if __name__ == "__main__":
    main()
```

## Requirements

Create `requirements.txt`:
```
youtube-transcript-api>=0.6.0
yt-dlp>=2023.0.0
```

## Handling IP Blocks (Cloud Providers)

YouTube often blocks IP addresses from cloud providers (AWS, GCP, Azure, etc.). If you get IP blocked:

### Option 1: Use a Proxy
```python
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.proxies import WebshareProxyConfig

proxy = WebshareProxyConfig(
    proxy_username="your_username",
    proxy_password="your_password",
)
transcript = YouTubeTranscriptApi().fetch(video_id, proxies=proxy)
```

### Option 2: Use Cookies (Account Risk)
```bash
yt-dlp --cookies-from-browser chrome "https://youtu.be/VIDEO_ID"
```
⚠️ **Warning:** Your account may eventually be banned by YouTube.

### Option 3: Use External Services
- **Downsub.com** - Download subtitles from YouTube
- **YouTube Transcript** Chrome extension
- **yt.lemnoslife.com** API (unofficial)

### Option 4: Fetch from Search Results
For popular videos, transcripts and summaries are often available in:
- Podcast show notes
- Blog post recaps
- Twitter/X threads
- Newsletter summaries

## Notes

- Not all videos have transcripts available
- Some videos may have auto-generated captions only
- Regional restrictions may apply
- Cloud provider IPs are frequently blocked by YouTube
