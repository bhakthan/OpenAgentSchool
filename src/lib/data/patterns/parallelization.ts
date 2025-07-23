import { PatternData } from './types';

export const parallelizationPattern: PatternData = {
  id: 'parallelization',
  name: 'Parallelization',
  description: 'Executes multiple independent tasks concurrently to improve speed and efficiency.',
  category: 'Execution',
  useCases: ['Batch Data Processing', 'Multiple API Calls', 'Simultaneous Simulations'],
  whenToUse: 'Use this pattern when you have multiple tasks that do not depend on each other and can be executed at the same time. It is ideal for I/O-bound or computationally intensive tasks that can be run in parallel.',
  businessUseCase: {
    industry: 'Data Analytics',
    description: 'A data analytics company needs to process thousands of customer reviews daily to extract sentiment, identify key topics, and check for compliance violations. A single sequential process is too slow. By using the Parallelization pattern, they can process hundreds of reviews simultaneously, reducing the total processing time from hours to minutes.',
    enlightenMePrompt: 'Provide a technical guide on implementing parallel processing for AI agents using Python.',
  },
  nodes: [],
  edges: [],
  codeExample: `// Parallelization Pattern implementation...`,
  pythonCodeExample: `import asyncio

# Assume llm_call is an async function that calls a language model
async def analyze_review(review: str) -> dict:
    """Analyzes a single customer review for sentiment, topics, and compliance."""
    prompt = f"""
    Analyze the following review and return a JSON object with 'sentiment', 'topics', and 'compliance_issues'.
    Review: "{review}"
    """
    analysis = await llm_call(prompt)
    return analysis

async def process_reviews_in_parallel(reviews: list[str]) -> list[dict]:
    """Processes a batch of reviews in parallel using asyncio."""
    tasks = [analyze_review(review) for review in reviews]
    results = await asyncio.gather(*tasks)
    return results

# Example Usage
# async def main():
#     customer_reviews = [
#         "The product is amazing, I love it!",
#         "The shipping was late and the box was damaged.",
#         "This is a great value for the price, highly recommend.",
#         # ... thousands more reviews
#     ]
#     analyzed_reviews = await process_reviews_in_parallel(customer_reviews)
#     for review, analysis in zip(customer_reviews, analyzed_reviews):
#         print(f"Review: {review}\nAnalysis: {analysis}\n---")
`,
  implementation: [],
  advantages: [],
  limitations: [],
  relatedPatterns: []
};