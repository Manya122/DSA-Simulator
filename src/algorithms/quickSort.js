import { sleep } from '../utils/sleep';

export const pseudocode = [
  'quickSort(arr, low, high):',
  '  if low < high:',
  '    pi = partition(arr, low, high)',
  '    quickSort(arr, low, pi - 1)',
  '    quickSort(arr, pi + 1, high)',
];

export const codeSnippets = {
  cpp: [
    'void quickSort(int arr[], int low, int high) {',
    '  if (low < high) {',
    '    int pi = partition(arr, low, high);',
    '    quickSort(arr, low, pi - 1);',
    '    quickSort(arr, pi + 1, high);',
    '  }',
    '}',
  ],
  python: [
    'def quickSort(arr, low, high):',
    '  if low < high:',
    '    pi = partition(arr, low, high)',
    '    quickSort(arr, low, pi - 1)',
    '    quickSort(arr, pi + 1, high)',
  ],
  java: [
    'void quickSort(int[] arr, int low, int high) {',
    '  if (low < high) {',
    '    int pi = partition(arr, low, high);',
    '    quickSort(arr, low, pi - 1);',
    '    quickSort(arr, pi + 1, high);',
    '  }',
    '}',
  ],
  js: [
    'function quickSort(arr, low, high) {',
    '  if (low < high) {',
    '    let pi = partition(arr, low, high);',
    '    quickSort(arr, low, pi - 1);',
    '    quickSort(arr, pi + 1, high);',
    '  }',
    '}',
  ],
};

export const getQuickExplanation = (pivot, compared, i, j, swapped) => {
  if (swapped) {
    return `🔁 Swapping ${compared} and ${pivot} → index ${i} with ${j}`;
  }
  return `🧐 Comparing ${compared} with pivot ${pivot}`;
};

export async function quickSortVisualizer({
  array,
  setArray,
  setActiveIndices,
  setCurrentLine,
  setStepCount,
  setComparisonCount,
  setSwapCount,
  setExplanation,
  speed,
  getQuickExplanation,
  abortRef,
  waitWhilePaused,
  setStatus,
}) {
  const arr = [...array];

  const partition = async (low, high) => {
    const pivot = arr[high];
    let i = low - 1;
    setCurrentLine(0);
    await sleep(speed);

    for (let j = low; j < high; j++) {
      if (abortRef.current) return;
      await waitWhilePaused();

      setCurrentLine(1);
      setActiveIndices([j, high]);
      setComparisonCount((prev) => prev + 1);
      setExplanation(getQuickExplanation(pivot, arr[j], i + 1, j, false));
      await sleep(speed);

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        setSwapCount((prev) => prev + 1);
        setExplanation(getQuickExplanation(pivot, arr[j], i, j, true));
        await sleep(speed);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setSwapCount((prev) => prev + 1);
    setArray([...arr]);
    setExplanation(`✅ Placing pivot ${pivot} at index ${i + 1}`);
    setActiveIndices([i + 1]);
    await sleep(speed);
    return i + 1;
  };

  const quickSort = async (low, high) => {
    if (abortRef.current) return;
    if (low < high) {
      const pi = await partition(low, high);
      await quickSort(low, pi - 1);
      await quickSort(pi + 1, high);
    }
  };

  setStatus("Sorting");
  setStepCount((prev) => prev + 1);
  await quickSort(0, arr.length - 1);
  setCurrentLine(null);
  setActiveIndices([]);
}
