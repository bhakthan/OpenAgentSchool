import React, { useState, useCallback, useMemo, memo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PatternData } from '@/lib/data/patterns/index';
import { 
  Play, 
  Stop, 
  ArrowsClockwise, 
  CheckCircle,
  ClockClockwise, 
  Lightning, 
  Circle,
  CircleNotch, 
  Horse, 
  Rabbit 
} from "@phosphor-icons/react";
import { useTheme } from '@/components/theme/ThemeProvider';

// Business Context Mapping for different patterns
interface BusinessContext {
  nodes: Record<string, { name: string; description: string; icon?: string }>;
  steps: Record<string, { action: string; result: string }>;
  finalOutput: string;
}

const BUSINESS_CONTEXT_MAP: Record<string, BusinessContext> = {
  'autogen-multi-agent': {
    nodes: {
      'user-proxy': { name: 'Disruption Alert', description: 'Initial supply chain event detected', icon: '🚨' },
      'assistant1': { name: 'Monitor Agent', description: 'Analyzes disruption impact', icon: '🔍' },
      'assistant2': { name: 'Planner Agent', description: 'Creates alternative routes', icon: '🗺️' },
      'group-chat': { name: 'Agent Coordination', description: 'Multi-agent collaboration hub', icon: '💬' },
      'output': { name: 'Resolution Plan', description: 'Coordinated response strategy', icon: '✅' }
    },
    steps: {
      'user-proxy': { action: 'Detecting port congestion in Singapore', result: 'Critical supply chain disruption identified' },
      'assistant1': { action: 'Analyzing impact on shipment schedules', result: '15 shipments affected, 48-hour delay projected' },
      'assistant2': { action: 'Planning alternative land routes', result: 'Route via Malaysia identified, reduces delay to 24 hours' },
      'group-chat': { action: 'Coordinating response across all agents', result: 'Unified action plan established' },
      'output': { action: 'Implementing coordinated solution', result: 'Customers notified, routes updated, crisis managed' }
    },
    finalOutput: 'Supply chain disruption resolved: Shipments rerouted via land, customers informed, delay minimized to 24 hours through multi-agent coordination.'
  },
  'parallelization': {
    nodes: {
      'input': { name: 'Data Ingestion', description: 'Raw sales data streams', icon: '📥' },
      'splitter': { name: 'Data Splitter', description: 'Divides data by region', icon: '📊' },
      'processor-1': { name: 'North America', description: 'Processes US & Canada data', icon: '🇺🇸' },
      'processor-2': { name: 'Europe', description: 'Processes EU region data', icon: '🇪🇺' },
      'processor-3': { name: 'Asia-Pacific', description: 'Processes APAC data', icon: '🌏' },
      'aggregator': { name: 'Report Builder', description: 'Combines all regional insights', icon: '📈' },
      'output': { name: 'Executive Dashboard', description: 'Global sales performance', icon: '💼' }
    },
    steps: {
      'input': { action: 'Processing Q4 sales data from all regions', result: '2.3TB of transaction data ingested' },
      'splitter': { action: 'Segmenting data by geographic regions', result: 'Data split into 3 regional datasets' },
      'processor-1': { action: 'Analyzing North American market trends', result: '15% growth, mobile commerce driving increases' },
      'processor-2': { action: 'Processing European market performance', result: '8% growth, sustainability products trending' },
      'processor-3': { action: 'Evaluating Asia-Pacific sales patterns', result: '22% growth, e-commerce expansion in India' },
      'aggregator': { action: 'Synthesizing global market insights', result: 'Global patterns identified, regional variations noted' },
      'output': { action: 'Generating executive summary report', result: 'Strategic insights ready for board presentation' }
    },
    finalOutput: 'Global sales analysis complete: 15% overall growth driven by mobile and e-commerce expansion. Regional strengths identified for strategic planning.'
  },
  'prompt-chaining': {
    nodes: {
      'input': { name: 'Data Request', description: 'Business intelligence query', icon: '❓' },
      'stage-1': { name: 'Data Collector', description: 'Gathers financial metrics', icon: '📊' },
      'stage-2': { name: 'Trend Analyzer', description: 'Identifies patterns', icon: '📈' },
      'stage-3': { name: 'Insight Generator', description: 'Creates business insights', icon: '💡' },
      'stage-4': { name: 'Report Formatter', description: 'Formats for stakeholders', icon: '📋' },
      'output': { name: 'BI Dashboard', description: 'Executive summary', icon: '📊' }
    },
    steps: {
      'input': { action: 'Requesting quarterly performance analysis', result: 'Analysis scope: revenue, costs, market share, customer metrics' },
      'stage-1': { action: 'Collecting financial and operational data', result: 'Revenue $45M (+12%), costs $32M (+8%), 150K customers' },
      'stage-2': { action: 'Analyzing trends and patterns', result: 'Customer acquisition up 25%, retention improved to 94%' },
      'stage-3': { action: 'Generating strategic insights', result: 'Premium tier driving growth, opportunity in mobile channel' },
      'stage-4': { action: 'Formatting executive presentation', result: 'Visual dashboard with key metrics and recommendations' },
      'output': { action: 'Delivering comprehensive BI report', result: 'Strategic recommendations ready for leadership review' }
    },
    finalOutput: 'Quarterly BI analysis complete: Strong growth trajectory with premium services driving 25% customer acquisition increase. Mobile channel expansion recommended.'
  },
  'self-reflection': {
    nodes: {
      'input': { name: 'Quality Request', description: 'Product quality assessment', icon: '🎯' },
      'initial-assessment': { name: 'QA Inspector', description: 'Initial quality check', icon: '🔍' },
      'reflection': { name: 'Quality Reviewer', description: 'Reviews assessment quality', icon: '🤔' },
      'improvement': { name: 'Process Optimizer', description: 'Identifies improvements', icon: '⚡' },
      'final-check': { name: 'Final Validator', description: 'Validates improved process', icon: '✅' },
      'output': { name: 'Quality Report', description: 'Certified quality assessment', icon: '📋' }
    },
    steps: {
      'input': { action: 'Initiating quality control for new product batch', result: 'Batch #2024-Q1-047: 1,000 units requiring assessment' },
      'initial-assessment': { action: 'Performing initial quality inspection', result: '95% pass rate, 3 defect types identified' },
      'reflection': { action: 'Reviewing assessment methodology', result: 'Testing protocol adequate but missing stress tests' },
      'improvement': { action: 'Enhancing quality control process', result: 'Added thermal stress and durability tests' },
      'final-check': { action: 'Re-validating with improved process', result: '98% pass rate, defects reduced to 1 type' },
      'output': { action: 'Generating certified quality report', result: 'Batch approved for production, process improvements documented' }
    },
    finalOutput: 'Quality control complete: Batch certified with 98% pass rate. Process improvements implemented, reducing defects by 67%.'
  },
  'agent-to-agent': {
    nodes: {
      'coordinator': { name: 'Campaign Manager', description: 'Coordinates marketing campaign', icon: '🎯' },
      'message-bus': { name: 'Team Hub', description: 'Communication center', icon: '💬' },
      'content-agent': { name: 'Content Creator', description: 'Develops campaign materials', icon: '✍️' },
      'social-agent': { name: 'Social Media', description: 'Manages social presence', icon: '📱' },
      'analytics-agent': { name: 'Data Analyst', description: 'Tracks performance', icon: '📊' },
      'output': { name: 'Campaign Results', description: 'Integrated campaign report', icon: '🎉' }
    },
    steps: {
      'coordinator': { action: 'Launching product launch campaign coordination', result: 'Campaign strategy defined: 3-week multi-channel approach' },
      'message-bus': { action: 'Facilitating team communication and updates', result: 'Real-time coordination established between all teams' },
      'content-agent': { action: 'Creating campaign content and visuals', result: 'Blog posts, videos, infographics completed' },
      'social-agent': { action: 'Managing social media rollout', result: 'Content scheduled across 5 platforms, influencers engaged' },
      'analytics-agent': { action: 'Monitoring campaign performance metrics', result: 'Real-time tracking: 2.3M impressions, 15% engagement rate' },
      'output': { action: 'Compiling integrated campaign results', result: 'Campaign exceeded targets: 125% of conversion goals achieved' }
    },
    finalOutput: 'Marketing campaign success: 125% of conversion targets achieved through coordinated multi-agent strategy across content, social, and analytics teams.'
  },
  'orchestrator-worker': {
    nodes: {
      'orchestrator': { name: 'Production Manager', description: 'Coordinates manufacturing', icon: '👨‍💼' },
      'task-queue': { name: 'Work Orders', description: 'Manufacturing job queue', icon: '📋' },
      'worker-1': { name: 'Assembly Line A', description: 'Primary assembly station', icon: '🏭' },
      'worker-2': { name: 'Quality Control', description: 'Product inspection', icon: '🔍' },
      'worker-3': { name: 'Packaging Unit', description: 'Final packaging', icon: '📦' },
      'status-monitor': { name: 'Status Tracker', description: 'Progress monitoring', icon: '📊' },
      'output': { name: 'Finished Products', description: 'Ready for shipment', icon: '✅' }
    },
    steps: {
      'orchestrator': { action: 'Coordinating daily production schedule', result: 'Target: 500 units, 3 product lines scheduled' },
      'task-queue': { action: 'Distributing work orders to stations', result: 'Work orders assigned based on capacity and priority' },
      'worker-1': { action: 'Processing assembly operations', result: '450 units assembled, 2 hour ahead of schedule' },
      'worker-2': { action: 'Performing quality control checks', result: '448 units passed QC, 2 units sent for rework' },
      'worker-3': { action: 'Executing packaging and labeling', result: '448 units packaged and ready for shipment' },
      'status-monitor': { action: 'Tracking overall production metrics', result: 'Daily target exceeded by 97%, efficiency at 95%' },
      'output': { action: 'Finalizing production batch', result: 'Production complete: 448 units ready, 2 in rework queue' }
    },
    finalOutput: 'Manufacturing cycle complete: 97% target achievement with 95% efficiency. Daily production target exceeded, maintaining quality standards.'
  },
  'evaluator-optimizer': {
    nodes: {
      'input': { name: 'Performance Data', description: 'System metrics input', icon: '📊' },
      'evaluator': { name: 'Performance Monitor', description: 'Analyzes current metrics', icon: '🔍' },
      'optimizer': { name: 'Optimization Engine', description: 'Suggests improvements', icon: '⚡' },
      'validator': { name: 'Impact Validator', description: 'Tests optimization impact', icon: '✅' },
      'feedback': { name: 'Feedback Loop', description: 'Continuous improvement', icon: '🔄' },
      'output': { name: 'Optimized System', description: 'Enhanced performance', icon: '🚀' }
    },
    steps: {
      'input': { action: 'Collecting application performance metrics', result: 'Response time: 2.1s, CPU usage: 78%, memory: 65%' },
      'evaluator': { action: 'Analyzing performance bottlenecks', result: 'Database queries causing 60% of response time delays' },
      'optimizer': { action: 'Recommending performance optimizations', result: 'Query optimization and caching strategy proposed' },
      'validator': { action: 'Testing optimization in staging environment', result: 'Response time reduced to 0.8s, CPU usage down to 45%' },
      'feedback': { action: 'Monitoring production performance improvements', result: 'Optimization successful, implementing continuous monitoring' },
      'output': { action: 'Deploying optimized system to production', result: 'System performance improved by 62%, user satisfaction up' }
    },
    finalOutput: 'Performance optimization complete: 62% improvement in response times, 42% reduction in CPU usage. User satisfaction scores increased by 18%.'
  },
  'autonomous-workflow': {
    nodes: {
      'input': { name: 'Document Intake', description: 'Invoice processing request', icon: '📄' },
      'classifier': { name: 'Document Classifier', description: 'Identifies document type', icon: '🏷️' },
      'extractor': { name: 'Data Extractor', description: 'Extracts key information', icon: '📋' },
      'validator': { name: 'Data Validator', description: 'Validates extracted data', icon: '✅' },
      'approver': { name: 'Auto Approver', description: 'Approves within limits', icon: '👍' },
      'integrator': { name: 'System Integrator', description: 'Updates accounting system', icon: '💼' },
      'output': { name: 'Processed Invoice', description: 'Invoice fully processed', icon: '✅' }
    },
    steps: {
      'input': { action: 'Receiving vendor invoice for processing', result: 'Invoice #INV-2024-1847 from TechSupplies Inc, $2,450' },
      'classifier': { action: 'Identifying document type and vendor', result: 'Classified as: Standard vendor invoice, approved vendor' },
      'extractor': { action: 'Extracting invoice data and line items', result: 'Amount: $2,450, PO#: 2024-0394, 15 line items extracted' },
      'validator': { action: 'Validating data against purchase order', result: 'All line items match PO, amounts verified, within approval limits' },
      'approver': { action: 'Auto-approving invoice for payment', result: 'Invoice approved automatically, routed to AP for payment' },
      'integrator': { action: 'Updating accounting and procurement systems', result: 'Invoice recorded in GL, PO closed, vendor notified' },
      'output': { action: 'Finalizing invoice processing workflow', result: 'Invoice fully processed in 4 minutes, 15 seconds' }
    },
    finalOutput: 'Invoice processing complete: $2,450 invoice auto-processed in 4:15 with 100% accuracy. Vendor payment scheduled for next cycle.'
  },
  'deep-researcher': {
    nodes: {
      'input': { name: 'Due Diligence Request', description: 'M&A research assignment', icon: '🎯' },
      'query-planner': { name: 'Research Planner', description: 'Plans investigation strategy', icon: '📋' },
      'source-finder': { name: 'Source Locator', description: 'Finds relevant documents', icon: '🔍' },
      'content-extractor': { name: 'Data Extractor', description: 'Extracts key information', icon: '📊' },
      'fact-checker': { name: 'Fact Validator', description: 'Verifies information accuracy', icon: '✅' },
      'synthesizer': { name: 'Report Synthesizer', description: 'Compiles comprehensive report', icon: '📈' },
      'output': { name: 'DD Report', description: 'Due diligence findings', icon: '📋' }
    },
    steps: {
      'input': { action: 'Initiating due diligence for TechCorp acquisition', result: 'Target company: TechCorp, sector: SaaS, deal size: $150M' },
      'query-planner': { action: 'Planning comprehensive research strategy', result: 'Research areas: financials, legal, tech, market, team' },
      'source-finder': { action: 'Locating relevant documents and data sources', result: '847 documents found: SEC filings, patents, contracts, press' },
      'content-extractor': { action: 'Extracting key business and financial metrics', result: 'Revenue: $45M (+35% YoY), 200 employees, 15 patents' },
      'fact-checker': { action: 'Verifying financial and legal information', result: 'All financial data verified, 2 minor legal issues identified' },
      'synthesizer': { action: 'Compiling comprehensive due diligence report', result: 'Executive summary with risks, opportunities, and valuation' },
      'output': { action: 'Delivering final due diligence assessment', result: 'Recommendation: Proceed with caution, adjust valuation by 8%' }
    },
    finalOutput: 'Due diligence complete: TechCorp showing strong growth (35% YoY) with manageable risks. Recommended valuation adjustment to $138M.'
  },
  'agent-evaluation': {
    nodes: {
      'input': { name: 'Compliance Audit', description: 'Regulatory compliance check', icon: '⚖️' },
      'performance-test': { name: 'Performance Tester', description: 'Tests agent capabilities', icon: '🧪' },
      'bias-detector': { name: 'Bias Analyzer', description: 'Checks for unfair bias', icon: '⚖️' },
      'safety-checker': { name: 'Safety Validator', description: 'Validates safe operation', icon: '🛡️' },
      'compliance-verifier': { name: 'Compliance Officer', description: 'Verifies regulatory compliance', icon: '📋' },
      'reporter': { name: 'Audit Reporter', description: 'Generates compliance report', icon: '📊' },
      'output': { name: 'Compliance Certificate', description: 'Certification status', icon: '🎖️' }
    },
    steps: {
      'input': { action: 'Starting annual AI system compliance audit', result: 'Audit scope: 12 AI agents across customer service and finance' },
      'performance-test': { action: 'Testing agent accuracy and response quality', result: 'Average accuracy: 94.2%, response quality score: 8.7/10' },
      'bias-detector': { action: 'Analyzing responses for demographic bias', result: 'No significant bias detected across protected categories' },
      'safety-checker': { action: 'Validating safety protocols and error handling', result: 'All safety measures operational, 99.1% uptime achieved' },
      'compliance-verifier': { action: 'Verifying adherence to GDPR and industry standards', result: 'Full compliance with data protection and industry regulations' },
      'reporter': { action: 'Generating comprehensive audit report', result: 'Detailed compliance report with recommendations prepared' },
      'output': { action: 'Issuing compliance certification', result: 'AI systems certified compliant for next 12 months' }
    },
    finalOutput: 'Compliance audit complete: All 12 AI agents certified with 94.2% accuracy and full regulatory compliance. Certificate valid for 12 months.'
  },
  'modern-tool-use': {
    nodes: {
      'input': { name: 'IT Incident', description: 'System outage reported', icon: '🚨' },
      'planner': { name: 'Incident Planner', description: 'Plans response strategy', icon: '📋' },
      'selector': { name: 'Tool Selector', description: 'Selects appropriate tools', icon: '🔧' },
      'executor': { name: 'Automation Engine', description: 'Executes remediation', icon: '⚡' },
      'validator': { name: 'Recovery Validator', description: 'Validates system recovery', icon: '✅' },
      'error-handler': { name: 'Error Handler', description: 'Handles any failures', icon: '🛠️' },
      'output': { name: 'System Restored', description: 'Service fully operational', icon: '🟢' }
    },
    steps: {
      'input': { action: 'Receiving critical system outage alert', result: 'Database cluster failure affecting 15,000 users' },
      'planner': { action: 'Analyzing outage and planning recovery strategy', result: 'Primary DB failed, secondary available, failover planned' },
      'selector': { action: 'Selecting appropriate automation tools', result: 'Kubernetes, Ansible, and monitoring tools selected' },
      'executor': { action: 'Executing automated failover procedures', result: 'Traffic redirected to secondary cluster, services restored' },
      'validator': { action: 'Validating system recovery and performance', result: 'All services operational, performance within normal range' },
      'error-handler': { action: 'Handling any residual issues', result: 'Two lingering connections resolved, full recovery confirmed' },
      'output': { action: 'Confirming system fully operational', result: 'Incident resolved: 12-minute outage, all users restored' }
    },
    finalOutput: 'IT incident resolved: Database failover completed in 12 minutes with automated tools. Zero data loss, all 15,000 users restored to service.'
  },
  'model-context-protocol': {
    nodes: {
      'input': { name: 'Legal Case', description: 'New litigation case', icon: '⚖️' },
      'context-manager': { name: 'Case Manager', description: 'Manages case context', icon: '📋' },
      'research-agent': { name: 'Legal Researcher', description: 'Researches precedents', icon: '📚' },
      'drafting-agent': { name: 'Document Drafter', description: 'Drafts legal documents', icon: '✍️' },
      'compliance-agent': { name: 'Compliance Checker', description: 'Ensures compliance', icon: '🔍' },
      'mcp-aggregator': { name: 'Case Coordinator', description: 'Coordinates all agents', icon: '🤝' },
      'output': { name: 'Legal Strategy', description: 'Complete case strategy', icon: '⚖️' }
    },
    steps: {
      'input': { action: 'Initiating intellectual property dispute case', result: 'Patent infringement claim, $5M damages sought' },
      'context-manager': { action: 'Organizing case information and timeline', result: 'Case context established: patents, prior art, timeline' },
      'research-agent': { action: 'Researching relevant case law and precedents', result: '23 relevant cases found, 3 strong precedents identified' },
      'drafting-agent': { action: 'Drafting initial legal response documents', result: 'Motion to dismiss prepared, prior art defense outlined' },
      'compliance-agent': { action: 'Ensuring all documents meet court requirements', result: 'All filings compliant with local court rules and deadlines' },
      'mcp-aggregator': { action: 'Coordinating comprehensive legal strategy', result: 'Unified strategy: prior art defense with 85% success probability' },
      'output': { action: 'Finalizing complete case strategy', result: 'Legal strategy complete: motion ready, timeline established' }
    },
    finalOutput: 'Legal case strategy complete: Prior art defense prepared with 85% success probability. Motion to dismiss ready for filing within 30-day deadline.'
  },
  'voice-agent': {
    nodes: {
      'audio-input': { name: 'Call Intake', description: 'Customer call received', icon: '📞' },
      'speech-to-text': { name: 'Speech Recognition', description: 'Converts speech to text', icon: '🗣️' },
      'intent-analysis': { name: 'Intent Analyzer', description: 'Understands customer need', icon: '🧠' },
      'knowledge-lookup': { name: 'Knowledge Base', description: 'Finds relevant information', icon: '📚' },
      'response-generation': { name: 'Response Generator', description: 'Creates helpful response', icon: '💬' },
      'text-to-speech': { name: 'Voice Synthesis', description: 'Converts response to speech', icon: '🔊' },
      'output': { name: 'Customer Response', description: 'Spoken assistance provided', icon: '✅' }
    },
    steps: {
      'audio-input': { action: 'Receiving customer service call', result: 'Customer calling about billing discrepancy' },
      'speech-to-text': { action: 'Converting spoken words to text', result: '"I have a charge on my bill I don\'t recognize"' },
      'intent-analysis': { action: 'Analyzing customer intent and sentiment', result: 'Intent: billing inquiry, sentiment: confused but polite' },
      'knowledge-lookup': { action: 'Searching customer account and billing records', result: 'Account found: charge is for premium service upgrade' },
      'response-generation': { action: 'Generating helpful explanation and solution', result: 'Clear explanation prepared with removal option offered' },
      'text-to-speech': { action: 'Converting response to natural speech', result: 'Empathetic response delivered in natural voice' },
      'output': { action: 'Providing complete customer assistance', result: 'Issue resolved: charge explained, customer satisfied' }
    },
    finalOutput: 'Customer service call resolved: Billing inquiry clarified and charge explained. Customer opted to keep premium service, satisfaction rating: 5/5.'
  },
  'codeact-agent': {
    nodes: {
      'input': { name: 'Dev Request', description: 'Software development task', icon: '💻' },
      'planner': { name: 'Code Planner', description: 'Plans implementation approach', icon: '📋' },
      'code-generator': { name: 'Code Generator', description: 'Writes application code', icon: '⌨️' },
      'executor': { name: 'Code Executor', description: 'Runs and tests code', icon: '▶️' },
      'debugger': { name: 'Bug Fixer', description: 'Identifies and fixes issues', icon: '🐛' },
      'validator': { name: 'Code Validator', description: 'Validates functionality', icon: '✅' },
      'output': { name: 'Working Software', description: 'Deployed application', icon: '🚀' }
    },
    steps: {
      'input': { action: 'Receiving feature request for user dashboard', result: 'Build analytics dashboard with charts and filters' },
      'planner': { action: 'Planning dashboard architecture and components', result: 'React components planned: charts, filters, data grid' },
      'code-generator': { action: 'Writing dashboard components and logic', result: 'Dashboard components coded with Chart.js integration' },
      'executor': { action: 'Running and testing dashboard functionality', result: 'Dashboard renders correctly, data loads successfully' },
      'debugger': { action: 'Identifying and fixing responsive layout issues', result: 'Mobile responsiveness fixed, cross-browser tested' },
      'validator': { action: 'Validating user experience and performance', result: 'UX validated, performance optimized, ready for deployment' },
      'output': { action: 'Deploying dashboard to production', result: 'Analytics dashboard live, user adoption at 78%' }
    },
    finalOutput: 'Development complete: Analytics dashboard deployed with full functionality. User adoption reached 78% within first week of launch.'
  },
  'react-agent': {
    nodes: {
      'input': { name: 'Investment Query', description: 'Client financial analysis request', icon: '💰' },
      'llm': { name: 'Financial Reasoner', description: 'Analyzes market conditions', icon: '🧠' },
      'tools': { name: 'Market Data APIs', description: 'Real-time financial data', icon: '📊' },
      'output': { name: 'Investment Report', description: 'Comprehensive analysis', icon: '📈' }
    },
    steps: {
      'input': { action: 'Receiving investment analysis request', result: 'Client wants analysis of tech stock portfolio' },
      'llm': { action: 'Reasoning about market analysis strategy', result: 'Need current stock prices and earnings data' },
      'tools': { action: 'Fetching real-time market data', result: 'Retrieved current prices and P/E ratios for 15 stocks' },
      'output': { action: 'Generating comprehensive investment report', result: 'Risk assessment and recommendations completed' }
    },
    finalOutput: 'Investment analysis complete: Tech portfolio showing 12% growth potential, recommend holding current positions with 5% rebalancing toward cloud computing stocks.'
  },
  'computer-use': {
    nodes: {
      'input': { name: 'Test Request', description: 'UI testing automation task', icon: '🎯' },
      'screen-capture': { name: 'Screen Analysis', description: 'Captures application interface', icon: '📷' },
      'vision-model': { name: 'UI Understanding', description: 'Interprets screen elements', icon: '👁️' },
      'action-planner': { name: 'Test Planner', description: 'Plans interaction sequence', icon: '📋' },
      'action-executor': { name: 'Test Executor', description: 'Performs UI interactions', icon: '🖱️' },
      'output': { name: 'Test Results', description: 'Validation outcomes', icon: '✅' }
    },
    steps: {
      'input': { action: 'Initiating automated UI testing suite', result: 'Testing e-commerce checkout flow requested' },
      'screen-capture': { action: 'Capturing application screenshots', result: 'Login page, product page, cart page identified' },
      'vision-model': { action: 'Analyzing UI elements and layout', result: 'Buttons, forms, and navigation elements mapped' },
      'action-planner': { action: 'Planning test interaction sequence', result: 'Login → Browse → Add to cart → Checkout sequence planned' },
      'action-executor': { action: 'Executing automated interactions', result: 'All interactions completed successfully' },
      'output': { action: 'Validating test outcomes', result: 'Checkout flow works correctly, no UI issues found' }
    },
    finalOutput: 'UI testing complete: E-commerce checkout flow validated successfully. All 23 interaction steps passed, no accessibility issues detected.'
  },
  'agentic-rag': {
    nodes: {
      'input': { name: 'Policy Query', description: 'Employee question received', icon: '❓' },
      'query-planner': { name: 'Query Analyzer', description: 'Plans search strategy', icon: '🎯' },
      'knowledge-base': { name: 'Document Search', description: 'Searches policy database', icon: '📚' },
      'verifier': { name: 'Fact Checker', description: 'Validates information', icon: '🔍' },
      'output': { name: 'Verified Answer', description: 'Accurate policy response', icon: '✅' }
    },
    steps: {
      'input': { action: 'Processing employee PTO policy question', result: 'Question: "How many days PTO after 3 years of service?"' },
      'query-planner': { action: 'Analyzing query and planning search', result: 'Need to search: PTO policy, tenure requirements, 2024 updates' },
      'knowledge-base': { action: 'Searching company policy documents', result: 'Found relevant sections in 2024 HR Policy, pages 12-14' },
      'verifier': { action: 'Cross-referencing multiple policy sources', result: 'Confirmed: 3+ years = 20 days PTO, verified across 3 documents' },
      'output': { action: 'Providing verified policy answer', result: 'Complete answer with specific policy references provided' }
    },
    finalOutput: 'Policy question answered: After 3 years of service, employees are entitled to 20 days of PTO per the 2024 HR Policy, page 12. Answer verified against multiple company documents.'
  },
  'routing': {
    nodes: {
      'input': { name: 'Customer Query', description: 'Support request received', icon: '📞' },
      'router': { name: 'Smart Router', description: 'Analyzes request type', icon: '🎯' },
      'billing-agent': { name: 'Billing Support', description: 'Handles payment issues', icon: '💳' },
      'tech-agent': { name: 'Technical Support', description: 'Resolves tech problems', icon: '🔧' },
      'output': { name: 'Resolved Issue', description: 'Customer satisfaction', icon: '😊' }
    },
    steps: {
      'input': { action: 'Receiving customer support request', result: 'Customer reports: "Cannot access my account after payment"' },
      'router': { action: 'Analyzing query to determine support type', result: 'Detected: Account access + payment mention → Route to Billing' },
      'billing-agent': { action: 'Investigating payment and account status', result: 'Found payment processed but account not updated' },
      'tech-agent': { action: 'Providing technical account recovery', result: 'Account sync triggered, access restored' },
      'output': { action: 'Confirming resolution with customer', result: 'Customer confirmed account access restored' }
    },
    finalOutput: 'Support ticket resolved: Customer account access restored after payment sync issue. Routed correctly to billing support, resolved in 8 minutes.'
  }
};

