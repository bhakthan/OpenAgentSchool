# Fine-Tuning LLMs - Infographic Prompt

## Generation Settings

- **Tool**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (4320×7680)
- **Orientation**: Portrait (9:16)
- **Background**: Light (#FFFFFF) with gradient to warm cream

---

## Prompt

```text
Create a comprehensive educational infographic titled "Fine-Tuning LLMs: A Decision Framework" in Flat UI Style 2.0.

STYLE REQUIREMENTS:
- Clean, modern flat design with subtle drop shadows
- White to cream gradient background
- Decision tree visualization style
- Primary color: Orange (#F97316) with purple accents (#8B5CF6)
- Sans-serif typography (Inter or SF Pro style)
- Rounded corners (12px radius) on all cards
- Connecting lines showing progression paths

LAYOUT (Top to Bottom):

HEADER SECTION:
- Title: "Fine-Tuning LLMs" in large bold text
- Subtitle: "When Prompting Isn't Enough"
- Tagline: "The Minimum Intervention Principle"
- Icon: Brain with tuning knobs
- Badge: "2026 Best Practices"

HERO VISUAL - THE INTERVENTION LADDER:
- Vertical ladder/staircase showing 4 levels:

  Level 1 (Bottom, Green): "Prompt Engineering"
  - "Try this first"
  - Effort: ⭐
  - Data needed: None
  - Examples: "Few-shot, chain-of-thought"

  Level 2 (Yellow): "RAG (Retrieval)"
  - "Add knowledge"
  - Effort: ⭐⭐
  - Data needed: Documents
  - Examples: "Vector stores, semantic search"

  Level 3 (Orange): "Fine-Tuning"
  - "Teach new behaviors"
  - Effort: ⭐⭐⭐
  - Data needed: 100s-1000s examples
  - Examples: "SFT, DPO, RFT"

  Level 4 (Top, Red): "Pre-Training"
  - "Build new capabilities"
  - Effort: ⭐⭐⭐⭐⭐
  - Data needed: Billions of tokens
  - Examples: "Custom foundation models"

  Arrow pointing up: "Increasing intervention"
  Key insight: "Start at bottom, climb only if needed"

SECTION 1 - DECISION TREE:
- Color: Blue (#3B82F6)
- Title: "Should You Fine-Tune?"
- Flowchart decision tree:

  START: "Does prompting solve it?"
  - Yes → "✅ Use prompting"
  - No ↓

  "Do you need domain knowledge?"
  - Yes → "Try RAG first"
  - No ↓

  "Do you need behavior change?"
  - "Tone, format, style?"
  - Yes → "Fine-tuning candidate"
  - No ↓

  "Do you need speed/cost reduction?"
  - Yes → "Distillation candidate"
  - No → "Re-evaluate requirements"

SECTION 2 - FINE-TUNING METHODS:
- Color: Purple (#8B5CF6)
- Title: "The Fine-Tuning Trio"
- 3 large method cards:

  Card 1 - "SFT (Supervised Fine-Tuning)":
  - Icon: Teacher with pointer
  - How it works: "Input → Desired Output pairs"
  - Data format: "{instruction, response}"
  - Best for: "Teaching new formats, domain adaptation"
  - Data needed: "100-10,000 examples"
  - Pros: "Simple, predictable"
  - Cons: "Can overfit, needs quality data"

  Card 2 - "DPO (Direct Preference Optimization)":
  - Icon: Thumbs up vs thumbs down
  - How it works: "Compare good vs bad responses"
  - Data format: "{prompt, chosen, rejected}"
  - Best for: "Alignment, safety, style preferences"
  - Data needed: "1,000+ preference pairs"
  - Pros: "No reward model needed"
  - Cons: "Needs contrastive pairs"

  Card 3 - "RFT (Reinforcement Fine-Tuning)":
  - Icon: Reward medal
  - How it works: "Optimize for reward signal"
  - Data format: "Verifiable outcomes (code, math)"
  - Best for: "Reasoning, code generation"
  - Data needed: "Problems with verifiable solutions"
  - Pros: "Learns to reason"
  - Cons: "Needs verifiable tasks"

SECTION 3 - DATA QUALITY PYRAMID:
- Color: Green (#22C55E)
- Title: "Data Quality > Quantity"
- Pyramid diagram:

  TOP (Small): "Curated Expert Data"
  - "Human-verified, edge cases"
  - Impact: Highest
  - Example: "Expert-written examples"

  MIDDLE: "Synthetic Data"
  - "LLM-generated, filtered"
  - Impact: Medium
  - Example: "GPT-4 generated training data"

  BOTTOM (Wide): "Raw Data"
  - "Unfiltered, noisy"
  - Impact: Lowest
  - Example: "Scraped conversations"

  Side callout: "100 great examples > 10,000 poor ones"

SECTION 4 - THE FINE-TUNING PROCESS:
- Color: Orange (#F97316)
- Title: "Fine-Tuning Workflow"
- Horizontal process flow:

  Step 1: "📊 Data Collection"
  - "Gather input-output pairs"
  - Tip: "Quality over quantity"

  Step 2: "🧹 Data Cleaning"
  - "Remove duplicates, fix errors"
  - Tip: "Validate with domain experts"

  Step 3: "📝 Format Preparation"
  - "Convert to training format"
  - Tip: "Match model's expected schema"

  Step 4: "🎯 Training"
  - "Run fine-tuning job"
  - Tip: "Start with small epochs"

  Step 5: "📈 Evaluation"
  - "Test on held-out data"
  - Tip: "Compare to baseline"

  Step 6: "🔄 Iteration"
  - "Refine based on results"
  - Tip: "Add failure cases"

SECTION 5 - COMMON PITFALLS:
- Color: Red (#EF4444)
- Title: "Fine-Tuning Anti-Patterns"
- Warning cards:

  ❌ "Overtraining"
  - Symptom: "Memorizes training data"
  - Fix: "Use validation set, early stopping"

  ❌ "Wrong Base Model"
  - Symptom: "Capabilities disappear"
  - Fix: "Use instruction-tuned base"

  ❌ "Insufficient Data"
  - Symptom: "No improvement"
  - Fix: "Augment with synthetic data"

  ❌ "Catastrophic Forgetting"
  - Symptom: "Loses general capabilities"
  - Fix: "Mix in general training data"

  ❌ "Distribution Shift"
  - Symptom: "Works on training, fails in prod"
  - Fix: "Match prod distribution"

SECTION 6 - PLATFORM COMPARISON:
- Color: Indigo (#6366F1)
- Title: "Where to Fine-Tune (2026)"
- Platform comparison grid:

  | Platform | Models | Ease | Cost |
  |----------|--------|------|------|
  | OpenAI | GPT-4o, GPT-4o-mini | ⭐⭐⭐⭐⭐ | $$$$ |
  | Azure OpenAI | GPT-4, GPT-3.5 | ⭐⭐⭐⭐ | $$$ |
  | Anthropic | Claude | ⭐⭐⭐⭐ | $$$ |
  | Google | Gemini | ⭐⭐⭐ | $$ |
  | AWS Bedrock | Various | ⭐⭐⭐ | $$ |
  | Self-hosted | Llama, Mistral | ⭐⭐ | $ (+ GPU) |

SECTION 7 - SUCCESS METRICS:
- Color: Teal (#14B8A6)
- Title: "Measuring Fine-Tuning Success"
- Metrics cards:

  📊 "Task Accuracy"
  - "Did accuracy improve?"
  - Baseline comparison required

  ⏱️ "Latency"
  - "Is it faster than prompting?"
  - Often yes (shorter prompts)

  💰 "Cost per Request"
  - "Cheaper than few-shot?"
  - Calculate token savings

  🎯 "Consistency"
  - "More reliable outputs?"
  - Measure variance reduction

  🛡️ "Safety"
  - "Still aligned?"
  - Red team testing required

FOOTER:
- "Learn more: openagentschool.org/concepts/fine-tuning"
- Open Agent School logo
- "Start with lowest intervention that works"
- QR code to fine-tuning guide

DECORATIVE ELEMENTS:
- Gradient tuning knob icons in margins
- Neural network pattern accents
- Before/after comparison visuals
- Training curve illustration
```

---

## Usage Notes

This infographic teaches fine-tuning for visual learners:

1. The intervention ladder (start simple, escalate only if needed)
2. Decision tree for when to fine-tune
3. The three methods: SFT, DPO, RFT
4. Data quality principles
5. The fine-tuning workflow
6. Common pitfalls to avoid
7. Platform options and success metrics

Color coding: Blue (decisions), Purple (methods), Green (data), Orange (process), Red (pitfalls), Indigo (platforms), Teal (metrics)
