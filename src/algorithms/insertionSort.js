import { sleep } from '../utils/sleep';

export const pseudocode = [
  'for i = 1 to n-1',
  '  key = arr[i]',
  '  j = i - 1',
  '  while j >= 0 and arr[j] > key',
  '    arr[j + 1] = arr[j]',
  '    j = j - 1',
  '  arr[j + 1] = key',
];

export const codeSnippets = {
  cpp: [
    'for (int i = 1; i < n; i++) {',
    '  int key = arr[i];',
    '  int j = i - 1;',
    '  while (j >= 0 && arr[j] > key) {',
    '    arr[j + 1] = arr[j];',
    '    j = j - 1;',
    '  }',
    '  arr[j + 1] = key;',
    '}',
  ],
  python: [
    'for i in range(1, n):',
    '  key = arr[i]',
    '  j = i - 1',
    '  while j >= 0 and arr[j] > key:',
    '    arr[j + 1] = arr[j]',
    '    j -= 1',
    '  arr[j + 1] = key',
  ],
  java: [
    'for (int i = 1; i < n; i++) {',
    '  int key = arr[i];',
    '  int j = i - 1;',
    '  while (j >= 0 && arr[j] > key) {',
    '    arr[j + 1] = arr[j];',
    '    j--;',
    '  }',
    '  arr[j + 1] = key;',
    '}',
  ],
  js: [
    'for (let i = 1; i < n; i++) {',
    '  let key = arr[i];',
    '  let j = i - 1;',
    '  while (j >= 0 && arr[j] > key) {',
    '    arr[j + 1] = arr[j];',
    '    j--;',
    '  }',
    '  arr[j + 1] = key;',
    '}',
  ],
};

export const getInsertionExplanation = (i, j, key, moved) => {
  if (moved) {
    return `🔁 Moving ${key} left past ${j}: shifting ${j} right`;
  }
  return `✅ Placing ${key} at correct position`;
};

export async function insertionSortVisualizer({
  array,
  setArray,
  setActiveIndices,
  setCurrentLine,
  setStepCount,
  setComparisonCount,
  setSwapCount,
  setExplanation,
  speed,
  getInsertionExplanation,
  abortRef,
  setStatus,
}) {
  const arr = [...array];
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    if (abortRef?.current) return;
    setCurrentLine(0);
    await sleep(speed);
    setStepCount((prev) => prev + 1);

    let key = arr[i];
    let j = i - 1;
    setCurrentLine(1);
    await sleep(speed);

    while (j >= 0 && arr[j] > key) {
      if (abortRef?.current) return;

      setCurrentLine(3);
      setActiveIndices([j, j + 1]);
      setExplanation(getInsertionExplanation(i, j, key, true));
      setComparisonCount((prev) => prev + 1);
      await sleep(speed);

      arr[j + 1] = arr[j];
      setArray([...arr]);
      await sleep(speed);

      j--;
    }

    setCurrentLine(5);
    arr[j + 1] = key;
    setArray([...arr]);
    setExplanation(getInsertionExplanation(i, j, key, false));
    setSwapCount((prev) => prev + 1);
    await sleep(speed);
  }

  setCurrentLine(null);
  setActiveIndices([]);
}
