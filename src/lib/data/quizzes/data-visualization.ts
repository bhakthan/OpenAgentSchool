// @ts-nocheck
// MCP Apps & Agent UI quiz questions (updated 2026)
// SEP-1865: MCP Apps Extension - the 2026 standard for interactive UIs in AI agent contexts
import { QuizQuestion } from './types';

export const dataVisualizationQuestions: QuizQuestion[] = [
  {
    id: 'mcp-apps-b1',
    question: 'What is the purpose of ui:// resources in the MCP Apps extension (SEP-1865)?',
    text: 'What is the purpose of ui:// resources in the MCP Apps extension (SEP-1865)?',
    options: [
      'To define database connection strings for agents',
      'To serve interactive HTML templates that can be rendered directly in AI hosts like Claude, VS Code, or ChatGPT',
      'To configure authentication tokens for API calls',
      'To store agent memory and conversation state'
    ],
    correctAnswer: 1,
    explanation: 'ui:// resources are the core of MCP Apps (SEP-1865). They serve HTML templates with the MIME type text/html;profile=mcp-app that AI hosts render in sandboxed iframes. This enables write-once UIs that work across Claude, ChatGPT, VS Code, Goose, and other MCP-compatible clients.',
    difficulty: 'beginner',
    category: 'data-visualization',
    subCategory: 'mcp-apps-fundamentals',
    learningObjectives: ['Understand ui:// resource pattern', 'Recognize MCP Apps cross-platform capability'],
    relatedConcepts: ['mcp', 'agent-ui', 'sandboxed-iframes', 'cross-platform'],
    persona: ['agent-developer', 'ai-engineer', 'agent-designer'],
    timeEstimate: 35
  },
  {
    id: 'mcp-apps-b2',
    question: 'How does an MCP server link a tool to a renderable UI component?',
    text: 'How does an MCP server link a tool to a renderable UI component?',
    options: [
      'By including HTML directly in the tool response content',
      'By setting _meta.ui.resourceUri in the tool annotation pointing to a ui:// resource',
      'By embedding a JavaScript bundle in the system prompt',
      'By using a separate configuration file outside the MCP protocol'
    ],
    correctAnswer: 1,
    explanation: 'Tools declare their associated UI via the _meta.ui.resourceUri annotation. When a tool is invoked, the host can fetch this ui:// resource and render the HTML template, enabling rich interactive experiences directly in the chat interface.',
    difficulty: 'beginner',
    category: 'data-visualization',
    subCategory: 'tool-annotations',
    learningObjectives: ['Link tools to UI resources', 'Understand tool annotation pattern'],
    relatedConcepts: ['mcp', 'tool-calling', 'ui-resources', 'annotations'],
    persona: ['agent-developer', 'ai-engineer'],
    timeEstimate: 40
  },
  {
    id: 'mcp-apps-i1',
    question: 'What is the correct sequence of Host ↔ App communication when initializing an MCP App?',
    text: 'What is the correct sequence of Host ↔ App communication when initializing an MCP App?',
    options: [
      'App sends ui/initialize → Host responds with config → App renders UI',
      'Host sends ui/initialize with context → App acknowledges → Host sends ui/notifications/tool-input with data',
      'App fetches tool results directly from MCP server → renders without host communication',
      'Host renders HTML statically without any bidirectional messaging'
    ],
    correctAnswer: 1,
    explanation: 'The MCP Apps communication flow follows SEP-1865: 1) Host sends ui/initialize with themeMode, context, and locale to the sandboxed iframe. 2) App acknowledges initialization. 3) Host sends ui/notifications/tool-input with the tool\'s structured output. 4) App uses ui/message for any host communication. This bidirectional channel enables secure, interactive UIs.',
    difficulty: 'intermediate',
    category: 'data-visualization',
    subCategory: 'host-app-communication',
    learningObjectives: ['Understand MCP Apps message flow', 'Implement proper initialization sequence'],
    relatedConcepts: ['mcp', 'iframe-communication', 'postMessage', 'ui-lifecycle'],
    persona: ['agent-developer', 'ai-engineer', 'ai-architect'],
    timeEstimate: 50
  },
  {
    id: 'mcp-apps-i2',
    question: 'Which security constraints apply to MCP Apps running in AI hosts?',
    text: 'Which security constraints apply to MCP Apps running in AI hosts?',
    options: [
      'No restrictions - MCP Apps have full access to the host page',
      'Apps run in sandboxed iframes, require template pre-auditing, and need user consent for actions',
      'Only HTTPS enforcement, no other sandbox restrictions',
      'Apps can access parent window cookies but not localStorage'
    ],
    correctAnswer: 1,
    explanation: 'MCP Apps follow strict security: 1) Sandboxed iframes with limited capabilities (no parent access, no cookies). 2) Templates should be pre-audited before deployment. 3) Sensitive actions require explicit user consent. 4) Communication happens only through structured postMessage channels. This defense-in-depth approach prevents injection attacks and data leakage.',
    difficulty: 'intermediate',
    category: 'data-visualization',
    subCategory: 'security-model',
    learningObjectives: ['Implement secure MCP Apps', 'Understand sandbox constraints'],
    relatedConcepts: ['security', 'iframe-sandbox', 'consent-flows', 'template-auditing'],
    persona: ['security-engineer', 'ai-architect', 'agent-developer'],
    timeEstimate: 55
  },
  {
    id: 'mcp-apps-a1',
    question: 'When building an MCP App for performance visualization (e.g., flame graphs), what is the recommended architecture?',
    text: 'When building an MCP App for performance visualization (e.g., flame graphs), what is the recommended architecture?',
    options: [
      'Embed D3.js in the tool response and render server-side',
      'Use ui:// resource with @mcp-ui/client SDK, receive data via ui/notifications/tool-input, render with lightweight client-side visualization library',
      'Generate static PNG images and embed as base64 in chat',
      'Use WebSocket connections bypassing the MCP protocol'
    ],
    correctAnswer: 1,
    explanation: 'The recommended architecture uses the @mcp-ui/client SDK to handle Host↔App communication. The app: 1) Exposes a ui://flamegraph resource serving HTML with mcp-app profile. 2) Registers a tool with _meta.ui.resourceUri pointing to that resource. 3) Receives trace data via ui/notifications/tool-input. 4) Renders interactively using a client-side library (d3-flame-graph, Chart.js). This enables live updates, pan/zoom, and cross-platform compatibility.',
    difficulty: 'advanced',
    category: 'data-visualization',
    subCategory: 'interactive-visualizations',
    learningObjectives: ['Architect complex MCP Apps', 'Implement real-time visualization'],
    relatedConcepts: ['mcp', 'd3', 'flamegraphs', 'interactive-ui', 'sdk-integration'],
    persona: ['ai-engineer', 'ai-architect', 'agent-developer'],
    timeEstimate: 70
  },
  {
    id: 'mcp-apps-a2',
    question: 'How should an MCP App handle user interactions that require calling additional MCP tools?',
    text: 'How should an MCP App handle user interactions that require calling additional MCP tools?',
    options: [
      'The app directly invokes MCP tools via HTTP requests to the server',
      'The app sends a ui/message to the host requesting tool invocation, then waits for updated tool-input notification',
      'User interactions must be copied to clipboard for manual pasting into chat',
      'The app stores pending actions in localStorage until next page load'
    ],
    correctAnswer: 1,
    explanation: 'MCP Apps follow a controlled flow for tool invocations: 1) User interacts with the UI (e.g., clicks "deploy" in a feature flag editor). 2) App sends ui/message to host with the requested action. 3) Host interprets the message and may invoke appropriate MCP tools. 4) Host sends ui/notifications/tool-input with updated data. 5) App re-renders with new state. This maintains security by keeping tool execution under host control.',
    difficulty: 'advanced',
    category: 'data-visualization',
    subCategory: 'action-flows',
    learningObjectives: ['Implement bidirectional interactions', 'Design secure action flows'],
    relatedConcepts: ['mcp', 'host-mediation', 'action-patterns', 'state-management'],
    persona: ['ai-engineer', 'ai-architect', 'security-engineer'],
    timeEstimate: 65
  }
];

// Calculate total time for all questions
export const dataVisualizationTime = dataVisualizationQuestions.reduce((total, question) => total + question.timeEstimate, 0);
