import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChatCircleDots, SpinnerGap, Copy, Check, CaretDown, CaretUp } from '@phosphor-icons/react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEnlightenMe } from '../enlighten/EnlightenMeProvider';
import { useKV } from '@/hooks/useLocalStorage';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import { LlmProvider, callLlm } from '@/lib/llm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSEOContext } from '@/hooks/useSEOContext';

// Inline dark theme to avoid build issues with react-syntax-highlighter dist imports
const syntaxTheme: { [key: string]: React.CSSProperties } = {
  'code[class*="language-"]': {
    color: '#abb2bf',
    background: '#282c34',
    fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    fontSize: '0.9em',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    tabSize: 4,
  },
  'pre[class*="language-"]': {
    color: '#abb2bf',
    background: '#282c34',
    padding: '1em',
    margin: '0.5em 0',
    overflow: 'auto',
    borderRadius: '0.3em',
  },
  comment: { color: '#5c6370', fontStyle: 'italic' },
  keyword: { color: '#c678dd' },
  string: { color: '#98c379' },
  function: { color: '#61afef' },
  number: { color: '#d19a66' },
  operator: { color: '#56b6c2' },
  className: { color: '#e5c07b' },
};

// NOTE: "Ask AI" is an alias for "EnlightenMe Button" - this component provides AI-powered insights
// It helps users understand complex concepts through interactive AI assistance and contextual prompting

interface EnlightenMeButtonProps {
  title: string;
  conceptId: string;
  description?: string;
  customPrompt?: string;
  variant?: 'floating' | 'inline'; // Add variant prop for different positioning
  size?: 'sm' | 'md' | 'lg'; // Add size prop
}

