import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, GearSix, LockSimpleOpen, TrafficCone } from '@phosphor-icons/react';

export const PolicyGatedInvocationVisual: React.FC = () => (
  <Card className="bg-muted/30 border-dashed">
    <CardContent className="p-4 space-y-3 text-xs">
      <div className="flex items-center gap-2 font-semibold text-primary"><ShieldCheck size={18}/> Policy-Gated Tool Call</div>
      <ol className="list-decimal ml-4 space-y-1">
        <li>Intent parse</li>
        <li className="flex items-center gap-1">Capability map <GearSix size={12}/></li>
        <li className="flex items-center gap-1">Risk scoring <TrafficCone size={12}/></li>
        <li className="flex items-center gap-1">Policy lattice eval <ShieldCheck size={12}/></li>
        <li className="flex items-center gap-1">Signed invocation <LockSimpleOpen size={12}/></li>
      </ol>
    </CardContent>
  </Card>
);
