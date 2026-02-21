import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Play, ArrowClockwise, FastForward } from '@phosphor-icons/react';

interface ExecutionStepGeneric { id: string; title: string; description: string; startLine?: number; endLine?: number; }

interface LivePatternRunnerProps {
  code: string; // full JS/TS example code
  pythonCode?: string; // optional python code example
  patternId: string;
  patternName: string;
  steps: ExecutionStepGeneric[];
  pythonSteps?: ExecutionStepGeneric[]; // optional separate mapping for python code
}

const codeToLines = (code: string) => code.replace(/\r\n/g, '\n').split('\n');

const LivePatternRunner: React.FC<LivePatternRunnerProps> = ({ code, pythonCode, patternId, patternName, steps, pythonSteps }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [log, setLog] = useState<string[]>([]);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);

  const currentStep = steps[activeStepIndex];
  const codeLines = useMemo(() => codeToLines(code), [code]);
  const pyLines = useMemo(() => pythonCode ? codeToLines(pythonCode) : [], [pythonCode]);
  const highlight = steps[activeStepIndex];
  const pyHighlight = pythonSteps ? pythonSteps[activeStepIndex] : highlight;
  const jsLineRefs = useRef<HTMLDivElement[]>([]);
  const pyLineRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const jsFirstLine = highlight?.startLine;
    if (jsFirstLine && jsLineRefs.current[jsFirstLine - 1]) {
      jsLineRefs.current[jsFirstLine - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    const pyFirstLine = pyHighlight?.startLine;
    if (pyFirstLine && pyLineRefs.current[pyFirstLine - 1]) {
      pyLineRefs.current[pyFirstLine - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeStepIndex, highlight, pyHighlight]);

  React.useEffect(() => {
    let timer: any;
    if (autoPlay && activeStepIndex < steps.length) {
      timer = setTimeout(() => {
        advanceStep();
      }, 1400);
    }
    return () => clearTimeout(timer);
  }, [autoPlay, activeStepIndex]);

  const advanceStep = () => {
    const step = steps[activeStepIndex];
    setLog(l => [...l, `Executing: ${step.title}`]);
    if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex(i => i + 1);
    } else {
      setAutoPlay(false);
      setLog(l => [...l, 'Execution complete.']);
    }
  };

  const reset = () => {
    setActiveStepIndex(0);
    setLog([]);
    setAutoPlay(false);
  };

  const handleRunAll = () => {
    reset();
    setAutoPlay(true);
  };

  const renderCode = (
    lines: string[],
    refs: React.MutableRefObject<HTMLDivElement[]>,
    currentHighlight: ExecutionStepGeneric = highlight
  ) => (
    <pre className="live-runner-code-block text-xs md:text-sm leading-snug p-3 rounded bg-muted/60 border overflow-auto" style={{ maxHeight: 400 }}>
      {lines.map((line, idx) => {
        const lineNumber = idx + 1;
        const isHighlighted = currentHighlight && currentHighlight.startLine && currentHighlight.endLine && lineNumber >= currentHighlight.startLine && lineNumber <= currentHighlight.endLine;
        return (
          <div ref={el => { if (el) refs.current[lineNumber - 1] = el; }} key={idx} className={isHighlighted ? 'live-runner-line-highlight rounded px-1 -mx-1 border-l-2 border-primary/70 bg-primary/15 dark:bg-primary/25' : ''}>
            <span className="opacity-40 select-none w-10 inline-block text-right pr-2">{lineNumber}</span>
            <code>{line || '\u00A0'}</code>
          </div>
        );
      })}
    </pre>
  );

  return (
    <Card className="mt-6 border-primary/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">Live {patternName} Runner</CardTitle>
        <p className="text-sm text-muted-foreground">Step through the execution lifecycle. Highlighted lines correspond to the current conceptual step. (Simulation only – no real service calls).</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={advanceStep} disabled={activeStepIndex >= steps.length - 1 || autoPlay}>
            <FastForward size={16} className="mr-1" /> Step
          </Button>
          <Button size="sm" variant="secondary" onClick={handleRunAll} disabled={autoPlay}>
            <Play size={16} className="mr-1" /> Run All
          </Button>
          <Button size="sm" variant="outline" onClick={reset}>
            <ArrowClockwise size={16} className="mr-1" /> Reset
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2 text-sm tracking-wide">JavaScript / TypeScript</h4>
            <ScrollArea className="h-[420px]">
              {renderCode(codeLines, jsLineRefs)}
            </ScrollArea>
          </div>
          {pythonCode && (
            <div>
              <h4 className="font-semibold mb-2 text-sm tracking-wide">Python</h4>
              <ScrollArea className="h-[420px]">
                {renderCode(pyLines, pyLineRefs, pyHighlight)}
              </ScrollArea>
            </div>
          )}
        </div>
        <div className="border rounded p-3 bg-muted/40">
          <h4 className="font-semibold mb-1 text-sm">Current Step</h4>
          <div className="text-sm"><span className="font-medium">{highlight.title}:</span> {highlight.description}</div>
          <div className="text-xs mt-1 text-muted-foreground">{highlight.startLine ? `Lines ${highlight.startLine}-${highlight.endLine}` : 'Lines: (mapping pending)'}</div>
        </div>
        <div className="border rounded p-3 bg-muted/30">
          <h4 className="font-semibold mb-1 text-sm">Execution Log</h4>
          <ScrollArea className="h-40 pr-2">
            <ul className="text-xs space-y-1">
              {log.map((l, i) => <li key={i}>{l}</li>)}
            </ul>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default LivePatternRunner;
