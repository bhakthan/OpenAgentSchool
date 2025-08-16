import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  ChartLineUp,
  Lightbulb
} from '@phosphor-icons/react';
import { systemDesignPatterns } from '@/lib/data/systemDesign';
import { quizCategories } from '@/lib/data/quizzes';
import { getAllStudyModeQuestions, studyModeCategories } from '@/lib/data/studyMode';

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

// Core concepts data structure - NOT USED BY D3 TREE (uses hardcoded data in D3TreeVisualization.tsx)
// This data is only used for generating the comprehensive tree structure but D3 component ignores it
/*
const coreConceptsData = [
  // Tier 0 - GPT-5 Prompting Fundamentals (5 concepts)
  {
    id: 'agentic-prompting-fundamentals',
    name: 'Agentic Prompting Fundamentals',
    description: 'Core principles of agentic prompting including eagerness control, reasoning effort, tool preambles, and steerability',
    tier: 0,
    difficulty: 'beginner' as const,
    estimatedTime: 30
  },
  {
    id: 'prompt-optimization-patterns',
    name: 'Prompt Optimization Patterns',
    description: 'Advanced optimization techniques with quantitative performance improvements',
    tier: 0,
    difficulty: 'intermediate' as const,
    estimatedTime: 35
  },
  {
    id: 'agent-instruction-design',
    name: 'Agent Instruction Design',
    description: 'Instruction hierarchy design and steerability control mechanisms',
    tier: 0,
    difficulty: 'intermediate' as const,
    estimatedTime: 40
  },
  {
    id: 'agentic-workflow-control',
    name: 'Agentic Workflow Control',
    description: 'Advanced workflow control, timing, and multi-tool coordination',
    tier: 0,
    difficulty: 'advanced' as const,
    estimatedTime: 45
  },
  {
    id: 'agent-evaluation-methodologies',
    name: 'Agent Evaluation Methodologies',
    description: 'Comprehensive evaluation frameworks using quantitative and LLM-as-judge techniques',
    tier: 0,
    difficulty: 'advanced' as const,
    estimatedTime: 50
  },
  // Tier 1 - Foundational Concepts (6 concepts)
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
  {
    id: 'agent-evaluation',
    name: 'Agent Evaluation',
    description: 'Performance metrics, benchmarking, and continuous evaluation strategies',
    tier: 1,
    difficulty: 'intermediate' as const,
    estimatedTime: 35
  },
  // Tier 2 - Communication & Protocols (4 concepts)
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
  {
    id: 'a2a-communication-patterns',
    name: 'A2A Communication Patterns',
    description: 'Advanced communication patterns and protocols for agent coordination',
    tier: 2,
    difficulty: 'intermediate' as const,
    estimatedTime: 30
  },
  // Tier 3 - Advanced Integration (3 concepts)
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
  // Tier 4 - Enterprise Operations (4 concepts)
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
  },
  {
    id: 'agentic-ai-design-taxonomy',
    name: 'Agentic AI Design Taxonomy',
    description: 'Comprehensive framework for understanding architectural patterns, design principles, and implementation challenges in Agentic AI systems',
    tier: 4,
    difficulty: 'advanced' as const,
    estimatedTime: 60
  }
];
*/

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
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  // Handle navigation for leaf nodes
  const handleNodeSelect = (node: TreeNode) => {
    // For leaf nodes (concept, pattern, service, quiz), navigate to appropriate page
    if (['concept', 'pattern', 'service', 'quiz'].includes(node.type)) {
      switch (node.type) {
        case 'concept':
          navigate(`/concepts/${node.id}`); // Navigate to specific concept
          break;
        case 'pattern':
          navigate(`/patterns/${node.id}`); // Navigate to specific pattern
          break;
        case 'service':
          navigate(`/azure-services/${node.id}`); // Navigate to specific service
          break;
        case 'quiz':
          // Check if it's a study mode question
          if (node.id.startsWith('study-')) {
            navigate('/study-mode'); // Study Mode page
          } else {
            navigate(`/quiz/${node.id}`); // Navigate to specific quiz
          }
          break;
      }
    } else {
      // For non-leaf nodes, just select them (expand/collapse behavior)
      setSelectedNode(node);
    }
  };

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
      description: 'Comprehensive AI Agent Learning Platform with 22 concepts, 20 patterns, Azure services, knowledge quizzes, and interactive study modes',
      icon: <Brain className="w-5 h-5" />,
      children: [
        // Core Concepts Category
        {
          id: 'core-concepts',
          name: 'Core Concepts',
          type: 'category',
          description: '22 concepts across 5 progressive tiers - Complete mastery path for AI agent concepts',
          icon: <Brain className="w-4 h-4" />,
          progress: Math.floor(Math.random() * 40 + 60), // Random progress 60-100%
          metadata: { tier: 0 },
          children: [] // NOTE: D3TreeVisualization uses its own hardcoded data, not this comprehensive structure
        },
        
        // Agent Patterns Category
        {
          id: 'agent-patterns',
          name: 'Agent Patterns',
          type: 'category',
          description: '20 comprehensive system design patterns covering evaluation, workflow, multi-agent coordination',
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
        },

        // Study Mode Category
        {
          id: 'study-mode',
          name: 'Study Mode',
          type: 'category',
          description: 'Interactive learning through Socratic questioning, scenarios, and debugging challenges',
          icon: <Lightbulb className="w-4 h-4" />,
          progress: Math.floor(Math.random() * 40 + 30), // Random progress 30-70%
          metadata: { totalQuestions: getAllStudyModeQuestions().length },
          children: studyModeCategories.map(category => ({
            id: `study-${category.id}`,
            name: category.name,
            type: 'quiz' as const, // Using quiz type for study questions
            description: category.description,
            difficulty: category.id === 'socratic-thinking' ? 'beginner' as const : 
                       category.id === 'interactive-scenarios' ? 'intermediate' as const : 'advanced' as const,
            estimatedTime: 45, // Average time for study mode sessions
            progress: Math.floor(Math.random() * 60 + 20), // Random progress 20-80%
            metadata: { 
              totalQuestions: category.questions.length,
              completedQuestions: Math.floor(Math.random() * category.questions.length * 0.5)
            },
            children: [
              { id: `${category.id}-overview`, name: 'Mode Overview', type: 'tab' as const, description: 'Introduction to this study mode' },
              { id: `${category.id}-questions`, name: 'Question Library', type: 'tab' as const, description: 'Browse available questions' },
              { id: `${category.id}-progress`, name: 'Progress Tracking', type: 'tab' as const, description: 'Track your learning progress' },
              { id: `${category.id}-insights`, name: 'Learning Insights', type: 'tab' as const, description: 'Personalized learning insights' }
            ]
          }))
        }
      ]
    };
  };

  const treeData = generateTreeData();

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
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

        {/* Statistics */}
        <div className="grid grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Brain className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">22</div>
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
                  <div className="text-2xl font-bold">20</div>
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
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-indigo-600" />
                <div>
                  <div className="text-2xl font-bold">{getAllStudyModeQuestions().length}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Study Questions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="flex-1" style={{ minHeight: '1000px' }}>
        <D3TreeVisualization
          data={treeData}
          selectedNode={selectedNode}
          onNodeSelect={handleNodeSelect}
          className="h-auto"
        />
      </div>

    </div>
  );
}
