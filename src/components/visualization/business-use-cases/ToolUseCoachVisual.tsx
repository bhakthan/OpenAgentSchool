import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TerminalWindow, WarningCircle, CheckCircle, ListChecks, Books } from "@phosphor-icons/react";

export const ToolUseCoachVisual: React.FC = () => {
  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4 space-y-4">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary">Developer Enablement Desk</p>
          <p className="text-xs text-muted-foreground">Tool‑Use Coach Pattern</p>
        </div>

        <div className="space-y-3 text-xs">
          <div className="border rounded-lg p-3 bg-background/70">
            <div className="flex items-center gap-2 mb-2">
              <TerminalWindow size={18} className="text-sky-500" />
              <span className="font-semibold tracking-wide uppercase">Learner Command</span>
            </div>
            <code className="block text-xs bg-black/5 rounded p-2 overflow-x-auto">
              {"curl https://api.payments.dev/invoices -d '{\"amount\":1200}'"}
            </code>
          </div>

          <div className="border rounded-lg p-3 bg-amber-50 dark:bg-amber-900/20">
            <div className="flex items-center gap-2 mb-1">
              <WarningCircle size={16} className="text-amber-600" />
              <span className="text-xs font-semibold">Coach Flags</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-amber-700 dark:text-amber-200">
              <li>Add <code>-s</code> to suppress noisy output.</li>
              <li>Include <code>--retry 3</code> for transient errors.</li>
              <li>Mask the API key using <code>$PAYMENTS_TOKEN</code>.</li>
            </ul>
          </div>

          <div className="border rounded-lg p-3 bg-emerald-50 dark:bg-emerald-900/20">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle size={16} className="text-emerald-600" />
              <span className="text-xs font-semibold">Validated Command</span>
            </div>
            <code className="block text-xs bg-emerald-900/10 dark:bg-emerald-900/40 rounded p-2 overflow-x-auto text-emerald-800 dark:text-emerald-100">
              {`curl -s --retry 3 https://api.payments.dev/invoices \\
              -H "Authorization: Bearer $PAYMENTS_TOKEN" \\
              -H "Content-Type: application/json" \\
              -d '{"amount":1200}'`}
            </code>
          </div>

          <div className="border rounded-lg p-3 bg-background/70">
            <div className="flex items-center gap-2 mb-1">
              <ListChecks size={16} className="text-primary" />
              <span className="text-xs font-semibold">Micro‑lesson Library</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Books size={16} />
              <span>Link to docs, exemplar commands, and common gotchas.</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
