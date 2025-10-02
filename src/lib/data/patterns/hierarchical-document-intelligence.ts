import { PatternData } from './types';
import { HierarchicalDocumentVisual } from '@/components/visualization/business-use-cases/HierarchicalDocumentVisual';
import HierarchicalDocumentIntelligenceLiveRunner from '@/components/live-runners/HierarchicalDocumentIntelligenceLiveRunner';

export const hierarchicalDocumentIntelligencePattern: PatternData = {
  id: 'hierarchical-document-intelligence',
  name: 'Hierarchical Document Intelligence',
  description: 'Multi-agent system that parses dense technical documents through specialized agents with hierarchical synthesis, managing context limits through intelligent chunking and memory.',
  category: 'Data Autonomy',
  relatedPatterns: ['strategy-memory-replay', 'schema-aware-decomposition', 'query-intent-structured-access'],
  
  businessUseCase: {
    industry: 'Engineering & Manufacturing',
    description: 'An engineering firm processes 200+ page electrical schematics and P&ID diagrams. The Hierarchical Document Intelligence system uses 6 specialized agents: (1) Document Preprocessor chunks PDFs while preserving context boundaries, (2) Visual Element Extractor identifies symbols and connections using vision models, (3) Domain Expert Interpreter applies electrical/mechanical standards knowledge, (4) Cross-Reference Resolver links detail callouts across pages, (5) Hierarchical Synthesizer creates multi-level understanding (component → subsystem → system), and (6) Query Handler answers engineer questions using vector search + graph traversal. Context Providers manage 50K token windows while accessing 2M+ token documents through semantic chunking and Redis-backed memory. Result: 90% reduction in manual review time, automatic BOM generation, and standards compliance validation.',
    visualization: HierarchicalDocumentVisual,
    enlightenMePrompt: 'Explain how hierarchical agents with context management enable analysis of documents exceeding context limits.'
  },

  nodes: [
    { id: 'input', type: 'input', data: { label: 'Dense PDF Document', nodeType: 'input' }, position: { x: 50, y: 200 } },
    { id: 'preprocessor', type: 'default', data: { label: 'Preprocessor Agent', description: 'Intelligent chunking', nodeType: 'planner' }, position: { x: 250, y: 100 } },
    { id: 'visual', type: 'default', data: { label: 'Visual Extractor', description: 'Vision model', nodeType: 'tool' }, position: { x: 250, y: 200 } },
    { id: 'domain', type: 'default', data: { label: 'Domain Expert', description: 'Standards knowledge', nodeType: 'llm' }, position: { x: 250, y: 300 } },
    { id: 'context', type: 'default', data: { label: 'Context Manager', description: 'Vector + Graph Memory', nodeType: 'tool' }, position: { x: 480, y: 150 } },
    { id: 'xref', type: 'default', data: { label: 'Cross-Ref Resolver', description: 'Link sections', nodeType: 'evaluator' }, position: { x: 480, y: 250 } },
    { id: 'synthesizer', type: 'default', data: { label: 'Hierarchical Synthesizer', description: 'Multi-level understanding', nodeType: 'aggregator' }, position: { x: 700, y: 200 } },
    { id: 'query', type: 'default', data: { label: 'Query Handler', description: 'Semantic search + reasoning', nodeType: 'llm' }, position: { x: 920, y: 150 } },
    { id: 'output', type: 'output', data: { label: 'Analysis + Q&A', nodeType: 'output' }, position: { x: 920, y: 250 } }
  ],

  edges: [
    { id: 'e1', source: 'input', target: 'preprocessor', animated: true },
    { id: 'e2', source: 'input', target: 'visual', animated: true },
    { id: 'e3', source: 'input', target: 'domain', animated: true },
    { id: 'e4', source: 'preprocessor', target: 'context', label: 'chunks', animated: true },
    { id: 'e5', source: 'visual', target: 'context', label: 'elements', animated: true },
    { id: 'e6', source: 'domain', target: 'context', label: 'interpretations', animated: true },
    { id: 'e7', source: 'context', target: 'xref', animated: true },
    { id: 'e8', source: 'xref', target: 'synthesizer', animated: true },
    { id: 'e9', source: 'context', target: 'synthesizer', animated: true },
    { id: 'e10', source: 'synthesizer', target: 'output', animated: true },
    { id: 'e11', source: 'synthesizer', target: 'query', animated: true },
    { id: 'e12', source: 'query', target: 'output', label: 'answers', animated: true },
    { id: 'e13', source: 'query', target: 'context', label: 'retrieve', animated: true, style: { strokeDasharray: '5 5' } }
  ],

  useCases: [
    'Engineering schematic analysis (electrical, P&ID, mechanical)',
    'Legal contract review with clause cross-referencing',
    'Medical research paper synthesis with citation graphs',
    'Technical manual question answering',
    'Regulatory compliance document analysis'
  ],

  whenToUse: 'Use when documents exceed LLM context limits (>100K tokens) but require deep understanding of relationships, cross-references, and hierarchical structure. Ideal for technical documents with diagrams, tables, and complex interdependencies.',

  advantages: [
    'Handles multi-million token documents within 50K context windows',
    'Preserves context through intelligent overlapping chunks',
    'Multi-modal analysis (text + vision) for diagrams and schematics',
    'Vector search + graph traversal for semantic memory',
    'Agent specialization improves accuracy (domain expert, visual extractor)',
    'Hierarchical synthesis creates multi-level understanding',
    'Context Providers enable efficient memory management',
    'Redis persistence maintains document knowledge across sessions'
  ],

  limitations: [
    'Higher latency than single-pass approaches (6 agent passes)',
    'Requires vector database and graph database infrastructure',
    'Chunking may split critical context if boundaries are poorly chosen',
    'Vision model costs for diagram-heavy documents',
    'Complexity in orchestrating multiple agents'
  ],

  implementation: [
    'Step 1: Design DocumentChunker Context Provider with overlap strategy (15-20% overlap between chunks).',
    'Step 2: Implement visual element extraction agent using GPT-4V or similar vision model.',
    'Step 3: Create DomainExpert Context Provider that injects standards and terminology knowledge.',
    'Step 4: Build ContextManager with ChromaDB for vector search and NetworkX for relationship graphs.',
    'Step 5: Implement cross-reference resolver to link callouts, detail views, and page references.',
    'Step 6: Create HierarchicalSynthesizer agent that builds component → subsystem → system understanding.',
    'Step 7: Implement QueryHandler with semantic retrieval + graph traversal for question answering.',
    'Step 8: Use Redis to persist chunk metadata, embeddings, and synthesis results.',
    'Step 9: Orchestrate agents with asyncio for parallel processing where possible.',
    'Step 10: Add token counting and budget management to stay within context limits.'
  ],

  codeExample: `// Agent Framework - Hierarchical Document Intelligence
import { Agent, ContextProvider, Context } from '@azure/ai-agents';
import { RedisChatMessageStore } from '@azure/ai-agents/stores';
import { OpenAIChatClient } from '@azure/ai-agents/clients';
import chromadb from 'chromadb';
import { Graph } from 'graphlib';

// Context Provider: Intelligent Document Chunker
class DocumentChunker extends ContextProvider {
  private chunkSize = 8000; // tokens
  private overlap = 0.15;
  
  async invoking(messages: any[], kwargs: any): Promise<Context> {
    const document = kwargs.document;
    const chunks = this.createOverlappingChunks(document);
    
    // Store chunks in vector DB
    await this.storeChunks(chunks);
    
    // Inject current chunk with neighbor context
    const currentChunk = kwargs.chunkId || chunks[0].id;
    const context = this.getChunkWithNeighbors(currentChunk, chunks);
    
    return new Context({
      current_chunk: context,
      total_chunks: chunks.length,
      chunk_metadata: this.getMetadata(currentChunk)
    });
  }
  
  private createOverlappingChunks(document: string) {
    const chunks = [];
    const overlapSize = Math.floor(this.chunkSize * this.overlap);
    
    for (let i = 0; i < document.length; i += (this.chunkSize - overlapSize)) {
      const chunk = {
        id: \`chunk_\${chunks.length}\`,
        content: document.slice(i, i + this.chunkSize),
        startPos: i,
        endPos: Math.min(i + this.chunkSize, document.length)
      };
      chunks.push(chunk);
    }
    
    return chunks;
  }
  
  private getChunkWithNeighbors(chunkId: string, chunks: any[]) {
    const idx = chunks.findIndex(c => c.id === chunkId);
    const prev = idx > 0 ? chunks[idx - 1].content.slice(-500) : '';
    const next = idx < chunks.length - 1 ? chunks[idx + 1].content.slice(0, 500) : '';
    
    return {
      previous_context: prev,
      main_content: chunks[idx].content,
      next_context: next
    };
  }
}

// Context Manager: Vector + Graph Memory
class ContextManager extends ContextProvider {
  private vectorDB: any;
  private graph: Graph;
  private redis: RedisChatMessageStore;
  
  constructor() {
    super();
    this.vectorDB = new chromadb.Client();
    this.graph = new Graph({ directed: true });
    this.redis = new RedisChatMessageStore({
      redis_url: "redis://localhost:6379",
      thread_id: "doc_memory"
    });
  }
  
  async invoking(messages: any[], kwargs: any): Promise<Context> {
    const query = kwargs.query;
    
    // Semantic search in vector DB
    const similarChunks = await this.vectorDB.query({
      queryTexts: [query],
      nResults: 5
    });
    
    // Graph traversal for related chunks
    const relatedChunks = this.traverseGraph(similarChunks[0].id, 2);
    
    // Combine and rank
    const context = this.rankAndMerge(similarChunks, relatedChunks);
    
    return new Context({
      relevant_chunks: context,
      retrieval_strategy: 'hybrid_semantic_graph',
      total_tokens: this.countTokens(context)
    });
  }
  
  private traverseGraph(startNode: string, depth: number): string[] {
    const visited = new Set<string>();
    const queue: [string, number][] = [[startNode, 0]];
    const results: string[] = [];
    
    while (queue.length > 0) {
      const [node, currentDepth] = queue.shift()!;
      
      if (visited.has(node) || currentDepth > depth) continue;
      
      visited.add(node);
      results.push(node);
      
      // Add neighbors
      const neighbors = this.graph.successors(node) || [];
      neighbors.forEach(n => queue.push([n, currentDepth + 1]));
    }
    
    return results;
  }
}

// Agent: Visual Element Extractor
const visualExtractor = new Agent({
  name: "visual_element_extractor",
  instructions: \`You are an expert at analyzing engineering diagrams.
  
  Extract ALL visual elements:
  - Symbols (electrical, mechanical, P&ID)
  - Connection lines (pipes, wires, linkages)
  - Text annotations (labels, callouts, dimensions)
  - Tables and legends
  - Coordinate positions (as % of page)
  
  Output structured JSON with element type, coordinates, properties, connections.\`,
  
  model: "gpt-4-vision",
  
  context_providers: [new DocumentChunker()],
  
  memory: new RedisChatMessageStore({
    thread_id: "visual_extraction"
  })
});

// Agent: Domain Expert Interpreter
class DomainExpert extends ContextProvider {
  private domain: string;
  
  constructor(domain: 'electrical' | 'mechanical' | 'pid' | 'civil') {
    super();
    this.domain = domain;
  }
  
  async invoking(messages: any[], kwargs: any): Promise<Context> {
    // Inject domain-specific knowledge
    const standards = this.getRelevantStandards(this.domain);
    const terminology = this.loadTerminology(this.domain);
    const commonPatterns = this.getCommonPatterns(this.domain);
    
    return new Context({
      domain: this.domain,
      applicable_standards: standards,
      terminology_guide: terminology,
      pattern_library: commonPatterns,
      failure_modes_database: this.getFailureModes(this.domain)
    });
  }
  
  private getRelevantStandards(domain: string): string[] {
    const standardsDB = {
      electrical: ['IEC 60617', 'ANSI Y32.2', 'IEEE 315'],
      mechanical: ['ISO 128', 'ASME Y14.5', 'ISO 1101'],
      pid: ['ISA-5.1', 'ISO 14617', 'ANSI/ISA-5.1'],
      civil: ['ISO 4172', 'BS 1192', 'ACI 315']
    };
    return standardsDB[domain] || [];
  }
}

const domainExpert = new Agent({
  name: "domain_expert_interpreter",
  instructions: \`You are a senior engineer with 20+ years experience.
  
  For each component identified:
  1. Explain its function in the system
  2. List key specifications (voltage, pressure, load, etc.)
  3. Identify relevant standards
  4. Note potential failure modes
  5. Describe interactions with other components
  
  Apply deep reasoning: trace signal/material/energy flows, identify control loops.\`,
  
  context_providers: [
    new DocumentChunker(),
    new DomainExpert('electrical')
  ],
  
  memory: new RedisChatMessageStore({
    thread_id: "domain_interpretation"
  })
});

// Agent: Hierarchical Synthesizer
const synthesizer = new Agent({
  name: "hierarchical_synthesizer",
  instructions: \`Synthesize multi-agent findings into hierarchical understanding:
  
  Level 1 - Components: Individual parts with specs
  Level 2 - Subsystems: Functional groupings
  Level 3 - System: Overall operation and purpose
  Level 4 - Meta: Document quality, ambiguities, recommendations
  
  Output structured JSON with all levels.\`,
  
  context_providers: [new ContextManager()],
  
  memory: new RedisChatMessageStore({
    thread_id: "synthesis"
  })
});

// Orchestrator: Coordinate all agents
class DiagramOrchestrator {
  private agents: {
    preprocessor: Agent;
    visualExtractor: Agent;
    domainExpert: Agent;
    synthesizer: Agent;
    queryHandler: Agent;
  };
  
  private contextManager: ContextManager;
  
  constructor() {
    this.contextManager = new ContextManager();
    this.agents = {
      preprocessor: this.createPreprocessor(),
      visualExtractor: visualExtractor,
      domainExpert: domainExpert,
      synthesizer: synthesizer,
      queryHandler: this.createQueryHandler()
    };
  }
  
  async analyzeDocument(pdfPath: string, domain: string) {
    console.log('🔍 Stage 1: Preprocessing & chunking...');
    const chunks = await this.agents.preprocessor.run(
      \`Process PDF: \${pdfPath}\`
    );
    
    console.log('👁️  Stage 2: Visual element extraction...');
    const visualElements = await Promise.all(
      chunks.map(chunk => 
        this.agents.visualExtractor.run(\`Extract elements from chunk: \${chunk.id}\`)
      )
    );
    
    console.log('🧠 Stage 3: Domain expert interpretation...');
    const interpretations = await Promise.all(
      chunks.map((chunk, i) => 
        this.agents.domainExpert.run(
          \`Interpret components in chunk: \${chunk.id}\`,
          { visualElements: visualElements[i] }
        )
      )
    );
    
    console.log('🎯 Stage 4: Hierarchical synthesis...');
    const synthesis = await this.agents.synthesizer.run(
      'Synthesize all findings',
      { chunks, visualElements, interpretations }
    );
    
    console.log('✅ Analysis complete!');
    return synthesis;
  }
  
  async askQuestion(question: string) {
    return await this.agents.queryHandler.run(question);
  }
}

// Usage
const orchestrator = new DiagramOrchestrator();

// Analyze engineering diagram
const result = await orchestrator.analyzeDocument(
  'electrical_schematic.pdf',
  'electrical'
);

console.log('System overview:', result.executive_summary);
console.log('Components found:', result.components.length);

// Ask questions
const answer = await orchestrator.askQuestion(
  'What are the safety systems present?'
);

console.log('Answer:', answer.answer);
console.log('Evidence:', answer.evidence);
`,

  pythonCodeExample: `# Agent Framework - Hierarchical Document Intelligence
from azure.ai.agents import Agent, ContextProvider, Context
from azure.ai.agents.stores import RedisChatMessageStore
from azure.ai.agents.clients import OpenAIChatClient
from typing import List, Dict, Any, Optional
import chromadb
import networkx as nx
import asyncio
import fitz  # PyMuPDF
import base64

# Context Provider: Document Chunker with Overlap
class DocumentChunker(ContextProvider):
    """Intelligent chunking with overlap preservation."""
    
    def __init__(self, chunk_size: int = 8000, overlap: float = 0.15):
        super().__init__()
        self.chunk_size = chunk_size
        self.overlap = overlap
    
    async def invoking(self, messages: List[Dict], **kwargs) -> Context:
        document = kwargs.get('document', '')
        chunks = self.create_overlapping_chunks(document)
        
        # Store chunks with metadata
        await self.store_chunks(chunks)
        
        # Get current chunk with neighbor context
        chunk_id = kwargs.get('chunk_id', chunks[0]['id'])
        context = self.get_chunk_with_neighbors(chunk_id, chunks)
        
        return Context({
            "current_chunk": context,
            "total_chunks": len(chunks),
            "chunk_metadata": self.get_metadata(chunk_id)
        })
    
    def create_overlapping_chunks(self, document: str) -> List[Dict]:
        """Create chunks with overlapping boundaries."""
        chunks = []
        overlap_size = int(self.chunk_size * self.overlap)
        
        for i in range(0, len(document), self.chunk_size - overlap_size):
            chunk = {
                'id': f"chunk_{len(chunks)}",
                'content': document[i:i + self.chunk_size],
                'start_pos': i,
                'end_pos': min(i + self.chunk_size, len(document))
            }
            chunks.append(chunk)
        
        return chunks
    
    def get_chunk_with_neighbors(self, chunk_id: str, chunks: List[Dict]) -> Dict:
        """Get chunk with previous and next context."""
        idx = next(i for i, c in enumerate(chunks) if c['id'] == chunk_id)
        
        prev_context = chunks[idx-1]['content'][-500:] if idx > 0 else ''
        main_content = chunks[idx]['content']
        next_context = chunks[idx+1]['content'][:500] if idx < len(chunks)-1 else ''
        
        return {
            'previous_context': prev_context,
            'main_content': main_content,
            'next_context': next_context
        }


# Context Provider: Vector + Graph Memory Manager
class ContextManager(ContextProvider):
    """Hybrid vector search + graph traversal memory."""
    
    def __init__(self, redis_url: str = "redis://localhost:6379"):
        super().__init__()
        self.chroma_client = chromadb.Client()
        self.collection = self.chroma_client.create_collection("doc_chunks")
        self.graph = nx.DiGraph()
        self.redis = RedisChatMessageStore(
            redis_url=redis_url,
            thread_id="doc_memory"
        )
    
    async def invoking(self, messages: List[Dict], **kwargs) -> Context:
        query = kwargs.get('query', '')
        
        # Semantic search in vector DB
        results = self.collection.query(
            query_texts=[query],
            n_results=5
        )
        
        similar_chunks = results['ids'][0] if results['ids'] else []
        
        # Graph traversal for related chunks
        related_chunks = []
        for chunk_id in similar_chunks[:2]:
            related = self.traverse_graph(chunk_id, depth=2)
            related_chunks.extend(related)
        
        # Combine and rank
        all_chunks = list(set(similar_chunks + related_chunks))
        context = self.retrieve_chunks(all_chunks[:10])
        
        return Context({
            "relevant_chunks": context,
            "retrieval_strategy": "hybrid_semantic_graph",
            "total_chunks": len(context)
        })
    
    def traverse_graph(self, start_node: str, depth: int) -> List[str]:
        """BFS traversal of relationship graph."""
        visited = set()
        queue = [(start_node, 0)]
        results = []
        
        while queue:
            node, current_depth = queue.pop(0)
            
            if node in visited or current_depth > depth:
                continue
            
            visited.add(node)
            results.append(node)
            
            # Add neighbors
            if self.graph.has_node(node):
                neighbors = list(self.graph.successors(node))
                queue.extend((n, current_depth + 1) for n in neighbors)
        
        return results
    
    def add_chunk(self, chunk_id: str, content: str, embedding: List[float], metadata: Dict):
        """Add chunk to vector DB and graph."""
        self.collection.add(
            ids=[chunk_id],
            documents=[content],
            embeddings=[embedding],
            metadatas=[metadata]
        )
        
        self.graph.add_node(chunk_id, **metadata)
        
        # Add edges for dependencies
        for dep in metadata.get('dependencies', []):
            if self.graph.has_node(dep):
                self.graph.add_edge(chunk_id, dep, relation='depends_on')


# Context Provider: Domain Expert Knowledge
class DomainExpert(ContextProvider):
    """Inject domain-specific knowledge (standards, terminology)."""
    
    def __init__(self, domain: str = 'general'):
        super().__init__()
        self.domain = domain
        self.standards_db = self.load_standards()
        self.terminology = self.load_terminology()
    
    async def invoking(self, messages: List[Dict], **kwargs) -> Context:
        # Inject relevant domain knowledge
        standards = self.get_relevant_standards(self.domain)
        terms = self.terminology.get(self.domain, {})
        patterns = self.get_common_patterns(self.domain)
        
        return Context({
            "domain": self.domain,
            "applicable_standards": standards,
            "terminology_guide": terms,
            "pattern_library": patterns,
            "failure_modes": self.get_failure_modes(self.domain)
        })
    
    def load_standards(self) -> Dict[str, List[str]]:
        return {
            'electrical': ['IEC 60617', 'ANSI Y32.2', 'IEEE 315'],
            'mechanical': ['ISO 128', 'ASME Y14.5', 'ISO 1101'],
            'pid': ['ISA-5.1', 'ISO 14617', 'ANSI/ISA-5.1'],
            'civil': ['ISO 4172', 'BS 1192', 'ACI 315']
        }
    
    def get_relevant_standards(self, domain: str) -> List[str]:
        return self.standards_db.get(domain, [])


# Agent: Visual Element Extractor
visual_extractor = Agent(
    name="visual_element_extractor",
    instructions="""You are an expert at analyzing engineering diagrams.
    
    Extract ALL visual elements systematically:
    1. SYMBOLS: Electrical, mechanical, P&ID symbols
    2. CONNECTIONS: Lines (pipes, wires, linkages)
    3. TEXT: Labels, callouts, dimensions, notes
    4. TABLES: Parts lists, legends, specifications
    5. COORDINATES: Position as % of page (x, y, width, height)
    
    For each element, identify:
    - Element type (symbol, line, text, table, legend)
    - Precise coordinates
    - Properties (line type, color, thickness)
    - Connections to other elements (by ID)
    - Text content if applicable
    
    Output structured JSON array of all elements.""",
    
    model="gpt-4-vision",
    
    context_providers=[DocumentChunker()],
    
    memory=RedisChatMessageStore(thread_id="visual_extraction")
)

# Agent: Domain Expert Interpreter
domain_expert = Agent(
    name="domain_expert_interpreter",
    instructions="""You are a principal engineer with 20+ years experience.
    
    For each component identified, provide expert analysis:
    
    1. FUNCTION: What does this component do in the system?
    2. SPECIFICATIONS: Key parameters (voltage, pressure, flow, load)
    3. STANDARDS: Which codes/regulations govern this?
    4. FAILURE MODES: What are common failures and maintenance needs?
    5. INTERACTIONS: How does it connect with other components?
    
    Think systematically:
    - Trace signal/material/energy flows
    - Identify control loops and feedback
    - Note safety systems and redundancy
    - Flag design choices needing clarification
    
    Output JSON with detailed technical interpretation.""",
    
    context_providers=[
        DocumentChunker(),
        DomainExpert('electrical')
    ],
    
    memory=RedisChatMessageStore(thread_id="domain_interpretation")
)

# Agent: Hierarchical Synthesizer
synthesizer = Agent(
    name="hierarchical_synthesizer",
    instructions="""Synthesize multi-agent findings into hierarchical understanding.
    
    LEVEL 1 - Component Detail:
    For each component: function, specs, connections, location
    
    LEVEL 2 - Subsystem Understanding:
    Group components into functional subsystems with purpose and interactions
    
    LEVEL 3 - System Integration:
    Overall function, operational modes, key parameters, control philosophy
    
    LEVEL 4 - Meta-Analysis:
    Document quality, ambiguities, confidence levels, recommendations
    
    Output comprehensive JSON with all hierarchy levels.""",
    
    context_providers=[ContextManager()],
    
    memory=RedisChatMessageStore(thread_id="synthesis")
)

# Agent: Query Handler
query_handler = Agent(
    name="query_handler",
    instructions="""Answer questions about analyzed diagrams with expert precision.
    
    Process:
    1. Clarify what's being asked
    2. Retrieve relevant context (semantic + graph)
    3. Show reasoning chain with evidence
    4. Provide comprehensive answer with caveats
    5. Suggest follow-up questions
    
    Always cite sources (chunk IDs, page numbers, locations).""",
    
    context_providers=[ContextManager()],
    
    memory=RedisChatMessageStore(thread_id="query_handling")
)


# Orchestrator: Coordinate All Agents
class DiagramOrchestrator:
    """Orchestrates 6-agent pipeline for document analysis."""
    
    def __init__(self):
        self.context_manager = ContextManager()
        self.agents = {
            'preprocessor': self.create_preprocessor(),
            'visual': visual_extractor,
            'domain': domain_expert,
            'synthesizer': synthesizer,
            'query': query_handler
        }
        self.results = {}
    
    async def analyze_document(self, pdf_path: str, domain: str = 'general'):
        """Full analysis pipeline."""
        print(f"🔍 Analyzing {pdf_path}\\n")
        
        # Stage 1: Preprocessing
        print("📄 Stage 1: Preprocessing & chunking...")
        chunks = await self.preprocess_pdf(pdf_path)
        print(f"   ✓ Created {len(chunks)} chunks\\n")
        
        # Stage 2: Visual extraction (parallel)
        print("👁️  Stage 2: Visual element extraction...")
        visual_tasks = [
            self.agents['visual'].run(f"Extract elements from chunk {c['id']}")
            for c in chunks
        ]
        visual_results = await asyncio.gather(*visual_tasks)
        total_elements = sum(len(v.get('elements', [])) for v in visual_results)
        print(f"   ✓ Extracted {total_elements} visual elements\\n")
        
        # Stage 3: Domain interpretation (parallel)
        print("🧠 Stage 3: Domain expert interpretation...")
        interp_tasks = [
            self.agents['domain'].run(
                f"Interpret components in chunk {c['id']}",
                visual_elements=visual_results[i]
            )
            for i, c in enumerate(chunks)
        ]
        interp_results = await asyncio.gather(*interp_tasks)
        total_interps = sum(len(i.get('interpretations', [])) for i in interp_results)
        print(f"   ✓ Generated {total_interps} interpretations\\n")
        
        # Stage 4: Build context index
        print("💾 Stage 4: Building context index...")
        for chunk in chunks:
            embedding = await self.generate_embedding(chunk['content'])
            self.context_manager.add_chunk(
                chunk['id'],
                chunk['content'],
                embedding,
                chunk['metadata']
            )
        print("   ✓ Context index ready\\n")
        
        # Stage 5: Synthesis
        print("🎯 Stage 5: Hierarchical synthesis...")
        synthesis = await self.agents['synthesizer'].run(
            "Synthesize all findings",
            chunks=chunks,
            visual_elements=visual_results,
            interpretations=interp_results
        )
        print("   ✓ Synthesis complete\\n")
        
        self.results['synthesis'] = synthesis
        
        print("✅ Analysis complete!\\n")
        return synthesis
    
    async def ask_question(self, question: str):
        """Query the analyzed document."""
        if not self.results.get('synthesis'):
            return {"error": "No document analyzed yet"}
        
        print(f"❓ Question: {question}")
        answer = await self.agents['query'].run(
            question,
            synthesis=self.results['synthesis']
        )
        
        print(f"✅ Answer: {answer['answer'][:200]}...\\n")
        return answer
    
    async def preprocess_pdf(self, pdf_path: str) -> List[Dict]:
        """Extract and chunk PDF."""
        doc = fitz.open(pdf_path)
        chunks = []
        
        for page_num in range(len(doc)):
            page = doc[page_num]
            text = page.get_text()
            
            # Convert to image for vision
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
            img_data = base64.b64encode(pix.tobytes("png")).decode()
            
            chunks.append({
                'id': f"chunk_{page_num}",
                'content': text,
                'image': img_data,
                'metadata': {
                    'page': page_num,
                    'dependencies': []
                }
            })
        
        return chunks
    
    async def generate_embedding(self, text: str) -> List[float]:
        """Generate embedding (placeholder)."""
        import numpy as np
        return np.random.rand(1536).tolist()


# === USAGE EXAMPLE ===

async def main():
    # Initialize orchestrator
    orchestrator = DiagramOrchestrator()
    
    # Analyze engineering schematic
    result = await orchestrator.analyze_document(
        'electrical_schematic.pdf',
        domain='electrical'
    )
    
    print("=== ANALYSIS RESULTS ===")
    print(f"Executive Summary: {result.get('executive_summary', 'N/A')}")
    print(f"Components Found: {len(result.get('components', []))}")
    print(f"Subsystems: {len(result.get('subsystems', []))}")
    
    # Ask questions
    print("\\n=== Q&A SESSION ===")
    
    questions = [
        "What are the main components in this system?",
        "What safety systems are present?",
        "What is the primary power supply specification?",
        "Are there any redundant systems?"
    ]
    
    for q in questions:
        answer = await orchestrator.ask_question(q)
        print(f"\\nQ: {q}")
        print(f"A: {answer['answer']}")
        print(f"Confidence: {answer.get('confidence', 0):.2%}")

# Run
asyncio.run(main())
`,

  completeCode: '',
  codeVisualizer: HierarchicalDocumentIntelligenceLiveRunner
};
