import { SystemDesignPattern } from './types';

export const hierarchicalDocumentIntelligenceSystemDesign: SystemDesignPattern = {
  id: 'hierarchical-document-intelligence',
  name: 'Hierarchical Document Intelligence System Design',
  overview: 'Multi-agent system for parsing dense technical documents (2M+ tokens) within 50K context windows using intelligent chunking, vector memory, and graph relationships.',
  problemStatement: 'Large engineering documents exceed context limits. Manual analysis takes days. Visual elements need interpretation. Cross-references span pages.',
  solution: '6 specialized agents coordinate through Context Providers: chunking with overlap, parallel visual extraction (GPT-4V), domain expert interpretation, vector+graph memory, hierarchical synthesis (4 levels).',
  steps: [
    { 
      id: 'chunk', 
      title: 'Intelligent Chunking', 
      category: 'architecture', 
      description: 'DocumentChunker creates overlapping chunks', 
      details: '15% overlap preserves context at boundaries. Token counting manages budget.', 
      considerations: ['Boundary artifacts', 'Title blocks', 'Detail callouts'], 
      bestPractices: ['Semantic boundaries', 'Overlap regions', 'Metadata tracking'], 
      patterns: ['hierarchical-document-intelligence'], 
      examples: ['chunker.create_overlapping_chunks(8000, 0.15)'] 
    },
    { 
      id: 'visual', 
      title: 'Visual Extraction', 
      category: 'architecture', 
      description: 'Extract symbols, connections, text from diagrams', 
      details: 'Parallel GPT-4V calls on chunk images. Identifies components.', 
      considerations: ['Vision model cost', 'Resolution limits', 'OCR quality'], 
      bestPractices: ['Batch processing', 'Retry logic', 'Confidence scores'], 
      patterns: ['hierarchical-document-intelligence'], 
      examples: ['visual_extractor.run("Extract elements", image=chunk.image)'] 
    },
    { 
      id: 'domain', 
      title: 'Domain Interpretation', 
      category: 'architecture', 
      description: 'Apply engineering knowledge to elements', 
      details: 'DomainExpert Context Provider injects standards (IEC, ANSI, IEEE), terminology, patterns, failure modes.', 
      considerations: ['Domain coverage', 'Standards updates', 'Terminology drift'], 
      bestPractices: ['Standards versioning', 'Knowledge base updates', 'Validation'], 
      patterns: ['hierarchical-document-intelligence'], 
      examples: ['domain_expert.run("Interpret components", visual_elements=results)'] 
    },
    { 
      id: 'memory', 
      title: 'Context Memory', 
      category: 'architecture', 
      description: 'Build vector + graph memory', 
      details: 'ContextManager: ChromaDB for semantic search, NetworkX for relationships, Redis for persistence.', 
      considerations: ['Index latency', 'Graph complexity', 'Memory size'], 
      bestPractices: ['Batch indexing', 'Graph pruning', 'Cache strategy'], 
      patterns: ['hierarchical-document-intelligence'], 
      examples: ['context_mgr.add_chunk(id, content, embedding, metadata)'] 
    },
    { 
      id: 'xref', 
      title: 'Cross-Reference Resolution', 
      category: 'architecture', 
      description: 'Link detail callouts, page references', 
      details: 'Traverse graph to resolve dependencies. Update edges.', 
      considerations: ['Ambiguous refs', 'Circular dependencies', 'Missing targets'], 
      bestPractices: ['Confidence scoring', 'Manual review flagging', 'Fuzzy matching'], 
      patterns: ['hierarchical-document-intelligence'], 
      examples: ['xref_resolver.resolve(chunks, graph)'] 
    },
    { 
      id: 'synthesis', 
      title: 'Hierarchical Synthesis', 
      category: 'architecture', 
      description: '4-level understanding: component → subsystem → system → meta', 
      details: 'Synthesizer builds multi-level analysis. Each level summarizes lower level.', 
      considerations: ['Level granularity', 'Information loss', 'Coherence'], 
      bestPractices: ['Iterative refinement', 'Cross-validation', 'Evidence links'], 
      patterns: ['hierarchical-document-intelligence'], 
      examples: ['synthesizer.run("Synthesize hierarchy", chunks=chunks)'] 
    }
  ],
  architecture: {
    components: [
      { name: 'PDF Loader', type: 'processing', description: 'Loads document (PyMuPDF)' },
      { name: 'DocumentChunker', type: 'processing', description: 'Creates overlapping chunks (Context Provider)' },
      { name: 'Visual Extractor Agent', type: 'processing', description: 'GPT-4V element extraction' },
      { name: 'Domain Expert Agent', type: 'processing', description: 'Standards interpretation (Context Provider)' },
      { name: 'Context Manager', type: 'storage', description: 'Vector DB + Graph + Redis (Context Provider)' },
      { name: 'Cross-Ref Resolver Agent', type: 'processing', description: 'Link resolution' },
      { name: 'Hierarchical Synthesizer Agent', type: 'processing', description: '4-level synthesis' },
      { name: 'Query Handler Agent', type: 'processing', description: 'Semantic Q&A' }
    ],
    flows: [
      { from: 'PDF Loader', to: 'DocumentChunker', description: 'Raw pages' },
      { from: 'DocumentChunker', to: 'Visual Extractor Agent', description: 'Chunks with images (parallel)' },
      { from: 'DocumentChunker', to: 'Domain Expert Agent', description: 'Chunks (parallel)' },
      { from: 'Visual Extractor Agent', to: 'Context Manager', description: 'Elements + embeddings' },
      { from: 'Domain Expert Agent', to: 'Context Manager', description: 'Interpretations' },
      { from: 'Context Manager', to: 'Cross-Ref Resolver Agent', description: 'Component graph' },
      { from: 'Cross-Ref Resolver Agent', to: 'Context Manager', description: 'Updated edges' },
      { from: 'Context Manager', to: 'Hierarchical Synthesizer Agent', description: 'Full context' },
      { from: 'Hierarchical Synthesizer Agent', to: 'Query Handler Agent', description: 'Multi-level analysis' },
      { from: 'Query Handler Agent', to: 'Context Manager', description: 'Semantic retrieval (feedback loop)' }
    ]
  }
};
