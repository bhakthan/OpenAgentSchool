import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, GitCommit, GitBranch, UsersThree, Notebook, LinkSimpleHorizontal } from '@phosphor-icons/react';

export const PairHandoffVisual: React.FC = () => {
  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4">
        <div className="text-center mb-3">
          <p className="text-sm font-semibold text-primary">Pair Rotation Handoff</p>
          <p className="text-xs text-muted-foreground">Handoff Summarizer</p>
        </div>

        <div className="flex flex-col items-stretch gap-3">
          {/* Current Pair */}
          <div className="flex items-center gap-2">
            <UsersThree size={20} className="text-primary" />
            <span className="text-xs font-medium text-foreground">Pair A (ending session)</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <GitCommit size={16} /> <span>Last commit: fix auth bug (#124)</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <GitBranch size={16} /> <span>Branch: feature/login-flow</span>
          </div>

          <div className="flex items-center justify-center my-1">
            <ArrowRight size={24} className="text-primary" />
          </div>

          {/* Handoff Brief */}
          <div className="p-3 border rounded bg-background/70">
            <div className="flex items-center gap-2 mb-2">
              <Notebook size={16} className="text-primary" />
              <span className="text-xs font-semibold text-foreground">Handoff Brief</span>
            </div>
            <ul className="text-xs list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Decision: Adopt OAuth Device Code flow</li>
              <li>Blocker: Rate limit on /token endpoint</li>
              <li>Next: Add exponential backoff and retry</li>
            </ul>

            <div className="mt-2 text-xs flex items-center gap-2">
              <LinkSimpleHorizontal size={14} className="text-primary" />
              <a className="underline text-primary" href="#">PR #125</a>
              <span className="text-muted-foreground">·</span>
              <a className="underline text-primary" href="#">Design doc</a>
            </div>
          </div>

          {/* Incoming Pair */}
          <div className="flex items-center gap-2">
            <UsersThree size={20} className="text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-medium text-foreground">Pair B (starting session)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
