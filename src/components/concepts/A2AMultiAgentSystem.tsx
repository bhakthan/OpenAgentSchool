import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Users, Database, Shield, GitCompare } from 'lucide-react';
import { YoutubeLogo, ArrowUpRight } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { conceptSurface, conceptSurfaceSoft, conceptCodeBlock } from './conceptStyles';

interface AnimationStep {
  id: string;
  title: string;
  description: string;
  duration: number;
  highlight: string[];
  message?: string;
  techStack?: string;
  securityNote?: string;
  taskState?: string;
}

// A2A v1.0 Task States
const TASK_STATES = {
  SUBMITTED: { label: 'Submitted', color: 'bg-blue-500', description: 'Task received, queued for processing' },
  WORKING: { label: 'Working', color: 'bg-amber-500', description: 'Agent actively processing the task' },
  INPUT_REQUIRED: { label: 'Input Required', color: 'bg-purple-500', description: 'Agent needs additional input from client' },
  AUTH_REQUIRED: { label: 'Auth Required', color: 'bg-orange-500', description: 'Agent needs authentication/authorization' },
  COMPLETED: { label: 'Completed', color: 'bg-green-500', description: 'Task finished successfully with artifacts' },
  FAILED: { label: 'Failed', color: 'bg-red-500', description: 'Task failed with error' },
  CANCELED: { label: 'Canceled', color: 'bg-gray-500', description: 'Task was canceled by client' },
  REJECTED: { label: 'Rejected', color: 'bg-red-700', description: 'Task rejected by agent (not supported)' },
} as const;

