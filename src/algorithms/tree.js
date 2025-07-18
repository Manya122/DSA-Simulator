// src/algorithms/tree.js
import { sleep } from '../utils/sleep';

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

async function animatedInsert(root, val, setHighlighted, speed, abortRef) {
  if (!root) {
    await sleep(speed);
    return new TreeNode(val);
  }

  let current = root;

  while (true) {
    if (abortRef.current) return root;

    setHighlighted(current.val);
    await sleep(speed);

    if (val < current.val) {
      if (!current.left) {
        current.left = new TreeNode(val);
        break;
      } else {
        current = current.left;
      }
    } else {
      if (!current.right) {
        current.right = new TreeNode(val);
        break;
      } else {
        current = current.right;
      }
    }
  }

  return root;
}

function searchNode(root, val) {
  if (!root) return false;
  if (root.val === val) return true;
  return val < root.val
    ? searchNode(root.left, val)
    : searchNode(root.right, val);
}

function deleteNode(root, val) {
  if (!root) return null;
  if (val < root.val) {
    root.left = deleteNode(root.left, val);
  } else if (val > root.val) {
    root.right = deleteNode(root.right, val);
  } else {
    // Node to delete found
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // Find min node in right subtree
    let temp = root.right;
    while (temp.left) temp = temp.left;
    root.val = temp.val;
    root.right = deleteNode(root.right, temp.val);
  }
  return root;
}

export const treeVisualizer = async ({
  root,
  setRoot,
  value,
  action,
  setExplanation,
  speed,
  abortRef,
  setHighlighted,
}) => {
  await sleep(speed);
  if (abortRef.current) return;

  let updatedRoot = root;

  switch (action) {
    case 'insert':
      updatedRoot = await animatedInsert(root, value, setHighlighted, speed, abortRef);
      setExplanation(`🌱 Inserted ${value} into the tree.`);
      break;

    case 'search':
      const path = []; // stores visited nodes

      let current = root;
      while (current) {
        if (abortRef.current) return;
        path.push(current.val);
        setHighlighted(current.val);
        await sleep(speed);

        if (current.val === value) {
          setExplanation(`✅ Found ${value} in the tree.`);
          return;
        }

        current = value < current.val ? current.left : current.right;
      }

      // Not found
      setExplanation(`❌ ${value} not found in the tree.`);
      break;

    case 'delete':
      updatedRoot = deleteNode(root, value);
      setExplanation(`🪓 Deleted ${value} from the tree.`);
      break;
    default:
      setExplanation('⚠️ Unknown action.');
  }

  setRoot(updatedRoot);
};

// ---- Pseudocode ----
export const pseudocode = {
  insert: [
    'Insert(root, val):',
    '  if root is null:',
    '    return new Node(val)',
    '  if val < root.val:',
    '    root.left = Insert(root.left, val)',
    '  else:',
    '    root.right = Insert(root.right, val)',
    '  return root'
  ],
  search: [
    'Search(root, val):',
    '  if root is null:',
    '    return false',
    '  if root.val == val:',
    '    return true',
    '  if val < root.val:',
    '    return Search(root.left, val)',
    '  else:',
    '    return Search(root.right, val)'
  ],
  delete: [
    'Delete(root, val):',
    '  if val < root.val:',
    '    root.left = Delete(root.left, val)',
    '  else if val > root.val:',
    '    root.right = Delete(root.right, val)',
    '  else:',
    '    if no children: return null',
    '    if one child: return that child',
    '    replace with min from right subtree',
    '  return root'
  ]
};

