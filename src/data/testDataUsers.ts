import { User } from "@/interfaces/user";

export const testDataUser = [
  {
    id: 1,
    firstName: 'Lizeth',
    lastName: 'Mejía',
    recentPosition: 'Frontend Developer',
    careerSummary:
      "Desarrollador de software con 5 años de experiencia en aplicaciones web y móviles. Apasionado por la tecnología, el aprendizaje continuo y la resolución de problemas. He colaborado en proyectos de e-commerce, educación en línea y sistemas de gestión empresarial. Disfruta trabajar en equipo y compartir conocimientos con otros.",
    email: 'lizeth.mejia@example.com',
    phoneNumber: '+52 55 2123 4567',
    photoURL: '/images/users/lizeth.jpg',
  },
  {
    id: 2,
    firstName: 'Carlos',
    lastName: 'González',
    recentPosition: 'Backend Engineer',
    careerSummary:
      "Ingeniero de software especializado en arquitectura de aplicaciones web y microservicios. A lo largo de mi trayectoria he liderado el desarrollo de sistemas escalables en entornos de alta disponibilidad, aplicando principios de clean code, diseño orientado a dominios (DDD) y pruebas automatizadas. Me interesa combinar buenas prácticas técnicas con un enfoque humano en la colaboración y la resolución de problemas complejos. Actualmente, busco continuar aprendiendo sobre DevOps, seguridad y patrones de diseño modernos.",
    email: 'carlos.gonzalez@example.com',
    phoneNumber: '+52 55 3311 9988',
    photoURL: '/images/users/carlos.jpg',
  },
  {
    id: 3,
    firstName: 'María',
    lastName: 'Ruiz',
    recentPosition: 'Product Manager',
    careerSummary:
      "Profesional en gestión de producto con amplia experiencia coordinando equipos técnicos y de negocio para el desarrollo de soluciones digitales. He liderado el ciclo completo de productos, desde la investigación de usuarios y definición del roadmap hasta la entrega e iteración basada en métricas. Me apasiona alinear la visión estratégica de la empresa con las necesidades reales del usuario final, garantizando que cada funcionalidad entregada aporte un valor tangible y medible al negocio.",
    email: 'maria.ruiz@example.com',
    phoneNumber: '+52 1 998 234 1122',
    photoURL: '/images/users/maria.jpg',
  },
  {
    id: 4,
    firstName: 'Andrés',
    lastName: 'Pérez',
    recentPosition: 'QA Engineer',
    careerSummary:
      "Especialista en aseguramiento de la calidad con experiencia en automatización de pruebas y análisis funcional de software. Mi enfoque está orientado a garantizar la estabilidad y rendimiento de las aplicaciones antes de su despliegue en producción. He trabajado con herramientas como Cypress, Jest y Selenium, y colaborado estrechamente con equipos de desarrollo para mejorar la cobertura de pruebas y reducir los tiempos de entrega sin comprometer la calidad del producto final.",
    email: 'andres.perez@example.com',
    phoneNumber: '+52 81 1234 5678',
    photoURL: '/images/users/andres.jpg',
  },
  {
    id: 5,
    firstName: 'Sofía',
    lastName: 'López',
    recentPosition: 'UX/UI Designer',
    careerSummary:
      "Diseñadora UX/UI con experiencia en el diseño de productos digitales centrados en las personas. He trabajado en el análisis de flujos de interacción, creación de wireframes, diseño visual y pruebas de usabilidad. Mi prioridad es garantizar que cada producto sea intuitivo, accesible y coherente con la identidad de la marca. Disfruto trabajar en entornos colaborativos donde la empatía con el usuario y la iteración constante son clave para la innovación.",
    email: 'sofia.lopez@example.com',
    phoneNumber: '+52 55 6677 8899',
    photoURL: '/images/users/sofia.jpg',
  },
  {
    id: 6,
    firstName: 'Javier',
    lastName: 'Ramírez',
    recentPosition: 'DevOps Engineer',
    careerSummary:
      "Ingeniero DevOps con sólida experiencia implementando pipelines CI/CD, monitoreo de sistemas y despliegue automatizado en entornos cloud. He trabajado con Docker, Kubernetes y herramientas como Jenkins y GitHub Actions. Mi objetivo es optimizar los flujos de integración y entrega continua para aumentar la eficiencia del equipo y reducir los tiempos de despliegue, garantizando al mismo tiempo la seguridad y confiabilidad de las aplicaciones.",
    email: 'javier.ramirez@example.com',
    phoneNumber: '+52 33 4411 2233',
    photoURL: '/images/users/javier.jpg',
  },
  {
    id: 7,
    firstName: 'Ana',
    lastName: 'Torres',
    recentPosition: 'Data Scientist',
    careerSummary:
      "Científica de datos con experiencia en análisis predictivo, machine learning y procesamiento de grandes volúmenes de información. A lo largo de mi carrera he diseñado modelos de predicción y segmentación que han contribuido significativamente a la toma de decisiones estratégicas. Me apasiona combinar estadística, programación y visión de negocio para convertir los datos en soluciones prácticas y medibles.",
    email: 'ana.torres@example.com',
    phoneNumber: '+52 55 9000 1122',
    photoURL: '/images/users/ana.jpg',
  },
  {
    id: 8,
    firstName: 'Miguel',
    lastName: 'Santos',
    recentPosition: 'Fullstack Developer',
    careerSummary:
      "Desarrollador fullstack con dominio del ecosistema JavaScript, especializado en la creación de soluciones completas con Next.js, Node.js y MongoDB. Tengo experiencia integrando APIs externas, optimizando rendimiento y garantizando buenas prácticas de seguridad. Me motiva participar en proyectos desafiantes donde pueda aplicar mi conocimiento técnico de manera creativa para resolver problemas reales y generar impacto positivo.",
    email: 'miguel.santos@example.com',
    phoneNumber: '+52 55 7788 9900',
    photoURL: '/images/users/miguel.jpg',
  },
  {
    id: 9,
    firstName: 'Paola',
    lastName: 'Vargas',
    recentPosition: 'Business Analyst',
    careerSummary:
      "Analista de negocio enfocada en traducir requerimientos técnicos y comerciales en soluciones viables. He participado en proyectos de transformación digital donde la comunicación entre equipos y la claridad de la documentación fueron esenciales. Me considero una persona analítica, organizada y orientada a resultados, con la capacidad de entender tanto la visión estratégica del cliente como las limitaciones técnicas del desarrollo.",
    email: 'paola.vargas@example.com',
    phoneNumber: '+52 55 3344 5566',
    photoURL: '/images/users/paola.jpg',
  },
  {
    id: 10,
    firstName: 'Diego',
    lastName: 'Morales',
    recentPosition: 'Mobile Developer',
    careerSummary:
      "Desarrollador móvil especializado en React Native y Flutter. He diseñado e implementado aplicaciones multiplataforma optimizadas para rendimiento y experiencia de usuario. Me gusta mantenerme actualizado con las últimas tecnologías del ecosistema móvil y buscar constantemente formas de mejorar la usabilidad y la estabilidad del software. Mi meta es crear experiencias digitales fluidas que se sientan naturales en cualquier dispositivo.",
    email: 'diego.morales@example.com',
    phoneNumber: '+52 55 2233 4455',
    photoURL: '/images/users/diego.jpg',
  },
];
