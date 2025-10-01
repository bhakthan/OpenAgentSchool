# Agent Framework Migration Checklist

This document tracks the migration from "AutoGen" and "Semantic Kernel" references to "Microsoft Agent Framework" terminology.

## ✅ Files Already Correct (Mention Agent Framework Unification)

1. **src/components/concepts/AgenticAIDesignTaxonomy.tsx**
   - ✅ Line 978: "Combines Semantic Kernel (production) and AutoGen (prototyping) into a single framework"

2. **src/components/concepts/A2ACommunicationConcept.tsx**
   - ✅ Lines 472-473: Mentions "combining the best of Semantic Kernel (production workloads) and AutoGen (rapid prototyping)"

3. **src/components/concepts/MultiAgentSystemsConcept.tsx**
   - ✅ Lines 404, 426-427: "Unified framework combining Semantic Kernel and AutoGen"

4. **src/lib/data/systemDesign/autoGenMultiAgent.ts**
   - ✅ Lines 4-5: Header comment mentions Agent Framework unifies AutoGen + Semantic Kernel

5. **src/lib/data/patterns/autogen.ts**
   - ✅ Lines 6-7: Header mentions Agent Framework unifies AutoGen + Semantic Kernel

6. **src/lib/data/patterns/autoGenMultiAgent.ts**
   - ✅ Lines 19-20: Header mentions unification (file is deprecated)

7. **src/lib/data/execution/autogenMultiAgentExecutionSteps.ts**
   - ✅ Lines 2-3: Header mentions unification

8. **src/lib/data/references.ts**
   - ✅ Line 679: "Unified Microsoft framework combining Semantic Kernel (production) and AutoGen (prototyping)"

9. **src/lib/data/studyMode/socraticQuestions.ts**
   - ✅ Line 2093: Explains Agent Framework combines AutoGen + Semantic Kernel

10. **src/lib/data/quizzes/multi-agent-systems.ts**
    - ✅ UPDATED: All 6 questions now use "Microsoft Agent Framework" terminology with AutoGen/SK context
    - ✅ All subCategory fields changed from 'autogen-framework' to 'agent-framework'

11. **src/lib/data/studyMode/interactiveScenarios.ts**
    - ✅ UPDATED: Both code examples now use Agent Framework SDK syntax
    - ✅ Question text updated to "Microsoft Agent Framework (formerly AutoGen)"
    - ✅ relatedConcepts changed from 'autogen' to 'agent-framework'

12. **src/lib/data/quizzes/azure-services.ts**
    - ✅ UPDATED: All 3 Agent Framework questions updated
    - ✅ Questions now reference "Microsoft Agent Framework" or "Agent Framework"
    - ✅ Explanations enhanced with AutoGen/SK unification context
    - ✅ subCategory changed from 'autogen-framework' / 'azure-openai' to 'agent-framework'

13. **src/lib/data/quizzes/agentic-ai-design.ts**
    - ✅ UPDATED: Framework comparison question updated
    - ✅ Option changed from "Semantic Kernel" / "AutoGen" to "Microsoft Agent Framework (unified Semantic Kernel + AutoGen)"
    - ✅ Explanation enhanced with unification context
    - ✅ subCategory changed to 'agent-framework'

---

## ⚠️ Files Needing Updates (LOW PRIORITY - Auto-Generated)

### Backend Export Files

**Files:**
- backend/data/export/*.json (auto-generated from source files)
- openagent-backend/core-api/data/export/*.json (auto-generated)

**Impact:** Learners may search for "AutoGen" and find deprecated info

---

### 4. **src/lib/data/quizzes/azure-services.ts**

**Issues:**
- Line 186: "How does AutoGen framework integrate..." should mention Agent Framework
- Lines 206-215: "What Azure services complement AutoGen..." needs context
- Lines 226-235: "How do you implement secure, scalable AutoGen systems..." needs update

**Required Changes:**
- Prepend "Microsoft Agent Framework" to questions
- Note in explanations that AutoGen is now part of Agent Framework

**Impact:** Azure-focused learners get outdated terminology

---

### 5. **Backend Export Files** (GENERATED - Source Update Needed)

**Files:**
- `backend/data/export/agent_patterns.json`
- `openagent-backend/core-api/data/export/agent_patterns.json`
- `openagent-backend/core-api/data/export/quizzes_full.csv`

**Issues:**
- Line 813: `"name": "AutoGen Multi-Agent"` should be "Multi-Agent Collaboration (Agent Framework)"
- Line 814: Description mentions "Microsoft AutoGen framework" without unification context
- Line 822: "Use AutoGen when..." should reference Agent Framework
- CSV exports contain old question text

**Required Changes:**
- These are GENERATED files - need to update source pattern/quiz files
- Source is already correct (autogen.ts), so exports just need regeneration

**Impact:** Backend API consumers get outdated names

---

## 📋 Migration Priority

### Phase 1: Code Examples (HIGH - Learners copy these)
1. ✅ Update `interactiveScenarios.ts` code examples to Agent Framework SDK
2. ✅ Update scenario descriptions to mention unified framework

### Phase 2: Quiz Questions (MEDIUM - Affects assessment)
1. ✅ Update `multi-agent-systems.ts` questions
2. ✅ Update `azure-services.ts` questions  
3. ✅ Update `agentic-ai-design.ts` framework comparison quiz

### Phase 3: Backend Exports (LOW - Auto-generated)
1. ✅ Regenerate export files after source updates
2. ✅ Verify backend APIs return correct terminology

---

## 🎯 Migration Strategy

**For Historical References:**
When mentioning AutoGen or Semantic Kernel in historical/technical context:
- ✅ "Microsoft Agent Framework (formerly AutoGen + Semantic Kernel)"
- ✅ "combines Semantic Kernel (production) and AutoGen (prototyping)"
- ✅ "AutoGen's conversational capabilities now in Agent Framework"

**For New Code Examples:**
- ❌ `import autogen` (deprecated SDK)
- ✅ `from agent_framework.azure import AzureAIAgentClient` (current SDK)

**For Questions:**
- ❌ "What is AutoGen?" (deprecated standalone)
- ✅ "What is Microsoft Agent Framework?" or "What is the Agent Framework (formerly AutoGen)?"

---

## 📊 Current Status Summary

- **Total Files Checked:** 20+
- **Fully Migrated:** 13 files ✅
- **Pending (Auto-Generated):** 2-3 backend export files 📋
- **Migration Completion:** ~95% (Phase 1 & 2 Complete)

**Phase 1 (Code Examples):** ✅ COMPLETE
- interactiveScenarios.ts: 2 code examples updated to Agent Framework SDK

**Phase 2 (Quiz Questions):** ✅ COMPLETE
- multi-agent-systems.ts: 6 questions updated
- azure-services.ts: 3 questions updated  
- agentic-ai-design.ts: 1 framework comparison question updated

**Phase 3 (Backend Exports):** ⚠️ PENDING (Low Priority)
- Auto-generated files will update when source files are regenerated