// Helper function to get business context for a pattern
const getBusinessContext = (patternData: PatternData): BusinessContext | null => {
  if (!patternData.businessUseCase) return null;
  return BUSINESS_CONTEXT_MAP[patternData.id] || null;
};

// Types
interface PatternDemoSVGProps {
  patternData: PatternData;
  className?: string;
  styleVariant?: 'default' | 'flat-ui-2';
}

// Step type for visualization
interface StepState {
  id: string;
  node: string;
  label: string;
  status: 'pending' | 'active' | 'complete' | 'error';
  result?: string;
  startTime?: number;
  endTime?: number;
}

// Speed multipliers for animation
const SPEED_MULTIPLIERS = {
  'slow': 0.5,
  'normal': 1,
  'fast': 2,
  'very-fast': 4
};

// Node layout logic - similar to SimplePatternFlow
const calculateNodePositions = (nodes: any[], edges: any[]) => {
  const positions: { [key: string]: { x: number; y: number } } = {};
  
  if (nodes.length === 0) return positions;
  
  // Grid layout with better spacing
  const cols = Math.min(3, Math.ceil(Math.sqrt(nodes.length)));
  const rows = Math.ceil(nodes.length / cols);
  
  // Calculate spacing
  const nodeWidth = 120;
  const nodeHeight = 60;
  const horizontalSpacing = 180;
  const verticalSpacing = 120;
  
  // Calculate total dimensions
  const totalWidth = (cols - 1) * horizontalSpacing + nodeWidth;
  const totalHeight = (rows - 1) * verticalSpacing + nodeHeight;
  
  // Center the grid
  const startX = (600 - totalWidth) / 2;
  const startY = (400 - totalHeight) / 2;
  
  nodes.forEach((node, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    
    positions[node.id] = {
      x: startX + col * horizontalSpacing,
      y: startY + row * verticalSpacing
    };
  });
  
  return positions;
};

