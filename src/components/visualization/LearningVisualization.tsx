import React, { useState, useEffect } from 'react';
import { Brain, Target, TrendUp, Lightning, Atom, ArrowsCounterClockwise, Lightbulb } from "@phosphor-icons/react";
import { useTheme } from '@/components/theme/ThemeProvider';

interface LearningVisualizationProps {
  className?: string;
}

export const LearningVisualization: React.FC<LearningVisualizationProps> = ({ className = "" }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [learningCycle, setLearningCycle] = useState(0);
  const [neuronActivity, setNeuronActivity] = useState<number[]>([]);

  const learningPhases = [
    { 
      name: 'Experience', 
      icon: Lightbulb, 
      color: isDarkMode ? '#fbbf24' : '#f59e0b',
      description: 'Agent interacts with environment'
    },
    { 
      name: 'Learn', 
      icon: Brain, 
      color: isDarkMode ? '#8b5cf6' : '#7c3aed',
      description: 'Process feedback and update knowledge'
    },
    { 
      name: 'Adapt', 
      icon: ArrowsCounterClockwise, 
      color: isDarkMode ? '#06b6d4' : '#0891b2',
      description: 'Modify behavior based on learning'
    },
    { 
      name: 'Improve', 
      icon: TrendUp, 
      color: isDarkMode ? '#10b981' : '#059669',
      description: 'Enhanced performance on future tasks'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLearningCycle((prev) => (prev + 1) % learningPhases.length);
      
      // Generate random neuron activity
      setNeuronActivity(Array.from({ length: 12 }, () => Math.random()));
    }, 2500);

    return () => clearInterval(interval);
  }, [learningPhases.length]);

  const generateNeuronPositions = () => {
    const positions = [];
    const layers = [3, 4, 3, 2]; // Input, Hidden1, Hidden2, Output
    
    layers.forEach((layerSize, layerIndex) => {
      const layerX = (layerIndex * 80) + 50;
      for (let i = 0; i < layerSize; i++) {
        const layerY = 40 + (i * (120 / (layerSize - 1 || 1)));
        positions.push({ x: layerX, y: layerY, layer: layerIndex });
      }
    });
    
    return positions;
  };

  const getPhasePosition = (index: number) => {
    const angle = (index * 2 * Math.PI) / learningPhases.length - Math.PI / 2;
    const radius = 35;
    return {
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle)
    };
  };

  const learningRate = 0.85 + Math.sin(Date.now() / 1000) * 0.1;
  const neuronPositions = generateNeuronPositions();

  return (
    <div className={`relative w-full h-96 bg-muted text-foreground rounded-xl overflow-hidden ${className}`}>
      {/* Connection Lines to Learning Phases */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
        {learningPhases.map((phase, index) => {
          const position = getPhasePosition(index);
          const isActive = learningCycle === index;
          
          return (
            <line
              key={`connection-${index}`}
              x1="50%"
              y1="50%"
              x2={`${position.x}%`}
              y2={`${position.y}%`}
              stroke={isActive ? phase.color : (isDarkMode ? '#6b7280' : '#9ca3af')}
              strokeWidth={isActive ? "3" : "2"}
              strokeDasharray="4,4"
              className="transition-all duration-500"
              opacity={isActive ? 0.8 : 0.3}
            />
          );
        })}
        
        {/* Neural connections between phases */}
        {learningPhases.map((_, index) => {
          if (index < learningPhases.length - 1) {
            const currentPos = getPhasePosition(index);
            const nextPos = getPhasePosition(index + 1);
            const isActive = learningCycle >= index;
            
            return (
              <line
                key={`neural-${index}`}
                x1={`${currentPos.x}%`}
                y1={`${currentPos.y}%`}
                x2={`${nextPos.x}%`}
                y2={`${nextPos.y}%`}
                stroke={isActive ? '#8b5cf6' : (isDarkMode ? '#4b5563' : '#d1d5db')}
                strokeWidth="2"
                strokeDasharray={isActive ? "0" : "6,3"}
                className="transition-all duration-500"
                opacity={isActive ? 0.6 : 0.2}
              />
            );
          }
          return null;
        })}
      </svg>

      {/* Central Neural Network Core */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-xl border-4 border-purple-500 dark:border-purple-400 relative">
          <Brain 
            size={44} 
            className="text-purple-600 dark:text-purple-400 animate-pulse" 
            weight="fill" 
          />
          
          {/* Learning pulse animation */}
          <div className="absolute inset-0 rounded-full border-2 border-purple-400 dark:border-purple-300 animate-ping opacity-20"></div>
          <div className="absolute inset-2 rounded-full border border-purple-300 dark:border-purple-400 animate-pulse opacity-40"></div>
        </div>
        
        <div className="text-center mt-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Neural Core
          </span>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Learning Rate: {learningRate.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Learning Phases */}
      {learningPhases.map((phase, index) => {
        const IconComponent = phase.icon;
        const isActive = learningCycle === index;
        const position = getPhasePosition(index);

        return (
          <div
            key={phase.name}
            className="absolute transition-all duration-500"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div 
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border-2 ${
                isActive 
                  ? 'scale-110 ring-4 ring-white dark:ring-gray-700 border-white dark:border-gray-600' 
                  : 'border-gray-200 dark:border-gray-600'
              }`}
              style={{ 
                backgroundColor: isActive ? phase.color : (isDarkMode ? '#374151' : '#f3f4f6')
              }}
            >
              <IconComponent 
                size={28} 
                className={isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'} 
                weight="fill" 
              />
            </div>
            
            <div className="text-center mt-2 max-w-20">
              <span className={`text-xs font-medium ${
                isActive ? 'text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'
              }`}>
                {phase.name}
              </span>
            </div>
          </div>
        );
      })}

      {/* Neural Network Visualization */}
      <div className="absolute inset-4">
        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full">
          {neuronPositions.map((neuron, index) => {
            // Connect to next layer
            const nextLayerNeurons = neuronPositions.filter(n => n.layer === neuron.layer + 1);
            return nextLayerNeurons.map((nextNeuron, nextIndex) => (
              <line
                key={`connection-${index}-${nextIndex}`}
                x1={`${neuron.x}%`}
                y1={`${neuron.y}%`}
                x2={`${nextNeuron.x}%`}
                y2={`${nextNeuron.y}%`}
                stroke={isDarkMode ? '#6b7280' : '#9ca3af'}
                strokeWidth={neuronActivity[index] > 0.7 ? "2" : "1"}
                opacity={neuronActivity[index] * 0.5 + 0.1}
                className="transition-all duration-300"
              />
            ));
          })}
        </svg>

        {/* Neurons */}
        {neuronPositions.map((neuron, index) => (
          <div
            key={`neuron-${index}`}
            className="absolute transition-all duration-300"
            style={{
              left: `${neuron.x}%`,
              top: `${neuron.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div 
              className={`w-3 h-3 rounded-full border transition-all duration-300 ${
                neuronActivity[index] > 0.7 
                  ? 'bg-purple-400 dark:bg-purple-300 border-purple-500 dark:border-purple-200 animate-pulse' 
                  : 'bg-gray-300 dark:bg-gray-600 border-gray-400 dark:border-gray-500'
              }`}
              style={{
                opacity: Math.max(0.3, neuronActivity[index]),
                transform: `scale(${0.8 + neuronActivity[index] * 0.4})`
              }}
            />
          </div>
        ))}
      </div>

      {/* Current Phase Info */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: learningPhases[learningCycle].color }}
            />
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {learningPhases[learningCycle].name} Phase
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {learningPhases[learningCycle].description}
          </p>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-3 py-2 rounded-full">
          <Target size={16} className="text-purple-600 dark:text-purple-400" weight="fill" />
          <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
            Accuracy: {(85 + Math.sin(Date.now() / 2000) * 10).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};
