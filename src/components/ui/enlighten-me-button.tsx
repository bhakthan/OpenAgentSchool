import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChatCircleDots } from '@phosphor-icons/react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { SpinnerGap } from '@phosphor-icons/react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LlmProvider, callLlm } from '@/lib/llm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSEOContext } from '@/hooks/useSEOContext';

// NOTE: "Ask AI" is an alias for "EnlightenMe Button" - this component provides AI-powered insights
// It helps users understand complex concepts through interactive AI assistance and contextual prompting

interface EnlightenMeButtonProps {
  topic?: string;
  title?: string;
  defaultPrompt?: string;
  contextDescription?: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg' | 'icon';
  variant?: 'default' | 'subtle' | 'icon';
}

export function EnlightenMeButton({
  topic, 
  title,
  defaultPrompt, 
  contextDescription,
  className = '', 
  size = 'sm',
  variant = 'icon'
}: EnlightenMeButtonProps) {
  // Get rich SEO context for enhanced prompts
  const seoContext = useSEOContext();
  
  // Create enhanced prompt that uses SEO context when available
  const createEnhancedPrompt = () => {
    const basePrompt = defaultPrompt || `Explain ${title || topic} in detail.`;
    const conceptTitle = title || topic;
    
    // Use SEO context to enhance the prompt if available
    return seoContext.description ? seoContext.enhancedPrompt(basePrompt, conceptTitle) : basePrompt;
  };
  
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState(createEnhancedPrompt());
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [llmProvider, setLlmProvider] = useState<LlmProvider>('openai');

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setShowResponse(true);
    
    try {
      const result = await callLlm(prompt, llmProvider);
      setResponse(result.content);
    } catch (error) {
      console.error('Error in EnlightenMeButton:', error);
      setResponse(`Sorry, I encountered an error processing your request. Please try again. \n\n **Error:** ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPrompt = () => {
    setPrompt(createEnhancedPrompt());
    setShowResponse(false);
    setResponse(null);
  };

  // Different button variants
  const renderButton = () => {
    switch (variant) {
  case 'default':
        return (
          <Button 
            onClick={() => setIsOpen(true)}
            size={size} 
            className={className}
          >
    <ChatCircleDots className="mr-2" size={16} />
    Ask AI
          </Button>
        );
  case 'subtle':
        return (
          <Button 
            variant="ghost"
            onClick={() => setIsOpen(true)}
            size={size} 
    className={`${className}`}
          >
    <ChatCircleDots className="mr-2" size={16} />
    Ask AI
          </Button>
        );
  case 'icon':
      default:
        return (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(true)}
    className={`h-8 w-8 rounded-full ${className}`}
    title="Ask AI about this topic"
          >
    <ChatCircleDots size={16} />
          </Button>
        );
    }
  };

  return (
    <>
      {renderButton()}

      <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) resetPrompt();
      }}>
        <DialogContent className="sm:max-w-6xl max-w-[95vw] h-[90vh] max-h-[900px] flex flex-col">
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-900/20">
                <ChatCircleDots className="text-primary" size={24} />
              </div>
              <div>
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Ask AI:
                </span>{" "}
                <span className="text-foreground">{topic}</span>
              </div>
            </DialogTitle>
            <DialogDescription className="text-base mt-2">
              {showResponse 
                ? "🎯 Here's your personalized AI insight about this topic" 
                : "💡 Customize your query or use our intelligent default prompt to learn about this topic"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 flex flex-col min-h-0">
            {!showResponse ? (
              <div className="flex flex-col gap-4 flex-1">
                <div className="bg-muted text-foreground rounded-lg p-4 border">
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    ✨ Smart Prompt Builder
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Our AI has crafted a comprehensive prompt based on "{topic}". Feel free to customize it or use it as-is for the best insights.
                  </p>
                </div>
                
                <div className="flex-1 flex flex-col">
                  <label className="text-sm font-medium mb-2 text-muted-foreground">Your Custom Query:</label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="flex-1 min-h-[200px] text-sm leading-relaxed resize-none"
                    placeholder="Enter your question about this topic..."
                  />
                </div>
                
                <DialogFooter className="flex justify-between items-center gap-3">
                  <Select value={llmProvider} onValueChange={(value) => setLlmProvider(value as LlmProvider)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="azure">Azure OpenAI</SelectItem>
                      <SelectItem value="gemini">Google Gemini</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className='flex gap-3'>
                    <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit} className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                      🚀 Generate Insights
                    </Button>
                  </div>
                </DialogFooter>
              </div>
            ) : (
              <div className="flex flex-col gap-4 flex-1 min-h-0">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center flex-1 gap-4">
                    <div className="relative">
                      <SpinnerGap size={48} className="animate-spin text-primary" />
                      <div className="absolute inset-0 animate-pulse">
                        <ChatCircleDots size={24} className="text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-medium text-foreground">Generating your personalized insights...</p>
                      <p className="text-sm text-muted-foreground mt-1">Our AI is analyzing and crafting a comprehensive response</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="bg-muted text-foreground rounded-lg p-4 border">
                      <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                        🎯 Your Personalized AI Insight
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Generated based on your query about "{topic}"
                      </p>
                    </div>
                    
                    <div className="flex-1 min-h-0">
                      <ScrollArea className="h-full pr-4">
                        <div className="prose prose-base dark:prose-invert max-w-none leading-relaxed">
                          <div className="space-y-4">
                            {response?.split('\n\n').map((section, i) => {
                              if (!section.trim()) return null;
                              
                              // Check if it's a heading (starts with number or bullet)
                              if (section.match(/^\d+[\.)]/)) {
                                const [heading, ...content] = section.split('\n');
                                return (
                                  <div key={i} className="bg-muted/30 rounded-lg p-4 border-l-4 border-primary">
                                    <h4 className="font-semibold text-primary mb-2">{heading}</h4>
                                    {content.length > 0 && (
                                      <div className="space-y-2">
                                        {content.map((line, j) => line.trim() && (
                                          <p key={j} className="text-sm text-muted-foreground">{line}</p>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              }
                              
                              return (
                                <div key={i} className="text-sm leading-relaxed">
                                  {section.split('\n').map((line, j) => 
                                    line.trim() ? (
                                      <p key={j} className="mb-2">{line}</p>
                                    ) : (
                                      <br key={j} />
                                    )
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </ScrollArea>
                    </div>
                    
                    <DialogFooter className="flex justify-between gap-3 border-t pt-4">
                      <Button variant="outline" onClick={resetPrompt} className="flex-1">
                        ✨ Ask Something Else
                      </Button>
                      <Button onClick={() => setIsOpen(false)} className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white">
                        👍 Close
                      </Button>
                    </DialogFooter>
                  </>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}