// src/pages/Tree.jsx
import { useState, useRef, useEffect } from 'react';
import VisualizerLayout from '../../layouts/VisualizerLayout';
import FadeInContainer from '../../components/ui/FadeInContainer';
import CodeSnippet from '../../components/Code/CodeSnippet';
import LanguageSelector from '../../components/Code/LanguageSelector';
import PseudocodeViewer from '../../components/Pseudocode/PseudocodeViewer';
import StopButton from '../../components/Controls/StopButton';

import { treeVisualizer, pseudocode, codeSnippets } from '../../algorithms/tree';
import TreeNodeWrapper from '../../components/Tree/TreeNodeWrapper';
import SVGOverlay from '../../components/Tree/SVGOverlay';

export default function Tree() {
  const [root, setRoot] = useState(null);
  const [action, setAction] = useState('insert');
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('js');
  const [explanation, setExplanation] = useState('');
  const [speed, setSpeed] = useState(400);
  const [highlighted, setHighlighted] = useState(null);
  const [arrows, setArrows] = useState([]);
  const abortRef = useRef(false);

  const handleStart = async () => {
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue)) {
      alert('Please enter a valid number.');
      return;
    }

    abortRef.current = false;

    await treeVisualizer({
      root,
      setRoot,
      value: parsedValue,
      action,
      setExplanation,
      speed,
      abortRef,
      setHighlighted,
    });
  };

  const handleReset = () => {
    setRoot(null);
    setValue('');
    setExplanation('');
    setHighlighted(null);
    setArrows([]);
  };

  // 🟡 Clear highlights after short delay
  useEffect(() => {
    if (highlighted !== null) {
      const timer = setTimeout(() => setHighlighted(null), speed * 2);
      return () => clearTimeout(timer);
    }
  }, [highlighted, speed]);

  // 🔄 Reset arrows when tree changes
  useEffect(() => {
    setArrows([]);
  }, [root]);

  return (
    <VisualizerLayout
      title="🌳 Tree Visualizer"
      complexity={{ worst: 'O(n)', avg: 'O(log n)', best: 'O(log n)' }}
    >
      <FadeInContainer>
        {/* 🔘 Controls */}
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="border px-3 py-1 rounded dark:bg-gray-800 dark:text-white"
          >
            <option value="insert">Insert</option>
            <option value="search">Search</option>
            <option value="delete">Delete</option>
          </select>

          <input
            type="number"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border px-2 py-1 rounded dark:bg-gray-800 dark:text-white"
          />

          <button
            onClick={handleStart}
            className="bg-green-500 px-4 py-1 text-white rounded hover:bg-green-600"
          >
            ▶️ Go
          </button>

          <button
            onClick={handleReset}
            className="bg-gray-500 px-4 py-1 text-white rounded hover:bg-gray-600"
          >
            🔄 Reset
          </button>

          <StopButton onStop={() => (abortRef.current = true)} isSorting={false} />
        </div>

        {/* 💬 Explanation */}
        {explanation && (
          <div className="mb-4 p-4 bg-yellow-100 text-black dark:bg-yellow-200 dark:text-gray-900 rounded shadow">
            {explanation}
          </div>
        )}

        {/* 🌲 Tree Render + Arrows */}
        <div
  id="tree-container"
  className="relative my-6 flex justify-center overflow-auto min-h-[300px]"
>
  <SVGOverlay arrows={arrows} />
  {root ? (
    <TreeNodeWrapper
      node={root}
      highlightedVal={highlighted}
      addArrow={(arrow) => setArrows((prev) => [...prev, arrow])}
    />
  ) : (
    <div className="text-gray-500 dark:text-gray-300">Tree is empty</div>
  )}
</div>


        {/* 👨‍💻 Code + Pseudocode */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1">
            <PseudocodeViewer pseudocode={pseudocode[action]} currentLine={null} />
          </div>
          <div className="flex-1">
            <LanguageSelector
              selected={language}
              setSelected={setLanguage}
              isSorting={false}
            />
            <CodeSnippet
              code={codeSnippets?.[language]?.[action]}
              language={language}
              currentLine={null}
            />
          </div>
        </div>
      </FadeInContainer>
    </VisualizerLayout>
  );
}
