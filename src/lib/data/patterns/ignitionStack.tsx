import React, { useState, useEffect, useCallback } from 'react';
import type { PatternData } from './types';

/* ────────────────────────────────────────────────────────────────────────────
 *  IgnitionStack Agent  —  "Ignite Your Azure Workload from a Single Input"
 *
 *  Agents are the new apps. Where the last decade shipped containers and
 *  microservices, the next decade ships agents — autonomous, goal-driven
 *  units of software that reason, act, and learn. IgnitionStack codifies
 *  the Ralph Method's bash-loop orchestration into an end-to-end use case →
 *  production Azure workload generator that treats agents as first-class
 *  deployment artifacts alongside infrastructure and application code.
 *
 *  Input  : Screenshot, text, PDF, PPTX, or Word doc describing a use case
 *  Output : Fully deployed Azure project — Bicep infra, Microsoft Foundry agents,
 *           database schemas, application code, GitHub repo, CI/CD pipeline
 *  Engine : 20 Ralph-loop iterations using gpt-5.3-codex via `gh copilot`
 * ──────────────────────────────────────────────────────────────────────────── */

// ─── CSS Keyframes (injected once) ───────────────────────────────────────────
const IGNITION_STYLES = `
@keyframes ignition-flow {
  0% { transform: translateX(-100%); opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}
@keyframes ignition-glow {
  0%, 100% { box-shadow: 0 0 4px rgba(251, 146, 60, 0.3); }
  50% { box-shadow: 0 0 16px rgba(251, 146, 60, 0.6), 0 0 32px rgba(251, 146, 60, 0.2); }
}
@keyframes ignition-typewriter {
  from { width: 0; }
  to { width: 100%; }
}
@keyframes ignition-fade-up {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes ignition-iteration-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
@keyframes ignition-particle {
  0% { transform: translateX(0) scale(1); opacity: 0.8; }
  100% { transform: translateX(var(--particle-dx, 60px)) scale(0.4); opacity: 0; }
}
`;

// ─── Pipeline Stage Definitions ──────────────────────────────────────────────
const STAGES = [
  { id: 'input',      icon: '📄', label: 'Input',          color: 'from-blue-500 to-blue-600',       detail: 'PPTX • PDF • Screenshot • Doc • Text' },
  { id: 'parse',      icon: '🔍', label: 'Parse',          color: 'from-violet-500 to-violet-600',    detail: 'Vision + NLP extraction' },
  { id: 'decompose',  icon: '🧩', label: 'Decompose',      color: 'from-purple-500 to-purple-600',    detail: 'Atomic tasks via Decomposition Test' },
  { id: 'prd',        icon: '📋', label: 'PRD.json',       color: 'from-fuchsia-500 to-fuchsia-600',  detail: 'Prioritized task backlog' },
  { id: 'scaffold',   icon: '🏗️', label: 'Scaffold',       color: 'from-orange-500 to-orange-600',    detail: 'Bicep · MS Foundry · DB · App · CI/CD' },
  { id: 'ralph',      icon: '🔄', label: 'Ralph ×20',      color: 'from-amber-500 to-amber-600',      detail: '20 iterations with gpt-5.3-codex' },
  { id: 'verify',     icon: '✅', label: 'Production',     color: 'from-emerald-500 to-emerald-600',  detail: 'Deployed to Azure + GitHub' },
] as const;

// Task samples that appear during the Ralph iteration phase
const ITERATION_TASKS = [
  'INFRA-01: Deploy resource group + Key Vault',
  'INFRA-02: Provision Cosmos DB with Bicep',
  'AGENT-01: Configure triage agent prompt',
  'DB-01: Create patients table + migration',
  'APP-01: Scaffold FastAPI + React frontend',
  'APP-02: Implement /api/appointments endpoint',
  'CI-01: GitHub Actions build → test → deploy',
  'APP-03: Add FHIR-compliant intake form',
  'AGENT-02: Wire lab-results RAG pipeline',
  'TEST-01: E2E smoke tests for patient flow',
  'APP-04: Insurance verification webhook',
  'DOCS-01: Generate README + runbook',
];

