import { useState, useRef } from 'react';
import VisualizerLayout from '../../layouts/VisualizerLayout';
import FadeInContainer from '../../components/ui/FadeInContainer';
import CodeSnippet from '../../components/Code/CodeSnippet';
import LanguageSelector from '../../components/Code/LanguageSelector';
import PseudocodeViewer from '../../components/Pseudocode/PseudocodeViewer';
import StopButton from '../../components/Controls/StopButton';
import StatsDisplay from '../../components/Controls/StatsDisplay';

import {
  linkedListVisualizer,
  pseudocode,
  linkedListCodeSnippets as codeSnippets,
  getLinkedListExplanation,
} from '../../algorithms/linkedList';

export default function LinkedList() {
  const [list, setList] = useState([]);
  const [action, setAction] = useState('insertHead');
  const [value, setValue] = useState('');
  const [index, setIndex] = useState('');
  const [isSorting, setIsSorting] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [speed, setSpeed] = useState(400);
  const [stepCount, setStepCount] = useState(0);
  const [language, setLanguage] = useState('js');
  const abortRef = useRef(false);

  const reset = () => {
    if (isSorting) return;
    setList([]);
    setStepCount(0);
    setExplanation('');
    setValue('');
    setIndex('');
  };

  const startOperation = async () => {
    if (isSorting) return;

    const parsedValue = parseInt(value);
    const parsedIndex = parseInt(index);

    // ✅ Edge input checks
    const needsValue = action.startsWith('insert');
    const needsIndex = action.includes('Index');

    if (needsValue && isNaN(parsedValue)) {
      alert('Please enter a valid value to insert.');
      return;
    }
    if (needsIndex && (isNaN(parsedIndex) || parsedIndex < 0 || parsedIndex > list.length)) {
      alert(`Enter a valid index between 0 and ${list.length}`);
      return;
    }

    setIsSorting(true);
    abortRef.current = false;

    await linkedListVisualizer({
      list,
      setList,
      speed,
      type: action, // ✅ corrected key
      value: parsedValue,
      index: parsedIndex,
      setExplanation,
      abortRef,
    });


    setStepCount(sc => sc + 1);
    setIsSorting(false);
  };

  console.log("🔍 Available codeSnippets:", codeSnippets);
  console.log("🔍 Selected language:", language);
  console.log("🔍 Selected action:", action);

  return (
    <VisualizerLayout title="🧶 Linked List Visualizer" complexity={{ worst: 'O(n)', best: 'O(1)', avg: 'O(n)' }}>
      <FadeInContainer>
        {/* ➕ Controls */}
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <select
            value={action}
            onChange={e => setAction(e.target.value)}
            disabled={isSorting}
            className="border px-3 py-1 rounded dark:bg-gray-800 dark:text-white"
          >
            <option value="insertHead">Insert at Head</option>
            <option value="insertTail">Insert at Tail</option>
            <option value="insertAtIndex">Insert at Index</option>
            <option value="deleteHead">Delete at Head</option>
            <option value="deleteTail">Delete at Tail</option>
            <option value="deleteAtIndex">Delete at Index</option>

          </select>

          {(action.startsWith('insert')) && (
            <input
              type="number"
              placeholder="Value"
              value={value}
              onChange={e => setValue(e.target.value)}
              disabled={isSorting}
              className="border px-2 py-1 rounded dark:bg-gray-800 dark:text-white"
            />
          )}

          {(action.includes('Index')) && (
            <input
              type="number"
              placeholder="Index"
              value={index}
              onChange={e => setIndex(e.target.value)}
              disabled={isSorting}
              className="border px-2 py-1 rounded dark:bg-gray-800 dark:text-white"
            />
          )}

          <button
            onClick={startOperation}
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

        {/* 💬 Explanation Box */}
        {explanation && (
          <div className="mb-4 p-4 bg-yellow-100 text-black dark:bg-yellow-200 dark:text-gray-900 rounded shadow">
            {explanation}
          </div>
        )}

        {/* 🔗 Linked List Display */}
        <div className="mb-6 flex gap-4 overflow-x-auto border p-4 rounded items-center">
          {list.length === 0 ? (
            <span className="text-gray-500 dark:text-gray-300">List is empty</span>
          ) : (
            list.map((v, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="px-3 py-2 border border-gray-400 rounded text-center dark:text-white dark:border-gray-500">
                  {v}
                </div>
                {i < list.length - 1 && <span className="text-lg text-gray-600 dark:text-gray-300">➡️</span>}
              </div>
            ))
          )}
        </div>

        {/* 🧠 Pseudocode & Code */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1">
            {Array.isArray(pseudocode[action]) && (
              <PseudocodeViewer pseudocode={pseudocode[action]} currentLine={null} />
            )}
          </div>
          <div className="flex-1">
            <LanguageSelector selected={language} setSelected={setLanguage} isSorting={isSorting} />
            {codeSnippets?.[language]?.[action] ? (
              <CodeSnippet
                code={codeSnippets[language][action]}
                language={language}
                currentLine={null}
              />
            ) : (
              <p className="text-red-500">⚠️ Code not available for "{language.toUpperCase()}"</p>
            )}
          </div>
        </div>
      </FadeInContainer>
    </VisualizerLayout>
  );
}