// ---- Code Snippets ----
export const codeSnippets = {
  js: {
    insert: [
      'function insert(root, val) {',
      '  if (!root) return new TreeNode(val);',
      '  if (val < root.val) root.left = insert(root.left, val);',
      '  else root.right = insert(root.right, val);',
      '  return root;',
      '}'
    ],
    search: [
      'function search(root, val) {',
      '  if (!root) return false;',
      '  if (root.val === val) return true;',
      '  return val < root.val ? search(root.left, val) : search(root.right, val);',
      '}'
    ],
    delete: [
      'function delete(root, val) {',
      '  if (!root) return null;',
      '  if (val < root.val) root.left = delete(root.left, val);',
      '  else if (val > root.val) root.right = delete(root.right, val);',
      '  else {',
      '    if (!root.left) return root.right;',
      '    if (!root.right) return root.left;',
      '    let temp = root.right;',
      '    while (temp.left) temp = temp.left;',
      '    root.val = temp.val;',
      '    root.right = delete(root.right, temp.val);',
      '  }',
      '  return root;',
      '}'
    ]
  },
  python: {
    insert: [
      'def insert(root, val):',
      '  if not root:',
      '    return TreeNode(val)',
      '  if val < root.val:',
      '    root.left = insert(root.left, val)',
      '  else:',
      '    root.right = insert(root.right, val)',
      '  return root'
    ],
    search: [
      'def search(root, val):',
      '  if not root:',
      '    return False',
      '  if root.val == val:',
      '    return True',
      '  return search(root.left, val) if val < root.val else search(root.right, val)'
    ],
    delete: [
      'def delete(root, val):',
      '  if not root:',
      '    return None',
      '  if val < root.val:',
      '    root.left = delete(root.left, val)',
      '  elif val > root.val:',
      '    root.right = delete(root.right, val)',
      '  else:',
      '    if not root.left:',
      '      return root.right',
      '    if not root.right:',
      '      return root.left',
      '    temp = root.right',
      '    while temp.left:',
      '      temp = temp.left',
      '    root.val = temp.val',
      '    root.right = delete(root.right, temp.val)',
      '  return root'
    ]
  },
  cpp: {
    insert: [
      'TreeNode* insert(TreeNode* root, int val) {',
      '  if (!root) return new TreeNode(val);',
      '  if (val < root->val)',
      '    root->left = insert(root->left, val);',
      '  else',
      '    root->right = insert(root->right, val);',
      '  return root;',
      '}'
    ],
    search: [
      'bool search(TreeNode* root, int val) {',
      '  if (!root) return false;',
      '  if (root->val == val) return true;',
      '  return val < root->val ? search(root->left, val) : search(root->right, val);',
      '}'
    ],
    delete: [
      'TreeNode* delete(TreeNode* root, int val) {',
      '  if (!root) return nullptr;',
      '  if (val < root->val)',
      '    root->left = delete(root->left, val);',
      '  else if (val > root->val)',
      '    root->right = delete(root->right, val);',
      '  else {',
      '    if (!root->left) return root->right;',
      '    if (!root->right) return root->left;',
      '    TreeNode* temp = root->right;',
      '    while (temp->left) temp = temp->left;',
      '    root->val = temp->val;',
      '    root->right = delete(root->right, temp->val);',
      '  }',
      '  return root;',
      '}'
    ]
  },
  java: {
    insert: [
      'TreeNode insert(TreeNode root, int val) {',
      '  if (root == null) return new TreeNode(val);',
      '  if (val < root.val)',
      '    root.left = insert(root.left, val);',
      '  else',
      '    root.right = insert(root.right, val);',
      '  return root;',
      '}'
    ],
    search: [
      'boolean search(TreeNode root, int val) {',
      '  if (root == null) return false;',
      '  if (root.val == val) return true;',
      '  return val < root.val ? search(root.left, val) : search(root.right, val);',
      '}'
    ],
    delete: [
      'TreeNode delete(TreeNode root, int val) {',
      '  if (root == null) return null;',
      '  if (val < root.val)',
      '    root.left = delete(root.left, val);',
      '  else if (val > root.val)',
      '    root.right = delete(root.right, val);',
      '  else {',
      '    if (root.left == null) return root.right;',
      '    if (root.right == null) return root.left;',
      '    TreeNode temp = root.right;',
      '    while (temp.left != null) temp = temp.left;',
      '    root.val = temp.val;',
      '    root.right = delete(root.right, temp.val);',
      '  }',
      '  return root;',
      '}'
    ]
  }
};
