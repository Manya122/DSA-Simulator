import {
  LayoutDashboard,
  Repeat,
  ListStart,
  ArrowRightLeft,
  Trees,
  Rows,
  Braces,
  Shuffle,
  Cable,
  Bolt,
  Search,
  Binary,
  ListOrdered,
  Split,
  StepForward,
  AlignVerticalJustifyCenter,
  ListTree,
} from 'lucide-react';

export const sidebarRoutes = [
  {
    category: 'General',
    links: [
      {
        name: 'Home',
        path: '/',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    category: 'Sorting Algorithms',
    links: [
      {
        name: 'Bubble Sort',
        path: '/visualizer/bubble-sort',
        icon: Repeat,
      },
      {
        name: 'Selection Sort',
        path: '/visualizer/selection-sort',
        icon: ListStart,
      },
      {
        name: 'Insertion Sort',
        path: '/visualizer/insertion-sort',
        icon: StepForward,
      },
      {
        name: 'Merge Sort',
        path: '/visualizer/merge-sort',
        icon: Split,
      },
      {
        name: 'Quick Sort',
        path: '/visualizer/quick-sort',
        icon: Bolt,
      },
    ],
  },

  {
    category: 'Searching Algorithms',
    links: [
      {
        name: 'Linear Search',
        path: '/visualizer/linear-search',
        icon: AlignVerticalJustifyCenter,
      },
      {
        name: 'Binary Search',
        path: '/visualizer/binary-search',
        icon: Binary,
      },
    ],
  },

  {
    category: 'Data Structures',
    links: [
      {
        name: 'Linked List Operations',
        path: '/visualizer/linked-list',
        icon: Cable,
      },
      
      {
        name: 'Queue Operations',
        path: '/visualizer/queue',
        icon: Rows,
      },
      {
        name: 'Stack Operations',
        path: '/visualizer/stack',
        icon: Braces,
      },
      {
        name: 'Binary Tree Operations',
        path: '/visualizer/tree',
        icon: ListTree,
      },
    ],
  },
];
