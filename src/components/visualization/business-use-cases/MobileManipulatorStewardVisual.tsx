import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Robot,
  MapTrifold,
  CirclesThreePlus,
  ShieldCheck,
  UsersThree,
  Broadcast,
  ArrowRight,
  Cube,
  Waveform,
  NavigationArrow,
  HandWaving
} from '@phosphor-icons/react';

export const MobileManipulatorStewardVisual: React.FC = () => {
  return (
    <Card className="bg-gradient-to-br from-background via-background to-primary/5 border-primary/20">
      <CardContent className="p-4 space-y-4">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">Mobile Manipulator Steward Flow</p>
          <p className="text-xs text-muted-foreground">
            Gemini robotics concierge orchestrating perception, planning, execution, and human-in-the-loop oversight.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-primary/20 bg-background/80 p-3 space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Waveform size={18} />
              <span className="text-sm font-semibold">Perception Input</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2"><Robot size={14} className="text-primary/80" /> RGB-D camera stream</li>
              <li className="flex items-center gap-2"><Cube size={14} className="text-primary/80" /> Force / torque telemetry</li>
              <li className="flex items-center gap-2"><HandWaving size={14} className="text-primary/80" /> Guest request intent</li>
            </ul>
          </div>

          <div className="rounded-lg border border-primary/20 bg-background/80 p-3 space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <MapTrifold size={18} />
              <span className="text-sm font-semibold">Gemini Grounded Planning</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2"><CirclesThreePlus size={14} className="text-primary/80" /> Skill graph sequencing</li>
              <li className="flex items-center gap-2"><NavigationArrow size={14} className="text-primary/80" /> Route + elevator selection</li>
              <li className="flex items-center gap-2"><Broadcast size={14} className="text-primary/80" /> Narrated status brief</li>
            </ul>
          </div>

          <div className="rounded-lg border border-primary/20 bg-background/80 p-3 space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck size={18} />
              <span className="text-sm font-semibold">Execution Guardrails</span>
            </div>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li className="flex items-center gap-2"><ArrowRight size={14} className="text-primary/80" /> Navigation controller halt/replan</li>
              <li className="flex items-center gap-2"><Robot size={14} className="text-primary/80" /> Manipulator safe grip envelopes</li>
              <li className="flex items-center gap-2"><UsersThree size={14} className="text-primary/80" /> Operator override channels</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-3 text-xs text-muted-foreground leading-relaxed">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-1">
            <Broadcast size={16} /> Human-in-the-loop Telemetry
          </div>
          <p>
            Safety guardian outputs halt reasons, reroute recommendations, and narrated updates to an operator console.
            Completion proof bundles telemetry clips, CSAT prompts, and audit-ready traces for after-action review.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
