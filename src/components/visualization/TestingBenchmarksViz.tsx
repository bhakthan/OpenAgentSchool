import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, ArrowClockwise } from '@phosphor-icons/react';

interface TestingBenchmarksVizProps {
  autoPlay?: boolean;
}

/**
 * Interactive visualization of agent testing & benchmarks showing:
 * - Evaluation pipeline stages
 * - Benchmark categories (accuracy, latency, cost, safety)
 * - Test case flow
 * - Results aggregation
 */
export default function TestingBenchmarksViz({ autoPlay = true }: TestingBenchmarksVizProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [step, setStep] = useState(0);
  const [testResults, setTestResults] = useState<{ id: number; status: 'pending' | 'running' | 'passed' | 'failed' }[]>([
    { id: 1, status: 'pending' },
    { id: 2, status: 'pending' },
    { id: 3, status: 'pending' },
    { id: 4, status: 'pending' },
    { id: 5, status: 'pending' },
    { id: 6, status: 'pending' },
  ]);

  const maxSteps = 12;
  const width = 700;
  const height = 420;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStep(s => {
        const next = (s + 1) % maxSteps;
        // Update test results based on step
        if (next < 6) {
          setTestResults(prev => prev.map((t, i) => 
            i === next ? { ...t, status: 'running' as const } : 
            i < next ? { ...t, status: Math.random() > 0.2 ? 'passed' as const : 'failed' as const } : t
          ));
        } else if (next === 6) {
          setTestResults(prev => prev.map(t => ({
            ...t,
            status: t.status === 'running' ? (Math.random() > 0.2 ? 'passed' : 'failed') : t.status
          })));
        }
        return next;
      });
    }, 800);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleReset = () => {
    setStep(0);
    setTestResults([
      { id: 1, status: 'pending' },
      { id: 2, status: 'pending' },
      { id: 3, status: 'pending' },
      { id: 4, status: 'pending' },
      { id: 5, status: 'pending' },
      { id: 6, status: 'pending' },
    ]);
    setIsPlaying(true);
  };

  const pipelineStages = [
    { name: 'Setup', icon: '⚙️', color: '#6b7280' },
    { name: 'Unit Tests', icon: '🧪', color: '#3b82f6' },
    { name: 'Integration', icon: '🔗', color: '#8b5cf6' },
    { name: 'Benchmarks', icon: '📊', color: '#f59e0b' },
    { name: 'Safety', icon: '🛡️', color: '#ef4444' },
    { name: 'Report', icon: '📋', color: '#22c55e' },
  ];

  const benchmarks = [
    { name: 'Accuracy', score: 94.2, target: 90, color: '#22c55e' },
    { name: 'Latency', score: 847, target: 1000, unit: 'ms', color: '#3b82f6', inverse: true },
    { name: 'Cost/Query', score: 0.023, target: 0.05, unit: '$', color: '#f59e0b', inverse: true },
    { name: 'Safety', score: 99.1, target: 99, color: '#ef4444' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return '#22c55e';
      case 'failed': return '#ef4444';
      case 'running': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return '✓';
      case 'failed': return '✗';
      case 'running': return '●';
      default: return '○';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Agent Testing & Evaluation Pipeline</h3>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </Button>
            <Button size="sm" variant="outline" onClick={handleReset}>
              <ArrowClockwise size={16} />
            </Button>
          </div>
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          <defs>
            <linearGradient id="pipeline-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow-test">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Pipeline stages */}
          <g>
            <rect x={10} y={10} width={width - 20} height={80} rx={8} fill="url(#pipeline-grad)" stroke="#6b7280" strokeWidth={1} />
            <text x={25} y={32} fill="currentColor" fontSize="14" fontWeight="600">🔄 CI/CD Pipeline Stages</text>
            
            {pipelineStages.map((stage, i) => {
              const isActive = step >= i * 2 && step < (i + 1) * 2;
              const isComplete = step > (i + 1) * 2 - 1;
              return (
                <g key={stage.name} transform={`translate(${30 + i * 110}, 45)`}>
                  <rect
                    x={0}
                    y={0}
                    width={100}
                    height={36}
                    rx={6}
                    fill={isComplete ? '#22c55e' : isActive ? stage.color : 'rgba(0,0,0,0.2)'}
                    opacity={isComplete || isActive ? 0.8 : 0.4}
                    filter={isActive ? 'url(#glow-test)' : ''}
                    className="transition-all duration-300"
                  />
                  <text x={18} y={24} fontSize="14">{stage.icon}</text>
                  <text
                    x={38}
                    y={24}
                    fill={isComplete || isActive ? 'white' : '#9ca3af'}
                    fontSize="11"
                    fontWeight="500"
                  >
                    {stage.name}
                  </text>
                  {isComplete && (
                    <text x={90} y={24} fill="white" fontSize="12" fontWeight="bold">✓</text>
                  )}
                  {isActive && (
                    <circle cx={90} cy={18} r={4} fill="white" className="animate-ping" />
                  )}
                </g>
              );
            })}
          </g>

          {/* Test Cases Grid */}
          <g transform="translate(10, 105)">
            <rect x={0} y={0} width={200} height={170} rx={8} fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth={1} />
            <text x={15} y={22} fill="currentColor" fontSize="14" fontWeight="600">🧪 Test Cases</text>
            
            {testResults.map((test, i) => (
              <g key={test.id} transform={`translate(15, ${40 + i * 22})`}>
                <rect
                  x={0}
                  y={0}
                  width={170}
                  height={18}
                  rx={4}
                  fill="rgba(0,0,0,0.2)"
                  stroke={getStatusColor(test.status)}
                  strokeWidth={test.status === 'running' ? 2 : 1}
                />
                <text
                  x={12}
                  y={13}
                  fill={getStatusColor(test.status)}
                  fontSize="12"
                  fontWeight="bold"
                >
                  {getStatusIcon(test.status)}
                </text>
                <text x={28} y={13} fill="currentColor" fontSize="10">
                  test_agent_{['accuracy', 'latency', 'memory', 'tool_use', 'safety', 'edge_cases'][i]}
                </text>
                {test.status === 'running' && (
                  <rect x={150} y={4} width={16} height={10} rx={2} fill="#f59e0b" className="animate-pulse" />
                )}
              </g>
            ))}
          </g>

          {/* Benchmark Results */}
          <g transform="translate(220, 105)">
            <rect x={0} y={0} width={260} height={170} rx={8} fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth={1} />
            <text x={15} y={22} fill="currentColor" fontSize="14" fontWeight="600">📊 Benchmark Results</text>
            
            {benchmarks.map((bench, i) => {
              const progress = step > 6 ? 100 : step > 3 ? (step - 3) * 33 : 0;
              const percentage = bench.inverse 
                ? Math.min(100, (bench.target / bench.score) * 100)
                : Math.min(100, (bench.score / bench.target) * 100);
              const isPassing = bench.inverse ? bench.score <= bench.target : bench.score >= bench.target;
              
              return (
                <g key={bench.name} transform={`translate(15, ${40 + i * 32})`}>
                  <text x={0} y={12} fill="currentColor" fontSize="11" fontWeight="500">{bench.name}</text>
                  <text x={230} y={12} textAnchor="end" fill={isPassing ? '#22c55e' : '#ef4444'} fontSize="11" fontWeight="600">
                    {bench.unit === '$' ? '$' : ''}{bench.score}{bench.unit === 'ms' ? 'ms' : bench.unit ? '' : '%'}
                  </text>
                  <rect x={70} y={2} width={130} height={14} rx={3} fill="rgba(0,0,0,0.2)" />
                  <rect
                    x={70}
                    y={2}
                    width={Math.min(130, 130 * (percentage / 100) * (progress / 100))}
                    height={14}
                    rx={3}
                    fill={isPassing ? '#22c55e' : '#ef4444'}
                    opacity={0.8}
                    className="transition-all duration-500"
                  />
                  <line
                    x1={70 + 130 * (100 / 100)}
                    y1={0}
                    x2={70 + 130 * (100 / 100)}
                    y2={18}
                    stroke="#6b7280"
                    strokeWidth={2}
                    strokeDasharray="2,2"
                  />
                </g>
              );
            })}
          </g>

          {/* Summary Panel */}
          <g transform="translate(490, 105)">
            <rect x={0} y={0} width={200} height={170} rx={8} fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth={1} />
            <text x={15} y={22} fill="currentColor" fontSize="14" fontWeight="600">📋 Summary</text>
            
            <g transform="translate(15, 40)">
              <text x={0} y={0} fill="#9ca3af" fontSize="10">Tests Passed</text>
              <text x={0} y={18} fill="#22c55e" fontSize="24" fontWeight="bold">
                {testResults.filter(t => t.status === 'passed').length}/{testResults.length}
              </text>
            </g>
            
            <g transform="translate(100, 40)">
              <text x={0} y={0} fill="#9ca3af" fontSize="10">Coverage</text>
              <text x={0} y={18} fill="#3b82f6" fontSize="24" fontWeight="bold">
                {step > 6 ? '87' : Math.min(87, step * 14)}%
              </text>
            </g>
            
            <g transform="translate(15, 90)">
              <rect x={0} y={0} width={170} height={60} rx={4} fill="rgba(0,0,0,0.2)" />
              <text x={10} y={18} fill="#9ca3af" fontSize="10">Overall Status</text>
              <text
                x={85}
                y={45}
                textAnchor="middle"
                fill={step > 8 ? (testResults.filter(t => t.status === 'failed').length > 1 ? '#ef4444' : '#22c55e') : '#f59e0b'}
                fontSize="18"
                fontWeight="bold"
              >
                {step > 8 ? (testResults.filter(t => t.status === 'failed').length > 1 ? '❌ FAILED' : '✅ PASSED') : '⏳ Running...'}
              </text>
            </g>
          </g>

          {/* Evaluation Types */}
          <g transform="translate(10, 290)">
            <rect x={0} y={0} width={width - 20} height={120} rx={8} fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth={1} />
            <text x={15} y={22} fill="currentColor" fontSize="14" fontWeight="600">🎯 Evaluation Dimensions</text>
            
            {[
              { name: 'Task Success', desc: 'Did the agent complete the objective?', icon: '✓' },
              { name: 'Response Quality', desc: 'Accuracy, relevance, coherence', icon: '⭐' },
              { name: 'Efficiency', desc: 'Token usage, latency, cost', icon: '⚡' },
              { name: 'Safety & Alignment', desc: 'No harmful outputs, follows guidelines', icon: '🛡️' },
            ].map((dim, i) => {
              const isHighlighted = Math.floor(step / 3) === i;
              return (
                <g key={dim.name} transform={`translate(${15 + i * 167}, 35)`}>
                  <rect
                    x={0}
                    y={0}
                    width={157}
                    height={70}
                    rx={6}
                    fill={isHighlighted ? '#8b5cf6' : 'rgba(0,0,0,0.2)'}
                    opacity={isHighlighted ? 0.3 : 0.5}
                    stroke={isHighlighted ? '#8b5cf6' : 'transparent'}
                    strokeWidth={2}
                    className="transition-all duration-300"
                  />
                  <text x={10} y={22} fontSize="16">{dim.icon}</text>
                  <text x={30} y={22} fill="currentColor" fontSize="11" fontWeight="600">{dim.name}</text>
                  <text x={10} y={45} fill="#9ca3af" fontSize="9">
                    {dim.desc.split(',').map((part, j) => (
                      <tspan key={j} x={10} dy={j === 0 ? 0 : 12}>{part.trim()}</tspan>
                    ))}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </CardContent>
    </Card>
  );
}
