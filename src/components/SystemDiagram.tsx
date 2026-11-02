"use client";

import { motion } from "framer-motion";
import { MotionSection } from "./MotionSection";

interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  type?: "primary" | "secondary" | "accent";
}

interface DiagramConnection {
  from: string;
  to: string;
  label?: string;
}

interface SystemDiagramProps {
  title?: string;
  description?: string;
  nodes: DiagramNode[];
  connections: DiagramConnection[];
  className?: string;
}

export function SystemDiagram({
  title,
  description,
  nodes,
  connections,
  className = "",
}: SystemDiagramProps) {
  const getNodePos = (id: string) => {
    const node = nodes.find((n) => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  const typeStyles = {
    primary: "bg-accent/10 border-accent/40 text-accent",
    secondary: "bg-surface-elevated border-border text-text-secondary",
    accent: "bg-accent border-accent text-white",
  };

  return (
    <MotionSection className={className}>
      {title && (
        <div className="mb-8">
          <h3 className="text-heading font-semibold text-text-primary mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-body text-text-tertiary max-w-xl">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="relative w-full aspect-[16/9] bg-surface rounded-2xl border border-border overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 grid-pattern opacity-40" />

        {/* SVG connections */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 450">
          {connections.map((conn, i) => {
            const from = getNodePos(conn.from);
            const to = getNodePos(conn.to);
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;

            return (
              <motion.g key={i}>
                <motion.path
                  d={`M ${from.x} ${from.y} Q ${midX} ${from.y} ${midX} ${midY} Q ${midX} ${to.y} ${to.x} ${to.y}`}
                  fill="none"
                  stroke="rgba(74, 123, 255, 0.2)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    pathLength: { duration: 1.2, delay: 0.5 + i * 0.15 },
                    opacity: { duration: 0.3, delay: 0.5 + i * 0.15 },
                  }}
                />
                {/* Animated dot along path */}
                <motion.circle
                  r="3"
                  fill="#4A7BFF"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 1, 0] }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 2,
                    delay: 1.5 + i * 0.3,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    begin={`${1.5 + i * 0.3}s`}
                    path={`M ${from.x} ${from.y} Q ${midX} ${from.y} ${midX} ${midY} Q ${midX} ${to.y} ${to.x} ${to.y}`}
                  />
                </motion.circle>

                {conn.label && (
                  <motion.text
                    x={midX}
                    y={midY - 10}
                    textAnchor="middle"
                    fill="rgba(161, 161, 170, 0.6)"
                    fontSize="10"
                    fontFamily="Inter"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + i * 0.15 }}
                  >
                    {conn.label}
                  </motion.text>
                )}
              </motion.g>
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(node.x / 800) * 100}%`,
              top: `${(node.y / 450) * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.2 + i * 0.1,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.08, y: -2 }}
              transition={{ duration: 0.2 }}
              className={`px-4 py-2.5 rounded-xl border backdrop-blur-sm cursor-default text-center ${
                typeStyles[node.type || "secondary"]
              }`}
            >
              <div className="text-caption font-medium whitespace-nowrap">
                {node.label}
              </div>
              {node.sublabel && (
                <div className="text-[10px] text-text-tertiary mt-0.5 whitespace-nowrap">
                  {node.sublabel}
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </MotionSection>
  );
}

/* Pre-built philosophy diagram */
export function DesignPhilosophyDiagram() {
  const nodes: DiagramNode[] = [
    { id: "user", label: "User Research", sublabel: "Signals & patterns", x: 100, y: 120, type: "secondary" },
    { id: "system", label: "System Thinking", sublabel: "Architecture", x: 400, y: 80, type: "accent" },
    { id: "tokens", label: "Design Tokens", sublabel: "Foundations", x: 250, y: 250, type: "primary" },
    { id: "components", label: "Components", sublabel: "Building blocks", x: 550, y: 250, type: "primary" },
    { id: "patterns", label: "Patterns", sublabel: "Compositions", x: 400, y: 370, type: "primary" },
    { id: "product", label: "Product", sublabel: "Experiences", x: 700, y: 120, type: "secondary" },
    { id: "scale", label: "Scale", sublabel: "Impact", x: 700, y: 370, type: "accent" },
  ];

  const connections: DiagramConnection[] = [
    { from: "user", to: "system", label: "Informs" },
    { from: "system", to: "tokens", label: "Defines" },
    { from: "system", to: "components", label: "Structures" },
    { from: "tokens", to: "patterns" },
    { from: "components", to: "patterns" },
    { from: "system", to: "product", label: "Shapes" },
    { from: "patterns", to: "scale", label: "Enables" },
    { from: "product", to: "scale" },
  ];

  return (
    <SystemDiagram
      title="Design Philosophy"
      description="A systems-first approach to product design — from user signals to scalable experiences."
      nodes={nodes}
      connections={connections}
    />
  );
}
