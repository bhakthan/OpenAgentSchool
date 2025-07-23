import { PatternData } from './types';
import { LegalResearchVisual } from '@/components/visualization/business-use-cases/LegalResearchVisual';

export const deepResearcherPattern: PatternData = {
  id: 'deep-researcher',
  name: 'Deep Researcher',
  description: 'A comprehensive research agent that iteratively generates questions, gathers information from multiple sources, and synthesizes the findings into a detailed report.',
  category: 'Advanced',
  useCases: ['Academic Research', 'Market Analysis', 'Legal Case Analysis', 'Investigative Journalism'],
  whenToUse: 'Use the Deep Researcher pattern for tasks that require exhaustive, evidence-based investigation. It is ideal for scenarios where a simple search is insufficient and you need to explore a topic from multiple angles, identify themes, and uncover deep insights from a large corpus of information.',
  businessUseCase: {
    industry: 'Legal & Professional Services',
    description: 'A law firm uses a "Deep Researcher" agent to assist with case preparation. A paralegal provides an initial case file and asks the agent to "find all relevant precedents for autonomous vehicle liability." The agent first generates a set of research questions. It then scours internal document repositories, external legal databases (like Westlaw or LexisNexis), and academic journals. It synthesizes the findings, identifies conflicting rulings, and generates a detailed memo complete with citations. This allows the legal team to build a stronger case in a fraction of the time.',
    visualization: LegalResearchVisual,
    enlightenMePrompt: `
      Provide a deep-technical guide for an AI Architect on implementing an "AI Legal Research Assistant" using the Deep Researcher pattern on Azure.

      Your response should be structured with the following sections, using Markdown for formatting:

      ### 1. Architectural Blueprint
      - Provide a detailed architecture diagram.
      - Components: Azure Logic Apps (to orchestrate the research workflow), Azure Functions (for individual agent skills like planning, searching, and synthesizing), Azure AI Search (for internal documents), and connectors to external legal databases (e.g., Westlaw API).
      - Show the iterative loop where the agent generates questions, searches, and synthesizes.

      ### 2. Deep Researcher Agent: Implementation
      - Provide a Python code example for the main research loop.
      - Show the "Planner" prompt that takes the initial query and generates a set of specific research questions.
      - Show the "Synthesizer" prompt that takes a collection of retrieved text chunks and synthesizes them into a coherent argument, identifying themes and gaps.

      ### 3. Source Management & Credibility
      - Explain how the agent can be programmed to prioritize sources based on a credibility score (e.g., a Supreme Court ruling is more credible than a blog post).
      - Describe how to handle and cite information from different sources properly.

      ### 4. Evaluation Strategy
      - Detail the evaluation plan for the research output.
      - **Comprehensiveness:** Did the agent find all the key precedents that a human expert would have found? This requires a "gold standard" set created by legal experts.
      - **Faithfulness:** Does the generated memo accurately represent the findings from the source documents? Use an LLM-as-Judge to check for hallucinations or misinterpretations.
      - **Efficiency:** How long did the research take, and what was the associated cost (API calls, compute)?

      ### 5. Security & Confidentiality
      - Discuss the critical importance of confidentiality in a legal setting.
      - Explain how to use Azure private networking and managed identities to ensure that confidential case data is never exposed to the public internet.
    `
  },
  nodes: [
    {
      id: 'research-query',
      type: 'input',
      data: { label: 'Research Query', nodeType: 'input' },
      position: { x: 100, y: 300 }
    },
    {
      id: 'query-planner',
      type: 'default',
      data: { label: 'Query Planner', nodeType: 'planner' },
      position: { x: 300, y: 300 }
    },
    {
      id: 'source-finder',
      type: 'default',
      data: { label: 'Source Finder', nodeType: 'tool' },
      position: { x: 500, y: 200 }
    },
    {
      id: 'content-extractor',
      type: 'default',
      data: { label: 'Content Extractor', nodeType: 'tool' },
      position: { x: 500, y: 300 }
    },
    {
      id: 'fact-checker',
      type: 'default',
      data: { label: 'Fact Checker', nodeType: 'evaluator' },
      position: { x: 500, y: 400 }
    },
    {
      id: 'synthesizer',
      type: 'default',
      data: { label: 'Research Synthesizer', nodeType: 'aggregator' },
      position: { x: 700, y: 300 }
    },
    {
      id: 'validator',
      type: 'default',
      data: { label: 'Evidence Validator', nodeType: 'evaluator' },
      position: { x: 900, y: 300 }
    },
    {
      id: 'report-generator',
      type: 'default',
      data: { label: 'Report Generator', nodeType: 'llm' },
      position: { x: 1100, y: 300 }
    },
    {
      id: 'research-output',
      type: 'output',
      data: { label: 'Research Report', nodeType: 'output' },
      position: { x: 1300, y: 300 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'research-query', target: 'query-planner', animated: true },
    { id: 'e2-3', source: 'query-planner', target: 'source-finder', animated: true },
    { id: 'e2-4', source: 'query-planner', target: 'content-extractor', animated: true },
    { id: 'e3-4', source: 'source-finder', target: 'content-extractor', animated: true },
    { id: 'e4-5', source: 'content-extractor', target: 'fact-checker', animated: true },
    { id: 'e4-6', source: 'content-extractor', target: 'synthesizer', animated: true },
    { id: 'e5-6', source: 'fact-checker', target: 'synthesizer', animated: true },
    { id: 'e6-7', source: 'synthesizer', target: 'validator', animated: true },
    { id: 'e7-8', source: 'validator', target: 'report-generator', animated: true },
    { id: 'e8-9', source: 'report-generator', target: 'research-output' },
    { id: 'e7-2', source: 'validator', target: 'query-planner', animated: true, label: 'Gaps Found' }
  ],
  codeExample: `// Deep Researcher Pattern implementation...`,
  pythonCodeExample: `import asyncio
from typing import List, Dict

# Assume the existence of these helper functions/classes
# - llm_call: A function to call a language model
# - search_tool: A function to search a knowledge base or the web
# - document_store: A class to manage and retrieve documents

class DeepResearcher:
    def __init__(self, document_store):
        self.document_store = document_store
        self.research_log = []

    async def plan_research(self, initial_query: str) -> List[str]:
        """Generates a set of research questions based on the initial query."""
        prompt = f"""
        Based on the initial query "{initial_query}", generate a list of 5-7 specific research questions 
        that will lead to a comprehensive answer. Focus on different facets of the topic.
        Return a Python list of strings.
        """
        response = await llm_call(prompt)
        self.research_log.append({"step": "Planning", "questions": response})
        return eval(response) # In a real scenario, use a safer parsing method

    async def execute_search(self, question: str) -> List[Dict]:
        """Executes a search for a given question and retrieves relevant documents."""
        search_results = await search_tool(question)
        documents = await self.document_store.retrieve_batch(search_results)
        self.research_log.append({"step": "Searching", "question": question, "found": len(documents)})
        return documents

    async def synthesize_findings(self, question: str, documents: List[Dict]) -> str:
        """Synthesizes a coherent answer from a set of documents."""
        context = "\n\n".join([doc['content'] for doc in documents])
        prompt = f"""
        Based on the following documents, provide a detailed and comprehensive answer to the question: "{question}".
        Cite your sources using the document IDs provided. If the documents do not contain the answer,
        state that and identify what information is missing.

        Documents:
        {context}
        """
        synthesis = await llm_call(prompt)
        self.research_log.append({"step": "Synthesizing", "question": question, "synthesis": synthesis[:100] + "..."})
        return synthesis

    async def run(self, initial_query: str) -> str:
        """Runs the entire deep research process."""
        research_questions = await self.plan_research(initial_query)
        
        all_syntheses = []
        for question in research_questions:
            documents = await self.execute_search(question)
            if documents:
                synthesis = await self.synthesize_findings(question, documents)
                all_syntheses.append(synthesis)

        # Final synthesis of all findings
        final_context = "\n\n---\n\n".join(all_syntheses)
        final_prompt = f"""
        You are a world-class research analyst. Based on the following research findings, 
        write a final, comprehensive report that answers the initial query: "{initial_query}".
        Structure your report with a clear introduction, body, and conclusion.

        Research Findings:
        {final_context}
        """
        final_report = await llm_call(final_prompt)
        self.research_log.append({"step": "Final Report", "query": initial_query})
        return final_report

# Example Usage (conceptual)
# async def main():
#     doc_store = DocumentStore()
#     researcher = DeepResearcher(doc_store)
#     report = await researcher.run("What are the ethical implications of autonomous AI agents?")
#     print(report)
#     print("--- Research Log ---")
#     for entry in researcher.research_log:
#         print(entry)
`,
  implementation: [
    'Design multi-source research strategy',
    'Create source discovery and validation system',
    'Implement content extraction and filtering',
    'Build fact-checking and validation pipeline',
    'Add research synthesis and analysis',
    'Create comprehensive report generation',
    'Implement research history and learning',
    'Add citation and reference management'
  ],
  advantages: [
    "Can produce comprehensive, in-depth reports on complex topics.",
    "Able to synthesize information from a wide variety of sources.",
    "The iterative question-generation process helps uncover hidden insights.",
    "Reduces the time required for manual research tasks significantly."
  ],
  limitations: [
    "Can be very slow and expensive due to the large number of LLM calls and tool uses.",
    "Highly dependent on the quality and accessibility of the information sources.",
    "The complexity of the agent can make it difficult to debug when it fails.",
    "May get stuck in a loop of generating questions without converging on a final report."
  ],
  relatedPatterns: [
    "agentic-rag",
    "react-agent",
    "self-reflection"
  ]
};