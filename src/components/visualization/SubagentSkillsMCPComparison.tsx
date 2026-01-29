import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, ArrowClockwise, Robot, PuzzlePiece, Plugs, ArrowRight, Brain, Lightning } from "@phosphor-icons/react";
import { useTheme } from '@/components/theme/ThemeProvider';

interface SubagentSkillsMCPComparisonProps {
  autoPlay?: boolean;
  className?: string;
}

type ComparisonMode = 'subagent' | 'skill' | 'mcp';

interface AnimationPhase {
  id: number;
  title: string;
  description: string;
  activeNodes: string[];
  activeConnections: string[];
}

const SubagentSkillsMCPComparison: React.FC<SubagentSkillsMCPComparisonProps> = ({ 
  autoPlay = false, 
  className = '' 
}) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [selectedMode, setSelectedMode] = useState<ComparisonMode>('subagent');
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const colors = {
    subagent: isDarkMode ? '#F59E0B' : '#D97706',
    skill: isDarkMode ? '#10B981' : '#059669',
    mcp: isDarkMode ? '#3B82F6' : '#2563EB',
    agent: isDarkMode ? '#A463F2' : '#8B5CF6',
    user: isDarkMode ? '#EC4899' : '#DB2777',
    tool: isDarkMode ? '#6366F1' : '#4F46E5',
    flow: isDarkMode ? '#9CA3AF' : '#6B7280',
    flowActive: isDarkMode ? '#60A5FA' : '#3B82F6',
    bg: isDarkMode ? '#1F2937' : '#F9FAFB',
    bgCard: isDarkMode ? '#374151' : '#FFFFFF',
    text: isDarkMode ? '#F9FAFB' : '#111827',
    textMuted: isDarkMode ? '#9CA3AF' : '#6B7280',
    border: isDarkMode ? '#4B5563' : '#E5E7EB',
  };

  // Animation phases for each mode
  const phases: Record<ComparisonMode, AnimationPhase[]> = {
    subagent: [
      { id: 0, title: "Task Received", description: "Main agent receives complex multi-step task", activeNodes: ['user', 'main-agent'], activeConnections: ['user-main'] },
      { id: 1, title: "Subagent Spawn", description: "Main agent spawns specialized subagent in separate context", activeNodes: ['main-agent', 'subagent'], activeConnections: ['main-sub'] },
      { id: 2, title: "Parallel Work", description: "Subagent works independently with full LLM reasoning", activeNodes: ['subagent', 'sub-context'], activeConnections: ['sub-context'] },
      { id: 3, title: "Result Return", description: "Subagent returns findings to main context", activeNodes: ['subagent', 'main-agent'], activeConnections: ['sub-main'] },
      { id: 4, title: "Context Merge", description: "Main agent synthesizes results into final response", activeNodes: ['main-agent', 'user'], activeConnections: ['main-user'] },
    ],
    skill: [
      { id: 0, title: "Skill Triggered", description: "Agent detects task matching skill keywords", activeNodes: ['user', 'agent'], activeConnections: ['user-agent'] },
      { id: 1, title: "Skill Loaded", description: "SKILL.md instructions loaded on-demand (not upfront)", activeNodes: ['agent', 'skill-md'], activeConnections: ['agent-skill'] },
      { id: 2, title: "Context Applied", description: "Skill instructions guide agent behavior", activeNodes: ['agent', 'skill-context'], activeConnections: ['skill-agent'] },
      { id: 3, title: "Scripts Execute", description: "Optional bundled scripts run for file ops", activeNodes: ['skill-context', 'scripts'], activeConnections: ['skill-scripts'] },
      { id: 4, title: "Result Returned", description: "Agent responds using skill-guided approach", activeNodes: ['agent', 'user'], activeConnections: ['agent-user'] },
    ],
    mcp: [
      { id: 0, title: "Tool Request", description: "Agent needs external data or action", activeNodes: ['agent'], activeConnections: [] },
      { id: 1, title: "MCP Connection", description: "Agent connects to MCP server via protocol", activeNodes: ['agent', 'mcp-server'], activeConnections: ['agent-mcp'] },
      { id: 2, title: "Tool Discovery", description: "MCP server exposes available tools schema", activeNodes: ['mcp-server', 'tools'], activeConnections: ['mcp-tools'] },
      { id: 3, title: "Tool Execution", description: "Agent calls tool with structured parameters", activeNodes: ['agent', 'mcp-server', 'tools'], activeConnections: ['agent-mcp', 'mcp-tools'] },
      { id: 4, title: "Data Returned", description: "Tool returns structured response via MCP", activeNodes: ['tools', 'mcp-server', 'agent'], activeConnections: ['tools-mcp', 'mcp-agent'] },
    ],
  };

  const currentPhases = phases[selectedMode];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentPhase(prev => {
        if (prev >= currentPhases.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, [isPlaying, currentPhases.length]);

  const handleModeChange = (mode: ComparisonMode) => {
    setSelectedMode(mode);
    setCurrentPhase(0);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (currentPhase >= currentPhases.length - 1) {
      setCurrentPhase(0);
    }
    setIsPlaying(!isPlaying);
  };

  const resetAnimation = () => {
    setCurrentPhase(0);
    setIsPlaying(false);
  };

  const isNodeActive = (nodeId: string) => currentPhases[currentPhase]?.activeNodes.includes(nodeId);
  const isConnectionActive = (connId: string) => currentPhases[currentPhase]?.activeConnections.includes(connId);

  const getModeColor = (mode: ComparisonMode) => colors[mode];

  // SVG rendering for each mode
  const renderSubagentDiagram = () => (
    <svg viewBox="0 0 600 300" className="w-full h-auto" style={{ minHeight: 280 }}>
      {/* Background */}
      <rect x="0" y="0" width="600" height="300" fill={colors.bg} rx="8" />
      
      {/* User */}
      <g transform="translate(50, 130)">
        <circle r="30" fill={isNodeActive('user') ? colors.user : colors.border} 
          className={`transition-all duration-500 ${isNodeActive('user') ? 'opacity-100' : 'opacity-50'}`} />
        <text y="5" textAnchor="middle" fill={colors.bgCard} fontSize="12" fontWeight="bold">👤</text>
        <text y="50" textAnchor="middle" fill={colors.text} fontSize="11">User</text>
      </g>

      {/* Main Agent */}
      <g transform="translate(200, 130)">
        <rect x="-45" y="-35" width="90" height="70" rx="8" 
          fill={isNodeActive('main-agent') ? colors.agent : colors.border}
          className={`transition-all duration-500 ${isNodeActive('main-agent') ? 'opacity-100' : 'opacity-50'}`} />
        <text y="-5" textAnchor="middle" fill={colors.bgCard} fontSize="20">🧠</text>
        <text y="15" textAnchor="middle" fill={colors.bgCard} fontSize="10" fontWeight="bold">Main Agent</text>
        <text y="55" textAnchor="middle" fill={colors.text} fontSize="10">(Full Context)</text>
      </g>

      {/* Subagent */}
      <g transform="translate(380, 80)">
        <rect x="-45" y="-35" width="90" height="70" rx="8" 
          fill={isNodeActive('subagent') ? colors.subagent : colors.border}
          className={`transition-all duration-500 ${isNodeActive('subagent') ? 'opacity-100' : 'opacity-50'}`}
          strokeDasharray={isNodeActive('subagent') ? "0" : "4 2"} stroke={colors.subagent} strokeWidth="2" />
        <text y="-5" textAnchor="middle" fill={colors.bgCard} fontSize="18">🤖</text>
        <text y="15" textAnchor="middle" fill={colors.bgCard} fontSize="10" fontWeight="bold">Subagent</text>
      </g>

      {/* Subagent Context Bubble */}
      <g transform="translate(520, 80)">
        <ellipse rx="50" ry="35" 
          fill={isNodeActive('sub-context') ? `${colors.subagent}40` : `${colors.border}20`}
          stroke={colors.subagent} strokeWidth="1" strokeDasharray="4 2"
          className="transition-all duration-500" />
        <text y="0" textAnchor="middle" fill={colors.text} fontSize="9">Separate</text>
        <text y="12" textAnchor="middle" fill={colors.text} fontSize="9">Context</text>
      </g>

      {/* Result box */}
      <g transform="translate(380, 200)">
        <rect x="-35" y="-20" width="70" height="40" rx="6" 
          fill={isNodeActive('result') ? colors.subagent : colors.border}
          className={`transition-all duration-500 ${isNodeActive('result') ? 'opacity-100' : 'opacity-30'}`} />
        <text y="5" textAnchor="middle" fill={colors.bgCard} fontSize="10">📄 Result</text>
      </g>

      {/* Connections */}
      <line x1="80" y1="130" x2="150" y2="130" stroke={isConnectionActive('user-main') ? colors.flowActive : colors.flow} 
        strokeWidth={isConnectionActive('user-main') ? 3 : 2} className="transition-all duration-300" />
      <line x1="245" y1="110" x2="335" y2="85" stroke={isConnectionActive('main-sub') ? colors.flowActive : colors.flow} 
        strokeWidth={isConnectionActive('main-sub') ? 3 : 2} className="transition-all duration-300" strokeDasharray={isConnectionActive('main-sub') ? "0" : "5 3"} />
      <line x1="425" y1="80" x2="470" y2="80" stroke={isConnectionActive('sub-context') ? colors.flowActive : colors.flow} 
        strokeWidth={isConnectionActive('sub-context') ? 3 : 2} className="transition-all duration-300" />
      <line x1="335" y1="95" x2="245" y2="120" stroke={isConnectionActive('sub-main') ? colors.subagent : colors.flow} 
        strokeWidth={isConnectionActive('sub-main') ? 3 : 2} className="transition-all duration-300" />
      <line x1="150" y1="130" x2="80" y2="130" stroke={isConnectionActive('main-user') ? colors.flowActive : colors.flow} 
        strokeWidth={isConnectionActive('main-user') ? 3 : 2} className="transition-all duration-300" />

      {/* Labels */}
      <text x="300" y="25" textAnchor="middle" fill={colors.subagent} fontSize="14" fontWeight="bold">
        Subagent Pattern
      </text>
      <text x="300" y="285" textAnchor="middle" fill={colors.textMuted} fontSize="10">
        Spawns independent LLM with own context • Returns results to parent
      </text>
    </svg>
  );

  const renderSkillDiagram = () => (
    <svg viewBox="0 0 600 300" className="w-full h-auto" style={{ minHeight: 280 }}>
      <rect x="0" y="0" width="600" height="300" fill={colors.bg} rx="8" />
      
      {/* User */}
      <g transform="translate(50, 150)">
        <circle r="30" fill={isNodeActive('user') ? colors.user : colors.border} 
          className={`transition-all duration-500 ${isNodeActive('user') ? 'opacity-100' : 'opacity-50'}`} />
        <text y="5" textAnchor="middle" fill={colors.bgCard} fontSize="12" fontWeight="bold">👤</text>
        <text y="50" textAnchor="middle" fill={colors.text} fontSize="11">User</text>
      </g>

      {/* Agent */}
      <g transform="translate(200, 150)">
        <rect x="-45" y="-35" width="90" height="70" rx="8" 
          fill={isNodeActive('agent') ? colors.agent : colors.border}
          className={`transition-all duration-500 ${isNodeActive('agent') ? 'opacity-100' : 'opacity-50'}`} />
        <text y="-5" textAnchor="middle" fill={colors.bgCard} fontSize="20">🧠</text>
        <text y="15" textAnchor="middle" fill={colors.bgCard} fontSize="10" fontWeight="bold">Agent</text>
      </g>

      {/* SKILL.md File */}
      <g transform="translate(350, 80)">
        <rect x="-40" y="-25" width="80" height="50" rx="6" 
          fill={isNodeActive('skill-md') ? colors.skill : colors.border}
          className={`transition-all duration-500 ${isNodeActive('skill-md') ? 'opacity-100' : 'opacity-40'}`} />
        <text y="-5" textAnchor="middle" fill={colors.bgCard} fontSize="14">📄</text>
        <text y="12" textAnchor="middle" fill={colors.bgCard} fontSize="9" fontWeight="bold">SKILL.md</text>
        <text y="45" textAnchor="middle" fill={colors.text} fontSize="9">(Loaded on-demand)</text>
      </g>

      {/* Skill Context Applied */}
      <g transform="translate(350, 180)">
        <rect x="-50" y="-25" width="100" height="50" rx="6" 
          fill={isNodeActive('skill-context') ? `${colors.skill}` : colors.border}
          stroke={colors.skill} strokeWidth="2"
          className={`transition-all duration-500 ${isNodeActive('skill-context') ? 'opacity-100' : 'opacity-30'}`} />
        <text y="0" textAnchor="middle" fill={colors.bgCard} fontSize="10" fontWeight="bold">📚 Instructions</text>
        <text y="15" textAnchor="middle" fill={colors.bgCard} fontSize="9">+ Context</text>
      </g>

      {/* Scripts */}
      <g transform="translate(500, 180)">
        <rect x="-35" y="-25" width="70" height="50" rx="6" 
          fill={isNodeActive('scripts') ? colors.tool : colors.border}
          className={`transition-all duration-500 ${isNodeActive('scripts') ? 'opacity-100' : 'opacity-30'}`} />
        <text y="0" textAnchor="middle" fill={colors.bgCard} fontSize="12">⚡</text>
        <text y="15" textAnchor="middle" fill={colors.bgCard} fontSize="9">Scripts</text>
      </g>

      {/* Connections */}
      <line x1="80" y1="150" x2="150" y2="150" stroke={isConnectionActive('user-agent') ? colors.flowActive : colors.flow} 
        strokeWidth={isConnectionActive('user-agent') ? 3 : 2} className="transition-all duration-300" />
      <line x1="245" y1="130" x2="310" y2="90" stroke={isConnectionActive('agent-skill') ? colors.flowActive : colors.flow} 
        strokeWidth={isConnectionActive('agent-skill') ? 3 : 2} className="transition-all duration-300" strokeDasharray="5 3" />
      <line x1="310" y1="110" x2="245" y2="140" stroke={isConnectionActive('skill-agent') ? colors.skill : colors.flow} 
        strokeWidth={isConnectionActive('skill-agent') ? 3 : 2} className="transition-all duration-300" />
      <line x1="400" y1="180" x2="465" y2="180" stroke={isConnectionActive('skill-scripts') ? colors.flowActive : colors.flow} 
        strokeWidth={isConnectionActive('skill-scripts') ? 3 : 2} className="transition-all duration-300" />
      <line x1="150" y1="150" x2="80" y2="150" stroke={isConnectionActive('agent-user') ? colors.flowActive : colors.flow} 
        strokeWidth={isConnectionActive('agent-user') ? 3 : 2} className="transition-all duration-300" />

      {/* Labels */}
      <text x="300" y="25" textAnchor="middle" fill={colors.skill} fontSize="14" fontWeight="bold">
        Skills Pattern
      </text>
      <text x="300" y="285" textAnchor="middle" fill={colors.textMuted} fontSize="10">
        Reusable SKILL.md loaded on-demand • Same agent, enhanced context
      </text>
    </svg>
  );

  const renderMCPDiagram = () => (
    <svg viewBox="0 0 600 300" className="w-full h-auto" style={{ minHeight: 280 }}>
      <rect x="0" y="0" width="600" height="300" fill={colors.bg} rx="8" />
      
      {/* Agent */}
      <g transform="translate(100, 150)">
        <rect x="-50" y="-40" width="100" height="80" rx="8" 
          fill={isNodeActive('agent') ? colors.agent : colors.border}
          className={`transition-all duration-500 ${isNodeActive('agent') ? 'opacity-100' : 'opacity-50'}`} />
        <text y="-10" textAnchor="middle" fill={colors.bgCard} fontSize="20">🧠</text>
        <text y="10" textAnchor="middle" fill={colors.bgCard} fontSize="11" fontWeight="bold">AI Agent</text>
        <text y="25" textAnchor="middle" fill={colors.bgCard} fontSize="9">(MCP Client)</text>
      </g>

      {/* MCP Server */}
      <g transform="translate(300, 150)">
        <rect x="-55" y="-45" width="110" height="90" rx="8" 
          fill={isNodeActive('mcp-server') ? colors.mcp : colors.border}
          stroke={colors.mcp} strokeWidth="2"
          className={`transition-all duration-500 ${isNodeActive('mcp-server') ? 'opacity-100' : 'opacity-40'}`} />
        <text y="-15" textAnchor="middle" fill={colors.bgCard} fontSize="16">🔌</text>
        <text y="5" textAnchor="middle" fill={colors.bgCard} fontSize="11" fontWeight="bold">MCP Server</text>
        <text y="20" textAnchor="middle" fill={colors.bgCard} fontSize="9">JSON-RPC Protocol</text>
        <text y="35" textAnchor="middle" fill={colors.bgCard} fontSize="8">stdio / SSE</text>
      </g>

      {/* Tools */}
      <g transform="translate(500, 80)">
        <rect x="-40" y="-25" width="80" height="50" rx="6" 
          fill={isNodeActive('tools') ? colors.tool : colors.border}
          className={`transition-all duration-500 ${isNodeActive('tools') ? 'opacity-100' : 'opacity-30'}`} />
        <text y="-3" textAnchor="middle" fill={colors.bgCard} fontSize="14">🔧</text>
        <text y="12" textAnchor="middle" fill={colors.bgCard} fontSize="9" fontWeight="bold">Tools</text>
      </g>

      {/* Resources */}
      <g transform="translate(500, 160)">
        <rect x="-40" y="-25" width="80" height="50" rx="6" 
          fill={isNodeActive('tools') ? colors.tool : colors.border}
          className={`transition-all duration-500 ${isNodeActive('tools') ? 'opacity-100' : 'opacity-30'}`} />
        <text y="-3" textAnchor="middle" fill={colors.bgCard} fontSize="14">📚</text>
        <text y="12" textAnchor="middle" fill={colors.bgCard} fontSize="9" fontWeight="bold">Resources</text>
      </g>

      {/* Prompts */}
      <g transform="translate(500, 240)">
        <rect x="-40" y="-25" width="80" height="50" rx="6" 
          fill={isNodeActive('tools') ? colors.tool : colors.border}
          className={`transition-all duration-500 ${isNodeActive('tools') ? 'opacity-100' : 'opacity-30'}`} />
        <text y="-3" textAnchor="middle" fill={colors.bgCard} fontSize="14">💬</text>
        <text y="12" textAnchor="middle" fill={colors.bgCard} fontSize="9" fontWeight="bold">Prompts</text>
      </g>

      {/* Connections */}
      <path d="M 150 150 L 245 150" stroke={isConnectionActive('agent-mcp') ? colors.flowActive : colors.flow} 
        strokeWidth={isConnectionActive('agent-mcp') ? 3 : 2} fill="none" className="transition-all duration-300"
        markerEnd="url(#arrowhead)" />
      <path d="M 245 150 L 150 150" stroke={isConnectionActive('mcp-agent') ? colors.mcp : colors.flow} 
        strokeWidth={isConnectionActive('mcp-agent') ? 3 : 2} fill="none" className="transition-all duration-300" 
        strokeDasharray={isConnectionActive('mcp-agent') ? "0" : "5 3"} />
      <line x1="355" y1="120" x2="460" y2="85" stroke={isConnectionActive('mcp-tools') ? colors.flowActive : colors.flow} 
        strokeWidth={isConnectionActive('mcp-tools') ? 3 : 2} className="transition-all duration-300" />
      <line x1="355" y1="150" x2="460" y2="160" stroke={isConnectionActive('mcp-tools') ? colors.flowActive : colors.flow} 
        strokeWidth={isConnectionActive('mcp-tools') ? 3 : 2} className="transition-all duration-300" />
      <line x1="355" y1="180" x2="460" y2="235" stroke={isConnectionActive('mcp-tools') ? colors.flowActive : colors.flow} 
        strokeWidth={isConnectionActive('mcp-tools') ? 3 : 2} className="transition-all duration-300" />
      <line x1="460" y1="85" x2="355" y2="130" stroke={isConnectionActive('tools-mcp') ? colors.tool : colors.flow} 
        strokeWidth={isConnectionActive('tools-mcp') ? 3 : 2} className="transition-all duration-300" strokeDasharray="5 3" />

      {/* Arrow marker */}
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill={colors.flowActive} />
        </marker>
      </defs>

      {/* Labels */}
      <text x="300" y="25" textAnchor="middle" fill={colors.mcp} fontSize="14" fontWeight="bold">
        MCP Pattern
      </text>
      <text x="300" y="285" textAnchor="middle" fill={colors.textMuted} fontSize="10">
        Standardized protocol for tool access • JSON-RPC over stdio/SSE
      </text>
    </svg>
  );

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          Subagents vs Skills vs MCP
        </CardTitle>
        <CardDescription>
          Three complementary patterns for extending agent capabilities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mode Selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button 
            variant={selectedMode === 'subagent' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('subagent')}
            className="gap-2"
            style={{ 
              backgroundColor: selectedMode === 'subagent' ? colors.subagent : undefined,
              borderColor: colors.subagent 
            }}
          >
            <Robot size={16} />
            Subagents
          </Button>
          <Button 
            variant={selectedMode === 'skill' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('skill')}
            className="gap-2"
            style={{ 
              backgroundColor: selectedMode === 'skill' ? colors.skill : undefined,
              borderColor: colors.skill 
            }}
          >
            <PuzzlePiece size={16} />
            Skills
          </Button>
          <Button 
            variant={selectedMode === 'mcp' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('mcp')}
            className="gap-2"
            style={{ 
              backgroundColor: selectedMode === 'mcp' ? colors.mcp : undefined,
              borderColor: colors.mcp 
            }}
          >
            <Plugs size={16} />
            MCP
          </Button>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 mb-4">
          <Button onClick={togglePlayPause} variant="outline" size="sm">
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button onClick={resetAnimation} variant="outline" size="sm">
            <ArrowClockwise size={16} />
            Reset
          </Button>
          <div className="flex-1 mx-4">
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-300 rounded-full"
                style={{ 
                  width: `${((currentPhase + 1) / currentPhases.length) * 100}%`,
                  backgroundColor: getModeColor(selectedMode)
                }}
              />
            </div>
          </div>
          <Badge variant="secondary">
            {currentPhase + 1} / {currentPhases.length}
          </Badge>
        </div>

        {/* Phase Info */}
        <div 
          className="p-3 rounded-lg border-l-4 mb-4"
          style={{ 
            borderColor: getModeColor(selectedMode),
            backgroundColor: isDarkMode ? `${getModeColor(selectedMode)}20` : `${getModeColor(selectedMode)}10`
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Badge style={{ backgroundColor: getModeColor(selectedMode) }}>
              Step {currentPhase + 1}
            </Badge>
            <span className="font-semibold">{currentPhases[currentPhase]?.title}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {currentPhases[currentPhase]?.description}
          </p>
        </div>

        {/* Animated Diagram */}
        <div className="border border-border rounded-lg overflow-hidden">
          {selectedMode === 'subagent' && renderSubagentDiagram()}
          {selectedMode === 'skill' && renderSkillDiagram()}
          {selectedMode === 'mcp' && renderMCPDiagram()}
        </div>

        {/* Comparison Table */}
        <div className="mt-6">
          <h4 className="font-semibold mb-3">Quick Comparison</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800">
                  <th className="p-3 text-left font-semibold">Aspect</th>
                  <th className="p-3 text-center" style={{ color: colors.subagent }}>
                    <Robot className="inline w-4 h-4 mr-1" />Subagent
                  </th>
                  <th className="p-3 text-center" style={{ color: colors.skill }}>
                    <PuzzlePiece className="inline w-4 h-4 mr-1" />Skill
                  </th>
                  <th className="p-3 text-center" style={{ color: colors.mcp }}>
                    <Plugs className="inline w-4 h-4 mr-1" />MCP
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">Purpose</td>
                  <td className="p-3 text-center text-xs">Parallel LLM work</td>
                  <td className="p-3 text-center text-xs">Reusable expertise</td>
                  <td className="p-3 text-center text-xs">External tool access</td>
                </tr>
                <tr className="border-t border-border bg-slate-50 dark:bg-slate-800/50">
                  <td className="p-3 font-medium">Context</td>
                  <td className="p-3 text-center text-xs">Separate</td>
                  <td className="p-3 text-center text-xs">Same (enhanced)</td>
                  <td className="p-3 text-center text-xs">N/A (protocol)</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">LLM Calls</td>
                  <td className="p-3 text-center text-xs">New LLM instance</td>
                  <td className="p-3 text-center text-xs">Same instance</td>
                  <td className="p-3 text-center text-xs">Same instance</td>
                </tr>
                <tr className="border-t border-border bg-slate-50 dark:bg-slate-800/50">
                  <td className="p-3 font-medium">Cost</td>
                  <td className="p-3 text-center text-xs">High (extra tokens)</td>
                  <td className="p-3 text-center text-xs">Low (on-demand)</td>
                  <td className="p-3 text-center text-xs">Medium (tool calls)</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 font-medium">Use When</td>
                  <td className="p-3 text-center text-xs">Complex research</td>
                  <td className="p-3 text-center text-xs">Domain workflows</td>
                  <td className="p-3 text-center text-xs">External systems</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Insight */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800 mt-4">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Lightning className="w-4 h-4" />
            Key Insight: These Patterns Compose
          </h4>
          <p className="text-sm text-muted-foreground">
            An agent using <strong>Skills</strong> for domain expertise can spawn a <strong>Subagent</strong> for 
            parallel research, while both use <strong>MCP</strong> to access external tools and data. 
            Skills enhance agent behavior, Subagents enable parallel work, and MCP provides the 
            standardized protocol layer for tool integration.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubagentSkillsMCPComparison;
