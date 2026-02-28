/**
 * TenantBranding — injects dynamic CSS custom-property overrides and
 * favicon based on the current tenant's configuration.
 *
 * Renders as a zero-DOM-footprint side-effect component. Place it
 * immediately inside TenantProvider (and above AuthProvider) so that
 * branding is applied as early as possible.
 */

import { useEffect } from 'react';
import { useTenant } from './TenantContext';

/* ------------------------------------------------------------------ */
/*  Colour helpers                                                     */
/* ------------------------------------------------------------------ */

/**
 * Attempt to darken a CSS colour by mixing it towards black.
 * Accepts hex (#rrggbb / #rgb). Falls back to the original colour
 * if the format is unexpected.
 */
function darkenHex(hex: string, amount = 0.15): string {
  const raw = hex.replace('#', '');
  const isShort = raw.length === 3;
  const r = parseInt(isShort ? raw[0] + raw[0] : raw.slice(0, 2), 16);
  const g = parseInt(isShort ? raw[1] + raw[1] : raw.slice(2, 4), 16);
  const b = parseInt(isShort ? raw[2] + raw[2] : raw.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return hex;

  const d = (v: number) => Math.round(v * (1 - amount));
  return `#${[d(r), d(g), d(b)].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

/* ------------------------------------------------------------------ */
/*  Style element ID (stable across re-renders)                        */
/* ------------------------------------------------------------------ */
const STYLE_ID = 'tenant-branding-overrides';

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function TenantBranding() {
  const { tenant } = useTenant();

  // ---- CSS custom property overrides ----
  useEffect(() => {
    // Remove any previous overrides
    document.getElementById(STYLE_ID)?.remove();

    if (!tenant) return;

    const declarations: string[] = [];

    if (tenant.primaryColor) {
      declarations.push(`--color-accent-9: ${tenant.primaryColor};`);
      declarations.push(
        `--color-accent-10: ${darkenHex(tenant.primaryColor, 0.15)};`,
      );
    }

    if (tenant.accentColor) {
      declarations.push(`--color-accent-a9: ${tenant.accentColor};`);
    }

    // Apply every key-value pair from themeOverrides
    if (tenant.themeOverrides) {
      for (const [key, value] of Object.entries(tenant.themeOverrides)) {
        // Accept either `--foo` or bare `foo`
        const prop = key.startsWith('--') ? key : `--${key}`;
        declarations.push(`${prop}: ${value};`);
      }
    }

    if (declarations.length === 0) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `:root {\n  ${declarations.join('\n  ')}\n}`;
    document.head.appendChild(style);

    return () => {
      document.getElementById(STYLE_ID)?.remove();
    };
  }, [tenant]);

  // ---- Favicon override ----
  useEffect(() => {
    if (!tenant?.faviconUrl) return;

    let link = document.querySelector<HTMLLinkElement>(
      'link[rel="icon"], link[rel="shortcut icon"]',
    );
    const previous = link?.href ?? null;

    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = tenant.faviconUrl;

    return () => {
      if (link && previous) {
        link.href = previous;
      }
    };
  }, [tenant?.faviconUrl]);

  // Zero-DOM component — all effects are side-effects
  return null;
}
