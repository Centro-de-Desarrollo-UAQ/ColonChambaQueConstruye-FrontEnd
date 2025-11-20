'use client';

import { useMemo, useState } from 'react';
import TitleSectionIconLeft from '@/components/common/TitleSection IconLeft';

import ApplicantCompanyCard from '@/components/applicant/applicatCompanyCard';
import { ApplicantCompanyCardProps } from '@/interfaces/applicantCompanyCard';
import SearchBar from '@/components/toreview/searchbar';
import FormOptions from '@/components/forms/FormOptions';
import { Form, FormProvider, useForm } from 'react-hook-form';
import { Industry, INDUSTRY_OPTIONS } from '@/interfaces/industries';
import FormRegisterDate from '@/components/forms/FormDate';

const fakeData: ApplicantCompanyCardProps[] = [
  {
    title: "Frontend Developer (React/Next.js)",
    company: "Deloitte",
    description:
      "Únete al equipo de innovación digital de Deloitte, donde transformarás ideas en experiencias visuales interactivas. Como Frontend Developer trabajarás con React, Next.js y Tailwind CSS para construir interfaces modernas, dinámicas y accesibles. Participarás en proyectos de alto impacto para clientes internacionales, colaborando con diseñadores UI/UX y desarrolladores backend. Se espera que domines buenas prácticas de responsive design, optimización de rendimiento y mantenibilidad del código. ",
    logoUrl: "/Deloitte.svg",
    contact: "Omar Aguilar",
    correo: "omaroaguilar@gmail.com",
    industry: Industry.TecnologiasInformacion,
    registerDate: "2025-11-03T10:30:00Z",
  },
  {
    title: "Backend Engineer (Node.js / NestJS)",
    company: "Google México",
    description:
      "Como Backend Engineer formarás parte del equipo de desarrollo de servicios escalables de Google. Trabajarás con Node.js, NestJS y bases de datos relacionales y NoSQL para diseñar arquitecturas limpias y eficientes. Serás responsable de mantener la seguridad, rendimiento y consistencia de la información en entornos distribuidos. Colaborarás con equipos de frontend, DevOps y producto para desplegar microservicios en producción. En este rol se valoran habilidades para resolver problemas complejos, documentar APIs REST y aplicar buenas prácticas de versionado y testing. Ideal para ingenieros que disfrutan optimizar cada línea de código y construir soluciones de alto impacto global.",
    logoUrl: "/Google.svg",
    contact: "María Cortés",
    correo: "maria.cortes@google.com",
    industry: Industry.TecnologiasInformacion
  },
  {
    title: "UI/UX Designer",
    company: "Globant",
    description:
      "Globant busca un diseñador con enfoque integral que combine creatividad, empatía y conocimiento técnico. Tu papel será traducir requerimientos de negocio en experiencias visuales centradas en el usuario. Diseñarás flujos de interacción, wireframes y prototipos funcionales con herramientas como Figma y Adobe XD. Colaborarás estrechamente con los equipos de desarrollo para garantizar la coherencia entre diseño y código. Si disfrutas analizar el comportamiento de los usuarios, proponer soluciones visuales elegantes y mejorar constantemente la usabilidad de los productos digitales, esta posición te permitirá llevar tu talento al siguiente nivel dentro de un entorno internacional.",
    logoUrl: "/Globant.svg",
    contact: "Javier Torres",
    correo: "jtorres@globant.com",
    industry: Industry.TecnologiasInformacion
  },
  {
    title: "Mobile Developer (React Native)",
    company: "Mercado Libre",
    description:
      "Forma parte del equipo de desarrollo móvil de Mercado Libre y contribuye a una de las apps más utilizadas en Latinoamérica. Usando React Native, tu misión será implementar nuevas funciones, optimizar el rendimiento y mantener una experiencia fluida para millones de usuarios. Trabajarás con arquitecturas modernas, integración continua y herramientas de analítica móvil. Este rol requiere conocimientos sólidos en consumo de APIs, gestión de estado y despliegue en App Store y Play Store. Además, colaborarás con equipos multidisciplinarios para definir nuevas estrategias de crecimiento digital. Un puesto ideal para desarrolladores que buscan impacto real en un entorno de alta exigencia tecnológica.",
    logoUrl: "/MercadoLibre.svg",
    contact: "Daniela Suárez",
    correo: "daniela.suarez@mercadolibre.com",
    industry: Industry.TecnologiasInformacion
  },
  {
    title: "Data Analyst (Python / Power BI)",
    company: "BBVA",
    description:
      "Como analista de datos en BBVA, tendrás la oportunidad de transformar grandes volúmenes de información en conocimiento accionable. Trabajarás con Python, SQL y Power BI para crear dashboards interactivos, modelos predictivos y reportes estratégicos para la toma de decisiones. Formarás parte de un equipo interdisciplinario enfocado en analítica avanzada, inteligencia de negocio y automatización de procesos. Este puesto requiere curiosidad, atención al detalle y pasión por convertir datos en historias claras y visuales. Serás clave para detectar patrones de comportamiento de clientes y optimizar productos financieros en toda la región.",
    logoUrl: "/BBVA.svg",
    contact: "Luis Pérez",
    correo: "lperez@bbva.com",
    industry: Industry.Manufactura
  },
  {
    title: "DevOps Engineer",
    company: "IBM Cloud",
    description:
      "En IBM Cloud buscamos un DevOps Engineer con visión integral y pensamiento automatizador. Tu función será implementar pipelines CI/CD, administrar contenedores con Docker y Kubernetes, y garantizar la disponibilidad continua de los servicios. También trabajarás con monitoreo, logging centralizado y herramientas de infraestructura como código (Terraform, Ansible). Este rol requiere colaboración constante con los equipos de desarrollo para lograr despliegues estables, rápidos y seguros. Si te apasiona la nube, la eficiencia operativa y los entornos escalables, IBM te ofrece un espacio ideal para crecer en proyectos globales de innovación tecnológica.",
    logoUrl: "/IBM.svg",
    contact: "Ana Ramírez",
    correo: "ana.ramirez@ibm.com",
    industry: Industry.Automotriz
  },
];

