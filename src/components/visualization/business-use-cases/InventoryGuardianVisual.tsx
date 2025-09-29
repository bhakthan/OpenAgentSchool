import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Cube,
  Broadcast,
  Pulse,
  ChartLineUp,
  ClipboardText,
  Lightning,
  UsersThree,
  ShieldCheck
} from '@phosphor-icons/react';

export const InventoryGuardianVisual: React.FC = () => {
  return (
  <Card className="bg-background border-amber-200/60 dark:bg-background dark:border-amber-500/30">
      <CardContent className="p-4 space-y-4">
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wide">Inventory Guardian Signal Loop</p>
          <p className="text-xs text-muted-foreground max-w-xl mx-auto">
            Sensor fusion, digital twin reconciliation, and recovery playbooks keep warehouse stock accurate with proactive human validation.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-amber-200/70 dark:border-amber-500/30 bg-background/80 p-3 space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-300">
              <Pulse size={18} />
              <span className="text-sm font-semibold">Telemetry Intake</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2"><Cube size={14} className="text-amber-500" /> RFID + weight pad streams</li>
              <li className="flex items-center gap-2"><Broadcast size={14} className="text-amber-500" /> WMS & purchase events</li>
              <li className="flex items-center gap-2"><ShieldCheck size={14} className="text-amber-500" /> Cold-chain + spoilage signals</li>
            </ul>
          </div>

          <div className="rounded-lg border border-amber-200/70 dark:border-amber-500/30 bg-background/80 p-3 space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-300">
              <ChartLineUp size={18} />
              <span className="text-sm font-semibold">LLM Guardian Analyst</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2"><Lightning size={14} className="text-amber-500" /> Drift detection & variance insights</li>
              <li className="flex items-center gap-2"><ClipboardText size={14} className="text-amber-500" /> Recovery playbook selection</li>
              <li className="flex items-center gap-2"><ShieldCheck size={14} className="text-amber-500" /> Policy gates for sensitive inventory</li>
            </ul>
          </div>

          <div className="rounded-lg border border-amber-200/70 dark:border-amber-500/30 bg-background/80 p-3 space-y-2">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-300">
              <UsersThree size={18} />
              <span className="text-sm font-semibold">Ops Action Center</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2"><ClipboardText size={14} className="text-amber-500" /> Ranked hypotheses + evidence</li>
              <li className="flex items-center gap-2"><Lightning size={14} className="text-amber-500" /> Auto-generated tasks & PO drafts</li>
              <li className="flex items-center gap-2"><Broadcast size={14} className="text-amber-500" /> Feedback loop to guardian ledger</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
