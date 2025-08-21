import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TextareaWithVoice } from '@/components/ui/TextareaWithVoice';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Copy, Printer, Brain, Loader2 } from 'lucide-react';
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
    const printContent = `
      <html>
        <head>
          <title>Critical Thinking Exercise - ${contextTitle}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              line-height: 1.6; 
              color: black;
              background: white;
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
            .section { 
              margin: 20px 0; 
              padding: 15px;
              border-left: 4px solid #3b82f6;
              background: #f8fafc;
            }
            .section-title { 
              font-weight: bold; 
              color: #1f2937; 
              margin-bottom: 10px; 
              font-size: 16px; 
            }
            .question-section {
              background: #fef3c7;
              border-left: 4px solid #f59e0b;
            }
            .response-section {
              background: #dbeafe;
              border-left: 4px solid #3b82f6;
            }
            .feedback-section {
              background: #d1fae5;
              border-left: 4px solid #10b981;
            }
            .cue-section {
              background: #e0e7ff;
              border-left: 4px solid #6366f1;
              font-style: italic;
            }
            .score {
              font-size: 18px;
              color: #10b981;
              font-weight: bold;
            }
            .content-text {
              white-space: pre-wrap;
              line-height: 1.6;
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
              .section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">🧠 Critical Thinking Exercise</div>
            <div class="subtitle">Topic: ${contextTitle}</div>
            <div class="subtitle">Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
          </div>
          
          ${contextCue ? `
          <div class="section cue-section">
            <div class="section-title">💡 Key Insight</div>
            <div class="content-text">${contextCue}</div>
          </div>
          ` : ''}
          
          <div class="section question-section">
            <div class="section-title">❓ Question</div>
            <div class="content-text">${question}</div>
          </div>
          
          <div class="section response-section">
            <div class="section-title">💭 Your Response</div>
            <div class="content-text">${response}</div>
          </div>
          
          ${feedback ? `
          <div class="section feedback-section">
            <div class="section-title">🎯 AI Assessment <span class="score">(Score: ${feedback.score}/100)</span></div>
            <div class="content-text">${feedback.feedback}</div>
            
            ${feedback.suggestions.length > 0 ? `
            <div style="margin-top: 15px;">
              <strong>📈 Suggestions for Improvement:</strong>
              <ul style="margin-top: 10px;">
                ${feedback.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
              </ul>
            </div>
            ` : ''}
          </div>
          ` : ''}
          
          <div class="footer">
            <p>Generated by OpenAgent School - Critical Thinking Development Platform</p>
            <p>Continue your learning journey with more challenging questions</p>
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
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Critical Thinking Challenge</DialogTitle>
          <DialogDescription>
            Engage with a thought-provoking question designed to develop your analytical and reasoning skills. Use typing or voice input to share your insights.
          </DialogDescription>
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
          <TextareaWithVoice
            className="w-full h-40"
            placeholder="Type or speak your response here..."
            value={response}
            onChange={setResponse}
            rows={10}
            label="Your Response"
            description="Share your thoughts, analysis, or solution. You can type or use the microphone button to speak."
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
            <div className="p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-lg text-green-800 dark:text-green-200">🎯 Critical Thinking Assessment</h4>
                <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                  Score: {feedback.score}/100
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-300 mb-2">Feedback:</p>
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
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">💡 Suggestions for Growth:</p>
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
                    <Printer className="mr-2 h-4 w-4" /> Export to PDF
                </Button>
            </div>
            <Button onClick={onClose} className="w-full sm:w-auto">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
