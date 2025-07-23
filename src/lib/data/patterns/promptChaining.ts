import { PatternData } from './types';

export const promptChainingPattern: PatternData = {
  id: 'prompt-chaining',
  name: 'Prompt Chaining',
  description: 'Breaks down a complex task into a series of smaller, interconnected prompts, where the output of one prompt is the input for the next.',
  category: 'Orchestration',
  useCases: ['Creative Writing', 'Complex Problem Solving', 'Code Generation'],
  whenToUse: 'Use this pattern when a single prompt is not sufficient to achieve the desired output. It is ideal for tasks that require a sequence of reasoning steps, transformations, or creative expansions.',
  businessUseCase: {
    industry: 'Marketing',
    description: 'A marketing team wants to generate a complete ad campaign for a new product. Using Prompt Chaining, they first generate a list of target audience personas. Then, they feed those personas into a second prompt to generate key marketing messages. Finally, they use those messages in a third prompt to write the ad copy for different platforms.',
    enlightenMePrompt: 'Provide a technical guide on implementing prompt chaining for AI agents using Python.',
  },
  nodes: [],
  edges: [],
  codeExample: `// Prompt Chaining Pattern implementation...`,
  pythonCodeExample: `import asyncio

# Assume llm_call is an async function that calls a language model
async def generate_personas(product_description: str) -> str:
    """Step 1: Generate target audience personas."""
    prompt = f"""
    Based on the product description "{product_description}", generate 3 distinct target audience personas.
    Return a numbered list.
    """
    return await llm_call(prompt)

async def generate_marketing_messages(personas: str, product_description: str) -> str:
    """Step 2: Generate key marketing messages based on personas."""
    prompt = f"""
    For the product "{product_description}", generate a key marketing message for each of these personas:
    {personas}
    Return a numbered list of messages.
    """
    return await llm_call(prompt)

async def generate_ad_copy(messages: str, product_description: str) -> str:
    """Step 3: Generate ad copy based on marketing messages."""
    prompt = f"""
    Using the product description "{product_description}" and these key messages:
    {messages}
    Write a short, catchy ad copy for a social media post.
    """
    return await llm_call(prompt)

# Example Usage
# async def main():
#     product = "A smart coffee mug that keeps your drink at the perfect temperature."
#     
#     # Chain the prompts together
#     personas = await generate_personas(product)
#     print(f"--- Personas ---\n{personas}")
#     
#     messages = await generate_marketing_messages(personas, product)
#     print(f"--- Marketing Messages ---\n{messages}")
#     
#     ad_copy = await generate_ad_copy(messages, product)
#     print(f"--- Ad Copy ---\n{ad_copy}")
`,
  implementation: [],
  advantages: [],
  limitations: [],
  relatedPatterns: []
};