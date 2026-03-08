/**
 * Cognitive Lab — Static Glyph Registry
 * Abstract SVG symbols mapped to AI/agent concepts.
 */

export interface Glyph {
  id: string;
  svgPath: string;
  viewBox: string;
  seedSyllable: string;
  meaning: string;
  category: 'architecture' | 'data' | 'safety' | 'reasoning' | 'interaction';
}

export const GLYPHS: Record<string, Glyph> = {
  'agent-loop': {
    id: 'agent-loop',
    svgPath: 'M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm40-88a40 40 0 1 1-40-40 40 40 0 0 1 40 40Z M168 128l24 24M168 128l24-24',
    viewBox: '0 0 256 256',
    seedSyllable: 'AH',
    meaning: 'The observe-plan-act cycle',
    category: 'architecture',
  },
  'embedding': {
    id: 'embedding',
    svgPath: 'M128 80l48 28v56l-48 28-48-28V108l48-28Z M128 24v56 M128 192v40 M24 88l56 32 M176 120l56 32 M24 168l56-32 M176 136l56-32',
    viewBox: '0 0 256 256',
    seedSyllable: 'EM',
    meaning: 'Meaning compressed into geometry',
    category: 'data',
  },
  'retrieval': {
    id: 'retrieval',
    svgPath: 'M168 168l48 48 M112 56a56 56 0 1 0 56 56 56 56 0 0 0-56-56Z M112 88v24h24',
    viewBox: '0 0 256 256',
    seedSyllable: 'RE',
    meaning: 'Find relevant knowledge',
    category: 'data',
  },
  'guardrail': {
    id: 'guardrail',
    svgPath: 'M128 24l88 48v56c0 53.7-36.7 103.3-88 120-51.3-16.7-88-66.3-88-120V72l88-48Z M96 128l24 24 48-48',
    viewBox: '0 0 256 256',
    seedSyllable: 'GA',
    meaning: 'Safety boundary that protects',
    category: 'safety',
  },
  'attention': {
    id: 'attention',
    svgPath: 'M128 24C70.6 24 24 70.6 24 128s46.6 104 104 104 104-46.6 104-104S185.4 24 128 24Zm0 160c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56Zm0-80c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24Z',
    viewBox: '0 0 256 256',
    seedSyllable: 'AT',
    meaning: 'Focus across all tokens',
    category: 'reasoning',
  },
  'tool-call': {
    id: 'tool-call',
    svgPath: 'M160 88h40a16 16 0 0 1 16 16v96a16 16 0 0 1-16 16H56a16 16 0 0 1-16-16V104a16 16 0 0 1 16-16h40 M128 24v112 M96 104l32 32 32-32',
    viewBox: '0 0 256 256',
    seedSyllable: 'TO',
    meaning: 'Reach beyond the model boundary',
    category: 'interaction',
  },
  'fine-tune': {
    id: 'fine-tune',
    svgPath: 'M40 108h48 M168 108h48 M40 148h48 M168 148h48 M128 80a28 28 0 1 0 0 56 28 28 0 0 0 0-56Z M128 164a28 28 0 1 0 0 56 28 28 0 0 0 0-56Z',
    viewBox: '0 0 256 256',
    seedSyllable: 'FI',
    meaning: 'Sculpt weights with data',
    category: 'data',
  },
  'hallucination': {
    id: 'hallucination',
    svgPath: 'M128 24a104 104 0 1 0 104 104A104 104 0 0 0 128 24Zm-8 56h16v64h-16Zm8 104a12 12 0 1 1 12-12 12 12 0 0 1-12 12Z',
    viewBox: '0 0 256 256',
    seedSyllable: 'HA',
    meaning: 'Confident fabrication',
    category: 'safety',
  },
  'chain-of-thought': {
    id: 'chain-of-thought',
    svgPath: 'M64 64a24 24 0 1 0 24 24A24 24 0 0 0 64 64Zm0 80a24 24 0 1 0 24 24 24 24 0 0 0-24-24Zm104-80a24 24 0 1 0 24 24 24 24 0 0 0-24-24Zm0 80a24 24 0 1 0 24 24 24 24 0 0 0-24-24ZM84 100l60 48M148 100l-60 48',
    viewBox: '0 0 256 256',
    seedSyllable: 'CH',
    meaning: 'Visible reasoning steps',
    category: 'reasoning',
  },
  'token': {
    id: 'token',
    svgPath: 'M128 24L40 76v104l88 52 88-52V76l-88-52Zm0 32l56 32v64l-56 32-56-32V88l56-32Z',
    viewBox: '0 0 256 256',
    seedSyllable: 'TK',
    meaning: 'Atomic unit of language',
    category: 'data',
  },
  'multi-agent': {
    id: 'multi-agent',
    svgPath: 'M80 96a32 32 0 1 0-32-32 32 32 0 0 0 32 32Zm96 0a32 32 0 1 0-32-32 32 32 0 0 0 32 32Zm-48 64a32 32 0 1 0-32-32 32 32 0 0 0 32 32ZM44 160c0 24 16 40 36 40s36-16 36-40M140 160c0 24 16 40 36 40s36-16 36-40',
    viewBox: '0 0 256 256',
    seedSyllable: 'MA',
    meaning: 'Agents collaborating as a team',
    category: 'architecture',
  },
  'context-window': {
    id: 'context-window',
    svgPath: 'M48 48h160v160H48V48Zm0 0l160 160M208 48L48 208 M128 48v160 M48 128h160',
    viewBox: '0 0 256 256',
    seedSyllable: 'CW',
    meaning: 'Bounded memory of the model',
    category: 'architecture',
  },
  'prompt': {
    id: 'prompt',
    svgPath: 'M64 88l40 40-40 40 M120 168h72 M48 40h160a16 16 0 0 1 16 16v144a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16V56a16 16 0 0 1 16-16Z',
    viewBox: '0 0 256 256',
    seedSyllable: 'PR',
    meaning: 'The instruction that shapes output',
    category: 'interaction',
  },
  'vector-db': {
    id: 'vector-db',
    svgPath: 'M128 24c-53 0-96 14.3-96 32v144c0 17.7 43 32 96 32s96-14.3 96-32V56c0-17.7-43-32-96-32Zm0 16c44.2 0 80 10.7 80 24s-35.8 24-80 24-80-10.7-80-24 35.8-24 80-24ZM48 128c0 13.3 35.8 24 80 24s80-10.7 80-24',
    viewBox: '0 0 256 256',
    seedSyllable: 'VD',
    meaning: 'Meaning stored as geometry',
    category: 'data',
  },
  'evaluation': {
    id: 'evaluation',
    svgPath: 'M56 40h144a16 16 0 0 1 16 16v144a16 16 0 0 1-16 16H56a16 16 0 0 1-16-16V56a16 16 0 0 1 16-16Zm24 84l28 28 52-52',
    viewBox: '0 0 256 256',
    seedSyllable: 'EV',
    meaning: 'Measuring what matters',
    category: 'safety',
  },
};

export function getGlyph(id: string): Glyph | undefined {
  return GLYPHS[id];
}

export function getGlyphsByCategory(category: Glyph['category']): Glyph[] {
  return Object.values(GLYPHS).filter(g => g.category === category);
}
