//Componente que adapta los datos de las cards al formato que espera TableSearchBar para filtrar y buscar entre las cards

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
}: UniversalCardsFilterProps<T>) {
  const [filtersState, setFiltersState] = React.useState<Record<string, unknown>>({
    name: '', 
  });

  const tableAdapter = React.useMemo(() => ({
      getColumn: (columnId: string) => ({  
        getFilterValue: () => filtersState[columnId],
        setFilterValue: (value: unknown) =>
          setFiltersState((prev) => ({ ...prev, [columnId]: value })),
      }) as const,
    }),
    [filtersState]
  );

  const filtered = React.useMemo(() => {
    // q es el texto de búsqueda global
    const q = (filtersState['name'] as string) ?? '';

    // Normaliza y chequea inclusión
    const includesNorm = (data: unknown, query: string) => {
      if (!query) return true;
      // compara normalizado
      return normalizeFn(data).includes(normalizeFn(query));
    };

    // Función para chequear múltiples selecciones en un filtro
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

    // Recorre cada item y decide si pasa
    return items.filter((it) => {
      // 1) Búsqueda global sobre accessors.name (tú defines qué concatena)
      const globalPass = accessors.name ? includesNorm(accessors.name(it), q) : true;
      if (!globalPass) return false;

      // Filtros por columna
      for (const f of filters) {
        const key = f.value; // el id del filtro
        const sel = filtersState[key]; // la selección actual

        // saltar si no hay selección
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
  }, [items, filters, accessors, filtersState, multiMode, normalizeFn]);

  return (
    <div className="space-y-4">
      <TableSearchBar filters={filters} table={tableAdapter} />
      {render(filtered)}
    </div>
  );
}
