import React, { useState, useEffect } from 'react';
import { Plugs, Globe, Database, Lightning, Bridge, Queue, Cube, Gear } from "@phosphor-icons/react";
import { useTheme } from '@/components/theme/ThemeProvider';

interface IntegrationVisualizationProps {
  className?: string;
}

export const IntegrationVisualization: React.FC<IntegrationVisualizationProps> = ({ className = "" }) => {
  const { theme, isDarkMode } = useTheme();
  const [activeConnection, setActiveConnection] = useState(0);
  const [dataFlow, setDataFlow] = useState<{ [key: string]: boolean }>({});

  const integrationPoints = [
    { 
      id: 'api', 
      name: 'REST API', 
      icon: Plugs, 
      color: isDarkMode ? '#60a5fa' : '#3b82f6',
      position: { x: 80, y: 30 }
    },
    { 
      id: 'database', 
      name: 'Database', 
      icon: Database, 
      color: isDarkMode ? '#34d399' : '#10b981',
      position: { x: 20, y: 70 }
    },
    { 
      id: 'queue', 
      name: 'Message Queue', 
      icon: Queue, 
      color: isDarkMode ? '#fbbf24' : '#f59e0b',
      position: { x: 80, y: 70 }
    },
    { 
      id: 'cloud', 
      name: 'Cloud Services', 
      icon: Globe, 
      color: isDarkMode ? '#f87171' : '#ef4444',
      position: { x: 20, y: 30 }
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnection((prev) => (prev + 1) % integrationPoints.length);
      
      // Animate data flow
      const newDataFlow: { [key: string]: boolean } = {};
      integrationPoints.forEach((point, index) => {
        newDataFlow[point.id] = Math.random() > 0.5;
      });
      setDataFlow(newDataFlow);
    }, 2000);

    return () => clearInterval(interval);
  }, [integrationPoints.length]);

  const getConnectionPath = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
  };

  return (
    <div className={`relative w-full h-96 bg-muted text-foreground rounded-xl overflow-hidden ${className}`}>
      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
        {integrationPoints.map((point, index) => {
          const isActive = activeConnection === index;
          
          return (
            <line
              key={`connection-${index}`}
              x1="50%"
              y1="50%"
              x2={`${point.position.x}%`}
              y2={`${point.position.y}%`}
              stroke={isActive ? point.color : (isDarkMode ? '#6b7280' : '#9ca3af')}
              strokeWidth={isActive ? "3" : "2"}
              strokeDasharray="2,4"
              className="transition-all duration-500"
              opacity={isActive ? 0.8 : 0.3}
            />
          );
        })}
        
        {/* Data flow connections between points */}
        {integrationPoints.map((point1, i) => 
          integrationPoints.slice(i + 1).map((point2, j) => {
            const flowActive = dataFlow[point1.id] && dataFlow[point2.id];
            return (
              <line
                key={`flow-${i}-${j}`}
                x1={`${point1.position.x}%`}
                y1={`${point1.position.y}%`}
                x2={`${point2.position.x}%`}
                y2={`${point2.position.y}%`}
                stroke={flowActive ? '#10b981' : (isDarkMode ? '#4b5563' : '#d1d5db')}
                strokeWidth={flowActive ? "2" : "1"}
                strokeDasharray={flowActive ? "0" : "8,4"}
                className="transition-all duration-500"
                opacity={flowActive ? 0.7 : 0.2}
              />
            );
          })
        )}
      </svg>

      {/* Central Integration Hub */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-xl border-4 border-green-500 dark:border-green-400 relative">
          <Cube 
            size={44} 
            className={`text-green-600 dark:text-green-400 transition-transform duration-1000 ${
              Object.values(dataFlow).some(Boolean) ? 'animate-spin' : ''
            }`} 
            weight="fill" 
          />
          
          {/* Integration pulse */}
          <div className="absolute inset-0 rounded-xl border-2 border-green-400 dark:border-green-300 animate-ping opacity-30"></div>
        </div>
        
        <div className="text-center mt-3">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Integration Hub
          </span>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {integrationPoints.length} Services
          </div>
        </div>
      </div>

      {/* Integration Points */}
      {integrationPoints.map((point, index) => {
        const IconComponent = point.icon;
        const isActive = activeConnection === index;
        const hasDataFlow = dataFlow[point.id];

        return (
          <div
            key={point.id}
            className="absolute z-10"
            style={{
              left: `${point.position.x}%`,
              top: `${point.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div 
              className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 border-2 ${
                isActive 
                  ? 'scale-110 ring-4 ring-white dark:ring-gray-700 border-white dark:border-gray-600' 
                  : 'border-gray-200 dark:border-gray-600'
              } ${
                hasDataFlow ? 'animate-pulse' : ''
              }`}
              style={{ 
                backgroundColor: isActive ? point.color : (isDarkMode ? '#374151' : '#f3f4f6')
              }}
            >
              <IconComponent 
                size={28} 
                className={isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'} 
                weight="fill" 
              />
            </div>
            
            <div className="text-center mt-2 max-w-24">
              <span className={`text-xs font-medium ${
                isActive ? 'text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'
              }`}>
                {point.name}
              </span>
            </div>
          </div>
        );
      })}

      {/* Connection Lines and Data Flow */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {integrationPoints.map((point, index) => {
          const centerPoint = { x: 50, y: 50 };
          const isActive = activeConnection === index;
          const hasDataFlow = dataFlow[point.id];
          
          return (
            <g key={`connection-${point.id}`}>
              {/* Connection Line */}
              <line
                x1={`${centerPoint.x}%`}
                y1={`${centerPoint.y}%`}
                x2={`${point.position.x}%`}
                y2={`${point.position.y}%`}
                stroke={isActive ? point.color : (isDarkMode ? '#6b7280' : '#9ca3af')}
                strokeWidth={isActive ? "3" : "2"}
                strokeDasharray={hasDataFlow ? "0" : "5,5"}
                className="transition-all duration-300"
              />
              
              {/* Data Flow Animation */}
              {hasDataFlow && (
                <circle
                  r="3"
                  fill={point.color}
                  className="opacity-80"
                >
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path={`M ${centerPoint.x} ${centerPoint.y} L ${point.position.x} ${point.position.y}`}
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Integration Protocols */}
      <div className="absolute top-4 left-4 space-y-2">
        {[
          { protocol: 'HTTP/REST', status: 'active' },
          { protocol: 'WebSocket', status: 'active' },
          { protocol: 'GraphQL', status: 'standby' },
          { protocol: 'gRPC', status: 'standby' }
        ].map((protocol) => (
          <div 
            key={protocol.protocol}
            className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${
              protocol.status === 'active'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'bg-gray-100 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400'
            }`}
          >
            <div 
              className={`w-2 h-2 rounded-full ${
                protocol.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
              }`}
            />
            {protocol.protocol}
          </div>
        ))}
      </div>

      {/* Data Transfer Metrics */}
      <div className="absolute top-4 right-4 space-y-1">
        {[
          { metric: 'Throughput', value: '1.2K/s', color: 'blue' },
          { metric: 'Latency', value: '15ms', color: 'green' },
          { metric: 'Errors', value: '0.1%', color: 'red' }
        ].map((item) => (
          <div key={item.metric} className="flex items-center gap-2">
            <span className="text-xs text-gray-600 dark:text-gray-400 w-16">{item.metric}:</span>
            <span className={`text-xs font-medium ${
              item.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
              item.color === 'green' ? 'text-green-600 dark:text-green-400' :
              'text-red-600 dark:text-red-400'
            }`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Current Integration Info */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: integrationPoints[activeConnection].color }}
            />
            <span className="font-medium text-gray-900 dark:text-gray-100">
              Active: {integrationPoints[activeConnection].name}
            </span>
            <div className="flex items-center gap-1 ml-auto">
              <Lightning size={14} className="text-yellow-500" weight="fill" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {Object.values(dataFlow).filter(Boolean).length} active connections
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Real-time data exchange with external systems
          </p>
        </div>
      </div>

      {/* Integration Health */}
      <div className="absolute bottom-16 right-4">
        <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-full">
          <Bridge size={16} className="text-green-600 dark:text-green-400" weight="fill" />
          <span className="text-sm font-medium text-green-700 dark:text-green-300">
            Health: Good
          </span>
        </div>
      </div>
    </div>
  );
};
