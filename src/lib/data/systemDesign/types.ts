export interface SystemDesignStep {
  id: string;
  title: string;
  category: 'prompt' | 'context' | 'knowledge' | 'evaluation' | 'architecture' | 'tools' | 'instruction';
  description: string;
  details: string;
  considerations: string[];
  bestPractices: string[];
  patterns?: string[];
  examples?: string[];
  connections?: string[]; // IDs of related steps
}

export interface SystemDesignPattern {
  id: string;
  name: string;
  overview: string;
  problemStatement: string;
  solution: string;
  steps: SystemDesignStep[];
  architecture: {
    components: Array<{
      name: string;
      type: 'input' | 'processing' | 'storage' | 'output' | 'control';
      description: string;
    }>;
    flows: Array<{
      from: string;
      to: string;
      description: string;
    }>;
  };
}

export interface PatternSystemDesigns {
  [key: string]: SystemDesignPattern;
}
