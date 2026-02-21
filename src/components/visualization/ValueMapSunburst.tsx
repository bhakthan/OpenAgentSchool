import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, Sparkle } from '@phosphor-icons/react/dist/ssr';

interface ValueCategory {
  name: string;
  value: number;
  color: string;
  icon: string;
  description: string;
  route: string;
}

const VALUE_CATEGORIES: ValueCategory[] = [
  {
    name: 'Core Concepts',
    value: 15,
    color: '#3b82f6', // blue
    icon: '🎓',
    description: 'Foundational AI agent knowledge',
    route: '/concepts'
  },
  {
    name: 'Agent Patterns',
    value: 14,
    color: '#8b5cf6', // violet
    icon: '🧩',
    description: 'Reusable design patterns',
    route: '/patterns'
  },
  {
    name: 'Applied Skills',
    value: 13,
    color: '#10b981', // emerald
    icon: '⚡',
    description: 'Practical AI implementation',
    route: '/ai-skills'
  },
  {
    name: 'Study & Practice',
    value: 12,
    color: '#f59e0b', // amber
    icon: '📝',
    description: 'Interactive learning exercises',
    route: '/study-mode'
  },
  {
    name: 'Tools & Platform',
    value: 11,
    color: '#06b6d4', // cyan
    icon: '🔧',
    description: 'Azure, MCP, orchestration',
    route: '/azure-services'
  },
  {
    name: 'Adoption Playbooks',
    value: 10,
    color: '#ec4899', // pink
    icon: '🎯',
    description: 'Enterprise strategies',
    route: '/adoption-playbook'
  },
  {
    name: 'Research & Papers',
    value: 9,
    color: '#6366f1', // indigo
    icon: '📚',
    description: 'Curated resources',
    route: '/references'
  },
  {
    name: 'Community',
    value: 8,
    color: '#14b8a6', // teal
    icon: '👥',
    description: 'Collaborate & share',
    route: '/community'
  },
  {
    name: 'Knowledge Search',
    value: 8,
    color: '#a855f7', // purple
    icon: '🔍',
    description: 'Semantic documentation',
    route: '/knowledge-search'
  }
];

export default function ValueMapSunburst() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<ValueCategory | null>(null);
  const [dimensions, setDimensions] = useState({ width: 450, height: 450 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const cw = containerRef.current.clientWidth;
        if (cw > 0) {
          const width = Math.min(cw, 550);
          const height = width;
          setDimensions({ width, height });
        }
      }
    };

    updateDimensions();

    // Use ResizeObserver for reliable measurement after layout
    let ro: ResizeObserver | undefined;
    if (containerRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(updateDimensions);
      ro.observe(containerRef.current);
    }

    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      ro?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    const { width, height } = dimensions;
    if (width === 0 || height === 0) return;
    const radius = Math.min(width, height) / 2;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`);

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Create pie layout
    const pie = d3.pie<ValueCategory>()
      .value(d => d.value)
      .sort(null);

    const arc = d3.arc<d3.PieArcDatum<ValueCategory>>()
      .innerRadius(radius * 0.35)
      .outerRadius(radius * 0.85);

    const hoverArc = d3.arc<d3.PieArcDatum<ValueCategory>>()
      .innerRadius(radius * 0.35)
      .outerRadius(radius * 0.90);

    // Draw segments
    const arcs = g.selectAll('.arc')
      .data(pie(VALUE_CATEGORIES))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .style('cursor', 'pointer');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('transition', 'all 0.3s ease')
      .on('mouseenter', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', hoverArc);
        setSelectedCategory(d.data);
      })
      .on('mouseleave', function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('d', arc);
      })
      .on('click', (event, d) => {
        navigate(d.data.route);
      });

    // Add percentage labels
    arcs.append('text')
      .attr('transform', d => {
        const [x, y] = arc.centroid(d);
        return `translate(${x}, ${y})`;
      })
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', '14px')
      .attr('font-weight', 'bold')
      .style('pointer-events', 'none')
      .text(d => `${d.data.value}%`);

    // Add category names on outer ring
    arcs.append('text')
      .attr('transform', d => {
        const [x, y] = arc.centroid(d);
        const angle = (d.startAngle + d.endAngle) / 2;
        const outerRadius = radius * 0.95;
        const tx = Math.cos(angle - Math.PI / 2) * outerRadius;
        const ty = Math.sin(angle - Math.PI / 2) * outerRadius;
        return `translate(${tx}, ${ty})`;
      })
      .attr('text-anchor', 'middle')
      .attr('font-size', '11px')
      .attr('font-weight', '600')
      .attr('fill', '#374151')
      .attr('class', 'dark:fill-gray-300')
      .style('pointer-events', 'none')
      .each(function(d) {
        const text = d3.select(this);
        const words = d.data.name.split(' ');
        text.text('');
        words.forEach((word, i) => {
          text.append('tspan')
            .attr('x', 0)
            .attr('dy', i === 0 ? 0 : '1.1em')
            .text(word);
        });
      });

    // Add icons on outer ring
    arcs.append('text')
      .attr('transform', d => {
        const angle = (d.startAngle + d.endAngle) / 2;
        const iconRadius = radius * 1.15;
        const tx = Math.cos(angle - Math.PI / 2) * iconRadius;
        const ty = Math.sin(angle - Math.PI / 2) * iconRadius;
        return `translate(${tx}, ${ty})`;
      })
      .attr('text-anchor', 'middle')
      .attr('font-size', '24px')
      .style('pointer-events', 'none')
      .text(d => d.data.icon);

    // Center logo/icon
    g.append('circle')
      .attr('r', radius * 0.33)
      .attr('fill', '#fbbf24')
      .attr('stroke', '#fff')
      .attr('stroke-width', 4);

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.1em')
      .attr('font-size', '48px')
      .text('🚀');

    // Add "Open Agent School" text
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', radius * 0.45)
      .attr('font-size', '13px')
      .attr('font-weight', 'bold')
      .attr('fill', '#374151')
      .attr('class', 'dark:fill-gray-300')
      .text('Open Agent School');

  }, [dimensions, navigate]);

  const exportAsSVG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'open-agent-school-value-map.svg';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
          <Sparkle size={32} weight="fill" className="text-yellow-500" />
          What You'll Master at Open Agent School
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Interactive sunburst showing the breadth of AI agent skills, tools, and knowledge you'll gain. 
          Click any segment to explore that category.
        </p>
      </div>

      <div ref={containerRef} className="w-full max-w-xl">
        <svg ref={svgRef} className="w-full h-auto" />
      </div>

      {selectedCategory && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md border-2 border-gray-200 dark:border-gray-700 transition-all">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{selectedCategory.icon}</span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {selectedCategory.name}
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {selectedCategory.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold" style={{ color: selectedCategory.color }}>
              {selectedCategory.value}%
            </span>
            <Button
              onClick={() => navigate(selectedCategory.route)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 !text-white hover:from-blue-700 hover:to-purple-700"
            >
              Explore →
            </Button>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={exportAsSVG}
          className="flex items-center gap-2"
        >
          <Download size={16} />
          Download SVG
        </Button>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400 max-w-2xl">
        <p className="font-semibold mb-2">Join 100M+ future AI agent builders</p>
        <p>
          From foundational concepts to production-ready patterns, Open Agent School 
          provides the complete learning path for mastering AI agents.
        </p>
      </div>
    </div>
  );
}
