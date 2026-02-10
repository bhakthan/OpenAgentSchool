import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  Lightning, 
  Tree, 
  Brain, 
  Target,
  Users,
  RocketLaunch,
  BookOpen,
  Code,
  ShieldCheck,
  Sparkle,
  ArrowRight
} from '@phosphor-icons/react';

/**
 * About page providing a comprehensive overview of Open Agent School.
 * Features the at-a-glance infographic and detailed platform description.
 */
const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
          About Open Agent School
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          The comprehensive learning platform for mastering AI agents—from foundational concepts 
          to advanced production patterns and organizational transformation.
        </p>
      </section>

      {/* Platform Overview Image */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-violet-500/5 to-fuchsia-500/5 rounded-3xl -z-10" />
        <div className="p-4 md:p-8">
          <img 
            src="/images/OpenAgentSchool_at_a_Glance.webp" 
            alt="Open Agent School at a Glance - Platform overview showing learning paths, concepts, patterns, and tools" 
            className="w-full rounded-2xl shadow-2xl border border-border"
          />
          <p className="text-center text-sm text-muted-foreground mt-4">
            Open Agent School: A complete ecosystem for AI agent mastery
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="text-center space-y-4 py-8 px-6 rounded-2xl bg-gradient-to-br from-primary/10 to-violet-600/10 border border-primary/20">
        <Target size={48} className="mx-auto text-primary" />
        <h2 className="text-2xl md:text-3xl font-bold">Our Mission</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          To democratize AI agent knowledge and empower developers, architects, and organizations 
          to build durable, production-ready agent systems. We bridge the gap between experimental 
          prompt engineering and enterprise-grade agentic architectures.
        </p>
      </section>

      {/* What We Offer */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">What You'll Find Here</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <BookOpen size={32} className="text-primary" />,
              title: '65+ Agent Patterns',
              description: 'Comprehensive pattern library from basic reasoning to multi-agent orchestration, each with code examples and visualizations.'
            },
            {
              icon: <Tree size={32} className="text-emerald-500" />,
              title: 'Learning Atlas',
              description: 'Interactive taxonomy tree visualizing the entire AI agent landscape. Export to SVG, PNG, or PDF for presentations.'
            },
            {
              icon: <Brain size={32} className="text-violet-500" />,
              title: 'Study Mode',
              description: 'Socratic questioning and discovery-based learning. Test comprehension with critical thinking challenges.'
            },
            {
              icon: <Code size={32} className="text-blue-500" />,
              title: 'Code Playbooks',
              description: 'Runnable examples in Python and TypeScript. Execute patterns in-browser with real output.'
            },
            {
              icon: <ShieldCheck size={32} className="text-amber-500" />,
              title: 'AI Safety & Governance',
              description: 'Responsible AI practices, agent red teaming, security patterns, and compliance frameworks.'
            },
            {
              icon: <Sparkle size={32} className="text-fuchsia-500" />,
              title: '2026 Frontier Patterns',
              description: 'Skill-Augmented Agents, MCP Server Orchestration, Multi-LLM Routing, and Agentic IDE integration.'
            }
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-xl border bg-card hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                {item.icon}
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who It's For */}
      <section className="space-y-8 py-12 px-8 rounded-2xl bg-muted/50">
        <h2 className="text-3xl font-bold text-center">Who This Is For</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <RocketLaunch size={40} className="text-primary" />,
              title: 'Individual Builders',
              points: [
                'Hands-on pattern implementation',
                'Career differentiation through systems thinking',
                'From prompt engineering to agent architecture'
              ]
            },
            {
              icon: <Code size={40} className="text-blue-500" />,
              title: 'Engineering Teams',
              points: [
                'Architecture & reliability practices',
                'Agent Velocity Engineering methodology',
                'Evaluation, observability, and ops discipline'
              ]
            },
            {
              icon: <Users size={40} className="text-violet-500" />,
              title: 'Enterprise Leaders',
              points: [
                'Transformation roadmaps & maturity models',
                'AI-native operating ratios',
                'Risk mitigation & governance patterns'
              ]
            }
          ].map((audience) => (
            <div key={audience.title} className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-background flex items-center justify-center shadow-md">
                {audience.icon}
              </div>
              <h3 className="text-xl font-semibold">{audience.title}</h3>
              <ul className="text-muted-foreground space-y-2 text-left">
                {audience.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <ArrowRight size={16} className="mt-1 text-primary shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Open Source + Community */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Open Source & Community-Driven</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Open Agent School is open source. All core content—patterns, concepts, visualizations—is 
          freely available. We believe in learning together and building in public.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/concepts">
              <Lightning className="mr-2" size={20} /> Explore Concepts
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link to="/patterns">
              <GraduationCap className="mr-2" size={20} /> Browse Patterns
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/tree-view">
              <Tree className="mr-2" size={20} /> Learning Atlas
            </Link>
          </Button>
        </div>
      </section>

      {/* Contact / Connect */}
      <section className="text-center space-y-4 pb-8">
        <h2 className="text-2xl font-semibold">Connect With Us</h2>
        <p className="text-muted-foreground">
          Have questions, feedback, or want to contribute? We'd love to hear from you.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild variant="outline">
            <a href="https://github.com/bhakthan/OpenAgentSchool" target="_blank" rel="noopener noreferrer">
              GitHub Repository
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/community">
              Community
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
