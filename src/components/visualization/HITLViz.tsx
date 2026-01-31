import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, ArrowClockwise } from '@phosphor-icons/react';

interface HITLVizProps {
  autoPlay?: boolean;
}

/**
 * Interactive visualization of Human-in-the-Loop patterns showing:
 * - Approval workflows
 * - Confidence thresholds
 * - Escalation paths
 * - Feedback loops
 */
export default function HITLViz({ autoPlay = true }: HITLVizProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [step, setStep] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState<{ id: number; type: string; confidence: number; status: 'pending' | 'approved' | 'rejected' }[]>([]);

  const maxSteps = 16;
  const width = 700;
  const height = 420;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStep(s => (s + 1) % maxSteps);
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Generate approval requests
  useEffect(() => {
    if (step % 3 === 0 && pendingApprovals.length < 4) {
      const types = ['Tool Call', 'External API', 'Data Access', 'Send Email'];
      setPendingApprovals(prev => [...prev, {
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)],
        confidence: Math.round(60 + Math.random() * 35),
        status: 'pending'
      }]);
    }
    // Auto-approve/reject based on step
    if (step % 4 === 0 && pendingApprovals.length > 0) {
      setPendingApprovals(prev => {
        const [first, ...rest] = prev;
        if (!first) return prev;
        return [...rest, { ...first, status: first.confidence > 80 ? 'approved' : 'rejected' }];
      });
    }
  }, [step, pendingApprovals.length]);

  const handleReset = () => {
    setStep(0);
    setPendingApprovals([]);
    setIsPlaying(true);
  };

  const patterns = [
    { name: 'Approval Gates', desc: 'Require human sign-off before critical actions', icon: '✋', color: '#ef4444' },
    { name: 'Confidence Thresholds', desc: 'Auto-approve high confidence, escalate low', icon: '📊', color: '#f59e0b' },
    { name: 'Feedback Loops', desc: 'Learn from corrections to improve over time', icon: '🔄', color: '#3b82f6' },
    { name: 'Graceful Handoff', desc: 'Seamlessly transfer to human when needed', icon: '🤝', color: '#22c55e' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#22c55e';
      case 'rejected': return '#ef4444';
      default: return '#f59e0b';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return '✓';
      case 'rejected': return '✗';
      default: return '⏳';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Human-in-the-Loop Workflow</h3>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </Button>
            <Button size="sm" variant="outline" onClick={handleReset}>
              <ArrowClockwise size={16} />
            </Button>
          </div>
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          <defs>
            <linearGradient id="hitl-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
            </linearGradient>
            <marker id="arrow-hitl" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#6b7280" />
            </marker>
            <marker id="arrow-hitl-green" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#22c55e" />
            </marker>
            <marker id="arrow-hitl-red" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#ef4444" />
            </marker>
          </defs>

          {/* Main Flow Diagram */}
          <g>
            <rect x={10} y={10} width={width - 20} height={160} rx={8} fill="url(#hitl-grad)" stroke="#6b7280" strokeWidth={1} />
            <text x={25} y={32} fill="currentColor" fontSize="14" fontWeight="600">🔄 Approval Workflow</text>

            {/* Agent node */}
            <g transform="translate(40, 60)">
              <rect x={0} y={0} width={80} height={80} rx={8} fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth={2} />
              <text x={40} y={35} textAnchor="middle" fontSize="24">🤖</text>
              <text x={40} y={55} textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="500">AI Agent</text>
              <text x={40} y={70} textAnchor="middle" fill="#8b5cf6" fontSize="9">Proposes action</text>
            </g>

            {/* Decision diamond */}
            <g transform="translate(195, 70)">
              <polygon
                points="40,0 80,40 40,80 0,40"
                fill="rgba(245, 158, 11, 0.3)"
                stroke="#f59e0b"
                strokeWidth={2}
                className={step % 4 < 2 ? 'animate-pulse' : ''}
              />
              <text x={40} y={35} textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="500">Confidence</text>
              <text x={40} y={50} textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">&gt;80%?</text>
            </g>

            {/* Auto-approve path */}
            <g transform="translate(320, 50)">
              <rect x={0} y={0} width={100} height={50} rx={6} fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth={2} />
              <text x={50} y={22} textAnchor="middle" fontSize="14">✓</text>
              <text x={50} y={38} textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="500">Auto-Approve</text>
            </g>

            {/* Human review path */}
            <g transform="translate(320, 110)">
              <rect x={0} y={0} width={100} height={50} rx={6} fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth={2} />
              <text x={50} y={22} textAnchor="middle" fontSize="14">👤</text>
              <text x={50} y={38} textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="500">Human Review</text>
            </g>

            {/* Execute node */}
            <g transform="translate(470, 60)">
              <rect x={0} y={0} width={80} height={80} rx={8} fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth={2} />
              <text x={40} y={35} textAnchor="middle" fontSize="24">⚡</text>
              <text x={40} y={55} textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="500">Execute</text>
              <text x={40} y={70} textAnchor="middle" fill="#22c55e" fontSize="9">Action runs</text>
            </g>

            {/* Feedback loop */}
            <g transform="translate(580, 60)">
              <rect x={0} y={0} width={80} height={80} rx={8} fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth={2} />
              <text x={40} y={35} textAnchor="middle" fontSize="24">📝</text>
              <text x={40} y={55} textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="500">Feedback</text>
              <text x={40} y={70} textAnchor="middle" fill="#3b82f6" fontSize="9">Learn & adapt</text>
            </g>

            {/* Arrows */}
            <path d="M120 100 L190 100" stroke="#8b5cf6" strokeWidth={2} markerEnd="url(#arrow-hitl)" />
            <path d="M275 85 L315 75" stroke="#22c55e" strokeWidth={2} markerEnd="url(#arrow-hitl-green)" />
            <path d="M275 115 L315 135" stroke="#ef4444" strokeWidth={2} markerEnd="url(#arrow-hitl-red)" />
            <path d="M420 75 L465 95" stroke="#22c55e" strokeWidth={2} markerEnd="url(#arrow-hitl-green)" />
            <path d="M420 135 L465 105" stroke="#22c55e" strokeWidth={2} markerEnd="url(#arrow-hitl-green)" />
            <path d="M550 100 L575 100" stroke="#22c55e" strokeWidth={2} markerEnd="url(#arrow-hitl-green)" />
            
            {/* Feedback loop arrow back */}
            <path d="M620 145 Q620 165 40 165 Q20 165 20 145 L20 105" stroke="#3b82f6" strokeWidth={1.5} strokeDasharray="4,4" fill="none" markerEnd="url(#arrow-hitl)" />
            <text x={320} y={160} textAnchor="middle" fill="#3b82f6" fontSize="8">Improve confidence thresholds</text>

            {/* Animated pulse on current step */}
            {step % 8 < 2 && <circle cx={80} cy={100} r={8} fill="#8b5cf6" className="animate-ping" />}
            {step % 8 >= 2 && step % 8 < 4 && <circle cx={235} cy={110} r={8} fill="#f59e0b" className="animate-ping" />}
            {step % 8 >= 4 && step % 8 < 6 && <circle cx={510} cy={100} r={8} fill="#22c55e" className="animate-ping" />}
            {step % 8 >= 6 && <circle cx={620} cy={100} r={8} fill="#3b82f6" className="animate-ping" />}
          </g>

          {/* Pending Approvals Queue */}
          <g transform="translate(10, 185)">
            <rect x={0} y={0} width={280} height={130} rx={8} fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth={1} />
            <text x={15} y={22} fill="currentColor" fontSize="14" fontWeight="600">⏳ Approval Queue</text>
            
            {pendingApprovals.slice(0, 4).map((approval, i) => (
              <g key={approval.id} transform={`translate(15, ${38 + i * 22})`}>
                <rect
                  x={0}
                  y={0}
                  width={250}
                  height={18}
                  rx={4}
                  fill="rgba(0,0,0,0.2)"
                  stroke={getStatusColor(approval.status)}
                  strokeWidth={approval.status === 'pending' ? 2 : 1}
                />
                <text x={15} y={13} fill={getStatusColor(approval.status)} fontSize="11" fontWeight="bold">
                  {getStatusIcon(approval.status)}
                </text>
                <text x={30} y={13} fill="currentColor" fontSize="10">{approval.type}</text>
                
                {/* Confidence bar */}
                <rect x={130} y={4} width={60} height={10} rx={2} fill="rgba(0,0,0,0.2)" />
                <rect
                  x={130}
                  y={4}
                  width={60 * (approval.confidence / 100)}
                  height={10}
                  rx={2}
                  fill={approval.confidence > 80 ? '#22c55e' : approval.confidence > 60 ? '#f59e0b' : '#ef4444'}
                />
                <text x={200} y={13} fill="#9ca3af" fontSize="9">{approval.confidence}%</text>
                
                {approval.status === 'pending' && (
                  <rect x={220} y={2} width={28} height={14} rx={3} fill="#f59e0b" className="animate-pulse" />
                )}
              </g>
            ))}
            
            {pendingApprovals.length === 0 && (
              <text x={140} y={80} textAnchor="middle" fill="#6b7280" fontSize="11">No pending approvals</text>
            )}
          </g>

          {/* Confidence Threshold Config */}
          <g transform="translate(300, 185)">
            <rect x={0} y={0} width={200} height={130} rx={8} fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth={1} />
            <text x={15} y={22} fill="currentColor" fontSize="14" fontWeight="600">⚙️ Thresholds</text>
            
            {[
              { action: 'Read data', threshold: 60 },
              { action: 'Write data', threshold: 80 },
              { action: 'External API', threshold: 85 },
              { action: 'Send comms', threshold: 95 },
            ].map((config, i) => (
              <g key={config.action} transform={`translate(15, ${38 + i * 22})`}>
                <text x={0} y={13} fill="currentColor" fontSize="10">{config.action}</text>
                <rect x={90} y={2} width={80} height={12} rx={2} fill="rgba(0,0,0,0.2)" />
                <rect
                  x={90}
                  y={2}
                  width={80 * (config.threshold / 100)}
                  height={12}
                  rx={2}
                  fill="#8b5cf6"
                  opacity={0.8}
                />
                <text x={175} y={12} textAnchor="end" fill="#8b5cf6" fontSize="10" fontWeight="500">{config.threshold}%</text>
              </g>
            ))}
          </g>

          {/* Stats */}
          <g transform="translate(510, 185)">
            <rect x={0} y={0} width={180} height={130} rx={8} fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth={1} />
            <text x={15} y={22} fill="currentColor" fontSize="14" fontWeight="600">📊 Metrics</text>
            
            <g transform="translate(15, 38)">
              <text x={0} y={0} fill="#9ca3af" fontSize="10">Auto-approved</text>
              <text x={0} y={18} fill="#22c55e" fontSize="20" fontWeight="bold">
                {pendingApprovals.filter(a => a.status === 'approved').length}
              </text>
            </g>
            
            <g transform="translate(90, 38)">
              <text x={0} y={0} fill="#9ca3af" fontSize="10">Rejected</text>
              <text x={0} y={18} fill="#ef4444" fontSize="20" fontWeight="bold">
                {pendingApprovals.filter(a => a.status === 'rejected').length}
              </text>
            </g>
            
            <g transform="translate(15, 80)">
              <text x={0} y={0} fill="#9ca3af" fontSize="10">Avg Response Time</text>
              <text x={0} y={16} fill="#3b82f6" fontSize="16" fontWeight="bold">2.3s</text>
            </g>
            
            <g transform="translate(100, 80)">
              <text x={0} y={0} fill="#9ca3af" fontSize="10">Human Interventions</text>
              <text x={0} y={16} fill="#f59e0b" fontSize="16" fontWeight="bold">12%</text>
            </g>
          </g>

          {/* Pattern Cards */}
          <g transform="translate(10, 330)">
            <rect x={0} y={0} width={width - 20} height={80} rx={8} fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth={1} />
            <text x={15} y={22} fill="currentColor" fontSize="14" fontWeight="600">🎯 HITL Patterns</text>
            
            {patterns.map((pattern, i) => {
              const isActive = Math.floor(step / 4) === i;
              return (
                <g key={pattern.name} transform={`translate(${15 + i * 168}, 32)`}>
                  <rect
                    x={0}
                    y={0}
                    width={158}
                    height={40}
                    rx={4}
                    fill={isActive ? pattern.color : 'rgba(0,0,0,0.2)'}
                    opacity={isActive ? 0.3 : 0.5}
                    stroke={isActive ? pattern.color : 'transparent'}
                    strokeWidth={2}
                    className="transition-all duration-300"
                  />
                  <text x={10} y={18} fontSize="14">{pattern.icon}</text>
                  <text x={30} y={18} fill="currentColor" fontSize="10" fontWeight="600">{pattern.name}</text>
                  <text x={10} y={32} fill="#9ca3af" fontSize="7">{pattern.desc.substring(0, 28)}</text>
                </g>
              );
            })}
          </g>
        </svg>
      </CardContent>
    </Card>
  );
}
