import { sleep } from '../utils/sleep';

export const pseudocode = [
  'for i = 0 to n-1',
  '  minIndex = i',
  '  for j = i+1 to n',
  '    if arr[j] < arr[minIndex]',
  '      minIndex = j',
  '  swap(arr[i], arr[minIndex])',
];

export const codeSnippets = {
  cpp: [
    'for (int i = 0; i < n - 1; i++) {',
    '  int minIndex = i;',
    '  for (int j = i + 1; j < n; j++) {',
    '    if (arr[j] < arr[minIndex]) {',
    '      minIndex = j;',
    '    }',
    '  }',
    '  swap(arr[i], arr[minIndex]);',
    '}',
  ],
  python: [
    'for i in range(len(arr)):',
    '  min_idx = i',
    '  for j in range(i+1, len(arr)):',
    '    if arr[j] < arr[min_idx]:',
    '      min_idx = j',
    '  arr[i], arr[min_idx] = arr[min_idx], arr[i]',
  ],
  java: [
    'for (int i = 0; i < arr.length - 1; i++) {',
    '  int minIndex = i;',
    '  for (int j = i + 1; j < arr.length; j++) {',
    '    if (arr[j] < arr[minIndex]) {',
    '      minIndex = j;',
    '    }',
    '  }',
    '  int temp = arr[minIndex];',
    '  arr[minIndex] = arr[i];',
    '  arr[i] = temp;',
    '}',
  ],
  js: [
    'for (let i = 0; i < arr.length; i++) {',
    '  let minIndex = i;',
    '  for (let j = i + 1; j < arr.length; j++) {',
    '    if (arr[j] < arr[minIndex]) {',
    '      minIndex = j;',
    '    }',
    '  }',
    '  [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];',
    '}',
  ],
};

export const getSelectionExplanation = (a, b, minIdx, j, updated) => {
  if (updated) {
    return `🔁 Comparing ${a} and ${b} → new minIndex = ${j} (${b})`;
  } else {
    return `🧐 Comparing ${a} and ${b} → minIndex remains at ${minIdx}`;
  }
};

export async function selectionSortVisualizer({
  array,
  setArray,
  setActiveIndices,
  setCurrentLine,
  setStepCount,
  setComparisonCount,
  setSwapCount,
  setExplanation,
  speed,
  getSelectionExplanation,
  abortRef,
  waitWhilePaused,
  setStatus,
}) {
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    if (abortRef?.current) return;
    await waitWhilePaused();

    setCurrentLine(0);
    setStepCount((prev) => prev + 1);
    await sleep(speed);

    let minIndex = i;
    setCurrentLine(1);
    await sleep(speed);

    for (let j = i + 1; j < n; j++) {
      if (abortRef?.current) {
        setStatus("Stopped");
        setExplanation("⏹️ Sorting stopped!");
        return;
      }
      await waitWhilePaused();

      setCurrentLine(2);
      setActiveIndices([j, minIndex]);
      setComparisonCount((prev) => prev + 1);
      await sleep(speed);

      const isNewMin = arr[j] < arr[minIndex];
        setExplanation(
          getSelectionExplanation(arr[minIndex], arr[j], minIndex, j, isNewMin)
        );
        setCurrentLine(3);
        await sleep(speed);

        if (isNewMin) {
          minIndex = j;
          setCurrentLine(4);
          await sleep(speed);
        }

    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      setArray([...arr]);
      setSwapCount((prev) => prev + 1);
      setCurrentLine(5);
      await sleep(speed);
    }
  }

  setCurrentLine(null);
  setActiveIndices([]);
}
