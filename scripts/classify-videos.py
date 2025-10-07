"""
Video Classification Script for Open Agent School
Automatically maps YouTube videos to concepts, patterns, and adoption playbooks using Azure OpenAI.

Usage:
    python scripts/classify-videos.py --csv path/to/YTLinks.csv
    python scripts/classify-videos.py --csv path/to/YTLinks.csv --incremental
    python scripts/classify-videos.py --single "Video Title" "https://youtube.com/..."
    
    # With explicit Azure OpenAI parameters
    python scripts/classify-videos.py --csv path/to/YTLinks.csv --api-key "your-key" --endpoint "https://your-resource.openai.azure.com/" --deployment "gpt-4o"

Environment Variables:
    AZURE_OPENAI_API_KEY          - Your Azure OpenAI API key (required)
    AZURE_OPENAI_ENDPOINT         - Your Azure OpenAI endpoint URL (required)
    AZURE_OPENAI_DEPLOYMENT       - Your deployment name (default: gpt-4o)
    AZURE_OPENAI_API_VERSION      - API version (default: 2024-08-01-preview)
"""

import argparse
import csv
import json
import os
import re
from pathlib import Path
from typing import List, Dict, Optional
from dataclasses import dataclass, asdict
from openai import AzureOpenAI
from dotenv import load_dotenv

load_dotenv(override=True)

# Configuration
# Azure OpenAI Configuration
AZURE_OPENAI_ENDPOINT = os.getenv("VITE_AZURE_OPENAI_API_URL")  # e.g., https://your-resource.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT = os.getenv("VITE_AZURE_OPENAI_MODEL", "gpt-5")  # Your deployment name
AZURE_OPENAI_API_VERSION = os.getenv("VITE_AZURE_OPENAI_API_VERSION", "2025-04-01-preview")

CONFIDENCE_THRESHOLD_AUTO = 60  # Auto-approve at or above this (good to map)
CONFIDENCE_THRESHOLD_REVIEW = 60  # Below this needs review
MAX_MAPPINGS_PER_VIDEO = 5  # Maximum categories per video

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
TAXONOMY_FILE = PROJECT_ROOT / "src/components/concepts/ConceptsHub.tsx"
PATTERNS_FILE = PROJECT_ROOT / "src/lib/data/patterns/index.tsx"
REFERENCES_FILE = PROJECT_ROOT / "src/lib/data/references.ts"

# Output files
OUTPUT_DIR = PROJECT_ROOT / "scripts/output"
AUTO_MAPPINGS_FILE = OUTPUT_DIR / "video-mappings-auto.json"
REVIEW_MAPPINGS_FILE = OUTPUT_DIR / "video-mappings-review.json"
REJECTED_MAPPINGS_FILE = OUTPUT_DIR / "video-mappings-rejected.json"
PROCESSING_LOG = OUTPUT_DIR / "classification-log.txt"


@dataclass
class VideoMapping:
    """Represents a single video-to-category mapping"""
    video_title: str
    video_url: str
    category_type: str  # 'concept', 'pattern', 'adoption', 'azure-service'
    category_id: str
    category_name: str
    confidence: int  # 0-100
    reasoning: str
    suggested_description: str


@dataclass
class TaxonomyItem:
    """Represents a concept, pattern, or other taxonomy item"""
    id: str
    title: str
    description: str
    type: str  # 'concept', 'pattern', 'adoption', 'azure-service'


