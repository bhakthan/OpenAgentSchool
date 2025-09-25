import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { patternInterlockEdges } from '@/lib/data/studyMode/interlockMap';
import { emitTelemetry } from '@/lib/data/studyMode/telemetry';

interface NodeDatum { id: string }
interface LinkDatum { source: string; target: string; type: string; note?: string }

// Force-directed interlock map (#10)
const InterlockMap: React.FC<{ width?: number; height?: number; highlightPattern?: string }> = ({ width = 620, height = 380, highlightPattern }) => {
  const ref = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    const nodesMap: Record<string, NodeDatum> = {};
    patternInterlockEdges.forEach(e => { nodesMap[e.from] = { id: e.from }; nodesMap[e.to] = { id: e.to }; });
    const nodes: NodeDatum[] = Object.values(nodesMap);
    const links: LinkDatum[] = patternInterlockEdges.map(e => ({ source: e.from, target: e.to, type: e.type, note: e.note }));
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();
    svg.attr('viewBox', `0 0 ${width} ${height}`);
    const color = (t: string) => t === 'enables' ? '#2563eb' : t === 'constrains' ? '#dc2626' : '#d97706';
    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links as any).id((d: any) => d.id).distance(140).strength(0.7))
      .force('charge', d3.forceManyBody().strength(-420))
      .force('center', d3.forceCenter(width/2, height/2));
    const link = svg.append('g').attr('stroke-opacity',0.6).selectAll('path').data(links).enter().append('path')
      .attr('fill','none').attr('stroke-width',1.5).attr('stroke',d=>color(d.type));
    const node = svg.append('g').selectAll('circle').data(nodes).enter().append('circle')
      .attr('r',18).attr('fill',d=> highlightPattern && d.id===highlightPattern ? '#10b981' : '#6366f1')
      .call(d3.drag<SVGCircleElement, any>()
        .on('start',(event,d:any)=>{ if(!event.active) simulation.alphaTarget(0.3).restart(); d.fx=d.x; d.fy=d.y; })
        .on('drag',(event,d:any)=>{ d.fx=event.x; d.fy=event.y; })
        .on('end',(event,d:any)=>{ if(!event.active) simulation.alphaTarget(0); d.fx=null; d.fy=null; }));
    const label = svg.append('g').selectAll('text').data(nodes).enter().append('text')
      .attr('text-anchor','middle').attr('dy',4).attr('font-size',9).attr('fill','#fff').text(d=>d.id.replace(/-/g,'·'));
    const edgeLabel = svg.append('g').selectAll('text').data(links).enter().append('text')
      .attr('font-size',8).attr('fill',d=>color(d.type)).attr('opacity',0.85).text(d=>d.type);
    simulation.on('tick', () => {
      link.attr('d',(d:any)=>`M${d.source.x},${d.source.y}L${d.target.x},${d.target.y}`);
      node.attr('cx',(d:any)=>d.x).attr('cy',(d:any)=>d.y);
      label.attr('x',(d:any)=>d.x).attr('y',(d:any)=>d.y);
      edgeLabel.attr('x',(d:any)=> (d.source.x + d.target.x)/2 ).attr('y',(d:any)=> (d.source.y + d.target.y)/2 );
    });
    try { emitTelemetry({ kind: 'pattern_attempt', patternId: 'interlock-map' }); } catch {}
    return () => { simulation.stop(); };
  }, [width,height,highlightPattern]);
  return <svg ref={ref} className="w-full h-full rounded bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-800" role="img" aria-label="Pattern interlock map" />;
};
export default InterlockMap;
