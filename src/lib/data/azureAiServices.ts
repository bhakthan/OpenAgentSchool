// Azure AI Services for agent patterns
export interface AzureAIService {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  useCases: string[];
  bestPractices: string[];
  documentation: string;
}

export const azureAIServices: AzureAIService[] = [
  {
    id: "azure-openai",
    name: "Azure OpenAI Service",
    description: "Enterprise-grade access to OpenAI's models including GPT-5 series, GPT-4o, o3 reasoning models, DALL-E, Whisper, and Embeddings — with Azure security, compliance, and regional data residency.",
    capabilities: [
      "Access to GPT-5, GPT-5-mini, GPT-5-nano, GPT-4o, and o3 reasoning models",
      "Real-time audio and speech via Realtime API with WebRTC and SIP",
      "Image generation with GPT-Image-1 and video generation with Sora",
      "Text and multimodal embeddings generation",
      "Fine-tuning and model distillation for domain-specific customization",
      "Model Router for automatic best-model selection per prompt",
      "Content filtering, prompt shields, and PII detection",
      "Provisioned throughput (PTU) with spillover for capacity management",
      "Data zone standard deployments for regional data residency",
      "Stored completions for evaluation and fine-tuning datasets"
    ],
    useCases: [
      "Natural language understanding and generation",
      "Real-time voice assistants and audio interactions",
      "Multi-modal AI agents processing text, images, and audio",
      "Code generation, review, and completion",
      "Advanced reasoning and multi-step problem solving with o3 models",
      "Conversational AI agents with persistent context"
    ],
    bestPractices: [
      "Use Model Router to automatically select the best model per prompt when cost-performance trade-offs matter",
      "Implement system messages to define agent behavior and constraints",
      "Leverage provisioned throughput with spillover for production workloads",
      "Enable content filters and prompt shields for safety in production",
      "Use stored completions to build evaluation and fine-tuning datasets",
      "Monitor token usage and implement rate limiting mechanisms",
      "Cache responses for identical or similar queries to reduce costs"
    ],
    documentation: "https://learn.microsoft.com/azure/ai-foundry/openai/"
  },
  {
    id: "microsoft-agent-framework",
    name: "Microsoft Agent Framework",
    description: "The next-generation open-source framework that unifies Semantic Kernel and AutoGen into a single production-ready SDK for building agentic AI applications with multi-agent orchestration, graph-based workflows, and enterprise-grade features.",
    capabilities: [
      "Multi-language support (C#, Python, Java)",
      "Multi-agent orchestration (sequential, concurrent, group chat, handoff, magentic)",
      "Graph-based workflows with type-safe routing and checkpointing",
      "Session-based state management for long-running and human-in-the-loop scenarios",
      "MCP (Model Context Protocol) client integration for tool discovery",
      "A2A (Agent-to-Agent) protocol support for inter-agent communication",
      "Built-in observability via OpenTelemetry and Microsoft Entra security",
      "Provider-agnostic: supports Azure OpenAI, OpenAI, Anthropic, Ollama, and more",
      "Middleware pipeline for intercepting agent actions",
      "Context providers for agent memory and conversation state",
      "AG-UI protocol integration for building rich agent user interfaces",
      "Responsible AI features including prompt injection protection and task adherence monitoring"
    ],
    useCases: [
      "Building production-ready multi-agent systems with explicit orchestration control",
      "Enterprise AI applications requiring security, observability, and compliance",
      "Complex workflow automation with human-in-the-loop approval steps",
      "Conversational AI with persistent sessions and tool integration",
      "Cross-departmental business process automation with specialized agents",
      "Code modernization and legacy system migration using coordinated agents",
      "Agent-based customer service and knowledge assistant systems"
    ],
    bestPractices: [
      "Use agents for open-ended tasks and workflows for well-defined multi-step processes",
      "Implement middleware for cross-cutting concerns like logging, safety checks, and approvals",
      "Leverage graph-based workflows with checkpointing for long-running processes",
      "Use context providers to manage agent memory efficiently across sessions",
      "Integrate MCP servers for standardized tool discovery and interaction",
      "Enable OpenTelemetry tracing for full visibility into agent execution paths",
      "Apply responsible AI features to monitor prompt injection and task adherence",
      "If you can write a function to handle the task, do that instead of using an AI agent",
      "Migrate from Semantic Kernel or AutoGen using the official migration guides"
    ],
    documentation: "https://learn.microsoft.com/agent-framework/overview/"
  },
  {
    id: "azure-ai-foundry",
    name: "Microsoft Foundry",
    description: "Unified Azure PaaS platform that combines models, tools, frameworks, and governance into a single system for building, deploying, and managing intelligent agents and AI applications at enterprise scale.",
    capabilities: [
      "Growing model catalog including GPT-5, GPT-4o, Llama, and more",
      "Fine-tuning, distillation, and domain-specific customization",
      "Foundry Agent Service for production-ready agent hosting",
      "Built-in evaluation, tracing, and Application Insights integration",
      "Enterprise trust: Microsoft Entra, RBAC, content filters, encryption, network isolation",
      "Foundry SDKs for Python, C#, JavaScript/TypeScript, and Java",
      "Visual Studio Code extension for agent development",
      "Two portal experiences (classic and new) with shared project infrastructure",
      "Shared workspaces, version control, and integrated development environments"
    ],
    useCases: [
      "Enterprise-scale AI agent development and deployment",
      "Multi-agent application management with built-in governance",
      "AI model lifecycle management from prototype to production",
      "Secure AI deployment in regulated industries with compliance controls",
      "Cross-functional AI team collaboration with shared Foundry projects",
      "End-to-end agentic workflows with observability and safety"
    ],
    bestPractices: [
      "Use Foundry projects as secure units of isolation and collaboration",
      "Implement staged deployment (dev, test, prod) using project environments",
      "Enable tracing and Application Insights for full agent observability",
      "Use version control for prompts, model configurations, and agent definitions",
      "Leverage Foundry evaluations to benchmark model quality and safety",
      "Bring your own storage and search indexes for compliance control",
      "Document model and agent limitations and intended use cases"
    ],
    documentation: "https://learn.microsoft.com/azure/ai-foundry/what-is-foundry"
  },
  {
    id: "azure-ai-evaluation",
    name: "Azure AI Evaluation SDK",
    description: "Tools for systematic evaluation and benchmarking of AI models to ensure quality, safety, and alignment with requirements.",
    capabilities: [
      "Automated model evaluation pipelines",
      "Benchmarking against reference models",
      "Safety and alignment testing",
      "Performance and accuracy metrics",
      "Human feedback integration",
      "Comparative evaluations between model versions"
    ],
    useCases: [
      "Model quality assurance",
      "Comparative model analysis",
      "Regression testing for model updates",
      "Safety and alignment verification",
      "Agent behavior validation"
    ],
    bestPractices: [
      "Create comprehensive test suites covering expected agent behaviors",
      "Implement evaluation for edge cases and adversarial inputs",
      "Set up regular automated evaluation runs for continuous quality assessment",
      "Track evaluation metrics over time to identify regressions",
      "Include diverse evaluation criteria beyond accuracy (safety, fairness, etc.)",
      "Combine automated evaluation with human review for critical systems"
    ],
    documentation: "https://learn.microsoft.com/en-us/python/api/overview/azure/ai-evaluation-readme?view=azure-python"
  },
  {
    id: "azure-ai-inference",
    name: "Azure AI Inference SDK",
    description: "Optimizes the deployment and execution of AI models for efficient inference in production environments.",
    capabilities: [
      "High-performance model inference",
      "Automatic batching and throughput optimization",
      "GPU and hardware acceleration",
      "Scalable model serving",
      "Inference monitoring and logging"
    ],
    useCases: [
      "Real-time AI applications",
      "High-volume prediction services",
      "Edge and IoT inference",
      "Cost-optimized model deployment"
    ],
    bestPractices: [
      "Implement request batching to improve throughput where appropriate",
      "Configure autoscaling based on demand patterns",
      "Set appropriate timeouts and retry policies for inference requests",
      "Optimize model size for deployment constraints (distillation, quantization)",
      "Use caching for frequently requested inference results",
      "Implement fallbacks for inference failures"
    ],
    documentation: "https://learn.microsoft.com/en-us/python/api/overview/azure/ai-inference-readme?view=azure-python-preview"
  },
  {
    id: "azure-ai-agent-service",
    name: "Foundry Agent Service",
    description: "Generally available managed runtime within Microsoft Foundry that connects models, tools, and frameworks into a single agentic runtime — managing conversations, orchestrating tool calls, enforcing content safety, and integrating with identity, networking, and observability.",
    capabilities: [
      "Full conversation visibility with structured agent-to-agent and user-to-agent messaging",
      "Server-side tool orchestration with automatic retries and structured logging",
      "Connected agents for multi-agent systems without external orchestrators",
      "Built-in tools: Bing Search, Azure AI Search, Azure Functions, OpenAPI, MCP, File Search, Code Interpreter",
      "Deep Research tool with o3-deep-research model",
      "Browser Automation tool via Microsoft Playwright Workspaces",
      "BYO thread storage with Azure Cosmos DB for NoSQL",
      "Content filters, prompt injection protection (including XPIA), and responsible AI controls",
      "Microsoft Entra identity, RBAC, audit logs, and enterprise conditional access",
      "Application Insights integration and agent tracing",
      "Logic Apps triggers for event-driven agent invocation"
    ],
    useCases: [
      "Production-ready customer service and support automation",
      "Enterprise knowledge assistants with grounded data access",
      "Multi-agent workflow automation with connected agents",
      "Event-driven agents triggered by Logic Apps, emails, or tickets",
      "Document summarization, invoice processing, and content generation",
      "Data-driven insights using Microsoft Fabric integration"
    ],
    bestPractices: [
      "Use Standard Agent Setup with BYO storage and search for enterprise compliance",
      "Define clear agent instructions combining model configuration, tools, and prompts",
      "Leverage connected agents for task delegation instead of building external orchestration",
      "Enable content filters and prompt shields for production safety",
      "Use Application Insights and tracing to monitor agent decisions and tool invocations",
      "Implement Logic Apps triggers for automated event-driven agent workflows",
      "Test agents in the Foundry portal before deploying via SDK",
      "Choose between hosted (code-deployed) and declarative (prompt-based) agent definitions based on complexity"
    ],
    documentation: "https://learn.microsoft.com/azure/ai-foundry/agents/overview"
  },
  {
    id: "azure-content-safety",
    name: "Azure Content Safety",
    description: "AI service for detecting harmful content across text and images to maintain safety and compliance.",
    capabilities: [
      "Text content moderation",
      "Image content analysis",
      "Content categorization",
      "Severity level assessment",
      "Custom blocklists and allowlists"
    ],
    useCases: [
      "User-generated content moderation",
      "AI output safety filtering",
      "Regulatory compliance for content",
      "Brand safety protection"
    ],
    bestPractices: [
      "Implement pre-moderation for AI-generated content before display",
      "Set appropriate threshold levels based on your application\'s audience",
      "Combine automated safety checks with human review for edge cases",
      "Create feedback loops to improve detection over time",
      "Implement blocklists for domain-specific problematic content",
      "Deploy content safety in multiple stages of the agent workflow"
    ],
    documentation: "https://learn.microsoft.com/azure/ai-services/content-safety/"
  },
  {
    id: "azure-language-service",
    name: "Azure Language Service",
    description: "Comprehensive NLP capabilities including sentiment analysis, entity recognition, and custom text classification.",
    capabilities: [
      "Named entity recognition",
      "Sentiment analysis",
      "Language detection",
      "Custom text classification",
      "Key phrase extraction",
      "Conversational language understanding"
    ],
    useCases: [
      "Enhanced agent understanding of user inputs",
      "Document processing and information extraction",
      "Customer feedback analysis",
      "Domain-specific language understanding"
    ],
    bestPractices: [
      "Combine with Azure OpenAI for enhanced language capabilities",
      "Create custom classifiers for domain-specific terminology",
      "Use sentiment analysis to adapt agent tone and responses",
      "Implement entity recognition for better context understanding",
      "Process and extract structured information before reasoning tasks",
      "Leverage language detection for multilingual agent support"
    ],
    documentation: "https://learn.microsoft.com/azure/ai-services/language-service/"
  },
  {
    id: "azure-ai-search",
    name: "Azure AI Search",
    description: "AI-powered cloud search service with integrated vector, hybrid, and semantic search for building knowledge-intensive RAG applications and grounding AI agents in enterprise data.",
    capabilities: [
      "Vector search with HNSW and exhaustive KNN algorithms",
      "Hybrid search combining keyword, vector, and semantic approaches",
      "Semantic ranking with cross-field L2 reranking",
      "Integrated vectorization with built-in embedding models",
      "Scalar and binary vector quantization for cost optimization",
      "Multimodal search across text, images, and structured data",
      "AI enrichment pipelines with skillsets for document cracking",
      "Document chunking, indexing, and incremental enrichment",
      "Native integration with Foundry Agent Service as a knowledge tool",
      "Knowledge store for persisting enriched content"
    ],
    useCases: [
      "Enterprise RAG implementations",
      "Knowledge base search",
      "Document discovery and exploration",
      "Content recommendation",
      "Multimodal retrieval"
    ],
    bestPractices: [
      "Design optimal chunking strategies for your document corpus",
      "Implement hybrid retrieval combining vector and keyword search",
      "Use semantic ranking to improve relevance of search results",
      "Apply vector quantization to optimize large vector indexes",
      "Create query rewriting steps to improve retrieval quality",
      "Use filters to narrow search scope for more relevant results",
      "Implement feedback loops to capture user interaction with search results",
      "Configure proper relevance tuning based on content types"
    ],
    documentation: "https://learn.microsoft.com/azure/ai-search/"
  },
  {
    id: "azure-document-intelligence",
    name: "Azure Document Intelligence",
    description: "Extract text, key-value pairs, tables, and structure from documents using AI-powered OCR and document understanding.",
    capabilities: [
      "Optical character recognition (OCR)",
      "Form recognition",
      "Layout analysis",
      "Pre-built models for common documents",
      "Custom document models"
    ],
    useCases: [
      "Document processing automation",
      "Data extraction from forms and receipts",
      "Contract analysis",
      "ID document processing"
    ],
    bestPractices: [
      "Pre-process documents for optimal extraction quality",
      "Train custom models for domain-specific documents",
      "Implement validation logic for extracted information",
      "Combine with other Azure AI services for end-to-end document workflows",
      "Set up monitoring for extraction quality metrics",
      "Design fallback paths for when automated extraction fails"
    ],
    documentation: "https://learn.microsoft.com/azure/ai-services/document-intelligence/"
  },
  {
    id: "azure-functions",
    name: "Azure Functions",
    description: "Serverless compute service for building and deploying event-driven applications that can host AI agent microservices and tools.",
    capabilities: [
      "Serverless execution environment",
      "Event-driven triggers (HTTP, Timer, Queue, Event Grid)",
      "Auto-scaling based on demand",
      "Multiple language support (Python, JavaScript, C#, Java)",
      "Integration with Azure AI services",
      "Durable Functions for stateful workflows",
      "Consumption and Premium hosting plans",
      "Built-in authentication and authorization"
    ],
    useCases: [
      "AI agent tool hosting and execution",
      "Event-driven agent workflows",
      "Microservices for agent capabilities",
      "Real-time data processing for agents",
      "Integration APIs for external systems",
      "Scheduled agent tasks and maintenance",
      "Webhook handlers for agent notifications",
      "Model inference endpoints"
    ],
    bestPractices: [
      "Design functions as stateless, single-purpose tools for agents",
      "Implement proper error handling and retry logic",
      "Use Durable Functions for complex agent workflows requiring state",
      "Optimize cold start performance with warm-up strategies",
      "Implement proper security with function-level authentication",
      "Use Application Insights for monitoring and debugging",
      "Design for idempotency to handle retries safely",
      "Implement proper resource cleanup and connection pooling"
    ],
    documentation: "https://learn.microsoft.com/azure/azure-functions/"
  },
  {
    id: "azure-kubernetes-service",
    name: "Azure Kubernetes Service (AKS)",
    description: "Managed Kubernetes service for deploying, managing, and scaling containerized AI agent applications with enterprise-grade security and monitoring.",
    capabilities: [
      "Managed Kubernetes control plane",
      "Auto-scaling of nodes and pods",
      "Built-in security and compliance features",
      "Azure Active Directory integration",
      "GPU node pools for AI workloads",
      "Azure Monitor and Container Insights integration",
      "Azure Policy and governance controls",
      "Virtual node serverless scaling"
    ],
    useCases: [
      "Large-scale multi-agent system deployments",
      "Containerized AI agent microservices",
      "GPU-accelerated model inference services",
      "High-availability agent orchestration",
      "Multi-tenant agent environments",
      "DevOps pipelines for agent deployment",
      "Edge computing for distributed agents",
      "Hybrid and multi-cloud agent deployments"
    ],
    bestPractices: [
      "Use namespaces to isolate different agent environments",
      "Implement proper resource quotas and limits for agent pods",
      "Use Azure Key Vault CSI driver for secure credential management",
      "Configure horizontal pod autoscaling for agent workloads",
      "Implement proper network policies for agent communication",
      "Use Azure Monitor and Application Insights for observability",
      "Design stateless agent services with external state storage",
      "Implement proper health checks and readiness probes"
    ],
    documentation: "https://learn.microsoft.com/azure/aks/"
  },
  {
    id: "azure-container-apps",
    name: "Azure Container Apps",
    description: "Fully managed serverless container service optimized for running microservices and containerized AI agents with built-in scaling and networking.",
    capabilities: [
      "Serverless container hosting",
      "Built-in autoscaling (scale-to-zero)",
      "Managed ingress and load balancing",
      "Service discovery and communication",
      "Integrated monitoring and logging",
      "Blue-green and canary deployments",
      "KEDA-based event-driven scaling",
      "Dapr integration for microservices"
    ],
    useCases: [
      "Serverless AI agent microservices",
      "Event-driven agent processing",
      "API endpoints for agent interactions",
      "Background processing for agents",
      "Multi-container agent applications",
      "Microservices-based agent architectures",
      "Cost-effective agent hosting",
      "Development and testing environments"
    ],
    bestPractices: [
      "Use scale rules based on agent workload patterns",
      "Implement proper health checks for container reliability",
      "Use managed identities for secure Azure service access",
      "Configure ingress rules for secure agent communication",
      "Use Dapr for service-to-service communication",
      "Implement proper logging and monitoring strategies",
      "Design containers for stateless operation",
      "Use secrets management for sensitive configuration"
    ],
    documentation: "https://learn.microsoft.com/azure/container-apps/"
  },
  {
    id: "azure-app-service",
    name: "Azure App Service",
    description: "Platform-as-a-Service (PaaS) for hosting web applications, REST APIs, and mobile backends that can serve as agent interfaces and management platforms.",
    capabilities: [
      "Support for multiple programming languages",
      "Built-in CI/CD and deployment slots",
      "Auto-scaling and load balancing",
      "Custom domains and SSL certificates",
      "Application monitoring and diagnostics",
      "Authentication and authorization",
      "Virtual network integration",
      "Backup and disaster recovery"
    ],
    useCases: [
      "Agent management dashboards and interfaces",
      "REST APIs for agent communication",
      "Web-based agent configuration tools",
      "Agent monitoring and analytics platforms",
      "User interfaces for agent interactions",
      "Admin portals for agent management",
      "Documentation and help systems",
      "Integration endpoints for external systems"
    ],
    bestPractices: [
      "Use deployment slots for safe agent system updates",
      "Implement proper authentication for agent management",
      "Use Application Insights for monitoring agent interactions",
      "Configure auto-scaling based on agent usage patterns",
      "Implement proper error handling and logging",
      "Use managed identities for Azure service integration",
      "Design APIs with proper versioning and documentation",
      "Implement rate limiting and security controls"
    ],
    documentation: "https://learn.microsoft.com/azure/app-service/"
  },
  {
    id: "azure-logic-apps",
    name: "Azure Logic Apps",
    description: "Cloud-based platform for creating and running automated workflows that integrate apps, data, systems, and services across enterprises and organizations.",
    capabilities: [
      "Visual workflow designer",
      "200+ connectors for integration",
      "Event-driven and scheduled triggers",
      "Built-in error handling and retry logic",
      "Monitoring and alerting",
      "Stateful and stateless workflows",
      "Enterprise integration patterns",
      "B2B messaging and EDI support"
    ],
    useCases: [
      "Agent workflow orchestration",
      "Multi-system integration for agents",
      "Event-driven agent triggering",
      "Data transformation for agent inputs",
      "Notification and alerting systems",
      "Business process automation with agents",
      "Legacy system integration",
      "API composition and aggregation"
    ],
    bestPractices: [
      "Design workflows for modularity and reusability",
      "Implement proper error handling and compensation logic",
      "Use managed identities for secure connections",
      "Monitor workflow performance and costs",
      "Implement proper retry and timeout policies",
      "Use variables and expressions for dynamic behavior",
      "Design for scalability and throttling",
      "Document workflow logic and dependencies"
    ],
    documentation: "https://learn.microsoft.com/azure/logic-apps/"
  },
  {
    id: "azure-service-bus",
    name: "Azure Service Bus",
    description: "Fully managed enterprise message broker with message queues and publish-subscribe topics for reliable communication between distributed applications and services.",
    capabilities: [
      "Message queues and topics",
      "At-least-once and exactly-once delivery",
      "Message sessions and correlation",
      "Dead letter queues",
      "Scheduled message delivery",
      "Auto-forwarding and duplicate detection",
      "Virtual network integration",
      "Geo-disaster recovery"
    ],
    useCases: [
      "Reliable messaging between agent components",
      "Event-driven agent communication",
      "Decoupling agent services",
      "Message ordering and session management",
      "Load leveling for agent workloads",
      "Integration with external systems",
      "Asynchronous processing patterns",
      "Publish-subscribe for agent events"
    ],
    bestPractices: [
      "Design message schemas for forward compatibility",
      "Implement proper message handling and acknowledgment",
      "Use sessions for ordered message processing",
      "Configure appropriate message TTL and dead letter handling",
      "Monitor queue depths and processing metrics",
      "Implement idempotent message processing",
      "Use managed identities for authentication",
      "Design for high availability and disaster recovery"
    ],
    documentation: "https://learn.microsoft.com/azure/service-bus-messaging/"
  },
  {
    id: "azure-event-grid",
    name: "Azure Event Grid",
    description: "Fully managed event routing service that enables event-driven programming using publish-subscribe semantics for building reactive applications.",
    capabilities: [
      "Event-driven architecture support",
      "Built-in Azure service integration",
      "Custom topics and event schemas",
      "Event filtering and routing",
      "Webhook and queue delivery",
      "Dead letter and retry handling",
      "Cloud Events schema support",
      "High throughput and low latency"
    ],
    useCases: [
      "Event-driven agent triggering",
      "Real-time agent notifications",
      "State change propagation",
      "Integration event routing",
      "Serverless event processing",
      "IoT device event handling",
      "Media processing workflows",
      "Application lifecycle events"
    ],
    bestPractices: [
      "Design event schemas for consistency and evolution",
      "Implement proper event filtering to reduce noise",
      "Use dead letter queues for failed event handling",
      "Monitor event delivery and processing metrics",
      "Implement idempotent event handlers",
      "Use managed identities for secure event delivery",
      "Design for event ordering and deduplication",
      "Test event handling failure scenarios"
    ],
    documentation: "https://learn.microsoft.com/azure/event-grid/"
  },
  {
    id: "azure-cosmos-db",
    name: "Azure Cosmos DB",
    description: "Globally distributed, multi-model database service designed for elastic scale, multi-region writes, and comprehensive SLAs for throughput, latency, availability, and consistency.",
    capabilities: [
      "Global distribution and multi-region writes",
      "Multiple data models (SQL, MongoDB, Cassandra, Gremlin)",
      "Elastic scale and automatic indexing",
      "Multiple consistency levels",
      "Built-in analytics and change feed",
      "Serverless and provisioned throughput options",
      "Enterprise security and compliance",
      "Native vector search capabilities"
    ],
    useCases: [
      "Agent state and memory storage",
      "Conversation history management",
      "Real-time agent analytics",
      "Global agent deployments",
      "Vector embeddings storage",
      "Session and context management",
      "Configuration and metadata storage",
      "Audit logs and compliance data"
    ],
    bestPractices: [
      "Design partition keys for even data distribution",
      "Choose appropriate consistency levels for agent use cases",
      "Use change feed for real-time data processing",
      "Implement proper indexing strategies",
      "Monitor request units and optimize costs",
      "Use managed identities for secure access",
      "Design for multi-region scenarios",
      "Implement proper backup and disaster recovery"
    ],
    documentation: "https://learn.microsoft.com/azure/cosmos-db/"
  },
  {
    id: "azure-storage",
    name: "Azure Storage",
    description: "Scalable cloud storage solution offering blob, file, queue, and table storage services with high availability, security, and performance.",
    capabilities: [
      "Blob storage for unstructured data",
      "File shares and directory services",
      "Message queues for asynchronous processing",
      "Table storage for NoSQL data",
      "Data Lake Storage for analytics",
      "Hot, cool, and archive access tiers",
      "Encryption and access control",
      "Geo-redundancy and backup"
    ],
    useCases: [
      "Agent file and document storage",
      "Training data and model storage",
      "Log files and audit trails",
      "Static content and media files",
      "Backup and archival storage",
      "Data lake for agent analytics",
      "Queue storage for agent messaging",
      "Configuration and template storage"
    ],
    bestPractices: [
      "Choose appropriate access tiers for cost optimization",
      "Implement proper access controls and security",
      "Use lifecycle management for automated archiving",
      "Monitor storage metrics and costs",
      "Implement data encryption for sensitive content",
      "Use managed identities for secure access",
      "Design for data redundancy and availability",
      "Optimize blob naming and organization"
    ],
    documentation: "https://learn.microsoft.com/azure/storage/"
  },
  {
    id: "azure-key-vault",
    name: "Azure Key Vault",
    description: "Cloud service for securely storing and accessing secrets, keys, and certificates used by cloud applications and services.",
    capabilities: [
      "Secrets management and encryption",
      "Hardware security module (HSM) support",
      "Certificate lifecycle management",
      "Access policies and RBAC",
      "Audit logging and monitoring",
      "Integration with Azure services",
      "Soft delete and purge protection",
      "Network access controls"
    ],
    useCases: [
      "Agent API keys and credentials storage",
      "Database connection strings",
      "Certificate management for HTTPS",
      "Encryption keys for data protection",
      "Integration secrets for external services",
      "Configuration secrets management",
      "Token and password storage",
      "Compliance and audit requirements"
    ],
    bestPractices: [
      "Use managed identities instead of storing credentials",
      "Implement proper access policies and RBAC",
      "Enable audit logging for compliance",
      "Use separate Key Vaults for different environments",
      "Implement secret rotation strategies",
      "Monitor access patterns and anomalies",
      "Use network access controls for security",
      "Implement backup and recovery procedures"
    ],
    documentation: "https://learn.microsoft.com/azure/key-vault/"
  },
  {
    id: "azure-monitor",
    name: "Azure Monitor",
    description: "Comprehensive monitoring solution for collecting, analyzing, and responding to telemetry from cloud and on-premises environments.",
    capabilities: [
      "Metrics and logs collection",
      "Application performance monitoring",
      "Infrastructure monitoring",
      "Custom dashboards and workbooks",
      "Alerting and notifications",
      "Log queries with KQL",
      "Integration with Azure services",
      "Machine learning-based insights"
    ],
    useCases: [
      "Agent performance monitoring",
      "Error tracking and diagnostics",
      "Usage analytics and insights",
      "Resource utilization monitoring",
      "Custom metrics and KPIs",
      "Alerting on agent issues",
      "Compliance and audit logging",
      "Capacity planning and optimization"
    ],
    bestPractices: [
      "Implement structured logging for better analysis",
      "Use custom metrics for agent-specific KPIs",
      "Set up proactive alerting for critical issues",
      "Create dashboards for operational visibility",
      "Use log queries for troubleshooting and analysis",
      "Implement proper data retention policies",
      "Monitor costs and optimize data collection",
      "Integrate with incident management systems"
    ],
    documentation: "https://learn.microsoft.com/azure/azure-monitor/"
  }
];

