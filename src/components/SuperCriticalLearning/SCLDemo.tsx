import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { 
  Network, 
  Brain, 
  Zap,
  Play,
  RefreshCw,
  Download,
  BookOpen,
  Target,
  Shuffle
} from 'lucide-react';
import SCLGraph, { SCLEffect } from './SCLGraph';
import AdvancedFeatures from './AdvancedFeatures';

// Sample SCL effects for demonstration
const sampleEffects: SCLEffect[] = [
  {
    id: 'foundation-effect',
    text: 'Establish foundational AI infrastructure with cloud-native architecture',
    type: 'first-order',
    confidence: 0.9,
    constraints: ['budget-limit', 'timeline-6months'],
  },
  {
    id: 'data-pipeline',
    text: 'Implement real-time data processing pipeline for continuous learning',
    type: 'higher-order',
    confidence: 0.85,
    constraints: ['data-privacy', 'performance-requirements'],
  },
  {
    id: 'ml-models',
    text: 'Deploy and optimize machine learning models with A/B testing framework',
    type: 'synthesis',
    confidence: 0.8,
    constraints: ['accuracy-threshold', 'latency-limits'],
  },
  {
    id: 'user-interface',
    text: 'Create intuitive user interface with real-time feedback and analytics',
    type: 'first-order',
    confidence: 0.75,
    constraints: ['usability-standards', 'accessibility-compliance'],
  },
  {
    id: 'monitoring-system',
    text: 'Implement comprehensive monitoring and alerting for system health',
    type: 'constraint',
    confidence: 0.9,
    constraints: ['uptime-requirements', 'alert-response-time'],
  },
  {
    id: 'security-layer',
    text: 'Deploy enterprise-grade security with encryption and access controls',
    type: 'first-order',
    confidence: 0.95,
    constraints: ['compliance-standards', 'security-audit'],
  },
  {
    id: 'scaling-mechanism',
    text: 'Implement auto-scaling capabilities for variable demand handling',
    type: 'higher-order',
    confidence: 0.7,
    constraints: ['cost-optimization', 'performance-scaling'],
  },
  {
    id: 'integration-apis',
    text: 'Develop comprehensive API layer for third-party integrations',
    type: 'synthesis',
    confidence: 0.8,
    constraints: ['api-standards', 'rate-limiting'],
  },
];

