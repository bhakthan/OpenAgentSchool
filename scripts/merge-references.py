"""
Merge Approved Video Mappings into references.ts

This script takes approved video mappings and merges them into the references.ts file.

Usage:
    python scripts/merge-references.py --auto    # Merge auto-approved mappings
    python scripts/merge-references.py --review  # Merge reviewed/approved mappings
    python scripts/merge-references.py --file path/to/custom-mappings.json
    python scripts/merge-references.py --dry-run # Preview changes without writing
"""

import argparse
import json
import re
from pathlib import Path
from typing import List, Dict
from collections import defaultdict

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
REFERENCES_FILE = PROJECT_ROOT / "src/lib/data/references.ts"
OUTPUT_DIR = PROJECT_ROOT / "scripts/output"
AUTO_MAPPINGS_FILE = OUTPUT_DIR / "video-mappings-auto.json"
REVIEW_MAPPINGS_FILE = OUTPUT_DIR / "video-mappings-review.json"
BACKUP_FILE = REFERENCES_FILE.with_suffix('.ts.backup')


class ReferenceMerger:
    """Merges video mappings into references.ts"""
    
    def __init__(self, dry_run: bool = False):
        self.dry_run = dry_run
        self.references_content = self._load_references()
    
    def _load_references(self) -> str:
        """Load current references.ts content"""
        with open(REFERENCES_FILE, 'r', encoding='utf-8') as f:
            return f.read()
    
    def _backup_references(self):
        """Create backup of references.ts"""
        with open(BACKUP_FILE, 'w', encoding='utf-8') as f:
            f.write(self.references_content)
        print(f"✅ Backup created: {BACKUP_FILE}")
    
    def merge_mappings(self, mappings_file: Path):
        """Merge mappings from a JSON file"""
        
        with open(mappings_file, 'r', encoding='utf-8') as f:
            mappings = json.load(f)
        
        if not mappings:
            print("No mappings to merge.")
            return
        
        # Group mappings by category
        grouped = defaultdict(list)
        for mapping in mappings:
            key = (mapping['category_type'], mapping['category_id'])
            grouped[key].append(mapping)
        
        # Create backup first
        if not self.dry_run:
            self._backup_references()
        
        # Process each category
        new_content = self.references_content
        
        for (cat_type, cat_id), videos in grouped.items():
            print(f"\n📂 {cat_type}/{cat_id}: {len(videos)} videos")
            
            # Find the section in references.ts
            section_name = self._get_section_name(cat_type)
            
            # Check if category already exists
            if self._category_exists(new_content, section_name, cat_id):
                # Add to existing category
                new_content = self._add_to_existing_category(
                    new_content, section_name, cat_id, videos
                )
            else:
                # Create new category entry
                new_content = self._create_new_category(
                    new_content, section_name, cat_id, videos
                )
            
            for video in videos:
                status = "🔍 DRY RUN" if self.dry_run else "✅ MERGED"
                print(f"  {status}: {video['video_title'][:60]}")
        
        # Save changes
        if self.dry_run:
            print("\n🔍 DRY RUN MODE - No changes written")
            print(f"Preview saved to: {OUTPUT_DIR / 'references-preview.ts'}")
            with open(OUTPUT_DIR / 'references-preview.ts', 'w', encoding='utf-8') as f:
                f.write(new_content)
        else:
            with open(REFERENCES_FILE, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"\n✅ Successfully merged {len(mappings)} mappings into {REFERENCES_FILE}")
            print(f"   Backup saved to: {BACKUP_FILE}")
    
    def _get_section_name(self, category_type: str) -> str:
        """Get the section name in references.ts"""
        mapping = {
            'concept': 'concepts',
            'pattern': 'patterns',
            'adoption': 'concepts',  # Adoption playbooks are stored in concepts
            'azure-service': 'azureServices'
        }
        return mapping.get(category_type, 'concepts')
    
    def _category_exists(self, content: str, section: str, category_id: str) -> bool:
        """Check if a category already exists in the section"""
        pattern = rf'{section}:\s*{{[^}}]*"{category_id}":'
        return bool(re.search(pattern, content, re.DOTALL))
    
    def _add_to_existing_category(self, content: str, section: str, category_id: str, videos: List[Dict]) -> str:
        """Add videos to an existing category"""
        
        # Find the category section
        pattern = rf'("{category_id}":\s*\[)(.*?)(\n\s*\])'
        match = re.search(pattern, content, re.DOTALL)
        
        if not match:
            print(f"  ⚠️  Could not find category section for {category_id}")
            return content
        
        existing_categories = match.group(2)
        
        # Check if "YouTube Research" category exists
        youtube_category_pattern = r'{\s*id:\s*["\']youtube-research["\']\s*,\s*name:\s*["\']YouTube Research["\']'
        
        if re.search(youtube_category_pattern, existing_categories):
            # Add to existing YouTube Research category
            return self._add_to_youtube_category(content, category_id, videos)
        else:
            # Create new YouTube Research category
            return self._create_youtube_category(content, category_id, videos, existing_categories)
    
    def _add_to_youtube_category(self, content: str, category_id: str, videos: List[Dict]) -> str:
        """Add videos to existing YouTube Research category"""
        
        # Find the YouTube Research category's references array
        pattern = rf'("{category_id}":\s*\[.*?{{\s*id:\s*["\']youtube-research["\']\s*,\s*name:\s*["\']YouTube Research["\']\s*,\s*references:\s*\[)(.*?)(\]\s*}})'
        match = re.search(pattern, content, re.DOTALL)
        
        if not match:
            print(f"  ⚠️  Could not find YouTube Research references for {category_id}")
            return content
        
        # Build new reference entries
        new_refs = []
        for video in videos:
            ref = f"""
          {{
            title: "{self._escape_string(video['video_title'])}",
            url: "{video['video_url']}",
            description: "{self._escape_string(video['suggested_description'])}"
          }}"""
            new_refs.append(ref)
        
        # Check if there are existing references
        existing_refs = match.group(2).strip()
        separator = ',' if existing_refs and not existing_refs.endswith(',') else ''
        
        new_content = content[:match.end(1)] + existing_refs + separator + ','.join(new_refs) + content[match.start(3):]
        return new_content
    
    def _create_youtube_category(self, content: str, category_id: str, videos: List[Dict], existing_categories: str) -> str:
        """Create new YouTube Research category"""
        
        # Build new category
        youtube_category = f"""
      {{
        id: "youtube-research",
        name: "YouTube Research",
        references: ["""
        
        # Add all videos
        for i, video in enumerate(videos):
            comma = '' if i == len(videos) - 1 else ','
            youtube_category += f"""
          {{
            title: "{self._escape_string(video['video_title'])}",
            url: "{video['video_url']}",
            description: "{self._escape_string(video['suggested_description'])}"
          }}{comma}"""
        
        youtube_category += """
        ]
      }"""
        
        # Find the end of the category array and insert
        pattern = rf'("{category_id}":\s*\[)(.*?)(\n\s*\])'
        match = re.search(pattern, content, re.DOTALL)
        
        if not match:
            return content
        
        # Check if there are existing categories
        existing = match.group(2).strip()
        separator = ',' if existing and not existing.endswith(',') else ''
        
        new_content = content[:match.end(2)] + separator + youtube_category + content[match.start(3):]
        return new_content
    
    def _create_new_category(self, content: str, section: str, category_id: str, videos: List[Dict]) -> str:
        """Create a new category entry"""
        
        # Build the new category entry
        category_entry = f"""
    "{category_id}": [
      {{
        id: "youtube-research",
        name: "YouTube Research",
        references: ["""
        
        for i, video in enumerate(videos):
            comma = '' if i == len(videos) - 1 else ','
            category_entry += f"""
          {{
            title: "{self._escape_string(video['video_title'])}",
            url: "{video['video_url']}",
            description: "{self._escape_string(video['suggested_description'])}"
          }}{comma}"""
        
        category_entry += """
        ]
      }
    ],"""
        
        # Find the section and add the new category
        pattern = rf'({section}:\s*{{)([^}}]*)(}})'
        match = re.search(pattern, content, re.DOTALL)
        
        if not match:
            print(f"  ⚠️  Could not find {section} section")
            return content
        
        # Insert at the end of the section (before the closing brace)
        new_content = content[:match.end(2)] + category_entry + '\n  ' + content[match.start(3):]
        return new_content
    
    def _escape_string(self, text: str) -> str:
        """Escape string for JavaScript"""
        return text.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ').replace('\r', '')


