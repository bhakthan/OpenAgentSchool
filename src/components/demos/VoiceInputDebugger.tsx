import React, { useState } from 'react';
import { useVoiceInput } from '@/hooks/useVoiceInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, AlertCircle } from 'lucide-react';

export const VoiceInputDebugger: React.FC = () => {
  const [results, setResults] = useState<string[]>([]);
  
  const {
    isSupported,
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    clearTranscript
  } = useVoiceInput({
    continuous: true,
    interimResults: true,
    onResult: (finalTranscript) => {
      console.log('🎤 onResult called with:', finalTranscript);
      setResults(prev => [...prev, finalTranscript]);
    },
    onError: (errorMessage) => {
      console.error('🎤 onError called with:', errorMessage);
    }
  });

  const clearResults = () => {
    setResults([]);
    clearTranscript();
  };

  const handleToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5" />
          Voice Input Debugger
        </CardTitle>
        <CardDescription>
          Debug speech-to-text functionality with detailed logging
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={isSupported ? "default" : "destructive"}>
            {isSupported ? "✅ Supported" : "❌ Not Supported"}
          </Badge>
          <Badge variant={isListening ? "default" : "secondary"}>
            {isListening ? "🎤 Listening" : "⏸️ Idle"}
          </Badge>
          {error && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Error
            </Badge>
          )}
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button 
            onClick={handleToggle} 
            disabled={!isSupported}
            variant={isListening ? "destructive" : "default"}
            className="flex items-center gap-2"
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {isListening ? "Stop Recording" : "Start Recording"}
          </Button>
          <Button onClick={clearResults} variant="outline">
            Clear Results
          </Button>
        </div>

        {/* Instructions */}
        <div className="text-sm text-muted-foreground bg-muted p-3 rounded">
          <p><strong>Instructions:</strong></p>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>Click "Start Recording" and speak clearly</li>
            <li>Try saying "Hello world" or "Testing speech recognition"</li>
            <li>Watch the console for detailed logs</li>
            <li>Results should appear below when you finish speaking</li>
          </ol>
        </div>

        {/* Current Transcript */}
        {transcript && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm font-medium text-blue-800 mb-1">Current Transcript:</p>
            <p className="text-blue-900">"{transcript}"</p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-sm font-medium text-red-800 mb-1">Error:</p>
            <p className="text-red-900">{error}</p>
          </div>
        )}

        {/* Final Results */}
        <div>
          <h4 className="font-medium mb-2">Final Results ({results.length}):</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {results.length === 0 ? (
              <p className="text-muted-foreground italic">No results yet...</p>
            ) : (
              results.map((result, index) => (
                <div key={index} className="p-2 bg-green-50 border border-green-200 rounded">
                  <span className="text-xs text-green-600">Result #{index + 1}:</span>
                  <p className="text-green-900">"{result}"</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Browser Info */}
        <div className="text-xs text-muted-foreground pt-2 border-t">
          <p><strong>Browser:</strong> {navigator.userAgent.split(' ')[0]}</p>
          <p><strong>Speech API:</strong> {window.SpeechRecognition ? 'SpeechRecognition' : window.webkitSpeechRecognition ? 'webkitSpeechRecognition' : 'Not Available'}</p>
        </div>
      </CardContent>
    </Card>
  );
};
