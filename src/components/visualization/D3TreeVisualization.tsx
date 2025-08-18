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
            { id: 'self-reflection', name: 'Self-Reflection', type: 'pattern' as const, novel: true }
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
    return colors[node.type] || '#6b7280';
  };

  const getNodeStroke = (node: TreeNode): string => {
    if (node.novel) {
      return '#ef4444'; // Red for novel items
    }
    return isDarkMode() ? '#6b7280' : '#374151'; // Lighter border in dark mode
  };

  const getTextColor = (): string => {
    // Use colors that work in both light and dark themes
    return isDarkMode() ? '#f3f4f6' : '#1f2937'; // Light gray for dark mode, dark gray for light mode
  };

  const getLinkColor = (): string => {
    return isDarkMode() ? '#6b7280' : '#9ca3af'; // Darker in dark mode, lighter in light mode
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

    // Set up dimensions - increased height and better margins
    const width = 1200;
    const height = 1000; // Increased from 800 to 1000
    const margin = { top: 60, right: 120, bottom: 60, left: 150 }; // Increased margins

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
    // And create alternating edge lengths for better spacing
    treeData_positioned.descendants().forEach((node, index) => {
      if (node.depth === 1) { // Category nodes (first level after root)
        node.y = node.y * 0.4; // Reduce horizontal distance by 60%
      } else if (node.depth === 2) { // Leaf nodes (concepts, patterns, etc.)
        // Create alternating edge lengths based on parent's position
        const parentIndex = node.parent?.data.id === 'fundamentals' ? 0 :
                           node.parent?.data.id === 'architecture' ? 1 :
                           node.parent?.data.id === 'implementation' ? 2 :
                           node.parent?.data.id === 'core-patterns' ? 3 :
                           node.parent?.data.id === 'workflow-patterns' ? 4 :
                           node.parent?.data.id === 'multi-agent-patterns' ? 5 :
                           node.parent?.data.id === 'azure-services' ? 6 : 7;
        
        // Alternate between shorter (0.5) and longer (0.8) edge lengths
        const edgeMultiplier = parentIndex % 2 === 0 ? 0.5 : 0.8;
        node.y = node.y * edgeMultiplier;
      }
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
      .attr('r', d => d.data.type === 'root' ? 12 : d.data.type === 'category' ? 8 : 6)
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
      overflow: 'hidden',
      border: '1px solid hsl(var(--border))',
      borderRadius: '8px',
      padding: '16px',
      height: 'fit-content',
      minHeight: '600px'
    }}>
      <svg ref={svgRef} style={{ width: '100%', height: '1000px', minWidth: '1200px' }} />
    </div>
  );
}
