import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { User, Question, Robot, Wrench, CreditCard } from '@phosphor-icons/react';

export const SupportRouterVisual = () => {
  return (
    <Card className="border border-border bg-card text-card-foreground shadow-sm">
      <CardContent className="space-y-4 p-4">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary">Smart Customer Support</p>
          <p className="text-xs text-muted-foreground">Routing Pattern</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Step 1: User Query */}
          <div className="flex items-center space-x-2">
            <User size={28} className="text-primary" />
            <p className="text-sm font-medium text-foreground">"My bill is wrong!"</p>
          </div>

          <div className="text-2xl text-muted-foreground animate-bounce">⬇️</div>

          {/* Step 2: Router Agent */}
          <div className="w-full rounded-lg border border-border bg-muted/40 p-4 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Router Agent</p>
            <div className="flex items-center justify-around gap-2">
              <div className="text-center opacity-60">
                <Wrench size={24} className="mx-auto text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Tech Support</p>
              </div>
              <div className="text-center space-y-1 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2">
                <p className="text-xs font-semibold text-primary">Intent: "Billing"</p>
                <div className="text-xl text-primary">→</div>
                <CreditCard size={24} className="mx-auto text-primary" />
                <p className="text-xs font-semibold text-foreground">Billing Agent</p>
              </div>
              <div className="text-center opacity-60">
                <Question size={24} className="mx-auto text-muted-foreground" />
                <p className="text-xs text-muted-foreground">FAQ Agent</p>
              </div>
            </div>
          </div>

          <div className="text-2xl text-muted-foreground">⬇️</div>

          {/* Step 3: Correct Agent Responds */}
          <div className="flex items-center space-x-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-300">
            <Robot size={32} className="text-emerald-500" />
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Billing Agent Response</p>
              <p className="text-xs text-muted-foreground">"I see the error on your invoice. Let me correct that for you."</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