// ─── Inline Business-Use-Case Visualization ──────────────────────────────────
const IgnitionStackVisualization: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [iterCount, setIterCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [stylesInjected, setStylesInjected] = useState(false);

  // Inject keyframes once
  useEffect(() => {
    if (stylesInjected) return;
    const style = document.createElement('style');
    style.textContent = IGNITION_STYLES;
    document.head.appendChild(style);
    setStylesInjected(true);
    return () => { style.remove(); };
  }, [stylesInjected]);

  // Auto-advance pipeline stages
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setActiveStage(prev => {
        const next = prev + 1;
        if (next >= STAGES.length) {
          // Reset after completing the pipeline
          setIterCount(0);
          return 0;
        }
        return next;
      });
    }, 2200);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Count iterations when on the Ralph stage
  useEffect(() => {
    if (STAGES[activeStage]?.id !== 'ralph' || !isRunning) return;
    const interval = setInterval(() => {
      setIterCount(prev => (prev < 20 ? prev + 1 : 20));
    }, 100);
    return () => clearInterval(interval);
  }, [activeStage, isRunning]);

  const toggleRunning = useCallback(() => setIsRunning(r => !r), []);

  return (
    <div className="relative p-5 rounded-xl border border-border bg-gradient-to-br from-slate-50 via-orange-50/40 to-amber-50 dark:from-slate-950 dark:via-orange-950/20 dark:to-amber-950/30 overflow-hidden">

      {/* Title + controls */}
      <div className="flex items-center justify-between mb-5">
        <h4 className="font-semibold text-sm text-foreground">
          IgnitionStack Pipeline — Live Flow
        </h4>
        <button
          onClick={toggleRunning}
          className="text-xs px-3 py-1 rounded-full border border-border bg-background hover:bg-muted transition-colors font-medium"
        >
          {isRunning ? '⏸ Pause' : '▶ Play'}
        </button>
      </div>

      {/* ── Pipeline Stage Cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-7 gap-2">
        {STAGES.map((stage, i) => {
          const isActive = i === activeStage;
          const isDone = i < activeStage;
          return (
            <div
              key={stage.id}
              className="relative flex flex-col items-center"
              style={{
                animation: isActive ? 'ignition-fade-up 0.4s ease-out forwards' : 'none',
              }}
            >
              {/* Connector line + particle  */}
              {i > 0 && (
                <div className="absolute -left-2 top-5 w-4 h-0.5 overflow-hidden">
                  <div className={`h-full ${isDone || isActive ? 'bg-orange-400' : 'bg-border'} transition-colors duration-500`} />
                  {isActive && (
                    <div
                      className="absolute top-[-2px] left-0 w-2 h-2 rounded-full bg-orange-400"
                      style={{ animation: 'ignition-particle 0.8s ease-out infinite', '--particle-dx': '16px' } as React.CSSProperties}
                    />
                  )}
                </div>
              )}

              {/* Stage icon card */}
              <div
                className={`
                  relative w-full aspect-square rounded-lg flex items-center justify-center text-xl
                  transition-all duration-500 cursor-default
                  ${isActive
                    ? `bg-gradient-to-br ${stage.color} text-white shadow-lg`
                    : isDone
                      ? 'bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/40 dark:to-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                      : 'bg-muted/60 text-muted-foreground'}
                `}
                style={isActive ? { animation: 'ignition-glow 2s ease-in-out infinite' } : {}}
              >
                {isDone ? '✓' : stage.icon}

                {/* Iteration counter badge */}
                {stage.id === 'ralph' && isActive && (
                  <span
                    className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold rounded-full w-6 h-6 flex items-center justify-center shadow"
                    style={{ animation: 'ignition-iteration-pulse 0.3s ease-out' }}
                    key={iterCount}
                  >
                    {iterCount}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className={`text-[10px] font-semibold mt-1.5 text-center leading-tight transition-colors duration-300 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Active-Stage Detail Bar ──────────────────────────────────────── */}
      <div className="mt-4 rounded-lg bg-background/80 border border-border/50 px-4 py-3 min-h-[72px] backdrop-blur-sm">
        {STAGES[activeStage]?.id === 'ralph' ? (
          /* Special Ralph iteration view */
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">
                Ralph Loop — Iteration {iterCount}/20
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">
                gpt-5.3-codex via gh copilot
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300 ease-out"
                style={{ width: `${(iterCount / 20) * 100}%` }}
              />
            </div>
            {/* Current task ticker */}
            <div className="overflow-hidden h-4">
              <p
                className="text-[11px] font-mono text-orange-600 dark:text-orange-400 whitespace-nowrap"
                style={{
                  animation: 'ignition-typewriter 1.8s steps(40) forwards',
                  overflow: 'hidden',
                }}
                key={iterCount}
              >
                {ITERATION_TASKS[iterCount % ITERATION_TASKS.length] ?? ''}
              </p>
            </div>
          </div>
        ) : (
          /* Standard stage info */
          <div style={{ animation: 'ignition-fade-up 0.3s ease-out forwards' }} key={activeStage}>
            <p className="text-xs font-semibold text-foreground mb-1">
              {STAGES[activeStage]?.icon} {STAGES[activeStage]?.label}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {STAGES[activeStage]?.detail}
            </p>
          </div>
        )}
      </div>

      {/* ── Bottom accent — the bash loop ────────────────────────────────── */}
      <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
        <span className="inline-block w-12 h-px bg-gradient-to-r from-transparent to-orange-400" />
        <code className="font-mono text-orange-600/80 dark:text-orange-400/80">
          for i in {'{'}1..20{'}'}; do gh copilot code …; done
        </code>
        <span className="inline-block w-12 h-px bg-gradient-to-l from-transparent to-orange-400" />
      </div>

      {/* ── System Architecture SVG ──────────────────────────────────────── */}
      <div className="mt-6 pt-5 border-t border-border/50">
        <h4 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
          <span className="text-orange-500">◆</span> System Architecture — End-to-End Azure Topology
        </h4>
        <div className="rounded-lg border border-border bg-background/90 p-2 overflow-x-auto">
          <IgnitionStackArchitectureSVG />
        </div>
      </div>

      {/* ── Full Infographic — Exploded View ─────────────────────────────── */}
      <div className="mt-6 pt-5 border-t border-border/50">
        <h4 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
          <span className="text-orange-500">◆</span> IgnitionStack Explained — Full Architecture Infographic
        </h4>
        <p className="text-xs text-muted-foreground mb-3">
          Exploded view of the 8-stage pipeline, generated template structure, Ralph loop mechanics, Scaffold &amp; Plug modes, and 7 domain examples.
        </p>
        <div className="rounded-lg border border-border bg-background/90 p-2 overflow-x-auto">
          <img
            src="/images/IgnitionStack_Explained.webp"
            alt="IgnitionStack full architecture infographic — 8-stage pipeline from use case to production Azure workload"
            className="w-full h-auto rounded-lg"
            style={{ minHeight: '200px' }}
          />
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 text-center">
          <a
            href="https://github.com/bhakthan/ignitionstack"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500 transition-colors underline underline-offset-2"
          >
            github.com/bhakthan/ignitionstack
          </a>
          {' · '}MIT License
        </p>
      </div>
    </div>
  );
};

/* ─── SVG Architecture Diagram ────────────────────────────────────────────── */
const IgnitionStackArchitectureSVG: React.FC = () => (
  <svg
    viewBox="0 0 960 520"
    className="w-full h-auto min-w-[700px]"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="IgnitionStack Agent system architecture: from use-case input through Azure deployment"
  >
    <defs>
      {/* Gradients */}
      <linearGradient id="ig-grad-input" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="ig-grad-agent" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="ig-grad-azure" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
      <linearGradient id="ig-grad-db" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id="ig-grad-ai" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#db2777" />
      </linearGradient>
      <linearGradient id="ig-grad-cicd" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="ig-grad-app" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      {/* Arrow marker */}
      <marker id="ig-arrow" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
        <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
      </marker>
      <marker id="ig-arrow-orange" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
      </marker>
    </defs>

    {/* ── Background Zone Labels ──────────────────────────────────────── */}
    {/* Input zone */}
    <rect x="10" y="10" width="140" height="500" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" opacity="0.6" />
    <text x="80" y="34" textAnchor="middle" fontSize="10" fontWeight="600" fill="#3b82f6" fontFamily="system-ui">INPUT</text>

    {/* Agent core zone */}
    <rect x="160" y="10" width="230" height="500" rx="12" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" opacity="0.6" />
    <text x="275" y="34" textAnchor="middle" fontSize="10" fontWeight="600" fill="#ea580c" fontFamily="system-ui">IGNITIONSTACK AGENT</text>

    {/* Azure output zone */}
    <rect x="400" y="10" width="550" height="500" rx="12" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1" opacity="0.6" />
    <text x="675" y="34" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0284c7" fontFamily="system-ui">AZURE DEPLOYED OUTPUT</text>

    {/* ── Input Sources (left column) ─────────────────────────────────── */}
    <rect x="30" y="80" width="100" height="36" rx="6" fill="url(#ig-grad-input)" />
    <text x="80" y="103" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" fontFamily="system-ui">📄 PPTX</text>

    <rect x="30" y="130" width="100" height="36" rx="6" fill="url(#ig-grad-input)" />
    <text x="80" y="153" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" fontFamily="system-ui">📸 Screenshot</text>

    <rect x="30" y="180" width="100" height="36" rx="6" fill="url(#ig-grad-input)" />
    <text x="80" y="203" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" fontFamily="system-ui">📝 PDF / Doc</text>

    <rect x="30" y="230" width="100" height="36" rx="6" fill="url(#ig-grad-input)" />
    <text x="80" y="253" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" fontFamily="system-ui">💬 Text</text>

    {/* Input arrows → Parse */}
    <line x1="130" y1="98" x2="178" y2="140" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ig-arrow)" />
    <line x1="130" y1="148" x2="178" y2="148" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ig-arrow)" />
    <line x1="130" y1="198" x2="178" y2="160" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ig-arrow)" />
    <line x1="130" y1="248" x2="178" y2="170" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ig-arrow)" />

    {/* ── Agent Core (center column) ──────────────────────────────────── */}
    {/* Parse */}
    <rect x="180" y="120" width="110" height="60" rx="8" fill="url(#ig-grad-agent)" />
    <text x="235" y="147" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="system-ui">🔍 Parse</text>
    <text x="235" y="163" textAnchor="middle" fontSize="9" fill="#fed7aa" fontFamily="system-ui">Vision + NLP</text>

    {/* Arrow: Parse → Decompose */}
    <line x1="235" y1="180" x2="235" y2="198" stroke="#f97316" strokeWidth="2" markerEnd="url(#ig-arrow-orange)" />

    {/* Decompose */}
    <rect x="180" y="200" width="110" height="60" rx="8" fill="url(#ig-grad-agent)" />
    <text x="235" y="227" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="system-ui">🧩 Decompose</text>
    <text x="235" y="243" textAnchor="middle" fontSize="9" fill="#fed7aa" fontFamily="system-ui">Atomic Tasks</text>

    {/* Arrow: Decompose → PRD */}
    <line x1="235" y1="260" x2="235" y2="278" stroke="#f97316" strokeWidth="2" markerEnd="url(#ig-arrow-orange)" />

    {/* PRD */}
    <rect x="180" y="280" width="110" height="50" rx="8" fill="url(#ig-grad-agent)" />
    <text x="235" y="303" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="system-ui">📋 PRD.json</text>
    <text x="235" y="318" textAnchor="middle" fontSize="9" fill="#fed7aa" fontFamily="system-ui">Task Backlog</text>

    {/* Arrow: PRD → Ralph Loop */}
    <line x1="235" y1="330" x2="235" y2="358" stroke="#f97316" strokeWidth="2" markerEnd="url(#ig-arrow-orange)" />

    {/* Ralph Loop — highlight box */}
    <rect x="170" y="360" width="130" height="70" rx="10" fill="#451a03" stroke="#f97316" strokeWidth="2" strokeDasharray="4 2" />
    <text x="235" y="387" textAnchor="middle" fontSize="12" fontWeight="800" fill="#fb923c" fontFamily="system-ui">🔄 Ralph ×20</text>
    <text x="235" y="404" textAnchor="middle" fontSize="9" fill="#fdba74" fontFamily="system-ui">gpt-5.3-codex</text>
    <text x="235" y="418" textAnchor="middle" fontSize="8" fill="#fed7aa" fontFamily="system-ui">bash loop orchestration</text>

    {/* Ralph loop self-arrow (feedback) */}
    <path d="M 300 385 C 330 385, 330 405, 300 405" fill="none" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#ig-arrow-orange)" />

    {/* ── Output Arrows from Ralph Loop → Azure Resources ─────────────── */}
    {/* Arrow: Ralph → Bicep IaC */}
    <line x1="300" y1="375" x2="418" y2="70" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ig-arrow)" />
    {/* Arrow: Ralph → App Service */}
    <line x1="300" y1="385" x2="418" y2="175" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ig-arrow)" />
    {/* Arrow: Ralph → Cosmos DB */}
    <line x1="300" y1="395" x2="418" y2="280" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ig-arrow)" />
    {/* Arrow: Ralph → Microsoft Foundry */}
    <line x1="300" y1="405" x2="418" y2="375" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ig-arrow)" />
    {/* Arrow: Ralph → GitHub CI/CD */}
    <line x1="300" y1="415" x2="418" y2="465" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ig-arrow)" />

    {/* ── Azure Resources (right column, top to bottom) ───────────────── */}

    {/* Bicep IaC */}
    <rect x="420" y="50" width="150" height="50" rx="8" fill="url(#ig-grad-azure)" />
    <text x="495" y="73" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="system-ui">🏗️ Bicep IaC</text>
    <text x="495" y="88" textAnchor="middle" fontSize="9" fill="#bae6fd" fontFamily="system-ui">Resource Group · RBAC</text>

    {/* Arrow: Bicep → Azure Resources sub-items */}
    <line x1="570" y1="75" x2="618" y2="68" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#ig-arrow)" />
    <line x1="570" y1="75" x2="618" y2="93" stroke="#94a3b8" strokeWidth="1" markerEnd="url(#ig-arrow)" />

    {/* Key Vault (small) */}
    <rect x="620" y="48" width="120" height="32" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1" />
    <text x="680" y="69" textAnchor="middle" fontSize="10" fontWeight="600" fill="#94a3b8" fontFamily="system-ui">🔐 Key Vault</text>

    {/* Managed Identity (small) */}
    <rect x="620" y="86" width="120" height="32" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="1" />
    <text x="680" y="107" textAnchor="middle" fontSize="10" fontWeight="600" fill="#94a3b8" fontFamily="system-ui">🛡️ Managed ID</text>

    {/* App Service */}
    <rect x="420" y="155" width="150" height="60" rx="8" fill="url(#ig-grad-app)" />
    <text x="495" y="180" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="system-ui">⚡ App Service</text>
    <text x="495" y="195" textAnchor="middle" fontSize="9" fill="#fef3c7" fontFamily="system-ui">FastAPI + React SPA</text>
    <text x="495" y="207" textAnchor="middle" fontSize="8" fill="#fde68a" fontFamily="system-ui">Container Apps / App Svc</text>

    {/* Cosmos DB */}
    <rect x="420" y="260" width="150" height="55" rx="8" fill="url(#ig-grad-db)" />
    <text x="495" y="283" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="system-ui">🗄️ Cosmos DB</text>
    <text x="495" y="298" textAnchor="middle" fontSize="9" fill="#ddd6fe" fontFamily="system-ui">FHIR-aligned schemas</text>
    <text x="495" y="310" textAnchor="middle" fontSize="8" fill="#c4b5fd" fontFamily="system-ui">patients · appointments · labs</text>

    {/* Arrow: App Svc → Cosmos */}
    <line x1="495" y1="215" x2="495" y2="258" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 2" markerEnd="url(#ig-arrow)" />

    {/* Microsoft Foundry / Agents */}
    <rect x="420" y="355" width="150" height="70" rx="8" fill="url(#ig-grad-ai)" />
    <text x="495" y="375" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="system-ui">🤖 MS Foundry</text>
    <text x="495" y="390" textAnchor="middle" fontSize="9" fill="#fbcfe8" fontFamily="system-ui">Agent Framework · RAG</text>
    <text x="495" y="403" textAnchor="middle" fontSize="8" fill="#f9a8d4" fontFamily="system-ui">Azure AI Search · Triage</text>
    <text x="495" y="415" textAnchor="middle" fontSize="8" fill="#f9a8d4" fontFamily="system-ui">Lab summary · Symptom routing</text>

    {/* Arrow: App Svc → Microsoft Foundry */}
    <line x1="520" y1="215" x2="520" y2="353" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 2" markerEnd="url(#ig-arrow)" />

    {/* GitHub CI/CD */}
    <rect x="420" y="445" width="150" height="55" rx="8" fill="url(#ig-grad-cicd)" />
    <text x="495" y="468" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="system-ui">🚀 GitHub Actions</text>
    <text x="495" y="483" textAnchor="middle" fontSize="9" fill="#a7f3d0" fontFamily="system-ui">CI → Build → Test → Deploy</text>
    <text x="495" y="495" textAnchor="middle" fontSize="8" fill="#6ee7b7" fontFamily="system-ui">Playwright E2E · bicep deploy</text>

    {/* ── Deployed Stack (far right) ──────────────────────────────────── */}
    {/* Arrow: GitHub → Deployed */}
    <line x1="570" y1="472" x2="618" y2="400" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#ig-arrow)" />

    {/* Arrow: Microsoft Foundry → Deployed */}
    <line x1="570" y1="385" x2="618" y2="380" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" />

    {/* Arrow: App → Deployed */}
    <line x1="570" y1="185" x2="700" y2="320" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" />

    {/* Deployed Production Box */}
    <rect x="620" y="300" width="310" height="180" rx="12" fill="#022c22" stroke="#10b981" strokeWidth="2" />
    <text x="775" y="325" textAnchor="middle" fontSize="12" fontWeight="800" fill="#34d399" fontFamily="system-ui">✅ PRODUCTION DEPLOYED</text>

    {/* Deployed sub-components */}
    <rect x="635" y="340" width="130" height="28" rx="5" fill="#064e3b" />
    <text x="700" y="359" textAnchor="middle" fontSize="9" fontWeight="600" fill="#6ee7b7" fontFamily="system-ui">⚡ Patient Portal</text>

    <rect x="635" y="375" width="130" height="28" rx="5" fill="#064e3b" />
    <text x="700" y="394" textAnchor="middle" fontSize="9" fontWeight="600" fill="#6ee7b7" fontFamily="system-ui">🤖 AI Triage Agent</text>

    <rect x="635" y="410" width="130" height="28" rx="5" fill="#064e3b" />
    <text x="700" y="429" textAnchor="middle" fontSize="9" fontWeight="600" fill="#6ee7b7" fontFamily="system-ui">🗄️ FHIR Database</text>

    <rect x="635" y="445" width="130" height="28" rx="5" fill="#064e3b" />
    <text x="700" y="464" textAnchor="middle" fontSize="9" fontWeight="600" fill="#6ee7b7" fontFamily="system-ui">📊 Monitoring</text>

    <rect x="785" y="340" width="130" height="28" rx="5" fill="#064e3b" />
    <text x="850" y="359" textAnchor="middle" fontSize="9" fontWeight="600" fill="#6ee7b7" fontFamily="system-ui">🔐 RBAC + Key Vault</text>

    <rect x="785" y="375" width="130" height="28" rx="5" fill="#064e3b" />
    <text x="850" y="394" textAnchor="middle" fontSize="9" fontWeight="600" fill="#6ee7b7" fontFamily="system-ui">📋 Lab Summarizer</text>

    <rect x="785" y="410" width="130" height="28" rx="5" fill="#064e3b" />
    <text x="850" y="429" textAnchor="middle" fontSize="9" fontWeight="600" fill="#6ee7b7" fontFamily="system-ui">🚀 CI/CD Pipeline</text>

    <rect x="785" y="445" width="130" height="28" rx="5" fill="#064e3b" />
    <text x="850" y="464" textAnchor="middle" fontSize="9" fontWeight="600" fill="#6ee7b7" fontFamily="system-ui">🧪 E2E Tests</text>

    {/* ── Annotations ─────────────────────────────────────────────────── */}
    {/* Timing annotation */}
    <text x="775" y="495" textAnchor="middle" fontSize="9" fontWeight="700" fill="#059669" fontFamily="system-ui" fontStyle="italic">
      ~ 90 seconds parse → 20 iterations → deployed
    </text>

    {/* Cosmos ↔ Microsoft Foundry dotted connection */}
    <line x1="495" y1="315" x2="495" y2="353" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" markerEnd="url(#ig-arrow)" />

    {/* Data flow legend */}
    <rect x="760" y="140" width="170" height="110" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1" opacity="0.95" />
    <text x="845" y="160" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155" fontFamily="system-ui">Legend</text>
    <line x1="775" y1="175" x2="810" y2="175" stroke="#f97316" strokeWidth="2" markerEnd="url(#ig-arrow-orange)" />
    <text x="818" y="179" fontSize="9" fill="#475569" fontFamily="system-ui">Agent pipeline</text>
    <line x1="775" y1="195" x2="810" y2="195" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#ig-arrow)" />
    <text x="818" y="199" fontSize="9" fill="#475569" fontFamily="system-ui">Data / output flow</text>
    <line x1="775" y1="215" x2="810" y2="215" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 2" />
    <text x="818" y="219" fontSize="9" fill="#475569" fontFamily="system-ui">Runtime dependency</text>
    <path d="M 775 235 C 795 235, 795 240, 775 240" fill="none" stroke="#f97316" strokeWidth="1.5" strokeDasharray="3 2" />
    <text x="818" y="240" fontSize="9" fill="#475569" fontFamily="system-ui">Feedback loop</text>
  </svg>
);

// ─── Pattern Definition ──────────────────────────────────────────────────────
export const ignitionStackPattern: PatternData = {
  id: 'ignition-stack',
  name: 'IgnitionStack Agent',
  category: 'Advanced',

  description:
    'Agents are the new apps — and IgnitionStack is how you ship them. Turn a single input ' +
    '(screenshot, text, PDF, PPTX, or Word doc) into a production-ready Azure workload in 20 ' +
    'Ralph-loop iterations: Bicep infrastructure, Microsoft Foundry agents (via Microsoft Agent Framework), ' +
    'Azure AI Search for agentic RAG, database schemas, application code, GitHub repository, ' +
    'and CI/CD pipeline — all generated autonomously by gpt-5.3-codex. The output isn\'t just an app; ' +
    'it\'s a deployed system where agents are first-class citizens alongside APIs and UIs.',

  whenToUse:
    'Use IgnitionStack when you need to go from zero to a deployed Azure workload and you have a ' +
    'clear use-case description in any format. It is ideal for greenfield projects, hackathon ' +
    'sprints, proof-of-concept rapid-fire builds, architecture prototyping, client demos, and ' +
    'migration kick-starts where you need a working skeleton fast. Especially powerful when the ' +
    'workload includes AI agents — IgnitionStack treats agents as first-class deployment artifacts, ' +
    'not afterthoughts bolted on to traditional apps. Also excellent when onboarding ' +
    'new teams: hand them a PRD.json and ralph.sh and let the loop build the project while they ' +
    'read the commit history to learn the codebase.',

  // ────────── Flow Diagram ──────────────────────────────────────────────────
  nodes: [
    {
      id: 'input-parser',
      type: 'default',
      data: {
        label: 'Input Parser',
        description: 'Accepts screenshot, text, PDF, PPTX, or Word doc and extracts structured requirements',
        nodeType: 'input',
      },
      position: { x: 50, y: 0 },
    },
    {
      id: 'use-case-decomposer',
      type: 'default',
      data: {
        label: 'Use-Case Decomposer',
        description: 'Breaks requirements into 30-50 atomic, testable tasks using the Decomposition Test',
        nodeType: 'llm',
      },
      position: { x: 50, y: 100 },
    },
    {
      id: 'prd-generator',
      type: 'default',
      data: {
        label: 'PRD Generator',
        description: 'Produces PRD.json — the prioritized task backlog — and initializes progress.txt',
        nodeType: 'planner',
      },
      position: { x: 50, y: 200 },
    },
    {
      id: 'bicep-infra-gen',
      type: 'default',
      data: {
        label: 'Bicep Infra Generator',
        description: 'Generates Azure Bicep templates: resource group, app service, database, Key Vault, Microsoft Foundry workspace, Azure AI Search',
        nodeType: 'executor',
      },
      position: { x: 300, y: 0 },
    },
    {
      id: 'foundry-agent-gen',
      type: 'default',
      data: {
        label: 'Microsoft Foundry Agent Generator',
        description: 'Scaffolds agents via Microsoft Agent Framework: system prompts, tool configs, Azure AI Search for RAG, evaluation criteria',
        nodeType: 'executor',
      },
      position: { x: 300, y: 100 },
    },
    {
      id: 'db-schema-gen',
      type: 'default',
      data: {
        label: 'Database Schema Generator',
        description: 'Creates migrations, seed data, and Key Vault connection-string references',
        nodeType: 'executor',
      },
      position: { x: 300, y: 200 },
    },
    {
      id: 'app-scaffold-gen',
      type: 'default',
      data: {
        label: 'App Scaffold Generator',
        description: 'Generates frontend + backend application code (monorepo or polyrepo)',
        nodeType: 'executor',
      },
      position: { x: 550, y: 0 },
    },
    {
      id: 'github-repo-init',
      type: 'default',
      data: {
        label: 'GitHub Repo Initializer',
        description: 'Creates repo via gh CLI, sets branch protection, CODEOWNERS, and initial commit',
        nodeType: 'tool',
      },
      position: { x: 550, y: 100 },
    },
    {
      id: 'ci-cd-pipeline-gen',
      type: 'default',
      data: {
        label: 'CI/CD Pipeline Generator',
        description: 'Generates GitHub Actions workflows: build → test → Bicep deploy → app deploy',
        nodeType: 'executor',
      },
      position: { x: 550, y: 200 },
    },
    {
      id: 'ralph-loop-runner',
      type: 'default',
      data: {
        label: 'Ralph Loop Runner (×20)',
        description: 'Executes 20 Ralph iterations: each reads PRD.json, picks a task, implements, tests, commits',
        nodeType: 'executor',
      },
      position: { x: 300, y: 340 },
    },
    {
      id: 'verification-gate',
      type: 'default',
      data: {
        label: 'Verification Gate',
        description: 'Checks: all Bicep deployed, tests pass, CI green, app accessible at production URL',
        nodeType: 'evaluator',
      },
      position: { x: 550, y: 340 },
    },
    {
      id: 'production-output',
      type: 'default',
      data: {
        label: 'Production Output',
        description: 'Final deliverable: live Azure URL + GitHub repo link + deployment runbook',
        nodeType: 'output',
      },
      position: { x: 550, y: 450 },
    },
  ],

  edges: [
    { id: 'e-input-decompose', source: 'input-parser', target: 'use-case-decomposer', animated: true },
    { id: 'e-decompose-prd', source: 'use-case-decomposer', target: 'prd-generator' },
    { id: 'e-prd-bicep', source: 'prd-generator', target: 'bicep-infra-gen', label: 'infra tasks' },
    { id: 'e-bicep-foundry', source: 'bicep-infra-gen', target: 'foundry-agent-gen' },
    { id: 'e-foundry-db', source: 'foundry-agent-gen', target: 'db-schema-gen' },
    { id: 'e-db-app', source: 'db-schema-gen', target: 'app-scaffold-gen', label: 'app tasks' },
    { id: 'e-app-github', source: 'app-scaffold-gen', target: 'github-repo-init' },
    { id: 'e-github-cicd', source: 'github-repo-init', target: 'ci-cd-pipeline-gen' },
    { id: 'e-cicd-ralph', source: 'ci-cd-pipeline-gen', target: 'ralph-loop-runner', label: 'start loop' },
    { id: 'e-ralph-verify', source: 'ralph-loop-runner', target: 'verification-gate', label: 'after each iteration' },
    {
      id: 'e-verify-ralph-retry',
      source: 'verification-gate',
      target: 'ralph-loop-runner',
      label: 'retry (iteration < 20)',
      animated: true,
      style: { stroke: '#f59e0b', strokeDasharray: '5,5' },
    },
    { id: 'e-verify-output', source: 'verification-gate', target: 'production-output', label: 'all green ✓' },
  ],

  // ────────── Use Cases ─────────────────────────────────────────────────────
  useCases: [
    'Stakeholder draws a wireframe on a whiteboard → screenshot → full Azure app deployed in hours',
    'Product brief PDF → complete microservices architecture on Azure with CI/CD',
    'Client RFP document (Word/PDF) → technical architecture + working prototype',
    'PowerPoint pitch deck (PPTX) → deployable proof-of-concept matching every slide\'s feature',
    'Slack message or plain-text description → competition-ready hackathon app with infrastructure',
    'Legacy system migration document → modern Azure-native replacement scaffold',
    'Architecture Decision Record → fully provisioned Azure workload with AI agents',
    'Hand-drawn sketch photo → parsed requirements → production SaaS skeleton',
  ],

  // ────────── Code Example — TypeScript ─────────────────────────────────────
  codeExample: `// IgnitionStack Agent — Full TypeScript Implementation
// Turns any use-case input into a production Azure workload in 20 Ralph iterations
//
// Prerequisites:
//   npm i @azure/identity @azure/arm-resources openai pdf-parse mammoth pptx-parser
//   gh extension install github/gh-copilot
//   az login && gh auth login

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// ── Types ────────────────────────────────────────────────────────────────────

type InputType = 'screenshot' | 'text' | 'pdf' | 'pptx' | 'docx';

interface Task {
  id: string;
  title: string;
  description: string;
  acceptance: string[];         // Testable acceptance criteria
  priority: number;             // 1 = highest
  status: 'pending' | 'done' | 'blocked';
  category: 'infra' | 'agent' | 'db' | 'app' | 'ci' | 'test' | 'docs';
}

interface PRD {
  projectName: string;
  description: string;
  inputSource: string;          // Original input filename / description
  azureRegion: string;
  tasks: Task[];
  generatedAt: string;
}

interface IgnitionConfig {
  inputPath: string;            // Path to screenshot, PDF, PPTX, DOCX, or .txt
  inputType: InputType;
  projectName: string;
  azureRegion?: string;         // default: 'eastus2'
  model?: string;               // default: 'gpt-5.3-codex'
  iterations?: number;          // default: 20
  workDir?: string;             // default: './ignition-output'
}

// ── IgnitionStack Agent ──────────────────────────────────────────────────────

class IgnitionStackAgent {
  private config: Required<IgnitionConfig>;
  private prd!: PRD;

  constructor(config: IgnitionConfig) {
    this.config = {
      azureRegion: 'eastus2',
      model: 'gpt-5.3-codex',
      iterations: 20,
      workDir: './ignition-output',
      ...config,
    };
  }

  // ── STEP 1: Parse Input ──────────────────────────────────────────────────
  //
  // WHY THIS MATTERS (Instructional note):
  //   The quality of your output is bounded by the quality of your input
  //   parsing. A blurry screenshot will produce vague tasks. A well-structured
  //   PDF will produce precise tasks. IgnitionStack handles every format so
  //   stakeholders can hand you *whatever they have* — the agent adapts.

  async parseInput(): Promise<string> {
    const raw = fs.readFileSync(this.config.inputPath);

    switch (this.config.inputType) {
      case 'screenshot': {
        // Send image to GPT-5.3-codex vision endpoint for structured extraction
        const base64 = raw.toString('base64');
        const prompt = \`Analyze this screenshot/wireframe/diagram. Extract:
1. Every UI element, screen, and user flow
2. Backend services implied (auth, data, search, AI, etc.)
3. Data entities and relationships
4. Integration points (APIs, third-party services)
Return a structured JSON requirements document.\`;
        return this.llmCall(prompt, base64);
      }
      case 'pdf': {
        const pdfParse = require('pdf-parse');
        const data = await pdfParse(raw);
        return data.text;
      }
      case 'pptx': {
        // PPTX = zip of XML slides. Each slide often maps to a feature.
        // Parse slide titles + bullet points + speaker notes for full context.
        const pptxParser = require('pptx-parser');
        const slides = await pptxParser.parse(raw);
        return slides.map((s: any, i: number) =>
          \`## Slide \${i + 1}: \${s.title || 'Untitled'}\\n\${s.bullets?.join('\\n') || ''}\\nNotes: \${s.notes || 'none'}\`
        ).join('\\n\\n');
      }
      case 'docx': {
        const mammoth = require('mammoth');
        const result = await mammoth.extractRawText({ buffer: raw });
        return result.value;
      }
      case 'text':
      default:
        return raw.toString('utf-8');
    }
  }

  // ── STEP 2: Decompose Into Tasks ─────────────────────────────────────────
  //
  // INSTRUCTIONAL NOTE — The Decomposition Test:
  //   Every task must pass four gates before it enters the PRD:
  //     ✅ Testable   — Can a type-checker or test verify it?
  //     ✅ Bounded    — Can it be done in ONE iteration (< 30 min)?
  //     ✅ Independent — Does it avoid coupling to incomplete tasks?
  //     ✅ Committable — Does it produce a meaningful git commit?
  //
  //   If a task fails any gate, split it further. Aim for 30-50 tasks.

  async decompose(rawRequirements: string): Promise<Task[]> {
    const prompt = \`You are a senior Azure solutions architect and project planner.

Given these requirements, decompose them into 30-50 atomic tasks for building
a complete Azure workload. Each task must pass the Decomposition Test:
  - Testable: a type-checker or test can verify completion
  - Bounded: completable in one coding session (< 30 minutes)
  - Independent: no coupling to tasks not yet done
  - Committable: produces a meaningful git commit

Group tasks into these categories:
  infra  — Bicep templates, Azure resource provisioning
  agent  — Microsoft Foundry agent configs (Agent Framework), system prompts, tool defs
  db     — Database schema, migrations, seed data
  app    — Frontend + backend application code
  ci     — GitHub Actions, CI/CD pipelines
  test   — Integration tests, E2E tests, load test scaffolds
  docs   — README, ARCHITECTURE.md, deployment runbook

Return a JSON array of Task objects with: id, title, description,
acceptance (string[]), priority (1=highest), status ("pending"), category.

Requirements:
\${rawRequirements}\`;

    const response = await this.llmCall(prompt);
    return JSON.parse(response);
  }

  // ── STEP 3: Generate PRD.json ────────────────────────────────────────────
  //
  // WHY PRD.json IS THE HEART OF THE PATTERN:
  //   The PRD is the *only* state the Ralph loop reads. It is both the
  //   backlog and the source of truth. Each iteration reads it, picks the
  //   highest-priority pending task, does it, marks it done, commits.
  //   The loop is stateless — the PRD is the memory.

  generatePRD(tasks: Task[]): PRD {
    this.prd = {
      projectName: this.config.projectName,
      description: \`Auto-generated by IgnitionStack Agent from \${this.config.inputType} input\`,
      inputSource: path.basename(this.config.inputPath),
      azureRegion: this.config.azureRegion,
      tasks,
      generatedAt: new Date().toISOString(),
    };

    const outDir = this.config.workDir;
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(
      path.join(outDir, 'PRD.json'),
      JSON.stringify(this.prd, null, 2),
    );

    // Initialize progress.txt — the agent's external memory
    fs.writeFileSync(
      path.join(outDir, 'progress.txt'),
      \`# IgnitionStack Progress — \${this.config.projectName}\\n\` +
      \`# Generated: \${this.prd.generatedAt}\\n\` +
      \`# Total tasks: \${tasks.length}\\n\\n\`,
    );

    return this.prd;
  }

  // ── STEP 4: Generate Bicep Infrastructure ────────────────────────────────
  //
  // WHAT GETS GENERATED:
  //   main.bicep         — Orchestrator that calls module files
  //   modules/rg.bicep   — Resource group
  //   modules/app.bicep  — App Service + plan
  //   modules/db.bicep   — Cosmos DB or PostgreSQL Flexible Server
  //   modules/kv.bicep   — Key Vault with connection strings
  //   modules/ai.bicep   — Microsoft Foundry workspace + model deployments
  //   modules/search.bicep — Azure AI Search (for agentic RAG scenarios)
  //   modules/mon.bicep  — Application Insights + Log Analytics

  generateBicepInfra(): void {
    const infraDir = path.join(this.config.workDir, 'infra');
    fs.mkdirSync(path.join(infraDir, 'modules'), { recursive: true });

    const mainBicep = \`// IgnitionStack — Auto-generated Azure Infrastructure
// Deploy: az deployment sub create --location \${this.config.azureRegion} --template-file main.bicep

targetScope = 'subscription'

@description('Project name used for resource naming')
param projectName string = '\${this.config.projectName}'

@description('Azure region')
param location string = '\${this.config.azureRegion}'

@description('Environment (dev/staging/prod)')
param environment string = 'dev'

// Resource Group
module rg 'modules/rg.bicep' = {
  name: 'rg-\${projectName}'
  params: { projectName: projectName, location: location }
}

// Key Vault (deployed first — other modules reference it)
module kv 'modules/kv.bicep' = {
  name: 'kv-\${projectName}'
  scope: rg.outputs.resourceGroup
  params: { projectName: projectName, location: location }
}

// Database
module db 'modules/db.bicep' = {
  name: 'db-\${projectName}'
  scope: rg.outputs.resourceGroup
  params: {
    projectName: projectName
    location: location
    keyVaultName: kv.outputs.keyVaultName
  }
}

// Microsoft Foundry Workspace
module ai 'modules/ai.bicep' = {
  name: 'ai-\${projectName}'
  scope: rg.outputs.resourceGroup
  params: { projectName: projectName, location: location }
}

// Azure AI Search (agentic RAG scenarios)
module search 'modules/search.bicep' = {
  name: 'search-\${projectName}'
  scope: rg.outputs.resourceGroup
  params: { projectName: projectName, location: location }
}

// App Service
module app 'modules/app.bicep' = {
  name: 'app-\${projectName}'
  scope: rg.outputs.resourceGroup
  params: {
    projectName: projectName
    location: location
    environment: environment
    keyVaultName: kv.outputs.keyVaultName
  }
}

// Monitoring
module mon 'modules/mon.bicep' = {
  name: 'mon-\${projectName}'
  scope: rg.outputs.resourceGroup
  params: { projectName: projectName, location: location }
}
\`;

    fs.writeFileSync(path.join(infraDir, 'main.bicep'), mainBicep);
    console.log('✅ Bicep infrastructure templates generated');
  }

  // ── STEP 5: Generate Microsoft Foundry Agent Configurations ──────────────
  //    Uses Microsoft Agent Framework as the default agent runtime.
  //    Azure AI Search is provisioned for agentic RAG scenarios.

  generateFoundryAgents(): void {
    const agentDir = path.join(this.config.workDir, 'agents');
    fs.mkdirSync(agentDir, { recursive: true });

    const agentConfig = {
      framework: 'microsoft-agent-framework',  // Default runtime for Foundry-based agents
      agents: [
        {
          name: \`\${this.config.projectName}-assistant\`,
          model: 'gpt-5.3-codex',
          systemPrompt: \`You are an AI assistant for the \${this.config.projectName} application. Help users accomplish their goals efficiently and accurately.\`,
          tools: ['code_interpreter', 'file_search', 'azure_ai_search'],
          ragConfig: {
            provider: 'azure-ai-search',
            indexName: \`\${this.config.projectName}-index\`,
            semanticConfig: 'default',
          },
          evaluationCriteria: ['task_completion_rate', 'response_relevance', 'safety_score'],
        },
      ],
      workspace: {
        name: \`\${this.config.projectName}-foundry\`,
        region: this.config.azureRegion,
      },
    };

    fs.writeFileSync(
      path.join(agentDir, 'agent-config.json'),
      JSON.stringify(agentConfig, null, 2),
    );
    console.log('✅ Microsoft Foundry agent configurations generated (Agent Framework)');
  }

  // ── STEP 6: Generate Database Schema ─────────────────────────────────────

  generateDBSchema(): void {
    const dbDir = path.join(this.config.workDir, 'db');
    fs.mkdirSync(path.join(dbDir, 'migrations'), { recursive: true });

    const initialMigration = \`-- IgnitionStack Auto-generated Schema
-- Migration: 001_initial
-- Generated: \${new Date().toISOString()}

CREATE TABLE IF NOT EXISTS users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       VARCHAR(255) UNIQUE NOT NULL,
  name        VARCHAR(255) NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL,
  owner_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  metadata    JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Add project-specific tables during Ralph iterations
\`;

    fs.writeFileSync(path.join(dbDir, 'migrations', '001_initial.sql'), initialMigration);
    console.log('✅ Database schema and migrations generated');
  }

  // ── STEP 7: Generate Application Scaffold ────────────────────────────────

  generateAppScaffold(): void {
    const appDir = path.join(this.config.workDir, 'app');
    fs.mkdirSync(path.join(appDir, 'src'), { recursive: true });

    const packageJson = {
      name: this.config.projectName,
      version: '0.1.0',
      private: true,
      scripts: {
        dev: 'vite',
        build: 'tsc && vite build',
        test: 'vitest',
        lint: 'eslint . --ext .ts,.tsx',
      },
    };

    fs.writeFileSync(
      path.join(appDir, 'package.json'),
      JSON.stringify(packageJson, null, 2),
    );
    console.log('✅ Application scaffold generated');
  }

  // ── STEP 8: Initialize GitHub Repository ─────────────────────────────────

  initGitHubRepo(): void {
    const dir = this.config.workDir;
    execSync('git init', { cwd: dir });
    execSync('git add -A', { cwd: dir });
    execSync('git commit -m "feat: IgnitionStack initial scaffold"', { cwd: dir });
    execSync(
      \`gh repo create \${this.config.projectName} --private --source=. --push\`,
      { cwd: dir },
    );
    console.log('✅ GitHub repository created and initial scaffold pushed');
  }

  // ── STEP 9: Generate CI/CD Pipeline ──────────────────────────────────────

  generateCICD(): void {
    const ciDir = path.join(this.config.workDir, '.github', 'workflows');
    fs.mkdirSync(ciDir, { recursive: true });

    const workflow = \`name: IgnitionStack CI/CD
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build

  deploy-infra:
    needs: build-and-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: azure/login@v2
        with:
          creds: \\\${{ secrets.AZURE_CREDENTIALS }}
      - uses: azure/arm-deploy@v2
        with:
          scope: subscription
          region: \${this.config.azureRegion}
          template: infra/main.bicep

  deploy-app:
    needs: deploy-infra
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: azure/login@v2
        with:
          creds: \\\${{ secrets.AZURE_CREDENTIALS }}
      - run: npm ci && npm run build
      - uses: azure/webapps-deploy@v3
        with:
          app-name: \${this.config.projectName}-app
          package: ./dist
\`;

    fs.writeFileSync(path.join(ciDir, 'ci-cd.yml'), workflow);
    console.log('✅ GitHub Actions CI/CD pipeline generated');
  }

  // ── STEP 10: Generate & Execute ralph.sh (The Core) ──────────────────────
  //
  // THIS IS THE HEART OF IGNITIONSTACK.
  //
  // Why a bash loop and not an orchestrator framework?
  //   1. Context Window Hygiene: each iteration starts clean — no
  //      accumulated confusion from 19 previous conversations.
  //   2. Atomic Commits: each iteration = exactly one git commit.
  //      You can git bisect to find where anything went wrong.
  //   3. Fault Tolerance: if iteration 12 fails, iterations 1-11
  //      are already committed. Fix the task and re-run from 12.
  //   4. Simplicity: 30 lines of bash. No dependencies. No frameworks.
  //      If you can read a for-loop, you understand the entire system.

  generateRalphScript(): void {
    const script = \`#!/usr/bin/env bash
# ╔═══════════════════════════════════════════════════════════════════════════╗
# ║  ralph.sh — IgnitionStack Ralph Loop                                     ║
# ║  20 iterations × gpt-5.3-codex via gh copilot                           ║
# ║                                                                          ║
# ║  HOW IT WORKS:                                                           ║
# ║  1. Each iteration reads PRD.json to find the highest-priority           ║
# ║     pending task                                                         ║
# ║  2. The agent implements it, runs type-check + tests                     ║
# ║  3. If tests pass → mark done in PRD.json, update progress.txt,         ║
# ║     git commit                                                           ║
# ║  4. If tests fail → leave task pending, log failure in progress.txt,     ║
# ║     move to next iteration (fresh context will retry)                    ║
# ║  5. After 20 iterations, whatever remains pending needs human review     ║
# ╚═══════════════════════════════════════════════════════════════════════════╝

set -euo pipefail

PROJECT_DIR="\$(cd "\$(dirname "\$0")" && pwd)"
PRD="\$PROJECT_DIR/PRD.json"
PROGRESS="\$PROJECT_DIR/progress.txt"
MODEL="gpt-5.3-codex"
ITERATIONS=20

echo "🚀 IgnitionStack Ralph Loop — \$ITERATIONS iterations with \$MODEL"
echo "   Project: \$(jq -r '.projectName' "\$PRD")"
echo "   Tasks:   \$(jq '[.tasks[] | select(.status == "pending")] | length' "\$PRD") pending"
echo ""

for i in \$(seq 1 \$ITERATIONS); do
  PENDING=\$(jq '[.tasks[] | select(.status == "pending")] | length' "\$PRD")

  if [ "\$PENDING" -eq 0 ]; then
    echo "✅ All tasks complete after \$((i - 1)) iterations!"
    break
  fi

  echo "━━━ Iteration \$i/\$ITERATIONS — \$PENDING tasks remaining ━━━"

  # The prompt: everything the agent needs in one shot
  gh copilot code \\
    --model "\$MODEL" \\
    --file "\$PRD" \\
    --file "\$PROGRESS" \\
    -m "You are building the project described in PRD.json.

Read PRD.json and progress.txt for context.

YOUR TASK FOR THIS ITERATION:
1. Find the highest-priority task with status 'pending'
2. Implement it completely — write all necessary code and tests
3. Run type-checking: npm run build (or equivalent)
4. Run tests: npm test (or equivalent)
5. If both pass:
   - Update PRD.json: set the task status to 'done'
   - Append a summary to progress.txt with what you did and learned
   - Git commit with message: 'feat(\$TASK_ID): \$TASK_TITLE'
6. If tests fail:
   - Do NOT mark the task as done
   - Append the failure details to progress.txt
   - Still git commit work-in-progress: 'wip(\$TASK_ID): \$TASK_TITLE'

RULES:
- Complete exactly ONE task per iteration
- Never skip the type-check or tests
- Always commit — even partial work has value
- Write progress.txt entries for the next iteration's context"

  echo ""
  echo "   Completed iteration \$i"
  echo "   Remaining: \$(jq '[.tasks[] | select(.status == "pending")] | length' "\$PRD") tasks"
  echo ""
done

# Final report
DONE=\$(jq '[.tasks[] | select(.status == "done")] | length' "\$PRD")
TOTAL=\$(jq '.tasks | length' "\$PRD")
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 IgnitionStack Complete"
echo "   Completed: \$DONE / \$TOTAL tasks"
echo "   Commits:   \$(git log --oneline | wc -l)"
echo "   Status:    \$([ "\$DONE" -eq "\$TOTAL" ] && echo '✅ ALL DONE' || echo '⚠️  Some tasks need human review')"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
\`;

    fs.writeFileSync(path.join(this.config.workDir, 'ralph.sh'), script);
    execSync(\`chmod +x \${path.join(this.config.workDir, 'ralph.sh')}\`);
    console.log('✅ ralph.sh generated and made executable');
  }

  // ── ORCHESTRATE: Run the full pipeline ───────────────────────────────────

  async run(): Promise<void> {
    console.log(\`\\n🔥 IgnitionStack Agent — Igniting \${this.config.projectName}\`);
    console.log(\`   Input:      \${this.config.inputPath} (\${this.config.inputType})\`);
    console.log(\`   Model:      \${this.config.model}\`);
    console.log(\`   Iterations: \${this.config.iterations}\`);
    console.log(\`   Region:     \${this.config.azureRegion}\\n\`);

    // Phase 1: Understand
    const requirements = await this.parseInput();
    console.log('📋 Requirements extracted (' + requirements.length + ' chars)');

    // Phase 2: Plan
    const tasks = await this.decompose(requirements);
    const prd = this.generatePRD(tasks);
    console.log(\`📋 PRD generated: \${prd.tasks.length} tasks across \${
      [...new Set(prd.tasks.map(t => t.category))].length
    } categories\`);

    // Phase 3: Scaffold
    this.generateBicepInfra();
    this.generateFoundryAgents();
    this.generateDBSchema();
    this.generateAppScaffold();
    this.generateCICD();

    // Phase 4: Ship
    this.initGitHubRepo();
    this.generateRalphScript();

    console.log(\`
┌─────────────────────────────────────────────────────────────┐
│  🔥 IgnitionStack scaffold complete!                        │
│                                                             │
│  Next step — run the Ralph loop:                            │
│                                                             │
│    cd \${this.config.workDir}                                │
│    bash ralph.sh                                            │
│                                                             │
│  This will execute \${this.config.iterations} iterations using \${this.config.model},   │
│  building your entire project one task at a time.           │
│                                                             │
│  Monitor progress:                                          │
│    tail -f progress.txt                                     │
│    jq '.tasks[] | select(.status == "done")' PRD.json       │
└─────────────────────────────────────────────────────────────┘
\`);
  }

  // ── Helper: LLM Call ─────────────────────────────────────────────────────

  private async llmCall(prompt: string, imageBase64?: string): Promise<string> {
    const { OpenAI } = require('openai');
    const client = new OpenAI();

    const messages: any[] = imageBase64
      ? [{
          role: 'user' as const,
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: \`data:image/png;base64,\${imageBase64}\` } },
          ],
        }]
      : [{ role: 'user' as const, content: prompt }];

    const response = await client.chat.completions.create({
      model: this.config.model,
      messages,
      temperature: 0.2,
      max_tokens: 16000,
    });

    return response.choices[0].message.content || '';
  }
}

// ── Usage Example ────────────────────────────────────────────────────────────

async function main() {
  const agent = new IgnitionStackAgent({
    inputPath: './use-case.pptx',      // or .png, .pdf, .docx, .txt
    inputType: 'pptx',
    projectName: 'contoso-portal',
    azureRegion: 'eastus2',
    model: 'gpt-5.3-codex',
    iterations: 20,
  });

  await agent.run();
  // Then: cd ./ignition-output && bash ralph.sh
}

main().catch(console.error);`,

  // ────────── Code Example — Python ─────────────────────────────────────────
  pythonCodeExample: `"""
IgnitionStack Agent — Python Implementation
Turns any use-case input into a production Azure workload in 20 Ralph iterations.

Prerequisites:
    pip install openai python-pptx python-docx PyPDF2
    gh extension install github/gh-copilot
    az login && gh auth login
"""

import json
import os
import subprocess
import base64
from pathlib import Path
from datetime import datetime
from dataclasses import dataclass, field, asdict
from enum import Enum
from typing import Optional


# ── Types ────────────────────────────────────────────────────────────────────

class InputType(Enum):
    SCREENSHOT = "screenshot"
    TEXT = "text"
    PDF = "pdf"
    PPTX = "pptx"          # PowerPoint — each slide ≈ one feature
    DOCX = "docx"


class TaskCategory(Enum):
    INFRA = "infra"
    AGENT = "agent"
    DB = "db"
    APP = "app"
    CI = "ci"
    TEST = "test"
    DOCS = "docs"


@dataclass
class Task:
    id: str
    title: str
    description: str
    acceptance: list[str]
    priority: int
    status: str = "pending"
    category: str = "app"


@dataclass
class PRD:
    project_name: str
    description: str
    input_source: str
    azure_region: str
    tasks: list[Task]
    generated_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())


# ── IgnitionStack Agent ──────────────────────────────────────────────────────

class IgnitionStackAgent:
    """
    End-to-end use-case → Azure workload generator.

    The pipeline:
      1. Parse input (screenshot, text, PDF, PPTX, DOCX)
      2. Decompose into 30-50 atomic tasks (the Decomposition Test)
      3. Generate PRD.json + progress.txt
      4. Generate Bicep infrastructure
      5. Generate Microsoft Foundry agent configs (via Agent Framework)
      6. Generate database schema
      7. Generate application scaffold
      8. Initialize GitHub repo
      9. Generate CI/CD pipeline
     10. Generate ralph.sh — 20-iteration bash loop with gpt-5.3-codex
    """

    def __init__(
        self,
        input_path: str,
        input_type: InputType,
        project_name: str,
        azure_region: str = "eastus2",
        model: str = "gpt-5.3-codex",
        iterations: int = 20,
        work_dir: str = "./ignition-output",
    ):
        self.input_path = Path(input_path)
        self.input_type = input_type
        self.project_name = project_name
        self.azure_region = azure_region
        self.model = model
        self.iterations = iterations
        self.work_dir = Path(work_dir)
        self.prd: Optional[PRD] = None

    # ── Step 1: Parse Input ──────────────────────────────────────────────────

    def parse_input(self) -> str:
        """
        Accepts ANY format the stakeholder has and extracts structured text.

        KEY INSIGHT (Instructional):
            Stakeholders don't produce clean requirements docs. They have
            napkin sketches, slide decks, and half-written briefs. The agent
            must meet them where they are — not force a format on them.
        """
        raw = self.input_path.read_bytes()

        if self.input_type == InputType.SCREENSHOT:
            b64 = base64.b64encode(raw).decode()
            return self._llm_call(
                "Analyze this image. Extract all UI elements, backend services, "
                "data entities, and integration points as structured JSON.",
                image_b64=b64,
            )

        elif self.input_type == InputType.PDF:
            from PyPDF2 import PdfReader
            reader = PdfReader(self.input_path)
            return "\\n".join(page.extract_text() or "" for page in reader.pages)

        elif self.input_type == InputType.PPTX:
            # Each slide ≈ one feature or user story
            from pptx import Presentation
            prs = Presentation(self.input_path)
            slides_text = []
            for i, slide in enumerate(prs.slides, 1):
                title = slide.shapes.title.text if slide.shapes.title else "Untitled"
                bodies = [
                    shape.text for shape in slide.shapes
                    if shape.has_text_frame and shape != slide.shapes.title
                ]
                notes = (
                    slide.notes_slide.notes_text_frame.text
                    if slide.has_notes_slide else ""
                )
                slides_text.append(
                    f"## Slide {i}: {title}\\n"
                    + "\\n".join(bodies)
                    + (f"\\nSpeaker Notes: {notes}" if notes else "")
                )
            return "\\n\\n".join(slides_text)

        elif self.input_type == InputType.DOCX:
            from docx import Document
            doc = Document(self.input_path)
            return "\\n".join(p.text for p in doc.paragraphs)

        else:  # Plain text
            return raw.decode("utf-8")

    # ── Step 2: Decompose ────────────────────────────────────────────────────

    def decompose(self, requirements: str) -> list[Task]:
        """
        The Decomposition Test — every task must be:
          ✅ Testable  ✅ Bounded  ✅ Independent  ✅ Committable
        """
        prompt = f"""Decompose these requirements into 30-50 atomic tasks.
Each task must pass: Testable? Bounded? Independent? Committable?

Categories: infra, agent, db, app, ci, test, docs

Return JSON array of objects with keys:
  id, title, description, acceptance (list), priority (int), status, category

Requirements:
{requirements}"""

        response = self._llm_call(prompt)
        return [Task(**t) for t in json.loads(response)]

    # ── Step 3: Generate PRD ─────────────────────────────────────────────────

    def generate_prd(self, tasks: list[Task]) -> PRD:
        self.prd = PRD(
            project_name=self.project_name,
            description=f"Auto-generated by IgnitionStack from {self.input_type.value}",
            input_source=self.input_path.name,
            azure_region=self.azure_region,
            tasks=tasks,
        )

        self.work_dir.mkdir(parents=True, exist_ok=True)
        (self.work_dir / "PRD.json").write_text(
            json.dumps(asdict(self.prd), indent=2)
        )
        (self.work_dir / "progress.txt").write_text(
            f"# IgnitionStack Progress — {self.project_name}\\n"
            f"# Generated: {self.prd.generated_at}\\n"
            f"# Total tasks: {len(tasks)}\\n\\n"
        )
        return self.prd

    # ── Steps 4-9: Scaffold Generators (abbreviated for clarity) ─────────────

    def generate_bicep_infra(self):
        \"\"\"Generates Azure Bicep templates under infra/.\"\"\"
        infra_dir = self.work_dir / "infra" / "modules"
        infra_dir.mkdir(parents=True, exist_ok=True)
        # main.bicep + module files generated here...
        print("✅ Bicep infrastructure templates generated")

    def generate_foundry_agents(self):
        \"\"\"Generates Microsoft Foundry agent configurations (Agent Framework) under agents/.\"\"\"
        agent_dir = self.work_dir / "agents"
        agent_dir.mkdir(parents=True, exist_ok=True)
        print("✅ Microsoft Foundry agent configurations generated (Agent Framework)")

    def generate_db_schema(self):
        \"\"\"Generates database migrations under db/.\"\"\"
        db_dir = self.work_dir / "db" / "migrations"
        db_dir.mkdir(parents=True, exist_ok=True)
        print("✅ Database schema generated")

    def generate_app_scaffold(self):
        \"\"\"Generates frontend + backend app code under app/.\"\"\"
        app_dir = self.work_dir / "app" / "src"
        app_dir.mkdir(parents=True, exist_ok=True)
        print("✅ Application scaffold generated")

    def init_github_repo(self):
        subprocess.run(["git", "init"], cwd=self.work_dir, check=True)
        subprocess.run(["git", "add", "-A"], cwd=self.work_dir, check=True)
        subprocess.run(
            ["git", "commit", "-m", "feat: IgnitionStack initial scaffold"],
            cwd=self.work_dir, check=True,
        )
        subprocess.run(
            ["gh", "repo", "create", self.project_name, "--private", "--source=.", "--push"],
            cwd=self.work_dir, check=True,
        )
        print("✅ GitHub repository created")

    def generate_cicd(self):
        ci_dir = self.work_dir / ".github" / "workflows"
        ci_dir.mkdir(parents=True, exist_ok=True)
        print("✅ GitHub Actions CI/CD pipeline generated")

    # ── Step 10: Generate ralph.sh ───────────────────────────────────────────

    def generate_ralph_script(self):
        script = f\"\"\"#!/usr/bin/env bash
# ralph.sh — IgnitionStack Ralph Loop ({self.iterations} iterations × {self.model})
set -euo pipefail

PRD="$(cd "$(dirname "$0")" && pwd)/PRD.json"
PROGRESS="$(cd "$(dirname "$0")" && pwd)/progress.txt"

for i in $(seq 1 {self.iterations}); do
  PENDING=$(jq '[.tasks[] | select(.status == "pending")] | length' "$PRD")
  [ "$PENDING" -eq 0 ] && echo "✅ All tasks done!" && break
  echo "━━━ Iteration $i/{self.iterations} — $PENDING remaining ━━━"
  gh copilot code --model "{self.model}" --file "$PRD" --file "$PROGRESS" \\
    -m "Read PRD.json. Pick highest-priority pending task. Implement, test, commit."
done
\"\"\"
        script_path = self.work_dir / "ralph.sh"
        script_path.write_text(script)
        script_path.chmod(0o755)
        print("✅ ralph.sh generated")

    # ── Run Full Pipeline ────────────────────────────────────────────────────

    def run(self):
        print(f"\\n🔥 IgnitionStack — Igniting {self.project_name}")

        requirements = self.parse_input()
        tasks = self.decompose(requirements)
        self.generate_prd(tasks)
        self.generate_bicep_infra()
        self.generate_foundry_agents()
        self.generate_db_schema()
        self.generate_app_scaffold()
        self.init_github_repo()
        self.generate_cicd()
        self.generate_ralph_script()

        print(f\"\"\"
┌─────────────────────────────────────────────────────┐
│  🔥 IgnitionStack scaffold complete!                │
│                                                     │
│  cd {self.work_dir} && bash ralph.sh                │
│                                                     │
│  Monitor: tail -f progress.txt                      │
└─────────────────────────────────────────────────────┘
\"\"\")

    # ── Helper ───────────────────────────────────────────────────────────────

    def _llm_call(self, prompt: str, image_b64: str | None = None) -> str:
        from openai import OpenAI
        client = OpenAI()
        messages = (
            [{"role": "user", "content": [
                {"type": "text", "text": prompt},
                {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{image_b64}"}},
            ]}]
            if image_b64
            else [{"role": "user", "content": prompt}]
        )
        resp = client.chat.completions.create(
            model=self.model, messages=messages, temperature=0.2, max_tokens=16000,
        )
        return resp.choices[0].message.content or ""


# ── Usage ────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    agent = IgnitionStackAgent(
        input_path="./use-case.pptx",    # or .png, .pdf, .docx, .txt
        input_type=InputType.PPTX,
        project_name="contoso-portal",
    )
    agent.run()
    # Then: cd ./ignition-output && bash ralph.sh`,

  // ────────── Implementation Steps ──────────────────────────────────────────
  // Highly detailed — this is THE instructional walkthrough for the pattern.
  implementation: [
    // ── Phase 1: Setup (~5 min) ──────────────────────────────────────────
    'PREREQUISITES — Install the tools you\'ll need:\n'
    + '  • Azure CLI (`az login` — must have an active subscription)\n'
    + '  • GitHub CLI (`gh auth login` — needs repo + read:org scopes)\n'
    + '  • gh-copilot extension (`gh extension install github/gh-copilot`)\n'
    + '  • Node.js 20+ and/or Python 3.11+\n'
    + '  • jq (for PRD.json parsing inside ralph.sh)',

    'GATHER YOUR INPUT — IgnitionStack accepts anything your stakeholders already have:\n'
    + '  📸 Screenshot/photo — whiteboard wireframe, hand-drawn sketch, Figma export\n'
    + '  📄 PDF — product brief, requirements doc, architecture diagram\n'
    + '  📊 PPTX — pitch deck where each slide maps to a feature or user story\n'
    + '  📝 DOCX — Word document with specifications, user stories, or RFP responses\n'
    + '  💬 Text — Slack message, email body, or plain-text description\n'
    + '\n'
    + '  TIP: The richer the input, the better the decomposition. A 15-slide PPTX\n'
    + '  with speaker notes will produce more precise tasks than a 2-sentence Slack message.',

    // ── Phase 2: Parse & Decompose (~10 min with LLM calls) ──────────────
    'PARSE THE INPUT — The agent auto-detects format and extracts structured text:\n'
    + '  • Screenshots → GPT-5.3-codex vision: extracts UI elements, data flows, service boundaries\n'
    + '  • PDFs → text extraction with layout preservation\n'
    + '  • PPTX → slide-by-slide parsing (title + bullets + speaker notes per slide)\n'
    + '  • DOCX → paragraph extraction with heading hierarchy\n'
    + '  • Text → direct passthrough\n'
    + '\n'
    + '  The parser produces a single unified requirements string regardless of input format.',

    'DECOMPOSE INTO ATOMIC TASKS — The LLM applies the Decomposition Test to every proposed task:\n'
    + '  ✅ Testable?    — Can a type-checker or unit test verify this is done?\n'
    + '  ✅ Bounded?     — Can it be completed in one iteration (< 30 min of agent work)?\n'
    + '  ✅ Independent? — Does it avoid coupling to tasks that aren\'t done yet?\n'
    + '  ✅ Committable? — Does it produce a meaningful, standalone git commit?\n'
    + '\n'
    + '  If a task fails any gate, it gets split further. Target: 30-50 tasks.\n'
    + '  Tasks are categorized: infra | agent | db | app | ci | test | docs',

    'GENERATE PRD.json — The prioritized task backlog that drives the entire Ralph loop.\n\n'
    + 'Real-world example: A healthcare clinic asked for a patient intake portal.\n'
    + 'Their solution architect submitted a 12-slide PPTX. IgnitionStack produced this PRD:\n\n'
    + '  Project: meridian-patient-portal\n'
    + '  Input:   Meridian_Patient_Portal_Architecture.pptx\n'
    + '  Region:  eastus2\n\n'
    + '  ┌──────────┬─────────────────────────────────────────────────────────────┬──────────┐\n'
    + '  │ ID       │ Task                                                        │ Category │\n'
    + '  ├──────────┼─────────────────────────────────────────────────────────────┼──────────┤\n'
    + '  │ INFRA-01 │ Create resource group + Key Vault via Bicep                 │ infra    │\n'
    + '  │ INFRA-02 │ Provision Cosmos DB (patients + appointments containers)    │ infra    │\n'
    + '  │ INFRA-03 │ Deploy MS Foundry workspace + gpt-5.3-codex model            │ infra    │\n'
    + '  │ DB-01    │ Patients schema (demographics, insurance, medical history)  │ db       │\n'
    + '  │ DB-02    │ Appointments schema with provider availability slots        │ db       │\n'
    + '  │ APP-01   │ Scaffold FastAPI backend + React frontend (monorepo)        │ app      │\n'
    + '  │ APP-02   │ Patient registration form with insurance verification       │ app      │\n'
    + '  │ APP-03   │ Appointment scheduling with real-time slot availability     │ app      │\n'
    + '  │ AGENT-01 │ Intake triage agent (symptom → department routing)          │ agent    │\n'
    + '  │ AGENT-02 │ Lab-results summarizer with RAG over patient history        │ agent    │\n'
    + '  │ CI-01    │ GitHub Actions: build → test → Bicep deploy → app deploy    │ ci       │\n'
    + '  │ TEST-01  │ E2E: patient registers → books appt → gets confirmation    │ test     │\n'
    + '  │ DOCS-01  │ README + ARCHITECTURE.md + runbook + HIPAA notes            │ docs     │\n'
    + '  └──────────┴─────────────────────────────────────────────────────────────┴──────────┘\n\n'
    + 'Each task has testable acceptance criteria. Example:\n'
    + '  AGENT-01 acceptance: "Routes chest-pain → Cardiology, rash → Dermatology, logs confidence"\n'
    + '  TEST-01 acceptance:  "Playwright completes in <30s, covers happy path + insurance rejection"\n\n'
    + '13 tasks across 6 categories — auto-generated from a PPTX in ~90 seconds.\n'
    + 'Also initializes progress.txt — the agent\'s external memory across iterations.',

    // ── Phase 3: Scaffold Generation (~2 min) ────────────────────────────
    'GENERATE BICEP INFRASTRUCTURE — Azure resource definitions:\n'
    + '  infra/main.bicep           — Orchestrator (subscription-scoped deployment)\n'
    + '  infra/modules/rg.bicep     — Resource Group\n'
    + '  infra/modules/app.bicep    — App Service + App Service Plan\n'
    + '  infra/modules/db.bicep     — Azure Cosmos DB or PostgreSQL Flexible Server\n'
    + '  infra/modules/kv.bicep     — Key Vault (connection strings, secrets)\n'
    + '  infra/modules/ai.bicep     — Microsoft Foundry workspace + model deployments\n'
    + '  infra/modules/search.bicep — Azure AI Search (agentic RAG scenarios)\n'
    + '  infra/modules/mon.bicep    — Application Insights + Log Analytics\n'
    + '\n'
    + '  Deploy manually: az deployment sub create --location eastus2 --template-file infra/main.bicep\n'
    + '  Or let the Ralph loop handle it via the INFRA-* tasks in PRD.json.',

    'GENERATE MICROSOFT FOUNDRY AGENT CONFIGS — Under agents/:\n'
    + '  Built on Microsoft Agent Framework (default runtime for Foundry-based agents).\n'
    + '  agent-config.json defines each AI agent\'s:\n'
    + '    • System prompt (role, constraints, output format)\n'
    + '    • Tool definitions (code_interpreter, file_search, azure_ai_search, custom functions)\n'
    + '    • RAG config (Azure AI Search index for agentic RAG scenarios)\n'
    + '    • Evaluation criteria (task completion rate, relevance, safety)\n'
    + '    • Model assignment (gpt-5.3-codex for coding agents, gpt-5.3 for conversational)\n'
    + '\n'
    + '  These configs are deployed to Microsoft Foundry during the Ralph loop\'s agent tasks.\n'
    + '  Azure AI Search provides grounded retrieval for RAG-dependent use cases.',

    'GENERATE DATABASE SCHEMA + MIGRATIONS — Under db/migrations/:\n'
    + '  001_initial.sql             — Core tables (users, projects, etc.)\n'
    + '  Subsequent migrations       — Generated during Ralph iterations as APP tasks complete\n'
    + '  seed.sql                    — Development seed data\n'
    + '\n'
    + '  Connection strings are stored in Key Vault; the app reads them via managed identity.\n'
    + '  The schema is designed to be cloud-native: UUIDs, JSONB for flexible metadata, timestamptz.',

    'GENERATE APPLICATION SCAFFOLD — Under app/:\n'
    + '  package.json with scripts: dev, build, test, lint\n'
    + '  src/ directory with starter code appropriate to the detected framework\n'
    + '  tsconfig.json / pyproject.toml depending on detected stack\n'
    + '\n'
    + '  The Ralph loop fills this scaffold with real business logic during APP-* tasks.',

    'INITIALIZE GITHUB REPOSITORY:\n'
    + '  1. git init + commit the full scaffold\n'
    + '  2. gh repo create <project-name> --private --source=. --push\n'
    + '  3. Configure branch protection on main (require PR reviews, status checks)\n'
    + '  4. Add CODEOWNERS file\n'
    + '\n'
    + '  From this point, every Ralph iteration creates exactly one atomic git commit.\n'
    + '  The commit history IS the project\'s build story — readable, bisectable, reviewable.',

    'GENERATE CI/CD PIPELINE — .github/workflows/ci-cd.yml:\n'
    + '  Jobs:\n'
    + '    build-and-test  — checkout → setup-node → npm ci → lint → test → build\n'
    + '    deploy-infra    — az login → bicep deploy (runs only on main)\n'
    + '    deploy-app      — az login → build → azure/webapps-deploy\n'
    + '\n'
    + '  Required secrets: AZURE_CREDENTIALS (service principal JSON)\n'
    + '  The pipeline validates every push, so the Ralph loop gets immediate CI feedback.',

    // ── Phase 4: The Ralph Loop (~1-3 hours for 20 iterations) ───────────
    'GENERATE ralph.sh — The 20-iteration autonomous coding loop:\n'
    + '  This is the heart of IgnitionStack. Each iteration:\n'
    + '    1. Reads PRD.json → finds highest-priority pending task\n'
    + '    2. Reads progress.txt → gets context from previous iterations\n'
    + '    3. Implements the task (writes code, tests, configs)\n'
    + '    4. Runs verification: type-check + tests\n'
    + '    5. On success → marks task done, appends to progress.txt, git commits\n'
    + '    6. On failure → logs failure, commits WIP, moves on (next iteration retries)\n'
    + '\n'
    + '  WHY 20 ITERATIONS?\n'
    + '    A typical 30-50 task PRD needs ~15-25 iterations because:\n'
    + '    • Some tasks complete in seconds (config files, simple schemas)\n'
    + '    • Some tasks need 2 iterations (complex logic → first attempt + retry)\n'
    + '    • 20 is the sweet spot: enough to finish most projects, not so many that\n'
    + '      you waste tokens if the agent gets stuck on an impossible task\n'
    + '    • Adjust higher (30-40) for large projects; lower (10) for focused PoCs',

    'RUN THE RALPH LOOP — Execute the autonomous build:\n'
    + '  cd ./ignition-output\n'
    + '  bash ralph.sh\n'
    + '\n'
    + '  WHAT HAPPENS DURING EXECUTION:\n'
    + '  • Iterations 1-5:   Infrastructure provisioning (Bicep deploy, DNS, SSL)\n'
    + '  • Iterations 6-10:  Core application logic (API routes, auth, business rules)\n'
    + '  • Iterations 11-15: AI agent integration (Microsoft Foundry + Agent Framework, Azure AI Search RAG, tools)\n'
    + '  • Iterations 16-18: Frontend UI and integration testing\n'
    + '  • Iteration 19:     E2E smoke tests, load test scaffold\n'
    + '  • Iteration 20:     Documentation — README, ARCHITECTURE.md, deployment runbook\n'
    + '\n'
    + '  MONITOR IN REAL TIME:\n'
    + '    Terminal 1: bash ralph.sh\n'
    + '    Terminal 2: tail -f progress.txt\n'
    + '    Terminal 3: watch -n5 \'jq "[.tasks[] | select(.status==\\"done\\")] | length" PRD.json\'',

    'HUMAN-IN-THE-LOOP MODE (optional) — For more control, run one iteration at a time:\n'
    + '  for i in {1..20}; do\n'
    + '    echo "Press Enter to start iteration $i (or Ctrl+C to stop)..."\n'
    + '    read\n'
    + '    gh copilot code --model gpt-5.3-codex --file PRD.json --file progress.txt \\\n'
    + '      -m "Pick highest-priority pending task. Implement, test, commit."\n'
    + '  done\n'
    + '\n'
    + '  This lets you review each iteration\'s commit before proceeding.\n'
    + '  Excellent for learning: read the diff, understand what the agent did, then continue.',

    // ── Phase 5: Verify & Ship ───────────────────────────────────────────
    'VERIFY THE OUTPUT — After 20 iterations, validate everything:\n'
    + '  ✅ All Bicep resources deployed:  az resource list --resource-group <rg-name>\n'
    + '  ✅ All tests passing:             npm test (or pytest)\n'
    + '  ✅ CI/CD pipeline green:          gh run list --limit 5\n'
    + '  ✅ App accessible:                curl https://<project-name>-app.azurewebsites.net/health\n'
    + '  ✅ AI agents responding:          Test via Microsoft Foundry playground\n'
    + '  ✅ All PRD tasks done:            jq \'[.tasks[] | select(.status=="pending")] | length\' PRD.json\n'
    + '\n'
    + '  If any tasks remain pending, they need human attention — the agent will have\n'
    + '  logged why it got stuck in progress.txt.',

    'HAND OFF THE PROJECT — What the recipient gets:\n'
    + '  📦 GitHub repository with full commit history (one commit per task)\n'
    + '  ☁️ Deployed Azure infrastructure (Bicep-defined, reproducible)\n'
    + '  🤖 Microsoft Foundry agents configured and deployed (Agent Framework)\n'
    + '  � Azure AI Search index wired for agentic RAG scenarios\n'
    + '  🗄️ Database with schema, migrations, and seed data\n'
    + '  💻 Working application (frontend + backend)\n'
    + '  🔄 CI/CD pipeline (GitHub Actions)\n'
    + '  📋 PRD.json — the complete task history showing what was built and why\n'
    + '  📝 progress.txt — iteration-by-iteration narrative of the build process\n'
    + '  📖 README + ARCHITECTURE.md + deployment runbook\n'
    + '\n'
    + '  This is what "agents are the new apps" looks like in practice — the\n'
    + '  deliverable is not just an app, it\'s a complete workload where AI agents\n'
    + '  are deployed, tested, and CI/CD-managed as first-class citizens.\n'
    + '\n'
    + '  The commit history reads like a project diary. New team members can\n'
    + '  git log --oneline to understand the build sequence.',

    'ITERATE BEYOND 20 — If 20 iterations weren\'t enough:\n'
    + '  1. Review progress.txt to understand what\'s unfinished and why\n'
    + '  2. Edit PRD.json — reprioritize remaining tasks, split any that are too large\n'
    + '  3. Re-run: for i in {1..10}; do gh copilot code ...; done\n'
    + '  4. Or switch to human-in-the-loop mode for tricky remaining tasks\n'
    + '\n'
    + '  You can also EXTEND the PRD with new features post-launch.\n'
    + '  IgnitionStack isn\'t just for initial scaffolding — it\'s a continuous delivery pattern.',
  ],

  // ────────── Advantages ────────────────────────────────────────────────────
  advantages: [
    'Agents-as-apps paradigm: scaffolds and deploys AI agents as first-class workload components — not add-ons — alongside infrastructure, databases, and application code; the output is a modern workload where agents handle reasoning and retrieval while traditional code handles UX and integration',
    'Zero-to-production speed: from a stakeholder\'s PPTX to a deployed Azure workload (app + agents) in hours, not weeks',
    'Context Window Hygiene: each Ralph iteration starts with a fresh context — no accumulated confusion or instruction drift that plagues long-running agent sessions',
    'Full Azure-native output: Bicep infrastructure-as-code means every resource is reproducible, version-controlled, and auditable — no ClickOps',
    'Git-native audit trail: one commit per task creates a bisectable, reviewable project history — new team members read the git log to understand the build sequence',
    'Input flexibility: accepts screenshots, PDFs, PPTX decks, Word docs, or plain text — meet stakeholders where they are, not where you wish they were',
    'Model-agnostic: swap gpt-5.3-codex for any CLI-accessible model (claude, gemini, codex, gh copilot) by changing one variable in ralph.sh',
    'Fault-tolerant: if iteration 12 fails, iterations 1-11 are already committed — fix the failing task and re-run from iteration 12',
    'Self-documenting: progress.txt captures what the agent did, learned, and struggled with at every iteration — better than most human developers\' notes',
  ],

  // ────────── Limitations ───────────────────────────────────────────────────
  limitations: [
    'Requires an active Azure subscription and sufficient quota for the resources being provisioned — ensure quotas before running',
    'gpt-5.3-codex model access is required; if unavailable, swap to the best available coding model (quality may vary)',
    'Complex multi-service architectures (10+ Azure services) may need more than 20 iterations — adjust the ITERATIONS variable or run multiple passes',
    'Screenshot/image parsing quality depends on image clarity; hand-drawn wireframes work, but blurry photos of whiteboards may produce vague tasks',
    'Production security hardening (WAF, NSG rules, RBAC, secret rotation policies) still requires human review — the agent generates a secure-by-default scaffold, not a SOC2-certified deployment',
    'Cost awareness: 20 LLM iterations with a large-context model can consume significant tokens — estimate ~$5-20 per full run depending on project complexity',
  ],

  // ────────── Related Patterns ──────────────────────────────────────────────
  relatedPatterns: [
    'autonomous-workflow',   // Similar autonomous execution model
    'code-act',              // Code generation pattern
    'deep-researcher',       // Deep analysis for requirement understanding
    'agentic-ide',           // IDE-integrated coding agent
    'concept-to-project',    // Idea → project (lighter version of IgnitionStack)
    'self-remediation-loop', // The retry logic in the verification gate
  ],

  // ────────── Business Use Case ─────────────────────────────────────────────
  businessUseCase: {
    industry: 'Healthcare / Digital Patient Experience',
    description:
      'Meridian Health Network (fictitious), a 40-clinic healthcare system, needs a patient intake and scheduling ' +
      'portal. Their solution architect delivers a 12-slide PowerPoint deck covering patient registration, ' +
      'insurance verification, appointment scheduling, AI-powered symptom triage, lab-results summarization, ' +
      'and HIPAA compliance requirements. Instead of a 3-week dev sprint to scaffold the project, the ' +
      'platform team feeds the PPTX into IgnitionStack. Within 90 seconds, the agent decomposes the deck ' +
      'into 13 atomic tasks across infra, database, application, AI agent, CI/CD, testing, and documentation ' +
      'categories. The 20-iteration Ralph loop runs overnight with gpt-5.3-codex — each iteration picking ' +
      'the next task, implementing it, running tests, and committing. By morning, Meridian has a working ' +
      'FastAPI + React patient portal deployed to Azure: Cosmos DB with FHIR-aligned schemas, an AI triage ' +
      'agent routing symptoms to the right department, a lab-results summarizer with RAG over patient history, ' +
      'GitHub Actions CI/CD, and a Playwright E2E test covering the full patient journey. Every commit maps ' +
      'to a PRD task ID — the dev team reads git log to understand exactly what was built and why.',
    visualization: IgnitionStackVisualization,
    enlightenMePrompt:
      `You are an expert platform engineer, Azure solutions architect, and healthcare IT specialist. Explain the IgnitionStack Agent pattern using a concrete real-world example.

## The Scenario: Meridian Health Network (fictitious)
Meridian Health Network (fictitious) operates 40 clinics. Their CTO wants a digital patient intake portal — patients should be able to register, verify insurance, book appointments, get AI-powered symptom triage, and view lab results with plain-language summaries. The solution architect creates a 12-slide PPTX covering the vision. Traditionally, this would take a development team 3-4 weeks just to scaffold the Azure infrastructure, set up the database, wire the CI/CD, and get a basic API running — before writing a single line of business logic.

## What IgnitionStack Does
The platform team feeds the PPTX into IgnitionStack. Here's what happens:

### Phase 1: Parse (30 seconds)
The agent reads all 12 slides using the PPTX parser:
- Slide 1 "Patient Registration" → extracts: demographics form, insurance ID field, FHIR R4 compliance requirement
- Slide 4 "Appointment Scheduling" → extracts: provider availability slots, timezone handling, double-booking prevention
- Slide 7 "AI Triage" → extracts: symptom-to-department routing, confidence scoring, escalation rules
- Slide 9 "Lab Results" → extracts: RAG over patient history, HIPAA-safe summarization, no PII in logs
- Speaker notes on each slide → extracts implementation hints the architect didn't put on screen

### Phase 2: Decompose (60 seconds)
The LLM applies the Decomposition Test to produce 13 atomic tasks:
- Each task is Testable (has acceptance criteria), Bounded (< 30 min), Independent (no blocked dependencies), Committable (one git commit)
- Tasks span 6 categories: INFRA (3), DB (2), APP (3), AGENT (2), CI (1), TEST (1), DOCS (1)

### Phase 3: Scaffold (2 minutes)
IgnitionStack generates the full project skeleton:
- **infra/**: Bicep modules for resource group, Cosmos DB (patients + appointments containers), Key Vault, Microsoft Foundry workspace, Azure AI Search, App Service, Application Insights
- **agents/**: Triage agent config (symptom → department routing), lab-results summarizer config (RAG + HIPAA constraints)
- **db/**: FHIR-aligned patient schema, appointment slot schema with conflict detection
- **app/**: FastAPI backend + React frontend monorepo with package.json
- **.github/workflows/**: CI/CD pipeline (build → test → Bicep deploy → app deploy)

### Phase 4: Ralph Loop (20 iterations, ~2 hours)
\`\`\`
Iteration  1: INFRA-01 — Deploy resource group + Key Vault        ✅ committed
Iteration  2: INFRA-02 — Provision Cosmos DB with partition keys   ✅ committed
Iteration  3: INFRA-03 — Deploy Microsoft Foundry + model endpoint  ✅ committed
Iteration  4: DB-01    — Create patients schema (FHIR R4 aligned)  ✅ committed
Iteration  5: DB-02    — Appointment slots with conflict detection  ✅ committed
Iteration  6: APP-01   — Scaffold FastAPI + React monorepo          ✅ committed
Iteration  7: APP-02   — Patient registration + insurance verify    ✅ committed
Iteration  8: APP-03   — Appointment scheduling with slot lockout   ✅ committed
Iteration  9: AGENT-01 — Triage agent: 'chest pain' → Cardiology   ✅ committed
Iteration 10: AGENT-02 — Lab results RAG (HIPAA-safe, no PII logs) ✅ committed
Iteration 11: CI-01    — GitHub Actions build → test → deploy       ✅ committed
Iteration 12: TEST-01  — Playwright E2E: register → book → confirm  ✅ committed
Iteration 13: DOCS-01  — README + ARCHITECTURE + HIPAA notes        ✅ committed
Iterations 14-20: All tasks done — loop exits early 🎉
\`\`\`

### The Result
By morning, Meridian's dev team has:
- A **working patient portal** deployed to Azure (not a wireframe — a real app)
- **13 atomic git commits** they can read like a project diary
- **Bicep infrastructure** they can redeploy to staging/production with one command
- **AI agents** already routing symptoms and summarizing lab results
- **CI/CD pipeline** that validates every future push
- **HIPAA compliance notes** documenting every PHI touchpoint

The dev team's job is now customization and polish — not scaffolding. They saved 3 weeks.

### The Five Design Principles (Why It Works)
1. **Context Window Hygiene**: Each of the 13 iterations started fresh — no confused context from previous work
2. **Task-Scoped Autonomy**: Each task had a bounded objective with testable acceptance criteria
3. **Feedback-Driven Verification**: Type-check + tests ran before marking any task done
4. **Persistent Memory Without Context Cost**: progress.txt carried what worked and what didn't across iterations
5. **Atomic Git Commits**: \`git log --oneline\` shows exactly 13 commits, one per task, each independently reviewable

### PPTX as Input — Why This Matters
PowerPoint is the language of business stakeholders. IgnitionStack parses:
- **Slide titles** → feature names
- **Bullet points** → functional requirements
- **Speaker notes** → implementation context the architect intended but didn't present
- **Diagrams** → (via vision model) architectural relationships and data flows

A 12-slide deck becomes a 13-task PRD in 90 seconds. No requirements workshops. No weeks of Jira ticket writing.

### Cost & Time
- PPTX → PRD: 90 seconds
- Scaffold generation: 2 minutes
- Ralph loop (13 tasks in 20 iterations): ~2 hours
- **Total: PPTX to deployed Azure portal in under 3 hours**
- Estimated token cost: ~$8-15

Explain all of this walk-through clearly, emphasizing how each pipeline stage transforms the input and how the Ralph loop's simplicity (a bash for-loop) is the key to its reliability.`,
  },

  // ────────── Evaluation ────────────────────────────────────────────────────
  evaluation:
    '### How to Evaluate an IgnitionStack Run\n\n' +
    '| Criterion | Pass Condition |\n' +
    '|-----------|---------------|\n' +
    '| **Infrastructure** | All Bicep modules deployed; `az resource list` shows expected resources |\n' +
    '| **Tests** | `npm test` (or `pytest`) exits 0 with >80% coverage on generated code |\n' +
    '| **CI/CD** | GitHub Actions pipeline green on latest commit to main |\n' +
    '| **Application** | Health endpoint returns 200 at the production URL |\n' +
    '| **AI Agents** | Microsoft Foundry agents (Agent Framework) respond correctly in playground testing |\n' +
    '| **Task Completion** | `jq \'[.tasks[] | select(.status=="done")] | length\' PRD.json` ≥ 90% of total |\n' +
    '| **Git History** | Each commit maps to exactly one PRD task ID |\n' +
    '| **Documentation** | README, ARCHITECTURE.md, and deployment runbook exist and are non-trivial |\n' +
    '| **Security Baseline** | Key Vault stores all secrets; no hardcoded credentials in codebase |\n',

  // ────────── Velocity Profile ──────────────────────────────────────────────
  velocityProfile: {
    impact: 'high',
    timeToImplement: '2-4 hours (setup + 20 iterations)',
    complexityReduction: 'Extreme — reduces weeks of scaffolding + provisioning to hours',
    reusabilityScore: 9,
    learningCurve: 'moderate',
    velocityPractices: [
      'Infrastructure as Code (Bicep)',
      'Autonomous Iteration (Ralph Loop)',
      'Git-Native Workflow',
      'Context Window Hygiene',
      'Feedback-Driven Verification',
      'Task Decomposition (Atomic Tasks)',
    ],
  },
};
