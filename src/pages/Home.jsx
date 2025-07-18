import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="px-6 py-10 max-w-[1440px] mx-auto">
      {/* 🎯 HERO SECTION */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-4">
          🧠 DSA Simulator
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Visualize core Data Structures and Algorithms like never before.  
          Step-by-step, interactive, beginner-friendly, and beautifully animated.
        </p>
        <div className="mt-6">
          <Link
            to="/visualizer/bubble-sort"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            🚀 Start Visualizing
          </Link>
        </div>
      </div>

      {/* 🔃 Sorting Algorithms */}
      <Section title="🔃 Sorting Algorithms">
        <Card label="Bubble Sort" to="/visualizer/bubble-sort" emoji="🔁" />
        <Card label="Selection Sort" to="/visualizer/selection-sort" emoji="📌" />
        <Card label="Insertion Sort" to="/visualizer/insertion-sort" emoji="🪛" />
        <Card label="Merge Sort" to="/visualizer/merge-sort" emoji="🧬" />
        <Card label="Quick Sort" to="/visualizer/quick-sort" emoji="⚡" />
      </Section>

      {/* 🔍 Searching Algorithms */}
      <Section title="🔍 Searching Algorithms">
        <Card label="Linear Search" to="/visualizer/linear-search" emoji="📋" />
        <Card label="Binary Search" to="/visualizer/binary-search" emoji="🧠" />
      </Section>

      {/* 🧱 Data Structures */}
      <Section title="🧱 Data Structures">
        <Card label="Linked List Operations" to="/visualizer/linked-list" emoji="🔗" />
        <Card label="Queue Operations" to="/visualizer/queue" emoji="📥" />
        <Card label="Stack Operations" to="/visualizer/stack" emoji="📚" />
        <Card label="Binary Tree Operations" to="/visualizer/tree" emoji="🌳" />
      </Section>

      <p className="mt-16 text-sm text-center text-gray-400">
        Built with 💙 by Manya Sharma
      </p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {children}
      </div>
    </div>
  );
}

function Card({ label, to, emoji }) {
  return (
    <Link
      to={to}
      className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm hover:shadow-md hover:border-blue-400 transition text-center flex flex-col items-center justify-center"
    >
      <div className="text-4xl mb-2">{emoji}</div>
      <div className="text-sm font-medium text-gray-800 dark:text-gray-100">{label}</div>
    </Link>
  );
}
