# Agent Pattern Template

This document serves as the comprehensive template for implementing new agent patterns in OpenAgentSchool. Every agent pattern must follow this structure to ensure consistency, completeness, and quality.

## Overview

Agent patterns in OpenAgentSchool combine technical implementation with business context to create a comprehensive learning experience. Each pattern includes educational content, business applications, interactive visualizations, and assessment materials.

## Template Structure

### 1. Core Pattern Definition (`PatternData` Interface)

```typescript
export const [patternName]Pattern: PatternData = {
  id: 'pattern-id',                    // Unique identifier, kebab-case
  name: 'Pattern Name',                // Display name
  description: 'Brief description',    // One-sentence summary
  category: 'Core|Advanced|Multi-Agent', // Pattern category
  useCases: ['Use Case 1', 'Use Case 2'], // Array of use cases
  whenToUse: 'Detailed explanation...',   // When to use this pattern
  
  // Business Use Case - REQUIRED
  businessUseCase: {
    industry: 'Industry Name',
    description: 'Detailed business scenario...',
    visualization: BusinessVisualComponent,
    enlightenMePrompt: 'Technical implementation guide prompt...'
  },
  
  // Visual Flow - REQUIRED
  nodes: [/* ReactFlow nodes */],
  edges: [/* ReactFlow edges */],
  
  // Implementation Details - REQUIRED
  codeExample: 'Brief code example...',
  pythonCodeExample: 'Complete Python implementation...',
  implementation: [
    'Step 1: Implementation step',
    'Step 2: Next step',
    // ... more steps
  ],
  
  // Pattern Analysis - REQUIRED
  advantages: [
    'Advantage 1',
    'Advantage 2',
    // ... more advantages
  ],
  limitations: [
    'Limitation 1',
    'Limitation 2',
    // ... more limitations
  ],
  relatedPatterns: [
    'pattern-id-1',
    'pattern-id-2',
    // ... related pattern IDs
  ]
};
```

### 2. Educational Content Integration

Each pattern must include educational content in `patternContent.ts`:

```typescript
{
  id: 'pattern-id',
  name: 'Pattern Name',
  longDescription: `
    Comprehensive technical description covering:
    - Architecture overview
    - Key components and their interactions
    - Implementation considerations
    - Advanced features and capabilities
  `,
  advantages: [/* Detailed advantages */],
  limitations: [/* Detailed limitations */],
  realWorldApplications: [
    'Application 1: Detailed description',
    'Application 2: Detailed description',
    // At least 6-8 real-world applications
  ],
  bestPractices: [
    'Best practice 1 with implementation details',
    'Best practice 2 with specific guidance',
    // At least 6-8 best practices
  ],
  relatedPatterns: ['related-pattern-ids']
}
```

### 3. Knowledge Assessment - REQUIRED

Every pattern must include comprehensive assessment materials:

#### A. Quiz Questions (`agent-patterns.ts`)
- **Beginner Level**: Basic understanding (2-3 questions)
- **Intermediate Level**: Applied knowledge (2-3 questions)  
- **Advanced Level**: Complex scenarios (1-2 questions)

#### B. Socratic Questions (`socraticQuestions.ts`)
- **3 progressive questions** that guide discovery
- Focus on "why" and "how" rather than "what"
- Build from basic concepts to complex applications

#### C. Debug Challenges (`debugChallenges.ts`)
- **2 realistic debugging scenarios**
- Common implementation problems
- Step-by-step resolution process

#### D. Interactive Scenarios (`scenarios.ts`)
- **1 comprehensive business scenario**
- Multi-step decision-making process
- Real-world application context

### 4. Business Integration - REQUIRED

#### Business Use Case Requirements:
- **Industry Focus**: Specific industry context
- **Realistic Scenario**: Authentic business challenge
- **Measurable Outcomes**: Clear value proposition
- **Technical Integration**: Connection to Azure services
- **Visualization Component**: Custom React component

#### Business Best Practices:
- Must include business-focused best practices in `BestPractices.tsx`
- Link technical implementation to business value
- Address enterprise considerations (security, scalability, compliance)

### 5. Tree View Integration - REQUIRED

Each pattern must be added to the D3TreeVisualization:

```typescript
// In appropriate category node
{
  id: 'pattern-id',
  name: 'Pattern Name',
  type: 'pattern',
  category: 'appropriate-category',
  isNovel: true, // For new patterns
  children: []
}
```

### 6. System Design Pattern (Optional but Recommended)

Create corresponding system design pattern in `src/lib/data/systemDesign/`:

```typescript
export const [patternName]SystemDesign: SystemDesignPattern = {
  id: 'pattern-id',
  name: 'Pattern Name System Design',
  overview: 'Comprehensive system design overview...',
  // ... complete system design specification
};
```

## Quality Standards

### Technical Requirements
- ✅ Type safety with complete TypeScript interfaces
- ✅ Error-free compilation and runtime execution
- ✅ Proper ReactFlow node/edge definitions
- ✅ Complete Python implementation examples
- ✅ Azure service integration examples

### Educational Requirements
- ✅ Comprehensive knowledge assessment (quiz, socratic, debug, scenarios)
- ✅ Progressive difficulty levels (beginner → intermediate → advanced)
- ✅ Real-world application examples
- ✅ Business context and value proposition
- ✅ Implementation best practices

### Business Requirements
- ✅ Industry-specific use case with measurable outcomes
- ✅ Custom visualization component for business scenario
- ✅ Enterprise considerations (security, scalability, compliance)
- ✅ Clear connection between technical pattern and business value

### Integration Requirements
- ✅ Tree view integration with appropriate categorization
- ✅ Pattern cross-references and relationships
- ✅ Consistent naming and ID conventions
- ✅ BestPractices component integration

## Examples of Excellence

### Deep Agents Pattern
The Deep Agents pattern exemplifies the complete template implementation:

- **Comprehensive Architecture**: Four-component system (Main Agent, Planning Tools, Sub-Agents, Virtual File System)
- **Business Integration**: Management consulting industry with market research automation
- **Educational Completeness**: Full knowledge assessment across all learning modes
- **Technical Depth**: Complete TypeScript/Python implementations with Azure integration
- **Quality Assurance**: Multiple review cycles and iterative refinement process

### Key Success Factors:
1. **Four-Component Architecture** clearly defined and implemented
2. **Business Use Case** directly demonstrates technical capabilities
3. **Educational Framework** supports multiple learning styles
4. **Azure Integration** shows production-ready implementation
5. **Quality Processes** ensure enterprise-grade reliability

## Implementation Checklist

Before submitting a new agent pattern, ensure:

- [ ] Core PatternData interface completely implemented
- [ ] Business use case with industry context and visualization
- [ ] Complete educational content in patternContent.ts
- [ ] Knowledge assessment materials (quiz, socratic, debug, scenarios)
- [ ] Business best practices in BestPractices.tsx
- [ ] Tree view integration in D3TreeVisualization.tsx
- [ ] ReactFlow nodes and edges properly defined
- [ ] Python implementation example included
- [ ] Azure service integration demonstrated
- [ ] Related patterns properly cross-referenced
- [ ] TypeScript compilation without errors
- [ ] Runtime testing completed
- [ ] Documentation reviewed for clarity and completeness

## Notes

This template reflects the enhanced standards established by the Deep Agents pattern implementation, which serves as the reference implementation for comprehensive agent pattern development in OpenAgentSchool.

All patterns should strive to match the depth, quality, and educational value demonstrated by Deep Agents while adapting the structure to their specific technical and business requirements.
