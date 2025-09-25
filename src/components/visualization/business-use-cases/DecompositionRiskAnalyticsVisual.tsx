import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GitBranch, Funnel, CheckCircle } from '@phosphor-icons/react';

export const DecompositionRiskAnalyticsVisual: React.FC = () => (
  <Card className="bg-muted/30 border-dashed">
    <CardContent className="p-4 space-y-3 text-xs">
      <div className="flex items-center gap-2 font-semibold text-primary"><GitBranch size={18}/> VaR Investigation Plan</div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="font-medium mb-1">Draft Subtasks</p>
          <ul className="list-disc ml-4">
            <li>Extract returns window</li>
            <li>Compute volatility deltas</li>
            <li>Correlate factor shocks</li>
          </ul>
        </div>
        <div>
          <p className="font-medium mb-1">Validation</p>
          <p className="text-xs flex items-center gap-1"><Funnel size={14}/> 9 → 6 valid (coverage 0.67)</p>
          <p className="text-xs flex items-center gap-1"><CheckCircle size={14}/> No hallucinated tables</p>
        </div>
      </div>
    </CardContent>
  </Card>
);
