import React, { useState, useCallback, useRef, useEffect, memo } from 'react'
import { 
  Node, 
  Edge,
  Handle,
  Position,
  NodeTypes,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { StableFlowContainer, StableFlowProvider } from './StableFlowContainer'
import { PatternData } from '@/lib/data/patterns/index'
import { patternContents } from '@/lib/data/patternContent'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Play } from '@phosphor-icons/react/dist/ssr/Play';
import { Stop } from '@phosphor-icons/react/dist/ssr/Stop';
import { ArrowsCounterClockwise } from '@phosphor-icons/react/dist/ssr/ArrowsCounterClockwise';
import { Info } from '@phosphor-icons/react/dist/ssr/Info';
import { FastForward } from '@phosphor-icons/react/dist/ssr/FastForward';
import { Pause } from '@phosphor-icons/react/dist/ssr/Pause';
import { CaretRight } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { Rewind } from '@phosphor-icons/react/dist/ssr/Rewind';
import { Question } from '@phosphor-icons/react/dist/ssr/Question';
import { DotsSixVertical } from '@phosphor-icons/react/dist/ssr/DotsSixVertical';
import NodeDragHint from './NodeDragHint'
// Import necessary functions from dataFlowUtils
import { 
  simulatePatternFlow, 
  DataFlowType,
  BaseDataFlow as DataFlowMessage,
  getDataFlowAnimationStyle,
  resetDataFlow,
  createDataFlow,
  getSpeedMultiplier
} from '@/lib/utils/dataFlowUtils'
import visualizationUtils from '@/lib/utils/visualizationUtils'
const { processNodes, processEdges, normalizeFlowMessage } = visualizationUtils
import DataFlowVisualizer from './DataFlowVisualizer'
import StandardFlowVisualizerWithProvider, { StandardFlowMessage } from './StandardFlowVisualizer'
import { useMemoizedCallback } from '@/lib/utils'
import { useTheme } from '@/components/theme/ThemeProvider'
import { useStableFlowContainer } from '@/lib/utils/flows/StableFlowUtils'
import { fixReactFlowRendering } from '@/lib/utils/flows/visualizationFix'

/**
 * PatternVisualizer - Standard mode visualizer for agent patterns
 * 
 * Note: Currently has ReactFlow context issues in some scenarios.
 * AdvancedPatternVisualizer is recommended and set as default.
 */

interface PatternVisualizerProps {
  patternData: PatternData
}

// Animation control state
type AnimationSpeed = 'slow' | 'normal' | 'fast';
type AnimationMode = 'auto' | 'step-by-step';
interface AnimationState {
  speed: AnimationSpeed;
  mode: AnimationMode;
  isPaused: boolean;
  step: number;
}

