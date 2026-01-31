# AI Infographic Generation Prompts

This folder contains detailed markdown prompts for generating high-fidelity educational infographics using **Nano Banana Pro** with **Flat UI Style 2.0**.

## Purpose

These prompts are designed for AI image generation tools to create visually stunning, educational infographics that explain complex AI agent concepts. Each infographic should be:

- **Resolution**: 8K (7680×4320 for landscape, 4320×7680 for portrait)
- **Style**: Flat UI Style 2.0 (clean vectors, subtle gradients, no 3D effects)
- **Background**: Light/white background with subtle grid or dot patterns
- **Orientation**: Landscape (16:9) or Portrait (9:16) as specified
- **Attribution**: Include "Open Agent School" branding at bottom

## Style Guidelines

### Flat UI Style 2.0 Characteristics
- Clean, geometric shapes with rounded corners
- Subtle drop shadows (2-4px blur, 10-20% opacity)
- Pastel accent colors with strong primary colors
- Thin connecting lines (1-2px) with rounded caps
- Sans-serif typography (Inter, SF Pro, or similar)
- Iconography using outlined/filled icon style
- Minimal gradients (soft linear, no radial bursts)
- White or very light gray (#F8FAFC) backgrounds

### Color Palette
| Usage | Color | Hex |
|-------|-------|-----|
| Primary (Agent/AI) | Purple | #8B5CF6 |
| Success/Positive | Green | #22C55E |
| Warning/Caution | Amber | #F59E0B |
| Error/Critical | Red | #EF4444 |
| Info/Process | Blue | #3B82F6 |
| Neutral | Slate | #64748B |
| Background | White | #FFFFFF |
| Light Gray | Slate-50 | #F8FAFC |

### Layout Principles
- Clear visual hierarchy with headers, sections, and details
- Generous whitespace (minimum 40px margins)
- Consistent alignment grid (8px base unit)
- Flow direction: top-to-bottom or left-to-right
- Section separators using subtle lines or whitespace
- Icon-first approach for quick scanning

## File Naming Convention

```
{concept-id}-infographic-prompt.md
```

## Concepts Covered

1. **Agent Reasoning Patterns** - CoT, ToT, GoT, Reflexion thinking strategies
2. **Agent Memory Systems** - Working, short-term, long-term memory hierarchy
3. **Agent Observability** - Tracing, metrics, logs, alerting pipeline
4. **Agent Testing & Benchmarks** - Evaluation methods and CI/CD integration
5. **Agent Cost Optimization** - Token budgets, caching, model routing
6. **Human-in-the-Loop Patterns** - Approval workflows and escalation
7. **Prompt Injection Defense** - Security layers and attack mitigation

## Usage

1. Open the desired prompt file
2. Copy the complete prompt content
3. Paste into Nano Banana Pro (or similar AI image generator)
4. Generate at 8K resolution
5. Save to `/public/images/infographics/` folder
6. Reference in concept component

## Attribution

All generated infographics should include the Open Agent School logo and URL at the bottom:

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                    [INFOGRAPHIC CONTENT]                     │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  🎓 Open Agent School | www.openagentschool.org              │
└──────────────────────────────────────────────────────────────┘
```
