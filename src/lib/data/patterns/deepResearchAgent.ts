import { PatternData } from './types';

export const deepResearchAgentPattern: PatternData = {
  id: 'deep-research-agent',
  name: 'Deep Research Agent',
  description: 'An autonomous multi-step research agent that iteratively plans investigations, formulates queries, synthesizes information from multiple sources, identifies knowledge gaps, and generates comprehensive reports with citations.',
  category: 'Advanced',
  useCases: [
    'Financial due diligence - aggregating market signals, competitor analysis, and compliance risks',
    'Biomedical literature review - synthesizing findings across research papers and clinical data',
    'Market research - comprehensive industry analysis with source triangulation',
    'Legal research - case law analysis with citation chains and precedent mapping',
    'Technical documentation synthesis - combining specs, tutorials, and community knowledge'
  ],
  whenToUse: 'Deploy when you need exhaustive, multi-step information gathering that requires reasoning across multiple sources, iterative refinement of search queries, and comprehensive report generation with verifiable citations.',
  businessUseCase: {
    industry: 'Financial Services & Investment Research',
    description: 'Investment teams use Deep Research Agent to automate preliminary due diligence. The agent aggregates market signals, competitor analysis, regulatory filings, and compliance risks from web and proprietary sources. What previously took days of analyst time now completes in hours, with comprehensive sourcing and citation chains that enable rapid verification.',
    visualization: () => null as any,
    enlightenMePrompt: `
Design a Deep Research Agent architecture for investment due diligence.

Provide:
- Multi-step research planning with iterative query refinement and knowledge gap identification.
- Integration with web search APIs, document stores (PDFs, spreadsheets), and structured databases.
- Report generation pipeline with granular citations, confidence scoring, and source categorization.
- Parallel trajectory exploration for answer verification (pass@k strategy).
- Evaluation harness using comprehensiveness metrics (recall over exhaustive answer sets).
- Cost optimization: balance between search depth, token usage, and time-to-completion.
`
  },
  nodes: [
    {
      id: 'research-query',
      type: 'input',
      data: { label: 'Research Query', nodeType: 'input', description: 'Complex question requiring multi-step investigation' },
      position: { x: 100, y: 300 }
    },
    {
      id: 'context-docs',
      type: 'input',
      data: { label: 'Context Documents', nodeType: 'input', description: 'PDFs, spreadsheets, background docs' },
      position: { x: 100, y: 420 }
    },
    {
      id: 'research-planner',
      type: 'default',
      data: { label: 'Research Planner', nodeType: 'planner', description: 'Decomposes query into investigation steps' },
      position: { x: 340, y: 300 }
    },
    {
      id: 'query-generator',
      type: 'default',
      data: { label: 'Query Generator', nodeType: 'llm', description: 'Formulates search queries for each step' },
      position: { x: 340, y: 420 }
    },
    {
      id: 'web-search',
      type: 'default',
      data: { label: 'Web Search', nodeType: 'tool', description: 'Deep web navigation and content extraction' },
      position: { x: 580, y: 300 }
    },
    {
      id: 'file-search',
      type: 'default',
      data: { label: 'File Search', nodeType: 'tool', description: 'RAG over uploaded documents' },
      position: { x: 580, y: 420 }
    },
    {
      id: 'knowledge-synthesizer',
      type: 'default',
      data: { label: 'Knowledge Synthesizer', nodeType: 'llm', description: 'Aggregates and reasons over findings' },
      position: { x: 820, y: 360 }
    },
    {
      id: 'gap-detector',
      type: 'default',
      data: { label: 'Gap Detector', nodeType: 'evaluator', description: 'Identifies missing information, triggers re-search' },
      position: { x: 820, y: 500 }
    },
    {
      id: 'report-generator',
      type: 'default',
      data: { label: 'Report Generator', nodeType: 'llm', description: 'Structures findings with citations' },
      position: { x: 1060, y: 360 }
    },
    {
      id: 'research-report',
      type: 'output',
      data: { label: 'Research Report', nodeType: 'output', description: 'Comprehensive report with granular sourcing' },
      position: { x: 1300, y: 360 }
    }
  ],
  edges: [
    { id: 'edge-query-planner', source: 'research-query', target: 'research-planner', animated: true },
    { id: 'edge-docs-planner', source: 'context-docs', target: 'research-planner', animated: true },
    { id: 'edge-planner-querygen', source: 'research-planner', target: 'query-generator', animated: true, label: 'Investigation steps' },
    { id: 'edge-querygen-web', source: 'query-generator', target: 'web-search', animated: true },
    { id: 'edge-querygen-file', source: 'query-generator', target: 'file-search', animated: true },
    { id: 'edge-web-synth', source: 'web-search', target: 'knowledge-synthesizer', animated: true, label: 'Web findings' },
    { id: 'edge-file-synth', source: 'file-search', target: 'knowledge-synthesizer', animated: true, label: 'Doc findings' },
    { id: 'edge-synth-gap', source: 'knowledge-synthesizer', target: 'gap-detector', animated: true },
    { id: 'edge-gap-querygen', source: 'gap-detector', target: 'query-generator', animated: true, label: 'Refine queries', style: { strokeDasharray: '5,5' } },
    { id: 'edge-synth-report', source: 'knowledge-synthesizer', target: 'report-generator', animated: true },
    { id: 'edge-report-output', source: 'report-generator', target: 'research-report', animated: true }
  ],
  codeExample: `# Python: Deep Research Agent with Gemini API
from google import genai
from google.genai import types

# Initialize client with API key
client = genai.Client(api_key="YOUR_GEMINI_API_KEY")

async def run_deep_research(query: str, context_files: list = None):
    """
    Execute deep research using Gemini's Interactions API.
    Based on Google's Deep Research agent architecture.
    """
    
    # Configure the research agent
    config = types.InteractionConfig(
        response_modalities=["TEXT"],
        tools=[
            types.Tool(google_search=types.GoogleSearch()),  # Web search
            types.Tool(file_search=types.FileSearch())       # Document RAG
        ],
        system_instruction="""You are a thorough research agent.
        
For each query:
1. Plan your investigation - decompose into sub-questions
2. Search iteratively - formulate queries, read results, identify gaps
3. Navigate deep into sites for specific data
4. Synthesize findings with source triangulation
5. Generate comprehensive report with granular citations

Always verify claims from multiple sources when possible.
Structure reports with clear sections and inline citations."""
    )
    
    # Upload context documents if provided
    file_refs = []
    if context_files:
        for file_path in context_files:
            uploaded = await client.files.upload(file_path)
            file_refs.append(uploaded)
    
    # Start the research interaction
    interaction = await client.interactions.create(
        model="gemini-deep-research",
        config=config
    )
    
    # Send the research query with any context files
    messages = [
        types.Content(
            role="user",
            parts=[types.Part(text=query)] + 
                  [types.Part(file_data=f) for f in file_refs]
        )
    ]
    
    # Stream the research process
    async for event in interaction.send_message_stream(messages):
        if event.type == "thinking":
            print(f"[Planning] {event.content}")
        elif event.type == "tool_call":
            print(f"[Searching] {event.tool_name}: {event.query}")
        elif event.type == "content":
            yield event.text
    
    # Get final report with citations
    report = await interaction.get_response()
    return {
        "report": report.text,
        "citations": report.citations,
        "search_count": report.metadata.get("search_count"),
        "sources_consulted": report.metadata.get("sources")
    }

# TypeScript: Integration with Interactions API
import { GoogleGenAI } from "@google/genai";

interface ResearchResult {
  report: string;
  citations: Citation[];
  searchCount: number;
  sources: string[];
}

export async function deepResearch(
  query: string,
  contextFiles?: File[]
): Promise<ResearchResult> {
  const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  // Create research interaction
  const interaction = await client.interactions.create({
    model: "gemini-deep-research",
    config: {
      tools: [
        { googleSearch: {} },
        { fileSearch: {} }
      ],
      systemInstruction: \`
        Conduct thorough multi-step research.
        Iterate: plan → search → synthesize → identify gaps → search again.
        Provide comprehensive reports with inline citations.
        Navigate deep into websites for specific data.
      \`
    }
  });
  
  // Upload context documents
  const fileRefs = await Promise.all(
    (contextFiles || []).map(f => client.files.upload(f))
  );
  
  // Execute research
  const response = await interaction.sendMessage({
    content: [
      { text: query },
      ...fileRefs.map(f => ({ fileData: f }))
    ]
  });
  
  return {
    report: response.text,
    citations: response.citations,
    searchCount: response.metadata.searchCount,
    sources: response.metadata.sources
  };
}`,
  pythonCodeExample: `# Complete Deep Research Agent Implementation
# Based on DeepSearchQA benchmark starter code
import asyncio
from dataclasses import dataclass
from typing import List, Optional
from google import genai
from google.genai import types

@dataclass
class ResearchPlan:
    """Decomposed research plan with sub-questions"""
    main_query: str
    sub_questions: List[str]
    search_strategy: str
    expected_sources: List[str]

@dataclass 
class ResearchFinding:
    """Individual finding with source attribution"""
    content: str
    source_url: str
    confidence: float
    verification_status: str  # 'verified', 'single-source', 'conflicting'

@dataclass
class ResearchReport:
    """Final research report with citations"""
    summary: str
    sections: List[dict]
    findings: List[ResearchFinding]
    knowledge_gaps: List[str]
    search_count: int
    sources_consulted: int

class DeepResearchAgent:
    """
    Autonomous multi-step research agent using Gemini Deep Research.
    
    Architecture based on Google's Deep Research agent:
    - Iterative planning and query refinement
    - Multi-source search (web + documents)
    - Knowledge gap detection and re-search
    - Comprehensive report generation with citations
    
    References:
    - https://blog.google/technology/developers/deep-research-agent-gemini-api/
    - https://www.kaggle.com/code/andrewmingwang/deepsearchqa-starter-code
    """
    
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)
        self.model = "gemini-deep-research"
        self.max_search_iterations = 10
        self.parallel_trajectories = 8  # pass@k for answer verification
        
    async def plan_research(self, query: str) -> ResearchPlan:
        """Decompose complex query into investigation steps"""
        planning_prompt = f"""
        Analyze this research query and create an investigation plan:
        
        Query: {query}
        
        Provide:
        1. List of 3-7 sub-questions to answer
        2. Recommended search strategy (breadth-first vs depth-first)
        3. Expected source types (academic, news, official docs, forums)
        """
        
        response = await self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=planning_prompt
        )
        
        # Parse structured plan from response
        return self._parse_research_plan(response.text, query)
    
    async def execute_search_iteration(
        self, 
        sub_question: str,
        previous_findings: List[ResearchFinding]
    ) -> List[ResearchFinding]:
        """Execute one search iteration with gap detection"""
        
        # Generate refined query based on gaps
        context = "\\n".join([f.content[:200] for f in previous_findings[-5:]])
        
        search_config = types.InteractionConfig(
            tools=[types.Tool(google_search=types.GoogleSearch())],
            system_instruction=f"""
            Search for: {sub_question}
            
            Previous findings context:
            {context}
            
            Focus on:
            - Information NOT already covered
            - Contradictory evidence if any
            - Primary sources over secondary
            - Recent data (prefer last 2 years)
            """
        )
        
        interaction = await self.client.interactions.create(
            model=self.model,
            config=search_config
        )
        
        response = await interaction.send_message({
            "content": [{"text": sub_question}]
        })
        
        return self._extract_findings(response)
    
    async def synthesize_findings(
        self,
        findings: List[ResearchFinding],
        original_query: str
    ) -> ResearchReport:
        """Synthesize all findings into comprehensive report"""
        
        findings_text = "\\n\\n".join([
            f"Source: {f.source_url}\\nContent: {f.content}\\nConfidence: {f.confidence}"
            for f in findings
        ])
        
        synthesis_prompt = f"""
        Generate a comprehensive research report.
        
        Original Query: {original_query}
        
        Collected Findings:
        {findings_text}
        
        Requirements:
        1. Executive summary (2-3 paragraphs)
        2. Detailed sections with inline citations [1], [2], etc.
        3. Data tables where applicable
        4. Identify any remaining knowledge gaps
        5. Confidence assessment for key claims
        
        Format as structured JSON with sections array.
        """
        
        response = await self.client.models.generate_content(
            model="gemini-2.5-pro",
            contents=synthesis_prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        
        return self._parse_report(response.text, findings)
    
    async def research(
        self,
        query: str,
        context_files: Optional[List[str]] = None,
        max_iterations: int = None
    ) -> ResearchReport:
        """
        Execute complete deep research workflow.
        
        Args:
            query: Complex research question
            context_files: Optional PDFs/docs to include
            max_iterations: Override default search depth
            
        Returns:
            Comprehensive research report with citations
        """
        max_iter = max_iterations or self.max_search_iterations
        
        # Phase 1: Plan the investigation
        plan = await self.plan_research(query)
        print(f"[Plan] {len(plan.sub_questions)} sub-questions identified")
        
        # Phase 2: Iterative search with gap detection
        all_findings: List[ResearchFinding] = []
        
        for iteration in range(max_iter):
            # Select next sub-question or refine based on gaps
            if iteration < len(plan.sub_questions):
                current_question = plan.sub_questions[iteration]
            else:
                # Detect knowledge gaps and generate new queries
                gaps = await self._detect_knowledge_gaps(all_findings, query)
                if not gaps:
                    print(f"[Complete] No more knowledge gaps after {iteration} iterations")
                    break
                current_question = gaps[0]
            
            print(f"[Search {iteration+1}] {current_question[:80]}...")
            
            # Execute search
            new_findings = await self.execute_search_iteration(
                current_question, 
                all_findings
            )
            all_findings.extend(new_findings)
            
            # Parallel trajectory exploration for verification
            if iteration % 3 == 0 and self.parallel_trajectories > 1:
                verification_findings = await self._parallel_verify(
                    current_question,
                    new_findings
                )
                all_findings.extend(verification_findings)
        
        # Phase 3: Synthesize into report
        print(f"[Synthesize] {len(all_findings)} findings from {iteration+1} iterations")
        report = await self.synthesize_findings(all_findings, query)
        
        return report
    
    async def _detect_knowledge_gaps(
        self, 
        findings: List[ResearchFinding],
        original_query: str
    ) -> List[str]:
        """Identify missing information that requires additional search"""
        gap_prompt = f"""
        Analyze these research findings for the query: {original_query}
        
        Findings summary:
        {chr(10).join([f.content[:150] for f in findings[-10:]])}
        
        What critical information is still missing?
        List 1-3 specific questions that would fill the gaps.
        If research is comprehensive, return empty list.
        """
        
        response = await self.client.models.generate_content(
            model="gemini-2.5-flash",
            contents=gap_prompt
        )
        
        return self._parse_gap_questions(response.text)
    
    async def _parallel_verify(
        self,
        question: str,
        findings: List[ResearchFinding]
    ) -> List[ResearchFinding]:
        """Run parallel search trajectories for answer verification (pass@k)"""
        verification_queries = [
            f"verify: {question}",
            f"alternative perspective: {question}",
            f"contradicting evidence: {question}"
        ]
        
        tasks = [
            self.execute_search_iteration(q, findings)
            for q in verification_queries[:self.parallel_trajectories]
        ]
        
        results = await asyncio.gather(*tasks)
        return [f for findings_list in results for f in findings_list]
    
    def _parse_research_plan(self, text: str, query: str) -> ResearchPlan:
        # Implementation: parse LLM response into structured plan
        return ResearchPlan(
            main_query=query,
            sub_questions=text.split("\\n")[:5],
            search_strategy="depth-first",
            expected_sources=["web", "documents"]
        )
    
    def _extract_findings(self, response) -> List[ResearchFinding]:
        # Implementation: extract findings from search response
        return []
    
    def _parse_report(self, json_text: str, findings: List[ResearchFinding]) -> ResearchReport:
        # Implementation: parse JSON response into report structure
        return ResearchReport(
            summary="",
            sections=[],
            findings=findings,
            knowledge_gaps=[],
            search_count=len(findings),
            sources_consulted=len(set(f.source_url for f in findings))
        )
    
    def _parse_gap_questions(self, text: str) -> List[str]:
        # Implementation: extract gap questions from response
        lines = [l.strip() for l in text.split("\\n") if l.strip()]
        return [l for l in lines if "?" in l][:3]


# Usage example
async def main():
    agent = DeepResearchAgent(api_key="YOUR_API_KEY")
    
    report = await agent.research(
        query="What are the key technical differences between quantum annealing "
              "and gate-based quantum computing for optimization problems, and "
              "which approach is more promising for near-term practical applications?",
        max_iterations=8
    )
    
    print(f"\\n{'='*60}")
    print(f"RESEARCH REPORT")
    print(f"{'='*60}")
    print(f"\\nSummary:\\n{report.summary}")
    print(f"\\nSources consulted: {report.sources_consulted}")
    print(f"Search iterations: {report.search_count}")
    print(f"\\nKnowledge gaps remaining: {report.knowledge_gaps}")

if __name__ == "__main__":
    asyncio.run(main())`,
  implementation: [
    'Set up Gemini API access with Interactions API enabled - obtain API key from Google AI Studio.',
    'Implement research planning phase: decompose complex queries into 3-7 sub-questions with search strategy.',
    'Configure multi-tool access: Google Search for web, File Search for uploaded documents (PDFs, CSVs).',
    'Build iterative search loop with knowledge gap detection - continue searching until gaps are filled or max iterations reached.',
    'Implement parallel trajectory exploration (pass@k) for answer verification on critical findings.',
    'Create report generation pipeline with structured output (JSON schema), inline citations, and confidence scoring.',
    'Set up evaluation using DeepSearchQA benchmark metrics: comprehensiveness (recall over exhaustive answer sets).',
    'Monitor costs and optimize: balance search depth vs token usage, cache intermediate findings.'
  ],
  advantages: [
    'Achieves state-of-the-art results on research benchmarks (46.4% on Humanity\'s Last Exam, 66.1% on DeepSearchQA).',
    'Autonomous multi-step reasoning - plans investigation, identifies gaps, refines queries iteratively.',
    'Deep web navigation - goes beyond surface results to extract specific data from within sites.',
    'Comprehensive sourcing with granular citations - enables verification of all claims.',
    'Unified synthesis across web search and uploaded documents (PDFs, spreadsheets, docs).',
    'Parallel trajectory exploration improves answer quality through verification (pass@8 vs pass@1).',
    'Structured output support (JSON schema) for downstream application integration.',
    'Dramatically reduces research time: days to hours for complex due diligence tasks.'
  ],
  limitations: [
    'Higher latency for complex queries - deep research can take minutes for thorough investigation.',
    'API costs scale with search depth and parallel trajectories - requires cost monitoring.',
    'May not access paywalled or login-protected content without additional configuration.',
    'Knowledge cutoff affects ability to find very recent information not yet indexed.',
    'Requires careful prompt engineering to guide report structure and focus areas.',
    'Verification of synthesized findings still recommended for high-stakes decisions.'
  ],
  relatedPatterns: [
    'agentic-rag',
    'deep-researcher',
    'orchestrator-worker',
    'evaluator-optimizer',
    'self-reflection'
  ],

  velocityProfile: {
    impact: 'high',
    timeToImplement: '1-2 days',
    complexityReduction: 'High - Replaces manual multi-hour research workflows with automated agent execution',
    reusabilityScore: 9,
    learningCurve: 'moderate',
    velocityPractices: [
      'Pattern Fluency - Universal applicability across research-intensive domains (finance, legal, biotech, market analysis)',
      'Architecture Templates - Gemini Interactions API + Google Search + File Search composition',
      'Incremental Delivery - Start with simple queries, progressively enable gap detection and parallel verification',
      'Failure Scenario Libraries - Search timeout, rate limiting, empty results, conflicting sources handling',
      'Operational Instrumentation - Track search iterations, sources consulted, report quality scores, cost per query'
    ]
  },

  evaluation: 'Evaluate using DeepSearchQA benchmark (comprehensiveness over causal chain tasks) and domain-specific quality rubrics for report accuracy, citation validity, and knowledge coverage.',
  
  evaluationProfile: {
    scenarioFocus: 'Multi-step autonomous research with comprehensive information synthesis',
    criticalMetrics: [
      'DeepSearchQA score (comprehensiveness recall)',
      'Citation accuracy (% of claims with valid sources)',
      'Knowledge coverage (% of sub-questions answered)',
      'Search efficiency (findings per iteration)',
      'Report quality score (human evaluation rubric)',
      'Time to completion vs manual baseline',
      'Cost per research query'
    ],
    evaluationNotes: [
      'Use pass@k evaluation (k=8) to measure benefit of parallel trajectory exploration',
      'Compare against Humanity\'s Last Exam and BrowseComp for general reasoning benchmarks',
      'Track inference time scaling - more search iterations should improve quality',
      'Evaluate citation chains for source triangulation and verification',
      'Test on domain-specific tasks (financial DD, legal research, biomedical lit review)'
    ],
    cohort: 'advanced-automation',
    readinessSignals: [
      'Research tasks requiring synthesis from 10+ sources',
      'Multi-hour manual research workflows that could be automated',
      'Need for comprehensive coverage with citation trails',
      'High-stakes decisions requiring verified information',
      'Teams with Gemini API access and research automation goals'
    ],
    dataNeeds: [
      'Sample research queries representative of actual use cases',
      'Ground truth answer sets for evaluation (or expert evaluation rubrics)',
      'Context documents (PDFs, spreadsheets) for document-augmented research',
      'Baseline metrics from current manual research workflows'
    ]
  }
};
