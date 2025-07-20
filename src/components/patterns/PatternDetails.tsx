import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PatternData } from '@/lib/data/patterns/index';
import { patternContents } from '@/lib/data/patternContent';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ListChecks, Info, Code, FlowArrow, PuzzlePiece, ArrowsOut, ArrowsIn, BookmarkSimple } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ReferenceSection from "../references/ReferenceSection";
import { PatternDemoSVG } from '../interactive-demos';
import EnlightenMeButton from '../concepts/EnlightenMeButton';

interface PatternDetailsProps {
  pattern: PatternData;
}

const PatternDetails: React.FC<PatternDetailsProps> = ({ pattern }) => {
  const content = patternContents.find(p => p.id === pattern.id);
  
  if (!content) return null;
  
  return (
    <Card className="mb-6 border-primary/20 relative">
      <EnlightenMeButton 
        title={`${content.name} Pattern`}
        conceptId={`pattern-${pattern.id}`}
        description={pattern.description}
        customPrompt={`Explain the ${content.name} agent pattern in comprehensive detail. Cover: 1) What this pattern is and when to use it in Azure AI environments, including specific scenarios where it outperforms other patterns, 2) Detailed architecture and implementation using Azure OpenAI Service, Azure AI Agent Service, and relevant Azure AI SDK components, 3) Step-by-step implementation guide with Azure-specific code examples, authentication, and best practices, 4) Real-world use cases and success stories, particularly in enterprise Azure environments, 5) Performance considerations, cost optimization, and scaling strategies on Azure infrastructure, 6) Integration patterns with other Azure services like Azure AI Search, Azure Cognitive Services, and Azure Functions, 7) Monitoring, debugging, and observability using Azure Application Insights and Azure Monitor, 8) Security best practices including Azure Key Vault integration, Azure Active Directory authentication, and compliance considerations, 9) Common pitfalls and troubleshooting guidance specific to Azure deployments, 10) Comparison with related patterns and guidance on when to choose this pattern over alternatives.`}
      />
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center gap-2">
          <Info size={24} className="text-primary" />
          Understanding the {content.name} Pattern
        </CardTitle>
        <CardDescription>
          Detailed explanation of how this pattern works, its benefits, limitations, and applications
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="prose max-w-none mb-6">
          <p className="text-foreground/90 leading-relaxed whitespace-pre-line">{content.longDescription}</p>
        </div>
        
        <Tabs defaultValue="advantages" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="advantages" className="flex items-center gap-2">
              <ArrowsOut size={16} /> Advantages
            </TabsTrigger>
            <TabsTrigger value="limitations" className="flex items-center gap-2">
              <ArrowsIn size={16} /> Limitations
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <FlowArrow size={16} /> Applications
            </TabsTrigger>
            <TabsTrigger value="practices" className="flex items-center gap-2">
              <ListChecks size={16} /> Best Practices
            </TabsTrigger>
            <TabsTrigger value="related" className="flex items-center gap-2">
              <PuzzlePiece size={16} /> Related Patterns
            </TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[300px] rounded-md border p-4">
            <TabsContent value="advantages">
              <h3 className="font-medium mb-4 text-primary">Advantages</h3>
              <ul className="space-y-3">
                {content.advantages && Array.isArray(content.advantages) ? content.advantages.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                )) : (
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>No advantages listed</span>
                  </li>
                )}
              </ul>
            </TabsContent>
            
            <TabsContent value="limitations">
              <h3 className="font-medium mb-4 text-primary">Limitations</h3>
              <ul className="space-y-3">
                {content.limitations && Array.isArray(content.limitations) ? content.limitations.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                )) : (
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>No limitations listed</span>
                  </li>
                )}
              </ul>
            </TabsContent>
            
            <TabsContent value="applications">
              <h3 className="font-medium mb-4 text-primary">Real-World Applications</h3>
              <ul className="space-y-3">
                {content.realWorldApplications && Array.isArray(content.realWorldApplications) ? content.realWorldApplications.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                )) : (
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>No applications listed</span>
                  </li>
                )}
              </ul>
            </TabsContent>
            
            <TabsContent value="practices">
              <h3 className="font-medium mb-4 text-primary">Best Practices</h3>
              <ul className="space-y-3">
                {content.bestPractices && Array.isArray(content.bestPractices) ? content.bestPractices.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                )) : (
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>No best practices listed</span>
                  </li>
                )}
              </ul>
            </TabsContent>
            
            <TabsContent value="related">
              <h3 className="font-medium mb-4 text-primary">Related Patterns</h3>
              <div className="flex flex-wrap gap-2">
                {content.relatedPatterns && Array.isArray(content.relatedPatterns) ? content.relatedPatterns.map((item, index) => (
                  <Badge key={index} variant="outline" className="bg-primary/10 hover:bg-primary/20">
                    {item}
                  </Badge>
                )) : (
                  <span className="text-muted-foreground">No related patterns listed</span>
                )}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
        
        <Separator className="my-6" />
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="implementation">
            <AccordionTrigger className="text-primary">
              <div className="flex items-center gap-2">
                <Code size={18} />
                <span>Implementation Steps</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ol className="space-y-2 ml-6 list-decimal">
                {pattern.implementation && Array.isArray(pattern.implementation) ? pattern.implementation.map((step, index) => (
                  <li key={index}>{step}</li>
                )) : (
                  <li>No implementation steps provided</li>
                )}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Interactive Demo */}
        <Separator className="my-6" />
        <h3 className="font-medium mb-4 text-primary flex items-center gap-2">
          <Code size={18} />
          Interactive Demo
        </h3>
        <PatternDemoSVG patternData={pattern} className="mt-2" />

        {/* References section for this pattern */}
        <Separator className="my-6" />
        <ReferenceSection type="pattern" itemId={pattern.id} />
      </CardContent>
    </Card>
  );
};

export default PatternDetails;