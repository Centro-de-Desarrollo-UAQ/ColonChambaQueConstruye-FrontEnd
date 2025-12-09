'use client';

import * as React from 'react';

import { filterType } from '@/interfaces/table';
import TableSearchBar from './TableSerchBar';

type AccessorValue = string | number | Date | string[] | null | undefined; 
type Accessors<data> = Record<string, (item: data) => AccessorValue>; //lista de accessors mapeados

type UniversalCardsFilterProps<data> = {
  items: data[];
  filters: filterType[];
  accessors: Accessors<data>;
  multiMode?: 'AND' | 'OR';
  render: (filtered: data[]) => React.ReactNode;
  normalizeFn?: (txt: unknown) => string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  activeFilters?: Record<string, unknown>;
  onFilterChange?: (columnId: string, value: unknown) => void;
};

//elimina espacios de los arrays y pasa todo a minusculas sin tildes
function defaultNormalize(txt: unknown) {
  if (txt == null) return '';
  const str = Array.isArray(txt) ? txt.join(' ') : String(txt);
  return str.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

export default function   UniversalCardsFilter<T>({
  items,
  filters,
  accessors,
  multiMode = 'AND',
  render,
  normalizeFn = defaultNormalize,
  searchValue,
  onSearchChange,
  activeFilters,
  onFilterChange,
}: UniversalCardsFilterProps<T>) {
  const [localFilters, setLocalFilters] = React.useState<Record<string, unknown>>({
    name: '',
  });

  React.useEffect(() => {
    if (searchValue === undefined) return;
    setLocalFilters((prev) =>
      prev.name === searchValue ? prev : { ...prev, name: searchValue },
    );
  }, [searchValue]);

  React.useEffect(() => {
    if (!activeFilters) return;
    setLocalFilters((prev) => {
      let changed = false;
      const next = { ...prev };

      Object.keys(next).forEach((key) => {
        if (key === 'name') return;
        if (!(key in activeFilters)) {
          delete next[key];
          changed = true;
        }
      });

      Object.entries(activeFilters).forEach(([key, value]) => {
        if (key === 'name') return;
        if (!Object.is(next[key], value)) {
          next[key] = value;
          changed = true;
        }
      });

      return changed ? next : prev;
    });
  }, [activeFilters]);

  const effectiveFilters = React.useMemo(() => {
    const base: Record<string, unknown> = {
      ...(activeFilters ?? localFilters),
    };

    const resolvedSearch =
      searchValue ??
      ((activeFilters as Record<string, unknown> | undefined)?.name as string | undefined) ??
      (localFilters.name as string | undefined) ??
      '';

    base.name = typeof resolvedSearch === 'string' ? resolvedSearch : '';

    return base;
  }, [activeFilters, localFilters, searchValue]);

  const updateLocalFilters = React.useCallback((columnId: string, value: unknown) => {
    setLocalFilters((prev) => {
      const next = { ...prev };
      const shouldRemove =
        value == null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0);

      if (columnId === 'name') {
        next.name = shouldRemove ? '' : value;
        return next;
      }

      if (shouldRemove) {
        if (columnId in next) {
          delete next[columnId];
          return next;
        }
        return prev;
      }

      if (!Object.is(next[columnId], value)) {
        next[columnId] = value;
        return next;
      }

      return prev;
    });
  }, []);

  const tableAdapter = React.useMemo(
    () => ({
      getColumn: (columnId: string) =>
        ({
          getFilterValue: () => effectiveFilters[columnId],
          setFilterValue: (value: unknown) => {
            if (columnId === 'name') {
              const normalized = typeof value === 'string' ? value : '';
              updateLocalFilters('name', normalized);
              onSearchChange?.(normalized);
            } else {
              updateLocalFilters(columnId, value);
              onFilterChange?.(columnId, value);
            }
          },
        }) as const,
    }),
    [effectiveFilters, updateLocalFilters, onSearchChange, onFilterChange],
  );

  const filtered = React.useMemo(() => {
    const q = typeof effectiveFilters['name'] === 'string' ? (effectiveFilters['name'] as string) : '';

    const includesNorm = (data: unknown, query: string) => {
      if (!query) return true;
      return normalizeFn(data).includes(normalizeFn(query));
    };

    const matchMulti = (value: AccessorValue, selected: string[]) => {
      if (!selected?.length) return true;

      // Compara texto o array como texto
      const source = Array.isArray(value)
        ? value.join(' ')
        : String(value ?? '') || '';
      const hay = normalizeFn(source);

      // Compara con cada selección
      if (multiMode === 'AND') {
        return selected.every((s) => hay.includes(normalizeFn(s)));
      } else {
        return selected.some((s) => hay.includes(normalizeFn(s)));
      }
    };

    return items.filter((it) => {
      const globalPass = accessors.name ? includesNorm(accessors.name(it), q) : true;
      if (!globalPass) return false;

      for (const f of filters) {
        const key = f.value; // el id del filtro
        const sel = effectiveFilters[key]; // la selección actual

        if (
          sel == null ||
          (Array.isArray(sel) && sel.length === 0) ||
          (typeof sel === 'string' && sel.length === 0)
        ) {
          continue;
        }

        const accessor = accessors[key];
        if (!accessor) continue; // si no definiste accessor para este filtro, lo ignoramos

        const val = accessor(it);

        if (f.isDate) {
          // fecha
          const selectedDate = Array.isArray(sel) ? sel[0] : sel;
          if (selectedDate) {
            const toYmd = (d: Date | string) => {
              const dd = d instanceof Date ? d : new Date(d);
              return dd.toISOString().slice(0, 10);
            };
            if (toYmd(val as any) !== toYmd(selectedDate as any)) return false;
          }
        } else {
          // checkboxes / multi / select como texto
          const selected = Array.isArray(sel) ? (sel as string[]) : [String(sel)];
          if (!matchMulti(val, selected)) return false;
        }
      }

      return true;
    });
  }, [items, filters, accessors, effectiveFilters, multiMode, normalizeFn]);

  return (
    <div className="space-y-4">
      <TableSearchBar filters={filters} table={tableAdapter} />
      {render(filtered)}
    </div>
  );
}
