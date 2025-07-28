import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Copy, FileDown } from 'lucide-react';
import jsPDF from 'jspdf';

interface CriticalThinkingModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  contextTitle: string;
  contextCue?: string;
}

export const CriticalThinkingModal: React.FC<CriticalThinkingModalProps> = ({ isOpen, onClose, question, contextTitle, contextCue }) => {
  const [response, setResponse] = useState('');

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleExportToPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Critical Thinking Exercise', 14, 22);
    doc.setFontSize(12);
    doc.text(`Topic: ${contextTitle}`, 14, 32);
    
    if (contextCue) {
      doc.setFontSize(11);
      doc.text(`Key Insight: ${contextCue}`, 14, 40);
    }
    
    doc.setFontSize(14);
    const questionY = contextCue ? 53 : 45;
    doc.text('Question:', 14, questionY);
    const splitQuestion = doc.splitTextToSize(question, 180);
    doc.setFontSize(12);
    doc.text(splitQuestion, 14, questionY + 7);

    doc.setFontSize(14);
    const responseY = questionY + 7 + (splitQuestion.length * 7) + 10;
    doc.text('Your Response:', 14, responseY);
    const splitResponse = doc.splitTextToSize(response, 180);
    doc.setFontSize(12);
    doc.text(splitResponse, 14, responseY + 7);

    doc.save('critical-thinking-exercise.pdf');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Critical Thinking Challenge</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {contextCue && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border-l-4 border-blue-500 dark:border-blue-400">
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">💡 Key Insight</p>
              <p className="text-lg font-semibold text-blue-800 dark:text-blue-200 italic">"{contextCue}"</p>
            </div>
          )}
          <div className="mb-4">
            <p className="font-semibold text-xl">Question:</p> {/* Further increased font size */}
            <p className="text-xl text-muted-foreground">{question}</p> {/* Further increased font size */}
          </div>
          <Textarea
            className="w-full h-40" /* Adjusted width and height */
            placeholder="Type your response here..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            rows={10} /* Increased rows */
          />
          
          {/* Instructional guidance */}
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <span className="font-medium">💭 Learning Tip:</span> This exercise is designed to reinforce your understanding. 
              Take your time to think deeply about the question, write your thoughts above, and use the copy/export features to save your insights for future reference.
            </p>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleCopyToClipboard(contextCue ? `Key Insight: "${contextCue}"\n\nQuestion: ${question}` : question)}>
                    <Copy className="mr-2 h-4 w-4" /> Copy Question
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleCopyToClipboard(response)}>
                    <Copy className="mr-2 h-4 w-4" /> Copy Response
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportToPdf}>
                    <FileDown className="mr-2 h-4 w-4" /> Export to PDF
                </Button>
            </div>
            <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
