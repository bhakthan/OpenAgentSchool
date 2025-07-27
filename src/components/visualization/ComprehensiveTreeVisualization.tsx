import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import D3TreeVisualization from '@/components/visualization/D3TreeVisualization';
import { 
  Brain, 
  Gear as Cog, 
  CloudArrowUp, 
  Target,
  Tree,
  MagnifyingGlassPlus,
  ChartLineUp,
  Lightbulb
} from '@phosphor-icons/react';
import { systemDesignPatterns } from '@/lib/data/systemDesign';
import { quizCategories } from '@/lib/data/quizzes';

// Types
interface TreeNode {
  id: string;
  name: string;
  type: 'root' | 'category' | 'concept' | 'pattern' | 'service' | 'quiz' | 'tab';
  description?: string;
  icon?: React.ReactNode;
  progress?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime?: number;
  prerequisites?: string[];
  children?: TreeNode[];
  metadata?: {
    totalQuestions?: number;
    completedQuestions?: number;
    tier?: number;
    subCategory?: string;
    businessUseCase?: string;
    securityLevel?: string;
    codeExamples?: number;
  };
}

// Core concepts data structure
const coreConceptsData = [
  {
    id: 'agent-architecture',
    name: 'Agent Architecture & Lifecycle',
    description: 'Fundamental building blocks and lifecycle of AI agents',
    tier: 1,
    difficulty: 'beginner' as const,
    estimatedTime: 25
  },
  {
    id: 'agent-security',
    name: 'Agent Security & Trust',
    description: 'Security mechanisms and trust models for AI agent systems',
    tier: 1,
    difficulty: 'beginner' as const,
    estimatedTime: 30
  },
  {
    id: 'multi-agent-systems',
    name: 'Multi-Agent Systems',
    description: 'Coordination, collaboration, and emergent behavior in multi-agent systems',
    tier: 1,
    difficulty: 'intermediate' as const,
    estimatedTime: 35
  },
  {
    id: 'agent-ethics',
    name: 'Agent Ethics & Governance',
    description: 'Ethical principles, bias mitigation, and regulatory compliance',
    tier: 1,
    difficulty: 'beginner' as const,
    estimatedTime: 30
  },
  {
    id: 'ai-agents',
    name: 'AI Agents',
    description: 'Learn about autonomous AI systems that can perceive, decide, and act',
    tier: 1,
    difficulty: 'beginner' as const,
    estimatedTime: 20
  },
  // Tier 2
  {
    id: 'a2a-communication',
    name: 'A2A Communication',
    description: 'How AI agents communicate and coordinate with each other',
    tier: 2,
    difficulty: 'intermediate' as const,
    estimatedTime: 40
  },
  {
    id: 'model-context-protocol',
    name: 'Model Context Protocol',
    description: 'Secure tool integration protocol for AI agents',
    tier: 2,
    difficulty: 'intermediate' as const,
    estimatedTime: 35
  },
  {
    id: 'flow-visualization',
    name: 'Flow Visualization',
    description: 'Interactive visualization of agent flows and interactions',
    tier: 2,
    difficulty: 'intermediate' as const,
    estimatedTime: 25
  },
  // Tier 3
  {
    id: 'agent-communication-protocol',
    name: 'Agent Communication Protocol',
    description: 'Advanced protocols for enterprise-scale agent coordination',
    tier: 3,
    difficulty: 'advanced' as const,
    estimatedTime: 45
  },
  {
    id: 'mcp-a2a-integration',
    name: 'MCP × A2A Integration',
    description: 'Integrate Model Context Protocol with Agent-to-Agent communication',
    tier: 3,
    difficulty: 'advanced' as const,
    estimatedTime: 50
  },
  {
    id: 'data-visualization',
    name: 'Data Visualization',
    description: 'Advanced data visualization techniques for AI agent systems',
    tier: 3,
    difficulty: 'intermediate' as const,
    estimatedTime: 30
  },
  // Tier 4
  {
    id: 'agent-deployment',
    name: 'Agent Deployment & Operations',
    description: 'Containerization, monitoring, scaling, and DevOps for AI agents',
    tier: 4,
    difficulty: 'advanced' as const,
    estimatedTime: 60
  },
  {
    id: 'agent-learning',
    name: 'Agent Learning & Adaptation',
    description: 'Reinforcement learning, online learning, transfer learning, and meta-learning',
    tier: 4,
    difficulty: 'advanced' as const,
    estimatedTime: 55
  },
  {
    id: 'agent-integration',
    name: 'Agent Integration Patterns',
    description: 'API integration, event-driven architecture, microservices, and legacy systems',
    tier: 4,
    difficulty: 'advanced' as const,
    estimatedTime: 50
  }
];

