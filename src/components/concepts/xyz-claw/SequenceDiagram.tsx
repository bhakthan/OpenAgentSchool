import React from 'react';
import { motion } from 'framer-motion';

const SequenceDiagram: React.FC = () => {
  const actors = ["User", "Discord Client", "File Queue", "Processor", "AI Agent"];
  
  const arrowVariant = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, delay: i * 1.5, ease: "easeInOut" as const }
    })
  };

  const textVariant = {
    hidden: { opacity: 0, y: -5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 1.5 + 0.5 }
    })
  };

  const messages = [
    { from: 0, to: 1, text: "1. Sends Message", y: 60 },
    { from: 1, to: 2, text: "2. Writes JSON", y: 120 },
    { from: 3, to: 2, text: "3. Polls Queue", y: 180, dashed: true },
    { from: 2, to: 3, text: "4. Reads JSON", y: 240 },
    { from: 3, to: 4, text: "5. Spawns Context", y: 300 },
    { from: 4, to: 2, text: "6. Writes Reply", y: 360 },
    { from: 1, to: 2, text: "7. Polls Outbox", y: 420, dashed: true },
    { from: 2, to: 1, text: "8. Reads Reply", y: 480 },
    { from: 1, to: 0, text: "9. Sends to Chat", y: 540 },
  ];

  return (
    <div className="w-full border border-border bg-card rounded-xl p-8 overflow-x-auto">
      <h3 className="text-xl font-bold text-primary mb-6 font-mono text-center">Async Message Sequence</h3>
      
      <div className="relative min-w-[600px] h-[600px] bg-muted/50 rounded-lg p-4">
        {/* Vertical Lines */}
        <div className="flex justify-between h-full px-10 relative">
          {actors.map((actor, idx) => (
            <div key={idx} className="flex flex-col items-center h-full relative group">
              <div className="z-10 bg-card border border-border px-4 py-2 rounded shadow-lg text-sm font-bold text-foreground mb-4">
                {actor}
              </div>
              <div className="w-0.5 h-[500px] bg-border group-hover:bg-muted-foreground transition-colors"></div>
            </div>
          ))}
        </div>

        {/* Arrows and Labels */}
        <svg className="absolute top-[60px] left-0 w-full h-full pointer-events-none px-10">
            {messages.map((msg, idx) => {
                const step = 100 / (actors.length - 1);
                const x1 = `${msg.from * step}%`;
                const x2 = `${msg.to * step}%`;
                const isLeft = msg.to < msg.from;

                return (
                    <g key={idx}>
                        <motion.line 
                            x1={x1} y1={msg.y} x2={x2} y2={msg.y}
                            stroke={msg.dashed ? "var(--muted-foreground, #64748b)" : "var(--primary, #10b981)"}
                            strokeWidth="2"
                            strokeDasharray={msg.dashed ? "5,5" : "0"}
                            custom={idx}
                            variants={arrowVariant}
                            initial="hidden"
                            animate="visible"
                        />
                        <motion.path 
                            d={isLeft 
                                ? `M ${x2} ${msg.y} l 6 -4 l 0 8 z`
                                : `M ${x2} ${msg.y} l -6 -4 l 0 8 z`
                            }
                            fill={msg.dashed ? "var(--muted-foreground, #64748b)" : "var(--primary, #10b981)"}
                            transform={isLeft ? "translate(4,0)" : "translate(-4,0)"}
                            custom={idx}
                            variants={textVariant}
                            initial="hidden"
                            animate="visible"
                        />
                        <motion.text 
                            x={`${(msg.from + msg.to) / 2 * step}%`} 
                            y={msg.y - 8} 
                            fill="var(--muted-foreground, #94a3b8)" 
                            fontSize="12" 
                            textAnchor="middle"
                            fontFamily="monospace"
                            custom={idx}
                            variants={textVariant}
                            initial="hidden"
                            animate="visible"
                        >
                            {msg.text}
                        </motion.text>
                    </g>
                );
            })}
        </svg>
      </div>
    </div>
  );
};

export default SequenceDiagram;
