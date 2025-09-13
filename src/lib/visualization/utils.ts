// Lightweight visualization utilities extracted from D3TreeVisualization for unit testing.
// Keep logic in sync with component; if modified there, reflect updates here.

export type TreeNodeType = 'root' | 'category' | 'concept' | 'pattern' | 'service' | 'quiz' | 'tab';

export interface MinimalTreeNode {
  id: string;
  type: TreeNodeType;
  novel?: boolean;
}

// IDs for educational pattern distinctions (mirrors component logic)
const EDUCATIONAL_PATTERN_IDS = new Set([
  'socratic-coach', 'concept-to-project-builder', 'error-whisperer',
  'knowledge-map-navigator', 'context-curator', 'rubric-rater',
  'self-remediation-loop', 'spaced-repetition-planner', 'challenge-ladder-generator',
  'peer-review-simulator', 'reflection-journaler', 'handoff-summarizer',
  'misconception-detector', 'time-box-pair-programmer', 'tool-use-coach'
]);

/**
 * Returns fill color for a node based on its type and (for patterns) specific educational IDs.
 * This function is intentionally pure for straightforward unit testing.
 */
export function getNodeFill(node: MinimalTreeNode): string {
  const colors: Record<string, string> = {
    root: '#3b82f600',
    category: '#8b5cf6',
    concept: '#06b6d4',
    pattern: '#f59e0b',
    service: '#10b981',
    quiz: '#ec4899'
  };
  if (node.type === 'pattern' && EDUCATIONAL_PATTERN_IDS.has(node.id)) {
    return '#d97706';
  }
  return colors[node.type] || '#6b7280';
}

/** Distinguishes educational pattern nodes. */
export function isEducationalPattern(node: MinimalTreeNode): boolean {
  return node.type === 'pattern' && EDUCATIONAL_PATTERN_IDS.has(node.id);
}
