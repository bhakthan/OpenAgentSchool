import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Flask,
  Cpu,
  Thermometer,
  ShieldCheck,
  ClipboardText,
  BracketsCurly,
  Pulse,
  Users
} from '@phosphor-icons/react';

export const AdaptiveLabTechnicianVisual: React.FC = () => {
  return (
  <Card className="bg-background border-emerald-200/60 dark:bg-background dark:border-emerald-500/30">
      <CardContent className="p-4 space-y-4">
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">Adaptive Lab Technician</p>
          <p className="text-xs text-muted-foreground max-w-lg mx-auto">
            Telemetry-aware orchestration of assays that keeps instruments calibrated, policy compliant, and humans looped in when anomalies surface.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-emerald-200/70 dark:border-emerald-500/30 bg-background/80 p-3 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-300">
              <Flask size={18} />
              <span className="text-sm font-semibold">Sample Intake</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2"><ClipboardText size={14} className="text-emerald-500" /> Chain-of-custody + barcodes</li>
              <li className="flex items-center gap-2"><Thermometer size={14} className="text-emerald-500" /> Cold-chain + reagent telemetry</li>
              <li className="flex items-center gap-2"><Cpu size={14} className="text-emerald-500" /> LIMS context + assay recipe</li>
            </ul>
          </div>

          <div className="rounded-lg border border-emerald-200/70 dark:border-emerald-500/30 bg-background/80 p-3 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-300">
              <BracketsCurly size={18} />
              <span className="text-sm font-semibold">Skill Orchestration</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2"><Pulse size={14} className="text-emerald-500" /> Gemini plan + parameter tuning</li>
              <li className="flex items-center gap-2"><Cpu size={14} className="text-emerald-500" /> Robotic pipettor & incubator control</li>
              <li className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500" /> Policy gates for ISO/CLIA compliance</li>
            </ul>
          </div>

          <div className="rounded-lg border border-emerald-200/70 dark:border-emerald-500/30 bg-background/80 p-3 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-300">
              <Users size={18} />
              <span className="text-sm font-semibold">Human-in-the-Loop</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2"><ShieldCheck size={14} className="text-emerald-500" /> Escalations with sensor snapshots</li>
              <li className="flex items-center gap-2"><ClipboardText size={14} className="text-emerald-500" /> Audit ledger + assay provenance</li>
              <li className="flex items-center gap-2"><Pulse size={14} className="text-emerald-500" /> Telemetry trend alerts for drift</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
