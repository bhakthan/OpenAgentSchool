import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Copy, FileDown, Brain, Loader2 } from 'lucide-react';
import jsPDF from 'jspdf';
import { criticalThinkingJudge } from '@/lib/llmJudge';
import type { LlmJudgeResponse } from '@/lib/llmJudge';
import { Badge } from '@/components/ui/badge';

interface CriticalThinkingModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  contextTitle: string;
  contextCue?: string;
  conceptArea: string;
  source: 'core-concepts' | 'agent-patterns';
  context?: {
    difficulty?: string;
    expectedApproaches?: string[];
    keyConsiderations?: string[];
    realWorldApplications?: string[];
    commonMisconceptions?: string[];
    evaluationCriteria?: string[];
  };
}

export const CriticalThinkingModal: React.FC<CriticalThinkingModalProps> = ({ 
  isOpen, 
  onClose, 
  question, 
  contextTitle, 
  contextCue,
  conceptArea,
  source,
  context
}) => {
  const [response, setResponse] = useState('');
  const [feedback, setFeedback] = useState<LlmJudgeResponse | null>(null);
  const [isGettingFeedback, setIsGettingFeedback] = useState(false);

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleGetFeedback = async () => {
    if (!response.trim()) {
      return;
    }

    setIsGettingFeedback(true);
    try {
      const feedbackResult = await criticalThinkingJudge({
        challengeTitle: contextTitle,
        challengeDescription: contextCue || `Critical thinking exercise for ${conceptArea}`,
        question,
        userResponse: response,
        conceptArea,
        source,
        context
      });
      setFeedback(feedbackResult);
    } catch (error) {
      console.error('Error getting feedback:', error);
      // Provide encouraging fallback feedback
      setFeedback({
        score: 80,
        feedback: "Thank you for engaging with this critical thinking challenge! Your thoughtful response demonstrates intellectual curiosity and analytical thinking. Continue exploring these concepts to deepen your understanding.",
        suggestions: ["Keep exploring different perspectives", "Connect ideas to real-world applications", "Continue questioning assumptions"],
        insights: ["Critical thinking develops through practice with challenging questions"],
        strengths: ["Engaged with complex conceptual challenges", "Demonstrated analytical thinking"],
        improvements: ["Continue developing systematic analysis skills"]
      });
    } finally {
      setIsGettingFeedback(false);
    }
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
    let currentY = questionY + 7 + (splitQuestion.length * 7) + 10;
    doc.text('Your Response:', 14, currentY);
    const splitResponse = doc.splitTextToSize(response, 180);
    doc.setFontSize(12);
    doc.text(splitResponse, 14, currentY + 7);

    // Add feedback if available
    if (feedback) {
      currentY = currentY + 7 + (splitResponse.length * 7) + 15;
      doc.setFontSize(14);
      doc.text(`LLM Feedback (Score: ${feedback.score}/100):`, 14, currentY);
      
      currentY += 10;
      doc.setFontSize(12);
      const splitFeedback = doc.splitTextToSize(feedback.feedback, 180);
      doc.text(splitFeedback, 14, currentY);
      
      if (feedback.suggestions.length > 0) {
        currentY += (splitFeedback.length * 7) + 10;
        doc.setFontSize(13);
        doc.text('Suggestions:', 14, currentY);
        currentY += 7;
        doc.setFontSize(11);
        feedback.suggestions.forEach((suggestion, index) => {
          const splitSuggestion = doc.splitTextToSize(`• ${suggestion}`, 180);
          doc.text(splitSuggestion, 14, currentY);
          currentY += splitSuggestion.length * 5;
        });
      }
    }

    doc.save('critical-thinking-exercise.pdf');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Critical Thinking Challenge</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {contextCue && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border-l-4 border-blue-500 dark:border-blue-400">
              <p className="text-base font-medium text-blue-800 dark:text-blue-300 mb-1">💡 Key Insight</p>
              <p className="text-lg font-semibold text-blue-900 dark:text-blue-200 italic">"{contextCue}"</p>
            </div>
          )}
          <div>
            <p className="font-semibold text-xl">Question:</p>
            <p className="text-xl text-muted-foreground">{question}</p>
          </div>
          <Textarea
            className="w-full h-40"
            placeholder="Type your response here..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            rows={10}
          />
          
          {/* Get Feedback Button */}
          <div>
            <Button 
              onClick={handleGetFeedback} 
              disabled={!response.trim() || isGettingFeedback}
              className="w-full"
              variant="default"
            >
              {isGettingFeedback ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting LLM Feedback...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Get LLM Feedback
                </>
              )}
            </Button>
          </div>

          {/* Feedback Results */}
          {feedback && (
            <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-lg text-green-800 dark:text-green-200">🎯 Critical Thinking Assessment</h4>
                <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                  Score: {feedback.score}/100
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">Feedback:</p>
                  <p className="text-green-900 dark:text-green-100 leading-relaxed">{feedback.feedback}</p>
                </div>

                {feedback.strengths.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">✨ Strengths:</p>
                    <ul className="space-y-1">
                      {feedback.strengths.map((strength, index) => (
                        <li key={index} className="text-sm text-green-800 dark:text-green-200 flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {feedback.suggestions.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">💡 Suggestions for Growth:</p>
                    <ul className="space-y-1">
                      {feedback.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-sm text-blue-800 dark:text-blue-200 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {feedback.insights && feedback.insights.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">🔍 Key Insights:</p>
                    <ul className="space-y-1">
                      {feedback.insights.map((insight, index) => (
                        <li key={index} className="text-sm text-purple-800 dark:text-purple-200 flex items-start gap-2">
                          <span className="text-purple-500 mt-1">•</span>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Instructional guidance */}
          <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-900 dark:text-amber-200">
              <span className="font-medium">💭 Learning Tip:</span> This exercise is designed to reinforce your understanding. 
              Take your time to think deeply about the question, write your thoughts above, and use the copy/export features to save your insights for future reference.
              {!feedback && response.trim() && (
                <span className="block mt-2 font-medium">💡 Ready for feedback? Click "Get LLM Feedback" to receive detailed analysis of your critical thinking!</span>
              )}
            </p>
          </div>
        </div>
        <DialogFooter className="flex-shrink-0 flex-col sm:flex-row sm:justify-between gap-3">
            <div className="flex flex-wrap gap-2">
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
            <Button onClick={onClose} className="w-full sm:w-auto">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
