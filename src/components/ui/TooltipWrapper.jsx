import * as Tooltip from '@radix-ui/react-tooltip';

export default function TooltipWrapper({ children, label }) {
  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="right"
            className="z-50 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-sm"
            sideOffset={8}
          >
            {label}
            <Tooltip.Arrow className="fill-gray-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
