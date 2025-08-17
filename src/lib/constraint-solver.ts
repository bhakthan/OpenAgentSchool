/**
 * Constraint Satisfaction Solver for SCL
 * Handles complex constraint solving and optimization for effect generation
 */

export interface Constraint {
  id: string;
  type: 'resource' | 'temporal' | 'logical' | 'business' | 'technical';
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  parameters: Record<string, any>;
  violationPenalty: number;
}

export interface Variable {
  id: string;
  name: string;
  domain: any[];
  currentValue?: any;
  type: 'discrete' | 'continuous' | 'boolean' | 'categorical';
}

export interface Solution {
  variables: Record<string, any>;
  constraints: Constraint[];
  score: number;
  violations: Array<{
    constraintId: string;
    severity: number;
    description: string;
  }>;
  feasible: boolean;
}

export class ConstraintSolver {
  private constraints: Map<string, Constraint> = new Map();
  private variables: Map<string, Variable> = new Map();
  private maxIterations: number = 1000;
  private convergenceThreshold: number = 0.001;

  constructor(options?: { maxIterations?: number; convergenceThreshold?: number }) {
    if (options?.maxIterations) this.maxIterations = options.maxIterations;
    if (options?.convergenceThreshold) this.convergenceThreshold = options.convergenceThreshold;
  }

  // Add constraint to the system
  addConstraint(constraint: Constraint): void {
    this.constraints.set(constraint.id, constraint);
  }

  // Add variable to the system
  addVariable(variable: Variable): void {
    this.variables.set(variable.id, variable);
  }

  // Remove constraint
  removeConstraint(constraintId: string): boolean {
    return this.constraints.delete(constraintId);
  }

  // Remove variable
  removeVariable(variableId: string): boolean {
    return this.variables.delete(variableId);
  }

  // Evaluate constraint satisfaction for a given assignment
  private evaluateConstraints(assignment: Record<string, any>): {
    score: number;
    violations: Array<{ constraintId: string; severity: number; description: string }>;
  } {
    let totalScore = 0;
    const violations: Array<{ constraintId: string; severity: number; description: string }> = [];

    for (const [constraintId, constraint] of this.constraints) {
      const { satisfied, penalty, description } = this.evaluateConstraint(constraint, assignment);
      
      if (!satisfied) {
        violations.push({
          constraintId,
          severity: penalty,
          description: description || `Constraint ${constraintId} violated`,
        });
        totalScore -= penalty * this.getPriorityMultiplier(constraint.priority);
      } else {
        totalScore += 10; // Reward for satisfying constraints
      }
    }

    return { score: totalScore, violations };
  }

  // Evaluate individual constraint
  private evaluateConstraint(
    constraint: Constraint, 
    assignment: Record<string, any>
  ): { satisfied: boolean; penalty: number; description?: string } {
    switch (constraint.type) {
      case 'resource':
        return this.evaluateResourceConstraint(constraint, assignment);
      case 'temporal':
        return this.evaluateTemporalConstraint(constraint, assignment);
      case 'logical':
        return this.evaluateLogicalConstraint(constraint, assignment);
      case 'business':
        return this.evaluateBusinessConstraint(constraint, assignment);
      case 'technical':
        return this.evaluateTechnicalConstraint(constraint, assignment);
      default:
        return { satisfied: true, penalty: 0 };
    }
  }

  // Resource constraint evaluation (budget, team size, etc.)
  private evaluateResourceConstraint(
    constraint: Constraint, 
    assignment: Record<string, any>
  ): { satisfied: boolean; penalty: number; description?: string } {
    const { resourceType, maxAmount, requiredResources } = constraint.parameters;
    
    let totalUsage = 0;
    for (const resourceId of requiredResources || []) {
      if (assignment[resourceId]) {
        totalUsage += assignment[resourceId];
      }
    }

    const satisfied = totalUsage <= maxAmount;
    const penalty = satisfied ? 0 : (totalUsage - maxAmount) * constraint.violationPenalty;
    
    return {
      satisfied,
      penalty,
      description: satisfied ? undefined : `${resourceType} usage (${totalUsage}) exceeds limit (${maxAmount})`,
    };
  }

  // Temporal constraint evaluation (deadlines, dependencies)
  private evaluateTemporalConstraint(
    constraint: Constraint, 
    assignment: Record<string, any>
  ): { satisfied: boolean; penalty: number; description?: string } {
    const { deadline, dependencies, timeEstimates } = constraint.parameters;
    
    let maxCompletionTime = 0;
    for (const depId of dependencies || []) {
      if (assignment[depId] && timeEstimates[depId]) {
        maxCompletionTime = Math.max(maxCompletionTime, assignment[depId] + timeEstimates[depId]);
      }
    }

    const satisfied = maxCompletionTime <= deadline;
    const penalty = satisfied ? 0 : (maxCompletionTime - deadline) * constraint.violationPenalty;
    
    return {
      satisfied,
      penalty,
      description: satisfied ? undefined : `Completion time (${maxCompletionTime}) exceeds deadline (${deadline})`,
    };
  }

