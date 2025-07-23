import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Code } from '@phosphor-icons/react';

interface CodeVisualizerProps {
  title: string;
  patternName: string;
  code?: string;
  output?: string;
}

export const CodeVisualizer: React.FC<CodeVisualizerProps> = ({ title, patternName, code, output }) => {
  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4">
        <div className="text-center mb-4">
            <p className="text-sm font-semibold text-primary">{title}</p>
            <p className="text-xs text-muted-foreground">{patternName} Pattern</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-full p-3 border rounded-lg bg-background/70 text-left">
            <p className="text-xs font-bold mb-2">Python Code</p>
            <pre className="text-xs bg-black/5 rounded p-2 overflow-x-auto"><code>{code || 'No code provided.'}</code></pre>
          </div>
          <div className="w-full p-3 border rounded-lg bg-background/70 text-left">
            <p className="text-xs font-bold mb-2">Execution Output</p>
            <pre className="text-xs bg-black/5 rounded p-2 overflow-x-auto"><code>{output || 'No output provided.'}</code></pre>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
