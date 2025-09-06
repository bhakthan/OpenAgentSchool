import React from 'react';
import { Button } from '@/components/ui/button';

// Static taxonomy data
const taxonomy = {
  name: "Agentic AI",
  children: [
    {
      name: "Agent Design Patterns",
      children: [
        { name: "Role-based agents", children: [
          { name: "Planner" },
          { name: "Executor" },
          { name: "Critic/Reviewer" },
          { name: "Tool-Operator" },
        ]},
        { name: "Agent behavior patterns", children: [
          { name: "Reactive" },
          { name: "Proactive" },
          { name: "Goal-oriented" },
        ]},
        { name: "Planning capabilities", children: [
          { name: "Hierarchical planning" },
          { name: "Multi-step reasoning" },
          { name: "Tree/Graph search" },
        ]},
        { name: "Learning mechanisms", children: [
          { name: "Reinforcement learning" },
          { name: "Few/Zero-shot learning" },
          { name: "Meta-learning" },
        ]},
      ],
    },
    {
      name: "Interaction Protocols",
      children: [
        { name: "Communication standards", children: [
          { name: "JSON-RPC" },
          { name: "REST APIs" },
          { name: "WebSocket" },
          { name: "GraphQL" },
        ]},
        { name: "Task sharing", children: [
          { name: "Work queues" },
          { name: "Load balancing" },
          { name: "Consensus (RAFT/Paxos)" },
        ]},
        { name: "Message passing", children: [
          { name: "Async messaging" },
          { name: "Event streams" },
          { name: "Pub/Sub" },
          { name: "Kafka pipelines" },
        ]},
        { name: "Collaboration models", children: [
          { name: "Negotiation" },
          { name: "Voting" },
          { name: "Coalitions" },
        ]},
      ],
    },
    {
      name: "Framework Architectures",
      children: [
        { name: "Graph-based", children: [
          { name: "LangGraph" },
          { name: "StateGraph" },
          { name: "Workflow DAGs" },
        ]},
        { name: "Workflow oriented", children: [
          { name: "CrewAI" },
          { name: "AutoGen" },
          { name: "Sequential Chains" },
        ]},
        { name: "Modular", children: [
          { name: "Plugin systems" },
          { name: "Microservices" },
          { name: "Composable agents" },
        ]},
        { name: "Hybrid models", children: [
          { name: "Symbolic + LLM" },
        ]},
        { name: "Execution environments", children: [
          { name: "Serverless agents" },
          { name: "Docker/K8s" },
        ]},
      ],
    },
    {
      name: "AI Model Integration",
      children: [
        { name: "Language models", children: [
          { name: "GPT-4 / o-series" },
          { name: "Claude" },
          { name: "Gemini" },
          { name: "LLaMA 3" },
        ]},
        { name: "Embedding models", children: [
          { name: "text-embedding-ada-002" },
          { name: "Sentence Transformers" },
          { name: "Cohere Embeddings" },
        ]},
        { name: "Memory models", children: [
          { name: "Vector stores (FAISS/Pinecone/Weaviate)" },
          { name: "Knowledge graphs" },
        ]},
        { name: "Guardrails", children: [
          { name: "Input validation" },
          { name: "Output filtering" },
          { name: "Fact-checking" },
          { name: "Ethical constraints" },
          { name: "Constitutional AI" },
        ]},
        { name: "Tool integration", children: [
          { name: "Retrieval (RAG)" },
          { name: "Code execution" },
          { name: "External APIs" },
        ]},
      ],
    },
    {
      name: "Memory Systems",
      children: [
        { name: "Short-term", children: [
          { name: "Context buffers" },
          { name: "Session state" },
        ]},
        { name: "Long-term", children: [
          { name: "Knowledge base" },
          { name: "Experience bank" },
          { name: "User profiles" },
        ]},
        { name: "Episodic", children: [
          { name: "Conversation history" },
          { name: "Decision logs" },
          { name: "Task outcomes" },
        ]},
        { name: "Semantic", children: [
          { name: "Concept maps" },
          { name: "Ontologies" },
          { name: "Fact databases" },
        ]},
        { name: "Working memory augmentation", children: [
          { name: "Scratchpads" },
          { name: "Vector-DB prompts" },
        ]},
      ],
    },
    {
      name: "Application Domains",
      children: [
        { name: "Customer support", children: [
          { name: "Chatbots" },
          { name: "Ticket triage" },
          { name: "Troubleshooting" },
        ]},
        { name: "Content generation", children: [
          { name: "Writing assistants" },
          { name: "Code generation" },
          { name: "Design co-pilots" },
        ]},
        { name: "Process automation", children: [
          { name: "Workflow automation" },
          { name: "Document processing" },
          { name: "Data pipelines" },
        ]},
        { name: "Research & analysis", children: [
          { name: "Market research" },
          { name: "Financial analysis" },
          { name: "Legal assistants" },
        ]},
        { name: "Healthcare", children: [
          { name: "Virtual health assistants" },
          { name: "Diagnostic support" },
          { name: "Personalized care" },
        ]},
        { name: "Education", children: [
          { name: "AI tutors" },
          { name: "Adaptive learning" },
          { name: "Curriculum agents" },
        ]},
      ],
    },
    {
      name: "Opportunities",
      children: [
        { name: "Scalability" },
        { name: "Interoperability (open agent protocols)" },
        { name: "Code safety & reliability" },
        { name: "Composable ecosystems" },
        { name: "Ethical governance & auditability" },
        { name: "Human–AI collaboration" },
      ],
    },
  ],
};

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