  // Logical constraint evaluation (dependencies, exclusions)
  private evaluateLogicalConstraint(
    constraint: Constraint, 
    assignment: Record<string, any>
  ): { satisfied: boolean; penalty: number; description?: string } {
    const { type: logicType, variables: constraintVars } = constraint.parameters;
    
    switch (logicType) {
      case 'implies':
        const [antecedent, consequent] = constraintVars;
        const satisfied = !assignment[antecedent] || assignment[consequent];
        return {
          satisfied,
          penalty: satisfied ? 0 : constraint.violationPenalty,
          description: satisfied ? undefined : `If ${antecedent} then ${consequent} must be true`,
        };
      
      case 'exclusive':
        const activeCount = constraintVars.filter((v: string) => assignment[v]).length;
        const exclusiveSatisfied = activeCount <= 1;
        return {
          satisfied: exclusiveSatisfied,
          penalty: exclusiveSatisfied ? 0 : (activeCount - 1) * constraint.violationPenalty,
          description: exclusiveSatisfied ? undefined : `Only one of ${constraintVars.join(', ')} can be active`,
        };
      
      default:
        return { satisfied: true, penalty: 0 };
    }
  }

  // Business constraint evaluation
  private evaluateBusinessConstraint(
    constraint: Constraint, 
    assignment: Record<string, any>
  ): { satisfied: boolean; penalty: number; description?: string } {
    const { metricType, threshold, direction } = constraint.parameters;
    
    let currentValue = 0;
    // Calculate business metric based on assignment
    // This would be customized based on specific business rules
    
    const satisfied = direction === 'minimize' ? 
      currentValue <= threshold : 
      currentValue >= threshold;
    
    const penalty = satisfied ? 0 : Math.abs(currentValue - threshold) * constraint.violationPenalty;
    
    return {
      satisfied,
      penalty,
      description: satisfied ? undefined : `${metricType} (${currentValue}) violates ${direction} threshold (${threshold})`,
    };
  }

  // Technical constraint evaluation
  private evaluateTechnicalConstraint(
    constraint: Constraint, 
    assignment: Record<string, any>
  ): { satisfied: boolean; penalty: number; description?: string } {
    const { performanceMetric, limit, compatibility } = constraint.parameters;
    
    // Example: latency constraints, compatibility requirements
    const satisfied = true; // Simplified for now
    return {
      satisfied,
      penalty: 0,
      description: undefined,
    };
  }

  // Get priority multiplier for scoring
  private getPriorityMultiplier(priority: Constraint['priority']): number {
    switch (priority) {
      case 'critical': return 10;
      case 'high': return 5;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 1;
    }
  }

  // Genetic Algorithm solver
  solveWithGeneticAlgorithm(options?: {
    populationSize?: number;
    generations?: number;
    mutationRate?: number;
    crossoverRate?: number;
  }): Solution {
    const {
      populationSize = 100,
      generations = 200,
      mutationRate = 0.1,
      crossoverRate = 0.8,
    } = options || {};

    // Initialize population
    let population = this.initializePopulation(populationSize);
    let bestSolution: Solution | null = null;

    for (let generation = 0; generation < generations; generation++) {
      // Evaluate fitness
      const evaluated = population.map(individual => {
        const { score, violations } = this.evaluateConstraints(individual);
        return {
          variables: individual,
          constraints: Array.from(this.constraints.values()),
          score,
          violations,
          feasible: violations.length === 0,
        };
      });

      // Track best solution
      const currentBest = evaluated.reduce((best, current) => 
        current.score > best.score ? current : best
      );
      
      if (!bestSolution || currentBest.score > bestSolution.score) {
        bestSolution = { ...currentBest };
      }

      // Selection, crossover, and mutation
      population = this.evolvePopulation(evaluated, crossoverRate, mutationRate);

      // Early termination if feasible solution found
      if (bestSolution.feasible && bestSolution.score > 0) {
        break;
      }
    }

    return bestSolution || {
      variables: {},
      constraints: Array.from(this.constraints.values()),
      score: -Infinity,
      violations: [],
      feasible: false,
    };
  }

