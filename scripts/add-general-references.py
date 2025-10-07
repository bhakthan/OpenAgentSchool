"""
Add rejected videos to General AI Resources category in references.ts
"""

import json
import re
from pathlib import Path

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
REFERENCES_FILE = PROJECT_ROOT / "src/lib/data/references.ts"
REJECTED_FILE = SCRIPT_DIR / "output/video-mappings-rejected.json"

def load_rejected_videos():
    """Load videos that had no confident mappings"""
    with open(REJECTED_FILE, 'r', encoding='utf-8') as f:
        all_rejected = json.load(f)
    
    # Filter for only those with "No confident mappings found"
    no_mappings = [v for v in all_rejected if v.get('reason') == 'No confident mappings found']
    print(f"Found {len(no_mappings)} videos with no confident mappings")
    return no_mappings

def add_general_category(videos):
    """Add General AI Resources category to references.ts"""
    
    # Read current references.ts
    with open(REFERENCES_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Create the new category section
    category_id = "general-ai-resources"
    
    # Build the references array
    refs = []
    for video in videos:
        title = video.get('video_title', 'Untitled').replace('"', '\\"')
        url = video.get('video_url', '')
        refs.append(f"""          {{
            title: "{title}",
            url: "{url}",
            description: "General AI resource"
          }}""")
    
    refs_string = ",\n".join(refs)
    
    # Create the category in the same format as existing ones
    new_category = f"""    "{category_id}": [
      {{
        id: "youtube-research",
        name: "YouTube Research",
        references: [
{refs_string}
        ]
      }}
    ],
"""
    
    # Find the last category before closing brace
    # Look for "data-visualization" which appears to be the last concept category
    pattern = r'("data-visualization": \[(?:[^\]]|\][^\]])*\]\s*,)\s*\n(\s+\})'
    
    match = re.search(pattern, content, re.DOTALL)
    if match:
        # Insert after data-visualization
        insert_pos = match.end(1)
        updated_content = content[:insert_pos] + "\n" + new_category + content[insert_pos:]
    else:
        print("ERROR: Could not find 'data-visualization' category")
        return False
    
    # Create backup
    backup_file = REFERENCES_FILE.with_suffix('.ts.backup2')
    with open(backup_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Backup created: {backup_file}")
    
    # Write updated content
    with open(REFERENCES_FILE, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print(f"\n[OK] Added {len(videos)} videos to '{category_id}' category")
    print(f"[OK] Updated {REFERENCES_FILE}")
    
    return True

def main():
    print("Adding rejected videos to General AI Resources category...\n")
    
    videos = load_rejected_videos()
    
    if not videos:
        print("No videos to add!")
        return
    
    print(f"\nSample videos to be added:")
    for i, video in enumerate(videos[:5], 1):
        print(f"  {i}. {video.get('video_title', 'Untitled')}")
    if len(videos) > 5:
        print(f"  ... and {len(videos) - 5} more")
    
    success = add_general_category(videos)
    
    if success:
        print("\n" + "="*60)
        print("[SUCCESS] General AI Resources category created!")
        print("="*60)

if __name__ == "__main__":
    main()
