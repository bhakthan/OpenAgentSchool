#!/usr/bin/env python3
"""
Fix duplicate keys in references.ts by merging duplicate sections.
Each duplicate appears to have an "official-guides" section first,
then a "youtube-research" section later. We merge them into one.
"""

import re
import json

def fix_duplicates(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all duplicate keys
    duplicates = [
        "agent-instruction-design",
        "prompt-optimization-patterns",
        "agentic-workflow-control",
        "mcp",
        "agent-evaluation-methodologies",
        "data-knowledge-operations",
        "responsible-ai-governance",
        "acp",
        "strategy-portfolio-management"
    ]
    
    for key in duplicates:
        print(f"Processing {key}...")
        
        # Find all occurrences of this key
        pattern = rf'"{key}":\s*\['
        matches = list(re.finditer(pattern, content))
        
        if len(matches) != 2:
            print(f"  WARNING: Expected 2 occurrences, found {len(matches)}")
            continue
            
        # Extract the two sections
        first_start = matches[0].start()
        second_start = matches[1].start()
        
        # Find the end of the first section (look for closing ],)
        first_content_start = content.find('[', first_start) + 1
        bracket_count = 1
        pos = first_content_start
        while bracket_count > 0 and pos < len(content):
            if content[pos] == '[':
                bracket_count += 1
            elif content[pos] == ']':
                bracket_count -= 1
            pos += 1
        first_end = pos
        
        # Find the end of the second section
        second_content_start = content.find('[', second_start) + 1
        bracket_count = 1
        pos = second_content_start
        while bracket_count > 0 and pos < len(content):
            if content[pos] == '[':
                bracket_count += 1
            elif content[pos] == ']':
                bracket_count -= 1
            pos += 1
        second_end = pos
        
        # Extract arrays (without the key)
        first_array = content[first_content_start:first_end-1].strip()
        second_array = content[second_content_start:second_end-1].strip()
        
        # Merge: first array + comma + second array
        merged_array = f"{first_array},\n      {second_array}"
        
        # Build the merged section
        merged_section = f'"{key}": [\n      {merged_array}\n    ]'
        
        # Replace first occurrence with merged
        before_first = content[:first_start]
        after_first_section = content[first_end:second_start]
        
        # Find where second section ends (including the closing bracket and comma)
        # Look for the next key or end of object
        end_of_second = second_end
        # Skip whitespace and potential comma
        while end_of_second < len(content) and content[end_of_second] in ' \n\t':
            end_of_second += 1
        if end_of_second < len(content) and content[end_of_second] == ',':
            end_of_second += 1
        # Skip more whitespace
        while end_of_second < len(content) and content[end_of_second] in ' \n\t':
            end_of_second += 1
        
        after_second = content[end_of_second:]
        
        # Reconstruct: before first + merged + (skip everything between first and second) + after second
        # Actually, we need to be more careful. Let's find the end of first section properly
        
        # Simpler approach: find the comma after first closing bracket
        temp_pos = first_end
        while temp_pos < len(content) and content[temp_pos] in ' \n\t':
            temp_pos += 1
        if temp_pos < len(content) and content[temp_pos] == ',':
            temp_pos += 1
        while temp_pos < len(content) and content[temp_pos] in ' \n\t':
            temp_pos += 1
        first_complete_end = temp_pos
        
        # Remove second occurrence completely
        # Find where the second section really ends (after ],)
        temp_pos = second_end
        while temp_pos < len(content) and content[temp_pos] in ' \n\t':
            temp_pos += 1
        if temp_pos < len(content) and content[temp_pos] == ',':
            temp_pos += 1
        while temp_pos < len(content) and content[temp_pos] in '\n':
            temp_pos += 1
        second_complete_end = temp_pos
        
        # Reconstruct
        content = (content[:first_start] + merged_section + ",\n  \n    " + 
                  content[first_complete_end:second_start].lstrip() +
                  content[second_complete_end:])
        
        print(f"  Merged {key}")
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Done!")

if __name__ == '__main__':
    fix_duplicates('src/lib/data/references.ts')
