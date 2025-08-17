import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Target, 
  Lightbulb, 
  TrendUp, 
  Star,
  Trophy
} from '@phosphor-icons/react';
import type { SCLSession as SCLSessionType } from '@/types/supercritical';

interface SCLRubricProps {
  session: SCLSessionType;
}

export function SCLRubric({ session }: SCLRubricProps) {
  const { score } = session;
  
  const scoreItems = [
    {
      label: 'Completeness',
      value: score.completeness,
      description: 'Coverage of effect chains',
      icon: CheckCircle,
      color: 'text-accent',
    },
    {
      label: '2nd Order Depth',
      value: score.secondOrderDepth / 10, // Normalize to 0-1
      description: `${score.secondOrderDepth} valid second-order effects`,
      icon: Target,
      color: 'text-primary',
    },
    {
      label: '3rd Order Depth',
      value: score.thirdOrderDepth / 5, // Normalize to 0-1
      description: `${score.thirdOrderDepth} valid third-order effects`,
      icon: TrendUp,
      color: 'text-secondary-foreground',
    },
    {
      label: 'Novelty',
      value: score.novelty,
      description: 'Original insights discovered',
      icon: Lightbulb,
      color: 'text-accent',
    },
    {
      label: 'Feasibility',
      value: score.feasibility,
      description: 'Practical implementation potential',
      icon: Star,
      color: 'text-primary',
    },
    {
      label: 'Leap Detection',
      value: score.leapDetection,
      description: 'Quality of discontinuity identification',
      icon: Trophy,
      color: 'text-destructive',
    },
  ];

  const overallScore = Object.values(score).reduce((sum, val) => sum + val, 0) / Object.keys(score).length;

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Overall Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {Math.round(overallScore * 100)}%
            </div>
            <Progress value={overallScore * 100} className="mb-4" />
            <Badge variant={overallScore > 0.8 ? 'default' : overallScore > 0.6 ? 'secondary' : 'outline'}>
              {overallScore > 0.8 ? 'Excellent' : overallScore > 0.6 ? 'Good' : 'Developing'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Rubric</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scoreItems.map((item) => {
            const IconComponent = item.icon;
            const percentage = Math.round(item.value * 100);
            
            return (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className={`h-4 w-4 ${item.color}`} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  <Badge variant="outline">{percentage}%</Badge>
                </div>
                <Progress value={percentage} className="h-2" />
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Badges & Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {session.leaps.length > 0 && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-destructive/10">
                <TrendUp className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium">Leap Detector</span>
                <Badge variant="destructive" className="ml-auto">
                  {session.leaps.length} found
                </Badge>
              </div>
            )}
            
            {score.thirdOrderDepth > 3 && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/10">
                <Target className="h-4 w-4 text-secondary-foreground" />
                <span className="text-sm font-medium">Deep Thinker</span>
                <Badge variant="outline" className="ml-auto">
                  3rd Order Master
                </Badge>
              </div>
            )}
            
            {score.novelty > 0.7 && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/10">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">Innovator</span>
                <Badge variant="outline" className="ml-auto">
                  Novel Insights
                </Badge>
              </div>
            )}
            
            {Object.values(score).every(s => s === 0) && (
              <div className="text-center text-muted-foreground py-4">
                <Trophy className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Complete a session to unlock achievements</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Learning Reflection */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            {overallScore < 0.6 && (
              <p>• Try focusing on one specific domain (ops, security, cost) for deeper analysis</p>
            )}
            {score.secondOrderDepth < 3 && (
              <p>• Explore more second-order effects by asking "what happens next?"</p>
            )}
            {score.leapDetection < 0.5 && (
              <p>• Look for thresholds where small changes cause big shifts</p>
            )}
            {session.mode === 'consolidate' && overallScore > 0.7 && (
              <p>• Ready to try Extrapolate mode with constraints and perturbations</p>
            )}
            <p>• Review your synthesis and consider real-world implementation challenges</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SCLRubric;
