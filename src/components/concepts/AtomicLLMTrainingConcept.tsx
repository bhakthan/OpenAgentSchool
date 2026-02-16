import { useState } from "react"
import ConceptLayout from "./ConceptLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ReferenceSection from "../references/ReferenceSection"
import AudioNarrationControls from "@/components/audio/AudioNarrationControls"
import { Atom, Lightning, Brain, Code, Rocket, ArrowSquareOut, Graph, TreeStructure, Function as FnIcon, CaretLeft, CaretRight, Image as ImageIcon } from "@phosphor-icons/react"
import { markNodeComplete } from '@/lib/utils/markComplete'
import { EnlightenMeButton } from "@/components/enlighten/EnlightenMeButton"
import CodeBlock from "@/components/ui/CodeBlock"
import { conceptSurface, conceptSurfaceSoft } from "./conceptStyles"
import {
  PipelineFlowchart,
  InteractiveComputeGraph,
  InteractiveTokenizer,
  AttentionVisualizer,
  AnimatedTrainingChart,
  LossExplainer,
  TemperatureExplorer,
  EmbeddingVisualizer,
  MLPFlowDiagram,
  OperationsGrid,
} from "./AtomicLLMTrainingVisuals"

interface AtomicLLMTrainingConceptProps {
  onMarkComplete?: () => void
  onNavigateToNext?: (nextConceptId: string) => void
}

// ---------------------------------------------------------------------------
// Code snippets from Karpathy's microGPT gist (annotated)
// ---------------------------------------------------------------------------

const valueClassCode = `# The autograd engine — every computation tracked for backprop
class Value:
    __slots__ = ('data', 'grad', '_children', '_local_grads')

    def __init__(self, data, children=(), local_grads=()):
        self.data = data          # scalar forward value
        self.grad = 0             # ∂loss/∂self — filled by backward()
        self._children = children
        self._local_grads = local_grads

    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        return Value(self.data + other.data, (self, other), (1, 1))

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        return Value(self.data * other.data, (self, other),
                     (other.data, self.data))

    def __pow__(self, n):
        return Value(self.data**n, (self,), (n * self.data**(n-1),))
    def log(self):
        return Value(math.log(self.data), (self,), (1/self.data,))
    def exp(self):
        return Value(math.exp(self.data), (self,), (math.exp(self.data),))
    def relu(self):
        return Value(max(0, self.data), (self,), (float(self.data > 0),))`

const backwardCode = `def backward(self):
    topo = []
    visited = set()
    def build_topo(v):
        if v not in visited:
            visited.add(v)
            for child in v._children:
                build_topo(child)
            topo.append(v)
    build_topo(self)
    self.grad = 1  # ∂loss/∂loss = 1
    for v in reversed(topo):
        for child, local_grad in zip(v._children, v._local_grads):
            child.grad += local_grad * v.grad  # chain rule!`

const architectureCode = `# Helper functions — the entire neural-net toolkit
def linear(x, w):
    return [sum(wi * xi for wi, xi in zip(wo, x)) for wo in w]

def softmax(logits):
    max_val = max(val.data for val in logits)
    exps = [(val - max_val).exp() for val in logits]
    total = sum(exps)
    return [e / total for e in exps]

def rmsnorm(x):
    ms = sum(xi * xi for xi in x) / len(x)
    scale = (ms + 1e-5) ** -0.5
    return [xi * scale for xi in x]`

const gptForwardCode = `def gpt(token_id, pos_id, keys, values):
    tok_emb = state_dict['wte'][token_id]   # token embedding
    pos_emb = state_dict['wpe'][pos_id]     # position embedding
    x = [t + p for t, p in zip(tok_emb, pos_emb)]
    x = rmsnorm(x)

    for li in range(n_layer):
        # 1) Multi-head attention
        x_residual = x
        x = rmsnorm(x)
        q = linear(x, state_dict[f'layer{li}.attn_wq'])
        k = linear(x, state_dict[f'layer{li}.attn_wk'])
        v = linear(x, state_dict[f'layer{li}.attn_wv'])
        keys[li].append(k)
        values[li].append(v)
        x_attn = []
        for h in range(n_head):
            hs = h * head_dim
            q_h = q[hs:hs+head_dim]
            k_h = [ki[hs:hs+head_dim] for ki in keys[li]]
            v_h = [vi[hs:hs+head_dim] for vi in values[li]]
            attn_logits = [
                sum(q_h[j] * k_h[t][j] for j in range(head_dim))
                / head_dim**0.5
                for t in range(len(k_h))
            ]
            attn_weights = softmax(attn_logits)
            head_out = [
                sum(attn_weights[t] * v_h[t][j]
                    for t in range(len(v_h)))
                for j in range(head_dim)
            ]
            x_attn.extend(head_out)
        x = linear(x_attn, state_dict[f'layer{li}.attn_wo'])
        x = [a + b for a, b in zip(x, x_residual)]
        # 2) MLP block
        x_residual = x
        x = rmsnorm(x)
        x = linear(x, state_dict[f'layer{li}.mlp_fc1'])
        x = [xi.relu() for xi in x]
        x = linear(x, state_dict[f'layer{li}.mlp_fc2'])
        x = [a + b for a, b in zip(x, x_residual)]

    logits = linear(x, state_dict['lm_head'])
    return logits`

