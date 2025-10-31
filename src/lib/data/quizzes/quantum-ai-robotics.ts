import { QuizQuestion } from './types';

export const quantumAIRoboticsQuestions: QuizQuestion[] = [
  // Beginner Level Questions
  {
    id: 'qar-b1',
    text: 'What property of qubits allows quantum computers to explore multiple solutions simultaneously?',
    question: 'What property of qubits allows quantum computers to explore multiple solutions simultaneously?',
    options: [
      'Interference',
      'Superposition',
      'Entanglement',
      'Decoherence'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'quantum-ai-robotics',
    subCategory: 'quantum-basics',
    explanation: 'Superposition allows a qubit to exist in a combination of |0⟩ and |1⟩ states simultaneously, enabling quantum computers to process multiple computational paths in parallel until measurement collapses the state.',
    relatedConcepts: ['quantum-computing-fundamentals', 'qubit-states'],
    timeEstimate: 60,
    persona: ['ai-researcher', 'robotics-engineer']
  },
  {
    id: 'qar-b2',
    text: 'Which quantum algorithm is specifically designed for combinatorial optimization problems like robot path planning?',
    question: 'Which quantum algorithm is specifically designed for combinatorial optimization problems like robot path planning?',
    options: [
      'Shor\'s Algorithm',
      'QAOA (Quantum Approximate Optimization Algorithm)',
      'Grover\'s Search',
      'Deutsch-Jozsa Algorithm'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'quantum-ai-robotics',
    subCategory: 'quantum-algorithms',
    explanation: 'QAOA is a hybrid quantum-classical algorithm designed for combinatorial optimization problems. It uses a variational approach to find approximate solutions to problems like TSP, which is directly applicable to multi-waypoint robot path planning.',
    relatedConcepts: ['qaoa', 'path-planning', 'combinatorial-optimization'],
    timeEstimate: 75,
    persona: ['ai-researcher', 'robotics-engineer']
  },
  {
    id: 'qar-b3',
    text: 'What is the primary advantage of quantum sensors over classical sensors in robotics applications?',
    question: 'What is the primary advantage of quantum sensors over classical sensors in robotics applications?',
    options: [
      'Lower manufacturing cost',
      'Higher sensitivity and precision',
      'Easier software integration',
      'Longer operational lifetime'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'quantum-ai-robotics',
    subCategory: 'quantum-sensing',
    explanation: 'Quantum sensors leverage quantum phenomena like superposition and entanglement to achieve sensitivity levels beyond the standard quantum limit. This results in dramatically improved precision for measurements like magnetic fields, acceleration, and rotation—critical for robotic navigation and perception.',
    relatedConcepts: ['quantum-sensing', 'sensor-fusion', 'robotics-perception'],
    timeEstimate: 65,
    persona: ['robotics-engineer', 'hardware-specialist']
  },
  {
    id: 'qar-b4',
    text: 'What does "decoherence" mean in quantum computing, and why does it matter for robotics applications?',
    question: 'What does "decoherence" mean in quantum computing, and why does it matter for robotics applications?',
    options: [
      'When qubits lose their quantum properties due to environmental noise, limiting computation time',
      'When quantum gates operate incorrectly',
      'When quantum computers run out of memory',
      'When measurement destroys superposition states'
    ],
    correctAnswer: 0,
    difficulty: 'beginner',
    category: 'quantum-ai-robotics',
    subCategory: 'quantum-basics',
    explanation: 'Decoherence is the loss of quantum coherence due to environmental interactions (heat, vibration, electromagnetic interference). For robotics, this means quantum computations must complete quickly—typically within milliseconds—before decoherence destroys the quantum advantage.',
    relatedConcepts: ['quantum-error-correction', 'quantum-noise', 'nisq-era'],
    timeEstimate: 70,
    persona: ['ai-researcher', 'quantum-engineer']
  },
  {
    id: 'qar-b5',
    text: 'Which robotics problem class is LEAST likely to benefit from quantum computing?',
    question: 'Which robotics problem class is LEAST likely to benefit from quantum computing?',
    options: [
      'Multi-waypoint path planning with 50+ locations',
      'Real-time motor PID control loops',
      'Task allocation across 100+ heterogeneous robots',
      'High-dimensional grasp pose optimization'
    ],
    correctAnswer: 1,
    difficulty: 'beginner',
    category: 'quantum-ai-robotics',
    subCategory: 'quantum-advantage',
    explanation: 'Real-time PID control requires sub-millisecond latency and operates on continuous signals—not a good fit for current quantum computers which have high latency (cloud API calls) and excel at discrete optimization. Path planning, task allocation, and grasp optimization all involve combinatorial search where quantum can help.',
    relatedConcepts: ['quantum-advantage', 'classical-vs-quantum', 'hybrid-architectures'],
    timeEstimate: 80,
    persona: ['robotics-engineer', 'control-engineer']
  },

  // Intermediate Level Questions
  {
    id: 'qar-i1',
    text: 'In a hybrid quantum-classical architecture for robot planning, where does quantum processing typically provide the most value?',
    question: 'In a hybrid quantum-classical architecture for robot planning, where does quantum processing typically provide the most value?',
    options: [
      'Image preprocessing and edge detection',
      'Solving discrete optimization subproblems (e.g., task sequencing, path selection)',
      'Low-level motor control and torque commands',
      'Sensor calibration and data logging'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'quantum-ai-robotics',
    subCategory: 'hybrid-architectures',
    explanation: 'Quantum algorithms excel at discrete combinatorial optimization problems like task sequencing, resource allocation, and path selection. Classical systems handle perception, control, and real-time processing, while quantum solvers tackle NP-hard planning subproblems that would be intractable classically.',
    relatedConcepts: ['hybrid-quantum-classical', 'quantum-optimization', 'system-architecture'],
    timeEstimate: 90,
    persona: ['system-architect', 'ai-researcher']
  },
  {
    id: 'qar-i2',
    text: 'What does QUBO stand for, and why is it important for quantum robotics?',
    question: 'What does QUBO stand for, and why is it important for quantum robotics?',
    options: [
      'Quantum Unitary Binary Operation—a gate primitive',
      'Quadratic Unconstrained Binary Optimization—a problem formulation',
      'Quantum Universal Bayesian Optimization—a learning algorithm',
      'Quadratic Universal Binary Output—a measurement scheme'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'quantum-ai-robotics',
    subCategory: 'problem-formulation',
    explanation: 'QUBO (Quadratic Unconstrained Binary Optimization) is a canonical formulation that quantum annealers (like D-Wave) natively solve. Many robotics problems (task allocation, path planning, resource scheduling) can be mapped to QUBO, making them directly solvable on quantum hardware.',
    relatedConcepts: ['qubo', 'd-wave', 'quantum-annealing', 'problem-mapping'],
    timeEstimate: 85,
    persona: ['ai-researcher', 'optimization-specialist']
  },
  {
    id: 'qar-i3',
    text: 'How do Variational Quantum Circuits (VQC) differ from classical neural networks in a robotics perception pipeline?',
    question: 'How do Variational Quantum Circuits (VQC) differ from classical neural networks in a robotics perception pipeline?',
    options: [
      'VQCs replace all layers with quantum gates',
      'VQCs use parametric quantum gates trained via classical gradient descent, potentially offering exponential feature space',
      'VQCs are faster than CNNs for image processing',
      'VQCs eliminate the need for training data'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'quantum-ai-robotics',
    subCategory: 'quantum-machine-learning',
    explanation: 'VQCs are hybrid models: parametric quantum circuits act as learnable layers, trained using classical optimizers (gradient descent, Adam). The quantum circuit can access exponentially large Hilbert spaces for feature representation, potentially offering advantages for certain pattern classification tasks in robotics perception.',
    relatedConcepts: ['vqc', 'quantum-neural-networks', 'hybrid-learning'],
    timeEstimate: 100,
    persona: ['ml-engineer', 'ai-researcher']
  },
  {
    id: 'qar-i4',
    text: 'A warehouse robot must visit 15 pickup stations. Which quantum approach would be most appropriate?',
    question: 'A warehouse robot must visit 15 pickup stations. Which quantum approach would be most appropriate?',
    options: [
      'Variational Quantum Eigensolver (VQE) for molecular simulation',
      'QAOA on gate-based quantum computer for Traveling Salesman Problem approximation',
      'Quantum Fourier Transform for signal processing',
      'Grover\'s algorithm for database search'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'quantum-ai-robotics',
    subCategory: 'path-planning',
    explanation: 'This is a Traveling Salesman Problem variant (visiting all stations with minimal total distance). QAOA is designed for combinatorial optimization and can find approximate solutions to TSP on current NISQ devices. VQE is for chemistry, QFT for signal processing, and Grover\'s for unstructured search.',
    relatedConcepts: ['qaoa', 'tsp', 'path-planning', 'warehouse-robotics'],
    timeEstimate: 95,
    persona: ['robotics-engineer', 'logistics-specialist']
  },
  {
    id: 'qar-i5',
    text: 'What is the primary challenge when integrating quantum sensors (e.g., NV-diamond magnetometers) into a classical robotics stack?',
    question: 'What is the primary challenge when integrating quantum sensors (e.g., NV-diamond magnetometers) into a classical robotics stack?',
    options: [
      'Quantum sensors are too expensive for any commercial use',
      'Sensor fusion: calibrating and fusing quantum sensor outputs with classical sensors (IMU, LiDAR)',
      'Quantum sensors only work in zero-gravity environments',
      'Quantum sensors require cryogenic cooling incompatible with mobile robots'
    ],
    correctAnswer: 1,
    difficulty: 'intermediate',
    category: 'quantum-ai-robotics',
    subCategory: 'sensor-integration',
    explanation: 'The main engineering challenge is sensor fusion: quantum sensors output high-precision data but may have different coordinate frames, sampling rates, and noise characteristics than classical sensors. Calibration and Kalman filtering techniques must fuse quantum (e.g., magnetic field) with classical (e.g., visual odometry) measurements for robust state estimation.',
    relatedConcepts: ['quantum-sensing', 'sensor-fusion', 'nv-diamond', 'state-estimation'],
    timeEstimate: 105,
    persona: ['robotics-engineer', 'sensor-specialist']
  },

  // Advanced Level Questions
  {
    id: 'qar-a1',
    text: 'When formulating a multi-robot task allocation problem for quantum annealing, which encoding strategy minimizes qubit overhead while preserving constraint enforcement?',
    question: 'When formulating a multi-robot task allocation problem for quantum annealing, which encoding strategy minimizes qubit overhead while preserving constraint enforcement?',
    options: [
      'One-hot encoding with quadratic penalty terms for constraints',
      'Binary encoding with recursive constraint propagation',
      'Analog continuous encoding mapped to qubit amplitudes',
      'Direct gate-based representation using Hamiltonian simulation'
    ],
    correctAnswer: 0,
    difficulty: 'advanced',
    category: 'quantum-ai-robotics',
    subCategory: 'problem-encoding',
    explanation: 'One-hot encoding (one qubit per assignment choice) combined with quadratic penalty terms is the standard approach for quantum annealing on D-Wave. Constraints (e.g., "each task assigned exactly once") become penalty energy terms in the QUBO Hamiltonian. This approach balances qubit efficiency with constraint satisfaction.',
    relatedConcepts: ['qubo-encoding', 'constraint-optimization', 'quantum-annealing'],
    timeEstimate: 120,
    persona: ['quantum-engineer', 'optimization-specialist']
  },
  {
    id: 'qar-a2',
    text: 'A robot manipulation task requires optimizing over a 20-dimensional continuous configuration space. Which quantum technique offers the most promise?',
    question: 'A robot manipulation task requires optimizing over a 20-dimensional continuous configuration space. Which quantum technique offers the most promise?',
    options: [
      'Discretize the space and use QAOA with exponentially many qubits',
      'Use a hybrid VQC with continuous-variable quantum computing (CVQC) for native continuous optimization',
      'Apply quantum teleportation to transfer solutions between robots',
      'Use Shor\'s algorithm to factorize the configuration space'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'quantum-ai-robotics',
    subCategory: 'continuous-optimization',
    explanation: 'Continuous-Variable Quantum Computing (CVQC), using photonic platforms like Xanadu\'s, can natively represent and optimize over continuous spaces without discretization overhead. VQCs on CVQC hardware can encode joint angles and positions as continuous quantum states, potentially offering advantages for high-dimensional manipulation planning.',
    relatedConcepts: ['cvqc', 'photonic-quantum-computing', 'manipulation-planning'],
    timeEstimate: 130,
    persona: ['quantum-researcher', 'robotics-researcher']
  },
  {
    id: 'qar-a3',
    text: 'How would you design a fault-tolerant quantum-classical feedback loop for real-time robot control?',
    question: 'How would you design a fault-tolerant quantum-classical feedback loop for real-time robot control?',
    options: [
      'Run quantum solver at 1kHz with deterministic latency guarantees',
      'Use quantum for offline planning, classical for real-time control, with periodic quantum re-planning every 10-30 seconds',
      'Implement full quantum error correction for all control computations',
      'Replace all classical controllers with quantum circuits'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'quantum-ai-robotics',
    subCategory: 'system-design',
    explanation: 'Current quantum computers have high latency (100ms-1s cloud API calls, variable execution time) and limited error correction. The practical architecture: classical PID/MPC for real-time control (<1ms), quantum solver for periodic high-level re-planning (task sequences, waypoints) every 10-30 seconds when environment changes. This hybrid approach leverages quantum where it helps without compromising safety.',
    relatedConcepts: ['hybrid-control', 'real-time-systems', 'fault-tolerance'],
    timeEstimate: 140,
    persona: ['system-architect', 'robotics-engineer']
  },
  {
    id: 'qar-a4',
    text: 'What is the theoretical basis for quantum advantage in sampling-based motion planning (e.g., RRT)?',
    question: 'What is the theoretical basis for quantum advantage in sampling-based motion planning (e.g., RRT)?',
    options: [
      'Quantum computers sample random configurations faster than classical PRNGs',
      'Quantum amplitude amplification can bias sampling toward collision-free regions of configuration space',
      'Quantum entanglement allows simultaneous exploration of all tree branches',
      'Quantum computers eliminate the need for collision checking'
    ],
    correctAnswer: 1,
    difficulty: 'advanced',
    category: 'quantum-ai-robotics',
    subCategory: 'motion-planning',
    explanation: 'Quantum amplitude amplification (generalization of Grover\'s algorithm) can amplify the probability amplitudes of "good" configurations (collision-free, goal-directed) while suppressing "bad" ones. This allows quantum-enhanced sampling-based planners to find feasible paths with fewer samples than classical random sampling, potentially quadratic speedup for certain configuration spaces.',
    relatedConcepts: ['amplitude-amplification', 'grovers-algorithm', 'rrt', 'motion-planning'],
    timeEstimate: 135,
    persona: ['quantum-researcher', 'motion-planning-specialist']
  },
  {
    id: 'qar-a5',
    text: 'In a multi-robot swarm using quantum key distribution (QKD) for secure coordination, what is the primary operational constraint?',
    question: 'In a multi-robot swarm using quantum key distribution (QKD) for secure coordination, what is the primary operational constraint?',
    options: [
      'QKD requires direct line-of-sight or fiber connections between robots, limiting topology',
      'QKD uses too much battery power for mobile robots',
      'QKD can only secure communication between exactly 2 robots',
      'QKD requires all robots to have quantum computers onboard'
    ],
    correctAnswer: 0,
    difficulty: 'advanced',
    category: 'quantum-ai-robotics',
    subCategory: 'quantum-communication',
    explanation: 'Quantum Key Distribution relies on transmitting photons through free-space or fiber-optic channels. For mobile robots, this means line-of-sight constraints or network topology limitations. Current QKD distances: ~100km free-space, longer with fiber. For swarms, hybrid approaches use QKD for critical key exchange and classical encrypted channels for data, with careful network planning.',
    relatedConcepts: ['qkd', 'quantum-cryptography', 'swarm-robotics', 'secure-communication'],
    timeEstimate: 125,
    persona: ['security-engineer', 'quantum-engineer', 'swarm-specialist']
  }
];
