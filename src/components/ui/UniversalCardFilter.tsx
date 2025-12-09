'use client';

import * as React from 'react';

import { filterType } from '@/interfaces/table';
import TableSearchBar from './TableSerchBar';

type AccessorValue = string | number | Date | string[] | null | undefined; 
type Accessors<data> = Record<string, (item: data) => AccessorValue>; 

type UniversalCardsFilterProps<data> = {
  items: data[];
  filters: filterType[];
  accessors: Accessors<data>;
  multiMode?: 'AND' | 'OR';
  render: (filtered: data[]) => React.ReactNode;
  normalizeFn?: (txt: unknown) => string;
  onFilterChange?: (key: string, value: string) => void;
  // NUEVO: Permite sincronizar el estado desde fuera
  activeFilters?: Record<string, string>;
};

function defaultNormalize(txt: unknown) {
  if (txt == null) return '';
  const str = Array.isArray(txt) ? txt.join(' ') : String(txt);
  return str.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

export default function UniversalCardsFilter<T>({
  items,
  filters,
  accessors,
  multiMode = 'AND',
  render,
  normalizeFn = defaultNormalize,
  onFilterChange,
  activeFilters, // Recibimos los filtros activos
}: UniversalCardsFilterProps<T>) {
  
  // Estado interno del TableSearchBar
  const [filtersState, setFiltersState] = React.useState<Record<string, unknown>>({
    name: '', 
  });

  // EFECTO DE SINCRONIZACIÓN:
  // Si activeFilters cambia (ej: limpiamos filtros desde fuera), actualizamos el estado interno
  React.useEffect(() => {
    if (activeFilters) {
      setFiltersState((prev) => {
        // Hacemos un merge inteligente para no sobreescribir 'name' (búsqueda texto) si no es necesario
        const nextState = { ...prev };
        let hasChanges = false;
        
        Object.entries(activeFilters).forEach(([key, value]) => {
           if (nextState[key] !== value) {
              nextState[key] = value;
              hasChanges = true;
           }
        });

        return hasChanges ? nextState : prev;
      });
    }
  }, [activeFilters]);

  const tableAdapter = React.useMemo(() => ({
      getColumn: (columnId: string) => ({  
        getFilterValue: () => filtersState[columnId],
        
        setFilterValue: (value: unknown) => {
          // 1. Actualización visual local inmediata
          setFiltersState((prev) => ({ ...prev, [columnId]: value }));

          // 2. Notificación al padre para petición API
          if (onFilterChange) {
            let valueToSend = '';
            // Convertimos el valor complejo del componente (Array, Date, etc) a string simple para la API
            if (Array.isArray(value)) {
               valueToSend = value.length > 0 ? String(value[0]) : ''; 
            } else if (value instanceof Date) {
               valueToSend = value.toISOString();
            } else if (value) {
               valueToSend = String(value);
            }
            onFilterChange(columnId, valueToSend);
          }
        },
      }) as const,
    }),
    [filtersState, onFilterChange]
  );

  // Lógica de filtrado local (se mantiene para búsquedas por texto 'name' y retrocompatibilidad)
  const filtered = React.useMemo(() => {
    const q = (filtersState['name'] as string) ?? '';

    const includesNorm = (data: unknown, query: string) => {
      if (!query) return true;
      return normalizeFn(data).includes(normalizeFn(query));
    };

    const matchMulti = (value: AccessorValue, selected: string[]) => {
      if (!selected?.length) return true;
      const source = Array.isArray(value)
        ? value.join(' ')
        : String(value ?? '') || '';
      const hay = normalizeFn(source);

      if (multiMode === 'AND') {
        return selected.every((s) => hay.includes(normalizeFn(s)));
      } else {
        return selected.some((s) => hay.includes(normalizeFn(s)));
      }
    };

    return items.filter((it) => {
      const globalPass = accessors.name ? includesNorm(accessors.name(it), q) : true;
      if (!globalPass) return false;

      // Nota: Si items ya viene filtrado del backend, esto solo re-valida lo que ya es true
      for (const f of filters) {
        const key = f.value;
        const sel = filtersState[key];

        if (
          sel == null ||
          (Array.isArray(sel) && sel.length === 0) ||
          (typeof sel === 'string' && sel.length === 0)
        ) {
          continue;
        }

        const accessor = accessors[key];
        if (!accessor) continue;

        const val = accessor(it);

        if (f.isDate) {
          const selectedDate = Array.isArray(sel) ? sel[0] : sel;
          if (selectedDate) {
            const toYmd = (d: Date | string) => {
              const dd = d instanceof Date ? d : new Date(d);
              return dd.toISOString().slice(0, 10);
            };
            if (toYmd(val as any) !== toYmd(selectedDate as any)) return false;
          }
        } else {
          const selected = Array.isArray(sel) ? (sel as string[]) : [String(sel)];
          if (!matchMulti(val, selected)) return false;
        }
      }

      return true;
    });
  }, [items, filters, accessors, effectiveFilters, multiMode, normalizeFn]);

  return (
    <div className="space-y-4">
      {/* Tu componente TableSearchBar se mantiene intacto */}
      <TableSearchBar filters={filters} table={tableAdapter} />
      {render(filtered)}
    </div>
  );
}