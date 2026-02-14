// Atomic LLM Training (microGPT) Quiz
import { Quiz } from './types';

export const atomicLLMTrainingQuiz: Quiz = {
  id: 'atomic-llm-training',
  title: 'Atomic LLM Training (microGPT)',
  description: 'Test your understanding of building a GPT from scratch — autograd, transformers, and training loops',
  difficulty: 'beginner',
  estimatedTime: 12,
  questions: [
    {
      id: 'atomic-llm-1',
      question: 'What is the primary purpose of the Value class in the microGPT autograd engine?',
      options: [
        'To store model hyperparameters like learning rate',
        'To wrap scalar values, track operations, and enable automatic gradient computation',
        'To validate input data types before training',
        'To serialize model weights to disk'
      ],
      correctAnswer: 1,
      explanation: 'The Value class wraps a scalar number and records every arithmetic operation performed on it (add, multiply, etc.) in a computation graph. During the backward pass, it uses this graph to automatically compute gradients via the chain rule.',
      difficulty: 'beginner',
      tags: ['autograd', 'Value', 'computation-graph'],
      category: 'atomic-llm-training',
      subCategory: 'autograd-fundamentals'
    },
    {
      id: 'atomic-llm-2',
      question: 'Why does the backward() method process nodes in reverse topological order?',
      options: [
        'For faster computation speed',
        'To ensure alphabetical processing of variable names',
        'So each node\'s gradient is fully accumulated from all dependents before propagating further',
        'Because Python requires this ordering for garbage collection'
      ],
      correctAnswer: 2,
      explanation: 'Reverse topological order ensures that when we compute a node\'s contribution to its children, its own gradient has already been fully accumulated from all nodes that depend on it. Processing in any other order would produce incomplete (incorrect) gradients.',
      difficulty: 'intermediate',
      tags: ['backpropagation', 'topological-sort', 'gradient-computation'],
      category: 'atomic-llm-training',
      subCategory: 'autograd-fundamentals'
    },
    {
      id: 'atomic-llm-3',
      question: 'In self-attention, what do the Query (Q) and Key (K) matrices compute together?',
      options: [
        'The final output embeddings directly',
        'Attention scores that determine how much each token attends to every other token',
        'The loss function for training',
        'The position encodings for each token'
      ],
      correctAnswer: 1,
      explanation: 'Q·Kᵀ produces a matrix of attention scores. Each entry represents the relevance (similarity) between a query position and a key position. These scores are softmax-normalized and then used to weight the Value (V) vectors, producing context-aware representations.',
      difficulty: 'intermediate',
      tags: ['attention', 'transformer', 'Q-K-V'],
      category: 'atomic-llm-training',
      subCategory: 'transformer-architecture'
    },
    {
      id: 'atomic-llm-4',
      question: 'What is the purpose of the causal mask in GPT\'s self-attention?',
      options: [
        'To speed up training by skipping some computations',
        'To prevent the model from attending to future tokens during training',
        'To reduce memory usage by half',
        'To add positional information to the embeddings'
      ],
      correctAnswer: 1,
      explanation: 'The causal (triangular) mask sets future positions to -infinity before softmax, ensuring each token can only attend to itself and previous tokens. This enforces the autoregressive property: the model must predict the next token without seeing it.',
      difficulty: 'intermediate',
      tags: ['causal-mask', 'autoregressive', 'attention'],
      category: 'atomic-llm-training',
      subCategory: 'transformer-architecture'
    },
    {
      id: 'atomic-llm-5',
      question: 'Why does Adam optimizer outperform basic SGD for transformer training?',
      options: [
        'Adam uses less memory than SGD',
        'Adam is always faster to compute',
        'Adam adapts per-parameter learning rates using first and second moment estimates',
        'Adam doesn\'t require gradient computation'
      ],
      correctAnswer: 2,
      explanation: 'Adam maintains running estimates of the first moment (mean) and second moment (variance) of gradients for each parameter. This allows it to adapt the effective learning rate per parameter — giving larger updates to infrequent parameters and dampening volatile ones.',
      difficulty: 'intermediate',
      tags: ['Adam', 'optimizer', 'training-loop'],
      category: 'atomic-llm-training',
      subCategory: 'training-loop'
    },
    {
      id: 'atomic-llm-6',
      question: 'What does cross-entropy loss measure in the context of next-token prediction?',
      options: [
        'The physical distance between token embeddings',
        'The number of incorrect predictions in a batch',
        'The divergence between the model\'s predicted probability distribution and the true distribution over the vocabulary',
        'The total compute cost of a training step'
      ],
      correctAnswer: 2,
      explanation: 'Cross-entropy loss quantifies how far the model\'s predicted probability distribution (over all vocabulary tokens) is from the ground truth (a one-hot distribution pointing at the correct next token). Lower cross-entropy means the model assigns higher probability to the correct token.',
      difficulty: 'intermediate',
      tags: ['cross-entropy', 'loss-function', 'next-token-prediction'],
      category: 'atomic-llm-training',
      subCategory: 'training-loop'
    },
    {
      id: 'atomic-llm-7',
      question: 'In gradient accumulation during backpropagation, why do we use += instead of = for gradients?',
      options: [
        'It\'s just a coding convention with no functional difference',
        'Because a value used in multiple operations receives gradient contributions from each use, which must be summed',
        'To prevent integer overflow in gradient values',
        'Because Python doesn\'t support the = operator for custom classes'
      ],
      correctAnswer: 1,
      explanation: 'When a variable is used multiple times in a computation (e.g., x + x, or x used in two branches), the multivariate chain rule says its total gradient is the sum of all partial contributions. Using += accumulates these; using = would overwrite earlier contributions.',
      difficulty: 'intermediate',
      tags: ['gradient-accumulation', 'chain-rule', 'backpropagation'],
      category: 'atomic-llm-training',
      subCategory: 'autograd-fundamentals'
    },
    {
      id: 'atomic-llm-8',
      question: 'What is the role of Layer Normalization in a transformer block?',
      options: [
        'To reduce the number of parameters',
        'To normalize activations across the feature dimension, stabilizing training and enabling deeper networks',
        'To add non-linearity to the model',
        'To implement the attention mechanism'
      ],
      correctAnswer: 1,
      explanation: 'Layer Normalization normalizes the activations across the feature dimension (not batch dimension). This stabilizes the distribution of inputs to each layer, preventing gradient explosion/vanishing and enabling the training of deep transformer stacks.',
      difficulty: 'intermediate',
      tags: ['layer-norm', 'normalization', 'transformer'],
      category: 'atomic-llm-training',
      subCategory: 'transformer-architecture'
    },
    {
      id: 'atomic-llm-9',
      question: 'Why can the entire microGPT be built in ~200 lines of Python with zero dependencies?',
      options: [
        'Because GPT models are inherently simple and small',
        'Because Python has built-in neural network libraries',
        'Because the core concepts (autograd, attention, MLP, training loop) are mathematically concise — the complexity is in scale, not concept',
        'Because it\'s not a real GPT — it\'s a simplified toy'
      ],
      correctAnswer: 2,
      explanation: 'The fundamental concepts behind GPT — automatic differentiation, matrix multiplication for attention, simple nonlinearities, and gradient descent — are mathematically elegant. The complexity of production models (GPT-4, etc.) comes from scale (billions of parameters, large datasets, distributed training), not from conceptual depth.',
      difficulty: 'beginner',
      tags: ['microGPT', 'simplicity', 'fundamentals'],
      category: 'atomic-llm-training',
      subCategory: 'overview'
    },
    {
      id: 'atomic-llm-10',
      question: 'During inference, how does the microGPT generate text from a trained model?',
      options: [
        'By looking up pre-stored responses in a database',
        'By sampling from the predicted probability distribution over the vocabulary, one token at a time, and feeding each generated token back as input',
        'By generating all tokens simultaneously in one forward pass',
        'By searching through all possible sentences and selecting the best one'
      ],
      correctAnswer: 1,
      explanation: 'Autoregressive generation works by: (1) forward pass on the current context to get logits, (2) apply softmax + temperature to get probabilities, (3) sample or argmax to pick the next token, (4) append to context and repeat. Each new token depends on all previously generated tokens.',
      difficulty: 'beginner',
      tags: ['inference', 'autoregressive', 'text-generation'],
      category: 'atomic-llm-training',
      subCategory: 'training-loop'
    }
  ]
};
