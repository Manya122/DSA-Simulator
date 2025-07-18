// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import BubbleSort from './pages/visualizers/BubbleSort';
import SelectionSort from './pages/visualizers/SelectionSort';
import InsertionSort from './pages/visualizers/InsertionSort';
import MergeSort from './pages/visualizers/MergeSort';
import QuickSort from './pages/visualizers/QuickSort';
import LinearSearch from './pages/visualizers/LinearSearch';
import BinarySearch from './pages/visualizers/BinarySearch';
import Stack from './pages/visualizers/Stack';
import Queue from './pages/visualizers/Queue';
import LinkedList from './pages/visualizers/LinkedList';
import Tree from './pages/visualizers/Tree';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/visualizer/bubble-sort" element={<BubbleSort />} />
        <Route path="/visualizer/selection-sort" element={<SelectionSort />} />
        <Route path="/visualizer/insertion-sort" element={<InsertionSort />} />
        <Route path="/visualizer/merge-sort" element={<MergeSort />} />
        <Route path="/visualizer/quick-sort" element={<QuickSort />} />
        <Route path="/visualizer/linear-search" element={<LinearSearch />} />
        <Route path="/visualizer/binary-search" element={<BinarySearch />} />
        <Route path="/visualizer/stack" element={<Stack />} />
        <Route path="/visualizer/queue" element={<Queue />} />
        <Route path="/visualizer/linked-list" element={<LinkedList />} />
        <Route path="/visualizer/tree" element={<Tree />} />
      </Route>
    </Routes>
  );
}
