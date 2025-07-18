// src/components/Controls/ControlPanel.jsx
import React from 'react';

export default function ControlPanel({
  speed,
  setSpeed,
  customInput,
  setCustomInput,
  handleCustomArray,
  startSort,
  resetArray,
  isSorting,
  customLabel = 'Start',
  showTargetInput = false,
  target = '',
  setTarget = () => {},
}) {
  return (
    <div className="space-y-4">
      {/* Speed Slider */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">⏱️ Speed</label>
        <input
          type="range"
          min="100"
          max="1000"
          step="100"
          value={speed}
          disabled={isSorting}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-300">
          <span>Fast</span>
          <span>Slow</span>
        </div>
      </div>

      {/* Custom Input */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          ✍️ Enter your array (comma-separated):
        </label>
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          disabled={isSorting}
          placeholder="e.g. 34, 12, 7, 89, 3"
          className="px-3 py-2 border border-gray-300 rounded shadow-sm disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <button
          onClick={handleCustomArray}
          disabled={isSorting}
          className="self-start px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          ➕ Set Array
        </button>
      </div>

      {/* Target Input (for search algorithms) */}
      {showTargetInput && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
            🎯 Enter value to search:
          </label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            disabled={isSorting}
            placeholder="e.g. 42"
            className="px-3 py-2 border border-gray-300 rounded shadow-sm disabled:opacity-50 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={startSort}
          disabled={isSorting}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          ▶️ {customLabel}
        </button>
        <button
          onClick={resetArray}
          disabled={isSorting}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
}
