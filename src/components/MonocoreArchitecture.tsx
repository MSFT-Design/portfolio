"use client";

import { useState } from "react";
import styles from "./MonocoreArchitecture.module.css";

type View = "shell" | "compile" | "sync";
const shells = {
  "Tab root": "A persistent navigation shell surrounds the product canvas. Shared structure defines where navigation lives; the canvas supplies each app’s content.",
  "Pushed screen": "A back-navigation shell wraps the same canvas contract. Hierarchy changes without rebuilding the product content.",
  "Modal screen": "A dismissible shell presents a focused task. Presentation belongs to the shell; task content belongs to the canvas.",
};
const stages = [
  ["Read iOS", "Read composition, content, icons, component references, and token bindings from the source artboard."],
  ["Resolve intent", "Separate shell structure from product canvas and resolve the shared schema and Monocore Variables."],
  ["Apply Android rules", "Preserve content and icons while applying Material 3 components and explicit adaptive layout rules. Report platform differences."],
  ["Construct & verify", "Use Figma MCP and the Plugin API to construct the target composition, then verify resolved tokens, dimensions, and structure."],
];
const nodes = ["iOS", "Android", "Variables", "Documentation"] as const;
type Node = typeof nodes[number];
const changes: Record<Node, string> = {
  iOS: "An iOS artboard edit updates the shared composition; Android is recompiled through platform rules and the Layout/Spec documentation is regenerated.",
  Android: "An Android component change is reconciled with the shared model; affected iOS compositions and documentation are updated with platform differences made explicit.",
  Variables: "A shared token change resolves by platform and mode, updates affected iOS and Android artboards, and refreshes the documented values.",
  Documentation: "A schema change initiated from the documentation is reconciled with the model, restructures affected artboards, and regenerates verified Layout/Spec pages.",
};

/** Explanatory model of the architecture; does not connect to internal Figma files. */
export function MonocoreArchitecture({ view }: { view: View }) {
  const [shell, setShell] = useState<keyof typeof shells>("Tab root");
  const [stage, setStage] = useState(0);
  const [source, setSource] = useState<Node>("Variables");
  const [revision, setRevision] = useState(0);
  return (
    <figure className={`${styles.figure} not-prose`} aria-label={`Monocore ${view} architecture`}>
      <div className={styles.eyebrow}>MONOCORE / {view === "shell" ? "01: CANONICAL MODEL" : view === "compile" ? "02: PLATFORM COMPILATION" : "03: SYNCHRONIZATION"}</div>
      {view === "shell" ? <>
        <div className={styles.controls} role="group" aria-label="Screen presentation">
          {(Object.keys(shells) as (keyof typeof shells)[]).map(name => <button key={name} aria-pressed={shell === name} onClick={() => setShell(name)}>{name}</button>)}
        </div>
        <div className={styles.shell}>
          <div className={styles.shellBar}>{shell === "Tab root" ? "Product navigation" : shell === "Pushed screen" ? "← Back / Screen title" : "Close / Focused task"}<span>Shared shell</span></div>
          <div className={styles.canvas}><span>PRODUCT CANVAS</span><strong>Teams · SharePoint · Engage</strong><div className={styles.blocks}><i /><i /><i /></div><small>App-specific composition and content</small></div>
          {shell === "Tab root" && <div className={styles.tabs}>Activity · Chat · Calendar</div>}
        </div>
        <p className={styles.detail} aria-live="polite">{shells[shell]}</p>
      </> : view === "compile" ? <>
        <ol className={styles.pipeline} aria-label="Compilation stages">
          {stages.map(([label], index) => <li key={label}><button aria-pressed={stage === index} onClick={() => setStage(index)}><span>0{index + 1}</span>{label}</button></li>)}
        </ol>
        <div className={styles.track} aria-hidden="true"><div style={{ width: `${(stage + 1) * 25}%` }} /></div>
        <p className={styles.detail} aria-live="polite"><strong>{stages[stage][0]}.</strong> {stages[stage][1]}</p>
        <div className={styles.controls}><button onClick={() => setStage((stage + 1) % stages.length)}>Next stage →</button></div>
      </> : <>
        <p className={styles.hint}>Choose where a change begins, then trace its effect across the system.</p>
        <div key={revision} className={`${styles.network} ${revision ? styles.traced : ""}`}>
          {nodes.map(node => <button key={node} className={styles.node} aria-pressed={source === node} onClick={() => { setSource(node); setRevision(0); }}><span>{source === node ? "CHANGE ORIGIN" : "CONNECTED OUTPUT"}</span><strong>{node}</strong><small>{revision ? `Revision ${revision} reconciled` : "Shared model ↔ platform rules"}</small></button>)}
          <div className={styles.core}>Canonical model<span>Schema · intent · token bindings</span></div>
        </div>
        <p className={styles.detail} aria-live="polite">{changes[source]} {revision > 0 && `Illustrated propagation ${revision} complete: all four outputs reconciled.`}</p>
        <div className={styles.controls}><button onClick={() => setRevision(r => r + 1)}>Trace change →</button></div>
      </>}
      <figcaption className={styles.caption}>Interactive architecture illustration · Select a control to inspect the model.</figcaption>
    </figure>
  );
}
