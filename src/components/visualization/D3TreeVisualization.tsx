import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Gear as Cog, 
  CloudArrowUp, 
  Target,
  Book,
  HardDrives,
  CodeBlock,
  PlayCircle,
  ShieldCheck,
  CheckCircle,
  Buildings,
  Lightbulb,
  MagnifyingGlass,
  Gear,
  Plus,
  Minus,
  ArrowsOut,
  ArrowsIn
} from '@phosphor-icons/react';

// Types for our tree structure
interface TreeNode {
  id: string;
  name: string;
  type: 'root' | 'category' | 'concept' | 'pattern' | 'service' | 'quiz' | 'tab' | 'group';
  description?: string;
  icon?: React.ReactNode;
  progress?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime?: number;
  prerequisites?: string[];
  children?: TreeNode[];
  collapsed?: boolean; // Add collapsible state
  metadata?: {
    totalQuestions?: number;
    completedQuestions?: number;
    tier?: number;
    subCategory?: string;
    businessUseCase?: string;
    securityLevel?: string;
    codeExamples?: number;
    count?: number; // For showing item counts in collapsed state
  };
}

// Tab structure for detailed content
interface TabStructure {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  type: 'guide' | 'design' | 'implementation' | 'code' | 'visualizer' | 'interactive' | 'algorithm' | 'security' | 'practices' | 'business';
}

// Standard tab structure for all nodes
const standardTabs: TabStructure[] = [
  { id: 'general', title: 'General Guide', icon: <Book className="w-4 h-4" />, description: 'Overview and conceptual understanding', type: 'guide' },
  { id: 'system-design', title: 'System Design', icon: <HardDrives className="w-4 h-4" />, description: '7-step architectural pattern', type: 'design' },
  { id: 'implementation', title: 'Implementation Steps', icon: <Gear className="w-4 h-4" />, description: 'Step-by-step implementation guide', type: 'implementation' },
  { id: 'code', title: 'Complete Code', icon: <CodeBlock className="w-4 h-4" />, description: 'Full implementation examples', type: 'code' },
  { id: 'visualizer', title: 'Code Visualizer', icon: <MagnifyingGlass className="w-4 h-4" />, description: 'Interactive code execution flow', type: 'visualizer' },
  { id: 'interactive', title: 'Interactive Example', icon: <PlayCircle className="w-4 h-4" />, description: 'Hands-on demonstration', type: 'interactive' },
  { id: 'algorithm', title: 'Algorithm Steps', icon: <Target className="w-4 h-4" />, description: 'Detailed algorithmic breakdown', type: 'algorithm' },
  { id: 'security', title: 'Security Controls', icon: <ShieldCheck className="w-4 h-4" />, description: 'Security considerations and controls', type: 'security' },
  { id: 'practices', title: 'Best Practices', icon: <CheckCircle className="w-4 h-4" />, description: 'Optimization and best practices', type: 'practices' },
  { id: 'business', title: 'Business Use Cases', icon: <Buildings className="w-4 h-4" />, description: 'Real-world applications', type: 'business' }
];

interface D3TreeVisualizationProps {
  data: TreeNode;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [selectedTab, setSelectedTab] = useState('general');
  const [hoveredNode, setHoveredNode] = useState<TreeNode | null>(null);
  const [zoomState, setZoomState] = useState({ scale: 1, x: 0, y: 0 });
  const [collapsedNodes, setCollapsedNodes] = useState<Set<string>>(new Set([
    // Start with sub-groups collapsed but main categories expanded for better UX
    'tier1-concepts', 'tier2-concepts', 'tier3-concepts', 'tier4-concepts',
    'core-patterns', 'workflow-patterns', 'multi-agent-patterns', 'optimization-patterns'
  ]));
  const zoomBehaviorRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  // Generate comprehensive tree data structure
  const treeData = useMemo(() => {
    return generateComprehensiveTreeData(collapsedNodes);
  }, [collapsedNodes]);

