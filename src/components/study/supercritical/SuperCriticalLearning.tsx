import React, { useRef, useState } from 'react';
import { jsonrepair } from 'jsonrepair';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Target, Lightning, Copy, Printer, Brain, Question, CaretDown, CaretUp, ShieldWarning, Timer, Stack, Scales } from '@phosphor-icons/react';
import { SCLControls } from './SCLControls';
import { Badge } from '@/components/ui/badge';
import { ShareButton } from '@/components/ui/ShareButton';
import { z } from 'zod';
import type { SCLMode } from '@/types/supercritical';
import { callLlmWithMessages, type LlmProvider, type LlmMessage } from '@/lib/llm';
import { getFirstAvailableProvider } from '@/lib/config';
import { loadSettings } from '@/lib/userSettings';

interface SuperCriticalLearningProps {
  onBack?: () => void;
  concept?: string;
  pattern?: string;
}

function SuperCriticalLearning({ 
  onBack
}: SuperCriticalLearningProps) {
  const [selectedMode, setSelectedMode] = useState<SCLMode | null>(null);
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [analysisSeeds, setAnalysisSeeds] = useState<any>(null);
  const [analysisStep, setAnalysisStep] = useState<'first-order' | 'higher-order' | 'synthesis' | 'complete'>('first-order');
  const [firstOrderEffects, setFirstOrderEffects] = useState<any[]>([]);
  const [higherOrderEffects, setHigherOrderEffects] = useState<any[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [leaps, setLeaps] = useState<any[]>([]);
  const [synthesis, setSynthesis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const printableRef = useRef<HTMLDivElement | null>(null);
  const [showIntro, setShowIntro] = useState<boolean>(false);
  // Per-section loading flags to avoid hiding earlier content during step transitions
  const [loadingFirst, setLoadingFirst] = useState(false);
  const [loadingHigher, setLoadingHigher] = useState(false);
  const [loadingSynth, setLoadingSynth] = useState(false);
  // Validation error buckets per section
  const [validationErrors, setValidationErrors] = useState<{ first: string[]; higher: string[]; synthesis: string[] }>({ first: [], higher: [], synthesis: [] });

  // Zod schemas (tiny) for runtime validation
  const EffectSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(3, 'title must be at least 3 chars'),
    order: z.number().int().min(1).max(3),
    domain: z.enum(['ops', 'product', 'security', 'org', 'cost', 'perf']),
    likelihood: z.number().min(0).max(1),
    impact: z.number().int().min(1).max(5),
    justification: z.string().optional(),
    confidence: z.number().min(0).max(1),
    timeframe: z.string().optional(),
  });
  const FirstResponseSchema = z.object({ effects: z.array(EffectSchema) });
  const HigherResponseSchema = z.object({
    effects: z.array(EffectSchema),
    connections: z.array(z.object({
      from: z.string().min(1),
      to: z.string().min(1),
      mechanism: z.string().min(1),
      confidence: z.number().min(0).max(1)
    })).default([]),
    leaps: z.array(z.object({
      trigger: z.string().min(1),
      threshold: z.string().min(1),
      result: z.string().min(1),
      confidence: z.number().min(0).max(1)
    })).default([])
  });
  const SynthesisSchema = z.object({
    insights: z.array(z.string()).default([]),
    recommendations: z.array(z.string()).default([]),
    risks: z.array(z.string()).default([]),
  });

  // Build a structured text snapshot of the seeds and all response sections
  const buildAnalysisText = () => {
    const lines: string[] = [];
    lines.push(`Super Critical Learning Analysis`);
    lines.push(`Mode: ${selectedMode ?? ''}`);
    lines.push('');
    lines.push('Analysis Seeds');
    lines.push(`- Concepts: ${analysisSeeds?.conceptIds?.join(', ') || 'None'}`);
    lines.push(`- Patterns: ${analysisSeeds?.patternIds?.join(', ') || 'None'}`);
    lines.push(`- Practices: ${analysisSeeds?.practices?.join(', ') || 'None'}`);
    lines.push('');

    if (firstOrderEffects?.length) {
      lines.push('First-Order Effects');
      firstOrderEffects.forEach((e: any) => {
        lines.push(`• ${e.title} ${e.id ? `(${e.id})` : ''}`.trim());
        lines.push(`  - domain: ${e.domain} | impact: ${e.impact} | likelihood: ${e.likelihood} | confidence: ${e.confidence}`);
        if (e.justification) lines.push(`  - why: ${e.justification}`);
      });
      lines.push('');
    }

    if (higherOrderEffects?.length) {
      lines.push('Higher-Order Effects (2nd/3rd)');
      higherOrderEffects.forEach((e: any) => {
        lines.push(`• ${e.title} ${e.id ? `(${e.id})` : ''}`.trim());
        lines.push(`  - order: ${e.order} | domain: ${e.domain} | impact: ${e.impact} | likelihood: ${e.likelihood} | confidence: ${e.confidence}${e.timeframe ? ` | timeframe: ${e.timeframe}` : ''}`);
        if (e.justification) lines.push(`  - mechanism: ${e.justification}`);
      });
      lines.push('');
    }

    if (connections?.length) {
      lines.push('Connections');
      connections.forEach((c: any) => {
        lines.push(`• ${c.from} → ${c.to}`);
        if (c.mechanism) lines.push(`  - mechanism: ${c.mechanism}`);
        if (typeof c.confidence === 'number') lines.push(`  - confidence: ${c.confidence}`);
      });
      lines.push('');
    }

    if (leaps?.length) {
      lines.push('Leaps');
      leaps.forEach((l: any) => {
        lines.push(`• ${l.result}`);
        if (l.trigger) lines.push(`  - trigger: ${l.trigger}`);
        if (l.threshold) lines.push(`  - threshold: ${l.threshold}`);
        if (typeof l.confidence === 'number') lines.push(`  - confidence: ${l.confidence}`);
      });
      lines.push('');
    }

    if (synthesis) {
      lines.push('Synthesis');
      if (synthesis.insights?.length) {
        lines.push('Insights:');
        synthesis.insights.forEach((i: string) => lines.push(`• ${i}`));
      }
      if (synthesis.recommendations?.length) {
        lines.push('Recommendations:');
        synthesis.recommendations.forEach((r: string) => lines.push(`• ${r}`));
      }
      if (synthesis.risks?.length) {
        lines.push('Risks:');
        synthesis.risks.forEach((r: string) => lines.push(`• ${r}`));
      }
    }

    return lines.join('\n');
  };

  const handleCopy = async () => {
    try {
      const text = buildAnalysisText();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // Fallback: try selecting the printable area
      if (printableRef.current) {
        const range = document.createRange();
        range.selectNodeContents(printableRef.current);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
        try { document.execCommand('copy'); } catch {}
        sel?.removeAllRanges();
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const parseJSONResponse = (responseText: string) => {
    try {
      // First, try direct parsing after stripping common code fences
      // Handle markdown code blocks with optional language specifier and surrounding whitespace
      const stripped = responseText
        .trim()
        .replace(/^```(?:json|javascript|js)?\s*/i, '')
        .replace(/\s*```\s*$/i, '')
        .trim();
      return JSON.parse(stripped);
    } catch (error) {
      // Attempt robust repair and parse
      try {
        // Strip code fences before repair too
        const cleaned = responseText
          .trim()
          .replace(/^```(?:json|javascript|js)?\s*/i, '')
          .replace(/\s*```\s*$/i, '')
          .trim();
        const repaired = jsonrepair(cleaned);
        return JSON.parse(repaired);
      } catch (repairErr) {
        // As a last resort, try extracting the largest JSON object and repairing that
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const repaired = jsonrepair(jsonMatch[0]);
          return JSON.parse(repaired);
        }
        throw new Error('No valid JSON found in response');
      }
    }
  };

  // Helper: truncate long titles to avoid UI overflow
  const truncate = (text: string, max = 120) =>
    typeof text === 'string' && text.length > max ? text.slice(0, max - 1) + '…' : text;

  // Basic normalization helpers
  const allowedDomains = new Set(['ops', 'product', 'security', 'org', 'cost', 'perf']);
  const clamp01 = (n: any, def = 0.7) => {
    const v = typeof n === 'number' ? n : parseFloat(n);
    if (Number.isFinite(v)) return Math.max(0, Math.min(1, v));
    return def;
  };
  const clampInt = (n: any, min: number, max: number, def = min) => {
    const v = typeof n === 'number' ? n : parseInt(n, 10);
    if (Number.isFinite(v)) return Math.max(min, Math.min(max, Math.round(v)));
    return def;
  };

  // Fallback generator for recommendations/risks when synthesis omits them
  const buildFallbackSynth = (allEffects: any[], conns: any[], leapsArr: any[]) => {
    const highImpact = allEffects
      .slice()
      .sort((a, b) => (b.impact || 0) - (a.impact || 0))
      .slice(0, 2)
      .map(e => `${e.domain || 'ops'}: ${truncate(e.title || '', 60)}`);
    const hasLeaps = (leapsArr || []).length > 0;
    const hasConnections = (conns || []).length > 0;

    const recommendations = [
      'Establish progressive delivery (canary releases + automated rollback) to reduce MTTR and contain higher-order regressions.',
      'Expand counterfactual and constraint-perturbation tests across critical services; gate merges on high-severity failures.',
      'Instrument key signals (defect rate, MTTR, vuln detections) with SLOs and alerts; review weekly to drive improvements.'
    ];
    if (highImpact.length) {
      recommendations.push(`Prioritize remediation on highest-impact areas: ${highImpact.join('; ')}.`);
    }

    const risks = [
      'Alert fatigue from weak-signal harvesting leading to ignored incidents; mitigate with tuning and deduplication.',
      'Tooling complexity and cost creep; enforce platform standards and measure value vs. spend.',
      'Unvalidated assumptions from model outputs; require empirical checks before operational changes.'
    ];
    if (hasLeaps) risks.push('Discontinuous “leaps” can cascade; add kill-switches and circuit breakers for rapid containment.');
    if (hasConnections) risks.push('Hidden couplings amplify impact; map critical dependencies and add isolation patterns.');

    return {
      recommendations: recommendations.slice(0, 5),
      risks: risks.slice(0, 5)
    };
  };

  const SYSTEM_JSON_ONLY = 'You are an analysis engine. Respond with ONLY raw JSON. NEVER use markdown code fences (```). NEVER include explanatory text. Start your response with { and end with }. Output must be valid minified JSON matching the schema exactly.';

  /** Resolve LLM provider from user settings (BYOK) — same logic as SCLOrchestrator. */
  const resolveLlmProvider = (): LlmProvider => {
    try {
      const settings = loadSettings();
      if (settings.preferredProvider && settings.preferredProvider !== 'auto') {
        return settings.preferredProvider as LlmProvider;
      }
      return (getFirstAvailableProvider() || 'openrouter') as LlmProvider;
    } catch {
      return 'openrouter';
    }
  };

  /** Call the unified LLM layer with the user's configured provider. */
  const callSCLApi = async (prompt: string, opts?: { temperature?: number; maxTokens?: number }): Promise<string> => {
    const provider = resolveLlmProvider();
    const messages: LlmMessage[] = [
      { role: 'system', content: SYSTEM_JSON_ONLY },
      { role: 'user', content: prompt },
    ];
    console.log(`SCL calling provider: ${provider}`);
    const result = await callLlmWithMessages(messages, provider, {
      temperature: opts?.temperature ?? (selectedMode === 'consolidate' ? 0.2 : 0.5),
      maxTokens: opts?.maxTokens ?? 1000,
      responseFormat: 'json',
    });
    const content = result.content;
    if (!content || content.trim() === '') {
      throw new Error('LLM returned empty content');
    }
    return content;
  };

  // helper to collect zod error messages
  const extractZodErrors = (err: unknown): string[] => {
    try {
      const e = err as any;
      if (e?.issues) {
        return e.issues.map((i: any) => `${(i.path || []).join('.') || 'root'}: ${i.message}`);
      }
      if (e?.errors) {
        return e.errors.map((i: any) => `${(i.path || []).join('.') || 'root'}: ${i.message}`);
      }
    } catch {}
    return ['Invalid response shape'];
  };

  const generateFirstOrderEffects = async (seeds: any) => {
  setIsLoading(true);
  setLoadingFirst(true);
    setAnalysisStep('first-order');
    
    const prompt = `You are an expert systems analyst. Generate first-order effects from these seeds using ${selectedMode} analysis.

INPUT SEEDS:
- Concepts: ${seeds.conceptIds?.join(', ') || 'None'}
- Patterns: ${seeds.patternIds?.join(', ') || 'None'}  
- Practices: ${seeds.practices?.join(', ') || 'None'}

INSTRUCTIONS:
1. Analyze the immediate, direct effects that would result from implementing these seeds
2. Focus on measurable, observable outcomes within the first few weeks/months
3. Consider impacts across operational, product, security, organizational, cost, and performance domains

RESPONSE FORMAT:
Return ONLY a valid JSON object in this EXACT structure (no additional text, no markdown, no comments):

{
  "effects": [
    {
      "id": "effect_1_1",
      "title": "Clear, specific effect description",
      "order": 1,
      "domain": "ops",
      "likelihood": 0.85,
      "impact": 3,
      "justification": "Brief explanation of why this effect occurs",
      "confidence": 0.9
    }
  ]
}

IMPORTANT: 
- domain must be one of: ops, product, security, org, cost, perf
- likelihood and confidence are decimals between 0.0 and 1.0
- impact is integer between 1 and 5
- Generate 3-5 effects maximum
- Ensure all JSON is properly quoted and formatted`;

    try {
      const response = await callSCLApi(prompt);
      const parsed = parseJSONResponse(response);
      const v = FirstResponseSchema.safeParse(parsed);
      if (!v.success) {
        const msgs = extractZodErrors(v.error);
        setValidationErrors(prev => ({ ...prev, first: msgs }));
      } else {
        setValidationErrors(prev => ({ ...prev, first: [] }));
      }
      // Ensure stable IDs for first-order effects
      const normalizedFirstOrder = ((parsed.effects as any[]) || []).map((e: any, idx: number) => ({
        ...e,
        id: e?.id || `effect_1_${idx + 1}`,
        order: 1,
        domain: allowedDomains.has(e?.domain) ? e.domain : 'ops',
        likelihood: clamp01(e?.likelihood, 0.7),
        impact: clampInt(e?.impact, 1, 5, 2),
        confidence: clamp01(e?.confidence, 0.75),
      }));
      setFirstOrderEffects(normalizedFirstOrder);
      setIsLoading(false);
      setLoadingFirst(false);
      // Auto-proceed to higher-order with normalized IDs
      setTimeout(() => generateHigherOrderEffects(normalizedFirstOrder), 1000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setFirstOrderEffects([{ 
        id: 'error', 
        title: 'Error generating first-order effects', 
        order: 1, 
        domain: 'ops', 
        likelihood: 0, 
        impact: 0, 
        justification: errorMessage, 
        confidence: 0 
      }]);
  setIsLoading(false);
  setLoadingFirst(false);
  setValidationErrors(prev => ({ ...prev, first: [errorMessage] }));
    }
  };

  const generateHigherOrderEffects = async (firstOrder: any[]) => {
  setIsLoading(true);
  setLoadingHigher(true);
    setAnalysisStep('higher-order');
    
  const prompt = `You are an expert systems analyst. Based on the FIRST-ORDER effects, generate SECOND and THIRD order cascading effects with explicit linkages and possible discontinuous leaps.

FIRST-ORDER EFFECTS (INPUT):
${firstOrder.map(e => `- id:${e.id || 'effect_1_x'} | title:${e.title} | domain:${e.domain} | impact:${e.impact}`).join('\n')}

INSTRUCTIONS:
1) Create 2nd and 3rd order effects that plausibly emerge from the first-order set.
2) Each generated effect MUST include: id, title, order (2 or 3), domain, likelihood (0.0-1.0), impact (1-5), justification, confidence (0.0-1.0), timeframe.
3) Provide CONNECTIONS that link causes to effects via IDs with a clear mechanism and confidence.
4) Optionally provide LEAPS that capture discontinuous changes (trigger, threshold, result, confidence).
5) Keep domains to one of: ops, product, security, org, cost, perf.
6) Keep counts modest: 2-4 total effects across orders 2 and 3, 2-5 connections, 0-2 leaps.

CONNECTION ID SCHEMA REMINDER:
- from: MUST reference first-order IDs in the form effect_1_x (e.g., effect_1_1).
- to: MUST reference newly generated effect IDs in the form effect_2_x or effect_3_x.

STRICT OUTPUT FORMAT:
Return ONLY a valid JSON object. No extra text, no markdown, no comments.
{
  "effects": [
    {
      "id": "effect_2_1",
      "title": "Specific second-order effect",
      "order": 2,
      "domain": "ops",
      "likelihood": 0.7,
      "impact": 2,
      "justification": "Explain how it emerges from first-order effects",
      "confidence": 0.8,
      "timeframe": "1-3 months"
    }
  ],
  "connections": [
    {
  "from": "effect_1_1",
  "to": "effect_2_1",
      "mechanism": "Causal mechanism from from->to",
      "confidence": 0.8
    }
  ],
  "leaps": [
    {
      "trigger": "What causes discontinuity",
      "threshold": "At what point",
      "result": "Qualitative change",
      "confidence": 0.7
    }
  ]
}`;

    try {
      let parsed: any;
      try {
        const response = await callSCLApi(prompt, { temperature: 0.2, maxTokens: 1200 });
        parsed = parseJSONResponse(response);
      } catch (firstErr) {
        // Retry with stricter skeleton
        const fallbackPrompt = `${prompt}\n\nReturn ONLY this exact JSON shape (fill arrays if empty): {"effects":[],"connections":[],"leaps":[]}`;
        const response2 = await callSCLApi(fallbackPrompt, { temperature: 0.1, maxTokens: 800 });
        parsed = parseJSONResponse(response2);
      }
      const v = HigherResponseSchema.safeParse(parsed);
      if (!v.success) {
        const msgs = extractZodErrors(v.error);
        setValidationErrors(prev => ({ ...prev, higher: msgs }));
      } else {
        setValidationErrors(prev => ({ ...prev, higher: [] }));
      }
      const effects = Array.isArray(parsed.effects) ? parsed.effects : [];
      const second = effects.filter((e: any) => Number(e?.order) === 2);
      const third = effects.filter((e: any) => Number(e?.order) === 3);
      const norm2 = second.map((e: any, i: number) => ({
        ...e,
        id: e?.id || `effect_2_${i + 1}`,
        order: 2,
        domain: allowedDomains.has(e?.domain) ? e.domain : 'ops',
        likelihood: clamp01(e?.likelihood, 0.65),
        impact: clampInt(e?.impact, 1, 5, 2),
        confidence: clamp01(e?.confidence, 0.7),
        timeframe: e?.timeframe || '1-3 months',
      }));
      const norm3 = third.map((e: any, i: number) => ({
        ...e,
        id: e?.id || `effect_3_${i + 1}`,
        order: 3,
        domain: allowedDomains.has(e?.domain) ? e.domain : 'ops',
        likelihood: clamp01(e?.likelihood, 0.55),
        impact: clampInt(e?.impact, 1, 5, 3),
        confidence: clamp01(e?.confidence, 0.6),
        timeframe: e?.timeframe || '3-12 months',
      }));
      const normalizedHigher = [...norm2, ...norm3];

      const firstIds = new Set(firstOrder.map((e: any) => e.id));
      const higherIds = new Set(normalizedHigher.map((e: any) => e.id));
      const normalizedConnections = (Array.isArray(parsed.connections) ? parsed.connections : [])
        .map((c: any) => ({
          from: String(c?.from || ''),
          to: String(c?.to || ''),
          mechanism: c?.mechanism || '',
          confidence: clamp01(c?.confidence, 0.7),
        }))
        .filter((c: any) => firstIds.has(c.from) && higherIds.has(c.to));

      const normalizedLeaps = (Array.isArray(parsed.leaps) ? parsed.leaps : []).map((l: any) => ({
        trigger: l?.trigger || '',
        threshold: l?.threshold || '',
        result: l?.result || '',
        confidence: clamp01(l?.confidence, 0.6),
      }));

      setHigherOrderEffects(normalizedHigher);
      setConnections(normalizedConnections);
      setLeaps(normalizedLeaps);
      setIsLoading(false);
      setLoadingHigher(false);
      // Auto-proceed to synthesis
      setTimeout(() => generateSynthesis([...firstOrder, ...normalizedHigher]), 1000);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error occurred';
      // Proceed to synthesis with only first-order effects
      setHigherOrderEffects([]);
      setConnections([]);
      setLeaps([]);
      setIsLoading(false);
      setLoadingHigher(false);
      setValidationErrors(prev => ({ ...prev, higher: [msg, 'Proceeding to synthesis without higher-order results.'] }));
      setTimeout(() => generateSynthesis([...firstOrder]), 300);
    }
  };

  const generateSynthesis = async (allEffects: any[]) => {
  setIsLoading(true);
  setLoadingSynth(true);
    setAnalysisStep('synthesis');
    
  const prompt = `Synthesize insights and recommendations from this effect analysis:

All Effects:
${allEffects.map(e => `- ${e.title} (Order ${e.order}, Impact: ${e.impact})`).join('\n')}

Connections: ${connections.length} effect relationships
Leaps: ${leaps.length} discontinuous changes

Return ONLY valid JSON with non-empty arrays. Provide 3-5 items for insights, recommendations, and risks (never return empty arrays). Keep items concise and actionable:
{
  "insights": [
    "Key insight 1",
    "Key insight 2"
  ],
  "recommendations": [
  "Actionable recommendation 1 (who/what + expected effect)",
  "Actionable recommendation 2 (who/what + expected effect)"
  ],
  "risks": [
  "Risk factor 1 (why it matters + mitigation cue)",
  "Risk factor 2 (why it matters + mitigation cue)"
  ]
}`;

    try {
      const response = await callSCLApi(prompt, { temperature: 0.2, maxTokens: 800 });
      const parsed = parseJSONResponse(response);
      const v = SynthesisSchema.safeParse(parsed);
      if (!v.success) {
        const msgs = extractZodErrors(v.error);
        setValidationErrors(prev => ({ ...prev, synthesis: msgs }));
      } else {
        setValidationErrors(prev => ({ ...prev, synthesis: [] }));
      }
      // Ensure recommendations and risks are populated; if empty, fill with sensible defaults
      const insights = Array.isArray((parsed as any).insights) ? (parsed as any).insights : [];
      let recommendations = Array.isArray((parsed as any).recommendations) ? (parsed as any).recommendations : [];
      let risks = Array.isArray((parsed as any).risks) ? (parsed as any).risks : [];
      const needRec = recommendations.length === 0;
      const needRisk = risks.length === 0;
      if (needRec || needRisk) {
        const filled = buildFallbackSynth(allEffects, connections, leaps);
        if (needRec) recommendations = filled.recommendations;
        if (needRisk) risks = filled.risks;
        setValidationErrors(prev => ({ ...prev, synthesis: [...(prev.synthesis || []), 'Filled empty recommendations/risks with defaults.'] }));
      }
      setSynthesis({ insights, recommendations, risks });
  setAnalysisStep('complete');
  setIsLoading(false);
  setLoadingSynth(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setSynthesis({ 
        insights: ['Error generating synthesis'], 
        recommendations: ['Check API configuration and try again'], 
        risks: [errorMessage] 
      });
  setAnalysisStep('complete');
  setIsLoading(false);
  setLoadingSynth(false);
  setValidationErrors(prev => ({ ...prev, synthesis: [errorMessage] }));
    }
  };

  const handleStartSession = async (seeds: any) => {
    setAnalysisSeeds(seeds);
    setAnalysisStarted(true);
    
    // Reset all state
    setFirstOrderEffects([]);
    setHigherOrderEffects([]);
    setConnections([]);
    setLeaps([]);
    setSynthesis(null);
  setValidationErrors({ first: [], higher: [], synthesis: [] });
    
    // Start the orchestration with the seeds
    await generateFirstOrderEffects(seeds);
  };



  // If analysis has started, show analysis interface
  if (analysisStarted && analysisSeeds) {
    return (
      <div className="scl-flat-ui min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between print:mb-0">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setAnalysisStarted(false);
                  setAnalysisSeeds(null);
                }}
                className="flex items-center gap-2 print:hidden"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Inputs
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Super Critical Learning</h1>
                <p className="text-muted-foreground">Analysis Results: {selectedMode}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 print:hidden">
              <ShareButton
                url={`${window.location.origin}/study-mode?tab=scl`}
                title="Super Critical Learning (SCL) - Study Mode"
                description="Deep analysis of cascading effects and second-order thinking for agentic systems"
                variant="outline"
                size="sm"
                analyticsCategory="Study Mode SCL Share"
              />
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                <Copy className="h-4 w-4" /> {copied ? 'Copied' : 'Copy Analysis'}
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
                <Printer className="h-4 w-4" /> Print PDF
              </Button>
              <Button variant="outline" size="sm" onClick={() => {
                try {
                  const exportPayload = {
                    mode: selectedMode,
                    seeds: analysisSeeds,
                    firstOrderEffects,
                    higherOrderEffects,
                    connections,
                    leaps,
                    synthesis,
                    generatedAt: new Date().toISOString(),
                  };
                  const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'scl-analysis.json';
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  URL.revokeObjectURL(url);
                } catch {}
              }} className="gap-2">
                Export JSON
              </Button>
            </div>
          </div>
          
          <div ref={printableRef} className="grid gap-6">
            {/* SCL 3-Step Orchestration Process Primer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  3-Step SCL Orchestration Process
                </CardTitle>
                <CardDescription>
                  Super Critical Learning uses a systematic 3-step analysis to reveal cascading effects and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-muted text-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-medium">First-Order Effects</h4>
                      <p className="text-sm text-muted-foreground">Direct, immediate consequences that emerge directly from your seeds. These are the obvious, measurable effects.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-muted text-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-medium">Higher-Order Effects</h4>
                      <p className="text-sm text-muted-foreground">Cascading consequences that emerge from first-order effects. Includes connections between effects and potential discontinuous leaps.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-muted text-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-medium">Synthesis</h4>
                      <p className="text-sm text-muted-foreground">Strategic insights, actionable recommendations, and risk factors derived from the complete effect analysis.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Seeds Description */}
            <Card>
              <CardHeader>
                <CardTitle>Analysis Seeds</CardTitle>
                <CardDescription>
                  The foundational elements used to generate your SCL analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">CONCEPTS</h4>
                    <div className="space-y-1">
                      {analysisSeeds.conceptIds?.map((concept: string, i: number) => (
                        <div key={i} className="px-3 py-2 rounded-lg bg-muted/40 dark:bg-muted/30 border border-border">
                          <p className="font-medium">{concept}</p>
                          <p className="text-xs text-muted-foreground">Core concept driving analysis</p>
                        </div>
                      )) || <p className="text-sm text-muted-foreground">None selected</p>}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">PATTERNS</h4>
                    <div className="space-y-1">
                      {analysisSeeds.patternIds?.map((pattern: string, i: number) => (
                        <div key={i} className="px-3 py-2 rounded-lg bg-muted/40 dark:bg-muted/30 border border-border">
                          <p className="font-medium">{pattern}</p>
                          <p className="text-xs text-muted-foreground">Structural pattern being analyzed</p>
                        </div>
                      )) || <p className="text-sm text-muted-foreground">None selected</p>}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">PRACTICES</h4>
                    <div className="space-y-1">
                      {analysisSeeds.practices?.map((practice: string, i: number) => (
                        <div key={i} className="px-3 py-2 rounded-lg bg-muted/40 dark:bg-muted/30 border border-border">
                          <p className="font-medium">{practice}</p>
                          <p className="text-xs text-muted-foreground">Implementation practice</p>
                        </div>
                      )) || <p className="text-sm text-muted-foreground">None selected</p>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>SCL Orchestration Progress</CardTitle>
                <div className="flex gap-2 mt-2">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${analysisStep === 'first-order' ? 'bg-blue-500 text-white' : firstOrderEffects.length > 0 ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                    1. First-Order
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${analysisStep === 'higher-order' ? 'bg-blue-500 text-white' : higherOrderEffects.length > 0 ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                    2. Higher-Order
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${analysisStep === 'synthesis' ? 'bg-blue-500 text-white' : synthesis ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground'}`}>
                    3. Synthesis
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                  <div className="space-y-6">
                    {(loadingFirst || loadingHigher || loadingSynth) && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        <span>
                          {loadingFirst && 'Generating first-order effects…'}
                          {loadingHigher && !loadingFirst && 'Generating higher-order effects…'}
                          {loadingSynth && !loadingFirst && !loadingHigher && 'Generating synthesis…'}
                        </span>
                      </div>
                    )}
                    
                    {/* First-Order Effects */}
                    {(firstOrderEffects.length > 0 || loadingFirst) && (
                      <div>
                        <h4 className="font-medium mb-3">First-Order Effects (Immediate)</h4>
                        {validationErrors.first.length > 0 && (
                          <div className="p-3 rounded mb-2 text-xs bg-muted/40 dark:bg-muted/30 border border-border text-foreground">
                            Validation issues:
                            <ul className="list-disc ml-4">
                              {validationErrors.first.slice(0, 4).map((m, i) => (
                                <li key={i}>{m}</li>
                              ))}
                              {validationErrors.first.length > 4 && <li>+{validationErrors.first.length - 4} more…</li>}
                            </ul>
                          </div>
                        )}
                        {loadingFirst && firstOrderEffects.length === 0 ? (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>Generating…</div>
                        ) : (
                          <div className="space-y-2">
                            {firstOrderEffects.map((effect, i) => (
                              <div key={i} className="p-3 rounded-lg bg-card border border-border">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <p className="font-medium">{truncate(effect.title, 120)}</p>
                                      <Badge variant="secondary" className="text-[10px] h-5">order {effect.order ?? 1}</Badge>
                                      {effect.id && (
                                        <Badge variant="outline" className="text-[10px] h-5">{effect.id}</Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">{effect.justification}</p>
                                  </div>
                                  <div className="text-right text-xs space-y-1 text-muted-foreground">
                                    <div>Domain: <span className="font-medium">{effect.domain}</span></div>
                                    <div>Impact: <span className="font-medium">{effect.impact}</span></div>
                                    <div>Confidence: <span className="font-medium">{Math.round(effect.confidence * 100)}%</span></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Higher-Order Effects */}
                    {(higherOrderEffects.length > 0 || loadingHigher) && (
                      <div>
                        <h4 className="font-medium mb-3">Higher-Order Effects (1-12 months)</h4>
                        {validationErrors.higher.length > 0 && (
                          <div className="p-3 rounded mb-2 text-xs bg-muted/40 dark:bg-muted/30 border border-border text-foreground">
                            Validation issues:
                            <ul className="list-disc ml-4">
                              {validationErrors.higher.slice(0, 4).map((m, i) => (
                                <li key={i}>{m}</li>
                              ))}
                              {validationErrors.higher.length > 4 && <li>+{validationErrors.higher.length - 4} more…</li>}
                            </ul>
                          </div>
                        )}
                        {loadingHigher && higherOrderEffects.length === 0 ? (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>Generating…</div>
                        ) : (
                          <div className="space-y-2">
                            {higherOrderEffects.map((effect, i) => (
                              <div key={i} className="p-3 rounded-lg bg-card border border-border">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <p className="font-medium">{truncate(effect.title, 120)}</p>
                                      <Badge variant="secondary" className="text-[10px] h-5">order {effect.order ?? 2}</Badge>
                                      {effect.id && (
                                        <Badge variant="outline" className="text-[10px] h-5">{effect.id}</Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">{effect.justification}</p>
                                    {effect.timeframe && <p className="text-xs text-muted-foreground mt-1">Timeframe: {effect.timeframe}</p>}
                                  </div>
                                  <div className="text-right text-xs space-y-1 text-muted-foreground">
                                    <div>Order: <span className="font-medium">{effect.order}</span></div>
                                    <div>Impact: <span className="font-medium">{effect.impact}</span></div>
                                    <div>Confidence: <span className="font-medium">{Math.round(effect.confidence * 100)}%</span></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Connections */}
                    {connections.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3">Effect Connections</h4>
                        <div className="space-y-2">
                          {connections.map((conn, i) => (
                            <div key={i} className="p-3 rounded-lg bg-card border border-border">
                              <div className="flex items-center gap-2 flex-wrap text-sm">
                                <Badge variant="outline" className="text-[10px] h-5">from: {conn.from}</Badge>
                                <span>→</span>
                                <Badge variant="outline" className="text-[10px] h-5">to: {conn.to}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{conn.mechanism}</p>
                              <p className="text-xs text-muted-foreground mt-1">Confidence: {Math.round(conn.confidence * 100)}%</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Leaps */}
                    {leaps.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-3">Qualitative Leaps</h4>
                        <div className="space-y-2">
                          {leaps.map((leap, i) => (
                            <div key={i} className="p-3 rounded-lg bg-card border border-border">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <Badge variant="secondary" className="text-[10px] h-5">leap</Badge>
                                <span className="font-medium text-sm">{truncate(leap.result, 120)}</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                <strong>Trigger:</strong> {leap.trigger}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                <strong>Threshold:</strong> {leap.threshold}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">Confidence: {Math.round(leap.confidence * 100)}%</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Synthesis */}
                    {(synthesis || loadingSynth) && (
                      <div>
                        <h4 className="font-medium mb-3">Synthesis & Recommendations</h4>
                        {validationErrors.synthesis.length > 0 && (
                          <div className="p-3 rounded mb-2 text-xs bg-muted/40 dark:bg-muted/30 border border-border text-foreground">
                            Validation issues:
                            <ul className="list-disc ml-4">
                              {validationErrors.synthesis.slice(0, 4).map((m, i) => (
                                <li key={i}>{m}</li>
                              ))}
                              {validationErrors.synthesis.length > 4 && <li>+{validationErrors.synthesis.length - 4} more…</li>}
                            </ul>
                          </div>
                        )}
                        {loadingSynth && !synthesis ? (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>Generating…</div>
                        ) : (
                          <div className="grid gap-4">
                          <div className="p-3 rounded-lg bg-card border border-border">
                            <h5 className="font-medium text-sm mb-2">Key Insights</h5>
                            <ul className="space-y-1">
                              {synthesis.insights?.map((insight: string, i: number) => (
                                <li key={i} className="text-sm">• {insight}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-3 rounded-lg bg-card border border-border">
                            <h5 className="font-medium text-sm mb-2">Recommendations</h5>
                            <ul className="space-y-1">
                              {synthesis.recommendations?.map((rec: string, i: number) => (
                                <li key={i} className="text-sm">• {rec}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-3 rounded-lg bg-card border border-border">
                            <h5 className="font-medium text-sm mb-2">Risk Factors</h5>
                            <ul className="space-y-1">
                              {synthesis.risks?.map((risk: string, i: number) => (
                                <li key={i} className="text-sm">• {risk}</li>
                              ))}
                            </ul>
                          </div>
                          </div>
                        )}
                      </div>
                    )}

                  </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // If a mode is selected, show the input form
  if (selectedMode) {
    return (
      <div className="scl-flat-ui min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedMode(null);
                }}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Super Critical Learning</h1>
                <p className="text-muted-foreground">Mode: {selectedMode}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowIntro(!showIntro)}
              className="flex items-center gap-2"
              aria-label={showIntro ? 'Hide help' : 'Show help'}
            >
              <Question className="h-4 w-4" />
              {showIntro ? 'Hide Help' : 'What is SCL?'}
            </Button>
          </div>
          {/* Intro / Description - Collapsible */}
          {showIntro && (
            <Card className="border-primary/20 bg-primary/5 dark:bg-primary/10 animate-in slide-in-from-top-2 duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base text-primary">
                  <Brain className="h-5 w-5" />
                  What is Super Critical Learning (SCL)?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>
                  SCL is an analysis workspace that helps you explore first-, second-, and third-order
                  effects of design choices in agentic systems. Configure a mode, provide seeds, and
                  generate an effect graph you can inspect, refine, and synthesize into takeaways.
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    <strong>12 Modes:</strong> Consolidate, Extrapolate, Transfer, Stress-Test, Intervene,
                    Counterfactual, Threshold/Leaps, Mechanism Audit — plus <em>Red Team</em> (adversarial),
                    <em>Temporal Simulation</em> (phased rollout), <em>Compose</em> (multi-mode synthesis),
                    and <em>Regulatory Impact</em> (compliance mapping).
                  </li>
                  <li>
                    <strong>Seeds</strong> set the starting context (concepts, patterns, practices). Use the defaults or
                    pass your own from a pattern page.
                  </li>
                  <li>
                    <strong>Output:</strong> an interactive Effect Graph, a Synthesis view that explains implications, and
                    a Rubric to evaluate solution quality.
                  </li>
                  <li>
                    <strong>Tip:</strong> Start with Consolidate → Stress-Test → Intervene for resilience analysis, or
                    try Red Team → Regulatory Impact → Compose for security compliance.
                  </li>
                </ul>
              </CardContent>
            </Card>
          )}
          
          <SCLControls
            mode={selectedMode}
            onStartSession={handleStartSession}
          />
        </div>
      </div>
    );
  }

  // Mode selection screen
  return (
    <div className="scl-flat-ui min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            <div>
              <h1 className="text-3xl font-bold">Super Critical Learning</h1>
              <p className="text-muted-foreground">Configure your analysis</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowIntro(!showIntro)}
            className="flex items-center gap-2"
            aria-label={showIntro ? 'Hide help' : 'Show help'}
          >
            <Question className="h-4 w-4" />
            {showIntro ? 'Hide Help' : 'What is SCL?'}
          </Button>
        </div>

        {/* Intro / Description - Collapsible */}
        {showIntro && (
          <Card className="border-primary/20 bg-primary/5 dark:bg-primary/10 animate-in slide-in-from-top-2 duration-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-primary">
                <Brain className="h-5 w-5" />
                What is Super Critical Learning (SCL)?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                SCL is an analysis workspace that helps you explore first-, second-, and third-order
                effects of design choices in agentic systems. Configure a mode, provide seeds, and
                generate an effect graph you can inspect, refine, and synthesize into takeaways.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>12 Modes:</strong> Consolidate, Extrapolate, Transfer, Stress-Test, Intervene,
                  Counterfactual, Threshold/Leaps, Mechanism Audit — plus <em>Red Team</em> (adversarial),
                  <em>Temporal Simulation</em> (phased rollout), <em>Compose</em> (multi-mode synthesis),
                  and <em>Regulatory Impact</em> (compliance mapping).
                </li>
                <li>
                  <strong>Seeds</strong> set the starting context (concepts, patterns, practices). Use the defaults or
                  pass your own from a pattern page.
                </li>
                <li>
                  <strong>Output:</strong> an interactive Effect Graph, a Synthesis view that explains implications, and
                  a Rubric to evaluate solution quality.
                </li>
                <li>
                  <strong>Tip:</strong> Start with Consolidate → Stress-Test → Intervene for resilience analysis, or
                  try Red Team → Regulatory Impact → Compose for security compliance.
                </li>
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Session Configuration */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Select Your Analysis Mode
            </CardTitle>
            <CardDescription>
              Choose how you want to analyze cascading effects in agentic systems
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Analysis Mode */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Consolidate Mode */}
                <Card 
                  className="scl-mode-card relative overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 border-2 hover:border-green-500/50 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-950/20"
                  onClick={() => {
                    setSelectedMode('consolidate');
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="scl-mode-badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Foundation</Badge>
                    </div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="scl-mode-icon h-5 w-5 text-green-600" />
                      Consolidate
                    </CardTitle>
                    <CardDescription>
                      Systematic exploration of well-understood patterns
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Extrapolate Mode */}
                <Card 
                  className="scl-mode-card relative overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 border-2 hover:border-blue-500/50 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-950/20"
                  onClick={() => {
                    setSelectedMode('extrapolate');
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="scl-mode-badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Creative</Badge>
                    </div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Lightning className="scl-mode-icon h-5 w-5 text-blue-600" />
                      Extrapolate
                    </CardTitle>
                    <CardDescription>
                      Creative exploration with constraints and perturbations
                    </CardDescription>
                  </CardHeader>
                </Card>

                {/* Transfer Mode */}
                <Card 
                  className="scl-mode-card relative overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 border-2 hover:border-orange-500/50 bg-gradient-to-br from-orange-50/50 to-transparent dark:from-orange-950/20"
                  onClick={() => {
                    setSelectedMode('transfer');
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="scl-mode-badge bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">Cross-Domain</Badge>
                    </div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Lightning className="scl-mode-icon h-5 w-5 text-orange-600" />
                      Transfer
                    </CardTitle>
                    <CardDescription>
                      Apply knowledge across domains; map invariants
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
              {/* Additional Modes (compact cards) */}
              <p className="text-sm text-muted-foreground font-medium pt-2">Advanced Analysis Modes</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="scl-mode-card cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 border-2 hover:border-amber-500/50 bg-gradient-to-br from-amber-50/30 to-transparent dark:from-amber-950/10" onClick={() => setSelectedMode('stress-test')}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Lightning className="scl-mode-icon h-4 w-4 text-amber-600" />
                      Stress-Test
                    </CardTitle>
                    <CardDescription className="text-sm">Perturb constraints to find brittleness</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="scl-mode-card cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 border-2 hover:border-purple-500/50 bg-gradient-to-br from-purple-50/30 to-transparent dark:from-purple-950/10" onClick={() => setSelectedMode('intervene')}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Target className="scl-mode-icon h-4 w-4 text-purple-600" />
                      Intervene
                    </CardTitle>
                    <CardDescription className="text-sm">Try levers and compare outcomes</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="scl-mode-card cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 border-2 hover:border-sky-500/50 bg-gradient-to-br from-sky-50/30 to-transparent dark:from-sky-950/10" onClick={() => setSelectedMode('counterfactual')}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Lightning className="scl-mode-icon h-4 w-4 text-sky-600" />
                      Counterfactual
                    </CardTitle>
                    <CardDescription className="text-sm">Toggle assumptions and compare graphs</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="scl-mode-card cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 border-2 hover:border-rose-500/50 bg-gradient-to-br from-rose-50/30 to-transparent dark:from-rose-950/10" onClick={() => setSelectedMode('leap-focus')}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Lightning className="scl-mode-icon h-4 w-4 text-rose-600" />
                      Threshold / Leaps
                    </CardTitle>
                    <CardDescription className="text-sm">Highlight discontinuities and triggers</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="scl-mode-card cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 border-2 hover:border-emerald-500/50 bg-gradient-to-br from-emerald-50/30 to-transparent dark:from-emerald-950/10" onClick={() => setSelectedMode('mechanism-audit')}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Lightning className="scl-mode-icon h-4 w-4 text-emerald-600" />
                      Mechanism Audit
                    </CardTitle>
                    <CardDescription className="text-sm">Require mechanisms/delays; flag weak links</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {/* New World-Class Modes */}
              <p className="text-sm text-muted-foreground font-medium pt-2">World-Class Analysis Modes</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="scl-mode-card cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 border-2 hover:border-red-500/50 bg-gradient-to-br from-red-50/30 to-transparent dark:from-red-950/10" onClick={() => setSelectedMode('red-team')}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="scl-mode-badge bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">Adversarial</Badge>
                    </div>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <ShieldWarning className="scl-mode-icon h-5 w-5 text-red-600" />
                      Red Team
                    </CardTitle>
                    <CardDescription className="text-sm">Adversarial analysis — find exploit paths and attack cascades</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="scl-mode-card cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 border-2 hover:border-indigo-500/50 bg-gradient-to-br from-indigo-50/30 to-transparent dark:from-indigo-950/10" onClick={() => setSelectedMode('temporal-sim')}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="scl-mode-badge bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">Simulation</Badge>
                    </div>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Timer className="scl-mode-icon h-5 w-5 text-indigo-600" />
                      Temporal Simulation
                    </CardTitle>
                    <CardDescription className="text-sm">Week-by-week timeline with decision gates and rollback triggers</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="scl-mode-card cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 border-2 hover:border-teal-500/50 bg-gradient-to-br from-teal-50/30 to-transparent dark:from-teal-950/10" onClick={() => setSelectedMode('compose')}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="scl-mode-badge bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">Meta</Badge>
                    </div>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Stack className="scl-mode-icon h-5 w-5 text-teal-600" />
                      Compose
                    </CardTitle>
                    <CardDescription className="text-sm">Layer two analysis modes — find synergies and tensions</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="scl-mode-card cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 border-2 hover:border-violet-500/50 bg-gradient-to-br from-violet-50/30 to-transparent dark:from-violet-950/10" onClick={() => setSelectedMode('regulatory-impact')}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="scl-mode-badge bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">Compliance</Badge>
                    </div>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Scales className="scl-mode-icon h-5 w-5 text-violet-600" />
                      Regulatory Impact
                    </CardTitle>
                    <CardDescription className="text-sm">Map effects through EU AI Act, NIST AI RMF, ISO 42001</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}

export { SuperCriticalLearning };
export default SuperCriticalLearning;
