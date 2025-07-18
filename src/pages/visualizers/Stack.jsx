// src/pages/visualizers/Stack.jsx
import { useState, useRef } from 'react';
import VisualizerLayout from '../../layouts/VisualizerLayout';
import FadeInContainer from '../../components/ui/FadeInContainer';
import CodeSnippet from '../../components/Code/CodeSnippet';
import LanguageSelector from '../../components/Code/LanguageSelector';
import PseudocodeViewer from '../../components/Pseudocode/PseudocodeViewer';
import StatsDisplay from '../../components/Controls/StatsDisplay';
import StopButton from '../../components/Controls/StopButton';

import { pseudocode, codeSnippets, stackVisualizer } from '../../algorithms/stack';

export default function Stack() {
  const [stack, setStack] = useState([]);
  const [action, setAction] = useState('push');
  const [value, setValue] = useState('');
  const [isSorting, setIsSorting] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [speed, setSpeed] = useState(500);
  const [stepCount, setStepCount] = useState(0);
  const [language, setLanguage] = useState('js');
  const abortRef = useRef(false);

  const startOp = async () => {
    if (isSorting) return;
    if (action === 'push' && isNaN(parseInt(value))) {
      alert('Enter a number to push');
      return;
    }
    setIsSorting(true);
    abortRef.current = false;
    await stackVisualizer({
      stack,
      setStack,
      setExplanation,
      speed,
      action,
      value: parseInt(value),
      abortRef,
    });
    setStepCount((sc) => sc + 1);
    setIsSorting(false);
  };

  const reset = () => {
    if (isSorting) return;
    setStack([]);
    setStepCount(0);
    setExplanation('');
  };

  return (
    <VisualizerLayout
      title="📚 Stack Visualizer"
      complexity={{ worst: 'O(1)', best: 'O(1)', avg: 'O(1)' }}
    >
      <FadeInContainer>
        {/* Controls */}
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            disabled={isSorting}
            className="border px-3 py-1 rounded dark:bg-gray-800 dark:text-white bg-white text-black"
          >
            <option value="push">Push</option>
            <option value="pop">Pop</option>
          </select>

          {action === 'push' && (
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={isSorting}
              placeholder="Value"
              className="border px-3 py-1 rounded dark:bg-gray-800 dark:text-white bg-white text-black"
            />
          )}

          <button
            onClick={startOp}
            disabled={isSorting}
            className="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            ▶️ Go
          </button>

          <button
            onClick={reset}
            disabled={isSorting}
            className="bg-gray-500 px-4 py-2 text-white rounded hover:bg-gray-600 disabled:opacity-50"
          >
            🔄 Reset
          </button>

          <StopButton
            isSorting={isSorting}
            onStop={() => (abortRef.current = true)}
          />
        </div>

        {/* Explanation Box */}
        {explanation && (
          <div className="mb-4 p-4 bg-yellow-100 text-black dark:bg-yellow-200 dark:text-gray-900 rounded shadow">
            {explanation}
          </div>
        )}

        {/* Stack Display */}
        <div className="mb-4">
          <div className="flex flex-col-reverse border p-4 h-48 overflow-y-auto rounded bg-white dark:bg-gray-800 dark:border-gray-600">
            {stack.map((v, i) => (
              <div
                key={i}
                className="p-2 border-b border-gray-300 dark:border-gray-600 text-center"
              >
                {v}
              </div>
            ))}
          </div>
        </div>

        {/* Language Selector & Code / Pseudocode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
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
          <PseudocodeViewer pseudocode={pseudocode} currentLine={null} />
        </div>

      </FadeInContainer>
    </VisualizerLayout>
  );
}
