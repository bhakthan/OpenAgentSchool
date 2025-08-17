import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  Connection,
  NodeChange,
  EdgeChange,
  BackgroundVariant,
  Position,
} from '@xyflow/react';
import { forceSimulation, forceLink, forceManyBody, forceCenter, SimulationNodeDatum } from 'd3-force';

import '@xyflow/react/dist/style.css';
import '../../styles/scl-theme.css';

// Types for SCL Graph
export interface SCLEffect {
  id: string;
  text: string;
  type: 'first-order' | 'higher-order' | 'synthesis' | 'constraint';
  confidence: number;
  category?: string;
  sources?: string[];
  constraints?: string[];
}

export interface SCLNode extends Node {
  data: {
    effect: SCLEffect;
    label: string;
    confidence: number;
    type: SCLEffect['type'];
    expanded?: boolean;
  };
}

export interface SCLEdge extends Edge {
  data?: {
    relationship: 'causes' | 'enables' | 'constrains' | 'amplifies' | 'synthesis';
    strength: number;
  };
}

interface SCLGraphProps {
  effects: SCLEffect[];
  onNodeClick?: (node: SCLNode) => void;
  onNodeEdit?: (nodeId: string, newData: Partial<SCLEffect>) => void;
  onEdgeCreate?: (connection: Connection) => void;
  className?: string;
  interactive?: boolean;
  showMinimap?: boolean;
  enableForceLayout?: boolean;
}

// Node type mapping for visual styling
const getNodeType = (effectType: SCLEffect['type']) => {
  switch (effectType) {
    case 'first-order': return 'input';
    case 'higher-order': return 'default';
    case 'synthesis': return 'output';
    case 'constraint': return 'group';
    default: return 'default';
  }
};

// Node styling based on type and confidence
const getNodeStyle = (effect: SCLEffect) => {
  const baseStyle = {
    border: '2px solid',
    borderRadius: '8px',
    padding: '10px',
    fontSize: '12px',
    fontWeight: 500,
    minWidth: '120px',
    textAlign: 'center' as const,
    transition: 'all 0.2s ease',
  };

  const opacity = Math.max(0.3, effect.confidence);
  
  switch (effect.type) {
    case 'first-order':
      return {
        ...baseStyle,
        backgroundColor: `hsl(var(--primary) / ${opacity})`,
        borderColor: 'hsl(var(--primary))',
        color: 'hsl(var(--primary-foreground))',
      };
    case 'higher-order':
      return {
        ...baseStyle,
        backgroundColor: `hsl(var(--secondary) / ${opacity})`,
        borderColor: 'hsl(var(--secondary))',
        color: 'hsl(var(--secondary-foreground))',
      };
    case 'synthesis':
      return {
        ...baseStyle,
        backgroundColor: `hsl(var(--accent) / ${opacity})`,
        borderColor: 'hsl(var(--accent))',
        color: 'hsl(var(--accent-foreground))',
      };
    case 'constraint':
      return {
        ...baseStyle,
        backgroundColor: `hsl(var(--destructive) / ${opacity})`,
        borderColor: 'hsl(var(--destructive))',
        color: 'hsl(var(--destructive-foreground))',
      };
    default:
      return {
        ...baseStyle,
        backgroundColor: `hsl(var(--muted) / ${opacity})`,
        borderColor: 'hsl(var(--border))',
        color: 'hsl(var(--muted-foreground))',
      };
  }
};

// Force-directed layout algorithm
const applyForceLayout = (nodes: SCLNode[], edges: SCLEdge[]): { x: number; y: number }[] => {
  // Create simulation nodes with required properties
  const simulationNodes: (SimulationNodeDatum & { id: string })[] = nodes.map(node => ({
    id: node.id,
    x: node.position.x,
    y: node.position.y,
  }));

  const simulation = forceSimulation(simulationNodes)
    .force('link', forceLink(edges).id((d: any) => d.id).distance(100))
    .force('charge', forceManyBody().strength(-300))
    .force('center', forceCenter(400, 300));

  // Run simulation
  for (let i = 0; i < 300; ++i) simulation.tick();

  return simulationNodes.map(node => ({ x: node.x || 0, y: node.y || 0 }));
};

