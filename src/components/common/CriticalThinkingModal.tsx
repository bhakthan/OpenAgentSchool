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
}

export const CriticalThinkingModal: React.FC<CriticalThinkingModalProps> = ({ isOpen, onClose, question, contextTitle }) => {
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
    
    doc.setFontSize(14);
    doc.text('Question:', 14, 45);
    const splitQuestion = doc.splitTextToSize(question, 180);
    doc.setFontSize(12);
    doc.text(splitQuestion, 14, 52);

    doc.setFontSize(14);
    const responseY = 52 + (splitQuestion.length * 7) + 10;
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
        </div>
        <DialogFooter className="sm:justify-between">
            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleCopyToClipboard(question)}>
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
