import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, ArrowClockwise } from '@phosphor-icons/react';

interface ReasoningPatternsVizProps {
  activePattern?: 'cot' | 'tot' | 'got' | 'reflexion';
  autoPlay?: boolean;
}

/**
 * Interactive visualization showing the 4 major reasoning patterns:
 * - Chain-of-Thought: Linear sequential reasoning
 * - Tree-of-Thought: Branching exploration with pruning
 * - Graph-of-Thought: Non-linear with merges and cycles
 * - Reflexion: Self-critique and iterative improvement
 */
export default function ReasoningPatternsViz({ 
  activePattern = 'cot',
  autoPlay = true 
}: ReasoningPatternsVizProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [step, setStep] = useState(0);
  const [pattern, setPattern] = useState(activePattern);

  const maxSteps = { cot: 5, tot: 6, got: 7, reflexion: 6 };

  useEffect(() => {
    setPattern(activePattern);
    setStep(0);
  }, [activePattern]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStep(s => (s + 1) % (maxSteps[pattern] + 1));
    }, 1200);
    return () => clearInterval(timer);
  }, [isPlaying, pattern]);

  const reset = () => { setStep(0); setIsPlaying(true); };

  // SVG dimensions
  const width = 600;
  const height = 280;

  // Animation helpers
  const nodeRadius = 24;
  const activeColor = '#a855f7'; // purple-500
  const completedColor = '#22c55e'; // green-500
  const pendingColor = '#6b7280'; // gray-500
  const lineColor = '#4b5563';

  const getNodeColor = (nodeStep: number) => {
    if (nodeStep < step) return completedColor;
    if (nodeStep === step) return activeColor;
    return pendingColor;
  };

  const getNodeScale = (nodeStep: number) => nodeStep === step ? 1.15 : 1;

  // Chain-of-Thought: Linear path
  const renderCoT = () => {
    const nodes = [
      { x: 60, y: 140, label: 'Input', step: 0 },
      { x: 160, y: 140, label: 'Step 1', step: 1 },
      { x: 260, y: 140, label: 'Step 2', step: 2 },
      { x: 360, y: 140, label: 'Step 3', step: 3 },
      { x: 460, y: 140, label: 'Step 4', step: 4 },
      { x: 540, y: 140, label: 'Output', step: 5 },
    ];

    return (
      <g>
        {/* Connection lines */}
        {nodes.slice(0, -1).map((node, i) => (
          <line
            key={`line-${i}`}
            x1={node.x + nodeRadius}
            y1={node.y}
            x2={nodes[i + 1].x - nodeRadius}
            y2={nodes[i + 1].y}
            stroke={i < step ? completedColor : lineColor}
            strokeWidth={2}
            strokeDasharray={i >= step ? '4,4' : undefined}
            className="transition-all duration-300"
          />
        ))}
        {/* Arrow markers */}
        {nodes.slice(0, -1).map((node, i) => (
          <polygon
            key={`arrow-${i}`}
            points={`${nodes[i + 1].x - nodeRadius - 8},${nodes[i + 1].y - 5} ${nodes[i + 1].x - nodeRadius - 8},${nodes[i + 1].y + 5} ${nodes[i + 1].x - nodeRadius},${nodes[i + 1].y}`}
            fill={i < step ? completedColor : lineColor}
            className="transition-all duration-300"
          />
        ))}
        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={`node-${i}`} transform={`translate(${node.x}, ${node.y}) scale(${getNodeScale(node.step)})`}>
            <circle
              r={nodeRadius}
              fill={getNodeColor(node.step)}
              className="transition-all duration-300"
            />
            {node.step === step && (
              <circle
                r={nodeRadius + 6}
                fill="none"
                stroke={activeColor}
                strokeWidth={2}
                className="animate-ping"
                opacity={0.5}
              />
            )}
            <text
              textAnchor="middle"
              dy="4"
              fill="white"
              fontSize="10"
              fontWeight="600"
            >
              {node.label}
            </text>
          </g>
        ))}
        {/* Label */}
        <text x={width / 2} y={30} textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="600">
          Chain-of-Thought: Linear Sequential Reasoning
        </text>
        <text x={width / 2} y={240} textAnchor="middle" fill="#6b7280" fontSize="12">
          Each step builds directly on the previous • Simple but can't backtrack
        </text>
      </g>
    );
  };

  // Tree-of-Thought: Branching paths
  const renderToT = () => {
    const nodes = [
      { x: 60, y: 140, label: 'Input', step: 0 },
      { x: 160, y: 80, label: 'Path A', step: 1 },
      { x: 160, y: 140, label: 'Path B', step: 1 },
      { x: 160, y: 200, label: 'Path C', step: 1 },
      { x: 280, y: 60, label: 'A1', step: 2 },
      { x: 280, y: 100, label: 'A2', step: 2 },
      { x: 280, y: 180, label: 'B1', step: 2 },
      { x: 380, y: 80, label: '✓ Best', step: 3, isBest: true },
      { x: 380, y: 180, label: '✗ Prune', step: 4, isPruned: true },
      { x: 480, y: 80, label: 'Refine', step: 5 },
      { x: 540, y: 80, label: 'Output', step: 6 },
    ];

    const edges = [
      [0, 1], [0, 2], [0, 3],
      [1, 4], [1, 5],
      [2, 6],
      [4, 7], [5, 7],
      [6, 8],
      [7, 9],
      [9, 10],
    ];

    return (
      <g>
        {/* Edges */}
        {edges.map(([from, to], i) => {
          const fromNode = nodes[from];
          const toNode = nodes[to];
          const isPrunedPath = toNode.isPruned || (nodes[to].step > 3 && fromNode.isPruned);
          return (
            <line
              key={`edge-${i}`}
              x1={fromNode.x + 20}
              y1={fromNode.y}
              x2={toNode.x - 20}
              y2={toNode.y}
              stroke={toNode.isPruned ? '#ef4444' : (Math.min(fromNode.step, toNode.step) < step ? completedColor : lineColor)}
              strokeWidth={2}
              strokeDasharray={toNode.isPruned ? '4,4' : (Math.min(fromNode.step, toNode.step) >= step ? '4,4' : undefined)}
              opacity={toNode.isPruned && step > 4 ? 0.3 : 1}
              className="transition-all duration-300"
            />
          );
        })}
        {/* Nodes */}
        {nodes.map((node, i) => (
          <g 
            key={`node-${i}`} 
            transform={`translate(${node.x}, ${node.y}) scale(${getNodeScale(node.step)})`}
            opacity={node.isPruned && step > 4 ? 0.4 : 1}
            className="transition-all duration-300"
          >
            <circle
              r={18}
              fill={node.isPruned ? '#ef4444' : (node.isBest ? '#22c55e' : getNodeColor(node.step))}
            />
            {node.step === step && !node.isPruned && (
              <circle r={24} fill="none" stroke={activeColor} strokeWidth={2} className="animate-ping" opacity={0.5} />
            )}
            <text textAnchor="middle" dy="4" fill="white" fontSize="9" fontWeight="600">
              {node.label}
            </text>
          </g>
        ))}
        <text x={width / 2} y={30} textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="600">
          Tree-of-Thought: Branching Exploration with Pruning
        </text>
        <text x={width / 2} y={260} textAnchor="middle" fill="#6b7280" fontSize="12">
          Explores multiple paths • Evaluates and prunes bad branches • Finds optimal solution
        </text>
      </g>
    );
  };

  // Graph-of-Thought: Non-linear with merges
  const renderGoT = () => {
    const nodes = [
      { x: 60, y: 140, label: 'Input', step: 0 },
      { x: 160, y: 80, label: 'Analyze', step: 1 },
      { x: 160, y: 200, label: 'Research', step: 1 },
      { x: 280, y: 60, label: 'Insight A', step: 2 },
      { x: 280, y: 120, label: 'Insight B', step: 3 },
      { x: 280, y: 200, label: 'Insight C', step: 2 },
      { x: 400, y: 100, label: 'Merge', step: 4, isMerge: true },
      { x: 400, y: 200, label: 'Refine', step: 5 },
      { x: 500, y: 140, label: 'Synthesize', step: 6 },
      { x: 560, y: 140, label: 'Output', step: 7 },
    ];

    const edges = [
      [0, 1], [0, 2],
      [1, 3], [1, 4],
      [2, 5],
      [3, 6], [4, 6], [5, 6], // Merge connections
      [5, 7],
      [6, 8], [7, 8],
      [8, 9],
    ];

    return (
      <g>
        {edges.map(([from, to], i) => {
          const fromNode = nodes[from];
          const toNode = nodes[to];
          const isMergeLine = toNode.isMerge;
          return (
            <path
              key={`edge-${i}`}
              d={`M${fromNode.x + 18},${fromNode.y} Q${(fromNode.x + toNode.x) / 2},${fromNode.y} ${toNode.x - 18},${toNode.y}`}
              fill="none"
              stroke={isMergeLine ? '#3b82f6' : (Math.min(fromNode.step, toNode.step) < step ? completedColor : lineColor)}
              strokeWidth={2}
              strokeDasharray={Math.min(fromNode.step, toNode.step) >= step ? '4,4' : undefined}
              className="transition-all duration-300"
            />
          );
        })}
        {nodes.map((node, i) => (
          <g key={`node-${i}`} transform={`translate(${node.x}, ${node.y}) scale(${getNodeScale(node.step)})`}>
            {node.isMerge ? (
              <polygon
                points="-18,0 0,-18 18,0 0,18"
                fill={getNodeColor(node.step)}
                className="transition-all duration-300"
              />
            ) : (
              <circle r={18} fill={getNodeColor(node.step)} className="transition-all duration-300" />
            )}
            {node.step === step && (
              <circle r={24} fill="none" stroke={activeColor} strokeWidth={2} className="animate-ping" opacity={0.5} />
            )}
            <text textAnchor="middle" dy="4" fill="white" fontSize="8" fontWeight="600">
              {node.label}
            </text>
          </g>
        ))}
        <text x={width / 2} y={30} textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="600">
          Graph-of-Thought: Non-Linear with Merges
        </text>
        <text x={width / 2} y={260} textAnchor="middle" fill="#6b7280" fontSize="12">
          Multiple insights merge together • Iterative refinement • Most flexible structure
        </text>
      </g>
    );
  };

  // Reflexion: Self-critique loop
  const renderReflexion = () => {
    const centerX = width / 2;
    const centerY = 140;
    const radius = 80;

    const loopNodes = [
      { angle: -90, label: 'Act', step: 1 },
      { angle: 0, label: 'Evaluate', step: 2 },
      { angle: 90, label: 'Reflect', step: 3 },
      { angle: 180, label: 'Revise', step: 4 },
    ];

    const getLoopPos = (angle: number, r: number = radius) => ({
      x: centerX + r * Math.cos((angle * Math.PI) / 180),
      y: centerY + r * Math.sin((angle * Math.PI) / 180),
    });

    return (
      <g>
        {/* Input arrow */}
        <line x1={80} y1={centerY - 80} x2={centerX - 10} y2={centerY - 75} stroke={step >= 0 ? completedColor : lineColor} strokeWidth={2} />
        <circle cx={60} cy={centerY - 80} r={16} fill={getNodeColor(0)} />
        <text x={60} y={centerY - 76} textAnchor="middle" fill="white" fontSize="9" fontWeight="600">Input</text>

        {/* Loop arrows (circular path) */}
        <circle 
          cx={centerX} 
          cy={centerY} 
          r={radius} 
          fill="none" 
          stroke={lineColor} 
          strokeWidth={2} 
          strokeDasharray="8,4"
        />
        
        {/* Animated progress arc */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke={activeColor}
          strokeWidth={3}
          strokeDasharray={`${((step % 5) / 4) * 2 * Math.PI * radius} ${2 * Math.PI * radius}`}
          strokeDashoffset={2 * Math.PI * radius * 0.25}
          className="transition-all duration-500"
        />

        {/* Loop nodes */}
        {loopNodes.map((node, i) => {
          const pos = getLoopPos(node.angle);
          const isActive = (step % 5) === node.step || (step >= 5 && node.step === 5);
          return (
            <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
              <circle
                r={22}
                fill={node.step <= (step % 5) || step >= 5 ? completedColor : (isActive ? activeColor : pendingColor)}
                className="transition-all duration-300"
              />
              {isActive && (
                <circle r={28} fill="none" stroke={activeColor} strokeWidth={2} className="animate-ping" opacity={0.5} />
              )}
              <text textAnchor="middle" dy="4" fill="white" fontSize="10" fontWeight="600">
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Iteration counter */}
        <g transform={`translate(${centerX}, ${centerY})`}>
          <circle r={30} fill="rgba(168, 85, 247, 0.2)" />
          <text textAnchor="middle" dy="-4" fill="currentColor" fontSize="10">Iteration</text>
          <text textAnchor="middle" dy="12" fill={activeColor} fontSize="18" fontWeight="700">
            {Math.floor(step / 4) + 1}
          </text>
        </g>

        {/* Output arrow */}
        <line x1={centerX + radius + 30} y1={centerY} x2={width - 60} y2={centerY} stroke={step >= 5 ? completedColor : lineColor} strokeWidth={2} strokeDasharray={step < 5 ? '4,4' : undefined} />
        <circle cx={width - 40} cy={centerY} r={16} fill={step >= 6 ? completedColor : pendingColor} />
        <text x={width - 40} y={centerY + 4} textAnchor="middle" fill="white" fontSize="8" fontWeight="600">Output</text>

        {/* Memory bank */}
        <rect x={centerX - 50} y={230} width={100} height={30} rx={4} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth={1} />
        <text x={centerX} y={250} textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="500">Memory Bank</text>
        <line x1={centerX} y1={centerY + radius + 20} x2={centerX} y2={230} stroke="#3b82f6" strokeWidth={1} strokeDasharray="4,4" />

        <text x={width / 2} y={30} textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="600">
          Reflexion: Self-Critique & Iterative Improvement
        </text>
      </g>
    );
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            {(['cot', 'tot', 'got', 'reflexion'] as const).map((p) => (
              <Button
                key={p}
                size="sm"
                variant={pattern === p ? 'default' : 'outline'}
                onClick={() => { setPattern(p); setStep(0); }}
                className="text-xs"
              >
                {p === 'cot' ? 'Chain-of-Thought' : p === 'tot' ? 'Tree-of-Thought' : p === 'got' ? 'Graph-of-Thought' : 'Reflexion'}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </Button>
            <Button size="sm" variant="outline" onClick={reset}>
              <ArrowClockwise size={16} />
            </Button>
          </div>
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          {pattern === 'cot' && renderCoT()}
          {pattern === 'tot' && renderToT()}
          {pattern === 'got' && renderGoT()}
          {pattern === 'reflexion' && renderReflexion()}
        </svg>
      </CardContent>
    </Card>
  );
}
