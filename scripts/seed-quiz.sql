-- Seed Quiz Questions for OpenAgentSchool
-- Categories: patterns, azure-services, fundamentals, architecture, deployment, integration, advanced

INSERT INTO quiz_questions (question, options, correct_answer, explanation, category, difficulty, created_at)
VALUES 
(
    'What is the primary benefit of the Parallelization pattern?',
    '{"A": "Reduces memory usage", "B": "Improves processing speed for independent tasks", "C": "Simplifies code structure", "D": "Reduces network latency"}',
    'B',
    'Parallelization allows multiple independent tasks to run concurrently, significantly reducing overall processing time.',
    'patterns',
    'medium',
    CURRENT_TIMESTAMP
),
(
    'Which Azure service is best for implementing AI safety controls?',
    '{"A": "Azure Monitor", "B": "Azure Content Safety", "C": "Azure Storage", "D": "Azure Functions"}',
    'B',
    'Azure Content Safety provides AI-powered content moderation to detect harmful content.',
    'azure-services',
    'easy',
    CURRENT_TIMESTAMP
),
(
    'In Prompt Chaining, what is the key principle?',
    '{"A": "Running prompts in parallel", "B": "Using the output of one prompt as input for the next", "C": "Reducing prompt length", "D": "Increasing prompt complexity"}',
    'B',
    'Prompt Chaining breaks down complex tasks by feeding the output of one prompt as input to the next prompt in sequence.',
    'patterns',
    'medium',
    CURRENT_TIMESTAMP
),
(
    'What is the main purpose of agent evaluation frameworks?',
    '{"A": "To measure model size", "B": "To assess agent performance across multiple dimensions", "C": "To reduce computational costs", "D": "To increase training speed"}',
    'B',
    'Agent evaluation frameworks provide systematic ways to measure agent performance across accuracy, reliability, safety, and other key metrics.',
    'fundamentals',
    'medium',
    CURRENT_TIMESTAMP
),
(
    'Which component is essential for multi-agent coordination?',
    '{"A": "Large language models only", "B": "Communication protocols and shared state management", "C": "Single database access", "D": "Centralized control system"}',
    'B',
    'Multi-agent systems require well-defined communication protocols and mechanisms for managing shared state to coordinate effectively.',
    'architecture',
    'advanced',
    CURRENT_TIMESTAMP
),
(
    'What is the purpose of RAG (Retrieval-Augmented Generation)?',
    '{"A": "To reduce model training time", "B": "To enhance LLM responses with relevant external information", "C": "To compress model weights", "D": "To increase inference speed"}',
    'B',
    'RAG retrieves relevant information from external sources and incorporates it into the LLM''s generation process, improving accuracy and grounding.',
    'patterns',
    'intermediate',
    CURRENT_TIMESTAMP
),
(
    'Which is a key consideration for deploying agents in production?',
    '{"A": "Monitoring, error handling, and graceful degradation", "B": "Only model accuracy", "C": "Training data size", "D": "Number of parameters"}',
    'A',
    'Production deployment requires robust monitoring, comprehensive error handling, and mechanisms for graceful degradation when components fail.',
    'deployment',
    'intermediate',
    CURRENT_TIMESTAMP
),
(
    'What is prompt engineering?',
    '{"A": "Writing code for AI models", "B": "Crafting effective inputs to guide LLM behavior", "C": "Training neural networks", "D": "Optimizing model architecture"}',
    'B',
    'Prompt engineering is the practice of designing and refining inputs (prompts) to effectively guide large language models toward desired outputs.',
    'fundamentals',
    'beginner',
    CURRENT_TIMESTAMP
),
(
    'What does MCP (Model Context Protocol) enable?',
    '{"A": "Faster model training", "B": "Standardized way for AI applications to connect to data sources", "C": "Model compression", "D": "Reduced inference costs"}',
    'B',
    'MCP provides a standardized protocol for AI applications to securely connect to various data sources and tools, enabling interoperability.',
    'integration',
    'intermediate',
    CURRENT_TIMESTAMP
),
(
    'What is fine-tuning in the context of LLMs?',
    '{"A": "Adjusting hyperparameters during training", "B": "Training a pre-trained model on domain-specific data", "C": "Reducing model size", "D": "Increasing inference speed"}',
    'B',
    'Fine-tuning involves taking a pre-trained language model and continuing training on a smaller, domain-specific dataset to adapt it for specialized tasks.',
    'advanced',
    'intermediate',
    CURRENT_TIMESTAMP
);
