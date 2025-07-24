import React, { useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

interface AutoGenPatternVisualizerProps {
  agents: Array<{ id: string; name: string; role: string }>;
  interactions: Array<{ source: string; target: string; type: string }>;
}

const AGENT_COLORS = [
  '#2563eb', // blue
  '#16a34a', // green
  '#f59e42', // orange
  '#e11d48', // red
  '#a21caf', // purple
  '#facc15', // yellow
  '#0ea5e9', // sky
  '#f472b6', // pink
];

const AutoGenPatternVisualizer: React.FC<AutoGenPatternVisualizerProps> = ({ agents, interactions }) => {
  const [highlightedNode, setHighlightedNode] = useState<string | null>(null);

  // Assign a color to each agent
  const colorMap: Record<string, string> = {};
  agents.forEach((agent, idx) => {
    colorMap[agent.id] = AGENT_COLORS[idx % AGENT_COLORS.length];
  });

  const graphData = {
    nodes: agents.map(agent => ({ ...agent, color: colorMap[agent.id] })),
    links: interactions.map(interaction => ({ source: interaction.source, target: interaction.target, type: interaction.type })),
  };

  return (
    <div style={{ width: '100%', height: '500px', border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
      <ForceGraph2D
        graphData={graphData}
        nodeLabel={(node: any) => `${node.name} (${node.role})`}
        linkLabel={(link: any) => `Interaction: ${link.type}`}
        nodeAutoColorBy={null}
        onNodeHover={(node: any) => setHighlightedNode(node ? node.id : null)}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
        linkDirectionalArrowLength={5}
        linkDirectionalArrowRelPos={1}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.beginPath();
          ctx.arc(node.x, node.y, highlightedNode === node.id ? 16 : 12, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.color || '#2563eb';
          ctx.shadowColor = highlightedNode === node.id ? '#000' : 'transparent';
          ctx.shadowBlur = highlightedNode === node.id ? 10 : 0;
          ctx.globalAlpha = highlightedNode === node.id ? 1 : 0.85;
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#fff';
          ctx.font = `bold ${fontSize}px Sans-Serif`;
          ctx.fillText(label, node.x, node.y);
        }}
      />
    </div>
  );
};

export default AutoGenPatternVisualizer;
