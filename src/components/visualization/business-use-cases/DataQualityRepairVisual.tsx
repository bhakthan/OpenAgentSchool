import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Warning, ArrowsClockwise, Wrench, CheckCircle } from '@phosphor-icons/react';

export const DataQualityRepairVisual: React.FC = () => (
  <Card className="bg-muted/30 border-dashed">
    <CardContent className="p-4 space-y-3 text-xs">
      <div className="flex items-center gap-2 font-semibold text-primary"><Warning size={18}/> Data Quality Loop</div>
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="p-2 border rounded">Detect<br/>Anomaly</div>
        <div className="p-2 border rounded">Profile<br/>Drilldown</div>
        <div className="p-2 border rounded flex flex-col items-center">Repair<Wrench size={14}/></div>
        <div className="p-2 border rounded flex flex-col items-center">Validate<CheckCircle size={14}/></div>
      </div>
      <div className="flex items-center gap-1 text-xs text-amber-600"><ArrowsClockwise size={12}/> Closed-loop until KPI stable.</div>
    </CardContent>
  </Card>
);
