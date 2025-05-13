import { CompanyAdvertising, TargetGroup } from "@/interfaces";

export const careers1: string[] = [
    "Ingeniería en computación",
    "Enfermería",
    "Ingeniería de software",
    "Fisioterapia",
    "Biología",
    "Nutrición",
    "Estudios literarios",
    "Licenciatura en Administración",
    "Contador público",
    "Medicina",
    "Odontología",
    "Biotecnología"
];

export const careers2: string[] = [
    "Lenguas modernas inglés",
    "Psicología",
    "Innovación y gestión educativa",
    "Música",
    "Actuación",
    "Sociología",
    "Relaciones internacionales",
    "Derecho",
    "Historia",
    "Gastronomia",
    "Arquitectura",
    "Químico ambienral"
];

export const indicators: { title: string, description: string }[] = [
    {
        title: "+ 400 empresas",
        description: "Han publicado vacantes en bolsa de trabajo UAQ."
    },
    {
        title: "+ 2000 estudiantes",
        description: "Registrados buscando trabajo activamente."
    },
    {
        title: "Certificación ISO",
        description: "Contamos con certificación de cosas de empleo."
    }
];

export const fakeAdsCompanies: CompanyAdvertising[] = [
    {
        image: "https://lasempresasverdes.com/wp-content/uploads/2022/04/sustentabilidad-deloitte.jpg",
        title: "Deloitte",
        description: "Deloitte es la marca bajo la cual decenas de miles de profesionales comprometidos en firmas independientes alrededor del mundo, colaboran para otorgar servicios de auditoría, consultoría, asesoría financiera, administración de riesgos y servicios fiscales para sus clientes."
    },
    {
        image: "https://www.livemint.com/lm-img/img/2024/06/27/1600x900/Tata_Group_1719489239477_1719489239744.jpg",
        title: "Tata Group",
        description: "Tata Group es conocida por su participación en diversos sectores, incluida la fabricación de automóviles a través de su subsidiaria Tata Motors Limited, la cual cuenta con marcas emblemáticas como Jaguar Land Rover, Jaguar Cars y Tata Technologies, entre otras."
    },
    {
        image: "https://mexicoindustry.com/admin/images/notas/2021/04/grupo-hi-tec-realiza-su-open-house-2021-virtual-presentan-la-nueva-imagen-de-la-empresa-6644.jpg",
        title: "Grupo Hi-Tec",
        description: "Somos una empresa orgullosamente mexicana nacida en el año 1992, que ha sabido trascender fronteras. Siendo el proveedor líder de máquinas de Control Numérico Computarizado (CNC) de alto desempeño, herramentales y accesorios para la industria de maquinados de precisión en los diversos segmentos industriales."
    },
    {
        image: "https://www.pharmabiz.net/wp-content/uploads/2024/05/GerreSheimer.jpg",
        title: "Gerresheimer",
        description: "Gerresheimer AG es un fabricante alemán de productos de envasado primario para medicamentos y dispositivos de administración de fármacos fabricados con vidrio y plásticos especiales con sede en Düsseldorf para las industrias farmacéutica y cosmética."
    },
    {
        image: "https://kronox.com.mx/wp-content/uploads/2019/03/Silder-01-WEB-KK-2019.jpg",
        title: "Kronox & Kairos",
        description: "Participar en el crecimiento de las  MiPyme a través de la consultoría, desarrollo, tecnología y capacitación especializadas en sistemas Contpaqi, buscando promover el buen uso de los sistemas, para lograr hacer más eficientes los procesos administrativos y contables de nuestros clientes. Todo esto bajo un marco en donde predomine la honestidad y el profesionalismo."
    }
];

export const targetGroups: TargetGroup[] = [
    {
        adviceHref: "/advices/student",
        adviceText: "Consejos para estudiantes",
        description: "Estás a punto de culminar una etapa crucial en tu vida académica. Es el momento de poner en práctica todo lo que has aprendido y comenzar tu carrera profesional con el pie derecho.",
        image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        signInHref: "signin/uaq",
        signInText: "Regístrate como estudiante UAQ",
        title: "Para estudiantes UAQ de últimos semestres",

    },
    {
        adviceHref: "/advices/student",
        adviceText: "Consejos para egresados",
        description: "Tu tiempo en la universidad te ha preparado bien, y ahora es el momento de avanzar en tu carrera. Conéctate con empleadores que valoran tu formación y habilidades.",
        image: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        signInHref: "signin/uaq",
        signInText: "Regístrate como egresado UAQ",
        title: "Para egresados UAQ",
    },
    {
        adviceHref: "/advices/student",
        adviceText: "Consejos al buscar empleo",
        description: "Nuestra plataforma no solo es para estudiantes y egresados. Cualquier persona que busque mejorar su situación laboral o explorar nuevas oportunidades es bienvenida.",
        image: "https://images.pexels.com/photos/7578686/pexels-photo-7578686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        signInHref: "signin/uaq",
        signInText: "Regístrate",
        title: "Para público en general",
    },
];

export const faculties: { name: string, color: string, href: string }[] = [
    {
        color: "facArtes",
        name: "Facultad de artes",
        href: "https://fa.uaq.mx/"
    },
    {
        color: "facInformatica",
        name: "Facultad de informática",
        href: "https://www.uaq.mx/informatica/"
    },
    {
        color: "facIngenieria",
        name: "Facultad de ingniería",
        href: "https://ingenieria.uaq.mx/"
    },
    {
        color: "facConta",
        name: "Facultad de contaduría y administración",
        href: "https://fca.uaq.mx/"
    },
    {
        color: "facFilosofia",
        name: "Facultad de filosofía",
        href: "https://filosofia.uaq.mx/ffi_home/"
    },
    {
        color: "facLenguas",
        name: "Facultad de lenguas y letras",
        href: "https://fll.uaq.mx/"
    },
    {
        color: "facDerecho",
        name: "Facultad de derecho",
        href: ""
    },
    {
        color: "facEnfermeria",
        name: "Facultad de enfermería",
        href: "https://enfermeria.uaq.mx/"
    },
    {
        color: "facMedicina",
        name: "Facultad de medicina",
        href: "https://derecho.uaq.mx/"
    },
    {
        color: "facCiencias",
        name: "Facultad de ciencias naturales",
        href: "https://fcn.uaq.mx/"
    },
    {
        color: "facPoliticas",
        name: "Facultad de ciencias políticas y sociales",
        href: "https://fcps.uaq.mx/"
    },
    {
        color: "facPsicologia",
        name: "Facultad de psicología",
        href: "https://psicologia.uaq.mx/"
    },
    {
        color: "facQuimica",
        name: "Facultad de química",
        href: "https://quimica.unam.mx/"
    }
];