const A2AMultiAgentSystem: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [showRagComparison, setShowRagComparison] = useState(true);
  
  // RAG Evolution animation state
  const [isRagPlaying, setIsRagPlaying] = useState(false);
  const [currentRagStep, setCurrentRagStep] = useState(0);

  const animationSteps: AnimationStep[] = [
    {
      id: 'user-query',
      title: 'Customer Query',
      description: 'Customer asks a complex question requiring both product research and order status',
      message: '"What are the eco-friendly features of the Aqua-Pure X1 water filter, and can you check my latest order status?"',
      duration: 3000,
      highlight: ['user-app', 'customer-service'],
      taskState: 'SUBMITTED'
    },
    {
      id: 'a2a-task-creation',
      title: 'A2A Task Creation',
      description: 'Web app creates task with Customer Service Agent using A2A protocol (v1.0 JSON-RPC binding)',
      techStack: 'A2A SDK - Task lifecycle management with contextId',
      duration: 2500,
      highlight: ['a2a-client', 'customer-service', 'a2a-server'],
      taskState: 'SUBMITTED'
    },
    {
      id: 'genai-pipeline-start',
      title: 'GenAI Pipeline Initialization',
      description: 'Customer Service Agent starts GenAI-processors pipeline for query analysis',
      techStack: 'GenAI-processors - Modular task breakdown',
      duration: 3000,
      highlight: ['genai-pipeline', 'customer-service'],
      taskState: 'WORKING'
    },
    {
      id: 'task-delegation',
      title: 'Task Delegation',
      description: 'Agent delegates product research to Google Gemini Agent and order lookup to OMS Tool Agent',
      techStack: 'A2A Protocol - Inter-agent communication with shared contextId',
      duration: 3500,
      highlight: ['customer-service', 'product-research', 'oms-tool', 'delegation-lines'],
      taskState: 'WORKING'
    },
    {
      id: 'product-research',
      title: 'Product Research',
      description: 'Google Gemini Agent researches eco-friendly features using external knowledge',
      techStack: 'Google Gemini - Advanced research capabilities',
      duration: 4000,
      highlight: ['product-research', 'research-pipeline'],
      taskState: 'WORKING'
    },
    {
      id: 'mcp-auth',
      title: 'MCP Authentication',
      description: 'Customer Service Agent authenticates with Azure MCP Server for secure tool access',
      techStack: 'MCP Protocol - Secure tool authentication',
      securityNote: 'OAuth 2.0 PKCE flow with encrypted session keys',
      duration: 2500,
      highlight: ['mcp-client', 'mcp-server', 'azure-apim'],
      taskState: 'AUTH_REQUIRED'
    },
    {
      id: 'secure-tool-call',
      title: 'Secure Tool Execution',
      description: 'MCP Server executes order lookup via Azure Functions with secure backend access',
      techStack: 'Azure API Management + Functions',
      securityNote: 'Backend endpoints never exposed publicly',
      duration: 3000,
      highlight: ['mcp-server', 'azure-functions', 'order-db'],
      taskState: 'WORKING'
    },
    {
      id: 'response-synthesis',
      title: 'Response Synthesis',
      description: 'Customer Service Agent combines research results and order data into comprehensive response',
      techStack: 'GenAI-processors - Response generation pipeline',
      duration: 3500,
      highlight: ['genai-pipeline', 'customer-service', 'response-synthesis'],
      taskState: 'WORKING'
    },
    {
      id: 'final-response',
      title: 'A2A Response Delivery',
      description: 'Complete response delivered to customer via A2A protocol with artifact',
      message: '"The Aqua-Pure X1 features 99.9% plastic-free construction and energy-efficient filtration. Your order #12345 shipped yesterday - tracking: 1Z999AA10123456784"',
      duration: 4000,
      highlight: ['customer-service', 'a2a-client', 'user-app', 'final-response'],
      taskState: 'COMPLETED'
    }
  ];

  // RAG Evolution animation steps
  const ragAnimationSteps = [
    {
      id: 'user-query-rag',
      title: 'User Query',
      description: 'User sends query to the Agentic RAG system',
      duration: 2000,
      highlight: ['user-component-agentic', 'user-query-path']
    },
    {
      id: 'orchestrator-receives',
      title: 'Orchestrator Receives',
      description: 'Orchestrator Agent receives and analyzes the query',
      duration: 2500,
      highlight: ['orchestrator-component', 'user-query-path']
    },
    {
      id: 'context-sourcing',
      title: 'Parallel Context Sourcing',
      description: 'Orchestrator delegates to specialized agents via A2A and MCP protocols',
      duration: 3000,
      highlight: ['orchestrator-component', 'context-sources', 'sourcing-paths']
    },
    {
      id: 'agents-respond',
      title: 'Agents Gather Context',
      description: 'Product Agent, KB Agent, and OMS Tool Agent return relevant context',
      duration: 3000,
      highlight: ['context-sources', 'return-paths']
    },
    {
      id: 'context-engineering',
      title: 'Context Engineering',
      description: 'Re-rank, filter, summarize, and transform raw context into precision-engineered prompts',
      duration: 3500,
      highlight: ['orchestrator-component', 'engineering-pipeline']
    },
    {
      id: 'generate-response',
      title: 'Generate Response',
      description: 'Generate high-quality response with engineered context and send to user',
      duration: 2500,
      highlight: ['orchestrator-component', 'response-path']
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < animationSteps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, animationSteps[currentStep].duration);
    } else if (currentStep >= animationSteps.length - 1) {
      setIsPlaying(false);
      setShowArchitecture(true);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, animationSteps]);

  // RAG Evolution animation effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRagPlaying && currentRagStep < ragAnimationSteps.length - 1) {
      timer = setTimeout(() => {
        setCurrentRagStep(prev => prev + 1);
      }, ragAnimationSteps[currentRagStep].duration);
    } else if (currentRagStep >= ragAnimationSteps.length - 1) {
      setIsRagPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isRagPlaying, currentRagStep, ragAnimationSteps]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setShowArchitecture(false);
    setShowRagComparison(false);
  };

  const toggleRagComparison = () => {
    setShowRagComparison(!showRagComparison);
  };

  const handleRagPlay = () => {
    setIsRagPlaying(!isRagPlaying);
  };

  const handleRagReset = () => {
    setIsRagPlaying(false);
    setCurrentRagStep(0);
  };

  const currentStepData = animationSteps[currentStep];
  const currentRagStepData = ragAnimationSteps[currentRagStep];

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          <span>Multi-Agent System: A2A, GenAI-processors & MCP</span>
          <Badge className="ring-1 bg-[var(--badge-gray-bg)] ring-[var(--badge-gray-ring)] text-[var(--badge-gray-text)]">Interactive Demo</Badge>
        </CardTitle>
        <p className="text-muted-foreground">
          Watch how Agent-to-Agent communication, GenAI-processors, and Model Context Protocol work together in a real e-commerce scenario
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Control Buttons */}
          <div className="flex gap-2 justify-center">
            <Button onClick={handlePlay} variant="outline" size="sm">
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button onClick={handleReset} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button onClick={toggleRagComparison} variant="outline" size="sm">
              <GitCompare className="w-4 h-4" />
              {showRagComparison ? 'Hide' : 'Show'} RAG Evolution
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="w-full bg-muted text-foreground rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / animationSteps.length) * 100}%` }}
            />
          </div>

          {/* Main Animation Area */}
          <div className="relative">
            <svg
              viewBox="0 0 1400 970"
              className="w-full h-auto border rounded-lg bg-muted text-foreground"
            >
              {/* Define styles for the multi-agent system */}
              <defs>
                <style>
                  {`
                    /* Main containers and boxes - Light mode: monochrome */
                    .box { stroke-width: 2.5; rx: 8; ry: 8; }
                    .azure-box { fill: #f8fafc; stroke: #1e293b; stroke-width: 2.5; }
                    .google-box { fill: #f8fafc; stroke: #1e293b; stroke-width: 2.5; }
                    .user-box { fill: #f8fafc; stroke: #1e293b; stroke-width: 2.5; }
                    .mcp-box { fill: #f8fafc; stroke: #1e293b; stroke-width: 2.5; }

                    /* Cloud shapes - Light mode: subtle gray */
                    .cloud { fill: #ffffff; fill-opacity: 0.8; stroke-width: 2; stroke-dasharray: 4 2; }
                    .azure-cloud { stroke: #475569; }
                    .google-cloud { stroke: #475569; }

                    /* Text styles - Light mode: larger, bolder, high contrast */
                    .title { font-size: 26px; font-weight: 700; fill: #0f172a; }
                    .subtitle { font-size: 20px; font-weight: 600; fill: #0f172a; }
                    .label { font-size: 18px; font-weight: 600; fill: #0f172a; }
                    .icon-label { font-size: 18px; font-weight: 600; fill: #0f172a; }
                    .flow-step-text { font-size: 22px; font-weight: 700; fill: #0f172a; }
                    .protocol-label { font-family: 'Courier New', monospace; font-size: 18px; font-weight: bold; fill: #0f172a; }
                    
                    /* Paths and arrows - Light mode: dark gray */
                    .flow-path { fill: none; stroke: #334155; stroke-width: 2.5; stroke-linecap: round; }
                    .a2a-arrow { stroke: #dc2626; }
                    .mcp-arrow { stroke: #2563eb; }
                    .internal-arrow { stroke: #16a34a; stroke-dasharray: 4 2; }

                    /* Animation ping */
                    .ping { stroke-width: 2; r: 6; }
                    .a2a-ping { fill: #dc2626; stroke: #fff; }
                    .mcp-ping { fill: #2563eb; stroke: #fff; }
                    .genai-ping { fill: #eab308; stroke: #fff; }

                    /* Dark mode overrides - keep colors */
                    @media (prefers-color-scheme: dark) {
                      .title { fill: #f1f5f9; }
                      .subtitle { fill: #e2e8f0; }
                      .label { fill: #cbd5e1; }
                      .icon-label { fill: #cbd5e1; }
                      .flow-step-text { fill: #e2e8f0; }
                      .azure-box { fill: #1e3a8a; stroke: #60a5fa; }
                      .google-box { fill: #166534; stroke: #4ade80; }
                      .user-box { fill: #334155; stroke: #94a3b8; }
                      .mcp-box { fill: #92400e; stroke: #fbbf24; }
                      .cloud { fill: #1e293b; fill-opacity: 0.3; }
                      .azure-cloud { stroke: #60a5fa; }
                      .google-cloud { stroke: #4ade80; }
                    }
                  `}
                </style>
                
                {/* Arrow markers */}
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#555" />
                </marker>
                <marker id="arrowhead-a2a" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#d73d33" />
                </marker>
                <marker id="arrowhead-mcp" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#0078d4" />
                </marker>
                <marker id="arrowhead-internal" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#34a853" />
                </marker>

                {/* Icons */}
                <symbol id="icon-azure" viewBox="0 0 24 24">
                  <path fill="#0078d4" d="M12.44 2.19l-7.5 1.41c-.93.18-1.5 1-1.32 1.93l1.88 9.97c.18.93 1 1.5 1.93 1.32l7.5-1.41c.93-.18 1.5-1 1.32-1.93l-1.88-9.97c-.18-.93-1-1.5-1.93-1.32z"/>
                </symbol>
                <symbol id="icon-google" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12.5C5,8.75 8.36,5.73 12.19,5.73C15.22,5.73 17.02,6.91 17.02,6.91L19.07,4.88C19.07,4.88 16.72,3 12.19,3C6.42,3 2,7.4 2,12.5C2,17.6 6.42,22 12.19,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.9 21.35,11.1 21.35,11.1V11.1Z" />
                </symbol>
                <symbol id="icon-a2a" viewBox="0 0 24 24">
                  <path fill="#d73d33" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M8,7.5L13,12.5L11,14.5L6,9.5M16,16.5L11,11.5L13,9.5L18,14.5" />
                </symbol>
                <symbol id="icon-genai-proc" viewBox="0 0 24 24">
                  <path fill="#ffca28" d="M12,2L2,7V17L12,22L22,17V7L12,2M11,15.5V11H8.5L12.5,7V11H15L11,15.5Z" />
                </symbol>
                <symbol id="icon-mcp" viewBox="0 0 24 24">
                   <path fill="#0078d4" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7A3,3 0 0,1 15,10A3,3 0 0,1 12,13A3,3 0 0,1 9,10A3,3 0 0,1 12,7M12,14C14.67,14 17,15.33 17,17V18H7V17C7,15.33 9.33,14 12,14Z" />
                </symbol>
                <symbol id="icon-db" viewBox="0 0 24 24">
                    <path fill="#777" d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z" />
                </symbol>
              </defs>

              {/* Main Title */}
              <rect x="100" y="10" width="1200" height="40" fill="white" fillOpacity="0.9" rx="4" className="dark:fill-slate-800 dark:fill-opacity-90" />
              <text x="700" y="35" textAnchor="middle" className="title">
                E-commerce Multi-Agent System: A2A, GenAI-processors, and MCP in Action
              </text>

              {/* User / Web App Lane */}
              <g id="user-lane">
                <rect x="20" y="70" width="280" height="840" className="box user-box" fillOpacity="0.2"/>
                <text x="160" y="100" textAnchor="middle" className="subtitle">User / Web App</text>
                <text x="160" y="180" textAnchor="middle" className="label">A2A Client</text>
                <rect x="70" y="200" width="180" height="80" fill="white" className="box user-box"/>
                <text x="160" y="245" textAnchor="middle" className="label" fontWeight="bold">Web Frontend</text>
                
                {/* Query text */}
                <text x="160" y="320" textAnchor="middle" className="flow-step-text" opacity={currentStepData.highlight.includes('user-app') ? 1 : 0.3}>
                  1. User asks complex query
                </text>
                <text x="160" y="800" textAnchor="middle" className="flow-step-text" opacity={currentStepData.highlight.includes('final-response') ? 1 : 0.3}>
                  12. Agent sends final message
                </text>
                <text x="160" y="820" textAnchor="middle" className="flow-step-text" opacity={currentStepData.highlight.includes('final-response') ? 1 : 0.3}>
                  and completes task
                </text>
              </g>

              {/* Azure AI Agent Lane */}
              <g id="azure-agent-lane">
                <path className="cloud azure-cloud" d="M 340 70 Q 320 70 320 90 L 320 870 Q 320 890 340 890 L 600 890 Q 620 890 620 870 L 620 90 Q 620 70 600 70 Z" />
                <text x="480" y="100" textAnchor="middle" className="subtitle">Azure AI Agent</text>
                <rect x="340" y="120" width="280" height="400" className="box azure-box"/>
                <text x="480" y="145" textAnchor="middle" className="label" fontWeight="bold">Customer Service Agent</text>
                <use href="#icon-azure" x="350" y="127" width="24" height="24" />
                
                {/* A2A SDK Server */}
                <rect x="370" y="170" width="220" height="70" fill="white" className="box azure-box" />
                <use href="#icon-a2a" x="380" y="180" width="24" height="24" />
                <text x="410" y="200" className="icon-label">A2A SDK Server</text>
                <text x="380" y="225" className="label" fontSize="12">Handles task lifecycle</text>

                {/* GenAI-processors Pipeline */}
                <rect x="370" y="260" width="220" height="110" fill="white" className="box azure-box" />
                <use href="#icon-genai-proc" x="380" y="270" width="24" height="24" />
                <text x="410" y="285" className="icon-label">GenAI-processors Pipeline</text>
                <text x="380" y="305" className="label" fontSize="12">1. Triage Request</text>
                <text x="380" y="325" className="label" fontSize="12">2. Delegate/Use Tools (A2A/MCP Client)</text>
                <text x="380" y="345" className="label" fontSize="12">3. Synthesize Final Response</text>

                {/* Agent Acts As Client */}
                <rect x="370" y="390" width="220" height="110" fill="white" className="box azure-box" />
                <text x="480" y="410" textAnchor="middle" className="label" fontWeight="bold">Agent Acts As Client</text>
                <use href="#icon-a2a" x="380" y="430" width="24" height="24" />
                <text x="410" y="445" className="icon-label">A2A Client (for delegation)</text>
                <use href="#icon-mcp" x="380" y="465" width="24" height="24" />
                <text x="410" y="480" className="icon-label">MCP Client (for tools)</text>
                
                {/* Flow step labels */}
                <text x="480" y="550" textAnchor="middle" className="flow-step-text" opacity={currentStepData.highlight.includes('a2a-server') ? 1 : 0.3}>
                  2. createTask
                </text>
                <text x="480" y="600" textAnchor="middle" className="flow-step-text" opacity={currentStepData.highlight.includes('genai-pipeline') ? 1 : 0.3}>
                  3. Triage request
                </text>
                <text x="480" y="750" textAnchor="middle" className="flow-step-text" opacity={currentStepData.highlight.includes('response-synthesis') ? 1 : 0.3}>
                  11. Synthesize final answer
                </text>
              </g>
              
              {/* Google Gemini Agent Lane */}
              <g id="google-agent-lane">
                <path className="cloud google-cloud" d="M 650 70 Q 630 70 630 90 L 630 870 Q 630 890 650 890 L 910 890 Q 930 890 930 870 L 930 90 Q 930 70 910 70 Z" />
                <text x="790" y="100" textAnchor="middle" className="subtitle">Google Gemini Agent</text>
                <rect x="650" y="120" width="280" height="200" className="box google-box"/>
                <text x="790" y="145" textAnchor="middle" className="label" fontWeight="bold">Product Research Agent</text>
                <use href="#icon-google" x="660" y="127" width="24" height="24" />

                {/* A2A SDK Server */}
                <rect x="680" y="170" width="220" height="60" fill="white" className="box google-box" />
                <use href="#icon-a2a" x="690" y="180" width="24" height="24" />
                <text x="720" y="200" className="icon-label">A2A SDK Server</text>

                {/* ResearchAgent Pipeline */}
                <rect x="680" y="240" width="220" height="60" fill="white" className="box google-box" />
                <use href="#icon-genai-proc" x="690" y="250" width="24" height="24" />
                <text x="720" y="270" className="icon-label">ResearchAgent Pipeline</text>
                
                {/* Flow step labels */}
                <text x="625" y="350" textAnchor="end" className="flow-step-text" opacity={currentStepData.highlight.includes('delegation-lines') ? 1 : 0.3}>
                  4. Delegate research sub-task
                </text>
                <text x="790" y="380" textAnchor="middle" className="flow-step-text" opacity={currentStepData.highlight.includes('product-research') ? 1 : 0.3}>
                  5. Gemini researches product
                </text>
                <text x="625" y="410" textAnchor="end" className="flow-step-text" opacity={currentStepData.highlight.includes('product-research') ? 1 : 0.3}>
                  6. Send research results
                </text>
              </g>

              {/* Azure MCP Tool Agent Lane */}
              <g id="mcp-lane">
                <path className="cloud azure-cloud" d="M 960 70 Q 940 70 940 90 L 940 870 Q 940 890 960 890 L 1220 890 Q 1240 890 1240 870 L 1240 90 Q 1240 70 1220 70 Z" />
                <text x="1100" y="100" textAnchor="middle" className="subtitle">Azure Tool Agent</text>
                <rect x="960" y="120" width="280" height="380" className="box azure-box"/>
                <text x="1100" y="145" textAnchor="middle" className="label" fontWeight="bold">OMS Tool Agent</text>
                <use href="#icon-azure" x="970" y="127" width="24" height="24" />

                {/* MCP Server */}
                <rect x="990" y="170" width="220" height="150" fill="white" className="box azure-box" />
                <use href="#icon-mcp" x="1000" y="180" width="24" height="24" />
                <text x="1030" y="195" className="icon-label">MCP Server</text>
                <text x="1000" y="215" className="label" fontSize="12" fontWeight="bold">Azure API Management</text>
                <text x="1000" y="235" className="label" fontSize="12">- OAuth/AuthZ Endpoint</text>
                <text x="1000" y="255" className="label" fontSize="12">- Session Key Encryption</text>
                <text x="1000" y="275" className="label" fontSize="12">- MCP SSE/Message Endpoints</text>
                <text x="1000" y="295" className="label" fontSize="12">- Secure Backend Proxy</text>
                
                {/* Azure Function Tool */}
                <rect x="990" y="340" width="220" height="60" fill="white" className="box azure-box" />
                <text x="1000" y="360" className="label" fontSize="12" fontWeight="bold">Azure Function Tool</text>
                <text x="1000" y="380" className="label" fontSize="12">(e.g., getOrderStatus)</text>
                
                {/* Order DB */}
                <use href="#icon-db" x="1084" y="420" width="32" height="32" />
                <text x="1100" y="470" textAnchor="middle" className="label">Order DB</text>
                
                {/* Flow step labels */}
                <text x="790" y="550" className="flow-step-text" opacity={currentStepData.highlight.includes('mcp-auth') ? 1 : 0.3}>
                  7. Auth for OMS tool
                </text>
                <text x="790" y="580" className="flow-step-text" opacity={currentStepData.highlight.includes('mcp-auth') ? 1 : 0.3}>
                  8. Get Session Key
                </text>
                <text x="1100" y="390" textAnchor="middle" className="flow-step-text" opacity={currentStepData.highlight.includes('azure-functions') ? 1 : 0.3}>
                  9. Call getOrderStatus
                </text>
                <text x="1100" y="500" textAnchor="middle" className="flow-step-text" opacity={currentStepData.highlight.includes('order-db') ? 1 : 0.3}>
                  Query DB
                </text>
                <text x="800" y="650" className="flow-step-text" opacity={currentStepData.highlight.includes('azure-functions') ? 1 : 0.3}>
                  10. Return order status
                </text>
              </g>
              
              {/* Flow Paths */}
              <g>
                {/* 1. User -> Azure Agent (A2A) */}
                <path className="flow-path a2a-arrow" markerEnd="url(#arrowhead-a2a)" d="M 255, 240 C 300, 240, 320, 195, 365, 195"
                  opacity={currentStepData.highlight.includes('user-app') && currentStepData.highlight.includes('customer-service') ? 1 : 0.3}/>
                <text x="325" y="225" className="protocol-label a2a-arrow" opacity={currentStepData.highlight.includes('user-app') && currentStepData.highlight.includes('customer-service') ? 1 : 0.3}>A2A</text>
                
                {/* 2. Azure Agent Triage (GenAI-processors) */}
                <path className="flow-path internal-arrow" markerEnd="url(#arrowhead-internal)" d="M 480, 240 V 275"
                  opacity={currentStepData.highlight.includes('genai-pipeline') ? 1 : 0.3}/>
                
                {/* 3. Delegation to Google Agent (A2A) */}
                <path className="flow-path a2a-arrow" markerEnd="url(#arrowhead-a2a)" d="M 600, 285 C 620, 285, 630, 195, 675, 195"
                  opacity={currentStepData.highlight.includes('delegation-lines') ? 1 : 0.3}/>
                <text x="630" y="240" className="protocol-label a2a-arrow" opacity={currentStepData.highlight.includes('delegation-lines') ? 1 : 0.3}>A2A</text>
                
                {/* 4. Google Agent processes and responds (A2A) */}
                <path className="flow-path a2a-arrow" markerEnd="url(#arrowhead-a2a)" d="M 675, 295 C 630, 295, 620, 335, 600, 335"
                  opacity={currentStepData.highlight.includes('product-research') ? 1 : 0.3}/>
                
                {/* 5. Tool use: Azure Agent -> MCP (MCP Auth) */}
                <path className="flow-path mcp-arrow" markerEnd="url(#arrowhead-mcp)" d="M 600, 470 C 700, 470, 900, 245, 985, 245"
                  opacity={currentStepData.highlight.includes('mcp-client') && currentStepData.highlight.includes('mcp-server') ? 1 : 0.3}/>
                <path className="flow-path mcp-arrow" markerEnd="url(#arrowhead-mcp)" d="M 985, 255 C 900, 255, 700, 480, 600, 480"
                  opacity={currentStepData.highlight.includes('mcp-client') && currentStepData.highlight.includes('mcp-server') ? 1 : 0.3}/>
                <text x="760" y="465" className="protocol-label mcp-arrow" opacity={currentStepData.highlight.includes('mcp-client') && currentStepData.highlight.includes('mcp-server') ? 1 : 0.3}>MCP Auth</text>

                {/* 6. MCP Tool Call */}
                <path className="flow-path mcp-arrow" markerEnd="url(#arrowhead-mcp)" d="M 1215, 250 H 1250 V 360 H 1215"
                  opacity={currentStepData.highlight.includes('azure-functions') ? 1 : 0.3}/>
                
                {/* 7. Internal DB query */}
                <path className="flow-path internal-arrow" markerEnd="url(#arrowhead-internal)" d="M 1100, 400 V 420"
                  opacity={currentStepData.highlight.includes('order-db') ? 1 : 0.3}/>

                {/* 8. MCP Tool Response */}
                <path className="flow-path mcp-arrow" markerEnd="url(#arrowhead-mcp)" d="M 985, 370 C 900, 370, 700, 490, 600, 490"
                  opacity={currentStepData.highlight.includes('azure-functions') ? 1 : 0.3}/>
                
                {/* 9. Azure Agent Synthesize */}
                <path className="flow-path internal-arrow" markerEnd="url(#arrowhead-internal)" d="M 480, 370 V 335"
                  opacity={currentStepData.highlight.includes('response-synthesis') ? 1 : 0.3}/>
                
                {/* 10. Final Response to User */}
                <path className="flow-path a2a-arrow" markerEnd="url(#arrowhead-a2a)" d="M 365, 205 C 320, 205, 300, 250, 255, 250"
                  opacity={currentStepData.highlight.includes('final-response') ? 1 : 0.3}/>
                <text x="325" y="270" className="protocol-label a2a-arrow" opacity={currentStepData.highlight.includes('final-response') ? 1 : 0.3}>A2A</text>
              </g>

              {/* Animation Ping */}
              {isPlaying && (
                <circle className="ping" opacity={0.8}>
                  <animate attributeName="r" values="4;8;4" dur="1s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1s" repeatCount="indefinite"/>
                  <animateMotion dur="1.5s" fill="freeze">
                    <mpath href={`#current-step-${currentStep}`}/>
                  </animateMotion>
                </circle>
              )}
              
              {/* Legend */}
              <g transform="translate(20, 920)">
                <text x="0" y="15" fontWeight="bold" fontSize="20" className="label">Legend:</text>
                <use href="#icon-a2a" x="90" y="0" width="24" height="24" />
                <text x="120" y="15" className="label" fontSize="18">A2A Protocol</text>
                <use href="#icon-genai-proc" x="260" y="0" width="24" height="24" />
                <text x="290" y="15" className="label" fontSize="18">GenAI-processors</text>
                <use href="#icon-mcp" x="460" y="0" width="24" height="24" />
                <text x="490" y="15" className="label" fontSize="18">Model Context Protocol (MCP)</text>
                <rect x="720" y="3" width="28" height="14" className="user-box" strokeWidth="2"/>
                <text x="755" y="15" className="label" fontSize="18">User/Client Components</text>
                <rect x="990" y="3" width="28" height="14" className="azure-box" strokeWidth="2"/>
                <text x="1025" y="15" className="label" fontSize="18">Azure Components</text>
                <rect x="1210" y="3" width="28" height="14" className="google-box" strokeWidth="2"/>
                <text x="1245" y="15" className="label" fontSize="18">Google Components</text>
              </g>
            </svg>
          </div>

          {/* Step Information */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={conceptSurfaceSoft('p-4 space-y-3')}
            >
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Step {currentStep + 1}</Badge>
                <h3 className="font-semibold">{currentStepData.title}</h3>
              </div>
              <p className="text-lg text-muted-foreground mb-3">{currentStepData.description}</p>
              
              {currentStepData.message && (
                <div className={conceptSurfaceSoft('p-3 border border-border/50')}>
                  <p className="text-base"><strong>Message:</strong> {currentStepData.message}</p>
                </div>
              )}

              {currentStepData.techStack && (
                <div className={conceptSurfaceSoft('p-3 border border-border/50')}>
                  <p className="text-base"><strong>Technology:</strong> {currentStepData.techStack}</p>
                </div>
              )}

              {currentStepData.securityNote && (
                <div className={conceptSurfaceSoft('p-3 border border-red-200/60 dark:border-red-400/40')}>
                  <div className="flex items-center gap-2 text-base">
                    <Shield className="w-4 h-4 text-red-500" />
                    <span><strong>Security:</strong> {currentStepData.securityNote}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* RAG Evolution Comparison */}
          <AnimatePresence>
            {showRagComparison && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-8"
              >
                <Card className="border-amber-200 dark:border-amber-800">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <GitCompare className="w-5 h-5 text-amber-600" />
                      The Evolution of RAG: From Monolithic to Agentic
                    </CardTitle>
                    <p className="text-muted-foreground">
                      See how multi-agent systems transform traditional RAG into sophisticated Context Engineering
                    </p>
                  </CardHeader>
                  <CardContent>
                    {/* RAG Animation Controls */}
                    <div className="space-y-4 mb-6">
                      <div className="flex gap-2 justify-center">
                        <Button onClick={handleRagPlay} variant="outline" size="sm">
                          {isRagPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          {isRagPlaying ? 'Pause' : 'Play'} Animation
                        </Button>
                        <Button onClick={handleRagReset} variant="outline" size="sm">
                          <RotateCcw className="w-4 h-4" />
                          Reset
                        </Button>
                      </div>

                      {/* Progress Indicator */}
                      <div className="w-full bg-muted text-foreground rounded-full h-2">
                        <div 
                          className="bg-amber-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${((currentRagStep + 1) / ragAnimationSteps.length) * 100}%` }}
                        />
                      </div>

                      {/* Current Step Info */}
                      <div className="text-center space-y-1">
                        <div className="text-sm font-semibold text-amber-600">
                          Step {currentRagStep + 1} of {ragAnimationSteps.length}: {currentRagStepData.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {currentRagStepData.description}
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <svg
                        width="1600"
                        height="1000"
                        viewBox="0 0 1600 1000"
                        className="w-full h-auto border rounded-lg bg-muted text-foreground"
                      >
                        {/* SVG Content */}
                        <defs>
                          <style>
                            {`
                              /* Light mode - monochrome, high contrast */
                              .box { stroke-width: 2.5; rx: 8; ry: 8; }
                              .azure-box { fill: #f8fafc; stroke: #1e293b; }
                              .google-box { fill: #f8fafc; stroke: #1e293b; }
                              .user-box { fill: #f8fafc; stroke: #1e293b; }
                              .rag-box { fill: #f8fafc; stroke: #1e293b; }
                              .mono-box { fill: #f8fafc; stroke: #1e293b; }

                              /* Text styles - larger and bolder */
                              .main-title { font-size: 26px; font-weight: 700; text-anchor: middle; fill: #0f172a; }
                              .section-title { font-size: 22px; font-weight: 700; text-anchor: middle; fill: #0f172a; }
                              .subtitle { font-size: 18px; font-weight: 600; fill: #0f172a; }
                              .label { font-size: 18px; font-weight: 600; fill: #0f172a; }
                              .sub-label { font-size: 16px; font-weight: 500; fill: #0f172a; }
                              .icon-label { font-size: 18px; font-weight: 600; fill: #0f172a; }
                              .flow-step-text { font-size: 22px; font-weight: 700; fill: #0f172a; }
                              .protocol-label { font-family: 'Courier New', monospace; font-size: 18px; font-weight: bold; fill: #0f172a; }
                              
                              /* Paths and arrows - dark gray */
                              .flow-path { fill: none; stroke: #334155; stroke-width: 2.5; stroke-linecap: round; marker-end: url(#arrowhead-rag); }
                              .a2a-arrow { stroke: #dc2626; }
                              .mcp-arrow { stroke: #2563eb; }
                              .internal-arrow { stroke: #16a34a; }
                              .rag-arrow { stroke: #64748b; stroke-dasharray: 4 2; }

                              /* Animation ping */
                              .ping { stroke-width: 2.5; }
                              .user-ping { fill: #ef4444; stroke: #fff; }
                              .rag-ping { fill: #f59e0b; stroke: #fff; }
                              .genai-ping { fill: #10b981; stroke: #fff; }

                              /* Dark mode overrides - keep colors */
                              @media (prefers-color-scheme: dark) {
                                .main-title { fill: #f1f5f9; }
                                .section-title { fill: #e2e8f0; }
                                .subtitle { fill: #cbd5e1; }
                                .label { fill: #94a3b8; }
                                .sub-label { fill: #64748b; }
                                .icon-label { fill: #cbd5e1; }
                                .flow-step-text { fill: #e2e8f0; }
                                .azure-box { fill: #1e3a8a; stroke: #60a5fa; }
                                .google-box { fill: #166534; stroke: #4ade80; }
                                .user-box { fill: #334155; stroke: #94a3b8; }
                                .rag-box { fill: #92400e; stroke: #fbbf24; }
                                .mono-box { fill: #374151; stroke: #9ca3af; }
                              }
                            `}
                          </style>
                          <marker id="arrowhead-rag" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#555" />
                          </marker>
                          
                          {/* Icons */}
                          <symbol id="icon-azure-rag" viewBox="0 0 24 24">
                            <path fill="#0078d4" d="M12.44 2.19l-7.5 1.41c-.93.18-1.5 1-1.32 1.93l1.88 9.97c.18.93 1 1.5 1.93 1.32l7.5-1.41c.93-.18 1.5-1 1.32-1.93l-1.88-9.97c-.18-.93-1-1.5-1.93-1.32z"/>
                          </symbol>
                          <symbol id="icon-google-rag" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12.5C5,8.75 8.36,5.73 12.19,5.73C15.22,5.73 17.02,6.91 17.02,6.91L19.07,4.88C19.07,4.88 16.72,3 12.19,3C6.42,3 2,7.4 2,12.5C2,17.6 6.42,22 12.19,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.9 21.35,11.1 21.35,11.1V11.1Z" />
                          </symbol>
                          <symbol id="icon-a2a-rag" viewBox="0 0 24 24">
                            <path fill="#d73d33" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M8,7.5L13,12.5L11,14.5L6,9.5M16,16.5L11,11.5L13,9.5L18,14.5" />
                          </symbol>
                          <symbol id="icon-genai-proc-rag" viewBox="0 0 24 24">
                            <path fill="#10b981" d="M12,2L2,7V17L12,22L22,17V7L12,2M11,15.5V11H8.5L12.5,7V11H15L11,15.5Z" />
                          </symbol>
                          <symbol id="icon-mcp-rag" viewBox="0 0 24 24">
                            <path fill="#0078d4" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7A3,3 0 0,1 15,10A3,3 0 0,1 12,13A3,3 0 0,1 9,10A3,3 0 0,1 12,7M12,14C14.67,14 17,15.33 17,17V18H7V17C7,15.33 9.33,14 12,14Z" />
                          </symbol>
                          <symbol id="icon-db-rag" viewBox="0 0 24 24">
                            <path fill="#777" d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z" />
                          </symbol>
                          <symbol id="icon-user-rag" viewBox="0 0 24 24">
                            <path fill="#b91c1c" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                          </symbol>
                        </defs>

                        {/* Main Title */}
                        <rect x="100" y="10" width="1400" height="50" fill="white" fillOpacity="0.95" rx="4" className="dark:fill-slate-800 dark:fill-opacity-90" />
                        <text x="800" y="40" className="main-title">The Evolution of RAG: From Monolithic Chatbots to Agentic Ecosystems</text>
                        <line x1="10" y1="70" x2="1590" y2="70" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5"/>
                        <line x1="800" y1="70" x2="800" y2="980" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5"/>

                        {/* LEFT SIDE: Traditional RAG */}
                        <g id="traditional-rag">
                          <rect x="50" y="85" width="700" height="35" fill="white" fillOpacity="0.9" rx="4" className="dark:fill-slate-800 dark:fill-opacity-80" />
                          <text x="400" y="110" className="section-title">THEN: Traditional RAG</text>
                          
                          {/* Components */}
                          <rect x="50" y="200" width="150" height="70" className="box user-box"/>
                          <use href="#icon-user-rag" x="65" y="215" width="24" height="24"/>
                          <text x="125" y="240" textAnchor="middle" className="subtitle" fontSize="20">User</text>

                          <rect x="325" y="300" width="250" height="180" className="box mono-box"/>
                          <text x="450" y="325" textAnchor="middle" className="subtitle" fontSize="20">Monolithic RAG Chatbot</text>
                          <text x="450" y="360" textAnchor="middle" className="label" fontSize="18">1. Retrieve from DB</text>
                          <text x="450" y="380" textAnchor="middle" className="label" fontSize="18">2. Simple Context Stuffing</text>
                          <text x="450" y="400" textAnchor="middle" className="label" fontSize="18">3. Generate Answer</text>
                          <text x="450" y="435" textAnchor="middle" className="sub-label" fontSize="17" style={{fill: '#dc2626'}}>✗ Limited sources</text>
                          <text x="450" y="450" textAnchor="middle" className="sub-label" fontSize="17" style={{fill: '#dc2626'}}>✗ Noisy context, prone to errors</text>

                          <rect x="50" y="550" width="150" height="70" className="box rag-box"/>
                          <use href="#icon-db-rag" x="65" y="565" width="24" height="24"/>
                          <text x="125" y="590" textAnchor="middle" className="subtitle" fontSize="20">Vector DB</text>

                          {/* Flow Paths */}
                          <path className="flow-path rag-arrow" d="M 125,275 V 360 C 125,400 250,420 320,420"/>
                          <path className="flow-path rag-arrow" d="M 125,545 V 460 C 125,440 250,440 320,440"/>
                          <path className="flow-path rag-arrow" d="M 320,360 C 250,360 125,380 125,380 V 545"/>
                          <path className="flow-path rag-arrow" d="M 320,380 C 250,380 125,360 125,360 V 275"/>
                          
                          {/* Static Labels */}
                          <text className="label" x="240" y="300" textAnchor="middle" fontSize="18">1. User sends query</text>
                          <text className="label" x="240" y="490" textAnchor="middle" fontSize="18">2. Naive retrieval</text>
                          <text className="label" x="240" y="340" textAnchor="middle" fontSize="18">3. Generate & Reply</text>
                        </g>

                        {/* RIGHT SIDE: Agentic RAG */}
                        <g id="agentic-rag">
                          <rect x="850" y="85" width="700" height="35" fill="white" fillOpacity="0.9" rx="4" className="dark:fill-slate-800 dark:fill-opacity-80" />
                          <text x="1200" y="110" className="section-title">NOW: Agentic RAG with Context Engineering</text>

                          {/* Components */}
                          <g id="user-component-agentic" opacity={currentRagStepData.highlight.includes('user-component-agentic') ? 1 : 0.4}>
                            <rect x="850" y="200" width="150" height="70" className="box user-box"
                              stroke={currentRagStepData.highlight.includes('user-component-agentic') ? '#f59e0b' : undefined}
                              strokeWidth={currentRagStepData.highlight.includes('user-component-agentic') ? '3.5' : undefined}
                            />
                            <use href="#icon-user-rag" x="865" y="215" width="24" height="24"/>
                            <text x="925" y="240" textAnchor="middle" className="subtitle" fontSize="20">User</text>
                          </g>
                          
                          <g id="orchestrator-component" opacity={currentRagStepData.highlight.includes('orchestrator-component') ? 1 : 0.4}>
                            <rect x="1050" y="280" width="300" height="400" className="box azure-box"
                              stroke={currentRagStepData.highlight.includes('orchestrator-component') ? '#f59e0b' : undefined}
                              strokeWidth={currentRagStepData.highlight.includes('orchestrator-component') ? '3.5' : undefined}
                            />
                            <use href="#icon-azure-rag" x="1060" y="290" width="24" height="24"/>
                            <text x="1200" y="310" textAnchor="middle" className="subtitle" fontSize="20">Orchestrator Agent</text>
                            <text x="1200" y="330" textAnchor="middle" className="sub-label" fontSize="17">(e.g., Azure AI Agent Service)</text>

                            <rect id="engineering-pipeline" x="1070" y="350" width="260" height="310" fill="#fff" className="box azure-box" strokeDasharray="3 3"
                              stroke={currentRagStepData.highlight.includes('engineering-pipeline') ? '#f59e0b' : undefined}
                              strokeWidth={currentRagStepData.highlight.includes('engineering-pipeline') ? '3.5' : undefined}
                            />
                            <text x="1200" y="370" textAnchor="middle" className="label" fontSize="18" fontWeight="bold">Context Engineering Pipeline</text>
                            <use href="#icon-genai-proc-rag" x="1075" y="352" width="24" height="24"/>
                            <text x="1105" y="368" className="icon-label" fontSize="18" fill="#10b981">GenAI-processors</text>

                            <text x="1080" y="405" className="label" fontSize="18" fontWeight="600">1. Context Sourcing:</text>
                            <text x="1090" y="425" className="sub-label" fontSize="17">- Delegate to Agents (A2A)</text>
                            <text x="1090" y="440" className="sub-label" fontSize="17">- Call Secure Tools (MCP)</text>
                            
                            <text x="1080" y="475" className="label" fontSize="18" fontWeight="600">2. Context Engineering:</text>
                            <rect x="1090" y="495" width="220" height="120" className="box azure-box" rx="4" fillOpacity="0.3" />
                            <text x="1200" y="515" textAnchor="middle" className="sub-label" fontSize="17">Re-rank & Filter</text>
                            <text x="1200" y="535" textAnchor="middle" className="sub-label" fontSize="17">Summarize & Condense</text>
                            <text x="1200" y="555" textAnchor="middle" className="sub-label" fontSize="17">Transform (e.g., to JSON)</text>
                            <text x="1200" y="575" textAnchor="middle" className="sub-label" fontSize="17">Add Negative Evidence</text>
                            
                            <text x="1080" y="640" className="label" fontSize="18" fontWeight="600">3. Generate w/ LLM</text>
                          </g>

                          <g id="context-sources" opacity={currentRagStepData.highlight.includes('context-sources') ? 1 : 0.4}>
                            <rect x="850" y="720" width="700" height="230" className="box" fill="transparent" strokeOpacity="0.2" strokeDasharray="4 4" rx="8"
                              stroke={currentRagStepData.highlight.includes('context-sources') ? '#f59e0b' : 'currentColor'}
                              strokeWidth={currentRagStepData.highlight.includes('context-sources') ? '3' : '1'}
                            />
                            <text x="1200" y="745" textAnchor="middle" className="subtitle" fontSize="20">Context Sources</text>

                            <rect x="870" y="770" width="200" height="150" className="box google-box"/>
                            <use href="#icon-google-rag" x="880" y="780" width="24" height="24"/>
                            <text x="970" y="795" textAnchor="middle" className="label" fontSize="18">Product Agent</text>
                            <text x="970" y="810" textAnchor="middle" className="sub-label" fontSize="17">(Google AI Foundry)</text>
                            <use href="#icon-a2a-rag" x="960" y="830" width="20" height="20" />
                            <text x="970" y="860" textAnchor="middle" className="protocol-label a2a-arrow" fontSize="18">A2A</text>

                            <rect x="1100" y="770" width="200" height="150" className="box azure-box"/>
                            <use href="#icon-azure-rag" x="1110" y="780" width="24" height="24"/>
                            <text x="1200" y="795" textAnchor="middle" className="label" fontSize="18">KB Agent</text>
                            <text x="1200" y="810" textAnchor="middle" className="sub-label" fontSize="17">(Azure AI Search)</text>
                            <use href="#icon-a2a-rag" x="1190" y="830" width="20" height="20" />
                            <text x="1200" y="860" textAnchor="middle" className="protocol-label a2a-arrow" fontSize="18">A2A</text>
                            
                            <rect x="1330" y="770" width="200" height="150" className="box azure-box"/>
                            <use href="#icon-azure-rag" x="1340" y="780" width="24" height="24"/>
                            <text x="1430" y="795" textAnchor="middle" className="label" fontSize="18">OMS Tool Agent</text>
                            <text x="1430" y="810" textAnchor="middle" className="sub-label" fontSize="17">(Azure Functions)</text>
                            <use href="#icon-mcp-rag" x="1420" y="830" width="20" height="20" />
                            <text x="1430" y="860" textAnchor="middle" className="protocol-label mcp-arrow" fontSize="18">MCP</text>
                          </g>

                          {/* Agentic Flow Paths */}
                          <g id="user-query-path" opacity={currentRagStepData.highlight.includes('user-query-path') ? 1 : 0.3}>
                            <path className="flow-path a2a-arrow" d="M 925,275 V 350 C 925,400 1000,410 1065,410"/>
                          </g>
                          
                          <g id="sourcing-paths" opacity={currentRagStepData.highlight.includes('sourcing-paths') ? 1 : 0.3}>
                            <path className="flow-path a2a-arrow" d="M 1200,685 V 770 H 970"/>
                            <path className="flow-path a2a-arrow" d="M 1200,685 V 770"/>
                            <path className="flow-path mcp-arrow" d="M 1200,685 V 770 H 1430"/>
                          </g>
                          
                          <g id="return-paths" opacity={currentRagStepData.highlight.includes('return-paths') ? 1 : 0.3}>
                            <path className="flow-path a2a-arrow" d="M 970,770 H 1200 V 685"/>
                            <path className="flow-path a2a-arrow" d="M 1200,770 V 685"/>
                            <path className="flow-path mcp-arrow" d="M 1430,770 H 1200 V 685"/>
                          </g>
                          
                          <path className="flow-path internal-arrow" d="M 1200,565 V 630" opacity={currentRagStepData.highlight.includes('engineering-pipeline') ? 1 : 0.3}/>
                          
                          <g id="response-path" opacity={currentRagStepData.highlight.includes('response-path') ? 1 : 0.3}>
                            <path className="flow-path a2a-arrow" d="M 1065,410 C 1000,410 925,420 925,470 V 275"/>
                          </g>

                          {/* Static Labels */}
                          <text className="label" x="980" y="320" fontSize="18" opacity={currentRagStepData.highlight.includes('user-query-path') ? 1 : 0.5}>1. User sends query</text>
                          <text className="label" x="1200" y="700" textAnchor="middle" fontSize="18" opacity={currentRagStepData.highlight.includes('sourcing-paths') ? 1 : 0.5}>2. Context Sourcing (Parallel)</text>
                          <text className="label" x="1200" y="465" textAnchor="middle" fontSize="18" opacity={currentRagStepData.highlight.includes('engineering-pipeline') ? 1 : 0.5}>3. Context Engineering</text>
                          <text className="label" x="1200" y="670" textAnchor="middle" fontSize="18" opacity={currentRagStepData.highlight.includes('engineering-pipeline') ? 1 : 0.5}>4. Precision-Engineered Prompt</text>
                          <text className="label" x="980" y="370" fontSize="18" opacity={currentRagStepData.highlight.includes('response-path') ? 1 : 0.5}>5. Generate & Reply</text>
                        </g>
                      </svg>
                    </div>
                    
                    {/* Explanation Section */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-gray-200 dark:border-gray-700">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-gray-600 dark:text-gray-400 text-lg">
                            Traditional RAG: "The Then"
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                            <span className="text-lg">Monolithic system with simple lookup</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                            <span className="text-lg">Context treated as raw text blocks</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                            <span className="text-lg">Limited sources and noisy results</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
                            <span className="text-lg">Prone to hallucination and imprecision</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-green-200 dark:border-green-700">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-green-600 dark:text-green-400 text-lg">
                            Agentic RAG: "The Now"
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                            <span className="text-lg">Distributed intelligent system with Context Engineering</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                            <span className="text-lg">Multiple specialized sources via A2A and MCP</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                            <span className="text-lg">Active context shaping: re-ranking, summarizing, transforming</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                            <span className="text-lg">Negative evidence injection to prevent hallucination</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Agentic Context Engineering Framework */}
                    <div className="mt-6 space-y-4">
                      <Card className="border-violet-200 dark:border-violet-800">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-violet-600 dark:text-violet-400">
                            <Database className="w-5 h-5" />
                            Agentic Context Engineering: Evolving Playbooks
                          </CardTitle>
                          <p className="text-sm text-muted-foreground mt-2">
                            A framework that treats contexts as living, evolving playbooks rather than static prompts. 
                            ACE improves model behavior by changing inputs (context adaptation) instead of model weights.
                          </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {/* Core Problem */}
                          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                            <h4 className="font-semibold text-destructive mb-3">⚠️ The Context Collapse Problem</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-start gap-2">
                                <Badge variant="destructive" className="mt-0.5">Brevity Bias</Badge>
                                <p className="flex-1 text-muted-foreground">
                                  Optimized prompts shrink and lose practical domain detail, favoring conciseness over comprehensiveness
                                </p>
                              </div>
                              <div className="flex items-start gap-2">
                                <Badge variant="destructive" className="mt-0.5">Context Collapse</Badge>
                                <p className="flex-1 text-muted-foreground">
                                  Repeated rewriting compresses context and erodes knowledge over time
                                </p>
                              </div>
                              <div className="p-3 bg-background border border-destructive/20 rounded mt-3">
                                <p className="text-xs font-mono text-muted-foreground">
                                  Real case: 18,282 tokens → 122 tokens | Accuracy: 66.7% → 57.1% ❌
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Three-Agent Framework */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Card className="border-blue-200 dark:border-blue-800">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm text-blue-600 dark:text-blue-400">1. Generator</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2 text-sm">
                                <p className="text-muted-foreground">Explores tasks and surfaces patterns</p>
                                <ul className="space-y-1 text-xs text-muted-foreground">
                                  <li>• Executes tasks with reasoning traces</li>
                                  <li>• Captures successes & failures</li>
                                  <li>• Collects execution feedback</li>
                                  <li>• Documents edge cases</li>
                                </ul>
                              </CardContent>
                            </Card>

                            <Card className="border-purple-200 dark:border-purple-800">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm text-purple-600 dark:text-purple-400">2. Reflector</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2 text-sm">
                                <p className="text-muted-foreground">Analyzes and extracts lessons</p>
                                <ul className="space-y-1 text-xs text-muted-foreground">
                                  <li>• Identifies what worked/failed</li>
                                  <li>• Extracts concrete patterns</li>
                                  <li>• Creates reusable strategies</li>
                                  <li>• Tags helpful vs harmful</li>
                                </ul>
                              </CardContent>
                            </Card>

                            <Card className="border-green-200 dark:border-green-800">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-sm text-green-600 dark:text-green-400">3. Curator</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-2 text-sm">
                                <p className="text-muted-foreground">Maintains playbook integrity</p>
                                <ul className="space-y-1 text-xs text-muted-foreground">
                                  <li>• Incremental delta updates</li>
                                  <li>• Merge duplicates</li>
                                  <li>• Prune redundancy</li>
                                  <li>• Grow & refine content</li>
                                </ul>
                              </CardContent>
                            </Card>
                          </div>

                          {/* Playbook Structure */}
                          <div className="p-4 bg-green-500/10 dark:bg-green-500/20 border border-green-500/30 rounded-lg">
                            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">📚 What is a Playbook?</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              A structured, growing collection of strategies, code snippets, examples, and cautions with simple metadata
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                              <div className="space-y-1">
                                <Badge variant="outline" className="bg-background">Itemized Bullets</Badge>
                                <p className="text-xs text-muted-foreground">Each lesson is a discrete, traceable item</p>
                              </div>
                              <div className="space-y-1">
                                <Badge variant="outline" className="bg-background">Simple Metadata</Badge>
                                <p className="text-xs text-muted-foreground">Tags track helpful/harmful patterns</p>
                              </div>
                              <div className="space-y-1">
                                <Badge variant="outline" className="bg-background">Delta Updates</Badge>
                                <p className="text-xs text-muted-foreground">Add/edit only relevant bullets, no full rewrites</p>
                              </div>
                              <div className="space-y-1">
                                <Badge variant="outline" className="bg-background">Grow & Refine</Badge>
                                <p className="text-xs text-muted-foreground">Continuously expand without context collapse</p>
                              </div>
                            </div>
                          </div>

                          {/* Example Lessons */}
                          <div className="p-4 bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/30 rounded-lg">
                            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">💡 Example Lessons from Execution</h4>
                            <div className="space-y-2">
                              <div className="p-2 bg-background rounded border border-blue-500/20">
                                <p className="text-sm font-mono text-green-700 dark:text-green-400">
                                  ✓ Paginate API calls until no results remain (prevents incomplete data)
                                </p>
                              </div>
                              <div className="p-2 bg-background rounded border border-blue-500/20">
                                <p className="text-sm font-mono text-green-700 dark:text-green-400">
                                  ✓ Resolve identities from trusted contact records, not fragile text heuristics
                                </p>
                              </div>
                              <div className="p-2 bg-background rounded border border-blue-500/20">
                                <p className="text-sm font-mono text-destructive">
                                  ✗ Avoid full context rewrites that compress domain knowledge
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Performance Results */}
                          <div className="p-4 bg-violet-500/10 dark:bg-violet-500/20 border border-violet-500/30 rounded-lg">
                            <h4 className="font-semibold text-violet-700 dark:text-violet-300 mb-3">📊 Proven Results</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <div className="flex items-baseline gap-2 mb-1">
                                  <span className="text-2xl font-bold text-violet-600 dark:text-violet-400">+10.6%</span>
                                  <span className="text-xs text-muted-foreground">avg improvement</span>
                                </div>
                                <p className="text-sm text-muted-foreground">Interactive agent tasks (AppWorld)</p>
                              </div>
                              <div>
                                <div className="flex items-baseline gap-2 mb-1">
                                  <span className="text-2xl font-bold text-violet-600 dark:text-violet-400">+8.6%</span>
                                  <span className="text-xs text-muted-foreground">avg improvement</span>
                                </div>
                                <p className="text-sm text-muted-foreground">Financial analysis (XBRL tasks)</p>
                              </div>
                              <div>
                                <div className="flex items-baseline gap-2 mb-1">
                                  <span className="text-2xl font-bold text-violet-600 dark:text-violet-400">-86.9%</span>
                                  <span className="text-xs text-muted-foreground">latency reduction</span>
                                </div>
                                <p className="text-sm text-muted-foreground">Adaptation time with fewer runs</p>
                              </div>
                              <div>
                                <div className="flex items-baseline gap-2 mb-1">
                                  <span className="text-2xl font-bold text-violet-600 dark:text-violet-400">🏆 #1</span>
                                  <span className="text-xs text-muted-foreground">leaderboard rank</span>
                                </div>
                                <p className="text-sm text-muted-foreground">Matched top agent with smaller model</p>
                              </div>
                            </div>
                          </div>

                          {/* Key Insights */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">Key Insights</h4>
                            <div className="grid grid-cols-1 gap-2">
                              <div className="flex items-start gap-2 p-2 bg-muted rounded">
                                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-muted-foreground">
                                  Can improve without labeled answers by leveraging natural execution feedback (unit tests, tool outcomes)
                                </p>
                              </div>
                              <div className="flex items-start gap-2 p-2 bg-muted rounded">
                                <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-muted-foreground">
                                  Performance degrades when feedback is weak/noisy—misleading signals pollute the playbook
                                </p>
                              </div>
                              <div className="flex items-start gap-2 p-2 bg-muted rounded">
                                <Shield className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-muted-foreground">
                                  Long contexts are efficient with caching and compression, avoiding repeated processing
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Context Engineering Deep Dive */}
                    <div className="mt-6 p-4 rounded-lg bg-muted text-foreground ring-1 ring-border">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Database className="w-5 h-5 text-amber-600" />
                        Context Engineering: The Game Changer
                      </h3>
                      <div className="space-y-3 text-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Context Sourcing</h4>
                            <ul className="space-y-1 text-muted-foreground">
                              <li>• Poll multiple specialized agents via A2A protocol</li>
                              <li>• Access secure tools through MCP authentication</li>
                              <li>• Gather diverse, high-quality information sources</li>
                              <li>• Parallel processing for optimal performance</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Context Engineering</h4>
                            <ul className="space-y-1 text-muted-foreground">
                              <li>• Re-rank results for relevance and importance</li>
                              <li>• Summarize verbose documents intelligently</li>
                              <li>• Transform data into optimal formats (JSON, structured)</li>
                              <li>• Inject negative evidence to prevent hallucination</li>
                            </ul>
                          </div>
                        </div>
                        <div className="bg-amber-100 dark:bg-amber-800/30 p-3 rounded-md mt-4">
                          <p className="text-base font-medium text-foreground">
                            Result: A precision-engineered, clean, and potent prompt that generates superior answers
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* YouTube Reference */}
                    <div className="mt-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Learn More</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                            <YoutubeLogo size={24} className="flex-shrink-0 text-red-600 dark:text-red-400 mt-1" weight="duotone" />
                            <div className="flex-1">
                              <h5 className="font-semibold mb-1">Agentic Context Engineering</h5>
                              <p className="text-sm text-muted-foreground mb-2">
                                Deep dive into context engineering techniques for agentic systems, covering sourcing, transformation, and optimization strategies
                              </p>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="p-0 h-auto"
                                onClick={() => window.open('https://youtu.be/XPOQ0dlxbnA', '_blank')}
                              >
                                Watch Video <ArrowUpRight size={14} className="ml-1" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                            <Badge variant="outline" className="mt-1 flex-shrink-0 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700">
                              arXiv
                            </Badge>
                            <div className="flex-1">
                              <h5 className="font-semibold mb-1">Agentic Context Engineering: Evolving Contexts for Self-Improving Language Models</h5>
                              <p className="text-sm text-muted-foreground mb-2">
                                Research paper introducing ACE framework that treats contexts as evolving playbooks. Shows +10.6% improvement on agents 
                                and +8.6% on finance tasks while reducing adaptation latency by 86.9%.
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                <span>Zhang et al., 2025</span>
                                <span>•</span>
                                <span>cs.LG, cs.AI, cs.CL</span>
                              </div>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="p-0 h-auto"
                                onClick={() => window.open('https://arxiv.org/abs/2510.04618', '_blank')}
                              >
                                Read Paper <ArrowUpRight size={14} className="ml-1" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Architecture Summary */}
          <AnimatePresence>
            {showArchitecture && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
              >
                <Card className="border-blue-200 dark:border-blue-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      A2A Protocol
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span className="text-lg">Standardized agent communication</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span className="text-lg">Task lifecycle management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span className="text-lg">Asynchronous message passing</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 dark:border-purple-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-purple-600 dark:text-purple-400 flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      GenAI-processors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      <span className="text-lg">Modular processing pipelines</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      <span className="text-lg">Async task decomposition</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                      <span className="text-lg">Chainable + parallel execution</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 dark:border-red-800">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      MCP Protocol
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span className="text-lg">Secure tool authentication</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span className="text-lg">OAuth 2.0 PKCE flow</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span className="text-lg">Encrypted session management</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Detailed Architecture Explanation */}
          <div className="mt-8 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Understanding the Synergy of A2A, MCP, and GenAI-processors</CardTitle>
                <p className="text-muted-foreground">
                  These three technologies work together to create sophisticated, multi-agent systems that can handle complex business scenarios.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Technology Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Database className="w-5 h-5 text-purple-600" />
                      GenAI-processors: The Agent's "Brain"
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      A Python library for building the internal logic of an agent. It provides a modular framework where complex tasks are broken down into smaller, reusable, asynchronous components called Processors.
                    </p>
                    <div className={conceptSurfaceSoft('p-3 space-y-2')}>
                      <p className="text-base font-medium">Example Pipeline:</p>
                      <div className={conceptCodeBlock('text-lg')}>TopicGenerator → TopicResearcher → Synthesizer</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      A2A Protocol: The Agent's "Nervous System"
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      The communication and task management layer that allows agents to interact with each other and external systems in a standardized way. It defines protocols centered around task lifecycles.
                    </p>
                    <div className={conceptSurfaceSoft('p-3 space-y-2')}>
                      <p className="text-base font-medium">Task States:</p>
                      <div className={conceptCodeBlock('text-lg')}>submitted → working → completed</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Shield className="w-5 h-5 text-red-600" />
                      MCP: The Agent's "Hands" for Tools
                    </h3>
                    <p className="text-lg text-muted-foreground">
                      A specialized protocol for AI models to securely discover and use external tools. It standardizes how agents authenticate with and call tools from secure providers.
                    </p>
                    <div className={conceptSurfaceSoft('p-3 space-y-2')}>
                      <p className="text-base font-medium">Security Features:</p>
                      <div className={conceptCodeBlock('text-lg')}>OAuth 2.0 + PKCE + Session Encryption</div>
                    </div>
                  </div>
                </div>

                {/* Business Scenario Breakdown */}
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">Business Scenario: Multi-Faceted Customer Inquiry</h3>
                  <div className="p-4 rounded-lg bg-muted text-foreground ring-1 ring-border">
                    <p className="text-lg italic mb-3">
                      "What are the eco-friendly features of the 'Aqua-Pure X1' water filter, and can you check the status of my latest order for it?"
                    </p>
                    <p className="text-lg text-muted-foreground">
                      This complex query requires coordination between multiple specialized agents, each with different capabilities and access permissions.
                    </p>
                                                    </div>
                </div>

                {/* Agent Roles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <Card className="border-blue-200 dark:border-blue-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-foreground text-lg">
                        Customer Service Agent
                      </CardTitle>
                      <p className="text-lg text-muted-foreground">Azure AI - Primary orchestrator</p>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="text-lg">Handles customer interaction</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="text-lg">Orchestrates task delegation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="text-lg">Synthesizes final response</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 dark:border-green-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-green-600 dark:text-green-400 text-lg">
                        Product Research Agent
                      </CardTitle>
                      <p className="text-lg text-muted-foreground">Google Gemini - Knowledge specialist</p>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                        <span className="text-lg">Deep product knowledge research</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                        <span className="text-lg">Eco-friendly feature analysis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
                        <span className="text-lg">External knowledge integration</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-200 dark:border-orange-800">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-orange-600 dark:text-orange-400 text-lg">
                        OMS Tool Agent
                      </CardTitle>
                      <p className="text-lg text-muted-foreground">Azure MCP - Secure data access</p>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        <span className="text-lg">Secure order system access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        <span className="text-lg">Non-conversational tool provider</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        <span className="text-lg">Azure API Management gateway</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Integration Summary */}
                <div className="mt-8 p-4 rounded-lg bg-muted text-foreground ring-1 ring-border">
                  <h3 className="font-semibold text-lg mb-3">Integration Summary</h3>
                  <div className="space-y-2 text-lg">
                    <p>
                      <strong>GenAI-processors</strong> define what your agents do through modular, chainable pipelines
                    </p>
                    <p>
                      <strong>A2A SDK</strong> exposes your agent's skills as services and enables inter-agent communication
                    </p>
                    <p>
                      <strong>MCP</strong> provides secure access to external tools and data sources when your agents need them
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default A2AMultiAgentSystem;


















