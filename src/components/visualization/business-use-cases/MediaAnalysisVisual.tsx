import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Video, Robot, CheckCircle, Prohibit } from '@phosphor-icons/react';

export const MediaAnalysisVisual = () => {
  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4">
        <div className="text-center mb-4">
            <p className="text-sm font-semibold text-primary">Live Content Moderation</p>
            <p className="text-xs text-muted-foreground">Parallelization Pattern</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Step 1: Multiple Inputs */}
          <div className="flex items-center justify-center space-x-2">
            <Video size={28} className="text-blue-500" />
            <Video size={28} className="text-blue-500" />
            <Video size={28} className="text-blue-500" />
            <p className="text-sm font-medium">Multiple Live Video Streams</p>
          </div>

          <div className="text-2xl animate-bounce">⬇️</div>

          {/* Step 2: Parallel Workers */}
          <div className="w-full p-3 border rounded-lg bg-background/70 text-center">
            <p className="text-xs font-bold mb-2">Parallel Worker Agents</p>
            <div className="flex justify-around items-start">
                <div className="text-center">
                    <Robot size={24} className="text-purple-500 mx-auto" />
                    <p className="text-xs">Worker 1 (Stream A)</p>
                </div>
                <div className="text-center">
                    <Robot size={24} className="text-purple-500 mx-auto" />
                    <p className="text-xs">Worker 2 (Stream B)</p>
                </div>
                 <div className="text-center">
                    <Robot size={24} className="text-purple-500 mx-auto" />
                    <p className="text-xs">Worker 3 (Stream C)</p>
                </div>
            </div>
          </div>

          <div className="text-2xl">⬇️</div>

          {/* Step 3: Aggregated Output */}
          <div className="flex items-center space-x-3 p-3">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 border-green-500 border-2 dark:bg-green-900 text-green-900 dark:text-green-100">
                <CheckCircle size={24} className="text-green-600" />
                <p className="text-sm font-semibold">2 Streams OK</p>
            </div>
             <div className="flex items-center gap-2 p-2 rounded-lg bg-red-50 border-red-500 border-2 dark:bg-red-900 text-red-900 dark:text-red-100">
                <Prohibit size={24} className="text-red-600" />
                <p className="text-sm font-semibold">1 Stream Flagged</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
