import React, { useState } from 'react';
import { TextareaWithVoice } from '@/components/ui/TextareaWithVoice';
import { VoiceInputButton } from '@/components/ui/VoiceInputButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MessageSquare, Brain } from 'lucide-react';

export const VoiceInputDemo: React.FC = () => {
  const [textValue, setTextValue] = useState('');
  const [independentText, setIndependentText] = useState('');

  const handleVoiceResult = (transcript: string) => {
    setIndependentText(prev => prev ? `${prev} ${transcript}` : transcript);
  };

  const clearAll = () => {
    setTextValue('');
    setIndependentText('');
  };

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Mic className="h-8 w-8 text-blue-600" />
          Voice Input Demo
        </h1>
        <p className="text-muted-foreground">
          Test speech-to-text functionality in learning components
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Integrated Voice + Textarea */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Integrated Voice Input
            </CardTitle>
            <CardDescription>
              TextareaWithVoice component used in Critical Thinking, Socratic Questions, and Debug Challenges
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <TextareaWithVoice
              value={textValue}
              onChange={setTextValue}
              placeholder="Type your thoughts or click the microphone to speak..."
              label="Your Response"
              description="This component combines typing and voice input seamlessly"
              rows={6}
            />
            <div className="text-sm text-muted-foreground">
              Character count: {textValue.length}
            </div>
          </CardContent>
        </Card>

        {/* Standalone Voice Button */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Standalone Voice Button
            </CardTitle>
            <CardDescription>
              Independent voice input button for custom implementations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <VoiceInputButton
                onVoiceResult={handleVoiceResult}
                size="default"
              />
              <span className="text-sm text-muted-foreground">
                Click to record voice input
              </span>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Voice Results:</label>
              <div className="min-h-[120px] p-3 border rounded-md bg-muted/50">
                {independentText || (
                  <span className="text-muted-foreground italic">
                    Voice transcription will appear here...
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Browser Support Info */}
      <Card>
        <CardHeader>
          <CardTitle>Browser Compatibility</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>✅ Supported:</strong> Chrome, Edge, Safari (macOS/iOS), Opera</p>
            <p><strong>⚠️ Limited:</strong> Firefox (requires enabling in about:config)</p>
            <p><strong>❌ Not Supported:</strong> Older browsers without Web Speech API</p>
            <p className="text-muted-foreground mt-3">
              The voice input gracefully degrades - if not supported, only the microphone icon is hidden and typing remains fully functional.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center">
        <Button onClick={clearAll} variant="outline">
          Clear All Text
        </Button>
      </div>
    </div>
  );
};
