import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { SpinnerGap, Plus, X } from '@phosphor-icons/react';
import type { SCLMode, SCLObjective, SCLConstraints } from '@/types/supercritical';

interface SCLControlsProps {
  mode: SCLMode;
  initialSeeds?: {
    conceptIds: string[];
    patternIds: string[];
    practices: string[];
  };
  onStartSession: (config: {
    objectives: SCLObjective[];
    constraints: SCLConstraints;
  }) => void;
  isGenerating: boolean;
}

export function SCLControls({ mode, initialSeeds, onStartSession, isGenerating }: SCLControlsProps) {
  const [objectives, setObjectives] = React.useState<SCLObjective[]>(['optimize']);
  const [constraints, setConstraints] = React.useState<SCLConstraints>({
    budget: 'medium',
    latencyP99: 1000,
    accuracy: 0.95,
    complianceProfile: 'basic',
    teamSize: 5,
    timeHorizon: '3months',
  });

  const handleStartSession = () => {
    onStartSession({ objectives, constraints });
  };

  const toggleObjective = (objective: SCLObjective) => {
    setObjectives(prev => 
      prev.includes(objective)
        ? prev.filter(o => o !== objective)
        : [...prev, objective]
    );
  };

  return (
    <div className="space-y-6">
      {/* Seeds Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Learning Seeds
            <Badge variant="secondary">
              {(initialSeeds?.conceptIds.length || 0) + 
               (initialSeeds?.patternIds.length || 0) + 
               (initialSeeds?.practices.length || 0)} selected
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {initialSeeds && (
            <>
              {initialSeeds.conceptIds.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Core Concepts</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {initialSeeds.conceptIds.map(id => (
                      <Badge key={id} variant="outline">{id}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {initialSeeds.patternIds.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Agent Patterns</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {initialSeeds.patternIds.map(id => (
                      <Badge key={id} variant="outline">{id}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {initialSeeds.practices.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">AI-Native Practices</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {initialSeeds.practices.map(id => (
                      <Badge key={id} variant="outline">{id}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          
          <Button variant="outline" size="sm" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add More Seeds
          </Button>
        </CardContent>
      </Card>

      {/* Objectives */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Objectives</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {(['optimize', 'minimizeRisk', 'hitSLOs', 'scaleTeam', 'reduceComplexity'] as SCLObjective[]).map(obj => (
              <div key={obj} className="flex items-center space-x-2">
                <Checkbox
                  id={obj}
                  checked={objectives.includes(obj)}
                  onCheckedChange={() => toggleObjective(obj)}
                />
                <Label htmlFor={obj} className="text-sm">
                  {obj.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Constraints */}
      <Card>
        <CardHeader>
          <CardTitle>System Constraints</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget">Budget</Label>
              <Select value={constraints.budget} onValueChange={(value: any) => 
                setConstraints(prev => ({ ...prev, budget: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="compliance">Compliance Profile</Label>
              <Select value={constraints.complianceProfile} onValueChange={(value: any) => 
                setConstraints(prev => ({ ...prev, complianceProfile: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="strict">Strict</SelectItem>
                  <SelectItem value="regulated">Regulated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Latency P99: {constraints.latencyP99}ms</Label>
            <Slider
              value={[constraints.latencyP99 || 1000]}
              onValueChange={([value]) => 
                setConstraints(prev => ({ ...prev, latencyP99: value }))
              }
              max={5000}
              min={100}
              step={100}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Accuracy: {(constraints.accuracy || 0.95) * 100}%</Label>
            <Slider
              value={[(constraints.accuracy || 0.95) * 100]}
              onValueChange={([value]) => 
                setConstraints(prev => ({ ...prev, accuracy: value / 100 }))
              }
              max={99}
              min={80}
              step={1}
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="teamSize">Team Size</Label>
              <Input
                id="teamSize"
                type="number"
                value={constraints.teamSize}
                onChange={(e) => 
                  setConstraints(prev => ({ ...prev, teamSize: parseInt(e.target.value) || 5 }))
                }
                min={1}
                max={50}
              />
            </div>

            <div>
              <Label htmlFor="timeHorizon">Time Horizon</Label>
              <Select value={constraints.timeHorizon} onValueChange={(value: any) => 
                setConstraints(prev => ({ ...prev, timeHorizon: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">1 Month</SelectItem>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                  <SelectItem value="2years">2 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <Button 
        onClick={handleStartSession} 
        disabled={isGenerating}
        className="w-full"
        size="lg"
      >
        {isGenerating ? (
          <>
            <SpinnerGap className="h-4 w-4 mr-2 animate-spin" />
            Generating Effect Graph...
          </>
        ) : (
          <>
            Start {mode.charAt(0).toUpperCase() + mode.slice(1)} Analysis
          </>
        )}
      </Button>
    </div>
  );
}

export default SCLControls;
