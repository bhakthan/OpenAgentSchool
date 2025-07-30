import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Play, ArrowsClockwise, Pause, FastForward, Rewind } from "@phosphor-icons/react";
import { PatternData } from '@/lib/data/patterns/index';
import { useTheme } from '@/components/theme/ThemeProvider';

interface SimplePatternFlowProps {
  patternData: PatternData;
}

interface FlowStep {
  id: string;
  nodeId: string;
  message: string;
  type: 'input' | 'processing' | 'output' | 'tool' | 'reflection';
  timestamp: number;
  duration: number;
}

interface AnimatedEdge {
  id: string;
  from: string;
  to: string;
  progress: number;
  active: boolean;
  message?: string;
}

// Custom SVG-based visualization component
const SimplePatternFlow: React.FC<SimplePatternFlowProps> = ({ patternData }) => {
  const { theme } = useTheme();
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [flowSteps, setFlowSteps] = useState<FlowStep[]>([]);
  const [animatedEdges, setAnimatedEdges] = useState<AnimatedEdge[]>([]);
  const [userInput, setUserInput] = useState('What are the latest AI developments?');
  const [speed, setSpeed] = useState(1);
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set());

  // Create a simple layout for nodes
  const nodeLayout = useMemo(() => {
    if (!patternData.nodes) return {};
    
    const layout: Record<string, { x: number; y: number; width: number; height: number }> = {};
    const containerWidth = 800;
    const containerHeight = 400;
    const nodeWidth = 140;
    const nodeHeight = 80;
    
    // Simple grid layout
    const cols = Math.ceil(Math.sqrt(patternData.nodes.length));
    const rows = Math.ceil(patternData.nodes.length / cols);
    
    patternData.nodes.forEach((node, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      
      layout[node.id] = {
        x: (col * (containerWidth / cols)) + (containerWidth / cols - nodeWidth) / 2,
        y: (row * (containerHeight / rows)) + (containerHeight / rows - nodeHeight) / 2,
        width: nodeWidth,
        height: nodeHeight
      };
    });
    
    return layout;
  }, [patternData.nodes]);

  // Generate flow steps based on pattern
  const generateFlowSteps = useCallback(() => {
    if (!patternData.nodes || !patternData.edges) return [];
    
    const steps: FlowStep[] = [];
    let stepId = 0;
    
    // Start with input nodes
    const inputNodes = patternData.nodes.filter(node => 
      node.data?.nodeType === 'input' || 
      !patternData.edges.some(edge => edge.target === node.id)
    );
    
    // Add initial input step
    inputNodes.forEach(node => {
      steps.push({
        id: `step-${stepId++}`,
        nodeId: node.id,
        message: `Received: ${userInput}`,
        type: 'input',
        timestamp: Date.now(),
        duration: 1000
      });
    });
    
    // Simulate processing through the pattern
    const processedNodes = new Set<string>();
    const queue = [...inputNodes];
    
    while (queue.length > 0) {
      const currentNode = queue.shift();
      if (!currentNode || processedNodes.has(currentNode.id)) continue;
      
      processedNodes.add(currentNode.id);
      
      // Add processing step
      steps.push({
        id: `step-${stepId++}`,
        nodeId: currentNode.id,
        message: `Processing in ${currentNode.data?.label || currentNode.id}`,
        type: 'processing',
        timestamp: Date.now(),
        duration: 1500
      });
      
      // Find connected nodes
      const connectedEdges = patternData.edges.filter(edge => edge.source === currentNode.id);
      connectedEdges.forEach(edge => {
        const targetNode = patternData.nodes.find(n => n.id === edge.target);
        if (targetNode && !processedNodes.has(targetNode.id)) {
          queue.push(targetNode);
        }
      });
    }
    
    return steps;
  }, [patternData, userInput]);

  // Start simulation
  const startSimulation = useCallback(() => {
    setIsRunning(true);
    setCurrentStep(0);
    setActiveNodes(new Set());
    const steps = generateFlowSteps();
    setFlowSteps(steps);
    
    // Create animated edges
    const edges = patternData.edges?.map(edge => ({
      id: edge.id,
      from: edge.source,
      to: edge.target,
      progress: 0,
      active: false,
      message: edge.label as string || 'data flow'
    })) || [];
    
    setAnimatedEdges(edges);
    
    // Execute steps with timing
    let stepIndex = 0;
    const executeStep = () => {
      if (stepIndex >= steps.length) {
        setIsRunning(false);
        return;
      }
      
      const step = steps[stepIndex];
      setCurrentStep(stepIndex);
      setActiveNodes(prev => new Set([...prev, step.nodeId]));
      
      // Animate edges from this node
      const nodeEdges = edges.filter(edge => edge.from === step.nodeId);
      nodeEdges.forEach(edge => {
        setAnimatedEdges(prev => prev.map(e => 
          e.id === edge.id ? { ...e, active: true, progress: 0 } : e
        ));
        
        // Animate edge progress
        let progress = 0;
        const animateEdge = () => {
          progress += 0.1;
          if (progress <= 1) {
            setAnimatedEdges(prev => prev.map(e => 
              e.id === edge.id ? { ...e, progress } : e
            ));
            setTimeout(animateEdge, 50 / speed);
          } else {
            setAnimatedEdges(prev => prev.map(e => 
              e.id === edge.id ? { ...e, active: false, progress: 1 } : e
            ));
          }
        };
        animateEdge();
      });
      
      stepIndex++;
      setTimeout(executeStep, step.duration / speed);
    };
    
    executeStep();
  }, [patternData, generateFlowSteps, speed, userInput]);

  // Reset simulation
  const resetSimulation = useCallback(() => {
    setIsRunning(false);
    setCurrentStep(0);
    setFlowSteps([]);
    setAnimatedEdges([]);
    setActiveNodes(new Set());
  }, []);

  // SVG path for edges
  const createEdgePath = (fromId: string, toId: string) => {
    const fromLayout = nodeLayout[fromId];
    const toLayout = nodeLayout[toId];
    
    if (!fromLayout || !toLayout) return '';
    
    const fromX = fromLayout.x + fromLayout.width / 2;
    const fromY = fromLayout.y + fromLayout.height / 2;
    const toX = toLayout.x + toLayout.width / 2;
    const toY = toLayout.y + toLayout.height / 2;
    
    // Simple curved path
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    const controlY = midY - 30;
    
    return `M ${fromX} ${fromY} Q ${midX} ${controlY} ${toX} ${toY}`;
  };

  // Get node color based on type and theme
  const getNodeColor = (nodeType: string, isActive: boolean) => {
    const colors = {
      input: {
        bg: isActive 
          ? (theme === 'dark' ? 'bg-green-900/40 border-green-400' : 'bg-green-100 border-green-500')
          : (theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'),
        text: theme === 'dark' ? 'text-green-400' : 'text-green-600'
      },
      agent: {
        bg: isActive 
          ? (theme === 'dark' ? 'bg-blue-900/40 border-blue-400' : 'bg-blue-100 border-blue-500')
          : (theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'),
        text: theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
      },
      tool: {
        bg: isActive 
          ? (theme === 'dark' ? 'bg-orange-900/40 border-orange-400' : 'bg-orange-100 border-orange-500')
          : (theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'),
        text: theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
      },
      default: {
        bg: isActive 
          ? (theme === 'dark' ? 'bg-blue-900/40 border-blue-400' : 'bg-blue-100 border-blue-500')
          : (theme === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'),
        text: theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
      }
    };
    
    return colors[nodeType as keyof typeof colors] || colors.default;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{patternData.name} Flow</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSpeed(s => s === 0.5 ? 1 : s === 1 ? 2 : 0.5)}
            >
              {speed === 0.5 ? <Rewind size={14} /> : speed === 2 ? <FastForward size={14} /> : 'Normal'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetSimulation}
              disabled={isRunning}
            >
              <ArrowsClockwise size={14} />
            </Button>
            <Button
              size="sm"
              onClick={startSimulation}
              disabled={isRunning}
            >
              <Play size={14} />
              {isRunning ? 'Running...' : 'Start'}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your query..."
              disabled={isRunning}
            />
          </div>
          
          {/* Main visualization area with side-by-side layout */}
          <div className="flex flex-col lg:flex-row gap-4" style={{ minHeight: '500px' }}>
            {/* Visualization container */}
            <div className={`relative border rounded-lg p-4 transition-all duration-300 ${
              flowSteps.length > 0 ? 'flex-1' : 'w-full'
            }`} style={{ height: '500px' }}>
              <svg width="100%" height="100%" className="absolute inset-0">
                {/* Render edges */}
                {patternData.edges?.map(edge => {
                  const animatedEdge = animatedEdges.find(ae => ae.id === edge.id);
                  const path = createEdgePath(edge.source, edge.target);
                  
                  return (
                    <g key={edge.id}>
                      {/* Base edge */}
                      <path
                        d={path}
                        fill="none"
                        stroke={theme === 'dark' ? '#374151' : '#d1d5db'}
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                      />
                      {/* Animated edge */}
                      {animatedEdge?.active && (
                        <path
                          d={path}
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="3"
                          strokeDasharray="10,5"
                          strokeDashoffset={-animatedEdge.progress * 50}
                          opacity={0.8}
                          markerEnd="url(#arrowhead-active)"
                        />
                      )}
                    </g>
                  );
                })}
                
                {/* Arrow markers */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill={theme === 'dark' ? '#374151' : '#d1d5db'} />
                  </marker>
                  <marker id="arrowhead-active" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                  </marker>
                </defs>
              </svg>
              
              {/* Render nodes */}
              {patternData.nodes?.map(node => {
                const layout = nodeLayout[node.id];
                const isActive = activeNodes.has(node.id);
                const nodeType = node.data?.nodeType || 'agent';
                const colors = getNodeColor(nodeType, isActive);
                
                return (
                  <div
                    key={node.id}
                    className={`absolute rounded-lg border-2 p-3 transition-all duration-300 ${colors.bg}`}
                    style={{
                      left: layout.x,
                      top: layout.y,
                      width: layout.width,
                      height: layout.height,
                      transform: isActive ? 'scale(1.05)' : 'scale(1)'
                    }}
                  >
                    <div className="text-sm font-medium truncate">
                      {node.data?.label || node.id}
                    </div>
                    <div className={`text-xs mt-1 ${colors.text}`}>
                      {node.data?.nodeType || 'agent'}
                    </div>
                    {isActive && (
                      <div className="absolute top-1 right-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Execution Log side panel */}
            {flowSteps.length > 0 && (
              <div className="w-full lg:w-80 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 flex flex-col shadow-sm overflow-hidden" style={{ minHeight: '500px', maxHeight: '500px' }}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    Execution Log
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Real-time pattern execution steps
                  </p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                  <div className="space-y-2">
                    {flowSteps.slice(0, currentStep + 1).map((step, index) => (
                      <div 
                        key={step.id}
                        className={`p-3 rounded-lg border transition-colors duration-200 ${
                          index === currentStep 
                            ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 shadow-sm' 
                            : 'bg-white dark:bg-gray-700/60 border-gray-200 dark:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            variant={index === currentStep ? "default" : "outline"} 
                            className={`text-xs font-medium ${
                              index === currentStep 
                                ? 'bg-blue-600 text-white border-blue-600' 
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'
                            }`}
                          >
                            {step.type}
                          </Badge>
                          {index === currentStep && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                          )}
                        </div>
                        <p className="text-sm leading-relaxed text-gray-800 dark:text-gray-200 font-medium">
                          {step.message}
                        </p>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                          Step {index + 1} of {flowSteps.length}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Progress indicator */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Progress</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {Math.round(((currentStep + 1) / flowSteps.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / flowSteps.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimplePatternFlow;
