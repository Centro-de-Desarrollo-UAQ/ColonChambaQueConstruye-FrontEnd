import { FilterFn } from '@tanstack/react-table';
import { normalizeText, toYMD } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const accentInsensitiveTextFilter: FilterFn<any> = (row, columnId, filterValue) => {
  const cellValue = row.getValue<string>(columnId);
  return normalizeText(cellValue ?? '').includes(normalizeText(filterValue));
};

export const  dateSameDay: FilterFn<any> = (row, columnId, value) => {
  // value: Date | undefined
  if (!value) return true;
  const cell = row.getValue(columnId);
  if (!cell) return false;
  const cellDate =
    cell instanceof Date
      ? cell
      : typeof cell === 'string' || typeof cell === 'number'
        ? new Date(cell)
        : undefined;
  if (!cellDate) return false;
  const target = value instanceof Date ? value : new Date(value);
  return toYMD(cellDate) === toYMD(target);
};