"""
Fix references.ts - Move YouTube videos from type definition to exported object
"""

import re
from pathlib import Path

# Paths
PROJECT_ROOT = Path(__file__).parent.parent
REFERENCES_FILE = PROJECT_ROOT / "src/lib/data/references.ts"

def main():
    print("Reading references.ts...")
    with open(REFERENCES_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the type definition section (lines before export const references)
    # Find where export const references starts
    export_match = re.search(r'export const references: ReferencesData = \{', content)
    if not export_match:
        print("ERROR: Could not find 'export const references'")
        return
    
    export_start = export_match.start()
    
    # The type definition section is everything before export_start
    type_section = content[:export_start]
    exported_section = content[export_start:]
    
    print(f"Type section: {len(type_section)} chars")
    print(f"Exported section: {len(exported_section)} chars")
    
    # Extract YouTube reference categories from type section
    # Pattern: "category-name": [ ... YouTube Research ... ]
    pattern = r'    "([^"]+)":\s*\[\s*\{[^}]*id:\s*"youtube-research"[^}]*name:\s*"YouTube Research".*?\}\s*\]'
    
    youtube_categories = re.findall(pattern, type_section, re.DOTALL)
    
    print(f"\nFound {len(youtube_categories)} YouTube categories in type section:")
    for cat in youtube_categories[:10]:
        print(f"  - {cat}")
    if len(youtube_categories) > 10:
        print(f"  ... and {len(youtube_categories) - 10} more")
    
    # Simple fix: Just delete the type definition data section
    # Keep only the export statement
    
    # Find where the type definition starts (after the type declarations)
    type_data_start = re.search(r'export type ReferencesData = \{\s*concepts: \{\s*\[key: string\]: ReferenceCategory\[\]\s*\n', content)
    
    if type_data_start:
        # Delete everything from after the type definition to before export const
        new_content = content[:type_data_start.end()] + '\n  },\n  patterns: { [key: string]: ReferenceCategory[] },\n  azureServices: { [key: string]: ReferenceCategory[] }\n};\n\n' + content[export_start:]
        
        # Create backup
        backup_file = REFERENCES_FILE.with_suffix('.ts.backup3')
        with open(backup_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"\nBackup created: {backup_file}")
        
        # Write fixed content
        with open(REFERENCES_FILE, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"\n✅ Fixed! Removed type definition data section")
        print(f"   Old size: {len(content)} chars")
        print(f"   New size: {len(new_content)} chars")
        print(f"   Saved: {len(content) - len(new_content)} chars")
        
        print("\n⚠️  NOTE: YouTube videos were in the type section, not the exported object!")
        print("   You'll need to re-run the merge script to add them to the correct place.")
    else:
        print("ERROR: Could not find type definition start")

if __name__ == "__main__":
    main()
