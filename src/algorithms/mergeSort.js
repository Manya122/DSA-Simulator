import { sleep } from '../utils/sleep';

export const pseudocode = [
  'function mergeSort(arr):',
  '  if length of arr <= 1:',
  '    return arr',
  '  mid = length of arr / 2',
  '  left = mergeSort(arr[0:mid])',
  '  right = mergeSort(arr[mid:end])',
  '  return merge(left, right)',
];

export const codeSnippets = {
  cpp: [
    'void mergeSort(vector<int>& arr, int l, int r) {',
    '  if (l < r) {',
    '    int m = l + (r - l) / 2;',
    '    mergeSort(arr, l, m);',
    '    mergeSort(arr, m + 1, r);',
    '    merge(arr, l, m, r);',
    '  }',
    '}',
  ],
  python: [
    'def merge_sort(arr):',
    '  if len(arr) <= 1:',
    '    return arr',
    '  mid = len(arr) // 2',
    '  left = merge_sort(arr[:mid])',
    '  right = merge_sort(arr[mid:])',
    '  return merge(left, right)',
  ],
  java: [
    'void mergeSort(int[] arr, int l, int r) {',
    '  if (l < r) {',
    '    int m = l + (r - l) / 2;',
    '    mergeSort(arr, l, m);',
    '    mergeSort(arr, m + 1, r);',
    '    merge(arr, l, m, r);',
    '  }',
    '}',
  ],
  js: [
    'function mergeSort(arr) {',
    '  if (arr.length <= 1) return arr;',
    '  const mid = Math.floor(arr.length / 2);',
    '  const left = mergeSort(arr.slice(0, mid));',
    '  const right = mergeSort(arr.slice(mid));',
    '  return merge(left, right);',
    '}',
  ],
};

export const getMergeExplanation = (left, right, merged) => {
  return `🔀 Merging ${left.join(', ')} and ${right.join(', ')} → Result: ${merged.join(', ')}`;
};

export async function mergeSortVisualizer({
  array,
  setArray,
  setActiveIndices,
  setCurrentLine,
  setStepCount,
  setComparisonCount,
  setSwapCount,
  setExplanation,
  speed,
  getMergeExplanation,
  abortRef,
  setStatus,
}) {
  const arr = [...array];

  async function mergeSort(arr, l, r) {
    if (abortRef?.current) return;
    if (l >= r) return;

    const mid = Math.floor((l + r) / 2);

    await mergeSort(arr, l, mid);
    await mergeSort(arr, mid + 1, r);

    const left = arr.slice(l, mid + 1);
    const right = arr.slice(mid + 1, r + 1);
    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
      if (abortRef?.current) return;

      setActiveIndices([k]);
      setComparisonCount((prev) => prev + 1);
      setCurrentLine(6);
      await sleep(speed);

      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }

      setArray([...arr]);
      setStepCount((prev) => prev + 1);
      setSwapCount((prev) => prev + 1);
      await sleep(speed);
    }

    while (i < left.length) {
      arr[k++] = left[i++];
      setArray([...arr]);
      await sleep(speed);
    }

    while (j < right.length) {
      arr[k++] = right[j++];
      setArray([...arr]);
      await sleep(speed);
    }

    const merged = arr.slice(l, r + 1);
    setExplanation(getMergeExplanation(left, right, merged));
    await sleep(speed);
  }

  await mergeSort(arr, 0, arr.length - 1);

  setCurrentLine(null);
  setActiveIndices([]);
  setStatus('Idle');
  setExplanation('✅ Sorting complete!');
}
