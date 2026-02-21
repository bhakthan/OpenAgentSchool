import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CopySimple as Copy, Check } from '@phosphor-icons/react';

interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  customStyle?: React.CSSProperties;
  inline?: boolean;
  styleVariant?: 'default' | 'flat-ui-2';
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  children,
  language = '',
  className = '',
  showLineNumbers = false,
  showCopyButton = true,
  customStyle = {},
  inline = false,
  styleVariant = 'default'
}) => {
  const [copied, setCopied] = useState(false);
  const isFlatUi2 = styleVariant === 'flat-ui-2';
  
  const codeString = String(children).replace(/\n$/, '');
  
  // Only show copy button for code languages
  const shouldShowCopyButton = showCopyButton && (language || className.includes('language-'));

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // For inline code, return a simple span
  if (inline) {
    return (
      <code className="bg-muted px-2 py-1 rounded font-mono text-sm">
        {codeString}
      </code>
    );
  }

  return (
    <div className="relative group">
      {shouldShowCopyButton && (
        <div className="absolute right-2 top-2 z-10">
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity ${isFlatUi2 ? 'bg-background/95 hover:bg-muted text-muted-foreground hover:text-foreground border border-border' : 'bg-gray-800/90 hover:bg-gray-700 text-gray-300 hover:text-white'}`}
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check size={14} />
            ) : (
              <Copy size={14} />
            )}
          </Button>
        </div>
      )}
      <div className={`rounded-md border border-border/60 overflow-hidden ${isFlatUi2 ? 'bg-background' : 'bg-muted/40'}`}>
        <pre 
          className={`overflow-x-auto p-4 text-sm font-mono leading-relaxed text-foreground ${isFlatUi2 ? 'bg-background' : ''} ${className}`}
          style={customStyle}
        >
          <code>{codeString}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
