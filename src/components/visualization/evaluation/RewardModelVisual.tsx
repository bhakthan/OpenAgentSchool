import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, ThumbsUp, ThumbsDown, Brain, Medal } from '@phosphor-icons/react';
import { useTheme } from '@/components/theme/ThemeProvider';

export const RewardModelVisual = () => {
  const { theme } = useTheme() ?? { theme: 'light' };
  const iconColor = theme === 'dark' ? 'white' : 'black';

  return (
    <Card className="bg-card border">
      <CardHeader>
        <CardTitle>Training a Reward Model</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center space-y-6">
          
          <div className="text-center w-full">
            <p className="font-semibold text-foreground mb-2">1. Agent Generates Multiple Responses</p>
            <div className="p-3 rounded-lg bg-muted/50 text-sm border">
              <p className="text-muted-foreground">Response A: "Here is a good, detailed summary."</p>
              <p className="text-muted-foreground">Response B: "A summary is provided below."</p>
            </div>
          </div>

          <div className="text-2xl text-muted-foreground">⬇️</div>

          <div className="text-center w-full">
            <p className="font-semibold text-foreground mb-2">2. Human Ranks Responses</p>
            <div className="flex items-center justify-center space-x-4 p-3 rounded-lg bg-muted/50 border">
              <User size={32} className="text-primary" />
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">A</span>
                <ThumbsUp size={24} className="text-green-500" />
                <span className="text-sm text-muted-foreground">is better than</span>
                <span className="text-sm font-medium text-foreground">B</span>
                <ThumbsDown size={24} className="text-red-500" />
              </div>
            </div>
          </div>

          <div className="text-2xl text-muted-foreground">⬇️</div>

          <div className="text-center w-full">
            <p className="font-semibold text-foreground mb-2">3. Train a Reward Model</p>
             <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 border">
                <Brain size={32} className="text-purple-500" />
                <p className="text-sm text-muted-foreground">Model learns: Response A gets a higher score (e.g., 0.9) than B (e.g., 0.3)</p>
            </div>
          </div>

           <div className="text-2xl text-muted-foreground">⬇️</div>

            <div className="text-center w-full">
                <p className="font-semibold text-foreground mb-2">4. Reward Model Guides Agent</p>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 border">
                    <Medal size={32} className="text-amber-500" />
                    <p className="text-sm text-muted-foreground">Agent is fine-tuned to generate responses that maximize the reward score.</p>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};
