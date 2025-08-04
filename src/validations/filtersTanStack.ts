import { FilterFn } from '@tanstack/react-table';
import { normalizeText } from '@/lib/utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const accentInsensitiveTextFilter: FilterFn<any> = (row, columnId, filterValue) => {
  const cellValue = row.getValue<string>(columnId);
  return normalizeText(cellValue ?? '').includes(normalizeText(filterValue));
};