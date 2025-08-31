import React, { useMemo, useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { curriculumModules } from '@/lib/learning/modules';
import { progressStore } from '@/lib/learning/progressStore';
import ProgressBadge from './ProgressBadge';
import StudioCard from './StudioCard';
import MicroAssessment from './MicroAssessment';
import { moduleContent } from '@/lib/learning/moduleContent';
import EvalHarnessStudio from './studios/EvalHarnessStudio';
import CostGuardrailStudio from './studios/CostGuardrailStudio';
import RagQualityStudio from './studios/RagQualityStudio';
import HitlStudio from './studios/HitlStudio';
import MultiAgentStudio from './studios/MultiAgentStudio';

interface CurriculumTabsProps {
  defaultModuleId?: string; // optional initial selection
}

export const CurriculumTabs: React.FC<CurriculumTabsProps> = ({ defaultModuleId }) => {
  const first = useMemo(() => curriculumModules[0]?.id, []);
  const [active, setActive] = useState<string>(() => {
    const moduleId = (defaultModuleId || first) as any;
    const last = moduleId ? progressStore.getLastTab(moduleId) : undefined;
    const tab = last || 'overview';
    return `${moduleId}:${tab}`;
  });
  
  useEffect(() => {
    if (!defaultModuleId) return;
    const last = progressStore.getLastTab(defaultModuleId as any) || 'overview';
    setActive(`${defaultModuleId}:${last}`);
  }, [defaultModuleId]);

  const completed = progressStore.getCompletedCount();

  const onValueChange = (val: string) => {
    setActive(val);
    // persist per-module last tab
    const parts = val.split(':');
    if (parts.length === 2) {
      const [moduleId, tab] = parts;
      progressStore.setLastTab(moduleId as any, tab);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-base font-semibold">AI‑Native Skills</h3>
        <ProgressBadge count={completed} title={`${completed} modules completed`} />
      </div>
      <Tabs value={active} onValueChange={onValueChange}>
        <TabsList className="flex flex-wrap gap-1">
          {curriculumModules.map(m => {
            const sub = progressStore.getSubitemCount(m.id);
            const doneAll = sub.done >= sub.total;
            return (
              <TabsTrigger key={m.id} value={`${m.id}:overview`}>
                <span className="mr-1">{m.short}</span>
                <span className={`inline-flex items-center justify-center h-4 min-w-[16px] rounded-full text-[10px] px-1 ${doneAll ? 'bg-green-500 text-white' : 'bg-muted text-foreground/70'}`}>
                  {sub.done}/{sub.total}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        {curriculumModules.map(m => (
          <TabsContent key={m.id} value={`${m.id}:overview`} className="pt-3 space-y-3">

            {/* Learning Outcomes */}
            <div className="rounded border p-3">
              <div className="flex items-center justify-between">
                <div className="font-medium">Learning Outcomes</div>
                <label className="text-xs inline-flex items-center gap-1 text-muted-foreground">
                  <input
                    type="checkbox"
                    defaultChecked={progressStore.getOutcomesReviewed(m.id)}
                    onChange={(e) => progressStore.setOutcomesReviewed(m.id, e.target.checked)}
                  />
                  Mark reviewed
                </label>
              </div>
              <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
                {moduleContent[m.id].outcomes.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </div>

            {/* Visual Map placeholder */}
            <div className="rounded border p-3">
              <div className="font-medium mb-2">Visual Map</div>
              <div className="grid md:grid-cols-3 gap-3">
                {moduleContent[m.id].visualMap.map((sec, idx) => (
                  <div key={idx} className="rounded border p-2">
                    <div className="text-sm font-medium">{sec.title}</div>
                    <ul className="mt-1 list-disc list-inside text-sm text-muted-foreground">
                      {sec.items.map((it, j) => (<li key={j}>{it}</li>))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Studio */}
            {m.id === 'observability-evalops' ? (
              <EvalHarnessStudio moduleId={m.id} studioId={`${m.id}-eval`} />
            ) : m.id === 'cost-performance' ? (
              <CostGuardrailStudio moduleId={m.id} studioId={`${m.id}-cost`} />
            ) : m.id === 'knowledge-rag' ? (
              <RagQualityStudio moduleId={m.id} studioId={`${m.id}-rag`} />
            ) : m.id === 'hitl-operations' ? (
              <HitlStudio moduleId={m.id} studioId={`${m.id}-hitl`} />
            ) : m.id === 'multi-agent-orchestration' ? (
              <MultiAgentStudio moduleId={m.id} studioId={`${m.id}-ma`} />
            ) : (
              <StudioCard
                moduleId={m.id}
                studioId={`${m.id}-studio-1`}
                title={`${m.short} Studio`}
                description={`Hands‑on activity for ${m.title}. Record before/after metrics.`}
              />
            )}

            {/* Micro‑assessment */}
            <MicroAssessment
              moduleId={m.id}
              assessmentId={`${m.id}-ma-1`}
              questions={moduleContent[m.id].assessment.questions}
              passThreshold={moduleContent[m.id].assessment.passThreshold}
              feedback={moduleContent[m.id].assessment.feedback}
            />

            {/* Next CTA */}
            <NextModuleFooter currentModuleId={m.id} onComplete={() => progressStore.setCompleted(m.id, true)} />

          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

    const NextModuleFooter: React.FC<{ currentModuleId: import('@/lib/learning/progressStore').ModuleId; onComplete: () => void }>
      = ({ currentModuleId, onComplete }) => {
      // determine next module recommendation based on sub-items and score
      const modules = curriculumModules;
      const idx = modules.findIndex(m => m.id === currentModuleId);
      const next = modules[idx + 1] || modules[0];
      const sub = progressStore.getSubitemCount(currentModuleId);
      // Fetch latest assessment score (if any)
      const mod = progressStore.getModule(currentModuleId);
      const assessScores = Object.values(mod.microAssessments || {});
      const lastScore = assessScores.sort((a,b) => b.updatedAt - a.updatedAt)[0]?.score;
      const passed = typeof lastScore === 'number' ? lastScore >= (moduleContent[currentModuleId].assessment.passThreshold || 70) : false;
      const ready = sub.done >= sub.total && passed;
      return (
        <div className="flex items-center justify-between rounded border p-3">
          <div className="text-sm">
            {ready ? (
              <span>All checklist items done. You’re ready for: <strong>{next.title}</strong></span>
            ) : (
              <span>Complete outcomes, studio, and pass the assessment to unlock a tailored next step.</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-2 text-sm bg-primary text-white rounded"
              onClick={onComplete}
              type="button"
            >
              Mark Module Complete
            </button>
            <a
              className={`px-3 py-2 text-sm rounded ${ready ? 'bg-secondary text-foreground' : 'bg-muted text-foreground/60 pointer-events-none'}`}
              href={`#${next.id}:overview`}
              aria-disabled={!ready}
            >
              Go to {next.short}
            </a>
          </div>
        </div>
      );
    };

export default CurriculumTabs;
