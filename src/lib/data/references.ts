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
  realWorldUseCases: {
    [key: string]: ReferenceCategory[]
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
            title: "Google Agent Development Kit (ADK)",
            url: "https://google.github.io/adk-docs/",
            description: "Flexible, modular framework for developing and deploying AI agents - optimized for Gemini"
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
            url: "https://learn.microsoft.com/training",
            description: "Microsoft Learn training path for developing AI agents"
          }
        ]
      },
      {
        id: "frameworks",
        name: "Agent Development Frameworks",
        references: [
          {
            title: "Google ADK Documentation",
            url: "https://google.github.io/adk-docs/",
            description: "Complete guide to Google's Agent Development Kit"
          },
          {
            title: "Google ADK Python SDK",
            url: "https://github.com/google/adk-python",
            description: "Python SDK for Google Agent Development Kit"
          },
          {
            title: "Google ADK Java SDK",
            url: "https://github.com/google/adk-java",
            description: "Java SDK for Google Agent Development Kit"
          },
          {
            title: "Microsoft Foundry (Agent Framework)",
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
            description: "Microsoft's unified AI platform for building agents, models, and AI applications on Azure"
          }
        ]
      },
      {
        id: "learning-paths",
        name: "Learning Paths",
        references: [
          {
            title: "AI Fundamentals Learning Path",
            url: "https://learn.microsoft.com/training",
            description: "Foundational concepts in AI and machine learning"
          },
          {
            title: "Azure AI Engineer Associate",
            url: "https://learn.microsoft.com/en-us/credentials/",
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
    
    // Tier 0: Prompting Fundamentals - NEW Core Concepts
    "agentic-prompting-fundamentals": [
      {
        id: "official-guides",
        name: "Official OpenAI Documentation",
        references: [
          {
            title: "GPT-5 Prompting Guide",
            url: "https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide",
            description: "Official GPT-5 prompting guide covering agentic prompting fundamentals"
          },
          {
            title: "GPT-5 Prompt Optimization Cookbook",
            url: "https://cookbook.openai.com/examples/gpt-5/prompt-optimization-cookbook",
            description: "Comprehensive cookbook for optimizing prompts with GPT-5"
          },
          {
            title: "Prompt Engineering Best Practices",
            url: "https://platform.openai.com/docs/guides/prompt-engineering",
            description: "OpenAI's guide to effective prompt engineering"
          }
        ]
      },
      {
        id: "youtube-research",
        name: "YouTube Research",
        references: [
          {
            title: "Deep Think with Confidence  #meta",
            url: "https://www.youtube.com/watch?v=sogeEC1xkiY",
            description: "Prompting technique to drive deeper reasoning while having the model report calibrated confidence."
          },
          {
            title: "Thinking in Blocks   Adaptive Reasoning",
            url: "https://www.youtube.com/watch?v=zZolGueW6nY",
            description: "Introduces prompting techniques that scaffold block-based, adaptive stepwise reasoning."
          },
          {
            title: "Self-Questioning Language Models",
            url: "https://www.youtube.com/watch?v=4wlRhmw2VcM",
            description: "Explains how prompting LMs to ask and answer their own sub-questions can improve reasoning quality and controllability."
          },
          {
            title: "A Survey of Context Engineering for Large Language Models",
            url: "https://www.youtube.com/watch?v=Dh_SPv55UA8",
            description: "Overview of core prompt and context structuring techniques that improve LLM reliability and control."
          },
          {
            title: "Which prompting techniques should I use in Software Engineering Tasks?",
            url: "https://www.youtube.com/watch?v=Jwsu1Y1y5AQ",
            description: "Overview of effective prompting moves for coding tasks to improve reliability in software engineering workflows."
          },
          {
            title: "AI with Emotions: Exploring Emotional Expressions in Large Language Models",
            url: "https://www.youtube.com/watch?v=GIx5Qw9zmFQ",
            description: "Foundational prompting moves to evoke, modulate, and constrain emotional expressions in model outputs."
          },
          {
            title: "A Survey of Frontiers in LLM Reasoning: Inference Scaling, Learning to Reason and Agentic Systems",
            url: "https://www.youtube.com/watch?v=lkkKqGwvvvo",
            description: "Survey of test-time prompting techniques that scale inference to improve LLM reasoning performance."
          },
          {
            title: "MetaScale: Test-time Scaling with Evolving Meta-Thoughts #microsoftresearch",
            url: "https://www.youtube.com/watch?v=F2epOG3nD0o",
            description: "Research talk on using evolving meta-thought prompts to scale test-time reasoning and improve agent reliability."
          },
          {
            title: "Structured Outputs Enable General-Purpose LLMs to be Medical Experts",
            url: "https://www.youtube.com/watch?v=iMxinkiI9Rw",
            description: "Explains how enforcing structured outputs (e.g., schemas or function-calling) can make general-purpose LLMs reliably perform clinical reasoning and medical workflows without fine-tuning."
          },
          {
            title: "Inference Time Scaling for Medical Reasoning in LLMs - o1 Replication Journey",
            url: "https://www.youtube.com/watch?v=c0L-y_mAgtM",
            description: "Explores inference-time prompting strategies to boost LLM medical reasoning, drawing lessons from an o1-style replication."
          },
          {
            title: "Imagine while Reasoning in Space: Multimodal Visualization-of-Thought #microsoft",
            url: "https://www.youtube.com/watch?v=6UD5OsWCRL8",
            description: "Foundational prompting methods that elicit explicit, controllable reasoning, including visual chain-of-thought."
          },
          {
            title: "Meta Chain of Thought Reasoning in LLMs #stanforduniversity #ucberkeley",
            url: "https://www.youtube.com/watch?v=GJdeF9cpKsg",
            description: "Explores meta chain-of-thought prompting and when to invoke step-by-step reasoning to improve LLM reliability."
          },
          {
            title: "Prompting Strategies for LLMs to Infer Causation from Correlation",
            url: "https://www.youtube.com/watch?v=fdW8wDeS66U",
            description: "Practical prompting moves to elicit causal reasoning and avoid correlation traps in LLM outputs."
          },
          {
            title: "Reverse Enhanced Thinking for Stronger LLMs #deepmind",
            url: "https://www.youtube.com/watch?v=7vhjdt2gyhk",
            description: "Overview of reverse-style reasoning prompts to elicit stronger step-by-step thinking from LLMs."
          },
          {
            title: "From Medprompt to o1: Exploration of Run-Time Strategies for Medical Challenge Problems and Beyond",
            url: "https://www.youtube.com/watch?v=GQffo1yUE_g",
            description: "Overview of foundational prompting moves and strategies used to boost LLM performance on medical challenge problems."
          },
          {
            title: "#microsoft SMART: Self-learning Meta-strategy Agent for Reasoning Tasks",
            url: "https://www.youtube.com/watch?v=7Ykbc6JBSKw",
            description: "Explores how meta-strategy selection leverages prompting moves to stabilize and strengthen LLM reasoning."
          },
          {
            title: "Thinking LLMs - : GENERAL INSTRUCTION FOLLOWING WITH THOUGHT GENERATION",
            url: "https://www.youtube.com/watch?v=PA0Obt1gWa0",
            description: "Techniques to elicit model 'thinking' and dependable instruction adherence through structured prompts."
          },
          {
            title: "Tell me what you don't know - Role Playing Agents",
            url: "https://www.youtube.com/watch?v=N8fIzrQL8pE",
            description: "Use reflective prompting to elicit uncertainty and assumptions, improving agent clarity and control."
          },
          {
            title: "How People Use ChatGPT #openai",
            url: "https://www.youtube.com/watch?v=s7Pt8i2ATHY",
            description: "Overview of common ChatGPT use cases with basic prompting moves to elicit better results."
          },
          {
            title: "Zero Search",
            url: "https://www.youtube.com/watch?v=iOUDaGSsZyQ",
            description: "Prompting techniques that direct agents to answer from local context or memory without calling web search."
          }
        ]
      }
    ],
    
    "prompt-optimization-patterns": [
      {
        id: "official-guides",
        name: "Official OpenAI Documentation",
        references: [
          {
            title: "GPT-5 Prompt Optimization Cookbook",
            url: "https://cookbook.openai.com/examples/gpt-5/prompt-optimization-cookbook",
            description: "Advanced optimization techniques with quantitative performance improvements"
          },
          {
            title: "GPT-5 Prompting Guide",
            url: "https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide",
            description: "Comprehensive guide covering systematic optimization approaches"
          }
        ]
      }
    ],
    
    "agent-instruction-design": [
      {
        id: "official-guides",
        name: "Official OpenAI Documentation",
        references: [
          {
            title: "GPT-5 Prompting Guide",
            url: "https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide",
            description: "Instruction hierarchy design and steerability control mechanisms"
          },
          {
            title: "GPT-5 Prompt Optimization Cookbook",
            url: "https://cookbook.openai.com/examples/gpt-5/prompt-optimization-cookbook",
            description: "Implementation patterns for effective instruction design"
          }
        ]
      }
    ],
    
    "agentic-workflow-control": [
      {
        id: "official-guides",
        name: "Official OpenAI Documentation",
        references: [
          {
            title: "GPT-5 Prompting Guide",
            url: "https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide",
            description: "Advanced workflow control, timing, and multi-tool coordination patterns"
          },
          {
            title: "GPT-5 Prompt Optimization Cookbook",
            url: "https://cookbook.openai.com/examples/gpt-5/prompt-optimization-cookbook",
            description: "Workflow optimization techniques for complex agent systems"
          }
        ]
      }
    ],
    
    "agent-evaluation-methodologies": [
      {
        id: "official-guides",
        name: "Official OpenAI Documentation",
        references: [
          {
            title: "GPT-5 Prompting Guide",
            url: "https://cookbook.openai.com/examples/gpt-5/gpt-5_prompting_guide",
            description: "Comprehensive evaluation frameworks using LLM-as-judge techniques"
          },
          {
            title: "GPT-5 Prompt Optimization Cookbook",
            url: "https://cookbook.openai.com/examples/gpt-5/prompt-optimization-cookbook",
            description: "Quantitative and qualitative evaluation methodologies"
          }
        ]
      }
    ],

    "agentic-robotics-integration": [
      {
        id: "embodied-ai",
        name: "Embodied AI Foundations",
        references: [
          {
            title: "Microsoft Research Embodied AI Collaboration",
            url: "https://www.microsoft.com/en-us/research/collaboration/embodied-ai/",
            description: "Research collaborations and tooling that accelerate embodied AI systems."
          },
          {
            title: "Gemini Robotics 1.5 Brings AI Agents Into the Physical World",
            url: "https://deepmind.google/discover/blog/gemini-robotics-15-brings-ai-agents-into-the-physical-world/",
            description: "DeepMind overview of Gemini Robotics 1.5 capabilities and reference deployments."
          },
          {
            title: "Building Next-Generation Physical Agents with Gemini Robotics ER-15",
            url: "https://developers.googleblog.com/en/building-the-next-generation-of-physical-agents-with-gemini-robotics-er-15/",
            description: "Developer guidance on ER-15 sandboxes, safety, and robotics deployment best practices."
          }
        ]
      }
    ],

    "edge-agent": [
      {
        id: "lightweight-models",
        name: "Lightweight Edge Models",
        references: [
          {
            title: "Gemma: Open-Weight LLM Library",
            url: "https://github.com/google-deepmind/gemma",
            description: "Google DeepMind's official Gemma repository with JAX implementation for fine-tuning and deployment."
          },
          {
            title: "Gemma Technical Reports",
            url: "https://ai.google.dev/gemma/docs",
            description: "Documentation and technical reports for Gemma 1, 2, and 3 model families."
          },
          {
            title: "Qwen2.5 Models",
            url: "https://github.com/QwenLM/Qwen2.5",
            description: "Alibaba's Qwen2.5 models ranging from 0.5B to 72B parameters, excellent for edge deployment."
          },
          {
            title: "Microsoft Phi-3 Technical Report",
            url: "https://arxiv.org/abs/2404.14219",
            description: "Technical report for Phi-3 small language models optimized for edge devices."
          },
          {
            title: "llama.cpp",
            url: "https://github.com/ggerganov/llama.cpp",
            description: "High-performance C++ inference for LLMs on CPU, enabling Raspberry Pi and edge deployment."
          }
        ]
      },
      {
        id: "edge-perception",
        name: "Edge Perception & Vision",
        references: [
          {
            title: "Segment Anything Model (SAM)",
            url: "https://segment-anything.com/",
            description: "Meta's foundation model for promptable image segmentation, key for edge vision pipelines."
          },
          {
            title: "SAM 2",
            url: "https://github.com/facebookresearch/sam2",
            description: "SAM 2: Segment Anything in Images and Videos with unified architecture."
          },
          {
            title: "MobileNetV3 for Edge Vision",
            url: "https://arxiv.org/abs/1905.02244",
            description: "Efficient vision backbones optimized for mobile and edge devices."
          },
          {
            title: "NVIDIA Isaac ROS",
            url: "https://developer.nvidia.com/isaac-ros",
            description: "GPU-accelerated ROS packages for perception on Jetson platforms."
          }
        ]
      },
      {
        id: "edge-robotics",
        name: "Edge Robotics Simulation",
        references: [
          {
            title: "PyBullet Physics Simulation",
            url: "https://pybullet.org/wordpress/",
            description: "Open-source physics simulation for robotics, games, and machine learning."
          },
          {
            title: "ROS 2 Documentation",
            url: "https://docs.ros.org/en/rolling/",
            description: "Official ROS 2 documentation for robot operating system integration."
          },
          {
            title: "Ollama: Run LLMs Locally",
            url: "https://ollama.ai/",
            description: "Run Llama, Gemma, Qwen, and other models locally for edge agent development."
          },
          {
            title: "NVIDIA Jetson Developer Guide",
            url: "https://developer.nvidia.com/embedded/jetson-developer-guide",
            description: "Complete guide for deploying AI on Jetson edge devices."
          }
        ]
      },
      {
        id: "industrial-edge",
        name: "Industrial Edge & IT/OT",
        references: [
          {
            title: "OPC-UA Specifications",
            url: "https://opcfoundation.org/developer-tools/specifications-unified-architecture",
            description: "Industrial interoperability standard for IT/OT integration at the edge."
          },
          {
            title: "Azure Stack Edge Documentation",
            url: "https://learn.microsoft.com/azure/databox-online/",
            description: "Microsoft's managed edge computing appliance for hybrid cloud-edge scenarios."
          },
          {
            title: "AWS Outposts",
            url: "https://aws.amazon.com/outposts/",
            description: "AWS infrastructure and services running on-premises for edge workloads."
          }
        ]
      }
    ],

    "quantum-ai-robotics": [
      {
        id: "quantum-foundations",
        name: "Quantum Computing Foundations",
        references: [
          {
            title: "IBM Quantum Learning",
            url: "https://learning.quantum.ibm.com/",
            description: "Interactive tutorials on quantum computing fundamentals and Qiskit programming."
          },
          {
            title: "Azure Quantum Documentation",
            url: "https://learn.microsoft.com/en-us/azure/quantum/",
            description: "Microsoft's quantum development kit and Q# programming guide."
          },
          {
            title: "Quantum Computing for the Very Curious",
            url: "https://quantum.country/qcvc",
            description: "Mnemonic medium exploring quantum computing concepts with interactive exercises."
          },
          {
            title: "Qiskit Textbook",
            url: "https://qiskit.org/textbook/",
            description: "Open-source quantum computing textbook with executable code examples."
          }
        ]
      },
      {
        id: "quantum-ml",
        name: "Quantum Machine Learning",
        references: [
          {
            title: "PennyLane: Quantum ML Framework",
            url: "https://pennylane.ai/",
            description: "Open-source library for quantum machine learning and differentiable quantum programming."
          },
          {
            title: "TensorFlow Quantum",
            url: "https://www.tensorflow.org/quantum",
            description: "Google's framework for building hybrid quantum-classical ML models."
          },
          {
            title: "Quantum Machine Learning (Schuld & Petruccione)",
            url: "https://www.springer.com/gp/book/9783319964232",
            description: "Comprehensive textbook on QML algorithms and applications."
          },
          {
            title: "Variational Quantum Algorithms (Nature Review)",
            url: "https://www.nature.com/articles/s42254-021-00348-9",
            description: "Review of variational quantum circuits and their applications to machine learning."
          }
        ]
      },
      {
        id: "quantum-robotics",
        name: "Quantum Applications in Robotics",
        references: [
          {
            title: "Quantum Optimization for Robot Path Planning",
            url: "https://arxiv.org/abs/2103.15409",
            description: "Research paper demonstrating QAOA for multi-robot path planning scenarios."
          },
          {
            title: "D-Wave Ocean SDK Documentation",
            url: "https://docs.ocean.dwavesys.com/",
            description: "Tools for formulating and solving optimization problems on D-Wave quantum annealers."
          },
          {
            title: "Quantum Sensing for Autonomous Systems",
            url: "https://www.nature.com/articles/s41586-021-03480-w",
            description: "Nature article on quantum sensors for navigation and environmental monitoring."
          },
          {
            title: "QAOA for Combinatorial Optimization",
            url: "https://arxiv.org/abs/1411.4028",
            description: "Original QAOA paper by Farhi et al., foundational for quantum optimization algorithms."
          }
        ]
      },
      {
        id: "quantum-sensing",
        name: "Quantum Sensing Technologies",
        references: [
          {
            title: "Nitrogen-Vacancy Centers in Diamond",
            url: "https://www.nature.com/articles/s42254-020-0209-2",
            description: "Review of NV-diamond quantum sensors for magnetometry and navigation."
          },
          {
            title: "Quantum Sensing with Atomic Systems",
            url: "https://www.nature.com/articles/s42254-021-00396-z",
            description: "Overview of atom-based quantum sensors for inertial measurement and gravity mapping."
          },
          {
            title: "Qnami ProteusQ Quantum Sensor",
            url: "https://www.qnami.ch/proteusq/",
            description: "Commercial NV-diamond quantum magnetometer specifications and applications."
          }
        ]
      },
      {
        id: "quantum-tools",
        name: "Quantum Development Tools",
        references: [
          {
            title: "AWS Braket Documentation",
            url: "https://docs.aws.amazon.com/braket/",
            description: "Amazon's quantum computing service with access to multiple hardware platforms."
          },
          {
            title: "Google Cirq Framework",
            url: "https://quantumai.google/cirq",
            description: "Python library for writing, simulating, and running quantum circuits on Google quantum processors."
          },
          {
            title: "Xanadu Strawberry Fields",
            url: "https://strawberryfields.ai/",
            description: "Python library for photonic quantum computing and continuous-variable quantum algorithms."
          },
          {
            title: "IonQ Quantum Cloud",
            url: "https://ionq.com/quantum-cloud",
            description: "Access to trapped-ion quantum computers via cloud APIs."
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
            title: "Microsoft AI Agents Adoption Guide",
            url: "https://www.microsoft.com/en-us/ai/ai-agents",
            description: "Microsoft's enterprise guidance for planning, piloting, and scaling AI agents"
          },
          {
            title: "Azure AI Overview",
            url: "https://learn.microsoft.com/azure/ai-services/",
            description: "Official Microsoft documentation on Azure AI Services"
          },
          {
            title: "Microsoft Foundry",
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
            url: "https://learn.microsoft.com/en-us/training/",
            description: "Microsoft Learn training path for developing AI agents on Azure"
          },
          {
            title: "Generative AI for beginners",
            url: "https://github.com/microsoft/generative-ai-for-beginners/",
            description: "Microsoft's comprehensive course for beginners learning generative AI concepts and applications"
          },
          {
            title: "Microsoft Foundry",
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/what-is-azure-ai-foundry",
            description: "Learn about Microsoft Foundry and how to build AI solutions with it"
          },
          {
            title: "Getting Started with Microsoft Foundry",
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/quickstarts/get-started-code?tabs=azure-ai-foundry&pivots=fdp-project",
            description: "Step-by-step guide to getting started with Microsoft Foundry"
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
            url: "https://www.youtube.com/watch?v=GD7MnIwAxYM",
            description: "Official Microsoft video introducing Azure AI Agents"
          },
          {
            title: "Google Cloud Vertex AI Agent Builder (Official)",
            url: "https://www.youtube.com/watch?v=8rlNdKywldQ",
            description: "Official Google Cloud video on Vertex AI Agent Builder"
          },
          {
            title: "Building Reliable LLM Agents",
            url: "https://www.youtube.com/watch?v=kTnfJszFxCg",
            description: "Three Ingredients for Building Reliable LLM Agents"
          },
          {
            title: "Azure OpenAI on Microsoft Foundry",
            url: "https://www.youtube.com/watch?v=DUdRdeUtuZQ&t=2s",
            description: "Microsoft official demo of Microsoft Foundry - BRK155"
          },
          {
            title: "Google Gemini AI: Multi-Agent Systems",
            url: "https://www.youtube.com/watch?v=ATpyVXA6Yp0",
            description: "Google on multi-agent systems"
          },
          {
            title: "DeepLearning.AI - LLM Workflows with Pydantic",
            url: "https://www.deeplearning.ai/short-courses/pydantic-for-llm-workflows/",
            description: "Recent DeepLearning.AI video on LLM applications using Pydantic"
          },
          {
            title: "DeepLearning.AI - Agent Communication Protocol",
            url: "https://www.deeplearning.ai/short-courses/acp-agent-communication-protocol/",
            description: "A short course on Agent Communication Protocol (IBM)"
          }
        ]
      },
      {
        id: "externalLearning",
        name: "External Learning Resources",
        references: [
          {
            title: "Azure AI Fundamentals Learning Path",
            url: "https://learn.microsoft.com/training/",
            description: "Microsoft Learn path for Azure AI fundamentals"
          },
          {
            title: "Azure AI Engineer Associate Certification",
            url: "https://learn.microsoft.com/en-us/credentials/",
            description: "Certification for Azure AI Engineers"
          },
          {
            title: "Azure Solutions Architect Expert Certification",
            url: "https://learn.microsoft.com/en-us/credentials/",
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
            title: "DeepLearning.AI - Reasoning with o1",
            url: "https://www.deeplearning.ai/short-courses/reasoning-with-o1/",
            description: "Short course on Reasoning with o1"
          },
          {
            title: "DeepLearning.AI - Agents Evaluation",
            url: "https://www.deeplearning.ai/short-courses/evaluating-ai-agents/",
            description: "Short Course on evaluating AI agents"
          },
          {
            title: "DeepLearning.AI - Generative AI Courses",
            url: "https://www.deeplearning.ai/resources/generative-ai-courses-guide/",
            description: "Guide to Generative AI courses offered by DeepLearning.AI"
          }
        ]
      }
    ],

    "applied-ai-skills": [
      {
        id: "benchmarks",
        name: "Agent Evaluation Benchmarks",
        references: [
          {
            title: "SWE-bench",
            url: "https://www.swebench.com/",
            description: "Open-source software engineering benchmark measuring the end-to-end capability of autonomous agents"
          },
          {
            title: "Prarena",
            url: "https://www.prarena.ai/",
            description: "Competitive agent arena with curated task suites for stress-testing planning, tools, and collaboration"
          },
          {
            title: "OpenAI Evals Leaderboard",
            url: "https://evals.openai.com/",
            description: "Community-driven benchmark leaderboard tracking agentic performance across real-world tasks"
          }
        ]
      }
    ],
    
    // Google Agent Development Kit (ADK)
    "google-adk": [
      {
        id: "official-docs",
        name: "Official Documentation",
        references: [
          {
            title: "Google Agent Development Kit (ADK)",
            url: "https://google.github.io/adk-docs/",
            description: "Official Google ADK documentation - Flexible and modular framework for developing and deploying AI agents, optimized for Gemini"
          },
          {
            title: "ADK Technical Overview",
            url: "https://google.github.io/adk-docs/get-started/about/",
            description: "Comprehensive technical overview of ADK architecture and design philosophy"
          },
          {
            title: "ADK Python Documentation",
            url: "https://google.github.io/adk-docs/api-reference/python/",
            description: "Python API reference for Google ADK"
          },
          {
            title: "ADK Java Documentation",
            url: "https://google.github.io/adk-docs/api-reference/java/",
            description: "Java API reference for Google ADK"
          }
        ]
      },
      {
        id: "getting-started",
        name: "Getting Started",
        references: [
          {
            title: "ADK Python Quick Start",
            url: "https://google.github.io/adk-docs/get-started/python/",
            description: "Get started building agents with ADK in Python"
          },
          {
            title: "ADK Java Quick Start",
            url: "https://google.github.io/adk-docs/get-started/java/",
            description: "Get started building agents with ADK in Java"
          },
          {
            title: "Multi-Tool Agent Tutorial",
            url: "https://google.github.io/adk-docs/get-started/quickstart/",
            description: "Build your first multi-tool agent with ADK"
          },
          {
            title: "Streaming Agent Tutorial",
            url: "https://google.github.io/adk-docs/get-started/streaming/",
            description: "Build streaming agents with real-time responses"
          }
        ]
      },
      {
        id: "agent-types",
        name: "Agent Types & Architecture",
        references: [
          {
            title: "LLM Agents",
            url: "https://google.github.io/adk-docs/agents/llm-agents/",
            description: "Build LLM-powered agents with dynamic routing and tool calling"
          },
          {
            title: "Workflow Agents",
            url: "https://google.github.io/adk-docs/agents/workflow-agents/",
            description: "Define predictable pipelines with Sequential, Parallel, and Loop agents"
          },
          {
            title: "Sequential Agents",
            url: "https://google.github.io/adk-docs/agents/workflow-agents/sequential-agents/",
            description: "Chain agents in sequential workflows"
          },
          {
            title: "Parallel Agents",
            url: "https://google.github.io/adk-docs/agents/workflow-agents/parallel-agents/",
            description: "Execute multiple agents in parallel for concurrent processing"
          },
          {
            title: "Loop Agents",
            url: "https://google.github.io/adk-docs/agents/workflow-agents/loop-agents/",
            description: "Create iterative agent workflows with loop controls"
          },
          {
            title: "Multi-Agent Systems",
            url: "https://google.github.io/adk-docs/agents/multi-agents/",
            description: "Build modular, hierarchical multi-agent architectures"
          },
          {
            title: "Custom Agents",
            url: "https://google.github.io/adk-docs/agents/custom-agents/",
            description: "Create custom agent implementations for specialized use cases"
          }
        ]
      },
      {
        id: "tools",
        name: "Tools & Capabilities",
        references: [
          {
            title: "Tools for Agents",
            url: "https://google.github.io/adk-docs/tools/",
            description: "Overview of ADK's rich tool ecosystem for agent capabilities"
          },
          {
            title: "Built-in Tools",
            url: "https://google.github.io/adk-docs/tools/built-in-tools/",
            description: "Pre-built tools including Search, Code Execution, and Computer Use"
          },
          {
            title: "Computer Use Tools",
            url: "https://google.github.io/adk-docs/tools/gemini-api/computer-use/",
            description: "Enable agents to interact with computers through UI automation"
          },
          {
            title: "Custom Function Tools",
            url: "https://google.github.io/adk-docs/tools/function-tools/",
            description: "Create custom Python/Java functions as agent tools"
          },
          {
            title: "MCP Tools Integration",
            url: "https://google.github.io/adk-docs/tools/mcp-tools/",
            description: "Integrate Model Context Protocol tools with ADK agents"
          },
          {
            title: "OpenAPI Tools",
            url: "https://google.github.io/adk-docs/tools-custom/openapi-tools/",
            description: "Auto-generate tools from OpenAPI specifications"
          },
          {
            title: "Third-Party Tools",
            url: "https://google.github.io/adk-docs/tools/third-party/",
            description: "Integrate tools from Exa, Firecrawl, GitHub, Hugging Face, and more"
          },
          {
            title: "Tool Performance Optimization",
            url: "https://google.github.io/adk-docs/tools/performance/",
            description: "Best practices for optimizing tool calling performance"
          }
        ]
      },
      {
        id: "deployment",
        name: "Deployment & Production",
        references: [
          {
            title: "Deployment Guide",
            url: "https://google.github.io/adk-docs/deploy/",
            description: "Deploy ADK agents to production environments"
          },
          {
            title: "Vertex AI Agent Engine",
            url: "https://google.github.io/adk-docs/deploy/agent-engine/",
            description: "Deploy and scale agents with Vertex AI Agent Engine"
          },
          {
            title: "Cloud Run Deployment",
            url: "https://google.github.io/adk-docs/deploy/cloud-run/",
            description: "Containerize and deploy agents on Google Cloud Run"
          },
          {
            title: "GKE Deployment",
            url: "https://google.github.io/adk-docs/deploy/gke/",
            description: "Deploy agents to Google Kubernetes Engine for orchestration"
          }
        ]
      },
      {
        id: "evaluation",
        name: "Evaluation & Testing",
        references: [
          {
            title: "Agent Evaluation Framework",
            url: "https://google.github.io/adk-docs/evaluate/",
            description: "Built-in evaluation system for response quality and execution trajectories"
          },
          {
            title: "Evaluation Criteria",
            url: "https://google.github.io/adk-docs/evaluate/criteria/",
            description: "Define custom evaluation criteria for agent performance"
          },
          {
            title: "Testing Guide",
            url: "https://google.github.io/adk-docs/get-started/testing/",
            description: "Best practices for testing ADK agents"
          }
        ]
      },
      {
        id: "observability",
        name: "Observability & Monitoring",
        references: [
          {
            title: "Logging",
            url: "https://google.github.io/adk-docs/observability/logging/",
            description: "Configure structured logging for agent execution traces"
          },
          {
            title: "Cloud Trace Integration",
            url: "https://google.github.io/adk-docs/observability/cloud-trace/",
            description: "Distributed tracing with Google Cloud Trace"
          },
          {
            title: "AgentOps Integration",
            url: "https://google.github.io/adk-docs/observability/agentops/",
            description: "Monitor agents with AgentOps platform"
          },
          {
            title: "Arize Phoenix Integration",
            url: "https://google.github.io/adk-docs/observability/phoenix/",
            description: "LLM observability with Arize Phoenix"
          },
          {
            title: "W&B Weave Integration",
            url: "https://google.github.io/adk-docs/observability/weave/",
            description: "Track agent experiments with Weights & Biases Weave"
          }
        ]
      },
      {
        id: "advanced",
        name: "Advanced Features",
        references: [
          {
            title: "Sessions & Memory",
            url: "https://google.github.io/adk-docs/sessions/",
            description: "Manage conversation sessions and persistent memory"
          },
          {
            title: "State Management",
            url: "https://google.github.io/adk-docs/sessions/state/",
            description: "Handle agent state across multiple interactions"
          },
          {
            title: "Memory Systems",
            url: "https://google.github.io/adk-docs/sessions/memory/",
            description: "Implement short-term and long-term memory for agents"
          },
          {
            title: "Callbacks & Events",
            url: "https://google.github.io/adk-docs/callbacks/",
            description: "Hook into agent lifecycle with callbacks and event handlers"
          },
          {
            title: "Context Management",
            url: "https://google.github.io/adk-docs/context/",
            description: "Manage context windows and context compression"
          },
          {
            title: "Bidi-Streaming (Live API)",
            url: "https://google.github.io/adk-docs/streaming/",
            description: "Real-time bidirectional streaming with Vertex AI Live API"
          },
          {
            title: "Grounding with Google Search",
            url: "https://google.github.io/adk-docs/grounding/google_search_grounding/",
            description: "Ground agent responses in real-time web search results"
          },
          {
            title: "Safety & Security",
            url: "https://google.github.io/adk-docs/safety/",
            description: "Build safe and secure agents with best practices"
          },
          {
            title: "A2A Protocol Support",
            url: "https://google.github.io/adk-docs/a2a/",
            description: "Implement Agent-to-Agent communication with A2A protocol"
          }
        ]
      },
      {
        id: "interactions-api",
        name: "Interactions API",
        references: [
          {
            title: "Interactions API Overview",
            url: "https://ai.google.dev/gemini-api/docs/agentic/interactions",
            description: "Unified interface for models and agents with optional server-side state, background execution, and remote MCP tool support"
          },
          {
            title: "Server-Side State Management",
            url: "https://ai.google.dev/gemini-api/docs/agentic/interactions#state",
            description: "Optional stateful sessions that persist context server-side, eliminating client-managed conversation history"
          },
          {
            title: "Background Execution",
            url: "https://ai.google.dev/gemini-api/docs/agentic/interactions#background",
            description: "Run long-running agent tasks asynchronously with polling or streaming updates on progress"
          },
          {
            title: "Remote MCP Tool Support",
            url: "https://ai.google.dev/gemini-api/docs/agentic/interactions#mcp",
            description: "Integrate Model Context Protocol servers as remote tool providers in agent workflows"
          },
          {
            title: "Composable Data Model",
            url: "https://ai.google.dev/gemini-api/docs/agentic/interactions#data-model",
            description: "Interpretable and composable data structures enabling flexible agent-model orchestration patterns"
          },
          {
            title: "Standard REST Interface",
            url: "https://ai.google.dev/gemini-api/docs/agentic/interactions#rest",
            description: "Consistent RESTful API for both model inference and agent execution with unified request/response schemas"
          }
        ]
      },
      {
        id: "samples",
        name: "Code Samples",
        references: [
          {
            title: "ADK Code Samples Repository",
            url: "https://github.com/google/adk-samples",
            description: "Official Google ADK code samples and example projects"
          },
          {
            title: "Agent Team Tutorial",
            url: "https://google.github.io/adk-docs/tutorials/agent-team/",
            description: "Build collaborative multi-agent teams"
          }
        ]
      },
      {
        id: "repositories",
        name: "GitHub Repositories",
        references: [
          {
            title: "ADK Python SDK",
            url: "https://github.com/google/adk-python",
            description: "Official Python SDK for Google Agent Development Kit"
          },
          {
            title: "ADK Java SDK",
            url: "https://github.com/google/adk-java",
            description: "Official Java SDK for Google Agent Development Kit"
          },
          {
            title: "ADK Documentation Source",
            url: "https://github.com/google/adk-docs",
            description: "Source repository for ADK documentation"
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
            title: "Google ADK A2A Protocol Support",
            url: "https://google.github.io/adk-docs/a2a/",
            description: "Google Agent Development Kit implementation of A2A protocol"
          },
          {
            title: "A2A Protocol Documentation (Google ADK)",
            url: "https://a2a-protocol.org/",
            description: "Official A2A protocol spec referenced by Google ADK"
          },
          {
            title: "Microsoft Foundry Documentation",
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
            description: "Official documentation for Microsoft Foundry - Microsoft's unified AI development platform"
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
            title: "Google ADK A2A Quick Start (Exposing)",
            url: "https://google.github.io/adk-docs/a2a/quickstart-exposing/",
            description: "Expose agents via A2A protocol using Google ADK"
          },
          {
            title: "Google ADK A2A Quick Start (Consuming)",
            url: "https://google.github.io/adk-docs/a2a/quickstart-consuming/",
            description: "Consume A2A-enabled agents using Google ADK"
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
          },
          {
            title: "A2A Walkthrough Notebooks",
            url: "https://github.com/holtskinner/A2AWalkthrough/",
            description: "Quick walkthrough notebooks for A2A concepts and hands-on examples"
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
    
    // Atomic LLM Training (microGPT) concept
    'atomic-llm-training': [
      {
        id: "official-sources",
        name: "Official Sources",
        references: [
          {
            title: "microGPT — Karpathy's Gist",
            url: "https://gist.github.com/karpathy/8627fe009c40f57531cb18360106ce95",
            description: "The original ~200-line pure Python GPT implementation — the complete algorithm"
          },
          {
            title: "karpathy.ai/microgpt",
            url: "https://karpathy.ai/microgpt.html",
            description: "Official microGPT page with syntax-highlighted code and context"
          }
        ]
      },
      {
        id: "visual-interactive",
        name: "Visual & Interactive Guides",
        references: [
          {
            title: "Step-by-Step Visual Explainer (tanpuekai)",
            url: "https://htmlpreview.github.io/?https://github.com/tanpuekai/microGPT_webEdu/blob/main/index.html",
            description: "Web-based educational walkthrough explaining every line of microGPT visually"
          },
          {
            title: "microGPT WebEdu — GitHub",
            url: "https://github.com/tanpuekai/microGPT_webEdu",
            description: "Source repository for tanpuekai's visual microGPT explainer"
          },
          {
            title: "Interactive Visual Guide (Claude Artifact)",
            url: "https://claude.ai/public/artifacts/36b54621-c5d8-45a1-9963-32577d352a86",
            description: "Interactive diagram-based exploration of microGPT components"
          },
          {
            title: "Animated Execution Visualization (snzro)",
            url: "https://ladenhauf.com/viz/ai-viz/",
            description: "Watch microGPT data flow animated step by step"
          },
          {
            title: "Neurovisual: Math Functions Explorer (OAS)",
            url: "https://ai.studio/apps/drive/1E9XlNn7X1GnNdRLB8AdfkcpYk2YMo3OQ?fullscreenApplet=true",
            description: "Open Agent School's interactive tool for visualizing ReLU, softmax, exp, log and all activation functions"
          }
        ]
      },
      {
        id: "community-extensions",
        name: "Community Extensions",
        references: [
          {
            title: "DeepWiki: nanochat",
            url: "https://deepwiki.com/karpathy/nanochat",
            description: "Deep dive into Karpathy's nanochat — the next step up from microGPT"
          },
          {
            title: "picoGPT (93 lines)",
            url: "https://github.com/Kuberwastaken/picogpt",
            description: "Even more minimal GPT implementation in 93 lines of Python"
          },
          {
            title: "microGPT.js (Browser Port)",
            url: "https://huggingface.co/spaces/webml-community/microgpt.js",
            description: "Xenova's exact JavaScript port — runs in the browser with bit-for-bit matching output"
          },
          {
            title: "Interactive Visual Guide (original Claude Artifact)",
            url: "https://claude.ai/public/artifacts/eebaafa3-0ada-48e7-ae70-46644b33bd25",
            description: "Original Claude artifact that inspired the adapted visual guide"
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
            title: "Google ADK MCP Tools Integration",
            url: "https://google.github.io/adk-docs/tools/mcp-tools/",
            description: "Integrate Model Context Protocol tools with Google ADK agents"
          },
          {
            title: "Google ADK MCP Support",
            url: "https://google.github.io/adk-docs/mcp/",
            description: "Full MCP implementation guide for Google Agent Development Kit"
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
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
            description: ""
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
            title: "Microsoft Agent Framework",
            url: "https://aka.ms/agentframework",
            description: "The next-generation Microsoft framework — successor to Semantic Kernel and AutoGen — for building production-ready multi-agent AI applications"
          },
          {
            title: "Agent Framework Documentation",
            url: "https://learn.microsoft.com/agent-framework/overview/agent-framework-overview",
            description: "Official Microsoft Agent Framework overview — open-source SDK with multi-agent orchestration, graph-based workflows, and enterprise-grade features"
          },
          {
            title: "Agent Framework Quick Start",
            url: "https://learn.microsoft.com/agent-framework/tutorials/quick-start",
            description: "Get started with Microsoft Agent Framework in Python or .NET"
          }
        ]
      },
      {
        id: "samples",
        name: "Code Samples",
        references: [
          {
            title: "Microsoft Agent Framework GitHub",
            url: "https://github.com/microsoft/agent-framework/",
            description: "Official GitHub repository with Agent Framework examples, samples, and workflow patterns"
          },
          {
            title: "Agent Framework Python Samples",
            url: "https://github.com/microsoft/agent-framework/tree/main/python/samples",
            description: "Python samples for agents, workflows, and multi-agent orchestration"
          },
          {
            title: "Agent Framework .NET Samples",
            url: "https://github.com/microsoft/agent-framework/tree/main/dotnet/samples",
            description: ".NET samples demonstrating Agent Framework capabilities"
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
            url: "https://learn.microsoft.com/training/",
            description: "Microsoft Learn path for Azure AI fundamentals"
          },
          {
            title: "Azure AI Engineer Associate Certification",
            url: "https://learn.microsoft.com/en-us/credentials/",
            description: "Certification for Azure AI Engineers"
          },
          {
            title: "Azure Solutions Architect Expert Certification",
            url: "https://learn.microsoft.com/en-us/credentials/",
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
  ,
    "multi-agent-systems": [
      {
        id: "frameworks",
        name: "Multi-Agent Frameworks",
        references: [
          {
            title: "Google ADK Multi-Agent Systems",
            url: "https://google.github.io/adk-docs/agents/multi-agents/",
            description: "Build modular, hierarchical multi-agent architectures with Google Agent Development Kit"
          },
          {
            title: "Google ADK Agent Team Tutorial",
            url: "https://google.github.io/adk-docs/tutorials/agent-team/",
            description: "Step-by-step tutorial for building collaborative multi-agent teams"
          },
          {
            title: "Google ADK Workflow Agents",
            url: "https://google.github.io/adk-docs/agents/workflow-agents/",
            description: "Orchestrate agents with Sequential, Parallel, and Loop patterns"
          },
          {
            title: "Microsoft Foundry Multi-Agent",
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
            description: "Build multi-agent systems with Microsoft Foundry's unified platform"
          }
        ]
      },
      {
        id: "youtube-research",
        name: "YouTube Research",
        references: [
          {
            title: "Mixture of Thoughts: Learning to Aggregate What Experts Think, Not Just What They Say",
            url: "https://www.youtube.com/watch?v=hShqRxiF53U",
            description: "Techniques for coordinating and aggregating multiple expert agents’ reasoning to improve outcomes."
          },
          {
            title: "GeoEvolve: Automating Geospatial Model Discovery via Multi-Agent Large Language Models #mit",
            url: "https://www.youtube.com/watch?v=wjsCVvLFW7w",
            description: "Use of multi-agent LLMs to coordinate discovery tasks in geospatial modeling."
          },
          {
            title: "Anemoi - A Semi-Centralized Multiâ€‘Agent System based on A2A Communication (Coral Protocol MCP)",
            url: "https://www.youtube.com/watch?v=x9RWbaElPHk",
            description: "Overview of Anemoi’s semi-centralized multi-agent architecture and coordination approach."
          },
          {
            title: "Collaborative Document Editing with Multiple Users and AI Agents",
            url: "https://www.youtube.com/watch?v=DZ4Zk-IQdh0",
            description: "Design and coordination patterns for agent teams collaborating on shared document tasks."
          },
          {
            title: "Virtual Agent Economies #deepmind",
            url: "https://www.youtube.com/watch?v=SaRh7JhlB3c",
            description: "DeepMind research on emergent market dynamics and coordination in multi-agent simulations."
          },
          {
            title: "MoMA â€“ A Generalized Router for Models and Agents",
            url: "https://www.youtube.com/watch?v=ZGibXO7pUQM",
            description: "How a routing layer can coordinate and arbitrate among multiple agents/models for collaborative problem solving."
          },
          {
            title: "Multi-Agent Penetration Testing AI for the Web",
            url: "https://www.youtube.com/watch?v=13bcEczONXA",
            description: "Walkthrough of a web-focused penetration testing AI built from collaborating agents and their coordination strategies."
          },
          {
            title: "Chain of Agents and Agent Foundation Models",
            url: "https://www.youtube.com/watch?v=BNAiFZGn9Ig",
            description: "Design patterns and coordination strategies for chaining multiple agents into cohesive systems."
          },
          {
            title: "Magentic-UI: Towards Human-in-the-Loop Agentic Systems #microsoft",
            url: "https://www.youtube.com/watch?v=_VkqTst4NBs",
            description: "UI approaches for coordinating multiple agents with human guidance within Microsoft's Magentic ecosystem."
          },
          {
            title: "Learning to Teach than to Solve - Reinforcement Learned Teacher #sakana",
            url: "https://www.youtube.com/watch?v=jwo-HTsS2oA",
            description: "Covers a teacher–student agent setup where a teacher guides another agent via learned signals."
          },
          {
            title: "MCPxA2A - Technical Analysis for Business Workflow Multi-agents #samsung",
            url: "https://www.youtube.com/watch?v=EP4jQuWAbkM",
            description: "Designing and coordinating teams of agents to execute end-to-end business workflows."
          },
          {
            title: "Why Do Multi-Agent LLM Systems Fail?",
            url: "https://www.youtube.com/watch?v=tCCj064B_tA",
            description: "Explores why multi-agent LLM teams break down and how intentional coordination can prevent emergent spaghetti."
          },
          {
            title: "The future of transportation: LLMs and Intelligent Transportation Systems #ieee",
            url: "https://www.youtube.com/watch?v=6VPfzkpVV7o",
            description: "Explores LLM-driven coordination among vehicles, signals, and infrastructure in intelligent transportation systems."
          },
          {
            title: "Generative Emergent Communication and Large Language Models - EmCom #ieee",
            url: "https://www.youtube.com/watch?v=Ai4AdZzzmKQ",
            description: "Research talk on multi-agent interactions where LLM agents learn to communicate and coordinate through emergent protocols."
          },
          {
            title: "LLM Adaptation in Multi Agent Contexts - Can Large Language Models Adapt to Other Agents In-Context?",
            url: "https://www.youtube.com/watch?v=1fL3UoJw1p0",
            description: "Explores how LLMs operate and adapt within teams of agents and the coordination challenges that arise."
          },
          {
            title: "Bench CoE:  A Framework for Expert Collaboration in LLMs #arxiv",
            url: "https://www.youtube.com/watch?v=BLHOlg22qhE",
            description: "Framework and design approaches for coordinating multiple expert LLMs to work together effectively."
          },
          {
            title: "FINCON: A Multi Agent LLM System for Financial Decision Making",
            url: "https://www.youtube.com/watch?v=joU0Trj9UXw",
            description: "Overview of FINCON, a multi-agent LLM framework coordinating specialized agents for financial analysis and decision support."
          },
          {
            title: "Large Language Models and Algorithmic Collusion #arxiv",
            url: "https://www.youtube.com/watch?v=S-eB4OkUaGk",
            description: "Research on how multiple LLM-driven agents may coordinate or exhibit emergent collusive behavior."
          },
          {
            title: "Multi LLM Agent Systems:  Techniques and Business Perspectives",
            url: "https://www.youtube.com/watch?v=NaXW16fzzFw",
            description: "Overview of multi-LLM agent team techniques, coordination patterns, and when to use them."
          },
          {
            title: "Rationality of large language models in game theoretic contexts",
            url: "https://www.youtube.com/watch?v=Eo95y9GJwZo",
            description: "Analysis of LLM interactions and strategies in multi-agent, game-theoretic scenarios."
          },
          {
            title: "Magentic One - Generalist Multi-Agents",
            url: "https://www.youtube.com/watch?v=cVHRUrpst8E",
            description: "Overview of Magentic One as a generalist system that coordinates multiple agents to tackle diverse tasks."
          },
          {
            title: "LLMs potential to reshape collective intelligence",
            url: "https://www.youtube.com/watch?v=LkLD6yo5ZKg",
            description: "Explores how LLM-enabled agent collectives could coordinate to augment group problem-solving and decision-making."
          },
          {
            title: "DAWN  Distributed Agents in a Worldwide Network",
            url: "https://www.youtube.com/watch?v=nUSXj5samkE",
            description: "Overview of building and coordinating a globally distributed network of collaborating agents."
          },
          {
            title: "Language Understanding as a Constraint on Consensus Size in LLM Societies",
            url: "https://www.youtube.com/watch?v=qTnH9_CeON8",
            description: "Explores how language comprehension limits consensus formation and collective behavior in LLM-based multi-agent societies."
          }
        ]
      }
    ],

    "xyz-claw": [
      {
        id: "source-material",
        name: "Source Material",
        references: [
          {
            title: "TinyClaw — Original Repository",
            url: "https://github.com/jlia0/tinyclaw",
            description: "The open-source multi-agent orchestration system that inspired this educational concept"
          },
          {
            title: "OpenAgentSchool TinyClaw Architecture Academy",
            url: "https://github.com/bhakthan/teach-tinyclaw-architecture",
            description: "Companion interactive learning app with guided code tours, visualizations, and AI tutor"
          },
          {
            title: "PicoClaw — Go-Based Claw",
            url: "https://github.com/sipeed/picoclaw",
            description: "Go implementation of the Claw multi-agent orchestration pattern"
          },
          {
            title: "Moltis — Rust-Based Claw",
            url: "https://github.com/moltis-org/moltis",
            description: "Rust implementation of the Claw pattern emphasizing safety and performance"
          },
          {
            title: "OpenClaw — Original OpenClaw",
            url: "https://github.com/openclaw/openclaw",
            description: "The original OpenClaw project for multi-agent orchestration"
          },
          {
            title: "ZeroClaw — Rust Implementation",
            url: "https://github.com/theonlyhennygod/zeroclaw",
            description: "Rust implementation of the Claw pattern with zero-cost abstractions and compile-time safety"
          },
          {
            title: "NanoClaw — Python Implementation",
            url: "https://github.com/qwibitai/nanoclaw",
            description: "Python implementation of the Claw multi-agent orchestration pattern for rapid prototyping"
          },
          {
            title: "SeaClaw — C Implementation",
            url: "https://github.com/haeli05/seaclaw",
            description: "C implementation of the Claw pattern focused on minimal overhead and systems-level control"
          },
          {
            title: "LispClaw — Lisp Implementation",
            url: "https://github.com/jsmorph/lispclaw",
            description: "Lisp implementation of the Claw pattern exploring homoiconic agent orchestration"
          }
        ]
      },
      {
        id: "architecture-foundations",
        name: "Architecture Foundations",
        references: [
          {
            title: "Actor Model (Wikipedia)",
            url: "https://en.wikipedia.org/wiki/Actor_model",
            description: "The mathematical model of concurrent computation underlying agent isolation and message passing"
          },
          {
            title: "File-Based Message Queues",
            url: "https://en.wikipedia.org/wiki/Message_queue",
            description: "Foundational pattern for decoupled asynchronous communication between system components"
          },
          {
            title: "Thinking in Systems — Donella Meadows",
            url: "https://www.chelseagreen.com/product/thinking-in-systems/",
            description: "Classic primer on systems thinking — feedback loops, emergent behavior, and interconnectedness"
          }
        ]
      },
      {
        id: "related-concepts",
        name: "Related Concepts",
        references: [
          {
            title: "Multi-Agent Systems — OpenAgentSchool",
            url: "/concepts/multi-agent-systems",
            description: "Core concept covering multi-agent orchestration patterns and frameworks"
          },
          {
            title: "Agent Architecture — OpenAgentSchool",
            url: "/concepts/agent-architecture",
            description: "Foundational concept on how AI agents are structured and composed"
          }
        ]
      }
    ],
  
    "agent-architecture": [
      {
        id: "youtube-research",
        name: "YouTube Research",
        references: [
          {
            title: "Mixture of Thoughts: Learning to Aggregate What Experts Think, Not Just What They Say",
            url: "https://www.youtube.com/watch?v=hShqRxiF53U",
            description: "Architectural patterns that expose and combine agents’ intermediate reasoning steps for stronger decision quality."
          },
          {
            title: "Microsoft Agent Framework #azure",
            url: "https://www.youtube.com/watch?v=7yVMzrrx29Y",
            description: "Overview of architectural patterns and lifecycle considerations in Microsoft's Azure-oriented agent framework."
          },
          {
            title: "GeoEvolve: Automating Geospatial Model Discovery via Multi-Agent Large Language Models #mit",
            url: "https://www.youtube.com/watch?v=wjsCVvLFW7w",
            description: "Architecture of agent systems for geospatial model discovery using multiple LLM agents."
          },
          {
            title: "Gemini Robotics 1.5 Model #deepmind",
            url: "https://www.youtube.com/watch?v=COT9Ijp9avM",
            description: "Overview/demo of Gemini Robotics 1.5 as an embodied agent integrating perception, reasoning, and action for robot control."
          },
          {
            title: "Deep Researcher with Test-Time Diffusion (TTD-DR) #deepmind",
            url: "https://www.youtube.com/watch?v=7U1PodHCxq0",
            description: "How TTD-DR structures an agent’s planning, retrieval, and action loops to enable deeper research performance."
          },
          {
            title: "Code World Model (CWM) #meta #fair",
            url: "https://www.youtube.com/watch?v=4WggnJjbtbQ",
            description: "Overview of a code-based world model architecture for agents, modeling environment dynamics to support reasoning and action."
          },
          {
            title: "Web Researcher: Unbounded Reasoning Capabilities in Long Horizon Agents",
            url: "https://www.youtube.com/watch?v=8cshoLZX_H4",
            description: "Architecture patterns enabling long-horizon planning, memory, and tool-use for sustained web research tasks."
          },
          {
            title: "MoMA â€“ A Generalized Router for Models and Agents",
            url: "https://www.youtube.com/watch?v=ZGibXO7pUQM",
            description: "Presents an architectural router component for selecting models/agents, and how it fits into the broader agent lifecycle."
          },
          {
            title: "Bridging the Humanâ€“AI Knowledge Gap - Concept Discovery and Transfer in AlphaZero #deepmind",
            url: "https://www.youtube.com/watch?v=WirApf_IHbk",
            description: "An exploration of AlphaZero’s internal representations and planning stack to show where concepts form and how knowledge transfer fits the agent lifecycle."
          },
          {
            title: "REFRAG â€” Rethinking RAG-based Decoding #meta",
            url: "https://www.youtube.com/watch?v=dPPMNRjGdaA",
            description: "Architectural insights on integrating retrieval into decoding to improve context use and reliability in generation."
          },
          {
            title: "Just-in-time and distributed task representations in language models #deepmind",
            url: "https://www.youtube.com/watch?v=RGLV7FRc26U",
            description: "DeepMind research talk on how LLMs form just-in-time, distributed task representations and the implications for reasoning and memory in agent architectures."
          },
          {
            title: "Why language models hallucinate? #openai",
            url: "https://www.youtube.com/watch?v=sAexR863mBA",
            description: "Explains why LLMs hallucinate and connects these causes to architectural failure points in agent systems."
          },
          {
            title: "Psychologically Enhanced AI Agents",
            url: "https://www.youtube.com/watch?v=403tSlNnlm0",
            description: "How to embed psychological models into an agent’s perception–reasoning–memory loop to influence behavior."
          },
          {
            title: "Implicit Reasoning in Large Language Models (LLMs) #survey",
            url: "https://www.youtube.com/watch?v=-a4ab-ggjZQ",
            description: "Survey of how LLMs perform implicit reasoning and what that implies for designing the reasoning component of agent architectures."
          },
          {
            title: "Scientific Large Language Models: From Data Foundations to Agent Frontiers",
            url: "https://www.youtube.com/watch?v=jwkczow1T2Y",
            description: "Architectural considerations when pushing LLMs toward agentic capabilities across their lifecycle."
          },
          {
            title: "On the Theoretical Limitations of Embedding-Based Retrieval #deepmind",
            url: "https://www.youtube.com/watch?v=5okkh7oUtJo",
            description: "Examines how embedding retrieval constraints affect agent memory and context components, impacting downstream reasoning reliability."
          },
          {
            title: "The Anatomy of a Personal Health Agent #google #deepmind",
            url: "https://www.youtube.com/watch?v=Oac-RTXijj4",
            description: "Deep dive into how a personal health agent is structured—perception, reasoning, memory, actions, and control loops."
          },
          {
            title: "Physical AI Agents",
            url: "https://www.youtube.com/watch?v=dzlarsZOOQo",
            description: "Embodied agent architectures for sensing, planning, memory, and action in real-world environments."
          },
          {
            title: "Thinking in Blocks   Adaptive Reasoning",
            url: "https://www.youtube.com/watch?v=zZolGueW6nY",
            description: "Explores modular, block-based reasoning and adaptive control within an agent’s reasoning loop."
          },
          {
            title: "Open Questions about Time and Self-reference in Living Systems",
            url: "https://www.youtube.com/watch?v=qY5WWLDtHqU",
            description: "Conceptual exploration of temporal dynamics and self-reference that informs how agents model themselves and evolve state over time."
          },
          {
            title: "Chain of Agents and Agent Foundation Models",
            url: "https://www.youtube.com/watch?v=BNAiFZGn9Ig",
            description: "How foundational model choices and components shape agent capabilities, behavior, and lifecycle."
          },
          {
            title: "CoAct: Computer-using Agents withCoding as Actions",
            url: "https://www.youtube.com/watch?v=0YNXzWjnEL0",
            description: "How coding-as-actions fits into an agent’s perception–reasoning–action loop for reliable computer use."
          },
          {
            title: "Agentic AI Frameworks (listen in 12 languages)",
            url: "https://www.youtube.com/watch?v=gqjWko6yMME",
            description: "Overview of how agentic frameworks organize perception, memory, reasoning, and action across the agent lifecycle."
          },
          {
            title: "Interpretable Robot Control and LLM - ROS2",
            url: "https://www.youtube.com/watch?v=Ur9XRE9_7Tc",
            description: "Structuring LLM-in-the-loop robot control stacks—linking sensing, planning, action, and interpretability within ROS2."
          },
          {
            title: "GPT-5 on Multimodal Medical Reasoning (listen in 12 languages)",
            url: "https://www.youtube.com/watch?v=9Mk20R1YdcI",
            description: "Overview of integrating multimodal perception and reasoning for medical tasks with next‑gen GPT models."
          },
          {
            title: "Intrinsic Memory Agents (listen in 12 languages)",
            url: "https://www.youtube.com/watch?v=4NGRvjbFXf8",
            description: "Explores how intrinsic memory is embedded in agent architectures and how it shapes behavior over time."
          },
          {
            title: "ASearcher - Beyond Ten Turns - Long Horizon Agentic Search",
            url: "https://www.youtube.com/watch?v=0Xq7FmkMQes",
            description: "Design considerations for agent architectures that support extended planning, memory, and action loops in long-horizon search."
          },
          {
            title: "Self Evolving Computer Use Agent",
            url: "https://www.youtube.com/watch?v=uqYfbGFq-Rk",
            description: "Foundations for structuring agents that perceive screens, reason, and act to operate computers end-to-end."
          },
          {
            title: "Graph-R1",
            url: "https://www.youtube.com/watch?v=GiRYsUPYwBQ",
            description: "Overview of how graph-based reasoning methods fit into agent architectures and where they influence reliability."
          },
          {
            title: "SciToolAgent -  A Knowledge Graphâ€“Driven Scientific Agent for Multi-Tool Integration",
            url: "https://www.youtube.com/watch?v=UDLaVHNcXY0",
            description: "Overview of a knowledge graph–driven scientific agent architecture that coordinates tools for end-to-end tasks."
          },
          {
            title: "AI-based Intelligent Tutoring Systems",
            url: "https://www.youtube.com/watch?v=0BbKNt-3zUE",
            description: "How tutoring agents structure perception, student modeling, pedagogical planning, and feedback into a coherent lifecycle."
          },
          {
            title: "ARAG - Agentic Retrieval-Augmented Generation for Personalized Recommendation #walmart",
            url: "https://www.youtube.com/watch?v=sIDy_3PN84g",
            description: "Overview of an agentic RAG architecture applied to personalized recommendations (e.g., Walmart)."
          },
          {
            title: "Deep Researcher with Test-Time Diffusion #google #agenticai",
            url: "https://www.youtube.com/watch?v=DjcK017irwY",
            description: "How a deep research agent structures retrieval and reasoning, leveraging test-time diffusion within its architecture."
          },
          {
            title: "Deep Research Agents - A Systemic Examination and Roadmap",
            url: "https://www.youtube.com/watch?v=qmabepUNDdk",
            description: "Architecture-focused overview of how deep research agents are built and where their lifecycle tends to break."
          },
          {
            title: "Gemini Deep Research Agent - Google Blog",
            url: "https://blog.google/technology/developers/deep-research-agent-gemini-api/",
            description: "Official Google blog post on Gemini Deep Research agent architecture, Interactions API, and DeepSearchQA benchmark."
          },
          {
            title: "DeepSearchQA Starter Code - Kaggle",
            url: "https://www.kaggle.com/code/andrewmingwang/deepsearchqa-starter-code",
            description: "Starter implementation code for the DeepSearchQA benchmark using Gemini API for deep research evaluation."
          },
          {
            title: "DeepSearchQA Benchmark Dataset",
            url: "https://www.kaggle.com/datasets/deepmind/deepsearchqa",
            description: "900 hand-crafted causal chain research tasks across 17 fields for evaluating deep research agent comprehensiveness."
          },
          {
            title: "DeepSearchQA Benchmark Leaderboard",
            url: "https://www.kaggle.com/benchmarks/google/dsqa/leaderboard",
            description: "Leaderboard tracking state-of-the-art performance on the DeepSearchQA multi-step research benchmark."
          },
          {
            title: "Gemini Deep Research Documentation",
            url: "https://ai.google.dev/gemini-api/docs/deep-research",
            description: "Official developer documentation for building with Gemini Deep Research agent via the Interactions API."
          },
          {
            title: "MemOS - A Memory Operating System for AI Systems",
            url: "https://www.youtube.com/watch?v=zf4WXEdBW6c",
            description: "Explains how a dedicated memory OS fits into agent architecture and lifecycle to support persistent, reliable context."
          },
          {
            title: "Embodied AI Agents: Modeling the World #meta",
            url: "https://www.youtube.com/watch?v=KfP9aME4Xyg",
            description: "How embodied agents build and use world models across perception, memory, planning, and action."
          },
          {
            title: "Fractional Reasoning via Latent Steering Vectors Improves Inference Time Compute #stanford",
            url: "https://www.youtube.com/watch?v=CcMpMJB0b3g",
            description: "Stanford research on steering latent activations to modulate reasoning depth and improve inference-time compute efficiency."
          },
          {
            title: "The path to medical superintelligence - Sequential Diagnosis with Language Models #microsoft",
            url: "https://www.youtube.com/watch?v=TcuzW4btYso",
            description: "Explores how agent reasoning-action loops are applied to medical diagnosis and where lifecycle failures can emerge."
          },
          {
            title: "Darwin GÃ¶del Machine - Openâ€Ended, Selfâ€“Improving AI Systems",
            url: "https://www.youtube.com/watch?v=MFPQaln6xSo",
            description: "Designing agent architectures that support self-modification, feedback loops, and long-run lifecycle control."
          },
          {
            title: "Continuous Thought Machines #sakana",
            url: "https://www.youtube.com/watch?v=m6ZkbX3y2SQ",
            description: "How long-running reasoning loops, memory, and action cycles fit together in robust agent architectures."
          },
          {
            title: "On the Biology of a Large Language Model #anthropic",
            url: "https://www.youtube.com/watch?v=9-ZgpFkH08A",
            description: "Explores the internal structure and behaviors of large language models to inform how core components fit within agent architectures."
          },
          {
            title: "X-Reasoner #microsoft",
            url: "https://www.youtube.com/watch?v=YE_7eRnqn9k",
            description: "Overview of Microsoft's X-Reasoner and how a dedicated reasoning module fits into and improves agent architecture."
          },
          {
            title: "LLM Reasoning Length - between underthinking and overthinking #cornell #adobe",
            url: "https://www.youtube.com/watch?v=Ky0H-oA7ETc",
            description: "Insights on tuning the reasoning component of agent architectures to avoid underthinking and overthinking."
          },
          {
            title: "Rethinking Memory in AI: Taxonomy, Operations, Topics, and Future Directions #hkust",
            url: "https://www.youtube.com/watch?v=wJbWmMgY7vc",
            description: "Academic talk outlining memory models and their role within agent architecture, including operations and future directions."
          },
          {
            title: "Phi-4-reasoning, phi-4-reasoning-plus and Phi-4-mini-reasoning #microsoft",
            url: "https://www.youtube.com/watch?v=-wIH_VTfuts",
            description: "Overview of Phi-4 Reasoning, Reasoning Plus, and Mini models and their implications for the reasoning layer in agent architectures."
          },
          {
            title: "Taxonomy of Failure Modes in Agentic AI Systems #microsoft",
            url: "https://www.youtube.com/watch?v=6AFt3bLPM_k",
            description: "Breaks down where agentic systems fail across the architecture lifecycle and how those failure surfaces manifest in practice."
          },
          {
            title: "LLMs can see and hear #meta",
            url: "https://www.youtube.com/watch?v=yY698COsmRM",
            description: "Overview of multimodal LLM perception (seeing and hearing) and implications for agent architecture and lifecycle."
          },
          {
            title: "How LLMs capture and represent domain-specific knowledge #microsoft",
            url: "https://www.youtube.com/watch?v=VIG6ympy3es",
            description: "Discusses how LLMs internally represent and structure domain knowledge within the broader memory and reasoning architecture."
          },
          {
            title: "Towards Super Agent",
            url: "https://www.youtube.com/watch?v=XhAkXrfEIdI",
            description: "Explores the components and lifecycle needed to progress toward a more capable, general-purpose 'super' agent."
          },
          {
            title: "Exploring Expert Failures - LLM  Agent tuning #openai",
            url: "https://www.youtube.com/watch?v=5bCje470-2E",
            description: "Examines where expert-agent failures emerge across perception, reasoning, memory, and action to inform tuning."
          },
          {
            title: "A Survey of Frontiers in LLM Reasoning: Inference Scaling, Learning to Reason and Agentic Systems",
            url: "https://www.youtube.com/watch?v=lkkKqGwvvvo",
            description: "Overview of how reasoning capabilities slot into agent architectures and where current systems succeed or break."
          },
          {
            title: "Deepseek R1 Thoughtology",
            url: "https://www.youtube.com/watch?v=8NmMJXsdKm4",
            description: "Overview of DeepSeek R1’s thought process and what it implies about reasoning components within agent architectures."
          },
          {
            title: "Reasoning models don't always say what they think #anthropic",
            url: "https://www.youtube.com/watch?v=31N23aKjGTM",
            description: "Examines architectural points where internal reasoning can diverge from communicated answers and how that impacts reliability."
          },
          {
            title: "200th episode - Foundation Agents",
            url: "https://www.youtube.com/watch?v=Uw5EbLgdLiw",
            description: "Introduction to common agent architecture components and lifecycle considerations."
          },
          {
            title: "Language-free Visual Representation Learning #meta #newyorkuniversity  #princetonuniversity",
            url: "https://www.youtube.com/watch?v=23RIvUS1CRE",
            description: "Foundational research on language-free visual representations that can power the perception stack in agent architectures."
          },
          {
            title: "Procedural Knowledge Ontology (PKO)",
            url: "https://www.youtube.com/watch?v=gUmzjqqKDNc",
            description: "How procedural knowledge models slot into agent memory and planning to enable dependable action sequences."
          },
          {
            title: "Why Do Multi-Agent LLM Systems Fail?",
            url: "https://www.youtube.com/watch?v=tCCj064B_tA",
            description: "Identifies architectural points where interactions across components cause multi-agent LLM failures."
          },
          {
            title: "MetaScale: Test-time Scaling with Evolving Meta-Thoughts #microsoftresearch",
            url: "https://www.youtube.com/watch?v=F2epOG3nD0o",
            description: "How evolving meta-thought loops fit into agent reasoning architecture to harness test-time scaling."
          },
          {
            title: "Search-R1 : Reasoning + Search + Reinforcement Learning",
            url: "https://www.youtube.com/watch?v=uTPlUvi_44Q",
            description: "Architectural patterns for embedding search-driven reasoning loops into an agent’s decision lifecycle."
          },
          {
            title: "Do Language Models Track State? How?",
            url: "https://www.youtube.com/watch?v=3u0wjs7AgoI",
            description: "Explores how language models represent and update state and the implications for memory and control within agent architectures."
          },
          {
            title: "Phi-4-multimodal-Instruct and Phi-4-mini #microsoft",
            url: "https://www.youtube.com/watch?v=byw6Z2Rs-P8",
            description: "Overview of Microsoft’s Phi-4 Multimodal Instruct and Phi-4 Mini models and how their capabilities inform agent architecture choices."
          },
          {
            title: "Magma: A foundation model for multimodal AI agents across digital and physical worlds #microsoft",
            url: "https://www.youtube.com/watch?v=7vHUcnZ10uI",
            description: "Overview of a multimodal foundation model shaping the perception-action loop for agents across virtual and embodied environments."
          },
          {
            title: "Optimizing Model Selection for Compound AI Systems - how should one decide which LLM to use?",
            url: "https://www.youtube.com/watch?v=zk5YxeZ2KGc",
            description: "Architectural considerations for assigning and composing LLMs across stages of a compound agent system."
          },
          {
            title: "Large Memory Models (LM2)",
            url: "https://www.youtube.com/watch?v=tziPcZn9vig",
            description: "Architectural approaches for integrating long-term memory into agents to support persistent context and extended reasoning."
          },
          {
            title: "On the Emergence of Thinking in LLMs Searching for the Right Intuition #microsoftresearch #microsoft",
            url: "https://www.youtube.com/watch?v=VwejqpelQT4",
            description: "Research discussion on emergent reasoning in LLMs and its implications for the reasoning component of agent architectures."
          },
          {
            title: "Evolution of \"proactive\" Reasoning Models + Search + Business AI Agents",
            url: "https://www.youtube.com/watch?v=NcYmSr3Q1A4",
            description: "How proactive reasoning models and search-enabled tool use shape the architecture and action loops of business AI agents."
          },
          {
            title: "Bootstrap Your Own Context Length #microsoftresearch",
            url: "https://www.youtube.com/watch?v=QmH7nx3wJGA",
            description: "Research talk on techniques to extend LLM context windows and the architectural implications for agent memory and planning."
          },
          {
            title: "RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval #stanforduniversity",
            url: "https://www.youtube.com/watch?v=TTl6Q0w5bSU",
            description: "Research on integrating hierarchical memory and retrieval structures into agent architecture to enhance long-context reasoning."
          },
          {
            title: "DeepSeek R1 explained by DeepSeek-R1",
            url: "https://www.youtube.com/watch?v=CSZHyUBMH4E",
            description: "Overview of DeepSeek-R1’s reasoning approach and architectural choices as explained by the model."
          },
          {
            title: "PC Agent: A Cognitive Framework for Digital Work #gair",
            url: "https://www.youtube.com/watch?v=Hclz-CUjss4",
            description: "Explains how to structure an agent’s cognitive loop and lifecycle for reliable digital task execution."
          },
          {
            title: "Distilling Multimodal LLMs for Autonomous Driving #johnhopkins",
            url: "https://www.youtube.com/watch?v=zH6BgJEQxGg",
            description: "Explores how multimodal LLMs interface with perception and control stacks in autonomous driving and the architectural choices that impact reliability."
          },
          {
            title: "Agent Infrastructure for AI Systems",
            url: "https://www.youtube.com/watch?v=VKbWBUcYeak",
            description: "Foundational structures connecting perception, reasoning, memory, and action in agent systems."
          },
          {
            title: "TransformerÂ²: Self Adaptive LLMs",
            url: "https://www.youtube.com/watch?v=NTTaxsMSAh0",
            description: "Architectural framing for self-adaptive LLMs and how adaptation fits into an agent’s lifecycle."
          },
          {
            title: "Large Language Models for Reasoning: A Survey #emoryuniversity #tsinghua  #hkust",
            url: "https://www.youtube.com/watch?v=kMfNiV7bzQU",
            description: "Academic survey of LLM reasoning techniques (e.g., CoT, planning) and their implications for agent architecture and behavior."
          },
          {
            title: "Lifelong Learning for Large Language Model Agents: A roadmap #ieee",
            url: "https://www.youtube.com/watch?v=en-Q92_dH98",
            description: "Architectural and lifecycle considerations enabling durable, continual learning in LLM-based agents."
          },
          {
            title: "MiniMax-01: Scaling Foundation Models with Lightning Attention - 4M tokens context window",
            url: "https://www.youtube.com/watch?v=91jeb8XqaWk",
            description: "How Lightning Attention enables 4M-token context windows and what this means for agent memory, perception, and planning capabilities."
          },
          {
            title: "Titans: Neural Long Term Memory for Enhanced Sequence Modeling #google",
            url: "https://www.youtube.com/watch?v=C7xF_X0AGrg",
            description: "Google research on neural long-term memory architectures that extend sequence modeling—informative for designing robust agent memory components."
          },
          {
            title: "RAD DINO: Scalable Medical Image Encoders Beyond Text Supervision #microsoft",
            url: "https://www.youtube.com/watch?v=FLK4s1zBs9U",
            description: "Research on RAD-DINO image encoders that can strengthen the perception stack in multimodal agent systems."
          },
          {
            title: "LlamaV o1: Step by Step Visual Reasoning in LLMs",
            url: "https://www.youtube.com/watch?v=hCODui9Iuig",
            description: "Explores how LLMs perform step-by-step visual reasoning and what that implies for agent perception-reasoning architecture."
          },
          {
            title: "Search-o1: Augmenting Large Reasoning Models with Agentic Search #tsinghua #agenticai #search",
            url: "https://www.youtube.com/watch?v=N7y41_V0qMo",
            description: "How to integrate an agentic search module into LLM-based reasoning architectures to improve accuracy and robustness."
          },
          {
            title: "Agent Laboratory : An Autonomous LLM Based Research Framework #amd #johnhopkins",
            url: "https://www.youtube.com/watch?v=mIlyM_qtO9I",
            description: "Design and lifecycle considerations for an autonomous research agent framework."
          },
          {
            title: "Cosmos World Foundation Model Platform for Physical AI #nvidia",
            url: "https://www.youtube.com/watch?v=DX-ysGywAqw",
            description: "Overview of a foundation model platform for embodied agents and the architectural components enabling perception-action loops."
          },
          {
            title: "Agents are not enough - Agents + Sims + Assistant - a Trifecta for real-world scenarios #microsoft",
            url: "https://www.youtube.com/watch?v=tQlzyX-eumI",
            description: "Argues for an architecture that blends agents, simulation environments, and a user-facing assistant to handle real-world complexity."
          },
          {
            title: "Scaling semiconductor expertise with Llama-powered Domain-Expert Agents #meta",
            url: "https://www.youtube.com/watch?v=sX7lHiOIWkY",
            description: "Architectural approaches for structuring Llama-powered domain-expert agents to capture and scale semiconductor know-how."
          },
          {
            title: "The evolution and emergence of Enterprise AI tier with Agents",
            url: "https://www.youtube.com/watch?v=sIViGrR7AX4",
            description: "Key architectural patterns and lifecycle stages for agents when used as a foundational enterprise tier."
          },
          {
            title: "OmniPred: Language Models as Universal Regressors #deepmind",
            url: "https://www.youtube.com/watch?v=2MQlBinzmYU",
            description: "DeepMind research on using LLMs as general-purpose regression modules and implications for unified prediction components in agent architectures."
          },
          {
            title: "Large Concept Models: Training, Inference, and Applications #meta",
            url: "https://www.youtube.com/watch?v=Ez7s5Rk5ods",
            description: "Overview of Large Concept Models and how their training and inference inform agent reasoning modules and deployment."
          },
          {
            title: "Building Effective LLMs Agents #anthropic",
            url: "https://www.youtube.com/watch?v=hYKLA9JPOC8",
            description: "Practical guidance on structuring perception, reasoning, memory, and actions for reliable LLM agents."
          },
          {
            title: "InternLM-XComposer2.5-OmniLive: Long-term Streaming Video and Audio Interactions",
            url: "https://www.youtube.com/watch?v=sYEpy9Fmi-Y",
            description: "How a live multimodal agent handles continuous video/audio perception and sustained context within an agent loop."
          },
          {
            title: "Coconut: Latent Reasoning in Large Language Models #meta",
            url: "https://www.youtube.com/watch?v=rpZLnplW2gA",
            description: "Explores how latent reasoning mechanisms in LLMs inform the design and failure modes of an agent’s reasoning module."
          },
          {
            title: "AsyncLM:  Asynchronous Large Language Model Function Calling #yaleuniversity",
            url: "https://www.youtube.com/watch?v=XNBP2OcSRSs",
            description: "Explains how AsyncLM restructures the agent action loop to support non-blocking, event-driven function calls."
          },
          {
            title: "Florence2 VL: A Generative Vision Language Model #microsoft",
            url: "https://www.youtube.com/watch?v=S8dSKQMhoxI",
            description: "Overview of Microsoft’s Florence2 VL and how a generative VLM can serve as the perception and multimodal reasoning backbone in agent architectures."
          },
          {
            title: "Semantic Backpropagation for Language Based Agentic Systems",
            url: "https://www.youtube.com/watch?v=FL--zktdyiI",
            description: "How semantic backpropagation fits into and shapes the lifecycle of language-based agent architectures."
          },
          {
            title: "Bench CoE:  A Framework for Expert Collaboration in LLMs #arxiv",
            url: "https://www.youtube.com/watch?v=BLHOlg22qhE",
            description: "Architectural patterns for structuring expert LLM components and their coordination within an agent system."
          },
          {
            title: "ShowUI: A Vision Language Action Model for GUI Visual Agents #microsoft",
            url: "https://www.youtube.com/watch?v=npol4c0LwUM",
            description: "Explores a model that unifies vision, language, and action to enable GUI interaction, informing architectural design of interactive agents."
          },
          {
            title: "The Two Hop Curse in LLMs - Can LLMs perform two-hop reasoning?",
            url: "https://www.youtube.com/watch?v=DAQeyM5vXw8",
            description: "Explains the 'two-hop curse' as a reasoning failure mode in LLMs and what it means for agent architecture and capabilities."
          },
          {
            title: "Large Language Model Brained GUI Agents: A Survey #arxiv #microsoft",
            url: "https://www.youtube.com/watch?v=TOXMkotNUTE",
            description: "Survey of LLM-driven GUI agent architectures across perception, reasoning, and action loops."
          },
          {
            title: "Multi LLM Agent Systems:  Techniques and Business Perspectives",
            url: "https://www.youtube.com/watch?v=NaXW16fzzFw",
            description: "Architectural techniques for composing multiple LLM agents, including coordination and lifecycle considerations."
          },
          {
            title: "Leave no context behind: Infini attention  Efficient Infinite Context Transformers",
            url: "https://www.youtube.com/watch?v=wWSNAeCfEb4",
            description: "Research talk on Infini-attention enabling efficient infinite-context Transformers and implications for agent memory and long-horizon reasoning."
          },
          {
            title: "LangChain's State of AI Agents Report",
            url: "https://www.youtube.com/watch?v=b0MCpq2eZCU",
            description: "Survey of common agent architecture patterns, components, and lifecycle considerations highlighted by LangChain."
          },
          {
            title: "The Dawn of GUI Agent: A Preliminary Case Study with Claude 3.5 Computer Use",
            url: "https://www.youtube.com/watch?v=rcQRS08ml2w",
            description: "Preliminary case study showing how a GUI-capable agent with Claude 3.5 Computer Use links perception to action across desktop tasks."
          },
          {
            title: "FinRobot - AI Agent for Equity Research and Valuation with Large Language Models #arxiv",
            url: "https://www.youtube.com/watch?v=No7GHxqxB24",
            description: "Architecture breakdown of FinRobot’s perception, reasoning, tool invocation, and valuation outputs."
          },
          {
            title: "Walmart - Triple Modality Fusion Framework #arxiv",
            url: "https://www.youtube.com/watch?v=mxgGeCyvwEM",
            description: "Research overview of a tri-modal fusion method and its implications for multi-modal perception within agent architectures."
          },
          {
            title: "Magentic One - Generalist Multi-Agents",
            url: "https://www.youtube.com/watch?v=cVHRUrpst8E",
            description: "Breakdown of Magentic One’s agent roles, coordination logic, and lifecycle across perception, planning, and action."
          },
          {
            title: "Mapping the Neuro Symbolic AI Landscape by Architectures",
            url: "https://www.youtube.com/watch?v=ObkhFF5vWiw",
            description: "Overview of neuro-symbolic AI architectures and how they inform agent reasoning design and integration."
          },
          {
            title: "#microsoft SMART: Self-learning Meta-strategy Agent for Reasoning Tasks",
            url: "https://www.youtube.com/watch?v=7Ykbc6JBSKw",
            description: "Breaks down an agent architecture designed to coordinate reasoning strategies and self-improvement cycles."
          },
          {
            title: "Why does effective context length of LLMs fall short?",
            url: "https://www.youtube.com/watch?v=DqngljBRpzY",
            description: "Explains architectural reasons LLMs underutilize long context windows and the implications for agent memory and behavior."
          },
          {
            title: "Microsoft RD-Agent - Automatic Research and Development Agent",
            url: "https://www.youtube.com/watch?v=MfXoAKBmExc",
            description: "Architecture overview of an R&D agent’s sense–plan–act loop and iterative experiment lifecycle."
          },
          {
            title: "#microsoft MAIRA-2 :  Grounded Radiology Report Generation",
            url: "https://www.youtube.com/watch?v=Nx9417ReZY0",
            description: "Overview of a multimodal architecture for grounded radiology report generation, illustrating how perception and language generation are integrated."
          },
          {
            title: "Position Paper Agent AI Towards Holistic Intelligence",
            url: "https://www.youtube.com/watch?v=VCIYH0S-LtU",
            description: "Conceptual framing of the architectural components needed to integrate perception, memory, reasoning, and action for holistic agents."
          },
          {
            title: "#microsoft Differential Transformer",
            url: "https://www.youtube.com/watch?v=R7-lJlj0dvk",
            description: "Overview of Microsoft's Differential Transformer and implications of base model design on agent reasoning and lifecycle trade-offs."
          },
          {
            title: "A Prompt-Based Knowledge Graph Foundation Model for Universal In-Context Reasoning",
            url: "https://www.youtube.com/watch?v=iypCuxpNCRc",
            description: "A model-centric approach to integrating structured memory and reasoning for agents via prompt-based knowledge graphs."
          },
          {
            title: "o1 reasoning patterns study",
            url: "https://www.youtube.com/watch?v=YzErCZ01ZZc",
            description: "Analysis of o1’s reasoning patterns to inform how reasoning modules fit into agent architectures and where failures typically emerge."
          },
          {
            title: "Proof of Thought: Neurosymbolic ProgramSynthesis allows Robust and Interpretable Reasoning",
            url: "https://www.youtube.com/watch?v=p0pzz8uehmI",
            description: "Architectural patterns that integrate neural perception with symbolic reasoning for dependable, explainable agent behavior."
          },
          {
            title: "Discovering the Gems in Early Layers Accelerating Long-Context LLMs with 1000x Input Token Reduction",
            url: "https://www.youtube.com/watch?v=GT-k-HFq7Vk",
            description: "Architectural technique for accelerating long-context LLMs by leveraging early-layer signals to reduce input tokens, with implications for agent memory and context handling."
          },
          {
            title: "Ferret UI - Multimodal LLM - Grounded Mobile UI",
            url: "https://www.youtube.com/watch?v=WAoGssQnv0w",
            description: "Model and system design for agents that perceive mobile screens and translate understanding into UI actions."
          },
          {
            title: "What is the Role of Small Models in the LLM Era: A Survey",
            url: "https://www.youtube.com/watch?v=rprjjhaUZq8",
            description: "How small models fit into agent architectures—e.g., routers, cascades, and specialized subcomponents alongside LLMs."
          },
          {
            title: "Rethinking Reflection in Pre-Training",
            url: "https://www.youtube.com/watch?v=Gf67sS-M9eA",
            description: "Discusses how incorporating reflection in pre-training reshapes an agent’s reasoning architecture and lifecycle."
          },
          {
            title: "Open Reasoner Zero",
            url: "https://www.youtube.com/watch?v=neX7F3RKuc0",
            description: "Overview of an open-source reasoning model and how it fits into the reasoning component of agent architectures."
          },
          {
            title: "Thinking Intervention #princetonuniversity #nvidia",
            url: "https://www.youtube.com/watch?v=TVQiEidXeS8",
            description: "Talk on strategies to modify or guide an AI system’s reasoning steps and decision flows."
          },
          {
            title: "Amazon Nova Foundation Models: Technical Report #amazon",
            url: "https://www.youtube.com/watch?v=7sYi0dvKbsc",
            description: "Analysis of Nova model capabilities and how they influence agent perception and reasoning design choices."
          },
          {
            title: "#openai Consistency Models - Diffusion",
            url: "https://www.youtube.com/watch?v=NlQryiImeqA",
            description: "Explains consistency vs diffusion models and how their sampling characteristics can affect agents that depend on generative components."
          },
          {
            title: "GPT1 Transformer Architecture",
            url: "https://www.youtube.com/watch?v=CAQGjGzapCA",
            description: "Overview of GPT‑1’s transformer components that underpin the reasoning core many agent architectures rely on."
          }
        ]
      }
    ],
  
    "agent-learning": [
      {
        id: "youtube-research",
        name: "YouTube Research",
        references: [
          {
            title: "Mixture of Thoughts: Learning to Aggregate What Experts Think, Not Just What They Say",
            url: "https://www.youtube.com/watch?v=hShqRxiF53U",
            description: "Learning approaches that adaptively weight and integrate expert reasoning traces to improve agent performance."
          },
          {
            title: "Efficient and Transferable Agentic Knowledge Graph RAG via Reinforcement Learning #mit #ucf #ibm",
            url: "https://www.youtube.com/watch?v=SEPBg4TnSk8",
            description: "Demonstrates using reinforcement learning to adapt agentic RAG policies for efficiency and transferability."
          },
          {
            title: "The Era of Real-World Human Interaction: RL from User Conversations #fair #johnhopkins #meta",
            url: "https://www.youtube.com/watch?v=geolPWXoEm8",
            description: "How real-world conversational feedback can drive online reinforcement learning and continuous agent adaptation."
          },
          {
            title: "Deep Researcher with Test-Time Diffusion (TTD-DR) #deepmind",
            url: "https://www.youtube.com/watch?v=7U1PodHCxq0",
            description: "Inference-time adaptation via diffusion to boost agent research quality without retraining."
          },
          {
            title: "Thinking Augmented Pretraining #microsoft",
            url: "https://www.youtube.com/watch?v=bUYMw1fUgi4",
            description: "Research talk on augmenting pretraining with thinking signals to enhance reasoning capabilities and downstream agent performance."
          },
          {
            title: "Scaling Agents via Continual Pre-training",
            url: "https://www.youtube.com/watch?v=tvmAA43ijNo",
            description: "How continual pre-training can scale agent capabilities while managing drift and preserving stable behavior."
          },
          {
            title: "Autonomous Code Evolution Meets NP-Completeness #nvidia",
            url: "https://www.youtube.com/watch?v=ypIHfjR9VwA",
            description: "Iterative self-improvement mechanisms where agents adapt behavior or code over successive cycles."
          },
          {
            title: "Parallel-R1 Towards Parallel Thinking via Reinforcement Learning",
            url: "https://www.youtube.com/watch?v=1PYMWFxKT3s",
            description: "Discusses how reinforcement signals can adapt agent reasoning dynamics toward more effective parallel thinking."
          },
          {
            title: "Bridging the Humanâ€“AI Knowledge Gap - Concept Discovery and Transfer in AlphaZero #deepmind",
            url: "https://www.youtube.com/watch?v=WirApf_IHbk",
            description: "How AlphaZero learns and transfers human-interpretable concepts, illustrating practical mechanisms of agent learning and adaptation."
          },
          {
            title: "Emerging Hierarchial Reasoning in LLMs through reinforcement learning",
            url: "https://www.youtube.com/watch?v=VuMwZmTr_KQ",
            description: "Shows how reinforcement learning drives emergent reasoning structures and adaptation in LLM-based agents."
          },
          {
            title: "rstar2-agent - Agentic Reinforcement Learning for Reasoning #microsoft",
            url: "https://www.youtube.com/watch?v=pUGuSEVZVMQ",
            description: "Using reinforcement signals to adapt and improve an agent's reasoning policies over time."
          },
          {
            title: "Agent Lightning: Train any AI Agents with Reinforcement Learning #microsoft",
            url: "https://www.youtube.com/watch?v=5ny1UR3OYPA",
            description: "Approaches to training and adapting agent behavior using reinforcement learning and related methods."
          },
          {
            title: "Momento: Fine tuning Agents without fine tuning LLMs",
            url: "https://www.youtube.com/watch?v=Y0meQjKbFdo",
            description: "Improving agent behavior through memory, feedback, and policy updates without modifying base LLM weights."
          },
          {
            title: "STEP - Stepwise Curriculum Learning for Context-KnowledgeFusion in Conversational Recommendation",
            url: "https://www.youtube.com/watch?v=d55TP78abOI",
            description: "Stepwise curriculum learning approach that progressively fuses dialogue context and external knowledge to improve conversational recommendation models."
          },
          {
            title: "R-Zero - Self-Evolving Reasoning LLM from Zero Data (listen in 12 languages)",
            url: "https://www.youtube.com/watch?v=bDkRYIPpsiY",
            description: "How a reasoning LLM can autonomously adapt and improve its capabilities without labeled datasets."
          },
          {
            title: "Self Evolving Computer Use Agent",
            url: "https://www.youtube.com/watch?v=uqYfbGFq-Rk",
            description: "Approaches for agents that refine their policies and skills safely through self-improvement loops."
          },
          {
            title: "AI-based Intelligent Tutoring Systems",
            url: "https://www.youtube.com/watch?v=0BbKNt-3zUE",
            description: "Approaches for adapting tutoring agents to changing learner profiles without destabilizing behavior."
          },
          {
            title: "Foundation Model Self-Play (FMSP)",
            url: "https://www.youtube.com/watch?v=ee4o-GIymJw",
            description: "Overview of using foundation model self-play to iteratively improve agent reasoning and behavior."
          },
          {
            title: "Q-chunking : Reinforcement Learning with Action Chunking #berkeley",
            url: "https://www.youtube.com/watch?v=Zsal9JD1etA",
            description: "Research on learning macro-actions in reinforcement learning to adapt agent behavior more efficiently."
          },
          {
            title: "Embodied AI Agents: Modeling the World #meta",
            url: "https://www.youtube.com/watch?v=KfP9aME4Xyg",
            description: "Learning world models from interaction to improve agent behavior and adaptation over time."
          },
          {
            title: "Think Small, Act Big: Primitive Prompt Learning for Lifelong Robot Manipulation",
            url: "https://www.youtube.com/watch?v=TItySReMwkk",
            description: "Research talk on learning small prompt-based action primitives to enable lifelong, adaptable robot manipulation behaviors."
          },
          {
            title: "Bridging Offline and Online Reinforcement Learning for LLMs #meta",
            url: "https://www.youtube.com/watch?v=qbGdmQKq5Rk",
            description: "Explores how LLMs can adapt using both static datasets and live interaction signals for sustained improvement."
          },
          {
            title: "Learning to Teach than to Solve - Reinforcement Learned Teacher #sakana",
            url: "https://www.youtube.com/watch?v=jwo-HTsS2oA",
            description: "Explains a reinforcement-learned teacher that adapts to boost a student agent’s performance over time."
          },
          {
            title: "Self-Adapting Language Models (SEAL) #massachusettsinstituteoftechnology",
            url: "https://www.youtube.com/watch?v=A4C9U2oSJnE",
            description: "MIT talk on SEAL exploring approaches for self-adapting language models to improve performance through feedback-driven, iterative updates."
          },
          {
            title: "Reinforcement Pre-Training for LLM #microsoft",
            url: "https://www.youtube.com/watch?v=M2JRZQLd2Xs",
            description: "Overview of using reinforcement signals during pre-training to improve LLM decision-making and reliability."
          },
          {
            title: "Darwin GÃ¶del Machine - Openâ€Ended, Selfâ€“Improving AI Systems",
            url: "https://www.youtube.com/watch?v=MFPQaln6xSo",
            description: "Concepts and techniques for agents that can continuously adapt and self-improve without destabilizing behavior."
          },
          {
            title: "Learning to Reason without External Rewards #ucberkeley",
            url: "https://www.youtube.com/watch?v=EYRibukXsbY",
            description: "UC Berkeley talk on enabling agents to develop reasoning skills via internal/self-generated learning signals instead of external rewards."
          },
          {
            title: "Chain of Model Learning #microsoft",
            url: "https://www.youtube.com/watch?v=2RY8UnAykgQ",
            description: "Overview of a chained learning approach where models iteratively improve or transfer capabilities for more adaptable agents."
          },
          {
            title: "Deepseek-Prover-v2: Reinforcement Learning for Subgoal Decomposition",
            url: "https://www.youtube.com/watch?v=4kkwAt3eK6k",
            description: "Demonstrates how agents can learn and adapt reasoning strategies via RL to produce stable subgoal-driven solutions."
          },
          {
            title: "On the generalization of language models from in-context learning and finetuning #deepmind #stanford",
            url: "https://www.youtube.com/watch?v=XIq4ENmxhuA",
            description: "Insights into how LLMs adapt via prompts versus parameter updates and what that means for agent learning dynamics."
          },
          {
            title: "Stop summation: Min-Form Credit Assignment Is AllProcess Reward Model Needs for Reasoning",
            url: "https://www.youtube.com/watch?v=PW84mxivHe0",
            description: "How agents improve reasoning through process-level rewards and targeted credit assignment mechanisms."
          },
          {
            title: "Synthetic Data Generation & Multi-Step RL for Reasoning & Tool Use - SWiRL #deepmind #stanford",
            url: "https://www.youtube.com/watch?v=4eInkB-eIMk",
            description: "Techniques for improving agent behavior via synthetic data pipelines and multi-step reinforcement learning."
          },
          {
            title: "Rethinking Reflection in Pre-Training",
            url: "https://www.youtube.com/watch?v=Gf67sS-M9eA",
            description: "Explores integrating or reassessing reflection during pre-training to improve agents’ learned reasoning and adaptability."
          },
          {
            title: "Search-R1 : Reasoning + Search + Reinforcement Learning",
            url: "https://www.youtube.com/watch?v=uTPlUvi_44Q",
            description: "How agents learn to reason better by integrating search procedures with reinforcement learning signals."
          },
          {
            title: "L1: Controlling How Long A Reasoning Model Thinks with RL #carnegiemellonuniversity",
            url: "https://www.youtube.com/watch?v=zkacnMne-do",
            description: "Techniques for adapting agent reasoning behavior—like step count or deliberation length—via RL."
          },
          {
            title: "Large Memory Models (LM2)",
            url: "https://www.youtube.com/watch?v=tziPcZn9vig",
            description: "Techniques for enabling agents to adapt over time via memory-augmented learning and cross-session retention."
          },
          {
            title: "Bootstrap Your Own Context Length #microsoftresearch",
            url: "https://www.youtube.com/watch?v=QmH7nx3wJGA",
            description: "Self-bootstrapping approach for adapting models to longer contexts while preserving prior behavior."
          },
          {
            title: "Distilling Multimodal LLMs for Autonomous Driving #johnhopkins",
            url: "https://www.youtube.com/watch?v=zH6BgJEQxGg",
            description: "Focuses on knowledge distillation techniques to transfer capabilities from large multimodal teachers to compact, reliable autonomous driving agents."
          },
          {
            title: "TransformerÂ²: Self Adaptive LLMs",
            url: "https://www.youtube.com/watch?v=NTTaxsMSAh0",
            description: "Overview of approaches that let LLMs adapt their behavior over time without full retraining."
          },
          {
            title: "Lifelong Learning for Large Language Model Agents: A roadmap #ieee",
            url: "https://www.youtube.com/watch?v=en-Q92_dH98",
            description: "A roadmap for continual learning strategies that let LLM agents improve over time without forgetting or unsafe drift."
          },
          {
            title: "Deep Reinforcement Learning for Cloud Computing Resource Management",
            url: "https://www.youtube.com/watch?v=CzL5R2pWnuI",
            description: "Explores how deep RL policies can autonomously optimize cloud resource allocation and scheduling under changing workloads."
          },
          {
            title: "Scaling Search and Learning: Reproducing OpenAI's o1 - A Reinforcement Learning Roadmap",
            url: "https://www.youtube.com/watch?v=rgkPlQ63yUA",
            description: "Approaches to iteratively improve agent reasoning and behavior using reinforcement learning and search-driven training signals."
          },
          {
            title: "LLM Adaptation in Multi Agent Contexts - Can Large Language Models Adapt to Other Agents In-Context?",
            url: "https://www.youtube.com/watch?v=1fL3UoJw1p0",
            description: "Examines whether and how LLMs can adapt their behavior in-context in response to other agents."
          },
          {
            title: "Hypotheses to Theories:  Rule Learning for LLMs #deepmind",
            url: "https://www.youtube.com/watch?v=TbOVeWQnUOY",
            description: "DeepMind talk on rule-learning approaches that help LLMs consolidate reasoning from tentative hypotheses into dependable theories."
          },
          {
            title: "Semantic Backpropagation for Language Based Agentic Systems",
            url: "https://www.youtube.com/watch?v=FL--zktdyiI",
            description: "Technique for propagating semantic feedback through agent steps to improve behavior in language-based agents."
          },
          {
            title: "Natural Language Reinforcement Learning #arxiv",
            url: "https://www.youtube.com/watch?v=lFOJldnAZA8",
            description: "How agents learn and adapt policies from natural language feedback and reward structures."
          },
          {
            title: "The Surprising Effectiveness of Test Time Training for Abstract Reasoning",
            url: "https://www.youtube.com/watch?v=RTAn1uapM34",
            description: "Explores how test-time training adapts models at inference to boost abstract reasoning performance."
          },
          {
            title: "Personalization of Large Language Models - Survey #arxiv",
            url: "https://www.youtube.com/watch?v=95kXxvlM4jY",
            description: "Overview of adapting LLM behavior to user-specific preferences and context while managing drift and stability."
          },
          {
            title: "#microsoft SMART: Self-learning Meta-strategy Agent for Reasoning Tasks",
            url: "https://www.youtube.com/watch?v=7Ykbc6JBSKw",
            description: "Microsoft’s SMART presents a self-learning agent that adapts its reasoning strategies over time to improve task outcomes."
          },
          {
            title: "Intelligence at the edge of Chaos - Complexity fosters learning",
            url: "https://www.youtube.com/watch?v=8xeyhnNSZdc",
            description: "Insights on how operating near the 'edge of chaos' can enhance adaptive learning dynamics in AI agents."
          }
        ]
      }
    ],
  
    "agent-deployment": [
      {
        id: "youtube-research",
        name: "YouTube Research",
        references: [
          {
            title: "Microsoft Agent Framework #azure",
            url: "https://www.youtube.com/watch?v=7yVMzrrx29Y",
            description: "How to deploy, observe, and operate agents on Azure using Microsoft's agent framework."
          },
          {
            title: "The Maturation Path of Agentic AI - Moving from Prototype to Governed Ecosystems #azure",
            url: "https://www.youtube.com/watch?v=5k54qs56qxE",
            description: "Practices for taking agents from prototype to reliable, observable, and safe production deployment."
          },
          {
            title: "LLM Agents for Interactive Workflow Provenance - Edge-Cloud-HPC Continuum #oakridge #argonne",
            url: "https://www.youtube.com/watch?v=_SE4EVsMsds",
            description: "Operational considerations for deploying and observing LLM agents across heterogeneous compute tiers."
          },
          {
            title: "Defeating Nondeterminism in LLM Inference #thinkingmachines",
            url: "https://www.youtube.com/watch?v=yCDjgImQOA8",
            description: "Operational practices for reproducible, deterministic LLM inference across environments and model serving stacks."
          },
          {
            title: "Speed always wins - 7 efficient architectures for LLMs (listen in 12 languages)",
            url: "https://www.youtube.com/watch?v=s5PYQn_Q4GQ",
            description: "How architecture choices translate into faster, safer deployment of LLM-powered agents in production."
          },
          {
            title: "DeltaLLM - Compression Technique to reduce memory footprint",
            url: "https://www.youtube.com/watch?v=OetcgWkoKpk",
            description: "DeltaLLM compression approach to shrink LLM memory use for more efficient production deployment."
          },
          {
            title: "Native Sparse Attention - Turning your Prius to Ferrari",
            url: "https://www.youtube.com/watch?v=du43waySYzU",
            description: "Techniques for enabling native sparse attention to significantly speed up LLM inference for production agent workloads."
          },
          {
            title: "Distilling Multimodal LLMs for Autonomous Driving #johnhopkins",
            url: "https://www.youtube.com/watch?v=zH6BgJEQxGg",
            description: "Addresses compressing and operationalizing multimodal models to meet on-vehicle compute, latency, and reliability constraints in autonomy systems."
          },
          {
            title: "Agent Infrastructure for AI Systems",
            url: "https://www.youtube.com/watch?v=VKbWBUcYeak",
            description: "Principles for deploying and operating agents with reproducible builds and safe rollouts."
          },
          {
            title: "Deploying Foundation Model Powered Agent Services: A Survey",
            url: "https://www.youtube.com/watch?v=QI6wjtyMstY",
            description: "A survey of strategies, patterns, and pitfalls for deploying foundation-model-based agent services in production."
          },
          {
            title: "Puzzle: Distillation Based NAS for Inference Optimized LLMs #nvidia",
            url: "https://www.youtube.com/watch?v=yjBI_FGjdWY",
            description: "Shows how distillation-based NAS can reduce latency and cost for LLM inference, improving agent deployment efficiency."
          },
          {
            title: "A Taxonomy of AgentOps for Enabling Observability of Foundation Model based Agents",
            url: "https://www.youtube.com/watch?v=y1Elc-Olgvk",
            description: "Operational patterns for deploying agents with robust monitoring, logging, and tracing to support observability."
          },
          {
            title: "What is the Role of Small Models in the LLM Era: A Survey",
            url: "https://www.youtube.com/watch?v=rprjjhaUZq8",
            description: "Operational trade-offs of deploying small models with LLMs, including latency, cost, footprint, and serving patterns."
          }
        ]
      }
    ],
  
    "architecture-platform-operations": [
      {
        id: "youtube-research",
        name: "YouTube Research",
        references: [
          {
            title: "Microsoft Agent Framework #azure",
            url: "https://www.youtube.com/watch?v=7yVMzrrx29Y",
            description: "Platform and infrastructure considerations for running agent workloads on Azure with Microsoft's framework."
          },
          {
            title: "The Maturation Path of Agentic AI - Moving from Prototype to Governed Ecosystems #azure",
            url: "https://www.youtube.com/watch?v=5k54qs56qxE",
            description: "Guidance on building the platform and operational backbone (e.g., on Azure) needed to support a governed agent ecosystem."
          },
          {
            title: "Defeating Nondeterminism in LLM Inference #thinkingmachines",
            url: "https://www.youtube.com/watch?v=yCDjgImQOA8",
            description: "Platform-level guidance on configuring inference stacks (CUDA/PyTorch settings, precision, threading) for deterministic LLM behavior."
          },
          {
            title: "Speed always wins - 7 efficient architectures for LLMs (listen in 12 languages)",
            url: "https://www.youtube.com/watch?v=s5PYQn_Q4GQ",
            description: "Practical guidance on choosing and operating LLM serving architectures to maximize latency, throughput, and cost efficiency."
          },
          {
            title: "BitNet b1.58 2B parameters 4T tokens - Native 1-bit LLM #microsoft",
            url: "https://www.youtube.com/watch?v=5vR0-UW2tqA",
            description: "Overview of BitNet b1.58’s native 1-bit LLM and its implications for resource-efficient model serving and platform operations."
          },
          {
            title: "Pioneering AI-First Mindset - Large Enterprise Journey to build an AI Native Subsidary",
            url: "https://www.youtube.com/watch?v=Z_8O0df4R3Q",
            description: "Guidance on platform, infrastructure, and operational baselines to support AI-native enterprise build-outs."
          },
          {
            title: "DeltaLLM - Compression Technique to reduce memory footprint",
            url: "https://www.youtube.com/watch?v=OetcgWkoKpk",
            description: "Platform implications of DeltaLLM-style compression for running LLM-based agents efficiently at scale."
          },
          {
            title: "Data Architectures for the intelligence age - A less technical guide to fast track AI in Business",
            url: "https://www.youtube.com/watch?v=sXZtNN6jKVY",
            description: "How to align platform architecture and operations with AI needs, from infrastructure through service enablement."
          },
          {
            title: "Agent Infrastructure for AI Systems",
            url: "https://www.youtube.com/watch?v=VKbWBUcYeak",
            description: "Infrastructure and platform practices for running agent systems at scale."
          },
          {
            title: "Cosmos World Foundation Model Platform for Physical AI #nvidia",
            url: "https://www.youtube.com/watch?v=DX-ysGywAqw",
            description: "Discussion of platform-level infrastructure and operations to deploy and scale physical AI foundation models, potentially leveraging NVIDIA tooling."
          },
          {
            title: "Deep Reinforcement Learning for Cloud Computing Resource Management",
            url: "https://www.youtube.com/watch?v=CzL5R2pWnuI",
            description: "Shows applying RL-driven control to infrastructure operations for smarter autoscaling and resource scheduling in cloud platforms."
          },
          {
            title: "The evolution and emergence of Enterprise AI tier with Agents",
            url: "https://www.youtube.com/watch?v=sIViGrR7AX4",
            description: "How to design and operate an enterprise-grade agent platform layer, from core infrastructure to reliability and scale."
          },
          {
            title: "Deploying Foundation Model Powered Agent Services: A Survey",
            url: "https://www.youtube.com/watch?v=QI6wjtyMstY",
            description: "Platform and infrastructure considerations for operating FM-powered agent services reliably and at scale."
          },
          {
            title: "Build something great with Open Source AI Stack",
            url: "https://www.youtube.com/watch?v=KrEX1hoUXrw",
            description: "Overview of assembling an open-source AI platform stack and the operational considerations to build and run AI applications."
          },
          {
            title: "Puzzle: Distillation Based NAS for Inference Optimized LLMs #nvidia",
            url: "https://www.youtube.com/watch?v=yjBI_FGjdWY",
            description: "Explores using distillation and neural architecture search to build LLMs optimized for inference performance on NVIDIA platforms."
          },
          {
            title: "Native Sparse Attention - Turning your Prius to Ferrari",
            url: "https://www.youtube.com/watch?v=du43waySYzU",
            description: "How to leverage native sparse attention kernels to optimize platform performance and efficiency for LLM-backed agent systems."
          }
        ]
      }
    ],
  
    "data-knowledge-operations": [
      {
        id: "youtube-research",
        name: "YouTube Research",
        references: [
          {
            title: "Efficient and Transferable Agentic Knowledge Graph RAG via Reinforcement Learning #mit #ucf #ibm",
            url: "https://www.youtube.com/watch?v=SEPBg4TnSk8",
            description: "Explores building and leveraging knowledge graphs for agentic RAG systems, focusing on efficient retrieval pipelines and durable context."
          },
          {
            title: "Effective Context Engineering #anthropic",
            url: "https://www.youtube.com/watch?v=oTGsfiBhVHU",
            description: "Anthropic session on structuring and supplying the right knowledge into LLM context windows for more reliable performance."
          },
          {
            title: "Autonomous Data Agents",
            url: "https://www.youtube.com/watch?v=KdhQuDNVERA",
            description: "How to structure data pipelines and knowledge governance so autonomous agents can reliably access, transform, and use enterprise data."
          },
          {
            title: "Towards an AI Augmented Textbook #google",
            url: "https://www.youtube.com/watch?v=IMypm62inVw",
            description: "Approaches to transform textbook materials into governed, queryable knowledge that reliably powers agentic learning tools."
          },
          {
            title: "OnePiece: Bringing Context Engineering and Reasoning to Industrial Cascade Ranking System",
            url: "https://www.youtube.com/watch?v=4tpOzCcMOpw",
            description: "Industrial case study on engineering and governing context/knowledge pipelines to enable effective LLM-style reasoning in cascade ranking systems."
          },
          {
            title: "LLM Agents for Interactive Workflow Provenance - Edge-Cloud-HPC Continuum #oakridge #argonne",
            url: "https://www.youtube.com/watch?v=_SE4EVsMsds",
            description: "How LLM agents capture and surface workflow lineage to strengthen data governance across edge, cloud, and HPC systems."
          },
          {
            title: "Paper2Agent: Reimagining Research Papers AsInteractive and Reliable AI Agents #stanford",
            url: "https://www.youtube.com/watch?v=y23MXVESIfA",
            description: "Methods to structure and govern research paper knowledge as dependable agent context."
          },
          {
            title: "Schema Inference for Tabular Data Repositories using LLMs",
            url: "https://www.youtube.com/watch?v=H_oQLs6xmYs",
            description: "How to use LLMs to infer schemas from tabular data repositories to improve data integration and agent context quality."
          },
          {
            title: "Scientific Large Language Models: From Data Foundations to Agent Frontiers",
            url: "https://www.youtube.com/watch?v=jwkczow1T2Y",
            description: "Foundational practices for data pipelines and knowledge governance that feed scientific LLMs and agents."
          },
          {
            title: "On the Theoretical Limitations of Embedding-Based Retrieval #deepmind",
            url: "https://www.youtube.com/watch?v=5okkh7oUtJo",
            description: "DeepMind talk on inherent limits of vector embeddings for retrieval and implications for building reliable RAG pipelines."
          },
          {
            title: "SciToolAgent -  A Knowledge Graphâ€“Driven Scientific Agent for Multi-Tool Integration",
            url: "https://www.youtube.com/watch?v=UDLaVHNcXY0",
            description: "Shows how a knowledge graph structures domain knowledge and tool metadata to drive reliable agent decisions."
          },
          {
            title: "A Survey of Context Engineering for Large Language Models",
            url: "https://www.youtube.com/watch?v=Dh_SPv55UA8",
            description: "Techniques for building and governing retrieval pipelines that deliver high-quality context to LLMs."
          },
          {
            title: "ARAG - Agentic Retrieval-Augmented Generation for Personalized Recommendation #walmart",
            url: "https://www.youtube.com/watch?v=sIDy_3PN84g",
            description: "Shows how retrieval and knowledge pipelines feed agentic recommendation systems."
          },
          {
            title: "MemOS - A Memory Operating System for AI Systems",
            url: "https://www.youtube.com/watch?v=zf4WXEdBW6c",
            description: "Covers operational approaches to structuring, storing, and retrieving agent memory as part of a durable knowledge supply chain."
          },
          {
            title: "AI4Research: A Survey of Artificial Intelligence for Scientific Research",
            url: "https://www.youtube.com/watch?v=UWb6dK5wo30",
            description: "Overview of AI methods that curate and leverage scientific data and knowledge to accelerate research."
          },
          {
            title: "Rethinking Memory in AI: Taxonomy, Operations, Topics, and Future Directions #hkust",
            url: "https://www.youtube.com/watch?v=wJbWmMgY7vc",
            description: "Overview of memory operations and knowledge store design for reliable agent context and retrieval."
          },
          {
            title: "Rethinking Data Analysis in the age of LLMs #ucla",
            url: "https://www.youtube.com/watch?v=fWjvGz8gfTw",
            description: "Explores modernizing data analysis workflows and data pipelines in the LLM era to ensure trustworthy, usable context."
          },
          {
            title: "The era of experience - welcome to agent driven experience data",
            url: "https://www.youtube.com/watch?v=u9NJCbPLnb8",
            description: "How to engineer agent-driven experience data pipelines and governance for durable, trustworthy agent context."
          },
          {
            title: "CoRAG - Chain-of-Retrieval Augmented Generation #microsoft",
            url: "https://www.youtube.com/watch?v=WoRQ1krraXQ",
            description: "Covers structuring retrieval pipelines and knowledge grounding strategies to improve RAG reliability and context quality."
          },
          {
            title: "RAPTOR: Recursive Abstractive Processing for Tree-Organized Retrieval #stanforduniversity",
            url: "https://www.youtube.com/watch?v=TTl6Q0w5bSU",
            description: "Stanford talk on RAPTOR’s tree-structured, abstractive retrieval method to improve context construction for LLM systems."
          },
          {
            title: "Enhanced Customer Experience - Use Generative AI for Disentangled Metadata Modeling",
            url: "https://www.youtube.com/watch?v=_MdKtp-7ndw",
            description: "Applying generative AI to build disentangled metadata models that strengthen knowledge governance and improve downstream CX and agent context."
          },
          {
            title: "Flattening HNSW:  Hub Highways in High Dimensions",
            url: "https://www.youtube.com/watch?v=KgNadTyHUrk",
            description: "Deep dive into optimizing HNSW-based vector search for high-dimensional retrieval to strengthen agent knowledge pipelines."
          },
          {
            title: "Synergizing LLMs and Knowledge Graphs for Software Repository Question Answering #arxiv",
            url: "https://www.youtube.com/watch?v=7387PCJrMSs",
            description: "Research on combining LLMs with knowledge graphs to power structured retrieval and question answering over software repositories."
          },
          {
            title: "Deepmind's Understanding LLM Embeddings for Regression",
            url: "https://www.youtube.com/watch?v=xU_7AB-jbWQ",
            description: "DeepMind research on applying and calibrating LLM embeddings for regression, with takeaways for building reliable embedding-based data pipelines."
          },
          {
            title: "Accelerating Knowledge Graph and Ontology Engineering with Large Language Models #arxiv",
            url: "https://www.youtube.com/watch?v=rhuYA3waNkQ",
            description: "Research overview on LLM-assisted knowledge graph and ontology engineering for reliable agent context."
          },
          {
            title: "Graph Foundation Model #arxiv #notredame",
            url: "https://www.youtube.com/watch?v=-oLIwrCU8Es",
            description: "Overview of Graph Foundation Models and their role in knowledge graphs and graph representation learning."
          },
          {
            title: "Data, AI and Multi-Product - Economics, Moats and Value",
            url: "https://www.youtube.com/watch?v=OpJDIoQy8EU",
            description: "Practices to build trustworthy data pipelines and governance that create durable AI advantages."
          },
          {
            title: "Contextual Document Embeddings",
            url: "https://www.youtube.com/watch?v=yZRbmBv-Cd0",
            description: "Techniques for creating contextual document embeddings to improve retrieval quality and strengthen agent knowledge context."
          },
          {
            title: "A Prompt-Based Knowledge Graph Foundation Model for Universal In-Context Reasoning",
            url: "https://www.youtube.com/watch?v=iypCuxpNCRc",
            description: "Research on using knowledge graphs and prompts to provide universal in-context reasoning across tasks."
          },
          {
            title: "Real world Industry scenario - Failure Analysis Agent",
            url: "https://www.youtube.com/watch?v=sNg0U04qB1c",
            description: "Engineer reliable data and knowledge supply chains that power agent-led failure diagnostics."
          }
        ]
      }
    ],
  
    "fine-tuning": [
      {
        id: "youtube-research",
        name: "YouTube Research",
        references: [
          {
            title: "Efficient and Transferable Agentic Knowledge Graph RAG via Reinforcement Learning #mit #ucf #ibm",
            url: "https://www.youtube.com/watch?v=SEPBg4TnSk8",
            description: "Applies reinforcement fine-tuning to optimize knowledge-graph RAG behavior and retrieval decision-making."
          },
          {
            title: "The Era of Real-World Human Interaction: RL from User Conversations #fair #johnhopkins #meta",
            url: "https://www.youtube.com/watch?v=geolPWXoEm8",
            description: "Using user-conversation signals for reinforcement fine-tuning to improve dialogue agent quality and alignment."
          },
          {
            title: "Parallel-R1 Towards Parallel Thinking via Reinforcement Learning",
            url: "https://www.youtube.com/watch?v=1PYMWFxKT3s",
            description: "Explores using reinforcement learning (RFT/R1) to induce parallel reasoning behaviors and lift reasoning performance."
          },
          {
            title: "Emerging Hierarchial Reasoning in LLMs through reinforcement learning",
            url: "https://www.youtube.com/watch?v=VuMwZmTr_KQ",
            description: "Explores how reinforcement fine-tuning can induce hierarchical reasoning capabilities in LLMs."
          },
          {
            title: "rstar2-agent - Agentic Reinforcement Learning for Reasoning #microsoft",
            url: "https://www.youtube.com/watch?v=pUGuSEVZVMQ",
            description: "Applying reinforcement-based fine-tuning approaches (e.g., RFT) to enhance model reasoning performance."
          },
          {
            title: "Experimental AI & Human in the discussion Podcast: OpenThoughts - Data Receipes for Reasoning Models",
            url: "https://www.youtube.com/watch?v=GuLQ8f3fYt0",
            description: "Methods for fine-tuning models on reasoning-focused datasets to improve reliability and structured thinking."
          },
          {
            title: "R-Zero - Self-Evolving Reasoning LLM from Zero Data (listen in 12 languages)",
            url: "https://www.youtube.com/watch?v=bDkRYIPpsiY",
            description: "Discussion of zero-data, reinforcement-style training to improve reasoning LLMs and how it compares to SFT/DPO/RFT choices."
          },
          {
            title: "Beyond Binary Rewards - LMs to Reason About Their Uncertainty #mit",
            url: "https://www.youtube.com/watch?v=2evp7dhJZqI",
            description: "Discusses training strategies that leverage uncertainty-informed rewards to improve model behavior beyond binary feedback."
          },
          {
            title: "Bridging Offline and Online Reinforcement Learning for LLMs #meta",
            url: "https://www.youtube.com/watch?v=qbGdmQKq5Rk",
            description: "Talk on combining offline and online RL strategies to improve LLM behavior via reinforcement fine-tuning."
          },
          {
            title: "Direct Reasoning Optimization - RÂ³ #microsoft",
            url: "https://www.youtube.com/watch?v=_aG2aamL2F0",
            description: "Overview of Microsoft's R³: a direct reasoning optimization technique to post-train models for stronger reasoning performance."
          },
          {
            title: "Learning to Reason without External Rewards #ucberkeley",
            url: "https://www.youtube.com/watch?v=EYRibukXsbY",
            description: "Overview of fine-tuning approaches that leverage internal or AI feedback to teach reasoning without explicit external reward signals."
          },
          {
            title: "Chain of Model Learning #microsoft",
            url: "https://www.youtube.com/watch?v=2RY8UnAykgQ",
            description: "Explains a sequential fine-tuning/distillation pipeline that transfers knowledge across models to enhance performance."
          },
          {
            title: "J1: Incentivizing thinking LLM-as-a-judge via reinforcement learning #meta",
            url: "https://www.youtube.com/watch?v=9cCQiZtVV44",
            description: "Covers applying reinforcement learning with judge feedback to train models to reason more effectively."
          },
          {
            title: "All roads lead to likelihood: The importance of Reinforcement Learning in Fine tuning",
            url: "https://www.youtube.com/watch?v=aWDb1UNlS0A",
            description: "Explains how RL-based approaches (e.g., RLHF/RFT) relate to likelihood-driven fine-tuning methods (SFT/DPO) and when each is most effective."
          },
          {
            title: "Deepseek-Prover-v2: Reinforcement Learning for Subgoal Decomposition",
            url: "https://www.youtube.com/watch?v=4kkwAt3eK6k",
            description: "Uses reinforcement learning to train an LLM to decompose problems into subgoals, showcasing RFT for improved mathematical reasoning."
          },
          {
            title: "On the generalization of language models from in-context learning and finetuning #deepmind #stanford",
            url: "https://www.youtube.com/watch?v=XIq4ENmxhuA",
            description: "Research talk comparing generalization from finetuning and in-context learning in LLMs and implications for training choices."
          },
          {
            title: "How LLMs capture and represent domain-specific knowledge #microsoft",
            url: "https://www.youtube.com/watch?v=VIG6ympy3es",
            description: "Explores methods for encoding domain-specific knowledge into LLMs via targeted fine-tuning and training strategies."
          },
          {
            title: "Tina - Tiny Reasoning Models via LoRA",
            url: "https://www.youtube.com/watch?v=vax_INU5DaE",
            description: "How LoRA-based fine-tuning can equip small models with reasoning capabilities."
          },
          {
            title: "Stop summation: Min-Form Credit Assignment Is AllProcess Reward Model Needs for Reasoning",
            url: "https://www.youtube.com/watch?v=PW84mxivHe0",
            description: "Training approaches for reasoning using process-aware reward models and credit assignment within SFT/DPO/RFT frameworks."
          },
          {
            title: "Synthetic Data Generation & Multi-Step RL for Reasoning & Tool Use - SWiRL #deepmind #stanford",
            url: "https://www.youtube.com/watch?v=4eInkB-eIMk",
            description: "How synthetic data and reinforcement fine-tuning can train agents for stronger multi-step reasoning and tool use."
          },
          {
            title: "A Survey of Frontiers in LLM Reasoning: Inference Scaling, Learning to Reason and Agentic Systems",
            url: "https://www.youtube.com/watch?v=lkkKqGwvvvo",
            description: "Discussion of training approaches for reasoning, including supervised and reinforcement-style fine-tuning methods."
          },
          {
            title: "Inference-Time Scaling for Generalist Reward Modeling #deepseek",
            url: "https://www.youtube.com/watch?v=Yh6dgP-t-oQ",
            description: "Discussion of generalist reward modeling and how inference-time compute can improve alignment and selection within DPO/RFT-style workflows."
          },
          {
            title: "Search-R1 : Reasoning + Search + Reinforcement Learning",
            url: "https://www.youtube.com/watch?v=uTPlUvi_44Q",
            description: "Overview of how RL-based fine-tuning paired with search improves LLM reasoning performance."
          },
          {
            title: "L1: Controlling How Long A Reasoning Model Thinks with RL #carnegiemellonuniversity",
            url: "https://www.youtube.com/watch?v=zkacnMne-do",
            description: "Applying reinforcement learning to fine-tune how long a model deliberates, balancing performance and compute."
          },
          {
            title: "LLM Post-Training",
            url: "https://www.youtube.com/watch?v=_CyGMleCO_E",
            description: "Overview of post-training techniques (SFT, DPO, RLHF/RFT) to align and improve LLM behavior after pretraining."
          },
          {
            title: "Why Model Stops Learning: Grokking, Numerical Stability and Softmax Collapse #imperialcollegelondon",
            url: "https://www.youtube.com/watch?v=Azz5Gn6l3TM",
            description: "Explains why models stop learning by covering grokking, numerical stability, and softmax collapse, with practical implications for robust fine-tuning."
          },
          {
            title: "rStar-Math: Small LLMs Can Master Math Reasoning with Self-Evolved Deep Thinking #microsoft",
            url: "https://www.youtube.com/watch?v=YQ1vQVgwlPE",
            description: "How self-evolved reasoning traces and targeted fine-tuning enable small LLMs to attain strong math reasoning performance."
          },
          {
            title: "Scaling Search and Learning: Reproducing OpenAI's o1 - A Reinforcement Learning Roadmap",
            url: "https://www.youtube.com/watch?v=rgkPlQ63yUA",
            description: "How to use SFT, DPO, and RFT to train and refine reasoning-capable models, including search-guided reinforcement learning."
          },
          {
            title: "Human-Centric Large Language Models: A Survey",
            url: "https://www.youtube.com/watch?v=KebQ25G8_GU",
            description: "Overview of alignment-tuning methods (SFT, RLHF/DPO/RFT) used to make LLMs responsive to human intent and preferences."
          },
          {
            title: "Natural Language Reinforcement Learning #arxiv",
            url: "https://www.youtube.com/watch?v=lFOJldnAZA8",
            description: "Overview of applying reinforcement-based fine-tuning to language models using natural language signals or rewards."
          },
          {
            title: "Route LLM - Learning to Route LLMs with Preference Data",
            url: "https://www.youtube.com/watch?v=-XInK1s8QM4",
            description: "Applies preference optimization (DPO-style) to learn an LLM router that selects the best model per prompt."
          },
          {
            title: "Personalization of Large Language Models - Survey #arxiv",
            url: "https://www.youtube.com/watch?v=95kXxvlM4jY",
            description: "Survey of methods to personalize LLMs through instruction tuning, preference learning, and parameter-efficient fine-tuning."
          },
          {
            title: "Is Larger and more instructable language models become less reliable?",
            url: "https://www.youtube.com/watch?v=kJLAo1hO_U8",
            description: "Overview of instruction-tuning methods and their reliability trade-offs as model size grows."
          },
          {
            title: "Nature Magazine - Larger and more instructable language models become less reliable",
            url: "https://www.youtube.com/watch?v=0vr_eUfM6fI",
            description: "Findings on how instruction-tuning and scale can trade off reliability, informing the selection and calibration of fine-tuning methods."
          },
          {
            title: "Reinforcement Pre-Training for LLM #microsoft",
            url: "https://www.youtube.com/watch?v=M2JRZQLd2Xs",
            description: "Context on how reinforcement-driven training compares with SFT/DPO/RFT techniques for optimizing LLM behavior."
          },
          {
            title: "How much do language models memorize? #meta #deepmind #nvidia #cornell",
            url: "https://www.youtube.com/watch?v=iuXyxV_dhTE",
            description: "Insights on how memorization dynamics should influence fine-tuning choices to reduce overfitting and leakage."
          },
          {
            title: "Deutscher Phi-4: Technischer Bericht #microsoft",
            url: "https://www.youtube.com/watch?v=7_aRIKaHVls",
            description: "Summary of training and fine-tuning strategies reported for the German Phi-4 model and their impact on performance."
          },
          {
            title: "Phi-4: Technical Report #microsoft",
            url: "https://www.youtube.com/watch?v=xAO2v5diyfU",
            description: "Overview of Phi-4’s training and alignment methodology and what it implies for choosing and sequencing fine-tuning techniques."
          }
        ]
      }
    ],

    // Production Foundations Concepts (January 2026)
    "agent-reasoning-patterns": [
      {
        id: "documentation",
        name: "Reasoning Pattern Fundamentals",
        references: [
          {
            title: "Chain-of-Thought Prompting Elicits Reasoning",
            url: "https://arxiv.org/abs/2201.11903",
            description: "Seminal paper introducing Chain-of-Thought prompting for complex reasoning tasks"
          },
          {
            title: "Tree of Thoughts: Deliberate Problem Solving",
            url: "https://arxiv.org/abs/2305.10601",
            description: "Tree-of-Thought framework for exploring multiple reasoning paths with backtracking"
          },
          {
            title: "Graph of Thoughts: Solving Elaborate Problems",
            url: "https://arxiv.org/abs/2308.09687",
            description: "Graph-based reasoning allowing merging and refinement of thought branches"
          },
          {
            title: "ReAct: Synergizing Reasoning and Acting",
            url: "https://arxiv.org/abs/2210.03629",
            description: "Interleaving reasoning traces with actions for grounded problem-solving"
          }
        ]
      },
      {
        id: "implementations",
        name: "Implementation Guides",
        references: [
          {
            title: "LangChain Agents Documentation",
            url: "https://python.langchain.com/docs/modules/agents/",
            description: "Production-ready agent implementations with various reasoning patterns"
          },
          {
            title: "Azure AI Agent Service",
            url: "https://learn.microsoft.com/azure/ai-services/agents/",
            description: "Microsoft's managed agent service with built-in reasoning capabilities"
          }
        ]
      }
    ],
    "agent-memory-systems": [
      {
        id: "documentation",
        name: "Memory Architecture Patterns",
        references: [
          {
            title: "Generative Agents: Interactive Simulacra",
            url: "https://arxiv.org/abs/2304.03442",
            description: "Stanford's seminal work on memory, reflection, and planning in generative agents"
          },
          {
            title: "MemGPT: Operating Systems for LLMs",
            url: "https://arxiv.org/abs/2310.08560",
            description: "Virtual context management inspired by operating system memory hierarchies"
          },
          {
            title: "LangChain Memory Documentation",
            url: "https://python.langchain.com/docs/modules/memory/",
            description: "Practical memory implementations for conversational AI"
          }
        ]
      },
      {
        id: "vector-stores",
        name: "Vector Database Integration",
        references: [
          {
            title: "Azure AI Search Vector Store",
            url: "https://learn.microsoft.com/azure/search/vector-search-overview",
            description: "Enterprise vector search for agent memory systems"
          },
          {
            title: "Pinecone Vector Database",
            url: "https://docs.pinecone.io/",
            description: "Managed vector database for semantic memory retrieval"
          }
        ]
      }
    ],
    "agent-observability": [
      {
        id: "documentation",
        name: "Observability Fundamentals",
        references: [
          {
            title: "OpenTelemetry for LLM Applications",
            url: "https://opentelemetry.io/docs/languages/python/",
            description: "Industry-standard observability framework for distributed tracing"
          },
          {
            title: "LangSmith Tracing",
            url: "https://docs.smith.langchain.com/",
            description: "Production tracing and debugging for LangChain applications"
          },
          {
            title: "Azure Monitor for AI",
            url: "https://learn.microsoft.com/azure/azure-monitor/",
            description: "Enterprise monitoring and diagnostics for AI workloads"
          }
        ]
      },
      {
        id: "best-practices",
        name: "Best Practices",
        references: [
          {
            title: "Observability Best Practices for GenAI",
            url: "https://www.honeycomb.io/blog/observability-for-ai",
            description: "Practical patterns for instrumenting generative AI applications"
          },
          {
            title: "Weights & Biases LLM Monitoring",
            url: "https://wandb.ai/site/traces",
            description: "Experiment tracking and production monitoring for AI systems"
          }
        ]
      }
    ],
    "agent-testing-benchmarks": [
      {
        id: "benchmarks",
        name: "Industry Benchmarks",
        references: [
          {
            title: "SWE-Bench: Can LLMs Write Real Software?",
            url: "https://www.swebench.com/",
            description: "Benchmark for evaluating agents on real GitHub issues"
          },
          {
            title: "GAIA: General AI Assistants Benchmark",
            url: "https://arxiv.org/abs/2311.12983",
            description: "Multi-step reasoning benchmark requiring tool use and web browsing"
          },
          {
            title: "HumanEval and MBPP",
            url: "https://github.com/openai/human-eval",
            description: "Code generation benchmarks for evaluating programming ability"
          }
        ]
      },
      {
        id: "evaluation-frameworks",
        name: "Evaluation Frameworks",
        references: [
          {
            title: "Azure AI Evaluation SDK",
            url: "https://learn.microsoft.com/azure/ai-studio/how-to/evaluate-generative-ai-app",
            description: "Microsoft's framework for evaluating generative AI applications"
          },
          {
            title: "LangChain Evaluation",
            url: "https://python.langchain.com/docs/guides/evaluation/",
            description: "Evaluation tools for LangChain applications"
          },
          {
            title: "RAGAS: RAG Assessment",
            url: "https://docs.ragas.io/",
            description: "Framework for evaluating RAG pipelines"
          }
        ]
      }
    ],
    "prompt-injection-defense": [
      {
        id: "documentation",
        name: "Security Fundamentals",
        references: [
          {
            title: "OWASP LLM Top 10",
            url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
            description: "OWASP security risks for LLM applications including prompt injection"
          },
          {
            title: "Microsoft Prompt Injection Guidance",
            url: "https://learn.microsoft.com/azure/ai-services/openai/concepts/red-teaming",
            description: "Red teaming and security testing for Azure OpenAI"
          },
          {
            title: "Anthropic's Constitutional AI",
            url: "https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback",
            description: "Training AI systems to be helpful, harmless, and honest"
          }
        ]
      },
      {
        id: "defense-patterns",
        name: "Defense Patterns",
        references: [
          {
            title: "Azure AI Content Safety",
            url: "https://learn.microsoft.com/azure/ai-services/content-safety/",
            description: "Microsoft's content filtering and safety service"
          },
          {
            title: "Guardrails AI",
            url: "https://docs.guardrailsai.com/",
            description: "Open-source framework for adding guardrails to LLM applications"
          },
          {
            title: "NeMo Guardrails",
            url: "https://docs.nvidia.com/nemo/guardrails/",
            description: "NVIDIA's toolkit for adding safety and control to LLM applications"
          }
        ]
      }
    ],
    "human-in-the-loop-patterns": [
      {
        id: "documentation",
        name: "HITL Fundamentals",
        references: [
          {
            title: "Human-in-the-Loop Machine Learning",
            url: "https://www.oreilly.com/library/view/human-in-the-loop-machine/9781617296741/",
            description: "Comprehensive guide to HITL patterns in ML systems"
          },
          {
            title: "Azure Machine Learning HITL",
            url: "https://learn.microsoft.com/azure/machine-learning/how-to-use-managed-identities",
            description: "Implementing human review workflows in Azure ML"
          }
        ]
      },
      {
        id: "workflow-patterns",
        name: "Workflow Patterns",
        references: [
          {
            title: "Temporal Workflow Orchestration",
            url: "https://temporal.io/",
            description: "Durable workflow engine for long-running approval processes"
          },
          {
            title: "Azure Logic Apps",
            url: "https://learn.microsoft.com/azure/logic-apps/",
            description: "Low-code workflow automation with human approval steps"
          }
        ]
      }
    ],
    "agent-cost-optimization": [
      {
        id: "documentation",
        name: "Cost Optimization Strategies",
        references: [
          {
            title: "Azure OpenAI Cost Management",
            url: "https://learn.microsoft.com/azure/ai-services/openai/concepts/cost-management",
            description: "Best practices for managing Azure OpenAI costs"
          },
          {
            title: "Token Optimization Techniques",
            url: "https://platform.openai.com/docs/guides/prompt-engineering",
            description: "OpenAI's guide to efficient prompting and token usage"
          }
        ]
      },
      {
        id: "caching-routing",
        name: "Caching & Model Routing",
        references: [
          {
            title: "GPTCache: Semantic Caching",
            url: "https://github.com/zilliztech/GPTCache",
            description: "Open-source semantic cache for LLM applications"
          },
          {
            title: "RouteLLM: Model Routing",
            url: "https://github.com/lm-sys/RouteLLM",
            description: "Cost-effective LLM routing framework"
          },
          {
            title: "Azure API Management for AI",
            url: "https://learn.microsoft.com/azure/api-management/api-management-ai-overview",
            description: "API gateway patterns for AI cost control"
          }
        ]
      }
    ],

    // Each pattern follows the pattern IDs from the existing code
    "routing": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Routing Pattern Documentation",
            url: "https://learn.microsoft.com/azure/ai-services/",
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
            url: "https://learn.microsoft.com/azure/ai-services/",
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
            url: "https://learn.microsoft.com/azure/ai-services/",
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
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
            description: ""
          },
          {
            title: "Azure AI Evaluation Tools",
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
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
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
            description: ""
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
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
            description: ""
          },
          {
            title: "Azure AI Reasoning and Action",
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
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
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
            description: "Official documentation"
          },
          {
            title: "Azure AI Code Generation",
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
            description: "Guide to Azure AI"
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
            title: "Self-Reflection Pattern",
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
            description: ""
          },
          {
            title: "Azure AI Self-Critique Framework",
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
            description: "Check out Microsoft Foundry"
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
            title: "Agentic RAG Pattern",
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
            description: ""
          },
          {
            title: "Azure AI RAG Implementation",
            url: "https://learn.microsoft.com/azure/search/retrieval-augmented-generation-overview",
            description: "Overview of RAG implementation in Azure"
          },
          {
            title: "LangChain RAG Tutorial",
            url: "https://python.langchain.com/docs/tutorials/rag/",
            description: "Official LangChain tutorial for building RAG pipelines"
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
          },
          {
            title: "RAG Techniques (Comprehensive Examples)",
            url: "https://github.com/NirDiamant/RAG_Techniques",
            description: "Curated collection of practical RAG techniques and patterns"
          }
        ]
      },
      {
        id: "papers",
        name: "Research Papers",
        references: [
          {
            title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
            url: "https://arxiv.org/pdf/2005.11401",
            description: "Foundational RAG paper introducing retrieval-augmented generation"
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
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
            description: ""
          },
          {
            title: "Browser Automation with AI",
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
            description: ""
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
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
            description: ""
          },
          {
            title: "Azure AI for Research",
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
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
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
            description: "Voice Agents in Azure"
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
  ,
    "codeact-agent": [
      {
        id: "youtube-research",
        name: "YouTube Research",
        references: [
          {
            title: "Code World Model (CWM) #meta #fair",
            url: "https://www.youtube.com/watch?v=4WggnJjbtbQ",
            description: "Demonstration of agents that use generated and executed code as a world model to plan and solve tasks."
          },
          {
            title: "An AI system to help scientists write expert level empirical software #deepmind",
            url: "https://www.youtube.com/watch?v=_u71dS_DOBc",
            description: "DeepMind overview of an agent that assists scientists by generating and iterating on empirical research software."
          },
          {
            title: "Autonomous Code Evolution Meets NP-Completeness #nvidia",
            url: "https://www.youtube.com/watch?v=ypIHfjR9VwA",
            description: "Agents that iteratively write, execute, and refine code to solve complex algorithmic challenges."
          },
          {
            title: "CoAct: Computer-using Agents withCoding as Actions",
            url: "https://www.youtube.com/watch?v=0YNXzWjnEL0",
            description: "CoAct demonstrates agents that use code as executable actions to solve tasks and operate digital environments."
          },
          {
            title: "How OpenAI uses Codex #openai",
            url: "https://www.youtube.com/watch?v=Hiy1EWMIkv0",
            description: "How code-generating models like Codex enable agents that write and run code to accomplish tasks."
          },
          {
            title: "EduThink4AI & Claude Code use by Anthropic - AI Blend",
            url: "https://www.youtube.com/watch?v=cYw-gDlQuHU",
            description: "Walkthrough of Claude Code’s agentic coding workflow, showing how it can generate and iterate on code to solve tasks."
          },
          {
            title: "Case Study on Anthropic's Use of Claude Code",
            url: "https://www.youtube.com/watch?v=wtvbFePD7nI",
            description: "Practical look at deploying a code-writing-and-executing agent (Claude Code) to solve real-world development tasks."
          },
          {
            title: "AI Research Agents for Machine Learning #meta",
            url: "https://www.youtube.com/watch?v=EaxqTCGMIq0",
            description: "Agents that generate and run ML experiment code end-to-end to automate research workflows."
          },
          {
            title: "Paper2Code - Scientific Paper to Machine Learning Code",
            url: "https://www.youtube.com/watch?v=O7MJPzsCz3I",
            description: "An agent that translates scientific papers into executable machine learning code."
          },
          {
            title: "An Empirical Study on LLM based Agents for Automated Bug Fixing",
            url: "https://www.youtube.com/watch?v=a3PO-0fjWrs",
            description: "Empirical results on LLM code agents using write-run-test loops to repair software bugs."
          },
          {
            title: "Microsoft RD-Agent - Automatic Research and Development Agent",
            url: "https://www.youtube.com/watch?v=MfXoAKBmExc",
            description: "An autonomous agent that writes and runs code to perform research and development tasks end-to-end."
          },
          {
            title: "Proof of Thought: Neurosymbolic ProgramSynthesis allows Robust and Interpretable Reasoning",
            url: "https://www.youtube.com/watch?v=p0pzz8uehmI",
            description: "Approaches where agents write and run code or proofs to perform reliable, transparent reasoning."
          }
        ]
      }
    ],
  
    "agent-evaluation": [
      {
        id: "frameworks",
        name: "Evaluation Frameworks",
        references: [
          {
            title: "Google ADK Agent Evaluation",
            url: "https://google.github.io/adk-docs/evaluate/",
            description: "Built-in evaluation framework for response quality and execution trajectories in Google ADK"
          },
          {
            title: "Google ADK Evaluation Criteria",
            url: "https://google.github.io/adk-docs/evaluate/criteria/",
            description: "Define custom evaluation criteria for agent performance assessment"
          },
          {
            title: "Google ADK Testing Guide",
            url: "https://google.github.io/adk-docs/get-started/testing/",
            description: "Best practices for testing and validating ADK agents"
          }
        ]
      },
      {
        id: "youtube-research",
        name: "YouTube Research",
        references: [
          {
            title: "Is GPT-5 ready for Mammogram - Visual Question Answering?",
            url: "https://www.youtube.com/watch?v=IG87p4nbOjM",
            description: "Applying rigorous evaluation frameworks to assess model readiness for high-stakes visual question answering tasks on medical images."
          },
          {
            title: "Gemini 2.5 Pro & Open AI Winning Gold at IMO 2025 #google #openai",
            url: "https://www.youtube.com/watch?v=eTUvFHywdIw",
            description: "Benchmarking and performance assessment of agents/models on rigorous tasks like IMO-style problems."
          },
          {
            title: "Answer Matching Outperforms Multiple Choice for Language Model Evaluation",
            url: "https://www.youtube.com/watch?v=pRRySAZEZp0",
            description: "A comparative evaluation pattern showing answer matching as a stronger metric than multiple choice for LLM/agent assessment."
          },
          {
            title: "HealthBench #openai",
            url: "https://www.youtube.com/watch?v=OSXLCGUTzks",
            description: "Introduces a comprehensive benchmark pattern to evaluate agent performance in medical contexts."
          },
          {
            title: "Survey on Evaluation of LLM-based Agents",
            url: "https://www.youtube.com/watch?v=H4QLHJ-Z0G8",
            description: "Overview of frameworks to systematically assess LLM-agent performance, capabilities, and behavioral reliability."
          },
          {
            title: "Measuring AI Ability to Complete Long Tasks - a.k.a Agents",
            url: "https://www.youtube.com/watch?v=PJ0vYK2rZs0",
            description: "Frameworks and benchmark patterns to systematically evaluate agent capabilities and behavior on complex tasks."
          },
          {
            title: "The Agent Company: Benchmarking LLMs on Real World Tasks #carnegiemellonuniversity",
            url: "https://www.youtube.com/watch?v=VtsWoq7TggQ",
            description: "A framework for designing and running benchmarks to assess agent/LLM task performance and reliability."
          }
        ]
      }
    ],

    // Agent Skills - Modular expertise extensions for AI agents
    "agent-skills": [
      {
        id: "official-resources",
        name: "Official Agent Skills Resources",
        references: [
          {
            title: "Skills.sh - Agent Skills Platform",
            url: "https://skills.sh",
            description: "Official platform for discovering and sharing Agent Skills"
          },
          {
            title: "Claude Skills (Anthropic)",
            url: "https://github.com/anthropics/skills/tree/main/skills",
            description: "Official Agent Skills repository from Anthropic for Claude - includes document processing, PDF, Excel, and more"
          },
          {
            title: "GitHub Copilot Skills",
            url: "https://github.com/github/awesome-copilot/tree/main/skills",
            description: "Curated collection of skills for GitHub Copilot CLI and agent mode"
          },
          {
            title: "Agent Skills Specification",
            url: "https://agentskills.io/specification",
            description: "Open specification for portable, interoperable agent skills"
          }
        ]
      },
      {
        id: "community-resources",
        name: "Community Skills Collections",
        references: [
          {
            title: "Awesome Claude Skills",
            url: "https://github.com/ComposioHQ/awesome-claude-skills",
            description: "Community-curated collection of useful Claude Skills"
          },
          {
            title: "Skill Creator Meta-Skill",
            url: "https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md",
            description: "Anthropic's official skill for creating new skills - learn the 6-step process"
          }
        ]
      },
      {
        id: "documentation",
        name: "Skills Documentation",
        references: [
          {
            title: "Claude Skills Documentation",
            url: "https://docs.anthropic.com/en/docs/build-with-claude/claude-code/skills",
            description: "Official Anthropic documentation on creating and using skills with Claude"
          },
          {
            title: "Agent Skills Standard",
            url: "https://agentskills.io",
            description: "The open standard for agent skills - format, metadata, and best practices"
          }
        ]
      }
    ],

    // Client Coding Agents - Terminal-based AI coding assistants
    "client-coding-agents": [
      {
        id: "open-source-agents",
        name: "Open Source Coding Agents",
        references: [
          {
            title: "OpenCode",
            url: "https://github.com/anomalyco/opencode",
            description: "100% open source AI coding agent with TUI, provider-agnostic (Claude, OpenAI, Google, local), LSP support, and client/server architecture"
          },
          {
            title: "OpenAI Codex CLI",
            url: "https://github.com/openai/codex-cli",
            description: "Open source Rust-based terminal coding agent from OpenAI"
          },
          {
            title: "Google Gemini CLI",
            url: "https://github.com/google/gemini-cli",
            description: "Open source AI agent (Apache 2.0) with Gemini models and 1M token context"
          }
        ]
      },
      {
        id: "commercial-agents",
        name: "Commercial Coding Agents",
        references: [
          {
            title: "GitHub Copilot CLI",
            url: "https://github.com/features/copilot/cli",
            description: "AI-powered command-line interface with deep GitHub integration"
          },
          {
            title: "Claude Code",
            url: "https://docs.anthropic.com/en/docs/build-with-claude/claude-code",
            description: "Anthropic's terminal-native agentic coding environment"
          }
        ]
      },
      {
        id: "context-files",
        name: "Context File Standards",
        references: [
          {
            title: "AGENTS.md Specification",
            url: "https://opencode.ai/docs/agents",
            description: "Standard for project context files honored by multiple coding agents"
          },
          {
            title: "Claude Code Configuration",
            url: "https://docs.anthropic.com/en/docs/build-with-claude/claude-code/configuration",
            description: "CLAUDE.md and project configuration for Claude Code"
          }
        ]
      },
      {
        id: "acp-protocol",
        name: "Agent Client Protocol (ACP)",
        references: [
          {
            title: "Agent Client Protocol - Introduction",
            url: "https://agentclientprotocol.com/get-started/introduction",
            description: "Official ACP documentation - standardizing communication between code editors and AI coding agents"
          },
          {
            title: "ACP GitHub Repository",
            url: "https://github.com/agentclientprotocol/agent-client-protocol",
            description: "Open source protocol specification with official SDKs for Rust, Python, TypeScript, and Kotlin"
          },
          {
            title: "ACP Architecture",
            url: "https://agentclientprotocol.com/get-started/architecture",
            description: "Design philosophy and technical architecture of the Agent Client Protocol"
          },
          {
            title: "ACP TypeScript SDK",
            url: "https://www.npmjs.com/package/@agentclientprotocol/sdk",
            description: "Official TypeScript/JavaScript SDK for implementing ACP agents and clients"
          },
          {
            title: "ACP Python SDK",
            url: "https://github.com/agentclientprotocol/python-sdk",
            description: "Official Python SDK with examples for building ACP-compatible agents"
          },
          {
            title: "ACP Agents Registry",
            url: "https://agentclientprotocol.com/overview/agents",
            description: "Directory of ACP-compatible agents"
          },
          {
            title: "ACP Clients Registry",
            url: "https://agentclientprotocol.com/overview/clients",
            description: "Directory of ACP-compatible editors and IDEs"
          }
        ]
      },
      {
        id: "research-insights",
        name: "Research & Data Analysis",
        references: [
          {
            title: "The Hidden Architecture of AI Coding Agents: What the Data Really Reveals",
            url: "https://arxiv.org/pdf/2510.25423",
            description: "Research analyzing Stack Overflow and GitHub data to reveal patterns in AI coding agent adoption, challenges across three phases of escalating complexity, and the skyscraper analogy for building AI infrastructure"
          }
        ]
      },
      {
        id: "ralph-method",
        name: "The Ralph Method (Bash Loop Orchestration)",
        references: [
          {
            title: "Building Effective Harnesses for Long-Running Agents",
            url: "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents",
            description: "Anthropic engineering guide on building effective harnesses for long-running coding agents — the foundational principles behind loop-based agent orchestration"
          },
          {
            title: "Building a C Compiler with a Bash Loop",
            url: "https://www.anthropic.com/engineering/building-c-compiler",
            description: "Anthropic case study demonstrating the Ralph Method — using a simple bash for-loop to drive Claude Code through building an entire C compiler from a task backlog"
          }
        ]
      },
      {
        id: "ignitionstack",
        name: "IgnitionStack",
        references: [
          {
            title: "IgnitionStack — Use Case → Production Azure Workload",
            url: "https://github.com/bhakthan/ignitionstack",
            description: "Open source 8-stage agentic scaffold pipeline — transforms a use-case doc (text, PDF, PPTX, screenshot) into a fully deployed Azure project with Bicep infra, agents, database, app code, CI/CD, and 20 Ralph-loop iterations"
          }
        ]
      }
    ]
  },
  
  patterns: {
    "ignition-stack": [
      {
        id: "source-code",
        name: "Source Code & Implementation",
        references: [
          {
            title: "IgnitionStack GitHub Repository",
            url: "https://github.com/bhakthan/ignitionstack",
            description: "Open source Python CLI that implements the IgnitionStack pattern — 8-stage pipeline from use-case input to production Azure workload with 20 Ralph-loop iterations"
          }
        ]
      },
      {
        id: "concepts",
        name: "Core Concepts",
        references: [
          {
            title: "The Ralph Method — Bash Loop Orchestration",
            url: "https://www.anthropic.com/engineering/building-c-compiler",
            description: "Anthropic case study behind the 20-iteration Ralph loop that powers IgnitionStack's autonomous implementation phase"
          },
          {
            title: "Building Effective Harnesses for Long-Running Agents",
            url: "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents",
            description: "Foundational principles for loop-based agent orchestration — context window hygiene, atomic commits, and fault tolerance"
          }
        ]
      },
      {
        id: "domain-examples",
        name: "Domain Examples",
        references: [
          {
            title: "IgnitionStack Domain Examples",
            url: "https://github.com/bhakthan/ignitionstack/tree/master/examples",
            description: "Seven pre-built domain use-case examples: Healthcare, Finance, Education, Oil & Gas, Construction, Telco, and Retail"
          }
        ]
      }
    ],

    "azure-openai": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Azure OpenAI Service Documentation",
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
            description: "Official documentation for Azure OpenAI Service"
          },
          {
            title: "Azure OpenAI Models",
            url: "https://learn.microsoft.com/en-us/azure/ai-foundry/",
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
            title: "What is Microsoft Foundry?",
            url: "https://learn.microsoft.com/azure/ai-foundry/what-is-foundry",
            description: "Unified Azure PaaS for enterprise AI operations, model cataloging, and agent development"
          },
          {
            title: "Microsoft Foundry SDKs",
            url: "https://learn.microsoft.com/azure/ai-foundry/how-to/develop/sdk-overview",
            description: "Client libraries for Python, C#, JavaScript/TypeScript, and Java"
          },
          {
            title: "Foundry VS Code Extension",
            url: "https://learn.microsoft.com/azure/ai-foundry/how-to/develop/get-started-projects-vs-code",
            description: "Develop agents and explore models directly in VS Code"
          }
        ]
      }
    ],

    "microsoft-agent-framework": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "Microsoft Agent Framework Overview",
            url: "https://learn.microsoft.com/agent-framework/overview/",
            description: "Next-generation SDK unifying Semantic Kernel and AutoGen for agentic AI applications"
          },
          {
            title: "Agent Framework Workflows",
            url: "https://learn.microsoft.com/agent-framework/workflows/",
            description: "Graph-based workflows with type-safe routing, checkpointing, and multi-agent orchestration"
          },
          {
            title: "Agent Framework Tools & MCP",
            url: "https://learn.microsoft.com/agent-framework/agents/tools/",
            description: "Tool integration including hosted MCP servers for agent capabilities"
          },
          {
            title: "Migration from Semantic Kernel",
            url: "https://learn.microsoft.com/agent-framework/migration-guide/from-semantic-kernel/",
            description: "Step-by-step guide for migrating existing Semantic Kernel applications"
          },
          {
            title: "Migration from AutoGen",
            url: "https://learn.microsoft.com/agent-framework/migration-guide/from-autogen/",
            description: "Step-by-step guide for migrating existing AutoGen applications"
          }
        ]
      },
      {
        id: "samples",
        name: "Code Samples",
        references: [
          {
            title: "Agent Framework GitHub Repository",
            url: "https://github.com/microsoft/agent-framework",
            description: "Official source code, samples, and documentation"
          },
          {
            title: "Agent Framework Python Package",
            url: "https://pypi.org/project/agent-framework/",
            description: "Install via: pip install agent-framework --pre"
          },
          {
            title: "Agent Framework .NET Package",
            url: "https://www.nuget.org/packages/Microsoft.Agents.AI/",
            description: "Install via: dotnet add package Microsoft.Agents.AI.OpenAI --prerelease"
          },
          {
            title: "AG-UI Integration with CopilotKit",
            url: "https://docs.copilotkit.ai/microsoft-agent-framework",
            description: "Build rich agent UIs using the AG-UI protocol with CopilotKit"
          }
        ]
      }
    ],

    "azure-ai-agent-service": [
      {
        id: "documentation",
        name: "Documentation",
        references: [
          {
            title: "What is Foundry Agent Service?",
            url: "https://learn.microsoft.com/azure/ai-foundry/agents/overview",
            description: "Managed runtime for production-ready agents with built-in tools, safety, and observability"
          },
          {
            title: "Foundry Agent Service Quickstart",
            url: "https://learn.microsoft.com/azure/ai-foundry/agents/quickstart",
            description: "Create your first agent in the Foundry portal or via SDK"
          },
          {
            title: "Agent Service Tools Catalog",
            url: "https://learn.microsoft.com/azure/ai-foundry/agents/concepts/tool-catalog",
            description: "Built-in tools: Bing Search, AI Search, Logic Apps, Functions, MCP, and more"
          },
          {
            title: "Connected Agents",
            url: "https://learn.microsoft.com/azure/ai-foundry/agents/how-to/connected-agents",
            description: "Build multi-agent systems with task-specific connected agents"
          },
          {
            title: "What's New in Foundry Agent Service",
            url: "https://learn.microsoft.com/azure/ai-foundry/agents/whats-new",
            description: "Latest features including Deep Research, Browser Automation, MCP tools, and Computer Use"
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
            title: "Microsoft Foundry Documentation",
            url: "https://learn.microsoft.com/azure/ai-foundry/what-is-foundry",
            description: "Azure AI Studio is now Microsoft Foundry — unified platform for AI agent development"
          },
          {
            title: "Getting Started with Foundry Projects",
            url: "https://learn.microsoft.com/azure/ai-foundry/how-to/develop/get-started-projects-vs-code",
            description: "Create and manage Foundry projects in VS Code"
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
  
  realWorldUseCases: {
    "customer-stories": [
      {
        id: "microsoft-transformations",
        name: "Microsoft Customer Transformations",
        references: [
          {
            title: "AI-powered success with 1000+ stories of customer transformation and innovation",
            url: "https://www.microsoft.com/en-us/microsoft-cloud/blog/2025/07/24/ai-powered-success-with-1000-stories-of-customer-transformation-and-innovation/",
            description: "More than 1000 stories of customer transformation and innovation using Microsoft AI technologies"
          }
        ]
      }
    ],
    "industry-use-cases": [
      {
        id: "google-cloud-use-cases",
        name: "Industry Leader Use Cases",
        references: [
          {
            title: "101 real-world generative AI use cases from industry leaders",
            url: "https://cloud.google.com/transform/101-real-world-generative-ai-use-cases-from-industry-leaders",
            description: "Comprehensive collection of AI use cases from various industries including healthcare, finance, retail, and manufacturing"
          }
        ]
      }
    ],
    "transformation-stories": [
      {
        id: "enterprise-adoption",
        name: "Enterprise AI Adoption",
        references: [
          {
            title: "Microsoft Customer Success Stories",
            url: "https://customers.microsoft.com/en-us/search?sq=%22artificial%20intelligence%22&ff=&p=0&so=story_publish_date%20desc",
            description: "Real customer success stories showcasing AI implementation across enterprises"
          },
          {
            title: "Google Cloud AI Success Stories",
            url: "https://cloud.google.com/customers#/products=AI_Platform",
            description: "Customer success stories demonstrating AI transformation with Google Cloud"
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