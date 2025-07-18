// src/components/Controls/StatsDisplay.jsx
import React from 'react';

export default function StatsDisplay({ stepCount, comparisonCount, swapCount }) {
  return (
    <div className="text-sm font-medium text-gray-700 dark:text-gray-200 flex flex-col sm:flex-row gap-4 mt-2">
      <div>🔢 Total Outer loop passes: {stepCount}</div>
      <div>🔍 Comparisons: {comparisonCount}</div>
      <div>🔄 Swaps: {swapCount}</div>
    </div>
  );
}
