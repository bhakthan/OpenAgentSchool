import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Brain, User, Lightbulb, Target, ArrowRight } from 'lucide-react';

interface UserContext {
  experience: 'beginner' | 'intermediate' | 'advanced';
  background: string;
  motivation: string;
  priorKnowledge: string;
  confidenceLevel: number;
  learningStyle: 'visual' | 'verbal' | 'hands-on' | 'analytical';
  goals: string;
  timeAvailable: number;
}

interface EnhancedSocraticElicitationProps {
  conceptId: string;
  onContextGathered: (context: UserContext) => void;
  onSkip: () => void;
}

export const EnhancedSocraticElicitation: React.FC<EnhancedSocraticElicitationProps> = ({
  conceptId,
  onContextGathered,
  onSkip
}) => {
  const [step, setStep] = useState(0);
  const [context, setContext] = useState<Partial<UserContext>>({
    experience: 'beginner',
    confidenceLevel: 3,
    timeAvailable: 15
  });

  const elicitationSteps = [
    {
      title: "Tell me about yourself",
      icon: <User size={20} />,
      component: (
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium mb-3 block">
              What's your experience with AI agents?
            </Label>
            <RadioGroup 
              value={context.experience} 
              onValueChange={(value: any) => setContext({...context, experience: value})}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="beginner" id="beginner" />
                <Label htmlFor="beginner" className="cursor-pointer">
                  <div className="font-medium">New to this</div>
                  <div className="text-sm text-muted-foreground">First time learning about AI agents</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermediate" id="intermediate" />
                <Label htmlFor="intermediate" className="cursor-pointer">
                  <div className="font-medium">Some experience</div>
                  <div className="text-sm text-muted-foreground">Built simple chatbots or used AI tools</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="advanced" id="advanced" />
                <Label htmlFor="advanced" className="cursor-pointer">
                  <div className="font-medium">Experienced</div>
                  <div className="text-sm text-muted-foreground">Built complex AI systems</div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-base font-medium mb-2 block">
              What's your professional background? (optional)
            </Label>
            <Textarea
              placeholder="e.g., Software developer, researcher, student, business analyst..."
              value={context.background || ''}
              onChange={(e) => setContext({...context, background: e.target.value})}
              rows={2}
            />
          </div>
        </div>
      )
    },
    {
      title: "Your learning motivation",
      icon: <Target size={20} />,
      component: (
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium mb-2 block">
              Why are you interested in learning about {getConceptName(conceptId)}?
            </Label>
            <Textarea
              placeholder="What motivated you to explore this topic? What do you hope to achieve?"
              value={context.motivation || ''}
              onChange={(e) => setContext({...context, motivation: e.target.value})}
              rows={3}
            />
          </div>

          <div>
            <Label className="text-base font-medium mb-2 block">
              What do you already know about this topic?
            </Label>
            <Textarea
              placeholder="Share any prior knowledge, misconceptions, or related concepts you're familiar with..."
              value={context.priorKnowledge || ''}
              onChange={(e) => setContext({...context, priorKnowledge: e.target.value})}
              rows={3}
            />
          </div>
        </div>
      )
    },
    {
      title: "Learning preferences",
      icon: <Brain size={20} />,
      component: (
        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-3 block">
              How confident do you feel about this topic? ({context.confidenceLevel}/5)
            </Label>
            <div className="px-3">
              <Slider
                value={[context.confidenceLevel || 3]}
                onValueChange={(value) => setContext({...context, confidenceLevel: value[0]})}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Not confident</span>
                <span>Very confident</span>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-base font-medium mb-3 block">
              How do you learn best?
            </Label>
            <RadioGroup 
              value={context.learningStyle} 
              onValueChange={(value: any) => setContext({...context, learningStyle: value})}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="visual" id="visual" />
                <Label htmlFor="visual">Visual examples and diagrams</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="verbal" id="verbal" />
                <Label htmlFor="verbal">Discussion and explanation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hands-on" id="hands-on" />
                <Label htmlFor="hands-on">Hands-on practice and coding</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="analytical" id="analytical" />
                <Label htmlFor="analytical">Step-by-step logical analysis</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-base font-medium mb-2 block">
              How much time do you have for this session? ({context.timeAvailable} minutes)
            </Label>
            <div className="px-3">
              <Slider
                value={[context.timeAvailable || 15]}
                onValueChange={(value) => setContext({...context, timeAvailable: value[0]})}
                max={45}
                min={5}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>5 min</span>
                <span>45 min</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Learning goals",
      icon: <Lightbulb size={20} />,
      component: (
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium mb-2 block">
              What specific outcomes do you want from this session?
            </Label>
            <Textarea
              placeholder="e.g., 'Understand when to use multi-agent systems', 'Learn how to debug agent communication', 'Build confidence in system design'..."
              value={context.goals || ''}
              onChange={(e) => setContext({...context, goals: e.target.value})}
              rows={4}
            />
          </div>
        </div>
      )
    }
  ];

  const currentStep = elicitationSteps[step];
  const isLastStep = step === elicitationSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onContextGathered(context as UserContext);
    } else {
      setStep(step + 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0: return context.experience;
      case 1: return context.motivation?.trim();
      case 2: return context.learningStyle && context.confidenceLevel;
      case 3: return context.goals?.trim();
      default: return true;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentStep.icon}
            <div>
              <CardTitle className="text-xl">{currentStep.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Step {step + 1} of {elicitationSteps.length} • Personalize your learning experience
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onSkip}>
            Skip setup
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentStep.component}
        
        <div className="flex justify-between pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
          >
            Previous
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2"
          >
            {isLastStep ? 'Start Learning' : 'Next'}
            <ArrowRight size={16} />
          </Button>
        </div>
        
        {/* Progress indicator */}
        <div className="flex space-x-2">
          {elicitationSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded ${
                index <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

function getConceptName(conceptId: string): string {
  const names: Record<string, string> = {
    'a2a-communication': 'Agent-to-Agent Communication',
    'multi-agent-systems': 'Multi-Agent Systems',
    'mcp': 'Model Context Protocol',
    'agentic-rag': 'Agentic RAG',
    'modern-tool-use': 'Modern Tool Use',
    'computer-use': 'Computer Use Patterns',
    'voice-agent': 'Voice Agents'
  };
  return names[conceptId] || conceptId;
}

export default EnhancedSocraticElicitation;
