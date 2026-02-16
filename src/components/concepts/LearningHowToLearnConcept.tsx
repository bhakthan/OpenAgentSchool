import React from 'react';
import ConceptLayout from './ConceptLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Brain, Lightning, ArrowRight, CheckCircle, Eye,
  Lightbulb, Warning, Target, TrendUp, Question,
  ArrowsCounterClockwise, Timer
} from '@phosphor-icons/react';

// ── Types ──────────────────────────────────────────────────────────────
interface ConceptTab {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  level: 'fundamentals' | 'architecture' | 'implementation' | 'advanced';
  content: React.ReactNode;
}

interface Props {
  onMarkComplete?: () => void;
  onNavigateToNext?: (nextConceptId: string) => void;
}

// ── Reusable sub-components ────────────────────────────────────────────
const SignalCard: React.FC<{
  emoji: string;
  feeling: string;
  reality: string;
  color: string;
}> = ({ emoji, feeling, reality, color }) => (
  <Card className={`border-l-4 ${color}`}>
    <CardContent className="pt-5 pb-4">
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{emoji}</span>
        <div className="space-y-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              What it feels like
            </span>
            <p className="text-sm font-medium">{feeling}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              What's actually happening
            </span>
            <p className="text-sm">{reality}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const StrategyCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  howItWorks: string;
  platformFeature: string;
  platformLink?: string;
}> = ({ icon, title, description, howItWorks, platformFeature }) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-lg flex items-center gap-2">
        {icon}
        {title}
      </CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">How it works</p>
        <p className="text-sm">{howItWorks}</p>
      </div>
      <div className="flex items-center gap-2 text-sm text-primary">
        <Lightning className="w-4 h-4" />
        <span className="font-medium">On this platform:</span>
        <span>{platformFeature}</span>
      </div>
    </CardContent>
  </Card>
);

const GridCell: React.FC<{
  label: string;
  description: string;
  color: string;
  emoji: string;
}> = ({ label, description, color, emoji }) => (
  <div className={`p-4 rounded-lg border-2 ${color} text-center space-y-1`}>
    <span className="text-2xl">{emoji}</span>
    <p className="font-semibold text-sm">{label}</p>
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
);

