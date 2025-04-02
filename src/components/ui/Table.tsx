import React from 'react';
import { clsx } from 'clsx';

interface Column {
  key: string;
  title: string;
  sticky?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
  selectedRows?: string[];
  onSelectRow?: (id: string) => void;
  onSelectAll?: (checked: boolean) => void;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data = [],
  onRowClick,
  selectedRows = [],
  onSelectRow,
  onSelectAll
}) => {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="relative">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[var(--color-bg-tertiary)] border-y border-[var(--color-border)]">
            {onSelectRow && (
              <th className={clsx(
                "w-12 py-3 px-4 sticky left-0 z-20 bg-[var(--color-bg-tertiary)]",
                "after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[1px] after:bg-[var(--color-border)]"
              )}>
                <input
                  type="checkbox"
                  checked={selectedRows.length === safeData.length && safeData.length > 0}
                  onChange={(e) => onSelectAll?.(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                />
              </th>
            )}
            {columns.map((column, index) => (
              <th
                key={column.key}
                className={clsx(
                  "py-3 px-4 text-left text-[15px] font-semibold text-[var(--color-text-primary)]",
                  column.sticky && "sticky left-0 z-20 bg-[var(--color-bg-tertiary)]",
                  column.sticky && "after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[1px] after:bg-[var(--color-border)]",
                  column.sticky && onSelectRow && "left-[48px]"
                )}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {safeData.map((row, index) => (
            <tr
              key={row?.id || Math.random()}
              onClick={() => onRowClick?.(row)}
              className={clsx(
                'transition-colors text-[15px]',
                index % 2 === 0 
                  ? 'bg-[var(--color-bg-secondary)]' 
                  : 'bg-[var(--color-bg-tertiary)]',
                selectedRows.includes(row?.id) && 'bg-[var(--color-accent)]20 border border-[var(--color-accent)]',
                !selectedRows.includes(row?.id) && 'hover:bg-[var(--color-accent)]10',
                onRowClick && 'cursor-pointer',
                'text-[var(--color-text-primary)]'
              )}
            >
              {onSelectRow && (
                <td className={clsx(
                  "py-3 px-4 border-b border-[var(--color-border)] sticky left-0 z-10",
                  index % 2 === 0 ? 'bg-[var(--color-bg-secondary)]' : 'bg-[var(--color-bg-tertiary)]',
                  "after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[1px] after:bg-[var(--color-border)]"
                )}>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row?.id)}
                    onChange={() => row?.id && onSelectRow(row.id)}
                    className="w-4 h-4 rounded border-gray-300 text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
              )}
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={clsx(
                    "py-3 px-4 border-b border-[var(--color-border)]",
                    column.sticky && "sticky left-0 z-10",
                    column.sticky && onSelectRow && "left-[48px]",
                    column.sticky && index % 2 === 0 ? 'bg-[var(--color-bg-secondary)]' : 'bg-[var(--color-bg-tertiary)]',
                    column.sticky && "after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[1px] after:bg-[var(--color-border)]"
                  )}
                >
                  {column.render 
                    ? column.render(row?.[column.key], row)
                    : row?.[column.key] ?? 'N/A'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};