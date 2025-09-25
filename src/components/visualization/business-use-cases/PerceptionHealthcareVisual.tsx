import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Stethoscope, Database, ShieldCheck, Lightning } from '@phosphor-icons/react';

export const PerceptionHealthcareVisual: React.FC = () => (
  <Card className="bg-muted/30 border-dashed">
    <CardContent className="p-4 space-y-3 text-xs">
      <div className="flex items-center gap-2 font-semibold text-primary"><Stethoscope size={18}/> Healthcare Perception Layer</div>
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2 rounded border bg-background/60">
          <p className="font-medium">Sources</p>
          <ul className="list-disc ml-3">
            <li>Encounters</li>
            <li>Labs</li>
            <li>Claims</li>
          </ul>
        </div>
        <div className="p-2 rounded border bg-background/60">
          <p className="font-medium">Profiling</p>
          <p>Null %, distinct, distribution sketches</p>
        </div>
        <div className="p-2 rounded border bg-background/60">
          <p className="font-medium">Governance</p>
          <p className="flex items-center gap-1"><ShieldCheck size={14}/> PHI tags, retention</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-green-600"><Lightning size={16}/> Compact InfoBox (38KB) → downstream planning</div>
    </CardContent>
  </Card>
);
