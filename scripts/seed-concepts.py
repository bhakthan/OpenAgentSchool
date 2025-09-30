"""
Seed Test Concepts for Knowledge Base Testing
Creates mock concept data via direct API calls to port 8003
"""

import requests
import json
from datetime import datetime

# API Base URL
BASE_URL = "http://localhost:8003/api/v1"

# Test concepts to seed
TEST_CONCEPTS = [
    {
        "id": "agent-architecture",
        "title": "Agent Architecture Patterns",
        "description": "Core architectural patterns for building AI agents including ReAct, Chain-of-Thought, and Tool-Using agents. Learn how to structure agent systems for reliability and scalability.",
        "category": "architecture",
        "difficulty": "intermediate",
        "tags": ["architecture", "patterns", "design"],
        "learning_objectives": [
            "Understand ReAct and CoT patterns",
            "Design scalable agent systems",
            "Implement tool-using agents"
        ],
        "content": "Agent architecture defines how AI agents are structured and organized...",
        "prerequisites": ["llm-fundamentals"],
        "estimated_time": 45
    },
    {
        "id": "prompt-engineering",
        "title": "Prompt Engineering Fundamentals",
        "description": "Master the art of crafting effective prompts for Large Language Models. Learn techniques for few-shot learning, chain-of-thought prompting, and prompt optimization.",
        "category": "fundamentals",
        "difficulty": "beginner",
        "tags": ["prompts", "llm", "fundamentals"],
        "learning_objectives": [
            "Write clear and effective prompts",
            "Use few-shot examples",
            "Apply chain-of-thought techniques"
        ],
        "content": "Prompt engineering is the practice of designing inputs to elicit desired outputs from LLMs...",
        "prerequisites": [],
        "estimated_time": 30
    },
    {
        "id": "tool-calling",
        "title": "Tool Calling & Function Execution",
        "description": "Enable your AI agents to interact with external tools and APIs. Learn function calling patterns, error handling, and orchestration strategies.",
        "category": "patterns",
        "difficulty": "intermediate",
        "tags": ["tools", "functions", "integration"],
        "learning_objectives": [
            "Implement function calling",
            "Handle tool execution errors",
            "Orchestrate multi-tool workflows"
        ],
        "content": "Tool calling allows agents to extend their capabilities beyond text generation...",
        "prerequisites": ["prompt-engineering"],
        "estimated_time": 60
    },
    {
        "id": "agent-evaluation",
        "title": "Agent Evaluation & Testing",
        "description": "Comprehensive strategies for evaluating agent performance. Learn about benchmarks, metrics, and testing frameworks for production AI systems.",
        "category": "evaluation",
        "difficulty": "advanced",
        "tags": ["testing", "metrics", "quality"],
        "learning_objectives": [
            "Define evaluation metrics",
            "Build test suites",
            "Benchmark agent performance"
        ],
        "content": "Evaluating AI agents requires both quantitative metrics and qualitative assessment...",
        "prerequisites": ["agent-architecture", "tool-calling"],
        "estimated_time": 90
    },
    {
        "id": "agent-security",
        "title": "AI Agent Security & Safety",
        "description": "Protect your AI agents from prompt injection, jailbreaks, and other security threats. Implement safety guardrails and monitoring.",
        "category": "security",
        "difficulty": "advanced",
        "tags": ["security", "safety", "guardrails"],
        "learning_objectives": [
            "Prevent prompt injection attacks",
            "Implement safety guardrails",
            "Monitor agent behavior"
        ],
        "content": "Security is critical when deploying AI agents in production environments...",
        "prerequisites": ["agent-architecture"],
        "estimated_time": 75
    },
    {
        "id": "multi-agent-systems",
        "title": "Multi-Agent Collaboration",
        "description": "Build systems where multiple AI agents work together. Learn communication protocols, task distribution, and conflict resolution strategies.",
        "category": "architecture",
        "difficulty": "advanced",
        "tags": ["multi-agent", "collaboration", "distributed"],
        "learning_objectives": [
            "Design multi-agent systems",
            "Implement agent communication",
            "Coordinate distributed tasks"
        ],
        "content": "Multi-agent systems enable complex problem solving through agent collaboration...",
        "prerequisites": ["agent-architecture", "tool-calling"],
        "estimated_time": 120
    },
    {
        "id": "react-pattern",
        "title": "ReAct: Reasoning + Acting",
        "description": "Master the ReAct pattern that combines reasoning traces with action execution. Learn to build agents that think step-by-step while taking actions.",
        "category": "patterns",
        "difficulty": "intermediate",
        "tags": ["react", "reasoning", "patterns"],
        "learning_objectives": [
            "Understand ReAct framework",
            "Implement reasoning loops",
            "Combine thought and action"
        ],
        "content": "ReAct interleaves reasoning and acting, enabling agents to be more transparent and debuggable...",
        "prerequisites": ["prompt-engineering"],
        "estimated_time": 45
    },
    {
        "id": "memory-management",
        "title": "Agent Memory Systems",
        "description": "Implement short-term and long-term memory for your AI agents. Learn storage strategies, retrieval techniques, and context management.",
        "category": "architecture",
        "difficulty": "intermediate",
        "tags": ["memory", "storage", "context"],
        "learning_objectives": [
            "Design memory architectures",
            "Implement context windows",
            "Optimize retrieval systems"
        ],
        "content": "Effective memory management allows agents to maintain context across interactions...",
        "prerequisites": ["agent-architecture"],
        "estimated_time": 60
    }
]

