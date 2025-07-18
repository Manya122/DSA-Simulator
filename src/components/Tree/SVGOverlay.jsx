// src/components/Tree/SVGOverlay.jsx
export default function SVGOverlay({ arrows }) {
  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
          fill="black"
        >
          <polygon points="0 0, 10 3.5, 0 7" />
        </marker>
      </defs>

      {arrows.map((arrow, idx) => (
        <line
          key={idx}
          x1={arrow.fromX}
          y1={arrow.fromY}
          x2={arrow.toX}
          y2={arrow.toY}
          stroke="black"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />
      ))}
    </svg>
  );
}