// Convert SCL effects to React Flow nodes and edges
const convertEffectsToGraph = (
  effects: SCLEffect[], 
  enableForceLayout: boolean = false
): { nodes: SCLNode[], edges: SCLEdge[] } => {
  // Create nodes
  const nodes: SCLNode[] = effects.map((effect, index) => ({
    id: effect.id,
    type: getNodeType(effect.type),
    position: { x: index * 200, y: Math.floor(index / 4) * 150 },
    data: {
      effect,
      label: effect.text.length > 50 ? `${effect.text.substring(0, 47)}...` : effect.text,
      confidence: effect.confidence,
      type: effect.type,
    },
    style: { ...getNodeStyle(effect) },
    className: `scl-node scl-node-${effect.type}`,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  }));

  // Create edges based on effect relationships
  const edges: SCLEdge[] = [];
  
  effects.forEach((effect, index) => {
    // Connect first-order to higher-order effects
    if (effect.type === 'first-order') {
      const higherOrderEffects = effects.filter(e => e.type === 'higher-order');
      higherOrderEffects.forEach(higherEffect => {
        edges.push({
          id: `${effect.id}-${higherEffect.id}`,
          source: effect.id,
          target: higherEffect.id,
          type: 'smoothstep',
          data: {
            relationship: 'causes',
            strength: Math.min(effect.confidence, higherEffect.confidence),
          },
          style: { stroke: 'hsl(var(--muted-foreground))', strokeWidth: 2 },
          markerEnd: { type: 'arrowclosed', color: 'hsl(var(--muted-foreground))' },
        });
      });
    }

    // Connect higher-order to synthesis
    if (effect.type === 'higher-order') {
      const synthesisEffects = effects.filter(e => e.type === 'synthesis');
      synthesisEffects.forEach(synthesisEffect => {
        edges.push({
          id: `${effect.id}-${synthesisEffect.id}`,
          source: effect.id,
          target: synthesisEffect.id,
          type: 'smoothstep',
          data: {
            relationship: 'enables',
            strength: Math.min(effect.confidence, synthesisEffect.confidence),
          },
          style: { stroke: '#22c55e', strokeWidth: 2 },
          markerEnd: { type: 'arrowclosed', color: '#22c55e' },
        });
      });
    }

    // Connect constraints to relevant effects
    if (effect.type === 'constraint') {
      effects.forEach(targetEffect => {
        if (targetEffect.type !== 'constraint' && targetEffect.constraints?.includes(effect.id)) {
          edges.push({
            id: `${effect.id}-${targetEffect.id}`,
            source: effect.id,
            target: targetEffect.id,
            type: 'step',
            data: {
              relationship: 'constrains',
              strength: effect.confidence,
            },
            style: { stroke: '#ef4444', strokeWidth: 2, strokeDasharray: '5,5' },
            markerEnd: { type: 'arrowclosed', color: '#ef4444' },
          });
        }
      });
    }
  });

  // Apply force-directed layout if enabled
  if (enableForceLayout && nodes.length > 0) {
    const positions = applyForceLayout(nodes, edges);
    nodes.forEach((node, index) => {
      node.position = positions[index];
    });
  }

  return { nodes, edges };
};

export const SCLGraph: React.FC<SCLGraphProps> = ({
  effects,
  onNodeClick,
  onNodeEdit,
  onEdgeCreate,
  className = '',
  interactive = true,
  showMinimap = true,
  enableForceLayout = false,
}) => {
  // Convert effects to graph data
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => convertEffectsToGraph(effects, enableForceLayout),
    [effects, enableForceLayout]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Handle new edge creation
  const onConnect = useCallback(
    (connection: Connection) => {
      if (onEdgeCreate) {
        onEdgeCreate(connection);
      }
      
      const newEdge: SCLEdge = {
        ...connection,
        id: `${connection.source}-${connection.target}`,
        type: 'smoothstep',
        data: {
          relationship: 'causes',
          strength: 0.5,
        },
        style: { stroke: 'hsl(var(--muted-foreground))', strokeWidth: 2 },
        markerEnd: { type: 'arrowclosed', color: 'hsl(var(--muted-foreground))' },
      };
      
      setEdges(edges => addEdge(newEdge, edges));
    },
    [onEdgeCreate, setEdges]
  );

  // Handle node clicks
  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      if (onNodeClick) {
        onNodeClick(node as SCLNode);
      }
    },
    [onNodeClick]
  );

  // Update nodes when effects change
  React.useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = convertEffectsToGraph(effects, enableForceLayout);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [effects, enableForceLayout, setNodes, setEdges]);

  return (
    <div className={`w-full h-full scl-themed ${className || ''}`} style={{ minHeight: '500px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={interactive ? onConnect : undefined}
        onNodeClick={handleNodeClick}
        snapToGrid
        snapGrid={[20, 20]}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        minZoom={0.2}
        maxZoom={2}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        
        <Controls 
          position="top-left"
          showZoom={true}
          showFitView={true}
          showInteractive={interactive}
        />
        
        {showMinimap && (
          <MiniMap 
            position="bottom-right"
            nodeStrokeColor="hsl(var(--border))"
            nodeColor={(node) => {
              const effect = (node as SCLNode).data.effect;
              const style = getNodeStyle(effect);
              return style.backgroundColor;
            }}
            maskColor="hsl(var(--background) / 0.1)"
          />
        )}
      </ReactFlow>
    </div>
  );
};

export default SCLGraph;
