import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Menu } from '@headlessui/react';
import clsx from 'clsx';

interface DateRange {
  start: Date;
  end: Date;
}

interface DateRangePickerProps {
  onChange: (range: DateRange) => void;
}

const presetRanges = [
  { label: 'Today', days: 0 },
  { label: 'Yesterday', days: 1 },
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 14 days', days: 14 },
  { label: 'Last 30 days', days: 30 },
  { label: 'This month', days: 'month' },
  { label: 'Last month', days: 'lastMonth' },
  { label: 'Custom range', days: 'custom' }
];

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ onChange }) => {
  const [selectedRange, setSelectedRange] = useState('Last 7 days');
  const [customRange, setCustomRange] = useState<DateRange>({
    start: new Date(),
    end: new Date()
  });

  const handleRangeSelect = (range: string, days: number | string) => {
    setSelectedRange(range);
    
    const end = new Date();
    let start = new Date();

    if (typeof days === 'number') {
      start.setDate(end.getDate() - days);
    } else if (days === 'month') {
      start = new Date(end.getFullYear(), end.getMonth(), 1);
    } else if (days === 'lastMonth') {
      start = new Date(end.getFullYear(), end.getMonth() - 1, 1);
      end.setDate(0); // Last day of previous month
    }

    const newRange = { start, end };
    setCustomRange(newRange);
    onChange(newRange);
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-md hover:bg-[var(--color-bg-tertiary)] transition-colors text-[var(--color-text-primary)]">
        <Calendar className="w-4 h-4 text-[var(--color-text-tertiary)]" />
        <span className="text-sm font-medium">{selectedRange}</span>
        <ChevronDown className="w-4 h-4 text-[var(--color-text-tertiary)]" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-1 w-56 bg-[var(--color-bg-secondary)] rounded-md shadow-lg border border-[var(--color-border)] py-1 z-50">
        {presetRanges.map((range) => (
          <Menu.Item key={range.label}>
            {({ active }) => (
              <button
                className={clsx(
                  'w-full text-left px-4 py-2 text-sm',
                  active 
                    ? 'bg-[var(--color-accent)]20 text-[var(--color-accent)]' 
                    : 'text-[var(--color-text-secondary)]'
                )}
                onClick={() => handleRangeSelect(range.label, range.days)}
              >
                {range.label}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};