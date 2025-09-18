import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {Brain} from "@phosphor-icons/react/dist/ssr/Brain";
import {PuzzlePiece} from "@phosphor-icons/react/dist/ssr/PuzzlePiece";
import {StackSimple} from "@phosphor-icons/react/dist/ssr/StackSimple";
import {Books} from "@phosphor-icons/react/dist/ssr/Books";
import {Users} from "@phosphor-icons/react/dist/ssr/Users";
import {CheckCircle} from "@phosphor-icons/react/dist/ssr/CheckCircle";
import {Circle} from "@phosphor-icons/react/dist/ssr/Circle";
import {Star} from "@phosphor-icons/react/dist/ssr/Star";
import {TrendUp} from "@phosphor-icons/react/dist/ssr/TrendUp";
import {Target} from "@phosphor-icons/react/dist/ssr/Target";
import {Path} from "@phosphor-icons/react/dist/ssr/Path";
import {MapPin} from "@phosphor-icons/react/dist/ssr/MapPin";
import {Trophy} from "@phosphor-icons/react/dist/ssr/Trophy";
import {Sparkle} from "@phosphor-icons/react/dist/ssr/Sparkle";
import {GraduationCap} from "@phosphor-icons/react/dist/ssr/GraduationCap";
import { ArrowsHorizontal } from "@phosphor-icons/react/dist/ssr/ArrowsHorizontal";
import { Shield } from "@phosphor-icons/react/dist/ssr/Shield";
import { Stack } from "@phosphor-icons/react/dist/ssr/Stack";
import { LinkSimple } from "@phosphor-icons/react/dist/ssr/LinkSimple";
import { Graph } from "@phosphor-icons/react/dist/ssr/Graph";
import { ChartBar } from "@phosphor-icons/react/dist/ssr/ChartBar";
import { Lock } from "@phosphor-icons/react/dist/ssr/Lock";
import { Package } from "@phosphor-icons/react/dist/ssr/Package";
import { Scales } from "@phosphor-icons/react/dist/ssr/Scales";
import { cn } from "@/lib/utils";

interface LearningNode {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  prerequisites: string[];
  skills: string[];
  completionRate: number;
  isCompleted: boolean;
  isUnlocked: boolean;
  path: string;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  nodes: LearningNode[];
  totalProgress: number;
  recommendedOrder: string[];
}

