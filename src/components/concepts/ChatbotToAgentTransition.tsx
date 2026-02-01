import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AudioNarrationControls from '@/components/audio/AudioNarrationControls';

interface AnimationStep {
  id: string;
  title: string;
  description: string;
  chatbotResponse?: string;
  agentThought?: string;
  agentAction?: string;
  agentObservation?: string;
  agentResponse?: string;
  duration: number;
  highlight: string[];
}

const ChatbotToAgentTransition: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  const animationSteps: AnimationStep[] = [
    {
      id: 'user-query',
      title: 'User Query',
      description: 'User asks a complex question requiring multiple steps',
      duration: 2000,
      highlight: ['user-input']
    },
    {
      id: 'chatbot-response',
      title: 'Traditional Chatbot',
      description: 'Provides a direct but limited response',
      chatbotResponse: 'I can help you with scheduling. Please provide more details about what you need.',
      duration: 3000,
      highlight: ['chatbot-response']
    },
    {
      id: 'agent-thinking',
      title: 'Azure AI Agent - Planning',
      description: 'Agent analyzes the query and creates a multi-step plan',
      agentThought: 'I need to: 1) Check calendar availability, 2) Calculate optimal meeting times, 3) Send invitations, 4) Set reminders',
      duration: 3500,
      highlight: ['agent-planning', 'memory']
    },
    {
      id: 'agent-tool-1',
      title: 'Tool Usage - Calendar',
      description: 'Agent uses calendar tool to check availability',
      agentAction: 'calendar.getAvailability(participants, timeRange)',
      agentObservation: 'Found 3 available slots: 2pm-3pm, 4pm-5pm, 9am-10am tomorrow',
      duration: 3000,
      highlight: ['tools', 'calendar-tool']
    },
    {
      id: 'agent-tool-2',
      title: 'Tool Usage - Calculator',
      description: 'Agent calculates optimal meeting time based on preferences',
      agentAction: 'calculator.findOptimalTime(availableSlots, preferences)',
      agentObservation: 'Optimal time: 2pm-3pm today (highest preference score: 0.95)',
      duration: 3000,
      highlight: ['tools', 'calculator-tool']
    },
    {
      id: 'agent-reflection',
      title: 'Self-Reflection',
      description: 'Agent reviews its plan and considers next steps',
      agentThought: 'I have found the optimal time. Now I should send calendar invitations and set up reminders.',
      duration: 2500,
      highlight: ['reflection', 'planning']
    },
    {
      id: 'agent-final-action',
      title: 'Final Actions',
      description: 'Agent executes remaining tasks autonomously',
      agentAction: 'calendar.sendInvitations() + reminder.schedule()',
      agentObservation: 'Invitations sent to 3 participants. Reminders set for 1 hour and 15 minutes before.',
      duration: 3000,
      highlight: ['tools', 'action']
    },
    {
      id: 'agent-response',
      title: 'Complete Response',
      description: 'Agent provides comprehensive results',
      agentResponse: 'I\'ve scheduled your team meeting for today 2-3pm. All participants have been invited and reminders are set. The meeting room is booked and I\'ve prepared the agenda based on your requirements.',
      duration: 4000,
      highlight: ['agent-response', 'memory']
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
      setShowComparison(true);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, animationSteps]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setShowComparison(false);
  };

  const currentStepData = animationSteps[currentStep];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>From Chatbot to Azure AI Agent</span>
          <Badge className="ring-1 bg-[var(--badge-gray-bg)] ring-[var(--badge-gray-ring)] text-[var(--badge-gray-text)]">Interactive Demo</Badge>
        </CardTitle>
        <p className="text-muted-foreground">
          Watch how Azure AI Agents differ from traditional chatbots through autonomous reasoning and tool usage
        </p>
        
        {/* Audio Narration Controls */}
        <AudioNarrationControls 
          componentName="ChatbotToAgentTransition"
          position="embedded"
        />
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
              viewBox="0 0 1200 620"
              className="w-full h-auto border rounded-lg bg-muted text-foreground"
            >
              {/* Define styles for dark mode compatibility */}
              <defs>
                <style>
                  {`
                    .svg-text-primary { fill: var(--foreground); font-family: 'Inter', sans-serif; font-weight: 600; }
                    .svg-text-secondary { fill: var(--muted-foreground); font-family: 'Inter', sans-serif; }
                    .svg-text-white { fill: var(--primary-foreground); font-family: 'Inter', sans-serif; font-weight: 600; }
                    .svg-text-muted { fill: var(--muted-foreground); font-family: 'Inter', sans-serif; }

                    .svg-line {
                      stroke: var(--primary);
                      stroke-width: 3;
                      opacity: 0.85;
                      transition: stroke 0.3s ease, opacity 0.3s ease;
                    }
                    .svg-line-muted {
                      stroke: var(--border);
                      stroke-width: 2;
                      opacity: 0.7;
                      transition: stroke 0.3s ease, opacity 0.3s ease;
                    }

                    .svg-line-animated {
                      stroke: var(--primary);
                      stroke-width: 3;
                      opacity: 1;
                      stroke-dasharray: 12 6;
                      animation: flowAnimation 2s ease-in-out infinite;
                    }
                    .svg-line-muted-animated {
                      stroke: var(--border);
                      stroke-width: 2;
                      opacity: 0.9;
                      stroke-dasharray: 10 5;
                      animation: flowAnimation 1.6s ease-in-out infinite;
                    }

                    @keyframes flowAnimation {
                      0% { stroke-dashoffset: 0; }
                      100% { stroke-dashoffset: -18; }
                    }

                    .svg-bg-user,
                    .svg-bg-chatbot,
                    .svg-bg-agent,
                    .svg-bg-memory,
                    .svg-bg-tools,
                    .svg-bg-planning,
                    .svg-bg-reflection,
                    .svg-bg-action,
                    .svg-bg-response {
                      transition: fill 0.3s ease, stroke 0.3s ease, filter 0.3s ease;
                    }

                    .svg-bg-user {
                      fill: var(--primary);
                      fill-opacity: 0.15;
                      stroke: var(--primary);
                      stroke-opacity: 0.45;
                      stroke-width: 2;
                    }
                    .svg-bg-user-active {
                      fill: var(--primary);
                      fill-opacity: 1;
                      stroke: var(--primary);
                      stroke-opacity: 1;
                      stroke-width: 2;
                      filter: drop-shadow(0 12px 24px rgba(16, 163, 127, 0.35));
                    }

                    .svg-bg-chatbot {
                      fill: var(--card);
                      stroke: var(--border);
                      stroke-width: 2;
                    }
                    .svg-bg-chatbot-active {
                      fill: var(--destructive);
                      fill-opacity: 0.16;
                      stroke: var(--destructive);
                      stroke-width: 2;
                      filter: drop-shadow(0 12px 24px rgba(220, 38, 38, 0.25));
                    }

                    .svg-bg-agent {
                      fill: var(--accent);
                      fill-opacity: 0.18;
                      stroke: var(--accent);
                      stroke-opacity: 0.55;
                      stroke-width: 2;
                    }
                    .svg-bg-agent-active {
                      fill: var(--accent);
                      fill-opacity: 1;
                      stroke: var(--accent);
                      stroke-opacity: 1;
                      stroke-width: 2;
                      filter: drop-shadow(0 12px 24px rgba(16, 163, 127, 0.35));
                    }

                    .svg-bg-memory,
                    .svg-bg-tools,
                    .svg-bg-planning,
                    .svg-bg-reflection,
                    .svg-bg-action {
                      fill: var(--muted);
                      stroke: var(--border);
                      stroke-width: 1.5;
                    }

                    .svg-bg-memory-active {
                      fill: var(--primary);
                      fill-opacity: 0.85;
                      stroke: var(--primary);
                      stroke-width: 2;
                    }
                    .svg-bg-tools-active {
                      fill: var(--accent);
                      fill-opacity: 0.85;
                      stroke: var(--accent);
                      stroke-width: 2;
                    }
                    .svg-bg-planning-active {
                      fill: var(--primary);
                      fill-opacity: 0.9;
                      stroke: var(--primary);
                      stroke-width: 2;
                    }
                    .svg-bg-reflection-active {
                      fill: var(--accent);
                      fill-opacity: 0.9;
                      stroke: var(--accent);
                      stroke-width: 2;
                    }
                    .svg-bg-action-active {
                      fill: var(--destructive);
                      fill-opacity: 0.9;
                      stroke: var(--destructive);
                      stroke-width: 2;
                    }

                    .svg-bg-response {
                      fill: var(--card);
                      stroke: var(--border);
                      stroke-width: 2;
                    }
                    .svg-bg-response-active {
                      fill: var(--primary);
                      fill-opacity: 0.18;
                      stroke: var(--primary);
                      stroke-width: 2;
                      filter: drop-shadow(0 12px 24px rgba(16, 163, 127, 0.25));
                    }

                    @media (prefers-color-scheme: dark) {
                      .svg-line-muted,
                      .svg-line-muted-animated {
                        stroke: var(--muted-foreground);
                        stroke-opacity: 0.6;
                      }

                      .svg-bg-memory,
                      .svg-bg-tools,
                      .svg-bg-planning,
                      .svg-bg-reflection,
                      .svg-bg-action {
                        fill: var(--muted);
                        fill-opacity: 0.65;
                      }
                    }
                  `}
                </style>
                <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="var(--primary)" />
                </marker>
                <marker id="arrowhead-animated" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="var(--primary)" />
                </marker>
              </defs>

              {/* User Input */}
              <g>
                <rect
                  x="50"
                  y="50"
                  width="240"
                  height="100"
                  rx="12"
                  className={currentStepData.highlight.includes('user-input') ? 'svg-bg-user-active' : 'svg-bg-user'}
                  style={{ transition: 'all 0.5s ease' }}
                />
                <text x="170" y="90" textAnchor="middle" className="svg-text-white" fontSize="18" fontWeight="700">
                  User Query
                </text>
                <text x="170" y="115" textAnchor="middle" className="svg-text-white" fontSize="15">
                  "Schedule a team meeting"
                </text>
              </g>

              {/* Chatbot Side */}
              <g>
                <text x="170" y="180" textAnchor="middle" className="svg-text-primary" fontSize="18" fontWeight="700">
                  Traditional Chatbot
                </text>
                <rect
                  x="50"
                  y="200"
                  width="240"
                  height="150"
                  rx="12"
                  className={currentStepData.highlight.includes('chatbot-response') ? 'svg-bg-chatbot-active' : 'svg-bg-chatbot'}
                  style={{ transition: 'all 0.5s ease' }}
                />
                <text x="170" y="240" textAnchor="middle" className="svg-text-primary" fontSize="16" fontWeight="600">
                  Direct Response
                </text>
                {currentStepData.chatbotResponse && (
                  <AnimatePresence>
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <text x="70" y="270" className="svg-text-secondary" fontSize="14">
                        <tspan x="70" dy="0">{currentStepData.chatbotResponse.slice(0, 25)}</tspan>
                        <tspan x="70" dy="20">{currentStepData.chatbotResponse.slice(25, 50)}</tspan>
                        <tspan x="70" dy="20">{currentStepData.chatbotResponse.slice(50, 75)}</tspan>
                        <tspan x="70" dy="20">{currentStepData.chatbotResponse.slice(75)}</tspan>
                      </text>
                    </motion.g>
                  </AnimatePresence>
                )}
              </g>

              {/* Agent Side */}
              <g>
                <text x="600" y="180" textAnchor="middle" className="svg-text-primary" fontSize="18" fontWeight="700">
                  Azure AI Agent
                </text>
                
                {/* Agent Core */}
                <rect
                  x="470"
                  y="300"
                  width="260"
                  height="120"
                  rx="15"
                  className={currentStepData.highlight.includes('agent-planning') ? 'svg-bg-agent-active' : 'svg-bg-agent'}
                  style={{ transition: 'all 0.5s ease' }}
                />
                <text x="600" y="350" textAnchor="middle" className="svg-text-white" fontSize="18" fontWeight="700">
                  Agent Core
                </text>
                <text x="600" y="375" textAnchor="middle" className="svg-text-white" fontSize="15">
                  (Planning & Reasoning)
                </text>

                {/* Memory components with larger text */}
                <rect
                  x="420"
                  y="200"
                  width="150"
                  height="80"
                  rx="12"
                  className={currentStepData.highlight.includes('memory') ? 'svg-bg-memory-active' : 'svg-bg-memory'}
                  style={{ transition: 'all 0.5s ease' }}
                />
                <text x="495" y="235" textAnchor="middle" className="svg-text-white" fontSize="15" fontWeight="600">
                  Short-term
                </text>
                <text x="495" y="255" textAnchor="middle" className="svg-text-white" fontSize="15" fontWeight="600">
                  Memory
                </text>

                <rect
                  x="630"
                  y="200"
                  width="150"
                  height="80"
                  rx="12"
                  className={currentStepData.highlight.includes('memory') ? 'svg-bg-memory-active' : 'svg-bg-memory'}
                  style={{ transition: 'all 0.5s ease' }}
                />
                <text x="705" y="235" textAnchor="middle" className="svg-text-white" fontSize="15" fontWeight="600">
                  Long-term
                </text>
                <text x="705" y="255" textAnchor="middle" className="svg-text-white" fontSize="15" fontWeight="600">
                  Memory
                </text>

                {/* Tools with larger text and boxes */}
                <rect
                  x="300"
                  y="320"
                  width="130"
                  height="70"
                  rx="12"
                  className={currentStepData.highlight.includes('tools') || currentStepData.highlight.includes('calendar-tool') ? 'svg-bg-tools-active' : 'svg-bg-tools'}
                  style={{ transition: 'all 0.5s ease' }}
                />
                <text x="365" y="365" textAnchor="middle" className="svg-text-white" fontSize="15" fontWeight="600">
                  Calendar()
                </text>

                <rect
                  x="300"
                  y="400"
                  width="130"
                  height="70"
                  rx="12"
                  className={currentStepData.highlight.includes('tools') || currentStepData.highlight.includes('calculator-tool') ? 'svg-bg-tools-active' : 'svg-bg-tools'}
                  style={{ transition: 'all 0.5s ease' }}
                />
                <text x="365" y="445" textAnchor="middle" className="svg-text-white" fontSize="15" fontWeight="600">
                  Calculator()
                </text>

                <rect
                  x="300"
                  y="480"
                  width="130"
                  height="70"
                  rx="12"
                  className={currentStepData.highlight.includes('tools') ? 'svg-bg-tools-active' : 'svg-bg-tools'}
                  style={{ transition: 'all 0.5s ease' }}
                />
                <text x="365" y="525" textAnchor="middle" className="svg-text-white" fontSize="15" fontWeight="600">
                  Search()
                </text>

                <rect
                  x="300"
                  y="560"
                  width="130"
                  height="50"
                  rx="12"
                  className={currentStepData.highlight.includes('tools') ? 'svg-bg-tools-active' : 'svg-bg-tools'}
                  style={{ transition: 'all 0.5s ease' }}
                />
                <text x="365" y="590" textAnchor="middle" className="svg-text-white" fontSize="14" fontWeight="600">
                  ...more
                </text>

                {/* Planning with larger text */}
                <rect
                  x="770"
                  y="320"
                  width="150"
                  height="80"
                  rx="12"
                  className={currentStepData.highlight.includes('planning') ? 'svg-bg-planning-active' : 'svg-bg-planning'}
                  style={{ transition: 'all 0.5s ease' }}
                />
                <text x="845" y="370" textAnchor="middle" className="svg-text-white" fontSize="16" fontWeight="600">
                  Planning
                </text>

                {/* Reflection capabilities with larger text */}
                <rect
                  x="950"
                  y="280"
                  width="150"
                  height="55"
                  rx="12"
                  className={currentStepData.highlight.includes('reflection') ? 'svg-bg-reflection-active' : 'svg-bg-reflection'}
                  style={{ transition: 'all 0.5s ease' }}
                />
                <text x="1025" y="315" textAnchor="middle" className="svg-text-white" fontSize="15" fontWeight="600">
                  Reflection
                </text>

                <rect
                  x="950"
                  y="345"
                  width="150"
                  height="55"
                  rx="12"
                  className={currentStepData.highlight.includes('reflection') ? 'svg-bg-reflection-active' : 'svg-bg-reflection'}
                  style={{ transition: 'all 0.5s ease' }}
                />
                <text x="1025" y="380" textAnchor="middle" className="svg-text-white" fontSize="15" fontWeight="600">
                  Self-critics
                </text>

                <rect
                  x="950"
                  y="410"
                  width="150"
                  height="55"
                  rx="12"
                  className={currentStepData.highlight.includes('reflection') ? 'svg-bg-reflection-active' : 'svg-bg-reflection'}
                  style={{ transition: 'all 0.5s ease' }}
                />
                <text x="1025" y="445" textAnchor="middle" className="svg-text-white" fontSize="14" fontWeight="600">
                  Chain of thoughts
                </text>

                <rect
                  x="950"
                  y="475"
                  width="150"
                  height="65"
                  rx="12"
                  className={currentStepData.highlight.includes('reflection') ? 'svg-bg-reflection-active' : 'svg-bg-reflection'}
                  style={{ transition: 'all 0.5s ease' }}
                />
                <text x="1025" y="500" textAnchor="middle" className="svg-text-white" fontSize="14" fontWeight="600">
                  Subgoal
                </text>
                <text x="1025" y="520" textAnchor="middle" className="svg-text-white" fontSize="14" fontWeight="600">
                  decomposition
                </text>

                {/* Action */}
                <rect
                  x="770"
                  y="420"
                  width="150"
                  height="80"
                  rx="12"
                  className={currentStepData.highlight.includes('action') ? 'svg-bg-action-active' : 'svg-bg-action'}
                  style={{ transition: 'all 0.5s ease' }}
                />
                <text x="845" y="470" textAnchor="middle" className="svg-text-white" fontSize="16" fontWeight="600">
                  Action
                </text>

                {/* Connection lines with smooth curves and enhanced animation */}
                <path 
                  d="M 570 240 Q 575 270 580 300" 
                  fill="none"
                  className={currentStepData.highlight.includes('memory') || currentStepData.highlight.includes('agent-planning') ? 'svg-line-muted-animated' : 'svg-line-muted'} 
                  markerEnd="url(#arrowhead)"
                  style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                />
                <path 
                  d="M 630 240 Q 625 270 620 300" 
                  fill="none"
                  className={currentStepData.highlight.includes('memory') || currentStepData.highlight.includes('agent-planning') ? 'svg-line-muted-animated' : 'svg-line-muted'} 
                  markerEnd="url(#arrowhead)"
                  style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                />
                <path 
                  d="M 430 360 Q 450 360 470 360" 
                  fill="none"
                  className={currentStepData.highlight.includes('tools') || currentStepData.highlight.includes('calendar-tool') || currentStepData.highlight.includes('calculator-tool') ? 'svg-line-muted-animated' : 'svg-line-muted'} 
                  markerEnd="url(#arrowhead)"
                  style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                />
                <path 
                  d="M 730 360 Q 750 360 770 360" 
                  fill="none"
                  className={currentStepData.highlight.includes('planning') || currentStepData.highlight.includes('action') ? 'svg-line-muted-animated' : 'svg-line-muted'} 
                  markerEnd="url(#arrowhead)"
                  style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                />
                <path 
                  d="M 730 360 Q 750 410 770 460" 
                  fill="none"
                  className={currentStepData.highlight.includes('planning') || currentStepData.highlight.includes('action') ? 'svg-line-muted-animated' : 'svg-line-muted'} 
                  markerEnd="url(#arrowhead)"
                  style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                />
                <path 
                  d="M 920 360 Q 935 360 950 360" 
                  fill="none"
                  className={currentStepData.highlight.includes('reflection') ? 'svg-line-muted-animated' : 'svg-line-muted'} 
                  markerEnd="url(#arrowhead)"
                  style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                />

                {/* Agent Response - positioned in top right corner for better aesthetics */}
                <rect
                  x="850"
                  y="50"
                  width="300"
                  height="180"
                  rx="12"
                  className={currentStepData.highlight.includes('agent-response') ? 'svg-bg-response-active' : 'svg-bg-response'}
                  style={{ transition: 'all 0.5s ease' }}
                />
                <text x="1000" y="85" textAnchor="middle" className="svg-text-primary" fontSize="16" fontWeight="700">
                  Comprehensive Response
                </text>
                {currentStepData.agentResponse && (
                  <AnimatePresence>
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <text x="870" y="115" className="svg-text-secondary" fontSize="14">
                        <tspan x="870" dy="0">{currentStepData.agentResponse.slice(0, 35)}</tspan>
                        <tspan x="870" dy="20">{currentStepData.agentResponse.slice(35, 70)}</tspan>
                        <tspan x="870" dy="20">{currentStepData.agentResponse.slice(70, 105)}</tspan>
                        <tspan x="870" dy="20">{currentStepData.agentResponse.slice(105, 140)}</tspan>
                        <tspan x="870" dy="20">{currentStepData.agentResponse.slice(140, 175)}</tspan>
                        <tspan x="870" dy="20">{currentStepData.agentResponse.slice(175, 210)}</tspan>
                        <tspan x="870" dy="20">{currentStepData.agentResponse.slice(210)}</tspan>
                      </text>
                    </motion.g>
                  </AnimatePresence>
                )}
              </g>

              {/* Enhanced flow arrows with smooth curves and animations */}
              <path 
                d="M 170 150 Q 170 165 170 180" 
                fill="none"
                stroke="rgb(59 130 246)"
                strokeWidth="4"
                className={currentStepData.highlight.includes('user-input') || currentStepData.highlight.includes('chatbot-response') ? 'svg-line-animated' : 'svg-line'} 
                markerEnd={currentStepData.highlight.includes('user-input') || currentStepData.highlight.includes('chatbot-response') ? 'url(#arrowhead-animated)' : 'url(#arrowhead)'}
                style={{ strokeLinecap: 'round', strokeLinejoin: 'round', filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))' }}
              />
              
              <path 
                d="M 320 100 Q 390 100 460 100" 
                fill="none"
                stroke="rgb(59 130 246)"
                strokeWidth="4"
                className={currentStep >= 2 ? 'svg-line-animated' : 'svg-line'} 
                markerEnd={currentStep >= 2 ? 'url(#arrowhead-animated)' : 'url(#arrowhead)'}
                style={{ strokeLinecap: 'round', strokeLinejoin: 'round', filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))' }}
              >
                {currentStep >= 2 && (
                  <animate attributeName="stroke-width" values="4;6;4" dur="2s" repeatCount="indefinite"/>
                )}
              </path>
              
              <path 
                d="M 480 100 Q 480 150 480 200" 
                fill="none"
                stroke="rgb(59 130 246)"
                strokeWidth="4"
                className={currentStep >= 2 ? 'svg-line-animated' : 'svg-line'} 
                markerEnd={currentStep >= 2 ? 'url(#arrowhead-animated)' : 'url(#arrowhead)'}
                style={{ strokeLinecap: 'round', strokeLinejoin: 'round', filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))' }}
              >
                {currentStep >= 2 && (
                  <animate attributeName="stroke-width" values="4;6;4" dur="2s" repeatCount="indefinite"/>
                )}
              </path>

              {/* Flowing data particles along the main paths */}
              {(currentStepData.highlight.includes('user-input') || currentStepData.highlight.includes('chatbot-response')) && (
                <circle r="3" fill="rgb(34 197 94)" opacity="0.8">
                  <animateMotion dur="1.5s" repeatCount="indefinite">
                    <path d="M 170 150 Q 170 165 170 180"/>
                  </animateMotion>
                  <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite"/>
                </circle>
              )}
              
              {currentStep >= 2 && (
                <>
                  <circle r="3" fill="rgb(34 197 94)" opacity="0.8">
                    <animateMotion dur="2s" repeatCount="indefinite">
                      <path d="M 320 100 Q 390 100 460 100"/>
                    </animateMotion>
                    <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite"/>
                  </circle>
                  
                  <circle r="3" fill="rgb(34 197 94)" opacity="0.8">
                    <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s">
                      <path d="M 480 100 Q 480 150 480 200"/>
                    </animateMotion>
                    <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite"/>
                  </circle>
                </>
              )}

            </svg>
          </div>

          {/* Step Information */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-colors"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="border-border bg-muted/40 text-xs font-medium uppercase tracking-wide">
                  Step {currentStep + 1}
                </Badge>
                <h3 className="font-semibold text-lg text-foreground">{currentStepData.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{currentStepData.description}</p>
              
              {currentStepData.agentThought && (
                <div
                  className="mb-3 rounded-lg border bg-muted px-4 py-3 shadow-sm transition-colors dark:bg-muted/80"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Agent Thought</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground dark:text-card-foreground">{currentStepData.agentThought}</p>
                </div>
              )}
              
              {currentStepData.agentAction && (
                <div
                  className="mb-3 rounded-lg border border-dashed bg-card px-4 py-3 shadow-sm transition-colors"
                  style={{ borderColor: 'var(--primary)' }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Agent Action</p>
                  <code className="mt-2 inline-block rounded bg-muted px-2 py-1 text-xs font-mono text-foreground">
                    {currentStepData.agentAction}
                  </code>
                </div>
              )}
              
              {currentStepData.agentObservation && (
                <div
                  className="rounded-lg border bg-muted px-4 py-3 shadow-sm transition-colors dark:bg-muted/80"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Observation</p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground dark:text-card-foreground">{currentStepData.agentObservation}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Comparison Summary */}
          <AnimatePresence>
            {showComparison && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
              >
                <Card className="border border-destructive/40 bg-card shadow-sm dark:border-destructive/40 dark:bg-destructive/15">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-foreground dark:text-destructive-foreground">
                      Traditional Chatbot
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span className="text-sm">Reactive responses only</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span className="text-sm">Limited to single interactions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span className="text-sm">No autonomous planning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span className="text-sm">Cannot use external tools</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-primary/40 bg-card shadow-sm dark:border-primary/40 dark:bg-primary/15">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-semibold text-foreground dark:text-primary-foreground">
                      Azure AI Agent
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="text-sm">Multi-step autonomous planning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="text-sm">Tool usage and API integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="text-sm">Memory and context tracking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="text-sm">Self-reflection and adaptation</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatbotToAgentTransition;


















