import React, { useState, useEffect } from 'react';
import { Scales, Eye, Users, Certificate, Warning, CheckCircle, Heart, Lightbulb } from "@phosphor-icons/react";
import { useTheme } from '@/components/theme/ThemeProvider';

interface EthicsVisualizationProps {
  className?: string;
}

export const EthicsVisualization: React.FC<EthicsVisualizationProps> = ({ className = "" }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [activeScenario, setActiveScenario] = useState(0);

  const ethicalScenarios = [
    {
      principle: 'Fairness',
      icon: Scales,
      color: isDarkMode ? '#8b5cf6' : '#7c3aed',
      scenario: 'Treating all users equally without bias',
      emoji: '⚖️'
    },
    {
      principle: 'Transparency',
      icon: Eye,
      color: isDarkMode ? '#06b6d4' : '#0891b2',
      scenario: 'Making AI decisions explainable and clear',
      emoji: '👁️'
    },
    {
      principle: 'Accountability',
      icon: Certificate,
      color: isDarkMode ? '#10b981' : '#059669',
      scenario: 'Taking responsibility for AI actions',
      emoji: '📜'
    },
    {
      principle: 'Privacy',
      icon: Eye,
      color: isDarkMode ? '#f59e0b' : '#d97706',
      scenario: 'Protecting user data and personal information',
      emoji: '🔒'
    },
    {
      principle: 'Beneficence',
      icon: Heart,
      color: isDarkMode ? '#f43f5e' : '#dc2626',
      scenario: 'Acting in the best interest of humanity',
      emoji: '❤️'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScenario((prev) => (prev + 1) % ethicalScenarios.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [ethicalScenarios.length]);

  const getBalancePosition = (principle: string) => {
    switch (principle) {
      case 'Fairness': return 45; // Balanced
      case 'Transparency': return 40; // Slightly left
      case 'Accountability': return 50; // Slightly right
      case 'Privacy': return 35; // More left
      case 'Beneficence': return 55; // More right
      default: return 45;
    }
  };

  return (
    <div className={`relative w-full h-96 bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-purple-900/20 rounded-xl overflow-hidden ${className}`}>
      {/* Central Ethics Scale */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Scale Base */}
          <div className="w-40 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative">
            <div 
              className="absolute top-0 h-6 bg-gradient-to-r from-red-400 to-green-400 rounded-full transition-all duration-1000"
              style={{ 
                width: `${getBalancePosition(ethicalScenarios[activeScenario].principle)}%`,
                left: '0%'
              }}
            />
            <div 
              className="absolute top-1/2 w-6 h-8 bg-white dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-500 rounded transform -translate-y-1/2 transition-all duration-1000 shadow-md"
              style={{ 
                left: `${getBalancePosition(ethicalScenarios[activeScenario].principle)}%`,
                transform: `translate(-50%, -50%)`
              }}
            />
          </div>
          
          {/* Scale Labels */}
          <div className="flex justify-between mt-3 text-sm text-gray-600 dark:text-gray-400">
            <span>Risk</span>
            <span>Balanced</span>
            <span>Ethical</span>
          </div>
        </div>

        {/* Central Icon */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
          <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-4 border-purple-500 dark:border-purple-400">
            <Scales size={36} className="text-purple-600 dark:text-purple-400" weight="fill" />
          </div>
        </div>
      </div>

      {/* Connection Lines to Ethical Principles */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
        {ethicalScenarios.map((scenario, index) => {
          const isActive = activeScenario === index;
          const angle = (index * 72) * (Math.PI / 180);
          const radius = 100;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <line
              key={`connection-${scenario.principle}`}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${x}px)`}
              y2={`calc(50% + ${y}px)`}
              stroke={isActive ? scenario.color : (isDarkMode ? '#6b7280' : '#9ca3af')}
              strokeWidth={isActive ? "3" : "2"}
              strokeDasharray={isActive ? "0" : "4,4"}
              className="transition-all duration-500"
              opacity={isActive ? 0.8 : 0.3}
            />
          );
        })}
      </svg>

      {/* Ethical Principles Orbiting */}
      {ethicalScenarios.map((scenario, index) => {
        const IconComponent = scenario.icon;
        const isActive = activeScenario === index;
        const angle = (index * 72) * (Math.PI / 180); // 360/5 = 72 degrees
        const radius = 100;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <div
            key={scenario.principle}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
              isActive ? 'scale-110 z-20' : 'z-10'
            }`}
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            <div 
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                isActive ? 'scale-110 ring-4 ring-white dark:ring-gray-700' : ''
              }`}
              style={{ backgroundColor: scenario.color }}
            >
              <span className="text-2xl">{scenario.emoji}</span>
            </div>
            <div className="text-center mt-2 max-w-24">
              <span className={`text-sm font-medium ${isActive ? 'text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}`}>
                {scenario.principle}
              </span>
            </div>
          </div>
        );
      })}

      {/* Floating Ethics Values */}
      <div className="absolute top-4 left-4 space-y-2">
        {['Respect', 'Justice', 'Trust'].map((value, index) => (
          <div 
            key={value}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              isDarkMode ? 'bg-purple-900/40 text-purple-300' : 'bg-purple-100 text-purple-700'
            }`}
            style={{
              animationDelay: `${index * 0.5}s`,
              animation: 'pulse 2s infinite'
            }}
          >
            {value}
          </div>
        ))}
      </div>

      {/* Current Scenario Display */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-xl">{ethicalScenarios[activeScenario].emoji}</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {ethicalScenarios[activeScenario].principle}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {ethicalScenarios[activeScenario].scenario}
          </p>
        </div>
      </div>

      {/* Ethics Score */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-full">
          <CheckCircle size={16} className="text-green-600 dark:text-green-400" weight="fill" />
          <span className="text-sm font-medium text-green-700 dark:text-green-300">Ethics: Good</span>
        </div>
      </div>
    </div>
  );
};
