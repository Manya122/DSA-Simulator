// src/algorithms/binarySearch.js
import { sleep } from '../utils/sleep';

export const pseudocode = [
  'binarySearch(arr, target):',
  '  low = 0, high = n - 1',
  '  while low <= high:',
  '    mid = (low + high) / 2',
  '    if arr[mid] == target: return mid',
  '    else if arr[mid] < target: low = mid + 1',
  '    else: high = mid - 1',
  '  return -1',
];

export const codeSnippets = {
  cpp: [
    'int binarySearch(int arr[], int n, int target) {',
    '  int low = 0, high = n - 1;',
    '  while (low <= high) {',
    '    int mid = (low + high) / 2;',
    '    if (arr[mid] == target) return mid;',
    '    else if (arr[mid] < target) low = mid + 1;',
    '    else high = mid - 1;',
    '  }',
    '  return -1;',
    '}',
  ],
  python: [
    'def binarySearch(arr, target):',
    '  low, high = 0, len(arr) - 1',
    '  while low <= high:',
    '    mid = (low + high) // 2',
    '    if arr[mid] == target: return mid',
    '    elif arr[mid] < target: low = mid + 1',
    '    else: high = mid - 1',
    '  return -1',
  ],
  java: [
    'int binarySearch(int[] arr, int target) {',
    '  int low = 0, high = arr.length - 1;',
    '  while (low <= high) {',
    '    int mid = (low + high) / 2;',
    '    if (arr[mid] == target) return mid;',
    '    else if (arr[mid] < target) low = mid + 1;',
    '    else high = mid - 1;',
    '  }',
    '  return -1;',
    '}',
  ],
  js: [
    'function binarySearch(arr, target) {',
    '  let low = 0, high = arr.length - 1;',
    '  while (low <= high) {',
    '    const mid = Math.floor((low + high) / 2);',
    '    if (arr[mid] === target) return mid;',
    '    else if (arr[mid] < target) low = mid + 1;',
    '    else high = mid - 1;',
    '  }',
    '  return -1;',
    '}',
  ],
};

export const getBinaryExplanation = (low, high, mid, value, target) => {
  if (value === target) {
    return `✅ Found target ${target} at index ${mid}`;
  } else if (value < target) {
    return `🧐 ${value} < ${target} → search right side`;
  } else {
    return `🧐 ${value} > ${target} → search left side`;
  }
};

export async function binarySearchVisualizer({
  array,
  setArray,
  setActiveIndices,
  setCurrentLine,
  setStepCount,
  setComparisonCount,
  setExplanation,
  speed,
  getBinaryExplanation,
  target,
  abortRef,
  waitWhilePaused,
  setStatus,
}) {
  const arr = [...array].sort((a, b) => a - b); // ensure sorted array
  setArray([...arr]); // update visualization to sorted version

  let low = 0;
  let high = arr.length - 1;

  setStepCount((prev) => prev + 1);
  setCurrentLine(1);
  await sleep(speed);

  while (low <= high) {
    if (abortRef.current) return;
    await waitWhilePaused();

    const mid = Math.floor((low + high) / 2);
    const value = arr[mid];

    setCurrentLine(3);
    setActiveIndices([mid]);
    setComparisonCount((prev) => prev + 1);
    setExplanation(getBinaryExplanation(low, high, mid, value, target));
    await sleep(speed);

    if (value === target) {
      setCurrentLine(4);
      return;
    } else if (value < target) {
      setCurrentLine(5);
      low = mid + 1;
    } else {
      setCurrentLine(6);
      high = mid - 1;
    }

    await sleep(speed);
  }

  setCurrentLine(7);
  setExplanation(`❌ Target ${target} not found in array.`);
  setActiveIndices([]);
}