def main():
    parser = argparse.ArgumentParser(description="Merge video mappings into references.ts")
    parser.add_argument('--auto', action='store_true', help='Merge auto-approved mappings')
    parser.add_argument('--review', action='store_true', help='Merge reviewed mappings')
    parser.add_argument('--file', type=str, help='Merge from custom JSON file')
    parser.add_argument('--dry-run', action='store_true', help='Preview changes without writing')
    
    args = parser.parse_args()
    
    merger = ReferenceMerger(dry_run=args.dry_run)
    
    if args.auto:
        if not AUTO_MAPPINGS_FILE.exists():
            print(f"Error: Auto mappings file not found: {AUTO_MAPPINGS_FILE}")
            return
        print(f"Merging auto-approved mappings from {AUTO_MAPPINGS_FILE}...")
        merger.merge_mappings(AUTO_MAPPINGS_FILE)
    
    elif args.review:
        if not REVIEW_MAPPINGS_FILE.exists():
            print(f"Error: Review mappings file not found: {REVIEW_MAPPINGS_FILE}")
            return
        print(f"Merging review mappings from {REVIEW_MAPPINGS_FILE}...")
        merger.merge_mappings(REVIEW_MAPPINGS_FILE)
    
    elif args.file:
        custom_file = Path(args.file)
        if not custom_file.exists():
            print(f"Error: Custom mappings file not found: {custom_file}")
            return
        print(f"Merging custom mappings from {custom_file}...")
        merger.merge_mappings(custom_file)
    
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
