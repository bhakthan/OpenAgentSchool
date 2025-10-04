import React from 'react';
import { VelocityProfile as VelocityProfileType } from '@/lib/data/patterns/types';
import { VelocityBadge } from './VelocityBadge';
import { Clock, Zap, TrendingUp, BookOpen, Target } from 'lucide-react';
import './velocity-profile.css';

interface VelocityProfileProps {
  profile: VelocityProfileType;
}

export const VelocityProfile: React.FC<VelocityProfileProps> = ({ profile }) => {
  const learningCurveConfig = {
    gentle: { icon: '😊', color: 'text-green-600 dark:text-green-400', label: 'Gentle' },
    moderate: { icon: '🤔', color: 'text-yellow-600 dark:text-yellow-400', label: 'Moderate' },
    steep: { icon: '🧗', color: 'text-red-600 dark:text-red-400', label: 'Steep' }
  };

  const learningCurve = learningCurveConfig[profile.learningCurve];
  const metricCardClass =
    'rounded-lg border border-border bg-card p-4 shadow-sm transition-colors dark:bg-secondary/60 dark:border-border/80';

  return (
    <div className="space-y-6 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-md transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="mb-2 flex items-center gap-2 text-xl font-bold text-foreground">
            <Zap className="h-5 w-5 text-primary" />
            Agent Velocity Engineering Profile
          </h3>
          <p className="text-sm text-muted-foreground">
            Implementation velocity metrics and acceleration practices
          </p>
        </div>
        <VelocityBadge impact={profile.impact} size="lg" />
      </div>

  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Time to Implement */}
        <div className={metricCardClass}>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-foreground">Time to Implement</span>
          </div>
          <p className="text-lg font-bold text-foreground">{profile.timeToImplement}</p>
        </div>

        {/* Reusability Score */}
        <div className={metricCardClass}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-semibold text-foreground">Reusability Score</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-foreground">{profile.reusabilityScore}/10</p>
            <div className="flex gap-0.5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-4 rounded-sm ${
                    i < profile.reusabilityScore
                      ? 'bg-green-500 dark:bg-green-400'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Learning Curve */}
        <div className={metricCardClass}>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-semibold text-foreground">Learning Curve</span>
          </div>
          <p className={`flex items-center gap-2 text-lg font-bold ${learningCurve.color}`}>
            <span>{learningCurve.icon}</span>
            <span>{learningCurve.label}</span>
          </p>
        </div>

        {/* Complexity Reduction */}
        <div className={`${metricCardClass} md:col-span-2`}>
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-semibold text-foreground">Complexity Reduction</span>
          </div>
          <p className="text-sm text-muted-foreground">{profile.complexityReduction}</p>
        </div>
      </div>

      {/* Velocity Practices */}
      <div className="velocity-practices-section">
        <h4 className="velocity-practices-heading">
          <Zap className="h-4 w-4" />
          Agent Velocity Engineering Practices
        </h4>
        <div className="velocity-practices-list">
          {profile.velocityPractices.map((practice, idx) => {
            const [pillar, ...descParts] = practice.split(' - ');
            const description = descParts.join(' - ');
            
            return (
              <div key={idx} className="velocity-practice-card">
                <div className="velocity-practice-index">
                  {idx + 1}
                </div>
                <div className="velocity-practice-content">
                  <p className="velocity-practice-title">
                    {pillar}
                  </p>
                  {description && (
                    <p className="velocity-practice-desc">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Win Indicator */}
      {profile.impact === 'high' && profile.timeToImplement.includes('hour') && (
        <div className="velocity-quick-win">
          <span>✨</span>
          <span>Quick Win Pattern - High impact with rapid implementation!</span>
        </div>
      )}
    </div>
  );
};
