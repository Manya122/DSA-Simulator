import { sleep } from '../utils/sleep';

export const pseudocode = [
  'linearSearch(arr, target):',
  '  for i from 0 to length(arr) - 1:',
  '    if arr[i] == target:',
  '      return i',
  '  return -1',
];

export const codeSnippets = {
  cpp: [
    'int linearSearch(int arr[], int target) {',
    '  for (int i = 0; i < n; i++) {',
    '    if (arr[i] == target)',
    '      return i;',
    '  }',
    '  return -1;',
    '}',
  ],
  python: [
    'def linearSearch(arr, target):',
    '  for i in range(len(arr)):',
    '    if arr[i] == target:',
    '      return i',
    '  return -1',
  ],
  java: [
    'int linearSearch(int[] arr, int target) {',
    '  for (int i = 0; i < arr.length; i++) {',
    '    if (arr[i] == target)',
    '      return i;',
    '  }',
    '  return -1;',
    '}',
  ],
  js: [
    'function linearSearch(arr, target) {',
    '  for (let i = 0; i < arr.length; i++) {',
    '    if (arr[i] === target)',
    '      return i;',
    '  }',
    '  return -1;',
    '}',
  ],
};

export const getLinearExplanation = (currentVal, target, index, found) => {
  if (found) {
    return `✅ Found ${target} at index ${index}`;
  } else {
    return `🔍 Comparing ${currentVal} with ${target} → not equal`;
  }
};

export async function linearSearchVisualizer({
  array,
  setArray,
  setActiveIndices,
  setCurrentLine,
  setStepCount,
  setComparisonCount,
  setExplanation,
  speed,
  getLinearExplanation,
  target,
  abortRef,
  waitWhilePaused,
  setStatus,
}) {
  const arr = [...array];

  for (let i = 0; i < arr.length; i++) {
    if (abortRef.current) return;

    setStepCount((prev) => prev + 1);
    setComparisonCount((prev) => prev + 1);

    setActiveIndices([i]);
    setCurrentLine(1);
    await sleep(speed);

    if (arr[i] === target) {
      setExplanation(getLinearExplanation(arr[i], target, i, true));
      setCurrentLine(2);
      setStatus("Idle");
      return;
    }

    setExplanation(getLinearExplanation(arr[i], target, i, false));
    setCurrentLine(3);
    await sleep(speed);
  }

  setExplanation(`❌ ${target} not found in array.`);
  setCurrentLine(4);
  setActiveIndices([]);
  setStatus("Idle");
}
