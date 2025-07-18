import React from 'react';

export default function PseudocodeViewer({ pseudocode, currentLine }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow h-64 overflow-auto">
      <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-100">📄 Pseudocode</h3>
      <ul className="text-sm font-mono space-y-1">
        {pseudocode.map((line, idx) => (
          <li
            key={idx}
            className={`px-2 py-1 rounded ${
              idx === currentLine
                ? 'bg-yellow-200 font-bold text-black dark:bg-yellow-400'
                : 'dark:text-white'
            }`}
          >
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
