import React, { useState, useEffect } from 'react';
import { Shield, Lock, Eye, UserCheck, Warning, CheckCircle, LockKey, Database, Cloud } from "@phosphor-icons/react";
import { useTheme } from '@/components/theme/ThemeProvider';

interface SecurityVisualizationProps {
  className?: string;
}

export const SecurityVisualization: React.FC<SecurityVisualizationProps> = ({ className = "" }) => {
  const { theme, isDarkMode } = useTheme();
  const [activeLayer, setActiveLayer] = useState(0);

  const securityLayers = [
    { 
      id: 'authentication', 
      name: 'Authentication', 
      icon: UserCheck, 
      color: isDarkMode ? '#60a5fa' : '#3b82f6',
      description: 'Verify agent identity'
    },
    { 
      id: 'authorization', 
      name: 'Authorization', 
      icon: LockKey, 
      color: isDarkMode ? '#34d399' : '#10b981',
      description: 'Control access permissions'
    },
    { 
      id: 'encryption', 
      name: 'Encryption', 
      icon: Lock, 
      color: isDarkMode ? '#fbbf24' : '#f59e0b',
      description: 'Protect data in transit'
    },
    { 
      id: 'monitoring', 
      name: 'Monitoring', 
      icon: Eye, 
      color: isDarkMode ? '#f87171' : '#ef4444',
      description: 'Detect threats & anomalies'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % securityLayers.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [securityLayers.length]);

  return (
    <div className={`relative w-full h-96 bg-muted text-foreground rounded-xl overflow-hidden ${className}`}>
      {/* Central Agent */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-4 border-blue-500 dark:border-blue-400">
          <span className="text-3xl">🤖</span>
        </div>
        <div className="text-center mt-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Agent</span>
        </div>
      </div>

      {/* Security Layers */}
      {securityLayers.map((layer, index) => {
        const IconComponent = layer.icon;
        const isActive = activeLayer === index;
        const radius = 80 + (index * 20);
        const angle = (index * 90) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <div
            key={layer.id}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
              isActive ? 'scale-110 z-20' : 'z-10'
            }`}
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            <div 
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                isActive ? 'scale-110 ring-4 ring-white dark:ring-gray-700' : ''
              }`}
              style={{ backgroundColor: layer.color }}
            >
              <IconComponent size={28} className="text-white" weight="fill" />
            </div>
            <div className="text-center mt-1 max-w-24">
              <span className={`text-xs font-medium ${isActive ? 'text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}`}>
                {layer.name}
              </span>
            </div>
          </div>
        );
      })}

      {/* Connection Lines from center to each layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
        {securityLayers.map((layer, index) => {
          const isActive = activeLayer === index;
          const radius = 80 + (index * 20);
          const angle = (index * 90) * (Math.PI / 180);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <line
              key={`connection-${layer.id}`}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${x}px)`}
              y2={`calc(50% + ${y}px)`}
              stroke={isActive ? layer.color : (isDarkMode ? '#6b7280' : '#9ca3af')}
              strokeWidth={isActive ? "3" : "2"}
              strokeDasharray={isActive ? "0" : "5,5"}
              className="transition-all duration-300"
              opacity={isActive ? 1 : 0.4}
            />
          );
        })}
      </svg>

      {/* Animated Security Rings */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            className={`absolute rounded-full border-2 ${
              isDarkMode ? 'border-blue-400/20' : 'border-blue-500/20'
            } animate-pulse`}
            style={{
              width: `${140 + ring * 50}px`,
              height: `${140 + ring * 50}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animationDelay: `${ring * 0.5}s`,
              animationDuration: '3s',
            }}
          />
        ))}
      </div>

      {/* Active Layer Info */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: securityLayers[activeLayer].color }}
            />
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {securityLayers[activeLayer].name}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {securityLayers[activeLayer].description}
          </p>
        </div>
      </div>

      {/* Trust Score Indicator */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-full">
          <Shield size={16} className="text-green-600 dark:text-green-400" weight="fill" />
          <span className="text-sm font-medium text-green-700 dark:text-green-300">Trust: High</span>
        </div>
      </div>
    </div>
  );
};
