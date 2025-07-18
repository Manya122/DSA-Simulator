import { motion } from 'framer-motion';

export default function BarChart({ array, activeIndices }) {
  const BAR_WIDTH = 20;
  const BAR_GAP = 4;
  const containerWidth = array.length * (BAR_WIDTH + BAR_GAP);

  return (
    <div className="relative h-64 border p-4 rounded bg-white dark:bg-gray-800 shadow overflow-hidden flex justify-center">
      <div
        className="relative h-full"
        style={{ width: `${containerWidth}px` }}
      >
        {array.map((value, idx) => (
          <motion.div
            key={value + '-' + idx}
            initial={false}
            animate={{
              x: idx * (BAR_WIDTH + BAR_GAP),
              scale: activeIndices.includes(idx) ? 1.1 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              mass: 0.3,
            }}
            className={`absolute bottom-0 ${
              activeIndices.includes(idx) ? 'bg-red-400 z-10' : 'bg-blue-500'
            } rounded-t`}
            style={{
              width: `${BAR_WIDTH}px`,
              height: `${value * 2}px`,
            }}
            title={value}
          />
        ))}
      </div>
    </div>
  );
}
