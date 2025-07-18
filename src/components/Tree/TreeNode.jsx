import { useEffect, useRef, useState } from 'react';
import TreeNodeWrapper from './TreeNodeWrapper';

export default function TreeNode({ node, highlightedVal, addArrow }) {
  const nodeRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const [positions, setPositions] = useState({
    parent: null,
    left: null,
    right: null,
  });

  if (!node) return null;

  const isHighlighted = node.val === highlightedVal;

  // Get center relative to the #tree-container
  const getCenter = (ref) => {
    if (!ref?.current) return null;

    const rect = ref.current.getBoundingClientRect();
    const parentRect = document
      .querySelector('#tree-container')
      ?.getBoundingClientRect();

    if (!parentRect) return null;

    return {
      x: rect.left - parentRect.left + rect.width / 2,
      y: rect.top - parentRect.top + rect.height / 2,
    };
  };

  // Update positions after mount
  useEffect(() => {
    const newPositions = {
      parent: getCenter(nodeRef),
      left: getCenter(leftRef),
      right: getCenter(rightRef),
    };
    setPositions(newPositions);

    // Push arrows if valid
    if (newPositions.parent && newPositions.left) {
      addArrow({
        fromX: newPositions.parent.x,
        fromY: newPositions.parent.y,
        toX: newPositions.left.x,
        toY: newPositions.left.y,
      });
    }

    if (newPositions.parent && newPositions.right) {
      addArrow({
        fromX: newPositions.parent.x,
        fromY: newPositions.parent.y,
        toX: newPositions.right.x,
        toY: newPositions.right.y,
      });
    }
  }, [node]);

  return (
    <div className="relative flex flex-col items-center min-w-[50px]">
      {/* 🔵 Node */}
      <div
        ref={nodeRef}
        className={`rounded-full px-4 py-2 mb-2 transition-all duration-300 text-sm font-semibold ${
          isHighlighted
            ? 'bg-yellow-400 text-black scale-110'
            : 'bg-blue-500 text-white'
        }`}
      >
        {node.val}
      </div>

      {/* ⤵️ Children */}
      <div className="flex gap-10 relative">
        {/* LEFT child */}
        {node.left && (
          <div ref={leftRef}>
            <TreeNodeWrapper
              node={node.left}
              highlightedVal={highlightedVal}
              addArrow={addArrow}
            />
          </div>
        )}

        {/* RIGHT child */}
        {node.right && (
          <div ref={rightRef}>
            <TreeNodeWrapper
              node={node.right}
              highlightedVal={highlightedVal}
              addArrow={addArrow}
            />
          </div>
        )}
      </div>
    </div>
  );
}
