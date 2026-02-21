import React from 'react';
import { APISettingsForm } from '@/components/settings/APISettingsForm';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info, Lock } from '@phosphor-icons/react';

/**
 * Full-page Settings view with expanded form + feature matrix + security notes.
 */
const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Bring Your Own Keys — configure LLM providers, backend services, and voice preferences.
        </p>
      </div>

      {/* Security Notes — shown first so learners see privacy info up front */}
      <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50">
        <Lock size={16} className="text-blue-600 dark:text-blue-400" weight="duotone" />
        <AlertTitle className="text-blue-800 dark:text-blue-200 text-sm">
          Security &amp; Privacy Notes
        </AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300 text-xs">
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li>Keys are stored in <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">localStorage</code> under the key <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">oas.user.apiSettings</code>.</li>
            <li>They are only sent directly to the LLM provider you configure — never to our servers.</li>
            <li>Clearing your browser data or clicking "Clear All" above removes everything.</li>
            <li>For shared devices, always clear settings when you're done.</li>
            <li>Export / Import lets you share configs in workshops without typing keys manually.</li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* Main settings form (full mode) */}
      <APISettingsForm />

      {/* Feature Matrix */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Info size={18} /> Which features use your keys?
        </h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Feature</th>
                <th className="text-left p-3 font-medium">Needs API Key</th>
                <th className="text-left p-3 font-medium">Default</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ['Ask AI / Enlighten Me', 'Yes (LLM)', 'OpenRouter free models'],
                ['Study Mode (LLM Judge)', 'Yes (LLM)', 'OpenRouter → graceful fallback'],
                ['Voice Translation', 'Yes (LLM)', 'OpenRouter'],
                ['Voice Input (STT)', 'Depends', 'Web Speech API free; cloud STT needs key'],
                ['Audio Narration (TTS)', 'Depends', 'Browser free; OpenAI / Azure / ElevenLabs need key'],
                ['Knowledge Search', 'Backend', 'Core API at localhost:8000'],
                ['Quizzes', 'No', 'Static content, no LLM needed'],
                ['SCL Demo', 'Yes (LLM)', 'OpenRouter free models'],
              ].map(([feature, needs, fallback], i) => (
                <tr key={i} className="hover:bg-muted/30">
                  <td className="p-3">{feature}</td>
                  <td className="p-3">{needs}</td>
                  <td className="p-3 text-muted-foreground text-xs">{fallback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
