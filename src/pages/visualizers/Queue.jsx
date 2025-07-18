import { useState, useRef } from 'react';
import VisualizerLayout from '../../layouts/VisualizerLayout';
import FadeInContainer from '../../components/ui/FadeInContainer';
import CodeSnippet from '../../components/Code/CodeSnippet';
import LanguageSelector from '../../components/Code/LanguageSelector';
import PseudocodeViewer from '../../components/Pseudocode/PseudocodeViewer';
import StopButton from '../../components/Controls/StopButton';
import StatsDisplay from '../../components/Controls/StatsDisplay';
import {
  pseudocode,
  codeSnippets,
  queueVisualizer,
  getQueueExplanation,
} from '../../algorithms/queue';

export default function Queue() {
  const [queue, setQueue] = useState([]);
  const [action, setAction] = useState('enqueue');
  const [value, setValue] = useState('');
  const [isSorting, setIsSorting] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [speed, setSpeed] = useState(500);
  const [stepCount, setStepCount] = useState(0);
  const [language, setLanguage] = useState('js');
  const abortRef = useRef(false);

  const MAX_CAPACITY = 10;

  const startOp = async () => {
    if (isSorting) return;

    if (action === 'enqueue') {
      const val = parseInt(value);
      if (isNaN(val)) {
        alert('Enter a number to enqueue');
        return;
      }
      if (queue.length >= MAX_CAPACITY) {
        setExplanation('🚫 Queue Overflow! Max capacity reached.');
        return;
      }
    }

    setIsSorting(true);
    abortRef.current = false;

    await queueVisualizer({
      queue,
      setQueue,
      setExplanation,
      speed,
      action,
      value: parseInt(value),
      abortRef,
    });

    setStepCount((s) => s + 1);
    setIsSorting(false);
  };

  const reset = () => {
    if (isSorting) return;
    setQueue([]);
    setExplanation('');
    setStepCount(0);
  };

  return (
    <VisualizerLayout title="🚶 Queue Visualizer" complexity={{ worst: 'O(1)', best: 'O(1)', avg: 'O(1)' }}>
      <FadeInContainer>

        {/* Controls */}
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            disabled={isSorting}
            className="border px-3 py-1 rounded dark:bg-gray-800 dark:text-white"
          >
            <option value="enqueue">Enqueue</option>
            <option value="dequeue">Dequeue</option>
          </select>

          {action === 'enqueue' && (
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={isSorting}
              placeholder="Value"
              className="border px-2 py-1 rounded dark:bg-gray-800 dark:text-white"
            />
          )}

          <button
            onClick={startOp}
            disabled={isSorting}
            className="bg-green-500 px-4 py-1 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            ▶️ Go
          </button>

          <button
            onClick={reset}
            disabled={isSorting}
            className="bg-gray-500 px-4 py-1 text-white rounded hover:bg-gray-600 disabled:opacity-50"
          >
            🔄 Reset
          </button>

          <StopButton isSorting={isSorting} onStop={() => (abortRef.current = true)} />
        </div>

        {/* Explanation */}
        {explanation && (
          <div className="mb-4 p-4 bg-yellow-100 text-black dark:bg-yellow-200 dark:text-gray-900 rounded shadow">
            {explanation}
          </div>
        )}

        {/* Queue Visualization */}
        <div className="mb-6 flex gap-4 overflow-x-auto border p-4 rounded bg-white dark:bg-gray-800">
          {queue.length === 0 ? (
            <div className="text-gray-400 italic">Queue is empty</div>
          ) : (
            queue.map((v, i) => (
              <div
                key={i}
                className="transition-all transform duration-300 p-2 border border-gray-400 rounded min-w-[50px] text-center text-xl font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-white"
              >
                {i === 0 ? '🟥' : '🟩'} <div>{v}</div>
              </div>
            ))
          )}
        </div>

        {/* Pseudocode + Code Snippet */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1">
            <PseudocodeViewer pseudocode={pseudocode} currentLine={null} />
          </div>
          <div className="flex-1">
            <LanguageSelector
              selected={language}
              setSelected={setLanguage}
              isSorting={isSorting}
            />
            <CodeSnippet
              codeSnippets={codeSnippets}
              language={language}
              currentLine={null}
            />
          </div>
        </div>

      </FadeInContainer>
    </VisualizerLayout>
  );
}
