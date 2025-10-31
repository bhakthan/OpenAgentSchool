import { PatternData } from './types';

export const quantumAcceleratedSearchPattern: PatternData = {
  id: 'quantum-accelerated-search',
  name: 'Quantum-Accelerated Search Agent',
  description: 'Integrates Grover\'s algorithm and amplitude amplification into agent tool-calling frameworks for quadratic speedup in unstructured database search, pattern matching, and knowledge graph queries.',
  category: 'Advanced',
  useCases: [
    'Knowledge graph search - find entities/relationships in massive semantic networks',
    'Document retrieval - search unindexed/unstructured text corpora',
    'Pattern matching - detect anomalies, fraud, or rare events in logs/transactions',
    'Cryptographic key search - accelerated brute-force search (security analysis)',
    'SQL query acceleration - find rows matching complex predicates faster'
  ],
  whenToUse: 'Adopt when searching large unstructured datasets (N > 10^6 items) where classical search is O(N) and quantum offers O(√N) speedup, or when existing indexes insufficient.',
  businessUseCase: {
    industry: 'Healthcare & Medical Research',
    description: 'A pharmaceutical research company uses quantum-accelerated search to query a knowledge graph of 50 million biomedical entities (genes, proteins, drugs, diseases). Classical graph traversal takes 10+ minutes for complex queries. Grover\'s algorithm finds matching entities in ~300ms by exploiting quantum superposition. The agent uses Grover as a tool, integrating with RAG pipelines to answer questions like "Find all proteins interacting with BRCA1 that are targeted by FDA-approved drugs". This accelerates drug repurposing research by 20x.',
    visualization: () => null as any,
    enlightenMePrompt: `Design a quantum-accelerated search agent for knowledge graph queries.

Provide:
- Grover oracle design: Map knowledge graph predicate (e.g., "proteins interacting with BRCA1") to quantum oracle function.
- Agent tool integration: Expose Grover search as a tool callable by LLM agent (like retrieval tool in RAG).
- Hybrid classical-quantum workflow: Agent decomposes query, calls Grover for search-heavy parts, assembles final answer.
- Quantum backend selection: Gate-based simulator (Qiskit, Cirq) vs real quantum hardware (IBM Quantum, IonQ).
- Performance optimization: Batch queries, cache quantum results, fall back to classical search if problem size small.
- Result validation: Verify quantum search results match classical (cross-check for errors).`
  },
  nodes: [
    {
      id: 'user-query',
      type: 'input',
      data: { label: 'User Query', nodeType: 'input', description: 'Natural language question' },
      position: { x: 100, y: 240 }
    },
    {
      id: 'query-planner',
      type: 'default',
      data: { label: 'Query Planner', nodeType: 'planner', description: 'Decompose into subqueries' },
      position: { x: 320, y: 240 }
    },
    {
      id: 'search-router',
      type: 'default',
      data: { label: 'Search Router', nodeType: 'planner', description: 'Quantum vs classical decision' },
      position: { x: 540, y: 240 }
    },
    {
      id: 'grover-search',
      type: 'default',
      data: { label: 'Grover Search', nodeType: 'llm', description: 'Quantum search oracle' },
      position: { x: 760, y: 160 }
    },
    {
      id: 'classical-search',
      type: 'default',
      data: { label: 'Classical Search', nodeType: 'planner', description: 'Elasticsearch / SQL' },
      position: { x: 760, y: 320 }
    },
    {
      id: 'result-aggregator',
      type: 'default',
      data: { label: 'Result Aggregator', nodeType: 'planner', description: 'Combine quantum + classical' },
      position: { x: 980, y: 240 }
    },
    {
      id: 'answer-generator',
      type: 'default',
      data: { label: 'Answer Generator', nodeType: 'llm', description: 'LLM synthesizes final answer' },
      position: { x: 1200, y: 180 }
    },
    {
      id: 'answer-output',
      type: 'output',
      data: { label: 'Answer', nodeType: 'output', description: 'Natural language response' },
      position: { x: 1400, y: 240 }
    }
  ],
  edges: [
    { id: 'edge-query-planner', source: 'user-query', target: 'query-planner', animated: true },
    { id: 'edge-planner-router', source: 'query-planner', target: 'search-router', animated: true },
    { id: 'edge-router-grover', source: 'search-router', target: 'grover-search', animated: true, label: 'Large N' },
    { id: 'edge-router-classical', source: 'search-router', target: 'classical-search', animated: true, label: 'Small N / indexed' },
    { id: 'edge-grover-aggregator', source: 'grover-search', target: 'result-aggregator', animated: true },
    { id: 'edge-classical-aggregator', source: 'classical-search', target: 'result-aggregator', animated: true },
    { id: 'edge-aggregator-generator', source: 'result-aggregator', target: 'answer-generator', animated: true },
    { id: 'edge-generator-output', source: 'answer-generator', target: 'answer-output', animated: true }
  ],
  codeExample: `// TypeScript: Agent tool integration for quantum search
interface SearchTool {
  name: string;
  execute: (query: string, dataset: string[]) => Promise<string[]>;
}

export class QuantumSearchAgent {
  private quantumBackend: QuantumSimulator;
  private llm: LLM;
  
  async answerQuestion(question: string): Promise<string> {
    // LLM decomposes question into search queries
    const plan = await this.llm.plan({
      prompt: \`Question: \${question}
      
      Decompose into search queries over knowledge graph.
      Use grover_search tool for large datasets (>10K entities).\`,
      tools: [this.getGroverSearchTool(), this.getElasticsearchTool()]
    });
    
    // Execute plan (hybrid quantum + classical)
    const results = await this.executePlan(plan);
    
    // LLM synthesizes final answer
    const answer = await this.llm.generate({
      prompt: \`Question: \${question}
      Search results: \${JSON.stringify(results)}
      
      Synthesize a comprehensive answer.\`
    });
    
    return answer;
  }
  
  private getGroverSearchTool(): SearchTool {
    return {
      name: 'grover_search',
      execute: async (query: string, dataset: string[]) => {
        const N = dataset.length;
        const n_qubits = Math.ceil(Math.log2(N));
        
        // Build Grover circuit
        const circuit = this.buildGroverCircuit(query, dataset, n_qubits);
        
        // Execute on quantum backend
        const result = await this.quantumBackend.execute(circuit, { shots: 1000 });
        
        // Parse winner
        const winner = this.parseQuantumResult(result);
        
        // Verify
        if (this.matchesQuery(query, dataset[winner])) {
          return [dataset[winner]];
        } else {
          // Quantum error - retry with more shots
          return await this.retryGroverSearch(query, dataset, { shots: 5000 });
        }
      }
    };
  }
}`,
  pythonCodeExample: `# Python: Grover search agent for knowledge graph queries
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
from qiskit_aer import AerSimulator
import numpy as np

class GroverKnowledgeGraphAgent:
    def __init__(self):
        self.quantum_backend = AerSimulator()
        self.llm = LLM(model='gpt-4')
        
    async def answer_medical_query(self, query: str):
        # LLM decomposes query into subqueries
        subqueries = await self.llm.decompose_query(query)
        
        results = []
        for subquery in subqueries:
            candidates = await self.fetch_candidates(subquery)
            
            # Route to quantum or classical search
            if len(candidates) > 10000:
                matches = await self.grover_search(subquery, candidates)
            else:
                matches = [c for c in candidates if subquery.predicate(c)]
            
            results.extend(matches)
        
        # LLM synthesizes answer
        answer = await self.llm.generate_answer(query, results)
        return answer
    
    async def grover_search(self, predicate, candidates):
        N = len(candidates)
        n_qubits = int(np.ceil(np.log2(N)))
        
        # Build oracle (marks entities satisfying predicate)
        def oracle_function(state):
            idx = int(state, 2)
            return idx < len(candidates) and predicate(candidates[idx])
        
        # Construct Grover circuit
        qr = QuantumRegister(n_qubits, 'q')
        cr = ClassicalRegister(n_qubits, 'c')
        qc = QuantumCircuit(qr, cr)
        
        # Initialize superposition
        qc.h(qr)
        
        # Grover iterations
        optimal_iters = int(np.pi / 4 * np.sqrt(N))
        for _ in range(optimal_iters):
            self.apply_oracle(qc, qr, oracle_function)
            self.apply_diffusion(qc, qr)
        
        # Measure
        qc.measure(qr, cr)
        
        # Execute
        job = self.quantum_backend.run(qc, shots=1000)
        result = job.result()
        counts = result.get_counts()
        
        # Parse winner
        winner_state = max(counts, key=counts.get)
        winner_idx = int(winner_state, 2)
        
        if winner_idx < len(candidates):
            return [candidates[winner_idx]]
        return []`,
  implementation: [
    'Set up quantum backend: Qiskit Aer simulator (local), IBM Quantum (cloud gate-based), IonQ (trapped ion), or AWS Braket.',
    'Build oracle function: Map your search predicate (e.g., "proteins interacting with BRCA1") to quantum phase oracle circuit.',
    'Implement Grover circuit: Superposition initialization, oracle application, diffusion operator, optimal iterations π/4√N.',
    'Integrate as agent tool: Expose Grover search as callable function in LangChain, LlamaIndex, or custom agent framework.',
    'Add routing logic: Use quantum search for N > 10K items, classical search otherwise (measure crossover empirically).',
    'Validate quantum results: Cross-check with classical search, implement error mitigation (increase shots, repeat measurements).'
  ],
  advantages: [
    'Quadratic speedup: Grover finds target in O(√N) queries vs O(N) classical - dramatic for large N (e.g., 1M items → 1K queries).',
    'Provably optimal: No quantum algorithm can search unstructured database faster than Grover.',
    'Applicable to many domains: Database search, pattern matching, constraint satisfaction, cryptographic key search.',
    'Integrates with existing agents: Drop-in replacement for classical search tools in RAG, tool-calling pipelines.',
    'Scales with quantum hardware: Performance improves as qubit count and gate fidelity increase.'
  ],
  limitations: [
    'Quantum overhead: Circuit construction, oracle building, measurement add latency - only beneficial for N > 10^4.',
    'Oracle complexity: Some predicates map poorly to quantum circuits (e.g., complex string matching, ML models).',
    'Error rates: NISQ-era quantum computers have 0.1-1% gate errors - solutions may need validation.',
    'Quantum cloud costs: ~$1.60/hour IBM Quantum, ~$0.30/shot IonQ - expensive for frequent small queries.',
    'Limited speedup in practice: Real-world speedup often 2-10x (not full √N) due to overhead and errors.'
  ],
  relatedPatterns: [
    'hybrid-quantum-classical-agent',
    'quantum-enhanced-navigator',
    'retrieval-augmented-generation',
    'tool-calling-orchestrator'
  ],

  velocityProfile: {
    impact: 'medium',
    timeToImplement: '1-2 weeks',
    complexityReduction: 'Low - Grover circuit implementation straightforward, but oracle design requires quantum expertise',
    reusabilityScore: 6,
    learningCurve: 'steep',
    velocityPractices: [
      'Pattern Fluency - Applicable to knowledge graphs, document retrieval, fraud detection, cryptanalysis',
      'Architecture Templates - Qiskit Grover + LangChain tool integration + result validation',
      'Incremental Delivery - Start with simulator, validate oracle correctness, deploy to real quantum hardware',
      'Failure Scenario Libraries - Quantum measurement errors, oracle bugs, backend timeouts, cost overruns',
      'Operational Instrumentation - Track quantum search latency, error rate, cost per query, speedup vs classical'
    ]
  },

  evaluation: 'Compare quantum vs classical search time, accuracy (did quantum find correct answer?), cost per query, and speedup factor. Measure crossover point (N value) where quantum becomes faster than classical for your specific use case.',
  
  evaluationProfile: {
    scenarioFocus: 'Unstructured search over large datasets where classical is O(N) and no index exists',
    criticalMetrics: [
      'Search latency: quantum vs classical (ms)',
      'Accuracy: % of queries where quantum found correct answer',
      'Speedup factor: classical_time / quantum_time',
      'Cost per query: quantum cloud fees',
      'Crossover N: problem size where quantum becomes faster',
      'Error rate: % of quantum results requiring classical verification'
    ],
    evaluationNotes: [
      'Quantum advantage emerges for N > 10^4-10^6 depending on oracle complexity and backend',
      'Measure end-to-end latency including circuit construction, backend queue time, result parsing',
      'Track quantum error rate - increase shots or use error mitigation if high',
      'A/B test quantum vs classical for your specific query types'
    ],
    cohort: 'advanced-automation',
    readinessSignals: [
      'Searching datasets with >100K items where classical is O(N)',
      'No existing index (or index infeasible due to complex predicates)',
      'Latency-sensitive application where 10-100x speedup impactful',
      'Budget for quantum cloud costs ($200-1000/month depending on query frequency)'
    ],
    dataNeeds: [
      'Representative query workload for benchmarking',
      'Dataset size distribution (how many queries hit N > 10K?)',
      'Classical baseline performance (latency, cost)',
      'Oracle correctness validation dataset'
    ]
  }
};