const EnlightenMeButton: React.FC<EnlightenMeButtonProps> = ({
  title, 
  conceptId, 
  description,
  customPrompt,
  variant = 'floating', // Default to floating for backward compatibility
  size = 'md' // Default size
}) => {
  // Get previously saved insights from KV store if available
  const [savedInsights, setSavedInsights] = useKV<Record<string, string>>('enlighten-insights', {});
  
  // Get rich SEO context for enhanced prompts
  const seoContext = useSEOContext();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [isPromptExpanded, setIsPromptExpanded] = useState(false);
  const [llmProvider, setLlmProvider] = useState<LlmProvider>('openai');
  
  // Check if we have a previously saved response for this concept
  const hasSavedResponse = savedInsights && savedInsights[conceptId];
  
  // Generate a default prompt based on the concept details with SEO enhancement
  const generateDefaultPrompt = () => {
    if (customPrompt) {
      // If there's a custom prompt and we have rich SEO context, enhance it
      return seoContext.description ? seoContext.enhancedPrompt(customPrompt, title) : customPrompt;
    }
    
    const basePrompt = `Explain the concept of "${title}" in detail in the context of Azure AI Agents.
    
${description ? `Context: ${description}` : ''}

Please provide:
1. What it is and why it's important
2. How it works and its key components
3. Real-world applications and examples
4. Best practices for implementation
5. How it relates to other AI agent concepts`;

    // Use SEO context to enhance the prompt if available
    return seoContext.description ? seoContext.enhancedPrompt(basePrompt, title) : basePrompt;
  };
  
  const [prompt, setPrompt] = useState<string>(generateDefaultPrompt());
  const [response, setResponse] = useState<string | null>(hasSavedResponse ? savedInsights[conceptId] : null);
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      // When opening, check if we have a saved response
      if (hasSavedResponse) {
        setResponse(savedInsights[conceptId]);
        setShowResponse(true);
      } else {
        setPrompt(generateDefaultPrompt());
        setShowResponse(false);
      }
    }
  };
  
  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setShowResponse(true);
    
    try {
      const result = await callLlm(prompt, llmProvider);
      
      // Update the response and save it to KV store
      setResponse(result.content);
      setSavedInsights({
        ...savedInsights,
        [conceptId]: result.content
      });
    } catch (error) {
      console.error('Error in EnlightenMeButton:', error);
      setResponse(`Sorry, I encountered an error processing your request. Please try again. \n\n **Error:** ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setShowResponse(false);
    setPrompt(generateDefaultPrompt());
    setResponse(null);
    setIsPromptExpanded(false);
  };

  // State for tracking copied code blocks
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  // Custom code block component with copy functionality
  const CodeBlock = ({ children, className, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    const codeString = String(children).replace(/\n$/, '');
    const codeId = `code-${Math.random().toString(36).substr(2, 9)}`;

    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(codeString);
        setCopiedStates(prev => ({ ...prev, [codeId]: true }));
        setTimeout(() => {
          setCopiedStates(prev => ({ ...prev, [codeId]: false }));
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    };

    return (
      <div className="relative group">
        <div className="absolute right-2 top-2 z-10">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={copyToClipboard}
          >
            {copiedStates[codeId] ? (
              <Check size={14} />
            ) : (
              <Copy size={14} />
            )}
          </Button>
        </div>
        <SyntaxHighlighter
          style={syntaxTheme}
          language={language}
          PreTag="div"
          className="rounded-md text-sm"
          showLineNumbers={language && codeString.split('\n').length > 3}
          wrapLines={true}
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    );
  };

  // Custom components for markdown rendering
  const markdownComponents = {
    code: CodeBlock,
    pre: ({ children }: any) => <div className="my-4">{children}</div>,
    h1: ({ children }: any) => <h1 className="text-2xl font-bold mt-6 mb-4 text-foreground">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-xl font-semibold mt-5 mb-3 text-foreground">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-lg font-medium mt-4 mb-2 text-foreground">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-base font-medium mt-3 mb-2 text-foreground">{children}</h4>,
    p: ({ children }: any) => <p className="mb-3 text-foreground leading-relaxed">{children}</p>,
    ul: ({ children }: any) => <ul className="list-disc list-inside mb-3 space-y-1 text-foreground">{children}</ul>,
    ol: ({ children }: any) => <ol className="list-decimal list-inside mb-3 space-y-1 text-foreground">{children}</ol>,
    li: ({ children }: any) => <li className="text-foreground">{children}</li>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 py-2 rounded-r">
        {children}
      </blockquote>
    ),
    table: ({ children }: any) => (
      <div className="my-4 overflow-x-auto">
        <table className="min-w-full border border-border rounded-lg">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">{children}</thead>,
    tbody: ({ children }: any) => <tbody>{children}</tbody>,
    tr: ({ children }: any) => <tr className="border-b border-border">{children}</tr>,
    th: ({ children }: any) => <th className="px-4 py-2 text-left font-semibold text-foreground">{children}</th>,
    td: ({ children }: any) => <td className="px-4 py-2 text-foreground">{children}</td>,
    a: ({ children, href }: any) => (
      <a href={href} className="text-primary hover:text-primary/80 underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    strong: ({ children }: any) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-foreground">{children}</em>,
  };

  // Size and styling configuration
  const getButtonClasses = () => {
    const baseClasses = "transition-colors duration-150";
    switch (size) {
      case 'sm':
        return `h-8 px-3 ${baseClasses}`;
      case 'md':
        return `h-9 px-3.5 ${baseClasses}`;
      case 'lg':
        return `h-10 px-4 ${baseClasses}`;
      default:
        return `h-9 px-3.5 ${baseClasses}`;
    }
  };

  const getIconSize = () => (size === 'lg' ? 20 : 16);

  return (
  <span className={
    variant === 'floating'
      ? "z-40 md:absolute md:top-3 md:right-3 fixed bottom-4 right-4"
      : "inline-flex"
  }>
      <Button
        variant="default"
        size={size === 'sm' ? 'sm' : 'default'}
        className={getButtonClasses()}
        onClick={() => setIsOpen(true)}
        title="Ask AI about this topic"
      >
        <ChatCircleDots size={getIconSize()} className="mr-2" />
        <span className="hidden sm:inline text-sm">Ask AI</span>
      </Button>
      
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-6xl max-w-[95vw] w-[95vw] h-[90vh] max-h-[95vh] min-h-[80vh] flex flex-col">
          <DialogHeader className="pb-4 border-b flex-shrink-0">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <ChatCircleDots className="text-primary" size={24} />
              </div>
              <div>
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Ask AI:
                </span>{" "}
                <span className="text-foreground">{title}</span>
              </div>
            </DialogTitle>
            <DialogDescription className="text-base mt-2">
              {showResponse 
                ? "🎯 Here's your personalized AI insight about this topic" 
                : "💡 Customize your query or use our intelligent default prompt to learn about this topic"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {!showResponse ? (
              <div className="flex flex-col gap-4 flex-1">
                <div className="bg-muted text-foreground rounded-lg p-4 border">
                  <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    ✨ Smart Prompt Builder
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Our AI has crafted a comprehensive prompt based on "{title}". Feel free to customize it or use it as-is for the best insights.
                  </p>
                </div>
                
                <div className="flex-1 flex flex-col min-h-0">
                  <label className="text-sm font-medium mb-2 text-muted-foreground">Your Custom Query:</label>
                  <div className="flex-1 min-h-0">
                    <ScrollArea className="h-full">
                      <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[300px] text-sm leading-relaxed resize-none border-0 focus:ring-0 p-4"
                        placeholder="Enter your question about this topic..."
                      />
                    </ScrollArea>
                  </div>
                </div>
                
                <DialogFooter className="flex justify-between items-center gap-3 flex-shrink-0 border-t pt-4">
                  <div>
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
                  </div>
                  <div className="flex gap-3">
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
                    {/* Collapsible Prompt Section */}
                    <div className="border rounded-md bg-muted/30 flex-shrink-0">
                      <button
                        onClick={() => setIsPromptExpanded(!isPromptExpanded)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-1">Your prompt:</p>
                          {!isPromptExpanded && (
                            <p className="text-sm text-muted-foreground truncate pr-4">
                              {prompt.length > 100 ? `${prompt.substring(0, 100)}...` : prompt}
                            </p>
                          )}
                        </div>
                        {isPromptExpanded ? (
                          <CaretUp size={20} className="text-muted-foreground flex-shrink-0" />
                        ) : (
                          <CaretDown size={20} className="text-muted-foreground flex-shrink-0" />
                        )}
                      </button>
                      {isPromptExpanded && (
                        <div className="px-4 pb-4 border-t border-border/50">
                          <ScrollArea className="max-h-[200px] mt-2">
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                              {prompt}
                            </p>
                          </ScrollArea>
                        </div>
                      )}
                    </div>

                    <div className="bg-muted text-foreground rounded-lg p-4 border flex-shrink-0">
                      <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                        🎯 Your Personalized AI Insight
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Generated based on your query about "{title}"
                      </p>
                    </div>
                    
                    <div className="flex-1 min-h-0 border rounded-md overflow-hidden">
                      <ScrollArea className="h-full">
                        <div className="prose prose-base dark:prose-invert max-w-none p-4">
                          <ReactMarkdown
                            components={markdownComponents}
                            remarkPlugins={[remarkGfm]}
                          >
                            {response || ''}
                          </ReactMarkdown>
                        </div>
                      </ScrollArea>
                    </div>
                    
                    <DialogFooter className="flex justify-between gap-3 border-t pt-4 flex-shrink-0">
                      <Button variant="outline" onClick={handleReset} className="flex-1">
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
  </span>
  );
};

export default EnlightenMeButton;








