import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, ArrowClockwise } from '@phosphor-icons/react';

interface MemorySystemsVizProps {
  autoPlay?: boolean;
}

/**
 * Interactive visualization of agent memory systems showing the hierarchy:
 * - Working Memory (context window)
 * - Short-Term Memory (session/conversation)
 * - Long-Term Memory (persistent storage)
 * - Episodic Memory (experience-based)
 * - Semantic Memory (knowledge-based)
 */
export default function MemorySystemsViz({ autoPlay = true }: MemorySystemsVizProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [step, setStep] = useState(0);
  const [dataPackets, setDataPackets] = useState<{ id: number; layer: number; x: number; opacity: number }[]>([]);

  const maxSteps = 12;
  const width = 700;
  const height = 380;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStep(s => (s + 1) % maxSteps);
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Generate data packets flowing through memory layers
  useEffect(() => {
    if (step % 2 === 0) {
      setDataPackets(prev => [
        ...prev.filter(p => p.opacity > 0).map(p => ({
          ...p,
          layer: p.layer + 1,
          opacity: p.layer >= 4 ? p.opacity - 0.3 : p.opacity
        })),
        { id: Date.now(), layer: 0, x: Math.random() * 100, opacity: 1 }
      ].slice(-8));
    }
  }, [step]);

  const layers = [
    { name: 'Working Memory', subtitle: 'Context Window (128K tokens)', color: '#ef4444', y: 40, duration: 'Milliseconds', icon: '⚡' },
    { name: 'Short-Term Memory', subtitle: 'Conversation State', color: '#f59e0b', y: 100, duration: 'Minutes-Hours', icon: '💬' },
    { name: 'Long-Term Memory', subtitle: 'Vector Store / Database', color: '#22c55e', y: 160, duration: 'Days-Months', icon: '💾' },
    { name: 'Episodic Memory', subtitle: 'Past Experiences & Interactions', color: '#3b82f6', y: 220, duration: 'Permanent', icon: '📖' },
    { name: 'Semantic Memory', subtitle: 'Knowledge & Facts', color: '#8b5cf6', y: 280, duration: 'Permanent', icon: '🧠' },
  ];

  const getLayerOpacity = (layerIndex: number) => {
    const activeLayer = Math.floor(step / 2) % 5;
    return layerIndex === activeLayer ? 1 : 0.6;
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Memory Hierarchy Animation</h3>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </Button>
            <Button size="sm" variant="outline" onClick={() => { setStep(0); setDataPackets([]); setIsPlaying(true); }}>
              <ArrowClockwise size={16} />
            </Button>
          </div>
        </div>

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          <defs>
            {/* Gradient definitions */}
            {layers.map((layer, i) => (
              <linearGradient key={`grad-${i}`} id={`layer-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={layer.color} stopOpacity="0.1" />
                <stop offset="50%" stopColor={layer.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={layer.color} stopOpacity="0.1" />
              </linearGradient>
            ))}
            {/* Arrow marker */}
            <marker id="arrowhead-mem" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#6b7280" />
            </marker>
          </defs>

          {/* Title */}
          <text x={width / 2} y={20} textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="600">
            Agent Memory Systems: Hierarchical Data Flow
          </text>

          {/* Memory layers */}
          {layers.map((layer, i) => (
            <g key={i} opacity={getLayerOpacity(i)} className="transition-opacity duration-500">
              {/* Layer background */}
              <rect
                x={60}
                y={layer.y}
                width={width - 120}
                height={50}
                rx={8}
                fill={`url(#layer-grad-${i})`}
                stroke={layer.color}
                strokeWidth={getLayerOpacity(i) === 1 ? 2 : 1}
                className="transition-all duration-300"
              />
              
              {/* Icon */}
              <text x={80} y={layer.y + 32} fontSize="20">{layer.icon}</text>
              
              {/* Layer name */}
              <text x={110} y={layer.y + 25} fill="currentColor" fontSize="14" fontWeight="600">
                {layer.name}
              </text>
              <text x={110} y={layer.y + 42} fill="#6b7280" fontSize="11">
                {layer.subtitle}
              </text>
              
              {/* Duration indicator */}
              <text x={width - 80} y={layer.y + 32} textAnchor="end" fill={layer.color} fontSize="11" fontWeight="500">
                {layer.duration}
              </text>

              {/* Active indicator */}
              {getLayerOpacity(i) === 1 && (
                <rect
                  x={56}
                  y={layer.y - 4}
                  width={4}
                  height={58}
                  rx={2}
                  fill={layer.color}
                  className="animate-pulse"
                />
              )}
            </g>
          ))}

          {/* Data flow arrows between layers */}
          {layers.slice(0, -1).map((layer, i) => (
            <g key={`arrow-${i}`}>
              {/* Downward arrows (storage) */}
              <path
                d={`M${200} ${layer.y + 52} L${200} ${layers[i + 1].y - 4}`}
                fill="none"
                stroke="#6b7280"
                strokeWidth={1.5}
                markerEnd="url(#arrowhead-mem)"
                strokeDasharray="4,4"
              />
              <text x={210} y={(layer.y + layers[i + 1].y) / 2 + 28} fill="#6b7280" fontSize="9">store</text>
              
              {/* Upward arrows (retrieval) */}
              <path
                d={`M${width - 200} ${layers[i + 1].y - 4} L${width - 200} ${layer.y + 52}`}
                fill="none"
                stroke={layers[i + 1].color}
                strokeWidth={1.5}
                markerEnd="url(#arrowhead-mem)"
                opacity={0.7}
              />
              <text x={width - 190} y={(layer.y + layers[i + 1].y) / 2 + 28} fill={layers[i + 1].color} fontSize="9">retrieve</text>
            </g>
          ))}

          {/* Animated data packets */}
          {dataPackets.map(packet => {
            if (packet.layer >= 5 || packet.opacity <= 0) return null;
            const layer = layers[packet.layer];
            return (
              <circle
                key={packet.id}
                cx={140 + packet.x * 3}
                cy={layer.y + 25}
                r={6}
                fill={layer.color}
                opacity={packet.opacity}
                className="transition-all duration-500"
              >
                <animate
                  attributeName="cx"
                  from={140 + packet.x * 3}
                  to={width - 150}
                  dur="1s"
                  repeatCount="1"
                />
              </circle>
            );
          })}

          {/* Legend */}
          <g transform={`translate(${width / 2 - 120}, ${height - 35})`}>
            <rect x={0} y={0} width={240} height={28} rx={4} fill="rgba(0,0,0,0.1)" />
            <circle cx={20} cy={14} r={6} fill="#ef4444" />
            <text x={32} y={18} fill="currentColor" fontSize="10">Fast Access</text>
            <line x1={85} y1={5} x2={85} y2={23} stroke="#6b7280" strokeWidth={1} />
            <circle cx={100} cy={14} r={6} fill="#8b5cf6" />
            <text x={112} y={18} fill="currentColor" fontSize="10">Persistent Store</text>
            <line x1={185} y1={5} x2={185} y2={23} stroke="#6b7280" strokeWidth={1} />
            <text x={195} y={18} fill="#6b7280" fontSize="10">↕ Bidirectional</text>
          </g>
        </svg>
      </CardContent>
    </Card>
  );
}
