import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, FileText, MagnifyingGlass, CheckSquare } from '@phosphor-icons/react';

export const HealthcareScribeVisual = () => {
  return (
    <Card className="bg-muted/20 border-dashed">
      <CardContent className="p-4">
        <div className="text-center mb-4">
            <p className="text-sm font-semibold text-primary">AI Clinical Scribe Assistant</p>
            <p className="text-xs text-muted-foreground">Improving Note Accuracy via Self-Reflection</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Step 1: Raw Transcript */}
          <div className="flex items-center space-x-2">
            <Stethoscope size={28} className="text-blue-500" />
            <p className="text-sm font-medium">"Raw doctor-patient conversation transcript..."</p>
          </div>

          <div className="text-2xl animate-bounce">⬇️</div>

          {/* Step 2: Initial Draft */}
          <div className="w-full p-3 border rounded-lg bg-background/70">
            <p className="text-xs font-bold text-center mb-2">Initial Draft</p>
            <div className="flex items-center space-x-2">
                <FileText size={24} className="text-orange-500" />
                <p className="text-xs">"Patient reports pain in stomach. Plan: prescribe meds."</p>
            </div>
          </div>

          <div className="text-2xl">⬇️</div>
          
          {/* Step 3: Self-Critique */}
          <div className="w-full p-3 border rounded-lg bg-yellow-50 border-green-400 dark:bg-green-900 text-green-900 dark:text-green-100">
            <p className="text-xs font-bold text-center mb-2 flex items-center justify-center gap-1"><MagnifyingGlass size={16} /> Self-Critique</p>
            <p className="text-xs">"Critique: 'Stomach' is imprecise. Missing dosage information. Fails compliance check."</p>
          </div>

          <div className="text-2xl">⬇️</div>

          {/* Step 4: Refined Output */}
          <div className="flex items-center space-x-3 p-3 border-2 border-green-500 rounded-lg bg-green-50 dark:bg-green-900 text-green-900 dark:text-green-100">
            <CheckSquare size={32} className="text-green-600" />
            <div>
                <p className="text-sm font-semibold">Final, Refined Note</p>
                <p className="text-xs">"Patient reports epigastric pain. Plan: Prescribe Omeprazole 20mg daily."</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
