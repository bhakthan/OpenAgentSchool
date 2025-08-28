import React, { useRef, useEffect, useMemo, useState } from 'react';
import * as d3 from 'd3';

// Types for our tree structure
interface TreeNode {
  id: string;
  name: string;
  type: 'root' | 'category' | 'concept' | 'pattern' | 'service' | 'quiz' | 'tab';
  description?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  children?: TreeNode[];
  novel?: boolean; // Mark special/new features like in your example
}

interface D3TreeVisualizationProps {
  // data is optional; this component uses its own internal data structure
  data?: TreeNode;
  onNodeSelect?: (node: TreeNode) => void;
  selectedNode?: TreeNode | null;
  className?: string;
}

export default function D3TreeVisualization({ 
  data, 
  onNodeSelect, 
  selectedNode, 
  className = "" 
}: D3TreeVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Simple state for collapse tracking
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set());
  
  // Detect if we're in dark mode
  const isDarkMode = () => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  };
  
  // Generate simplified tree data matching your example
  const treeData = useMemo(() => {
    return {
      id: 'root',
      name: 'Open Agent School',
      type: 'root' as const,
      children: [
        {
          id: 'tier-0',
          name: 'Prompting Fundamentals (Tier 0)',
          type: 'category' as const,
          children: collapsedNodes.has('tier-0') ? [] : [
            { id: 'agentic-ai-design-taxonomy', name: 'Agentic AI Design Taxonomy', type: 'concept' as const },
            { id: 'agentic-prompting-fundamentals', name: 'Agentic Prompting Fundamentals', type: 'concept' as const, novel: true },
            { id: 'prompt-optimization-patterns', name: 'Prompt Optimization Patterns', type: 'concept' as const, novel: true },
            { id: 'agent-instruction-design', name: 'Agent Instruction Design', type: 'concept' as const, novel: true },
            { id: 'agentic-workflow-control', name: 'Agentic Workflow Control', type: 'concept' as const, novel: true },
            { id: 'agent-evaluation-methodologies', name: 'Agent Evaluation Methodologies', type: 'concept' as const, novel: true }
          ]
        },
        {
          id: 'fundamentals',
          name: 'Foundational Concepts (Tier 1)',
          type: 'category' as const,
          children: collapsedNodes.has('fundamentals') ? [] : [
            { id: 'agent-architecture', name: 'Agent Architecture & Lifecycle', type: 'concept' as const },
            { id: 'agent-security', name: 'Agent Security & Trust', type: 'concept' as const },
            { id: 'multi-agent-systems', name: 'Multi-Agent Systems', type: 'concept' as const },
            { id: 'agent-ethics', name: 'Agent Ethics & Governance', type: 'concept' as const },
            { id: 'ai-agents', name: 'AI Agents', type: 'concept' as const },
            { id: 'agent-evaluation', name: 'Agent Evaluation', type: 'concept' as const }
          ]
        },
        {
          id: 'architecture',
          name: 'Communication & Protocols (Tier 2)',
          type: 'category' as const,
          children: collapsedNodes.has('architecture') ? [] : [
            { id: 'a2a-communication', name: 'A2A Communication', type: 'concept' as const },
            { id: 'model-context-protocol', name: 'Model Context Protocol', type: 'concept' as const },
            { id: 'flow-visualization', name: 'Flow Visualization', type: 'concept' as const },
            { id: 'a2a-communication-patterns', name: 'A2A Communication Patterns', type: 'concept' as const, novel: true }
          ]
        },
        {
          id: 'implementation',
          name: 'Advanced Integration (Tier 3)',
          type: 'category' as const,
          children: collapsedNodes.has('implementation') ? [] : [
            { id: 'agent-communication-protocol', name: 'Agent Communication Protocol', type: 'concept' as const },
            { id: 'mcp-a2a-integration', name: 'MCP × A2A Integration', type: 'concept' as const },
            { id: 'data-visualization', name: 'Data Visualization', type: 'concept' as const }
          ]
        },
        {
          id: 'enterprise',
          name: 'Enterprise Operations (Tier 4)',
          type: 'category' as const,
          children: collapsedNodes.has('enterprise') ? [] : [
            { id: 'agent-deployment', name: 'Agent Deployment & Operations', type: 'concept' as const },
            { id: 'agent-learning', name: 'Agent Learning & Adaptation', type: 'concept' as const },
            { id: 'agent-integration', name: 'Agent Integration Patterns', type: 'concept' as const }
          ]
        },
        {
          id: 'core-patterns',
          name: 'Core Patterns',
          type: 'category' as const,
          children: collapsedNodes.has('core-patterns') ? [] : [
            { id: 'react-agent', name: 'ReAct Agent', type: 'pattern' as const },
            { id: 'code-act', name: 'CodeAct Agent', type: 'pattern' as const, novel: true },
            { id: 'modern-tool-use', name: 'Modern Tool Use', type: 'pattern' as const, novel: true },
            { id: 'computer-use', name: 'Computer Use', type: 'pattern' as const, novel: true },
            { id: 'voice-agent', name: 'Voice Agent', type: 'pattern' as const, novel: true },
            { id: 'self-reflection', name: 'Self-Reflection', type: 'pattern' as const, novel: true },
            { id: 'sensory-reasoning-enhancement', name: 'Sensory Reasoning Enhancement', type: 'pattern' as const, novel: true }
          ]
        },
        {
          id: 'workflow-patterns',
          name: 'Workflow Patterns',
          type: 'category' as const,
          children: collapsedNodes.has('workflow-patterns') ? [] : [
            { id: 'agentic-rag', name: 'Agentic RAG', type: 'pattern' as const },
            { id: 'deep-researcher', name: 'Deep Researcher', type: 'pattern' as const, novel: true },
            { id: 'autonomous-workflow', name: 'Autonomous Workflow', type: 'pattern' as const, novel: true },
            { id: 'prompt-chaining', name: 'Prompt Chaining', type: 'pattern' as const },
            { id: 'parallelization', name: 'Parallelization', type: 'pattern' as const, novel: true }
          ]
        },
        {
          id: 'multi-agent-patterns',
          name: 'Multi-Agent Patterns',
          type: 'category' as const,
          children: collapsedNodes.has('multi-agent-patterns') ? [] : [
            { id: 'agent-to-agent', name: 'Agent to Agent', type: 'pattern' as const, novel: true },
            { id: 'autogen', name: 'AutoGen Multi-Agent', type: 'pattern' as const, novel: true },
            { id: 'deep-agents', name: 'Deep Agents', type: 'pattern' as const, novel: true },
            { id: 'orchestrator-worker', name: 'Orchestrator Worker', type: 'pattern' as const },
            { id: 'routing', name: 'Routing', type: 'pattern' as const },
            { id: 'swarm-intelligence', name: 'Swarm Intelligence', type: 'pattern' as const, novel: true }
          ]
        },
        {
          id: 'azure-services',
          name: 'Azure AI Services',
          type: 'category' as const,
          children: collapsedNodes.has('azure-services') ? [] : [
            { id: 'azure-openai', name: 'Azure OpenAI', type: 'service' as const },
            { id: 'azure-cognitive-services', name: 'Cognitive Services', type: 'service' as const },
            { id: 'azure-ml', name: 'Azure ML', type: 'service' as const },
            { id: 'azure-bot-service', name: 'Bot Service', type: 'service' as const, novel: true }
          ]
        },
        {
          id: 'study-mode',
          name: 'Study Mode',
          type: 'category' as const,
          children: collapsedNodes.has('study-mode') ? [] : [
            { id: 'study-socratic-thinking', name: 'Socratic Discovery', type: 'quiz' as const },
            { id: 'study-interactive-scenarios', name: 'Hands-On Scenarios', type: 'quiz' as const },
            { id: 'study-debug-challenges', name: 'Debug & Fix', type: 'quiz' as const },
            { id: 'study-super-critical-learning', name: 'Super Critical Learning', type: 'quiz' as const, novel: true }
          ]
        },
        {
          id: 'evaluations',
          name: 'Evaluations & Testing',
          type: 'category' as const,
          children: collapsedNodes.has('evaluations') ? [] : [
            { id: 'system-design-quiz', name: 'System Design Quiz', type: 'quiz' as const },
            { id: 'agent-fundamentals-quiz', name: 'Agent Fundamentals Quiz', type: 'quiz' as const },
            { id: 'multi-agent-quiz', name: 'Multi-Agent Systems Quiz', type: 'quiz' as const },
            { id: 'security-quiz', name: 'Security & Ethics Quiz', type: 'quiz' as const }
          ]
        },
        {
          id: 'educational-patterns',
          name: 'Educational Agent Patterns (GPT-5 Era)',
          type: 'category' as const,
          children: collapsedNodes.has('educational-patterns') ? [] : [
            { id: 'socratic-coach', name: 'Socratic Coach', type: 'pattern' as const, novel: true },
            { id: 'concept-to-project-builder', name: 'Concept-to-Project Builder', type: 'pattern' as const, novel: true },
            { id: 'error-whisperer', name: 'Error Whisperer', type: 'pattern' as const, novel: true },
            { id: 'knowledge-map-navigator', name: 'Knowledge Map Navigator', type: 'pattern' as const, novel: true },
            { id: 'context-curator', name: 'Context Curator', type: 'pattern' as const, novel: true },
            { id: 'rubric-rater', name: 'Rubric Rater', type: 'pattern' as const, novel: true },
            { id: 'self-remediation-loop', name: 'Self-Remediation Loop', type: 'pattern' as const, novel: true },
            { id: 'spaced-repetition-planner', name: 'Spaced Repetition Planner', type: 'pattern' as const, novel: true },
            { id: 'challenge-ladder-generator', name: 'Challenge Ladder Generator', type: 'pattern' as const, novel: true },
            { id: 'peer-review-simulator', name: 'Peer-Review Simulator', type: 'pattern' as const, novel: true },
            { id: 'reflection-journaler', name: 'Reflection Journaler', type: 'pattern' as const, novel: true },
            { id: 'handoff-summarizer', name: 'Handoff Summarizer', type: 'pattern' as const, novel: true },
            { id: 'misconception-detector', name: 'Misconception Detector', type: 'pattern' as const, novel: true },
            { id: 'time-box-pair-programmer', name: 'Time-box Pair Programmer', type: 'pattern' as const, novel: true },
            { id: 'tool-use-coach', name: 'Tool-Use Coach', type: 'pattern' as const, novel: true }
          ]
        }
      ]
    };
  }, [collapsedNodes]);

  // Helper functions for styling with fallback colors for dark/light mode
  const getNodeFill = (node: TreeNode): string => {
    const colors = {
      root: '#3b82f6',      // Blue
      category: '#8b5cf6',  // Purple  
      concept: '#06b6d4',   // Cyan
      pattern: '#f59e0b',   // Amber
      service: '#10b981',   // Emerald
      quiz: '#ec4899'       // Pink
    };
    
    // Special coloring for educational patterns
    if (node.type === 'pattern' && node.id && [
      'socratic-coach', 'concept-to-project-builder', 'error-whisperer',
      'knowledge-map-navigator', 'context-curator', 'rubric-rater',
      'self-remediation-loop', 'spaced-repetition-planner', 'challenge-ladder-generator',
      'peer-review-simulator', 'reflection-journaler', 'handoff-summarizer',
      'misconception-detector', 'time-box-pair-programmer', 'tool-use-coach'
    ].includes(node.id)) {
      return '#d97706'; // Darker amber for educational patterns to distinguish them
    }
    
    return colors[node.type] || '#6b7280';
  };

  const getNodeStroke = (node: TreeNode): string => {
    if (node.novel) {
      return '#ef4444'; // Red for novel items
    }
    return isDarkMode() ? '#6b7280' : '#374151'; // Lighter border in dark mode
  };

  const getNodeRadius = (node: TreeNode): number => {
    if (node.type === 'root') return 12;
    if (node.type === 'category') return 8;
    
    // Slightly larger radius for educational patterns to make them more prominent
    if (node.type === 'pattern' && node.id && [
      'socratic-coach', 'concept-to-project-builder', 'error-whisperer',
      'knowledge-map-navigator', 'context-curator', 'rubric-rater',
      'self-remediation-loop', 'spaced-repetition-planner', 'challenge-ladder-generator',
      'peer-review-simulator', 'reflection-journaler', 'handoff-summarizer',
      'misconception-detector', 'time-box-pair-programmer', 'tool-use-coach'
    ].includes(node.id)) {
      return 7; // Slightly larger than normal patterns (6)
    }
    
    return 6;
  };

  const getTextColor = (): string => {
    // Theme-aware text: light uses near-black, dark uses light gray
    return isDarkMode() ? '#e5e7eb' : '#111827';
  };

  const getLinkColor = (): string => {
    // Slightly subdued links in both themes for readability
    return isDarkMode() ? '#6b7280' : '#64748b';
  };

  // Toggle collapse state
  const toggleNodeCollapse = (nodeId: string) => {
    setCollapsedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    // Set up dimensions - optimized for three-tier edge lengths while staying within screen bounds
    const width = 1200;  // Keep original width for better screen compatibility
    const height = 1100; // Keep increased height for the new branch
    const margin = { top: 60, right: 120, bottom: 60, left: 150 }; // Balanced margins

    // Create tree layout (horizontal) with custom separation for tighter spacing
    const treeLayout = d3.tree<TreeNode>()
      .size([height - margin.top - margin.bottom, width - margin.left - margin.right])
      .separation((a, b) => {
        // Reduce spacing between nodes, especially from root to categories
        if (a.parent === b.parent) {
          // Sibling nodes - normal spacing
          return 1;
        }
        // Different parents - closer spacing
        return 1.5;
      });

    // Create hierarchy
    const root = d3.hierarchy(treeData);
    const treeData_positioned = treeLayout(root);

    // Manually adjust positions to reduce spacing from root to categories
    // And create three different edge lengths for better visual hierarchy
  treeData_positioned.descendants().forEach((node, index) => {
      if (node.depth === 1) { // Category nodes (first level after root)
        node.y = node.y * 0.4; // Reduce horizontal distance by 60%
      } else if (node.depth === 2) { // Leaf nodes (concepts, patterns, etc.)
        // Create three different edge lengths based on parent's position for visual variety
        const parentIndex = node.parent?.data.id === 'tier-0' ? 0 :
                           node.parent?.data.id === 'fundamentals' ? 1 :
                           node.parent?.data.id === 'architecture' ? 2 :
                           node.parent?.data.id === 'implementation' ? 3 :
                           node.parent?.data.id === 'enterprise' ? 4 :
                           node.parent?.data.id === 'core-patterns' ? 5 :
                           node.parent?.data.id === 'workflow-patterns' ? 6 :
                           node.parent?.data.id === 'multi-agent-patterns' ? 7 :
                           node.parent?.data.id === 'azure-services' ? 8 :
                           node.parent?.data.id === 'study-mode' ? 9 :
                           node.parent?.data.id === 'evaluations' ? 10 :
                           node.parent?.data.id === 'educational-patterns' ? 11 : 12;
        
        // Create three distinct edge lengths: short (0.5), medium (0.65), and long (0.8)
        // for better visual hierarchy while staying within screen bounds
        let edgeMultiplier;
        if (parentIndex % 3 === 0) {
          edgeMultiplier = 0.5;  // Short edges - creates tight grouping
        } else if (parentIndex % 3 === 1) {
          edgeMultiplier = 0.65; // Medium edges - balanced spacing
        } else {
          edgeMultiplier = 0.8;  // Long edges - extends toward right but stays within bounds
        }
        
        // Special handling for the new educational patterns - give them medium-long edges
        // to create visual distinction without extending too far
        if (node.parent?.data.id === 'educational-patterns') {
          edgeMultiplier = 0.85; // Slightly longer than standard long edges for emphasis
        }
        
        node.y = node.y * edgeMultiplier;
      }
  // Global left shift to create more space on the right for detail cards (avoid horizontal scrollbar)
  const leftShift = 100; // px
  node.y = Math.max(0, node.y - leftShift);
    });

    // Create main group
    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create links (paths between nodes)
    const link = g.selectAll('.link')
      .data(treeData_positioned.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal<any, any>()
        .x((d: any) => d.y)
        .y((d: any) => d.x))
      .style('fill', 'none')
      .style('stroke', getLinkColor())
      .style('stroke-width', 2);

    // Create nodes
    const node = g.selectAll('.node')
      .data(treeData_positioned.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        // Handle node click - toggle collapse for parent nodes, navigate for leaf nodes
        if (d.data.children && d.data.children.length > 0) {
          toggleNodeCollapse(d.data.id);
        } else if (onNodeSelect) {
          // Call onNodeSelect for leaf nodes (concepts, patterns, services, quizzes)
          onNodeSelect(d.data);
        }
      });

    // Add circles for nodes
    node.append('circle')
      .attr('r', d => getNodeRadius(d.data))
      .style('fill', d => getNodeFill(d.data))
      .style('stroke', d => getNodeStroke(d.data))
      .style('stroke-width', d => d.data.novel ? 3 : 2);

    // Add text labels
    node.append('text')
      .attr('dy', '0.35em')
      .attr('x', d => d.children ? -15 : 15)
      .style('text-anchor', d => d.children ? 'end' : 'start')
      .style('fill', getTextColor())
      .style('font-size', d => d.data.type === 'root' ? '16px' : d.data.type === 'category' ? '14px' : '12px')
      .style('font-weight', d => d.data.type === 'root' ? 'bold' : d.data.type === 'category' ? '600' : 'normal')
      .text(d => d.data.name);

    // Novel indicators removed - no more red stars

    // Add expand/collapse indicators for nodes with children
    node.filter(d => d.data.children && d.data.children.length > 0)
      .append('text')
      .attr('x', 0)
      .attr('y', -18)
      .style('text-anchor', 'middle')
      .style('fill', isDarkMode() ? '#9ca3af' : '#6b7280') // Lighter in dark mode
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .text(d => collapsedNodes.has(d.data.id) ? '+' : '-');

  }, [treeData, collapsedNodes, onNodeSelect, selectedNode]);

  return (
    <div className={`w-full h-full ${className}`} style={{ 
      overflowX: 'hidden',
      overflowY: 'auto',
      border: '1px solid hsl(var(--border))',
      borderRadius: '8px',
      padding: '16px',
      height: 'fit-content',
      minHeight: '600px',
      maxWidth: '100%' // Ensure container doesn't exceed parent width
    }}>
      <svg ref={svgRef} style={{ width: '100%', height: '1100px', maxWidth: '1200px' }} />
    </div>
  );
}