// ── Tab 1: The Learning Paradox ────────────────────────────────────────
const LearningParadoxTab: React.FC = () => (
  <div className="space-y-6">
    <Card>
      <CardContent className="pt-6 space-y-4">
        <p className="text-lg leading-relaxed">
          Here's the most counterintuitive truth in learning science: <strong>the moments that
          feel like failure — confusion, doubt, struggle, being wrong — are literally the
          mechanism by which deep learning happens.</strong>
        </p>
        <p className="text-muted-foreground">
          When something feels easy, your brain often isn't encoding it deeply. You're
          recognizing patterns, not building new ones. Cognitive scientists call this
          the <em>fluency illusion</em> — the dangerous gap between feeling like you
          understand and actually understanding.
        </p>
      </CardContent>
    </Card>

    {/* Two Paths Visual */}
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2 text-red-700 dark:text-red-400">
            <Warning className="w-5 h-5" />
            Path A: Feels Easy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <ArrowRight className="w-4 h-4 text-red-500" /> Re-read notes passively
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ArrowRight className="w-4 h-4 text-red-500" /> Nod along to explanations
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ArrowRight className="w-4 h-4 text-red-500" /> Highlight and feel productive
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ArrowRight className="w-4 h-4 text-red-500" /> Can't recall it next week
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">
            Research: Rereading produces the <strong>least</strong> durable learning (Roediger & Karpicke, 2006)
          </p>
        </CardContent>
      </Card>

      <Card className="border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <CheckCircle className="w-5 h-5" />
            Path B: Feels Hard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <ArrowRight className="w-4 h-4 text-emerald-500" /> Try to recall before looking
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ArrowRight className="w-4 h-4 text-emerald-500" /> Struggle with the question
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ArrowRight className="w-4 h-4 text-emerald-500" /> Get it wrong, then correct
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ArrowRight className="w-4 h-4 text-emerald-500" /> Remember it months later
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">
            Research: Testing yourself produces <strong>3x better</strong> long-term retention (Bjork, 2011)
          </p>
        </CardContent>
      </Card>
    </div>

    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-primary">The Key Insight</p>
            <p className="text-sm mt-1">
              Robert Bjork coined the term <strong>"desirable difficulties"</strong> — 
              conditions that make learning harder in the moment but produce stronger,
              more durable knowledge. Every feature in this platform's Study Mode is
              designed around this principle. When it feels hard, that's the system
              working.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// ── Tab 2: Five Signals You're Actually Learning ───────────────────────
const FiveSignalsTab: React.FC = () => (
  <div className="space-y-4">
    <p className="text-muted-foreground">
      Most people interpret these signals as "I'm bad at this." Researchers interpret
      them as "deep encoding in progress." Here are five feelings to <strong>welcome</strong>,
      not avoid:
    </p>

    <div className="space-y-3">
      <SignalCard
        emoji="😵‍💫"
        feeling="I'm confused. I must be stupid."
        reality="You just found the boundary of your current knowledge. This is the exact point where growth happens. Confusion is information — it tells you precisely what to focus on next."
        color="border-l-blue-500"
      />
      <SignalCard
        emoji="🐢"
        feeling="Everyone else gets this faster than me."
        reality="Slow processing means your brain is building new neural pathways, not just activating existing ones. Speed is about recognition; slowness is about construction. Construction lasts."
        color="border-l-purple-500"
      />
      <SignalCard
        emoji="❌"
        feeling="I got it wrong. I wasted my time."
        reality="Errors are the highest-information moments in learning. Each wrong answer, when corrected, creates a stronger memory trace than getting it right the first time. This is called the hypercorrection effect."
        color="border-l-orange-500"
      />
      <SignalCard
        emoji="😫"
        feeling="I want to quit. This is too hard."
        reality="This urge often means your brain is in the middle of restructuring its mental model. The discomfort is cognitive load — your working memory is full because it's reorganizing. Take a break, then come back. The restructuring continues even while resting."
        color="border-l-red-500"
      />
      <SignalCard
        emoji="🤔"
        feeling="I answered, but I'm not sure if I'm right."
        reality="That doubt is metacognitive monitoring — your brain checking its own work. This is one of the most sophisticated cognitive skills. People who feel uncertain and examine why outperform people who feel certain and move on."
        color="border-l-emerald-500"
      />
    </div>

    <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50">
      <CardContent className="pt-5">
        <div className="flex items-start gap-3">
          <Warning className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-700 dark:text-amber-400 text-sm">The Danger of Ease</p>
            <p className="text-sm text-muted-foreground mt-1">
              If learning always feels comfortable, you're probably in your comfort zone — 
              reviewing what you already know. The learning zone is just outside comfort.
              Not in the panic zone, but in the stretch zone where things feel <em>effortful 
              but doable</em>.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// ── Tab 3: Three Evidence-Based Strategies ─────────────────────────────
const ThreeStrategiesTab: React.FC = () => (
  <div className="space-y-4">
    <p className="text-muted-foreground">
      Decades of cognitive science converge on three strategies that dramatically
      improve learning. Each one is already built into this platform.
    </p>

    <div className="space-y-4">
      <StrategyCard
        icon={<Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        title="1. Retrieval Practice"
        description="Test yourself before reviewing. Pull knowledge out of your head instead of putting it in."
        howItWorks="Every time you successfully retrieve information from memory, you strengthen the neural pathway to it. Retrieval is not a neutral test — it actively changes your memory, making it more accessible in the future. This is why flashcards beat rereading by 3x."
        platformFeature="Study Mode's Socratic questions force retrieval before giving answers."
      />
      <StrategyCard
        icon={<Timer className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        title="2. Spaced Repetition"
        description="Spread practice over time. The forgetting curve is your friend, not your enemy."
        howItWorks="When you almost-forget something and then retrieve it, the memory consolidates more strongly than if you'd reviewed it while fresh. The optimal time to review is right at the edge of forgetting. This is mathematically modeled by the SM-2 algorithm."
        platformFeature="The flashcard system uses SM-2 spacing to schedule reviews at optimal intervals."
      />
      <StrategyCard
        icon={<ArrowsCounterClockwise className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        title="3. Interleaving"
        description="Mix different concept types instead of drilling one topic at a time."
        howItWorks="Blocked practice (study all of topic A, then all of topic B) feels more productive but interleaved practice (A, B, A, C, B) produces better long-term retention and transfer. It forces your brain to discriminate between concepts and choose the right approach each time."
        platformFeature="Study Mode rotates between Socratic, Scenario, Debug, and SCL modalities."
      />
    </div>

    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <Target className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-primary">The Common Thread</p>
            <p className="text-sm mt-1">
              All three strategies share one property: they make learning <em>feel harder</em> in
              the moment while making it <em>work better</em> over time. If your study session
              feels efficient and smooth, you're probably using the least effective
              methods. Embrace the productive struggle.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// ── Tab 4: Metacognition ───────────────────────────────────────────────
const MetacognitionTab: React.FC = () => (
  <div className="space-y-6">
    <Card>
      <CardContent className="pt-6 space-y-4">
        <p className="text-lg leading-relaxed">
          The single highest-leverage learning move is asking yourself:
        </p>
        <blockquote className="border-l-4 border-primary pl-4 py-2 bg-muted/50 rounded-r-lg">
          <p className="text-lg font-medium italic">
            "Do I actually understand this, or does it just feel familiar?"
          </p>
        </blockquote>
        <p className="text-muted-foreground">
          This question activates <strong>metacognition</strong> — thinking about your own
          thinking. It's the difference between a student who reads and nods versus one
          who reads, pauses, and asks "wait, could I explain this to someone?" Research
          shows metacognitive learners outperform non-metacognitive learners by 20-40%
          across all domains.
        </p>
      </CardContent>
    </Card>

    {/* Confidence-Competence Grid */}
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Eye className="w-5 h-5" />
          The Confidence-Competence Grid
        </CardTitle>
        <CardDescription>
          Where you sit in this grid changes everything about your learning strategy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Grid labels */}
          <div className="grid grid-cols-[auto_1fr_1fr] gap-2">
            <div className="w-28" />
            <p className="text-center text-xs font-semibold text-muted-foreground uppercase">High Competence</p>
            <p className="text-center text-xs font-semibold text-muted-foreground uppercase">Low Competence</p>
          </div>

          <div className="grid grid-cols-[auto_1fr_1fr] gap-2">
            <div className="w-28 flex items-center">
              <p className="text-xs font-semibold text-muted-foreground uppercase writing-vertical-lr rotate-180 mx-auto">High Confidence</p>
            </div>
            <GridCell
              emoji="🏆"
              label="Mastery"
              description="You know it and you know you know it. Teach others. Solid ground."
              color="border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/30"
            />
            <GridCell
              emoji="⚠️"
              label="Dangerous Zone"
              description="You think you know it but you don't. The Dunning-Kruger trap. Test yourself ruthlessly."
              color="border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-950/30"
            />
          </div>

          <div className="grid grid-cols-[auto_1fr_1fr] gap-2">
            <div className="w-28 flex items-center">
              <p className="text-xs font-semibold text-muted-foreground uppercase writing-vertical-lr rotate-180 mx-auto">Low Confidence</p>
            </div>
            <GridCell
              emoji="🌱"
              label="Imposter Syndrome"
              description="You know more than you think. Evidence: review your past work. You'll be surprised."
              color="border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/30"
            />
            <GridCell
              emoji="🧭"
              label="Starting Point"
              description="You know you don't know. This is exactly where learning begins. You're already ahead."
              color="border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30"
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          <strong>The goal of metacognition</strong> is to accurately diagnose which cell
          you're in for any given concept — then apply the right strategy. The most
          dangerous cell is top-right: high confidence, low competence. The most
          productive cell to start from is bottom-right: knowing what you don't know.
        </p>
      </CardContent>
    </Card>

    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-primary">Three Metacognitive Questions</p>
            <p className="text-sm mt-1">Before moving to the next concept, try these:</p>
            <ol className="text-sm mt-2 space-y-1 list-decimal list-inside text-muted-foreground">
              <li>Can I explain this concept without looking at the material?</li>
              <li>Where in the Confidence-Competence grid am I for this topic?</li>
              <li>What's the one thing I'm still unsure about?</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// ── Tab 5: Apply It Now ────────────────────────────────────────────────
const ApplyItNowTab: React.FC<{ navigate: ReturnType<typeof useNavigate> }> = ({ navigate }) => (
  <div className="space-y-6">
    <Card>
      <CardContent className="pt-6 space-y-4">
        <p className="text-lg leading-relaxed">
          Knowledge about learning is only useful if you <strong>act on it</strong>.
          Here are three micro-habits that take 60 seconds each and transform how
          much you retain from this platform.
        </p>
      </CardContent>
    </Card>

    <div className="grid md:grid-cols-3 gap-4">
      <Card className="border-blue-200 dark:border-blue-900/50">
        <CardHeader className="pb-2">
          <Badge variant="outline" className="w-fit text-xs">Before studying</Badge>
          <CardTitle className="text-base mt-2">Predict</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Before opening any concept, write one sentence: "I think this concept is about..."
            Being wrong is fine — prediction activates retrieval circuits and creates a 
            "knowledge gap" your brain wants to fill.
          </p>
        </CardContent>
      </Card>

      <Card className="border-purple-200 dark:border-purple-900/50">
        <CardHeader className="pb-2">
          <Badge variant="outline" className="w-fit text-xs">After studying</Badge>
          <CardTitle className="text-base mt-2">Surprise Journal</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            After each concept, write: "The thing that surprised me most was..."
            Surprise signals that your mental model just updated. Naming the surprise
            locks in the new understanding.
          </p>
        </CardContent>
      </Card>

      <Card className="border-emerald-200 dark:border-emerald-900/50">
        <CardHeader className="pb-2">
          <Badge variant="outline" className="w-fit text-xs">Next day</Badge>
          <CardTitle className="text-base mt-2">Recall Three</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Tomorrow, without looking, try to recall three things from today's concept.
            The effort of recall — even if you fail — strengthens the memory more than
            rereading ever could.
          </p>
        </CardContent>
      </Card>
    </div>

    {/* Unknowns Prompt */}
    <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-amber-700 dark:text-amber-400">
          <Question className="w-5 h-5" />
          Start Your "What I Don't Know Yet" List
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          The most powerful learners don't track what they've completed — they track
          what they've <strong>identified as unknown</strong>. Every concept page has an
          "I don't understand this yet" button. Use it. Your unknowns list is your
          most valuable learning asset.
        </p>
        <p className="text-sm text-muted-foreground">
          When you resolve an unknown, it moves to your Breakthroughs list. Over time,
          you'll see a pattern: the things that confused you most become the things you
          understand most deeply.
        </p>
      </CardContent>
    </Card>

    {/* Call to Action */}
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <TrendUp className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div className="space-y-3">
            <p className="font-semibold text-primary">You're Ready</p>
            <p className="text-sm">
              You now know more about effective learning than most people will learn in  
              a lifetime. Every concept from here on will land deeper because you
              understand <em>how</em> your brain processes it. The confusion checkpoints
              in Study Mode will remind you that struggle is the mechanism, not the obstacle.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Button 
                size="sm"
                onClick={() => navigate('/study-mode')}
                className="flex items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                Try Study Mode
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/concepts/agentic-ai-design-taxonomy')}
                className="flex items-center gap-2"
              >
                Next: Design Taxonomy
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────
const LearningHowToLearnConcept: React.FC<Props> = ({ onMarkComplete, onNavigateToNext }) => {
  const navigate = useNavigate();

  const tabs: ConceptTab[] = [
    {
      id: 'the-paradox',
      title: 'The Learning Paradox',
      description: 'Why the moments that feel like failure are the moments learning happens',
      icon: <Lightbulb className="w-4 h-4" />,
      level: 'fundamentals',
      content: <LearningParadoxTab />
    },
    {
      id: 'five-signals',
      title: '5 Signals You\'re Learning',
      description: 'Reframe confusion, slowness, errors, frustration, and doubt as productive signals',
      icon: <Eye className="w-4 h-4" />,
      level: 'fundamentals',
      content: <FiveSignalsTab />
    },
    {
      id: 'three-strategies',
      title: '3 Proven Strategies',
      description: 'Retrieval practice, spaced repetition, and interleaving — the evidence-based trifecta',
      icon: <Target className="w-4 h-4" />,
      level: 'fundamentals',
      content: <ThreeStrategiesTab />
    },
    {
      id: 'metacognition',
      title: 'Thinking About Thinking',
      description: 'The single highest-leverage skill: knowing what you know and what you don\'t',
      icon: <Brain className="w-4 h-4" />,
      level: 'fundamentals',
      content: <MetacognitionTab />
    },
    {
      id: 'apply-it',
      title: 'Apply It Now',
      description: 'Three 60-second micro-habits and your first step into productive confusion',
      icon: <Lightning className="w-4 h-4" />,
      level: 'fundamentals',
      content: <ApplyItNowTab navigate={navigate} />
    }
  ];

  return (
    <ConceptLayout
      conceptId="learning-how-to-learn"
      title="Learning How to Learn"
      description="The one skill that makes every other skill easier — master how your brain actually learns."
      tabs={tabs}
      estimatedTime="20-30 min"
      concepts={['Metacognition', 'Desirable Difficulty', 'Retrieval Practice', 'Spaced Repetition']}
      nextConcept={{
        id: 'agentic-ai-design-taxonomy',
        title: 'Agentic AI Design Taxonomy',
        description: 'A mental map of every major agent pattern'
      }}
      onMarkComplete={onMarkComplete}
      onNavigateToNext={onNavigateToNext}
    />
  );
};

export default LearningHowToLearnConcept;
