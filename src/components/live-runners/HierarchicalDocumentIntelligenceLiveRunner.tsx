import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Grid, 
  Eye, 
  BookOpen, 
  Database, 
  Link, 
  GitBranch, 
  MessageCircleQuestion,
  Play,
  RotateCcw,
  CheckCircle2,
  Loader2
} from 'lucide-react';

interface StageStatus {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'complete';
  output?: string;
  metrics?: Record<string, number | string>;
}

interface MemoryStats {
  vectorChunks: number;
  graphNodes: number;
  graphEdges: number;
  tokensInContext: number;
}

const stageIcons = {
  load: FileText,
  chunk: Grid,
  visual: Eye,
  domain: BookOpen,
  memory: Database,
  xref: Link,
  synthesize: GitBranch,
  query: MessageCircleQuestion
};

const stageDescriptions = {
  load: 'Loading 200-page electrical schematic (2.1M tokens)',
  chunk: 'Creating 25 overlapping chunks with 15% overlap',
  visual: 'Extracting diagram elements with GPT-4V',
  domain: 'Interpreting components using IEC 61082 standard',
  memory: 'Building vector store and relationship graph',
  xref: 'Resolving cross-references and dependencies',
  synthesize: 'Creating 4-level hierarchical understanding',
  query: 'Ready for semantic query execution'
};

