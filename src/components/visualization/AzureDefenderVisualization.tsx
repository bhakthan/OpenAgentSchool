export default function AzureDefenderVisualization() {
  return (
    <div className="w-full p-4 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded mb-4">
      <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Azure Defender Risk Monitoring</h4>
      <div className="flex flex-col gap-2">
        <div className="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded p-2 text-gray-900 dark:text-gray-100">
          Threat Detected: <span className="font-mono">Model misuse risk</span>
        </div>
        <div className="bg-gray-200 dark:bg-gray-600 border dark:border-gray-500 rounded p-2 text-gray-900 dark:text-gray-100">
          Alert: Immediate action required!
        </div>
      </div>
    </div>
  );
}
