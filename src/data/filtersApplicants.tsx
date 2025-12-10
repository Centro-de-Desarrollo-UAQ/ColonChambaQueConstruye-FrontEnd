import { listDegreesOptionsConstants } from "@/constants";
import { filterType } from "@/interfaces/table";

export const filtersApplicant: filterType[] = [
{
  value: 'academicLevel',
    name: 'Nivel académico',
    options: listDegreesOptionsConstants

},
{
  value: 'dateFilter',
  name: 'Fecha de publicación',
  isDate: true,
}



]