// Skills AI helper: hotkeys and scripted walkthroughs for SystemsThinkingTree

// Minimal control surface expected on window.__ST_TREE__
export type STControls = {
  expandAll?: () => void
  collapseAll?: () => void
  fitToScreen?: () => void
  resetZoom?: () => void
  exportSVG?: () => void
  exportPNG?: () => void
  print?: () => void
  focus?: (name: string) => void
  expandNode?: (name: string) => void
  collapseNode?: (name: string) => void
  showHint?: (text: string, ms?: number) => void
  clearHint?: () => void
}

declare global {
  interface Window {
    __ST_TREE__?: STControls
  }
}

function getControls(): STControls | undefined {
  return typeof window !== 'undefined' ? window.__ST_TREE__ : undefined
}

export function initSkillsAI() {
  const handler = (e: KeyboardEvent) => {
    const c = getControls()
    if (!c) return
    // Skip typing inside inputs/textareas
    const target = e.target as HTMLElement | null
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return

    switch (e.key.toLowerCase()) {
      case 'e': c.expandAll?.(); break
      case 'c': c.collapseAll?.(); break
      case 'f': c.fitToScreen?.(); break
      case 'r': c.resetZoom?.(); break
      case '1': c.focus?.('Design Thinking — Start with Customer Problem'); break
      case '2': c.focus?.('Breakthrough Thinking — Start with the Idea'); break
      case '3': c.focus?.('Systems Thinking — Zoom Out First'); break
      case 'd': runSkillsDemo(); break
      default: break
    }
  }
  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}

function wait(ms: number) { return new Promise(res => setTimeout(res, ms)) }

export async function runSkillsDemo() {
  const c = getControls()
  if (!c) return
  c.showHint?.('Overview: Product paradigms at the top');
  c.fitToScreen?.();
  await wait(400)
  c.showHint?.('Expanding all branches');
  c.expandAll?.();
  await wait(600)
  c.showHint?.('Design Thinking — start with the customer problem');
  c.focus?.('Design Thinking — Start with Customer Problem');
  await wait(1000)
  c.showHint?.('Breakthrough Thinking — start with the idea');
  c.focus?.('Breakthrough Thinking — Start with the Idea');
  await wait(1000)
  c.showHint?.('Systems Thinking — zoom out before zooming in');
  c.focus?.('Systems Thinking — Zoom Out First');
  await wait(900)
  c.showHint?.('Expanding: Step 3 • Map flows & relationships');
  c.expandNode?.('Step 3: Map flows & relationships');
  await wait(800)
  c.showHint?.('Focus: Flows & relationships across domains');
  c.focus?.('Step 3: Map flows & relationships');
  await wait(900)
  c.showHint?.('Reset to overview');
  c.fitToScreen?.();
}