  // Simulated Annealing solver
  solveWithSimulatedAnnealing(options?: {
    initialTemperature?: number;
    coolingRate?: number;
    minTemperature?: number;
  }): Solution {
    const {
      initialTemperature = 1000,
      coolingRate = 0.95,
      minTemperature = 0.1,
    } = options || {};

    let currentSolution = this.generateRandomAssignment();
    let currentScore = this.evaluateConstraints(currentSolution).score;
    let bestSolution = { ...currentSolution };
    let bestScore = currentScore;
    let temperature = initialTemperature;

    while (temperature > minTemperature) {
      for (let i = 0; i < 100; i++) {
        const neighbor = this.generateNeighbor(currentSolution);
        const neighborScore = this.evaluateConstraints(neighbor).score;
        
        const delta = neighborScore - currentScore;
        
        if (delta > 0 || Math.random() < Math.exp(delta / temperature)) {
          currentSolution = neighbor;
          currentScore = neighborScore;
          
          if (currentScore > bestScore) {
            bestSolution = { ...currentSolution };
            bestScore = currentScore;
          }
        }
      }
      
      temperature *= coolingRate;
    }

    const { score, violations } = this.evaluateConstraints(bestSolution);
    
    return {
      variables: bestSolution,
      constraints: Array.from(this.constraints.values()),
      score,
      violations,
      feasible: violations.length === 0,
    };
  }

  // Helper methods for population-based algorithms
  private initializePopulation(size: number): Record<string, any>[] {
    const population: Record<string, any>[] = [];
    for (let i = 0; i < size; i++) {
      population.push(this.generateRandomAssignment());
    }
    return population;
  }

  private generateRandomAssignment(): Record<string, any> {
    const assignment: Record<string, any> = {};
    
    for (const [varId, variable] of this.variables) {
      switch (variable.type) {
        case 'boolean':
          assignment[varId] = Math.random() < 0.5;
          break;
        case 'discrete':
          assignment[varId] = variable.domain[Math.floor(Math.random() * variable.domain.length)];
          break;
        case 'continuous':
          const [min, max] = variable.domain;
          assignment[varId] = min + Math.random() * (max - min);
          break;
        case 'categorical':
          assignment[varId] = variable.domain[Math.floor(Math.random() * variable.domain.length)];
          break;
      }
    }
    
    return assignment;
  }

  private generateNeighbor(solution: Record<string, any>): Record<string, any> {
    const neighbor = { ...solution };
    const variables = Array.from(this.variables.values());
    const randomVar = variables[Math.floor(Math.random() * variables.length)];
    
    // Modify one random variable
    switch (randomVar.type) {
      case 'boolean':
        neighbor[randomVar.id] = !neighbor[randomVar.id];
        break;
      case 'discrete':
      case 'categorical':
        neighbor[randomVar.id] = randomVar.domain[Math.floor(Math.random() * randomVar.domain.length)];
        break;
      case 'continuous':
        const [min, max] = randomVar.domain;
        neighbor[randomVar.id] = min + Math.random() * (max - min);
        break;
    }
    
    return neighbor;
  }

  private evolvePopulation(
    evaluated: Solution[], 
    crossoverRate: number, 
    mutationRate: number
  ): Record<string, any>[] {
    const newPopulation: Record<string, any>[] = [];
    const sortedPopulation = evaluated.sort((a, b) => b.score - a.score);
    
    // Elitism: keep top 10%
    const eliteCount = Math.floor(evaluated.length * 0.1);
    for (let i = 0; i < eliteCount; i++) {
      newPopulation.push({ ...sortedPopulation[i].variables });
    }
    
    // Generate offspring
    while (newPopulation.length < evaluated.length) {
      const parent1 = this.selectParent(sortedPopulation);
      const parent2 = this.selectParent(sortedPopulation);
      
      let offspring1 = { ...parent1.variables };
      let offspring2 = { ...parent2.variables };
      
      // Crossover
      if (Math.random() < crossoverRate) {
        [offspring1, offspring2] = this.crossover(offspring1, offspring2);
      }
      
      // Mutation
      if (Math.random() < mutationRate) {
        offspring1 = this.mutate(offspring1);
      }
      if (Math.random() < mutationRate) {
        offspring2 = this.mutate(offspring2);
      }
      
      newPopulation.push(offspring1);
      if (newPopulation.length < evaluated.length) {
        newPopulation.push(offspring2);
      }
    }
    
    return newPopulation;
  }

  private selectParent(population: Solution[]): Solution {
    // Tournament selection
    const tournamentSize = 3;
    let best = population[Math.floor(Math.random() * population.length)];
    
    for (let i = 1; i < tournamentSize; i++) {
      const candidate = population[Math.floor(Math.random() * population.length)];
      if (candidate.score > best.score) {
        best = candidate;
      }
    }
    
    return best;
  }

  private crossover(parent1: Record<string, any>, parent2: Record<string, any>): [Record<string, any>, Record<string, any>] {
    const offspring1 = { ...parent1 };
    const offspring2 = { ...parent2 };
    
    const variables = Array.from(this.variables.keys());
    const crossoverPoint = Math.floor(Math.random() * variables.length);
    
    for (let i = crossoverPoint; i < variables.length; i++) {
      const varId = variables[i];
      offspring1[varId] = parent2[varId];
      offspring2[varId] = parent1[varId];
    }
    
    return [offspring1, offspring2];
  }

  private mutate(individual: Record<string, any>): Record<string, any> {
    return this.generateNeighbor(individual);
  }
}

export default ConstraintSolver;
