import { PatternData } from './types';

export const agenticIDEPattern: PatternData = {
  id: 'agentic-ide',
  name: 'Agentic IDE',
  description: 'AI agents deeply integrated into code editors (VS Code, Cursor, Windsurf) with full workspace context, file system access, terminal execution, and multi-file editing capabilities for autonomous coding assistance.',
  category: 'Core',
  
  useCases: [
    'Autonomous code generation across multiple files',
    'Intelligent refactoring with full codebase context',
    'Bug fixing with access to error logs and test results',
    'Feature implementation from natural language specs',
    'Code review and improvement suggestions',
    'Documentation generation from code analysis'
  ],
  
  whenToUse: 'Use the Agentic IDE pattern when building coding assistants that need deep integration with development environments. This pattern is essential when agents need to read/write files, execute terminal commands, understand project structure, and make coordinated changes across multiple files. It\'s the backbone of tools like GitHub Copilot Agent Mode, Cursor, and Windsurf.',

  nodes: [
    {
      id: 'user-intent',
      type: 'input',
      data: { label: 'User Intent', nodeType: 'input', description: 'Natural language coding request' },
      position: { x: 100, y: 200 }
    },
    {
      id: 'context-collector',
      type: 'default',
      data: { label: 'Context Collector', nodeType: 'aggregator', description: 'Gathers workspace context' },
      position: { x: 280, y: 120 }
    },
    {
      id: 'skill-loader',
      type: 'default',
      data: { label: 'Skill Loader', nodeType: 'tool', description: 'Loads SKILL.md files' },
      position: { x: 280, y: 280 }
    },
    {
      id: 'task-planner',
      type: 'default',
      data: { label: 'Task Planner', nodeType: 'planner', description: 'Plans multi-step changes' },
      position: { x: 460, y: 200 }
    },
    {
      id: 'agent-loop',
      type: 'default',
      data: { label: 'Agent Loop', nodeType: 'llm', description: 'ReAct agent with tools' },
      position: { x: 640, y: 200 }
    },
    {
      id: 'file-tools',
      type: 'default',
      data: { label: 'File Operations', nodeType: 'tool', description: 'Read, write, create files' },
      position: { x: 820, y: 80 }
    },
    {
      id: 'terminal-tools',
      type: 'default',
      data: { label: 'Terminal Execution', nodeType: 'tool', description: 'Run commands, tests' },
      position: { x: 820, y: 200 }
    },
    {
      id: 'search-tools',
      type: 'default',
      data: { label: 'Code Search', nodeType: 'tool', description: 'Semantic & grep search' },
      position: { x: 820, y: 320 }
    },
    {
      id: 'diff-generator',
      type: 'default',
      data: { label: 'Diff Generator', nodeType: 'aggregator', description: 'Generates unified diffs' },
      position: { x: 1000, y: 200 }
    },
    {
      id: 'validation',
      type: 'default',
      data: { label: 'Validation', nodeType: 'evaluator', description: 'Type check, lint, test' },
      position: { x: 1180, y: 200 }
    },
    {
      id: 'output',
      type: 'output',
      data: { label: 'Applied Changes', nodeType: 'output' },
      position: { x: 1360, y: 200 }
    }
  ],

  edges: [
    { id: 'e1', source: 'user-intent', target: 'context-collector', animated: true },
    { id: 'e2', source: 'user-intent', target: 'skill-loader', animated: true },
    { id: 'e3', source: 'context-collector', target: 'task-planner' },
    { id: 'e4', source: 'skill-loader', target: 'task-planner' },
    { id: 'e5', source: 'task-planner', target: 'agent-loop', animated: true },
    { id: 'e6', source: 'agent-loop', target: 'file-tools' },
    { id: 'e7', source: 'agent-loop', target: 'terminal-tools' },
    { id: 'e8', source: 'agent-loop', target: 'search-tools' },
    { id: 'e9', source: 'file-tools', target: 'agent-loop', style: { strokeDasharray: '5,5' } },
    { id: 'e10', source: 'terminal-tools', target: 'agent-loop', style: { strokeDasharray: '5,5' } },
    { id: 'e11', source: 'search-tools', target: 'agent-loop', style: { strokeDasharray: '5,5' } },
    { id: 'e12', source: 'agent-loop', target: 'diff-generator', animated: true },
    { id: 'e13', source: 'diff-generator', target: 'validation', animated: true },
    { id: 'e14', source: 'validation', target: 'agent-loop', label: 'Fix errors', style: { strokeDasharray: '5,5' } },
    { id: 'e15', source: 'validation', target: 'output', animated: true }
  ],

  evaluation: `Evaluating an Agentic IDE requires measuring both correctness and developer experience:
- **Task Completion Rate:** What percentage of coding tasks are completed without human intervention?
- **Code Quality:** Do generated changes pass linting, type checking, and existing tests?
- **Context Utilization:** Does the agent correctly use project conventions, imports, and patterns?
- **Edit Precision:** Are changes minimal and focused, avoiding unnecessary modifications?
- **Rollback Safety:** Can changes be easily reverted if they introduce issues?
- **Developer Trust:** Do developers accept agent suggestions without significant modifications?`,

  implementation: [
    '1. Build workspace context collector that indexes project structure, dependencies, and conventions',
    '2. Implement SKILL.md loader for project-specific coding standards',
    '3. Create file operation tools with diff-based editing (not full file replacement)',
    '4. Build terminal execution with output parsing and error detection',
    '5. Implement code search (semantic embeddings + grep) for finding relevant code',
    '6. Create ReAct agent loop with tool calling and iterative refinement',
    '7. Add validation pipeline (type check, lint, test) with automatic error correction',
    '8. Build diff preview UI for human review before applying changes'
  ],

  advantages: [
    'Deep codebase understanding through workspace indexing',
    'Multi-file coordinated changes impossible with simple completion',
    'Iterative refinement via test/lint feedback loops',
    'Project-specific customization via SKILL.md files',
    'Human-in-the-loop review before applying changes',
    'Terminal access enables running tests, builds, migrations'
  ],

  limitations: [
    'Requires significant context window for large codebases',
    'Potential for cascading errors across multiple files',
    'Security concerns with terminal execution capabilities',
    'May conflict with developer\'s mental model of changes',
    'Cost can be high for iterative refinement cycles'
  ],

  relatedPatterns: ['skill-augmented-agent', 'code-act-agent', 'model-context-protocol'],

  codeExample: `// Agentic IDE Pattern - TypeScript Implementation
// Simulating VS Code extension agent capabilities

import * as vscode from 'vscode';
import * as path from 'path';
import OpenAI from 'openai';

// ============================================
// Tool Definitions for Agentic IDE
// ============================================

interface Tool {
  name: string;
  description: string;
  parameters: object;
  execute: (args: any) => Promise<string>;
}

// ============================================
// Workspace Context Collector
// ============================================

class WorkspaceContextCollector {
  private workspaceRoot: string;
  private fileIndex: Map<string, string> = new Map();

  constructor(workspaceRoot: string) {
    this.workspaceRoot = workspaceRoot;
  }

  async collectContext(): Promise<WorkspaceContext> {
    return {
      root: this.workspaceRoot,
      structure: await this.getProjectStructure(),
      packageJson: await this.readIfExists('package.json'),
      tsConfig: await this.readIfExists('tsconfig.json'),
      gitIgnore: await this.readIfExists('.gitignore'),
      readme: await this.readIfExists('README.md'),
      recentFiles: await this.getRecentFiles(),
      openEditors: this.getOpenEditors()
    };
  }

  private async getProjectStructure(): Promise<string[]> {
    const files: string[] = [];
    const pattern = new vscode.RelativePattern(this.workspaceRoot, '**/*.{ts,tsx,js,jsx,py,go,rs}');
    const uris = await vscode.workspace.findFiles(pattern, '**/node_modules/**', 100);
    
    for (const uri of uris) {
      files.push(vscode.workspace.asRelativePath(uri));
    }
    return files;
  }

  private async readIfExists(filename: string): Promise<string | null> {
    try {
      const uri = vscode.Uri.file(path.join(this.workspaceRoot, filename));
      const content = await vscode.workspace.fs.readFile(uri);
      return Buffer.from(content).toString('utf-8');
    } catch {
      return null;
    }
  }

  private async getRecentFiles(): Promise<string[]> {
    // Get recently modified files
    const pattern = new vscode.RelativePattern(this.workspaceRoot, '**/*.{ts,tsx,js,jsx}');
    const uris = await vscode.workspace.findFiles(pattern, '**/node_modules/**', 20);
    return uris.map(uri => vscode.workspace.asRelativePath(uri));
  }

  private getOpenEditors(): string[] {
    return vscode.window.visibleTextEditors.map(e => 
      vscode.workspace.asRelativePath(e.document.uri)
    );
  }
}

interface WorkspaceContext {
  root: string;
  structure: string[];
  packageJson: string | null;
  tsConfig: string | null;
  gitIgnore: string | null;
  readme: string | null;
  recentFiles: string[];
  openEditors: string[];
}

// ============================================
// IDE Tools
// ============================================

class IDETools {
  private workspaceRoot: string;

  constructor(workspaceRoot: string) {
    this.workspaceRoot = workspaceRoot;
  }

  getTools(): Tool[] {
    return [
      this.readFileTool(),
      this.writeFileTool(),
      this.createFileTool(),
      this.searchCodeTool(),
      this.grepSearchTool(),
      this.runTerminalTool(),
      this.getErrorsTool(),
      this.listDirectoryTool()
    ];
  }

  private readFileTool(): Tool {
    return {
      name: 'read_file',
      description: 'Read the contents of a file. Use when you need to understand existing code.',
      parameters: {
        type: 'object',
        properties: {
          path: { type: 'string', description: 'Relative path to the file' },
          startLine: { type: 'number', description: 'Start line (1-indexed)' },
          endLine: { type: 'number', description: 'End line (1-indexed)' }
        },
        required: ['path']
      },
      execute: async (args: { path: string; startLine?: number; endLine?: number }) => {
        const fullPath = path.join(this.workspaceRoot, args.path);
        const uri = vscode.Uri.file(fullPath);
        const content = await vscode.workspace.fs.readFile(uri);
        const lines = Buffer.from(content).toString('utf-8').split('\\n');
        
        const start = (args.startLine || 1) - 1;
        const end = args.endLine || lines.length;
        
        return lines.slice(start, end).map((line, i) => 
          \`\${start + i + 1}: \${line}\`
        ).join('\\n');
      }
    };
  }

  private writeFileTool(): Tool {
    return {
      name: 'replace_in_file',
      description: 'Replace a specific section of code in a file. Provide enough context to uniquely identify the location.',
      parameters: {
        type: 'object',
        properties: {
          path: { type: 'string', description: 'Relative path to the file' },
          oldContent: { type: 'string', description: 'Exact content to replace (include 3+ lines of context)' },
          newContent: { type: 'string', description: 'New content to insert' }
        },
        required: ['path', 'oldContent', 'newContent']
      },
      execute: async (args: { path: string; oldContent: string; newContent: string }) => {
        const fullPath = path.join(this.workspaceRoot, args.path);
        const uri = vscode.Uri.file(fullPath);
        const content = Buffer.from(await vscode.workspace.fs.readFile(uri)).toString('utf-8');
        
        if (!content.includes(args.oldContent)) {
          return 'ERROR: Could not find the specified content to replace. Make sure you include enough context.';
        }
        
        const newFileContent = content.replace(args.oldContent, args.newContent);
        await vscode.workspace.fs.writeFile(uri, Buffer.from(newFileContent, 'utf-8'));
        
        return \`Successfully replaced content in \${args.path}\`;
      }
    };
  }

  private createFileTool(): Tool {
    return {
      name: 'create_file',
      description: 'Create a new file with the specified content.',
      parameters: {
        type: 'object',
        properties: {
          path: { type: 'string', description: 'Relative path for the new file' },
          content: { type: 'string', description: 'Content for the new file' }
        },
        required: ['path', 'content']
      },
      execute: async (args: { path: string; content: string }) => {
        const fullPath = path.join(this.workspaceRoot, args.path);
        const uri = vscode.Uri.file(fullPath);
        
        // Create directories if needed
        const dir = path.dirname(fullPath);
        await vscode.workspace.fs.createDirectory(vscode.Uri.file(dir));
        
        await vscode.workspace.fs.writeFile(uri, Buffer.from(args.content, 'utf-8'));
        return \`Successfully created \${args.path}\`;
      }
    };
  }

  private searchCodeTool(): Tool {
    return {
      name: 'semantic_search',
      description: 'Search for code semantically. Use when looking for functionality by description.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Natural language description of what to find' }
        },
        required: ['query']
      },
      execute: async (args: { query: string }) => {
        // In a real implementation, this would use embeddings
        // For now, simulate with grep
        const pattern = new vscode.RelativePattern(this.workspaceRoot, '**/*.{ts,tsx}');
        const uris = await vscode.workspace.findFiles(pattern, '**/node_modules/**', 50);
        
        const results: string[] = [];
        for (const uri of uris) {
          const content = Buffer.from(await vscode.workspace.fs.readFile(uri)).toString('utf-8');
          if (content.toLowerCase().includes(args.query.toLowerCase())) {
            results.push(vscode.workspace.asRelativePath(uri));
          }
        }
        
        return results.length > 0 
          ? \`Found in:\\n\${results.join('\\n')}\`
          : 'No matches found';
      }
    };
  }

  private grepSearchTool(): Tool {
    return {
      name: 'grep_search',
      description: 'Search for exact text or regex pattern in files.',
      parameters: {
        type: 'object',
        properties: {
          pattern: { type: 'string', description: 'Text or regex pattern to search' },
          include: { type: 'string', description: 'Glob pattern for files to include' }
        },
        required: ['pattern']
      },
      execute: async (args: { pattern: string; include?: string }) => {
        const results: string[] = [];
        const filePattern = args.include || '**/*.{ts,tsx,js,jsx}';
        const pattern = new vscode.RelativePattern(this.workspaceRoot, filePattern);
        const uris = await vscode.workspace.findFiles(pattern, '**/node_modules/**', 100);
        
        const regex = new RegExp(args.pattern, 'gi');
        
        for (const uri of uris) {
          const content = Buffer.from(await vscode.workspace.fs.readFile(uri)).toString('utf-8');
          const lines = content.split('\\n');
          
          lines.forEach((line, i) => {
            if (regex.test(line)) {
              results.push(\`\${vscode.workspace.asRelativePath(uri)}:\${i + 1}: \${line.trim()}\`);
            }
            regex.lastIndex = 0; // Reset regex state
          });
        }
        
        return results.slice(0, 50).join('\\n') || 'No matches found';
      }
    };
  }

  private runTerminalTool(): Tool {
    return {
      name: 'run_in_terminal',
      description: 'Run a command in the terminal. Use for tests, builds, or shell commands.',
      parameters: {
        type: 'object',
        properties: {
          command: { type: 'string', description: 'Command to run' },
          background: { type: 'boolean', description: 'Run in background (for servers)' }
        },
        required: ['command']
      },
      execute: async (args: { command: string; background?: boolean }) => {
        const terminal = vscode.window.createTerminal('Agent');
        terminal.sendText(args.command);
        terminal.show();
        
        if (args.background) {
          return \`Started background process: \${args.command}\`;
        }
        
        // Wait for command completion (simplified)
        await new Promise(resolve => setTimeout(resolve, 2000));
        return \`Executed: \${args.command}\\nCheck terminal for output.\`;
      }
    };
  }

  private getErrorsTool(): Tool {
    return {
      name: 'get_diagnostics',
      description: 'Get TypeScript/ESLint errors and warnings from the workspace.',
      parameters: {
        type: 'object',
        properties: {
          path: { type: 'string', description: 'Specific file path, or omit for all errors' }
        }
      },
      execute: async (args: { path?: string }) => {
        const diagnostics = vscode.languages.getDiagnostics();
        const errors: string[] = [];
        
        for (const [uri, fileDiagnostics] of diagnostics) {
          const relativePath = vscode.workspace.asRelativePath(uri);
          
          if (args.path && relativePath !== args.path) continue;
          
          for (const diag of fileDiagnostics) {
            if (diag.severity === vscode.DiagnosticSeverity.Error) {
              errors.push(\`\${relativePath}:\${diag.range.start.line + 1}: \${diag.message}\`);
            }
          }
        }
        
        return errors.length > 0 
          ? \`Found \${errors.length} errors:\\n\${errors.join('\\n')}\`
          : 'No errors found';
      }
    };
  }

  private listDirectoryTool(): Tool {
    return {
      name: 'list_directory',
      description: 'List files and directories at a path.',
      parameters: {
        type: 'object',
        properties: {
          path: { type: 'string', description: 'Relative directory path' }
        },
        required: ['path']
      },
      execute: async (args: { path: string }) => {
        const fullPath = path.join(this.workspaceRoot, args.path);
        const uri = vscode.Uri.file(fullPath);
        const entries = await vscode.workspace.fs.readDirectory(uri);
        
        return entries.map(([name, type]) => 
          type === vscode.FileType.Directory ? \`\${name}/\` : name
        ).join('\\n');
      }
    };
  }
}

// ============================================
// Agentic IDE Agent
// ============================================

class AgenticIDEAgent {
  private openai: OpenAI;
  private tools: Tool[];
  private contextCollector: WorkspaceContextCollector;
  private maxIterations: number = 20;

  constructor(workspaceRoot: string) {
    this.openai = new OpenAI();
    this.tools = new IDETools(workspaceRoot).getTools();
    this.contextCollector = new WorkspaceContextCollector(workspaceRoot);
  }

  async execute(userRequest: string): Promise<AgentResult> {
    // Collect workspace context
    const context = await this.contextCollector.collectContext();
    
    // Build system prompt with context
    const systemPrompt = this.buildSystemPrompt(context);
    
    // Initialize messages
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userRequest }
    ];

    const toolsForOpenAI = this.tools.map(t => ({
      type: 'function' as const,
      function: {
        name: t.name,
        description: t.description,
        parameters: t.parameters
      }
    }));

    // Agent loop
    let iterations = 0;
    const toolCalls: ToolCall[] = [];

    while (iterations < this.maxIterations) {
      iterations++;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages,
        tools: toolsForOpenAI,
        tool_choice: 'auto'
      });

      const message = response.choices[0].message;
      messages.push(message);

      // Check if agent is done
      if (!message.tool_calls || message.tool_calls.length === 0) {
        return {
          success: true,
          message: message.content || 'Task completed',
          toolCalls,
          iterations
        };
      }

      // Execute tool calls
      for (const toolCall of message.tool_calls) {
        const tool = this.tools.find(t => t.name === toolCall.function.name);
        if (!tool) {
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: \`Unknown tool: \${toolCall.function.name}\`
          });
          continue;
        }

        try {
          const args = JSON.parse(toolCall.function.arguments);
          const result = await tool.execute(args);
          
          toolCalls.push({
            name: toolCall.function.name,
            args,
            result
          });

          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: result
          });
        } catch (error) {
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: \`Error: \${error}\`
          });
        }
      }
    }

    return {
      success: false,
      message: 'Max iterations reached',
      toolCalls,
      iterations
    };
  }

  private buildSystemPrompt(context: WorkspaceContext): string {
    return \`You are an expert coding agent with full access to the user's IDE and workspace.

## Workspace Context
- Root: \${context.root}
- Open files: \${context.openEditors.join(', ') || 'None'}
- Recent files: \${context.recentFiles.slice(0, 5).join(', ')}

## Project Structure
\${context.structure.slice(0, 30).join('\\n')}
\${context.structure.length > 30 ? \`... and \${context.structure.length - 30} more files\` : ''}

## Available Tools
You have access to: read_file, replace_in_file, create_file, semantic_search, grep_search, run_in_terminal, get_diagnostics, list_directory

## Guidelines
1. Always read relevant files before making changes
2. Use replace_in_file with sufficient context (3+ lines) to ensure unique matches
3. After making changes, use get_diagnostics to check for errors
4. If errors are found, fix them before completing
5. Keep changes minimal and focused
6. Follow existing code style and conventions\`;
  }
}

interface AgentResult {
  success: boolean;
  message: string;
  toolCalls: ToolCall[];
  iterations: number;
}

interface ToolCall {
  name: string;
  args: any;
  result: string;
}

// ============================================
// VS Code Extension Activation
// ============================================

export function activate(context: vscode.ExtensionContext) {
  const command = vscode.commands.registerCommand('agenticIDE.execute', async () => {
    const workspaceRoot = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    if (!workspaceRoot) {
      vscode.window.showErrorMessage('No workspace folder open');
      return;
    }

    const userRequest = await vscode.window.showInputBox({
      prompt: 'What would you like me to do?',
      placeHolder: 'e.g., Add a new API endpoint for user authentication'
    });

    if (!userRequest) return;

    const agent = new AgenticIDEAgent(workspaceRoot);
    
    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: 'Agentic IDE',
      cancellable: true
    }, async (progress) => {
      progress.report({ message: 'Executing...' });
      const result = await agent.execute(userRequest);
      
      if (result.success) {
        vscode.window.showInformationMessage(\`Completed in \${result.iterations} steps\`);
      } else {
        vscode.window.showWarningMessage(result.message);
      }
    });
  });

  context.subscriptions.push(command);
}`,

  pythonCodeExample: `# Agentic IDE Pattern - Python Implementation
# Simulating IDE agent capabilities for a Python workspace

import os
import json
import subprocess
import re
from pathlib import Path
from dataclasses import dataclass
from typing import List, Dict, Any, Optional, Callable
from openai import OpenAI

# ============================================
# Workspace Context
# ============================================

@dataclass
class WorkspaceContext:
    root: str
    structure: List[str]
    requirements: Optional[str]
    pyproject: Optional[str]
    readme: Optional[str]

class WorkspaceContextCollector:
    def __init__(self, workspace_root: str):
        self.root = workspace_root
    
    def collect_context(self) -> WorkspaceContext:
        return WorkspaceContext(
            root=self.root,
            structure=self._get_project_structure(),
            requirements=self._read_if_exists("requirements.txt"),
            pyproject=self._read_if_exists("pyproject.toml"),
            readme=self._read_if_exists("README.md")
        )
    
    def _get_project_structure(self) -> List[str]:
        files = []
        for root, dirs, filenames in os.walk(self.root):
            # Skip hidden and common ignore patterns
            dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules', '__pycache__', 'venv', '.venv']]
            for filename in filenames:
                if filename.endswith(('.py', '.ts', '.js', '.tsx', '.jsx')):
                    rel_path = os.path.relpath(os.path.join(root, filename), self.root)
                    files.append(rel_path)
        return files[:100]  # Limit for context size
    
    def _read_if_exists(self, filename: str) -> Optional[str]:
        filepath = os.path.join(self.root, filename)
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                return f.read()
        return None

# ============================================
# IDE Tools
# ============================================

@dataclass
class Tool:
    name: str
    description: str
    parameters: dict
    execute: Callable[[dict], str]

class IDETools:
    def __init__(self, workspace_root: str):
        self.root = workspace_root
    
    def get_tools(self) -> List[Tool]:
        return [
            self._read_file_tool(),
            self._replace_in_file_tool(),
            self._create_file_tool(),
            self._grep_search_tool(),
            self._run_terminal_tool(),
            self._list_directory_tool(),
            self._get_errors_tool()
        ]
    
    def _read_file_tool(self) -> Tool:
        def execute(args: dict) -> str:
            filepath = os.path.join(self.root, args['path'])
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    lines = f.readlines()
                
                start = args.get('start_line', 1) - 1
                end = args.get('end_line', len(lines))
                
                result = []
                for i, line in enumerate(lines[start:end], start=start + 1):
                    result.append(f"{i}: {line.rstrip()}")
                return '\\n'.join(result)
            except FileNotFoundError:
                return f"ERROR: File not found: {args['path']}"
        
        return Tool(
            name="read_file",
            description="Read file contents. Use to understand existing code.",
            parameters={
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "Relative file path"},
                    "start_line": {"type": "integer", "description": "Start line (1-indexed)"},
                    "end_line": {"type": "integer", "description": "End line (1-indexed)"}
                },
                "required": ["path"]
            },
            execute=execute
        )
    
    def _replace_in_file_tool(self) -> Tool:
        def execute(args: dict) -> str:
            filepath = os.path.join(self.root, args['path'])
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                if args['old_content'] not in content:
                    return "ERROR: Could not find the specified content. Include more context."
                
                new_content = content.replace(args['old_content'], args['new_content'], 1)
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                
                return f"Successfully replaced content in {args['path']}"
            except Exception as e:
                return f"ERROR: {str(e)}"
        
        return Tool(
            name="replace_in_file",
            description="Replace a section of code. Include 3+ lines of context for unique matching.",
            parameters={
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "Relative file path"},
                    "old_content": {"type": "string", "description": "Exact content to replace"},
                    "new_content": {"type": "string", "description": "New content"}
                },
                "required": ["path", "old_content", "new_content"]
            },
            execute=execute
        )
    
    def _create_file_tool(self) -> Tool:
        def execute(args: dict) -> str:
            filepath = os.path.join(self.root, args['path'])
            try:
                os.makedirs(os.path.dirname(filepath), exist_ok=True)
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(args['content'])
                return f"Successfully created {args['path']}"
            except Exception as e:
                return f"ERROR: {str(e)}"
        
        return Tool(
            name="create_file",
            description="Create a new file with content.",
            parameters={
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "Relative file path"},
                    "content": {"type": "string", "description": "File content"}
                },
                "required": ["path", "content"]
            },
            execute=execute
        )
    
    def _grep_search_tool(self) -> Tool:
        def execute(args: dict) -> str:
            pattern = args['pattern']
            results = []
            
            for root, _, files in os.walk(self.root):
                if any(x in root for x in ['node_modules', '__pycache__', '.git', 'venv']):
                    continue
                    
                for filename in files:
                    if not filename.endswith(('.py', '.ts', '.js', '.tsx', '.jsx')):
                        continue
                    
                    filepath = os.path.join(root, filename)
                    try:
                        with open(filepath, 'r', encoding='utf-8') as f:
                            for i, line in enumerate(f, 1):
                                if re.search(pattern, line, re.IGNORECASE):
                                    rel_path = os.path.relpath(filepath, self.root)
                                    results.append(f"{rel_path}:{i}: {line.strip()}")
                    except:
                        continue
            
            return '\\n'.join(results[:50]) if results else "No matches found"
        
        return Tool(
            name="grep_search",
            description="Search for text or regex pattern in files.",
            parameters={
                "type": "object",
                "properties": {
                    "pattern": {"type": "string", "description": "Search pattern or regex"}
                },
                "required": ["pattern"]
            },
            execute=execute
        )
    
    def _run_terminal_tool(self) -> Tool:
        def execute(args: dict) -> str:
            try:
                result = subprocess.run(
                    args['command'],
                    shell=True,
                    cwd=self.root,
                    capture_output=True,
                    text=True,
                    timeout=30
                )
                output = result.stdout + result.stderr
                return output[:2000] if output else "Command completed with no output"
            except subprocess.TimeoutExpired:
                return "ERROR: Command timed out after 30 seconds"
            except Exception as e:
                return f"ERROR: {str(e)}"
        
        return Tool(
            name="run_in_terminal",
            description="Run a shell command. Use for tests, linting, builds.",
            parameters={
                "type": "object",
                "properties": {
                    "command": {"type": "string", "description": "Shell command to run"}
                },
                "required": ["command"]
            },
            execute=execute
        )
    
    def _list_directory_tool(self) -> Tool:
        def execute(args: dict) -> str:
            dirpath = os.path.join(self.root, args['path'])
            try:
                entries = os.listdir(dirpath)
                result = []
                for entry in sorted(entries):
                    full_path = os.path.join(dirpath, entry)
                    if os.path.isdir(full_path):
                        result.append(f"{entry}/")
                    else:
                        result.append(entry)
                return '\\n'.join(result)
            except Exception as e:
                return f"ERROR: {str(e)}"
        
        return Tool(
            name="list_directory",
            description="List files and directories.",
            parameters={
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "Relative directory path"}
                },
                "required": ["path"]
            },
            execute=execute
        )
    
    def _get_errors_tool(self) -> Tool:
        def execute(args: dict) -> str:
            # Run Python type checker
            try:
                result = subprocess.run(
                    ["python", "-m", "py_compile", args.get('path', '.')],
                    cwd=self.root,
                    capture_output=True,
                    text=True,
                    timeout=30
                )
                if result.returncode == 0:
                    return "No syntax errors found"
                return result.stderr[:1500]
            except Exception as e:
                return f"Could not check for errors: {e}"
        
        return Tool(
            name="get_errors",
            description="Check for Python syntax errors.",
            parameters={
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "File to check (optional)"}
                }
            },
            execute=execute
        )

# ============================================
# Agentic IDE Agent
# ============================================

@dataclass
class AgentResult:
    success: bool
    message: str
    tool_calls: List[dict]
    iterations: int

class AgenticIDEAgent:
    def __init__(self, workspace_root: str):
        self.root = workspace_root
        self.client = OpenAI()
        self.tools = IDETools(workspace_root).get_tools()
        self.context_collector = WorkspaceContextCollector(workspace_root)
        self.max_iterations = 20
    
    def execute(self, user_request: str) -> AgentResult:
        context = self.context_collector.collect_context()
        system_prompt = self._build_system_prompt(context)
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_request}
        ]
        
        tools_for_openai = [
            {
                "type": "function",
                "function": {
                    "name": t.name,
                    "description": t.description,
                    "parameters": t.parameters
                }
            }
            for t in self.tools
        ]
        
        tool_calls_log = []
        iterations = 0
        
        while iterations < self.max_iterations:
            iterations += 1
            
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=messages,
                tools=tools_for_openai,
                tool_choice="auto"
            )
            
            message = response.choices[0].message
            messages.append(message)
            
            if not message.tool_calls:
                return AgentResult(
                    success=True,
                    message=message.content or "Task completed",
                    tool_calls=tool_calls_log,
                    iterations=iterations
                )
            
            for tool_call in message.tool_calls:
                tool = next((t for t in self.tools if t.name == tool_call.function.name), None)
                if not tool:
                    messages.append({
                        "role": "tool",
                        "tool_call_id": tool_call.id,
                        "content": f"Unknown tool: {tool_call.function.name}"
                    })
                    continue
                
                try:
                    args = json.loads(tool_call.function.arguments)
                    result = tool.execute(args)
                    
                    tool_calls_log.append({
                        "name": tool_call.function.name,
                        "args": args,
                        "result": result[:500]
                    })
                    
                    messages.append({
                        "role": "tool",
                        "tool_call_id": tool_call.id,
                        "content": result
                    })
                except Exception as e:
                    messages.append({
                        "role": "tool",
                        "tool_call_id": tool_call.id,
                        "content": f"Error: {str(e)}"
                    })
        
        return AgentResult(
            success=False,
            message="Max iterations reached",
            tool_calls=tool_calls_log,
            iterations=iterations
        )
    
    def _build_system_prompt(self, context: WorkspaceContext) -> str:
        return f"""You are an expert coding agent with full workspace access.

## Workspace: {context.root}

## Project Structure
{chr(10).join(context.structure[:30])}
{'...' if len(context.structure) > 30 else ''}

## Tools Available
- read_file: Read file contents
- replace_in_file: Replace code sections (use 3+ lines of context)
- create_file: Create new files
- grep_search: Search with text/regex
- run_in_terminal: Run shell commands
- list_directory: List directory contents
- get_errors: Check for Python errors

## Guidelines
1. Read relevant files before making changes
2. Include enough context in replace_in_file for unique matching
3. Check for errors after making changes
4. Follow existing code style
5. Keep changes minimal and focused"""

# ============================================
# Usage
# ============================================

if __name__ == "__main__":
    import sys
    
    workspace = sys.argv[1] if len(sys.argv) > 1 else "."
    request = sys.argv[2] if len(sys.argv) > 2 else "Add a hello world function to main.py"
    
    agent = AgenticIDEAgent(workspace)
    result = agent.execute(request)
    
    print(f"Success: {result.success}")
    print(f"Iterations: {result.iterations}")
    print(f"Message: {result.message}")
    print(f"Tool calls: {len(result.tool_calls)}")`,

  businessUseCase: {
    industry: 'Developer Tools',
    description: 'A software company deploys Agentic IDE agents to their development platform. Developers describe features in natural language, and the agent autonomously writes code across multiple files, runs tests, fixes errors, and submits pull requests. Development velocity increases 3x while maintaining code quality through automated validation.',
    visualization: {
      type: 'flow',
      layout: 'horizontal',
      steps: [
        'Developer request: "Add user auth endpoint"',
        'Context collection → workspace indexed',
        'Task planning → 5 files to create/modify',
        'Agent loop with tools (12 iterations)',
        'File ops + terminal tests + error fixes',
        'Validation passes → changes applied'
      ]
    },
    enlightenMePrompt: 'How would you implement a "revert" capability that can undo agent changes at any granularity (single edit, file, or entire session)?'
  },

  velocityProfile: {
    timeToFirstToken: 'Low - context collection is cached',
    totalDuration: 'Medium to High - depends on task complexity and iterations',
    cost: 'Medium - multiple LLM calls for tool use loops'
  }
};