type Filters = {
  modality: string;
  workdayType: string;
  state: string;
  industry?: Industry | ''
  registerDate?:string
};


const normalize = (s = '') =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim();

export default function JobsPage() {

    

  const methods = useForm<Filters>({
    defaultValues: {
      modality: '',
      workdayType: '',
      state: '',
      industry:'',
      registerDate:''
    },
  });

  const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const isOnOrAfter = (dateISO?: string, from?: Date) => {
  if (!from) return true;          // sin filtro → pasa
  if (!dateISO) return false;      // card sin fecha → no pasa
  const d = new Date(dateISO);
  if (Number.isNaN(d.getTime())) return false;
  return d >= from;                // desde 'from' hasta ahora
};



  const [searchTags, setSearchTags] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    const trimmed = query.trim();

    if (!trimmed) {
      setSearchTags([]);
      return;
    }

    const tags = trimmed
      .split(/[,\s]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    setSearchTags(tags);
  };

 const { control, watch } = methods;
 const selectedIndustry = watch('industry'); 
 const registerDate = watch('registerDate');

 const filteredJobs = useMemo(() => {
  
  const byText = !searchTags.length
    ? fakeData
    : fakeData.filter((job) => {
        const tagsNorm = searchTags.map(normalize);
        const haystack = normalize(
          [job.title, job.company, job.description, job.contact, job.correo]
            .filter(Boolean)
            .join(' ')
        );
        return tagsNorm.some((t) => haystack.includes(t));
      });

  
   const byIndustry = selectedIndustry
    ? byText.filter((job) => job.industry === selectedIndustry)
    : byText;

  // 3) fecha: desde registerDate → ahora
  if (!registerDate) return byIndustry;

  const from = startOfDay(new Date(registerDate)); // YYYY-MM-DD
  return byIndustry.filter((job) => isOnOrAfter(job.registerDate, from));
}, [searchTags, selectedIndustry, registerDate]);



  const sectionConfig2 = {
    talents: {
      title: 'BUSQUEDAS DE EMPRESAS',
      description: '',
    },
  };



  return (
    <>

      <div className="flex w-full flex-col items-center justify-center gap-3">
        <div className="w-8/12 pt-5 text-lg">
          <TitleSectionIconLeft currentSection="talents" sections={sectionConfig2} />
        </div>

      {/*SearchBar pero sin ser la centralizada*/}
      <div className='w-8/12'>
        <SearchBar
                onSearch={handleSearch}
                placeholder="Escribe palabras clave (ej. React, remoto, Querétaro, UX)"
              />
      </div>
       
        {/* Filtros funcionales, falta acomodarlos de manera visual, pero toma el espacio marcado y sin centralizar  */}
        <div className="w-8/12 mt-3 mb-3">
          <FormProvider {...methods}>
            <Form className="flex gap-3">
              <FormOptions
                control={control}
                name="industry"
                type="combobox"
                placeholder="Giro de la empresa"
                options={INDUSTRY_OPTIONS}
                
                className="!text-brand border-brand bg-uaq-white-ghost rounded-full font-medium"
              />

              <FormRegisterDate
                name="registerDate"
                label="Desde (fecha de publicación)"
                className='flex'
                
              />       
            </Form>
          </FormProvider>
        </div>
      

        {filteredJobs.length ? (
          filteredJobs.map((job, index) => <ApplicantCompanyCard key={index} job={job} />)
        ) : (
          <div className="py-10 text-center text-zinc-400">
            <p className="font-medium">No se encontraron vacantes que coincidan con tu búsqueda.</p>
            <p className="text-sm">Prueba con otras palabras clave o elimina filtros.</p>
          </div>
        )}
      </div>
    </>
  );
}
