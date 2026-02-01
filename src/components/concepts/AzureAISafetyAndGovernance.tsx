import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AzureAISafetyVisualization from "../visualization/AzureAISafetyVisualization";
import AzureContentFilterVisualization from "../visualization/AzureContentFilterVisualization";
import AzureDefenderVisualization from "../visualization/AzureDefenderVisualization";
import AzureGuardrailsVisualization from "../visualization/AzureGuardrailsVisualization";
import AzureAppInsightsVisualization from "../visualization/AzureAppInsightsVisualization";
import AzurePurviewVisualization from "../visualization/AzurePurviewVisualization";
import AudioNarrationControls from '@/components/audio/AudioNarrationControls';
import { ShieldCheck } from "@phosphor-icons/react";

export default function AzureAISafetyAndGovernance() {
  return (
    <div className="w-full space-y-6">
      {/* Header with Audio Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck size={24} className="text-primary" />
            Azure AI Safety & Governance
          </CardTitle>
          <CardDescription>
            Comprehensive Azure AI safety, governance, and monitoring solutions for responsible AI deployment
          </CardDescription>
          
          {/* Audio Narration Controls */}
          <AudioNarrationControls 
            componentName="AzureAISafetyAndGovernance"
            position="embedded"
          />
        </CardHeader>
      </Card>

      {/* Main Content */}
      <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-foreground">AI Safety & Governance</h2>
      <Tabs defaultValue="pillars" className="w-full">
        <TabsList className="mb-4 flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg p-2">
          <TabsTrigger value="pillars" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900">Responsible AI: Six Pillars</TabsTrigger>
          <TabsTrigger value="content-filter" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900">Content Filters</TabsTrigger>
          <TabsTrigger value="defender" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900">Azure Defender Risk Monitoring</TabsTrigger>
          <TabsTrigger value="guardrails" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900">Guardrails & Controls</TabsTrigger>
          <TabsTrigger value="monitoring" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900">Monitoring & Analytics</TabsTrigger>
          <TabsTrigger value="purview" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900">Governance: Microsoft Purview</TabsTrigger>
          <TabsTrigger value="tracing" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900">Tracing: Azure Application Insights</TabsTrigger>
          <TabsTrigger value="references" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900">References</TabsTrigger>
        </TabsList>
        <TabsContent value="pillars">
          <AzureAISafetyVisualization />
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Microsoft Responsible AI: Six Core Pillars</h3>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>Fairness: Ensuring equitable outcomes for all users.</li>
              <li>Reliability & Safety: Robust, secure, and safe AI systems.</li>
              <li>Privacy & Security: Protecting data and user privacy.</li>
              <li>Inclusiveness: Accessible and usable by diverse populations.</li>
              <li>Transparency: Clear, understandable AI decision-making.</li>
              <li>Accountability: Human oversight and responsibility.</li>
            </ul>
            <p className="mt-4 text-muted-foreground">These pillars are implemented in Microsoft Foundry through integrated tools and controls.</p>
          </div>
        </TabsContent>
        <TabsContent value="content-filter">
          <AzureContentFilterVisualization />
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Content Filters</h3>
            <p className="text-base">Microsoft Foundry provides advanced content filtering to detect and block harmful, unsafe, or inappropriate outputs. These filters use ML models and rule-based systems to ensure compliance and safety.</p>
            <ul className="list-disc pl-6 mt-2 text-base">
              <li>Real-time filtering of generated content</li>
              <li>Customizable filter rules</li>
              <li>Integration with moderation dashboards</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="defender">
          <AzureDefenderVisualization />
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Azure Defender Risk Monitoring & Alerts</h3>
            <p className="text-base">Azure Defender continuously monitors AI resources for threats, vulnerabilities, and risky behaviors. Automated alerts and risk scoring help teams respond quickly to incidents.</p>
            <ul className="list-disc pl-6 mt-2 text-base">
              <li>Threat detection for AI models and endpoints</li>
              <li>Automated risk scoring and alerting</li>
              <li>Integration with Security Center</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="guardrails">
          <AzureGuardrailsVisualization />
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Guardrails & Controls</h3>
            <p className="text-base">Microsoft Foundry enables the configuration of guardrails to restrict model behavior, enforce policies, and prevent misuse. Controls can be set for input validation, output constraints, and operational boundaries.</p>
            <ul className="list-disc pl-6 mt-2 text-base">
              <li>Input/output validation</li>
              <li>Policy enforcement</li>
              <li>Operational boundaries</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="monitoring">
          <AzureAppInsightsVisualization />
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Monitoring: Azure Application Analytics & Insights</h3>
            <p className="text-base">Monitor AI resource usage, performance, and anomalies using Azure Application Insights and Analytics. Real-time dashboards and alerts support proactive management and troubleshooting.</p>
            <ul className="list-disc pl-6 mt-2 text-base">
              <li>Usage analytics and reporting</li>
              <li>Anomaly detection</li>
              <li>Custom dashboards and alerts</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="purview">
          <AzurePurviewVisualization />
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Governance: Microsoft Purview</h3>
            <p className="text-base">Microsoft Purview provides unified data governance for AI resources, ensuring compliance, lineage tracking, and access control. Integrate Purview to manage policies, audits, and resource lifecycle.</p>
            <ul className="list-disc pl-6 mt-2 text-base">
              <li>Unified governance for data and AI assets</li>
              <li>Policy management and enforcement</li>
              <li>Audit trails and lineage tracking</li>
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="tracing">
          <AzureAppInsightsVisualization tracing />
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Tracing: Azure Application Insights</h3>
            <p className="text-base">Azure Application Insights enables distributed tracing for AI applications, allowing you to track requests, dependencies, and performance across services. This helps diagnose issues, optimize workflows, and ensure reliability.</p>
            <ul className="list-disc pl-6 mt-2 text-base">
              <li>Distributed tracing for AI workflows</li>
              <li>End-to-end request tracking</li>
              <li>Performance bottleneck identification</li>
              <li>Integration with dashboards and alerts</li>
            </ul>
            <p className="mt-2 text-muted-foreground">Tracing is essential for monitoring, debugging, and optimizing complex agentic and AI systems in production.</p>
          </div>
        </TabsContent>
        <TabsContent value="references">
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-4">References & Further Reading</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                <h4 className="font-medium mb-2">AI Safety Standards & Guidelines</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a 
                      href="https://www.turing.ac.uk/sites/default/files/2024-06/aieg-ati-6-safetyv1.2.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      The Alan Turing Institute - AI Safety Standards and Guidelines v1.2 (June 2024)
                    </a>
                    <p className="text-muted-foreground mt-1">Comprehensive guide to AI safety standards, risk assessment frameworks, and governance principles for AI systems.</p>
                  </li>
                  <li>
                    <a 
                      href="https://www.microsoft.com/en-us/ai/responsible-ai" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Microsoft Responsible AI Documentation
                    </a>
                    <p className="text-muted-foreground mt-1">Official Microsoft documentation on responsible AI principles and implementation in Azure.</p>
                  </li>
                  <li>
                    <a 
                      href="https://learn.microsoft.com/en-us/azure/ai-studio/concepts/evaluation-metrics-built-in" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Azure AI Studio Evaluation Metrics
                    </a>
                    <p className="text-muted-foreground mt-1">Built-in evaluation metrics for AI safety, fairness, and performance assessment.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}















