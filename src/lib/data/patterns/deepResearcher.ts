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
  pythonCodeExample: `# Deep Researcher Pattern implementation...`,
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