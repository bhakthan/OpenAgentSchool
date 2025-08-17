import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Network, Eye, Funnel } from '@phosphor-icons/react';
import type { SCLSession as SCLSessionType, SCLUIState } from '@/types/supercritical';

interface SCLEffectGraphProps {
  session: SCLSessionType;
  uiState: SCLUIState;
  onUIStateChange: (state: SCLUIState) => void;
}

export function SCLEffectGraph({ session, uiState, onUIStateChange }: SCLEffectGraphProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Graph Controls */}
      <div className="flex-shrink-0 mb-4 p-4 border border-border rounded-lg bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <Badge variant="outline">
                {session.effectGraph.nodes.length} Effects
              </Badge>
            </div>
            <div>
              <Badge variant="outline">
                {session.effectGraph.edges.length} Connections
              </Badge>
            </div>
            {session.leaps.length > 0 && (
              <div>
                <Badge variant="destructive">
                  {session.leaps.length} Leaps Detected
                </Badge>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Funnel className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Layout
            </Button>
          </div>
        </div>
      </div>

      {/* Graph Visualization */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            Effect Chain Visualization
          </CardTitle>
        </CardHeader>
        <CardContent className="h-full">
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Network className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Effect Graph Placeholder</p>
              <p className="text-sm">
                Interactive visualization of first, second, and third-order effects will be rendered here.
              </p>
              <p className="text-xs mt-2">
                Will show nodes grouped by domain (ops, product, security, org, cost, perf) 
                with impact and likelihood indicators.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SCLEffectGraph;
