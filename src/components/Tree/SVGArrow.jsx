// src/components/Tree/SVGArrow.jsx
export default function SVGArrow({ fromX, fromY, toX, toY }) {
  const deltaX = toX - fromX;
  const deltaY = toY - fromY;
  const length = Math.sqrt(deltaX ** 2 + deltaY ** 2);

  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  return (
    <svg
      style={{
        position: 'absolute',
        left: `${fromX}px`,
        top: `${fromY}px`,
        overflow: 'visible',
        pointerEvents: 'none',
        zIndex: 0,
      }}
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
      <line
        x1={0}
        y1={0}
        x2={length}
        y2={0}
        stroke="black"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
        transform={`rotate(${angle})`}
      />
    </svg>
  );
}
