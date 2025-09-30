#!/usr/bin/env python3
"""
Simple script to seed quiz questions using raw SQL
"""
import duckdb
from datetime import datetime

# Connect to database
db_path = "/app/data/openagent_core.duckdb"
conn = duckdb.connect(db_path)

# Sample quiz questions
questions = [
    {
        "question": "What is the primary benefit of the Parallelization pattern?",
        "options": '{"A": "Reduces memory usage", "B": "Improves processing speed for independent tasks", "C": "Simplifies code structure", "D": "Reduces network latency"}',
        "correct_answer": "B",
        "explanation": "Parallelization allows multiple independent tasks to run concurrently, significantly reducing overall processing time.",
        "category": "patterns",
        "difficulty": "medium"
    },
    {
        "question": "Which Azure service is best for implementing AI safety controls?",
        "options": '{"A": "Azure Monitor", "B": "Azure Content Safety", "C": "Azure Storage", "D": "Azure Functions"}',
        "correct_answer": "B",
        "explanation": "Azure Content Safety provides AI-powered content moderation to detect harmful content.",
        "category": "azure-services",
        "difficulty": "easy"
    },
    {
        "question": "In Prompt Chaining, what is the key principle?",
        "options": '{"A": "Running prompts in parallel", "B": "Using the output of one prompt as input for the next", "C": "Reducing prompt length", "D": "Increasing prompt complexity"}',
        "correct_answer": "B",
        "explanation": "Prompt Chaining breaks down complex tasks by feeding the output of one prompt as input to the next prompt in sequence.",
        "category": "patterns",
        "difficulty": "medium"
    },
    {
        "question": "What is the main purpose of agent evaluation frameworks?",
        "options": '{"A": "To measure model size", "B": "To assess agent performance across multiple dimensions", "C": "To reduce computational costs", "D": "To increase training speed"}',
        "correct_answer": "B",
        "explanation": "Agent evaluation frameworks provide systematic ways to measure agent performance across accuracy, reliability, safety, and other key metrics.",
        "category": "fundamentals",
        "difficulty": "medium"
    },
    {
        "question": "Which component is essential for multi-agent coordination?",
        "options": '{"A": "Large language models only", "B": "Communication protocols and shared state management", "C": "Single database access", "D": "Centralized control system"}',
        "correct_answer": "B",
        "explanation": "Multi-agent systems require well-defined communication protocols and mechanisms for managing shared state to coordinate effectively.",
        "category": "architecture",
        "difficulty": "advanced"
    },
    {
        "question": "What is the purpose of RAG (Retrieval-Augmented Generation)?",
        "options": '{"A": "To reduce model training time", "B": "To enhance LLM responses with relevant external information", "C": "To compress model weights", "D": "To increase inference speed"}',
        "correct_answer": "B",
        "explanation": "RAG retrieves relevant information from external sources and incorporates it into the LLM's generation process, improving accuracy and grounding.",
        "category": "patterns",
        "difficulty": "intermediate"
    },
    {
        "question": "Which is a key consideration for deploying agents in production?",
        "options": '{"A": "Monitoring, error handling, and graceful degradation", "B": "Only model accuracy", "C": "Training data size", "D": "Number of parameters"}',
        "correct_answer": "A",
        "explanation": "Production deployment requires robust monitoring, comprehensive error handling, and mechanisms for graceful degradation when components fail.",
        "category": "deployment",
        "difficulty": "intermediate"
    },
    {
        "question": "What is prompt engineering?",
        "options": '{"A": "Writing code for AI models", "B": "Crafting effective inputs to guide LLM behavior", "C": "Training neural networks", "D": "Optimizing model architecture"}',
        "correct_answer": "B",
        "explanation": "Prompt engineering is the practice of designing and refining inputs (prompts) to effectively guide large language models toward desired outputs.",
        "category": "fundamentals",
        "difficulty": "beginner"
    },
    {
        "question": "What does MCP (Model Context Protocol) enable?",
        "options": '{"A": "Faster model training", "B": "Standardized way for AI applications to connect to data sources", "C": "Model compression", "D": "Reduced inference costs"}',
        "correct_answer": "B",
        "explanation": "MCP provides a standardized protocol for AI applications to securely connect to various data sources and tools, enabling interoperability.",
        "category": "integration",
        "difficulty": "intermediate"
    },
    {
        "question": "What is fine-tuning in the context of LLMs?",
        "options": '{"A": "Adjusting hyperparameters during training", "B": "Training a pre-trained model on domain-specific data", "C": "Reducing model size", "D": "Increasing inference speed"}',
        "correct_answer": "B",
        "explanation": "Fine-tuning involves taking a pre-trained language model and continuing training on a smaller, domain-specific dataset to adapt it for specialized tasks.",
        "category": "advanced",
        "difficulty": "intermediate"
    }
]

print("=" * 60)
print("  Quiz Database Seeding (Raw DuckDB)")
print("=" * 60)
print()

# Check existing questions
existing = conn.execute("SELECT COUNT(*) FROM quiz_questions").fetchone()[0]
print(f"Existing questions in database: {existing}")
print()

# Insert questions
print(f"Inserting {len(questions)} quiz questions...")
for i, q in enumerate(questions, 1):
    conn.execute("""
        INSERT INTO quiz_questions (question, options, correct_answer, explanation, category, difficulty, created_at)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    """, (q["question"], q["options"], q["correct_answer"], q["explanation"], q["category"], q["difficulty"]))
    
    # Truncate question for display
    question_display = q["question"][:50] + "..." if len(q["question"]) > 50 else q["question"]
    print(f"  {i}. Added: {question_display} ({q['category']})")

print()
print("✅ Successfully seeded database!")
print()

# Verify
total = conn.execute("SELECT COUNT(*) FROM quiz_questions").fetchone()[0]
print(f"Total questions in database: {total}")
print()

# Show breakdown by category
print("Questions by category:")
categories = conn.execute("""
    SELECT category, COUNT(*) as count 
    FROM quiz_questions 
    GROUP BY category 
    ORDER BY count DESC
""").fetchall()

for cat, count in categories:
    print(f"  - {cat}: {count}")

conn.close()
