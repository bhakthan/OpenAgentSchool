import React, { useState, useCallback, useRef } from 'react';
import { useUserSettings } from '@/contexts/UserSettingsContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Lock, Eye, EyeSlash, Download, Upload, Trash, FloppyDisk, ShieldCheck, Lightbulb, Rocket, Key, NumberCircleOne, NumberCircleTwo, NumberCircleThree, NumberCircleFour, Microphone, SpeakerHigh, Scales, Warning } from '@phosphor-icons/react';
import type { ProviderConfig, UserSettings, SttPreference, TtsPreference, SpeechServiceConfig } from '@/lib/userSettings';

// Provider metadata for the form
const PROVIDERS = [
  {
    id: 'openrouter', label: 'OpenRouter',
    hint: 'Free models available — great default. No URL change needed.',
    defaultUrl: 'https://openrouter.ai/api/v1',
    modelPlaceholder: 'google/gemini-2.0-flash-exp:free',
    keyPlaceholder: 'sk-or-…',
    urlRequired: false, modelRequired: false,
  },
  {
    id: 'openai', label: 'OpenAI',
    hint: 'GPT-4o, GPT-4o-mini, etc. URL only needed for proxies.',
    defaultUrl: 'https://api.openai.com/v1',
    modelPlaceholder: 'gpt-4o-mini',
    keyPlaceholder: 'sk-…',
    urlRequired: false, modelRequired: false,
  },
  {
    id: 'azure', label: 'Azure OpenAI',
    hint: 'Requires your deployment endpoint URL and model (deployment name).',
    defaultUrl: '',
    modelPlaceholder: 'my-gpt4o-deployment',
    keyPlaceholder: 'Your Azure API key',
    urlRequired: true, modelRequired: true,
  },
  {
    id: 'gemini', label: 'Google Gemini',
    hint: 'Gemini Pro / Flash. URL only needed for custom endpoints.',
    defaultUrl: 'https://generativelanguage.googleapis.com/v1beta',
    modelPlaceholder: 'gemini-2.0-flash',
    keyPlaceholder: 'AIza…',
    urlRequired: false, modelRequired: false,
  },
  {
    id: 'claude', label: 'Anthropic Claude',
    hint: 'Claude Sonnet / Opus. URL only needed for proxies.',
    defaultUrl: 'https://api.anthropic.com/v1',
    modelPlaceholder: 'claude-sonnet-4-20250514',
    keyPlaceholder: 'sk-ant-…',
    urlRequired: false, modelRequired: false,
  },
  {
    id: 'huggingface', label: 'HuggingFace',
    hint: 'Inference API. URL only needed for dedicated endpoints.',
    defaultUrl: 'https://api-inference.huggingface.co/models',
    modelPlaceholder: 'meta-llama/Llama-3.1-8B-Instruct',
    keyPlaceholder: 'hf_…',
    urlRequired: false, modelRequired: false,
  },
] as const;

type ProviderId = (typeof PROVIDERS)[number]['id'];

interface APISettingsFormProps {
  /** Compact mode hides some sections for the Sheet view */
  compact?: boolean;
  /** Called after the user saves settings */
  onSaved?: () => void;
}

