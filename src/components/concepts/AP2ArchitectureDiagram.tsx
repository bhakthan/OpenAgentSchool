import React, { useRef } from 'react';
import { DownloadSimple } from '@phosphor-icons/react';

/**
 * AP2ArchitectureDiagram
 * Lightweight layered architecture visualization showing where AP2 sits relative
 * to MCP (tool / capability exposure), A2A (intent & negotiation fabric), and underlying
 * payment / settlement rails. Focused on conceptual placement rather than the mandate flow
 * animation (handled by AP2MandateChainAnimation in the Flows tab).
 */
export const AP2ArchitectureDiagram: React.FC<{ className?: string }> = ({ className }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const handleExport = (format: 'svg' | 'png') => {
    const svg = svgRef.current;
    if (!svg) return;
    if (format === 'svg') {
      const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ap2-architecture.svg';
      a.click();
      URL.revokeObjectURL(url);
      try { window.dispatchEvent(new CustomEvent('analytics:export', { detail: { component: 'AP2ArchitectureDiagram', format: 'svg' } })); } catch {}
      return;
    }
    // PNG rasterization
    const clone = svg.cloneNode(true) as SVGSVGElement;
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(clone);
    const img = new Image();
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(2, 2);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((pngBlob) => {
          if (pngBlob) {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(pngBlob);
            a.download = 'ap2-architecture.png';
            a.click();
            try { window.dispatchEvent(new CustomEvent('analytics:export', { detail: { component: 'AP2ArchitectureDiagram', format: 'png' } })); } catch {}
          }
          URL.revokeObjectURL(url);
        });
      }
    };
    img.src = url;
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        <h5 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Architecture Placement</h5>
        <div className="flex gap-1">
          <button aria-label="Export SVG" onClick={() => handleExport('svg')} className="text-xs px-2 py-1 border rounded hover:bg-accent/40 flex items-center gap-1">
            <DownloadSimple className="w-3 h-3" /> SVG
          </button>
          <button aria-label="Export PNG" onClick={() => handleExport('png')} className="text-xs px-2 py-1 border rounded hover:bg-accent/40 flex items-center gap-1">
            <DownloadSimple className="w-3 h-3" /> PNG
          </button>
        </div>
      </div>
      <div className="rounded-md border bg-background/50 dark:bg-muted/30 p-3 overflow-x-auto">
        <svg
          ref={svgRef}
          role="img"
          aria-label="Layered diagram showing user / agent, protocols MCP, A2A, AP2, and payment rails"
          width={760}
          height={340}
          viewBox="0 0 760 340"
          className="mx-auto text-[10px]"
        >
          <defs>
            <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="g2" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="g3" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#ec4899" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#ec4899" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          {/* User & Agent */}
          <g>
            <rect x={40} y={20} width={300} height={60} rx={10} fill="url(#g1)" stroke="#6366f1" strokeWidth={1} />
            <text x={60} y={45} fontSize={14} fontWeight={600} fill="currentColor">User / Business Logic Layer</text>
            <text x={60} y={65} fontSize={11} fill="currentColor">Goals, constraints, approvals, oversight</text>
            <rect x={380} y={20} width={340} height={60} rx={10} fill="url(#g1)" stroke="#6366f1" strokeWidth={1} />
            <text x={400} y={45} fontSize={14} fontWeight={600} fill="currentColor">Agent Runtime</text>
            <text x={400} y={65} fontSize={11} fill="currentColor">Planning, tool orchestration, memory, eval hooks</text>
          </g>

            {/* Protocol Fabric */}
          <g>
            <rect x={40} y={110} width={680} height={70} rx={10} fill="url(#g2)" stroke="#10b981" strokeWidth={1} />
            <text x={60} y={135} fontSize={14} fontWeight={600} fill="currentColor">Protocol Fabric</text>
            <text x={60} y={155} fontSize={11} fill="currentColor">Shared capability & coordination layer</text>
            {/* Sub segments */}
            <rect x={60} y={170} width={190} height={20} rx={4} fill="none" stroke="#6366f1" strokeDasharray={4} />
            <text x={65} y={184} fontSize={10} fill="currentColor">MCP (Tool / Data Access)</text>
            <rect x={265} y={170} width={190} height={20} rx={4} fill="none" stroke="#6366f1" strokeDasharray={4} />
            <text x={270} y={184} fontSize={10} fill="currentColor">A2A (Session & Intent Negotiation)</text>
            <rect x={470} y={170} width={190} height={20} rx={4} fill="none" stroke="#6366f1" strokeDasharray={4} />
            <text x={475} y={184} fontSize={10} fill="currentColor">Shared Semantics (Presence, Roles)</text>
          </g>

          {/* AP2 Placement */}
          <g>
            <rect x={40} y={210} width={680} height={70} rx={10} fill="url(#g3)" stroke="#ec4899" strokeWidth={1} />
            <text x={60} y={235} fontSize={14} fontWeight={600} fill="currentColor">AP2 Mandate Lifecycle</text>
            <text x={60} y={255} fontSize={11} fill="currentColor">Intent → Cart → Payment (signed, hash-linked, presence aware)</text>
            <text x={60} y={273} fontSize={10} fill="currentColor">Interoperable VC chain enabling safe autonomous purchases</text>
          </g>

          {/* Payment Rails */}
          <g>
            <rect x={40} y={290} width={680} height={40} rx={6} fill="#1e293b" opacity={0.85} />
            <text x={60} y={315} fontSize={13} fontWeight={600} fill="#fff">Payment / Settlement Rails (Card, RTP, Crypto, Alt)</text>
          </g>

          {/* Arrows */}
          <g stroke="#64748b" strokeWidth={1.2} markerEnd="url(#arrow)">
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto" fill="#64748b">
                <path d="M0,0 L8,4 L0,8 z" />
              </marker>
            </defs>
            <line x1={380} y1={80} x2={380} y2={110} />
            <line x1={380} y1={180} x2={380} y2={210} />
            <line x1={380} y1={280} x2={380} y2={290} />
          </g>
        </svg>
      </div>
      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">Diagram: AP2 layers in relation to MCP, A2A, and underlying payment rails. Use this to explain protocol scope vs capability/runtime layers.</p>
    </div>
  );
};

export default AP2ArchitectureDiagram;









