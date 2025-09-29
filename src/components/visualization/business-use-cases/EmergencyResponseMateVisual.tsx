import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  PhoneCall,
  MapPinLine,
  Megaphone,
  WarningOctagon,
  UsersThree,
  ClipboardText,
  ShieldCheck,
  Radio
} from '@phosphor-icons/react';

export const EmergencyResponseMateVisual: React.FC = () => {
  return (
  <Card className="bg-background border-rose-200/60 dark:bg-background dark:border-rose-500/30">
      <CardContent className="p-4 space-y-4">
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-rose-700 dark:text-rose-300 uppercase tracking-wide">Emergency Response Mate</p>
          <p className="text-xs text-muted-foreground max-w-xl mx-auto">
            Fuses alerts, situational intelligence, and multi-channel comms so responders, command, and auditors stay aligned during critical incidents.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-rose-200/70 dark:border-rose-500/30 bg-background/80 p-3 space-y-2">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-300">
              <PhoneCall size={18} />
              <span className="text-sm font-semibold">Signal Intake</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2"><WarningOctagon size={14} className="text-rose-500" /> IoT + 911 alerts</li>
              <li className="flex items-center gap-2"><Megaphone size={14} className="text-rose-500" /> Human desk escalations</li>
              <li className="flex items-center gap-2"><MapPinLine size={14} className="text-rose-500" /> Floor plans & hazard zones</li>
            </ul>
          </div>

          <div className="rounded-lg border border-rose-200/70 dark:border-rose-500/30 bg-background/80 p-3 space-y-2">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-300">
              <ShieldCheck size={18} />
              <span className="text-sm font-semibold">AI Response Cell</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2"><ClipboardText size={14} className="text-rose-500" /> Classify severity + required disciplines</li>
              <li className="flex items-center gap-2"><Radio size={14} className="text-rose-500" /> Generate tasking & escalation packets</li>
              <li className="flex items-center gap-2"><Megaphone size={14} className="text-rose-500" /> Sync updates across channels</li>
            </ul>
          </div>

          <div className="rounded-lg border border-rose-200/70 dark:border-rose-500/30 bg-background/80 p-3 space-y-2">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-300">
              <UsersThree size={18} />
              <span className="text-sm font-semibold">Responder Network</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2"><Radio size={14} className="text-rose-500" /> Radio bridge + SMS confirmations</li>
              <li className="flex items-center gap-2"><Megaphone size={14} className="text-rose-500" /> Command dashboard telemetry</li>
              <li className="flex items-center gap-2"><ClipboardText size={14} className="text-rose-500" /> After-action timeline & follow-ups</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
