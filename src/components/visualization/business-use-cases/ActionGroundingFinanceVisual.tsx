import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileSql, Shield, TestTube, Check } from '@phosphor-icons/react';

export const ActionGroundingFinanceVisual: React.FC = () => (
  <Card className="bg-muted/30 border-dashed">
    <CardContent className="p-4 space-y-2 text-xs">
      <div className="flex items-center gap-2 font-semibold text-primary"><FileSql size={18}/> Factor Table Repair</div>
      <ol className="list-decimal ml-4 space-y-1">
        <li>Generate SQL patch</li>
        <li className="flex items-center gap-1">Static parse <Shield size={12}/></li>
        <li className="flex items-center gap-1">Policy gate <Shield size={12}/></li>
        <li className="flex items-center gap-1">Dry run <TestTube size={12}/></li>
        <li className="flex items-center gap-1">Approve <Check size={12}/></li>
      </ol>
    </CardContent>
  </Card>
);
