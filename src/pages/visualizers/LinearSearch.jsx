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
  linearSearchVisualizer,
  getLinearExplanation,
} from '../../algorithms/linearSearch';

export default function LinearSearch() {
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
  const [status, setStatus] = useState('Idle');
  const [target, setTarget] = useState('');
  const abortRef = useRef(false);

  const ARRAY_SIZE = 20;

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    if (isSorting) return;
    setStepCount(0);
    setComparisonCount(0);
    setTarget('');
    setArray(Array.from({ length: ARRAY_SIZE }, () => Math.floor(Math.random() * 100) + 10));
    setActiveIndices([]);
    setCurrentLine(null);
    setExplanation('');
  };

  const handleCustomArray = () => {
    if (isSorting) return;
    setStepCount(0);
    setComparisonCount(0);

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

  const startSearch = async () => {
  if (isSorting) return;

  let numTarget = parseInt(target);
  if (target === '' || isNaN(numTarget)) {
    const random = array[Math.floor(Math.random() * array.length)];
    numTarget = random;
    setTarget(random); // So it updates in the UI
    setExplanation(`🎯 No input provided. Random target selected: ${random}`);
  }

  setIsSorting(true);
  setStatus('Searching');
  abortRef.current = false;

  await linearSearchVisualizer({
    array,
    setArray,
    setActiveIndices,
    setCurrentLine,
    setStepCount,
    setComparisonCount,
    setExplanation,
    speed,
    getLinearExplanation,
    target: numTarget,
    abortRef,
    waitWhilePaused: async () => {},
    setStatus,
  });

  setIsSorting(false);
};

  return (
    <VisualizerLayout
      title="🔍 Linear Search Visualizer"
      complexity={{ worst: 'O(n)', best: 'O(1)', avg: 'O(n)' }}
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
              startSort={startSearch}
              resetArray={resetArray}
              isSorting={isSorting}
              customLabel="Search"
              showTargetInput
              target={target}
              setTarget={setTarget}
            />

            <StopButton
              isSorting={isSorting}
              onStop={() => {
                abortRef.current = true;
                setStatus('Stopped');
                setExplanation('⏹️ Search stopped!');
              }}
            />

            <StatsDisplay
              stepCount={stepCount}
              comparisonCount={comparisonCount}
              swapCount={0}
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
