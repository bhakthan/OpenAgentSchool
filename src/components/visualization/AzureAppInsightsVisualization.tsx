export default function AzureAppInsightsVisualization({ tracing }: { tracing?: boolean }) {
  if (tracing) {
    return (
      <div className="w-full p-4 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded mb-4">
        <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Distributed Tracing Simulation</h4>
        <div className="flex flex-col gap-2">
          <div className="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded p-2 text-gray-900 dark:text-gray-100">
            Request: <span className="font-mono">/api/agent/respond</span>
          </div>
          <div className="bg-gray-200 dark:bg-gray-600 border dark:border-gray-500 rounded p-2 text-gray-900 dark:text-gray-100">
            Trace: <span className="font-mono">Frontend → API → LLM → DB</span>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 border dark:border-gray-600 rounded p-2 text-gray-900 dark:text-gray-100">
            Duration: <span className="font-mono">320ms</span>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 border dark:border-gray-600 rounded p-2 text-gray-900 dark:text-gray-100">
            Status: <span className="font-mono">Success</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded mb-4">
      <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Application Analytics & Insights</h4>
      <div className="flex flex-col gap-2">
        <div className="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded p-2 text-gray-900 dark:text-gray-100">
          Usage: <span className="font-mono">Normal</span>
        </div>
        <div className="bg-gray-200 dark:bg-gray-600 border dark:border-gray-500 rounded p-2 text-gray-900 dark:text-gray-100">
          Anomaly: None detected
        </div>
      </div>
    </div>
  );
}