  // D3 tree layout setup with improved spacing
  const tree = useMemo(() => {
    return d3.tree<TreeNode>()
      .size([dimensions.height - 100, dimensions.width - 200])
      .separation((a, b) => {
        // Dynamic separation based on node type and depth
        const baseSpace = a.parent === b.parent ? 1.2 : 2.5; // Increased base spacing
        const depthMultiplier = Math.max(1, 5 - (a.depth || 0)); // More space at higher levels
        const typeMultiplier = a.data.type === 'tab' ? 0.4 : 
                              a.data.type === 'group' ? 1.0 :
                              a.data.type === 'concept' || a.data.type === 'pattern' ? 0.8 : 1.2;
        return baseSpace * depthMultiplier * typeMultiplier;
      });
  }, [dimensions]);

  // Toggle node collapse state
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

  // Create hierarchy and layout
  const root = useMemo(() => {
    const hierarchy = d3.hierarchy(treeData);
    return tree(hierarchy);
  }, [tree, treeData]);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({
          width: Math.max(clientWidth, 1200),
          height: Math.max(clientHeight, 800)
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // D3 rendering
  useEffect(() => {
    if (!svgRef.current || !root) return;

    const svg = d3.select(svgRef.current);
    const g = svg.select('g.tree-group');

    // Clear previous render
    g.selectAll('*').remove();

    // Create links (edges)
    const link = g.selectAll('.link')
      .data(root.links())
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal<any, any>()
        .x(d => d.y + 100)
        .y(d => d.x + 50)
      )
      .style('fill', 'none')
      .style('stroke', '#6366f1')
      .style('stroke-width', d => d.target.data.type === 'tab' ? 0.5 : 1.5)
      .style('stroke-opacity', 0.6)
      .style('stroke-dasharray', d => d.target.data.type === 'tab' ? '3,3' : 'none');

    // Create nodes
    const node = g.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y + 100},${d.x + 50})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        // Handle expand/collapse for nodes with children (including collapsed nodes)
        if (['category', 'group'].includes(d.data.type)) {
          event.stopPropagation();
          toggleNodeCollapse(d.data.id);
        }
        // Allow clicking on patterns, concepts, services, and quizzes for details
        else if (['pattern', 'concept', 'service', 'quiz'].includes(d.data.type)) {
          onNodeSelect?.(d.data);
        }
      })
      .on('mouseenter', (event, d) => {
        setHoveredNode(d.data);
      })
      .on('mouseleave', () => {
        setHoveredNode(null);
      });

    // Add node circles/rectangles with improved sizing
    node.append('rect')
      .attr('x', d => -getNodeWidth(d.data) / 2)
      .attr('y', d => d.data.type === 'concept' || d.data.type === 'pattern' ? -20 : -18)
      .attr('width', d => getNodeWidth(d.data))
      .attr('height', d => d.data.type === 'concept' || d.data.type === 'pattern' ? 40 : 36)
      .attr('rx', 8)
      .style('fill', d => getNodeColor(d.data))
      .style('stroke', d => selectedNode?.id === d.data.id ? '#3b82f6' : 'transparent')
      .style('stroke-width', 2)
      .style('filter', d => hoveredNode?.id === d.data.id ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' : 'none')
      .style('transition', 'all 0.2s ease');

    // Add expand/collapse indicators for parent nodes (both categories and groups)
    node.filter(d => ['category', 'group'].includes(d.data.type))
      .append('circle')
      .attr('cx', d => getNodeWidth(d.data) / 2 - 10)
      .attr('cy', 0)
      .attr('r', 10)
      .style('fill', '#6366f1')
      .style('stroke', 'white')
      .style('stroke-width', 2)
      .style('cursor', 'pointer');

    // Add +/- symbols for expand/collapse (both categories and groups)
    node.filter(d => ['category', 'group'].includes(d.data.type))
      .append('text')
      .attr('x', d => getNodeWidth(d.data) / 2 - 10)
      .attr('y', 0)
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .style('fill', 'white')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .style('cursor', 'pointer')
      .style('pointer-events', 'none')
      .text(d => collapsedNodes.has(d.data.id) ? '+' : '−');

    // Add node labels with improved sizing
    node.append('text')
      .attr('dy', '0.35em')
      .attr('x', 0)
      .style('text-anchor', 'middle')
      .style('fill', d => getTextColor(d.data))
      .style('font-size', d => getFontSize(d.data))
      .style('font-weight', d => d.data.type === 'root' ? 'bold' : 
                               d.data.type === 'category' ? '600' : 
                               d.data.type === 'concept' || d.data.type === 'pattern' ? '500' : 'normal')
      .text(d => {
        let text = truncateText(d.data.name, getMaxTextLength(d.data));
        // Add count for collapsed nodes
        if (collapsedNodes.has(d.data.id) && d.data.metadata?.count) {
          text += ` (${d.data.metadata.count})`;
        }
        return text;
      });

    // Add progress indicators with smaller size
    node.filter(d => d.data.progress !== undefined)
      .append('rect')
      .attr('x', d => -getNodeWidth(d.data) / 2 + 5)
      .attr('y', d => d.data.type === 'concept' || d.data.type === 'pattern' ? 24 : 22)
      .attr('width', d => (d.data.progress || 0) * (getNodeWidth(d.data) - 10) / 100)
      .attr('height', 3)
      .attr('rx', 1.5)
      .style('fill', '#10b981');

    // Add zoom and pan functionality
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        setZoomState({
          scale: event.transform.k,
          x: event.transform.x,
          y: event.transform.y
        });
      });

    svg.call(zoom);
    zoomBehaviorRef.current = zoom;

    // Initial zoom to fit content
    const bounds = (g.node() as SVGGraphicsElement)?.getBBox();
    if (bounds) {
      const fullWidth = dimensions.width;
      const fullHeight = dimensions.height;
      const scale = Math.min(
        fullWidth / bounds.width,
        fullHeight / bounds.height
      ) * 0.8;
      
      svg.call(
        zoom.transform,
        d3.zoomIdentity
          .translate(fullWidth / 2, fullHeight / 2)
          .scale(scale)
          .translate(-bounds.x - bounds.width / 2, -bounds.y - bounds.height / 2)
      );
    }

  }, [root, dimensions, selectedNode, hoveredNode, onNodeSelect]);

  // Zoom control functions
  const handleZoomIn = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current)
        .transition()
        .duration(300)
        .call(zoomBehaviorRef.current.scaleBy, 1.5);
    }
  };

  const handleZoomOut = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current)
        .transition()
        .duration(300)
        .call(zoomBehaviorRef.current.scaleBy, 0.67);
    }
  };

  const handleFitView = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      const svg = d3.select(svgRef.current);
      const g = svg.select('g.tree-group');
      const bounds = (g.node() as SVGGraphicsElement)?.getBBox();
      
      if (bounds) {
        const fullWidth = dimensions.width;
        const fullHeight = dimensions.height;
        const scale = Math.min(
          fullWidth / bounds.width,
          fullHeight / bounds.height
        ) * 0.8;
        
        svg.transition()
          .duration(750)
          .call(
            zoomBehaviorRef.current.transform,
            d3.zoomIdentity
              .translate(fullWidth / 2, fullHeight / 2)
              .scale(scale)
              .translate(-bounds.x - bounds.width / 2, -bounds.y - bounds.height / 2)
          );
      }
    }
  };

  const handleFullScreen = () => {
    // Open in new tab with full screen view
    const url = window.location.origin + '/tree-view?fullscreen=true';
    window.open(url, '_blank');
  };

  return (
    <div className={`w-full h-full flex ${className}`}>
      {/* Tree Visualization */}
      <div 
        ref={containerRef}
        className="flex-1 relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 rounded-lg"
      >
        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
          <button
            onClick={handleZoomIn}
            className="flex items-center justify-center w-10 h-10 bg-background border border-border rounded-lg shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            title="Zoom In"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="flex items-center justify-center w-10 h-10 bg-background border border-border rounded-lg shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            title="Zoom Out"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={handleFitView}
            className="flex items-center justify-center w-10 h-10 bg-background border border-border rounded-lg shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            title="Fit to View"
          >
            <ArrowsIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleFullScreen}
            className="flex items-center justify-center w-10 h-10 bg-background border border-border rounded-lg shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            title="Open in New Tab"
          >
            <ArrowsOut className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom Level Indicator */}
        <div className="absolute top-4 left-4 z-10 bg-background border border-border rounded-lg px-3 py-2 shadow-lg">
          <span className="text-sm text-muted-foreground">
            Zoom: {Math.round(zoomState.scale * 100)}%
          </span>
        </div>

        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <g className="tree-group"></g>
        </svg>

        {/* Floating Node Info */}
        {hoveredNode && (
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border max-w-80 z-10">
            <div className="flex items-center gap-2 mb-2">
              {hoveredNode.icon && <span className="text-lg">{hoveredNode.icon}</span>}
              <h4 className="font-semibold text-sm">{hoveredNode.name}</h4>
            </div>
            {hoveredNode.description && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                {hoveredNode.description}
              </p>
            )}
            <div className="flex flex-wrap gap-1">
              {hoveredNode.difficulty && (
                <Badge variant="outline" className="text-xs">
                  {hoveredNode.difficulty}
                </Badge>
              )}
              {hoveredNode.estimatedTime && (
                <Badge variant="outline" className="text-xs">
                  {hoveredNode.estimatedTime}min
                </Badge>
              )}
              {hoveredNode.metadata?.tier && (
                <Badge variant="outline" className="text-xs">
                  Tier {hoveredNode.metadata.tier}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content Panel */}
      {selectedNode && (
        <div className="w-96 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex flex-col">
          <Card className="flex-1 rounded-none border-0">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                {selectedNode.icon && <span className="text-xl">{selectedNode.icon}</span>}
                <div>
                  <CardTitle className="text-lg">{selectedNode.name}</CardTitle>
                  {selectedNode.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {selectedNode.description}
                    </p>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-auto">
              {selectedNode.type !== 'tab' ? (
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                  <TabsList className="grid grid-cols-2 w-full mb-4 h-auto p-1">
                    {standardTabs.slice(0, 4).map(tab => (
                      <TabsTrigger 
                        key={tab.id} 
                        value={tab.id} 
                        className="flex flex-col items-center gap-1 h-12 text-xs"
                      >
                        {tab.icon}
                        <span>{tab.title}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  <TabsList className="grid grid-cols-3 w-full mb-4 h-auto p-1">
                    {standardTabs.slice(4, 7).map(tab => (
                      <TabsTrigger 
                        key={tab.id} 
                        value={tab.id} 
                        className="flex flex-col items-center gap-1 h-12 text-xs"
                      >
                        {tab.icon}
                        <span className="text-xs">{tab.title}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsList className="grid grid-cols-3 w-full mb-6 h-auto p-1">
                    {standardTabs.slice(7, 10).map(tab => (
                      <TabsTrigger 
                        key={tab.id} 
                        value={tab.id} 
                        className="flex flex-col items-center gap-1 h-12 text-xs"
                      >
                        {tab.icon}
                        <span className="text-xs">{tab.title}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {standardTabs.map(tab => (
                    <TabsContent key={tab.id} value={tab.id} className="space-y-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          {tab.icon}
                          {tab.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {tab.description}
                        </p>
                        <div className="text-sm">
                          {renderTabContent(selectedNode, tab.type)}
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-semibold mb-2">{selectedNode.name} Details</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedNode.description}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// Helper functions
function generateComprehensiveTreeData(collapsedNodes: Set<string> = new Set()): TreeNode {
  // Helper function to filter children based on collapsed state
  const getChildren = (nodeId: string, children: TreeNode[]): TreeNode[] => {
    return collapsedNodes.has(nodeId) ? [] : children;
  };

  return {
    id: 'root',
    name: 'Open Agent School',
    type: 'root',
    description: 'Comprehensive AI Agent Learning Platform',
    icon: <Brain className="w-5 h-5" />,
    children: [
      {
        id: 'core-concepts',
        name: 'Core Concepts',
        type: 'category',
        description: '15 concepts across 4 progressive tiers',
        icon: <Brain className="w-4 h-4" />,
        progress: 75,
        metadata: { count: 15 },
        children: getChildren('core-concepts', [
          {
            id: 'tier1-concepts',
            name: 'Foundation (Tier 1)',
            type: 'group',
            description: 'Essential AI agent fundamentals',
            metadata: { tier: 1, count: 5 },
            children: getChildren('tier1-concepts', [
              {
                id: 'agent-architecture',
                name: 'Agent Architecture',
                type: 'concept',
                description: 'Building blocks and lifecycle',
                difficulty: 'beginner',
                estimatedTime: 25,
                progress: 90,
                metadata: { tier: 1 }
              },
              {
                id: 'agent-security',
                name: 'Security & Trust',
                type: 'concept',
                description: 'Security mechanisms and trust',
                difficulty: 'beginner',
                estimatedTime: 30,
                progress: 85,
                metadata: { tier: 1 }
              },
              {
                id: 'multi-agent-systems',
                name: 'Multi-Agent Systems',
                type: 'concept',
                description: 'Coordination and collaboration',
                difficulty: 'intermediate',
                estimatedTime: 35,
                progress: 60,
                metadata: { tier: 1 }
              },
              {
                id: 'agent-ethics',
                name: 'Ethics & Governance',
                type: 'concept',
                description: 'Ethical principles and compliance',
                difficulty: 'beginner',
                estimatedTime: 30,
                progress: 70,
                metadata: { tier: 1 }
              },
              {
                id: 'ai-agents',
                name: 'AI Agents',
                type: 'concept',
                description: 'Autonomous AI systems',
                difficulty: 'beginner',
                estimatedTime: 20,
                progress: 95,
                metadata: { tier: 1 }
              }
            ])
          },
          {
            id: 'tier2-concepts',
            name: 'Intermediate (Tier 2)',
            type: 'group',
            description: 'Advanced coordination mechanisms',
            metadata: { tier: 2, count: 5 },
            children: getChildren('tier2-concepts', [
              {
                id: 'a2a-communication',
                name: 'A2A Communication',
                type: 'concept',
                description: 'Agent communication protocols',
                difficulty: 'intermediate',
                estimatedTime: 40,
                progress: 65,
                metadata: { tier: 2 }
              },
              {
                id: 'model-context-protocol-concept',
                name: 'Context Protocol',
                type: 'concept',
                description: 'Secure tool integration',
                difficulty: 'intermediate',
                estimatedTime: 35,
                progress: 55,
                metadata: { tier: 2 }
              },
              {
                id: 'agent-reasoning',
                name: 'Agent Reasoning',
                type: 'concept',
                description: 'Decision-making processes',
                difficulty: 'intermediate',
                estimatedTime: 45,
                progress: 60,
                metadata: { tier: 2 }
              },
              {
                id: 'tool-integration',
                name: 'Tool Integration',
                type: 'concept',
                description: 'External tool interaction',
                difficulty: 'intermediate',
                estimatedTime: 35,
                progress: 75,
                metadata: { tier: 2 }
              },
              {
                id: 'memory-systems',
                name: 'Memory Systems',
                type: 'concept',
                description: 'Agent memory architectures',
                difficulty: 'intermediate',
                estimatedTime: 40,
                progress: 50,
                metadata: { tier: 2 }
              }
            ])
          },
          {
            id: 'tier3-concepts',
            name: 'Advanced (Tier 3)',
            type: 'group',
            description: 'Complex system behaviors',
            metadata: { tier: 3, count: 3 },
            children: getChildren('tier3-concepts', [
              {
                id: 'emergent-behavior',
                name: 'Emergent Behavior',
                type: 'concept',
                description: 'Complex system interactions',
                difficulty: 'advanced',
                estimatedTime: 50,
                progress: 40,
                metadata: { tier: 3 }
              },
              {
                id: 'agent-adaptation',
                name: 'Agent Adaptation',
                type: 'concept',
                description: 'Learning and evolution',
                difficulty: 'advanced',
                estimatedTime: 45,
                progress: 35,
                metadata: { tier: 3 }
              },
              {
                id: 'scalability-patterns',
                name: 'Scalability Patterns',
                type: 'concept',
                description: 'Large-scale deployment',
                difficulty: 'advanced',
                estimatedTime: 55,
                progress: 30,
                metadata: { tier: 3 }
              }
            ])
          },
          {
            id: 'tier4-concepts',
            name: 'Expert (Tier 4)',
            type: 'group',
            description: 'Cutting-edge research',
            metadata: { tier: 4, count: 2 },
            children: getChildren('tier4-concepts', [
              {
                id: 'consciousness-modeling',
                name: 'Consciousness Models',
                type: 'concept',
                description: 'Advanced cognitive architectures',
                difficulty: 'advanced',
                estimatedTime: 60,
                progress: 20,
                metadata: { tier: 4 }
              },
              {
                id: 'quantum-agents',
                name: 'Quantum Agents',
                type: 'concept',
                description: 'Quantum computing integration',
                difficulty: 'advanced',
                estimatedTime: 65,
                progress: 15,
                metadata: { tier: 4 }
              }
            ])
          }
        ])
      },
      {
        id: 'agent-patterns',
        name: 'Agent Patterns',
        type: 'category',
        description: '18 comprehensive system design patterns',
        icon: <Cog className="w-4 h-4" />,
        progress: 85,
        metadata: { count: 18 },
        children: getChildren('agent-patterns', [
          {
            id: 'core-patterns',
            name: 'Core Patterns',
            type: 'group',
            description: 'Fundamental agent architectures',
            metadata: { count: 5 },
            children: getChildren('core-patterns', [
              {
                id: 'react-agent',
                name: 'ReAct Agent',
                type: 'pattern',
                description: 'Reasoning and Acting pattern',
                difficulty: 'intermediate',
                estimatedTime: 45,
                progress: 100
              },
              {
                id: 'code-act',
                name: 'Code Act Agent',
                type: 'pattern',
                description: 'Code generation workflows',
                difficulty: 'advanced',
                estimatedTime: 50,
                progress: 80
              },
              {
                id: 'modern-tool-use',
                name: 'Modern Tool Use',
                type: 'pattern',
                description: 'Advanced tool integration',
                difficulty: 'intermediate',
                estimatedTime: 40,
                progress: 75
              },
              {
                id: 'computer-use',
                name: 'Computer Use',
                type: 'pattern',
                description: 'Desktop automation',
                difficulty: 'advanced',
                estimatedTime: 60,
                progress: 70
              },
              {
                id: 'voice-agent',
                name: 'Voice Agent',
                type: 'pattern',
                description: 'Voice-enabled agents',
                difficulty: 'advanced',
                estimatedTime: 55,
                progress: 70
              }
            ])
          },
          {
            id: 'workflow-patterns',
            name: 'Workflow Patterns',
            type: 'group',
            description: 'Advanced workflow orchestration',
            metadata: { count: 5 },
            children: getChildren('workflow-patterns', [
              {
                id: 'agentic-rag',
                name: 'Agentic RAG',
                type: 'pattern',
                description: 'RAG with agent capabilities',
                difficulty: 'advanced',
                estimatedTime: 45,
                progress: 85
              },
              {
                id: 'deep-researcher',
                name: 'Deep Researcher',
                type: 'pattern',
                description: 'Research and analysis agents',
                difficulty: 'advanced',
                estimatedTime: 50,
                progress: 65
              },
              {
                id: 'autonomous-workflow',
                name: 'Autonomous Workflow',
                type: 'pattern',
                description: 'Self-managing orchestration',
                difficulty: 'advanced',
                estimatedTime: 65,
                progress: 60
              },
              {
                id: 'prompt-chaining',
                name: 'Prompt Chaining',
                type: 'pattern',
                description: 'Sequential prompt execution',
                difficulty: 'intermediate',
                estimatedTime: 35,
                progress: 80
              },
              {
                id: 'parallelization',
                name: 'Parallelization',
                type: 'pattern',
                description: 'Concurrent task execution',
                difficulty: 'advanced',
                estimatedTime: 45,
                progress: 70
              }
            ])
          },
          {
            id: 'multi-agent-patterns',
            name: 'Multi-Agent',
            type: 'group',
            description: 'Multi-agent coordination systems',
            metadata: { count: 4 },
            children: getChildren('multi-agent-patterns', [
              {
                id: 'agent-to-agent',
                name: 'Agent to Agent',
                type: 'pattern',
                description: 'Direct communication',
                difficulty: 'advanced',
                estimatedTime: 55,
                progress: 55
              },
              {
                id: 'autogen-multi-agent',
                name: 'AutoGen Multi-Agent',
                type: 'pattern',
                description: 'AutoGen framework systems',
                difficulty: 'advanced',
                estimatedTime: 70,
                progress: 50
              },
              {
                id: 'orchestrator-worker',
                name: 'Orchestrator Worker',
                type: 'pattern',
                description: 'Centralized orchestration',
                difficulty: 'advanced',
                estimatedTime: 50,
                progress: 65
              },
              {
                id: 'routing',
                name: 'Routing',
                type: 'pattern',
                description: 'Intelligent request routing',
                difficulty: 'intermediate',
                estimatedTime: 35,
                progress: 75
              }
            ])
          },
          {
            id: 'optimization-patterns',
            name: 'Optimization',
            type: 'group',
            description: 'Evaluation and optimization',
            metadata: { count: 4 },
            children: getChildren('optimization-patterns', [
              {
                id: 'agent-evaluation',
                name: 'Agent Evaluation',
                type: 'pattern',
                description: 'Performance assessment',
                difficulty: 'intermediate',
                estimatedTime: 40,
                progress: 85
              },
              {
                id: 'evaluator-optimizer',
                name: 'Evaluator Optimizer',
                type: 'pattern',
                description: 'Automated optimization',
                difficulty: 'advanced',
                estimatedTime: 60,
                progress: 45
              },
              {
                id: 'self-reflection',
                name: 'Self Reflection',
                type: 'pattern',
                description: 'Introspective agents',
                difficulty: 'advanced',
                estimatedTime: 55,
                progress: 50
              },
              {
                id: 'model-context-protocol',
                name: 'Context Protocol',
                type: 'pattern',
                description: 'Context sharing protocol',
                difficulty: 'advanced',
                estimatedTime: 45,
                progress: 60
              }
            ])
          }
        ])
      },
      {
        id: 'azure-services',
        name: 'Azure Services',
        type: 'category',
        description: 'Enterprise Azure AI integration patterns',
        icon: <CloudArrowUp className="w-4 h-4" />,
        progress: 65,
        children: [
          {
            id: 'azure-openai',
            name: 'Azure OpenAI',
            type: 'service',
            description: 'Large language model integration',
            difficulty: 'intermediate',
            estimatedTime: 30,
            progress: 85
          },
          {
            id: 'azure-cognitive-services',
            name: 'Cognitive Services',
            type: 'service',
            description: 'Vision, speech, and language services',
            difficulty: 'intermediate',
            estimatedTime: 25,
            progress: 75
          },
          {
            id: 'azure-ml',
            name: 'Azure ML',
            type: 'service',
            description: 'Machine learning model deployment',
            difficulty: 'advanced',
            estimatedTime: 40,
            progress: 60
          },
          {
            id: 'azure-bot-service',
            name: 'Bot Service',
            type: 'service',
            description: 'Conversational AI platform',
            difficulty: 'intermediate',
            estimatedTime: 30,
            progress: 70
          }
        ]
      },
      {
        id: 'knowledge-quiz',
        name: 'Knowledge Quiz',
        type: 'category',
        description: '15+ categories with role-based assessments',
        icon: <Target className="w-4 h-4" />,
        progress: 45,
        metadata: { totalQuestions: 100 },
        children: [
          {
            id: 'system-design-quiz',
            name: 'System Design Quiz',
            type: 'quiz',
            description: '15 questions across beginner/intermediate/advanced',
            difficulty: 'intermediate',
            estimatedTime: 25,
            progress: 60,
            metadata: { totalQuestions: 15, completedQuestions: 9 }
          },
          {
            id: 'agent-fundamentals-quiz',
            name: 'Agent Fundamentals Quiz',
            type: 'quiz',
            description: '12 questions on core agent concepts',
            difficulty: 'beginner',
            estimatedTime: 20,
            progress: 80,
            metadata: { totalQuestions: 12, completedQuestions: 10 }
          },
          {
            id: 'multi-agent-quiz',
            name: 'Multi-Agent Systems Quiz',
            type: 'quiz',
            description: '18 questions on collaboration patterns',
            difficulty: 'advanced',
            estimatedTime: 30,
            progress: 40,
            metadata: { totalQuestions: 18, completedQuestions: 7 }
          },
          {
            id: 'security-quiz',
            name: 'Security & Ethics Quiz',
            type: 'quiz',
            description: '10 questions on agent security',
            difficulty: 'intermediate',
            estimatedTime: 15,
            progress: 50,
            metadata: { totalQuestions: 10, completedQuestions: 5 }
          }
        ]
      }
    ]
  };
}

function getNodeColor(node: TreeNode): string {
  const colors = {
    root: 'url(#nodeGradient)',
    category: '#e0e7ff',
    group: '#f3e8ff',
    concept: '#dbeafe', 
    pattern: '#fef3c7',
    service: '#dcfce7',
    quiz: '#fce7f3',
    tab: '#f8fafc'
  };
  return colors[node.type] || '#f3f4f6';
}

function getTextColor(node: TreeNode): string {
  // Darker text colors for better readability
  const colors = {
    root: '#0f172a',      // Slate-900
    category: '#1e3a8a',  // Blue-800
    group: '#6b21a8',     // Purple-700
    concept: '#1e3a8a',   // Blue-800
    pattern: '#92400e',   // Amber-700
    service: '#14532d',   // Green-800
    quiz: '#9d174d',      // Pink-800
    tab: '#1f2937'        // Gray-800
  };
  return colors[node.type] || '#1f2937';
}

function getTextStroke(node: TreeNode): string {
  // Light stroke colors for contrast
  const strokeColors = {
    root: '#ffffff',
    category: '#ffffff',
    group: '#ffffff',
    concept: '#ffffff',
    pattern: '#ffffff',
    service: '#ffffff',
    quiz: '#ffffff',
    tab: '#ffffff'
  };
  return strokeColors[node.type] || '#ffffff';
}

function getNodeWidth(node: TreeNode): number {
  const widths = {
    root: 220,
    category: 180,
    group: 180,
    concept: 180, // Increased from 130
    pattern: 180, // Increased from 130
    service: 180, // Increased from 120
    quiz: 180,    // Increased from 120
    tab: 110
  };
  return widths[node.type] || 110;
}

function getFontSize(node: TreeNode): string {
  const sizes = {
    root: '15px',
    category: '14px',
    group: '13px',
    concept: '13px', // Increased from 11px
    pattern: '13px', // Increased from 11px
    service: '13px', // Increased from 11px
    quiz: '13px',    // Increased from 11px
    tab: '10px'
  };
  return sizes[node.type] || '12px';
}

function getMaxTextLength(node: TreeNode): number {
  const lengths = {
    root: 26,
    category: 22,
    group: 20,
    concept: 18, // Increased from 16
    pattern: 18, // Increased from 16
    service: 16, // Increased from 14
    quiz: 16,    // Increased from 14
    tab: 12
  };
  return lengths[node.type] || 14;
}

function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
}

function renderTabContent(node: TreeNode, tabType: string): React.ReactNode {
  const content = {
    guide: "Comprehensive overview and conceptual understanding of this topic. Includes fundamental principles, key concepts, and practical applications.",
    design: "7-step architectural pattern with system design thinking. Covers component architecture, data flows, and design considerations.",
    implementation: "Step-by-step implementation guide with detailed instructions, code examples, and best practices for building production systems.",
    code: "Complete implementation examples in Python and TypeScript with full source code, documentation, and usage examples.",
    visualizer: "Interactive code execution flow visualization showing step-by-step execution, variable tracking, and decision points.",
    interactive: "Hands-on demonstration with interactive controls, real-time feedback, and practical experimentation capabilities.",
    algorithm: "Detailed algorithmic breakdown showing decision-making processes, optimization strategies, and computational complexity.",
    security: "Security considerations, threat modeling, compliance guidelines, and enterprise security patterns for production deployment.",
    practices: "Optimization techniques, performance tuning, scalability patterns, and industry best practices for maximum effectiveness.",
    business: "Real-world applications, business value propositions, ROI analysis, and enterprise use cases with implementation strategies."
  };

  return (
    <div className="space-y-3">
      <p className="text-gray-700 dark:text-gray-300">
        {content[tabType as keyof typeof content]}
      </p>
      
      {node.metadata && (
        <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded border-l-4 border-blue-400">
          <div className="text-sm space-y-1">
            {node.metadata.tier && (
              <div><strong>Tier:</strong> {node.metadata.tier}</div>
            )}
            {node.metadata.totalQuestions && (
              <div><strong>Questions:</strong> {node.metadata.totalQuestions}</div>
            )}
            {node.estimatedTime && (
              <div><strong>Time:</strong> {node.estimatedTime} minutes</div>
            )}
            {node.difficulty && (
              <div><strong>Difficulty:</strong> {node.difficulty}</div>
            )}
          </div>
        </div>
      )}
      
      <Button className="w-full" size="sm">
        Explore {node.name}
      </Button>
    </div>
  );
}
