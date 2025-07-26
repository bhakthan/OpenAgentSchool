import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb, SpinnerGap, Copy, Check } from '@phosphor-icons/react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { LlmProvider, callLlm } from '@/lib/llm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import jsPDF from 'jspdf';

interface EnlightenMeProps {
  title: string;
  defaultPrompt: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EnlightenMe({ title, defaultPrompt, isOpen, onOpenChange }: EnlightenMeProps) {
  // Defensive fallback for title and defaultPrompt
  const safeTitle = title || 'Unknown Concept';
  const safeDefaultPrompt = defaultPrompt || `Learn more about ${safeTitle}.`;

  // Log when context is undefined for debugging
  if (!title) {
    console.warn('Warning: Title is undefined. Using fallback title.');
  }
  if (!defaultPrompt) {
    console.warn('Warning: Default prompt is undefined. Using fallback prompt.');
  }

  const [prompt, setPrompt] = useState(safeDefaultPrompt);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [llmProvider, setLlmProvider] = useState<LlmProvider>('openrouter');
  
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
          style={oneDark}
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
    pre: ({ children }: any) => <>{children}</>, // Use fragment, not <div>
    h1: ({ children }: any) => <h1 className="text-2xl font-bold mt-6 mb-4 text-foreground">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-xl font-semibold mt-5 mb-3 text-foreground">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-lg font-medium mt-4 mb-2 text-foreground">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-base font-medium mt-3 mb-2 text-foreground">{children}</h4>,
    p: ({ children }: any) => <p className="mb-3 text-foreground leading-relaxed">{children}</p>,
    ul: ({ children }: any) => <ul className="list-disc list-inside mb-3 space-y-1 text-foreground">{children}</ul>,
    ol: ({ children }: any) => <ol className="list-decimal list-inside mb-3 space-y-1 text-foreground">{children}</ol>,
    li: ({ children }: any) => <li className="text-foreground">{children}</li>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground bg-muted/30 py-2 rounded-r">
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
    thead: ({ children }: any) => <thead className="bg-muted">{children}</thead>,
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

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setSubmitted(true);

      const result = await callLlm(prompt, llmProvider);
      
      // Update the response
      setResponse(result.content);
    } catch (error) {
      setResponse(`Sorry, I couldn't process your request. Please try again. \n\n **Error:** ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error("Error in EnlightenMe:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setResponse('');
    setPrompt(safeDefaultPrompt);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-w-[90vw] max-h-[85vh] min-h-[70vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="text-yellow-500" size={20} weight="fill" />
            Enlighten Me: {safeTitle}
          </DialogTitle>
          <DialogDescription>
            Learn more about this concept with AI assistance. Edit the prompt if you'd like to ask something specific.
          </DialogDescription>
        </DialogHeader>
        
        {!submitted ? (
          <>
            <Textarea 
              className="min-h-[150px] text-sm" 
              value={prompt} 
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Edit your prompt here..."
            />
            <DialogFooter className="flex justify-between items-center">
              <Select value={llmProvider} onValueChange={(value) => setLlmProvider(value as LlmProvider)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="azure">Azure OpenAI</SelectItem>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="gemini">Google Gemini</SelectItem>
                  <SelectItem value="claude">Anthropic</SelectItem>
                  <SelectItem value="huggingface">Hugging Face</SelectItem>
                  <SelectItem value="openrouter">OpenRouter</SelectItem>
                </SelectContent>
              </Select>
              <div>
                <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button onClick={handleSubmit}>Get Insights</Button>
              </div>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="border rounded-md bg-muted/30 p-4">
              <p className="text-sm font-medium mb-2">Your prompt:</p>
              <p className="text-sm text-muted-foreground">{prompt}</p>
            </div>
            <div className="border rounded-md p-4 min-h-[400px] max-h-[800px] flex flex-col relative">
              {isLoading ? (
                <div className="flex items-center justify-center h-[200px]">
                  <SpinnerGap size={24} className="animate-spin text-primary" />
                  <span className="ml-2">Generating insights...</span>
                </div>
              ) : (
                <ScrollArea className="max-h-[60vh] overflow-y-auto">
                  <div className="prose prose-sm dark:prose-invert max-w-none pr-4">
                    <ReactMarkdown
                      components={markdownComponents}
                      remarkPlugins={[remarkGfm]}
                    >
                      {response}
                    </ReactMarkdown>
                  </div>
                </ScrollArea>
              )}
            </div>
            <DialogFooter className="flex items-center justify-between flex-row mt-2">
              <Button variant="ghost" onClick={handleReset}>
                Ask Something Else
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(response);
                    } catch (err) {
                      console.error('Failed to copy response:', err);
                    }
                  }}
                  title="Copy response"
                >
                  <Copy size={16} />
                  <span>Copy</span>
                </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => {
                  const doc = new jsPDF();
                  doc.setFontSize(12);
                  // Split response into lines and wrap long lines
                  const lines = doc.splitTextToSize(response, 180); // 180 is page width minus margins
                  let y = 10;
                  lines.forEach(line => {
                    doc.text(line, 10, y);
                    y += 7; // Move down for next line
                    if (y > 280) { // If near bottom of page, add new page
                      doc.addPage();
                      y = 10;
                    }
                  });
                  const conceptName = title.replace(/\s+/g, '_').toLowerCase();
                  doc.save(`${conceptName}-enlightenme.pdf`);
                }}
                title="Export to PDF"
              >
                <Lightbulb size={16} />
                <span>Export PDF</span>
              </Button>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EnlightenMe;
