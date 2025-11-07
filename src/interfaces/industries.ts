// industries.ts
export enum Industry {
  Automotriz = 'automotriz',
  Aeroespacial = 'aeroespacial',
  TecnologiasInformacion = 'tecnologías_de_la_información',
  Manufactura = 'manufactura',
  LogisticaTransporte = 'logística_y_transporte',
  ConstruccionInmobiliario = 'construcción_e_inmobiliario',
  ServiciosFinancieros = 'servicios_financieros',
  Comercio = 'comercio',
  Educacion = 'educación',
  SaludFarmaceutica = 'salud_y_farmacéutica',
  AlimentosBebidas = 'alimentos_y_bebidas',
  TurismoHospitalidad = 'turismo_y_hospitalidad',
  ConsultoriaProfesional = 'consultoría_y_servicios_profesionales',
  EnergiaMedioAmbiente = 'energía_y_medio_ambiente',
  Telecomunicaciones = 'telecomunicaciones',
}

function prettyLabel(value: string): string {
  return value
    .replace(/_/g, ' ')                        // reemplaza guiones bajos por espacios
    .split(' ')                                // divide por palabras
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(' ');
}

export const INDUSTRY_OPTIONS = Object.values(Industry).map((value) => ({
  value,              // ej. 'energía_y_medio_ambiente'
  label: prettyLabel(value), // ej. 'Energía Y Medio Ambiente'

}));