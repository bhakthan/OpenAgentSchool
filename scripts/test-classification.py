"""
Quick test of the video classification system
Tests the taxonomy extraction and classification logic without API calls
"""

import sys
import importlib.util
from pathlib import Path

# Load classify-videos.py module (can't use regular import due to hyphen in filename)
script_dir = Path(__file__).parent
classify_videos_path = script_dir / "classify-videos.py"

try:
    spec = importlib.util.spec_from_file_location("classify_videos", classify_videos_path)
    classify_videos = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(classify_videos)
    
    # Import the classes we need
    TaxonomyExtractor = classify_videos.TaxonomyExtractor
    VideoMapping = classify_videos.VideoMapping
except Exception as e:
    print(f"Error: Could not import classify-videos.py module: {e}")
    print("Make sure you're running from the scripts directory")
    sys.exit(1)

def test_taxonomy_extraction():
    """Test that taxonomy extraction works"""
    print("Testing Taxonomy Extraction...")
    print("=" * 70)
    
    # Extract concepts
    concepts = TaxonomyExtractor.extract_concepts()
    print(f"\n✅ Extracted {len(concepts)} concepts")
    print("\nSample concepts:")
    for concept in concepts[:5]:
        print(f"  - {concept.id}: {concept.title}")
    
    # Extract patterns
    patterns = TaxonomyExtractor.extract_patterns()
    print(f"\n✅ Extracted {len(patterns)} patterns")
    print("\nSample patterns:")
    for pattern in patterns[:5]:
        print(f"  - {pattern.id}: {pattern.title}")
    
    # Extract adoption playbooks
    adoption = TaxonomyExtractor.extract_adoption_playbooks()
    print(f"\n✅ Extracted {len(adoption)} adoption playbooks")
    print("\nAdoption playbooks:")
    for item in adoption:
        print(f"  - {item.id}: {item.title}")
    
    # Get all
    all_taxonomy = TaxonomyExtractor.get_all_taxonomy()
    print(f"\n📊 Total taxonomy items: {len(all_taxonomy)}")
    print(f"   - Concepts: {len([t for t in all_taxonomy if t.type == 'concept'])}")
    print(f"   - Patterns: {len([t for t in all_taxonomy if t.type == 'pattern'])}")
    print(f"   - Adoption: {len([t for t in all_taxonomy if t.type == 'adoption'])}")
    
    return len(all_taxonomy) > 0

def test_mapping_structure():
    """Test VideoMapping dataclass"""
    print("\n\nTesting VideoMapping Structure...")
    print("=" * 70)
    
    mapping = VideoMapping(
        video_title="Test Video about Multi-Agent Systems",
        video_url="https://youtube.com/test",
        category_type="concept",
        category_id="multi-agent-systems",
        category_name="Multi-Agent Systems",
        confidence=92,
        reasoning="Covers agent collaboration patterns",
        suggested_description="Overview of multi-agent coordination"
    )
    
    print("\n✅ Created sample mapping:")
    print(f"   Title: {mapping.video_title}")
    print(f"   Category: {mapping.category_type}/{mapping.category_id}")
    print(f"   Confidence: {mapping.confidence}%")
    print(f"   Reasoning: {mapping.reasoning}")
    
    return True

def test_sample_classification():
    """Show what a classification would look like"""
    print("\n\nSample Classification Output...")
    print("=" * 70)
    
    sample_videos = [
        ("DeepSeek R1 explained by DeepSeek-R1", "https://www.youtube.com/watch?v=CSZHyUBMH4E"),
        ("Magentic One - Generalist Multi-Agents", "https://www.youtube.com/watch?v=cVHRUrpst8E"),
        ("Microsoft Agent Framework #azure", "https://www.youtube.com/watch?v=7yVMzrrx29Y"),
    ]
    
    print("\nThese videos would be analyzed and potentially mapped to:")
    
    for title, url in sample_videos:
        print(f"\n📹 {title}")
        print(f"   URL: {url}")
        print(f"   Likely categories:")
        
        # Heuristic examples (not actual AI classification)
        if "multi-agent" in title.lower():
            print(f"      → Concept: multi-agent-systems (confidence: ~90%)")
            print(f"      → Pattern: orchestrator-worker (confidence: ~75%)")
        
        if "deepseek" in title.lower() or "reasoning" in title.lower():
            print(f"      → Concept: agent-learning (confidence: ~85%)")
            print(f"      → Pattern: deep-agents (confidence: ~80%)")
        
        if "azure" in title.lower() or "microsoft" in title.lower():
            print(f"      → Concept: agent-architecture (confidence: ~80%)")
            print(f"      → Adoption: architecture-platform-operations (confidence: ~70%)")

if __name__ == "__main__":
    print("\n" + "🧪 VIDEO CLASSIFICATION SYSTEM TEST".center(70))
    print("=" * 70)
    
    success = True
    
    try:
        success &= test_taxonomy_extraction()
        success &= test_mapping_structure()
        test_sample_classification()
        
        print("\n\n" + "=" * 70)
        if success:
            print("✅ ALL TESTS PASSED!")
            print("\nNext steps:")
            print("  1. Set your Azure OpenAI credentials:")
            print("     $env:AZURE_OPENAI_API_KEY = 'your-api-key'")
            print("     $env:AZURE_OPENAI_ENDPOINT = 'https://your-resource.openai.azure.com/'")
            print("     $env:AZURE_OPENAI_DEPLOYMENT = 'gpt-4o'")
            print("  2. Run classification:")
            print("     python scripts/classify-videos.py --csv path/to/YTLinks.csv")
        else:
            print("❌ SOME TESTS FAILED")
            print("Check the errors above")
        print("=" * 70)
        
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        import traceback
        traceback.print_exc()