// Custom node types
const CustomNode = memo(({ data, id }: { data: any, id: string }) => {
  const getNodeStyle = () => {
    const baseStyle = {
      padding: '10px 20px',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
    }
    
    // Add active state styles if the node is active
    const isActive = data.isActive;
    const activeStyle = isActive ? {
      boxShadow: '0 0 0 2px var(--primary), 0 0 15px rgba(66, 153, 225, 0.5)',
      transform: 'scale(1.02)'
    } : {};
    
    switch(data.nodeType) {
      case 'input':
        return { ...baseStyle, backgroundColor: 'rgb(226, 232, 240)', border: '1px solid rgb(203, 213, 225)', ...activeStyle }
      case 'llm':
        return { ...baseStyle, backgroundColor: 'rgb(219, 234, 254)', border: '1px solid rgb(147, 197, 253)', ...activeStyle }
      case 'output':
        return { ...baseStyle, backgroundColor: 'rgb(220, 252, 231)', border: '1px solid rgb(134, 239, 172)', ...activeStyle }
      case 'router':
        return { ...baseStyle, backgroundColor: 'rgb(254, 242, 220)', border: '1px solid rgb(253, 224, 71)', ...activeStyle }
      case 'aggregator':
        return { ...baseStyle, backgroundColor: 'rgb(240, 253, 240)', border: '1px solid rgb(187, 247, 208)', ...activeStyle }
      case 'evaluator':
        return { ...baseStyle, backgroundColor: 'rgb(237, 233, 254)', border: '1px solid rgb(196, 181, 253)', ...activeStyle }
      case 'tool':
        return { ...baseStyle, backgroundColor: 'rgb(254, 226, 226)', border: '1px solid rgb(252, 165, 165)', ...activeStyle }
      case 'planner':
        return { ...baseStyle, backgroundColor: 'rgb(224, 242, 254)', border: '1px solid rgb(125, 211, 252)', ...activeStyle }
      case 'executor':
        return { ...baseStyle, backgroundColor: 'rgb(243, 232, 255)', border: '1px solid rgb(216, 180, 254)', ...activeStyle }
      default:
        return { ...baseStyle, backgroundColor: 'white', border: '1px solid rgb(226, 232, 240)', ...activeStyle }
    }
  }
  
  return (
    <div style={getNodeStyle()}>
      <Handle type="target" position={Position.Left} />
      <div>
        <strong className="flex items-center gap-1">
          <DotsSixVertical size={12} className="drag-handle text-muted-foreground" />
          {data.label}
        </strong>
        {data.description && <div style={{ fontSize: '12px' }}>{data.description}</div>}
        {data.status && (
          <div className="mt-1 text-xs px-2 py-1 rounded" style={{
            backgroundColor: 
              data.status === 'processing' ? 'rgba(59, 130, 246, 0.2)' : 
              data.status === 'success' ? 'rgba(16, 185, 129, 0.2)' : 
              data.status === 'error' ? 'rgba(239, 68, 68, 0.2)' : 
              'transparent',
            color: 
              data.status === 'processing' ? 'rgb(59, 130, 246)' : 
              data.status === 'success' ? 'rgb(16, 185, 129)' : 
              data.status === 'error' ? 'rgb(239, 68, 68)' : 
              'inherit'
          }}>
            {data.status === 'processing' ? 'Processing...' : 
             data.status === 'success' ? 'Complete' : 
             data.status === 'error' ? 'Error' : ''}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison function to control re-renders
  return prevProps.id === nextProps.id && 
         prevProps.data.label === nextProps.data.label &&
         prevProps.data.description === nextProps.data.description &&
         prevProps.data.status === nextProps.data.status &&
         prevProps.data.isActive === nextProps.data.isActive;
});

const nodeTypes: NodeTypes = {
  input: CustomNode,
  default: CustomNode,
  output: CustomNode
}

const messageTemplates = {
  input: (text: string = '') => `User input: "${text}"`,
  llm: (text: string = '') => `Processing with AI: "${text}"`,
  router: () => "Routing decision being made...",
  aggregator: () => "Combining results from multiple sources...",
  tool: (toolName: string = 'External API') => `Using tool: ${toolName}`,
  output: (text: string = '') => `Final result: "${text}"`,
  error: () => "Error occurred during processing",
  planner: () => "Creating execution plan...",
  executor: () => "Executing tasks...",
  evaluator: () => "Evaluating results...",
  default: () => "Processing data..."
};

const PatternVisualizer = ({ patternData }: PatternVisualizerProps) => {
  // Add null checks for patternData
  if (!patternData) {
    console.error("PatternVisualizer: patternData is null or undefined");
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No pattern data available</p>
      </div>
    );
  }

  if (!patternData.nodes || !patternData.edges) {
    console.error("PatternVisualizer: patternData structure is invalid", patternData);
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Invalid pattern data structure</p>
      </div>
    );
  }

  if (!Array.isArray(patternData.nodes) || !Array.isArray(patternData.edges)) {
    console.error("PatternVisualizer: nodes or edges are not arrays", { 
      nodes: patternData.nodes, 
      edges: patternData.edges 
    });
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Invalid pattern data format</p>
      </div>
    );
  }

  const [nodes, setNodes, onNodesChange] = useNodesState(patternData.nodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(patternData.edges)
  const [dataFlows, setDataFlows] = useState<DataFlowMessage[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [queryInput, setQueryInput] = useState<string>("Tell me about agent patterns")
  const [animationState, setAnimationState] = useState<AnimationState>({
    speed: 'normal', // Set to normal by default
    mode: 'auto',
    isPaused: false,
    step: 0
  })
  const [speedFactor, setSpeedFactor] = useState<number>(1)
  const flowInstanceRef = useRef<ReactFlowInstance | null>(null)
  const simulationRef = useRef<NodeJS.Timeout | null>(null)
  const simulationCleanupRef = useRef<(() => void) | null>(null)
  const stepQueueRef = useRef<Array<() => void>>([])
  // Remove useReactFlow() hook as it's not needed here and causes provider issues
  
  // Use custom flow container hook to better handle resizing
  const { containerRef, resetFlow } = useStableFlowContainer({
    autoFitView: false,
    stabilizationDelay: 300
  });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Reset flow and nodes when pattern changes
  useEffect(() => {
    resetVisualization();
    // Make sure isAnimating is reset when pattern changes
    setIsAnimating(false);
    setDataFlows([]);
  }, [patternData.id]);

  // Speed factor effect
  useEffect(() => {
    const factors = {
      'slow': 0.5,
      'normal': 1,
      'fast': 2
    };
    setSpeedFactor(factors[animationState.speed]);
  }, [animationState.speed]);
  
  // Effect to fit view whenever dimensions change significantly (but not during animation)
  useEffect(() => {
    // Disabled fitView to prevent clustering when navigating between patterns
    // if (dimensions.width > 0 && dimensions.height > 0 && flowInstanceRef.current && !isAnimating) {
    //   const fitViewTimeout = setTimeout(() => {
    //     flowInstanceRef.current?.fitView({ duration: 300, padding: 0.2 });
    //   }, 200);
    //   return () => clearTimeout(fitViewTimeout);
    // }
  }, [dimensions, isAnimating]);
  
  // Reset visualization
  const resetVisualization = useCallback(() => {
    // Clear any running timeouts
    if (simulationRef.current) {
      clearTimeout(simulationRef.current);
      simulationRef.current = null;
    }
    
    // Run cleanup if available
    if (simulationCleanupRef.current) {
      simulationCleanupRef.current();
      simulationCleanupRef.current = null;
    }
    
    setIsAnimating(false);
    setDataFlows([]); // Clear all data flows
    
    // Reset animation state but keep the current speed selection
    setAnimationState(current => ({
      speed: current.speed, // Keep current speed
      mode: current.mode,   // Keep current mode
      isPaused: false,
      step: 0
    }));
    
    // Clear step queue
    stepQueueRef.current = [];
    
    // Reset all nodes (remove active state and status)
    const { theme } = useTheme();
    setNodes(currentNodes => {
      return processNodes(
        currentNodes.map(node => ({
          ...node,
          data: {
            ...node.data,
            isActive: false,
            status: null
          }
        })),
        theme
      );
    });
    
    // Reset edges (remove animation)
    setEdges(patternData.edges.map(edge => ({
      ...edge,
      animated: false
    })));
  }, [patternData.edges, setNodes, setEdges]);
  
  // Reset node layout to original positions
  const resetLayout = useCallback(() => {
    // Clone original pattern nodes to avoid mutation
    const originalNodes = JSON.parse(JSON.stringify(patternData.nodes));
    
    setNodes(originalNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        isActive: false,
        status: null
      }
    })));
    
    // Don't call fitView as it causes clustering
    // if (flowInstanceRef.current) {
    //   setTimeout(() => {
    //     flowInstanceRef.current?.fitView({ duration: 800, padding: 0.2 });
    //   }, 100);
    // }
  }, [patternData.nodes, setNodes]);
  
  const getEdgePoints = useMemoizedCallback((edgeId: string) => {
    const edge = edges.find(e => e.id === edgeId);
    if (!edge) return null;
    
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);
    
    if (!sourceNode || !targetNode) return null;
    
    // Calculate center points of nodes
    const sourceX = sourceNode.position.x + 100;  // assuming node width is about 200px
    const sourceY = sourceNode.position.y + 40;   // assuming node height is about 80px
    const targetX = targetNode.position.x;
    const targetY = targetNode.position.y + 40;
    
    return { sourceX, sourceY, targetX, targetY };
  }, []);
  
  const onFlowComplete = useMemoizedCallback((flowId: string) => {
    setDataFlows(currentFlows => {
      const flow = currentFlows.find(f => f.id === flowId);
      if (!flow) return currentFlows;
      
      // Update the target node when flow reaches it
      setNodes(nodes => nodes.map(node => {
        if (node.id === flow.target) {
          return {
            ...node,
            data: {
              ...node.data,
              isActive: true,
              status: flow.type === 'error' ? 'error' : 'processing'
            }
          };
        }
        return node;
      }));
      
      // Return flows with completed flow filtered out
      return currentFlows.filter(f => f.id !== flowId);
    });
  }, []);
  
  const togglePauseSimulation = useCallback(() => {
    setAnimationState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);
  
  const executeNextStep = useCallback(() => {
    if (stepQueueRef.current.length > 0) {
      const nextStep = stepQueueRef.current.shift();
      if (nextStep) {
        nextStep();
        setAnimationState(prev => ({ ...prev, step: prev.step + 1 }));
        
        // Immediately execute any non-visual steps that are just state updates
        // This prevents the UI from getting stuck between node activations
        setTimeout(() => {
          if (stepQueueRef.current.length > 0 && !isAnimating) {
            executeNextStep();
          }
        }, 50);
      }
    }
  }, [isAnimating]);
  
  const startSimulation = useCallback(() => {
    resetVisualization();
    setIsAnimating(true);
    
    // Create handlers for the simulation
    const handleNodeStatus = (nodeId: string, status: string | null) => {
      setNodes(currentNodes => 
        currentNodes.map(node => ({
          ...node,
          data: {
            ...node.data,
            isActive: status !== null,
            status: node.id === nodeId ? status : (node.data as any).status
          }
        }))
      );
    };
    
    const handleEdgeStatus = (edgeId: string, animated: boolean) => {
      setEdges(currentEdges => 
        currentEdges.map(edge => ({
          ...edge,
          animated: edge.id === edgeId ? animated : edge.animated
        }))
      );
    };
    
    const handleDataFlow = (flow: DataFlowMessage) => {
      setDataFlows(currentFlows => [...currentFlows, flow]);
    };
    
    // Enhanced step handler with better timing and error handling
    const handleAddStep = (stepFn: () => void) => {
      if (animationState.mode === 'step-by-step') {
        stepQueueRef.current.push(stepFn);
        // If this is the first step, execute it immediately to start the visualization
        if (stepQueueRef.current.length === 1) {
          setTimeout(() => executeNextStep(), 100);
        }
        return null; // Return null for step-by-step mode as timeouts are not used
      } else {
        // In auto mode, execute based on speed factor with better timing
        if (!animationState.isPaused) {
          const timeoutId = setTimeout(() => {
            try {
              stepFn();
            } catch (error) {
              console.warn('Error in animation step (suppressed):', error);
              // Try to keep animation going despite errors
              setIsAnimating(true);
            }
          }, 100 / speedFactor);
          return timeoutId;
        }
        return null;
      }
    };
    
    // Generate some initial nodes, edges, and data flows to kick-start visualization
    // This helps ensure ReactFlow is properly initialized
    setTimeout(() => {
      // Find input node
      const inputNode = nodes.find(node => node.data.nodeType === 'input');
      if (inputNode) {
        // Activate the input node
        handleNodeStatus(inputNode.id, 'processing');
        
        // Find connecting edges
        const outgoingEdges = edges.filter(edge => edge.source === inputNode.id);
        if (outgoingEdges.length > 0) {
          // Activate the first edge
          handleEdgeStatus(outgoingEdges[0].id, true);
          
          // Create a data flow
          handleDataFlow({
            id: `initial-flow-${Date.now()}`,
            edgeId: outgoingEdges[0].id,
            source: inputNode.id,
            target: outgoingEdges[0].target,
            content: `Processing input: "${queryInput || 'Tell me about agent patterns'}"`,
            timestamp: Date.now(),
            type: 'query',
            progress: 0,
            label: 'Starting...'
          });
        }
      }
    }, 100);
    
    // Start the simulation using our utility with proper parameters
    const result = simulatePatternFlow(
      nodes,
      edges,
      handleNodeStatus,
      handleEdgeStatus,
      handleDataFlow,
      queryInput,
      handleAddStep,
      speedFactor
    );
    
    // Force visibility of all ReactFlow elements after animation starts
    const forceVisibilityTimer = setTimeout(() => {
      if (containerRef.current) {
        fixReactFlowRendering(containerRef.current);
        
        // Don't call fitView during animation as it causes clustering
        // if (flowInstanceRef.current) {
        //   flowInstanceRef.current.fitView();
        // }
      }
    }, 300);
    
    // Store the cleanup function
    simulationCleanupRef.current = () => {
      if (result.cleanup) result.cleanup();
      clearTimeout(forceVisibilityTimer);
    };
    
    // Actually start some flows to show animation
    if (nodes.length > 0 && edges.length > 0) {
      // Find the first few edges to animate
      const edgesToAnimate = edges.slice(0, Math.min(edges.length, 3));
      
      edgesToAnimate.forEach((edge, index) => {
        const delay = index * 1000 / speedFactor;
        
        setTimeout(() => {
          // Activate source node
          handleNodeStatus(edge.source, 'processing');
          
          // Animate the edge
          handleEdgeStatus(edge.id, true);
          
          // Create a data flow
          handleDataFlow({
            id: `flow-${Date.now()}-${index}`,
            edgeId: edge.id,
            source: edge.source,
            target: edge.target,
            content: `Processing: ${queryInput || 'data'}`,
            timestamp: Date.now(),
            type: 'message',
            progress: 0,
            label: 'Processing...'
          });
          
          // Activate target node after a delay
          setTimeout(() => {
            handleNodeStatus(edge.target, 'complete');
            handleEdgeStatus(edge.id, false);
          }, 2000 / speedFactor);
          
        }, delay);
      });
      
      // Stop animation after all flows complete
      setTimeout(() => {
        setIsAnimating(false);
      }, (edgesToAnimate.length * 1000 + 2000) / speedFactor);
    }
    
    // Return cleanup function
    return () => {
      if (simulationCleanupRef.current) simulationCleanupRef.current();
    };
  }, [nodes, edges, setNodes, setEdges, resetVisualization, animationState.mode, animationState.isPaused, speedFactor, executeNextStep, queryInput]);
  
  const onInit = useCallback((instance: ReactFlowInstance) => {
    flowInstanceRef.current = instance;
  }, []);
  
  const changeAnimationSpeed = useCallback((newSpeed: AnimationSpeed) => {
    setAnimationState(prev => ({ ...prev, speed: newSpeed }));
  }, []);
  
  const changeAnimationMode = useCallback((newMode: AnimationMode) => {
    // Reset visualization when changing mode
    resetVisualization();
    setAnimationState(prev => ({ ...prev, mode: newMode, step: 0 }));
  }, [resetVisualization]);

  return (
    <Card className="mb-6">
      <CardContent className="p-0 overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-muted">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{patternData.name}</h3>
            <Badge variant="outline" className="ml-2">{patternData.id}</Badge>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={resetLayout}
              title="Restore original node positions"
              className="hidden sm:flex"
            >
              <ArrowsCounterClockwise className="mr-1" size={14} />
              Reset Layout
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={resetVisualization}
              disabled={isAnimating && !animationState.isPaused}
            >
              <ArrowsCounterClockwise className="mr-2" size={14} />
              Reset
            </Button>
            <Button 
              size="sm"
              onClick={isAnimating ? togglePauseSimulation : startSimulation}
              disabled={isAnimating && animationState.mode === 'step-by-step' && stepQueueRef.current.length === 0}
              className={animationState.isPaused ? "bg-yellow-500 hover:bg-yellow-600" : ""}
            >
              {isAnimating ? (
                animationState.isPaused ? <Play className="mr-2" size={14} /> : <Pause className="mr-2" size={14} />
              ) : (
                <Play className="mr-2" size={14} />
              )}
              {isAnimating ? 
                (animationState.isPaused ? 'Resume' : 'Pause') : 
                'Start Simulation'}
            </Button>
          </div>
        </div>
        
        <div className="p-4 pt-0 bg-muted">
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Mode:</span>
                <div className="flex items-center gap-1">
                  <Button 
                    size="sm" 
                    variant={animationState.mode === 'auto' ? "default" : "outline"}
                    className="h-8"
                    onClick={() => changeAnimationMode('auto')}
                    disabled={isAnimating && !animationState.isPaused}
                  >
                    Auto
                  </Button>
                  <Button 
                    size="sm" 
                    variant={animationState.mode === 'step-by-step' ? "default" : "outline"}
                    className={`h-8 ${animationState.mode === 'step-by-step' ? "ring-2 ring-primary" : ""}`}
                    onClick={() => changeAnimationMode('step-by-step')}
                    disabled={isAnimating && !animationState.isPaused}
                  >
                    Step by Step
                  </Button>
                </div>
              </div>
              
              {isAnimating && animationState.mode === 'step-by-step' && (
                <Button 
                  size="sm" 
                  variant="default"
                  className="h-8 bg-primary hover:bg-primary/80 font-semibold pulse-animation"
                  onClick={executeNextStep}
                  disabled={!isAnimating || stepQueueRef.current.length === 0}
                >
                  <CaretRight size={14} className="mr-2" />
                  Next Step {stepQueueRef.current.length > 0 ? `(${stepQueueRef.current.length})` : ''}
                </Button>
              )}
              
              {animationState.mode === 'auto' && (
                <div className="flex items-center gap-2 flex-grow max-w-xs">
                  <Rewind size={14} />
                  <div className="flex-grow">
                    <Slider
                      defaultValue={[1]}
                      min={0.5}
                      max={2}
                      step={0.5}
                      value={[speedFactor]}
                      onValueChange={(value) => {
                        const factor = value[0];
                        if (factor === 0.5) changeAnimationSpeed('slow');
                        else if (factor === 1) changeAnimationSpeed('normal');
                        else if (factor === 1.5 || factor === 2) changeAnimationSpeed('fast');
                      }}
                    />
                  </div>
                  <FastForward size={14} />
                </div>
              )}
              
              <div className="flex items-center gap-1 ml-auto">
                <span className="text-sm">Speed:</span>
                <Badge variant={animationState.speed === 'slow' ? 'default' : 'outline'} onClick={() => changeAnimationSpeed('slow')} className="cursor-pointer">
                  Slow
                </Badge>
                <Badge variant={animationState.speed === 'normal' ? 'default' : 'outline'} onClick={() => changeAnimationSpeed('normal')} className="cursor-pointer font-medium border-2 border-primary">
                  Normal
                </Badge>
                <Badge variant={animationState.speed === 'fast' ? 'default' : 'outline'} onClick={() => changeAnimationSpeed('fast')} className="cursor-pointer">
                  Fast
                </Badge>
              </div>
            </div>
          </div>
        
        <div className="p-4">
          <p className="text-muted-foreground mb-4">{patternData.description}</p>
          
          {patternContents.find(p => p.id === patternData.id) && (
            <div className="mt-2">
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="text-primary text-sm underline-offset-4 hover:underline flex items-center gap-1"
              >
                {showDetails ? (
                  <><Info className="h-4 w-4" /> Hide detailed explanation</>
                ) : (
                  <><Info className="h-4 w-4" /> Show detailed explanation</>
                )}
              </button>
              
              {showDetails && (
                <div className="mt-3 p-3 bg-muted/50 rounded text-sm border border-muted">
                  <p className="leading-relaxed">
                    {patternContents.find(p => p.id === patternData.id)?.longDescription}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <StableFlowContainer style={{ height: 600 }} ref={containerRef} onReady={() => {
          // Disabled fitView to prevent clustering when navigating between patterns
          // if (flowInstanceRef.current && !isAnimating) {
          //   flowInstanceRef.current.fitView({ padding: 0.2 });
          // }
        }}>
          <StandardFlowVisualizerWithProvider
            nodes={nodes}
            edges={edges}
            flows={dataFlows.map(flow => ({
              id: flow.id,
              edgeId: flow.edgeId,
              source: flow.source,
              target: flow.target,
              content: flow.content,
              type: flow.type,
              progress: flow.progress,
              label: flow.label,
              complete: flow.complete
            }))}
            onNodesChange={(updatedNodes) => setNodes(updatedNodes)}
            onEdgesChange={(updatedEdges) => setEdges(updatedEdges)}
            onFlowComplete={onFlowComplete}
            animationSpeed={speedFactor}
            showLabels={true}
            showControls={true}
            autoFitView={false}
            nodeTypes={nodeTypes}
            className="h-full"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-card p-2 rounded shadow-sm text-xs text-muted-foreground flex items-center gap-2">
              <DotsSixVertical size={12} />
              {isAnimating ? 
                animationState.mode === 'step-by-step' ? 
                  `Step by step mode: ${animationState.step} steps completed` : 
                  'Visualizing data flow between agents...' 
                : 'Click "Start Simulation" to see data flow between agents'}
            </div>
          </div>
        </StableFlowContainer>
        <div className="p-4 border-t border-border">
          <h4 className="font-medium mb-2">Best Suited For:</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {patternData.useCases.map((useCase, index) => (
              <Badge key={index} variant="secondary">{useCase}</Badge>
            ))}
          </div>
          
          {patternContents.find(p => p.id === patternData.id) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="font-medium text-primary mb-2 flex items-center gap-1">
                  <Play size={14} className="text-primary" /> Key Advantages
                </h4>
                <ul className="text-sm space-y-1">
                  {patternContents.find(p => p.id === patternData.id)?.advantages.slice(0, 3).map((advantage, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-secondary mb-2 flex items-center gap-1">
                  <Info className="h-4 w-4" /> Limitations to Consider
                </h4>
                <ul className="text-sm space-y-1">
                  {patternContents.find(p => p.id === patternData.id)?.limitations.slice(0, 3).map((limitation, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-secondary mt-1">•</span>
                      <span>{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default memo(PatternVisualizer, (prevProps, nextProps) => {
  // Only re-render if the pattern ID changes
  return prevProps.patternData.id === nextProps.patternData.id;
});