export const SCLDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [effects, setEffects] = useState<SCLEffect[]>(sampleEffects);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading effects
  const refreshEffects = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add some randomization to effects
    const updatedEffects = effects.map(effect => ({
      ...effect,
      confidence: Math.max(0.5, Math.min(0.95, effect.confidence + (Math.random() - 0.5) * 0.2)),
    }));
    
    setEffects(updatedEffects);
    setIsLoading(false);
  };

  // Statistics for overview
  const stats = {
    totalEffects: effects.length,
    avgConfidence: effects.reduce((sum, e) => sum + e.confidence, 0) / effects.length,
    effectTypes: [...new Set(effects.map(e => e.type))].length,
    totalConstraints: effects.reduce((sum, e) => sum + e.constraints.length, 0),
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SuperCritical Learning Demo
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              Interactive Graph Visualization & Advanced AI-Powered Analysis
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="ring-1 bg-[var(--badge-green-bg)] ring-[var(--badge-green-ring)] text-[var(--badge-green-text)] dark:text-[var(--badge-green-text)]">
            <Zap className="w-3 h-3 mr-1" />
            Phase 2: Graph Visualization
          </Badge>
          <Badge variant="outline" className="ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)] dark:text-[var(--badge-blue-text)]">
            <Brain className="w-3 h-3 mr-1" />
            Phase 4: Advanced Features
          </Badge>
          <Badge variant="outline" className="ring-1 bg-[var(--badge-purple-bg)] ring-[var(--badge-purple-ring)] text-[var(--badge-purple-text)] dark:text-[var(--badge-purple-text)]">
            <Network className="w-3 h-3 mr-1" />
            Interactive Demo
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <BookOpen className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="graph">
            <Network className="w-4 h-4 mr-2" />
            Interactive Graph
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Brain className="w-4 h-4 mr-2" />
            Advanced Analysis
          </TabsTrigger>
          <TabsTrigger value="integration">
            <Target className="w-4 h-4 mr-2" />
            Full Integration
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Effects</p>
                    <p className="text-2xl font-bold">{stats.totalEffects}</p>
                  </div>
                  <Network className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Confidence</p>
                    <p className="text-2xl font-bold">{(stats.avgConfidence * 100).toFixed(0)}%</p>
                  </div>
                  <Target className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Effect Types</p>
                    <p className="text-2xl font-bold">{stats.effectTypes}</p>
                  </div>
                  <Shuffle className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Constraints</p>
                    <p className="text-2xl font-bold">{stats.totalConstraints}</p>
                  </div>
                  <Zap className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Feature Showcase</span>
                <Button 
                  onClick={refreshEffects}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  {isLoading ? 'Updating...' : 'Refresh Data'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-700">Graph Visualization Features</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Interactive React Flow integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Force-directed layout algorithms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Real-time node editing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Dynamic filtering and controls</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Type-based styling and organization</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-700">Advanced AI Features</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Constraint satisfaction solving</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Genetic algorithm optimization</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Perturbation analysis engine</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Implementation roadmap generation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Multi-format export capabilities</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-2">🚀 Getting Started</h4>
                <p className="text-sm text-purple-700">
                  Explore the Interactive Graph tab to see React Flow in action, then try the Advanced Analysis 
                  features to experience constraint solving, perturbation generation, and roadmap export capabilities.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interactive Graph Tab */}
        <TabsContent value="graph" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5" />
                React Flow Interactive Graph
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] border rounded-lg overflow-hidden">
                <SCLGraph effects={effects} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Features Tab */}
        <TabsContent value="advanced" className="space-y-6">
          <AdvancedFeatures effects={effects} />
        </TabsContent>

        {/* Full Integration Tab */}
        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Complete SCL Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Mini Graph Preview */}
                <div>
                  <h3 className="text-lg font-medium mb-3">Graph Overview</h3>
                  <div className="h-[300px] border rounded-lg overflow-hidden bg-gray-50">
                    <SCLGraph effects={effects.slice(0, 5)} />
                  </div>
                </div>

                {/* Integration Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Integration</h3>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-green-800">Graph Visualization</span>
                      </div>
                      <p className="text-sm text-green-700">
                        React Flow integration with D3-force layouts, interactive controls, and real-time editing
                      </p>
                    </div>

                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-medium text-blue-800">Constraint Solving</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Multi-algorithm optimization with genetic algorithms and simulated annealing
                      </p>
                    </div>

                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="font-medium text-purple-800">Perturbation Analysis</span>
                      </div>
                      <p className="text-sm text-purple-700">
                        Systematic scenario exploration with 5 perturbation types and impact analysis
                      </p>
                    </div>

                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="font-medium text-orange-800">Roadmap Export</span>
                      </div>
                      <p className="text-sm text-orange-700">
                        Implementation planning with 6 export formats and timeline generation
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 border rounded-lg">
                    <h4 className="font-medium mb-2">Next Steps</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>• Test graph interactions in full SCL sessions</div>
                      <div>• Integrate with existing study mode workflows</div>
                      <div>• Export roadmaps for real project implementation</div>
                      <div>• Explore advanced constraint scenarios</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phase Implementation Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-green-600">✅ Completed Phases</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span>Phase 2: Graph Visualization</span>
                      <Badge variant="default" className="ring-1 bg-[var(--badge-green-bg)] ring-[var(--badge-green-ring)] text-[var(--badge-green-text)] dark:text-[var(--badge-green-text)]">Complete</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span>Phase 4: Advanced Features</span>
                      <Badge variant="default" className="ring-1 bg-[var(--badge-green-bg)] ring-[var(--badge-green-ring)] text-[var(--badge-green-text)] dark:text-[var(--badge-green-text)]">Complete</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-blue-600">🔄 Integration Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span>React Flow Integration</span>
                      <Badge variant="default" className="ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)] dark:text-[var(--badge-blue-text)]">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span>Advanced AI Features</span>
                      <Badge variant="default" className="ring-1 bg-[var(--badge-blue-bg)] ring-[var(--badge-blue-ring)] text-[var(--badge-blue-text)] dark:text-[var(--badge-blue-text)]">Active</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SCLDemo;
