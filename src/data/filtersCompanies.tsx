import { listAreasOptionsConstants, listModalityOptionsConstants, listWorkingHoursOptionsConstants, sector } from "@/constants";
import { filterType } from "@/interfaces/table";
import { modal } from "@nextui-org/react";

export const filtersVacancies: filterType[] = [
  {
    value: 'sector',
    name: 'Sector',
    options: listAreasOptionsConstants
  },
  {
    value: 'createdAt',
    name: 'Fecha de solicitud',
    isDate: true,
  },
]