const trainingLoopCode = `# Adam optimizer + training loop
learning_rate, beta1, beta2, eps_adam = 0.01, 0.85, 0.99, 1e-8
m = [0.0] * len(params)   # first moment
v = [0.0] * len(params)   # second moment

for step in range(num_steps):
    doc = docs[step % len(docs)]
    tokens = [BOS] + [uchars.index(ch) for ch in doc] + [BOS]
    n = min(block_size, len(tokens) - 1)

    # Forward — build computation graph
    keys, values = [[] for _ in range(n_layer)], [[] for _ in range(n_layer)]
    losses = []
    for pos_id in range(n):
        token_id, target_id = tokens[pos_id], tokens[pos_id + 1]
        logits = gpt(token_id, pos_id, keys, values)
        probs = softmax(logits)
        loss_t = -probs[target_id].log()    # cross-entropy
        losses.append(loss_t)
    loss = (1 / n) * sum(losses)             # average loss

    # Backward — propagate gradients
    loss.backward()

    # Adam update
    lr_t = learning_rate * (1 - step / num_steps)
    for i, p in enumerate(params):
        m[i] = beta1 * m[i] + (1 - beta1) * p.grad
        v[i] = beta2 * v[i] + (1 - beta2) * p.grad ** 2
        m_hat = m[i] / (1 - beta1 ** (step + 1))
        v_hat = v[i] / (1 - beta2 ** (step + 1))
        p.data -= lr_t * m_hat / (v_hat ** 0.5 + eps_adam)
        p.grad = 0`

const inferenceCode = `# Inference — generate new names
temperature = 0.5
for sample_idx in range(20):
    keys, values = [[] for _ in range(n_layer)], [[] for _ in range(n_layer)]
    token_id = BOS
    sample = []
    for pos_id in range(block_size):
        logits = gpt(token_id, pos_id, keys, values)
        probs = softmax([l / temperature for l in logits])
        token_id = random.choices(
            range(vocab_size),
            weights=[p.data for p in probs]
        )[0]
        if token_id == BOS:
            break
        sample.append(uchars[token_id])
    print(f"sample {sample_idx+1:2d}: {''.join(sample)}")`

// ---------------------------------------------------------------------------

// Autoregressive generation slide data (converted from lecture PDF → WebP)
const autoregressiveSlides = [
  { src: '/images/Autoregressive_Generation_p1.webp', caption: 'Autoregressive Generation — Title & Overview' },
  { src: '/images/Autoregressive_Generation_p2.webp', caption: 'What "Autoregressive" Means' },
  { src: '/images/Autoregressive_Generation_p3.webp', caption: 'The Generation Loop' },
  { src: '/images/Autoregressive_Generation_p4.webp', caption: 'Token-by-Token Prediction' },
  { src: '/images/Autoregressive_Generation_p5.webp', caption: 'Causal Masking & Ordering' },
  { src: '/images/Autoregressive_Generation_p6.webp', caption: 'Temperature & Sampling Strategies' },
  { src: '/images/Autoregressive_Generation_p7.webp', caption: 'Top-k / Top-p Filtering' },
  { src: '/images/Autoregressive_Generation_p8.webp', caption: 'KV Cache & Efficiency' },
  { src: '/images/Autoregressive_Generation_p9.webp', caption: 'Summary & Key Takeaways' },
];

