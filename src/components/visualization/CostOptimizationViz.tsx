import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, ArrowClockwise } from '@phosphor-icons/react';

interface CostOptimizationVizProps {
  autoPlay?: boolean;
}

/**
 * Interactive visualization of agent cost optimization showing:
 * - Token budget allocation
 * - Caching layers (semantic, exact, vector)
 * - Model routing (cheap vs expensive)
 * - Cost breakdown flow
 */
export default function CostOptimizationViz({ autoPlay = true }: CostOptimizationVizProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [step, setStep] = useState(0);
  const [cacheHits, setCacheHits] = useState(0);
  const [requests, setRequests] = useState<{ id: number; path: 'cache' | 'cheap' | 'expensive'; x: number }[]>([]);

  const maxSteps = 15;
  const width = 700;
  const height = 400;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStep(s => (s + 1) % maxSteps);
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Generate request flow
  useEffect(() => {
    if (step % 2 === 0) {
      const rand = Math.random();
      const path = rand < 0.4 ? 'cache' : rand < 0.7 ? 'cheap' : 'expensive';
      if (path === 'cache') setCacheHits(h => h + 1);
      
      setRequests(prev => [
        ...prev.filter(r => r.x < 100).map(r => ({ ...r, x: r.x + 15 })),
        { id: Date.now(), path, x: 0 }
      ].slice(-6));
    }
  }, [step]);

  const handleReset = () => {
    setStep(0);
    setCacheHits(0);
    setRequests([]);
    setIsPlaying(true);
  };

  const strategies = [
    { name: 'Prompt Caching', savings: '40%', icon: '💾', color: '#22c55e', desc: 'Cache common prompts & responses' },
    { name: 'Model Routing', savings: '35%', icon: '🔀', color: '#3b82f6', desc: 'Route simple tasks to cheaper models' },
    { name: 'Token Budgets', savings: '20%', icon: '📊', color: '#f59e0b', desc: 'Set limits per request/session' },
    { name: 'Batch Processing', savings: '25%', icon: '📦', color: '#8b5cf6', desc: 'Combine similar requests' },
  ];

  const costBreakdown = [
    { category: 'Input Tokens', percentage: 35, color: '#3b82f6' },
    { category: 'Output Tokens', percentage: 45, color: '#8b5cf6' },
    { category: 'Tool Calls', percentage: 12, color: '#f59e0b' },
    { category: 'Embeddings', percentage: 8, color: '#22c55e' },
  ];

  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Cost Optimization Flow</h3>
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
            <linearGradient id="cost-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.1" />
            </linearGradient>
            <marker id="arrow-cost" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#6b7280" />
            </marker>
          </defs>

          {/* Request Routing Flow */}
          <g>
            <rect x={10} y={10} width={width - 20} height={150} rx={8} fill="url(#cost-grad)" stroke="#6b7280" strokeWidth={1} />
            <text x={25} y={32} fill="currentColor" fontSize="14" fontWeight="600">🔀 Intelligent Request Routing</text>

            {/* Request source */}
            <rect x={30} y={55} width={70} height={80} rx={6} fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth={2} />
            <text x={65} y={80} textAnchor="middle" fontSize="20">📥</text>
            <text x={65} y={100} textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="500">Requests</text>
            <text x={65} y={115} textAnchor="middle" fill="#8b5cf6" fontSize="16" fontWeight="bold">{requests.length}</text>

            {/* Router */}
            <rect x={150} y={70} width={80} height={50} rx={6} fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth={2} />
            <text x={190} y={95} textAnchor="middle" fontSize="12">🔀 Router</text>
            <text x={190} y={110} textAnchor="middle" fill="#3b82f6" fontSize="8">Classify & Route</text>

            {/* Routing paths */}
            {/* Cache path */}
            <g>
              <rect x={280} y={45} width={90} height={35} rx={4} fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth={2} />
              <text x={325} y={60} textAnchor="middle" fontSize="10">💾 Cache Hit</text>
              <text x={325} y={73} textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">$0.00</text>
            </g>
            
            {/* Cheap model */}
            <g>
              <rect x={280} y={85} width={90} height={35} rx={4} fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth={2} />
              <text x={325} y={100} textAnchor="middle" fontSize="10">⚡ GPT-3.5</text>
              <text x={325} y={113} textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="bold">$0.002</text>
            </g>
            
            {/* Expensive model */}
            <g>
              <rect x={280} y={125} width={90} height={35} rx={4} fill="rgba(239, 68, 68, 0.3)" stroke="#ef4444" strokeWidth={2} />
              <text x={325} y={140} textAnchor="middle" fontSize="10">🧠 GPT-4</text>
              <text x={325} y={153} textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">$0.06</text>
            </g>

            {/* Arrows */}
            <path d="M100 95 L145 95" stroke="#8b5cf6" strokeWidth={2} markerEnd="url(#arrow-cost)" />
            <path d="M230 95 L275 62" stroke="#22c55e" strokeWidth={2} markerEnd="url(#arrow-cost)" />
            <path d="M230 95 L275 102" stroke="#3b82f6" strokeWidth={2} markerEnd="url(#arrow-cost)" />
            <path d="M230 95 L275 142" stroke="#ef4444" strokeWidth={2} markerEnd="url(#arrow-cost)" />

            {/* Animated requests */}
            {requests.map(req => {
              const yOffset = req.path === 'cache' ? 62 : req.path === 'cheap' ? 102 : 142;
              const colors = { cache: '#22c55e', cheap: '#3b82f6', expensive: '#ef4444' };
              return (
                <circle
                  key={req.id}
                  cx={110 + req.x * 1.7}
                  cy={req.x < 40 ? 95 : yOffset}
                  r={5}
                  fill={colors[req.path]}
                  opacity={1 - req.x / 100}
                  className="transition-all duration-500"
                />
              );
            })}

            {/* Result aggregator */}
            <rect x={400} y={55} width={80} height={80} rx={6} fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth={2} />
            <text x={440} y={85} textAnchor="middle" fontSize="16">✅</text>
            <text x={440} y={102} textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="500">Response</text>
            <text x={440} y={118} textAnchor="middle" fill="#22c55e" fontSize="10">Optimized</text>

            {/* Stats panel */}
            <g transform="translate(500, 45)">
              <rect x={0} y={0} width={180} height={100} rx={6} fill="rgba(0,0,0,0.2)" />
              <text x={10} y={20} fill="#9ca3af" fontSize="10">Cache Hit Rate</text>
              <text x={165} y={20} textAnchor="end" fill="#22c55e" fontSize="14" fontWeight="bold">{cacheHits > 0 ? Math.round((cacheHits / Math.max(1, requests.length)) * 100) : 0}%</text>
              
              <text x={10} y={45} fill="#9ca3af" fontSize="10">Avg Cost/Request</text>
              <text x={165} y={45} textAnchor="end" fill="#3b82f6" fontSize="14" fontWeight="bold">$0.012</text>
              
              <text x={10} y={70} fill="#9ca3af" fontSize="10">Est. Monthly Savings</text>
              <text x={165} y={70} textAnchor="end" fill="#22c55e" fontSize="14" fontWeight="bold">$2,400</text>
              
              <text x={10} y={90} fill="#9ca3af" fontSize="10">vs Naive Approach</text>
              <text x={165} y={90} textAnchor="end" fill="#f59e0b" fontSize="12" fontWeight="bold">↓ 68%</text>
            </g>
          </g>

          {/* Cost Breakdown */}
          <g transform="translate(10, 175)">
            <rect x={0} y={0} width={220} height={120} rx={8} fill="rgba(139, 92, 246, 0.1)" stroke="#8b5cf6" strokeWidth={1} />
            <text x={15} y={22} fill="currentColor" fontSize="14" fontWeight="600">💰 Cost Breakdown</text>
            
            {costBreakdown.map((item, i) => (
              <g key={item.category} transform={`translate(15, ${38 + i * 20})`}>
                <text x={0} y={12} fill="currentColor" fontSize="10">{item.category}</text>
                <rect x={85} y={2} width={100} height={12} rx={2} fill="rgba(0,0,0,0.2)" />
                <rect
                  x={85}
                  y={2}
                  width={Math.min(100, item.percentage * (step > 3 ? 1 : step / 3))}
                  height={12}
                  rx={2}
                  fill={item.color}
                  className="transition-all duration-500"
                />
                <text x={195} y={12} textAnchor="end" fill={item.color} fontSize="10" fontWeight="500">{item.percentage}%</text>
              </g>
            ))}
          </g>

          {/* Optimization Strategies */}
          <g transform="translate(240, 175)">
            <rect x={0} y={0} width={width - 260} height={120} rx={8} fill="rgba(34, 197, 94, 0.1)" stroke="#22c55e" strokeWidth={1} />
            <text x={15} y={22} fill="currentColor" fontSize="14" fontWeight="600">🎯 Optimization Strategies</text>
            
            {strategies.map((strat, i) => {
              const isActive = Math.floor(step / 4) === i;
              return (
                <g key={strat.name} transform={`translate(${15 + i * 110}, 35)`}>
                  <rect
                    x={0}
                    y={0}
                    width={100}
                    height={70}
                    rx={6}
                    fill={isActive ? strat.color : 'rgba(0,0,0,0.2)'}
                    opacity={isActive ? 0.3 : 0.5}
                    stroke={isActive ? strat.color : 'transparent'}
                    strokeWidth={2}
                    className="transition-all duration-300"
                  />
                  <text x={15} y={22} fontSize="18">{strat.icon}</text>
                  <text x={40} y={22} fill={isActive ? strat.color : 'currentColor'} fontSize="10" fontWeight="600">{strat.savings}</text>
                  <text x={10} y={40} fill="currentColor" fontSize="9" fontWeight="500">{strat.name}</text>
                  <text x={10} y={55} fill="#9ca3af" fontSize="7">
                    {strat.desc.substring(0, 20)}
                  </text>
                  <text x={10} y={63} fill="#9ca3af" fontSize="7">
                    {strat.desc.substring(20)}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Token Budget Meter */}
          <g transform="translate(10, 310)">
            <rect x={0} y={0} width={width - 20} height={80} rx={8} fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth={1} />
            <text x={15} y={22} fill="currentColor" fontSize="14" fontWeight="600">📊 Token Budget Management</text>
            
            {/* Budget meter */}
            <g transform="translate(15, 35)">
              <text x={0} y={12} fill="currentColor" fontSize="10">Session Budget</text>
              <rect x={100} y={0} width={400} height={20} rx={4} fill="rgba(0,0,0,0.2)" />
              
              {/* Used tokens */}
              <rect
                x={100}
                y={0}
                width={Math.min(400, 400 * (step / maxSteps) * 0.7)}
                height={20}
                rx={4}
                fill="#3b82f6"
                className="transition-all duration-300"
              />
              
              {/* Threshold warning line */}
              <line x1={380} y1={-3} x2={380} y2={23} stroke="#f59e0b" strokeWidth={2} strokeDasharray="3,3" />
              <text x={385} y={8} fill="#f59e0b" fontSize="8">80%</text>
              
              {/* Labels */}
              <text x={510} y={14} fill="currentColor" fontSize="10">
                {Math.round(step / maxSteps * 70)}K / 100K tokens
              </text>
              
              {step / maxSteps > 0.8 && (
                <text x={100} y={40} fill="#f59e0b" fontSize="10" fontWeight="500" className="animate-pulse">
                  ⚠️ Approaching budget limit - Consider summarizing context
                </text>
              )}
            </g>
            
            {/* Quick stats */}
            <g transform="translate(540, 35)">
              <text x={0} y={10} fill="#9ca3af" fontSize="9">Avg tokens/request</text>
              <text x={0} y={25} fill="#3b82f6" fontSize="14" fontWeight="bold">1,247</text>
              <text x={70} y={10} fill="#9ca3af" fontSize="9">Est. remaining</text>
              <text x={70} y={25} fill="#22c55e" fontSize="14" fontWeight="bold">{Math.round((1 - step / maxSteps) * 80)} calls</text>
            </g>
          </g>
        </svg>
      </CardContent>
    </Card>
  );
}
