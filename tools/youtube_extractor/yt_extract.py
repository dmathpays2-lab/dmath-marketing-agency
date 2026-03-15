#!/usr/bin/env python3
"""
yt_extract.py - Extract YouTube video content for analysis

Usage:
    python yt_extract.py <youtube_url>
    
Example:
    python yt_extract.py "https://youtu.be/nSBKCZQkmYw"
"""

import sys
import json
import re
import os

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
        text = item['text']
        timestamp = f"[{int(start//60):02d}:{int(start%60):02d}]"
        lines.append(f"{timestamp} {text}")
    return '\n'.join(lines)

def get_video_metadata(video_id):
    """Get video metadata using yt-dlp if available."""
    try:
        import yt_dlp
        
        ydl_opts = {
            'quiet': True,
            'no_warnings': True,
            'extract_flat': True,
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(f"https://youtube.com/watch?v={video_id}", download=False)
            return {
                "title": info.get("title"),
                "description": info.get("description"),
                "duration": info.get("duration"),
                "uploader": info.get("uploader"),
                "upload_date": info.get("upload_date"),
                "view_count": info.get("view_count"),
            }
    except Exception as e:
        return {"error": str(e)}

def main():
    if len(sys.argv) < 2:
        print("Usage: python yt_extract.py <youtube_url>")
        print("Example: python yt_extract.py 'https://youtu.be/nSBKCZQkmYw'")
        sys.exit(1)
    
    url = sys.argv[1]
    video_id = extract_video_id(url)
    
    if not video_id:
        print("Error: Could not extract video ID from URL")
        print("Supported formats:")
        print("  - https://youtube.com/watch?v=VIDEO_ID")
        print("  - https://youtu.be/VIDEO_ID")
        print("  - https://youtube.com/embed/VIDEO_ID")
        sys.exit(1)
    
    print(f"📺 Video ID: {video_id}")
    print("-" * 50)
    
    # Get metadata
    print("Fetching metadata...")
    metadata = get_video_metadata(video_id)
    if "error" not in metadata:
        print(f"Title: {metadata.get('title', 'N/A')}")
        print(f"Channel: {metadata.get('uploader', 'N/A')}")
        print(f"Duration: {metadata.get('duration', 'N/A')} seconds")
        print(f"Views: {metadata.get('view_count', 'N/A')}")
    
    # Get transcript
    print("\nFetching transcript...")
    transcript = get_transcript(video_id)
    
    if "error" in transcript:
        print(f"Error fetching transcript: {transcript['error']}")
        sys.exit(1)
    
    # Create output directory
    output_dir = f"extracted/{video_id}"
    os.makedirs(output_dir, exist_ok=True)
    
    # Save metadata
    if "error" not in metadata:
        with open(f"{output_dir}/metadata.json", 'w') as f:
            json.dump(metadata, f, indent=2)
    
    # Save raw transcript
    with open(f"{output_dir}/transcript.json", 'w') as f:
        json.dump(transcript, f, indent=2)
    
    # Save formatted transcript
    formatted = format_transcript(transcript)
    with open(f"{output_dir}/transcript.txt", 'w') as f:
        f.write(formatted)
    
    # Save plain text (no timestamps)
    plain_text = ' '.join([item['text'] for item in transcript])
    with open(f"{output_dir}/content.txt", 'w') as f:
        f.write(plain_text)
    
    print(f"\n✅ Extracted content saved to: {output_dir}/")
    print(f"   - transcript.txt (with timestamps)")
    print(f"   - content.txt (plain text)")
    print(f"   - transcript.json (raw data)")
    if "error" not in metadata:
        print(f"   - metadata.json")

if __name__ == "__main__":
    main()
