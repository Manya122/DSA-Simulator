// src/algorithms/queue.js
import { sleep } from '../utils/sleep';

export const pseudocode = [
  'enqueue(value):',
  '  add value to the end of the queue',
  '',
  'dequeue():',
  '  if queue is not empty:',
  '    remove and return the front value',
  '  else:',
  '    return null',
];

export const codeSnippets = {
  js: [
    'let queue = [];',
    'queue.push(10);    // enqueue',
    'queue.shift();     // dequeue',
  ],
  python: [
    'from collections import deque',
    'queue = deque()',
    'queue.append(10)     # enqueue',
    'queue.popleft()      # dequeue',
  ],
  java: [
    'import java.util.*;',
    'Queue<Integer> queue = new LinkedList<>();',
    'queue.add(10);       // enqueue',
    'queue.poll();        // dequeue',
  ],
  cpp: [
    '#include <queue>',
    'std::queue<int> q;',
    'q.push(10);          // enqueue',
    'q.pop();             // dequeue',
  ],
};

export const getQueueExplanation = (action, value) => {
  if (action === 'enqueue') return `➕ Enqueued ${value} into the queue.`;
  if (action === 'dequeue') return `➖ Dequeued ${value} from the queue.`;
  return '';
};

export async function queueVisualizer({
  queue,
  setQueue,
  setExplanation,
  speed,
  action,
  value,
  abortRef,
}) {
  await sleep(speed);
  if (abortRef.current) return;

  if (action === 'enqueue') {
    setQueue(prev => {
      const updated = [...prev, value];
      setExplanation(getQueueExplanation(action, value));
      return updated;
    });
  } else if (action === 'dequeue') {
    setQueue(prev => {
      if (prev.length === 0) {
        setExplanation('⚠️ Queue is empty!');
        return prev;
      }
      const removed = prev[0];
      const updated = prev.slice(1);
      setExplanation(getQueueExplanation(action, removed));
      return updated;
    });
  }
}