// Azure services data
const azureServicesData = [
  {
    id: 'azure-openai',
    name: 'Azure OpenAI',
    description: 'Large language model integration and deployment',
    estimatedTime: 30
  },
  {
    id: 'azure-ai-search',
    name: 'Azure AI Search',
    description: 'Intelligent search capabilities for AI agents',
    estimatedTime: 25
  },
  {
    id: 'document-intelligence',
    name: 'Document Intelligence',
    description: 'Document processing and understanding services',
    estimatedTime: 35
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision',
    description: 'Image and video analysis capabilities',
    estimatedTime: 40
  }
];

export default function ComprehensiveTreeVisualization() {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [viewMode, setViewMode] = useState<'full' | 'concepts' | 'patterns' | 'azure' | 'quiz'>('full');
  const [searchTerm, setSearchTerm] = useState('');

  // Generate comprehensive tree data
  const generateTreeData = (): TreeNode => {
    const standardTabs = [
      { id: 'general', title: 'General Guide', description: 'Overview and conceptual understanding' },
      { id: 'system-design', title: 'System Design', description: '7-step architectural pattern' },
      { id: 'implementation', title: 'Implementation Steps', description: 'Step-by-step implementation guide' },
      { id: 'code', title: 'Complete Code', description: 'Full implementation examples' },
      { id: 'visualizer', title: 'Code Visualizer', description: 'Interactive code execution flow' },
      { id: 'interactive', title: 'Interactive Example', description: 'Hands-on demonstration' },
      { id: 'algorithm', title: 'Algorithm Steps', description: 'Detailed algorithmic breakdown' },
      { id: 'security', title: 'Security Controls', description: 'Security considerations and controls' },
      { id: 'practices', title: 'Best Practices', description: 'Optimization and best practices' },
      { id: 'business', title: 'Business Use Cases', description: 'Real-world applications' }
    ];

    return {
      id: 'root',
      name: 'Open Agent School',
      type: 'root',
      description: 'Comprehensive AI Agent Learning Platform with 15 concepts, 18 patterns, Azure services, and knowledge quizzes',
      icon: <Brain className="w-5 h-5" />,
      children: [
        // Core Concepts Category
        {
          id: 'core-concepts',
          name: 'Core Concepts',
          type: 'category',
          description: '15 concepts across 4 progressive tiers - Complete mastery path for AI agent concepts',
          icon: <Brain className="w-4 h-4" />,
          progress: Math.floor(Math.random() * 40 + 60), // Random progress 60-100%
          metadata: { tier: 0 },
          children: coreConceptsData.map(concept => ({
            id: concept.id,
            name: concept.name,
            type: 'concept' as const,
            description: concept.description,
            difficulty: concept.difficulty,
            estimatedTime: concept.estimatedTime,
            progress: Math.floor(Math.random() * 50 + 50), // Random progress 50-100%
            metadata: { tier: concept.tier },
            children: standardTabs.map(tab => ({
              id: `${concept.id}-${tab.id}`,
              name: tab.title,
              type: 'tab' as const,
              description: tab.description
            }))
          }))
        },
        
        // Agent Patterns Category
        {
          id: 'agent-patterns',
          name: 'Agent Patterns',
          type: 'category',
          description: '18 comprehensive system design patterns covering evaluation, workflow, multi-agent coordination',
          icon: <Cog className="w-4 h-4" />,
          progress: Math.floor(Math.random() * 30 + 70), // Random progress 70-100%
          children: Object.entries(systemDesignPatterns).slice(0, 8).map(([key, pattern]) => ({
            id: key,
            name: pattern.name,
            type: 'pattern' as const,
            description: pattern.overview,
            difficulty: key.includes('advanced') ? 'advanced' as const : 
                       key.includes('basic') ? 'beginner' as const : 'intermediate' as const,
            estimatedTime: Math.floor(Math.random() * 30 + 30), // Random time 30-60 min
            progress: Math.floor(Math.random() * 40 + 60), // Random progress 60-100%
            children: standardTabs.map(tab => ({
              id: `${key}-${tab.id}`,
              name: tab.title,
              type: 'tab' as const,
              description: tab.description
            }))
          }))
        },

        // Azure Services Category
        {
          id: 'azure-services',
          name: 'Azure Services',
          type: 'category',
          description: 'Enterprise Azure AI integration patterns and service configurations',
          icon: <CloudArrowUp className="w-4 h-4" />,
          progress: Math.floor(Math.random() * 35 + 65), // Random progress 65-100%
          children: azureServicesData.map(service => ({
            id: service.id,
            name: service.name,
            type: 'service' as const,
            description: service.description,
            difficulty: 'intermediate' as const,
            estimatedTime: service.estimatedTime,
            progress: Math.floor(Math.random() * 45 + 55), // Random progress 55-100%
            children: standardTabs.slice(0, 7).map(tab => ({ // Fewer tabs for services
              id: `${service.id}-${tab.id}`,
              name: tab.title,
              type: 'tab' as const,
              description: tab.description
            }))
          }))
        },

        // Knowledge Quiz Category
        {
          id: 'knowledge-quiz',
          name: 'Knowledge Quiz',
          type: 'category',
          description: '15+ quiz categories with role-based assessments and progressive difficulty',
          icon: <Target className="w-4 h-4" />,
          progress: Math.floor(Math.random() * 50 + 50), // Random progress 50-100%
          metadata: { totalQuestions: 100 },
          children: quizCategories.slice(0, 6).map(category => ({
            id: category.id,
            name: category.name,
            type: 'quiz' as const,
            description: category.description,
            difficulty: 'intermediate' as const,
            estimatedTime: Math.floor(category.estimatedTime || 25),
            progress: Math.floor(Math.random() * 60 + 40), // Random progress 40-100%
            metadata: { 
              totalQuestions: category.totalQuestions,
              completedQuestions: Math.floor(Math.random() * category.totalQuestions + category.totalQuestions * 0.3)
            },
            children: standardTabs.slice(0, 5).map(tab => ({ // Quiz-specific tabs
              id: `${category.id}-${tab.id}`,
              name: tab.title,
              type: 'tab' as const,
              description: tab.description
            }))
          }))
        }
      ]
    };
  };

  const treeData = generateTreeData();

  // Filter tree data based on view mode and search
  const filteredTreeData = React.useMemo(() => {
    let filtered = { ...treeData };
    
    if (viewMode !== 'full') {
      const categoryMap = {
        'concepts': 'core-concepts',
        'patterns': 'agent-patterns', 
        'azure': 'azure-services',
        'quiz': 'knowledge-quiz'
      };
      
      const targetCategory = categoryMap[viewMode];
      filtered.children = filtered.children?.filter(child => child.id === targetCategory) || [];
    }

    if (searchTerm) {
      // Implement search filtering here
      const searchLower = searchTerm.toLowerCase();
      const filterNode = (node: TreeNode): TreeNode | null => {
        const matchesSearch = node.name.toLowerCase().includes(searchLower) ||
                             node.description?.toLowerCase().includes(searchLower);
        
        const filteredChildren = node.children?.map(filterNode).filter(Boolean) as TreeNode[];
        
        if (matchesSearch || (filteredChildren && filteredChildren.length > 0)) {
          return {
            ...node,
            children: filteredChildren
          };
        }
        
        return null;
      };

      const filteredRoot = filterNode(filtered);
      return filteredRoot || filtered;
    }

    return filtered;
  }, [treeData, viewMode, searchTerm]);

  return (
    <div className="w-full h-screen bg-white dark:bg-gray-900">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Tree className="w-8 h-8 text-indigo-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                AI Agent Learning Tree
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Interactive D3.js visualization of comprehensive AI agent education platform
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedNode(null)}
            >
              Reset Selection
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <MagnifyingGlassPlus className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search concepts, patterns, services, or quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div className="flex gap-2">
            {[
              { id: 'full', label: 'All', icon: <Tree className="w-4 h-4" /> },
              { id: 'concepts', label: 'Concepts', icon: <Brain className="w-4 h-4" /> },
              { id: 'patterns', label: 'Patterns', icon: <Cog className="w-4 h-4" /> },
              { id: 'azure', label: 'Azure', icon: <CloudArrowUp className="w-4 h-4" /> },
              { id: 'quiz', label: 'Quiz', icon: <Target className="w-4 h-4" /> }
            ].map(mode => (
              <Button
                key={mode.id}
                variant={viewMode === mode.id ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode(mode.id as any)}
                className="flex items-center gap-2"
              >
                {mode.icon}
                {mode.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Brain className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">15</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Core Concepts</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Cog className="w-8 h-8 text-amber-600" />
                <div>
                  <div className="text-2xl font-bold">18</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Agent Patterns</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CloudArrowUp className="w-8 h-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">12+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Azure Services</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">100+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Quiz Questions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="flex-1" style={{ height: 'calc(100vh - 280px)' }}>
        <D3TreeVisualization
          data={filteredTreeData}
          selectedNode={selectedNode}
          onNodeSelect={setSelectedNode}
          className="h-full"
        />
      </div>

      {/* Selected Node Details */}
      {selectedNode && ['pattern', 'concept', 'service', 'quiz'].includes(selectedNode.type) && (
        <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 max-h-48 overflow-auto">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {selectedNode.icon && <span className="text-xl">{selectedNode.icon}</span>}
              <div>
                <h3 className="font-semibold text-lg">{selectedNode.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{selectedNode.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {selectedNode.difficulty && (
                <Badge variant="outline">{selectedNode.difficulty}</Badge>
              )}
              {selectedNode.estimatedTime && (
                <Badge variant="outline">{selectedNode.estimatedTime}min</Badge>
              )}
              {selectedNode.progress !== undefined && (
                <Badge variant="outline">{selectedNode.progress}% complete</Badge>
              )}
              <Button size="sm" onClick={() => setSelectedNode(null)}>×</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
