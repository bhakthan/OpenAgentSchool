import { SystemDesignPattern } from './types';

export const deepResearcherSystemDesign: SystemDesignPattern = {
  id: 'deep-researcher',
  name: 'Deep Researcher Agent System Design',
  overview: 'A comprehensive system design for building sophisticated research agents that can conduct deep, systematic investigations across multiple sources, synthesize findings, and produce comprehensive research outputs.',
  problemStatement: 'How to design intelligent research agents that can autonomously plan research strategies, systematically gather information from diverse sources, critically analyze findings, and synthesize comprehensive research outputs with proper verification and citation.',
  solution: 'Implement a multi-stage research architecture with intelligent query planning, diverse source exploration, critical analysis, synthesis engines, and comprehensive validation and citation systems.',
  steps: [
    {
      id: 'deep-research-prompt-design',
      title: 'Research-Oriented Prompt Engineering',
      category: 'prompt',
      description: 'Design prompting strategies that enable sophisticated research planning, information analysis, and synthesis capabilities',
      details: 'Create advanced research prompts that can formulate research questions, plan investigation strategies, analyze sources critically, and synthesize findings into coherent research outputs.',
      considerations: [
        'Complex research question formulation and refinement',
        'Multi-perspective investigation and bias detection',
        'Source credibility assessment and validation',
        'Research synthesis and coherent narrative construction'
      ],
      bestPractices: [
        'Use structured research methodology prompts',
        'Implement critical thinking and bias detection prompts',
        'Design evidence evaluation and synthesis templates',
        'Create citation and verification prompts',
        'Use progressive research depth and iteration prompts'
      ],
      examples: [
        'research_prompt = ResearchPlanningPrompt(question="complex_topic", methodology="systematic_review")',
        'analysis_prompt = CriticalAnalysisPrompt(source="academic_paper", bias_check=True)',
        'synthesis_prompt = ResearchSynthesisPrompt(findings=evidence_list, narrative="coherent")'
      ]
    },
    {
      id: 'deep-research-context-knowledge',
      title: 'Research Context & Knowledge Integration',
      category: 'context',
      description: 'Implement comprehensive research context management and knowledge integration across investigation sessions',
      details: 'Design context systems that maintain research state, integrate findings from multiple sources, track investigation paths, and build comprehensive knowledge graphs.',
      considerations: [
        'Multi-source information integration and correlation',
        'Research progress tracking and methodology adherence',
        'Knowledge graph construction and relationship mapping',
        'Investigation path optimization and exploration strategies'
      ],
      bestPractices: [
        'Implement hierarchical research context with topic clustering',
        'Use semantic knowledge integration for finding correlation',
        'Design comprehensive research trail documentation',
        'Create adaptive research strategy based on emerging findings',
        'Implement fact verification and cross-referencing'
      ],
      examples: [
        'research_context = ResearchContext(topic="climate_change", scope="systematic", depth="comprehensive")',
        'knowledge_graph = ResearchKnowledgeGraph(entities=concepts, relationships=connections)',
        'research_trail = InvestigationTrail(queries=search_history, sources=source_list)'
      ]
    },
    {
      id: 'deep-research-source-discovery',
      title: 'Intelligent Source Discovery & Information Gathering',
      category: 'knowledge',
      description: 'Build sophisticated systems for discovering, accessing, and extracting information from diverse research sources',
      details: 'Implement comprehensive source discovery that can access academic databases, web sources, APIs, documents, and specialized repositories with intelligent filtering and relevance assessment.',
      considerations: [
        'Multi-modal source discovery and access strategies',
        'Source quality assessment and credibility scoring',
        'Information extraction and structured data capture',
        'Real-time and historical data integration'
      ],
      bestPractices: [
        'Use federated search across multiple source types',
        'Implement intelligent source ranking and filtering',
        'Design robust information extraction pipelines',
        'Create comprehensive source metadata capture',
        'Use adaptive search strategy based on research progress'
      ],
      examples: [
        'source_discovery = IntelligentSourceDiscovery(databases=["pubmed", "arxiv", "web"], filters=quality_filters)',
        'extractor = InformationExtractor(types=["text", "tables", "figures"], structure=True)',
        'source_ranker = SourceCredibilityRanker(criteria=["authority", "recency", "relevance"])'
      ]
    },
    {
      id: 'deep-research-analysis-synthesis',
      title: 'Critical Analysis & Synthesis Engine',
      category: 'evaluation',
      description: 'Implement sophisticated analysis and synthesis capabilities for processing research findings into coherent insights',
      details: 'Design analysis systems that can critically evaluate sources, identify patterns and contradictions, synthesize findings, and generate comprehensive research outputs.',
      considerations: [
        'Multi-perspective analysis and bias detection',
        'Pattern recognition and trend identification',
        'Contradiction resolution and evidence weighing',
        'Coherent synthesis and narrative construction'
      ],
      bestPractices: [
        'Implement multi-dimensional analysis frameworks',
        'Use evidence-based synthesis with confidence scoring',
        'Design bias detection and mitigation strategies',
        'Create comprehensive fact-checking and verification',
        'Use structured argumentation and reasoning frameworks'
      ],
      examples: [
        'analyzer = CriticalAnalysisEngine(bias_detection=True, multi_perspective=True)',
        'synthesizer = ResearchSynthesizer(methodology="systematic", evidence_weighting=True)',
        'pattern_detector = ResearchPatternDetector(trends=True, contradictions=True)'
      ]
    },
    {
      id: 'deep-research-architecture',
      title: 'Scalable Research Architecture',
      category: 'architecture',
      description: 'Design robust, scalable architectures for comprehensive research operations and knowledge management',
      details: 'Create modular research architectures that support distributed information gathering, parallel analysis, knowledge management, and scalable research workflows.',
      considerations: [
        'Distributed research execution and coordination',
        'Scalable knowledge storage and retrieval',
        'Parallel analysis and processing pipelines',
        'Research workflow orchestration and management'
      ],
      bestPractices: [
        'Design microservices architecture for research components',
        'Use distributed computing for large-scale analysis',
        'Implement scalable knowledge graphs and databases',
        'Design event-driven research workflow coordination',
        'Use cloud-native research infrastructure'
      ],
      examples: [
        'class DeepResearchAgent:\n    def __init__(self, discovery_engine, analysis_engine, synthesis_engine):',
        'research_cluster = DistributedResearchCluster(workers=20, knowledge_store="graph_db")',
        'workflow_orchestrator = ResearchWorkflowOrchestrator(stages=["discover", "analyze", "synthesize"])'
      ]
    },
    {
      id: 'deep-research-tools-integration',
      title: 'Research Tools & Database Integration',
      category: 'tools',
      description: 'Integrate with academic databases, research tools, citation managers, and analysis platforms',
      details: 'Build comprehensive integration systems that connect with academic search engines, citation databases, research management tools, and analysis platforms.',
      considerations: [
        'Academic database API integration and access',
        'Citation management and bibliography generation',
        'Research tool interoperability and data exchange',
        'Statistical analysis and visualization integration'
      ],
      bestPractices: [
        'Design unified interfaces for diverse research databases',
        'Implement automated citation and bibliography management',
        'Use standardized research data formats',
        'Create comprehensive research tool ecosystem',
        'Implement research collaboration and sharing features'
      ],
      examples: [
        '@research_tool_registry.register\ndef academic_search(query: str, database: str) -> SearchResults:',
        'citation_manager = AutomatedCitationManager(styles=["APA", "MLA", "Chicago"])',
        'analysis_integration = ResearchAnalysisIntegration(tools=["r", "python", "spss"])'
      ]
    },
    {
      id: 'deep-research-quality-validation',
      title: 'Research Quality Assurance & Validation',
      category: 'instruction',
      description: 'Implement comprehensive quality control, fact-checking, and research validation frameworks',
      details: 'Design validation systems that ensure research quality, verify facts, check citations, detect plagiarism, and maintain research integrity standards.',
      considerations: [
        'Comprehensive fact-checking and verification protocols',
        'Research methodology validation and compliance',
        'Citation accuracy and plagiarism detection',
        'Research ethics and integrity maintenance'
      ],
      bestPractices: [
        'Implement multi-layer fact verification systems',
        'Use automated plagiarism and originality checking',
        'Design research methodology validation frameworks',
        'Create comprehensive quality scoring and assessment',
        'Implement research ethics and integrity monitoring'
      ],
      examples: [
        'quality_controller = ResearchQualityController(fact_check=True, methodology_validation=True)',
        'fact_checker = AutomatedFactChecker(sources=["primary", "peer_reviewed"], confidence_threshold=0.9)',
        'integrity_monitor = ResearchIntegrityMonitor(plagiarism_check=True, ethics_compliance=True)'
      ]
    }
  ],
  architecture: {
    components: [
      {
        name: 'Research Planning Engine',
        type: 'control',
        description: 'Plans comprehensive research strategies and investigation methodologies'
      },
      {
        name: 'Source Discovery Engine',
        type: 'processing',
        description: 'Discovers and accesses diverse information sources across multiple databases'
      },
      {
        name: 'Information Extraction System',
        type: 'processing',
        description: 'Extracts and structures information from various source types and formats'
      },
      {
        name: 'Critical Analysis Engine',
        type: 'processing',
        description: 'Performs critical analysis, bias detection, and evidence evaluation'
      },
      {
        name: 'Research Synthesis Engine',
        type: 'processing',
        description: 'Synthesizes findings into coherent research outputs and narratives'
      },
      {
        name: 'Knowledge Graph Manager',
        type: 'storage',
        description: 'Manages comprehensive knowledge graphs and relationship mapping'
      },
      {
        name: 'Fact Verification System',
        type: 'processing',
        description: 'Verifies facts, checks citations, and ensures research accuracy'
      },
      {
        name: 'Research Context Tracker',
        type: 'control',
        description: 'Tracks research progress, context, and investigation trails'
      },
      {
        name: 'Citation Management System',
        type: 'processing',
        description: 'Manages citations, bibliographies, and reference formatting'
      },
      {
        name: 'Research Quality Controller',
        type: 'control',
        description: 'Ensures research quality, integrity, and methodological compliance'
      }
    ],
    flows: [
      {
        from: 'Research Planning Engine',
        to: 'Source Discovery Engine',
        description: 'Research plans guide targeted source discovery and search strategies'
      },
      {
        from: 'Source Discovery Engine',
        to: 'Information Extraction System',
        description: 'Discovered sources are processed for information extraction'
      },
      {
        from: 'Information Extraction System',
        to: 'Critical Analysis Engine',
        description: 'Extracted information undergoes critical analysis and evaluation'
      },
      {
        from: 'Critical Analysis Engine',
        to: 'Fact Verification System',
        description: 'Analysis results are verified for accuracy and credibility'
      },
      {
        from: 'Fact Verification System',
        to: 'Knowledge Graph Manager',
        description: 'Verified information is integrated into the knowledge graph'
      },
      {
        from: 'Knowledge Graph Manager',
        to: 'Research Synthesis Engine',
        description: 'Knowledge graph provides context for research synthesis'
      },
      {
        from: 'Research Synthesis Engine',
        to: 'Citation Management System',
        description: 'Synthesized research incorporates proper citations and references'
      },
      {
        from: 'Research Context Tracker',
        to: 'Research Planning Engine',
        description: 'Research progress informs adaptive planning and strategy refinement'
      },
      {
        from: 'Citation Management System',
        to: 'Research Quality Controller',
        description: 'Citations and references undergo quality and accuracy validation'
      },
      {
        from: 'Research Quality Controller',
        to: 'Research Context Tracker',
        description: 'Quality assessments update research progress and validation status'
      }
    ]
  }
};
