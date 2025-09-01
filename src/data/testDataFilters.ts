type filterType = {
  value: string;
  name: string;
  options?: string[];
  isDate?: boolean;
};

export const testDataFilters: filterType[] = [
  {
    value: 'sector',
    name: 'Sector',
    options: [
      'Tecnología',
      'Salud',
      'Educación',
      'Finanzas',
      'Marketing',
      'Ingeniería',
      'Ventas',
      'Recursos Humanos',
      'Logística',
      'Construcción',
    ],
  },
  {
    value: 'createdAt',
    name: 'Fecha de solicitud',
    isDate: true,
  },
  {
    value: 'updatedAt',
    name: 'Fecha de revisión',
    isDate: true,
  },
];