/** Paginated slide viewer for multi-page visual decks */
function SlideViewer({ slides }: { slides: { src: string; caption: string }[] }) {
  const [current, setCurrent] = useState(0);
  return (
    <div className="space-y-3">
      <div className="relative rounded-lg border overflow-hidden bg-white dark:bg-zinc-900">
        <img
          src={slides[current].src}
          alt={slides[current].caption}
          className="w-full rounded-lg"
          loading="lazy"
        />
      </div>
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          disabled={current === 0}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium border hover:bg-muted/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <CaretLeft className="w-4 h-4" /> Prev
        </button>
        <span className="text-sm text-muted-foreground">
          {current + 1} / {slides.length} — <em>{slides[current].caption}</em>
        </span>
        <button
          onClick={() => setCurrent(c => Math.min(slides.length - 1, c + 1))}
          disabled={current === slides.length - 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium border hover:bg-muted/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next <CaretRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function AtomicLLMTrainingConcept({ onMarkComplete, onNavigateToNext }: AtomicLLMTrainingConceptProps) {

  const handleMarkComplete = () => {
    markNodeComplete('atomic-llm-training');
    if (onMarkComplete) onMarkComplete();
  };

  const tabs = [
    // ── Tab 1: Why This Matters ──────────────────────────────────────────
    {
      id: 'why-this-matters',
      title: 'Why This Matters',
      description: 'Understand why 200 lines of pure Python change everything',
      icon: <Lightning className="w-4 h-4" />,
      level: 'fundamentals' as const,
      content: (
        <div className="space-y-6">
          {/* Hero card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Atom className="w-6 h-6 text-amber-500" />
                microGPT: Training LLMs at the Atomic Level
              </CardTitle>
              <CardDescription className="text-base">
                By Andrej Karpathy — the most distilled way to see how a GPT actually learns
              </CardDescription>
              <AudioNarrationControls
                componentName="AtomicLLMTrainingConcept"
                position="embedded"
              />
            </CardHeader>
            <CardContent className="space-y-5">
              <blockquote className="border-l-4 border-amber-500/60 pl-4 italic text-lg text-muted-foreground">
                "The most atomic way to train and inference a GPT in pure, dependency-free Python.
                This file is the complete algorithm. Everything else is just efficiency."
                <span className="block mt-1 text-sm not-italic">— @karpathy</span>
              </blockquote>

              <p className="text-base leading-relaxed">
                microGPT is a ~200-line Python script that implements a complete GPT-2 style language
                model — tokenizer, autograd engine, transformer architecture, Adam optimizer, training
                loop, and inference — using <strong>nothing but Python's standard library</strong> (<code>os</code>, <code>math</code>, <code>random</code>).
                No PyTorch. No TensorFlow. No NumPy. Just arithmetic.
              </p>

              {/* Stats strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Lines of Code', value: '~200', color: 'text-amber-600 dark:text-amber-400' },
                  { label: 'Dependencies', value: '0', color: 'text-green-600 dark:text-green-400' },
                  { label: 'Stdlib Only', value: 'os, math, random', color: 'text-blue-600 dark:text-blue-400' },
                  { label: 'Training Steps', value: '~30 visible', color: 'text-purple-600 dark:text-purple-400' },
                ].map(stat => (
                  <div key={stat.label} className={conceptSurface("p-3 text-center")}>
                    <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Why it matters for education */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Why This Matters for Learners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    emoji: '🔍',
                    title: 'Removes All Magic',
                    desc: 'Instead of AI libraries being a "black box," you see EXACTLY how ChatGPT-like models learn, step by step.'
                  },
                  {
                    emoji: '🧮',
                    title: 'Only Uses +, ×, and Basic Math',
                    desc: 'Proves you don\'t need complicated tools to understand AI. If you can do basic algebra, you can follow this.'
                  },
                  {
                    emoji: '🧠',
                    title: 'Builds Real Understanding',
                    desc: 'Like learning math by hand before using a calculator. You\'ll actually understand "gradient descent" and "backpropagation."'
                  },
                  {
                    emoji: '🔗',
                    title: 'See the Full Picture',
                    desc: 'Watch how tiny math operations chain together to create something that can generate text.'
                  },
                ].map(item => (
                  <div key={item.title} className={conceptSurfaceSoft("p-4 space-y-2")}>
                    <h4 className="font-semibold flex items-center gap-2">{item.emoji} {item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Architecture overview */}
          <Card>
            <CardHeader>
              <CardTitle>What's Inside the ~200 Lines</CardTitle>
              <CardDescription>Every component of a modern LLM, implemented from scratch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { section: 'Lines 1–12', label: 'Imports & Seed', detail: 'Only os, math, random — plus a random seed for reproducibility' },
                  { section: 'Lines 14–27', label: 'Tokenizer', detail: 'Character-level tokenizer with BOS/EOS special tokens' },
                  { section: 'Lines 29–72', label: 'Autograd Engine', detail: 'Value class: scalar + gradient, operator overloading, topological backward()' },
                  { section: 'Lines 74–90', label: 'Parameter Init', detail: 'Embeddings (token + position), attention weights (Q/K/V/O), MLP weights' },
                  { section: 'Lines 92–144', label: 'GPT Architecture', detail: 'linear(), softmax(), rmsnorm(), multi-head attention, ReLU MLP, residuals' },
                  { section: 'Lines 146–184', label: 'Training Loop', detail: 'Adam optimizer, cross-entropy loss, backward(), learning rate decay' },
                  { section: 'Lines 186–200', label: 'Inference', detail: 'Temperature-scaled sampling to generate new text' },
                ].map(row => (
                  <div key={row.section} className="flex gap-3 items-start">
                    <Badge variant="outline" className="shrink-0 font-mono text-xs mt-0.5">{row.section}</Badge>
                    <div>
                      <span className="font-medium">{row.label}</span>
                      <span className="text-muted-foreground"> — {row.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Animated pipeline flowchart */}
          <PipelineFlowchart />

          {/* Visual resources callout */}
          <Card>
            <CardHeader>
              <CardTitle>Visual & Interactive Guides</CardTitle>
              <CardDescription>Multiple ways to explore microGPT beyond reading the code</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a href="https://ladenhauf.com/viz/ai-viz/" target="_blank" rel="noopener noreferrer"
                   className={conceptSurfaceSoft("p-4 block hover:border-amber-500/40 transition-colors group")}>
                  <h4 className="font-semibold flex items-center gap-2 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    <Rocket className="w-4 h-4" /> Animated Execution Visualization
                    <ArrowSquareOut className="w-3 h-3 opacity-50" />
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">Watch microGPT run step by step with animated data flow (credit: snzro)</p>
                </a>
                <a href="https://claude.ai/public/artifacts/36b54621-c5d8-45a1-9963-32577d352a86" target="_blank" rel="noopener noreferrer"
                   className={conceptSurfaceSoft("p-4 block hover:border-amber-500/40 transition-colors group")}>
                  <h4 className="font-semibold flex items-center gap-2 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    <Graph className="w-4 h-4" /> Interactive Visual Guide (Claude Artifact)
                    <ArrowSquareOut className="w-3 h-3 opacity-50" />
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">Explore each component interactively with diagrams and explanations</p>
                </a>
                <a href="https://htmlpreview.github.io/?https://github.com/tanpuekai/microGPT_webEdu/blob/main/index.html" target="_blank" rel="noopener noreferrer"
                   className={conceptSurfaceSoft("p-4 block hover:border-amber-500/40 transition-colors group")}>
                  <h4 className="font-semibold flex items-center gap-2 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    <TreeStructure className="w-4 h-4" /> Step-by-Step Visual Explainer
                    <ArrowSquareOut className="w-3 h-3 opacity-50" />
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">tanpuekai's web-based educational walkthrough of every line</p>
                </a>
                <a href="https://ai.studio/apps/drive/1E9XlNn7X1GnNdRLB8AdfkcpYk2YMo3OQ?fullscreenApplet=true" target="_blank" rel="noopener noreferrer"
                   className={conceptSurfaceSoft("p-4 block hover:border-amber-500/40 transition-colors group")}>
                  <h4 className="font-semibold flex items-center gap-2 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    <FnIcon className="w-4 h-4" /> Neurovisual: Math Functions Explorer
                    <ArrowSquareOut className="w-3 h-3 opacity-50" />
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">Visualize ReLU, softmax, exp, log — every activation function used in microGPT</p>
                </a>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton title="Why Atomic LLM Training Matters" conceptId="atomic-llm-training" description="Understanding why building a GPT from scratch with ~200 lines of pure Python matters for AI practitioners" />
          <ReferenceSection type="concept" itemId="atomic-llm-training" />
        </div>
      )
    },

    // ── Tab 2: Autograd Engine ───────────────────────────────────────────
    {
      id: 'autograd-engine',
      title: 'Autograd Engine',
      description: 'The Value class — backpropagation from first principles',
      icon: <Atom className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Atom className="w-5 h-5 text-amber-500" />
                The Value Class — Autograd from Scratch
              </CardTitle>
              <CardDescription>
                PyTorch does this with thousands of lines of C++ and CUDA. microGPT does it in 43 lines of Python.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-base leading-relaxed">
                Every number in the network is wrapped in a <code>Value</code> object that stores two things:
                the <strong>scalar data</strong> (forward pass result) and its <strong>gradient</strong> (how
                changing this number affects the loss). When you do <code>a + b</code> or <code>a * b</code>,
                Python's operator overloading creates a new <code>Value</code> that remembers its parents
                and the local derivative of the operation.
              </p>

              <div className={conceptSurface("p-4 space-y-3")}>
                <h4 className="font-semibold">How each operation stores its local gradient:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {[
                    { op: 'a + b', grad: '∂/∂a = 1, ∂/∂b = 1' },
                    { op: 'a × b', grad: '∂/∂a = b, ∂/∂b = a' },
                    { op: 'a ^ n', grad: '∂/∂a = n · a^(n-1)' },
                    { op: 'log(a)', grad: '∂/∂a = 1/a' },
                    { op: 'exp(a)', grad: '∂/∂a = exp(a)' },
                    { op: 'relu(a)', grad: '∂/∂a = 1 if a > 0 else 0' },
                  ].map(item => (
                    <div key={item.op} className="flex items-center gap-2">
                      <code className="font-mono text-amber-600 dark:text-amber-400 w-20">{item.op}</code>
                      <span className="text-muted-foreground">→ {item.grad}</span>
                    </div>
                  ))}
                </div>
              </div>

              <CodeBlock language="python" showLineNumbers>{valueClassCode}</CodeBlock>

              {/* Interactive operations grid */}
              <OperationsGrid />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TreeStructure className="w-5 h-5" />
                Backward Pass — The Chain Rule in Action
              </CardTitle>
              <CardDescription>One call to .backward() propagates gradients through the entire computation graph</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className={conceptSurfaceSoft("p-4 space-y-3")}>
                <h4 className="font-semibold">How backward() works:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li><strong>Build topological order</strong> — DFS from the loss node, collect all nodes in dependency order</li>
                  <li><strong>Set loss gradient to 1</strong> — ∂loss/∂loss = 1 (the starting point)</li>
                  <li><strong>Walk in reverse</strong> — for each node, multiply its gradient by the local gradient and add to each child's gradient</li>
                  <li><strong>Chain rule emerges</strong> — <code>child.grad += local_grad × parent.grad</code></li>
                </ol>
              </div>

              <CodeBlock language="python" showLineNumbers>{backwardCode}</CodeBlock>

              <div className={conceptSurface("p-4")}>
                <h4 className="font-semibold mb-2">💡 Key Insight</h4>
                <p className="text-sm text-muted-foreground">
                  This is <em>exactly</em> what PyTorch's <code>loss.backward()</code> does internally —
                  just with GPU-accelerated tensor operations instead of Python scalars.
                  The algorithm is identical. Understanding this code means understanding backpropagation everywhere.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Interactive compute graph — drag sliders to see gradients */}
          <InteractiveComputeGraph />

          <EnlightenMeButton title="Autograd Engine (Value class & Backpropagation)" conceptId="atomic-llm-training" description="The autograd engine: Value class, operator overloading, backward pass, and topological sort for automatic gradient computation" />
        </div>
      )
    },

    // ── Tab 3: GPT Architecture ──────────────────────────────────────────
    {
      id: 'gpt-architecture',
      title: 'GPT Architecture',
      description: 'Embeddings, multi-head attention, MLP — the full transformer',
      icon: <Brain className="w-4 h-4" />,
      level: 'architecture' as const,
      content: (
        <div className="space-y-6">
          {/* Interactive tokenizer & embedding visualizer */}
          <InteractiveTokenizer />
          <EmbeddingVisualizer />

          {/* Helpers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FnIcon className="w-5 h-5 text-amber-500" />
                Building Blocks: linear, softmax, rmsnorm
              </CardTitle>
              <CardDescription>
                Three helper functions — the entire neural-network toolkit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className={conceptSurfaceSoft("p-3")}>
                  <h4 className="font-semibold text-sm mb-1"><code>linear(x, w)</code></h4>
                  <p className="text-xs text-muted-foreground">Matrix-vector multiply. Each output = dot product of a weight row with the input.</p>
                </div>
                <div className={conceptSurfaceSoft("p-3")}>
                  <h4 className="font-semibold text-sm mb-1"><code>softmax(logits)</code></h4>
                  <p className="text-xs text-muted-foreground">Converts raw scores to probabilities. Subtracts max for numerical stability, then exp + normalize.</p>
                </div>
                <div className={conceptSurfaceSoft("p-3")}>
                  <h4 className="font-semibold text-sm mb-1"><code>rmsnorm(x)</code></h4>
                  <p className="text-xs text-muted-foreground">Root Mean Square normalization. Simpler than LayerNorm — no learnable bias or mean subtraction.</p>
                </div>
              </div>
              <CodeBlock language="python" showLineNumbers>{architectureCode}</CodeBlock>
            </CardContent>
          </Card>

          {/* Architecture flow */}
          <Card>
            <CardHeader>
              <CardTitle>Architecture Flow</CardTitle>
              <CardDescription>
                Follows GPT-2 with minor differences: RMSNorm instead of LayerNorm, no biases, ReLU instead of GeLU
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={conceptSurface("p-4")}>
                <div className="flex flex-wrap items-center gap-2 text-sm font-mono justify-center">
                  {[
                    'Token ID', '→', 'wte[tok]', '+', 'wpe[pos]',
                    '→', 'RMSNorm', '→', 'Multi-Head Attention',
                    '→', '+ Residual', '→', 'RMSNorm', '→', 'MLP (ReLU)',
                    '→', '+ Residual', '→', 'lm_head → Logits'
                  ].map((item, i) => (
                    item === '→' || item === '+'
                      ? <span key={i} className="text-amber-500 font-bold">{item}</span>
                      : <Badge key={i} variant="outline" className="font-mono text-xs">{item}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attention & MLP detail */}
          <Card>
            <CardHeader>
              <CardTitle>Multi-Head Attention + MLP Block</CardTitle>
              <CardDescription>The core transformer block — attention for context, MLP for computation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={conceptSurfaceSoft("p-4 space-y-2")}>
                  <h4 className="font-semibold">🔍 Multi-Head Attention</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Project input into Q, K, V vectors via learned weight matrices</li>
                    <li>• Split into <code>n_head</code> parallel heads (4 heads × 4 dims = 16 dims)</li>
                    <li>• Each head: <code>softmax(Q·K / √d) · V</code></li>
                    <li>• Concatenate heads, project through output matrix</li>
                    <li>• Add residual connection</li>
                  </ul>
                </div>
                <div className={conceptSurfaceSoft("p-4 space-y-2")}>
                  <h4 className="font-semibold">⚡ MLP Block</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• RMSNorm the input</li>
                    <li>• Expand: <code>linear(x, fc1)</code> — 16d → 64d</li>
                    <li>• Activation: <code>ReLU</code> (microGPT uses simple ReLU)</li>
                    <li>• Contract: <code>linear(x, fc2)</code> — 64d → 16d</li>
                    <li>• Add residual connection</li>
                  </ul>
                </div>
              </div>

              <CodeBlock language="python" showLineNumbers>{gptForwardCode}</CodeBlock>

              {/* Interactive attention and MLP diagrams */}
              <AttentionVisualizer />
              <MLPFlowDiagram />

              {/* Hyperparameters */}
              <div className={conceptSurface("p-4")}>
                <h4 className="font-semibold mb-2">Default Hyperparameters</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  {[
                    { name: 'n_embd', value: '16', desc: 'Embedding dimension' },
                    { name: 'n_head', value: '4', desc: 'Attention heads' },
                    { name: 'n_layer', value: '1', desc: 'Transformer layers' },
                    { name: 'block_size', value: '16', desc: 'Max sequence length' },
                  ].map(hp => (
                    <div key={hp.name} className="text-center">
                      <code className="text-amber-600 dark:text-amber-400 font-bold">{hp.value}</code>
                      <div className="text-xs text-muted-foreground"><code>{hp.name}</code> — {hp.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton title="GPT Architecture (Attention, MLP, Transformer Blocks)" conceptId="atomic-llm-training" description="Transformer architecture internals: causal self-attention, MLP feed-forward layers, residual connections, and how blocks compose into a GPT" />
        </div>
      )
    },

    // ── Tab 4: Training Loop & Adam ──────────────────────────────────────
    {
      id: 'training-loop',
      title: 'Training Loop & Adam',
      description: 'Forward, backward, update — the learning cycle explained',
      icon: <Code className="w-4 h-4" />,
      level: 'implementation' as const,
      content: (
        <div className="space-y-6">
          {/* Training overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-amber-500" />
                The Training Loop — Where Learning Happens
              </CardTitle>
              <CardDescription>Each step: pick a document → forward → loss → backward → Adam update</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className={conceptSurface("p-4")}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {[
                    { step: '1', title: 'Tokenize', desc: 'Pick a document (name), convert to character token IDs, wrap with BOS' },
                    { step: '2', title: 'Forward', desc: 'Run each token through the GPT, compute softmax probabilities at each position' },
                    { step: '3', title: 'Loss', desc: 'Cross-entropy: −log(probability of correct next token), averaged over sequence' },
                    { step: '4', title: 'Backward + Update', desc: 'Call loss.backward() → chain rule fills all gradients → Adam updates all params' },
                  ].map(s => (
                    <div key={s.step} className={conceptSurfaceSoft("p-3 text-center")}>
                      <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{s.step}</div>
                      <h4 className="font-semibold text-sm">{s.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <CodeBlock language="python" showLineNumbers>{trainingLoopCode}</CodeBlock>
            </CardContent>
          </Card>

          {/* Animated training simulation */}
          <AnimatedTrainingChart />
          <LossExplainer />

          {/* Adam explained */}
          <Card>
            <CardHeader>
              <CardTitle>Adam Optimizer — Handwritten</CardTitle>
              <CardDescription>The same optimizer that trains every modern LLM, implemented in 8 lines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className={conceptSurfaceSoft("p-4 space-y-3")}>
                  <h4 className="font-semibold">What Adam Does (Step by Step):</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li><strong>First moment (m)</strong> — Running average of gradients (which direction to move)</li>
                    <li><strong>Second moment (v)</strong> — Running average of squared gradients (how much each param varies)</li>
                    <li><strong>Bias correction (m̂, v̂)</strong> — Adjust for the fact that m and v start at zero</li>
                    <li><strong>Update rule</strong> — <code>param -= lr × m̂ / (√v̂ + ε)</code></li>
                    <li><strong>LR decay</strong> — Learning rate linearly decreases: <code>lr × (1 − step/total)</code></li>
                  </ol>
                </div>

                <div className={conceptSurface("p-4")}>
                  <h4 className="font-semibold mb-2">💡 Why Adam over plain SGD?</h4>
                  <p className="text-sm text-muted-foreground">
                    Plain gradient descent uses the same learning rate for every parameter.
                    Adam adapts: parameters with noisy gradients get smaller steps, stable ones get larger steps.
                    It also uses momentum (the first moment <code>m</code>) to smooth out zig-zagging.
                    These 8 lines are why training converges in ~30 steps instead of thousands.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inference */}
          <Card>
            <CardHeader>
              <CardTitle>Inference — Generation from Trained Model</CardTitle>
              <CardDescription>Temperature-scaled sampling to generate new names</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-relaxed">
                After training, the model generates new text by repeatedly:
                feeding the last token → getting logits → dividing by temperature → softmax → sampling.
                Lower temperature = more conservative, higher = more creative.
              </p>
              <CodeBlock language="python" showLineNumbers>{inferenceCode}</CodeBlock>
            </CardContent>
          </Card>

          {/* Temperature explorer — interactive generation */}
          <TemperatureExplorer />

          {/* Autoregressive Generation Visual Deck */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-500" />
                Autoregressive Generation — Visual Deep Dive
              </CardTitle>
              <CardDescription>
                Step through this 9-slide visual deck explaining how LLMs generate text one token at a time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SlideViewer slides={autoregressiveSlides} />
            </CardContent>
          </Card>

          <EnlightenMeButton title="Training Loop, Adam Optimizer & Autoregressive Inference" conceptId="atomic-llm-training" description="The training loop (forward, loss, backward, Adam update), cross-entropy loss, temperature-scaled sampling, and autoregressive text generation" />
        </div>
      )
    },

    // ── Tab 5: Try It Yourself ───────────────────────────────────────────
    {
      id: 'try-it-yourself',
      title: 'Try It Yourself',
      description: 'Run it, experiment, explore community extensions',
      icon: <Rocket className="w-4 h-4" />,
      level: 'advanced' as const,
      content: (
        <div className="space-y-6">
          {/* Run instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-amber-500" />
                Run microGPT in 30 Seconds
              </CardTitle>
              <CardDescription>No setup required — just Python 3 and a terminal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock language="bash">{`# Download and run — that's it
curl -O https://gist.githubusercontent.com/karpathy/8627fe009c40f57531cb18360106ce95/raw/microgpt.py
python microgpt.py

# Or clone & run
git clone https://gist.github.com/karpathy/8627fe009c40f57531cb18360106ce95.git microgpt
cd microgpt && python microgpt.py`}</CodeBlock>

              <div className={conceptSurface("p-4")}>
                <h4 className="font-semibold mb-2">Expected Output</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  You'll see training loss decrease over 1000 steps, then 20 generated names:
                </p>
                <CodeBlock language="text">{`num docs: 32033
vocab size: 28
num params: 7420
step    1 / 1000 | loss 3.6292
step    2 / 1000 | loss 3.3794
...
step 1000 / 1000 | loss 1.8543

--- inference (new, hallucinated names) ---
sample  1: Jaylen
sample  2: Arian
sample  3: Kael
...`}</CodeBlock>
              </div>
            </CardContent>
          </Card>

          {/* Challenges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightning className="w-5 h-5" />
                Challenges — Modify and Learn
              </CardTitle>
              <CardDescription>Hands-on experiments to deepen your understanding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    level: 'Beginner',
                    color: 'border-green-500/30',
                    title: 'Change the Temperature',
                    desc: 'Try temperature = 0.1 vs 1.0 vs 2.0. What happens to the generated names? Why?'
                  },
                  {
                    level: 'Beginner',
                    color: 'border-green-500/30',
                    title: 'Train on Your Own Text',
                    desc: 'Replace the names dataset with your own text file. Try song lyrics, city names, or code keywords.'
                  },
                  {
                    level: 'Intermediate',
                    color: 'border-amber-500/30',
                    title: 'Scale the Model',
                    desc: 'Change n_embd to 32 and n_layer to 2. Does loss decrease faster? How much slower is training?'
                  },
                  {
                    level: 'Intermediate',
                    color: 'border-amber-500/30',
                    title: 'Swap ReLU for GeLU',
                    desc: 'Implement GeLU: x * 0.5 * (1 + tanh(√(2/π) * (x + 0.044715 * x³))). Does it help?'
                  },
                  {
                    level: 'Advanced',
                    color: 'border-red-500/30',
                    title: 'Add Dropout',
                    desc: 'Implement dropout in the attention weights and MLP. Track loss with and without it.'
                  },
                  {
                    level: 'Advanced',
                    color: 'border-red-500/30',
                    title: 'Visualize the Compute Graph',
                    desc: 'Add a .to_graphviz() method to Value that renders the full computation DAG for one training step.'
                  },
                ].map(challenge => (
                  <div key={challenge.title} className={`border ${challenge.color} rounded-lg p-4 space-y-2`}>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{challenge.level}</Badge>
                      <h4 className="font-semibold text-sm">{challenge.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{challenge.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community extensions */}
          <Card>
            <CardHeader>
              <CardTitle>Community Extensions & Ports</CardTitle>
              <CardDescription>The microGPT ecosystem — versions in every language and format</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    title: 'picoGPT (93 lines)',
                    url: 'https://github.com/Kuberwastaken/picogpt',
                    desc: 'Even more minimal — 93 lines. How much can you strip away and still learn?',
                  },
                  {
                    title: 'microGPT.js (Browser)',
                    url: 'https://huggingface.co/spaces/webml-community/microgpt.js',
                    desc: 'Xenova\'s exact JavaScript port — runs in the browser, bit-for-bit matching output.',
                  },
                  {
                    title: 'tanpuekai\'s Visual Explainer',
                    url: 'https://github.com/tanpuekai/microGPT_webEdu',
                    desc: 'Web-based step-by-step educational walkthrough with visual annotations.',
                  },
                  {
                    title: 'DeepWiki: nanochat',
                    url: 'https://deepwiki.com/karpathy/nanochat',
                    desc: 'Deep dive into Karpathy\'s nanochat — the next step up from microGPT.',
                  },
                  {
                    title: 'Neurovisual (OAS)',
                    url: 'https://ai.studio/apps/drive/1E9XlNn7X1GnNdRLB8AdfkcpYk2YMo3OQ?fullscreenApplet=true',
                    desc: 'Open Agent School\'s interactive tool for visualizing all the math functions used in microGPT.',
                  },
                  {
                    title: 'Animated Execution Flow',
                    url: 'https://ladenhauf.com/viz/ai-viz/',
                    desc: 'Watch the data flow through the network in real time (credit: snzro).',
                  },
                ].map(ext => (
                  <a key={ext.title} href={ext.url} target="_blank" rel="noopener noreferrer"
                     className={conceptSurfaceSoft("p-3 block hover:border-amber-500/40 transition-colors group")}>
                    <h4 className="font-semibold text-sm flex items-center gap-2 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                      {ext.title}
                      <ArrowSquareOut className="w-3 h-3 opacity-50" />
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">{ext.desc}</p>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* The bigger picture */}
          <Card>
            <CardHeader>
              <CardTitle>The Bigger Picture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={conceptSurface("p-5 space-y-3")}>
                <p className="text-base leading-relaxed">
                  AI and agents are everywhere now. When you understand how LLMs work from scratch —
                  every gradient, every attention head, every optimizer step — you can:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">▸</span>
                    <span><strong>Actually innovate</strong> instead of just calling APIs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">▸</span>
                    <span><strong>Debug intelligently</strong> — know whether the problem is in your data, your architecture, or your optimizer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">▸</span>
                    <span><strong>Evaluate claims</strong> — separate real breakthroughs from marketing hype</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">▸</span>
                    <span><strong>Build better agents</strong> — because you understand the model your agent sits on top of</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <EnlightenMeButton title="Hands-On microGPT: Experiments & Extensions" conceptId="atomic-llm-training" description="Practical experiments: changing temperature, training on custom text, scaling the model, swapping activations, adding dropout, and community extensions" />
          <ReferenceSection type="concept" itemId="atomic-llm-training" />
        </div>
      )
    },
  ];

  return (
    <ConceptLayout
      conceptId="atomic-llm-training"
      title="Atomic LLM Training (microGPT)"
      description="See every line of a working GPT — 200 lines of pure Python, zero dependencies, full understanding."
      tabs={tabs}
      icon={<Atom className="w-6 h-6 text-amber-500" />}
      estimatedTime="50-70 min"
      nextConcept={{
        id: 'agent-learning',
        title: 'Agent Learning',
        description: 'Now that you understand how models learn, explore how agents learn from interactions and feedback.'
      }}
      onMarkComplete={handleMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  )
}
