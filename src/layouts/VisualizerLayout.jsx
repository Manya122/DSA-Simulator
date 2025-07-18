// src/layouts/VisualizerLayout.jsx
export default function VisualizerLayout({ title, complexity, children }) {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-4">
        {title}
      </h2>

      <div className="mb-4 text-sm text-gray-600 font-medium dark:text-gray-300">
        ⏱️ <span className="text-blue-600 font-semibold dark:text-blue-400">Time Complexity</span> — 
        Worst: <code>{complexity.worst}</code>, Best: <code>{complexity.best}</code>, Avg: <code>{complexity.avg}</code>
      </div>

      {children}
    </div>
  );
}
