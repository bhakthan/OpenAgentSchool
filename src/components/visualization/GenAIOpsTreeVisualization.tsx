import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface TreeNode {
  name: string;
  description: string;
  children?: TreeNode[];
}

interface GenAIOpsTreeVisualizationProps {
  className?: string;
}

const data: TreeNode = {
  name: "GenAIOps",
  description: "Umbrella practice for operationalizing Generative AI in production environments.",
  children: [
    {
      name: "AgentOps",
      description: "Operationalizing AI agents efficiently.",
      children: [
        {
          name: "Tool Management",
          description: "Managing internal and external tools, APIs, and integrations.",
          children: [
            { name: "API Invocation", description: "Securely call APIs from agents." },
            { name: "Security & Auth", description: "Handle authentication and secret management." },
            { name: "Throttling & Quotas", description: "Manage API usage limits." }
          ]
        },
        {
          name: "Agent Brain Prompt",
          description: "Define the agent's goals, profile, and instructions.",
          children: [
            { name: "Goal Definition", description: "Clearly specify objectives." },
            { name: "Agent Profile", description: "Set personality or role." },
            { name: "Structured Instructions", description: "Use prompt engineering frameworks." }
          ]
        },
        {
          name: "Orchestration & Memory",
          description: "Coordinate tasks and retain context.",
          children: [
            { name: "Short-term Memory", description: "Session-based context." },
            { name: "Long-term Memory", description: "Persistent knowledge base." },
            { name: "Task Decomposition", description: "Break down complex goals." }
          ]
        },
        {
          name: "Metrics & Observability",
          description: "Measure and track agent performance.",
          children: [
            { name: "Goal Completion Rate", description: "Success in achieving objectives." },
            { name: "Latency & Errors", description: "Track system performance." },
            { name: "Human Feedback", description: "End-user ratings and comments." }
          ]
        }
      ]
    },
    {
      name: "PromptOps",
      description: "Operationalizing prompts effectively.",
      children: [
        {
          name: "Prompt Storage & Lineage",
          description: "Version control and history tracking."
        },
        {
          name: "Metadata & Evaluation",
          description: "Store evaluation scores and context."
        },
        {
          name: "Template Registry",
          description: "Centralized prompt template management."
        },
        {
          name: "Prompt Optimizer",
          description: "Automate prompt improvement."
        }
      ]
    },
    {
      name: "RAGOps",
      description: "Operationalizing Retrieval-Augmented Generation.",
      children: [
        {
          name: "Offline Data Preparation",
          description: "Clean, chunk, and vectorize data."
        },
        {
          name: "Retrieval Optimization",
          description: "Improve search, similarity, and ranking."
        },
        {
          name: "Prompt Augmentation",
          description: "Enhance prompts with retrieved data."
        },
        {
          name: "Grounding",
          description: "Fact-check and reduce hallucinations."
        }
      ]
    }
  ]
};

