import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, ArrowClockwise, ArrowSquareOut } from "@phosphor-icons/react";
import { useTheme } from '@/components/theme/ThemeProvider';

interface ClaudeSkillsMCPFlowProps {
  autoPlay?: boolean;
  className?: string;
}

const ClaudeSkillsMCPFlow: React.FC<ClaudeSkillsMCPFlowProps> = ({ autoPlay = false, className = '' }) => {
  const { theme, isDarkMode } = useTheme();
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const colors = {
    claude: isDarkMode ? '#A463F2' : '#8B5CF6',
    mcp: isDarkMode ? '#3B82F6' : '#2563EB',
    skill: isDarkMode ? '#10B981' : '#059669',
    context: isDarkMode ? '#F59E0B' : '#D97706',
    resource: isDarkMode ? '#EF4444' : '#DC2626',
    flow: isDarkMode ? '#9CA3AF' : '#6B7280',
    bg: isDarkMode ? '#1F2937' : '#F9FAFB',
    text: isDarkMode ? '#F9FAFB' : '#111827',
    border: isDarkMode ? '#4B5563' : '#D1D5DB',
    laneSeparator: isDarkMode ? '#6B7280' : '#9CA3AF'
  };

  // Animation phases showing the complete flow
  const animationPhases = [
    {
      id: 0,
      title: "User Request",
      description: "User asks Claude to perform a task requiring external data or actions",
      activeNodes: ['user'],
      activeConnections: [],
      contextInfo: "Claude receives natural language request"
    },
    {
      id: 1,
      title: "Claude Analysis",
      description: "Claude analyzes request and identifies needed Skills",
      activeNodes: ['user', 'claude'],
      activeConnections: ['user-claude'],
      contextInfo: "Intent recognition & skill matching"
    },
    {
      id: 2,
      title: "MCP Connection",
      description: "Claude connects to MCP server hosting the required Skill",
      activeNodes: ['claude', 'mcp-server'],
      activeConnections: ['claude-mcp'],
      contextInfo: "Establishing secure protocol connection"
    },
    {
      id: 3,
      title: "Context Engineering",
      description: "Claude builds rich context from resources via MCP",
      activeNodes: ['claude', 'mcp-server', 'resources'],
      activeConnections: ['mcp-resources', 'resources-mcp'],
      contextInfo: "Fetching relevant data, files, and context"
    },
    {
      id: 4,
      title: "Skill Invocation",
      description: "Claude invokes the Skill with structured parameters",
      activeNodes: ['claude', 'skill'],
      activeConnections: ['claude-skill'],
      contextInfo: "Tool calling with context-enriched parameters"
    },
    {
      id: 5,
      title: "Tool Execution",
      description: "Skill executes action using MCP tools and resources",
      activeNodes: ['skill', 'tools', 'resources'],
      activeConnections: ['skill-tools', 'tools-resources'],
      contextInfo: "Executing operations on external systems"
    },
    {
      id: 6,
      title: "Response Assembly",
      description: "Skill returns structured results with metadata",
      activeNodes: ['skill', 'claude'],
      activeConnections: ['skill-claude'],
      contextInfo: "Results + execution context + errors/warnings"
    },
    {
      id: 7,
      title: "Claude Synthesis",
      description: "Claude synthesizes natural language response from results",
      activeNodes: ['claude', 'user'],
      activeConnections: ['claude-user'],
      contextInfo: "Contextual response generation"
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentPhase(prev => {
        if (prev >= animationPhases.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 3000); // 3 seconds per phase

    return () => clearInterval(timer);
  }, [isPlaying, animationPhases.length]);

  const togglePlayPause = () => {
    if (currentPhase >= animationPhases.length - 1) {
      setCurrentPhase(0);
    }
    setIsPlaying(!isPlaying);
  };

  const resetAnimation = () => {
    setCurrentPhase(0);
    setIsPlaying(false);
  };

  const isNodeActive = (nodeId: string) => {
    return animationPhases[currentPhase].activeNodes.includes(nodeId);
  };

  const isConnectionActive = (connectionId: string) => {
    return animationPhases[currentPhase].activeConnections.includes(connectionId);
  };

  const currentPhaseInfo = animationPhases[currentPhase];

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              <span>Claude Skills + MCP Flow</span>
              <a 
                href="https://www.anthropic.com/news/skills" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm font-normal text-primary hover:underline inline-flex items-center gap-1"
              >
                Learn more <ArrowSquareOut size={14} />
              </a>
            </CardTitle>
            <CardDescription className="mt-2">
              Interactive visualization of how Claude Skills layer on MCP for context-rich tool execution
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={resetAnimation}
            >
              <ArrowClockwise size={16} />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Phase Indicator */}
        <div className="flex items-center justify-between bg-muted/30 p-4 rounded-lg">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={isPlaying ? "default" : "secondary"}>
                Phase {currentPhase + 1} of {animationPhases.length}
              </Badge>
              <h3 className="font-semibold text-lg">{currentPhaseInfo.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{currentPhaseInfo.description}</p>
            <p className="text-xs text-primary mt-1">→ {currentPhaseInfo.contextInfo}</p>
          </div>
        </div>

        {/* Main Visualization */}
        <div className="relative w-full overflow-x-auto">
          <svg
            width="900"
            height="550"
            viewBox="0 0 900 550"
            className="w-full h-auto"
            style={{ backgroundColor: colors.bg }}
          >
            {/* Definitions for gradients and markers */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill={colors.flow} />
              </marker>
              <marker
                id="arrowhead-active"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill={colors.mcp} />
              </marker>
              
              {/* Gradient for Claude node */}
              <linearGradient id="claude-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.claude} stopOpacity="0.8" />
                <stop offset="100%" stopColor={colors.claude} stopOpacity="0.4" />
              </linearGradient>
              
              {/* Gradient for MCP */}
              <linearGradient id="mcp-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.mcp} stopOpacity="0.8" />
                <stop offset="100%" stopColor={colors.mcp} stopOpacity="0.4" />
              </linearGradient>
              
              {/* Gradient for Skills */}
              <linearGradient id="skill-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.skill} stopOpacity="0.8" />
                <stop offset="100%" stopColor={colors.skill} stopOpacity="0.4" />
              </linearGradient>

              {/* Pulsing animation */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background layer labels */}
            <text x="50" y="30" fill={colors.text} className="text-xs font-semibold opacity-50">
              USER LAYER
            </text>
            <text x="250" y="30" fill={colors.text} className="text-xs font-semibold opacity-50">
              CLAUDE LAYER
            </text>
            <text x="450" y="30" fill={colors.text} className="text-xs font-semibold opacity-50">
              MCP PROTOCOL LAYER
            </text>
            <text x="680" y="30" fill={colors.text} className="text-xs font-semibold opacity-50">
              SKILLS & TOOLS LAYER
            </text>

            {/* Lane Separators - Visual dividers between architectural layers */}
            <line 
              x1="200" y1="50" 
              x2="200" y2="410" 
              stroke={colors.laneSeparator} 
              strokeWidth="2" 
              strokeDasharray="8,6" 
              opacity="0.5"
            />
            <line 
              x1="420" y1="50" 
              x2="420" y2="410" 
              stroke={colors.laneSeparator} 
              strokeWidth="2" 
              strokeDasharray="8,6" 
              opacity="0.5"
            />
            <line 
              x1="650" y1="50" 
              x2="650" y2="410" 
              stroke={colors.laneSeparator} 
              strokeWidth="2" 
              strokeDasharray="8,6" 
              opacity="0.5"
            />

            {/* Connections (drawn first, behind nodes) */}
            
            {/* User -> Claude */}
            <path
              d="M 120 130 L 250 170"
              stroke={isConnectionActive('user-claude') ? colors.mcp : colors.flow}
              strokeWidth={isConnectionActive('user-claude') ? 3 : 1.5}
              fill="none"
              markerEnd={isConnectionActive('user-claude') ? "url(#arrowhead-active)" : "url(#arrowhead)"}
              strokeDasharray={isConnectionActive('user-claude') ? "0" : "5,5"}
              opacity={isConnectionActive('user-claude') ? 1 : 0.5}
              className={isConnectionActive('user-claude') ? "animate-pulse" : ""}
            />

            {/* Claude -> MCP Server */}
            <path
              d="M 370 200 L 480 220"
              stroke={isConnectionActive('claude-mcp') ? colors.mcp : colors.flow}
              strokeWidth={isConnectionActive('claude-mcp') ? 3 : 1.5}
              fill="none"
              markerEnd={isConnectionActive('claude-mcp') ? "url(#arrowhead-active)" : "url(#arrowhead)"}
              strokeDasharray={isConnectionActive('claude-mcp') ? "0" : "5,5"}
              opacity={isConnectionActive('claude-mcp') ? 1 : 0.5}
              className={isConnectionActive('claude-mcp') ? "animate-pulse" : ""}
            />

            {/* MCP Server -> Resources */}
            <path
              d="M 550 260 L 480 340"
              stroke={isConnectionActive('mcp-resources') ? colors.context : colors.flow}
              strokeWidth={isConnectionActive('mcp-resources') ? 3 : 1.5}
              fill="none"
              markerEnd={isConnectionActive('mcp-resources') ? "url(#arrowhead-active)" : "url(#arrowhead)"}
              strokeDasharray={isConnectionActive('mcp-resources') ? "0" : "5,5"}
              opacity={isConnectionActive('mcp-resources') ? 1 : 0.5}
            />

            {/* Resources -> MCP Server (return) */}
            <path
              d="M 500 340 L 570 260"
              stroke={isConnectionActive('resources-mcp') ? colors.context : colors.flow}
              strokeWidth={isConnectionActive('resources-mcp') ? 3 : 1.5}
              fill="none"
              markerEnd={isConnectionActive('resources-mcp') ? "url(#arrowhead-active)" : "url(#arrowhead)"}
              strokeDasharray={isConnectionActive('resources-mcp') ? "0" : "5,5"}
              opacity={isConnectionActive('resources-mcp') ? 1 : 0.5}
            />

            {/* Claude -> Skill */}
            <path
              d="M 350 220 L 680 180"
              stroke={isConnectionActive('claude-skill') ? colors.skill : colors.flow}
              strokeWidth={isConnectionActive('claude-skill') ? 3 : 1.5}
              fill="none"
              markerEnd={isConnectionActive('claude-skill') ? "url(#arrowhead-active)" : "url(#arrowhead)"}
              strokeDasharray={isConnectionActive('claude-skill') ? "0" : "5,5"}
              opacity={isConnectionActive('claude-skill') ? 1 : 0.5}
              className={isConnectionActive('claude-skill') ? "animate-pulse" : ""}
            />

            {/* Skill -> Tools */}
            <path
              d="M 750 210 L 750 290"
              stroke={isConnectionActive('skill-tools') ? colors.skill : colors.flow}
              strokeWidth={isConnectionActive('skill-tools') ? 3 : 1.5}
              fill="none"
              markerEnd={isConnectionActive('skill-tools') ? "url(#arrowhead-active)" : "url(#arrowhead)"}
              strokeDasharray={isConnectionActive('skill-tools') ? "0" : "5,5"}
              opacity={isConnectionActive('skill-tools') ? 1 : 0.5}
            />

            {/* Tools -> Resources */}
            <path
              d="M 720 330 L 520 360"
              stroke={isConnectionActive('tools-resources') ? colors.resource : colors.flow}
              strokeWidth={isConnectionActive('tools-resources') ? 3 : 1.5}
              fill="none"
              markerEnd={isConnectionActive('tools-resources') ? "url(#arrowhead-active)" : "url(#arrowhead)"}
              strokeDasharray={isConnectionActive('tools-resources') ? "0" : "5,5"}
              opacity={isConnectionActive('tools-resources') ? 1 : 0.5}
            />

            {/* Skill -> Claude (return) */}
            <path
              d="M 680 200 L 350 240"
              stroke={isConnectionActive('skill-claude') ? colors.skill : colors.flow}
              strokeWidth={isConnectionActive('skill-claude') ? 3 : 1.5}
              fill="none"
              markerEnd={isConnectionActive('skill-claude') ? "url(#arrowhead-active)" : "url(#arrowhead)"}
              strokeDasharray={isConnectionActive('skill-claude') ? "0" : "5,5"}
              opacity={isConnectionActive('skill-claude') ? 1 : 0.5}
            />

            {/* Claude -> User (return) */}
            <path
              d="M 250 190 L 120 150"
              stroke={isConnectionActive('claude-user') ? colors.claude : colors.flow}
              strokeWidth={isConnectionActive('claude-user') ? 3 : 1.5}
              fill="none"
              markerEnd={isConnectionActive('claude-user') ? "url(#arrowhead-active)" : "url(#arrowhead)"}
              strokeDasharray={isConnectionActive('claude-user') ? "0" : "5,5"}
              opacity={isConnectionActive('claude-user') ? 1 : 0.5}
              className={isConnectionActive('claude-user') ? "animate-pulse" : ""}
            />

            {/* Nodes */}
            
            {/* User Node */}
            <g opacity={isNodeActive('user') ? 1 : 0.4}>
              <circle
                cx="100"
                cy="140"
                r="30"
                fill={colors.text}
                stroke={colors.border}
                strokeWidth="2"
                filter={isNodeActive('user') ? "url(#glow)" : ""}
                className={isNodeActive('user') ? "animate-pulse" : ""}
              />
              <text x="100" y="145" fill={colors.bg} textAnchor="middle" className="text-sm font-bold">
                👤
              </text>
              <text x="100" y="185" fill={colors.text} textAnchor="middle" className="text-xs font-semibold">
                User
              </text>
            </g>

            {/* Claude Node */}
            <g opacity={isNodeActive('claude') ? 1 : 0.4}>
              <rect
                x="230"
                y="160"
                width="140"
                height="80"
                rx="12"
                fill="url(#claude-gradient)"
                stroke={colors.claude}
                strokeWidth="2"
                filter={isNodeActive('claude') ? "url(#glow)" : ""}
                className={isNodeActive('claude') ? "animate-pulse" : ""}
              />
              <text x="300" y="190" fill={colors.text} textAnchor="middle" className="text-lg font-bold">
                Claude
              </text>
              <text x="300" y="210" fill={colors.text} textAnchor="middle" className="text-xs opacity-80">
                AI Assistant
              </text>
              <text x="300" y="225" fill={colors.text} textAnchor="middle" className="text-xs opacity-60">
                Context Engine
              </text>
            </g>

            {/* MCP Server Node */}
            <g opacity={isNodeActive('mcp-server') ? 1 : 0.4}>
              <rect
                x="460"
                y="190"
                width="140"
                height="80"
                rx="12"
                fill="url(#mcp-gradient)"
                stroke={colors.mcp}
                strokeWidth="2"
                filter={isNodeActive('mcp-server') ? "url(#glow)" : ""}
                className={isNodeActive('mcp-server') ? "animate-pulse" : ""}
              />
              <text x="530" y="220" fill={colors.text} textAnchor="middle" className="text-lg font-bold">
                MCP Server
              </text>
              <text x="530" y="240" fill={colors.text} textAnchor="middle" className="text-xs opacity-80">
                Protocol Handler
              </text>
              <text x="530" y="255" fill={colors.text} textAnchor="middle" className="text-xs opacity-60">
                Resource Bridge
              </text>
            </g>

            {/* Resources Node */}
            <g opacity={isNodeActive('resources') ? 1 : 0.4}>
              <ellipse
                cx="490"
                cy="360"
                rx="60"
                ry="40"
                fill={colors.context}
                fillOpacity="0.2"
                stroke={colors.context}
                strokeWidth="2"
                filter={isNodeActive('resources') ? "url(#glow)" : ""}
              />
              <text x="490" y="355" fill={colors.text} textAnchor="middle" className="text-sm font-bold">
                📚 Resources
              </text>
              <text x="490" y="370" fill={colors.text} textAnchor="middle" className="text-xs opacity-70">
                Files • Data • APIs
              </text>
              <text x="490" y="385" fill={colors.text} textAnchor="middle" className="text-xs opacity-50">
                Context Sources
              </text>
            </g>

            {/* Skill Node */}
            <g opacity={isNodeActive('skill') ? 1 : 0.4}>
              <rect
                x="660"
                y="150"
                width="120"
                height="70"
                rx="10"
                fill="url(#skill-gradient)"
                stroke={colors.skill}
                strokeWidth="2"
                filter={isNodeActive('skill') ? "url(#glow)" : ""}
                className={isNodeActive('skill') ? "animate-pulse" : ""}
              />
              <text x="720" y="175" fill={colors.text} textAnchor="middle" className="text-base font-bold">
                ⚡ Skill
              </text>
              <text x="720" y="193" fill={colors.text} textAnchor="middle" className="text-xs opacity-80">
                Context-Rich
              </text>
              <text x="720" y="208" fill={colors.text} textAnchor="middle" className="text-xs opacity-60">
                Tool Wrapper
              </text>
            </g>

            {/* Tools Node */}
            <g opacity={isNodeActive('tools') ? 1 : 0.4}>
              <rect
                x="690"
                y="300"
                width="120"
                height="60"
                rx="8"
                fill={colors.skill}
                fillOpacity="0.2"
                stroke={colors.skill}
                strokeWidth="2"
                filter={isNodeActive('tools') ? "url(#glow)" : ""}
              />
              <text x="750" y="325" fill={colors.text} textAnchor="middle" className="text-sm font-bold">
                🔧 MCP Tools
              </text>
              <text x="750" y="342" fill={colors.text} textAnchor="middle" className="text-xs opacity-70">
                Functions
              </text>
              <text x="750" y="355" fill={colors.text} textAnchor="middle" className="text-xs opacity-50">
                Actions
              </text>
            </g>

            {/* Context Engineering Highlight Box */}
            {currentPhase === 3 && (
              <g>
                <rect
                  x="410"
                  y="140"
                  width="240"
                  height="240"
                  rx="8"
                  fill="none"
                  stroke={colors.context}
                  strokeWidth="3"
                  strokeDasharray="8,4"
                  opacity="0.6"
                  className="animate-pulse"
                />
                <text x="530" y="395" fill={colors.context} textAnchor="middle" className="text-xs font-bold">
                  Context Engineering Zone
                </text>
              </g>
            )}

            {/* Key Concepts Annotations */}
            <g opacity="0.7">
              {/* MCP Protocol annotation */}
              <rect x="420" y="420" width="200" height="80" rx="6" fill={colors.mcp} fillOpacity="0.1" stroke={colors.mcp} strokeWidth="1" />
              <text x="520" y="440" fill={colors.text} textAnchor="middle" className="text-xs font-bold">
                MCP Core Features
              </text>
              <text x="520" y="456" fill={colors.text} textAnchor="middle" className="text-xs">
                • Standardized protocol
              </text>
              <text x="520" y="470" fill={colors.text} textAnchor="middle" className="text-xs">
                • Resource discovery
              </text>
              <text x="520" y="484" fill={colors.text} textAnchor="middle" className="text-xs">
                • Secure communication
              </text>
            </g>

            <g opacity="0.7">
              {/* Skills annotation */}
              <rect x="660" y="420" width="220" height="80" rx="6" fill={colors.skill} fillOpacity="0.1" stroke={colors.skill} strokeWidth="1" />
              <text x="770" y="440" fill={colors.text} textAnchor="middle" className="text-xs font-bold">
                Claude Skills Benefits
              </text>
              <text x="770" y="456" fill={colors.text} textAnchor="middle" className="text-xs">
                • Context-aware execution
              </text>
              <text x="770" y="470" fill={colors.text} textAnchor="middle" className="text-xs">
                • Natural language interface
              </text>
              <text x="770" y="484" fill={colors.text} textAnchor="middle" className="text-xs">
                • Multi-step workflows
              </text>
            </g>
          </svg>
        </div>

        {/* Phase Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{currentPhase + 1} / {animationPhases.length}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${((currentPhase + 1) / animationPhases.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-purple-800 dark:text-purple-100">
              Claude Layer
            </h4>
            <p className="text-xs text-purple-900 dark:text-purple-300">
              Handles intent, context synthesis, and natural language generation
            </p>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-blue-800 dark:text-blue-100">
              MCP Protocol
            </h4>
            <p className="text-xs text-blue-900 dark:text-blue-300">
              Standardized bridge for secure resource access and tool discovery
            </p>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
            <h4 className="font-semibold text-sm mb-2 text-green-800 dark:text-green-100">
              Skills Layer
            </h4>
            <p className="text-xs text-green-900 dark:text-green-300">
              Context-rich tool wrappers enabling complex, multi-step workflows
            </p>
          </div>
        </div>

        {/* Learn More Link */}
        <div className="flex items-center justify-center pt-4 border-t">
          <a 
            href="https://www.anthropic.com/news/skills" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline inline-flex items-center gap-2"
          >
            <span>Read Anthropic's official Skills announcement</span>
            <ArrowSquareOut size={16} />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaudeSkillsMCPFlow;
