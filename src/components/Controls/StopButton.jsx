// src/components/Controls/StopButton.jsx
export default function StopButton({ onStop, isSorting }) {
  return (
    <button
      type="button"
      onClick={onStop}
      disabled={!isSorting}
      title="Stop the sorting process"
      className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
    >
      🛑 Stop
    </button>
  );
}
