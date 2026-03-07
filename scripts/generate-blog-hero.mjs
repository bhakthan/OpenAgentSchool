/**
 * Generate a hero image for the "Byte-Sized Learning in the Agentic Era" blog post.
 * Outputs a 1600x900 WebP image to public/images/byte_sized_agentic_era.webp
 */
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.resolve(__dirname, '..', 'public', 'images', 'byte_sized_agentic_era.webp');

const W = 1600;
const H = 900;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <!-- Background gradient -->
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f0b1e"/>
      <stop offset="40%" stop-color="#1a103a"/>
      <stop offset="100%" stop-color="#0d1b2a"/>
    </linearGradient>

    <!-- Accent glow -->
    <radialGradient id="glow1" cx="25%" cy="40%" r="40%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="75%" cy="65%" r="35%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow3" cx="50%" cy="30%" r="25%">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
    </radialGradient>

    <!-- Node gradient -->
    <radialGradient id="nodeGrad" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#c4b5fd"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </radialGradient>
    <radialGradient id="nodeGradCyan" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#a5f3fc"/>
      <stop offset="100%" stop-color="#0891b2"/>
    </radialGradient>
    <radialGradient id="nodeGradAmber" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#fde68a"/>
      <stop offset="100%" stop-color="#d97706"/>
    </radialGradient>
    <radialGradient id="nodeGradEmerald" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#a7f3d0"/>
      <stop offset="100%" stop-color="#059669"/>
    </radialGradient>
    <radialGradient id="nodeGradRose" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#fecdd3"/>
      <stop offset="100%" stop-color="#e11d48"/>
    </radialGradient>

    <!-- Subtle grid pattern -->
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(139,92,246,0.04)" stroke-width="0.5"/>
    </pattern>

    <!-- Pulse animation (static for SVG, visual suggestion) -->
    <filter id="softGlow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="bigGlow">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>

  <!-- Ambient glows -->
  <rect width="${W}" height="${H}" fill="url(#glow1)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>
  <rect width="${W}" height="${H}" fill="url(#glow3)"/>

  <!-- Constellation connections (curved) -->
  <g opacity="0.3" fill="none" stroke-width="1.2">
    <!-- Central hub connections -->
    <path d="M 800 380 Q 600 320 440 310" stroke="url(#nodeGrad)" stroke-dasharray="4 6"/>
    <path d="M 800 380 Q 680 280 580 200" stroke="url(#nodeGradCyan)" stroke-dasharray="4 6"/>
    <path d="M 800 380 Q 920 280 1020 200" stroke="url(#nodeGradAmber)" stroke-dasharray="4 6"/>
    <path d="M 800 380 Q 1000 340 1160 310" stroke="url(#nodeGradEmerald)" stroke-dasharray="4 6"/>
    <path d="M 800 380 Q 640 420 500 480" stroke="url(#nodeGradRose)" stroke-dasharray="4 6"/>
    <path d="M 800 380 Q 960 420 1100 480" stroke="url(#nodeGrad)" stroke-dasharray="4 6"/>

    <!-- Secondary connections -->
    <path d="M 440 310 Q 490 240 580 200" stroke="#8b5cf6" opacity="0.2" stroke-dasharray="3 5"/>
    <path d="M 1020 200 Q 1100 240 1160 310" stroke="#06b6d4" opacity="0.2" stroke-dasharray="3 5"/>
    <path d="M 500 480 Q 600 510 700 500" stroke="#f59e0b" opacity="0.15" stroke-dasharray="3 5"/>
    <path d="M 1100 480 Q 1000 510 900 500" stroke="#10b981" opacity="0.15" stroke-dasharray="3 5"/>
  </g>

  <!-- Data particles along paths -->
  <g opacity="0.5">
    <circle cx="620" cy="335" r="2" fill="#c4b5fd"/>
    <circle cx="700" cy="310" r="1.5" fill="#a5f3fc"/>
    <circle cx="900" cy="310" r="2" fill="#fde68a"/>
    <circle cx="960" cy="340" r="1.5" fill="#a7f3d0"/>
    <circle cx="700" cy="420" r="1.5" fill="#fecdd3"/>
    <circle cx="900" cy="420" r="2" fill="#c4b5fd"/>
    <circle cx="510" cy="260" r="1" fill="#8b5cf6"/>
    <circle cx="1090" cy="260" r="1" fill="#06b6d4"/>
  </g>

  <!-- Knowledge Nodes (Byte-Sized Capsules) -->

  <!-- Central node: "Byte-Sized Learning" -->
  <g filter="url(#bigGlow)">
    <circle cx="800" cy="380" r="44" fill="url(#nodeGrad)" opacity="0.9"/>
    <circle cx="800" cy="380" r="44" fill="none" stroke="#c4b5fd" stroke-width="1.5" opacity="0.6"/>
    <circle cx="800" cy="380" r="52" fill="none" stroke="#8b5cf6" stroke-width="0.5" opacity="0.3" stroke-dasharray="3 4"/>
  </g>
  <!-- Byte icon in center -->
  <g transform="translate(800,380)">
    <rect x="-14" y="-16" width="28" height="32" rx="4" fill="none" stroke="white" stroke-width="1.8"/>
    <line x1="-8" y1="-8" x2="8" y2="-8" stroke="white" stroke-width="1.3" stroke-linecap="round"/>
    <line x1="-8" y1="-1" x2="4" y2="-1" stroke="white" stroke-width="1.3" stroke-linecap="round"/>
    <line x1="-8" y1="6" x2="8" y2="6" stroke="white" stroke-width="1.3" stroke-linecap="round"/>
  </g>

  <!-- Satellite node 1: Agent Architecture -->
  <g filter="url(#softGlow)">
    <circle cx="440" cy="310" r="26" fill="url(#nodeGradCyan)" opacity="0.85"/>
  </g>
  <g transform="translate(440,310)" fill="white" opacity="0.9">
    <rect x="-10" y="-12" width="20" height="24" rx="3" fill="none" stroke="white" stroke-width="1.3"/>
    <circle cx="0" cy="-4" r="3.5" fill="none" stroke="white" stroke-width="1"/>
    <path d="M-5 6 Q0 2 5 6" fill="none" stroke="white" stroke-width="1"/>
  </g>

  <!-- Satellite node 2: Prompt Engineering -->
  <g filter="url(#softGlow)">
    <circle cx="580" cy="200" r="22" fill="url(#nodeGradAmber)" opacity="0.85"/>
  </g>
  <g transform="translate(580,200)" fill="white" opacity="0.9">
    <text x="0" y="5" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold">&gt;_</text>
  </g>

  <!-- Satellite node 3: Evaluation -->
  <g filter="url(#softGlow)">
    <circle cx="1020" cy="200" r="22" fill="url(#nodeGradEmerald)" opacity="0.85"/>
  </g>
  <g transform="translate(1020,200)" fill="white" opacity="0.9">
    <polyline points="-7,0 -2,5 7,-5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- Satellite node 4: MCP / Tools -->
  <g filter="url(#softGlow)">
    <circle cx="1160" cy="310" r="26" fill="url(#nodeGrad)" opacity="0.85"/>
  </g>
  <g transform="translate(1160,310)" fill="white" opacity="0.9">
    <circle cx="0" cy="-4" r="5" fill="none" stroke="white" stroke-width="1.2"/>
    <line x1="0" y1="1" x2="0" y2="8" stroke="white" stroke-width="1.2"/>
    <line x1="-5" y1="4" x2="5" y2="4" stroke="white" stroke-width="1.2"/>
  </g>

  <!-- Satellite node 5: Security -->
  <g filter="url(#softGlow)">
    <circle cx="500" cy="480" r="20" fill="url(#nodeGradRose)" opacity="0.85"/>
  </g>
  <g transform="translate(500,480)" fill="white" opacity="0.9">
    <rect x="-7" y="-3" width="14" height="10" rx="2" fill="none" stroke="white" stroke-width="1.2"/>
    <path d="M-4,-3 L-4,-7 A4,4 0 0,1 4,-7 L4,-3" fill="none" stroke="white" stroke-width="1.2"/>
  </g>

  <!-- Satellite node 6: Multi-Agent -->
  <g filter="url(#softGlow)">
    <circle cx="1100" cy="480" r="20" fill="url(#nodeGradCyan)" opacity="0.85"/>
  </g>
  <g transform="translate(1100,480)" fill="white" opacity="0.9">
    <circle cx="-5" cy="-2" r="4" fill="none" stroke="white" stroke-width="1"/>
    <circle cx="5" cy="-2" r="4" fill="none" stroke="white" stroke-width="1"/>
    <line x1="-1" y1="-2" x2="1" y2="-2" stroke="white" stroke-width="0.8"/>
  </g>

  <!-- Small floating capsules (byte-sized pieces) -->
  <g opacity="0.4">
    <rect x="300" y="180" width="30" height="18" rx="9" fill="#8b5cf6"/>
    <rect x="1280" y="420" width="26" height="16" rx="8" fill="#06b6d4"/>
    <rect x="680" cy="550" width="24" height="14" rx="7" fill="#f59e0b" y="550"/>
    <rect x="900" y="150" width="20" height="12" rx="6" fill="#10b981"/>
    <rect x="360" y="520" width="22" height="14" rx="7" fill="#e11d48" opacity="0.5"/>
    <rect x="1220" y="170" width="28" height="16" rx="8" fill="#8b5cf6" opacity="0.5"/>
  </g>

  <!-- Node labels -->
  <g font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="white" opacity="0.7" text-anchor="middle">
    <text x="440" y="348">Architecture</text>
    <text x="580" y="234">Prompting</text>
    <text x="1020" y="234">Evaluation</text>
    <text x="1160" y="348">MCP &amp; Tools</text>
    <text x="500" y="512">Security</text>
    <text x="1100" y="512">Multi-Agent</text>
  </g>

  <!-- Title text block -->
  <g font-family="system-ui, -apple-system, sans-serif">
    <!-- Main title -->
    <text x="800" y="660" text-anchor="middle" font-size="42" font-weight="800" fill="white" letter-spacing="-0.5">
      Byte-Sized Learning
    </text>
    <text x="800" y="710" text-anchor="middle" font-size="28" font-weight="300" fill="#c4b5fd" letter-spacing="0.5">
      in the Agentic Era
    </text>

    <!-- Tagline -->
    <text x="800" y="755" text-anchor="middle" font-size="14" fill="rgba(255,255,255,0.5)" letter-spacing="3" font-weight="400">
      LEARN · QUIZ · APPLY · REFLECT · EXPAND
    </text>
  </g>

  <!-- Subtle top/bottom vignette -->
  <rect width="${W}" height="120" fill="url(#bg)" opacity="0.4" y="0"/>
  <rect width="${W}" height="100" fill="url(#bg)" opacity="0.6" y="${H - 100}"/>
</svg>`;

const buf = Buffer.from(svg);
await sharp(buf)
  .resize(W, H)
  .webp({ quality: 90 })
  .toFile(outPath);

console.log(`✅ Hero image generated: ${outPath}`);
