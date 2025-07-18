// src/algorithms/linkedList.js
import { sleep } from '../utils/sleep';

export const pseudocode = {
  insertHead: [
    'Insert at Head(value):',
    '  newNode = Node(value)',
    '  newNode.next = head',
    '  head = newNode',
  ],
  insertTail: [
    'Insert at Tail(value):',
    '  if head is null:',
    '    head = Node(value)',
    '    return',
    '  curr = head',
    '  while curr.next != null:',
    '    curr = curr.next',
    '  curr.next = Node(value)',
  ],
  insertAtIndex: [
    'Insert at Index(value, index):',
    '  if index == 0: insertAtHead(value)',
    '  curr = head',
    '  for i in range(index - 1):',
    '    curr = curr.next',
    '  newNode.next = curr.next',
    '  curr.next = newNode',
  ],
  deleteHead: [
    'Delete at Head():',
    '  if head == null: return',
    '  head = head.next',
  ],
  deleteTail: [
    'Delete at Tail():',
    '  if head == null or head.next == null:',
    '    head = null',
    '    return',
    '  curr = head',
    '  while curr.next.next != null:',
    '    curr = curr.next',
    '  curr.next = null',
  ],
  deleteAtIndex: [
    'Delete at Index(index):',
    '  if index == 0: deleteAtHead()',
    '  curr = head',
    '  for i in range(index - 1):',
    '    curr = curr.next',
    '  curr.next = curr.next.next',
  ]
};

export const linkedListCodeSnippets = {
  js: {
    insertHead: [
      'class Node {',
      '  constructor(val) { this.val = val; this.next = null; }',
      '}',
      'let newNode = new Node(value);',
      'newNode.next = head;',
      'head = newNode;'
    ],
    insertTail: [
      'if (!head) {',
      '  head = new Node(value);',
      '} else {',
      '  let curr = head;',
      '  while (curr.next !== null) curr = curr.next;',
      '  curr.next = new Node(value);',
      '}'
    ],
    insertAtIndex: [
      'if (index === 0) insertHead(value);',
      'let curr = head;',
      'for (let i = 0; i < index - 1; i++) curr = curr.next;',
      'let newNode = new Node(value);',
      'newNode.next = curr.next;',
      'curr.next = newNode;'
    ],
    deleteHead: [
      'if (head === null) return;',
      'head = head.next;'
    ],
    deleteTail: [
      'if (!head || !head.next) {',
      '  head = null;',
      '} else {',
      '  let curr = head;',
      '  while (curr.next.next !== null) curr = curr.next;',
      '  curr.next = null;',
      '}'
    ],
    deleteAtIndex: [
      'if (index === 0) deleteHead();',
      'let curr = head;',
      'for (let i = 0; i < index - 1; i++) curr = curr.next;',
      'curr.next = curr.next.next;'
    ]
  },

  python: {
    insertHead: [
      'class Node:',
      '  def __init__(self, val):',
      '    self.val = val',
      '    self.next = None',
      '',
      'new_node = Node(value)',
      'new_node.next = head',
      'head = new_node'
    ],
    insertTail: [
      'if not head:',
      '  head = Node(value)',
      'else:',
      '  curr = head',
      '  while curr.next:',
      '    curr = curr.next',
      '  curr.next = Node(value)'
    ],
    insertAtIndex: [
      'if index == 0:',
      '  insert_head(value)',
      'curr = head',
      'for _ in range(index - 1):',
      '  curr = curr.next',
      'new_node = Node(value)',
      'new_node.next = curr.next',
      'curr.next = new_node'
    ],
    deleteHead: [
      'if head:',
      '  head = head.next'
    ],
    deleteTail: [
      'if not head or not head.next:',
      '  head = None',
      'else:',
      '  curr = head',
      '  while curr.next.next:',
      '    curr = curr.next',
      '  curr.next = None'
    ],
    deleteAtIndex: [
      'if index == 0:',
      '  delete_head()',
      'curr = head',
      'for _ in range(index - 1):',
      '  curr = curr.next',
      'curr.next = curr.next.next'
    ]
  },

  java: {
    insertHead: [
      'Node newNode = new Node(value);',
      'newNode.next = head;',
      'head = newNode;'
    ],
    insertTail: [
      'if (head == null) {',
      '  head = new Node(value);',
      '} else {',
      '  Node curr = head;',
      '  while (curr.next != null) curr = curr.next;',
      '  curr.next = new Node(value);',
      '}'
    ],
    insertAtIndex: [
      'if (index == 0) insertHead(value);',
      'Node curr = head;',
      'for (int i = 0; i < index - 1; i++) curr = curr.next;',
      'Node newNode = new Node(value);',
      'newNode.next = curr.next;',
      'curr.next = newNode;'
    ],
    deleteHead: [
      'if (head != null)',
      '  head = head.next;'
    ],
    deleteTail: [
      'if (head == null || head.next == null) {',
      '  head = null;',
      '} else {',
      '  Node curr = head;',
      '  while (curr.next.next != null) curr = curr.next;',
      '  curr.next = null;',
      '}'
    ],
    deleteAtIndex: [
      'if (index == 0) deleteHead();',
      'Node curr = head;',
      'for (int i = 0; i < index - 1; i++) curr = curr.next;',
      'curr.next = curr.next.next;'
    ]
  },

  cpp: {
    insertHead: [
      'Node* newNode = new Node(value);',
      'newNode->next = head;',
      'head = newNode;'
    ],
    insertTail: [
      'if (head == nullptr) {',
      '  head = new Node(value);',
      '} else {',
      '  Node* curr = head;',
      '  while (curr->next != nullptr) curr = curr->next;',
      '  curr->next = new Node(value);',
      '}'
    ],
    insertAtIndex: [
      'if (index == 0) insertHead(value);',
      'Node* curr = head;',
      'for (int i = 0; i < index - 1; ++i) curr = curr->next;',
      'Node* newNode = new Node(value);',
      'newNode->next = curr->next;',
      'curr->next = newNode;'
    ],
    deleteHead: [
      'if (head != nullptr)',
      '  head = head->next;'
    ],
    deleteTail: [
      'if (head == nullptr || head->next == nullptr) {',
      '  head = nullptr;',
      '} else {',
      '  Node* curr = head;',
      '  while (curr->next->next != nullptr) curr = curr->next;',
      '  curr->next = nullptr;',
      '}'
    ],
    deleteAtIndex: [
      'if (index == 0) deleteHead();',
      'Node* curr = head;',
      'for (int i = 0; i < index - 1; ++i) curr = curr->next;',
      'curr->next = curr->next->next;'
    ]
  }
};