export const APISettingsForm: React.FC<APISettingsFormProps> = ({ compact = false, onSaved }) => {
  const { settings, updateSettings, clearSettings, exportJSON, importJSON, isCustom } = useUserSettings();

  // Local draft so we can edit without saving on every keystroke
  const [draft, setDraft] = useState<UserSettings>(() => structuredClone(settings));
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  // --- helpers ---
  const toggleKeyVisibility = (key: string) => setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));

  const setProviderField = useCallback((provider: ProviderId, field: keyof ProviderConfig, value: string) => {
    setDraft(prev => ({
      ...prev,
      providers: {
        ...prev.providers,
        [provider]: {
          ...(prev.providers[provider] ?? {}),
          [field]: value || undefined,
        },
      },
    }));
  }, []);

  const setBackendField = useCallback((field: 'coreApi' | 'orchestrator' | 'knowledgeService', value: string) => {
    setDraft(prev => ({
      ...prev,
      backends: { ...prev.backends, [field]: value || undefined },
    }));
  }, []);

  type SpeechServiceId = keyof NonNullable<UserSettings['speechServices']>;
  const setSpeechServiceField = useCallback((service: SpeechServiceId, field: keyof SpeechServiceConfig, value: string) => {
    setDraft(prev => ({
      ...prev,
      speechServices: {
        ...prev.speechServices,
        [service]: {
          ...(prev.speechServices?.[service] ?? {}),
          [field]: value || undefined,
        },
      },
    }));
  }, []);

  // --- actions ---
  const handleSave = () => {
    updateSettings(draft);
    onSaved?.();
  };

  const handleClear = () => {
    clearSettings();
    const fresh: UserSettings = { providers: {}, backends: {}, sttPreference: 'auto', ttsPreference: 'browser', speechServices: {} };
    setDraft(fresh);
  };

  const handleExport = () => {
    const blob = new Blob([exportJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'openagentschool-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importJSON(reader.result as string);
        setDraft(structuredClone(settings));
      } catch {
        alert('Invalid settings file');
      }
    };
    reader.readAsText(file);
    // reset so same file can be re-imported
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      {/* ─── Trust Banner ─── */}
      <Alert className="border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/50">
        <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400" weight="fill" />
        <AlertTitle className="text-emerald-800 dark:text-emerald-200 text-sm">
          Your keys stay in your browser
        </AlertTitle>
        <AlertDescription className="text-emerald-700 dark:text-emerald-300 text-xs leading-relaxed">
          All API keys and settings are stored <strong>only in your browser's localStorage</strong>.
          They are never sent to Open Agent School servers, analytics, or any third party.
          You can clear everything at any time.
        </AlertDescription>
      </Alert>

      {/* ─── Quick Configuration Guide ─── */}
      <Accordion type="single" collapsible defaultValue={isCustom ? undefined : 'quick-guide'} className="w-full">
        <AccordionItem value="quick-guide" className="border-0 rounded-lg px-4">
          <AccordionTrigger className="text-sm hover:no-underline py-3">
            <div className="flex items-center gap-2">
              <Rocket size={16} className="text-primary" weight="fill" />
              <span className="font-medium">Quick Setup Guide</span>
              {!isCustom && (
                <span className="ml-1 text-[10px] font-medium bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                  Start here
                </span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ol className="space-y-3 text-xs text-muted-foreground pb-1">
              <li className="flex gap-2.5">
                <NumberCircleOne size={20} className="text-primary flex-shrink-0 mt-0.5" weight="fill" />
                <div>
                  <p className="font-medium text-foreground">Pick a provider</p>
                  <p>Choose from the <strong>Default LLM Provider</strong> dropdown below. <strong>OpenRouter</strong> is recommended — it offers free models so you can explore without spending.</p>
                </div>
              </li>
              <li className="flex gap-2.5">
                <NumberCircleTwo size={20} className="text-primary flex-shrink-0 mt-0.5" weight="fill" />
                <div>
                  <p className="font-medium text-foreground">Get an API key</p>
                  <p>
                    Sign up at your provider's site and generate a key.{' '}
                    <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      OpenRouter keys →
                    </a>
                  </p>
                </div>
              </li>
              <li className="flex gap-2.5">
                <NumberCircleThree size={20} className="text-primary flex-shrink-0 mt-0.5" weight="fill" />
                <div>
                  <p className="font-medium text-foreground">Paste & save</p>
                  <p>Expand the provider accordion below, paste your key, then hit <strong>Save Settings</strong>. That's it!</p>
                </div>
              </li>
              <li className="flex gap-2.5">
                <NumberCircleFour size={20} className="text-primary flex-shrink-0 mt-0.5" weight="fill" />
                <div>
                  <p className="font-medium text-foreground">Try a feature</p>
                  <p>
                    Head to <strong>Study Mode</strong>, click <strong>Enlighten Me</strong> on any concept,
                    or use voice input — your configured key powers all AI features.
                  </p>
                </div>
              </li>
            </ol>
            <div className="mt-2 flex items-start gap-2 rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 px-3 py-2">
              <Lightbulb size={14} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" weight="fill" />
              <p className="text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
                <strong>Zero-config default:</strong> Everything works without keys if the site admin has set environment variables. These settings let <em>you</em> bring your own.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* ─── Preferred Provider ─── */}
      <div className="space-y-2">
        <Label htmlFor="preferred-provider" className="text-sm font-medium">
          Default LLM Provider
        </Label>
        <Select
          value={draft.preferredProvider ?? ''}
          onValueChange={v => setDraft(prev => ({ ...prev, preferredProvider: v || undefined }))}
        >
          <SelectTrigger id="preferred-provider" className="w-full">
            <SelectValue placeholder="Auto-detect (first configured)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Auto-detect</SelectItem>
            {PROVIDERS.map(p => (
              <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Used by Ask AI, Study Mode, Enlighten Me, voice translation, and more.
        </p>
      </div>

      {/* ─── Per-Provider Configuration ─── */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Provider API Keys &amp; Endpoints</h3>
        <Accordion type="multiple" className="w-full">
          {PROVIDERS.map(provider => {
            const cfg = draft.providers[provider.id] ?? {};
            const keyFieldId = `${provider.id}-key`;
            const isVisible = showKeys[keyFieldId] ?? false;
            return (
              <AccordionItem key={provider.id} value={provider.id} className="border-b-0">
                <AccordionTrigger className="text-sm hover:no-underline">
                  <div className="flex items-center gap-2">
                    <span>{provider.label}</span>
                    {cfg.apiKey && (
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" title="Key configured" />
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-1">
                    <p className="text-xs text-muted-foreground">{provider.hint}</p>

                    {/* API Key */}
                    <div className="space-y-1">
                      <Label htmlFor={keyFieldId} className="text-xs">API Key</Label>
                      <div className="relative">
                        <Input
                          id={keyFieldId}
                          type={isVisible ? 'text' : 'password'}
                          placeholder={provider.keyPlaceholder}
                          value={cfg.apiKey ?? ''}
                          onChange={e => setProviderField(provider.id, 'apiKey', e.target.value)}
                          className="pr-10 font-mono text-xs"
                          autoComplete="off"
                        />
                        <button
                          type="button"
                          onClick={() => toggleKeyVisibility(keyFieldId)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          aria-label={isVisible ? 'Hide key' : 'Show key'}
                        >
                          {isVisible ? <EyeSlash size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* API URL */}
                    <div className="space-y-1">
                      <Label htmlFor={`${provider.id}-url`} className="text-xs">
                        API URL{provider.urlRequired ? <span className="text-red-500 ml-0.5">*</span> : ' (optional)'}
                      </Label>
                      <Input
                        id={`${provider.id}-url`}
                        placeholder={provider.defaultUrl || (provider.id === 'azure' ? 'https://YOUR-RESOURCE.openai.azure.com' : 'https://…')}
                        value={cfg.apiUrl ?? ''}
                        onChange={e => setProviderField(provider.id, 'apiUrl', e.target.value)}
                        className="text-xs"
                      />
                      {!provider.urlRequired && provider.defaultUrl && (
                        <p className="text-[11px] text-muted-foreground">Default: {provider.defaultUrl}</p>
                      )}
                      {provider.id === 'azure' && (
                        <p className="text-[11px] text-amber-600 dark:text-amber-400">Your Azure OpenAI resource endpoint is required.</p>
                      )}
                    </div>

                    {/* Model */}
                    <div className="space-y-1">
                      <Label htmlFor={`${provider.id}-model`} className="text-xs">
                        Model{provider.modelRequired ? <span className="text-red-500 ml-0.5">*</span> : ' (optional)'}
                      </Label>
                      <Input
                        id={`${provider.id}-model`}
                        placeholder={provider.modelPlaceholder}
                        value={cfg.model ?? ''}
                        onChange={e => setProviderField(provider.id, 'model', e.target.value)}
                        className="text-xs"
                      />
                      {!provider.modelRequired && (
                        <p className="text-[11px] text-muted-foreground">Default: {provider.modelPlaceholder}</p>
                      )}
                      {provider.id === 'azure' && (
                        <p className="text-[11px] text-amber-600 dark:text-amber-400">Enter your deployment name (not the base model name).</p>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      {/* ─── Backend URLs (collapsible, advanced) ─── */}
      {!compact && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="backends" className="border-b-0">
            <AccordionTrigger className="text-sm hover:no-underline">
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-muted-foreground" />
                <span>Backend URLs (advanced)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-xs text-muted-foreground mb-3">
                Only change these if you're running self-hosted backend services.
              </p>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="be-core" className="text-xs">Core API</Label>
                  <Input
                    id="be-core"
                    placeholder="http://localhost:8000"
                    value={draft.backends.coreApi ?? ''}
                    onChange={e => setBackendField('coreApi', e.target.value)}
                    className="text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="be-orch" className="text-xs">Orchestrator</Label>
                  <Input
                    id="be-orch"
                    placeholder="http://localhost:8002"
                    value={draft.backends.orchestrator ?? ''}
                    onChange={e => setBackendField('orchestrator', e.target.value)}
                    className="text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="be-ks" className="text-xs">Knowledge Service</Label>
                  <Input
                    id="be-ks"
                    placeholder="http://localhost:8003"
                    value={draft.backends.knowledgeService ?? ''}
                    onChange={e => setBackendField('knowledgeService', e.target.value)}
                    className="text-xs"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {/* ─── STT Preference ─── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Microphone size={16} className="text-muted-foreground" weight="fill" />
          <Label className="text-sm font-medium">Speech-to-Text Engine</Label>
        </div>
        <RadioGroup
          value={draft.sttPreference}
          onValueChange={v => setDraft(prev => ({ ...prev, sttPreference: v as SttPreference }))}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="auto" id="stt-auto" />
            <Label htmlFor="stt-auto" className="text-xs font-normal">Auto (Web Speech API → Whisper WASM fallback)</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="web-speech" id="stt-web" />
            <Label htmlFor="stt-web" className="text-xs font-normal">Web Speech API only (free, no download)</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="whisper-wasm" id="stt-whisper" />
            <Label htmlFor="stt-whisper" className="text-xs font-normal">Whisper WASM (local, ~40 MB model download)</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="openai-whisper" id="stt-openai" />
            <Label htmlFor="stt-openai" className="text-xs font-normal">OpenAI Whisper API (cloud, uses your API key)</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="azure-speech" id="stt-azure" />
            <Label htmlFor="stt-azure" className="text-xs font-normal">Azure Speech Services (cloud, enterprise)</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="deepgram" id="stt-deepgram" />
            <Label htmlFor="stt-deepgram" className="text-xs font-normal">Deepgram (cloud, real-time streaming)</Label>
          </div>
        </RadioGroup>

        {/* Cloud STT credential fields — shown when a cloud engine is selected */}
        {draft.sttPreference === 'openai-whisper' && (
          <div className="space-y-2 pl-6 border-l-2 border-primary/20">
            <p className="text-[11px] text-muted-foreground">Uses your OpenAI key from above, or set a dedicated one:</p>
            <div className="space-y-1">
              <Label htmlFor="stt-openai-key" className="text-xs">API Key (optional override)</Label>
              <Input
                id="stt-openai-key"
                type="password"
                placeholder="sk-… (falls back to OpenAI provider key)"
                value={draft.speechServices?.openaiSpeech?.apiKey ?? ''}
                onChange={e => setSpeechServiceField('openaiSpeech', 'apiKey', e.target.value)}
                className="text-xs font-mono"
              />
            </div>
          </div>
        )}
        {draft.sttPreference === 'azure-speech' && (
          <div className="space-y-2 pl-6 border-l-2 border-primary/20">
            <div className="space-y-1">
              <Label htmlFor="stt-azure-key" className="text-xs">Speech Service Key</Label>
              <Input
                id="stt-azure-key"
                type="password"
                placeholder="Your Azure Speech key"
                value={draft.speechServices?.azureSpeech?.apiKey ?? ''}
                onChange={e => setSpeechServiceField('azureSpeech', 'apiKey', e.target.value)}
                className="text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="stt-azure-region" className="text-xs">Region / Endpoint URL</Label>
              <Input
                id="stt-azure-region"
                placeholder="e.g. eastus or https://eastus.api.cognitive.microsoft.com"
                value={draft.speechServices?.azureSpeech?.apiUrl ?? ''}
                onChange={e => setSpeechServiceField('azureSpeech', 'apiUrl', e.target.value)}
                className="text-xs"
              />
            </div>
          </div>
        )}
        {draft.sttPreference === 'deepgram' && (
          <div className="space-y-2 pl-6 border-l-2 border-primary/20">
            <div className="space-y-1">
              <Label htmlFor="stt-dg-key" className="text-xs">Deepgram API Key</Label>
              <Input
                id="stt-dg-key"
                type="password"
                placeholder="Your Deepgram key"
                value={draft.speechServices?.deepgram?.apiKey ?? ''}
                onChange={e => setSpeechServiceField('deepgram', 'apiKey', e.target.value)}
                className="text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="stt-dg-model" className="text-xs">Model (optional)</Label>
              <Input
                id="stt-dg-model"
                placeholder="nova-2 (default)"
                value={draft.speechServices?.deepgram?.model ?? ''}
                onChange={e => setSpeechServiceField('deepgram', 'model', e.target.value)}
                className="text-xs"
              />
            </div>
          </div>
        )}
      </div>

      {/* ─── TTS Preference ─── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <SpeakerHigh size={16} className="text-muted-foreground" weight="fill" />
          <Label className="text-sm font-medium">Text-to-Speech Engine</Label>
        </div>
        <RadioGroup
          value={draft.ttsPreference}
          onValueChange={v => setDraft(prev => ({ ...prev, ttsPreference: v as TtsPreference }))}
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="browser" id="tts-browser" />
            <Label htmlFor="tts-browser" className="text-xs font-normal">Browser built-in (Web Speech Synthesis — free)</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="openai-tts" id="tts-openai" />
            <Label htmlFor="tts-openai" className="text-xs font-normal">OpenAI TTS (natural voices, uses your API key)</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="azure-speech" id="tts-azure" />
            <Label htmlFor="tts-azure" className="text-xs font-normal">Azure Speech Services (cloud, enterprise)</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="elevenlabs" id="tts-eleven" />
            <Label htmlFor="tts-eleven" className="text-xs font-normal">ElevenLabs (ultra-realistic voices)</Label>
          </div>
        </RadioGroup>

        {/* Cloud TTS credential fields */}
        {draft.ttsPreference === 'openai-tts' && (
          <div className="space-y-2 pl-6 border-l-2 border-primary/20">
            <p className="text-[11px] text-muted-foreground">Uses your OpenAI key from above, or set a dedicated one:</p>
            <div className="space-y-1">
              <Label htmlFor="tts-openai-key" className="text-xs">API Key (optional override)</Label>
              <Input
                id="tts-openai-key"
                type="password"
                placeholder="sk-… (falls back to OpenAI provider key)"
                value={draft.speechServices?.openaiSpeech?.apiKey ?? ''}
                onChange={e => setSpeechServiceField('openaiSpeech', 'apiKey', e.target.value)}
                className="text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tts-openai-voice" className="text-xs">Voice (optional)</Label>
              <Select
                value={draft.speechServices?.openaiSpeech?.voiceId ?? ''}
                onValueChange={v => setSpeechServiceField('openaiSpeech', 'voiceId', v)}
              >
                <SelectTrigger id="tts-openai-voice" className="w-full text-xs">
                  <SelectValue placeholder="alloy (default)" />
                </SelectTrigger>
                <SelectContent>
                  {['alloy', 'ash', 'coral', 'echo', 'fable', 'nova', 'onyx', 'sage', 'shimmer'].map(v => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="tts-openai-model" className="text-xs">Model (optional)</Label>
              <Select
                value={draft.speechServices?.openaiSpeech?.model ?? ''}
                onValueChange={v => setSpeechServiceField('openaiSpeech', 'model', v)}
              >
                <SelectTrigger id="tts-openai-model" className="w-full text-xs">
                  <SelectValue placeholder="tts-1 (default)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tts-1">tts-1 (fast)</SelectItem>
                  <SelectItem value="tts-1-hd">tts-1-hd (high quality)</SelectItem>
                  <SelectItem value="gpt-4o-mini-tts">gpt-4o-mini-tts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        {draft.ttsPreference === 'azure-speech' && (
          <div className="space-y-2 pl-6 border-l-2 border-primary/20">
            <p className="text-[11px] text-muted-foreground">Reuses your Azure Speech credentials from STT above if configured.</p>
            <div className="space-y-1">
              <Label htmlFor="tts-azure-key" className="text-xs">Speech Service Key</Label>
              <Input
                id="tts-azure-key"
                type="password"
                placeholder="Your Azure Speech key"
                value={draft.speechServices?.azureSpeech?.apiKey ?? ''}
                onChange={e => setSpeechServiceField('azureSpeech', 'apiKey', e.target.value)}
                className="text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tts-azure-region2" className="text-xs">Region / Endpoint URL</Label>
              <Input
                id="tts-azure-region2"
                placeholder="e.g. eastus"
                value={draft.speechServices?.azureSpeech?.apiUrl ?? ''}
                onChange={e => setSpeechServiceField('azureSpeech', 'apiUrl', e.target.value)}
                className="text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tts-azure-voice" className="text-xs">Voice name (optional)</Label>
              <Input
                id="tts-azure-voice"
                placeholder="en-US-JennyNeural"
                value={draft.speechServices?.azureSpeech?.voiceId ?? ''}
                onChange={e => setSpeechServiceField('azureSpeech', 'voiceId', e.target.value)}
                className="text-xs"
              />
            </div>
          </div>
        )}
        {draft.ttsPreference === 'elevenlabs' && (
          <div className="space-y-2 pl-6 border-l-2 border-primary/20">
            <div className="space-y-1">
              <Label htmlFor="tts-11-key" className="text-xs">ElevenLabs API Key</Label>
              <Input
                id="tts-11-key"
                type="password"
                placeholder="Your ElevenLabs key"
                value={draft.speechServices?.elevenlabs?.apiKey ?? ''}
                onChange={e => setSpeechServiceField('elevenlabs', 'apiKey', e.target.value)}
                className="text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tts-11-voice" className="text-xs">Voice ID (optional)</Label>
              <Input
                id="tts-11-voice"
                placeholder="Default voice if empty"
                value={draft.speechServices?.elevenlabs?.voiceId ?? ''}
                onChange={e => setSpeechServiceField('elevenlabs', 'voiceId', e.target.value)}
                className="text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tts-11-model" className="text-xs">Model (optional)</Label>
              <Input
                id="tts-11-model"
                placeholder="eleven_multilingual_v2"
                value={draft.speechServices?.elevenlabs?.model ?? ''}
                onChange={e => setSpeechServiceField('elevenlabs', 'model', e.target.value)}
                className="text-xs"
              />
            </div>
          </div>
        )}
      </div>

      {/* ─── Legal Disclaimer ─── */}
      <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-950/30 p-3 space-y-2">
        <div className="flex items-center gap-2">
          <Scales size={16} className="text-amber-600 dark:text-amber-400 flex-shrink-0" weight="fill" />
          <p className="text-xs font-medium text-amber-800 dark:text-amber-200">Legal Notice — API Key Usage</p>
        </div>
        <ul className="text-[11px] text-amber-700 dark:text-amber-300 leading-relaxed space-y-1 pl-6 list-disc">
          <li>
            <strong>Your responsibility.</strong> You are solely responsible for all costs, billing, and usage
            incurred through the third-party APIs you configure here (OpenAI, Azure, Google, Anthropic,
            HuggingFace, OpenRouter, ElevenLabs, Deepgram, etc.).
          </li>
          <li>
            <strong>No warranty.</strong> Open Agent School provides no warranty regarding the availability,
            accuracy, or security of any third-party API service.
          </li>
          <li>
            <strong>Data disclosure.</strong> Prompts, documents, and inputs you submit may be processed,
            stored, or used by the API provider per their terms of service and privacy policy.
          </li>
          <li>
            <strong>Client-side exposure.</strong> Keys entered here are stored in your browser's
            localStorage and sent directly to the provider. They are never sent to Open Agent School,
            but they <em>are</em> accessible to browser extensions and other scripts on this page.
          </li>
        </ul>
        <div className="flex items-start gap-1.5 mt-1">
          <Warning size={12} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" weight="fill" />
          <p className="text-[10px] text-amber-600 dark:text-amber-400">
            By saving settings below, you acknowledge that you have read and agree to the{' '}
            <a
              href="https://github.com/bhakthan/OpenAgentSchool/blob/main/API_KEYS_DISCLAIMER.md"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-amber-800 dark:hover:text-amber-200 font-medium"
            >
              full API Keys Disclaimer
            </a>{' '}
            and each provider's terms of service.
          </p>
        </div>
      </div>

      {/* ─── Action Buttons ─── */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
        <Button onClick={handleSave} size="sm" className="gap-1.5">
          <FloppyDisk size={14} /> Save Settings
        </Button>
        <Button onClick={handleClear} variant="destructive" size="sm" className="gap-1.5" disabled={!isCustom}>
          <Trash size={14} /> Clear All
        </Button>
        <div className="flex-1" />
        <Button onClick={handleExport} variant="outline" size="sm" className="gap-1.5" disabled={!isCustom}>
          <Download size={14} /> Export
        </Button>
        <Button onClick={() => fileRef.current?.click()} variant="outline" size="sm" className="gap-1.5">
          <Upload size={14} /> Import
        </Button>
        <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
      </div>
    </div>
  );
};
