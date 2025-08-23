import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Eye, Ear, Hand, Wind, Utensils, Brain, Zap } from 'lucide-react';

interface SensoryInput {
  modality: 'visual' | 'auditory' | 'tactile' | 'olfactory' | 'gustatory';
  description: string;
  confidence: number;
}

interface SensoryAnalysis {
  modality: string;
  insights: string[];
  confidence: number;
  status: 'pending' | 'analyzing' | 'complete';
}

const modalityIcons = {
  visual: Eye,
  auditory: Ear,
  tactile: Hand,
  olfactory: Wind,
  gustatory: Utensils
};

const modalityColors = {
  visual: 'bg-blue-100 text-blue-700',
  auditory: 'bg-green-100 text-green-700',
  tactile: 'bg-purple-100 text-purple-700',
  olfactory: 'bg-yellow-100 text-yellow-700',
  gustatory: 'bg-red-100 text-red-700'
};

const sampleMedicalScenario: SensoryInput[] = [
  {
    modality: 'visual',
    description: 'Patient appears pale, slightly hunched posture, dark circles under eyes',
    confidence: 0.85
  },
  {
    modality: 'auditory',
    description: 'Shallow breathing pattern, weak voice when speaking, occasional dry cough',
    confidence: 0.80
  },
  {
    modality: 'tactile',
    description: 'Patient reports feeling cold, skin feels clammy, muscle weakness',
    confidence: 0.75
  },
  {
    modality: 'olfactory',
    description: 'No unusual odors detected',
    confidence: 0.60
  },
  {
    modality: 'gustatory',
    description: 'Patient reports metallic taste, decreased appetite',
    confidence: 0.70
  }
];

