require('dotenv').config();

const connectDB = require('../config/db');
const Servicio = require('../models/Servicio');
const Veterinario = require('../models/Veterinario');
const Mascota = require('../models/Mascota');
const Promocion = require('../models/Promocion');
const Consejo = require('../models/Consejo');

const servicios = [
  {
    nombre: 'Consulta general',
    categoria: 'Medicina preventiva',
    descripcion: 'Valoración médica completa para detectar síntomas tempranos, revisar signos vitales y orientar a la familia sobre el estado general de la mascota.',
    precio: 350,
    duracionEstimada: '30 minutos',
    disponibilidad: true,
    imagen: 'https://placehold.co/600x400?text=Consulta+general',
    recomendaciones: [
      'Llevar cartilla de vacunación',
      'Acudir con ayuno solo si el veterinario lo indicó'
    ],
    beneficios: [
      'Detección oportuna de enfermedades',
      'Seguimiento personalizado del paciente'
    ]
  },
  {
    nombre: 'Vacunación',
    categoria: 'Prevención',
    descripcion: 'Aplicación de esquemas de vacunación para cachorros y mascotas adultas conforme a su edad, especie y estilo de vida.',
    precio: 280,
    duracionEstimada: '20 minutos',
    disponibilidad: true,
    imagen: 'https://placehold.co/600x400?text=Vacunacion',
    recomendaciones: [
      'Presentar historial clínico',
      'Evitar baño 24 horas antes y después'
    ],
    beneficios: [
      'Protección contra enfermedades infecciosas',
      'Refuerzo del sistema inmune'
    ]
  },
  {
    nombre: 'Desparasitación',
    categoria: 'Prevención',
    descripcion: 'Control de parásitos internos y externos con evaluación previa para elegir el tratamiento ideal según peso y edad.',
    precio: 220,
    duracionEstimada: '15 minutos',
    disponibilidad: true,
    imagen: 'https://placehold.co/600x400?text=Desparasitacion',
    recomendaciones: [
      'Informar peso aproximado',
      'Seguir calendario sugerido por el veterinario'
    ],
    beneficios: [
      'Mejor absorción de nutrientes',
      'Reduce el riesgo de contagio en casa'
    ]
  },
  {
    nombre: 'Estética canina',
    categoria: 'Higiene y bienestar',
    descripcion: 'Servicio de arreglo completo con corte de pelo, limpieza superficial y revisión general del estado del pelaje.',
    precio: 450,
    duracionEstimada: '60 minutos',
    disponibilidad: true,
    imagen: 'https://placehold.co/600x400?text=Estetica+canina',
    recomendaciones: [
      'Cepillar antes de acudir si es posible',
      'Avisar si la mascota es nerviosa'
    ],
    beneficios: [
      'Mejora la higiene',
      'Reduce nudos y acumulación de suciedad'
    ]
  },
  {
    nombre: 'Baño medicado',
    categoria: 'Dermatología',
    descripcion: 'Baño con productos dermatológicos indicados para mascotas con alergias, irritaciones o problemas de piel.',
    precio: 420,
    duracionEstimada: '50 minutos',
    disponibilidad: true,
    imagen: 'https://placehold.co/600x400?text=Bano+medicado',
    recomendaciones: [
      'No aplicar productos caseros antes de la cita',
      'Seguir indicaciones posteriores de secado y cepillado'
    ],
    beneficios: [
      'Disminuye comezón e irritación',
      'Ayuda a la recuperación de la piel'
    ]
  },
  {
    nombre: 'Corte de uñas',
    categoria: 'Higiene y bienestar',
    descripcion: 'Recorte seguro de uñas para prevenir dolor al caminar, rasguños accidentales y deformaciones posturales.',
    precio: 120,
    duracionEstimada: '15 minutos',
    disponibilidad: true,
    imagen: 'https://placehold.co/600x400?text=Corte+de+unas',
    recomendaciones: [
      'Llevar correa o transportadora',
      'Premiar a la mascota después del servicio'
    ],
    beneficios: [
      'Mejora la postura',
      'Evita lesiones y encarnamientos'
    ]
  },
  {
    nombre: 'Limpieza dental',
    categoria: 'Odontología',
    descripcion: 'Revisión oral y limpieza dental para reducir sarro, mal aliento y molestias al comer.',
    precio: 900,
    duracionEstimada: '90 minutos',
    disponibilidad: true,
    imagen: 'https://placehold.co/600x400?text=Limpieza+dental',
    recomendaciones: [
      'Confirmar si requiere ayuno',
      'Llevar estudios si fueron solicitados'
    ],
    beneficios: [
      'Disminuye riesgo de enfermedad periodontal',
      'Mejora el aliento y la salud oral'
    ]
  },
  {
    nombre: 'Urgencias',
    categoria: 'Atención inmediata',
    descripcion: 'Atención prioritaria para mascotas con signos de alarma, accidentes, vómito persistente o dificultad respiratoria.',
    precio: 750,
    duracionEstimada: 'Variable según el caso',
    disponibilidad: true,
    imagen: 'https://placehold.co/600x400?text=Urgencias',
    recomendaciones: [
      'Llamar antes de acudir si la situación lo permite',
      'Informar síntomas y tiempo de evolución'
    ],
    beneficios: [
      'Respuesta rápida',
      'Estabilización temprana del paciente'
    ]
  },
  {
    nombre: 'Cirugía menor',
    categoria: 'Procedimientos',
    descripcion: 'Procedimientos ambulatorios de baja complejidad con valoración previa, monitoreo y seguimiento postoperatorio.',
    precio: 2500,
    duracionEstimada: '2 horas',
    disponibilidad: true,
    imagen: 'https://placehold.co/600x400?text=Cirugia+menor',
    recomendaciones: [
      'Presentarse con estudios si fueron indicados',
      'Seguir protocolo de ayuno preoperatorio'
    ],
    beneficios: [
      'Resolución de problemas localizados',
      'Recuperación acompañada por el equipo médico'
    ]
  },
  {
    nombre: 'Hospitalización',
    categoria: 'Cuidados intensivos',
    descripcion: 'Monitoreo continuo para mascotas que necesitan observación médica, fluidoterapia o recuperación supervisada.',
    precio: 1800,
    duracionEstimada: 'Por día',
    disponibilidad: true,
    imagen: 'https://placehold.co/600x400?text=Hospitalizacion',
    recomendaciones: [
      'Dejar datos de contacto actualizados',
      'Consultar horarios de visita disponibles'
    ],
    beneficios: [
      'Supervisión continua',
      'Tratamiento controlado en un entorno seguro'
    ]
  },
  {
    nombre: 'Paseo de mascotas',
    categoria: 'Actividad física',
    descripcion: 'Paseos programados para mantener activa a la mascota, liberar energía y reforzar hábitos saludables.',
    precio: 180,
    duracionEstimada: '30 minutos',
    disponibilidad: true,
    imagen: 'https://placehold.co/600x400?text=Paseo+de+mascotas',
    recomendaciones: [
      'Indicar si usa arnés o correa especial',
      'Avisar si convive bien con otros animales'
    ],
    beneficios: [
      'Reduce estrés y ansiedad',
      'Favorece el control de peso'
    ]
  },
  {
    nombre: 'Entrenamiento básico',
    categoria: 'Conducta',
    descripcion: 'Sesiones iniciales para enseñar obediencia, comandos esenciales y mejorar la convivencia en casa.',
    precio: 650,
    duracionEstimada: '45 minutos',
    disponibilidad: true,
    imagen: 'https://placehold.co/600x400?text=Entrenamiento+basico',
    recomendaciones: [
      'Llevar premios o croquetas favoritas',
      'Asistir con una persona que conviva a diario con la mascota'
    ],
    beneficios: [
      'Fortalece la comunicación con la familia',
      'Reduce conductas no deseadas'
    ]
  }
];