interface PositionedNode extends TreeNode {
  x: number;
  y: number;
  depth: number;
}

// Calculate positions for all nodes
function calculatePositions(root: TreeNode): PositionedNode[] {
  const nodes: PositionedNode[] = [];
  const horizontalSpacing = 250;
  const verticalSpacing = 35;
  
  function traverse(node: TreeNode, depth: number, yOffset: number): number {
    const x = depth * horizontalSpacing + 20;
    const y = yOffset;
    
    const positionedNode: PositionedNode = {
      ...node,
      x,
      y,
      depth
    };
    
    nodes.push(positionedNode);
    
    let currentY = y + verticalSpacing;
    
    if (node.children) {
      node.children.forEach((child) => {
        currentY = traverse(child, depth + 1, currentY);
      });
    }
    
    return currentY;
  }
  
  traverse(root, 0, 50);
  return nodes;
}

// Generate connecting lines
function generateConnections(nodes: PositionedNode[]): Array<{x1: number, y1: number, x2: number, y2: number}> {
  const connections: Array<{x1: number, y1: number, x2: number, y2: number}> = [];
  
  nodes.forEach(node => {
    if (node.children) {
      const nodeRect = nodes.find(n => n.name === node.name);
      if (nodeRect) {
        node.children.forEach(child => {
          const childRect = nodes.find(n => n.name === child.name);
          if (childRect) {
            connections.push({
              x1: nodeRect.x + 200, // Right edge of parent
              y1: nodeRect.y + 14,  // Center of parent
              x2: childRect.x - 20, // Left edge of child
              y2: childRect.y + 14  // Center of child
            });
          }
        });
      }
    }
  });
  
  return connections;
}

// Color scheme for different depths
const getNodeColor = (depth: number, isDark: boolean) => {
  const lightColors = [
    '#3b82f6', // blue-500
    '#10b981', // emerald-500
    '#f59e0b', // amber-500
    '#ef4444', // red-500
    '#8b5cf6', // violet-500
    '#06b6d4', // cyan-500
    '#84cc16', // lime-500
  ];
  
  const darkColors = [
    '#60a5fa', // blue-400
    '#34d399', // emerald-400
    '#fbbf24', // amber-400
    '#f87171', // red-400
    '#a78bfa', // violet-400
    '#22d3ee', // cyan-400
    '#a3e635', // lime-400
  ];
  
  const colors = isDark ? darkColors : lightColors;
  return colors[depth % colors.length];
};

export default function StaticSVGTaxonomyTree() {
  const nodes = calculatePositions(taxonomy);
  const connections = generateConnections(nodes);
  
  // Calculate SVG dimensions
  const maxX = Math.max(...nodes.map(n => n.x)) + 250;
  const maxY = Math.max(...nodes.map(n => n.y)) + 50;
  
  const exportSVG = () => {
    const svgElement = document.getElementById('taxonomy-svg');
    if (!svgElement) return;
    
    // Clone the SVG to avoid modifying the original
    const svgClone = svgElement.cloneNode(true) as SVGSVGElement;
    svgClone.setAttribute('width', maxX.toString());
    svgClone.setAttribute('height', maxY.toString());
    svgClone.setAttribute('viewBox', `0 0 ${maxX} ${maxY}`);
    svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    
    // Convert to string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgClone);
    
    // Create download
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'agentic-ai-taxonomy-tree.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="w-full h-full overflow-auto bg-gray-50 dark:bg-gray-900 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Agentic AI Taxonomy - Static Learning Atlas
        </h2>
        <Button 
          onClick={exportSVG}
          variant="outline"
          className="text-sm"
        >
          Export SVG
        </Button>
      </div>
      
      <div className="w-full border rounded-lg bg-white dark:bg-gray-800 overflow-auto">
        <svg 
          id="taxonomy-svg"
          width={maxX} 
          height={maxY}
          className="w-full"
          style={{ minWidth: maxX, minHeight: maxY }}
        >
          {/* Connection lines */}
          {connections.map((conn, index) => (
            <g key={index}>
              <path
                d={`M ${conn.x1} ${conn.y1} L ${conn.x1 + 30} ${conn.y1} L ${conn.x1 + 30} ${conn.y2} L ${conn.x2} ${conn.y2}`}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-400 dark:text-gray-500"
              />
            </g>
          ))}
          
          {/* Nodes */}
          {nodes.map((node, index) => (
            <g key={index}>
              {/* Node rectangle */}
              <rect
                x={node.x}
                y={node.y}
                width={200}
                height={28}
                rx={6}
                ry={6}
                fill={getNodeColor(node.depth, false)}
                className="dark:hidden"
                stroke="#ffffff"
                strokeWidth="2"
              />
              
              {/* Dark mode node rectangle */}
              <rect
                x={node.x}
                y={node.y}
                width={200}
                height={28}
                rx={6}
                ry={6}
                fill={getNodeColor(node.depth, true)}
                className="hidden dark:block"
                stroke="#374151"
                strokeWidth="2"
              />
              
              {/* Node text */}
              <text
                x={node.x + 10}
                y={node.y + 19}
                className="text-sm font-bold fill-white"
                style={{ fontSize: '13px', fontWeight: 'bold' }}
              >
                {node.name.length > 22 ? `${node.name.substring(0, 22)}...` : node.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
