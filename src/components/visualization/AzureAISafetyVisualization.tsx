export default function AzureAISafetyVisualization() {
  return (
    <div className="w-full p-4 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded mb-4">
      <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Responsible AI Pillars Visualization</h4>
      <div className="flex flex-wrap gap-4 justify-center">
        {['Fairness','Reliability & Safety','Privacy & Security','Inclusiveness','Transparency','Accountability'].map(pillar => (
          <div key={pillar} className="bg-white dark:bg-gray-700 border dark:border-gray-600 shadow rounded p-4 w-48 text-center text-gray-900 dark:text-gray-100">
            <span className="font-bold">{pillar}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