const veterinarios = [
  {
    nombre: 'Dra. Sofía Ramírez',
    especialidad: 'Medicina interna',
    experiencia: '9 años de experiencia en diagnóstico clínico y seguimiento preventivo.',
    horario: 'Lunes a viernes de 9:00 a 17:00',
    disponibilidad: true,
    imagen: 'https://placehold.co/600x400?text=Dra+Sofia+Ramirez',
    descripcionProfesional: 'Especialista en medicina interna con enfoque en prevención, nutrición y acompañamiento integral para perros y gatos.'
  },
  {
    nombre: 'Dr. Mateo Hernández',
    especialidad: 'Cirugía y urgencias',
    experiencia: '11 años atendiendo procedimientos ambulatorios, trauma y emergencias veterinarias.',
    horario: 'Lunes a sábado de 10:00 a 18:00',
    disponibilidad: true,
    imagen: 'https://placehold.co/600x400?text=Dr+Mateo+Hernandez',
    descripcionProfesional: 'Médico veterinario con amplia experiencia en urgencias, estabilización de pacientes y cirugía de tejidos blandos.'
  },
  {
    nombre: 'Dra. Valeria Cruz',
    especialidad: 'Dermatología veterinaria',
    experiencia: '7 años en tratamiento de alergias, dermatitis y cuidado de piel y pelaje.',
    horario: 'Martes a sábado de 11:00 a 19:00',
    disponibilidad: true,
    imagen: 'https://placehold.co/600x400?text=Dra+Valeria+Cruz',
    descripcionProfesional: 'Apoya casos dermatológicos frecuentes y diseña rutinas de higiene adaptadas a la condición del paciente.'
  },
  {
    nombre: 'Dr. Diego Torres',
    especialidad: 'Medicina de animales pequeños y exóticos',
    experiencia: '8 años atendiendo conejos, aves, hámsters y mascotas de manejo especial.',
    horario: 'Miércoles a domingo de 9:00 a 15:00',
    disponibilidad: true,
    imagen: 'https://placehold.co/600x400?text=Dr+Diego+Torres',
    descripcionProfesional: 'Enfocado en bienestar, nutrición y atención preventiva de animales pequeños y especies no convencionales.'
  }
];