interface LearningJourneyMapProps {
  currentPage?: string;
  isVisible: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

const learningPaths: LearningPath[] = [
  {
    id: 'comprehensive-path',
    title: 'Complete AI Agent Mastery',
    description: 'Comprehensive learning path covering all core concepts in 5 progressive tiers',
    recommendedOrder: [
      // Tier 0: Core Concepts (Prompting & Optimization)
      'agentic-ai-design-taxonomy', 'agentic-prompting-fundamentals', 'prompt-optimization-patterns', 'agent-instruction-design', 
      'agentic-workflow-control', 'agent-evaluation-methodologies',
      // Tier 1: Foundational Concepts
      'agent-architecture', 'agent-security', 'multi-agent-systems', 'agent-ethics', 'ai-agents',
      // Tier 2: Architecture Concepts  
      'a2a-communication', 'mcp', 'flow-visualization',
      // Tier 3: Implementation Concepts
      'acp', 'mcp-a2a-integration', 'data-visualization',
      // Tier 4: Advanced Concepts
  'agent-deployment', 'agent-learning', 'fine-tuning', 'agent-integration', 'agentic-commerce-ap2',
      // Additional Learning
      'azure-services', 'references', 'community', 'patterns', 'quiz'
    ],
    totalProgress: 0,
    nodes: [
      // Tier 0: Foundation - Design Taxonomy
      {
        id: 'agentic-ai-design-taxonomy',
        title: 'Agentic AI Design Taxonomy',
        description: 'Comprehensive framework for understanding architectural patterns, design principles, and implementation challenges',
        icon: <Brain size={20} />,
        difficulty: 'beginner',
        estimatedTime: '45-60 min',
        prerequisites: [],
        skills: ['Design Patterns', 'Architectural Principles', 'Implementation Framework', 'System Taxonomy'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: true,
        path: '/concepts'
      },
      // Tier 0: Core Concepts (Prompting & Optimization)
      {
        id: 'agentic-prompting-fundamentals',
        title: 'Agentic Prompting Fundamentals',
        description: 'Master the core principles of prompting AI agents for optimal performance',
        icon: <Brain size={20} />,
        difficulty: 'beginner',
        estimatedTime: '30-40 min',
        prerequisites: ['agentic-ai-design-taxonomy'],
        skills: ['Eagerness Control', 'Tool Preambles', 'Reasoning Effort', 'Steerability'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: true,
        path: '/concepts'
      },
      {
        id: 'prompt-optimization-patterns',
        title: 'Prompt Optimization Patterns',
        description: 'Learn systematic approaches to eliminate contradictions and improve effectiveness',
        icon: <ChartBar size={20} />,
        difficulty: 'beginner',
        estimatedTime: '35-45 min',
        prerequisites: ['agentic-ai-design-taxonomy', 'agentic-prompting-fundamentals'],
        skills: ['Contradiction Elimination', 'Specificity Improvements', 'Example Consistency'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'agent-instruction-design',
        title: 'Agent Instruction Design',
        description: 'Design effective instruction hierarchies and steerability controls',
        icon: <Books size={20} />,
        difficulty: 'beginner',
        estimatedTime: '30-40 min',
        prerequisites: ['agentic-ai-design-taxonomy', 'agentic-prompting-fundamentals'],
        skills: ['Instruction Hierarchy', 'Steerability Control', 'Verbosity Management'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'agentic-workflow-control',
        title: 'Agentic Workflow Control',
        description: 'Advanced workflow patterns, timing control, and multi-tool coordination',
        icon: <ArrowsHorizontal size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '40-50 min',
        prerequisites: ['prompt-optimization-patterns', 'agent-instruction-design'],
        skills: ['Workflow Patterns', 'Timing Control', 'Tool Coordination'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'agent-evaluation-methodologies',
        title: 'Agent Evaluation Methodologies',
        description: 'Comprehensive evaluation frameworks using quantitative and LLM-as-judge techniques',
        icon: <Scales size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '35-45 min',
        prerequisites: ['agentic-workflow-control'],
        skills: ['LLM-as-Judge', 'Quantitative Metrics', 'Evaluation Validation'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      // Tier 1: Foundational Concepts
      {
        id: 'agent-architecture',
        title: 'Agent Architecture & Lifecycle',
        description: 'Fundamental building blocks and lifecycle of AI agents',
        icon: <Brain size={20} />,
        difficulty: 'beginner',
        estimatedTime: '25-35 min',
        prerequisites: [],
        skills: ['Agent Lifecycle', 'Core Architecture', 'Design Patterns'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: true,
        path: '/concepts'
      },
      {
        id: 'agent-security',
        title: 'Agent Security & Trust',
        description: 'Security mechanisms and trust models for AI agents',
        icon: <Shield size={20} />,
        difficulty: 'beginner',
        estimatedTime: '30-40 min',
        prerequisites: ['agent-architecture'],
        skills: ['Security Models', 'Trust Mechanisms', 'Threat Mitigation'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'multi-agent-systems',
        title: 'Multi-Agent Systems',
        description: 'Coordination and collaboration in multi-agent environments',
        icon: <Users size={20} />,
        difficulty: 'beginner',
        estimatedTime: '35-45 min',
        prerequisites: ['agent-architecture'],
        skills: ['Multi-Agent Coordination', 'Collaboration Patterns', 'Emergent Behavior'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'agent-ethics',
        title: 'Agent Ethics & Governance',
        description: 'Ethical principles and governance for AI agents',
        icon: <Scales size={20} />,
        difficulty: 'beginner',
        estimatedTime: '35-45 min',
        prerequisites: ['agent-architecture'],
        skills: ['Ethics Principles', 'Bias Mitigation', 'Regulatory Compliance'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'ai-agents',
        title: 'AI Agents',
        description: 'Autonomous AI systems that perceive, decide, and act',
        icon: <Brain size={20} />,
        difficulty: 'beginner',
        estimatedTime: '20-30 min',
        prerequisites: [],
        skills: ['Agent Fundamentals', 'Autonomy', 'Decision Making'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: true,
        path: '/concepts'
      },
      {
        id: 'ai-safety-governance',
        title: 'AI Safety and Governance',
        description: 'Safety measures and governance frameworks for AI agents',
        icon: <Shield size={20} />,
        difficulty: 'beginner',
        estimatedTime: '30-40 min',
        prerequisites: ['agent-architecture'],
        skills: ['Safety Protocols', 'Governance Frameworks', 'Risk Management'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      
      // Tier 2: Architecture Concepts
      {
        id: 'a2a-communication',
        title: 'A2A Communication',
        description: 'Agent-to-Agent communication and coordination',
        icon: <ArrowsHorizontal size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '25-35 min',
        prerequisites: ['multi-agent-systems'],
        skills: ['Communication Protocols', 'Message Passing', 'Coordination'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'mcp',
        title: 'Model Context Protocol',
        description: 'Secure tool integration protocol for AI agents',
        icon: <Shield size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '30-40 min',
        prerequisites: ['agent-security'],
        skills: ['MCP Protocol', 'Tool Integration', 'Security Patterns'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'flow-visualization',
        title: 'Flow Visualization',
        description: 'Interactive visualization of agent flows and interactions',
        icon: <Graph size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '30-40 min',
        prerequisites: ['a2a-communication'],
        skills: ['Flow Visualization', 'Interactive Diagrams', 'System Analysis'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      
      // Tier 3: Implementation Concepts
      {
        id: 'acp',
        title: 'Agent Communication Protocol',
        description: 'Advanced protocols for enterprise-scale coordination',
        icon: <Stack size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '35-45 min',
        prerequisites: ['a2a-communication'],
        skills: ['ACP Protocol', 'Enterprise Architecture', 'Scale Coordination'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'mcp-a2a-integration',
        title: 'MCP × A2A Integration',
        description: 'Integrate MCP with Agent-to-Agent communication',
        icon: <LinkSimple size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '40-50 min',
        prerequisites: ['mcp', 'a2a-communication'],
        skills: ['Protocol Integration', 'Hybrid Systems', 'Advanced Coordination'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'data-visualization',
        title: 'Data Visualization',
        description: 'Advanced data visualization for AI agent systems',
        icon: <ChartBar size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '35-45 min',
        prerequisites: ['flow-visualization'],
        skills: ['Data Visualization', 'Analytics', 'Dashboard Design'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      
      // Tier 4: Advanced Concepts
      {
        id: 'agent-deployment',
        title: 'Agent Deployment & Operations',
        description: 'Production deployment and operations for AI agents',
        icon: <Package size={20} />,
        difficulty: 'advanced',
        estimatedTime: '40-50 min',
        prerequisites: ['acp'],
        skills: ['Deployment', 'Containerization', 'Monitoring', 'DevOps'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'agent-learning',
        title: 'Agent Learning & Adaptation',
        description: 'Advanced learning techniques for AI agents',
        icon: <Brain size={20} />,
        difficulty: 'advanced',
        estimatedTime: '45-55 min',
        prerequisites: ['ai-agents'],
        skills: ['Reinforcement Learning', 'Transfer Learning', 'Meta-Learning'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'fine-tuning',
        title: 'Fine-Tuning Methods (SFT, DPO, RFT)',
        description: 'Stop overtraining—choose the lowest intervention (SFT → DPO → RFT) that proves incremental lift.',
        icon: <Brain size={20} />,
        difficulty: 'advanced',
        estimatedTime: '45-55 min',
        prerequisites: ['agent-learning'],
        skills: ['Supervised Fine-Tuning', 'Preference Optimization', 'Reinforcement Alignment'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'agent-integration',
        title: 'Agent Integration Patterns',
        description: 'Integration patterns for enterprise AI agent systems',
        icon: <LinkSimple size={20} />,
        difficulty: 'advanced',
        estimatedTime: '40-50 min',
        prerequisites: ['mcp-a2a-integration'],
        skills: ['Integration Patterns', 'API Design', 'Enterprise Architecture'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'agentic-commerce-ap2',
        title: 'Agentic Commerce & AP2',
        description: 'Mandate chain (Intent → Cart → Payment) for trusted agent-led payments',
        icon: <Shield size={20} />,
        difficulty: 'advanced',
        estimatedTime: '40-50 min',
        prerequisites: ['mcp-a2a-integration', 'agent-security'],
        skills: ['Delegated Trust', 'Verifiable Credentials', 'Commerce Integration'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      
      // Additional Learning Resources
      {
        id: 'azure-services',
        title: 'Azure AI Services',
        description: 'Cloud AI service integration with Azure',
        icon: <StackSimple size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '20-25 min',
        prerequisites: ['agent-integration'],
        skills: ['Azure Integration', 'Cloud Services', 'API Usage'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/azure-services'
      },
      {
        id: 'references',
        title: 'References & Documentation',
        description: 'Essential documentation and resources',
        icon: <Books size={20} />,
        difficulty: 'beginner',
        estimatedTime: '15-20 min',
        prerequisites: [],
        skills: ['Documentation', 'Resource Discovery', 'Best Practices'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: true,
        path: '/references'
      },
      {
        id: 'community',
        title: 'Community & Sharing',
        description: 'Connect and share with the AI agent community',
        icon: <Users size={20} />,
        difficulty: 'beginner',
        estimatedTime: '10-15 min',
        prerequisites: [],
        skills: ['Community Engagement', 'Knowledge Sharing', 'Collaboration'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: true,
        path: '/community'
      },
      {
        id: 'patterns',
        title: 'Agent Patterns & Examples',
        description: 'Implementation patterns and real-world examples',
        icon: <PuzzlePiece size={20} />,
        difficulty: 'advanced',
        estimatedTime: '35-40 min',
        prerequisites: ['agent-deployment', 'agent-learning', 'agent-integration'],
        skills: ['Design Patterns', 'Implementation Examples', 'Best Practices'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/patterns'
      },
      {
        id: 'quiz',
        title: 'Knowledge Assessment',
        description: 'Test your understanding with comprehensive quizzes',
        icon: <GraduationCap size={20} />,
        difficulty: 'beginner',
        estimatedTime: '15-20 min',
        prerequisites: [],
        skills: ['Knowledge Assessment', 'Progress Tracking', 'Validation'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: true,
        path: '/quiz'
      }
    ]
  }
];

export const LearningJourneyMap: React.FC<LearningJourneyMapProps> = ({
  currentPage = 'concepts',
  isVisible,
  onClose,
  onNavigate
}) => {
  const [selectedPath, setSelectedPath] = useState<LearningPath>(learningPaths[0]);
  const [activeTier, setActiveTier] = useState(0);
  const tierLabels = [
    'Tier 0: Core Concepts',
    'Tier 1: Fundamentals',
    'Tier 2: Architecture',
    'Tier 3: Implementation',
    'Tier 4: Advanced',
    'Additional Resources'
  ];
  const tiers = [
    ['agentic-ai-design-taxonomy', 'agentic-prompting-fundamentals', 'prompt-optimization-patterns', 'agent-instruction-design', 'agentic-workflow-control', 'agent-evaluation-methodologies'],
    ['agent-architecture', 'agent-security', 'multi-agent-systems', 'agent-ethics', 'ai-agents'],
    ['a2a-communication', 'mcp', 'flow-visualization'],
    ['acp', 'mcp-a2a-integration', 'data-visualization'],
  ['agent-deployment', 'agent-learning', 'fine-tuning', 'agent-integration', 'agentic-commerce-ap2'],
    ['azure-services', 'references', 'community', 'patterns', 'quiz']
  ];
  const tierNodes = selectedPath.nodes.filter(node => tiers[activeTier].includes(node.id))
    .sort((a, b) => {
      // Sort by the recommended order within each tier
      const aIndex = selectedPath.recommendedOrder.indexOf(a.id);
      const bIndex = selectedPath.recommendedOrder.indexOf(b.id);
      return aIndex - bIndex;
    });

  // Load user progress from localStorage
  useEffect(() => {
    const updatedPath = { ...selectedPath };
    let totalCompleted = 0;
    
    updatedPath.nodes = updatedPath.nodes.map(node => {
      // Handle quiz node separately
      if (node.id === 'quiz') {
        const quizProgress = localStorage.getItem('quiz-progress');
        if (quizProgress) {
          const progress = JSON.parse(quizProgress);
          const completedQuizzes = progress.completedQuizzes || [];
          const totalQuizzes = progress.totalQuizzes || 0;
          const averageScore = progress.averageScore || 0;
          
          // Consider quiz completed if they've taken at least 3 quizzes with 70%+ average
          const isCompleted = completedQuizzes.length >= 3 && averageScore >= 70;
          const completionRate = Math.min(100, (completedQuizzes.length / Math.max(1, totalQuizzes)) * 100);
          
          if (isCompleted) totalCompleted++;
          
          return {
            ...node,
            completionRate,
            isCompleted,
            isUnlocked: true // Quiz is always unlocked
          };
        }
        return node;
      }
      
      // Handle other nodes with existing logic
      const analytics = localStorage.getItem(`page-analytics-${node.id}`);
      if (analytics) {
        const data = JSON.parse(analytics);
        const completionRate = data.completionRate || 0;
        const isCompleted = completionRate >= 80;
        
        if (isCompleted) totalCompleted++;
        
        return {
          ...node,
          completionRate,
          isCompleted,
          isUnlocked: node.prerequisites.length === 0 || 
                     node.prerequisites.every(prereq => 
                       updatedPath.nodes.find(n => n.id === prereq)?.isCompleted
                     )
        };
      }
      return node;
    });
    
    updatedPath.totalProgress = (totalCompleted / updatedPath.nodes.length) * 100;
    setSelectedPath(updatedPath);
  }, [isVisible]);

  // Update progress on storage event
  useEffect(() => {
    const updateProgress = () => {
      const updatedPath = { ...selectedPath };
      let totalCompleted = 0;
      updatedPath.nodes = updatedPath.nodes.map(node => {
        if (node.id === 'quiz') {
          const quizProgress = localStorage.getItem('quiz-progress');
          if (quizProgress) {
            const progress = JSON.parse(quizProgress);
            const completedQuizzes = progress.completedQuizzes || [];
            const totalQuizzes = progress.totalQuizzes || 0;
            const averageScore = progress.averageScore || 0;
            const isCompleted = completedQuizzes.length >= 3 && averageScore >= 70;
            const completionRate = Math.min(100, (completedQuizzes.length / Math.max(1, totalQuizzes)) * 100);
            if (isCompleted) totalCompleted++;
            return {
              ...node,
              completionRate,
              isCompleted,
              isUnlocked: true
            };
          }
          return node;
        }
        const analytics = localStorage.getItem(`page-analytics-${node.id}`);
        if (analytics) {
          const data = JSON.parse(analytics);
          const completionRate = data.completionRate || 0;
          const isCompleted = completionRate >= 80;
          if (isCompleted) totalCompleted++;
          return {
            ...node,
            completionRate,
            isCompleted,
            isUnlocked: node.prerequisites.length === 0 || node.prerequisites.every(prereq => updatedPath.nodes.find(n => n.id === prereq)?.isCompleted)
          };
        }
        return node;
      });
      updatedPath.totalProgress = (totalCompleted / updatedPath.nodes.length) * 100;
      setSelectedPath(updatedPath);
    };
    updateProgress();
    const handleStorage = (e: StorageEvent) => {
      if (e.key && (e.key.startsWith('page-analytics-') || e.key === 'quiz-progress')) {
        updateProgress();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [isVisible]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
  case 'beginner': return 'bg-green-100 text-black border-green-200 dark:text-green-200 dark:bg-green-900';
  case 'intermediate': return 'bg-yellow-100 text-black border-yellow-200 dark:text-yellow-200 dark:bg-yellow-900';
  case 'advanced': return 'bg-red-100 text-black border-red-200 dark:text-red-200 dark:bg-red-900';
  default: return 'bg-gray-100 text-black border-gray-200 dark:text-gray-200 dark:bg-gray-900';
    }
  };

  const getTierColor = (nodeId: string) => {
    // Tier 0: Core Concepts
    if (['agentic-prompting-fundamentals', 'prompt-optimization-patterns', 'agent-instruction-design', 'agentic-workflow-control', 'agent-evaluation-methodologies'].includes(nodeId)) {
  return 'bg-purple-100 text-black dark:text-purple-200 dark:bg-purple-900';
    }
    // Tier 1: Fundamentals
    if (['agent-architecture', 'agent-security', 'multi-agent-systems', 'agent-ethics', 'ai-agents'].includes(nodeId)) {
  return 'bg-blue-100 text-black dark:text-blue-200 dark:bg-blue-900';
    }
    // Tier 2: Architecture
    if (['a2a-communication', 'mcp', 'flow-visualization'].includes(nodeId)) {
  return 'bg-green-100 text-black dark:text-green-200 dark:bg-green-900';
    }
    // Tier 3: Implementation
    if (['acp', 'mcp-a2a-integration', 'data-visualization'].includes(nodeId)) {
  return 'bg-yellow-100 text-black dark:text-yellow-200 dark:bg-yellow-900';
    }
    // Tier 4: Advanced
    if (['agent-deployment', 'agent-learning', 'agent-integration', 'agentic-commerce-ap2'].includes(nodeId)) {
  return 'bg-red-100 text-black dark:text-red-200 dark:bg-red-900';
    }
    // Additional resources
  return 'bg-gray-100 text-black dark:text-gray-200 dark:bg-gray-900';
  };

  const getTierNumber = (nodeId: string) => {
    if (['agentic-prompting-fundamentals', 'prompt-optimization-patterns', 'agent-instruction-design', 'agentic-workflow-control', 'agent-evaluation-methodologies'].includes(nodeId)) return 0;
    if (['agent-architecture', 'agent-security', 'multi-agent-systems', 'agent-ethics', 'ai-agents'].includes(nodeId)) return 1;
    if (['a2a-communication', 'mcp', 'flow-visualization'].includes(nodeId)) return 2;
    if (['acp', 'mcp-a2a-integration', 'data-visualization'].includes(nodeId)) return 3;
    if (['agent-deployment', 'agent-learning', 'agent-integration'].includes(nodeId)) return 4;
    return 5; // Additional resources
  };

  const getNodePosition = (index: number, total: number) => {
    const containerWidth = 1000;
    const containerHeight = 500;
    const padding = 80; // Increased padding for better spacing

    // Special compact layout for Tier 0 (6 nodes) to harmonize line lengths with Tier 1
    if (activeTier === 0 && total === 6) {
      const availableWidth = containerWidth - 2 * padding; // 840px
      const spacing = availableWidth / 5; // 168px between consecutive nodes
      const baseY = containerHeight / 2;
      // Gentle diagonal progression to keep segments short and readable
      const yOffsets = [-100, -60, -20, 20, 60, 100];
      return {
        x: padding + spacing * Math.min(index, 5),
        y: baseY + yOffsets[Math.min(index, yOffsets.length - 1)]
      };
    }

    if (total === 1) {
      // Single node - center it
      return { x: containerWidth / 2, y: containerHeight / 2 };
    }
    
    if (total <= 3) {
      // Linear horizontal layout for small tiers
      const spacing = (containerWidth - 2 * padding) / Math.max(1, total - 1);
      const x = padding + (index * spacing);
      const y = containerHeight / 2;
      return { x, y };
    } 
    
    if (total === 5) {
      // Special layout for 5 nodes (Tier 1) - create a clear learning path with proper spacing
      const availableWidth = containerWidth - 2 * padding; // 840px available
      const spacing = availableWidth / 4; // 210px between nodes
      const positions = [
        { x: padding, y: containerHeight / 2 - 80 },                    // 1. agent-architecture
        { x: padding + spacing, y: containerHeight / 2 - 40 },         // 2. agent-security  
        { x: padding + spacing * 2, y: containerHeight / 2 },          // 3. multi-agent-systems
        { x: padding + spacing * 3, y: containerHeight / 2 + 40 },     // 4. agent-ethics
        { x: padding + spacing * 4, y: containerHeight / 2 + 80 }      // 5. ai-agents
      ];
      return positions[index] || { x: containerWidth / 2, y: containerHeight / 2 };
    } else {
      // Grid layout for other sizes with clear flow direction
      const cols = Math.min(total, 3); // Max 3 columns for readability
      const rows = Math.ceil(total / cols);
      const colSpacing = (containerWidth - 2 * padding) / Math.max(1, cols - 1);
      const rowSpacing = (containerHeight - 2 * padding) / Math.max(1, rows - 1);
      
      const row = Math.floor(index / cols);
      const col = index % cols;
      
      const x = padding + (col * colSpacing);
      const y = padding + (row * rowSpacing);
      
      return { x, y };
    }
  };

  const getNextRecommendedNode = () => {
    const uncompletedNodes = selectedPath.nodes.filter(node => !node.isCompleted && node.isUnlocked);
    if (uncompletedNodes.length === 0) return null;
    
    // Find the next node in the recommended order
    for (const nodeId of selectedPath.recommendedOrder) {
      const node = uncompletedNodes.find(n => n.id === nodeId);
      if (node) return node;
    }
    
    return uncompletedNodes[0];
  };

  const getAchievements = () => {
    const completedNodes = selectedPath.nodes.filter(node => node.isCompleted);
    const achievements = [];
    
    if (completedNodes.length >= 1) {
      achievements.push({ title: 'First Steps', description: 'Completed your first section', icon: <Star size={16} /> });
    }
    if (completedNodes.length >= 3) {
      achievements.push({ title: 'Learning Streak', description: 'Completed 3 sections', icon: <TrendUp size={16} /> });
    }
    if (completedNodes.length === selectedPath.nodes.length) {
      achievements.push({ title: 'Journey Complete', description: 'Mastered all sections', icon: <Trophy size={16} /> });
    }
    
    // Quiz-specific achievements
    const quizProgress = localStorage.getItem('quiz-progress');
    if (quizProgress) {
      const progress = JSON.parse(quizProgress);
      const completedQuizzes = progress.completedQuizzes || [];
      const highScores = completedQuizzes.filter((quiz: any) => quiz.score >= 90);
      const perfectScores = completedQuizzes.filter((quiz: any) => quiz.score === 100);
      
      if (completedQuizzes.length >= 1) {
        achievements.push({ title: 'Quiz Taker', description: 'Completed your first quiz', icon: <GraduationCap size={16} /> });
      }
      if (highScores.length >= 3) {
        achievements.push({ title: 'High Achiever', description: 'Scored 90%+ on 3 quizzes', icon: <Target size={16} /> });
      }
      if (perfectScores.length >= 1) {
        achievements.push({ title: 'Perfect Score', description: 'Achieved 100% on a quiz', icon: <Sparkle size={16} /> });
      }
    }
    
    return achievements;
  };

  if (!isVisible) return null;

  const nextNode = getNextRecommendedNode();
  const achievements = getAchievements();
  // Compute quiz stats when showing quiz details
  const quizProgressData = selectedPath.nodes.find(n => n.id === 'quiz') ? JSON.parse(localStorage.getItem('quiz-progress') || '{}') : null;
  const averageScore = quizProgressData?.averageScore || 0;
  const completedQuizzes = quizProgressData?.completedQuizzes || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-screen h-auto flex flex-col shadow-2xl border-2 border-primary/10 bg-background/80 dark:bg-background/60">
        <CardHeader className="pb-2 flex-shrink-0 bg-background/80 dark:bg-background/60 rounded-t-lg shadow">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-2xl font-bold text-primary">
              <Path size={24} className="text-primary" />
              Learning Journey Map
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-xl">×</Button>
          </div>
          {/* Tier Tabs */}
          <div className="flex gap-2 mt-2 mb-1"> {/* Reduced vertical space */}
            {tierLabels.map((label, idx) => (
              <Button
                key={label}
                variant={activeTier === idx ? 'default' : 'outline'}
                className={cn('text-xs px-3 py-1 rounded-full', activeTier === idx ? 'font-bold' : '')}
                onClick={() => setActiveTier(idx)}
              >
                {label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 bg-background/60 dark:bg-background/40 rounded-b-lg overflow-hidden flex flex-col">
          {/* Legend for node status */}
          <div className="flex gap-8 items-center justify-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-green-600 flex items-center justify-center text-white"><CheckCircle size={20} weight="fill" /></div>
              <span className="text-sm text-foreground">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary border-2 border-primary flex items-center justify-center text-white"><Circle size={20} weight="fill" /></div>
              <span className="text-sm text-foreground">Unlocked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-muted-foreground flex items-center justify-center text-muted-foreground"><Lock size={20} weight="fill" /></div>
              <span className="text-sm text-foreground">Locked</span>
            </div>
          </div>
          {/* Journey Map Section for selected tier */}
          <div className="flex-1 flex flex-col items-center justify-center p-4 mb-2">
            <div className="relative w-full h-[500px] flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <style>
                    {`
                      /* Animated arrow paths with smooth transitions */
                      .arrow-path {
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        transition: all 0.5s ease;
                      }
                      .arrow-path-animated {
                        stroke-dasharray: 20 10;
                        animation: flowPath 3s ease-in-out infinite;
                        filter: drop-shadow(0 2px 4px rgba(34, 197, 94, 0.3));
                      }
                      .arrow-path-muted {
                        stroke-dasharray: 10 5;
                        animation: flowPathMuted 2s ease-in-out infinite;
                        opacity: 0.6;
                      }
                      
                      @keyframes flowPath {
                        0% { stroke-dashoffset: 0; opacity: 0.8; }
                        50% { opacity: 1; stroke-width: 3; }
                        100% { stroke-dashoffset: -30; opacity: 0.8; }
                      }
                      
                      @keyframes flowPathMuted {
                        0% { stroke-dashoffset: 0; opacity: 0.4; }
                        50% { opacity: 0.7; }
                        100% { stroke-dashoffset: -15; opacity: 0.4; }
                      }
                      
                      /* Flowing data particles */
                      .flow-particle {
                        fill: #22c55e;
                        opacity: 0.8;
                        filter: drop-shadow(0 1px 2px rgba(34, 197, 94, 0.4));
                      }
                    `}
                  </style>
                  <marker id="arrow" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto" markerUnits="strokeWidth">
                    <polygon points="0 0, 10 4, 0 8" fill="#22c55e" />
                  </marker>
                  <marker id="arrow-grey" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto" markerUnits="strokeWidth">
                    <polygon points="0 0, 10 4, 0 8" fill="#cbd5e1" />
                  </marker>
                  <marker id="arrow-animated" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto" markerUnits="strokeWidth">
                    <polygon points="0 0, 10 4, 0 8" fill="#22c55e">
                      <animate attributeName="fill" values="#22c55e;#16a34a;#22c55e" dur="2s" repeatCount="indefinite"/>
                    </polygon>
                  </marker>
                </defs>
                
                {/* Clear directional learning path connections */}
                {tierNodes.map((node, index) => {
                  if (index === tierNodes.length - 1) return null;
                  const current = getNodePosition(index, tierNodes.length);
                  const next = getNodePosition(index + 1, tierNodes.length);
                  const isCompleted = node.isCompleted;
                  const nextNode = tierNodes[index + 1];
                  const isNextUnlocked = nextNode?.isUnlocked;
                  
                  // Use straight lines for clear direction - simpler and more reliable
                  const pathData = `M ${current.x} ${current.y} L ${next.x} ${next.y}`;
                  
                  return (
                    <g key={`connection-${node.id}-${nextNode.id}`}>
                      <line
                        x1={current.x}
                        y1={current.y}
                        x2={next.x}
                        y2={next.y}
                        stroke={isCompleted && isNextUnlocked ? '#22c55e' : isCompleted ? '#fbbf24' : '#cbd5e1'}
                        strokeWidth={isCompleted ? '3' : '2'}
                        className={isCompleted ? 'arrow-path arrow-path-animated' : 'arrow-path arrow-path-muted'}
                        markerEnd={isCompleted ? 'url(#arrow-animated)' : 'url(#arrow-grey)'}
                      />
                      
                      {/* Step indicator along path */}
                      <text 
                        x={(current.x + next.x) / 2} 
                        y={(current.y + next.y) / 2 - 10} 
                        textAnchor="middle" 
                        className="text-xs fill-muted-foreground font-medium"
                        style={{ fontSize: '11px' }}
                      >
                        {isCompleted ? '✓' : `${index + 1} → ${index + 2}`}
                      </text>
                      
                      {/* Animated flow particles for completed connections */}
                      {isCompleted && (
                        <circle r="3" className="flow-particle">
                          <animateMotion dur="2s" repeatCount="indefinite">
                            <path d={pathData}/>
                          </animateMotion>
                          <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>
              {/* All learning path nodes in recommended order */}
              {tierNodes.map((node, index) => {
                const position = getNodePosition(index, tierNodes.length);
                const isCurrentNext = getNextRecommendedNode()?.id === node.id;
                const globalIndex = selectedPath.recommendedOrder.indexOf(node.id) + 1;
                return (
                  <div
                    key={node.id}
                    className={cn(
                      "absolute w-16 h-16 rounded-full border-3 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 shadow-lg hover:scale-110",
                      node.isCompleted ? "bg-green-500 border-green-600 text-white shadow-green-200" :
                      node.isUnlocked ? "bg-primary border-primary text-white shadow-primary/20" :
                      "bg-muted border-muted-foreground text-muted-foreground dark:bg-muted dark:text-muted-foreground",
                      isCurrentNext ? "ring-4 ring-yellow-400 ring-opacity-75 animate-pulse" : ""
                    )}
                    style={{ left: position.x - 32, top: position.y - 32, zIndex: 10 }}
                    onClick={() => { if (node.isUnlocked) { onNavigate(node.path); } }}
                  >
                    <div className="text-lg">{node.icon}</div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-background border-2 border-current flex items-center justify-center text-xs font-bold">
                      {globalIndex > 0 ? globalIndex : index + 1}
                    </div>
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center pointer-events-none max-w-[180px]">
                      <div className="text-xs font-bold text-center leading-tight mb-1 text-foreground">{node.title}</div>
                      <div className="flex items-center justify-center gap-1 flex-wrap">
                        <Badge className={cn("text-xs px-1 py-0.5", getTierColor(node.id))}>T{getTierNumber(node.id)}</Badge>
                        <span className="text-xs text-muted-foreground bg-background/80 dark:bg-background/40 px-1 py-0.5 rounded">{node.estimatedTime}</span>
                      </div>
                      {node.completionRate > 0 && !node.isCompleted && (
                        <div className="mt-1 w-full bg-muted rounded-full h-1">
                          <div 
                            className="bg-primary h-1 rounded-full transition-all duration-300"
                            style={{ width: `${node.completionRate}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Bottom Row: Next Step & Achievements */}
            <div className="flex flex-row gap-6 justify-between items-stretch mt-4">
              {nextNode && (
                <Card className="flex-1 border-primary/20 shadow bg-background dark:bg-background">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Target size={16} className="text-primary" /> Recommended Next Step
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-md">{nextNode.icon}</div>
                        <div>
                          <h4 className="font-medium">{nextNode.title}</h4>
                          <p className="text-sm text-muted-foreground">{nextNode.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={cn("text-xs", getDifficultyColor(nextNode.difficulty))}>{nextNode.difficulty}</Badge>
                        <Badge variant="outline" className="text-xs">{nextNode.estimatedTime}</Badge>
                      </div>
                      <Button className="w-full" onClick={() => onNavigate(nextNode.path)}>Continue Learning</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              {achievements.length > 0 && (
                <Card className="flex-1 shadow bg-background dark:bg-background">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Sparkle size={16} className="text-yellow-600" /> Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 dark:bg-muted/30 rounded-md">
                          <div className="text-yellow-600">{achievement.icon}</div>
                          <div>
                            <div className="text-sm font-medium">{achievement.title}</div>
                            <div className="text-xs text-muted-foreground">{achievement.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningJourneyMap;
