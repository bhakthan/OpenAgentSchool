# Human-in-the-Loop Patterns - Infographic Prompt

## Generation Settings

- **Tool**: Nano Banana Pro
- **Style**: Flat UI Style 2.0
- **Resolution**: 8K (7680×4320)
- **Orientation**: Landscape (16:9)
- **Background**: Light (#EEF2FF) with subtle indigo tint

---

## Prompt

```text
Create a comprehensive educational infographic titled "Human-in-the-Loop Patterns: Keeping Humans in Control" in Flat UI Style 2.0.

STYLE REQUIREMENTS:
- Clean, modern flat design with subtle shadows
- Light indigo-tinted background (#EEF2FF)
- Indigo/purple primary (#6366F1) for HITL theme
- Green (#22C55E) for approved/success
- Red (#EF4444) for rejected/blocked
- Amber (#F59E0B) for pending/review
- Blue (#3B82F6) for automation
- Sans-serif typography (Inter or SF Pro)
- Rounded corners (12px) on cards
- Human and robot icons showing collaboration

LAYOUT (Workflow Diagram Style):

HEADER:
- Title: "Human-in-the-Loop Patterns" in bold dark text
- Subtitle: "The Art of Human-AI Collaboration"
- Icon: Two figures (human + robot) with handshake
- Badge: "Trust Through Oversight"

MAIN WORKFLOW DIAGRAM (Center, Horizontal Flow):

NODE 1 - AI AGENT:
- Visual: Robot icon in purple circle
- Label: "🤖 AI Agent"
- Description: "Proposes action"
- Output arrow labeled: "Request"

NODE 2 - CONFIDENCE CHECK (Diamond):
- Visual: Diamond decision shape
- Label: "Confidence > 80%?"
- Two outgoing paths:
  - Upper path: "Yes" (green arrow)
  - Lower path: "No" (amber arrow)

NODE 3A - AUTO-APPROVE (Upper Path):
- Visual: Checkmark in green circle
- Label: "✓ Auto-Approve"
- Description: "High confidence actions proceed"
- Criteria: "> 80% confidence"
- Examples: "Read data, simple queries"

NODE 3B - HUMAN REVIEW (Lower Path):
- Visual: Human icon in amber circle
- Label: "👤 Human Review"
- Description: "Expert evaluates request"
- Queue visual: Pending requests list
- Timer: "SLA: 5 min response"

NODE 4 - DECISION:
- Visual: Two paths from human review
- Approve path: Green arrow to Execute
- Reject path: Red arrow back to Agent
- Feedback loop shown

NODE 5 - EXECUTE:
- Visual: Lightning bolt in green circle
- Label: "⚡ Execute"
- Description: "Action is performed"

NODE 6 - FEEDBACK LOOP:
- Visual: Curved arrow back to Agent
- Label: "📝 Learn & Adapt"
- Description: "Improve confidence thresholds"
- Note: "Continuous improvement"

MIDDLE SECTION - 4 HITL PATTERN CARDS:

Card 1: "✋ Approval Gates"
- Icon: Stop hand
- Color: Red accent
- Description: "Require sign-off before critical actions"
- Use cases:
  - "Financial transactions"
  - "Data deletion"
  - "External communications"
- Implementation: "Queue-based with timeout"

Card 2: "📊 Confidence Thresholds"
- Icon: Gauge/meter
- Color: Amber accent
- Description: "Auto-approve high, escalate low"
- Thresholds table:
  - "Read data: 60%"
  - "Write data: 80%"
  - "External API: 85%"
  - "Send email: 95%"
- Visual: Threshold slider

Card 3: "🔄 Feedback Loops"
- Icon: Circular arrows
- Color: Blue accent
- Description: "Learn from corrections"
- Metrics:
  - "Approval rate: 94%"
  - "Avg correction time: 2.3s"
  - "Threshold improvements: 12"
- Visual: Learning curve graph

Card 4: "🤝 Graceful Handoff"
- Icon: Two hands exchanging
- Color: Green accent
- Description: "Seamless transfer to human"
- Triggers:
  - "User requests human"
  - "Agent uncertainty"
  - "Complex edge case"
- Visual: Handoff animation

BOTTOM LEFT - APPROVAL QUEUE:
- Title: "⏳ Pending Approvals"
- Queue items:
  - "Tool Call: Weather API" - Confidence: 92% - ✅ Auto
  - "External API: SendGrid" - Confidence: 78% - ⏳ Pending
  - "Data Access: User DB" - Confidence: 65% - ⏳ Pending
  - "Send Email: Customer" - Confidence: 88% - ⏳ Pending
- Visual: List with status indicators

BOTTOM CENTER - MATURITY LEVELS:
- Title: "HITL Maturity Ladder"
- 5 levels stacked vertically:

Level 1: "Full Manual"
- Every action needs approval
- 0% automation

Level 2: "Approval Gates"
- Critical actions reviewed
- 40% automation

Level 3: "Confidence-Based"
- Thresholds determine flow
- 70% automation

Level 4: "Exception-Only"
- Only anomalies escalated
- 90% automation

Level 5: "Supervised Autonomy"
- AI operates, humans audit
- 95% automation

- Arrow showing progression from manual to autonomous

BOTTOM RIGHT - METRICS DASHBOARD:
- Title: "📊 HITL Metrics"
- Metric cards:
  - "Auto-approved: 847" (green)
  - "Human reviewed: 153" (amber)
  - "Rejected: 12" (red)
  - "Avg response: 2.3s" (blue)
- Pie chart: Auto vs Manual ratio
- Trend: "Automation ↑ 5% this week"

SIDEBAR - ESCALATION PATHS:
- Title: "Escalation Hierarchy"
- Visual: Pyramid/ladder
- Levels:
  1. "Agent handles (auto)"
  2. "Tier 1 reviewer"
  3. "Subject matter expert"
  4. "Manager override"
  5. "Emergency stop"
- Color gradient: Green to red (bottom to top)

FOOTER:
- Open Agent School logo
- URL: www.openagentschool.org
- Tagline: "Augment, Don't Replace"
- Indigo gradient accent bar

VISUAL POLISH:
- Show human and robot working together
- Trust meter/gauge
- Approval checkmarks and rejection X marks
- Queue with pending items
- Feedback arrows showing continuous learning
- Professional business/enterprise feel
- Status indicators (green/amber/red dots)
```

---

## Expected Output

A collaborative workflow infographic showing:

1. **Approval Workflow** - Agent → Confidence Check → Auto/Human Review → Execute → Feedback
2. **Four HITL Patterns** - Approval Gates, Confidence Thresholds, Feedback Loops, Graceful Handoff
3. **Maturity Levels** - Journey from full manual to supervised autonomy

Visual learners should understand how to design appropriate human oversight for their agents.

---

## File Output

Save generated image as:

```text
/public/images/infographics/human-in-the-loop-patterns-infographic.png
```
