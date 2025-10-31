import { PatternData } from './types';

export const hybridQuantumClassicalPattern: PatternData = {
  id: 'hybrid-quantum-classical-agent',
  name: 'Hybrid Quantum-Classical Agent',
  description: 'Integrates quantum subroutines (QAOA, VQE, Grover) within classical agent workflows for optimization, sampling, and search acceleration.',
  category: 'Advanced',
  useCases: [
    'Portfolio optimization for financial trading agents',
    'Drug discovery molecule optimization',
    'Supply chain and logistics planning',
    'Machine learning hyperparameter tuning',
    'Cryptographic key search and security analysis'
  ],
  whenToUse: 'Adopt when facing NP-hard optimization problems, need probabilistic sampling from complex distributions, or require quadratic search speedup where classical methods hit scaling limits.',
  businessUseCase: {
    industry: 'Financial Services & Portfolio Management',
    description: 'A quantitative trading firm uses hybrid quantum-classical agents to optimize portfolios with 500+ assets under complex regulatory constraints. QAOA solves the portfolio optimization QUBO formulation in minutes vs hours for classical solvers, enabling real-time rebalancing as market conditions change. The system backtests strategies, validates compliance, and executes trades automatically.',
    visualization: () => null as any,
    enlightenMePrompt: `
Design a hybrid quantum-classical agent for automated portfolio optimization.

Provide:
- Problem encoding: Map portfolio optimization (maximize return, minimize risk, satisfy constraints) to QUBO formulation for QAOA.
- Hybrid workflow: Classical agent handles data ingestion, constraint validation, backtesting; quantum subroutine solves optimization.
- Quantum backend selection: When to use gate-based (IBM Quantum), annealing (D-Wave), or simulator based on problem size.
- Integration architecture: API calls to quantum cloud service (IBM Quantum/AWS Braket), result post-processing, fallback to classical.
- Performance monitoring: Track quantum solve time, solution quality vs classical baseline, cost per optimization.
- Risk management: Validate quantum solutions against regulatory constraints before execution.
`
  },
  nodes: [
    {
      id: 'market-data',
      type: 'input',
      data: { label: 'Market Data', nodeType: 'input', description: 'Prices, returns, correlations, constraints' },
      position: { x: 100, y: 240 }
    },
    {
      id: 'problem-encoder',
      type: 'default',
      data: { label: 'Problem Encoder', nodeType: 'planner', description: 'Formulate optimization as QUBO' },
      position: { x: 320, y: 240 }
    },
    {
      id: 'quantum-solver',
      type: 'default',
      data: { label: 'Quantum Solver', nodeType: 'llm', description: 'QAOA/VQE on quantum backend' },
      position: { x: 540, y: 180 }
    },
    {
      id: 'classical-fallback',
      type: 'default',
      data: { label: 'Classical Fallback', nodeType: 'planner', description: 'OR-Tools if quantum unavailable' },
      position: { x: 540, y: 320 }
    },
    {
      id: 'solution-validator',
      type: 'default',
      data: { label: 'Solution Validator', nodeType: 'evaluator', description: 'Check constraints, regulatory compliance' },
      position: { x: 760, y: 240 }
    },
    {
      id: 'backtester',
      type: 'default',
      data: { label: 'Backtester', nodeType: 'evaluator', description: 'Simulate strategy performance' },
      position: { x: 980, y: 180 }
    },
    {
      id: 'execution-agent',
      type: 'default',
      data: { label: 'Execution Agent', nodeType: 'executor', description: 'Place trades via broker API' },
      position: { x: 980, y: 300 }
    },
    {
      id: 'portfolio-state',
      type: 'output',
      data: { label: 'Portfolio Updated', nodeType: 'output', description: 'New allocations + telemetry' },
      position: { x: 1200, y: 240 }
    }
  ],
  edges: [
    { id: 'edge-data-encoder', source: 'market-data', target: 'problem-encoder', animated: true },
    { id: 'edge-encoder-quantum', source: 'problem-encoder', target: 'quantum-solver', animated: true, label: 'QUBO' },
    { id: 'edge-encoder-classical', source: 'problem-encoder', target: 'classical-fallback', animated: true, label: 'If Q unavailable' },
    { id: 'edge-quantum-validator', source: 'quantum-solver', target: 'solution-validator', animated: true },
    { id: 'edge-classical-validator', source: 'classical-fallback', target: 'solution-validator', animated: true },
    { id: 'edge-validator-backtest', source: 'solution-validator', target: 'backtester', animated: true },
    { id: 'edge-backtest-exec', source: 'backtester', target: 'execution-agent', animated: true, label: 'If profitable' },
    { id: 'edge-exec-portfolio', source: 'execution-agent', target: 'portfolio-state', animated: true },
    { id: 'edge-validator-encoder', source: 'solution-validator', target: 'problem-encoder', animated: true, label: 'Retry if invalid', style: { strokeDasharray: '5,5' } }
  ],
  codeExample: `# Python: Hybrid quantum-classical portfolio optimization
from qiskit import QuantumCircuit
from qiskit.algorithms.optimizers import COBYLA
from qiskit.algorithms import QAOA
from qiskit_optimization import QuadraticProgram
import numpy as np

class HybridQuantumAgent:
    def __init__(self, quantum_backend='ibmq_qasm_simulator'):
        self.backend = quantum_backend
        self.classical_solver = ClassicalOptimizer()
        
    async def optimize_portfolio(self, returns, covariance, constraints):
        """Hybrid quantum-classical portfolio optimization"""
        
        # Encode as QUBO
        qubo = self.encode_portfolio_qubo(returns, covariance, constraints)
        
        try:
            # Try quantum solver first
            solution = await self.quantum_optimize(qubo)
            solution['solver'] = 'quantum'
        except QuantumBackendError:
            # Fallback to classical
            solution = await self.classical_optimize(qubo)
            solution['solver'] = 'classical'
        
        # Validate constraints
        if not self.validate_solution(solution, constraints):
            # Retry with tighter constraints
            return await self.optimize_portfolio(
                returns, covariance, self.tighten_constraints(constraints)
            )
        
        # Backtest before execution
        backtest_result = await self.backtest(solution)
        if backtest_result.sharpe_ratio > 1.5:
            await self.execute_trades(solution)
        
        return solution
    
    def encode_portfolio_qubo(self, returns, covariance, constraints):
        """Encode portfolio optimization as QUBO"""
        qp = QuadraticProgram()
        n_assets = len(returns)
        
        # Binary variables: x[i] = 1 if asset i included
        for i in range(n_assets):
            qp.binary_var(f'x_{i}')
        
        # Objective: maximize return - risk_aversion * variance
        linear = {f'x_{i}': returns[i] for i in range(n_assets)}
        quadratic = {}
        for i in range(n_assets):
            for j in range(n_assets):
                quadratic[(f'x_{i}', f'x_{j}')] = -0.5 * covariance[i, j]
        
        qp.maximize(linear=linear, quadratic=quadratic)
        
        # Constraints: budget, sector limits, etc.
        if 'budget' in constraints:
            qp.linear_constraint(
                {f'x_{i}': 1 for i in range(n_assets)},
                '<=',
                constraints['budget']
            )
        
        return qp
    
    async def quantum_optimize(self, qubo):
        """Solve with QAOA"""
        qaoa = QAOA(
            optimizer=COBYLA(maxiter=100),
            reps=3,
            quantum_instance=self.backend
        )
        
        result = qaoa.compute_minimum_eigenvalue(qubo.to_ising()[0])
        
        return {
            'solution': result.eigenstate,
            'objective_value': result.eigenvalue,
            'quantum_time': result.optimizer_time,
            'iterations': result.optimizer_evals
        }

# TypeScript: Agent orchestration with quantum integration
interface PortfolioSolution {
  allocations: Map<string, number>;
  expectedReturn: number;
  variance: number;
  solver: 'quantum' | 'classical';
}

export class QuantumPortfolioAgent {
  private quantumBackend: QuantumCloudService;
  private classicalSolver: ClassicalOptimizer;
  private broker: TradingAPI;
  
  async optimizeAndExecute(
    marketData: MarketData,
    constraints: PortfolioConstraints
  ): Promise<PortfolioSolution> {
    // Encode problem
    const qubo = this.formulateQUBO(marketData, constraints);
    
    // Solve with quantum (with timeout and fallback)
    let solution: PortfolioSolution;
    try {
      solution = await Promise.race([
        this.quantumBackend.solveQAOA(qubo, { reps: 3, optimizer: 'COBYLA' }),
        this.timeout(5000) // 5 second quantum timeout
      ]);
      solution.solver = 'quantum';
    } catch (e) {
      console.warn('Quantum solver failed, falling back to classical');
      solution = await this.classicalSolver.solve(qubo);
      solution.solver = 'classical';
    }
    
    // Validate
    if (!this.validateConstraints(solution, constraints)) {
      throw new Error('Solution violates constraints');
    }
    
    // Backtest
    const backtestResult = await this.backtest(solution, {
      historicalWindow: 252, // 1 year
      numSimulations: 1000
    });
    
    // Execute if meets criteria
    if (backtestResult.sharpeRatio > 1.5 && backtestResult.maxDrawdown < 0.15) {
      await this.broker.executeTrades(solution.allocations);
    }
    
    // Log quantum performance
    await this.logQuantumMetrics({
      solver: solution.solver,
      solveTime: solution.quantumTime,
      objectiveValue: solution.expectedReturn,
      costPerRun: 0.30 // D-Wave pricing
    });
    
    return solution;
  }
}`,
  pythonCodeExample: `# Complete implementation with D-Wave and IBM Quantum
from dwave.system import DWaveSampler, EmbeddingComposite
from qiskit import Aer, execute
from qiskit.algorithms import VQE, QAOA
import yfinance as yf

class HybridQuantumPortfolioAgent:
    def __init__(self, quantum_provider='dwave'):
        if quantum_provider == 'dwave':
            self.quantum_solver = EmbeddingComposite(DWaveSampler())
        else:
            self.quantum_solver = Aer.get_backend('qasm_simulator')
        
        self.market_data_cache = {}
        
    async def run_optimization_cycle(self):
        """Daily portfolio rebalancing with quantum optimization"""
        # Fetch market data
        assets = ['AAPL', 'GOOGL', 'MSFT', 'TSLA', 'NVDA']
        returns, covariance = await self.get_market_data(assets)
        
        # Formulate QUBO
        qubo = self.encode_markowitz_portfolio(
            returns=returns,
            covariance=covariance,
            risk_aversion=0.5,
            max_assets=10
        )
        
        # Solve with quantum annealer
        start_time = time.time()
        response = self.quantum_solver.sample_qubo(
            qubo,
            num_reads=1000,
            label='Portfolio-Opt'
        )
        quantum_time = time.time() - start_time
        
        # Parse best solution
        best_sample = response.first.sample
        portfolio_weights = self.decode_qubo_solution(best_sample, assets)
        
        # Validate
        if self.validate_portfolio(portfolio_weights):
            # Backtest
            sharpe = await self.backtest_strategy(portfolio_weights)
            
            if sharpe > 1.5:
                await self.execute_rebalance(portfolio_weights)
                
        # Log metrics
        await self.log_metrics({
            'quantum_time_ms': quantum_time * 1000,
            'energy': response.first.energy,
            'num_occurrences': response.first.num_occurrences,
            'chain_break_fraction': response.first.chain_break_fraction
        })`,
  implementation: [
    'Set up quantum cloud access: IBM Quantum (gate-based QAOA/VQE), D-Wave Leap (quantum annealing), or AWS Braket.',
    'Implement QUBO encoders for your optimization problem - map constraints and objectives to quadratic binary variables.',
    'Build hybrid orchestration: classical agent handles I/O, validation, backtesting; quantum subroutine solves optimization core.',
    'Add classical fallback: OR-Tools, Gurobi, or scipy.optimize for when quantum backend unavailable or problem too large.',
    'Monitor quantum performance: track solve time, solution quality vs classical, cost per optimization, qubit usage.',
    'Implement result validation: check constraint satisfaction, regulatory compliance, feasibility before acting on quantum solutions.'
  ],
  advantages: [
    'Quantum speedup for NP-hard problems: QAOA can find near-optimal solutions faster than classical for large problem instances.',
    'Explores solution space more thoroughly - probabilistic sampling avoids local minima traps.',
    'Scales to hundreds/thousands of variables with hybrid quantum-classical solvers (D-Wave Hybrid).',
    'Enables real-time optimization for time-sensitive applications (trading, logistics).',
    'Future-proof architecture - performance improves as quantum hardware advances.'
  ],
  limitations: [
    'Quantum cloud costs: ~$0.30 per D-Wave optimization, ~$1.60/hour IBM Quantum backend.',
    'QUBO encoding overhead - not all problems map naturally to quadratic binary form.',
    'Solution quality not always superior - classical methods competitive for small/medium problem sizes.',
    'Quantum noise and errors require error mitigation and solution validation.',
    'Backend availability - quantum cloud services may have queue times or downtime.'
  ],
  relatedPatterns: [
    'quantum-enhanced-navigator',
    'quantum-accelerated-search',
    'evaluator-optimizer',
    'orchestrator-worker'
  ],

  velocityProfile: {
    impact: 'medium',
    timeToImplement: '1-3 weeks',
    complexityReduction: 'Medium - QUBO formulation requires domain expertise, but quantum cloud APIs simplify backend integration',
    reusabilityScore: 7,
    learningCurve: 'steep',
    velocityPractices: [
      'Pattern Fluency - Applicable to finance, logistics, drug discovery, ML hyperparameter tuning, cryptography',
      'Architecture Templates - Qiskit/D-Wave + classical orchestration (FastAPI/Flask) + validation pipeline',
      'Incremental Delivery - Start with simulator, validate QUBO encoding, deploy to real quantum hardware',
      'Failure Scenario Libraries - Quantum timeout, infeasible solutions, constraint violations, backend downtime',
      'Operational Instrumentation - Track quantum solve time, cost per optimization, solution quality vs baseline'
    ]
  },

  evaluation: 'Compare quantum vs classical solve time, solution quality (objective value), constraint satisfaction rate, total cost (quantum cloud fees), and business outcome metrics (portfolio Sharpe ratio, logistics cost reduction).',
  
  evaluationProfile: {
    scenarioFocus: 'Optimization problems where quantum offers speedup or quality advantage',
    criticalMetrics: [
      'Solve time: quantum vs classical (ms)',
      'Solution quality: objective function value',
      'Constraint satisfaction rate (%)',
      'Cost per optimization (quantum cloud fees)',
      'Business outcome: Sharpe ratio, cost reduction, etc.',
      'Quantum advantage threshold: problem size where quantum wins'
    ],
    evaluationNotes: [
      'Quantum advantage typically emerges with >100 binary variables and complex constraints',
      'Track QAOA convergence - increase reps if solution quality poor',
      'A/B test quantum vs classical for your specific problem - advantages vary by problem structure',
      'Monitor quantum cloud costs - may exceed classical compute costs for small problems'
    ],
    cohort: 'advanced-automation',
    readinessSignals: [
      'Facing NP-hard optimization with >100 variables',
      'Classical solver runtime exceeds acceptable latency (>5 seconds)',
      'Need to explore multiple near-optimal solutions (not just one optimum)',
      'Budget for quantum cloud costs ($200-1000/month depending on frequency)'
    ],
    dataNeeds: [
      'Problem specification: objective function, constraints, variable bounds',
      'Baseline classical solver performance (time, solution quality)',
      'Historical data for backtesting (if applicable)',
      'Business outcome metrics to justify ROI'
    ]
  }
};
