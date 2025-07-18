import { useState, useEffect, useRef } from 'react';
import BarChart from '../../components/Visualization/BarChart';
import PseudocodeViewer from '../../components/Pseudocode/PseudocodeViewer';
import CodeSnippet from '../../components/Code/CodeSnippet';
import LanguageSelector from '../../components/Code/LanguageSelector';
import ControlPanel from '../../components/Controls/ControlPanel';
import StatsDisplay from '../../components/Controls/StatsDisplay';
import VisualizerLayout from '../../layouts/VisualizerLayout';
import FadeInContainer from '../../components/ui/FadeInContainer';
import StopButton from '../../components/Controls/StopButton';

import {
  pseudocode,
  codeSnippets,
  quickSortVisualizer,
  getQuickExplanation,
} from '../../algorithms/quickSort';

import { sleep } from '../../utils/sleep';

export default function QuickSort() {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);
  const [speed, setSpeed] = useState(500);
  const [explanation, setExplanation] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [stepCount, setStepCount] = useState(0);
  const [comparisonCount, setComparisonCount] = useState(0);
  const [swapCount, setSwapCount] = useState(0);
  const [status, setStatus] = useState('Idle');
  const abortRef = useRef(false);

  const ARRAY_SIZE = 20;

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    if (isSorting) return;
    setStepCount(0);
    setComparisonCount(0);
    setSwapCount(0);
    const newArray = Array.from({ length: ARRAY_SIZE }, () =>
      Math.floor(Math.random() * 100) + 10
    );
    setArray(newArray);
    setActiveIndices([]);
    setCurrentLine(null);
    setExplanation('');
  };

  const handleCustomArray = () => {
    if (isSorting) return;
    setStepCount(0);
    setComparisonCount(0);
    setSwapCount(0);

    const values = customInput
      .split(',')
      .map((val) => parseInt(val.trim()))
      .filter((num) => !isNaN(num) && num > 0);

    if (values.length === 0) {
      alert('Please enter valid comma-separated numbers.');
      return;
    }

    setArray(values);
    setActiveIndices([]);
    setCurrentLine(null);
    setExplanation('✅ Custom array set!');
  };

  const waitWhilePaused = async () => {
      // Pausing is not implemented in quick sort, but this is needed for consistency
      await sleep(0); // or simply return;
    };


  const startSort = async () => {
    if (isSorting) return;

    setIsSorting(true);
    setStatus('Sorting');
    abortRef.current = false;

    await quickSortVisualizer({
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
      setStatus,
      waitWhilePaused,
    });

    if (!abortRef.current) {
      setStatus('Idle');
      setExplanation('✅ Sorting complete!');
    }

    setIsSorting(false);
  };

  return (
    <VisualizerLayout
      title="⚡ Quick Sort Visualizer"
      complexity={{ worst: 'O(n²)', best: 'O(n log n)', avg: 'O(n log n)' }}
    >
      <div className="mb-2 font-semibold text-md text-purple-600 dark:text-purple-400">
        🔄 Status: {status}
      </div>

      <FadeInContainer>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="col-span-2">
            <BarChart array={array} activeIndices={activeIndices} />
          </div>
          <PseudocodeViewer pseudocode={pseudocode} currentLine={currentLine} />
        </div>

        {explanation && (
          <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-400 rounded text-sm font-medium text-gray-700 dark:bg-yellow-200 dark:text-gray-900">
            {explanation}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <ControlPanel
              speed={speed}
              setSpeed={setSpeed}
              customInput={customInput}
              setCustomInput={setCustomInput}
              handleCustomArray={handleCustomArray}
              startSort={startSort}
              resetArray={resetArray}
              isSorting={isSorting}
            />

            <StopButton
              isSorting={isSorting}
              onStop={() => {
                abortRef.current = true;
                setStatus('Stopped');
                setExplanation('⏹️ Sorting stopped!');
              }}
            />

            <StatsDisplay
              stepCount={stepCount}
              comparisonCount={comparisonCount}
              swapCount={swapCount}
            />
          </div>

          <div>
            <LanguageSelector
              selected={language}
              setSelected={setLanguage}
              isSorting={isSorting}
            />
            <CodeSnippet
              codeSnippets={codeSnippets}
              language={language}
              currentLine={currentLine}
            />
          </div>
        </div>
      </FadeInContainer>
    </VisualizerLayout>
  );
}
