/**
 * Knowledge Integration Service for SCL
 * Bridges SCL system with existing concept/pattern database
 */

import { conceptContents, type ConceptContent } from '@/lib/data/conceptContent';
import type { SCLContextSummary, SCLSession } from '@/types/supercritical';

// Pattern data structure (assuming similar to concepts)
export interface PatternContent {
  id: string;
  name: string;
  description: string;
  applicability: string[];
  tradeoffs: string[];
  implementation: string;
  examples: {
    title: string;
    description: string;
    considerations?: string[];
  }[];
}

// For now, we'll create sample pattern data since it's stored as static files
const samplePatterns: PatternContent[] = [
  {
    id: 'agent-orchestration',
    name: 'Agent Orchestration Pattern',
    description: 'Coordinating multiple AI agents to work together on complex tasks',
    applicability: ['Multi-step workflows', 'Complex decision making', 'Specialized expertise'],
    tradeoffs: ['Coordination overhead', 'Complexity management', 'Error propagation'],
    implementation: 'Use central orchestrator or peer-to-peer coordination',
    examples: [
      {
        title: 'Research Analysis Pipeline',
        description: 'Research agent → Analysis agent → Synthesis agent',
        considerations: ['Data flow design', 'Error handling', 'State management']
      }
    ]
  },
  {
    id: 'tool-calling',
    name: 'Tool Calling Pattern',
    description: 'Enabling agents to interact with external tools and APIs',
    applicability: ['Data retrieval', 'Action execution', 'System integration'],
    tradeoffs: ['Security concerns', 'Reliability dependencies', 'Permission management'],
    implementation: 'Function calling with structured schemas and validation',
    examples: [
      {
        title: 'Database Query Agent',
        description: 'Agent with SQL query tools for data analysis',
        considerations: ['Query safety', 'Data access control', 'Result formatting']
      }
    ]
  }
];

export class KnowledgeIntegrationService {
  private concepts: ConceptContent[];
  private patterns: PatternContent[];

  constructor() {
    this.concepts = conceptContents;
    this.patterns = samplePatterns; // In a real app, this would come from the database
  }

  /**
   * Get concepts by IDs for SCL context
   */
  getConceptsByIds(conceptIds: string[]): ConceptContent[] {
    return this.concepts.filter(concept => 
      conceptIds.includes(concept.id)
    );
  }

  /**
   * Get patterns by IDs for SCL context
   */
  getPatternsByIds(patternIds: string[]): PatternContent[] {
    return this.patterns.filter(pattern => 
      patternIds.includes(pattern.id)
    );
  }

  /**
   * Build context summary for SCL generation
   */
  buildContextSummary(session: SCLSession): SCLContextSummary {
    const concepts = this.getConceptsByIds(session.seeds.conceptIds);
    const patterns = this.getPatternsByIds(session.seeds.patternIds);

    return {
      concepts: concepts.map(concept => ({
        id: concept.id,
        title: concept.name,
        keyMechanisms: concept.keyFeatures.slice(0, 3), // Top 3 features
        dependencies: concept.implementationConsiderations?.slice(0, 2) || [], // Implementation requirements
        guarantees: [`${concept.name} functionality`, 'Azure integration support'], // Basic guarantees
      })),
      patterns: patterns.map(pattern => ({
        id: pattern.id,
        title: pattern.name,
        components: pattern.examples.map(e => e.title), // Extract components from examples
        tradeoffs: pattern.tradeoffs,
        applicability: pattern.applicability,
      })),
      practices: session.seeds.practices.map((practice, index) => ({
        id: `practice-${index}`,
        title: practice,
        outcomes: [`Improved ${practice}`, `Better system ${practice}`], // Generic outcomes
        prerequisites: ['Team training', 'Infrastructure setup'], // Generic prerequisites
        risks: ['Implementation complexity', 'Adoption resistance'], // Generic risks
      }))
    };
  }

