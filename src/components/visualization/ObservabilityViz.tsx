import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, ArrowClockwise } from '@phosphor-icons/react';

interface ObservabilityVizProps {
  autoPlay?: boolean;
}

/**
 * Interactive visualization of agent observability showing:
 * - Distributed tracing (spans across services)
 * - Metrics collection
 * - Log aggregation
 * - Alert flows
 */
export default function ObservabilityViz({ autoPlay = true }: ObservabilityVizProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [step, setStep] = useState(0);
  const [activeSpan, setActiveSpan] = useState(0);

  const maxSteps = 10;
  const width = 700;
  const height = 400;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStep(s => (s + 1) % maxSteps);
      setActiveSpan(s => (s + 1) % 4);
    }, 1200);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const spans = [
    { id: 'agent', name: 'Agent Coordinator', x: 80, width: 520, color: '#8b5cf6', duration: '2.4s' },
    { id: 'llm', name: 'LLM Call', x: 120, width: 280, color: '#3b82f6', duration: '1.8s' },
    { id: 'tool', name: 'Tool Execution', x: 420, width: 160, color: '#22c55e', duration: '0.4s' },
    { id: 'memory', name: 'Memory Retrieval', x: 160, width: 100, color: '#f59e0b', duration: '0.2s' },
  ];

  const metrics = [
    { name: 'Latency', value: '847ms', trend: 'up', color: '#ef4444' },
    { name: 'Tokens', value: '2,340', trend: 'up', color: '#3b82f6' },
    { name: 'Success', value: '98.2%', trend: 'stable', color: '#22c55e' },
    { name: 'Cost', value: '$0.023', trend: 'down', color: '#f59e0b' },
  ];

  const logs = [
    { level: 'INFO', message: 'Agent initialized', time: '00:00.000' },
    { level: 'DEBUG', message: 'Retrieved 3 memories', time: '00:00.124' },
    { level: 'INFO', message: 'LLM response received', time: '00:01.847' },
    { level: 'WARN', message: 'Tool retry on timeout', time: '00:02.103' },
    { level: 'INFO', message: 'Task completed', time: '00:02.401' },
  ];

  const getLogColor = (level: string) => {
    switch (level) {
      case 'INFO': return '#22c55e';
      case 'DEBUG': return '#6b7280';
      case 'WARN': return '#f59e0b';
      case 'ERROR': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Agent Observability Dashboard</h3>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </Button>
            <Button size="sm" variant="outline" onClick={() => { setStep(0); setActiveSpan(0); setIsPlaying(true); }}>
              <ArrowClockwise size={16} />
            </Button>
          </div>
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          <defs>
            <linearGradient id="trace-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow-obs">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Section: Distributed Tracing */}
          <g>
            <rect x={10} y={10} width={width - 20} height={120} rx={8} fill="url(#trace-grad)" stroke="#6b7280" strokeWidth={1} />
            <text x={25} y={32} fill="currentColor" fontSize="14" fontWeight="600">🔍 Distributed Tracing</text>
            
            {/* Timeline */}
            <line x1={60} y1={110} x2={width - 60} y2={110} stroke="#6b7280" strokeWidth={1} />
            {[0, 0.5, 1, 1.5, 2, 2.5].map((t, i) => (
              <g key={i}>
                <line x1={60 + i * 104} y1={105} x2={60 + i * 104} y2={115} stroke="#6b7280" strokeWidth={1} />
                <text x={60 + i * 104} y={125} textAnchor="middle" fill="#6b7280" fontSize="9">{t}s</text>
              </g>
            ))}

            {/* Spans */}
            {spans.map((span, i) => (
              <g key={span.id}>
                <rect
                  x={span.x}
                  y={45 + i * 16}
                  width={span.width}
                  height={12}
                  rx={2}
                  fill={span.color}
                  opacity={activeSpan === i ? 1 : 0.5}
                  filter={activeSpan === i ? 'url(#glow-obs)' : ''}
                  className="transition-all duration-300"
                />
                <text x={span.x + 4} y={45 + i * 16 + 10} fill="white" fontSize="8" fontWeight="500">
                  {span.name}
                </text>
                <text x={span.x + span.width - 4} y={45 + i * 16 + 10} textAnchor="end" fill="white" fontSize="8">
                  {span.duration}
                </text>
                {activeSpan === i && (
                  <circle cx={span.x + span.width} cy={45 + i * 16 + 6} r={4} fill={span.color} className="animate-ping" />
                )}
              </g>
            ))}
          </g>

          {/* Section: Metrics */}
          <g transform="translate(10, 145)">
            <rect x={0} y={0} width={340} height={100} rx={8} fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth={1} />
            <text x={15} y={22} fill="currentColor" fontSize="14" fontWeight="600">📊 Real-time Metrics</text>
            
            {metrics.map((metric, i) => (
              <g key={metric.name} transform={`translate(${15 + i * 80}, 40)`}>
                <rect x={0} y={0} width={70} height={50} rx={4} fill="rgba(0,0,0,0.2)" />
                <text x={35} y={18} textAnchor="middle" fill="#9ca3af" fontSize="10">{metric.name}</text>
                <text x={35} y={38} textAnchor="middle" fill={metric.color} fontSize="16" fontWeight="600">
                  {metric.value}
                </text>
                <text x={60} y={18} fill={metric.trend === 'up' ? '#ef4444' : metric.trend === 'down' ? '#22c55e' : '#6b7280'} fontSize="10">
                  {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                </text>
              </g>
            ))}
          </g>

          {/* Section: Logs */}
          <g transform="translate(360, 145)">
            <rect x={0} y={0} width={330} height={100} rx={8} fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth={1} />
            <text x={15} y={22} fill="currentColor" fontSize="14" fontWeight="600">📝 Structured Logs</text>
            
            {logs.map((log, i) => (
              <g key={i} transform={`translate(10, ${35 + i * 13})`} opacity={i <= step % 5 ? 1 : 0.3}>
                <rect x={0} y={0} width={38} height={11} rx={2} fill={getLogColor(log.level)} opacity={0.3} />
                <text x={19} y={9} textAnchor="middle" fill={getLogColor(log.level)} fontSize="7" fontWeight="600">
                  {log.level}
                </text>
                <text x={45} y={9} fill="currentColor" fontSize="8">{log.message}</text>
                <text x={305} y={9} textAnchor="end" fill="#6b7280" fontSize="7">{log.time}</text>
              </g>
            ))}
          </g>

          {/* Section: Alert Flow */}
          <g transform="translate(10, 260)">
            <rect x={0} y={0} width={width - 20} height={130} rx={8} fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth={1} />
            <text x={15} y={22} fill="currentColor" fontSize="14" fontWeight="600">🚨 Alert Pipeline</text>

            {/* Alert flow diagram */}
            <g transform="translate(30, 45)">
              {['Metrics', 'Threshold', 'Evaluate', 'Route', 'Notify'].map((label, i) => {
                const isActive = step % 5 >= i;
                return (
                  <g key={label}>
                    <rect
                      x={i * 130}
                      y={0}
                      width={100}
                      height={40}
                      rx={6}
                      fill={isActive ? '#f59e0b' : 'rgba(0,0,0,0.2)'}
                      opacity={isActive ? 0.8 : 0.4}
                      className="transition-all duration-300"
                    />
                    <text
                      x={i * 130 + 50}
                      y={25}
                      textAnchor="middle"
                      fill={isActive ? 'white' : '#9ca3af'}
                      fontSize="12"
                      fontWeight="500"
                    >
                      {label}
                    </text>
                    {i < 4 && (
                      <path
                        d={`M${i * 130 + 105} 20 L${i * 130 + 125} 20`}
                        stroke={step % 5 > i ? '#f59e0b' : '#6b7280'}
                        strokeWidth={2}
                        markerEnd="url(#arrowhead-obs)"
                        className="transition-all duration-300"
                      />
                    )}
                  </g>
                );
              })}
            </g>

            {/* Sample alert */}
            <g transform="translate(30, 100)">
              <rect x={0} y={0} width={620} height={20} rx={4} fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth={1} />
              <circle cx={12} cy={10} r={4} fill="#ef4444" className={step > 3 ? 'animate-pulse' : ''} />
              <text x={25} y={14} fill="#ef4444" fontSize="10" fontWeight="500">
                ALERT: Latency exceeded threshold (847ms &gt; 500ms) - Escalating to PagerDuty
              </text>
            </g>
          </g>

          {/* Arrow marker */}
          <defs>
            <marker id="arrowhead-obs" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#f59e0b" />
            </marker>
          </defs>
        </svg>
      </CardContent>
    </Card>
  );
}
