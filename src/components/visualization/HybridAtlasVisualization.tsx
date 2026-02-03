import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ZoomIn, ZoomOut, Home, Maximize2, List, Target } from 'lucide-react';

// Types
interface AtlasNode {
  id: string;
  name: string;
  type: 'root' | 'category' | 'concept' | 'pattern' | 'service' | 'quiz';
  children?: AtlasNode[];
  novel?: boolean;
  value?: number;
  path?: string; // navigation path
}

interface HybridAtlasProps {
  onNodeSelect?: (node: AtlasNode) => void;
  className?: string;
}

// Color palette for categories
const CATEGORY_COLORS: Record<string, string> = {
  'tier-0': '#3b82f6',           // Blue - Prompting Fundamentals
  'fundamentals': '#8b5cf6',     // Purple - Foundational
  'architecture': '#06b6d4',     // Cyan - Communication
  'implementation': '#10b981',   // Emerald - Integration
  'enterprise': '#f59e0b',       // Amber - Enterprise
  'applied': '#ef4444',          // Red - Applied
  'production-foundations': '#ec4899', // Pink - Production
  'core-patterns': '#6366f1',    // Indigo - Core Patterns
  'workflow-patterns': '#14b8a6', // Teal - Workflow
  'multi-agent-patterns': '#f97316', // Orange - Multi-Agent
  '2026-patterns': '#a855f7',    // Violet - 2026 Patterns
  'azure-services': '#0ea5e9',   // Sky - Azure
  'study-mode': '#84cc16',       // Lime - Study
  'evaluations': '#22c55e',      // Green - Evaluations
  'educational-patterns': '#eab308', // Yellow - Educational
  'operating-model': '#64748b',  // Slate - Operating
};

