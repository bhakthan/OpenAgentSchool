import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PatternData } from '@/lib/data/patterns/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListChecks, Info, Code, Briefcase, PuzzlePiece, ArrowsOut, ArrowsIn } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PatternDemoSVG } from '../interactive-demos';
import { EnlightenMeButton } from '@/components/enlighten/EnlightenMeButton';

interface PatternDetailsProps {
  pattern: PatternData;
}

const PatternDetails: React.FC<PatternDetailsProps> = ({ pattern }) => {
  if (!pattern) return null;

  const hasBusinessUseCase = !!pattern.businessUseCase;

  const enlightenMePrompt = pattern.businessUseCase?.enlightenMePrompt ||
    `Explain the ${pattern.name} agent pattern in comprehensive detail. Cover its core concept, architecture, implementation, real-world use cases, and evaluation strategies.`;

  return (
    <Card className="mb-6 border-primary/20 relative">
      <EnlightenMeButton
        title={`${pattern.name} Pattern`}
        conceptId={`pattern-${pattern.id}`}
        description={pattern.description}
        customPrompt={enlightenMePrompt}
      />
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          <Info size={24} className="text-primary" />
          {pattern.name}
        </CardTitle>
        <CardDescription>
          {pattern.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue={hasBusinessUseCase ? "business-use-case" : "details"} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {hasBusinessUseCase && (
              <TabsTrigger value="business-use-case" className="flex items-center gap-2">
                <Briefcase size={16} /> Business Use Case
              </TabsTrigger>
            )}
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Info size={16} /> Pattern Details
            </TabsTrigger>
            <TabsTrigger value="implementation" className="flex items-center gap-2">
              <Code size={16} /> Implementation
            </TabsTrigger>
          </TabsList>

          {hasBusinessUseCase && (
            <TabsContent value="business-use-case" className="pt-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg text-primary">{pattern.businessUseCase.industry}</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                        <div className="prose max-w-none">
                            <p>{pattern.businessUseCase.description}</p>
                        </div>
                        <div>
                            {React.createElement(pattern.businessUseCase.visualization)}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
          )}

          <TabsContent value="details" className="pt-4">
            <div className="space-y-4">
                <div>
                    <h3 className="font-semibold mb-2">When to Use</h3>
                    <p className="text-sm text-muted-foreground">{pattern.whenToUse}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-1"><ArrowsOut size={16} /> Advantages</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            {pattern.advantages?.map((adv, i) => <li key={i}>{adv}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-1"><ArrowsIn size={16} /> Limitations</h3>
                         <ul className="list-disc list-inside space-y-1 text-sm">
                            {pattern.limitations?.map((lim, i) => <li key={i}>{lim}</li>)}
                        </ul>
                    </div>
                </div>
                 <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-1"><PuzzlePiece size={16} /> Related Patterns</h3>
                    <div className="flex flex-wrap gap-2">
                        {pattern.relatedPatterns?.map((p, i) => <Badge key={i} variant="secondary">{p}</Badge>)}
                    </div>
                </div>
            </div>
          </TabsContent>

          <TabsContent value="implementation" className="pt-4">
             <Accordion type="single" collapsible className="w-full" defaultValue="steps">
              <AccordionItem value="steps">
                <AccordionTrigger>Implementation Steps</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal list-inside space-y-2">
                    {pattern.implementation.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="diagram">
                 <AccordionTrigger>Interactive Diagram</AccordionTrigger>
                 <AccordionContent>
                    <PatternDemoSVG patternData={pattern} className="mt-2" />
                 </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PatternDetails;
