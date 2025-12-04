import { listWorkingHoursOptionsConstants } from "@/constants";
import { filterType } from "@/interfaces/table";

export const filtersApplicant: filterType[] = [
{
  value: 'academicLevel',
    name: 'Nivel académico',
    options: [
        { label: 'Preparatoria', value: 'Preparatoria' },
        { label: 'Licenciatura', value: 'Licenciatura' },
        { label: 'Maestría', value: 'Maestría' },
        { label: 'Doctorado', value: 'Doctorado' },
    ]

},

{
  value: 'workShift',
  name: 'Jornada laboral',
  options: listWorkingHoursOptionsConstants
},

]