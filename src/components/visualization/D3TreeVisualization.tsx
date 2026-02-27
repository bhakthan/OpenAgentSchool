import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react';
// Dynamic heavy libs (d3, jspdf) loaded on-demand for smaller initial bundle
let d3Lib: typeof import('d3') | null = null;
let jsPDFCtor: typeof import('jspdf').jsPDF | null = null;

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
  const rootGroupRef = useRef<SVGGElement | null>(null);
  const dimsRef = useRef<{width:number; height:number; margin:{top:number;right:number;bottom:number;left:number}}>({width:1000,height:1100,margin:{top:60,right:120,bottom:60,left:120}});
  const [transparentBg, setTransparentBg] = useState(false);
  const [fitToContent, setFitToContent] = useState(true);
  
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
  name: 'openagentschool.org',
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
            { id: 'agent-evaluation-methodologies', name: 'Agent Evaluation Methodologies', type: 'concept' as const, novel: true },
            // Fine-Tuning moved to Advanced Integration (Tier 3)
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
            { id: 'ai-safety-governance', name: 'AI Safety & Governance', type: 'concept' as const },
            { id: 'atomic-llm-training', name: 'Atomic LLM Training (microGPT)', type: 'concept' as const, novel: true },
            { id: 'program-setup-north-star', name: 'Program Setup & North Star', type: 'concept' as const, novel: true },
            { id: 'responsible-ai-governance', name: 'Responsible AI Governance Playbooks', type: 'concept' as const, novel: true },
            { id: 'ai-product-framework', name: 'AI Product Framework (8 Pillars)', type: 'concept' as const, novel: true }
          ]
        },
        {
          id: 'architecture',
          name: 'Communication & Protocols (Tier 2)',
          type: 'category' as const,
          children: collapsedNodes.has('architecture') ? [] : [
            { id: 'a2a-communication', name: 'A2A Communication', type: 'concept' as const },
            { id: 'mcp', name: 'Model Context Protocol', type: 'concept' as const },
            { id: 'client-coding-agents', name: 'Client Coding Agents', type: 'concept' as const, novel: true },
            { id: 'agent-skills', name: 'Agent Skills', type: 'concept' as const, novel: true },
            { id: 'ai-ready-data', name: 'AI-Ready Data', type: 'concept' as const, novel: true },
            { id: 'context-engineering', name: 'Context Engineering', type: 'concept' as const, novel: true },
            { id: 'flow-visualization', name: 'Flow Visualization', type: 'concept' as const },
            { id: 'agent-evaluation', name: 'Agent Evaluation', type: 'concept' as const },
            { id: 'a2a-communication-patterns', name: 'A2A Communication Patterns', type: 'concept' as const, novel: true },
            { id: 'strategy-portfolio-management', name: 'Strategy & Portfolio Management', type: 'concept' as const, novel: true }
          ]
        },
        {
          id: 'implementation',
          name: 'Advanced Integration (Tier 3)',
          type: 'category' as const,
          children: collapsedNodes.has('implementation') ? [] : [
            { id: 'acp', name: 'Agent Communication Protocol', type: 'concept' as const },
            { id: 'mcp-a2a-integration', name: 'MCP × A2A Integration', type: 'concept' as const },
            { id: 'data-visualization', name: 'Data Visualization', type: 'concept' as const },
            { id: 'agentic-robotics-integration', name: 'Agentic Robotics Integration', type: 'concept' as const, novel: true },
            { id: 'fine-tuning', name: 'Fine-Tuning Methods (SFT, DPO, RFT)', type: 'concept' as const, novel: true },
            { id: 'agent-red-teaming', name: 'Agent Red Teaming', type: 'concept' as const, novel: true },
            { id: 'data-knowledge-operations', name: 'Data & Knowledge Operations', type: 'concept' as const, novel: true },
            { id: 'xyz-claw', name: 'XYZ-Claw: Multi-Agent Orchestration', type: 'concept' as const, novel: true }
          ]
        },
        {
          id: 'enterprise',
          name: 'Enterprise Operations (Tier 4)',
          type: 'category' as const,
          children: collapsedNodes.has('enterprise') ? [] : [
            { id: 'agent-deployment', name: 'Agent Deployment & Operations', type: 'concept' as const },
            { id: 'agent-learning', name: 'Agent Learning & Adaptation', type: 'concept' as const },
            { id: 'agent-integration', name: 'Agent Integration Patterns', type: 'concept' as const },
            { id: 'agentic-commerce-ap2', name: 'Agentic Commerce: UCP & AP2', type: 'concept' as const, novel: true },
            { id: 'architecture-platform-operations', name: 'Architecture & Platform Operations', type: 'concept' as const, novel: true },
            { id: 'experimentation-continuous-improvement', name: 'Experimentation & Continuous Improvement', type: 'concept' as const, novel: true },
            { id: 'ecosystem-partnerships', name: 'Ecosystem & Partnerships', type: 'concept' as const, novel: true },
            { id: 'tri-system-paradigm', name: 'Tri-System Paradigm (Cognitive Ecology)', type: 'concept' as const, novel: true },
            { id: 'proactive-agent-design', name: 'Proactive Agent Design', type: 'concept' as const, novel: true }
          ]
        },
        {
          id: 'applied',
          name: 'Applied & Career (Tier 5)',
          type: 'category' as const,
          children: collapsedNodes.has('applied') ? [] : [
            { id: 'agent-troubleshooting', name: 'Agent Troubleshooting Playbook', type: 'concept' as const, novel: true },
            { id: 'agent-economics', name: 'Agent Economics', type: 'concept' as const, novel: true },
            { id: 'agent-career-paths', name: 'Agent Career Paths', type: 'concept' as const, novel: true },
            { id: 'industry-agents', name: 'Industry-Specific Agents', type: 'concept' as const, novel: true },
            { id: 'agent-templates-hub', name: 'Agent Templates Hub', type: 'concept' as const, novel: true }
          ]
        },
        {
          id: 'production-foundations',
          name: 'Production Foundations',
          type: 'category' as const,
          children: collapsedNodes.has('production-foundations') ? [] : [
            { id: 'agent-reasoning-patterns', name: 'Agent Reasoning Patterns', type: 'concept' as const, novel: true },
            { id: 'agent-memory-systems', name: 'Agent Memory Systems', type: 'concept' as const, novel: true },
            { id: 'agent-observability', name: 'Agent Observability', type: 'concept' as const, novel: true },
            { id: 'agent-testing-benchmarks', name: 'Agent Testing & Benchmarks', type: 'concept' as const, novel: true },
            { id: 'prompt-injection-defense', name: 'Prompt Injection Defense', type: 'concept' as const, novel: true },
            { id: 'human-in-the-loop-patterns', name: 'Human-in-the-Loop Patterns', type: 'concept' as const, novel: true },
            { id: 'agent-cost-optimization', name: 'Agent Cost Optimization', type: 'concept' as const, novel: true }
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
            { id: 'parallelization', name: 'Parallelization', type: 'pattern' as const, novel: true },
            { id: 'mobile-manipulator-steward', name: 'Mobile Manipulator Steward', type: 'pattern' as const, novel: true }
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
            { id: 'swarm-intelligence', name: 'Swarm Intelligence', type: 'pattern' as const, novel: true },
            { id: 'mobile-manipulator-steward', name: 'Mobile Manipulator Steward', type: 'pattern' as const, novel: true },
            { id: 'adaptive-lab-technician', name: 'Adaptive Lab Technician', type: 'pattern' as const, novel: true },
            { id: 'inventory-guardian', name: 'Inventory Guardian', type: 'pattern' as const, novel: true },
            { id: 'emergency-response-mate', name: 'Emergency Response Mate', type: 'pattern' as const, novel: true }
          ]
        },
        {
          id: '2026-patterns',
          name: '2026 Agent Patterns',
          type: 'category' as const,
          children: collapsedNodes.has('2026-patterns') ? [] : [
            { id: 'skill-augmented-agent', name: 'Skill-Augmented Agent', type: 'pattern' as const, novel: true },
            { id: 'mcp-server-orchestration', name: 'MCP Server Orchestration', type: 'pattern' as const, novel: true },
            { id: 'multi-llm-routing', name: 'Multi-LLM Routing', type: 'pattern' as const, novel: true },
            { id: 'agentic-ide', name: 'Agentic IDE', type: 'pattern' as const, novel: true },
            { id: 'guardrails-layer', name: 'Guardrails Layer', type: 'pattern' as const, novel: true },
            { id: 'ignition-stack', name: 'IgnitionStack Agent', type: 'pattern' as const, novel: true }
          ]
        },
        {
          id: 'azure-services',
          name: 'Azure AI Services',
          type: 'category' as const,
          children: collapsedNodes.has('azure-services') ? [] : [
            { id: 'azure-openai', name: 'Azure OpenAI', type: 'service' as const },
            { id: 'microsoft-agent-framework', name: 'Agent Framework', type: 'service' as const, novel: true },
            { id: 'azure-ai-foundry', name: 'Microsoft Foundry', type: 'service' as const },
            { id: 'azure-ai-agent-service', name: 'Foundry Agent Service', type: 'service' as const, novel: true }
          ]
        },
        {
          id: 'study-mode',
          name: 'Study Mode',
          type: 'category' as const,
          children: collapsedNodes.has('study-mode') ? [] : [
            { id: 'study-socratic-thinking', name: 'Socratic Discovery', type: 'quiz' as const },
            { id: 'study-interactive-scenarios', name: 'Interactive Scenarios', type: 'quiz' as const },
            { id: 'study-debug-challenges', name: 'Debug Challenges', type: 'quiz' as const },
            { id: 'study-super-critical-learning', name: 'Super Critical Learning', type: 'quiz' as const, novel: true },
            { id: 'study-human-adoption', name: 'Human-Centric Adoption', type: 'quiz' as const, novel: true }
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
            { id: 'security-quiz', name: 'Security & Ethics Quiz', type: 'quiz' as const },
            { id: 'agentic-robotics-quiz', name: 'Agentic Robotics Quiz', type: 'quiz' as const, novel: true }
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
        },
        {
          id: 'operating-model',
          name: 'Operating Model & Leadership',
          type: 'category' as const,
          children: collapsedNodes.has('operating-model') ? [] : [
            { id: 'organizational-enablement', name: 'Organizational Enablement', type: 'concept' as const, novel: true }
          ]
        },
        {
          id: 'hands-on-practice',
          name: 'Hands-On Practice (Login Required)',
          type: 'category' as const,
          children: collapsedNodes.has('hands-on-practice') ? [] : [
            { id: 'phase1-lab', name: 'Phase 1 Lab', type: 'quiz' as const, novel: true },
            { id: 'learner-analytics', name: 'Learner Analytics', type: 'quiz' as const, novel: true },
            { id: 'project-tracks', name: 'Project Tracks', type: 'concept' as const, novel: true },
            { id: 'pair-programming-studio', name: 'Pair Programming Studio', type: 'concept' as const, novel: true },
            { id: 'skill-passport', name: 'Skill Passport & Certificates', type: 'concept' as const, novel: true },
            { id: 'cohorts', name: 'Team Cohorts', type: 'concept' as const, novel: true },
            { id: 'safety-lab', name: 'Agent Safety Lab', type: 'concept' as const, novel: true },
            { id: 'multi-agent-sandbox', name: 'Multi-Agent Sandbox', type: 'concept' as const, novel: true }
          ]
        }
      ]
    };
  }, [collapsedNodes]);

  // Helper functions for styling with fallback colors for dark/light mode
  const getNodeFill = (node: TreeNode): string => {
    const colors = {
      root: '#3b82f600',    // Transparent for root (remove blue background behind colorful logo)
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
    if (node.type === 'root') return 18; // larger root to host logo
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
    let cancelled = false;
    (async () => {
      if (!d3Lib) {
        const t0 = performance.now();
        d3Lib = await import('d3');
        const t1 = performance.now();
        try { window.dispatchEvent(new CustomEvent('analytics:chunkLoad', { detail: { source: 'd3', ms: +(t1 - t0).toFixed(2) } })); } catch {}
      }
      if (cancelled || !d3Lib) return;
      const d3 = d3Lib;
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

    // Set up dimensions - optimized for three-tier edge lengths while staying within screen bounds
  const width = 1000;  // Slightly reduced width to improve centering
  const height = 1100; // Keep increased height for the new branch
  const margin = { top: 60, right: 120, bottom: 60, left: 120 }; // Reduced left margin for balance
    dimsRef.current = { width, height, margin };

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
  const root = d3.hierarchy(treeData as any);
    const treeData_positioned = treeLayout(root);

    // Manually adjust positions to reduce spacing from root to categories
    // And create three different edge lengths for better visual hierarchy
  treeData_positioned.descendants().forEach((node, index) => {
      if (node.depth === 1) { // Category nodes (first level after root)
        node.y = node.y * 0.55; // Slightly more horizontal distance to clarify root -> first level flow
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
  const leftShift = 40; // smaller shift for more central layout
  node.y = Math.max(0, node.y - leftShift);
    });

    // Create main group
  const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  rootGroupRef.current = g.node() as SVGGElement;

    // Create links (paths between nodes)
  g.selectAll('.link')
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
      .style('fill', d => d.data.type === 'root' ? 'transparent' : getNodeFill(d.data))
      .style('stroke', d => d.data.type === 'root' ? 'none' : getNodeStroke(d.data))
      .style('stroke-width', d => d.data.type === 'root' ? 0 : (d.data.novel ? 3 : 2));

    // Color ladder logo (uses public/favicon.svg) for root
    const rootNode = node.filter(d => d.data.id === 'root');
    rootNode.append('image')
      .attr('class','root-ladder-img')
      .attr('href','/favicon.svg')
      .attr('width', d => getNodeRadius(d.data) * 2.2)
      .attr('height', d => getNodeRadius(d.data) * 2.2)
      .attr('x', d => -getNodeRadius(d.data) * 1.1)
      .attr('y', d => -getNodeRadius(d.data) * 1.1)
      .attr('preserveAspectRatio','xMidYMid meet')
      .style('pointer-events','none');

    // Add text labels
    node.append('text')
      .attr('dy', d => d.data.id === 'root' ? undefined : '0.35em')
      .attr('x', d => d.data.id === 'root' ? 0 : (d.children ? -15 : 15))
      .attr('y', d => d.data.id === 'root' ? -(getNodeRadius(d.data) + 12) : 0)
      .style('text-anchor', d => d.data.id === 'root' ? 'middle' : (d.children ? 'end' : 'start'))
      .style('fill', getTextColor())
      .style('font-size', d => d.data.type === 'root' ? '14px' : d.data.type === 'category' ? '14px' : '12px')
      .style('font-weight', d => d.data.type === 'root' ? '600' : d.data.type === 'category' ? '600' : 'normal')
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

    })();
    return () => { cancelled = true; };
  }, [treeData, collapsedNodes, onNodeSelect, selectedNode]);

  // Export SVG
  const computeContentBox = () => {
    if (!rootGroupRef.current) return null;
    try { return rootGroupRef.current.getBBox(); } catch { return null; }
  };

  const handleExportSVG = useCallback(() => {
    if (!svgRef.current || !rootGroupRef.current) return;
    const { width, height } = dimsRef.current;
    const orig = svgRef.current;
    const clone = orig.cloneNode(true) as SVGSVGElement;
    let vbX = 0, vbY = 0, vbW = width, vbH = height;
    if (fitToContent) {
      const bbox = computeContentBox();
      if (bbox && bbox.width && bbox.height) {
        const pad = 24;
        vbX = bbox.x - pad;
        vbY = bbox.y - pad;
        vbW = bbox.width + pad * 2;
        vbH = bbox.height + pad * 2;
      }
    }
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('viewBox', `${vbX} ${vbY} ${vbW} ${vbH}`);
    clone.setAttribute('width', String(vbW));
    clone.setAttribute('height', String(vbH));
    if (transparentBg) {
      clone.style.background = 'none';
    } else {
      clone.style.background = isDarkMode() ? '#1f2937' : '#ffffff';
    }
    const styleEl = document.createElement('style');
    styleEl.textContent = `text{font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif}`;
    clone.insertBefore(styleEl, clone.firstChild);
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(clone);
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `open-agent-learning-tree.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(()=> URL.revokeObjectURL(url), 1000);
    try { window.dispatchEvent(new CustomEvent('analytics:export', { detail: { component: 'D3TreeVisualization', format: 'svg' } })); } catch {}
  }, []);

  // Export PNG
  const handleExportPNG = useCallback((scale: number = 2) => {
    if (!svgRef.current) return;
    const { width, height } = dimsRef.current;
    const serializer = new XMLSerializer();
    const clone = svgRef.current.cloneNode(true) as SVGSVGElement;
    let vbX = 0, vbY = 0, vbW = width, vbH = height;
    if (fitToContent) {
      const bbox = computeContentBox();
      if (bbox && bbox.width && bbox.height) {
        const pad = 24;
        vbX = bbox.x - pad;
        vbY = bbox.y - pad;
        vbW = bbox.width + pad * 2;
        vbH = bbox.height + pad * 2;
      }
    }
    clone.setAttribute('viewBox', `${vbX} ${vbY} ${vbW} ${vbH}`);
    clone.setAttribute('width', String(vbW));
    clone.setAttribute('height', String(vbH));
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    const svgStr = serializer.serializeToString(clone);
    const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = vbW * scale;
      canvas.height = vbH * scale;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (!transparentBg) {
          ctx.fillStyle = isDarkMode() ? '#1f2937' : '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(blob => {
          if (blob) {
            const pngUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = pngUrl;
            a.download = 'open-agent-learning-tree.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(()=> URL.revokeObjectURL(pngUrl), 1000);
          }
        }, 'image/png');
      }
      URL.revokeObjectURL(url);
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
    try { window.dispatchEvent(new CustomEvent('analytics:export', { detail: { component: 'D3TreeVisualization', format: `png-${scale}x` } })); } catch {}
  }, []);

  const handleExportPDF = useCallback(() => {
    (async () => {
      if (!svgRef.current) return;
      if (!jsPDFCtor) {
        const t0 = performance.now();
        const mod = await import('jspdf');
        jsPDFCtor = mod.jsPDF;
        const t1 = performance.now();
        try { window.dispatchEvent(new CustomEvent('analytics:chunkLoad', { detail: { source: 'jspdf', ms: +(t1 - t0).toFixed(2) } })); } catch {}
      }
      const { width, height } = dimsRef.current;
      const serializer = new XMLSerializer();
      const clone = svgRef.current.cloneNode(true) as SVGSVGElement;
      let vbX = 0, vbY = 0, vbW = width, vbH = height;
      if (fitToContent) {
        const bbox = computeContentBox();
        if (bbox && bbox.width && bbox.height) {
          const pad = 24;
          vbX = bbox.x - pad; vbY = bbox.y - pad; vbW = bbox.width + pad * 2; vbH = bbox.height + pad * 2;
        }
      }
      clone.setAttribute('viewBox', `${vbX} ${vbY} ${vbW} ${vbH}`);
      clone.setAttribute('width', String(vbW));
      clone.setAttribute('height', String(vbH));
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      const svgStr = serializer.serializeToString(clone);
      const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
      img.onload = () => {
        const orientation = vbW >= vbH ? 'l' : 'p';
        const pdf = new jsPDFCtor!({ orientation, unit: 'pt', format: 'a4' });
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();
        
        // Add branding header
        pdf.setFontSize(18);
        pdf.setTextColor(59, 130, 246); // Blue
        pdf.setFont('helvetica', 'bold');
        pdf.text('Open Agent School', pageW / 2, 30, { align: 'center' });
        
        pdf.setFontSize(10);
        pdf.setTextColor(107, 114, 128); // Gray
        pdf.setFont('helvetica', 'italic');
        pdf.text('openagentschool.org', pageW / 2, 45, { align: 'center' });
        
        pdf.setFontSize(12);
        pdf.setTextColor(31, 41, 55); // Dark gray
        pdf.setFont('helvetica', 'normal');
        pdf.text('Learning Atlas', pageW / 2, 62, { align: 'center' });
        
        // Adjust y position for image to account for header
        const headerHeight = 80;
        const availableHeight = pageH - headerHeight - 20;
        const scale = Math.min(pageW / vbW, availableHeight / vbH);
        const drawW = vbW * scale;
        const drawH = vbH * scale;
        const x = (pageW - drawW) / 2;
        const y = headerHeight + (availableHeight - drawH) / 2;
        
        const canvas = document.createElement('canvas');
        canvas.width = vbW; canvas.height = vbH;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          if (!transparentBg) {
            ctx.fillStyle = isDarkMode() ? '#1f2937' : '#ffffff';
            ctx.fillRect(0,0,canvas.width,canvas.height);
          }
          ctx.drawImage(img, 0, 0, vbW, vbH);
          const dataUrl = canvas.toDataURL('image/png');
          pdf.addImage(dataUrl, 'PNG', x, y, drawW, drawH);
          
          // Add footer
          pdf.setFontSize(8);
          pdf.setTextColor(156, 163, 175); // Light gray
          pdf.setFont('helvetica', 'italic');
          pdf.text(`Generated on ${new Date().toLocaleDateString()}`, pageW / 2, pageH - 15, { align: 'center' });
          
          pdf.save('open-agent-school-learning-atlas.pdf');
          try { window.dispatchEvent(new CustomEvent('analytics:export', { detail: { component: 'D3TreeVisualization', format: 'pdf' } })); } catch {}
        }
        URL.revokeObjectURL(url);
      };
      img.onerror = () => URL.revokeObjectURL(url);
      img.src = url;
    })();
  }, [fitToContent, transparentBg]);

  return (
    <div className={`w-full h-full ${className}`} style={{ 
      overflowX: 'auto',
      overflowY: 'auto',
      border: '1px solid hsl(var(--border))',
      borderRadius: isDarkMode() ? '10px' : '0px',
      padding: '20px 24px',
      height: 'fit-content',
      minHeight: '600px',
      maxWidth: '100%',
      margin: '0 auto',
      background: isDarkMode() ? 'rgba(31,41,55,0.55)' : 'transparent'
    }}>
      <div className="no-print flex flex-wrap gap-2 mb-4 justify-end text-[11px]">
  <button onClick={()=>{handleExportSVG(); try { window.dispatchEvent(new CustomEvent('analytics:export', { detail: { component: 'D3TreeVisualization', format: 'svg' } })); } catch {} }} className="px-3 py-1.5 rounded-md bg-indigo-600 !text-white hover:bg-indigo-700 transition-colors shadow-sm">SVG</button>
  <button onClick={()=>{handleExportPNG(2); try { window.dispatchEvent(new CustomEvent('analytics:export', { detail: { component: 'D3TreeVisualization', format: 'png-2x' } })); } catch {} }} className="px-3 py-1.5 rounded-md bg-emerald-600 !text-white hover:bg-emerald-700 transition-colors shadow-sm">PNG 2x</button>
  <button onClick={()=>{handleExportPNG(3); try { window.dispatchEvent(new CustomEvent('analytics:export', { detail: { component: 'D3TreeVisualization', format: 'png-3x' } })); } catch {} }} className="px-3 py-1.5 rounded-md bg-emerald-700 !text-white hover:bg-emerald-800 transition-colors shadow-sm">PNG 3x</button>
  <button onClick={handleExportPDF} className="px-3 py-1.5 rounded-md bg-rose-600 !text-white hover:bg-rose-700 transition-colors shadow-sm">PDF</button>
        <label className="flex items-center gap-1 px-2 py-1.5 rounded border text-gray-700 dark:text-gray-200 bg-white/60 dark:bg-gray-800/40">
          <input type="checkbox" checked={transparentBg} onChange={e => setTransparentBg(e.target.checked)} />
          <span>Transparent</span>
        </label>
        <label className="flex items-center gap-1 px-2 py-1.5 rounded border text-gray-700 dark:text-gray-200 bg-white/60 dark:bg-gray-800/40">
          <input type="checkbox" checked={fitToContent} onChange={e => setFitToContent(e.target.checked)} />
          <span>Fit Content</span>
        </label>
      </div>
      <svg ref={svgRef} style={{ width: '100%', height: '1100px', maxWidth: '1000px', display: 'block', margin: '0 auto' }} />
    </div>
  );
}
