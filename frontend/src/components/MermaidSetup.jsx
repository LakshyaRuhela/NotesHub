import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

// initialise mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: "default",
});

// Clean data
const cleanMermaidChart = (diagram) => {
  // If diagram not present return empty string
  if (!diagram) return "";
  // clean diagram data
  let clean = diagram.replace(/\r\n/g, "\n").trim();

  if (!clean.startsWith("graph")) {
    // create top down graph
    clean = `graph TD\n${clean}`;
  }
  return clean;
};

// autoFix function for diagrams
const autoFixNodes = (diagram) => {
  let index = 0;
  const used = new Map();

  return diagram.replace(/\[(.*?)\]/g, (match, label) => {
    // normalize label for key
    const key = label.trim();

    // reuse same node if label already seen
    if (used.has(key)) {
      return used.get(key);
    }

    index++;
    const id = `N${index}`;
    const node = `${id}["${key}"]`;

    used.set(key, node);
    return node;
  });
};

function MermaidSetup({ diagram }) {
  const containerRef = useRef(null); // give reference of actual diagram data

  useEffect(() => {
    // if diagram or ref not present then return
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = "";
        //  Generate random ID for diagram
        const uniqueId = `mermaid-${Math.random()
          .toString(36)
          .substring(2, 9)}`;

        // ✅ sanitize before render
        // create a clean chart
        const safeChart = autoFixNodes(cleanMermaidChart(diagram));
        // proper diagram
        const { svg } = await mermaid.render(uniqueId, safeChart);
        // save diagram into container reference
        containerRef.current.innerHTML = svg;
      } catch (error) {
        console.error("Mermaid render failed:", error);
      }
    };

    renderDiagram(); // call render diagram function
  }, [diagram]);

  return (
    <div className="bg-white border rounded-lg p-4 overflow-x-auto">
      {/* this components shows the diagram given by mermaid component */}
      <div ref={containerRef} />
    </div>
  );
}
export default MermaidSetup;
