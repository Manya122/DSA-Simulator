import TreeNode from './TreeNode';

export default function TreeNodeWrapper({ node, highlightedVal, addArrow }) {
  return (
    <TreeNode
      node={node}
      highlightedVal={highlightedVal}
      addArrow={addArrow}
    />
  );
}
