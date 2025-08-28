import React, { useState, useEffect } from 'react';
import { Package, CloudArrowUp, Monitor, GitBranch, Timer, ChartLine, Database, Gear } from "@phosphor-icons/react";
import { useTheme } from '@/components/theme/ThemeProvider';

interface DeploymentVisualizationProps {
  className?: string;
}

export const DeploymentVisualization: React.FC<DeploymentVisualizationProps> = ({ className = "" }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [currentStage, setCurrentStage] = useState(0);
  const [deploymentProgress, setDeploymentProgress] = useState(0);

  const deploymentStages = [
    { 
      name: 'Build', 
      icon: Package, 
      color: isDarkMode ? '#60a5fa' : '#3b82f6',
      description: 'Containerizing agent code',
      duration: 20
    },
    { 
      name: 'Test', 
      icon: Monitor, 
      color: isDarkMode ? '#34d399' : '#10b981',
      description: 'Running automated tests',
      duration: 15
    },
    { 
      name: 'Deploy', 
      icon: CloudArrowUp, 
      color: isDarkMode ? '#fbbf24' : '#f59e0b',
      description: 'Pushing to cloud infrastructure',
      duration: 25
    },
    { 
      name: 'Monitor', 
      icon: ChartLine, 
      color: isDarkMode ? '#f87171' : '#ef4444',
      description: 'Tracking performance metrics',
      duration: 40
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDeploymentProgress((prev) => {
        if (prev >= 100) {
          setCurrentStage((prevStage) => (prevStage + 1) % deploymentStages.length);
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [deploymentStages.length]);

  const getContainerPosition = (index: number) => {
    const positions = [
      { x: 20, y: 30 }, // Top left
      { x: 70, y: 20 }, // Top right
      { x: 75, y: 70 }, // Bottom right
      { x: 15, y: 80 }  // Bottom left
    ];
    return positions[index] || { x: 50, y: 50 };
  };

  return (
    <div className={`relative w-full h-96 bg-muted text-foreground rounded-xl overflow-hidden ${className}`}>
      {/* Central Deployment Hub */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-xl border-4 border-blue-500 dark:border-blue-400 relative">
          <Gear 
            size={40} 
            className={`text-blue-600 dark:text-blue-400 transition-transform duration-1000 ${
              deploymentProgress > 0 ? 'animate-spin' : ''
            }`} 
            weight="fill" 
          />
          
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full">
            <circle
              cx="50%"
              cy="50%"
              r="42"
              fill="none"
              stroke={isDarkMode ? '#374151' : '#e5e7eb'}
              strokeWidth="4"
            />
            <circle
              cx="50%"
              cy="50%"
              r="42"
              fill="none"
              stroke={deploymentStages[currentStage].color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - deploymentProgress / 100)}`}
              transform="rotate(-90 50 50)"
              className="transition-all duration-100"
            />
          </svg>
        </div>
        
        <div className="text-center mt-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Deployment Pipeline
          </span>
        </div>
      </div>

      {/* Connection Lines Between Stages */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
        {deploymentStages.map((stage, index) => {
          if (index < deploymentStages.length - 1) {
            const currentPos = getContainerPosition(index);
            const nextPos = getContainerPosition(index + 1);
            const isActive = currentStage >= index;
            
            return (
              <line
                key={`pipeline-${index}`}
                x1={`${currentPos.x}%`}
                y1={`${currentPos.y}%`}
                x2={`${nextPos.x}%`}
                y2={`${nextPos.y}%`}
                stroke={isActive ? deploymentStages[index].color : (isDarkMode ? '#6b7280' : '#9ca3af')}
                strokeWidth="3"
                strokeDasharray={isActive ? "0" : "8,4"}
                className="transition-all duration-500"
                opacity={isActive ? 0.8 : 0.4}
              />
            );
          }
          return null;
        })}
        
        {/* Lines from center to each stage */}
        {deploymentStages.map((stage, index) => {
          const position = getContainerPosition(index);
          const isActive = currentStage === index;
          
          return (
            <line
              key={`center-${index}`}
              x1="50%"
              y1="50%"
              x2={`${position.x}%`}
              y2={`${position.y}%`}
              stroke={isActive ? stage.color : (isDarkMode ? '#4b5563' : '#9ca3af')}
              strokeWidth={isActive ? "2" : "1"}
              strokeDasharray="3,3"
              className="transition-all duration-300"
              opacity={isActive ? 0.6 : 0.2}
            />
          );
        })}
      </svg>

      {/* Deployment Stages */}
      {deploymentStages.map((stage, index) => {
        const IconComponent = stage.icon;
        const isActive = currentStage === index;
        const isComplete = currentStage > index;
        const position = getContainerPosition(index);

        return (
          <div
            key={stage.name}
            className="absolute transition-all duration-500"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div 
              className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 border-2 ${
                isActive 
                  ? 'scale-110 ring-4 ring-white dark:ring-gray-700 border-white dark:border-gray-600' 
                  : isComplete
                  ? 'border-green-400 dark:border-green-500'
                  : 'border-gray-200 dark:border-gray-600'
              }`}
              style={{ 
                backgroundColor: isActive 
                  ? stage.color 
                  : isComplete 
                  ? (isDarkMode ? '#065f46' : '#d1fae5')
                  : (isDarkMode ? '#374151' : '#f3f4f6')
              }}
            >
              <IconComponent 
                size={28} 
                className={
                  isActive 
                    ? 'text-white' 
                    : isComplete
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-500 dark:text-gray-400'
                } 
                weight="fill" 
              />
            </div>
            
            <div className="text-center mt-2 max-w-20">
              <span className={`text-xs font-medium ${
                isActive 
                  ? 'text-gray-900 dark:text-gray-100' 
                  : isComplete
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {stage.name}
              </span>
            </div>
          </div>
        );
      })}

      {/* Environment Indicators */}
      <div className="absolute top-4 left-4 space-y-2">
        {[
          { env: 'Dev', color: isDarkMode ? '#60a5fa' : '#3b82f6' },
          { env: 'Staging', color: isDarkMode ? '#fbbf24' : '#f59e0b' },
          { env: 'Production', color: isDarkMode ? '#34d399' : '#10b981' }
        ].map((env, index) => (
          <div 
            key={env.env}
            className="flex items-center gap-2 px-2 py-1 rounded-full bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-600"
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: env.color }}
            />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {env.env}
            </span>
          </div>
        ))}
      </div>

      {/* Current Stage Info */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: deploymentStages[currentStage].color }}
            />
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {deploymentStages[currentStage].name} Stage
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ({deploymentProgress.toFixed(0)}%)
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {deploymentStages[currentStage].description}
          </p>
        </div>
      </div>

      {/* Deployment Status */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-2 rounded-full">
          <Timer size={16} className="text-blue-600 dark:text-blue-400" weight="fill" />
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            {deploymentProgress < 100 ? 'Deploying...' : 'Ready'}
          </span>
        </div>
      </div>
    </div>
  );
};
