import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ClockCounterClockwise, 
  Brain, 
  Repeat, 
  ChartLineUp,
  Play,
  Pause,
  ArrowClockwise,
  Database,
  Target,
  CheckCircle,
  Lightning
} from '@phosphor-icons/react';

interface Strategy {
  id: string;
  task: string;
  plan: string[];
  metrics: {
    successRate: number;
    cost: number;
    coverage: number;
  };
  reuseCount: number;
  similarity?: number;
}

export const StrategyMemoryReplayVisual: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [storedStrategies, setStoredStrategies] = useState<Strategy[]>([]);
  const [currentTask, setCurrentTask] = useState<string>('');
  const [matchedStrategy, setMatchedStrategy] = useState<Strategy | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const tasks = [
    'VaR anomaly in Treasury bonds',
    'Volatility spike in Government bonds',  // Similar to task 1
    'Equity correlation breakdown',
    'Stock market correlation anomaly'  // Similar to task 3
  ];

  const steps = [
    'New task received',
    'Embedding task signature',
    'Searching strategy memory (Redis)',
    'Strategy match found',
    'Adapting historical strategy',
    'Executing with memory guidance',
    'Storing successful strategy'
  ];

  const codeSteps = [
    `# New investigation request
task = "VaR anomaly in Treasury bonds"
print(f"Investigating: {task}")`,
    `# Generate embedding for similarity search
embedding = await embed_task(task)
# embedding: [0.23, 0.87, 0.45, ...]`,
    `# Query strategy memory Context Provider
async def invoking(messages, **kwargs):
    similar = await retrieve_similar(
        embedding, k=5
    )`,
    `# Found similar strategy!
match = {
    "id": "strategy_12",
    "similarity": 0.89,
    "metrics": {"successRate": 0.95}
}`,
    `# Adapt strategy to new context
adapted_plan = adapt_strategy(
    match['plan'],
    current_task
)`,
    `# Execute with strategy memory
response = await analyst.run(task)
# Context Provider injects adapted_plan`,
    `# Store for future reuse
async def invoked(messages, response):
    await store_strategy({
        "task": task,
        "plan": response.steps,
        "metrics": response.metrics
    })`
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && step < steps.length) {
      interval = setInterval(() => {
        setStep(prev => {
          const nextStep = prev + 1;
          
          if (nextStep === 0) {
            const taskIndex = Math.floor(storedStrategies.length);
            setCurrentTask(tasks[taskIndex] || tasks[0]);
            setMatchedStrategy(null);
            setLogs(prev => [...prev, `📥 New task: ${tasks[taskIndex] || tasks[0]}`]);
          }
          
          if (nextStep === 3) {
            // Check for similar strategy
            const similar = storedStrategies.find(s => 
              s.task.toLowerCase().includes(currentTask.toLowerCase().split(' ')[0]) ||
              currentTask.toLowerCase().includes(s.task.toLowerCase().split(' ')[0])
            );
            
            if (similar) {
              const withSim = { ...similar, similarity: 0.85 + Math.random() * 0.10 };
              setMatchedStrategy(withSim);
              setLogs(prev => [...prev, `✅ Match found: ${similar.id} (${(withSim.similarity! * 100).toFixed(0)}% similar)`]);
            } else {
              setLogs(prev => [...prev, `🆕 No match - creating new strategy`]);
            }
          }
          
          if (nextStep === 6) {
            // Store new strategy
            if (!matchedStrategy || storedStrategies.length < 4) {
              const newStrategy: Strategy = {
                id: `strategy_${storedStrategies.length + 1}`,
                task: currentTask,
                plan: ['Extract features', 'Analyze residuals', 'Generate report'],
                metrics: {
                  successRate: 0.90 + Math.random() * 0.09,
                  cost: 200 + Math.random() * 100,
                  coverage: 0.85 + Math.random() * 0.10
                },
                reuseCount: 0
              };
              setStoredStrategies(prev => [...prev, newStrategy]);
              setLogs(prev => [...prev, `💾 Stored ${newStrategy.id} in Redis memory`]);
            } else if (matchedStrategy) {
              // Increment reuse count
              setStoredStrategies(prev => 
                prev.map(s => s.id === matchedStrategy.id 
                  ? { ...s, reuseCount: s.reuseCount + 1 }
                  : s
                )
              );
              setLogs(prev => [...prev, `♻️ Reused ${matchedStrategy.id} (count: ${matchedStrategy.reuseCount + 1})`]);
            }
          }
          
          if (nextStep >= steps.length) {
            setIsRunning(false);
            setStep(0);
            return 0;
          }
          
          return nextStep;
        });
      }, 1800);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, step, currentTask, matchedStrategy, storedStrategies]);

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setStep(0);
    setLogs([]);
    setStoredStrategies([]);
    setCurrentTask('');
    setMatchedStrategy(null);
  };

  const totalReuses = storedStrategies.reduce((sum, s) => sum + s.reuseCount, 0);
  const avgSuccessRate = storedStrategies.length > 0
    ? storedStrategies.reduce((sum, s) => sum + s.metrics.successRate, 0) / storedStrategies.length
    : 0;

  return (
    <div className="w-full space-y-4">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightning className="text-yellow-500" size={20} />
            Strategy Memory Replay Live Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button onClick={toggleSimulation} variant={isRunning ? "destructive" : "default"} disabled={isRunning && step > 0}>
              {isRunning ? <Pause size={16} /> : <Play size={16} />}
              {isRunning ? 'Running' : 'Start'} Investigation
            </Button>
            <Button onClick={resetSimulation} variant="outline">
              <ArrowClockwise size={16} />
              Reset
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Watch how Agent Framework Context Providers enable strategy memory: retrieve similar past strategies, adapt them to new contexts, and replay proven approaches to reduce cost and improve quality.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Memory Visualization */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Database size={18} className="text-purple-500" />
              Strategy Memory Store (Redis)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 min-h-[280px]">
              {storedStrategies.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <Database size={48} className="opacity-20 mb-2" />
                  <p className="text-sm">No strategies stored yet</p>
                  <p className="text-xs">Run simulation to build memory</p>
                </div>
              ) : (
                storedStrategies.map((strategy) => (
                  <div 
                    key={strategy.id}
                    className={`p-3 rounded border ${
                      matchedStrategy?.id === strategy.id && step >= 3 && step < 7
                        ? 'bg-green-50 dark:bg-green-950/30 border-green-500 shadow-lg'
                        : 'bg-muted/40'
                    } transition-all`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="font-medium text-sm flex items-center gap-1">
                        {matchedStrategy?.id === strategy.id && step >= 3 && step < 7 && (
                          <CheckCircle size={14} className="text-green-600" weight="fill" />
                        )}
                        {strategy.id}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Reused: {strategy.reuseCount}×
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {strategy.task}
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 rounded">
                        Success: {(strategy.metrics.successRate * 100).toFixed(0)}%
                      </span>
                      <span className="px-1.5 py-0.5 bg-orange-100 dark:bg-orange-900/30 rounded">
                        ${strategy.metrics.cost.toFixed(0)}
                      </span>
                      {matchedStrategy?.id === strategy.id && matchedStrategy.similarity && (
                        <span className="px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 rounded font-medium">
                          {(matchedStrategy.similarity * 100).toFixed(0)}% match
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {storedStrategies.length > 0 && (
              <div className="mt-4 pt-4 border-t space-y-1">
                <div className="text-xs font-medium">Memory Statistics</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Stored:</span>
                    <span className="ml-1 font-medium">{storedStrategies.length}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total reuses:</span>
                    <span className="ml-1 font-medium">{totalReuses}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Avg success:</span>
                    <span className="ml-1 font-medium">{(avgSuccessRate * 100).toFixed(0)}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Efficiency:</span>
                    <span className="ml-1 font-medium text-green-600">
                      {totalReuses > 0 ? `${((totalReuses / (storedStrategies.length + totalReuses)) * 100).toFixed(0)}%` : '0%'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Code Execution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Context Provider Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs h-[280px] overflow-auto">
              <pre className="whitespace-pre-wrap">{codeSteps[step] || codeSteps[0]}</pre>
            </div>
            
            <div className="mt-4">
              <h4 className="font-semibold text-sm mb-2">Execution Log:</h4>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg h-24 overflow-auto text-xs">
                {logs.length === 0 ? (
                  <div className="text-muted-foreground italic">Waiting for execution...</div>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className="text-muted-foreground">{log}</div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Step Info */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-blue-500" />
            <span className="font-semibold">
              {isRunning ? `Step ${step + 1}/${steps.length}: ${steps[step]}` : 'Ready to start'}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {step === 0 && "A new VaR anomaly investigation request arrives at the financial analyst agent."}
            {step === 1 && "The agent generates an embedding vector for the task signature to enable semantic similarity search in strategy memory."}
            {step === 2 && "The StrategyMemory Context Provider's invoking() method queries Redis for similar historical strategies using vector search."}
            {step === 3 && matchedStrategy && `Found matching strategy with ${(matchedStrategy.similarity! * 100).toFixed(0)}% similarity! This strategy has been reused ${matchedStrategy.reuseCount} times with ${(matchedStrategy.metrics.successRate * 100).toFixed(0)}% success rate.`}
            {step === 3 && !matchedStrategy && "No similar strategy found in memory. The agent will create a new approach from scratch and store it for future reuse."}
            {step === 4 && "The historical strategy is adapted to the current task context by mutating plan steps and adjusting parameters."}
            {step === 5 && "The agent executes with the adapted strategy injected as context, reducing planning time and token costs by ~60%."}
            {step === 6 && "After successful execution, the invoked() method stores the strategy (or updates reuse count) in Redis for future replay."}
          </p>
        </CardContent>
      </Card>

      {/* Memory Benefits Panel */}
      {storedStrategies.length > 0 && (
        <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <ChartLineUp size={24} className="text-green-600 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <div className="font-semibold">Memory-Driven Efficiency Gains</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <div className="text-muted-foreground text-xs">Cost Reduction</div>
                    <div className="font-semibold text-green-600">
                      {totalReuses > 0 ? '~40-60%' : 'Pending'}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Time Savings</div>
                    <div className="font-semibold text-green-600">
                      {totalReuses > 0 ? '~50-70%' : 'Pending'}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Strategy Reuse</div>
                    <div className="font-semibold text-blue-600">
                      {totalReuses}× replayed
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-xs">Quality Improvement</div>
                    <div className="font-semibold text-purple-600">
                      {avgSuccessRate > 0 ? `${(avgSuccessRate * 100).toFixed(0)}% avg` : 'N/A'}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground italic">
                  💡 Context Providers enable zero-shot strategy transfer: proven approaches automatically guide new investigations without model retraining.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