export function GenAIOpsTreeVisualization({ className }: GenAIOpsTreeVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Helper: resolve the actual CSS color produced by a Tailwind class
  const resolveCssColor = (className: string) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return '#000000';
    const el = document.createElement('span');
    el.style.position = 'absolute';
    el.style.visibility = 'hidden';
    el.style.pointerEvents = 'none';
    el.className = className;
    document.body.appendChild(el);
    const color = getComputedStyle(el).color;
    document.body.removeChild(el);
    return color || '#000000';
  };

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    checkDarkMode();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const container = svgRef.current.parentElement;
    const containerWidth = container?.clientWidth || 1000;
    const margin = { top: 20, right: 120, bottom: 20, left: 120 };
    const width = Math.max(800, containerWidth - 40) - margin.left - margin.right;
    const height = 700 - margin.bottom - margin.top;

    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .style("max-width", "100%")
      .style("height", "auto");

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create tree layout
    const tree = d3.tree<TreeNode>().size([height, width]);
    const root = d3.hierarchy(data);
    
    tree(root);

    // Color scheme for different levels with better accessibility
    const colors = {
      0: "#4f46e5", // indigo-600 - GenAIOps
      1: "#7c3aed", // violet-600 - Main categories
      2: "#0891b2", // cyan-600 - Subcategories
      3: "#059669"  // emerald-600 - Leaf nodes
    };

    const strokeColors = {
      0: "#312e81", // indigo-900
      1: "#581c87", // violet-900  
      2: "#155e75", // cyan-900
      3: "#064e3b"  // emerald-900
    };

    // Resolve theme-aware colors from utility classes
    const labelColor = resolveCssColor('text-foreground');
    const mutedColor = resolveCssColor('text-muted-foreground');

    // Add links with improved styling
  const link = g.selectAll(".link")
      .data(root.descendants().slice(1))
      .enter().append("path")
      .attr("class", "link")
      .attr("d", (d: any) => {
        return `M${d.y},${d.x}C${(d.y + d.parent.y) / 2},${d.x} ${(d.y + d.parent.y) / 2},${d.parent.x} ${d.parent.y},${d.parent.x}`;
      })
  .style("fill", "none")
  .style("stroke", mutedColor)
      .style("stroke-width", "2px")
      .style("stroke-opacity", 0.4);

    // Add nodes
    const node = g.selectAll(".node")
      .data(root.descendants())
      .enter().append("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.y},${d.x})`);

    // Add circles for nodes with improved styling
    node.append("circle")
      .attr("r", (d: any) => {
        // Size based on depth
        const sizes = [14, 12, 10, 8];
        return sizes[d.depth] || 8;
      })
      .style("fill", (d: any) => colors[d.depth as keyof typeof colors] || colors[3])
      .style("stroke", (d: any) => strokeColors[d.depth as keyof typeof strokeColors] || strokeColors[3])
      .style("stroke-width", "2px")
      .style("cursor", "pointer")
      .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))")
      .on("mouseover", function(event, d: any) {
        // Highlight on hover
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", (d: any) => {
            const sizes = [18, 16, 14, 12];
            return sizes[d.depth] || 12;
          })
          .style("filter", "drop-shadow(0 4px 8px rgba(0,0,0,0.2))");
        
        // Show tooltip with improved styling
        const tooltipBg = isDarkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.98)';
        const tooltipText = isDarkMode ? 'white' : '#111827';
        const tooltipBorder = isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.08)';

        const tooltip = d3.select("body").append("div")
          .attr("class", "genaiopstree-tooltip")
          .style("position", "absolute")
          .style("background", tooltipBg)
          .style("color", tooltipText)
          .style("padding", "12px 16px")
          .style("border-radius", "8px")
          .style("font-size", "14px")
          .style("max-width", "280px")
          .style("z-index", "1000")
          .style("pointer-events", "none")
          .style("box-shadow", "0 10px 25px rgba(0,0,0,0.2)")
          .style("border", tooltipBorder)
          .html(`<div style="font-weight: 600; margin-bottom: 6px; color: ${colors[d.depth as keyof typeof colors]};">${d.data.name}</div><div style="line-height: 1.4; color: ${isDarkMode ? 'rgba(255,255,255,0.9)' : 'rgba(17,24,39,0.9)'};">${d.data.description}</div>`)
          .style("left", (event.pageX + 15) + "px")
          .style("top", (event.pageY - 15) + "px")
          .style("opacity", 0)
          .transition()
          .duration(200)
          .style("opacity", 1);
      })
      .on("mouseout", function(event, d: any) {
        // Remove highlight
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", (d: any) => {
            const sizes = [14, 12, 10, 8];
            return sizes[d.depth] || 8;
          })
          .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.1))");
        
        // Remove tooltip
        d3.selectAll(".genaiopstree-tooltip")
          .transition()
          .duration(200)
          .style("opacity", 0)
          .remove();
      });

  // Add text labels with improved positioning and theme-aware colors
    node.append("text")
      .attr("dy", ".35em")
      .attr("x", (d: any) => d.children ? -20 : 20)
      .attr("text-anchor", (d: any) => d.children ? "end" : "start")
      .text((d: any) => d.data.name)
      .style("font-size", (d: any) => {
        const sizes = ["16px", "14px", "13px", "12px"];
        return sizes[d.depth] || "12px";
      })
  .style("font-weight", (d: any) => d.depth <= 1 ? "600" : "500")
  .style("fill", labelColor)
      .style("text-shadow", "none")
      .attr("class", "tree-label");

    // Add animation with improved timing
    node.style("opacity", 0)
      .transition()
      .duration(600)
      .delay((d: any) => d.depth * 150)
      .style("opacity", 1);

    link.style("stroke-dasharray", "4,4")
      .style("stroke-opacity", 0)
      .transition()
      .duration(600)
      .delay((d: any) => d.depth * 150)
      .style("stroke-opacity", 0.4)
      .style("stroke-dasharray", "none");

  }, [isDarkMode]);

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-muted text-foreground border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-center">GenAIOps Operational Framework</h3>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Interactive tree showing the hierarchical structure of Generative AI Operations
        </p>
        <div className="flex justify-center overflow-x-auto">
          <svg ref={svgRef} className="max-w-full h-auto min-w-[800px]"></svg>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-indigo-600 shadow-sm"></div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">GenAIOps</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-violet-600 shadow-sm"></div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">Main Categories</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-cyan-600 shadow-sm"></div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">Capabilities</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-600 shadow-sm"></div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">Aspects</span>
          </div>
        </div>
        <div className="mt-4 text-xs text-muted-foreground text-center">
          💡 <strong>Tip:</strong> Hover over any node to see detailed descriptions
        </div>
      </div>
    </div>
  );
}