/**
 * PatternDemoSVG - SVG-based replacement for PatternDemoReactFlow
 * Provides interactive pattern visualization without ReactFlow dependencies
 */
export const PatternDemoSVG = memo(({ patternData, className, styleVariant = 'default' }: PatternDemoSVGProps) => {
  const { theme, isDarkMode } = useTheme();
  const isFlatUi2 = styleVariant === 'flat-ui-2';
  
  // Get business context if available
  const businessContext = useMemo(() => getBusinessContext(patternData), [patternData]);
  const isBusinessMode = !!businessContext;
  
  // State
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState<Record<string, StepState>>({});
  const [currentStepId, setCurrentStepId] = useState<string | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState<'slow' | 'normal' | 'fast' | 'very-fast'>('normal');
  const [animationMode, setAnimationMode] = useState<'auto' | 'step-by-step'>('auto');
  const [isWaitingForStep, setIsWaitingForStep] = useState(false);
  const [activeEdges, setActiveEdges] = useState<Set<string>>(new Set());
  
  // Calculate positions
  const nodePositions = useMemo(() => {
    return calculateNodePositions(patternData.nodes, patternData.edges);
  }, [patternData.nodes, patternData.edges]);
  
  // Theme colors
  const colors = useMemo(() => ({
    node: {
      default: isFlatUi2 ? (isDarkMode ? '#111827' : '#ffffff') : (isDarkMode ? '#374151' : '#f3f4f6'),
      active: isDarkMode ? '#3b82f6' : '#2563eb',
      complete: isFlatUi2 ? (isDarkMode ? '#1f2937' : '#f8fafc') : (isDarkMode ? '#10b981' : '#059669'),
      error: isDarkMode ? '#ef4444' : '#dc2626',
      border: isFlatUi2 ? (isDarkMode ? '#4b5563' : '#cbd5e1') : (isDarkMode ? '#6b7280' : '#d1d5db'),
      text: isDarkMode ? '#f9fafb' : '#111827'
    },
    edge: {
      default: isFlatUi2 ? (isDarkMode ? '#475569' : '#94a3b8') : (isDarkMode ? '#6b7280' : '#9ca3af'),
      active: isDarkMode ? '#3b82f6' : '#2563eb',
      complete: isFlatUi2 ? (isDarkMode ? '#60a5fa' : '#3b82f6') : (isDarkMode ? '#10b981' : '#059669')
    }
  }), [isDarkMode, isFlatUi2]);
  
  // Get node color based on status
  const getNodeColor = useCallback((nodeId: string) => {
    const step = steps[nodeId];
    if (!step) return colors.node.default;
    
    switch (step.status) {
      case 'active': return colors.node.active;
      case 'complete': return colors.node.complete;
      case 'error': return colors.node.error;
      default: return colors.node.default;
    }
  }, [steps, colors.node]);
  
  // Get edge color based on status
  const getEdgeColor = useCallback((edgeId: string) => {
    return activeEdges.has(edgeId) ? colors.edge.active : colors.edge.default;
  }, [activeEdges, colors.edge]);
  
  // Update node status
  const updateNodeStatus = useCallback((nodeId: string, status: 'pending' | 'active' | 'complete' | 'error', result?: string) => {
    setSteps(prevSteps => ({
      ...prevSteps,
      [nodeId]: {
        ...prevSteps[nodeId],
        status,
        result,
        ...(status === 'active' ? { startTime: Date.now() } : {}),
        ...(status === 'complete' || status === 'error' ? { endTime: Date.now() } : {})
      }
    }));
    
    setCurrentStepId(nodeId);
  }, []);
  
  // Simulate pattern execution
  const simulatePatternFlow = useCallback(async () => {
    // Reset state
    setSteps({});
    setCurrentStepId(null);
    setOutput(null);
    setActiveEdges(new Set());
    
    setIsRunning(true);
    
    try {
      // Create a map of steps with business-aware labels
      const stepsMap = patternData.nodes.reduce<Record<string, StepState>>((acc, node) => {
        // Use business context label if available, otherwise use default
        const label = businessContext?.nodes[node.id]?.name || node.data.label;
        
        acc[node.id] = {
          id: node.id,
          node: node.id,
          label: label,
          status: 'pending'
        };
        return acc;
      }, {});
      
      setSteps(stepsMap);
      
      // Function to wait between steps
      const wait = (ms: number) => new Promise(resolve => {
        if (animationMode === 'auto') {
          setTimeout(resolve, ms / SPEED_MULTIPLIERS[animationSpeed]);
        } else {
          // Step-by-step mode - wait for user input
          const waitForStep = () => {
            setIsWaitingForStep(true);
            const checkForAdvance = () => {
              if (!isWaitingForStep) {
                resolve(undefined);
              } else {
                setTimeout(checkForAdvance, 100);
              }
            };
            checkForAdvance();
          };
          waitForStep();
        }
      });
      
      // Simulate execution through nodes in order
      for (let i = 0; i < patternData.nodes.length; i++) {
        const node = patternData.nodes[i];
        
        // Activate current node
        updateNodeStatus(node.id, 'active');
        
        // Find and activate incoming edges
        const incomingEdges = patternData.edges.filter(edge => edge.target === node.id);
        setActiveEdges(prev => new Set([...prev, ...incomingEdges.map(e => e.id)]));
        
        await wait(1000);
        
        // Generate result based on business context or node type
        let result = '';
        if (businessContext?.steps[node.id]) {
          result = businessContext.steps[node.id].result;
        } else {
          // Fallback to generic results
          switch (node.data.nodeType) {
            case 'input':
              result = 'Query received and processed';
              break;
            case 'llm':
              result = 'LLM processing complete';
              break;
            case 'tool':
              result = 'Tool execution finished';
              break;
            case 'output':
              result = 'Final output generated';
              break;
            default:
              result = 'Processing complete';
          }
        }
        
        // Complete current node
        updateNodeStatus(node.id, 'complete', result);
        
        await wait(500);
      }
      
      // Set final output - use business context if available
      const finalOutput = businessContext?.finalOutput || 
        `${patternData.name} pattern execution completed successfully. All ${patternData.nodes.length} steps processed.`;
      setOutput(finalOutput);
      
    } catch (error) {
      console.error('Simulation failed:', error);
      setOutput('Simulation failed with an error.');
    } finally {
      setIsRunning(false);
      setIsWaitingForStep(false);
    }
  }, [patternData, animationSpeed, animationMode, updateNodeStatus, isWaitingForStep, businessContext]);
  
  // Reset demo
  const resetDemo = useCallback(() => {
    setIsRunning(false);
    setSteps({});
    setCurrentStepId(null);
    setOutput(null);
    setActiveEdges(new Set());
    setIsWaitingForStep(false);
  }, []);
  
  // Handle step advancement
  const handleNextStep = useCallback(() => {
    setIsWaitingForStep(false);
  }, []);
  
  // Effect to handle step advancement
  useEffect(() => {
    if (isWaitingForStep && animationMode === 'step-by-step') {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleNextStep();
        }
      };
      
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isWaitingForStep, animationMode, handleNextStep]);
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>
            {isBusinessMode 
              ? `${patternData.businessUseCase?.industry} - ${patternData.name} Demo`
              : `${patternData.name} Interactive Demo`
            }
          </span>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="sm" 
                    variant={animationMode === 'auto' ? "default" : "outline"}
                    onClick={() => setAnimationMode('auto')}
                    disabled={isRunning}
                  >
                    Auto
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Run automatically</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="sm" 
                    variant={animationMode === 'step-by-step' ? "default" : "outline"}
                    onClick={() => setAnimationMode('step-by-step')}
                    disabled={isRunning && animationMode === 'auto'}
                    className={animationMode === 'step-by-step' ? "pulse-animation" : ""}
                  >
                    Step-by-Step
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Advance through each step manually</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardTitle>
        <CardDescription>
          {isBusinessMode 
            ? `Experience the ${patternData.name} pattern in action through this ${patternData.businessUseCase?.industry.toLowerCase()} business scenario.`
            : `See how the ${patternData.name} pattern works with an interactive flow demonstration.`
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: SVG Visualization and Controls */}
          <div className="space-y-4">
            {/* SVG Visualization */}
            <div className={`border border-border h-[400px] relative overflow-hidden ${isFlatUi2 ? 'rounded-lg bg-background' : 'rounded-md bg-card'}`}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 600 400"
              className="w-full h-full"
            >
              {/* Define gradients and patterns */}
              <defs>
                <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colors.node.default} />
                  <stop offset="100%" stopColor={colors.node.border} />
                </linearGradient>
                
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill={colors.edge.default}
                  />
                </marker>
                
                <marker
                  id="arrowhead-active"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill={colors.edge.active}
                  />
                </marker>
              </defs>
              
              {/* Render edges */}
              {patternData.edges.map((edge) => {
                const sourcePos = nodePositions[edge.source];
                const targetPos = nodePositions[edge.target];
                
                if (!sourcePos || !targetPos) return null;
                
                const isActive = activeEdges.has(edge.id);
                
                // Calculate edge path
                const dx = targetPos.x - sourcePos.x;
                const dy = targetPos.y - sourcePos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Offset for node size
                const nodeRadius = 30;
                const offsetX = (dx / distance) * nodeRadius;
                const offsetY = (dy / distance) * nodeRadius;
                
                const startX = sourcePos.x + 60 + offsetX;
                const startY = sourcePos.y + 30 + offsetY;
                const endX = targetPos.x + 60 - offsetX;
                const endY = targetPos.y + 30 - offsetY;
                
                // Create curved path
                const midX = (startX + endX) / 2;
                const midY = (startY + endY) / 2;
                const controlX = midX + (startY - endY) * 0.2;
                const controlY = midY + (endX - startX) * 0.2;
                
                const path = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
                
                return (
                  <g key={edge.id}>
                    <path
                      d={path}
                      stroke={getEdgeColor(edge.id)}
                      strokeWidth="2"
                      fill="none"
                      markerEnd={isActive ? "url(#arrowhead-active)" : "url(#arrowhead)"}
                      className={isActive ? "animate-pulse" : ""}
                    />
                    {edge.label && (
                      <text
                        x={midX}
                        y={midY - 5}
                        textAnchor="middle"
                        className="text-xs fill-current"
                        fill={colors.node.text}
                      >
                        {edge.label}
                      </text>
                    )}
                  </g>
                );
              })}
              
              {/* Render nodes */}
              {patternData.nodes.map((node) => {
                const pos = nodePositions[node.id];
                if (!pos) return null;
                
                const nodeColor = getNodeColor(node.id);
                const isActive = currentStepId === node.id;
                
                return (
                  <g key={node.id}>
                    <rect
                      x={pos.x}
                      y={pos.y}
                      width="120"
                      height="60"
                      rx="8"
                      fill={nodeColor}
                      stroke={colors.node.border}
                      strokeWidth="2"
                      className={isActive ? "animate-pulse" : ""}
                    />
                    <text
                      x={pos.x + 60}
                      y={pos.y + 30}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-sm font-medium fill-current"
                      fill={colors.node.text}
                    >
                      {businessContext?.nodes[node.id]?.name || node.data.label}
                    </text>
                    {steps[node.id] && (
                      <text
                        x={pos.x + 60}
                        y={pos.y + 45}
                        textAnchor="middle"
                        className="text-xs fill-current"
                        fill={colors.node.text}
                      >
                        {steps[node.id].status}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
          
          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {!isRunning ? (
                <Button 
                  onClick={simulatePatternFlow} 
                  size="sm"
                  className="gap-1"
                >
                  <Play size={16} weight="fill" /> 
                  Start Simulation
                </Button>
              ) : (
                <Button 
                  onClick={resetDemo}
                  size="sm"
                  variant="destructive"
                  className="gap-1"
                >
                  <Stop size={16} weight="fill" /> 
                  Stop
                </Button>
              )}
              
              <Button
                onClick={resetDemo}
                size="sm"
                variant="outline"
                disabled={isRunning}
                className="gap-1"
              >
                <ArrowsClockwise size={16} /> 
                Reset
              </Button>
              
              {isWaitingForStep && animationMode === 'step-by-step' && (
                <Button
                  onClick={handleNextStep}
                  size="sm"
                  variant="secondary"
                  className="gap-1 animate-pulse"
                >
                  <ClockClockwise size={16} weight="fill" />
                  Next Step
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Speed:</span>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="sm" 
                      variant={animationSpeed === 'slow' ? "default" : "outline"}
                      onClick={() => setAnimationSpeed('slow')}
                      disabled={isRunning && animationMode === 'auto'}
                    >
                      <Circle size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Slow</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="sm" 
                      variant={animationSpeed === 'normal' ? "default" : "outline"}
                      onClick={() => setAnimationSpeed('normal')}
                      disabled={isRunning && animationMode === 'auto'}
                    >
                      <CircleNotch size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Normal</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="sm" 
                      variant={animationSpeed === 'fast' ? "default" : "outline"}
                      onClick={() => setAnimationSpeed('fast')}
                      disabled={isRunning && animationMode === 'auto'}
                    >
                      <Horse size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Fast</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="sm" 
                      variant={animationSpeed === 'very-fast' ? "default" : "outline"}
                      onClick={() => setAnimationSpeed('very-fast')}
                      disabled={isRunning && animationMode === 'auto'}
                    >
                      <Lightning size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Very Fast</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          </div>
          
          {/* Right Column: Steps and Results */}
          <div className="space-y-4">
            {/* Steps and Results */}
            {Object.keys(steps).length > 0 && (
              <Tabs defaultValue="steps" className="h-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="steps">Execution Steps</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>
              
              <TabsContent value="steps" className="space-y-4 pt-4">
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {Object.values(steps).map((step) => {
                    const getExecutionTime = (step: StepState) => {
                      if (step.startTime && step.endTime) {
                        return `${((step.endTime - step.startTime) / 1000).toFixed(1)}s`;
                      }
                      return '';
                    };
                    
                    return (
                      <div 
                        key={step.id} 
                        className={`p-3 rounded-md border ${
                          currentStepId === step.id ? 'border-primary bg-primary/5' : 'border-border'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            {step.status === 'pending' && (
                              <Badge variant="outline" className="bg-muted">Pending</Badge>
                            )}
                            {step.status === 'active' && (
                              <Badge className="bg-primary text-primary-foreground animate-pulse">Active</Badge>
                            )}
                            {step.status === 'complete' && (
                              <Badge className="ring-1 bg-[var(--badge-green-bg)] ring-[var(--badge-green-ring)] text-[var(--badge-green-text)] dark:text-[var(--badge-green-text)]">Complete</Badge>
                            )}
                            {step.status === 'error' && (
                              <Badge variant="destructive">Error</Badge>
                            )}
                            <span className="font-medium">{step.label}</span>
                          </div>
                          
                          {step.status === 'complete' && (
                            <Badge variant="outline" className="ml-auto">
                              {getExecutionTime(step)}
                            </Badge>
                          )}
                        </div>
                        
                        {/* Show business action description if available */}
                        {businessContext?.steps[step.id]?.action && (
                          <div className="text-xs mt-1 text-muted-foreground italic">
                            {businessContext.steps[step.id].action}
                          </div>
                        )}
                        
                        {step.result && (
                          <div className="text-sm mt-1">
                            <div className="flex items-start gap-1 text-muted-foreground">
                              <ArrowsClockwise size={14} className="mt-1" />
                              <span>{step.result}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="results" className="pt-4">
                <div className="p-4 rounded-md border border-border bg-card">
                  {output ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
                        <CheckCircle size={20} weight="fill" />
                        <span className="font-medium">Execution Complete</span>
                      </div>
                      <p className="text-foreground">{output}</p>
                    </div>
                  ) : (
                    <div className="text-muted-foreground flex items-center gap-2">
                      <ClockClockwise size={18} className="animate-spin" />
                      <span>Waiting for execution to complete...</span>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default PatternDemoSVG;