const HierarchicalDocumentIntelligenceLiveRunner: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState<number>(-1);
  const [stages, setStages] = useState<StageStatus[]>([
    { id: 'load', name: 'Load PDF', status: 'pending' },
    { id: 'chunk', name: 'Chunk Document', status: 'pending' },
    { id: 'visual', name: 'Extract Visual', status: 'pending' },
    { id: 'domain', name: 'Domain Interpret', status: 'pending' },
    { id: 'memory', name: 'Build Memory', status: 'pending' },
    { id: 'xref', name: 'Resolve Cross-Refs', status: 'pending' },
    { id: 'synthesize', name: 'Synthesize Hierarchy', status: 'pending' },
    { id: 'query', name: 'Query Interface', status: 'pending' }
  ]);
  const [memoryStats, setMemoryStats] = useState<MemoryStats>({
    vectorChunks: 0,
    graphNodes: 0,
    graphEdges: 0,
    tokensInContext: 0
  });
  const [queryResult, setQueryResult] = useState<string>('');
  const [hierarchyLevels, setHierarchyLevels] = useState<string[]>([]);

  const updateStageStatus = (index: number, status: StageStatus['status'], output?: string, metrics?: Record<string, number | string>) => {
    setStages(prev => prev.map((stage, idx) => 
      idx === index ? { ...stage, status, output, metrics } : stage
    ));
  };

  const runPipeline = async () => {
    setIsRunning(true);
    setCurrentStage(0);
    setQueryResult('');
    setHierarchyLevels([]);
    
    // Reset all stages
    setStages(prev => prev.map(stage => ({ ...stage, status: 'pending', output: undefined, metrics: undefined })));
    setMemoryStats({ vectorChunks: 0, graphNodes: 0, graphEdges: 0, tokensInContext: 0 });

    // Stage 0: Load PDF
    updateStageStatus(0, 'processing');
    await new Promise(resolve => setTimeout(resolve, 1500));
    updateStageStatus(0, 'complete', 'Loaded: power_distribution_schematic.pdf', { 
      pages: 200, 
      totalTokens: '2.1M',
      fileSize: '45MB'
    });
    setCurrentStage(1);

    // Stage 1: Chunk Document
    updateStageStatus(1, 'processing');
    await new Promise(resolve => setTimeout(resolve, 1800));
    updateStageStatus(1, 'complete', 'Created 25 overlapping chunks', { 
      chunks: 25, 
      avgTokens: '84K',
      overlap: '15%'
    });
    setMemoryStats(prev => ({ ...prev, vectorChunks: 25 }));
    setCurrentStage(2);

    // Stage 2: Visual Extraction
    updateStageStatus(2, 'processing');
    await new Promise(resolve => setTimeout(resolve, 2200));
    updateStageStatus(2, 'complete', 'Extracted 847 visual elements', { 
      symbols: 453,
      connections: 312,
      labels: 82,
      cost: '$12.40'
    });
    setCurrentStage(3);

    // Stage 3: Domain Interpretation
    updateStageStatus(3, 'processing');
    await new Promise(resolve => setTimeout(resolve, 2000));
    updateStageStatus(3, 'complete', 'Interpreted 234 components', { 
      components: 234,
      standards: 'IEC 61082, ANSI Y32.2',
      accuracy: '92%'
    });
    setMemoryStats(prev => ({ ...prev, graphNodes: 234 }));
    setCurrentStage(4);

    // Stage 4: Build Memory
    updateStageStatus(4, 'processing');
    await new Promise(resolve => setTimeout(resolve, 1700));
    updateStageStatus(4, 'complete', 'Built hybrid memory system', { 
      vectorIndex: 'ChromaDB',
      graphDB: 'NetworkX',
      embeddings: 'text-embedding-3-small'
    });
    setMemoryStats(prev => ({ ...prev, graphEdges: 387, tokensInContext: 42000 }));
    setCurrentStage(5);

    // Stage 5: Cross-Reference Resolution
    updateStageStatus(5, 'processing');
    await new Promise(resolve => setTimeout(resolve, 1600));
    updateStageStatus(5, 'complete', 'Resolved 59 cross-references', { 
      detailCallouts: 34,
      pageRefs: 18,
      dependencies: 7
    });
    setMemoryStats(prev => ({ ...prev, graphEdges: 446, tokensInContext: 48500 }));
    setCurrentStage(6);

    // Stage 6: Hierarchical Synthesis
    updateStageStatus(6, 'processing');
    await new Promise(resolve => setTimeout(resolve, 2400));
    updateStageStatus(6, 'complete', 'Created 4-level hierarchy', { 
      levels: 4,
      components: 234,
      subsystems: 28,
      systems: 5
    });
    setHierarchyLevels([
      '🔧 Component Level: 234 individual parts (transformers, breakers, relays)',
      '⚙️ Subsystem Level: 28 functional groups (protection systems, distribution panels)',
      '🏭 System Level: 5 major systems (primary distribution, backup power, grounding)',
      '📊 Meta-Analysis: Complete facility power architecture with redundancy analysis'
    ]);
    setCurrentStage(7);

    // Stage 7: Query Interface
    updateStageStatus(7, 'processing');
    await new Promise(resolve => setTimeout(resolve, 1200));
    updateStageStatus(7, 'complete', 'Query interface ready', { 
      contextWindow: '50K tokens',
      accessibleDocs: '2.1M tokens',
      avgQueryTime: '2.3s'
    });
    
    // Simulate a query execution
    await new Promise(resolve => setTimeout(resolve, 800));
    setQueryResult(
      '**Query**: "What is the backup power capacity and redundancy configuration?"\n\n' +
      '**Answer**: The facility has a 2+1 redundant backup power configuration:\n' +
      '• Primary: Two 2.5MW diesel generators (Gen-A, Gen-B)\n' +
      '• Secondary: One 1.8MW natural gas generator (Gen-C)\n' +
      '• Battery UPS: 500kVA for 15-minute bridge\n' +
      '• Automatic transfer switches: 3-way (utility → Gen-A/B → Gen-C)\n' +
      '• Total capacity: 5MW primary + 1.8MW backup\n' +
      '• Design meets N+1 redundancy per IEC 60364-5-56\n\n' +
      '**Sources**: Pages 42-45 (single-line diagram), Pages 89-92 (gen specs), Pages 156-158 (ATS logic)'
    );

    setIsRunning(false);
  };

  const reset = () => {
    setCurrentStage(-1);
    setStages(prev => prev.map(stage => ({ ...stage, status: 'pending', output: undefined, metrics: undefined })));
    setMemoryStats({ vectorChunks: 0, graphNodes: 0, graphEdges: 0, tokensInContext: 0 });
    setQueryResult('');
    setHierarchyLevels([]);
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>🏗️ Hierarchical Document Intelligence Live Runner</span>
            <div className="flex gap-2">
              <Button 
                onClick={runPipeline} 
                disabled={isRunning}
                size="sm"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Run Pipeline
                  </>
                )}
              </Button>
              <Button 
                onClick={reset} 
                disabled={isRunning}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Watch a 200-page electrical schematic being parsed by specialized agents into a queryable knowledge graph.
          </p>
          {currentStage >= 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{Math.round((currentStage / stages.length) * 100)}%</span>
              </div>
              <Progress value={(currentStage / stages.length) * 100} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pipeline Stages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((stage, index) => {
          const Icon = stageIcons[stage.id as keyof typeof stageIcons];
          return (
            <Card key={stage.id} className={
              stage.status === 'processing' ? 'border-blue-500 shadow-lg' :
              stage.status === 'complete' ? 'border-green-500' :
              'border-gray-200 dark:border-gray-700'
            }>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  {stage.status === 'complete' ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : stage.status === 'processing' ? (
                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                  ) : (
                    <Icon className="h-4 w-4 text-gray-400" />
                  )}
                  {stage.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  {stageDescriptions[stage.id as keyof typeof stageDescriptions]}
                </p>
                {stage.output && (
                  <p className="text-xs font-medium text-green-700 dark:text-green-400">
                    ✓ {stage.output}
                  </p>
                )}
                {stage.metrics && (
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(stage.metrics).map(([key, value]) => (
                      <Badge key={key} variant="secondary" className="text-xs">
                        {key}: {value}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Memory System Stats */}
      {memoryStats.vectorChunks > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Database className="h-5 w-5" />
              Hybrid Memory System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{memoryStats.vectorChunks}</div>
                <div className="text-xs text-muted-foreground">Vector Chunks</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-2xl font-bold text-green-700 dark:text-green-400">{memoryStats.graphNodes}</div>
                <div className="text-xs text-muted-foreground">Graph Nodes</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">{memoryStats.graphEdges}</div>
                <div className="text-xs text-muted-foreground">Graph Edges</div>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/30 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                  {(memoryStats.tokensInContext / 1000).toFixed(1)}K
                </div>
                <div className="text-xs text-muted-foreground">Context Tokens</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hierarchical Synthesis Results */}
      {hierarchyLevels.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              4-Level Hierarchical Understanding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hierarchyLevels.map((level, index) => (
                <div 
                  key={index} 
                  className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg border-l-4 border-blue-500 dark:border-blue-400"
                  style={{ marginLeft: `${index * 16}px` }}
                >
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{level}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Query Result */}
      {queryResult && (
        <Card className="border-green-500">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircleQuestion className="h-5 w-5 text-green-600" />
              Interactive Query Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              {queryResult.split('\n').map((line, index) => (
                <p key={index} className={
                  line.startsWith('**Query**') ? 'font-bold text-blue-700 dark:text-blue-400' :
                  line.startsWith('**Answer**') ? 'font-bold text-green-700 dark:text-green-400 mt-3' :
                  line.startsWith('**Sources**') ? 'font-bold text-purple-700 dark:text-purple-400 mt-3' :
                  line.startsWith('•') ? 'ml-4 text-gray-700 dark:text-gray-300' :
                  'text-gray-800 dark:text-gray-200'
                }>
                  {line}
                </p>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-xs text-muted-foreground">
                <strong>Context Management:</strong> Answer synthesized from 3 document sections across 2.1M tokens,
                retrieved in 2.3 seconds using semantic search (ChromaDB) + graph traversal (NetworkX),
                staying within 50K token context window. Total cost: $0.08 (including GPT-4V extraction).
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Educational Notes */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-200 dark:border-indigo-800">
        <CardHeader>
          <CardTitle className="text-sm">💡 Pattern Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>Why Hierarchical?</strong> Engineering documents contain nested relationships (components → subsystems → systems). 
            Flat parsing loses these critical structural dependencies.
          </p>
          <p>
            <strong>Agent Specialization:</strong> Vision agents (GPT-4V) excel at diagram parsing, domain agents (with standards knowledge) 
            interpret technical meaning, synthesis agents build holistic understanding—each optimized for their task.
          </p>
          <p>
            <strong>Memory Strategy:</strong> Hybrid vector (semantic search) + graph (structural traversal) enables both 
            "find similar concepts" and "trace dependencies" queries on the same document corpus.
          </p>
          <p>
            <strong>Context Window Management:</strong> By chunking, embedding, and indexing 2.1M tokens, we can answer questions 
            using only relevant 50K token slices—keeping costs low while maintaining access to full document knowledge.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HierarchicalDocumentIntelligenceLiveRunner;
