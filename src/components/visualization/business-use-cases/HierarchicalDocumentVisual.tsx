import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Play,
  Pause,
  ArrowClockwise,
  FileText,
  Eye,
  Brain,
  Network,
  Tree,
  Question,
  Database,
  Lightning,
  CheckCircle,
  ArrowRight,
  CurrencyDollar,
  Clock,
  Warning,
  ChartLine,
  Info
} from '@phosphor-icons/react';
import { Loader2 } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  status: 'idle' | 'processing' | 'complete' | 'error';
  icon: React.ReactNode;
  output: string;
  details?: string;
  processingTime?: number;
  cost?: number;
}

interface ChunkInfo {
  id: string;
  elementsFound: number;
  interpretations: number;
  crossRefs: number;
}

interface PerformanceMetrics {
  totalTime: number;
  totalCost: number;
  apiCalls: number;
  tokensProcessed: number;
  successRate: number;
}

export const HierarchicalDocumentVisual: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [stage, setStage] = useState(0);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [errorScenario, setErrorScenario] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [queryResult, setQueryResult] = useState<string | null>(null);
  const [isQuerying, setIsQuerying] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([
    { 
      id: 'preprocessor', 
      name: 'Preprocessor', 
      status: 'idle', 
      icon: <FileText size={16} />, 
      output: '',
      details: 'Intelligent chunking with 15% overlap. Preserves context boundaries like title blocks and detail callouts.',
      processingTime: 0,
      cost: 0
    },
    { 
      id: 'visual', 
      name: 'Visual Extractor', 
      status: 'idle', 
      icon: <Eye size={16} />, 
      output: '',
      details: 'GPT-4V parallel processing. Extracts symbols, connections, labels from engineering diagrams.',
      processingTime: 0,
      cost: 0
    },
    { 
      id: 'domain', 
      name: 'Domain Expert', 
      status: 'idle', 
      icon: <Brain size={16} />, 
      output: '',
      details: 'Applies IEC/ANSI/IEEE standards knowledge. Interprets component functions and specifications.',
      processingTime: 0,
      cost: 0
    },
    { 
      id: 'xref', 
      name: 'Cross-Ref Resolver', 
      status: 'idle', 
      icon: <Network size={16} />, 
      output: '',
      details: 'Graph traversal to link detail callouts, page references, and drawing dependencies.',
      processingTime: 0,
      cost: 0
    },
    { 
      id: 'synthesizer', 
      name: 'Synthesizer', 
      status: 'idle', 
      icon: <Tree size={16} />, 
      output: '',
      details: 'Creates 4-level hierarchy: components → subsystems → systems → meta-analysis.',
      processingTime: 0,
      cost: 0
    },
    { 
      id: 'query', 
      name: 'Query Handler', 
      status: 'idle', 
      icon: <Question size={16} />, 
      output: '',
      details: 'Semantic search (ChromaDB) + graph traversal (NetworkX) within 50K context window.',
      processingTime: 0,
      cost: 0
    }
  ]);
  const [chunks, setChunks] = useState<ChunkInfo[]>([]);
  const [contextMemory, setContextMemory] = useState({
    vectorStore: 0,
    graphNodes: 0,
    totalTokens: 0
  });
  const [logs, setLogs] = useState<string[]>([]);
  const [synthesis, setSynthesis] = useState<any>(null);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    totalTime: 0,
    totalCost: 0,
    apiCalls: 0,
    tokensProcessed: 0,
    successRate: 100
  });

  const stages = [
    'PDF loaded (200 pages, 2.1M tokens)',
    'Creating 25 intelligent chunks (15% overlap)',
    'Extracting visual elements from chunks',
    'Domain expert interpretation',
    'Building vector + graph memory',
    'Resolving cross-references',
    'Hierarchical synthesis',
    'Ready for queries'
  ];

  const codeSteps = [
    `# Load dense PDF document
doc = fitz.open("electrical_schematic.pdf")
print(f"Pages: {len(doc)}")
# Output: Pages: 200`,

    `# Stage 1: Intelligent chunking
chunker = DocumentChunker(
    chunk_size=8000,
    overlap=0.15  # 15% overlap
)
chunks = chunker.create_overlapping_chunks(doc)
print(f"Created {len(chunks)} chunks")`,

    `# Stage 2: Visual extraction (parallel)
visual_tasks = [
    visual_extractor.run(
        f"Extract elements from {chunk.id}",
        image=chunk.image
    )
    for chunk in chunks
]
results = await asyncio.gather(*visual_tasks)
# Found: 847 symbols, 1200+ connections`,

    `# Stage 3: Domain expert analysis
domain_expert = Agent(
    context_providers=[
        DomainExpert('electrical')
    ]
)
interpretations = await domain_expert.run(
    "Analyze components",
    visual_elements=results
)
# 234 components interpreted`,

    `# Stage 4: Build context memory
context_mgr = ContextManager()
for chunk in chunks:
    embedding = await embed(chunk.content)
    context_mgr.add_chunk(
        chunk.id, chunk.content,
        embedding, metadata
    )
# Vector DB: 25 chunks, Graph: 234 nodes`,

    `# Stage 5: Cross-reference resolution
xref_resolver = Agent(...)
cross_refs = await xref_resolver.resolve(chunks)
# Resolved: 47 detail callouts, 12 page refs`,

    `# Stage 6: Hierarchical synthesis
synthesizer = Agent(...)
result = await synthesizer.run(
    "Synthesize findings",
    chunks=chunks,
    interpretations=interpretations
)
# Levels: Components → Subsystems → System`,

    `# Stage 7: Query with memory
query_handler = Agent(
    context_providers=[ContextManager()]
)
answer = await query_handler.run(
    "What are the safety systems?"
)
print(answer['answer'])
# Uses vector search + graph traversal`
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && stage < stages.length) {
      interval = setInterval(() => {
        setStage(prev => {
          const nextStage = prev + 1;
          
          // Update agent states based on stage
          if (nextStage === 1) {
            setChunks(Array.from({ length: 25 }, (_, i) => ({
              id: `chunk_${i}`,
              elementsFound: 0,
              interpretations: 0,
              crossRefs: 0
            })));
            setAgents(prev => prev.map(a => 
              a.id === 'preprocessor' ? { 
                ...a, 
                status: 'processing', 
                output: '25 chunks created',
                processingTime: 2.1,
                cost: 0
              } : a
            ));
            setLogs(prev => [...prev, '📄 Created 25 overlapping chunks']);
            setMetrics(prev => ({ 
              ...prev, 
              apiCalls: prev.apiCalls + 1,
              tokensProcessed: prev.tokensProcessed + 2100000
            }));
          }
          
          if (nextStage === 2) {
            const hasError = errorScenario && Math.random() < 0.3;
            setAgents(prev => prev.map(a => {
              if (a.id === 'preprocessor') return { ...a, status: 'complete', processingTime: 2.1 };
              if (a.id === 'visual') return { 
                ...a, 
                status: hasError ? 'error' : 'processing', 
                output: hasError ? 'GPT-4V rate limit' : 'Extracting...',
                processingTime: 0,
                cost: 0
              };
              return a;
            }));
            if (hasError) {
              setLogs(prev => [...prev, '⚠️  Error: Vision API rate limit hit - retrying...']);
              setMetrics(prev => ({ ...prev, successRate: 85 }));
            } else {
              setLogs(prev => [...prev, '👁️  Parallel visual extraction started']);
              setMetrics(prev => ({ 
                ...prev, 
                apiCalls: prev.apiCalls + 25
              }));
            }
          }
          
          if (nextStage === 3) {
            setChunks(prev => prev.map(c => ({
              ...c,
              elementsFound: Math.floor(Math.random() * 50) + 20
            })));
            setAgents(prev => prev.map(a => {
              if (a.id === 'visual') return { 
                ...a, 
                status: 'complete', 
                output: '847 elements found',
                processingTime: 18.4,
                cost: 12.40
              };
              if (a.id === 'domain') return { 
                ...a, 
                status: 'processing', 
                output: 'Analyzing...',
                processingTime: 0,
                cost: 0
              };
              return a;
            }));
            setLogs(prev => [...prev, '🧠 Domain expert interpretation started']);
            setMetrics(prev => ({ 
              ...prev, 
              apiCalls: prev.apiCalls + 25,
              tokensProcessed: prev.tokensProcessed + 1200000,
              totalCost: 12.40
            }));
          }
          
          if (nextStage === 4) {
            setChunks(prev => prev.map(c => ({
              ...c,
              interpretations: Math.floor(Math.random() * 15) + 5
            })));
            setAgents(prev => prev.map(a => {
              if (a.id === 'domain') return { 
                ...a, 
                status: 'complete', 
                output: '234 components interpreted',
                processingTime: 14.2,
                cost: 3.85
              };
              return a;
            }));
            setContextMemory({ vectorStore: 0, graphNodes: 0, totalTokens: 0 });
            setLogs(prev => [...prev, '💾 Building context memory...']);
            setMetrics(prev => ({ 
              ...prev, 
              apiCalls: prev.apiCalls + 25,
              tokensProcessed: prev.tokensProcessed + 850000,
              totalCost: prev.totalCost + 3.85,
              totalTime: 34.7
            }));
          }
          
          if (nextStage === 5) {
            setContextMemory({ vectorStore: 25, graphNodes: 234, totalTokens: 50000 });
            setAgents(prev => prev.map(a => 
              a.id === 'xref' ? { 
                ...a, 
                status: 'processing', 
                output: 'Resolving...',
                processingTime: 0,
                cost: 0
              } : a
            ));
            setLogs(prev => [...prev, '🔗 Cross-reference resolution started']);
            setMetrics(prev => ({ 
              ...prev, 
              apiCalls: prev.apiCalls + 1,
              totalTime: prev.totalTime + 1.2
            }));
          }
          
          if (nextStage === 6) {
            setChunks(prev => prev.map(c => ({
              ...c,
              crossRefs: Math.floor(Math.random() * 3)
            })));
            setAgents(prev => prev.map(a => {
              if (a.id === 'xref') return { 
                ...a, 
                status: 'complete', 
                output: '59 references resolved',
                processingTime: 6.8,
                cost: 0.42
              };
              if (a.id === 'synthesizer') return { 
                ...a, 
                status: 'processing', 
                output: 'Synthesizing...',
                processingTime: 0,
                cost: 0
              };
              return a;
            }));
            setLogs(prev => [...prev, '🎯 Hierarchical synthesis started']);
            setMetrics(prev => ({ 
              ...prev, 
              apiCalls: prev.apiCalls + 4,
              totalCost: prev.totalCost + 0.42,
              totalTime: prev.totalTime + 6.8
            }));
          }
          
          if (nextStage === 7) {
            setSynthesis({
              components: 234,
              subsystems: 12,
              systems: 3,
              quality: 0.95
            });
            setAgents(prev => prev.map(a => {
              if (a.id === 'synthesizer') return { 
                ...a, 
                status: 'complete', 
                output: 'Multi-level synthesis complete',
                processingTime: 8.9,
                cost: 1.24
              };
              if (a.id === 'query') return { 
                ...a, 
                status: 'complete', 
                output: 'Ready for questions',
                processingTime: 0.5,
                cost: 0.08
              };
              return a;
            }));
            setLogs(prev => [...prev, '✅ Analysis complete - ready for queries!']);
            setMetrics(prev => ({ 
              ...prev, 
              apiCalls: prev.apiCalls + 1,
              tokensProcessed: prev.tokensProcessed + 450000,
              totalCost: prev.totalCost + 1.32,
              totalTime: prev.totalTime + 9.4
            }));
          }
          
          if (nextStage >= stages.length) {
            setIsRunning(false);
            setMetrics(prev => ({ 
              ...prev,
              totalTime: 50.6,
              totalCost: 18.01
            }));
            return 0;
          }
          
          return nextStage;
        });
      }, 2000);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, stage]);

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setStage(0);
    setLogs([]);
    setChunks([]);
    setContextMemory({ vectorStore: 0, graphNodes: 0, totalTokens: 0 });
    setSynthesis(null);
    setAgents(prev => prev.map(a => ({ 
      ...a, 
      status: 'idle', 
      output: '', 
      processingTime: 0, 
      cost: 0 
    })));
    setMetrics({
      totalTime: 0,
      totalCost: 0,
      apiCalls: 0,
      tokensProcessed: 0,
      successRate: 100
    });
    setSelectedAgent(null);
    setQueryResult(null);
    setUserQuery('');
  };

  const handleAgentClick = (agentId: string) => {
    setSelectedAgent(selectedAgent === agentId ? null : agentId);
  };

  const handleQuerySubmit = async () => {
    if (!userQuery.trim() || stage < 7) return;
    
    setIsQuerying(true);
    setQueryResult(null);
    
    // Simulate query processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const sampleResponses: Record<string, string> = {
      'safety': '**Safety Systems Found:**\n• Emergency shutdown system (ESD) with redundant PLCs\n• Fire detection and suppression (FM-200 system)\n• Ground fault protection on all circuits\n• Arc flash detection on main switchgear\n• Backup power for critical safety loads\n\n**Standards Compliance:** IEC 61508 (SIL 2), NFPA 70E\n**Sources:** Pages 45-48, 92-95, 156-158',
      'power': '**Primary Power Supply:**\n• 480V/277V 3-phase, 60Hz, 2500A service\n• Two utility feeds (N+1 redundancy)\n• Main switchgear: 4000A rated, 65kA SCCR\n• Power factor correction: 0.95 target\n\n**Backup Systems:**\n• 2x 2.5MW diesel generators (Gen-A, Gen-B)\n• 1x 1.8MW natural gas generator (Gen-C)\n• 500kVA battery UPS (15-minute runtime)\n\n**Sources:** Pages 12-18, 42-45, 89-92',
      'component': '**Major Components Identified:**\n• 234 total components parsed\n• Transformers: 12 units (ranging 75kVA to 2500kVA)\n• Circuit breakers: 89 units (molded case and power)\n• Motor control centers: 8 units\n• Variable frequency drives: 23 units\n• Protective relays: 45 units\n\n**Subsystems:** 12 functional groups\n**Systems:** 3 integrated systems\n\n**Sources:** Full document analysis, component list pages 200-210',
      'default': `**Query:** "${userQuery}"\n\n**Analysis:** Using semantic search across 25 vector-indexed chunks and graph traversal of 234 component nodes...\n\n**Answer:** Based on the hierarchical analysis, the system contains comprehensive documentation covering electrical distribution, control systems, and safety infrastructure. The 4-level synthesis reveals:\n\n• **Component Level:** 234 individual parts with full specifications\n• **Subsystem Level:** 12 functional groups (power distribution, motor control, protection)\n• **System Level:** 3 major systems with redundancy and operational modes\n• **Meta-Analysis:** Well-designed electrical infrastructure meeting IEC/ANSI standards\n\n**Confidence:** 87% (high correlation across multiple document sections)\n**Processing Time:** 2.3 seconds\n**Context Used:** 48.5K tokens (within 50K limit)\n**Sources:** Cross-referenced 8 document sections`
    };
    
    let response = sampleResponses.default;
    const query = userQuery.toLowerCase();
    
    if (query.includes('safety') || query.includes('emergency')) {
      response = sampleResponses.safety;
    } else if (query.includes('power') || query.includes('supply') || query.includes('backup')) {
      response = sampleResponses.power;
    } else if (query.includes('component') || query.includes('equipment')) {
      response = sampleResponses.component;
    }
    
    setQueryResult(response);
    setIsQuerying(false);
    setMetrics(prev => ({
      ...prev,
      apiCalls: prev.apiCalls + 3,
      tokensProcessed: prev.tokensProcessed + 48500,
      totalCost: prev.totalCost + 0.12,
      totalTime: prev.totalTime + 2.3
    }));
    setLogs(prev => [...prev, `🔍 Query executed: "${userQuery.slice(0, 50)}..."`]);
  };

  return (
    <div className="w-full space-y-4">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightning className="text-yellow-500" size={20} />
            Hierarchical Document Intelligence - Live Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button onClick={toggleSimulation} variant={isRunning ? "destructive" : "default"} disabled={isRunning && stage > 0}>
              {isRunning ? <Pause size={16} /> : <Play size={16} />}
              {isRunning ? 'Processing' : 'Start'} Analysis
            </Button>
            <Button onClick={resetSimulation} variant="outline">
              <ArrowClockwise size={16} />
              Reset
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Watch 6 specialized agents parse a 200-page engineering schematic (2.1M tokens) within a 50K context window using intelligent chunking, vector memory, and graph relationships.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Agent Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Agent Pipeline (6 Stages)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 min-h-[320px]">
              {agents.map((agent, i) => (
                <div 
                  key={agent.id}
                  onClick={() => handleAgentClick(agent.id)}
                  className={`p-3 rounded border transition-all cursor-pointer hover:shadow-md ${
                    agent.status === 'processing' 
                      ? 'bg-blue-100 dark:bg-blue-950/30 border-blue-400 dark:border-blue-500 shadow-lg' 
                      : agent.status === 'complete'
                      ? 'bg-green-100 dark:bg-green-950/30 border-green-400 dark:border-green-500'
                      : agent.status === 'error'
                      ? 'bg-red-100 dark:bg-red-950/30 border-red-400 dark:border-red-500'
                      : 'bg-muted/40'
                  } ${selectedAgent === agent.id ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 font-medium text-sm text-gray-800 dark:text-gray-200">
                      {agent.icon}
                      {agent.name}
                      {selectedAgent === agent.id && <Info size={12} className="text-blue-500" />}
                    </div>
                    <div className="flex items-center gap-2">
                      {agent.processingTime > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          <Clock size={10} className="mr-1" />
                          {agent.processingTime}s
                        </Badge>
                      )}
                      {agent.cost > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          <CurrencyDollar size={10} className="mr-1" />
                          ${agent.cost.toFixed(2)}
                        </Badge>
                      )}
                      {agent.status === 'complete' && (
                        <CheckCircle size={14} className="text-green-600" weight="fill" />
                      )}
                      {agent.status === 'processing' && (
                        <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      )}
                      {agent.status === 'error' && (
                        <Warning size={14} className="text-red-600" weight="fill" />
                      )}
                    </div>
                  </div>
                  {agent.output && (
                    <div className="text-xs text-muted-foreground mb-1">{agent.output}</div>
                  )}
                  {selectedAgent === agent.id && agent.details && (
                    <div className="mt-2 pt-2 border-t text-xs text-muted-foreground italic">
                      💡 {agent.details}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Code Execution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Agent Framework Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs h-[320px] overflow-auto">
              <pre className="whitespace-pre-wrap">{codeSteps[Math.min(stage, codeSteps.length - 1)]}</pre>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Context Memory Visualization */}
      {contextMemory.vectorStore > 0 && (
        <Card className="border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Database size={20} className="text-purple-500" />
              Context Memory (Vector + Graph)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-950/30 rounded border border-purple-300 dark:border-purple-800">
                <div className="text-xs text-gray-600 dark:text-muted-foreground mb-1">Vector Store</div>
                <div className="text-xl font-bold text-purple-700 dark:text-purple-400">{contextMemory.vectorStore}</div>
                <div className="text-xs text-gray-600 dark:text-muted-foreground">chunks indexed</div>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-950/30 rounded border border-blue-300 dark:border-blue-800">
                <div className="text-xs text-gray-600 dark:text-muted-foreground mb-1">Graph Nodes</div>
                <div className="text-xl font-bold text-blue-700 dark:text-blue-400">{contextMemory.graphNodes}</div>
                <div className="text-xs text-gray-600 dark:text-muted-foreground">components mapped</div>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-950/30 rounded border border-green-300 dark:border-green-800">
                <div className="text-xs text-gray-600 dark:text-muted-foreground mb-1">Working Memory</div>
                <div className="text-xl font-bold text-green-700 dark:text-green-400">{(contextMemory.totalTokens / 1000).toFixed(0)}K</div>
                <div className="text-xs text-gray-600 dark:text-muted-foreground">tokens (of 50K limit)</div>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-950/30 rounded border border-orange-300 dark:border-orange-800">
                <div className="text-xs text-gray-600 dark:text-muted-foreground mb-1">Total Document</div>
                <div className="text-xl font-bold text-orange-700 dark:text-orange-400">2.1M</div>
                <div className="text-xs text-gray-600 dark:text-muted-foreground">tokens (42x limit!)</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-muted/40 rounded text-xs">
              <div className="font-semibold mb-1">Memory Strategy</div>
              <div className="text-muted-foreground">
                Context Providers enable accessing 2.1M token document through:
                <ul className="list-disc list-inside mt-1 space-y-0.5">
                  <li>Intelligent chunking with 15% overlap (preserves context)</li>
                  <li>Vector similarity search (semantic retrieval)</li>
                  <li>Graph traversal (relationship following)</li>
                  <li>Redis persistence (cross-session memory)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Synthesis Results */}
      {synthesis && (
        <Card className="border-green-300 dark:border-green-800 bg-green-100/50 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Tree size={20} className="text-green-700 dark:text-green-400" />
              Hierarchical Synthesis Complete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div>
                <div className="text-xs text-gray-600 dark:text-muted-foreground">Level 1: Components</div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-400">{synthesis.components}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-muted-foreground">Level 2: Subsystems</div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{synthesis.subsystems}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-muted-foreground">Level 3: Systems</div>
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">{synthesis.systems}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600 dark:text-muted-foreground">Document Quality</div>
                <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">{(synthesis.quality * 100).toFixed(0)}%</div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <ArrowRight size={16} className="text-green-700 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">Component Level:</span>
                  <span className="text-gray-700 dark:text-muted-foreground ml-1">
                    234 components identified with specs, connections, and locations
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight size={16} className="text-blue-700 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">Subsystem Level:</span>
                  <span className="text-gray-700 dark:text-muted-foreground ml-1">
                    12 functional subsystems (Power Distribution, Control Loops, Safety Systems, etc.)
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight size={16} className="text-purple-700 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">System Level:</span>
                  <span className="text-gray-700 dark:text-muted-foreground ml-1">
                    3 integrated systems with operational modes, safety philosophy, key parameters
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Metrics Dashboard */}
      {stage > 0 && (
        <Card className="border-blue-300 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ChartLine size={20} className="text-blue-700 dark:text-blue-400" />
              Performance Metrics
              {errorScenario && (
                <Badge variant="destructive" className="ml-2">
                  <Warning size={12} className="mr-1" />
                  Error Scenario Active
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-950/30 rounded border border-blue-300 dark:border-blue-800">
                <div className="text-xs text-gray-600 dark:text-muted-foreground mb-1">Total Time</div>
                <div className="text-xl font-bold text-blue-700 dark:text-blue-400">
                  {metrics.totalTime.toFixed(1)}s
                </div>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-950/30 rounded border border-green-300 dark:border-green-800">
                <div className="text-xs text-gray-600 dark:text-muted-foreground mb-1">Total Cost</div>
                <div className="text-xl font-bold text-green-700 dark:text-green-400">
                  ${metrics.totalCost.toFixed(2)}
                </div>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-950/30 rounded border border-purple-300 dark:border-purple-800">
                <div className="text-xs text-gray-600 dark:text-muted-foreground mb-1">API Calls</div>
                <div className="text-xl font-bold text-purple-700 dark:text-purple-400">
                  {metrics.apiCalls}
                </div>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-950/30 rounded border border-orange-300 dark:border-orange-800">
                <div className="text-xs text-gray-600 dark:text-muted-foreground mb-1">Tokens</div>
                <div className="text-xl font-bold text-orange-700 dark:text-orange-400">
                  {(metrics.tokensProcessed / 1000000).toFixed(1)}M
                </div>
              </div>
              <div className="p-3 bg-teal-100 dark:bg-teal-950/30 rounded border border-teal-300 dark:border-teal-800">
                <div className="text-xs text-gray-600 dark:text-muted-foreground mb-1">Success Rate</div>
                <div className="text-xl font-bold text-teal-700 dark:text-teal-400">
                  {metrics.successRate}%
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-gray-700 dark:text-muted-foreground">
                💡 Cost includes: GPT-4V vision processing ($12.40), embeddings ($3.85), LLM calls ($1.76)
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setErrorScenario(!errorScenario)}
                className="text-xs"
              >
                {errorScenario ? 'Disable' : 'Enable'} Error Scenario
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interactive Query Interface */}
      {stage >= 7 && (
        <Card className="border-green-300 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Question size={20} className="text-green-700 dark:text-green-400" />
              Interactive Query Interface
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Sample Queries Section */}
              <div className="p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-950/30 dark:to-blue-950/30 rounded-lg border border-green-300 dark:border-green-800">
                <div className="text-sm font-semibold mb-3 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <Lightning size={16} className="text-green-700 dark:text-green-400" />
                  Try These Sample Queries:
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded border border-gray-300 dark:border-gray-700">
                    <div className="text-xs font-medium text-green-700 dark:text-green-400 mb-1">🛡️ Safety Systems</div>
                    <div className="text-xs text-gray-600 dark:text-muted-foreground mb-2">
                      "What are the safety systems?"
                    </div>
                    <div className="text-xs bg-gray-100 dark:bg-slate-800 p-2 rounded mb-2 border border-gray-200 dark:border-slate-700">
                      <strong className="text-gray-800 dark:text-gray-200">Returns:</strong> <span className="text-gray-700 dark:text-gray-300">ESD system, fire suppression, ground fault protection, arc flash detection, backup power for safety loads</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => setUserQuery('What are the safety systems?')}
                    >
                      Ask This
                    </Button>
                  </div>
                  
                  <div className="p-3 bg-white dark:bg-slate-900 rounded border border-gray-300 dark:border-gray-700">
                    <div className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-1">⚡ Power Supply</div>
                    <div className="text-xs text-gray-600 dark:text-muted-foreground mb-2">
                      "What is the primary power supply?"
                    </div>
                    <div className="text-xs bg-gray-100 dark:bg-slate-800 p-2 rounded mb-2 border border-gray-200 dark:border-slate-700">
                      <strong className="text-gray-800 dark:text-gray-200">Returns:</strong> <span className="text-gray-700 dark:text-gray-300">480V/277V 3-phase specs, 2x 2.5MW generators, 1x 1.8MW backup, 500kVA UPS, redundancy config</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => setUserQuery('What is the primary power supply?')}
                    >
                      Ask This
                    </Button>
                  </div>
                  
                  <div className="p-3 bg-white dark:bg-slate-900 rounded border border-gray-300 dark:border-gray-700">
                    <div className="text-xs font-medium text-purple-700 dark:text-purple-400 mb-1">🔧 Components</div>
                    <div className="text-xs text-gray-600 dark:text-muted-foreground mb-2">
                      "List major components"
                    </div>
                    <div className="text-xs bg-gray-100 dark:bg-slate-800 p-2 rounded mb-2 border border-gray-200 dark:border-slate-700">
                      <strong className="text-gray-800 dark:text-gray-200">Returns:</strong> <span className="text-gray-700 dark:text-gray-300">234 total components: 12 transformers, 89 breakers, 8 MCCs, 23 VFDs, 45 protective relays</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      onClick={() => setUserQuery('List major components')}
                    >
                      Ask This
                    </Button>
                  </div>
                </div>
              </div>

              {/* Query Input */}
              <div>
                <div className="text-sm font-medium mb-2">Or Ask Your Own Question:</div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your question here (e.g., 'What backup power systems exist?')"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleQuerySubmit()}
                    disabled={isQuerying}
                  />
                  <Button
                    onClick={handleQuerySubmit}
                    disabled={isQuerying || !userQuery.trim()}
                  >
                    {isQuerying ? <Loader2 className="animate-spin" size={16} /> : <Lightning size={16} />}
                    {isQuerying ? 'Querying...' : 'Query'}
                  </Button>
                </div>
              </div>

              {/* Query Result */}              {queryResult && (
                <div className="p-4 bg-green-100 dark:bg-green-950/30 rounded-lg border border-green-300 dark:border-green-800">
                  <div className="text-sm whitespace-pre-line text-gray-800 dark:text-gray-200">{queryResult}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Stage */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full animate-pulse" />
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {isRunning ? `Stage ${stage + 1}/${stages.length}: ${stages[stage]}` : 'Ready to start'}
            </span>
          </div>
          <p className="text-sm text-gray-700 dark:text-muted-foreground">
            {stage === 0 && "A 200-page electrical schematic PDF is loaded. Contains 2.1M tokens - far exceeding the 50K context limit."}
            {stage === 1 && "The DocumentChunker Context Provider creates 25 intelligent chunks with 15% overlap to preserve context boundaries (title blocks, detail callouts, etc.)."}
            {stage === 2 && "The Visual Extractor agent processes chunks in parallel using GPT-4V to identify symbols, connections, text annotations, and tables. Found 847+ visual elements."}
            {stage === 3 && "The Domain Expert agent applies electrical engineering knowledge (IEC standards, common patterns, failure modes) to interpret each component's function and specifications."}
            {stage === 4 && "The Context Manager builds vector embeddings for semantic search and creates a graph of component relationships. Redis stores everything for cross-session memory."}
            {stage === 5 && "The Cross-Reference Resolver links detail callouts, page references, and drawing dependencies using context from the graph structure."}
            {stage === 6 && "The Hierarchical Synthesizer creates multi-level understanding: Level 1 (components) → Level 2 (subsystems) → Level 3 (system integration) → Level 4 (meta-analysis)."}
            {stage === 7 && "Analysis complete! The Query Handler can now answer questions using vector search + graph traversal to retrieve relevant context within the 50K token budget."}
          </p>
        </CardContent>
      </Card>

      {/* Execution Log */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Execution Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg h-32 overflow-auto text-xs space-y-1">
            {logs.length === 0 ? (
              <div className="text-muted-foreground italic">Waiting to start...</div>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="text-muted-foreground">{log}</div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
