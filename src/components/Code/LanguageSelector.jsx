import React from 'react';

export default function LanguageSelector({ selected, setSelected, disabled }) {
  const languages = ['cpp', 'python', 'java', 'js'];

  return (
    <div className="mb-2 flex gap-2 items-center">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">💻 Code Language:</label>
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => setSelected(lang)}
          disabled={disabled}
          className={`px-2 py-1 rounded text-xs transition-colors duration-200 ${
            selected === lang
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
