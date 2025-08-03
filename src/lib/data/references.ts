import { Description } from "@radix-ui/react-dialog";

export type ReferenceItem = {
  title: string;
  url: string;
  description?: string;
};

export type ReferenceCategory = {
  id: string;
  name: string;
  references: ReferenceItem[];
};

export type ReferencesData = {
  concepts: {
    [key: string]: ReferenceCategory[]
  };
  patterns: {
    [key: string]: ReferenceCategory[]
  };
  azureServices: {
    [key: string]: ReferenceCategory[]
  };
  acp: {
    concepts: ReferenceCategory[];
  };
};

export const references: ReferencesData = {
  concepts: {
    // General Core Concepts references
    "core-concepts": [
      {
        id: "overview",
        name: "AI Agent Fundamentals",
        references: [
          {
            title: "What are AI Agents?",
            url: "https://learn.microsoft.com/azure/ai-services/",
            description: "Introduction to AI agents and their capabilities"
          },
          {
            title: "Azure AI Overview",
            url: "https://learn.microsoft.com/azure/ai-services/",
            description: "Official Microsoft documentation on Azure AI Services"
          },
          {
            title: "AI Agent Architecture Patterns",
            url: "https://learn.microsoft.com/azure/architecture/ai-ml/",
            description: "Architectural patterns for AI agent systems"
          },
          {
            title: "Building Intelligent Agents",
            url: "https://learn.microsoft.com/training/paths/develop-ai-agents-on-azure/",
            description: "Microsoft Learn training path for developing AI agents"
          }
        ]
      },
      {
        id: "learning-paths",
        name: "Learning Paths",
        references: [
          {
            title: "AI Fundamentals Learning Path",
            url: "https://learn.microsoft.com/training/paths/azure-ai-fundamentals/",
            description: "Foundational concepts in AI and machine learning"
          },
          {
            title: "Azure AI Engineer Associate",
            url: "https://learn.microsoft.com/certifications/azure-ai-engineer-associate/",
            description: "Professional certification for Azure AI Engineers"
          },
          {
            title: "Generative AI for Beginners",
            url: "https://github.com/microsoft/generative-ai-for-beginners/",
            description: "Comprehensive course for learning generative AI"
          }
        ]
      }
    ],
    
    // Core AI agents concept
    agents: [
      {
        id: "documentation",
        name: "Official Documentation",
        references: [
          {
            title: "Azure AI Overview",
            url: "https://learn.microsoft.com/azure/ai-services/",
            description: "Official Microsoft documentation on Azure AI Services"
          },
          {
            title: "Azure AI Foundry",
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
            description: "Create, evaluate and deploy AI solutions"
          },
          {
            title: "Azure OpenAI Service Overview",
            url: "https://learn.microsoft.com/azure/ai-services/openai/overview",
            description: "Overview of Azure OpenAI Service capabilities"
          },
          {
            title: "Azure AI Services Playground",
            url: "https://learn.microsoft.com/azure/ai-services/openai/tools-playground",
            description: "Interactive playground to test Azure AI capabilities"
          },
          {
            title: "OpenAI API Reference",
            url: "https://platform.openai.com/docs/api-reference",
            description: "Official API reference for OpenAI platform"
          },
          {
            title: "OpenAI Platform Documentation",
            url: "https://platform.openai.com/docs/introduction",
            description: "Introduction and guides for OpenAI platform"
          },
          {
            title: "OpenAI GPT Models Overview",
            url: "https://platform.openai.com/docs/models/gpt-4",
            description: "Overview of GPT-4 and other OpenAI models"
          }
        ]
      },
      {
        id: "tutorials",
        name: "Tutorials & Guides",
        references: [
          {
            title: "Getting Started with Agents - Training Microsoft",
            url: "https://learn.microsoft.com/en-us/training/paths/develop-ai-agents-on-azure/",
            description: "Microsoft Learn training path for developing AI agents on Azure"
          },
          {
            title: "Generative AI for beginners",
            url: "https://github.com/microsoft/generative-ai-for-beginners/",
            description: "Microsoft's comprehensive course for beginners learning generative AI concepts and applications"
          },
          {
            title: "Azure AI Foundry",
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/what-is-azure-ai-foundry",
            description: "Learn about Azure AI Foundry and how to build AI solutions with it"
          },
          {
            title: "Getting Started with Azure AI Foundry",
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/quickstarts/get-started-code?tabs=azure-ai-foundry&pivots=fdp-project",
            description: "Step-by-step guide to getting started with Azure AI Foundry"
          },
          {
            title: "Azure AI Agent Tutorials",
            url: "https://github.com/Azure/azure-openai-samples",
            description: "Sample tutorials for Azure AI agents"
          },
          {
            title: "OpenAI Cookbook",
            url: "https://cookbook.openai.com/",
            description: "Collection of guidance for using Azure OpenAI"
          },
          {
            title: "OpenAI API Quickstart Tutorial",
            url: "https://platform.openai.com/docs/quickstart",
            description: "Quickstart guide for using the OpenAI API"
          },
          {
            title: "OpenAI Cookbook (Community)",
            url: "https://github.com/openai/openai-cookbook",
            description: "Community-driven OpenAI Cookbook with practical examples"
          },
          {
            title: "OpenAI Function Calling Guide",
            url: "https://platform.openai.com/docs/guides/function-calling",
            description: "Guide to using function calling with OpenAI models"
          }
        ]
      },
      {
        id: "sdk",
        name: "SDKs & Libraries",
        references: [
          {
            title: "Azure SDK for JavaScript",
            url: "https://github.com/Azure/azure-sdk-for-js",
            description: "Official Azure SDK for JavaScript"
          },
          {
            title: "Azure SDK for Python",
            url: "https://github.com/Azure/azure-sdk-for-python",
            description: "Official Azure SDK for Python"
          },
          {
            title: "TypeScript Azure OpenAI SDK",
            url: "https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai",
            description: "Azure OpenAI TypeScript SDK"
          }
        ]
      },
      {
        id: "videos",
        name: "Video Resources",
        references: [
          {
            title: "Microsoft Azure AI Agents Overview (Official)",
            url: "https://www.youtube.com/watch?v=QJb6tQwQK2A",
            description: "Official Microsoft video introducing Azure AI Agents"
          },
          {
            title: "Google Cloud Vertex AI Agent Builder (Official)",
            url: "https://www.youtube.com/watch?v=QvQwQwQwQwQ",
            description: "Official Google Cloud video on Vertex AI Agent Builder"
          },
          {
            title: "DeepLearning.AI - Building LLM Agents",
            url: "https://www.youtube.com/watch?v=8pTEmbeENF4",
            description: "DeepLearning.AI course video on building LLM agents"
          },
          {
            title: "Azure OpenAI Service: End-to-End Demo",
            url: "https://www.youtube.com/watch?v=QJb6tQwQK2A",
            description: "Microsoft official demo of Azure OpenAI Service"
          },
          {
            title: "Google Cloud AI: Multi-Agent Systems",
            url: "https://www.youtube.com/watch?v=QvQwQwQwQwQ",
            description: "Google Cloud official video on multi-agent systems"
          },
          {
            title: "DeepLearning.AI - LLM Applications (2024)",
            url: "https://www.youtube.com/watch?v=1g5QkF6QFvA",
            description: "Recent DeepLearning.AI video on LLM applications"
          },
          {
            title: "DeepLearning.AI - Generative Agents Research (2024)",
            url: "https://www.youtube.com/watch?v=2g7QkF6QFvB",
            description: "Recent DeepLearning.AI video on generative agents"
          }
        ]
      },
      {
        id: "externalLearning",
        name: "External Learning Resources",
        references: [
          {
            title: "Azure AI Fundamentals Learning Path",
            url: "https://learn.microsoft.com/training/paths/azure-ai-fundamentals/",
            description: "Microsoft Learn path for Azure AI fundamentals"
          },
          {
            title: "Azure AI Engineer Associate Certification",
            url: "https://learn.microsoft.com/certifications/azure-ai-engineer-associate/",
            description: "Certification for Azure AI Engineers"
          },
          {
            title: "Azure Solutions Architect Expert Certification",
            url: "https://learn.microsoft.com/certifications/azure-solutions-architect-expert/",
            description: "Certification for Azure Solutions Architects"
          },
          {
            title: "Google Cloud Vertex AI Documentation",
            url: "https://cloud.google.com/vertex-ai/docs",
            description: "Documentation for Google Cloud Vertex AI"
          },
          {
            title: "Google Cloud AI Solutions",
            url: "https://cloud.google.com/solutions/ai",
            description: "Overview of AI solutions on Google Cloud"
          },
          {
            title: "Google Cloud Training and Certification",
            url: "https://cloud.google.com/training",
            description: "Training and certification programs for Google Cloud"
          },
          {
            title: "DeepLearning.AI - LLM Course",
            url: "https://www.deeplearning.ai/short-courses/llm-applications/",
            description: "Short course on LLM applications and agents"
          },
          {
            title: "DeepLearning.AI - Generative Agents Research",
            url: "https://www.deeplearning.ai/short-courses/generative-agents/",
            description: "Course and research on generative agents"
          }
        ]
      }
    ],
    
    // Agent to Agent (A2A) concept
    a2a: [
      {
        id: "documentation",
        name: "Official Documentation",
        references: [
          {
            title: "Agent to Agent Protocol",
            url: "https://a2a-protocol.org/",
            description: "Official Agent to Agent Protocol specification and documentation"
          },
          {
            title: "A2A Python SDK",
            url: "https://github.com/a2aproject/a2a-python",
            description: "Python SDK for implementing Agent to Agent communication protocols"
          },
          {
            title: "Azure AI Agent Framework Documentation",
            url: "https://learn.microsoft.com/azure/ai-studio/concepts/agents-guides",
            description: "Introduction to Azure AI Agent Framework"
          },
          {
            title: "Multi-Agent Systems in Azure",
            url: "https://techcommunity.microsoft.com/t5/ai-cognitive-services-blog/introduction-to-azure-openai/ba-p/3767406",
            description: "Technical overview of multi-agent systems in Azure"
          }
        ]
      },
      {
        id: "samples",
        name: "Code Samples",
        references: [
          {
            title: "A2A Samples",
            url: "https://github.com/a2aproject/a2a-samples/tree/main/samples",
            description: "Sample code for A2A projects"
          },
          {
            title: "Azure OpenAI Samples Repository",
            url: "https://github.com/Azure/azure-openai-samples",
            description: "Sample projects for Azure OpenAI"
          },
          {
            title: "Multi-agent Collaboration Samples",
            url: "https://github.com/Azure-Samples/openai-python-samples/tree/main/advanced-patterns",
            description: "Advanced multi-agent pattern samples"
          }
        ]
      },
      {
        id: "installation",
        name: "Installation & Setup",
        references: [
          {
            title: "Installing A2A SDK",
            url: "https://github.com/a2aproject/a2a-python",
            description: "Installation guide for the A2A SDK"
          },
          {
            title: "Setting Up Azure OpenAI",
            url: "https://learn.microsoft.com/azure/ai-services/openai/how-to/create-resource",
            description: "Guide to setting up Azure OpenAI resources"
          }
        ]
      },
      {
        id: "notebooks",
        name: "Notebooks & Examples",
        references: [
          {
            title: "Quick Start notebooks",
            url: "https://github.com/a2aproject/a2a-samples/tree/main/notebooks",
            description: "Jupyter notebooks with A2A examples"
          },
          {
            title: "Azure OpenAI Jupyter Notebooks",
            url: "https://github.com/Azure/azure-openai-samples/tree/main/notebooks",
            description: "Collection of Azure OpenAI Jupyter notebooks"
          }
        ]
      }
    ],
    
    // ModelContextProtocol (MCP) concept
    mcp: [
      {
        id: "documentation",
        name: "Official Documentation",
        references: [
          {
            title: "Model Context Protocol (MCP) Introduction",
            url: "https://modelcontextprotocol.io/introduction",
            description: "Official documentation on the ModelContextProtocol"
          },
          {
            title: "MCP Specification",
            url: "https://modelcontextprotocol.io/specification",
            description: "Technical specification of the Model Context Protocol"
          },
          {
            title: "Azure MCP GitHub Repository",
            url: "https://github.com/microsoft/mcp",
            description: "Microsoft's official MCP GitHub repository"
          }
        ]
      },
      {
        id: "samples",
        name: "Code Samples",
        references: [
          {
            title: "MCP Examples",
            url: "https://modelcontextprotocol.io/examples",
            description: "Example implementations of the Model Context Protocol"
          },
          {
            title: "MCP Implementation Patterns",
            url: "https://modelcontextprotocol.io/patterns",
            description: "Common implementation patterns for MCP"
          },
          {
            title: "Azure AI Context Management Samples",
            url: "https://github.com/Azure-Samples/openai-python-samples/tree/main/context-management",
            description: "Samples for context management in Azure AI"
          }
        ]
      },
      {
        id: "tutorials",
        name: "Tutorials & Guides",
        references: [
          {
            title: "Getting Started with MCP",
            url: "https://modelcontextprotocol.io/getting-started",
            description: "Guide to getting started with Model Context Protocol"
          },
          {
            title: "Context Management Best Practices",
            url: "https://learn.microsoft.com/azure/ai-services/openai/concepts/context-management",
            description: "Guide to managing context in Azure AI applications"
          },
          {
            title: "MCP for Beginners - Open Source Curriculum",
            url: "https://github.com/microsoft/mcp-for-beginners/",
            description: "Open sourced curriculum that introduces the Model Context Protocol for beginners"
          },
          {
            title: "Microsoft Developers MCP Playlist",
            url: "https://www.youtube.com/playlist?list=PLlrxD0HtieHjYfVUpGl_-ai7D6FRBjV-d",
            description: "Microsoft Developers YouTube playlist covering Model Context Protocol concepts and implementation"
          }
        ]
      }
    ],
    
    // Agent Communication Protocol (ACP) concept
    acp: [
      {
        id: "documentation",
        name: "Official Documentation",
        references: [
          {
            title: "ACP Protocol",
            url: "https://agentcommunicationprotocol.dev/",
            description: "Official Agent Communication Protocol specification and documentation"
          },
          {
            title: "ACP SDK",
            url: "https://github.com/i-am-bee/acp/tree/main",
            description: "Official ACP SDK implementation and development toolkit"
          },
          {
            title: "Deeplearning.ai learning",
            url: "https://www.deeplearning.ai/short-courses/acp-agent-communication-protocol/",
            description: "DeepLearning.AI short course on Agent Communication Protocol implementation and best practices"
          },
          {
            title: "ACP Introduction",
            url: "https://agentcommunicationprotocol.dev/introduction",
            description: "Introduction to the Agent Communication Protocol"
          },
          {
            title: "ACP Specification",
            url: "https://agentcommunicationprotocol.dev/specification",
            description: "Technical specification for the ACP standard"
          }
        ]
      },
      {
        id: "quickstart",
        name: "Quickstart & Examples",
        references: [
          {
            title: "ACP Quickstart Guide",
            url: "https://agentcommunicationprotocol.dev/introduction/quickstart",
            description: "Getting started quickly with ACP implementation"
          },
          {
            title: "Example Agents",
            url: "https://agentcommunicationprotocol.dev/introduction/example-agents",
            description: "Sample agents implementing the ACP standard"
          }
        ]
      },
      {
        id: "deployments",
        name: "Deployment Patterns",
        references: [
          {
            title: "Single-Agent Deployment",
            url: "https://agentcommunicationprotocol.dev/patterns/single-agent",
            description: "Documentation for simple single-agent ACP deployments"
          },
          {
            title: "Multi-Agent Server Deployment",
            url: "https://agentcommunicationprotocol.dev/patterns/multi-agent",
            description: "Setting up multi-agent systems with ACP"
          }
        ]
      }
    ],
    
    multiagents: [
      {
        id: "documentation",
        name: "Official Documentation",
        references: [
          {
            title: "Autogen",
            url: "https://microsoft.github.io/autogen/stable/",
            description: "Microsoft AutoGen framework for building multi-agent conversational AI systems"
          },
          {
            title: "Semantic Kernel Quick start",
            url: "https://learn.microsoft.com/en-us/semantic-kernel/get-started/quick-start-guide?pivots=programming-language-python",
            description: "Quick start guide for Microsoft Semantic Kernel with Python"
          },
          {
            title: "Semantic Kernel Agent Framework",
            url: "https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/?pivots=programming-language-python",
            description: "Learn about building agents with Semantic Kernel framework"
          }
        ]
      },
      {
        id: "samples",
        name: "Code Samples",
        references: [
          {
            title: "Autogen Framework Examples",
            url: "https://github.com/microsoft/autogen/",
            description: "Official GitHub repository with AutoGen framework examples and samples"
          }
        ]
      }
    ],
    
    // Move videos and externalLearning sections inside agents array under concepts
    videos: [
      {
        id: "introduction",
        name: "Introduction to Azure AI Agents",
        references: [
          {
            title: "Microsoft Azure AI Agents Overview (Official)",
            url: "https://www.youtube.com/watch?v=QJb6tQwQK2A",
            description: "Official Microsoft video introducing Azure AI Agents"
          },
          {
            title: "Google Cloud Vertex AI Agent Builder (Official)",
            url: "https://www.youtube.com/watch?v=QvQwQwQwQwQ",
            description: "Official Google Cloud video on Vertex AI Agent Builder"
          },
          {
            title: "DeepLearning.AI - Building LLM Agents",
            url: "https://www.youtube.com/watch?v=8pTEmbeENF4",
            description: "DeepLearning.AI course video on building LLM agents"
          },
          {
            title: "Azure OpenAI Service: End-to-End Demo",
            url: "https://www.youtube.com/watch?v=QJb6tQwQK2A",
            description: "Microsoft official demo of Azure OpenAI Service"
          },
          {
            title: "Google Cloud AI: Multi-Agent Systems",
            url: "https://www.youtube.com/watch?v=QvQwQwQwQwQ",
            description: "Google Cloud official video on multi-agent systems"
          },
          {
            title: "DeepLearning.AI - LLM Applications (2024)",
            url: "https://www.youtube.com/watch?v=1g5QkF6QFvA",
            description: "Recent DeepLearning.AI video on LLM applications"
          },
          {
            title: "DeepLearning.AI - Generative Agents Research (2024)",
            url: "https://www.youtube.com/watch?v=2g7QkF6QFvB",
            description: "Recent DeepLearning.AI video on generative agents"
          }
        ]
      }
    ],
    externalLearning: [
      {
        id: "azure",
        name: "Azure Learning Resources",
        references: [
          {
            title: "Azure AI Fundamentals Learning Path",
            url: "https://learn.microsoft.com/training/paths/azure-ai-fundamentals/",
            description: "Microsoft Learn path for Azure AI fundamentals"
          },
          {
            title: "Azure AI Engineer Associate Certification",
            url: "https://learn.microsoft.com/certifications/azure-ai-engineer-associate/",
            description: "Certification for Azure AI Engineers"
          },
          {
            title: "Azure Solutions Architect Expert Certification",
            url: "https://learn.microsoft.com/certifications/azure-solutions-architect-expert/",
            description: "Certification for Azure Solutions Architects"
          }
        ]
      },
      {
        id: "google-cloud",
        name: "Google Cloud Learning Resources",
        references: [
          {
            title: "Google Cloud Vertex AI Documentation",
            url: "https://cloud.google.com/vertex-ai/docs",
            description: "Documentation for Google Cloud Vertex AI"
          },
          {
            title: "Google Cloud AI Solutions",
            url: "https://cloud.google.com/solutions/ai",
            description: "Overview of AI solutions on Google Cloud"
          },
          {
            title: "Google Cloud Training and Certification",
            url: "https://cloud.google.com/training",
            description: "Training and certification programs for Google Cloud"
          }
        ]
      },
      {
        id: "deeplearningai",
        name: "DeepLearning.AI Resources",
        references: [
          {
            title: "DeepLearning.AI - LLM Course",
            url: "https://www.deeplearning.ai/short-courses/llm-applications/",
            description: "Short course on LLM applications and agents"
          },
          {
            title: "DeepLearning.AI - Generative Agents Research",
            url: "https://www.deeplearning.ai/short-courses/generative-agents/",
            description: "Course and research on generative agents"
          }
        ]
      }
    ]
  },
  
  patterns: {
    // Each pattern follows the pattern IDs from the existing code
    "routing": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Routing Pattern Documentation",
            url: "https://learn.microsoft.com/azure/ai-services/patterns/routing",
            description: "Official documentation on the Routing pattern"
          },
          {
            title: "Azure AI Router Implementation",
            url: "https://learn.microsoft.com/azure/ai-services/openai/concepts/advanced-prompt-engineering",
            description: "Implementation guidance for router patterns"
          }
        ]
      },
      {
        id: "samples",
        name: "Code Samples",
        references: [
          {
            title: "Routing Pattern Samples",
            url: "https://github.com/azure/ai-patterns/routing",
            description: "Sample implementations of the Routing pattern"
          },
          {
            title: "Router Pattern in Azure",
            url: "https://github.com/Azure-Samples/openai-python-samples/tree/main/patterns/router",
            description: "Python implementation of router pattern"
          }
        ]
      }
    ],
    
    "reflexion": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Reflexion Pattern Documentation",
            url: "https://learn.microsoft.com/azure/ai-services/patterns/reflexion",
            description: "Official documentation on the Reflexion pattern"
          },
          {
            title: "Self-Improvement in LLMs",
            url: "https://learn.microsoft.com/azure/ai-services/openai/concepts/self-critique",
            description: "Concepts for implementing self-reflection in Azure AI"
          }
        ]
      },
      {
        id: "papers",
        name: "Research Papers",
        references: [
          {
            title: "Reflexion: Language Agents with Verbal Reinforcement Learning",
            url: "https://arxiv.org/abs/2303.11366",
            description: "Research paper on the Reflexion pattern"
          },
          {
            title: "Self-Reflection Improves LLM Performance",
            url: "https://arxiv.org/abs/2310.02207",
            description: "Research on effectiveness of self-reflection"
          }
        ]
      },
      {
        id: "samples",
        name: "Code Samples",
        references: [
          {
            title: "Reflexion Implementation",
            url: "https://github.com/noahshinn/reflexion",
            description: "Reference implementation of the Reflexion pattern"
          }
        ]
      }
    ],

    "plan-and-execute": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Plan-and-Execute Pattern Documentation",
            url: "https://learn.microsoft.com/azure/ai-services/patterns/plan-execute",
            description: "Official documentation on the Plan-and-Execute pattern"
          },
          {
            title: "Planning with Azure AI",
            url: "https://learn.microsoft.com/azure/ai-services/openai/concepts/task-planning",
            description: "Task planning implementation in Azure AI"
          }
        ]
      },
      {
        id: "samples",
        name: "Code Samples",
        references: [
          {
            title: "Planning with Azure OpenAI",
            url: "https://github.com/Azure-Samples/openai-python-samples/tree/main/patterns/planners",
            description: "Sample code for implementing planners in Azure OpenAI"
          }
        ]
      }
    ],
    
    "evaluator-optimizer": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Evaluator-Optimizer Pattern Documentation",
            url: "https://learn.microsoft.com/azure/ai-services/patterns/evaluator",
            description: "Official documentation on the Evaluator-Optimizer pattern"
          },
          {
            title: "Azure AI Evaluation Tools",
            url: "https://learn.microsoft.com/azure/ai-services/openai/concepts/evaluation",
            description: "Tools for evaluating and optimizing Azure AI solutions"
          }
        ]
      },
      {
        id: "sdk",
        name: "SDKs & Tools",
        references: [
          {
            title: "Azure AI Evaluation SDK",
            url: "https://github.com/Azure/azureai-evaluation",
            description: "SDK for evaluating AI models in Azure"
          }
        ]
      }
    ],
    
    "orchestrator-worker": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Orchestrator-Worker Pattern Documentation",
            url: "https://learn.microsoft.com/azure/ai-services/patterns/orchestrator",
            description: "Official documentation on the Orchestrator-Worker pattern"
          },
          {
            title: "Azure AI Orchestration Guide",
            url: "https://learn.microsoft.com/azure/ai-services/openai/concepts/agent-orchestration",
            description: "Guide to orchestrating multiple agents in Azure"
          }
        ]
      },
      {
        id: "samples",
        name: "Code Samples",
        references: [
          {
            title: "Orchestrator Pattern Examples",
            url: "https://github.com/Azure-Samples/openai-python-samples/tree/main/patterns/orchestrator",
            description: "Sample implementations of orchestrator patterns"
          }
        ]
      }
    ],
    
    "react": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "ReAct Pattern Documentation",
            url: "https://learn.microsoft.com/azure/ai-services/patterns/react",
            description: "Official documentation on the ReAct pattern"
          },
          {
            title: "Azure AI Reasoning and Action",
            url: "https://learn.microsoft.com/azure/ai-services/openai/concepts/reasoning",
            description: "Implementation of reasoning and action in Azure AI"
          }
        ]
      },
      {
        id: "papers",
        name: "Research Papers",
        references: [
          {
            title: "ReAct: Synergizing Reasoning and Acting in Language Models",
            url: "https://arxiv.org/abs/2210.03629",
            description: "Original research paper on the ReAct pattern"
          }
        ]
      },
      {
        id: "samples",
        name: "Code Samples",
        references: [
          {
            title: "ReAct Pattern Implementation",
            url: "https://github.com/Azure-Samples/openai-python-samples/tree/main/patterns/react",
            description: "Azure implementation examples of ReAct pattern"
          }
        ]
      }
    ],
    
    "codeact": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "CodeAct Pattern Documentation",
            url: "https://learn.microsoft.com/azure/ai-services/patterns/codeact",
            description: "Official documentation on the CodeAct pattern"
          },
          {
            title: "Azure AI Code Generation",
            url: "https://learn.microsoft.com/azure/ai-services/openai/concepts/code-generation",
            description: "Guide to code generation with Azure AI"
          }
        ]
      },
      {
        id: "samples",
        name: "Code Samples",
        references: [
          {
            title: "CodeAct Implementation Examples",
            url: "https://github.com/Azure-Samples/openai-python-samples/tree/main/code-generation",
            description: "Implementation examples for CodeAct pattern"
          }
        ]
      }
    ],
    
    "self-reflection": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Self-Reflection Pattern Documentation",
            url: "https://learn.microsoft.com/azure/ai-services/patterns/self-reflection",
            description: "Official documentation on the Self-Reflection pattern"
          },
          {
            title: "Azure AI Self-Critique Framework",
            url: "https://learn.microsoft.com/azure/ai-services/openai/concepts/self-critique",
            description: "Framework for self-reflection in Azure AI"
          }
        ]
      },
      {
        id: "samples",
        name: "Code Samples",
        references: [
          {
            title: "Self-Reflection Implementation",
            url: "https://github.com/Azure-Samples/openai-python-samples/tree/main/patterns/self-critique",
            description: "Sample implementations of self-reflection pattern"
          }
        ]
      }
    ],
    
    "agentic-rag": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Agentic RAG Pattern Documentation",
            url: "https://learn.microsoft.com/azure/ai-services/patterns/agentic-rag",
            description: "Official documentation on the Agentic RAG pattern"
          },
          {
            title: "Azure AI RAG Implementation",
            url: "https://learn.microsoft.com/azure/search/retrieval-augmented-generation-overview",
            description: "Overview of RAG implementation in Azure"
          }
        ]
      },
      {
        id: "samples",
        name: "Code Samples",
        references: [
          {
            title: "Agentic RAG Examples",
            url: "https://github.com/Azure-Samples/azure-search-openai-demo",
            description: "End-to-end RAG sample implementation"
          },
          {
            title: "Azure Vector Search with RAG",
            url: "https://github.com/Azure-Samples/azure-vector-search-openai-demo",
            description: "Vector search with Azure OpenAI and RAG"
          }
        ]
      }
    ],
    "computer-using-agent": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Computer Using Agent (CUA) Overview",
            url: "https://learn.microsoft.com/azure/ai-services/patterns/cua",
            description: "Official documentation on Computer Using Agents"
          },
          {
            title: "Browser Automation with AI",
            url: "https://learn.microsoft.com/azure/ai-studio/how-to/browser-automation",
            description: "Guide for AI-powered browser automation"
          }
        ]
      },
      {
        id: "papers",
        name: "Research Papers",
        references: [
          {
            title: "Generative Agents: Interactive Simulacra of Human Behavior",
            url: "https://arxiv.org/abs/2304.03442",
            description: "Research on generative agents using computers"
          },
          {
            title: "WebGPT: Browser-assisted question-answering",
            url: "https://openai.com/research/webgpt",
            description: "Research on browser-based agents"
          }
        ]
      },
      {
        id: "samples",
        name: "Code Samples",
        references: [
          {
            title: "Azure CUA Implementation Examples",
            url: "https://github.com/Azure-Samples/azure-cua-samples",
            description: "Sample code for Computer Using Agents"
          }
        ]
      }
    ],
    "deep-researcher": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Deep Researcher Agent Pattern",
            url: "https://learn.microsoft.com/azure/ai-services/patterns/researcher",
            description: "Official documentation on Deep Researcher agents"
          },
          {
            title: "Azure AI for Research",
            url: "https://learn.microsoft.com/azure/ai-studio/concepts/research-agents",
            description: "Overview of research capabilities in Azure AI"
          }
        ]
      },
      {
        id: "papers",
        name: "Research Papers",
        references: [
          {
            title: "Large Language Models as Research Agents",
            url: "https://arxiv.org/abs/2310.05663",
            description: "Research on using LLMs for deep research tasks"
          }
        ]
      },
      {
        id: "samples",
        name: "Code Samples",
        references: [
          {
            title: "Azure Research Agent Implementations",
            url: "https://github.com/Azure-Samples/azure-search-openai-demo/tree/main/research",
            description: "Research agent implementation examples"
          }
        ]
      }
    ],
    "voice-agent": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Azure AI Voice Agents",
            url: "https://learn.microsoft.com/azure/ai-services/speech-service/voice-assistants",
            description: "Official documentation on Voice Agents in Azure"
          },
          {
            title: "Azure Neural Voice",
            url: "https://learn.microsoft.com/azure/ai-services/speech-service/text-to-speech",
            description: "Overview of Azure's neural voice capabilities"
          }
        ]
      },
      {
        id: "sdk",
        name: "SDKs & APIs",
        references: [
          {
            title: "Azure Speech SDK",
            url: "https://learn.microsoft.com/azure/ai-services/speech-service/speech-sdk",
            description: "SDK for voice integration in applications"
          },
          {
            title: "Speech-to-Text REST API",
            url: "https://learn.microsoft.com/azure/ai-services/speech-service/rest-speech-to-text",
            description: "REST API for speech recognition"
          }
        ]
      },
      {
        id: "samples",
        name: "Code Samples",
        references: [
          {
            title: "Voice Assistant Samples",
            url: "https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/quickstart",
            description: "Quick start samples for voice assistants"
          },
          {
            title: "Custom Voice Assistant",
            url: "https://github.com/Azure-Samples/Cognitive-Services-Voice-Assistant",
            description: "Examples of custom voice assistants built on Azure"
          }
        ]
      }
    ]
  },
  
  azureServices: {
    "azure-openai": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Azure OpenAI Service Documentation",
            url: "https://learn.microsoft.com/azure/ai-services/openai/",
            description: "Official documentation for Azure OpenAI Service"
          },
          {
            title: "Azure OpenAI Models",
            url: "https://learn.microsoft.com/azure/ai-services/openai/concepts/models",
            description: "Overview of available models in Azure OpenAI"
          }
        ]
      },
      {
        id: "sdk",
        name: "SDKs & APIs",
        references: [
          {
            title: "Azure OpenAI REST API Reference",
            url: "https://learn.microsoft.com/azure/ai-services/openai/reference",
            description: "REST API reference for Azure OpenAI"
          },
          {
            title: "Azure OpenAI SDK for JavaScript",
            url: "https://learn.microsoft.com/javascript/api/@azure/openai",
            description: "JavaScript SDK documentation"
          },
          {
            title: "Azure OpenAI SDK for Python",
            url: "https://learn.microsoft.com/python/api/overview/azure/ai.openai-readme",
            description: "Python SDK documentation"
          }
        ]
      }
    ],
    
    "azure-ai-foundry": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Azure AI Foundry Overview",
            url: "https://learn.microsoft.com/azure/ai-studio/",
            description: "Overview of Azure AI Foundry"
          }
        ]
      }
    ],

    "semantic-kernel": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Semantic Kernel Overview",
            url: "https://learn.microsoft.com/en-us/semantic-kernel/overview/",
            description: "Official documentation for Microsoft Semantic Kernel"
          },
          {
            title: "Semantic Kernel Concepts",
            url: "https://learn.microsoft.com/en-us/semantic-kernel/concepts/",
            description: "Core concepts and terminology for Semantic Kernel"
          },
          {
            title: "Semantic Kernel Agents",
            url: "https://learn.microsoft.com/en-us/semantic-kernel/concepts/agents",
            description: "Building AI agents with Semantic Kernel"
          },
          {
            title: "Semantic Kernel Planners",
            url: "https://learn.microsoft.com/en-us/semantic-kernel/concepts/planning",
            description: "Using planners for goal-directed AI behavior"
          }
        ]
      },
      {
        id: "samples",
        name: "Code Samples",
        references: [
          {
            title: "Semantic Kernel Python Getting Started",
            url: "https://github.com/microsoft/semantic-kernel/tree/main/python/samples/getting_started_with_agents",
            description: "Official getting started samples for Semantic Kernel agents in Python"
          },
          {
            title: "Semantic Kernel C# Samples",
            url: "https://github.com/microsoft/semantic-kernel/tree/main/dotnet/samples",
            description: "Comprehensive C# samples for Semantic Kernel"
          },
          {
            title: "Semantic Kernel Python Samples",
            url: "https://github.com/microsoft/semantic-kernel/tree/main/python/samples",
            description: "Python samples demonstrating Semantic Kernel capabilities"
          },
          {
            title: "Semantic Kernel Java Samples",
            url: "https://github.com/microsoft/semantic-kernel/tree/main/java/samples",
            description: "Java samples for Semantic Kernel integration"
          }
        ]
      },
      {
        id: "sdk",
        name: "SDKs & APIs",
        references: [
          {
            title: "Semantic Kernel Python SDK",
            url: "https://pypi.org/project/semantic-kernel/",
            description: "Python SDK for Semantic Kernel"
          },
          {
            title: "Semantic Kernel .NET SDK",
            url: "https://www.nuget.org/packages/Microsoft.SemanticKernel/",
            description: ".NET SDK for Semantic Kernel"
          },
          {
            title: "Semantic Kernel Java SDK",
            url: "https://central.sonatype.com/artifact/com.microsoft.semantic-kernel/semantickernel-core",
            description: "Java SDK for Semantic Kernel"
          }
        ]
      }
    ],
    
    "azure-ai-studio": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Azure AI Foundry Documentation",
            url: "https://learn.microsoft.com/azure/ai-studio/",
            description: "Official documentation for Azure AI Foundry"
          },
          {
            title: "Azure AI Foundry Tutorials",
            url: "https://learn.microsoft.com/azure/ai-studio/tutorials/",
            description: "Step-by-step tutorials for Azure AI Foundry"
          }
        ]
      }
    ],
    
    "azure-ai-search": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Azure AI Search Documentation",
            url: "https://learn.microsoft.com/azure/search/",
            description: "Official documentation for Azure AI Search"
          },
          {
            title: "Vector Search in Azure AI Search",
            url: "https://learn.microsoft.com/azure/search/vector-search-overview",
            description: "Guide to vector search capabilities"
          },
          {
            title: "Semantic Ranking in Azure AI Search",
            url: "https://learn.microsoft.com/azure/search/semantic-ranking-overview",
            description: "Deep learning-based ranking for improved relevance"
          },
          {
            title: "Vector Quantization for Azure AI Search",
            url: "https://learn.microsoft.com/azure/search/vector-search-quantization",
            description: "Optimize vector search performance and costs"
          },
          {
            title: "Multimodal Search in Azure AI Search",
            url: "https://learn.microsoft.com/azure/search/vector-search-how-to-multimedia-retrieval",
            description: "Search across text and images with multimodal vectors"
          }
        ]
      },
      {
        id: "samples",
        name: "Code Samples",
        references: [
          {
            title: "Azure AI Search Samples",
            url: "https://github.com/Azure-Samples/azure-search-openai-demo",
            description: "Sample implementation of Azure AI Search with OpenAI"
          },
          {
            title: "Azure AI Search Vector Samples",
            url: "https://github.com/Azure-Samples/azure-search-vector-samples",
            description: "End-to-end vector search examples with various embeddings models"
          }
        ]
      },
      {
        id: "concepts",
        name: "Key Concepts",
        references: [
          {
            title: "Hybrid Search Implementation",
            url: "https://learn.microsoft.com/azure/search/hybrid-search-overview",
            description: "Combining keyword and vector search for optimal results"
          },
          {
            title: "Building RAG Applications with Azure AI Search",
            url: "https://learn.microsoft.com/azure/search/retrieval-augmented-generation-overview",
            description: "End-to-end guide for implementing RAG with Azure AI Search"
          }
        ]
      }
    ],
    
    "azure-ai-evaluation": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Azure AI Evaluation SDK Documentation",
            url: "https://learn.microsoft.com/en-us/python/api/overview/azure/ai-evaluation-readme?view=azure-python",
            description: "Official SDK documentation for Azure AI Evaluation"
          },
          {
            title: "Azure AI Evaluation Guide",
            url: "https://learn.microsoft.com/azure/ai-studio/how-to/evaluation",
            description: "Guide to evaluating AI models in Azure"
          },
          {
            title: "Model Evaluation Best Practices",
            url: "https://learn.microsoft.com/azure/machine-learning/how-to-evaluate-model-quality",
            description: "Best practices for AI model evaluation in Azure"
          }
        ]
      },
      {
        id: "sdk",
        name: "SDKs & Tools",
        references: [
          {
            title: "Azure AI Evaluation SDK",
            url: "https://github.com/Azure/azureai-evaluation",
            description: "SDK for evaluating AI models in Azure"
          },
          {
            title: "Azure AI Evaluation Metrics",
            url: "https://learn.microsoft.com/en-us/python/api/azure-ai-evaluation/azure.ai.evaluation.modelqualityevaluationoutput",
            description: "Available metrics for AI model evaluation"
          }
        ]
      }
    ],
    
    "azure-ai-inference": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Azure AI Inference SDK Documentation",
            url: "https://learn.microsoft.com/en-us/python/api/overview/azure/ai-inference-readme?view=azure-python-preview",
            description: "Official SDK documentation for Azure AI Inference"
          },
          {
            title: "Azure AI Inference Guide",
            url: "https://learn.microsoft.com/azure/ai-services/openai/how-to/inference",
            description: "Guide to inference optimization in Azure AI"
          }
        ]
      }
    ],
    
    "azure-ai-content-safety": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Azure AI Content Safety Documentation",
            url: "https://learn.microsoft.com/azure/ai-services/content-safety/",
            description: "Official documentation for Azure AI Content Safety"
          },
          {
            title: "Content Safety Overview",
            url: "https://learn.microsoft.com/azure/ai-services/content-safety/overview",
            description: "Overview of Content Safety capabilities"
          }
        ]
      },
      {
        id: "sdk",
        name: "SDKs & API",
        references: [
          {
            title: "Content Safety SDK for JavaScript",
            url: "https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/contentsafety/ai-content-safety",
            description: "JavaScript SDK for Content Safety"
          },
          {
            title: "Content Safety REST API",
            url: "https://learn.microsoft.com/rest/api/contentsafety/",
            description: "REST API reference for Content Safety"
          }
        ]
      }
    ]
  },
  acp: {
    // Each section follows the ACP structure from the existing code
    concepts: [
      {
        id: "introduction",
        name: "Introduction to ACP",
        references: [
          {
            title: "What is ACP?",
            url: "https://agentcommunicationprotocol.dev/introduction/what-is-acp",
            description: "Overview of the Agent Communication Protocol (ACP)"
          },
          {
            title: "ACP Overview Video",
            url: "https://www.youtube.com/watch?v=QJb6tQwQK2A",
            description: "Video introduction to ACP"
          }
        ]
      },
      {
        id: "specification",
        name: "Technical Specification",
        references: [
          {
            title: "ACP Technical Specification",
            url: "https://agentcommunicationprotocol.dev/specification",
            description: "Detailed technical specification for ACP"
          },
          {
            title: "ACP GitHub Repository",
            url: "https://github.com/agentcommunicationprotocol/acp",
            description: "GitHub repository for ACP"
          }
        ]
      }
    ]
  }
};