const mascotas = [
  {
    nombre: 'Perros',
    descripcion: 'Mascotas sociables y activas que requieren medicina preventiva, ejercicio y acompañamiento conductual.',
    cuidadosRecomendados: [
      'Vacunación y desparasitación periódicas',
      'Paseos diarios',
      'Cepillado y revisión de piel'
    ],
    serviciosSugeridos: [
      'Consulta general',
      'Vacunación',
      'Estética canina',
      'Paseo de mascotas',
      'Entrenamiento básico'
    ],
    imagen: 'https://placehold.co/600x400?text=Perros'
  },
  {
    nombre: 'Gatos',
    descripcion: 'Pacientes sensibles al estrés que se benefician de controles preventivos, cuidado dental y ambientes tranquilos.',
    cuidadosRecomendados: [
      'Mantener arenero limpio',
      'Revisiones dentales periódicas',
      'Control de peso y enriquecimiento ambiental'
    ],
    serviciosSugeridos: [
      'Consulta general',
      'Vacunación',
      'Desparasitación',
      'Limpieza dental'
    ],
    imagen: 'https://placehold.co/600x400?text=Gatos'
  },
  {
    nombre: 'Conejos',
    descripcion: 'Animales delicados que requieren dieta rica en fibra, revisión dental y monitoreo digestivo frecuente.',
    cuidadosRecomendados: [
      'Ofrecer heno fresco diariamente',
      'Revisar el crecimiento dental',
      'Evitar cambios bruscos de alimentación'
    ],
    serviciosSugeridos: [
      'Consulta general',
      'Desparasitación'
    ],
    imagen: 'https://placehold.co/600x400?text=Conejos'
  },
  {
    nombre: 'Aves',
    descripcion: 'Mascotas que necesitan vigilancia respiratoria, buena nutrición y revisión del plumaje y pico.',
    cuidadosRecomendados: [
      'Mantener jaula ventilada y limpia',
      'Proveer estímulos y periodos de descanso',
      'Monitorear cambios en apetito o canto'
    ],
    serviciosSugeridos: [
      'Consulta general',
      'Urgencias'
    ],
    imagen: 'https://placehold.co/600x400?text=Aves'
  },
  {
    nombre: 'Hámsters',
    descripcion: 'Pequeños roedores que requieren manipulación cuidadosa, higiene del hábitat y atención rápida ante signos de enfermedad.',
    cuidadosRecomendados: [
      'Mantener rueda y refugio limpios',
      'Evitar corrientes de aire',
      'Supervisar consumo de agua y alimento'
    ],
    serviciosSugeridos: [
      'Consulta general',
      'Urgencias'
    ],
    imagen: 'https://placehold.co/600x400?text=Hamsters'
  }
];

const promociones = [
  {
    titulo: 'Paquete cachorro sano',
    descripcion: 'Incluye consulta general, desparasitación y primera vacuna a precio preferencial.',
    descuento: '15%',
    imagen: 'https://placehold.co/600x400?text=Promo+Cachorro+Sano',
    vigencia: new Date('2028-12-31T23:59:59.000Z'),
    servicioRelacionado: 'Vacunación',
    activo: true
  },
  {
    titulo: 'Martes de sonrisa limpia',
    descripcion: 'Descuento especial en limpieza dental durante los martes del mes.',
    descuento: '20%',
    imagen: 'https://placehold.co/600x400?text=Promo+Limpieza+Dental',
    vigencia: new Date('2028-12-31T23:59:59.000Z'),
    servicioRelacionado: 'Limpieza dental',
    activo: true
  },
  {
    titulo: 'Spa para peludos',
    descripcion: 'Estética canina y corte de uñas con precio preferencial el mismo día.',
    descuento: '10%',
    imagen: 'https://placehold.co/600x400?text=Promo+Spa+Peludos',
    vigencia: new Date('2028-12-31T23:59:59.000Z'),
    servicioRelacionado: 'Estética canina',
    activo: true
  },
  {
    titulo: 'Promo vencida de ejemplo',
    descripcion: 'Promoción inactiva para validar que el endpoint solo devuelva vigentes.',
    descuento: '5%',
    imagen: 'https://placehold.co/600x400?text=Promo+Vencida',
    vigencia: new Date('2024-12-31T23:59:59.000Z'),
    servicioRelacionado: 'Consulta general',
    activo: false
  }
];

