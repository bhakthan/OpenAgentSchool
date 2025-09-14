import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from '@phosphor-icons/react';

interface Pillar { id:string; title:string; core:string; actions:string[]; outcomes:string[]; impact:string; }

const PILLARS: Pillar[] = [
  { id:'observability', title:'1. Layered Observability', core:'Correlate reasoning, tool, retrieval & user signals', actions:[ 'Structured spans (model, tool, retrieval)', 'Golden probes + drift detectors', 'Tail latency & retry dashboards' ], outcomes:[ 'Sub-5m MTTR for critical incidents', 'Early detection of quality drift (<24h)', 'Tail latency P95 <2.5x P50' ], impact:'Reduces hidden failure cost & accelerates safe iteration.' },
  { id:'resilience', title:'2. Resilience Engineering', core:'Contain & recover from partial failures gracefully', actions:[ 'Circuit breakers + backoff with jitter', 'Degradation playbooks & user messaging', 'Retry storm prevention (queued w/ caps)' ], outcomes:[ '≤1 cascading incident / quarter', '95% failures yield actionable next steps', 'No saturation-driven outages' ], impact:'Prevents systemic degradation and preserves user trust.' },
  { id:'drift', title:'3. Quality & Drift Monitoring', core:'Continuously validate semantic + behavioral stability', actions:[ 'Sentinel query suite refresh', 'Embedding / retrieval freshness diffing', 'User “unhelpful” tag anomaly alerts' ], outcomes:[ 'Drift detected before user churn spike', '≤5% regression window exposure', 'Automated rollback triggers' ], impact:'Catches silent degradation before retention impact.' },
  { id:'rollouts', title:'4. Safe Rollouts', core:'Progressively expose changes with guard metrics', actions:[ 'Shadow evals → canary → phased release', 'Automatic rollback on SLO breach', 'Feature flag gates per capability' ], outcomes:[ 'Zero full-pop rollback events', 'Change failure rate <10%', 'Time-to-recover <30m' ], impact:'Accelerates iteration while reducing blast radius.' }
];

export default function AgentOpsPillars(){
  return (
    <div className='space-y-8'>
      <Card>
        <CardHeader>
          <CardTitle>Agent Operations: 4 Core Pillars</CardTitle>
          <CardDescription>Reliability & runtime governance foundation before aggressive scaling.</CardDescription>
        </CardHeader>
        <CardContent className='grid md:grid-cols-2 gap-4'>
          {PILLARS.map(p => (
            <a key={p.id} href={'#'+p.id} className='p-4 rounded border hover:bg-muted/40 transition'>
              <div className='font-semibold'>{p.title}</div>
              <div className='text-xs text-muted-foreground line-clamp-2'>{p.core}</div>
            </a>
          ))}
        </CardContent>
      </Card>
      {PILLARS.map(p => (
        <Card key={p.id} id={p.id} className='scroll-mt-24'>
          <CardHeader>
            <div className='flex items-center gap-2'><CardTitle>{p.title}</CardTitle><Badge variant='secondary'>{p.core.split(' ')[0]}</Badge></div>
            <CardDescription>{p.core}</CardDescription>
          </CardHeader>
          <CardContent className='space-y-5'>
            <div>
              <h4 className='font-semibold mb-2'>Concrete Actions</h4>
              <ul className='list-disc pl-5 space-y-1 text-sm'>{p.actions.map(a=> <li key={a}>{a}</li>)}</ul>
            </div>
            <div>
              <h4 className='font-semibold mb-2'>Outcomes</h4>
              <ul className='list-disc pl-5 space-y-1 text-sm'>{p.outcomes.map(o=> <li key={o}>{o}</li>)}</ul>
            </div>
            <div className='p-3 rounded border bg-background/60'>
              <h4 className='font-semibold mb-1'>Impact</h4>
              <p className='text-sm text-muted-foreground'>{p.impact}</p>
            </div>
            <div className='text-right'><a href='#top' className='text-xs text-muted-foreground hover:underline'>Back to top</a></div>
          </CardContent>
        </Card>
      ))}
      <Card>
        <CardHeader>
          <CardTitle>Staged Maturity Path</CardTitle>
          <CardDescription>Adopt pillars in sequence for compounding stability.</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className='list-decimal pl-5 text-sm space-y-1'>
            <li>Observability Baseline</li>
            <li>Resilience & Containment</li>
            <li>Quality / Drift Automation</li>
            <li>Safe Progressive Rollouts</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
