import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Robot, Files, Bug, GitMerge, Rocket, ClipboardText, Users } from '@phosphor-icons/react';
import { useTheme } from '@/components/theme/ThemeProvider'; // Assuming you have a ThemeProvider

const AgentNode = ({ icon, label, description }: { icon: React.ReactNode, label: string, description: string }) => (
  <div className="flex flex-col items-center text-center space-y-2">
    <div className="w-20 h-20 rounded-full flex items-center justify-center bg-primary/10 ring-2 ring-primary/50">
      {icon}
    </div>
    <div>
      <p className="font-bold text-sm text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
);

const StepArrow = () => (
  <div className="text-4xl font-mono text-muted-foreground self-center mx-2">→</div>
);

export const MultiAgentEvalVisual = () => {
  const themeContext = useTheme();
  // Ensure theme is always a string: 'light' or 'dark'
  const theme = themeContext && typeof themeContext.theme === 'string' ? themeContext.theme : 'light';

  // Use a valid color string for icons
  const iconColor = theme === 'dark' ? '#f9fafb' : '#1f2937'; // light: gray-900, dark: gray-100

  return (
    <Card className="bg-card border">
      <CardHeader>
        <CardTitle>Practical Example: Simulated DevOps Team</CardTitle>
        <CardDescription>
          An autonomous multi-agent system designed to handle a typical software development workflow, from planning to deployment.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative flex flex-col items-center justify-center space-y-8">
          {/* Agent Row */}
          <div className="flex flex-wrap justify-around items-start w-full">
            <AgentNode 
              icon={<Files size={32} color={iconColor} />} 
              label="Planner Agent"
              description="Receives user requests and breaks them into actionable steps."
            />
            <StepArrow />
            <AgentNode 
              icon={<Robot size={32} color={iconColor} />} 
              label="Developer Agent"
              description="Writes code based on the planner's steps and commits to the repository."
            />
            <StepArrow />
            <AgentNode 
              icon={<Bug size={32} color={iconColor} />} 
              label="QA Agent"
              description="Reviews code, runs tests, and identifies bugs or quality issues."
            />
          </div>

          {/* CI/CD Pipeline and Evaluator */}
          <div className="w-full flex justify-center items-center space-x-4 mt-8">
            <div className="flex flex-col items-center text-center p-4 border-2 border-dashed rounded-lg bg-muted/50 w-full">
              <div className="flex items-center space-x-2 mb-2">
                <GitMerge size={24} className="text-green-500" />
                <h3 className="font-semibold text-foreground">CI/CD Pipeline</h3>
                <Rocket size={24} className="text-purple-500" />
              </div>
              <p className="text-xs text-muted-foreground px-4">
                The agents interact with a shared environment, a Git repository, triggering automated builds, tests, and deployments.
              </p>
            </div>
          </div>

          {/* Evaluator Section */}
          <div className="absolute -bottom-16 md:-bottom-8 -right-4 transform transition-transform hover:scale-105">
             <div className="flex flex-col items-center p-3 rounded-lg bg-amber-400/20 ring-2 ring-amber-500/50 shadow-lg">
                <div className="flex items-center space-x-2">
                  <ClipboardText size={32} className="text-amber-600" />
                  <Users size={32} className="text-amber-600" />
                </div>
                <p className="text-sm font-bold text-amber-700 dark:text-amber-300">Global Evaluator</p>
                <p className="text-xs text-muted-foreground">Monitors team performance</p>
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
