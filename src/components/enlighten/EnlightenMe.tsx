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
import { ChatCircleDots, SpinnerGap, Copy, Check, CaretDown, CaretUp, Printer } from '@phosphor-icons/react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import { LlmProvider, callLlm } from '@/lib/llm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [isPromptExpanded, setIsPromptExpanded] = useState(false);
  
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
    setIsPromptExpanded(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-w-[90vw] max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <ChatCircleDots className="text-primary" size={20} />
            Ask AI: {safeTitle}
          </DialogTitle>
          <DialogDescription>
            Learn more about this concept with AI assistance. Edit the prompt if you'd like to ask something specific.
          </DialogDescription>
        </DialogHeader>
        
        {!submitted ? (
          <>
            <div className="flex-1 flex flex-col min-h-0">
              <Textarea 
                className="min-h-[150px] text-sm flex-shrink-0" 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Edit your prompt here..."
              />
            </div>
            <DialogFooter className="flex justify-between items-center flex-shrink-0">
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
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button onClick={handleSubmit}>Get Insights</Button>
              </div>
            </DialogFooter>
          </>
        ) : (
          <div className="flex-1 flex flex-col min-h-0 space-y-4">
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

            {/* Response Section - Now takes more space */}
            <div className="border rounded-md flex-1 flex flex-col min-h-0 overflow-hidden">
              {isLoading ? (
                <div className="flex items-center justify-center h-[200px]">
                  <SpinnerGap size={24} className="animate-spin text-primary" />
                  <span className="ml-2">Generating insights...</span>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto max-h-[60vh] p-4">
                  <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
                    <ReactMarkdown
                      components={markdownComponents}
                      remarkPlugins={[remarkGfm]}
                    >
                      {response}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter className="flex items-center justify-between flex-row mt-2 flex-shrink-0">
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
                  const printContent = `
                    <html>
                      <head>
                        <title>Open Agent School - AI Insights</title>
                        <style>
                          body { 
                            font-family: Arial, sans-serif; 
                            margin: 20px; 
                            line-height: 1.6; 
                            color: black;
                            background: white;
                          }
                          .branding { 
                            text-align: center; 
                            margin-bottom: 20px; 
                            padding-bottom: 15px; 
                            border-bottom: 1px solid #e5e7eb; 
                          }
                          .branding-title { 
                            font-size: 20px; 
                            font-weight: bold; 
                            color: #3b82f6; 
                            margin-bottom: 5px; 
                          }
                          .branding-url { 
                            font-size: 12px; 
                            color: #6b7280; 
                          }
                          .header { 
                            text-align: center; 
                            margin-bottom: 30px; 
                            border-bottom: 2px solid #3b82f6; 
                            padding-bottom: 15px; 
                          }
                          .title { 
                            font-size: 24px; 
                            color: #3b82f6; 
                            font-weight: bold; 
                            margin-bottom: 10px;
                          }
                          .subtitle {
                            font-size: 16px;
                            color: #6b7280;
                            margin-bottom: 5px;
                          }
                          .content { 
                            background: #f8fafc; 
                            padding: 20px; 
                            border-left: 4px solid #3b82f6; 
                            margin: 20px 0; 
                            white-space: pre-wrap;
                            font-size: 14px;
                            line-height: 1.8;
                          }
                          .prompt-section {
                            margin: 20px 0;
                            padding: 15px;
                            background: #f1f5f9;
                            border-radius: 8px;
                            border-left: 4px solid #64748b;
                          }
                          .prompt-title {
                            font-weight: bold;
                            color: #475569;
                            margin-bottom: 10px;
                          }
                          .prompt-text {
                            font-size: 12px;
                            color: #64748b;
                            white-space: pre-wrap;
                          }
                          .footer {
                            margin-top: 30px; 
                            text-align: center; 
                            color: #6b7280; 
                            font-size: 12px;
                          }
                          @media print {
                            body { margin: 0.5in; }
                            .header { page-break-after: avoid; }
                            .content { page-break-inside: avoid; }
                          }
                        </style>
                      </head>
                      <body>
                        <div class="branding">
                          <div class="branding-title">Open Agent School</div>
                          <div class="branding-url">openagentschool.org</div>
                        </div>
                        <div class="header">
                          <div class="title">🤖 AI Insights</div>
                          <div class="subtitle">Topic: ${title}</div>
                          <div class="subtitle">Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
                        </div>
                        
                        <div class="prompt-section">
                          <div class="prompt-title">📝 Your Question:</div>
                          <div class="prompt-text">${prompt}</div>
                        </div>
                        
                        <div class="content">
                          ${response.replace(/\n/g, '<br>')}
                        </div>
                        
                        <div class="footer">
                          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
                          <p>Open Agent School - openagentschool.org</p>
                        </div>
                      </body>
                    </html>
                  `;

                  const printWindow = window.open('', '_blank');
                  if (printWindow) {
                    printWindow.document.write(printContent);
                    printWindow.document.close();
                    printWindow.focus();
                    setTimeout(() => {
                      printWindow.print();
                    }, 250);
                  }
                }}
                title="Print to PDF"
              >
                <Printer size={16} />
                <span>Print PDF</span>
              </Button>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
              </div>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EnlightenMe;
