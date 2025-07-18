// src/algorithms/stack.js
import { sleep } from '../utils/sleep';

export const pseudocode = [
  'push(x):',
  '  top++',
  '  stack[top] = x',
  'pop():',
  '  if top == -1 → underflow',
  '  else → top--; return popped',
];

export const codeSnippets = {
  js: [
    'let stack = [];',
    '',
    'function push(x) {',
    '  stack.push(x);',
    '}',
    '',
    'function pop() {',
    '  if (stack.length === 0) {',
    '    console.log("Stack Underflow");',
    '    return null;',
    '  }',
    '  return stack.pop();',
    '}',
  ],
  python: [
    'stack = []',
    '',
    'def push(x):',
    '    stack.append(x)',
    '',
    'def pop():',
    '    if not stack:',
    '        print("Stack Underflow")',
    '        return None',
    '    return stack.pop()',
  ],
  cpp: [
    '#include <iostream>',
    '#include <stack>',
    '',
    'std::stack<int> stack;',
    '',
    'void push(int x) {',
    '    stack.push(x);',
    '}',
    '',
    'void pop() {',
    '    if (stack.empty()) {',
    '        std::cout << "Stack Underflow";',
    '        return;',
    '    }',
    '    stack.pop();',
    '}',
  ],
  java: [
    'import java.util.Stack;',
    '',
    'Stack<Integer> stack = new Stack<>();',
    '',
    'void push(int x) {',
    '    stack.push(x);',
    '}',
    '',
    'void pop() {',
    '    if (stack.isEmpty()) {',
    '        System.out.println("Stack Underflow");',
    '        return;',
    '    }',
    '    stack.pop();',
    '}',
  ],
};


export const getStackExplanation = (action, value, result) => {
  if (action === 'push') {
    return `📥 Pushed ${value} onto stack`;
  } else if (action === 'pop') {
    return result !== undefined
      ? `📤 Popped ${result} from stack`
      : '⚠️ Cannot pop — stack is empty';
  }
};

export async function stackVisualizer({
  stack,
  setStack,
  setActiveIndices,
  setExplanation,
  speed,
  action,
  value,
  abortRef,
}) {
  if (abortRef.current) return;

  if (action === 'push') {
    setExplanation(getStackExplanation('push', value));
    setStack(prev => [...prev, value]);
  } else if (action === 'pop') {
    setExplanation(getStackExplanation('pop', null, stack[stack.length - 1]));
    setStack(prev => prev.slice(0, -1));
  }

  await sleep(speed);
}