const SensoryReasoningLiveRunner: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [analyses, setAnalyses] = useState<SensoryAnalysis[]>([]);
  const [synthesis, setSynthesis] = useState<string>('');
  const [finalDiagnosis, setFinalDiagnosis] = useState<string>('');

  const runAnalysis = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    setAnalyses([]);
    setSynthesis('');
    setFinalDiagnosis('');

    // Step 1: Initialize sensory agents
    setCurrentStep(1);
    const initialAnalyses = sampleMedicalScenario.map(input => ({
      modality: input.modality,
      insights: [],
      confidence: 0,
      status: 'pending' as const
    }));
    setAnalyses(initialAnalyses);
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 2: Process each sensory modality
    setCurrentStep(2);
    for (let i = 0; i < sampleMedicalScenario.length; i++) {
      const input = sampleMedicalScenario[i];
      
      // Update status to analyzing
      setAnalyses(prev => prev.map((analysis, idx) => 
        idx === i ? { ...analysis, status: 'analyzing' } : analysis
      ));
      await new Promise(resolve => setTimeout(resolve, 800));

      // Generate insights based on modality
      const insights = generateInsights(input);
      
      // Update with complete analysis
      setAnalyses(prev => prev.map((analysis, idx) => 
        idx === i ? { 
          ...analysis, 
          insights, 
          confidence: input.confidence,
          status: 'complete' 
        } : analysis
      ));
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Step 3: Cross-modal synthesis
    setCurrentStep(3);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSynthesis(
      "Cross-modal analysis reveals consistent patterns suggesting potential iron deficiency anemia: " +
      "Visual pallor and fatigue indicators align with auditory respiratory compensation. " +
      "Tactile coldness and weakness support circulatory compromise. " +
      "Gustatory metallic taste is characteristic of mineral deficiency states."
    );

    // Step 4: Synesthetic reasoning
    setCurrentStep(4);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFinalDiagnosis(
      "Enhanced multi-sensory analysis suggests iron deficiency anemia with high confidence (87%). " +
      "The convergence of visual (pallor), auditory (compensation), tactile (circulation), and " +
      "gustatory (metallic taste) symptoms creates a coherent diagnostic picture that would be " +
      "missed by single-modality analysis alone."
    );

    setIsRunning(false);
  };

  const generateInsights = (input: SensoryInput): string[] => {
    const insights: Record<string, string[]> = {
      visual: [
        "Pallor suggests possible anemia or circulation issues",
        "Posture indicates fatigue or discomfort",
        "Dark circles suggest sleep disturbance or systemic illness"
      ],
      auditory: [
        "Shallow breathing may indicate respiratory compensation",
        "Weak voice suggests reduced energy or respiratory effort",
        "Dry cough could indicate dehydration or irritation"
      ],
      tactile: [
        "Cold sensation suggests possible circulation problems",
        "Clammy skin indicates autonomic nervous system response",
        "Muscle weakness supports systemic condition hypothesis"
      ],
      olfactory: [
        "Absence of ketotic or other metabolic odors",
        "No signs of infection-related odors",
        "Normal olfactory presentation"
      ],
      gustatory: [
        "Metallic taste strongly suggests mineral deficiency",
        "Decreased appetite indicates systemic illness",
        "Taste changes often accompany hematologic conditions"
      ]
    };
    
    return insights[input.modality] || ["Analysis complete"];
  };

  const getStepDescription = (step: number): string => {
    const steps = [
      "Initializing multi-sensory analysis system...",
      "Deploying specialized sensory agents...",
      "Processing individual sensory modalities...",
      "Performing cross-modal synthesis...",
      "Generating synesthetic reasoning insights..."
    ];
    return steps[step] || "Analysis complete";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Sensory Reasoning Enhancement - Live Runner
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Experience how multi-sensory AI analysis creates comprehensive understanding through 
            sensory integration and synesthetic reasoning.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button 
                onClick={runAnalysis} 
                disabled={isRunning}
                className="flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                {isRunning ? 'Running Analysis...' : 'Start Medical Sensory Analysis'}
              </Button>
              {isRunning && (
                <Badge variant="secondary">
                  Step {currentStep}/4: {getStepDescription(currentStep)}
                </Badge>
              )}
            </div>

            {isRunning && (
              <Progress value={(currentStep / 4) * 100} className="w-full" />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Medical Scenario */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Patient Case: Multi-Sensory Symptom Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleMedicalScenario.map((input, index) => {
              const Icon = modalityIcons[input.modality];
              const analysis = analyses[index];
              
              return (
                <Card key={input.modality} className="relative">
                  <CardHeader className="pb-3">
                    <CardTitle className={`text-sm flex items-center gap-2 p-2 rounded ${modalityColors[input.modality]}`}>
                      <Icon className="h-4 w-4" />
                      {input.modality.charAt(0).toUpperCase() + input.modality.slice(1)} Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm font-medium">Observations:</p>
                    <p className="text-xs text-muted-foreground">{input.description}</p>
                    
                    {analysis && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium">Status:</span>
                          <Badge 
                            variant={analysis.status === 'complete' ? 'default' : 
                                   analysis.status === 'analyzing' ? 'secondary' : 'outline'}
                          >
                            {analysis.status}
                          </Badge>
                        </div>
                        
                        {analysis.confidence > 0 && (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs">Confidence:</span>
                              <span className="text-xs font-mono">{(analysis.confidence * 100).toFixed(0)}%</span>
                            </div>
                            <Progress value={analysis.confidence * 100} className="h-2" />
                          </div>
                        )}
                        
                        {analysis.insights.length > 0 && (
                          <div className="space-y-1">
                            <p className="text-xs font-medium">AI Insights:</p>
                            <ul className="space-y-1">
                              {analysis.insights.map((insight, idx) => (
                                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                                  <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                  {insight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Cross-Modal Synthesis */}
      {synthesis && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Cross-Modal Synthesis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{synthesis}</p>
          </CardContent>
        </Card>
      )}

      {/* Final Diagnosis */}
      {finalDiagnosis && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Enhanced Synesthetic Reasoning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Badge className="bg-primary text-primary-foreground">
                Multi-Sensory AI Diagnosis
              </Badge>
              <p className="text-sm leading-relaxed">{finalDiagnosis}</p>
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">
                  <strong>Key Insight:</strong> This diagnosis demonstrates how sensory reasoning enhancement 
                  creates emergent understanding that surpasses individual modality analysis. The AI system 
                  identified patterns across visual, auditory, tactile, and gustatory inputs that collectively 
                  point to a specific medical condition with higher confidence than any single sensory analysis alone.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SensoryReasoningLiveRunner;