  /**
   * Search concepts by keywords
   */
  searchConcepts(keywords: string[]): ConceptContent[] {
    const searchTerms = keywords.map(k => k.toLowerCase());
    
    return this.concepts.filter(concept => {
      const searchableText = [
        concept.name,
        concept.description,
        ...concept.keyFeatures,
        ...concept.applicationAreas
      ].join(' ').toLowerCase();
      
      return searchTerms.some(term => searchableText.includes(term));
    });
  }

  /**
   * Search patterns by keywords
   */
  searchPatterns(keywords: string[]): PatternContent[] {
    const searchTerms = keywords.map(k => k.toLowerCase());
    
    return this.patterns.filter(pattern => {
      const searchableText = [
        pattern.name,
        pattern.description,
        ...pattern.applicability,
        ...pattern.tradeoffs
      ].join(' ').toLowerCase();
      
      return searchTerms.some(term => searchableText.includes(term));
    });
  }

  /**
   * Get related concepts for a given concept
   */
  getRelatedConcepts(conceptId: string, limit = 3): ConceptContent[] {
    const baseConcept = this.concepts.find(c => c.id === conceptId);
    if (!baseConcept) return [];

    // Simple similarity based on shared application areas
    const related = this.concepts
      .filter(c => c.id !== conceptId)
      .map(concept => ({
        concept,
        similarity: this.calculateConceptSimilarity(baseConcept, concept)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map(item => item.concept);

    return related;
  }

  /**
   * Database architecture explanation
   */
  getDatabaseArchitecture(): {
    backend: string;
    frontend: string;
    integration: string;
  } {
    return {
      backend: `
        PostgreSQL Implementation:
        - Users, CommunityPosts, QuizQuestions stored in PostgreSQL
        - Located: backend/app/database/postgres_repository.py
        - Provides: User progress, quiz data, community features
      `,
      frontend: `
        Static TypeScript Files:
        - Concepts: src/lib/data/conceptContent.ts (623 lines)
        - No database queries - direct imports
        - Fast loading, no API calls for concept data
      `,
      integration: `
        Hybrid Approach:
        - Static data for concepts/patterns (fast access)
        - PostgreSQL for user data/progress (persistent storage)
        - SCL uses static data as knowledge base
        - User sessions stored separately
      `
    };
  }

  // Private helper methods
  private assessConceptMaturity(concept: ConceptContent): 'experimental' | 'emerging' | 'mature' {
    // Simple heuristic based on description length and features
    if (concept.keyFeatures.length >= 6 && concept.applicationAreas.length >= 6) {
      return 'mature';
    } else if (concept.keyFeatures.length >= 4) {
      return 'emerging';
    }
    return 'experimental';
  }

  private identifyAdoptionBarriers(concept: ConceptContent): string[] {
    // Extract potential barriers from implementation considerations
    const barriers = concept.implementationConsiderations || [];
    return barriers.slice(0, 3);
  }

  private assessPatternMaturity(pattern: PatternContent): 'experimental' | 'emerging' | 'mature' {
    // Based on number of examples and tradeoffs identified
    if (pattern.examples.length >= 3 && pattern.tradeoffs.length >= 3) {
      return 'mature';
    } else if (pattern.examples.length >= 1) {
      return 'emerging';
    }
    return 'experimental';
  }

  private assessPatternComplexity(pattern: PatternContent): 'low' | 'medium' | 'high' {
    // Based on tradeoffs and applicability scope
    const complexityScore = pattern.tradeoffs.length + pattern.applicability.length;
    if (complexityScore >= 6) return 'high';
    if (complexityScore >= 3) return 'medium';
    return 'low';
  }

  private calculateConceptSimilarity(concept1: ConceptContent, concept2: ConceptContent): number {
    const areas1 = new Set(concept1.applicationAreas);
    const areas2 = new Set(concept2.applicationAreas);
    
    const intersection = new Set([...areas1].filter(x => areas2.has(x)));
    const union = new Set([...areas1, ...areas2]);
    
    return intersection.size / union.size; // Jaccard similarity
  }
}

// Export singleton instance
export const knowledgeService = new KnowledgeIntegrationService();
