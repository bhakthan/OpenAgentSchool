import React from 'react';
import { APISettingsForm } from '@/components/settings/APISettingsForm';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info, Lock, Scales, Gavel, ShieldWarning, CurrencyDollar } from '@phosphor-icons/react';

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
      {/* ─── Legal & Compliance ─── */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Scales size={18} weight="fill" /> Legal &amp; Compliance
        </h2>

        <div className="rounded-lg border border-border overflow-hidden divide-y divide-border">
          {/* Liability */}
          <div className="p-4 space-y-1">
            <div className="flex items-center gap-2">
              <Gavel size={16} className="text-muted-foreground" weight="duotone" />
              <h3 className="text-sm font-medium">Limitation of Liability</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This software is provided <strong>"as is"</strong> under the MIT License.
              Open Agent School is not liable for any direct, indirect, or consequential damages
              arising from the use or misconfiguration of API keys, including unauthorized access,
              data loss, or unexpected billing from third-party providers.
            </p>
          </div>

          {/* Billing */}
          <div className="p-4 space-y-1">
            <div className="flex items-center gap-2">
              <CurrencyDollar size={16} className="text-muted-foreground" weight="duotone" />
              <h3 className="text-sm font-medium">Billing &amp; Costs</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Any charges from API providers (OpenAI, Azure, Google, Anthropic, ElevenLabs, Deepgram,
              HuggingFace, OpenRouter, etc.) are your sole financial responsibility. Monitor your
              provider dashboards for usage and set spending limits where available.
            </p>
          </div>

          {/* Data Privacy */}
          <div className="p-4 space-y-1">
            <div className="flex items-center gap-2">
              <ShieldWarning size={16} className="text-muted-foreground" weight="duotone" />
              <h3 className="text-sm font-medium">Data Privacy &amp; Third-Party Terms</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Data you send through configured APIs (prompts, documents, voice recordings) is
              processed according to each provider's terms of service and privacy policy —
              not ours. If you're subject to GDPR, CCPA, HIPAA, or similar regulations, ensure
              your use of each provider complies with those requirements before entering keys.
            </p>
          </div>

          {/* Key Security */}
          <div className="p-4 space-y-1">
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-muted-foreground" weight="duotone" />
              <h3 className="text-sm font-medium">Key Security Best Practices</h3>
            </div>
            <ul className="text-xs text-muted-foreground leading-relaxed list-disc pl-4 space-y-0.5">
              <li>Rotate keys periodically and revoke any that may be compromised.</li>
              <li>Use provider-side restrictions (IP allowlists, referrer limits) when available.</li>
              <li>On shared or public devices, always <strong>Clear All</strong> when you're done.</li>
              <li>Prefer keys with least-privilege scopes (read-only where possible).</li>
            </ul>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground">
          For the complete legal terms, see the{' '}
          <a
            href="https://github.com/bhakthan/OpenAgentSchool/blob/main/API_KEYS_DISCLAIMER.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            API Keys Disclaimer
          </a>{' '}
          and the{' '}
          <a
            href="https://github.com/bhakthan/OpenAgentSchool/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            MIT License
          </a>.
        </p>
      </section>
    </div>
  );
};

export default SettingsPage;
