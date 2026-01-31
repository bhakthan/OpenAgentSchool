import { PatternData } from './types';

export const skillAugmentedAgentPattern: PatternData = {
  id: 'skill-augmented-agent',
  name: 'Skill-Augmented Agent',
  description: 'Agents that dynamically load domain-specific capabilities from SKILL.md files, enabling context-aware tool selection, coding standards adherence, and project-specific knowledge injection without retraining.',
  category: 'Core',
  
  useCases: [
    'IDE coding agents loading project-specific skills',
    'Enterprise agents with department-specific knowledge',
    'Multi-tenant agents with customer-specific configurations',
    'Agent capability extension without model fine-tuning',
    'Context-aware code generation respecting project conventions'
  ],
  
  whenToUse: 'Use the Skill-Augmented Agent pattern when you need agents to adapt to different contexts without retraining. This is ideal for coding agents that need to respect project-specific conventions, enterprise agents serving multiple departments, or any scenario where agent capabilities should be extensible via configuration files rather than code changes.',

  nodes: [
    {
      id: 'skill-discovery',
      type: 'input',
      data: { label: 'Skill Discovery', nodeType: 'input', description: 'Scans workspace for SKILL.md files' },
      position: { x: 100, y: 200 }
    },
    {
      id: 'skill-parser',
      type: 'default',
      data: { label: 'Skill Parser', nodeType: 'tool', description: 'Parses SKILL.md into structured format' },
      position: { x: 280, y: 200 }
    },
    {
      id: 'capability-registry',
      type: 'default',
      data: { label: 'Capability Registry', nodeType: 'aggregator', description: 'Indexes available skills and tools' },
      position: { x: 460, y: 120 }
    },
    {
      id: 'context-injector',
      type: 'default',
      data: { label: 'Context Injector', nodeType: 'aggregator', description: 'Merges skills into system prompt' },
      position: { x: 460, y: 280 }
    },
    {
      id: 'task-analyzer',
      type: 'default',
      data: { label: 'Task Analyzer', nodeType: 'llm', description: 'Determines which skills apply' },
      position: { x: 640, y: 200 }
    },
    {
      id: 'skill-router',
      type: 'default',
      data: { label: 'Skill Router', nodeType: 'router', description: 'Routes to skill-specific handlers' },
      position: { x: 820, y: 200 }
    },
    {
      id: 'skill-executor',
      type: 'default',
      data: { label: 'Skill-Aware Executor', nodeType: 'executor', description: 'Executes with skill constraints' },
      position: { x: 1000, y: 200 }
    },
    {
      id: 'constraint-validator',
      type: 'default',
      data: { label: 'Constraint Validator', nodeType: 'evaluator', description: 'Validates against skill rules' },
      position: { x: 1180, y: 200 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Skill-Enhanced Response', nodeType: 'output' },
      position: { x: 1360, y: 200 }
    }
  ],

  edges: [
    { id: 'e1', source: 'skill-discovery', target: 'skill-parser', animated: true },
    { id: 'e2', source: 'skill-parser', target: 'capability-registry', animated: true },
    { id: 'e3', source: 'skill-parser', target: 'context-injector', animated: true },
    { id: 'e4', source: 'capability-registry', target: 'task-analyzer' },
    { id: 'e5', source: 'context-injector', target: 'task-analyzer' },
    { id: 'e6', source: 'task-analyzer', target: 'skill-router', animated: true },
    { id: 'e7', source: 'skill-router', target: 'skill-executor', animated: true },
    { id: 'e8', source: 'skill-executor', target: 'constraint-validator', animated: true },
    { id: 'e9', source: 'constraint-validator', target: 'skill-executor', label: 'Retry', style: { strokeDasharray: '5,5' } },
    { id: 'e10', source: 'constraint-validator', target: 'output', animated: true }
  ],

  evaluation: `Evaluating a Skill-Augmented Agent focuses on skill loading accuracy and constraint adherence:
- **Skill Discovery Rate:** Does the agent find and parse all relevant SKILL.md files in the workspace?
- **Capability Matching:** When given a task, does the agent correctly identify and activate relevant skills?
- **Constraint Adherence:** Does the agent's output respect the constraints defined in active skills (coding standards, forbidden patterns, required imports)?
- **Progressive Disclosure:** Does the agent request skill clarification only when necessary, avoiding information overload?
- **Skill Composition:** Can the agent combine multiple skills effectively for complex tasks?
- **Graceful Degradation:** How does the agent behave when skills are missing or malformed?`,

  implementation: [
    '1. Implement SKILL.md parser that extracts structured skill definitions',
    '2. Build capability registry that indexes skills by domain and trigger conditions',
    '3. Create context injection layer that adds relevant skills to system prompts',
    '4. Implement task analyzer that matches user queries to applicable skills',
    '5. Build skill router that activates appropriate skill handlers',
    '6. Create constraint validator that checks output against skill rules',
    '7. Add skill versioning and conflict resolution for overlapping capabilities'
  ],

  advantages: [
    'Extend agent capabilities without model retraining or code changes',
    'Enable project-specific customization via simple markdown files',
    'Support multi-tenant deployments with customer-specific skills',
    'Allow non-developers to configure agent behavior',
    'Maintain separation of concerns between core agent and domain knowledge',
    'Enable progressive capability disclosure based on context'
  ],

  limitations: [
    'Skill parsing adds latency to initial agent invocation',
    'Complex skill compositions may exceed context window limits',
    'Skill conflicts require careful resolution strategies',
    'Malformed SKILL.md files can degrade agent performance',
    'Skills cannot modify core agent reasoning patterns'
  ],

  relatedPatterns: ['model-context-protocol', 'agentic-ide', 'context-curator'],

  codeExample: `// Skill-Augmented Agent Pattern - TypeScript Implementation
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';

// ============================================
// SKILL.md Structure Definition
// ============================================

interface AgentSkill {
  name: string;
  description: string;
  version: string;
  triggers: string[];           // Keywords/patterns that activate this skill
  tools: ToolDefinition[];      // Tools this skill provides
  instructions: string[];       // Instructions to inject into prompt
  constraints: SkillConstraint[];
  examples: SkillExample[];
  dependencies?: string[];      // Other skills this depends on
}

interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, ParameterDef>;
  handler: string;              // Path to handler function
}

interface SkillConstraint {
  type: 'required' | 'forbidden' | 'preferred';
  pattern: string;
  message: string;
}

interface SkillExample {
  input: string;
  output: string;
  explanation?: string;
}

// ============================================
// Skill Parser
// ============================================

class SkillParser {
  /**
   * Parse a SKILL.md file into structured skill definition
   */
  async parseSkillFile(filePath: string): Promise<AgentSkill> {
    const content = await fs.promises.readFile(filePath, 'utf-8');
    
    // Extract YAML frontmatter
    const frontmatterMatch = content.match(/^---\\n([\\s\\S]*?)\\n---/);
    if (!frontmatterMatch) {
      throw new Error(\`No frontmatter found in \${filePath}\`);
    }
    
    const metadata = yaml.parse(frontmatterMatch[1]);
    
    // Extract sections from markdown body
    const body = content.slice(frontmatterMatch[0].length);
    
    return {
      name: metadata.name,
      description: metadata.description,
      version: metadata.version || '1.0.0',
      triggers: metadata.triggers || [],
      tools: this.extractTools(body),
      instructions: this.extractInstructions(body),
      constraints: this.extractConstraints(body),
      examples: this.extractExamples(body),
      dependencies: metadata.dependencies
    };
  }

  private extractTools(body: string): ToolDefinition[] {
    // Parse ## Tools section
    const toolsSection = this.extractSection(body, 'Tools');
    if (!toolsSection) return [];
    
    // Parse tool definitions from code blocks
    const toolBlocks = toolsSection.match(/\`\`\`(json|yaml)[\\s\\S]*?\`\`\`/g) || [];
    return toolBlocks.map(block => {
      const content = block.replace(/\`\`\`(json|yaml)?/g, '').trim();
      return yaml.parse(content);
    });
  }

  private extractInstructions(body: string): string[] {
    const section = this.extractSection(body, 'Instructions');
    if (!section) return [];
    
    // Parse bullet points
    return section
      .split('\\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\\s*/, '').trim());
  }

  private extractConstraints(body: string): SkillConstraint[] {
    const section = this.extractSection(body, 'Constraints');
    if (!section) return [];
    
    const constraints: SkillConstraint[] = [];
    const lines = section.split('\\n').filter(l => l.trim());
    
    for (const line of lines) {
      if (line.includes('REQUIRED:')) {
        constraints.push({
          type: 'required',
          pattern: line.split('REQUIRED:')[1].trim(),
          message: 'This pattern is required by the skill'
        });
      } else if (line.includes('FORBIDDEN:')) {
        constraints.push({
          type: 'forbidden',
          pattern: line.split('FORBIDDEN:')[1].trim(),
          message: 'This pattern is forbidden by the skill'
        });
      }
    }
    
    return constraints;
  }

  private extractExamples(body: string): SkillExample[] {
    const section = this.extractSection(body, 'Examples');
    if (!section) return [];
    
    // Parse example blocks
    const examples: SkillExample[] = [];
    const exampleBlocks = section.split('###').filter(b => b.trim());
    
    for (const block of exampleBlocks) {
      const inputMatch = block.match(/Input:\\s*\`([^\`]+)\`/);
      const outputMatch = block.match(/Output:\\s*\`\`\`[\\s\\S]*?\`\`\`/);
      
      if (inputMatch && outputMatch) {
        examples.push({
          input: inputMatch[1],
          output: outputMatch[0].replace(/Output:\\s*/, '').replace(/\`\`\`/g, '').trim()
        });
      }
    }
    
    return examples;
  }

  private extractSection(body: string, sectionName: string): string | null {
    const regex = new RegExp(\`## \${sectionName}\\\\s*\\\\n([\\\\s\\\\S]*?)(?=## |$)\`);
    const match = body.match(regex);
    return match ? match[1].trim() : null;
  }
}

// ============================================
// Capability Registry
// ============================================

class CapabilityRegistry {
  private skills: Map<string, AgentSkill> = new Map();
  private triggerIndex: Map<string, string[]> = new Map(); // trigger -> skill names

  register(skill: AgentSkill): void {
    this.skills.set(skill.name, skill);
    
    // Index triggers for fast lookup
    for (const trigger of skill.triggers) {
      const existing = this.triggerIndex.get(trigger.toLowerCase()) || [];
      existing.push(skill.name);
      this.triggerIndex.set(trigger.toLowerCase(), existing);
    }
  }

  findSkillsForQuery(query: string): AgentSkill[] {
    const queryLower = query.toLowerCase();
    const matchedSkillNames = new Set<string>();
    
    // Check each trigger
    for (const [trigger, skillNames] of this.triggerIndex) {
      if (queryLower.includes(trigger)) {
        skillNames.forEach(name => matchedSkillNames.add(name));
      }
    }
    
    return Array.from(matchedSkillNames)
      .map(name => this.skills.get(name)!)
      .filter(Boolean);
  }

  getAllTools(): ToolDefinition[] {
    const tools: ToolDefinition[] = [];
    for (const skill of this.skills.values()) {
      tools.push(...skill.tools);
    }
    return tools;
  }
}

// ============================================
// Context Injector
// ============================================

class ContextInjector {
  buildSystemPrompt(basePrompt: string, activeSkills: AgentSkill[]): string {
    if (activeSkills.length === 0) {
      return basePrompt;
    }

    const skillSections = activeSkills.map(skill => \`
## Active Skill: \${skill.name}
\${skill.description}

### Instructions
\${skill.instructions.map(i => \`- \${i}\`).join('\\n')}

### Constraints
\${skill.constraints.map(c => \`- [\${c.type.toUpperCase()}] \${c.pattern}: \${c.message}\`).join('\\n')}

### Examples
\${skill.examples.map(e => \`Input: \${e.input}\\nOutput: \${e.output}\`).join('\\n\\n')}
\`).join('\\n---\\n');

    return \`\${basePrompt}

# ACTIVE SKILLS
The following skills are active for this session. Follow their instructions and constraints.

\${skillSections}\`;
  }
}

// ============================================
// Constraint Validator
// ============================================

class ConstraintValidator {
  validate(output: string, skills: AgentSkill[]): ValidationResult {
    const violations: ConstraintViolation[] = [];

    for (const skill of skills) {
      for (const constraint of skill.constraints) {
        const regex = new RegExp(constraint.pattern, 'gi');
        const matches = output.match(regex);

        if (constraint.type === 'forbidden' && matches) {
          violations.push({
            skill: skill.name,
            constraint,
            matches,
            severity: 'error'
          });
        }

        if (constraint.type === 'required' && !matches) {
          violations.push({
            skill: skill.name,
            constraint,
            matches: null,
            severity: 'warning'
          });
        }
      }
    }

    return {
      valid: violations.filter(v => v.severity === 'error').length === 0,
      violations
    };
  }
}

interface ValidationResult {
  valid: boolean;
  violations: ConstraintViolation[];
}

interface ConstraintViolation {
  skill: string;
  constraint: SkillConstraint;
  matches: RegExpMatchArray | null;
  severity: 'error' | 'warning';
}

// ============================================
// Skill-Augmented Agent
// ============================================

class SkillAugmentedAgent {
  private parser: SkillParser;
  private registry: CapabilityRegistry;
  private injector: ContextInjector;
  private validator: ConstraintValidator;
  private baseSystemPrompt: string;

  constructor(baseSystemPrompt: string) {
    this.parser = new SkillParser();
    this.registry = new CapabilityRegistry();
    this.injector = new ContextInjector();
    this.validator = new ConstraintValidator();
    this.baseSystemPrompt = baseSystemPrompt;
  }

  /**
   * Discover and load all SKILL.md files from workspace
   */
  async loadSkillsFromWorkspace(workspacePath: string): Promise<void> {
    const skillFiles = await this.findSkillFiles(workspacePath);
    
    for (const filePath of skillFiles) {
      try {
        const skill = await this.parser.parseSkillFile(filePath);
        this.registry.register(skill);
        console.log(\`Loaded skill: \${skill.name} (\${skill.triggers.length} triggers)\`);
      } catch (error) {
        console.warn(\`Failed to parse skill file \${filePath}:\`, error);
      }
    }
  }

  private async findSkillFiles(dir: string): Promise<string[]> {
    const files: string[] = [];
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        files.push(...await this.findSkillFiles(fullPath));
      } else if (entry.name === 'SKILL.md' || entry.name.endsWith('.skill.md')) {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  /**
   * Execute a query with skill augmentation
   */
  async execute(query: string, llm: LLMClient): Promise<SkillAugmentedResponse> {
    // 1. Find applicable skills
    const activeSkills = this.registry.findSkillsForQuery(query);
    console.log(\`Activated \${activeSkills.length} skills: \${activeSkills.map(s => s.name).join(', ')}\`);

    // 2. Build augmented system prompt
    const systemPrompt = this.injector.buildSystemPrompt(this.baseSystemPrompt, activeSkills);

    // 3. Get available tools from active skills
    const availableTools = activeSkills.flatMap(s => s.tools);

    // 4. Execute with LLM
    let response = await llm.chat({
      systemPrompt,
      userMessage: query,
      tools: availableTools
    });

    // 5. Validate constraints
    const validation = this.validator.validate(response.content, activeSkills);

    // 6. Retry if violations
    if (!validation.valid) {
      const violationFeedback = validation.violations
        .map(v => \`- \${v.skill}: \${v.constraint.message}\`)
        .join('\\n');

      response = await llm.chat({
        systemPrompt,
        userMessage: \`Your previous response violated these constraints:\\n\${violationFeedback}\\n\\nPlease revise your response to:\\n\${query}\`,
        tools: availableTools
      });
    }

    return {
      content: response.content,
      activeSkills: activeSkills.map(s => s.name),
      validation,
      toolsUsed: response.toolCalls || []
    };
  }
}

interface SkillAugmentedResponse {
  content: string;
  activeSkills: string[];
  validation: ValidationResult;
  toolsUsed: any[];
}

// ============================================
// Example SKILL.md File
// ============================================

const exampleSkillMd = \`
---
name: TypeScript React Development
description: Skills for developing React applications with TypeScript
version: 1.0.0
triggers:
  - react
  - typescript
  - tsx
  - component
  - hook
dependencies:
  - eslint-standards
---

## Instructions

- Use functional components with hooks, not class components
- Always define explicit TypeScript types for props and state
- Use named exports, not default exports
- Prefer \\\`const\\\` arrow functions for component definitions
- Include JSDoc comments for complex components

## Constraints

REQUIRED: interface.*Props
REQUIRED: React\\.FC|React\\.ReactNode
FORBIDDEN: class.*extends.*Component
FORBIDDEN: any(?!thing)
PREFERRED: useState|useEffect|useMemo|useCallback

## Tools

\\\`\`\`yaml
name: create_component
description: Create a new React component file
parameters:
  name:
    type: string
    description: Component name in PascalCase
  props:
    type: object
    description: Props interface definition
handler: ./handlers/createComponent.ts
\\\`\`\`

## Examples

### Basic Component
Input: \\\`Create a Button component\\\`
Output:
\\\`\`\`tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  return (
    <button className={\\\`btn btn-\${variant}\\\`} onClick={onClick}>
      {label}
    </button>
  );
};
\\\`\`\`
\`;

// ============================================
// Usage Example
// ============================================

async function main() {
  // Initialize agent with base prompt
  const agent = new SkillAugmentedAgent(
    'You are a helpful coding assistant. Follow project-specific conventions when available.'
  );

  // Load skills from workspace
  await agent.loadSkillsFromWorkspace('./my-project');

  // Execute with skill augmentation
  const response = await agent.execute(
    'Create a Button component with primary and secondary variants',
    llmClient
  );

  console.log('Active Skills:', response.activeSkills);
  console.log('Response:', response.content);
  console.log('Validation:', response.validation.valid ? 'PASSED' : 'VIOLATIONS FOUND');
}`,

  pythonCodeExample: `# Skill-Augmented Agent Pattern - Python Implementation
import os
import re
import yaml
from pathlib import Path
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any
from openai import OpenAI

# ============================================
# Data Structures
# ============================================

@dataclass
class ToolDefinition:
    name: str
    description: str
    parameters: Dict[str, Any]
    handler: str

@dataclass
class SkillConstraint:
    type: str  # 'required', 'forbidden', 'preferred'
    pattern: str
    message: str

@dataclass
class SkillExample:
    input: str
    output: str
    explanation: Optional[str] = None

@dataclass
class AgentSkill:
    name: str
    description: str
    version: str
    triggers: List[str]
    tools: List[ToolDefinition] = field(default_factory=list)
    instructions: List[str] = field(default_factory=list)
    constraints: List[SkillConstraint] = field(default_factory=list)
    examples: List[SkillExample] = field(default_factory=list)
    dependencies: List[str] = field(default_factory=list)

# ============================================
# Skill Parser
# ============================================

class SkillParser:
    """Parse SKILL.md files into structured skill definitions."""
    
    def parse_skill_file(self, file_path: str) -> AgentSkill:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract YAML frontmatter
        frontmatter_match = re.match(r'^---\\n(.*?)\\n---', content, re.DOTALL)
        if not frontmatter_match:
            raise ValueError(f"No frontmatter found in {file_path}")
        
        metadata = yaml.safe_load(frontmatter_match.group(1))
        body = content[frontmatter_match.end():]
        
        return AgentSkill(
            name=metadata.get('name', 'Unknown'),
            description=metadata.get('description', ''),
            version=metadata.get('version', '1.0.0'),
            triggers=metadata.get('triggers', []),
            tools=self._extract_tools(body),
            instructions=self._extract_instructions(body),
            constraints=self._extract_constraints(body),
            examples=self._extract_examples(body),
            dependencies=metadata.get('dependencies', [])
        )
    
    def _extract_section(self, body: str, section_name: str) -> Optional[str]:
        pattern = rf'## {section_name}\\s*\\n(.*?)(?=## |$)'
        match = re.search(pattern, body, re.DOTALL)
        return match.group(1).strip() if match else None
    
    def _extract_instructions(self, body: str) -> List[str]:
        section = self._extract_section(body, 'Instructions')
        if not section:
            return []
        return [
            line.lstrip('- ').strip()
            for line in section.split('\\n')
            if line.strip().startswith('-')
        ]
    
    def _extract_constraints(self, body: str) -> List[SkillConstraint]:
        section = self._extract_section(body, 'Constraints')
        if not section:
            return []
        
        constraints = []
        for line in section.split('\\n'):
            line = line.strip()
            if 'REQUIRED:' in line:
                pattern = line.split('REQUIRED:')[1].strip()
                constraints.append(SkillConstraint('required', pattern, 'Required pattern'))
            elif 'FORBIDDEN:' in line:
                pattern = line.split('FORBIDDEN:')[1].strip()
                constraints.append(SkillConstraint('forbidden', pattern, 'Forbidden pattern'))
        
        return constraints
    
    def _extract_tools(self, body: str) -> List[ToolDefinition]:
        # Parse tool definitions from YAML code blocks
        section = self._extract_section(body, 'Tools')
        if not section:
            return []
        
        tools = []
        yaml_blocks = re.findall(r'\`\`\`yaml(.*?)\`\`\`', section, re.DOTALL)
        for block in yaml_blocks:
            try:
                tool_def = yaml.safe_load(block)
                tools.append(ToolDefinition(
                    name=tool_def['name'],
                    description=tool_def['description'],
                    parameters=tool_def.get('parameters', {}),
                    handler=tool_def.get('handler', '')
                ))
            except Exception:
                continue
        
        return tools
    
    def _extract_examples(self, body: str) -> List[SkillExample]:
        # Simplified example extraction
        return []

# ============================================
# Capability Registry
# ============================================

class CapabilityRegistry:
    """Index and lookup skills by triggers."""
    
    def __init__(self):
        self.skills: Dict[str, AgentSkill] = {}
        self.trigger_index: Dict[str, List[str]] = {}
    
    def register(self, skill: AgentSkill) -> None:
        self.skills[skill.name] = skill
        for trigger in skill.triggers:
            trigger_lower = trigger.lower()
            if trigger_lower not in self.trigger_index:
                self.trigger_index[trigger_lower] = []
            self.trigger_index[trigger_lower].append(skill.name)
    
    def find_skills_for_query(self, query: str) -> List[AgentSkill]:
        query_lower = query.lower()
        matched_names = set()
        
        for trigger, skill_names in self.trigger_index.items():
            if trigger in query_lower:
                matched_names.update(skill_names)
        
        return [self.skills[name] for name in matched_names if name in self.skills]

# ============================================
# Context Injector
# ============================================

class ContextInjector:
    """Build augmented system prompts with active skills."""
    
    def build_system_prompt(self, base_prompt: str, active_skills: List[AgentSkill]) -> str:
        if not active_skills:
            return base_prompt
        
        skill_sections = []
        for skill in active_skills:
            section = f"""
## Active Skill: {skill.name}
{skill.description}

### Instructions
{chr(10).join(f'- {i}' for i in skill.instructions)}

### Constraints
{chr(10).join(f'- [{c.type.upper()}] {c.pattern}' for c in skill.constraints)}
"""
            skill_sections.append(section)
        
        return f"""{base_prompt}

# ACTIVE SKILLS
The following skills are active. Follow their instructions and constraints.

{'---'.join(skill_sections)}"""

# ============================================
# Constraint Validator
# ============================================

@dataclass
class ConstraintViolation:
    skill: str
    constraint: SkillConstraint
    severity: str

@dataclass
class ValidationResult:
    valid: bool
    violations: List[ConstraintViolation]

class ConstraintValidator:
    """Validate agent output against skill constraints."""
    
    def validate(self, output: str, skills: List[AgentSkill]) -> ValidationResult:
        violations = []
        
        for skill in skills:
            for constraint in skill.constraints:
                matches = re.search(constraint.pattern, output, re.IGNORECASE)
                
                if constraint.type == 'forbidden' and matches:
                    violations.append(ConstraintViolation(
                        skill=skill.name,
                        constraint=constraint,
                        severity='error'
                    ))
                elif constraint.type == 'required' and not matches:
                    violations.append(ConstraintViolation(
                        skill=skill.name,
                        constraint=constraint,
                        severity='warning'
                    ))
        
        has_errors = any(v.severity == 'error' for v in violations)
        return ValidationResult(valid=not has_errors, violations=violations)

# ============================================
# Skill-Augmented Agent
# ============================================

class SkillAugmentedAgent:
    """Agent that dynamically loads and applies skills from SKILL.md files."""
    
    def __init__(self, base_system_prompt: str, llm_client: OpenAI):
        self.base_prompt = base_system_prompt
        self.client = llm_client
        self.parser = SkillParser()
        self.registry = CapabilityRegistry()
        self.injector = ContextInjector()
        self.validator = ConstraintValidator()
    
    def load_skills_from_workspace(self, workspace_path: str) -> None:
        """Discover and load all SKILL.md files."""
        skill_files = list(Path(workspace_path).rglob('SKILL.md'))
        skill_files.extend(Path(workspace_path).rglob('*.skill.md'))
        
        for file_path in skill_files:
            try:
                skill = self.parser.parse_skill_file(str(file_path))
                self.registry.register(skill)
                print(f"Loaded skill: {skill.name} ({len(skill.triggers)} triggers)")
            except Exception as e:
                print(f"Failed to parse {file_path}: {e}")
    
    def execute(self, query: str, max_retries: int = 1) -> Dict[str, Any]:
        """Execute query with skill augmentation."""
        # Find applicable skills
        active_skills = self.registry.find_skills_for_query(query)
        print(f"Activated skills: {[s.name for s in active_skills]}")
        
        # Build augmented prompt
        system_prompt = self.injector.build_system_prompt(self.base_prompt, active_skills)
        
        # Execute with LLM
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": query}
            ]
        )
        content = response.choices[0].message.content
        
        # Validate constraints
        validation = self.validator.validate(content, active_skills)
        
        # Retry if violations
        if not validation.valid and max_retries > 0:
            violation_feedback = "\\n".join(
                f"- {v.skill}: {v.constraint.pattern}" for v in validation.violations
            )
            retry_query = f"Your response violated constraints:\\n{violation_feedback}\\n\\nRevise: {query}"
            return self.execute(retry_query, max_retries - 1)
        
        return {
            "content": content,
            "active_skills": [s.name for s in active_skills],
            "validation": validation
        }

# ============================================
# Usage
# ============================================

if __name__ == "__main__":
    client = OpenAI()
    
    agent = SkillAugmentedAgent(
        base_system_prompt="You are a helpful coding assistant.",
        llm_client=client
    )
    
    agent.load_skills_from_workspace("./my-project")
    
    result = agent.execute("Create a React Button component with TypeScript")
    print(f"Active Skills: {result['active_skills']}")
    print(f"Valid: {result['validation'].valid}")
    print(f"Response:\\n{result['content']}")`,

  velocityProfile: {
    impact: 'high',
    timeToImplement: '1-2 weeks',
    complexityReduction: 'High - declarative skills replace hardcoded prompts and tool configs',
    reusabilityScore: 10,
    learningCurve: 'gentle',
    velocityPractices: [
      'Dynamic Capability Loading - Skills discovered at runtime without code changes',
      'Declarative Configuration - Markdown-based skill definitions accessible to non-developers',
      'Context-Aware Activation - Automatic skill selection based on task analysis',
      'Constraint Enforcement - Built-in validation against skill-defined rules',
      'Composable Skills - Mix and match skills for complex multi-domain tasks'
    ]
  }
};
