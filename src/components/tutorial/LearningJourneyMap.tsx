import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { useTheme } from '@/components/theme/ThemeProvider';

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
      'agent-architecture', 'agent-security', 'multi-agent-systems', 'agent-ethics', 'ai-agents', 'ai-safety-governance',
      'program-setup-north-star', 'responsible-ai-governance',
      // Tier 2: Architecture Concepts  
      'a2a-communication', 'mcp', 'flow-visualization', 'agent-evaluation', 'strategy-portfolio-management',
      // Tier 3: Implementation Concepts
      'acp', 'mcp-a2a-integration', 'data-visualization', 'data-knowledge-operations',
      // Tier 4: Advanced Concepts
      'agent-deployment', 'agent-learning', 'agent-integration', 'fine-tuning', 'agentic-commerce-ap2', 'product-management',
      'agent-ops', 'architecture-platform-operations', 'experimentation-continuous-improvement', 'ecosystem-partnerships', 'organizational-enablement'
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
      {
        id: 'program-setup-north-star',
        title: 'Program Setup & North Star',
        description: 'Align mission, metrics, and maturity before scaling agent initiatives.',
        icon: <Target size={20} />,
        difficulty: 'beginner',
        estimatedTime: '30-40 min',
        prerequisites: ['ai-safety-governance'],
        skills: ['Mission Definition', 'Metric Design', 'Maturity Mapping'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'responsible-ai-governance',
        title: 'Responsible AI Governance Playbooks',
        description: 'Operationalize policy controls, risk reviews, and escalation paths.',
        icon: <Shield size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '35-45 min',
        prerequisites: ['program-setup-north-star'],
        skills: ['Policy Enforcement', 'Risk Assessment', 'Escalation Design'],
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
      {
        id: 'agent-evaluation',
        title: 'Agent Evaluation',
        description: 'Instrument architecture-level signals before user complaints become your metrics.',
        icon: <CheckCircle size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '30-40 min',
        prerequisites: ['agent-architecture'],
        skills: ['Signal Instrumentation', 'Quality Gates', 'Operational Metrics'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'strategy-portfolio-management',
        title: 'Strategy & Portfolio Management',
        description: 'Prioritize high-value agent initiatives with defensible ROI and staging.',
        icon: <TrendUp size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '35-45 min',
        prerequisites: ['agent-architecture', 'agentic-ai-design-taxonomy'],
        skills: ['Opportunity Scoring', 'Roadmapping', 'Portfolio Balancing'],
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
      {
        id: 'data-knowledge-operations',
        title: 'Data & Knowledge Operations',
        description: 'Design trustworthy data supply chains and knowledge governance.',
        icon: <Stack size={20} />,
        difficulty: 'intermediate',
        estimatedTime: '40-50 min',
        prerequisites: ['data-visualization'],
        skills: ['Data Curation', 'Evaluation Suites', 'Knowledge Stewardship'],
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
      {
        id: 'product-management',
        title: 'AI Product Management',
        description: 'Design metrics, experiments & calibrated confidence signals that compound user trust and retention.',
        icon: <ChartBar size={20} />,
        difficulty: 'advanced',
        estimatedTime: '35-45 min',
        prerequisites: ['agentic-ai-design-taxonomy'],
        skills: ['Product Strategy', 'Experimentation', 'Signal Design'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'agent-ops',
        title: 'Agent Ops & Reliability',
        description: 'Operational excellence: golden signals, graceful degradation, failure containment & resilience patterns.',
        icon: <Shield size={20} />,
        difficulty: 'advanced',
        estimatedTime: '35-45 min',
        prerequisites: ['agent-deployment', 'agent-security'],
        skills: ['Reliability Engineering', 'Incident Response', 'Operational Excellence'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'architecture-platform-operations',
        title: 'Architecture & Platform Operations',
        description: 'Scale shared platform services, guardrails, and reference architectures for enterprise-grade agents.',
        icon: <Stack size={20} />,
        difficulty: 'advanced',
        estimatedTime: '40-60 min',
        prerequisites: ['agent-deployment', 'agent-ops'],
        skills: ['Platform Engineering', 'Guardrail Design', 'Scalable Architecture'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'experimentation-continuous-improvement',
        title: 'Experimentation & Continuous Improvement',
        description: 'Stand up evaluation pipelines and feedback loops that keep agents improving after launch.',
        icon: <ChartBar size={20} />,
        difficulty: 'advanced',
        estimatedTime: '35-45 min',
        prerequisites: ['agent-ops', 'agentic-commerce-ap2'],
        skills: ['Experiment Design', 'Feedback Loops', 'Performance Optimization'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'ecosystem-partnerships',
        title: 'Ecosystem & Partnerships',
        description: 'Evaluate vendors and alliances with shared value, compliance, and interoperability in mind.',
        icon: <Users size={20} />,
        difficulty: 'advanced',
        estimatedTime: '30-40 min',
        prerequisites: ['strategy-portfolio-management'],
        skills: ['Vendor Evaluation', 'Partnership Strategy', 'Interoperability'],
        completionRate: 0,
        isCompleted: false,
        isUnlocked: false,
        path: '/concepts'
      },
      {
        id: 'organizational-enablement',
        title: 'Organizational Enablement',
        description: 'Design operating models, talent pathways, and incentives that make agent adoption stick.',
        icon: <Books size={20} />,
        difficulty: 'advanced',
        estimatedTime: '35-45 min',
        prerequisites: ['program-setup-north-star'],
        skills: ['Change Management', 'Talent Development', 'Org Design'],
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
  const tierRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const { isDarkMode } = useTheme();
  const tierLabels = [
    'Tier 0: Core Concepts',
    'Tier 1: Fundamentals',
    'Tier 2: Architecture',
    'Tier 3: Implementation',
    'Tier 4: Advanced'
  ];
  const tiers = [
    ['agentic-ai-design-taxonomy', 'agentic-prompting-fundamentals', 'prompt-optimization-patterns', 'agent-instruction-design', 'agentic-workflow-control', 'agent-evaluation-methodologies'],
    ['agent-architecture', 'agent-security', 'multi-agent-systems', 'agent-ethics', 'ai-agents', 'ai-safety-governance', 'program-setup-north-star', 'responsible-ai-governance'],
    ['a2a-communication', 'mcp', 'flow-visualization', 'agent-evaluation', 'strategy-portfolio-management'],
    ['acp', 'mcp-a2a-integration', 'data-visualization', 'data-knowledge-operations'],
    ['agent-deployment', 'agent-learning', 'agent-integration', 'fine-tuning', 'agentic-commerce-ap2', 'product-management', 'agent-ops', 'architecture-platform-operations', 'experimentation-continuous-improvement', 'ecosystem-partnerships', 'organizational-enablement']
  ];
  const supplementalResourceIds = ['azure-services', 'references', 'community', 'patterns', 'quiz'];

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

  const tierDescriptions = [
    'Prompting, optimization, and evaluation foundations to calibrate your first agents.',
    'Architecture, security, and governance essentials for reliable agent rollouts.',
    'Coordination protocols and visualization patterns to orchestrate multi-agent flows.',
    'Implementation deep dives that wire ACP, MCP, and data pipelines into production.',
    'Advanced operations, commercialization, and organizational scaling strategies.'
  ];

  const tierAccents = [
    { indicator: 'bg-purple-500 border-purple-200 dark:border-purple-500', gradient: 'from-purple-500/25 via-purple-500/10 to-transparent' },
    { indicator: 'bg-blue-500 border-blue-200 dark:border-blue-500', gradient: 'from-blue-500/25 via-blue-500/10 to-transparent' },
    { indicator: 'bg-emerald-500 border-emerald-200 dark:border-emerald-500', gradient: 'from-emerald-500/25 via-emerald-500/10 to-transparent' },
    { indicator: 'bg-amber-500 border-amber-200 dark:border-amber-500', gradient: 'from-amber-500/25 via-amber-500/10 to-transparent' },
    { indicator: 'bg-rose-500 border-rose-200 dark:border-rose-500', gradient: 'from-rose-500/25 via-rose-500/10 to-transparent' }
  ];

  const supplementalResources = supplementalResourceIds
    .map(id => selectedPath.nodes.find(node => node.id === id))
    .filter((node): node is LearningNode => Boolean(node));

  const tierData = tiers.map((tierIds, idx) => {
    const nodes = selectedPath.nodes
      .filter(node => tierIds.includes(node.id))
      .sort((a, b) => {
        const orderA = selectedPath.recommendedOrder.indexOf(a.id);
        const orderB = selectedPath.recommendedOrder.indexOf(b.id);
        const normalizedA = orderA === -1 ? Number.MAX_SAFE_INTEGER : orderA;
        const normalizedB = orderB === -1 ? Number.MAX_SAFE_INTEGER : orderB;

        if (normalizedA === normalizedB) {
          return selectedPath.nodes.findIndex(n => n.id === a.id) - selectedPath.nodes.findIndex(n => n.id === b.id);
        }

        return normalizedA - normalizedB;
      });
    const completed = nodes.filter(node => node.isCompleted).length;
    const percent = nodes.length > 0 ? Math.round((completed / nodes.length) * 100) : 0;
    return {
      index: idx,
      label: tierLabels[idx],
      description: tierDescriptions[idx] || '',
      nodes,
      completed,
      total: nodes.length,
      percent,
      accent: tierAccents[idx] || tierAccents[tierAccents.length - 1]
    };
  });

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

  const overlayClass = isDarkMode ? 'bg-black/70 backdrop-blur-lg' : 'bg-white/75 backdrop-blur-lg';
  const totalCompleted = selectedPath.nodes.filter(node => node.isCompleted).length;
  const overallPercent = Math.round(selectedPath.totalProgress || 0);

  const handleScrollToTier = (idx: number) => {
    setActiveTier(idx);
    requestAnimationFrame(() => {
      const target = tierRefs.current[idx];
      target?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    });
  };

  return (
    <div className={cn("fixed inset-0 z-50 overflow-y-auto", overlayClass)}>
      <div className="min-h-full flex items-center justify-center p-4">
        <Card className="w-full max-w-5xl h-full max-h-[95vh] flex flex-col shadow-2xl border border-primary/10 bg-background/90 dark:bg-background/70 backdrop-blur-xl">
        <CardHeader className="pb-4 flex-shrink-0 border-b border-border/40 bg-background/95 dark:bg-background/60">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent text-primary">
                <Path size={22} weight="bold" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Learning Journey Map</CardTitle>
                <p className="text-sm text-muted-foreground">Follow the six-tier roadmap to design, launch, and scale agentic experiences.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary border border-primary/20">Live roadmap</Badge>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-lg">×</Button>
            </div>
          </div>
          <div className="grid gap-3 mt-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border/60 bg-background/80 dark:bg-background/40 p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs uppercase text-muted-foreground tracking-wide">
                <span>Overall completion</span>
                <span>{overallPercent}%</span>
              </div>
              <Progress value={selectedPath.totalProgress} className="h-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{totalCompleted} of {selectedPath.nodes.length} modules</span>
                <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
            <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs uppercase text-primary tracking-wide">
                <span>Next milestone</span>
                <Target size={16} />
              </div>
              {nextNode ? (
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{nextNode.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{nextNode.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-primary">
                    <span>{nextNode.estimatedTime}</span>
                    <span>•</span>
                    <span className="capitalize">{nextNode.difficulty}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">You’ve completed every milestone—time to mentor others.</p>
              )}
            </div>
            <div className="rounded-xl border border-border/60 bg-background/80 dark:bg-background/40 p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs uppercase text-muted-foreground tracking-wide">
                <span>Achievements unlocked</span>
                <span>{achievements.length}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Sparkle size={16} className="text-yellow-500" />
                <span>{achievements.length > 0 ? achievements[achievements.length - 1].title : 'Keep exploring to earn badges'}</span>
              </div>
              <p className="text-xs text-muted-foreground">Celebrate momentum and earn new badges as you progress.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 p-0">
          <div className="grid h-full min-h-0 lg:grid-cols-[260px_1fr]">
            <aside className="border-r border-border/40 bg-background/80 dark:bg-background/40 hidden lg:block">
              <ScrollArea className="h-full p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Quick navigation</h3>
                    <div className="mt-3 space-y-2">
                      {tierData.map(tier => (
                        <Button
                          key={tier.label}
                          variant={activeTier === tier.index ? 'secondary' : 'ghost'}
                          className={cn('w-full justify-start px-3 py-2 text-left rounded-xl transition', activeTier === tier.index ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:bg-muted/50')}
                          onClick={() => handleScrollToTier(tier.index)}
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold">{tier.label}</span>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{tier.completed}/{tier.total} complete</span>
                              <span>•</span>
                              <span>{tier.percent}%</span>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-background/70 dark:bg-background/50 p-4 space-y-3">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Target size={16} className="text-primary" /> Status legend
                    </h3>
                    <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-emerald-500" />
                        <span>Completed milestone</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        <span>Unlocked milestone</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-border" />
                        <span>Locked until prerequisites finish</span>
                      </div>
                    </div>
                  </div>
                  {achievements.length > 0 && (
                    <div className="rounded-xl border border-border/60 bg-background/70 dark:bg-background/50 p-4 space-y-3">
                      <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground"><Trophy size={16} /> Achievements</h3>
                      <div className="space-y-2">
                        {achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center gap-3 rounded-lg border border-border/40 bg-muted/40 dark:bg-muted/20 px-3 py-2">
                            <span className="text-primary">{achievement.icon}</span>
                            <div>
                              <div className="text-sm font-medium text-foreground">{achievement.title}</div>
                              <div className="text-xs text-muted-foreground">{achievement.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </aside>
            <div className="flex flex-col min-h-0">
              <ScrollArea className="flex-1 h-full px-6 py-6">
                <div className="space-y-8 pb-12">
                  {nextNode && (
                    <section className="rounded-3xl border border-primary/30 bg-gradient-to-r from-primary/15 via-transparent to-transparent p-6 shadow-md">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-xl bg-primary/15 text-primary/90">
                            {nextNode.icon}
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-semibold uppercase tracking-wide text-primary">Recommended next module</p>
                            <h3 className="text-lg font-semibold text-foreground">{nextNode.title}</h3>
                            <p className="text-sm text-muted-foreground max-w-2xl">{nextNode.description}</p>
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                              <Badge className={cn('capitalize', getDifficultyColor(nextNode.difficulty))}>{nextNode.difficulty}</Badge>
                              <Badge variant="outline" className="text-xs">{nextNode.estimatedTime}</Badge>
                              <span className="text-muted-foreground">Tier: {tierData.find(t => t.nodes.some(n => n.id === nextNode.id))?.label}</span>
                              {averageScore > 0 && (
                                <span className="text-muted-foreground">Avg quiz ⌀ {Math.round(averageScore)}%</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button onClick={() => onNavigate(nextNode.path)} className="shrink-0">Launch module</Button>
                      </div>
                    </section>
                  )}

                  {tierData.map(tier => (
                    <section
                      key={tier.label}
                      ref={(node: HTMLDivElement | null) => { tierRefs.current[tier.index] = node; }}
                      onMouseEnter={() => setActiveTier(tier.index)}
                      className={cn(
                        'rounded-3xl border bg-background/90 dark:bg-background/60 transition-shadow duration-300 overflow-hidden shadow-lg',
                        activeTier === tier.index ? 'ring-2 ring-primary/30 shadow-primary/20' : 'ring-1 ring-border/30'
                      )}
                    >
                      <div className={cn('h-1 w-full bg-gradient-to-r', tier.accent.gradient)} />
                      <div className="p-6 space-y-6">
                        <header className="flex flex-wrap items-start justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary" className="rounded-full bg-muted/60 text-muted-foreground">
                                Tier {tier.index + 1}
                              </Badge>
                              <h2 className="text-xl font-semibold text-foreground">{tier.label}</h2>
                            </div>
                            <p className="max-w-2xl text-sm text-muted-foreground">{tier.description}</p>
                          </div>
                          <div className="min-w-[160px] space-y-2">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>Completion</span>
                              <span>{tier.percent}%</span>
                            </div>
                            <Progress value={tier.percent} className="h-2" />
                            <div className="text-xs text-muted-foreground">{tier.completed} of {tier.total} modules complete</div>
                          </div>
                        </header>
                        <div className="relative">
                          <div className={cn('absolute left-[19px] top-2 bottom-2 w-[2px] bg-gradient-to-b', tier.accent.gradient)} />
                          <div className="space-y-6">
                            {tier.nodes.map((node, nodeIdx) => {
                              const status = node.isCompleted ? 'completed' : node.isUnlocked ? 'unlocked' : 'locked';
                              const indicatorClass = status === 'completed'
                                ? 'bg-emerald-500 border-emerald-400 text-white shadow-emerald-400/30'
                                : status === 'unlocked'
                                  ? 'bg-primary text-primary-foreground border-primary/70 shadow-primary/30'
                                  : 'bg-muted text-muted-foreground border-border shadow-none';
                              const globalOrder = selectedPath.recommendedOrder.indexOf(node.id) + 1;
                              const isSupplement = globalOrder <= 0;
                              return (
                                <div key={node.id} className="relative pl-14">
                                  <div className={cn('absolute left-0 top-2 h-10 w-10 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all duration-200', indicatorClass)}>
                                    {status === 'completed' ? <CheckCircle size={18} weight="fill" /> : status === 'unlocked' ? (isSupplement ? 'R' : globalOrder) : <Lock size={16} />}
                                  </div>
                                  <div className="rounded-2xl border border-border/60 bg-background/95 dark:bg-background/70 p-5 shadow-sm hover:shadow-md transition">
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                      <div className="space-y-2 max-w-2xl">
                                        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                          <span>{node.title}</span>
                                          {status === 'completed' && <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/40">Completed</Badge>}
                                        </h3>
                                        <p className="text-base text-muted-foreground leading-7">{node.description}</p>
                                      </div>
                                      <div className="flex flex-col items-end gap-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                          <Badge className={cn('capitalize', getDifficultyColor(node.difficulty))}>{node.difficulty}</Badge>
                                          <Badge variant="outline">{node.estimatedTime}</Badge>
                                        </div>
                                        <span className="text-base font-medium text-foreground">Prerequisites: {node.prerequisites.length > 0 ? node.prerequisites.length : 'None'}</span>
                                      </div>
                                    </div>
                                    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                      <div className="flex items-center gap-2">
                                        <span className="font-semibold text-foreground">Core skills:</span>
                                        <div className="flex flex-wrap gap-2">
                                          {node.skills.slice(0, 4).map(skill => (
                                            <span key={skill} className="rounded-full bg-muted/60 px-3 py-1 text-xs uppercase tracking-wide">{skill}</span>
                                          ))}
                                          {node.skills.length > 4 && <span className="rounded-full bg-muted/40 px-3 py-1 text-xs">+{node.skills.length - 4} more</span>}
                                        </div>
                                      </div>
                                      {node.completionRate > 0 && !node.isCompleted && (
                                        <div className="flex-1 min-w-[160px]">
                                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                                            <span>In progress</span>
                                            <span>{Math.round(node.completionRate)}%</span>
                                          </div>
                                          <Progress value={node.completionRate} className="h-1.5" />
                                        </div>
                                      )}
                                    </div>
                                    {!node.isUnlocked && node.prerequisites.length > 0 && (
                                      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                        <span className="font-semibold text-foreground">Unlock by completing:</span>
                                        {node.prerequisites.map(prereq => {
                                          const prereqNode = selectedPath.nodes.find(n => n.id === prereq);
                                          return (
                                            <span key={prereq} className="rounded-full border border-border/50 px-3 py-1 bg-muted/30 text-sm">
                                              {prereqNode?.title || prereq}
                                            </span>
                                          );
                                        })}
                                      </div>
                                    )}
                                    <div className="mt-5 flex items-center justify-between">
                                      {isSupplement ? (
                                        <div className="flex items-center gap-3 text-base text-muted-foreground">
                                          <Sparkle size={18} className="text-primary" />
                                          <span className="font-medium text-foreground">Supplemental resource</span>
                                        </div>
                                      ) : (
                                        <div className="flex items-center gap-4 text-xl text-muted-foreground">
                                          <Sparkle size={22} className="text-primary" />
                                          <span className="font-semibold text-foreground">Recommended order position #{globalOrder}</span>
                                        </div>
                                      )}
                                      <Button size="sm" onClick={() => onNavigate(node.path)} disabled={!node.isUnlocked} variant={node.isUnlocked ? 'default' : 'outline'}>
                                        {node.isCompleted ? 'Review module' : node.isUnlocked ? 'Open module' : 'Locked'}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </section>
                  ))}

                  {supplementalResources.length > 0 && (
                    <section className="rounded-3xl border border-border/40 bg-background/90 dark:bg-background/60 p-6 shadow-lg space-y-6">
                      <header className="flex flex-wrap items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wide">
                            <Sparkle size={18} className="text-primary" />
                            Supplemental resources
                          </div>
                          <p className="max-w-2xl text-sm text-muted-foreground">
                            Reinforce the main journey with documentation, community support, applied patterns, and quizzes.
                          </p>
                        </div>
                        <Badge variant="secondary" className="rounded-full bg-muted/60 text-muted-foreground">
                          {supplementalResources.length} resources
                        </Badge>
                      </header>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {supplementalResources.map(resource => (
                          <div key={resource.id} className="group rounded-2xl border border-border/60 bg-background/95 dark:bg-background/70 p-5 shadow-sm transition hover:shadow-md">
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-xl bg-muted/60 text-foreground/70 group-hover:text-primary group-hover:bg-primary/10 transition">
                                {resource.icon}
                              </div>
                              <div className="space-y-2">
                                <h3 className="text-lg font-semibold text-foreground">{resource.title}</h3>
                                <p className="text-sm text-muted-foreground leading-6">{resource.description}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Badge variant="outline" className="text-xs">{resource.estimatedTime}</Badge>
                                  <span>•</span>
                                  <span className="capitalize">{resource.difficulty}</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Sparkle size={16} className="text-primary" />
                                <span>Great for reinforcement</span>
                              </div>
                              <Button size="sm" variant="ghost" onClick={() => onNavigate(resource.path)}>
                                Open
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearningJourneyMap;