// Build the complete taxonomy data
function buildAtlasData(): AtlasNode {
  return {
    id: 'root',
    name: 'Open Agent School',
    type: 'root',
    children: [
      {
        id: 'tier-0',
        name: 'Prompting Fundamentals',
        type: 'category',
        children: [
          { id: 'agentic-ai-design-taxonomy', name: 'Agentic AI Design Taxonomy', type: 'concept', path: '/concepts/agentic-ai-design-taxonomy' },
          { id: 'agentic-prompting-fundamentals', name: 'Agentic Prompting', type: 'concept', novel: true, path: '/concepts/agentic-prompting-fundamentals' },
          { id: 'prompt-optimization-patterns', name: 'Prompt Optimization', type: 'concept', novel: true, path: '/concepts/prompt-optimization-patterns' },
          { id: 'agent-instruction-design', name: 'Instruction Design', type: 'concept', novel: true, path: '/concepts/agent-instruction-design' },
          { id: 'agentic-workflow-control', name: 'Workflow Control', type: 'concept', novel: true, path: '/concepts/agentic-workflow-control' },
          { id: 'agent-evaluation-methodologies', name: 'Evaluation Methods', type: 'concept', novel: true, path: '/concepts/agent-evaluation-methodologies' },
        ]
      },
      {
        id: 'fundamentals',
        name: 'Foundational Concepts',
        type: 'category',
        children: [
          { id: 'agent-architecture', name: 'Agent Architecture', type: 'concept', path: '/concepts/agent-architecture' },
          { id: 'agent-security', name: 'Security & Trust', type: 'concept', path: '/concepts/agent-security' },
          { id: 'multi-agent-systems', name: 'Multi-Agent Systems', type: 'concept', path: '/concepts/multi-agent-systems' },
          { id: 'agent-ethics', name: 'Ethics & Governance', type: 'concept', path: '/concepts/agent-ethics' },
          { id: 'ai-agents', name: 'AI Agents', type: 'concept', path: '/concepts/ai-agents' },
          { id: 'ai-safety-governance', name: 'AI Safety', type: 'concept', path: '/concepts/ai-safety-governance' },
          { id: 'program-setup-north-star', name: 'Program North Star', type: 'concept', novel: true, path: '/concepts/program-setup-north-star' },
          { id: 'responsible-ai-governance', name: 'Responsible AI', type: 'concept', novel: true, path: '/concepts/responsible-ai-governance' },
          { id: 'ai-product-framework', name: 'Product Framework', type: 'concept', novel: true, path: '/concepts/ai-product-framework' },
        ]
      },
      {
        id: 'architecture',
        name: 'Protocols & Communication',
        type: 'category',
        children: [
          { id: 'a2a-communication', name: 'A2A Communication', type: 'concept', path: '/concepts/a2a-communication' },
          { id: 'mcp', name: 'Model Context Protocol', type: 'concept', path: '/concepts/mcp' },
          { id: 'client-coding-agents', name: 'Coding Agents', type: 'concept', novel: true, path: '/concepts/client-coding-agents' },
          { id: 'agent-skills', name: 'Agent Skills', type: 'concept', novel: true, path: '/concepts/agent-skills' },
          { id: 'flow-visualization', name: 'Flow Visualization', type: 'concept', path: '/concepts/flow-visualization' },
          { id: 'agent-evaluation', name: 'Agent Evaluation', type: 'concept', path: '/concepts/agent-evaluation' },
          { id: 'strategy-portfolio-management', name: 'Strategy & Portfolio', type: 'concept', novel: true, path: '/concepts/strategy-portfolio-management' },
        ]
      },
      {
        id: 'implementation',
        name: 'Advanced Integration',
        type: 'category',
        children: [
          { id: 'acp', name: 'Agent Communication Protocol', type: 'concept', path: '/concepts/acp' },
          { id: 'mcp-a2a-integration', name: 'MCP × A2A Integration', type: 'concept', path: '/concepts/mcp-a2a-integration' },
          { id: 'data-visualization', name: 'MCP Apps & Agent UI', type: 'concept', novel: true, path: '/concepts/data-visualization' },
          { id: 'data-knowledge-operations', name: 'Knowledge Operations', type: 'concept', novel: true, path: '/concepts/data-knowledge-operations' },
          { id: 'fine-tuning', name: 'Fine-Tuning (SFT/DPO/RFT)', type: 'concept', novel: true, path: '/concepts/fine-tuning' },
          { id: 'agent-red-teaming', name: 'Red Teaming', type: 'concept', novel: true, path: '/concepts/agent-red-teaming' },
          { id: 'agentic-robotics-integration', name: 'Robotics Integration', type: 'concept', novel: true, path: '/concepts/agentic-robotics-integration' },
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise Operations',
        type: 'category',
        children: [
          { id: 'agent-deployment', name: 'Deployment & Ops', type: 'concept', path: '/concepts/agent-deployment' },
          { id: 'agent-learning', name: 'Learning & Adaptation', type: 'concept', path: '/concepts/agent-learning' },
          { id: 'agent-integration', name: 'Integration Patterns', type: 'concept', path: '/concepts/agent-integration' },
          { id: 'agentic-commerce-ap2', name: 'Commerce: UCP & AP2', type: 'concept', novel: true, path: '/concepts/agentic-commerce-ap2' },
          { id: 'architecture-platform-operations', name: 'Platform Operations', type: 'concept', novel: true, path: '/concepts/architecture-platform-operations' },
          { id: 'experimentation-continuous-improvement', name: 'Experimentation', type: 'concept', novel: true, path: '/concepts/experimentation-continuous-improvement' },
          { id: 'ecosystem-partnerships', name: 'Ecosystem & Partners', type: 'concept', novel: true, path: '/concepts/ecosystem-partnerships' },
          { id: 'organizational-enablement', name: 'Org Enablement', type: 'concept', novel: true, path: '/concepts/organizational-enablement' },
        ]
      },
      {
        id: 'production-foundations',
        name: 'Production Foundations',
        type: 'category',
        children: [
          { id: 'agent-reasoning-patterns', name: 'Reasoning Patterns', type: 'concept', novel: true, path: '/concepts/agent-reasoning-patterns' },
          { id: 'agent-memory-systems', name: 'Memory Systems', type: 'concept', novel: true, path: '/concepts/agent-memory-systems' },
          { id: 'agent-observability', name: 'Observability', type: 'concept', novel: true, path: '/concepts/agent-observability' },
          { id: 'agent-testing-benchmarks', name: 'Testing & Benchmarks', type: 'concept', novel: true, path: '/concepts/agent-testing-benchmarks' },
          { id: 'prompt-injection-defense', name: 'Injection Defense', type: 'concept', novel: true, path: '/concepts/prompt-injection-defense' },
          { id: 'human-in-the-loop-patterns', name: 'Human-in-the-Loop', type: 'concept', novel: true, path: '/concepts/human-in-the-loop-patterns' },
          { id: 'agent-cost-optimization', name: 'Cost Optimization', type: 'concept', novel: true, path: '/concepts/agent-cost-optimization' },
        ]
      },
      {
        id: 'applied',
        name: 'Applied & Career',
        type: 'category',
        children: [
          { id: 'agent-troubleshooting', name: 'Troubleshooting', type: 'concept', novel: true, path: '/concepts/agent-troubleshooting' },
          { id: 'agent-economics', name: 'Agent Economics', type: 'concept', novel: true, path: '/concepts/agent-economics' },
          { id: 'agent-career-paths', name: 'Career Paths', type: 'concept', novel: true, path: '/concepts/agent-career-paths' },
          { id: 'industry-agents', name: 'Industry Agents', type: 'concept', novel: true, path: '/concepts/industry-agents' },
          { id: 'agent-templates-hub', name: 'Templates Hub', type: 'concept', novel: true, path: '/concepts/agent-templates-hub' },
          { id: 'quantum-ai-robotics', name: 'Quantum AI Robotics', type: 'concept', novel: true, path: '/concepts/quantum-ai-robotics' },
          { id: 'edge-agent', name: 'Edge Agent', type: 'concept', novel: true, path: '/concepts/edge-agent' },
        ]
      },
      {
        id: 'core-patterns',
        name: 'Core Patterns',
        type: 'category',
        children: [
          { id: 'react-agent', name: 'ReAct Agent', type: 'pattern', path: '/patterns/react-agent' },
          { id: 'code-act', name: 'CodeAct Agent', type: 'pattern', novel: true, path: '/patterns/code-act' },
          { id: 'modern-tool-use', name: 'Modern Tool Use', type: 'pattern', novel: true, path: '/patterns/modern-tool-use' },
          { id: 'computer-use', name: 'Computer Use', type: 'pattern', novel: true, path: '/patterns/computer-use' },
          { id: 'voice-agent', name: 'Voice Agent', type: 'pattern', novel: true, path: '/patterns/voice-agent' },
          { id: 'self-reflection', name: 'Self-Reflection', type: 'pattern', novel: true, path: '/patterns/self-reflection' },
        ]
      },
      {
        id: 'workflow-patterns',
        name: 'Workflow Patterns',
        type: 'category',
        children: [
          { id: 'agentic-rag', name: 'Agentic RAG', type: 'pattern', path: '/patterns/agentic-rag' },
          { id: 'deep-researcher', name: 'Deep Researcher', type: 'pattern', novel: true, path: '/patterns/deep-researcher' },
          { id: 'autonomous-workflow', name: 'Autonomous Workflow', type: 'pattern', novel: true, path: '/patterns/autonomous-workflow' },
          { id: 'prompt-chaining', name: 'Prompt Chaining', type: 'pattern', path: '/patterns/prompt-chaining' },
          { id: 'parallelization', name: 'Parallelization', type: 'pattern', novel: true, path: '/patterns/parallelization' },
        ]
      },
      {
        id: 'multi-agent-patterns',
        name: 'Multi-Agent Patterns',
        type: 'category',
        children: [
          { id: 'orchestrator-worker', name: 'Orchestrator Worker', type: 'pattern', path: '/patterns/orchestrator-worker' },
          { id: 'routing', name: 'Routing', type: 'pattern', path: '/patterns/routing' },
          { id: 'agent-to-agent', name: 'Agent to Agent', type: 'pattern', novel: true, path: '/patterns/agent-to-agent' },
          { id: 'autogen', name: 'AutoGen', type: 'pattern', novel: true, path: '/patterns/autogen' },
          { id: 'deep-agents', name: 'Deep Agents', type: 'pattern', novel: true, path: '/patterns/deep-agents' },
          { id: 'swarm-intelligence', name: 'Swarm Intelligence', type: 'pattern', novel: true, path: '/patterns/swarm-intelligence' },
        ]
      },
      {
        id: '2026-patterns',
        name: '2026 Agent Patterns',
        type: 'category',
        children: [
          { id: 'skill-augmented-agent', name: 'Skill-Augmented', type: 'pattern', novel: true, path: '/patterns/skill-augmented-agent' },
          { id: 'mcp-server-orchestration', name: 'MCP Orchestration', type: 'pattern', novel: true, path: '/patterns/mcp-server-orchestration' },
          { id: 'multi-llm-routing', name: 'Multi-LLM Routing', type: 'pattern', novel: true, path: '/patterns/multi-llm-routing' },
          { id: 'agentic-ide', name: 'Agentic IDE', type: 'pattern', novel: true, path: '/patterns/agentic-ide' },
          { id: 'guardrails-layer', name: 'Guardrails Layer', type: 'pattern', novel: true, path: '/patterns/guardrails-layer' },
        ]
      },
      {
        id: 'robotics-patterns',
        name: 'Robotics Patterns',
        type: 'category',
        children: [
          { id: 'mobile-manipulator-steward', name: 'Mobile Manipulator', type: 'pattern', novel: true, path: '/patterns/mobile-manipulator-steward' },
          { id: 'adaptive-lab-technician', name: 'Lab Technician', type: 'pattern', novel: true, path: '/patterns/adaptive-lab-technician' },
          { id: 'inventory-guardian', name: 'Inventory Guardian', type: 'pattern', novel: true, path: '/patterns/inventory-guardian' },
          { id: 'emergency-response-mate', name: 'Emergency Response', type: 'pattern', novel: true, path: '/patterns/emergency-response-mate' },
        ]
      },
      {
        id: 'educational-patterns',
        name: 'Educational Patterns',
        type: 'category',
        children: [
          { id: 'socratic-coach', name: 'Socratic Coach', type: 'pattern', novel: true, path: '/patterns/socratic-coach' },
          { id: 'concept-to-project-builder', name: 'Project Builder', type: 'pattern', novel: true, path: '/patterns/concept-to-project-builder' },
          { id: 'error-whisperer', name: 'Error Whisperer', type: 'pattern', novel: true, path: '/patterns/error-whisperer' },
          { id: 'knowledge-map-navigator', name: 'Knowledge Navigator', type: 'pattern', novel: true, path: '/patterns/knowledge-map-navigator' },
          { id: 'rubric-rater', name: 'Rubric Rater', type: 'pattern', novel: true, path: '/patterns/rubric-rater' },
        ]
      },
      {
        id: 'azure-services',
        name: 'Azure AI Services',
        type: 'category',
        children: [
          { id: 'azure-openai', name: 'Azure OpenAI', type: 'service', path: '/azure-services/azure-openai' },
          { id: 'azure-cognitive-services', name: 'Cognitive Services', type: 'service', path: '/azure-services/cognitive-services' },
          { id: 'azure-ml', name: 'Azure ML', type: 'service', path: '/azure-services/azure-ml' },
          { id: 'azure-bot-service', name: 'Bot Service', type: 'service', novel: true, path: '/azure-services/bot-service' },
        ]
      },
      {
        id: 'study-mode',
        name: 'Study Mode',
        type: 'category',
        children: [
          { id: 'socratic-discovery', name: 'Socratic Discovery', type: 'quiz', path: '/study-mode?type=socratic' },
          { id: 'interactive-scenarios', name: 'Interactive Scenarios', type: 'quiz', path: '/study-mode?type=scenario' },
          { id: 'debug-challenges', name: 'Debug Challenges', type: 'quiz', path: '/study-mode?type=debug' },
          { id: 'super-critical-learning', name: 'Critical Learning', type: 'quiz', novel: true, path: '/study-mode?type=scl' },
        ]
      },
      {
        id: 'evaluations',
        name: 'Quizzes & Assessments',
        type: 'category',
        children: [
          { id: 'system-design-quiz', name: 'System Design', type: 'quiz', path: '/quiz?category=system-design' },
          { id: 'agent-fundamentals-quiz', name: 'Agent Fundamentals', type: 'quiz', path: '/quiz?category=fundamentals' },
          { id: 'security-quiz', name: 'Security & Ethics', type: 'quiz', path: '/quiz?category=security' },
          { id: 'multi-agent-quiz', name: 'Multi-Agent Systems', type: 'quiz', path: '/quiz?category=multi-agent' },
        ]
      },
    ]
  };
}

// Count all nodes recursively
function countNodes(node: AtlasNode): number {
  let count = 1;
  if (node.children) {
    for (const child of node.children) {
      count += countNodes(child);
    }
  }
  return count;
}

// Sunburst visualization component
function SunburstView({ 
  data, 
  onCategorySelect, 
  onNodeClick,
  selectedCategory 
}: { 
  data: AtlasNode; 
  onCategorySelect: (category: AtlasNode | null) => void;
  onNodeClick: (node: AtlasNode) => void;
  selectedCategory: AtlasNode | null;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<AtlasNode | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 800 });

  // Responsive sizing
  useEffect(() => {
    const updateDimensions = () => {
      const container = svgRef.current?.parentElement;
      if (container) {
        const size = Math.min(container.clientWidth, 800);
        setDimensions({ width: size, height: size });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { width, height } = dimensions;
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.min(width, height) / 2 - 40;

  // Build sunburst arcs
  const arcs = useMemo(() => {
    const result: Array<{
      node: AtlasNode;
      startAngle: number;
      endAngle: number;
      innerRadius: number;
      outerRadius: number;
      color: string;
      depth: number;
    }> = [];

    const categories = data.children || [];
    const totalCategories = categories.length;
    const anglePerCategory = (2 * Math.PI) / totalCategories;

    categories.forEach((category, catIndex) => {
      const catStartAngle = catIndex * anglePerCategory - Math.PI / 2;
      const catEndAngle = (catIndex + 1) * anglePerCategory - Math.PI / 2;
      const catColor = CATEGORY_COLORS[category.id] || '#6b7280';

      // Category ring (depth 1)
      result.push({
        node: category,
        startAngle: catStartAngle,
        endAngle: catEndAngle,
        innerRadius: maxRadius * 0.25,
        outerRadius: maxRadius * 0.5,
        color: catColor,
        depth: 1,
      });

      // Children ring (depth 2)
      const children = category.children || [];
      if (children.length > 0) {
        const anglePerChild = (catEndAngle - catStartAngle) / children.length;
        children.forEach((child, childIndex) => {
          result.push({
            node: child,
            startAngle: catStartAngle + childIndex * anglePerChild,
            endAngle: catStartAngle + (childIndex + 1) * anglePerChild,
            innerRadius: maxRadius * 0.52,
            outerRadius: maxRadius * 0.85,
            color: catColor,
            depth: 2,
          });
        });
      }
    });

    return result;
  }, [data, maxRadius]);

  // Generate SVG arc path
  const arcPath = useCallback((
    startAngle: number,
    endAngle: number,
    innerRadius: number,
    outerRadius: number
  ) => {
    const startX1 = centerX + innerRadius * Math.cos(startAngle);
    const startY1 = centerY + innerRadius * Math.sin(startAngle);
    const endX1 = centerX + innerRadius * Math.cos(endAngle);
    const endY1 = centerY + innerRadius * Math.sin(endAngle);
    const startX2 = centerX + outerRadius * Math.cos(startAngle);
    const startY2 = centerY + outerRadius * Math.sin(startAngle);
    const endX2 = centerX + outerRadius * Math.cos(endAngle);
    const endY2 = centerY + outerRadius * Math.sin(endAngle);

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

    return `
      M ${startX2} ${startY2}
      A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${endX2} ${endY2}
      L ${endX1} ${endY1}
      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${startX1} ${startY1}
      Z
    `;
  }, [centerX, centerY]);

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="mx-auto"
        style={{ maxWidth: '100%' }}
      >
        {/* Background */}
        <circle
          cx={centerX}
          cy={centerY}
          r={maxRadius}
          fill="transparent"
          className="dark:fill-gray-900/30"
        />

        {/* Center circle with logo/title */}
        <circle
          cx={centerX}
          cy={centerY}
          r={maxRadius * 0.22}
          className="fill-indigo-600 dark:fill-indigo-500"
        />
        <text
          x={centerX}
          y={centerY - 8}
          textAnchor="middle"
          className="fill-white font-bold text-sm"
        >
          Open Agent
        </text>
        <text
          x={centerX}
          y={centerY + 10}
          textAnchor="middle"
          className="fill-white font-bold text-sm"
        >
          School
        </text>
        <text
          x={centerX}
          y={centerY + 28}
          textAnchor="middle"
          className="fill-indigo-200 text-xs"
        >
          {countNodes(data)} items
        </text>

        {/* Arcs */}
        {arcs.map((arc, index) => {
          const isHovered = hoveredNode?.id === arc.node.id;
          const isSelected = selectedCategory?.id === arc.node.id;
          const isCategoryOfSelected = selectedCategory?.id === arc.node.id || 
            (arc.depth === 2 && selectedCategory?.children?.some(c => c.id === arc.node.id));
          
          const opacity = arc.depth === 1 ? 1 : 0.7;
          const hoverOpacity = isHovered ? 1 : opacity;
          
          return (
            <g key={`${arc.node.id}-${index}`}>
              <path
                d={arcPath(arc.startAngle, arc.endAngle, arc.innerRadius, arc.outerRadius)}
                fill={arc.color}
                opacity={hoverOpacity}
                stroke={isHovered || isSelected ? '#fff' : 'rgba(255,255,255,0.3)'}
                strokeWidth={isHovered || isSelected ? 2 : 0.5}
                className="cursor-pointer transition-all duration-200"
                style={{
                  filter: isHovered ? 'brightness(1.2)' : undefined,
                  transform: isHovered ? `scale(1.02)` : undefined,
                  transformOrigin: `${centerX}px ${centerY}px`,
                }}
                onMouseEnter={() => setHoveredNode(arc.node)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => {
                  if (arc.depth === 1) {
                    onCategorySelect(arc.node);
                  } else if (arc.node.path) {
                    onNodeClick(arc.node);
                  }
                }}
              />
              {/* Novel indicator */}
              {arc.node.novel && arc.depth === 2 && (
                <circle
                  cx={centerX + (arc.innerRadius + arc.outerRadius) / 2 * Math.cos((arc.startAngle + arc.endAngle) / 2)}
                  cy={centerY + (arc.innerRadius + arc.outerRadius) / 2 * Math.sin((arc.startAngle + arc.endAngle) / 2)}
                  r={4}
                  className="fill-yellow-400 stroke-white"
                  strokeWidth={1}
                />
              )}
            </g>
          );
        })}

        {/* Category labels */}
        {arcs.filter(a => a.depth === 1).map((arc, index) => {
          const midAngle = (arc.startAngle + arc.endAngle) / 2;
          const labelRadius = (arc.innerRadius + arc.outerRadius) / 2;
          const x = centerX + labelRadius * Math.cos(midAngle);
          const y = centerY + labelRadius * Math.sin(midAngle);
          const rotation = (midAngle * 180 / Math.PI) + (midAngle > Math.PI / 2 && midAngle < 3 * Math.PI / 2 ? 180 : 0);
          
          return (
            <text
              key={`label-${arc.node.id}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white font-medium text-[10px] pointer-events-none select-none"
              transform={`rotate(${rotation}, ${x}, ${y})`}
            >
              {arc.node.name.length > 18 ? arc.node.name.substring(0, 16) + '…' : arc.node.name}
            </text>
          );
        })}
      </svg>

      {/* Hover tooltip */}
      {hoveredNode && (
        <div className="absolute top-4 left-4 bg-gray-900/95 dark:bg-gray-800/95 text-white px-4 py-3 rounded-lg shadow-xl max-w-xs z-10 border border-gray-700">
          <div className="font-semibold text-sm">{hoveredNode.name}</div>
          <div className="text-xs text-gray-300 mt-1 capitalize">
            {hoveredNode.type}
            {hoveredNode.novel && <span className="ml-2 text-yellow-400">★ New 2026</span>}
          </div>
          {hoveredNode.children && (
            <div className="text-xs text-gray-400 mt-1">
              {hoveredNode.children.length} items • Click to explore
            </div>
          )}
          {hoveredNode.path && !hoveredNode.children && (
            <div className="text-xs text-indigo-400 mt-1">
              Click to open
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
          <span className="text-gray-600 dark:text-gray-400">New in 2026</span>
        </span>
        <span className="text-gray-400 dark:text-gray-500">•</span>
        <span className="text-gray-600 dark:text-gray-400">Click category to drill down</span>
      </div>
    </div>
  );
}

// Focused Tree View for a single category
function FocusedTreeView({
  category,
  onBack,
  onNodeClick,
}: {
  category: AtlasNode;
  onBack: () => void;
  onNodeClick: (node: AtlasNode) => void;
}) {
  const color = CATEGORY_COLORS[category.id] || '#6b7280';
  const children = category.children || [];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Back to overview"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: color }}
        />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {category.name}
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {children.length} items
        </span>
      </div>

      {/* Tree visualization */}
      <div className="relative pl-8">
        {/* Vertical line */}
        <div
          className="absolute left-4 top-0 bottom-0 w-0.5"
          style={{ backgroundColor: color }}
        />

        {/* Nodes */}
        <div className="space-y-2">
          {children.map((child, index) => (
            <div
              key={child.id}
              className="relative flex items-center gap-3 group"
            >
              {/* Horizontal connector */}
              <div
                className="absolute left-[-16px] w-4 h-0.5"
                style={{ backgroundColor: color }}
              />
              
              {/* Node */}
              <button
                onClick={() => onNodeClick(child)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left
                  bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                  hover:border-indigo-400 dark:hover:border-indigo-500
                  hover:shadow-md transition-all duration-200
                  group-hover:translate-x-1
                `}
              >
                {/* Type icon */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: color }}
                >
                  {child.type === 'concept' ? 'C' : child.type === 'pattern' ? 'P' : child.type === 'service' ? 'S' : 'Q'}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-white truncate">
                    {child.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {child.type}
                  </div>
                </div>

                {child.novel && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full">
                    2026
                  </span>
                )}

                <Target className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Hybrid Component
export default function HybridAtlasVisualization({ onNodeSelect, className = '' }: HybridAtlasProps) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<AtlasNode | null>(null);
  const [viewMode, setViewMode] = useState<'sunburst' | 'list'>('sunburst');
  
  const atlasData = useMemo(() => buildAtlasData(), []);

  const handleNodeClick = useCallback((node: AtlasNode) => {
    if (node.path) {
      navigate(node.path);
    }
    onNodeSelect?.(node);
  }, [navigate, onNodeSelect]);

  const handleCategorySelect = useCallback((category: AtlasNode | null) => {
    setSelectedCategory(category);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  // Stats
  const stats = useMemo(() => {
    const categories = atlasData.children || [];
    let concepts = 0, patterns = 0, services = 0, quizzes = 0, novel = 0;
    
    function countTypes(node: AtlasNode) {
      if (node.type === 'concept') concepts++;
      if (node.type === 'pattern') patterns++;
      if (node.type === 'service') services++;
      if (node.type === 'quiz') quizzes++;
      if (node.novel) novel++;
      node.children?.forEach(countTypes);
    }
    
    categories.forEach(countTypes);
    
    return { categories: categories.length, concepts, patterns, services, quizzes, novel, total: countNodes(atlasData) };
  }, [atlasData]);

  return (
    <div className={`w-full ${className}`}>
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {selectedCategory && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Home className="w-4 h-4" />
              Overview
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('sunburst')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'sunburst' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            aria-label="Sunburst view"
          >
            <Target className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3 py-2 text-center">
          <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.categories}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Categories</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3 py-2 text-center">
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{stats.concepts}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Concepts</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3 py-2 text-center">
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{stats.patterns}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Patterns</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3 py-2 text-center">
          <div className="text-lg font-bold text-cyan-600 dark:text-cyan-400">{stats.services}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Services</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3 py-2 text-center">
          <div className="text-lg font-bold text-green-600 dark:text-green-400">{stats.quizzes}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Assessments</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg px-3 py-2 text-center">
          <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{stats.novel}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">New 2026</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        {selectedCategory ? (
          <FocusedTreeView
            category={selectedCategory}
            onBack={handleBack}
            onNodeClick={handleNodeClick}
          />
        ) : viewMode === 'sunburst' ? (
          <SunburstView
            data={atlasData}
            onCategorySelect={handleCategorySelect}
            onNodeClick={handleNodeClick}
            selectedCategory={selectedCategory}
          />
        ) : (
          /* List View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {atlasData.children?.map(category => {
              const color = CATEGORY_COLORS[category.id] || '#6b7280';
              const childCount = category.children?.length || 0;
              const novelCount = category.children?.filter(c => c.novel).length || 0;
              
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg transition-all duration-200 text-left group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: color }}
                    >
                      {childCount}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {category.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {childCount} items
                        {novelCount > 0 && (
                          <span className="ml-2 text-yellow-600 dark:text-yellow-400">
                            • {novelCount} new
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
