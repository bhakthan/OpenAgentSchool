// Mark a learning node as complete for the journey map
export function markNodeComplete(nodeId: string, extraData: Record<string, any> = {}) {
  const key = `page-analytics-${nodeId}`;
  const value = {
    completionRate: 100,
    lastVisit: new Date().toISOString(),
    ...extraData
  };
  localStorage.setItem(key, JSON.stringify(value));
}