// Map each service to applicable agent patterns
export interface AzureServicePatternMapping {
  patternId: string;
  serviceId: string;
  integration: string;
  bestPractices: string[];
}

export const azureServicePatternMappings: AzureServicePatternMapping[] = [
  {
    patternId: "react-agent",
    serviceId: "azure-openai",
    integration: "Core reasoning engine for the agent",
    bestPractices: [
      "Use Azure OpenAI GPT-4 for complex reasoning tasks",
      "Implement system messages to maintain ReAct format consistency",
      "Balance verbosity of reasoning traces with token efficiency",
      "Cache reasoning paths for similar problems to improve efficiency"
    ]
  },
  {
    patternId: "react-agent",
    serviceId: "azure-content-safety",
    integration: "Filter and validate both user inputs and agent outputs",
    bestPractices: [
      "Apply content safety checks before tool execution",
      "Validate agent outputs before returning to users",
      "Implement appropriate response handling for flagged content",
      "Create custom allowlists for domain-specific terminology"
    ]
  },
  {
    patternId: "react-agent",
    serviceId: "azure-ai-evaluation",
    integration: "Evaluate reasoning steps and tool use effectiveness",
    bestPractices: [
      "Build evaluation suites that validate tool selection logic",
      "Measure chain-of-thought reasoning quality metrics",
      "Compare different prompt strategies empirically",
      "Track performance across different types of user queries"
    ]
  },
  {
    patternId: "codeact-agent",
    serviceId: "azure-openai",
    integration: "Code generation and execution planning",
    bestPractices: [
      "Use code-specialized models like GPT-4 with enhanced code capabilities",
      "Implement strict validation of generated code before execution",
      "Set up execution sandboxes with appropriate security constraints",
      "Cache common code patterns to improve efficiency"
    ]
  },
  {
    patternId: "codeact-agent",
    serviceId: "azure-content-safety",
    integration: "Validate generated code for security issues",
    bestPractices: [
      "Scan generated code for potentially harmful operations",
      "Implement execution permissions based on safety assessments",
      "Create allowlists for approved libraries and functions",
      "Log all code execution attempts for security auditing"
    ]
  },
  {
    patternId: "codeact-agent",
    serviceId: "azure-ai-evaluation",
    integration: "Evaluate code quality and execution results",
    bestPractices: [
      "Create test suites that validate code correctness across scenarios",
      "Measure execution time and resource usage metrics",
      "Compare code solutions for efficiency and readability",
      "Track success rates for different types of coding tasks"
    ]
  },
  {
    patternId: "self-reflection",
    serviceId: "azure-openai",
    integration: "Self-critique and improvement capabilities",
    bestPractices: [
      "Use separate model instances for generation and reflection",
      "Implement temperature variation between generation and critique",
      "Design prompt strategies that encourage honest self-assessment",
      "Track improvement metrics across iteration cycles"
    ]
  },
  {
    patternId: "self-reflection",
    serviceId: "azure-ai-evaluation",
    integration: "Formalized evaluation of agent outputs",
    bestPractices: [
      "Create quantitative metrics for evaluating output quality",
      "Compare outputs before and after reflection steps",
      "Implement human feedback loops to validate improvements",
      "Design test cases that target common reasoning failures"
    ]
  },
  {
    patternId: "agentic-rag",
    serviceId: "azure-openai",
    integration: "Query understanding and result synthesis",
    bestPractices: [
      "Implement query decomposition for complex information needs",
      "Use dedicated system messages for retrieval vs. synthesis roles",
      "Balance citation and attribution with natural sounding responses",
      "Prompt the model to identify missing information gaps"
    ]
  },
  {
    patternId: "agentic-rag",
    serviceId: "azure-ai-search",
    integration: "Knowledge retrieval backbone",
    bestPractices: [
      "Design hybrid retrieval strategies combining semantic and keyword search",
      "Implement query rewriting to improve retrieval quality",
      "Use metadata filtering to narrow search context appropriately",
      "Optimize chunk size and overlap for your specific content types"
    ]
  },
  {
    patternId: "agentic-rag",
    serviceId: "azure-ai-evaluation",
    integration: "Evaluate retrieval quality and response accuracy",
    bestPractices: [
      "Measure relevance of retrieved documents to user queries",
      "Create test suites with known-answer questions",
      "Evaluate factuality and citation accuracy in responses",
      "Track hallucination rates across different query types"
    ]
  },
  {
    patternId: "modern-tool-use",
    serviceId: "azure-openai",
    integration: "Tool selection and result interpretation",
    bestPractices: [
      "Implement clear tool specifications in system messages",
      "Create explicit examples of tool use in few-shot prompts",
      "Design tool output schemas that are easy for models to parse",
      "Implement preference for simpler tools when appropriate"
    ]
  },
  {
    patternId: "modern-tool-use",
    serviceId: "azure-content-safety",
    integration: "Tool input and output validation",
    bestPractices: [
      "Validate all tool inputs for safety before execution",
      "Apply content safety checks to external tool outputs",
      "Implement appropriate error handling for flagged content",
      "Create safety logs for tool usage patterns"
    ]
  },
  {
    patternId: "model-context-protocol",
    serviceId: "azure-openai",
    integration: "Context-aware processing and response generation",
    bestPractices: [
      "Design context schemas that balance completeness and token efficiency",
      "Implement hierarchical context structures with varying detail levels",
      "Use system messages to define context handling protocols",
      "Track context relevance metrics to optimize retrieval"
    ]
  },
  {
    patternId: "model-context-protocol",
    serviceId: "azure-ai-search",
    integration: "Efficient context retrieval and filtering",
    bestPractices: [
      "Implement context routers based on query classification",
      "Design filtering strategies to narrow context based on user permissions",
      "Use relevance tuning to prioritize most important context",
      "Implement context caching for frequently accessed information"
    ]
  },
  {
    patternId: "agent-to-agent",
    serviceId: "azure-openai",
    integration: "Multi-agent coordination and communication",
    bestPractices: [
      "Define clear communication protocols between agents",
      "Use different system messages to specialize agent roles",
      "Implement message validation between agent interactions",
      "Design conversation summarization to manage context length"
    ]
  },
  {
    patternId: "agent-to-agent",
    serviceId: "azure-ai-agent-service",
    integration: "Agent lifecycle and conversation management",
    bestPractices: [
      "Set up appropriate authentication between communicating agents",
      "Design fallback mechanisms when agent communication fails",
      "Implement observability for all agent interactions",
      "Create feedback loops to improve agent coordination"
    ]
  },
  {
    patternId: "prompt-chaining",
    serviceId: "azure-openai",
    integration: "Sequential reasoning and transformation steps",
    bestPractices: [
      "Design each chain step with clear input and output formats",
      "Implement validation between chain steps to catch errors early",
      "Use different temperature settings based on step requirements",
      "Consider smaller models for simpler chain steps to optimize costs"
    ]
  },
  {
    patternId: "prompt-chaining",
    serviceId: "azure-ai-inference",
    integration: "Optimize inference performance across chain steps",
    bestPractices: [
      "Batch similar chain steps together when possible",
      "Implement parallel execution for independent chain branches",
      "Configure appropriate timeouts for each chain step",
      "Design graceful degradation when chain steps fail"
    ]
  },
  {
    patternId: "parallelization",
    serviceId: "azure-openai",
    integration: "Parallel execution of multiple reasoning paths",
    bestPractices: [
      "Use consistent prompting across parallel instances",
      "Design effective aggregation strategies for parallel outputs",
      "Implement diversity-promoting techniques when appropriate",
      "Consider cost-effective model selection for parallel calls"
    ]
  },
  {
    patternId: "parallelization",
    serviceId: "azure-ai-inference",
    integration: "Efficient parallel inference execution",
    bestPractices: [
      "Configure appropriate request batching for parallel calls",
      "Implement timeout handling for lagging parallel paths",
      "Design failover strategies when some parallel paths fail",
      "Optimize resource allocation based on criticality of parallel paths"
    ]
  },
  {
    patternId: "orchestrator-worker",
    serviceId: "azure-openai",
    integration: "Task orchestration and worker specialization",
    bestPractices: [
      "Use separate model configurations for orchestrator vs. worker roles",
      "Design explicit task specifications for worker clarity",
      "Implement result validation before accepting worker outputs",
      "Create clear success/failure criteria for tasks"
    ]
  },
  {
    patternId: "orchestrator-worker",
    serviceId: "azure-ai-agent-service",
    integration: "Agent coordination and management",
    bestPractices: [
      "Implement proper authentication between orchestrator and workers",
      "Design logging for full task lifecycle visibility",
      "Create monitoring dashboards for orchestration patterns",
      "Implement circuit breakers for failing workers"
    ]
  },
  {
    patternId: "evaluator-optimizer",
    serviceId: "azure-openai",
    integration: "Content evaluation and iterative improvement",
    bestPractices: [
      "Use separate model instances for generation and evaluation",
      "Design explicit evaluation criteria in system messages",
      "Implement objective scoring systems for measurable improvement",
      "Tune optimization cycles based on diminishing returns"
    ]
  },
  {
    patternId: "evaluator-optimizer",
    serviceId: "azure-ai-evaluation",
    integration: "Formalized evaluation frameworks",
    bestPractices: [
      "Create comprehensive evaluation dimensions beyond quality",
      "Implement checkpoint comparisons across optimization cycles",
      "Design human evaluation integration for subjective aspects",
      "Track improvement metrics to determine stopping criteria"
    ]
  },
  {
    patternId: "routing",
    serviceId: "azure-openai",
    integration: "Query classification and specialized handling",
    bestPractices: [
      "Design clear classification categories with examples",
      "Implement confidence thresholds for routing decisions",
      "Create fallback paths for ambiguous queries",
      "Track routing accuracy metrics for continuous improvement"
    ]
  },
  {
    patternId: "routing",
    serviceId: "azure-language-service",
    integration: "Enhanced query understanding and classification",
    bestPractices: [
      "Train custom classifiers for domain-specific routing",
      "Implement entity recognition to extract routing signals",
      "Use multi-label classification for complex queries",
      "Combine rule-based and ML-based routing approaches"
    ]
  },
  {
    patternId: "autonomous-workflow",
    serviceId: "azure-openai",
    integration: "Autonomous decision-making and action planning",
    bestPractices: [
      "Implement clear constraints and boundaries in system messages",
      "Design explicit action spaces and tool specifications",
      "Create comprehensive logging of all actions and reasoning",
      "Implement circuit breakers for unexpected behaviors"
    ]
  },
  {
    patternId: "autonomous-workflow",
    serviceId: "azure-content-safety",
    integration: "Safety validation for autonomous actions",
    bestPractices: [
      "Validate all planned actions before execution",
      "Implement permission levels for different action types",
      "Create safety logs for autonomous decision patterns",
      "Design human approval workflows for critical actions"
    ]
  },
  {
    patternId: "reflexion",
    serviceId: "azure-openai",
    integration: "Self-reflection and iterative improvement",
    bestPractices: [
      "Use separate prompts for action vs. reflection phases",
      "Implement structured reflection templates for consistency",
      "Design improvement tracking across reflection cycles",
      "Create memory mechanisms for learning from past reflections"
    ]
  },
  {
    patternId: "reflexion",
    serviceId: "azure-ai-evaluation",
    integration: "Formalized self-evaluation frameworks",
    bestPractices: [
      "Create evaluation dimensions aligned with task objectives",
      "Implement checkpoint comparisons across reflection cycles",
      "Design test suites that target common reasoning failures",
      "Track learning curves across similar problem types"
    ]
  },
  {
    patternId: "plan-and-execute",
    serviceId: "azure-openai",
    integration: "Task decomposition and sequential execution",
    bestPractices: [
      "Use clear planning templates with explicit steps and dependencies",
      "Implement validation between planning and execution phases",
      "Design replanning triggers when execution results change assumptions",
      "Balance plan granularity with execution efficiency"
    ]
  },
  {
    patternId: "plan-and-execute",
    serviceId: "azure-ai-agent-service",
    integration: "Agent coordination for plan execution",
    bestPractices: [
      "Implement task tracking across multiple execution agents",
      "Design proper handoffs between planning and execution phases",
      "Create visibility into plan progress and bottlenecks",
      "Implement fallbacks when planned steps fail"
    ]
  },
  // Add mappings for any additional patterns or services that might be missing
  {
    patternId: "plan-and-execute",
    serviceId: "azure-ai-foundry",
    integration: "Model lifecycle management for planning models",
    bestPractices: [
      "Implement CI/CD pipelines for deploying updated planner models",
      "Use version control for planning templates and configurations",
      "Establish monitoring dashboards for planning performance metrics",
      "Document planning model limitations and intended use cases"
    ]
  },
  {
    patternId: "autonomous-workflow",
    serviceId: "azure-ai-foundry",
    integration: "End-to-end autonomous agent development and deployment",
    bestPractices: [
      "Set up CI/CD pipelines for agent deployment across environments",
      "Create staging environments for testing autonomous behaviors safely",
      "Implement feature flags for controlling autonomous capabilities",
      "Document agent capabilities, limitations, and safety measures"
    ]
  },
  {
    patternId: "react-agent",
    serviceId: "azure-ai-search",
    integration: "Knowledge retrieval for tool-assisted reasoning",
    bestPractices: [
      "Provide access to domain knowledge through search tools",
      "Use vector search for semantic understanding of tool requirements",
      "Implement hybrid retrieval for tool documentation and examples",
      "Create specialized indexes for different tool categories"
    ]
  },
  {
    patternId: "codeact-agent",
    serviceId: "azure-ai-foundry",
    integration: "Code generation model development and deployment",
    bestPractices: [
      "Implement separate development and production environments for code agents",
      "Use version control for code examples and test cases",
      "Set up monitoring for code generation quality metrics",
      "Document code pattern libraries and implementation guidelines"
    ]
  },
  // Azure Functions mappings
  {
    patternId: "react-agent",
    serviceId: "azure-functions",
    integration: "Host agent tools and microservices",
    bestPractices: [
      "Deploy individual agent tools as separate functions",
      "Use durable functions for stateful agent workflows",
      "Implement proper error handling and retry logic",
      "Monitor function performance and costs"
    ]
  },
  {
    patternId: "codeact-agent",
    serviceId: "azure-functions",
    integration: "Execute generated code in secure sandboxes",
    bestPractices: [
      "Implement strict input validation for code execution",
      "Use consumption plan for variable workloads",
      "Set up appropriate timeout and memory limits",
      "Monitor execution logs for security issues"
    ]
  },
  // Azure Kubernetes Service mappings
  {
    patternId: "multiagent-orchestration",
    serviceId: "azure-kubernetes-service",
    integration: "Orchestrate large-scale multi-agent deployments",
    bestPractices: [
      "Use namespaces to isolate different agent teams",
      "Implement proper resource quotas and limits",
      "Use horizontal pod autoscaling for agent workloads",
      "Monitor cluster health and agent performance"
    ]
  },
  {
    patternId: "react-agent",
    serviceId: "azure-kubernetes-service",
    integration: "Scale agent deployments for high availability",
    bestPractices: [
      "Deploy agents as stateless pods with external state storage",
      "Use load balancers for distributing agent requests",
      "Implement proper health checks and readiness probes",
      "Monitor resource utilization and optimize costs"
    ]
  },
  // Azure Container Apps mappings
  {
    patternId: "react-agent",
    serviceId: "azure-container-apps",
    integration: "Host lightweight agent microservices",
    bestPractices: [
      "Use scale-to-zero for cost optimization",
      "Implement event-driven scaling rules",
      "Use managed identities for secure Azure service access",
      "Monitor container performance and scaling events"
    ]
  },
  {
    patternId: "codeact-agent",
    serviceId: "azure-container-apps",
    integration: "Deploy code execution environments",
    bestPractices: [
      "Configure appropriate resource limits for code execution",
      "Use ingress controls for secure API access",
      "Implement proper logging and monitoring",
      "Design containers for stateless operation"
    ]
  },
  // Azure Cosmos DB mappings
  {
    patternId: "react-agent",
    serviceId: "azure-cosmos-db",
    integration: "Store agent memory and conversation history",
    bestPractices: [
      "Design partition keys for efficient agent data access",
      "Use change feed for real-time agent state updates",
      "Implement proper indexing for agent queries",
      "Monitor request units and optimize costs"
    ]
  },
  {
    patternId: "multiagent-orchestration",
    serviceId: "azure-cosmos-db",
    integration: "Manage shared state across multiple agents",
    bestPractices: [
      "Use multiple containers for different data types",
      "Implement consistent read/write patterns",
      "Use TTL for automatic cleanup of temporary data",
      "Design for global distribution if needed"
    ]
  },
  // Azure Service Bus mappings
  {
    patternId: "multiagent-orchestration",
    serviceId: "azure-service-bus",
    integration: "Enable reliable messaging between agents",
    bestPractices: [
      "Use topics for broadcast communication patterns",
      "Implement message correlation for request-response",
      "Configure dead letter queues for error handling",
      "Monitor queue depths and processing metrics"
    ]
  },
  {
    patternId: "react-agent",
    serviceId: "azure-service-bus",
    integration: "Queue tool execution requests and responses",
    bestPractices: [
      "Use sessions for ordered message processing",
      "Implement idempotent message processing",
      "Configure appropriate message TTL",
      "Use duplicate detection for reliability"
    ]
  },
  // Azure Monitor mappings
  {
    patternId: "react-agent",
    serviceId: "azure-monitor",
    integration: "Monitor agent performance and behavior",
    bestPractices: [
      "Set up custom metrics for agent-specific KPIs",
      "Implement structured logging for better analysis",
      "Create dashboards for operational visibility",
      "Set up proactive alerting for critical issues"
    ]
  },
  {
    patternId: "multiagent-orchestration",
    serviceId: "azure-monitor",
    integration: "Monitor multi-agent system health",
    bestPractices: [
      "Track inter-agent communication patterns",
      "Monitor resource utilization across agents",
      "Implement distributed tracing for complex workflows",
      "Create composite dashboards for system overview"
    ]
  }
];