const consejos = [
  {
    titulo: 'Vacunas al día en perros',
    categoria: 'Prevención',
    descripcion: 'Mantener el esquema de vacunación completo ayuda a reducir el riesgo de enfermedades infecciosas.',
    imagen: 'https://placehold.co/600x400?text=Consejo+Perros+Vacunas',
    recomendacion: 'Agenda revisiones semestrales y conserva la cartilla en un lugar accesible.',
    nivelImportancia: 'Alta',
    mascotaRelacionada: 'Perros'
  },
  {
    titulo: 'Control del estrés en gatos',
    categoria: 'Bienestar',
    descripcion: 'Los gatos suelen manifestar estrés con cambios en apetito, escondite excesivo o marcaje.',
    imagen: 'https://placehold.co/600x400?text=Consejo+Gatos+Estres',
    recomendacion: 'Mantén rutinas estables y utiliza enriquecimiento ambiental como rascadores y repisas.',
    nivelImportancia: 'Media',
    mascotaRelacionada: 'Gatos'
  },
  {
    titulo: 'Fibra adecuada para conejos',
    categoria: 'Nutrición',
    descripcion: 'Una dieta baja en fibra puede afectar la digestión y el desgaste natural de los dientes.',
    imagen: 'https://placehold.co/600x400?text=Consejo+Conejos+Fibra',
    recomendacion: 'Prioriza heno fresco y complementa con vegetales indicados por el veterinario.',
    nivelImportancia: 'Alta',
    mascotaRelacionada: 'Conejos'
  },
  {
    titulo: 'Signos de alerta en aves',
    categoria: 'Urgencias',
    descripcion: 'Respirar con dificultad, estar emboladas o dejar de vocalizar puede indicar un problema serio.',
    imagen: 'https://placehold.co/600x400?text=Consejo+Aves+Urgencias',
    recomendacion: 'Busca atención veterinaria rápida y evita automedicar.',
    nivelImportancia: 'Alta',
    mascotaRelacionada: 'Aves'
  },
  {
    titulo: 'Limpieza del hábitat del hámster',
    categoria: 'Higiene',
    descripcion: 'La acumulación de humedad y residuos favorece malos olores y enfermedades.',
    imagen: 'https://placehold.co/600x400?text=Consejo+Hamsters+Higiene',
    recomendacion: 'Limpia el sustrato de forma regular y evita productos perfumados fuertes.',
    nivelImportancia: 'Media',
    mascotaRelacionada: 'Hámsters'
  },
  {
    titulo: 'Cuidado dental preventivo en perros y gatos',
    categoria: 'Odontología',
    descripcion: 'El sarro y la inflamación de encías pueden avanzar sin síntomas evidentes al inicio.',
    imagen: 'https://placehold.co/600x400?text=Consejo+Dental+Perros+Gatos',
    recomendacion: 'Pregunta por limpieza dental si notas mal aliento persistente o dificultad para masticar.',
    nivelImportancia: 'Alta',
    mascotaRelacionada: 'Perros'
  }
];

async function seedDatabase() {
  try {
    await connectDB();

    await Promise.all([
      Servicio.deleteMany({}),
      Veterinario.deleteMany({}),
      Mascota.deleteMany({}),
      Promocion.deleteMany({}),
      Consejo.deleteMany({})
    ]);

    await Promise.all([
      Servicio.insertMany(servicios),
      Veterinario.insertMany(veterinarios),
      Mascota.insertMany(mascotas),
      Promocion.insertMany(promociones),
      Consejo.insertMany(consejos)
    ]);

    console.log('Seed completado correctamente para Hound Hub.');
    process.exit(0);
  } catch (error) {
    console.error('Error al ejecutar el seed:', error.message);
    process.exit(1);
  }
}

seedDatabase();
