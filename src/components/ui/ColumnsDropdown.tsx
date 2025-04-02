import React from 'react';
import { Menu } from '@headlessui/react';
import { Columns, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

export interface ColumnOption {
  key: string;
  label: string;
  group: string;
}

interface ColumnsDropdownProps {
  columns: ColumnOption[];
  selectedColumns: string[];
  onColumnToggle: (columnKey: string) => void;
  onSelectAll: (checked: boolean) => void;
}

export const ColumnsDropdown: React.FC<ColumnsDropdownProps> = ({
  columns,
  selectedColumns,
  onColumnToggle,
  onSelectAll
}) => {
  // Group columns by their category
  const groupedColumns = columns.reduce((acc, column) => {
    if (!acc[column.group]) {
      acc[column.group] = [];
    }
    acc[column.group].push(column);
    return acc;
  }, {} as Record<string, ColumnOption[]>);

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="px-4 py-2 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors flex items-center space-x-2 text-[var(--color-text-primary)]">
        <Columns className="w-4 h-4" />
        <span>Columns</span>
        <ChevronDown className="w-4 h-4 ml-1" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-72 bg-[var(--color-bg-secondary)] rounded-lg shadow-lg border border-[var(--color-border)] py-2 z-50">
        {/* Select All Option */}
        <div className="px-4 py-2 border-b border-[var(--color-border)]">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedColumns.length === columns.length}
              onChange={(e) => onSelectAll(e.target.checked)}
              className="rounded border-[var(--color-border)] text-[var(--color-accent)]"
            />
            <span className="text-sm font-medium text-[var(--color-text-primary)]">
              Select All Columns
            </span>
          </label>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {Object.entries(groupedColumns).map(([group, groupColumns]) => (
            <div key={group} className="py-2">
              <div className="px-4 py-1">
                <h3 className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase">
                  {group}
                </h3>
              </div>
              <div className="space-y-1">
                {groupColumns.map((column) => (
                  <label
                    key={column.key}
                    className={clsx(
                      'flex items-center space-x-2 px-4 py-1.5 hover:bg-[var(--color-bg-tertiary)] cursor-pointer',
                      selectedColumns.includes(column.key) && 'bg-[var(--color-accent)]10'
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={selectedColumns.includes(column.key)}
                      onChange={() => onColumnToggle(column.key)}
                      className="rounded border-[var(--color-border)] text-[var(--color-accent)]"
                    />
                    <span className="text-sm text-[var(--color-text-primary)]">
                      {column.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};