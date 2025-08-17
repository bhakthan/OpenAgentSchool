import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { 
  Network, 
  Cog, 
  Shuffle, 
  FileText,
  Play,
  Download,
  Settings2,
  Brain,
  Target
} from 'lucide-react';
import SCLGraph, { SCLEffect } from './SCLGraph';
import GraphControls from './GraphControls';
import ConstraintSolver, { Constraint, Variable, Solution } from '../../lib/constraint-solver';
import PerturbationGenerator, { Perturbation, PerturbationConfig } from '../../lib/perturbation-generator';
import RoadmapExporter, { ImplementationRoadmap, ExportConfig } from '../../lib/roadmap-exporter';

interface AdvancedFeaturesProps {
  effects: SCLEffect[];
  className?: string;
}

export const AdvancedFeatures: React.FC<AdvancedFeaturesProps> = ({
  effects,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState('constraints');
  const [constraintSolution, setConstraintSolution] = useState<Solution | null>(null);
  const [perturbations, setPerturbations] = useState<Perturbation[]>([]);
  const [roadmap, setRoadmap] = useState<ImplementationRoadmap | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Constraint Satisfaction Demo
  const handleConstraintSolving = useCallback(async () => {
    setIsProcessing(true);
    
    try {
      const solver = new ConstraintSolver();
      
      // Add sample constraints
      const constraints: Constraint[] = [
        {
          id: 'budget-constraint',
          type: 'resource',
          description: 'Total budget must not exceed $500,000',
          priority: 'critical',
          parameters: {
            resourceType: 'budget',
            maxAmount: 500000,
            requiredResources: ['dev-cost', 'infra-cost', 'ops-cost'],
          },
          violationPenalty: 1000,
        },
        {
          id: 'timeline-constraint',
          type: 'temporal',
          description: 'Project must complete within 6 months',
          priority: 'high',
          parameters: {
            deadline: 180, // days
            dependencies: ['foundation', 'implementation'],
            timeEstimates: { foundation: 60, implementation: 90 },
          },
          violationPenalty: 500,
        },
        {
          id: 'quality-constraint',
          type: 'business',
          description: 'Minimum 95% success rate required',
          priority: 'high',
          parameters: {
            metricType: 'success_rate',
            threshold: 0.95,
            direction: 'minimize',
          },
          violationPenalty: 300,
        },
      ];

      // Add sample variables
      const variables: Variable[] = [
        {
          id: 'dev-cost',
          name: 'Development Cost',
          domain: [50000, 300000],
          type: 'continuous',
        },
        {
          id: 'infra-cost',
          name: 'Infrastructure Cost',
          domain: [10000, 100000],
          type: 'continuous',
        },
        {
          id: 'ops-cost',
          name: 'Operations Cost',
          domain: [20000, 150000],
          type: 'continuous',
        },
        {
          id: 'foundation',
          name: 'Foundation Duration',
          domain: [30, 90],
          type: 'discrete',
        },
        {
          id: 'implementation',
          name: 'Implementation Duration',
          domain: [60, 120],
          type: 'discrete',
        },
      ];

      constraints.forEach(c => solver.addConstraint(c));
      variables.forEach(v => solver.addVariable(v));

      // Solve using genetic algorithm
      const solution = solver.solveWithGeneticAlgorithm({
        populationSize: 100,
        generations: 150,
        mutationRate: 0.1,
        crossoverRate: 0.8,
      });

      setConstraintSolution(solution);
    } catch (error) {
      console.error('Constraint solving failed:', error);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // Perturbation Generation Demo
  const handlePerturbationGeneration = useCallback(async () => {
    setIsProcessing(true);
    
    try {
      const config: PerturbationConfig = {
        maxPerturbations: 10,
        perturbationTypes: ['parameter', 'assumption', 'context', 'temporal'],
        magnitudeRange: [0.1, 0.8],
        constraintRelaxation: true,
      };

      const generator = new PerturbationGenerator(effects, config);
      const generatedPerturbations = generator.generatePerturbations();
      
      setPerturbations(generatedPerturbations);
    } catch (error) {
      console.error('Perturbation generation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [effects]);

  // Roadmap Export Demo
  const handleRoadmapGeneration = useCallback(async () => {
    setIsProcessing(true);
    
    try {
      const exporter = new RoadmapExporter(effects, constraintSolution || undefined);
      const generatedRoadmap = exporter.generateRoadmap();
      
      setRoadmap(generatedRoadmap);
    } catch (error) {
      console.error('Roadmap generation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [effects, constraintSolution]);

  // Export roadmap in different formats
  const handleRoadmapExport = useCallback((format: ExportConfig['format']) => {
    if (!roadmap) return;
    
    const exporter = new RoadmapExporter(effects);
    const config: ExportConfig = {
      format,
      includeDetails: true,
      groupBy: 'priority',
      timeframe: {
        start: new Date().toISOString().split('T')[0],
        end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
    };
    
    const exported = exporter.exportRoadmap(roadmap, config);
    
    // Download the file
    const blob = new Blob([exported], { 
      type: format === 'json' ? 'application/json' : 'text/plain' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roadmap.${format === 'json' ? 'json' : format === 'markdown' ? 'md' : 'csv'}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [roadmap, effects]);

  return (
    <div className={`max-w-7xl mx-auto p-6 ${className}`}>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="w-8 h-8 text-secondary-foreground" />
          <h1 className="text-3xl font-bold">Advanced SCL Features</h1>
        </div>
        <p className="text-muted-foreground">
          Constraint satisfaction, perturbation analysis, and implementation roadmaps
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="constraints" className="flex items-center gap-2">
            <Cog className="w-4 h-4" />
            Constraints
          </TabsTrigger>
          <TabsTrigger value="perturbations" className="flex items-center gap-2">
            <Shuffle className="w-4 h-4" />
            Perturbations
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Roadmap
          </TabsTrigger>
          <TabsTrigger value="integration" className="flex items-center gap-2">
            <Network className="w-4 h-4" />
            Integration
          </TabsTrigger>
        </TabsList>

        {/* Constraint Satisfaction Tab */}
        <TabsContent value="constraints" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Settings2 className="w-5 h-5" />
                  Constraint Satisfaction Solver
                </span>
                <Button 
                  onClick={handleConstraintSolving}
                  disabled={isProcessing}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isProcessing ? 'Solving...' : 'Run Solver'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Sample Constraints</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <Badge variant="outline" className="mb-2">Critical</Badge>
                      <div className="text-sm font-medium">Budget Constraint</div>
                      <div className="text-sm text-muted-foreground">Total budget ≤ $500,000</div>
                    </div>
                    <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
                      <Badge variant="outline" className="mb-2">High</Badge>
                      <div className="text-sm font-medium">Timeline Constraint</div>
                      <div className="text-sm text-muted-foreground">Complete within 6 months</div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Badge variant="outline" className="mb-2">High</Badge>
                      <div className="text-sm font-medium">Quality Constraint</div>
                      <div className="text-sm text-gray-600">≥95% success rate</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Solution Results</h3>
                  {constraintSolution ? (
                    <div className="space-y-3">
                      <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Solution Found</span>
                          <Badge variant={constraintSolution.feasible ? 'default' : 'destructive'}>
                            {constraintSolution.feasible ? 'Feasible' : 'Infeasible'}
                          </Badge>
                        </div>
                        <div className="text-sm space-y-1">
                          <div>Score: {constraintSolution.score.toFixed(2)}</div>
                          <div>Violations: {constraintSolution.violations.length}</div>
                        </div>
                      </div>

                      {Object.entries(constraintSolution.variables).map(([key, value]) => (
                        <div key={key} className="p-2 bg-muted/10 rounded text-sm">
                          <span className="font-medium">{key}:</span> {
                            typeof value === 'number' ? value.toLocaleString() : String(value)
                          }
                        </div>
                      ))}

                      {constraintSolution.violations.map((violation, index) => (
                        <div key={index} className="p-2 bg-destructive/10 border border-destructive/20 rounded text-sm">
                          <div className="font-medium text-destructive">Violation</div>
                          <div className="text-destructive">{violation.description}</div>
                          <div className="text-destructive/80">Severity: {violation.severity}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Run the constraint solver to see results
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Perturbation Analysis Tab */}
        <TabsContent value="perturbations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Shuffle className="w-5 h-5" />
                  Perturbation Analysis
                </span>
                <Button 
                  onClick={handlePerturbationGeneration}
                  disabled={isProcessing || effects.length === 0}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isProcessing ? 'Generating...' : 'Generate Perturbations'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {perturbations.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {perturbations.map((perturbation, index) => (
                    <div key={perturbation.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline" className={
                          perturbation.impact === 'critical' ? 'border-destructive text-destructive' :
                          perturbation.impact === 'high' ? 'border-secondary text-secondary-foreground' :
                          perturbation.impact === 'medium' ? 'border-accent text-accent-foreground' :
                          'border-green-500 text-green-700'
                        }>
                          {perturbation.type}
                        </Badge>
                        <Badge variant="secondary">
                          {Math.round(perturbation.likelihood * 100)}% likely
                        </Badge>
                      </div>
                      
                      <h4 className="font-medium text-sm mb-2">{perturbation.description}</h4>
                      
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>Magnitude: {Math.round(perturbation.magnitude * 100)}%</div>
                        <div>Impact: {perturbation.impact}</div>
                        <div className="italic">{perturbation.rationale}</div>
                      </div>
                      
                      <div className="mt-3">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            // Apply perturbation (demo)
                            console.log('Applying perturbation:', perturbation);
                          }}
                        >
                          Apply Scenario
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {effects.length === 0 ? 
                    'No effects available for perturbation analysis' :
                    'Generate perturbations to explore alternative scenarios'
                  }
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Implementation Roadmap Tab */}
        <TabsContent value="roadmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Implementation Roadmap
                </span>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleRoadmapGeneration}
                    disabled={isProcessing || effects.length === 0}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {isProcessing ? 'Generating...' : 'Generate Roadmap'}
                  </Button>
                  {roadmap && (
                    <div className="flex gap-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRoadmapExport('json')}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        JSON
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRoadmapExport('markdown')}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        MD
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRoadmapExport('excel')}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        CSV
                      </Button>
                    </div>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {roadmap ? (
                <div className="space-y-6">
                  {/* Roadmap Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{roadmap.tasks.length}</div>
                      <div className="text-sm text-blue-700">Total Tasks</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{roadmap.milestones.length}</div>
                      <div className="text-sm text-green-700">Milestones</div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{roadmap.risks.length}</div>
                      <div className="text-sm text-orange-700">Identified Risks</div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Project Timeline</h3>
                    <div className="space-y-2">
                      {roadmap.timeline.phases.map((phase, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                          <Badge variant="outline">{index + 1}</Badge>
                          <div className="flex-1">
                            <div className="font-medium">{phase.name}</div>
                            <div className="text-sm text-gray-600">{phase.description}</div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {phase.startDate} → {phase.endDate}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tasks Summary */}
                  <div>
                    <h3 className="text-lg font-medium mb-3">Task Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {roadmap.tasks.slice(0, 6).map((task, index) => (
                        <div key={task.id} className="p-3 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant="outline" className={
                              task.priority === 'critical' ? 'border-red-500 text-red-700' :
                              task.priority === 'high' ? 'border-orange-500 text-orange-700' :
                              task.priority === 'medium' ? 'border-yellow-500 text-yellow-700' :
                              'border-green-500 text-green-700'
                            }>
                              {task.priority}
                            </Badge>
                            <Badge variant="secondary">{task.effort}</Badge>
                          </div>
                          <h4 className="font-medium text-sm mb-1">{task.title}</h4>
                          <div className="text-xs text-gray-600">
                            Duration: {task.duration}
                          </div>
                          {task.dependencies.length > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              Dependencies: {task.dependencies.length}
                            </div>
                          )}
                        </div>
                      ))}
                      {roadmap.tasks.length > 6 && (
                        <div className="p-3 border rounded-lg border-dashed text-center text-gray-500">
                          +{roadmap.tasks.length - 6} more tasks...
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {effects.length === 0 ? 
                    'No effects available for roadmap generation' :
                    'Generate an implementation roadmap from your SCL analysis'
                  }
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integration Tab */}
        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5" />
                Integrated Analysis Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Analysis Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Effects Available</span>
                      <Badge variant={effects.length > 0 ? 'default' : 'secondary'}>
                        {effects.length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Constraint Solution</span>
                      <Badge variant={constraintSolution ? 'default' : 'secondary'}>
                        {constraintSolution ? 'Available' : 'Not generated'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Perturbations</span>
                      <Badge variant={perturbations.length > 0 ? 'default' : 'secondary'}>
                        {perturbations.length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>Implementation Roadmap</span>
                      <Badge variant={roadmap ? 'default' : 'secondary'}>
                        {roadmap ? 'Generated' : 'Not generated'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Recommendations</h3>
                  <div className="space-y-2 text-sm">
                    {effects.length === 0 && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
                        Start by generating SCL effects to enable advanced analysis
                      </div>
                    )}
                    {effects.length > 0 && !constraintSolution && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
                        Run constraint satisfaction to optimize implementation parameters
                      </div>
                    )}
                    {effects.length > 0 && perturbations.length === 0 && (
                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-800">
                        Generate perturbations to explore alternative scenarios
                      </div>
                    )}
                    {effects.length > 0 && !roadmap && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800">
                        Create implementation roadmap for actionable planning
                      </div>
                    )}
                    {effects.length > 0 && constraintSolution && perturbations.length > 0 && roadmap && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800">
                        🎉 Complete analysis ready! Export roadmap and begin implementation.
                      </div>
                    )}
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

export default AdvancedFeatures;