# Related concepts mapping (concept_id -> [related_concept_ids])
RELATED_CONCEPTS = {
    "agent-architecture": ["react-pattern", "tool-calling", "memory-management"],
    "prompt-engineering": ["react-pattern", "tool-calling"],
    "tool-calling": ["agent-architecture", "react-pattern", "agent-evaluation"],
    "agent-evaluation": ["agent-security", "tool-calling"],
    "agent-security": ["agent-evaluation", "multi-agent-systems"],
    "multi-agent-systems": ["agent-architecture", "memory-management", "tool-calling"],
    "react-pattern": ["prompt-engineering", "agent-architecture"],
    "memory-management": ["agent-architecture", "multi-agent-systems"]
}

def seed_concepts():
    """Seed test concepts via API"""
    print("=" * 60)
    print("SEEDING TEST CONCEPTS FOR KNOWLEDGE BASE")
    print("=" * 60)
    print()
    
    # Note: Since the actual Knowledge Service doesn't have /concepts endpoints,
    # we'll create a mock concepts JSON file that the frontend can use temporarily
    
    print("⚠️  Knowledge Service uses document-based storage, not concept objects.")
    print("Creating mock concepts data file for frontend testing...")
    print()
    
    # Create mock API response format
    mock_data = {
        "concepts": TEST_CONCEPTS,
        "related": RELATED_CONCEPTS,
        "metadata": {
            "total": len(TEST_CONCEPTS),
            "categories": {
                "architecture": len([c for c in TEST_CONCEPTS if c["category"] == "architecture"]),
                "patterns": len([c for c in TEST_CONCEPTS if c["category"] == "patterns"]),
                "fundamentals": len([c for c in TEST_CONCEPTS if c["category"] == "fundamentals"]),
                "evaluation": len([c for c in TEST_CONCEPTS if c["category"] == "evaluation"]),
                "security": len([c for c in TEST_CONCEPTS if c["category"] == "security"])
            },
            "seeded_at": datetime.utcnow().isoformat()
        }
    }
    
    # Save to file
    output_file = "mock-concepts-data.json"
    with open(output_file, 'w') as f:
        json.dump(mock_data, f, indent=2)
    
    print(f"✅ Created {output_file} with {len(TEST_CONCEPTS)} test concepts")
    print()
    print("📊 Concepts by category:")
    for category, count in mock_data["metadata"]["categories"].items():
        print(f"   - {category}: {count}")
    print()
    print("💡 Next steps:")
    print("   1. Update frontend to use mock data OR")
    print("   2. Create proper concept endpoints in Knowledge Service OR")
    print("   3. Use Core API concept endpoints (if available)")
    print()
    
    # Try to verify Knowledge Service is running
    try:
        response = requests.get(f"{BASE_URL}/../health", timeout=2)
        if response.status_code == 200:
            print(f"✅ Knowledge Service is running on port 8003")
        else:
            print(f"⚠️  Knowledge Service returned status {response.status_code}")
    except Exception as e:
        print(f"❌ Cannot connect to Knowledge Service: {e}")
    
    print()
    print("=" * 60)
    print("SEED COMPLETE - USE MOCK DATA FOR TESTING")
    print("=" * 60)

if __name__ == "__main__":
    seed_concepts()
