// src/algorithms/bubbleSort.js

import { sleep } from '../utils/sleep';

export const pseudocode = [
  'for i = 0 to n-1',
  '  for j = 0 to n-i-1',
  '    if arr[j] > arr[j+1]',
  '      swap(arr[j], arr[j+1])',
];

export const codeSnippets = {
  cpp: [
    'for (int i = 0; i < n - 1; i++) {',
    '  for (int j = 0; j < n - i - 1; j++) {',
    '    if (arr[j] > arr[j + 1]) {',
    '      swap(arr[j], arr[j + 1]);',
    '    }',
    '  }',
    '}',
  ],
  python: [
    'for i in range(n - 1):',
    '  for j in range(n - i - 1):',
    '    if arr[j] > arr[j + 1]:',
    '      arr[j], arr[j + 1] = arr[j + 1], arr[j]',
  ],
  java: [
    'for (int i = 0; i < n - 1; i++) {',
    '  for (int j = 0; j < n - i - 1; j++) {',
    '    if (arr[j] > arr[j + 1]) {',
    '      int temp = arr[j];',
    '      arr[j] = arr[j + 1];',
    '      arr[j + 1] = temp;',
    '    }',
    '  }',
    '}',
  ],
  js: [
    'for (let i = 0; i < n - 1; i++) {',
    '  for (let j = 0; j < n - i - 1; j++) {',
    '    if (arr[j] > arr[j + 1]) {',
    '      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];',
    '    }',
    '  }',
    '}',
  ],
};

export const getBubbleExplanation = (a, b, i, j) => {
  return `Comparing index ${i} and ${j}: ${a} ${
    a > b ? '>' : '<='
  } ${b} ${a > b ? '→ swapping' : '→ no swap'}`;
};

export async function bubbleSortVisualizer({
  array,
  setArray,
  setActiveIndices,
  setCurrentLine,
  setStepCount,
  setComparisonCount,
  setSwapCount,
  setExplanation,
  speed,
  getBubbleExplanation,
  abortRef,
  setStatus,
}) {
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    if (abortRef?.current) {
      setStatus("Stopped");
      setExplanation("⏹️ Sorting stopped!");
      return;
    }

    setCurrentLine(0);
    await sleep(speed);
    setStepCount((prev) => prev + 1);

    for (let j = 0; j < n - i - 1; j++) {
      if (abortRef?.current) {
        setStatus("Stopped");
        setExplanation("⏹️ Sorting stopped!");
        return;
      }

      setCurrentLine(1);
      setActiveIndices([j, j + 1]);
      setComparisonCount((prev) => prev + 1);
      await sleep(speed);

      setExplanation(getBubbleExplanation(arr[j], arr[j + 1], j, j + 1));
      setCurrentLine(2);
      await sleep(speed);

      if (arr[j] > arr[j + 1]) {
        setSwapCount((prev) => prev + 1);
        setCurrentLine(3);
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);
        await sleep(speed);
      }
    }
  }

  setActiveIndices([]);
  setCurrentLine(null);
}

