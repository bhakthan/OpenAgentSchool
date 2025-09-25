import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Timer, Coins, ChartLineUp } from '@phosphor-icons/react';

export const BudgetExecutionEcommerceVisual: React.FC = () => (
  <Card className="bg-muted/30 border-dashed">
    <CardContent className="p-4 space-y-3 text-xs">
      <div className="font-semibold text-primary flex items-center gap-2"><ChartLineUp size={18}/> Pricing Elasticity Loop</div>
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 border rounded">Tokens<br/><span className="font-semibold">12.4k / 50k</span></div>
        <div className="p-2 border rounded">Latency<br/><span className="font-semibold">42s / 180s</span></div>
        <div className="p-2 border rounded">Tasks Done<br/><span className="font-semibold">4 / 6</span></div>
      </div>
      <div className="flex items-center gap-2 text-xs"><Timer size={14}/> Early stop threshold check after each cycle.</div>
  <div className="text-xs flex items-center gap-2"><Coins size={14}/> Adaptive retry only if marginal gain &gt; cost delta.</div>
    </CardContent>
  </Card>
);
