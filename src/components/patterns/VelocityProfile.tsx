import React from 'react';
import { VelocityProfile as VelocityProfileType } from '@/lib/data/patterns/types';
import { VelocityBadge } from './VelocityBadge';
import { Clock, Zap, TrendingUp, BookOpen, Target } from 'lucide-react';

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

  return (
    <div className="space-y-6 p-6 bg-gray-50 dark:from-purple-900/10 dark:to-blue-900/10 dark:bg-gradient-to-br rounded-xl border border-gray-200 dark:border-purple-800/30">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Zap className="w-5 h-5 text-gray-700 dark:text-purple-600" />
            Agent Velocity Engineering Profile
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Implementation velocity metrics and acceleration practices
          </p>
        </div>
        <VelocityBadge impact={profile.impact} size="lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Time to Implement */}
        <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Time to Implement</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{profile.timeToImplement}</p>
        </div>

        {/* Reusability Score */}
        <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Reusability Score</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-gray-900 dark:text-white">{profile.reusabilityScore}/10</p>
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
        <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-gray-600 dark:text-purple-400" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Learning Curve</span>
          </div>
          <p className={`text-lg font-bold ${learningCurve.color} flex items-center gap-2`}>
            <span>{learningCurve.icon}</span>
            <span>{learningCurve.label}</span>
          </p>
        </div>

        {/* Complexity Reduction */}
        <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg border border-gray-200 dark:border-gray-700 md:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Complexity Reduction</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">{profile.complexityReduction}</p>
        </div>
      </div>

      {/* Velocity Practices */}
      <div>
        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-gray-700 dark:text-purple-600" />
          Agent Velocity Engineering Practices
        </h4>
        <div className="space-y-2">
          {profile.velocityPractices.map((practice, idx) => {
            const [pillar, ...descParts] = practice.split(' - ');
            const description = descParts.join(' - ');
            
            return (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 bg-white/80 dark:bg-gray-800/80 rounded-lg border border-gray-300 dark:border-purple-800/30"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 dark:bg-purple-400/20 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-purple-300">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-purple-300">
                    {pillar}
                  </p>
                  {description && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
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
        <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg">
          <p className="text-sm font-semibold text-green-700 dark:text-green-400 flex items-center gap-2">
            <span>✨</span>
            <span>Quick Win Pattern - High impact with rapid implementation!</span>
          </p>
        </div>
      )}
    </div>
  );
};
