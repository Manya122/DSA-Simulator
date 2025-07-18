// src/components/Code/CodeSnippet.jsx

export default function CodeSnippet({ codeSnippets, code, language, currentLine }) {
  let codeLines = [];

  // 📦 Case 1: Direct code array (used in LinkedList.jsx as `code={...}`)
  if (Array.isArray(code)) {
    codeLines = code;
  }
  // 🧠 Case 2: Full object (used in other pages)
  else if (codeSnippets && codeSnippets[language]) {
    // 📌 Case 2a: codeSnippets[language] is an array
    if (Array.isArray(codeSnippets[language])) {
      codeLines = codeSnippets[language];
    }
    // 📌 Case 2b: codeSnippets[language] is an object with operations
    else if (typeof codeSnippets[language] === 'object') {
      // Try to pick first available action's code (fallback mode)
      const keys = Object.keys(codeSnippets[language]);
      if (keys.length > 0) {
        codeLines = codeSnippets[language][keys[0]];
      }
    }
  }

  if (!codeLines || codeLines.length === 0) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded shadow">
        ⚠️ Code not available for "{language?.toUpperCase()}"
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow overflow-auto max-h-64">
      <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
        🧑‍💻 {language?.toUpperCase()} Code
      </h3>
      <pre className="text-sm font-mono space-y-1 text-gray-800 dark:text-gray-100">
        {codeLines.map((line, idx) => (
          <div
            key={idx}
            className={`px-2 py-1 rounded ${
              idx === currentLine
                ? 'bg-green-200 dark:bg-green-600 font-semibold text-black dark:text-white'
                : ''
            }`}
          >
            {line}
          </div>
        ))}
      </pre>
    </div>
  );
}
