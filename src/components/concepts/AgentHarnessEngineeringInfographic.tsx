import { useEffect, useState } from 'react';

export default function AgentHarnessEngineeringInfographic() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  const reveal = (delayMs = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(12px)',
    transition: `opacity 600ms ease ${delayMs}ms, transform 600ms ease ${delayMs}ms`,
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-stone-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/80 md:p-6">
      <div className="text-center" style={reveal(0)}>
        <div className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-slate-500">
          A Critical Reframe
        </div>
        <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Agent Harness Engineering
        </h3>
      </div>

      <div
        className="mx-auto mt-4 max-w-4xl rounded-xl bg-slate-900 px-4 py-3 text-center text-sm text-stone-100 shadow-lg md:text-base"
        style={reveal(100)}
      >
        <span className="font-mono text-sky-300">Agent</span>
        <span className="mx-2 text-slate-400">=</span>
        <span className="font-mono text-emerald-300">Intelligence</span>
        <span className="mx-2 font-bold text-amber-300">×</span>
        <span className="text-stone-200">(</span>
        <span className="font-mono text-amber-300">Situatedness</span>
        <span className="mx-1 text-slate-500">+</span>
        <span className="font-mono text-amber-300">Stakes</span>
        <span className="mx-1 text-slate-500">+</span>
        <span className="font-mono text-amber-300">Sovereignty</span>
        <span className="text-stone-200">)</span>
      </div>

      <p className="mt-3 text-center text-xs italic text-slate-500" style={reveal(160)}>
        Multiplicative: zero situatedness yields zero agent value regardless of intelligence.
      </p>

      <div
        className="relative mt-6 overflow-hidden rounded-[22px] border-2 border-dashed border-slate-300 bg-white px-3 py-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:px-6"
        style={reveal(220)}
      >
        <div className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 md:text-[11px]">
          Harness = the operationalization of Situatedness × Stakes × Sovereignty
        </div>

        <svg viewBox="0 0 760 520" className="mt-5 block h-auto w-full" role="img" aria-label="Agent harness engineering infographic">
          <defs>
            <marker id="harness-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#1d6bc4" />
            </marker>
            <marker id="harness-green" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#1a7c4a" />
            </marker>
            <marker id="harness-purple" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#6d28d9" />
            </marker>
            <marker id="harness-gold" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#9a6800" />
            </marker>
            <marker id="harness-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#c0392b" />
            </marker>
          </defs>

          <rect x="282" y="212" width="200" height="100" rx="14" fill="#c0c8d8" opacity="0.35" />
          <rect x="278" y="208" width="200" height="100" rx="14" fill="#1a1a2e" stroke="#2c3e6e" strokeWidth="2" />
          <text x="378" y="248" textAnchor="middle" fill="#a8d4ff" fontSize="18" fontWeight="700" fontFamily="Georgia, serif">Intelligence</text>
          <text x="378" y="268" textAnchor="middle" fill="#7ee8a2" fontSize="11" fontFamily="'Courier New', monospace">reasons → decides → stops?</text>
          <text x="378" y="286" textAnchor="middle" fill="#8f96a3" fontSize="10" fontFamily="'Courier New', monospace">Model</text>

          <line x1="378" y1="130" x2="378" y2="206" stroke="#1d6bc4" strokeWidth="2.5" markerEnd="url(#harness-blue)" />
          <rect x="278" y="52" width="200" height="74" rx="10" fill="#eef4fd" stroke="#1d6bc4" strokeWidth="1.5" />
          <text x="378" y="76" textAnchor="middle" fill="#1d4e8f" fontSize="14" fontWeight="700" fontFamily="Georgia, serif">Situate</text>
          <text x="378" y="93" textAnchor="middle" fill="#3a6eb5" fontSize="9.5" fontFamily="'Courier New', monospace">living world-model</text>
          <text x="378" y="107" textAnchor="middle" fill="#6688aa" fontSize="8.5" fontFamily="'Courier New', monospace">who · when · unsaid · unknown</text>

          <line x1="480" y1="248" x2="586" y2="248" stroke="#1a7c4a" strokeWidth="2.5" markerEnd="url(#harness-green)" />
          <line x1="584" y1="260" x2="480" y2="260" stroke="#1a7c4a" strokeWidth="1.5" strokeDasharray="5,4" markerEnd="url(#harness-green)" />
          <rect x="590" y="190" width="160" height="100" rx="10" fill="#edfaf2" stroke="#1a7c4a" strokeWidth="1.5" />
          <text x="670" y="216" textAnchor="middle" fill="#155233" fontSize="14" fontWeight="700" fontFamily="Georgia, serif">Affect</text>
          <text x="670" y="234" textAnchor="middle" fill="#1a7c4a" fontSize="9.5" fontFamily="'Courier New', monospace">full-spectrum actions</text>
          <text x="670" y="250" textAnchor="middle" fill="#4a9a6a" fontSize="8.5" fontFamily="'Courier New', monospace">digital · economic</text>
          <text x="670" y="264" textAnchor="middle" fill="#4a9a6a" fontSize="8.5" fontFamily="'Courier New', monospace">social · physical</text>
          <text x="670" y="278" textAnchor="middle" fill="#888" fontSize="8" fontFamily="'Courier New', monospace">classified by reversibility</text>

          <line x1="534" y1="358" x2="448" y2="318" stroke="#6d28d9" strokeWidth="2" strokeDasharray="6,4" markerEnd="url(#harness-purple)" />
          <rect x="520" y="368" width="200" height="110" rx="10" fill="#f5f0ff" stroke="#6d28d9" strokeWidth="1.5" />
          <text x="620" y="394" textAnchor="middle" fill="#4c1d95" fontSize="14" fontWeight="700" fontFamily="Georgia, serif">Ground</text>
          <text x="620" y="412" textAnchor="middle" fill="#6d28d9" fontSize="9.5" fontFamily="'Courier New', monospace">domain-epistemology evidence</text>
          <text x="620" y="428" textAnchor="middle" fill="#7c3aed" fontSize="8.5" fontFamily="'Courier New', monospace">biomarkers · signals · P&amp;L</text>
          <text x="620" y="444" textAnchor="middle" fill="#7c3aed" fontSize="8.5" fontFamily="'Courier New', monospace">test results · legal citations</text>
          <text x="620" y="460" textAnchor="middle" fill="#888" fontSize="8" fontFamily="'Courier New', monospace">+ uncertainty about ground truth</text>

          <line x1="358" y1="310" x2="358" y2="398" stroke="#9a6800" strokeWidth="2.5" markerEnd="url(#harness-gold)" />
          <line x1="400" y1="398" x2="400" y2="310" stroke="#9a6800" strokeWidth="1.5" strokeDasharray="5,4" markerEnd="url(#harness-gold)" />
          <text x="326" y="360" fill="#9a6800" fontSize="9" fontFamily="'Courier New', monospace">writes</text>
          <text x="408" y="360" fill="#9a6800" fontSize="9" fontFamily="'Courier New', monospace">reads</text>
          <rect x="268" y="400" width="220" height="100" rx="10" fill="#fffbeb" stroke="#9a6800" strokeWidth="1.5" />
          <text x="378" y="426" textAnchor="middle" fill="#78350f" fontSize="14" fontWeight="700" fontFamily="Georgia, serif">State</text>
          <text x="378" y="444" textAnchor="middle" fill="#9a6800" fontSize="9.5" fontFamily="'Courier New', monospace">domain-appropriate continuity</text>
          <text x="378" y="460" textAnchor="middle" fill="#b45309" fontSize="8.5" fontFamily="'Courier New', monospace">episodic · relational · world</text>
          <text x="378" y="476" textAnchor="middle" fill="#888" fontSize="8" fontFamily="'Courier New', monospace">not git. design per domain.</text>

          <line x1="196" y1="258" x2="276" y2="258" stroke="#c0392b" strokeWidth="2.5" markerEnd="url(#harness-red)" />
          <rect x="10" y="190" width="178" height="130" rx="10" fill="#fff5f5" stroke="#c0392b" strokeWidth="1.5" />
          <text x="99" y="218" textAnchor="middle" fill="#7f1d1d" fontSize="14" fontWeight="700" fontFamily="Georgia, serif">Govern</text>
          <text x="99" y="237" textAnchor="middle" fill="#c0392b" fontSize="9.5" fontFamily="'Courier New', monospace">authority-bounded execution</text>
          <text x="99" y="253" textAnchor="middle" fill="#e05252" fontSize="8.5" fontFamily="'Courier New', monospace">scope gates · escalation</text>
          <text x="99" y="267" textAnchor="middle" fill="#e05252" fontSize="8.5" fontFamily="'Courier New', monospace">stopping criteria</text>
          <text x="99" y="281" textAnchor="middle" fill="#e05252" fontSize="8.5" fontFamily="'Courier New', monospace">ethical circuit breakers</text>
          <text x="99" y="297" textAnchor="middle" fill="#888" fontSize="8" fontFamily="'Courier New', monospace">Ralph loops ≠ correct stopping</text>

          <text x="378" y="196" textAnchor="middle" fill="#f4a261" fontSize="11" fontWeight="700" fontFamily="'Courier New', monospace">×</text>
          <text x="378" y="324" textAnchor="middle" fill="#f4a261" fontSize="11" fontWeight="700" fontFamily="'Courier New', monospace">×</text>
          <text x="266" y="262" textAnchor="middle" fill="#f4a261" fontSize="11" fontWeight="700" fontFamily="'Courier New', monospace">×</text>
          <text x="490" y="252" textAnchor="middle" fill="#f4a261" fontSize="11" fontWeight="700" fontFamily="'Courier New', monospace">×</text>
        </svg>
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-4" style={reveal(300)}>
        {[
          { color: 'bg-blue-600', label: 'Situate → living world-model' },
          { color: 'bg-green-700', label: 'Affect → actions by reversibility tier' },
          { color: 'bg-violet-700', label: 'Ground → evidence + uncertainty' },
          { color: 'bg-amber-700', label: 'State → episodic + relational + world' },
          { color: 'bg-red-700', label: 'Govern → authority + stopping theory' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
            <span className="font-mono text-[11px] text-slate-600 dark:text-slate-300">{item.label}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-[11px] italic text-slate-400" style={reveal(360)}>
        Redefining Agent = Model + Harness → Agent = Intelligence × (Situatedness + Stakes + Sovereignty)
      </p>
    </div>
  );
}