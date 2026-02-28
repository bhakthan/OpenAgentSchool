import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, ArrowsClockwise, Graph } from '@phosphor-icons/react';
import { trackEvent } from '@/lib/analytics/ga';

interface HypothesisNode {
  id: string;
  generation: number;
  text: string;
  score: number;
  parent?: string;
  status: 'active' | 'selected' | 'pruned';
}

export function HypothesisEvolutionDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentGeneration, setCurrentGeneration] = useState(0);
  const [hypotheses, setHypotheses] = useState<HypothesisNode[]>([]);
  const animationRef = useRef<number>();

  // Sample hypothesis data
  const fullHypothesesData: HypothesisNode[] = [
    // Generation 0
    { id: 'h0-1', generation: 0, text: 'Lithium-based superconductor at room temp', score: 0.45, status: 'selected' },
    { id: 'h0-2', generation: 0, text: 'Copper-oxide high-TC variant', score: 0.38, status: 'pruned' },
    { id: 'h0-3', generation: 0, text: 'Hydrogen-rich metallic phase', score: 0.52, status: 'selected' },
    
    // Generation 1
    { id: 'h1-1', generation: 1, text: 'Li-H compound under pressure', score: 0.61, parent: 'h0-1', status: 'selected' },
    { id: 'h1-2', generation: 1, text: 'Li-graphene composite', score: 0.42, parent: 'h0-1', status: 'pruned' },
    { id: 'h1-3', generation: 1, text: 'H₃S derivative at 200 GPa', score: 0.68, parent: 'h0-3', status: 'selected' },
    { id: 'h1-4', generation: 1, text: 'LaH₁₀ crystal structure', score: 0.71, parent: 'h0-3', status: 'selected' },
    
    // Generation 2
    { id: 'h2-1', generation: 2, text: 'Li₂MgH₁₆ compressed lattice', score: 0.74, parent: 'h1-1', status: 'selected' },
    { id: 'h2-2', generation: 2, text: 'H₃S + carbon nanotubes', score: 0.58, parent: 'h1-3', status: 'pruned' },
    { id: 'h2-3', generation: 2, text: 'LaH₁₀ doped with Yttrium', score: 0.83, parent: 'h1-4', status: 'selected' },
    { id: 'h2-4', generation: 2, text: 'YH₉ modified structure', score: 0.79, parent: 'h1-4', status: 'selected' },
    
    // Generation 3
    { id: 'h3-1', generation: 3, text: 'Y-La-H₁₀ ternary compound', score: 0.91, parent: 'h2-3', status: 'selected' },
    { id: 'h3-2', generation: 3, text: 'YH₉ at 175 GPa (optimal)', score: 0.88, parent: 'h2-4', status: 'selected' },
  ];

  useEffect(() => {
    // Initialize with generation 0
    setHypotheses(fullHypothesesData.filter(h => h.generation <= currentGeneration));
  }, [currentGeneration]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw tree
    drawHypothesisTree(ctx, hypotheses, rect.width, rect.height);
  }, [hypotheses]);

  const drawHypothesisTree = (
    ctx: CanvasRenderingContext2D,
    nodes: HypothesisNode[],
    width: number,
    height: number
  ) => {
    const generationWidth = width / 5;
    const nodeRadius = 20;
    const padding = 40;

    // Group by generation
    const byGeneration: { [key: number]: HypothesisNode[] } = {};
    nodes.forEach(node => {
      if (!byGeneration[node.generation]) byGeneration[node.generation] = [];
      byGeneration[node.generation].push(node);
    });

    // Calculate positions
    const positions: { [key: string]: { x: number; y: number } } = {};
    Object.entries(byGeneration).forEach(([gen, genNodes]) => {
      const g = parseInt(gen);
      const x = padding + g * generationWidth;
      const spacing = (height - 2 * padding) / (genNodes.length + 1);
      
      genNodes.forEach((node, i) => {
        positions[node.id] = {
          x,
          y: padding + (i + 1) * spacing
        };
      });
    });

    // Draw connections
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    nodes.forEach(node => {
      if (node.parent && positions[node.parent]) {
        const start = positions[node.parent];
        const end = positions[node.id];
        
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        
        // Bezier curve for smoother connections
        const cpX = (start.x + end.x) / 2;
        ctx.bezierCurveTo(cpX, start.y, cpX, end.y, end.x, end.y);
        
        // Color based on child status
        if (node.status === 'selected') {
          ctx.strokeStyle = '#10b981'; // green
        } else {
          ctx.strokeStyle = '#ef4444'; // red
          ctx.setLineDash([5, 5]);
        }
        
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      const pos = positions[node.id];
      if (!pos) return;

      // Node circle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, nodeRadius, 0, Math.PI * 2);
      
      if (node.status === 'selected') {
        ctx.fillStyle = '#10b981'; // green
      } else if (node.status === 'pruned') {
        ctx.fillStyle = '#ef4444'; // red
      } else {
        ctx.fillStyle = '#3b82f6'; // blue
      }
      ctx.fill();

      // Border
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Score text
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.score.toFixed(2), pos.x, pos.y);
    });

    // Draw generation labels
    ctx.fillStyle = '#888';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    Object.keys(byGeneration).forEach(gen => {
      const g = parseInt(gen);
      const x = padding + g * generationWidth;
      ctx.fillText(`Gen ${g}`, x, 20);
    });
  };

  const playAnimation = () => {
    trackEvent({ action: 'run_hypothesis_evolution', category: 'science_demo' });
    if (currentGeneration >= 3) {
      setCurrentGeneration(0);
    }
    setIsPlaying(true);

    let gen = currentGeneration;
    const interval = setInterval(() => {
      gen++;
      if (gen > 3) {
        setIsPlaying(false);
        clearInterval(interval);
        return;
      }
      setCurrentGeneration(gen);
    }, 2000);
    
    animationRef.current = interval as unknown as number;
  };

  const pauseAnimation = () => {
    setIsPlaying(false);
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }
  };

  const nextGeneration = () => {
    if (currentGeneration < 3) {
      setCurrentGeneration(currentGeneration + 1);
    }
  };

  const reset = () => {
    pauseAnimation();
    setCurrentGeneration(0);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Graph size={24} weight="duotone" className="text-blue-600 dark:text-blue-400" />
          Interactive: Hypothesis Evolution
        </CardTitle>
        <CardDescription>
          Watch how hypotheses evolve across generations through selection and mutation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Canvas */}
        <div className="relative bg-muted rounded-lg p-4">
          <canvas
            ref={canvasRef}
            className="w-full"
            style={{ height: '400px' }}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span>Selected (high score)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span>Pruned (low score)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span>Active</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-2">
          {!isPlaying ? (
            <Button onClick={playAnimation} variant="default" size="sm">
              <Play size={16} weight="fill" className="mr-2" />
              Play Evolution
            </Button>
          ) : (
            <Button onClick={pauseAnimation} variant="secondary" size="sm">
              <Pause size={16} weight="fill" className="mr-2" />
              Pause
            </Button>
          )}
          <Button onClick={nextGeneration} variant="outline" size="sm" disabled={currentGeneration >= 3}>
            <SkipForward size={16} className="mr-2" />
            Next Gen
          </Button>
          <Button onClick={reset} variant="outline" size="sm">
            <ArrowsClockwise size={16} className="mr-2" />
            Reset
          </Button>
        </div>

        {/* Current hypothesis details */}
        {hypotheses.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-2 text-sm">Generation {currentGeneration} Hypotheses:</h4>
            <div className="space-y-1 text-xs">
              {hypotheses
                .filter(h => h.generation === currentGeneration)
                .map(h => (
                  <div key={h.id} className="flex items-start gap-2">
                    <span className={`inline-block w-2 h-2 rounded-full mt-1 ${
                      h.status === 'selected' ? 'bg-green-500' : 
                      h.status === 'pruned' ? 'bg-red-500' : 'bg-blue-500'
                    }`}></span>
                    <span className="flex-1">
                      {h.text} <span className="text-muted-foreground">(score: {h.score.toFixed(2)})</span>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center">
          This simulation shows how AlphaEvolve generates, evaluates, and refines hypotheses for 
          high-temperature superconductor discovery. High-scoring hypotheses (green) are selected 
          for mutation and crossover, while low-scoring ones (red) are pruned.
        </p>
      </CardContent>
    </Card>
  );
}