class TaxonomyExtractor:
    """Extracts taxonomy from TypeScript source files"""
    
    @staticmethod
    def extract_concepts() -> List[TaxonomyItem]:
        """Extract concepts from ConceptsHub.tsx"""
        concepts = []
        
        with open(TAXONOMY_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Match concept objects in the array
        pattern = r"{\s*id:\s*['\"]([^'\"]+)['\"],\s*title:\s*['\"]([^'\"]+)['\"],\s*description:\s*['\"]([^'\"]+)['\"]"
        matches = re.finditer(pattern, content, re.DOTALL)
        
        for match in matches:
            concept_id, title, description = match.groups()
            # Clean up description (remove escaped quotes)
            description = description.replace("\\'", "'").replace('\\"', '"')
            concepts.append(TaxonomyItem(
                id=concept_id,
                title=title,
                description=description,
                type='concept'
            ))
        
        return concepts
    
    @staticmethod
    def extract_patterns() -> List[TaxonomyItem]:
        """Extract patterns from patterns/index.tsx"""
        patterns = []
        
        # Read the index file to get pattern IDs
        with open(PATTERNS_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract pattern names from exports
        export_pattern = r"export \{ (\w+Pattern) \}"
        pattern_names = re.findall(export_pattern, content)
        
        # Try to extract pattern details from individual files
        patterns_dir = PATTERNS_FILE.parent
        for pattern_file in patterns_dir.glob('*.tsx'):
            if pattern_file.name == 'index.tsx':
                continue
                
            with open(pattern_file, 'r', encoding='utf-8') as f:
                pattern_content = f.read()
            
            # Extract pattern ID, name, and description
            id_match = re.search(r"id:\s*['\"]([^'\"]+)['\"]", pattern_content)
            name_match = re.search(r"name:\s*['\"]([^'\"]+)['\"]", pattern_content)
            desc_match = re.search(r"description:\s*['\"]([^'\"]+)['\"]", pattern_content)
            
            if id_match and name_match:
                pattern_id = id_match.group(1)
                pattern_name = name_match.group(1)
                pattern_desc = desc_match.group(1) if desc_match else "Agent pattern implementation"
                
                patterns.append(TaxonomyItem(
                    id=pattern_id,
                    title=pattern_name,
                    description=pattern_desc,
                    type='pattern'
                ))
        
        return patterns
    
    @staticmethod
    def extract_adoption_playbooks() -> List[TaxonomyItem]:
        """Extract adoption playbook categories"""
        # These are hardcoded based on the adoption structure
        return [
            TaxonomyItem(
                id="program-setup-north-star",
                title="Program Setup & North Star",
                description="Strategic alignment, mission definition, and success metrics for agent initiatives",
                type="adoption"
            ),
            TaxonomyItem(
                id="responsible-ai-governance",
                title="Responsible AI Governance",
                description="Policy operationalization, risk reviews, and compliance frameworks",
                type="adoption"
            ),
            TaxonomyItem(
                id="strategy-portfolio-management",
                title="Strategy & Portfolio Management",
                description="Roadmap prioritization, ROI modeling, and investment decisions",
                type="adoption"
            ),
            TaxonomyItem(
                id="data-knowledge-operations",
                title="Data & Knowledge Operations",
                description="Data pipelines, knowledge graphs, and operational data management",
                type="adoption"
            ),
            TaxonomyItem(
                id="architecture-platform-operations",
                title="Architecture & Platform Operations",
                description="Platform design, infrastructure, and operational excellence",
                type="adoption"
            ),
            TaxonomyItem(
                id="experimentation-continuous-improvement",
                title="Experimentation & Continuous Improvement",
                description="A/B testing, evaluation pipelines, and iterative improvement",
                type="adoption"
            ),
            TaxonomyItem(
                id="ecosystem-partnerships",
                title="Ecosystem & Partnerships",
                description="External collaborations, vendor management, and ecosystem strategy",
                type="adoption"
            ),
            TaxonomyItem(
                id="organizational-enablement",
                title="Organizational Enablement",
                description="Change management, training, and organizational transformation",
                type="adoption"
            ),
        ]
    
    @staticmethod
    def get_all_taxonomy() -> List[TaxonomyItem]:
        """Get complete taxonomy across all types"""
        taxonomy = []
        taxonomy.extend(TaxonomyExtractor.extract_concepts())
        taxonomy.extend(TaxonomyExtractor.extract_patterns())
        taxonomy.extend(TaxonomyExtractor.extract_adoption_playbooks())
        return taxonomy


class VideoClassifier:
    """Classifies videos using Azure OpenAI API"""
    
    def __init__(self, api_key: Optional[str] = None, endpoint: Optional[str] = None, deployment: Optional[str] = None):
        self.api_key = api_key or os.getenv("VITE_AZURE_OPENAI_API_KEY")
        self.endpoint = endpoint or AZURE_OPENAI_ENDPOINT
        self.deployment = deployment or AZURE_OPENAI_DEPLOYMENT
        
        if not self.api_key:
            raise ValueError("Azure OpenAI API key required. Set VITE_AZURE_OPENAI_API_KEY env var or pass as argument")
        if not self.endpoint:
            raise ValueError("Azure OpenAI endpoint required. Set VITE_AZURE_OPENAI_API_URL env var or pass as argument")
        if not self.deployment:
            raise ValueError("Azure OpenAI deployment name required. Set VITE_AZURE_OPENAI_MODEL env var or pass as argument")

        # Initialize Azure OpenAI client
        self.client = AzureOpenAI(
            api_key=self.api_key,
            api_version=AZURE_OPENAI_API_VERSION,
            azure_endpoint=self.endpoint
        )
        self.taxonomy = TaxonomyExtractor.get_all_taxonomy()
    
    def classify_video(self, title: str, url: str) -> List[VideoMapping]:
        """Classify a single video using GPT-4"""
        
        # Build taxonomy context for the LLM
        taxonomy_context = self._build_taxonomy_context()
        
        # Build the prompt
        prompt = f"""You are an expert in Agentic AI and are helping to organize educational video content.

Given a video title, map it to the most relevant categories from the Open Agent School taxonomy.

VIDEO TITLE: {title}
VIDEO URL: {url}

TAXONOMY:
{taxonomy_context}

INSTRUCTIONS:
1. Analyze the video title and identify the main topics
2. Map the video to 1-5 most relevant categories (concepts, patterns, or adoption playbooks)
3. For each mapping, provide:
   - category_type: 'concept', 'pattern', or 'adoption'
   - category_id: the exact ID from the taxonomy
   - category_name: the category title
   - confidence: 0-100 score (be conservative; only 90+ if you're very certain)
   - reasoning: brief explanation of why this video fits this category
   - suggested_description: a 1-sentence description for the reference link

OUTPUT FORMAT (JSON):
{{
  "mappings": [
    {{
      "category_type": "concept",
      "category_id": "multi-agent-systems",
      "category_name": "Multi-Agent Systems",
      "confidence": 92,
      "reasoning": "Video discusses agent collaboration patterns which is core to multi-agent systems",
      "suggested_description": "Research on collaborative agent architectures and coordination patterns"
    }}
  ]
}}

Return ONLY valid JSON. Be selective - only include high-confidence mappings."""

        try:
            response = self.client.chat.completions.create(
                model=self.deployment,
                messages=[
                    {"role": "system", "content": "You are an expert taxonomist for Agentic AI content. You provide accurate, conservative classifications."},
                    {"role": "user", "content": prompt}
                ],
                # temperature=0.3,  # Removed: Some models only support default temperature
                response_format={"type": "json_object"}
            )
            
            result = json.loads(response.choices[0].message.content)
            mappings = []
            
            for mapping_data in result.get("mappings", []):
                mappings.append(VideoMapping(
                    video_title=title,
                    video_url=url,
                    category_type=mapping_data["category_type"],
                    category_id=mapping_data["category_id"],
                    category_name=mapping_data["category_name"],
                    confidence=mapping_data["confidence"],
                    reasoning=mapping_data["reasoning"],
                    suggested_description=mapping_data["suggested_description"]
                ))
            
            return mappings
        
        except Exception as e:
            error_msg = f"Error classifying video '{title}': {e}"
            print(f"  [ERROR] {error_msg}")
            # Log to file for debugging
            with open(PROCESSING_LOG, 'a', encoding='utf-8') as log:
                log.write(f"{error_msg}\n")
            return []
    
    def _build_taxonomy_context(self) -> str:
        """Build a formatted taxonomy context for the LLM"""
        context_lines = []
        
        # Group by type
        concepts = [t for t in self.taxonomy if t.type == 'concept']
        patterns = [t for t in self.taxonomy if t.type == 'pattern']
        adoption = [t for t in self.taxonomy if t.type == 'adoption']
        
        context_lines.append("CONCEPTS:")
        for item in concepts[:30]:  # Limit to avoid token overflow
            context_lines.append(f"  - {item.id}: {item.title} - {item.description[:100]}")
        
        context_lines.append("\nPATTERNS:")
        for item in patterns[:25]:
            context_lines.append(f"  - {item.id}: {item.title} - {item.description[:100]}")
        
        context_lines.append("\nADOPTION PLAYBOOKS:")
        for item in adoption:
            context_lines.append(f"  - {item.id}: {item.title} - {item.description[:100]}")
        
        return "\n".join(context_lines)


class VideoBatchProcessor:
    """Processes batches of videos from CSV"""
    
    def __init__(self, classifier: VideoClassifier):
        self.classifier = classifier
        self.processed_videos = self._load_processed_videos()
    
    def _load_processed_videos(self) -> set:
        """Load already processed video URLs"""
        processed = set()
        
        for file in [AUTO_MAPPINGS_FILE, REVIEW_MAPPINGS_FILE, REJECTED_MAPPINGS_FILE]:
            if file.exists():
                with open(file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    for mapping in data:
                        processed.add(mapping['video_url'])
        
        return processed
    
    def process_csv(self, csv_path: Path, incremental: bool = False):
        """Process videos from CSV file"""
        
        OUTPUT_DIR.mkdir(exist_ok=True)
        
        auto_mappings = []
        review_mappings = []
        rejected_mappings = []
        
        with open(csv_path, 'r', encoding='utf-8-sig') as f:  # utf-8-sig handles BOM
            reader = csv.DictReader(f)
            videos = list(reader)
        
        total = len(videos)
        print(f"Processing {total} videos...")
        
        # Debug: Show first row's keys and values
        if videos:
            print(f"DEBUG: CSV columns found: {list(videos[0].keys())}")
            print(f"DEBUG: First row Title: '{videos[0].get('Title', 'NOT FOUND')}'")
            print(f"DEBUG: First row Video_url: '{videos[0].get('Video_url', 'NOT FOUND')}'")
        
        for idx, row in enumerate(videos, 1):
            title = row.get('Title', '').strip()
            url = row.get('Video_url', '').strip()
            
            if not title or not url:
                print(f"[{idx}/{total}] Skipping (missing title or URL)")
                continue
            
            # Skip if already processed (incremental mode)
            if incremental and url in self.processed_videos:
                print(f"[{idx}/{total}] Skipping (already processed): {title[:60]}...")
                continue
            
            print(f"[{idx}/{total}] Classifying: {title[:60]}...")
            
            mappings = self.classifier.classify_video(title, url)
            
            if not mappings:
                rejected_mappings.append({
                    'video_title': title,
                    'video_url': url,
                    'reason': 'No confident mappings found'
                })
                print(f"  [X] No mappings found")
                continue
            
            # Categorize by confidence
            for mapping in mappings:
                mapping_dict = asdict(mapping)
                
                if mapping.confidence >= CONFIDENCE_THRESHOLD_AUTO:
                    auto_mappings.append(mapping_dict)
                    print(f"  [OK] AUTO: {mapping.category_type}/{mapping.category_id} ({mapping.confidence}%)")
                elif mapping.confidence >= CONFIDENCE_THRESHOLD_REVIEW:
                    review_mappings.append(mapping_dict)
                    print(f"  [!] REVIEW: {mapping.category_type}/{mapping.category_id} ({mapping.confidence}%)")
                else:
                    rejected_mappings.append(mapping_dict)
                    print(f"  [X] REJECTED: {mapping.category_type}/{mapping.category_id} ({mapping.confidence}%)")
        
        # Save results
        self._save_mappings(auto_mappings, AUTO_MAPPINGS_FILE)
        self._save_mappings(review_mappings, REVIEW_MAPPINGS_FILE)
        self._save_mappings(rejected_mappings, REJECTED_MAPPINGS_FILE)
        
        # Summary
        print("\n" + "="*70)
        print("CLASSIFICATION COMPLETE")
        print("="*70)
        print(f"Auto-approved (>={CONFIDENCE_THRESHOLD_AUTO}%): {len(auto_mappings)}")
        print(f"Needs review ({CONFIDENCE_THRESHOLD_REVIEW}-{CONFIDENCE_THRESHOLD_AUTO-1}%): {len(review_mappings)}")
        print(f"Rejected (<{CONFIDENCE_THRESHOLD_REVIEW}%): {len(rejected_mappings)}")
        
        # Check for errors
        if PROCESSING_LOG.exists():
            error_count = sum(1 for _ in open(PROCESSING_LOG, 'r', encoding='utf-8'))
            if error_count > 0:
                print(f"\n[WARNING] {error_count} errors occurred during processing")
                print(f"Check log: {PROCESSING_LOG}")
        
        print(f"\nOutput files:")
        print(f"  - {AUTO_MAPPINGS_FILE}")
        print(f"  - {REVIEW_MAPPINGS_FILE}")
        print(f"  - {REJECTED_MAPPINGS_FILE}")
    
    def _save_mappings(self, mappings: List[dict], filepath: Path):
        """Save mappings to JSON file"""
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(mappings, f, indent=2, ensure_ascii=False)


def main():
    parser = argparse.ArgumentParser(description="Classify YouTube videos for Open Agent School using Azure OpenAI")
    parser.add_argument('--csv', type=str, help='Path to CSV file with videos')
    parser.add_argument('--single', nargs=2, metavar=('TITLE', 'URL'), help='Classify a single video')
    parser.add_argument('--incremental', action='store_true', help='Only process new videos')
    parser.add_argument('--api-key', type=str, help='Azure OpenAI API key (or set AZURE_OPENAI_API_KEY env var)')
    parser.add_argument('--endpoint', type=str, help='Azure OpenAI endpoint (or set AZURE_OPENAI_ENDPOINT env var)')
    parser.add_argument('--deployment', type=str, help='Azure OpenAI deployment name (or set AZURE_OPENAI_DEPLOYMENT env var)')
    
    args = parser.parse_args()
    
    # Initialize classifier
    classifier = VideoClassifier(
        api_key=args.api_key,
        endpoint=args.endpoint,
        deployment=args.deployment
    )
    
    if args.single:
        # Single video mode
        title, url = args.single
        print(f"Classifying: {title}")
        mappings = classifier.classify_video(title, url)
        
        for mapping in mappings:
            print(f"\n{mapping.category_type.upper()}: {mapping.category_id}")
            print(f"  Confidence: {mapping.confidence}%")
            print(f"  Reasoning: {mapping.reasoning}")
            print(f"  Description: {mapping.suggested_description}")
    
    elif args.csv:
        # Batch mode
        csv_path = Path(args.csv)
        if not csv_path.exists():
            print(f"Error: CSV file not found: {csv_path}")
            return
        
        processor = VideoBatchProcessor(classifier)
        processor.process_csv(csv_path, incremental=args.incremental)
    
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