export const getLinkedListExplanation = (type, value, index) => {
  switch (type) {
    case 'insertHead': return `🔼 Inserted ${value} at the head of the list.`;
    case 'insertTail': return `🔽 Inserted ${value} at the tail of the list.`;
    case 'insertAtIndex': return `🔢 Inserted ${value} at index ${index}.`;
    case 'deleteHead': return `🚮 Deleted head node.`;
    case 'deleteTail': return `🚮 Deleted tail node.`;
    case 'deleteAtIndex': return `🚮 Deleted node at index ${index}.`;
    default: return '';
  }
};

export async function linkedListVisualizer({
  list,
  setList,
  type,
  value,
  index,
  setExplanation,
  speed,
  abortRef
}) {
  await sleep(speed);
  if (abortRef.current) return;

  let updated = [...list];

  switch (type) {
    case 'insertHead':
      updated = [value, ...list];
      break;
    case 'insertTail':
      updated = [...list, value];
      break;
    case 'insertAtIndex':
      if (index < 0 || index > list.length) {
        setExplanation('⚠️ Invalid index for insertion.');
        return;
      }
      updated.splice(index, 0, value);
      break;
    case 'deleteHead':
      if (list.length === 0) {
        setExplanation('⚠️ List is already empty.');
        return;
      }
      updated.shift();
      break;
    case 'deleteTail':
      if (list.length === 0) {
        setExplanation('⚠️ List is already empty.');
        return;
      }
      updated.pop();
      break;
    case 'deleteAtIndex':
      if (index < 0 || index >= list.length) {
        setExplanation('⚠️ Invalid index for deletion.');
        return;
      }
      updated.splice(index, 1);
      break;
    default:
      setExplanation('⚠️ Unknown operation.');
      return;
  }

  setList(updated);
  setExplanation(getLinkedListExplanation(type, value, index));
}
