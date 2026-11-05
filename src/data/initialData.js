// ============================================================
// DATOS SEMILLA INICIALES - SISTEMA HOGAR MADRE TERESA (VIALE)
// ============================================================

export const INITIAL_AUTORIDAD_MUNICIPAL = {
  nombre_completo: "Bibiana Rojas",
  cargo: "Secretaría de Desarrollo Social y Humano",
  organismo: "Municipalidad de Viale",
  rol_institucional: "Representante Municipal a Cargo del Hogar Madre Teresa",
  foto_url: "/assets/bibiana_rojas.png?v=3"
};

export const INITIAL_PROFESIONALES = [
  // 1. COORDINACIÓN GENERAL
  {
    id: "prof-3",
    nombre_completo: "Lic. María del Valle Rojas",
    dni: "31.277.616",
    profesion: "Coordinadora · Lic. en Enfermería y Vacunación",
    especialidad: "Coordinación Asistencial y Epidemiología",
    matricula_provincial: "M.P. 23639 - Entre Ríos",
    sector: "coordinacion",
    sector_nombre: "Coordinación General",
    role: "admin_clinico",
    acceso_clinico: true,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M10 25 C30 5 45 45 65 20 C85 5 110 35 140 18 T170 25' fill='none' stroke='%230f172a' stroke-width='2.2' stroke-linecap='round'/></svg>",
    activo: true
  },

  // 2. EQUIPO MÉDICO
  {
    id: "prof-1",
    nombre_completo: "Dra. Emilia Montu",
    dni: "33.253.982",
    profesion: "Médica Especialista",
    especialidad: "Clínica Médica y Atención Gerontológica",
    matricula_provincial: "M.P. 11686 - Entre Ríos",
    sector: "medica",
    sector_nombre: "Atención Médica",
    role: "medica",
    acceso_clinico: true,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M10 35 Q40 5 70 30 T130 20 Q150 40 170 15' fill='none' stroke='%230f172a' stroke-width='2.2' stroke-linecap='round'/></svg>",
    activo: true
  },

  // 3. EQUIPO INTERDISCIPLINARIO
  {
    id: "prof-7",
    nombre_completo: "Lic. María Carla Trocello",
    dni: "32.256.615",
    profesion: "Licenciada en Nutrición",
    especialidad: "Nutrición Clínica del Adulto Mayor",
    matricula_provincial: "M.P. 510 - Entre Ríos",
    sector: "interdisciplinario",
    sector_nombre: "Equipo Interdisciplinario",
    role: "profesional_salud",
    acceso_clinico: true,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M15 35 Q40 15 80 30 T130 15 Q150 35 170 25' fill='none' stroke='%230f172a' stroke-width='2.1' stroke-linecap='round'/></svg>",
    activo: true
  },
  {
    id: "prof-5",
    nombre_completo: "Lic. María José Bordagaray",
    dni: "34.040.258",
    profesion: "Licenciada en Psicología",
    especialidad: "Psicogerontología y Acompañamiento Emocional",
    matricula_provincial: "M.P. 2141 - Entre Ríos",
    sector: "interdisciplinario",
    sector_nombre: "Equipo Interdisciplinario",
    role: "profesional_salud",
    acceso_clinico: true,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M20 30 C40 5 60 45 90 20 C120 10 140 35 165 15' fill='none' stroke='%230f172a' stroke-width='2' stroke-linecap='round'/></svg>",
    activo: true
  },
  {
    id: "prof-2",
    nombre_completo: "Lic. Gabriela Soledad Paul",
    dni: "35.708.288",
    profesion: "Licenciada en Trabajo Social",
    especialidad: "Gerontología Social y Redes Comunitarias",
    matricula_provincial: "M.P. 1177 - Entre Ríos",
    sector: "interdisciplinario",
    sector_nombre: "Equipo Interdisciplinario",
    role: "profesional_salud",
    acceso_clinico: true,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M15 25 C35 10 50 45 75 20 C100 5 120 40 165 25' fill='none' stroke='%230f172a' stroke-width='2' stroke-linecap='round'/></svg>",
    activo: true
  },
  {
    id: "prof-4",
    nombre_completo: "Lic. Giuliana Soledad Deagustini",
    dni: "38.544.792",
    profesion: "Licenciada en Kinesiología y Fisiatría",
    especialidad: "Rehabilitación Motriz y Prevención de Caídas",
    matricula_provincial: "M.P. 1669 - Entre Ríos",
    sector: "interdisciplinario",
    sector_nombre: "Equipo Interdisciplinario",
    role: "profesional_salud",
    acceso_clinico: true,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M15 40 Q45 10 80 35 T140 10 Q160 30 170 20' fill='none' stroke='%230f172a' stroke-width='2.2' stroke-linecap='round'/></svg>",
    activo: true
  },

  // 4. ESTIMULACIÓN Y TALLERES
  {
    id: "prof-6",
    nombre_completo: "Alfonsina Kossrow",
    dni: "41.931.806",
    profesion: "Técnica Superior en Psicomotricidad",
    especialidad: "Estimulación Psicomotriz y Neurocognitiva",
    matricula_provincial: "M.P. 28885 - Entre Ríos",
    sector: "talleres",
    sector_nombre: "Talleres y Estimulación",
    role: "tallerista",
    acceso_clinico: false,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M10 25 Q35 5 70 35 T120 20 T165 30' fill='none' stroke='%230f172a' stroke-width='2' stroke-linecap='round'/></svg>",
    activo: true
  },
  {
    id: "prof-arte",
    nombre_completo: "Yohanna Elizabeth Trocello",
    dni: "33.056.988",
    profesion: "Profesora de Arte",
    especialidad: "Taller de Expresión Plástica y Arte Terapéutico",
    matricula_provincial: "Sin Matrícula Habilitante",
    sector: "talleres",
    sector_nombre: "Talleres y Estimulación",
    role: "tallerista",
    acceso_clinico: false,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M15 30 Q50 10 90 40 T150 20' fill='none' stroke='%230f172a' stroke-width='2.1' stroke-linecap='round'/></svg>",
    activo: true
  },
  {
    id: "prof-yoga",
    nombre_completo: "María Paola Ponti",
    dni: "33.057.016",
    profesion: "Profesora de Yoga",
    especialidad: "Yoga Adaptado en Sillas y Respiración",
    matricula_provincial: "Sin Matrícula Habilitante",
    sector: "talleres",
    sector_nombre: "Talleres y Estimulación",
    role: "tallerista",
    acceso_clinico: false,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M20 25 Q60 5 100 35 T160 25' fill='none' stroke='%230f172a' stroke-width='2.1' stroke-linecap='round'/></svg>",
    activo: true
  },

  // 5. ENFERMERÍA Y CUIDADORAS (Doble Función)
  {
    id: "prof-enf-1",
    nombre_completo: "Viviana Soledad Portillo",
    dni: "24.630.285",
    profesion: "Enfermera / Cuidadora",
    especialidad: "Cuidados Integrales y Administración de Medicación",
    matricula_provincial: "M.P. 26239 - Entre Ríos",
    sector: "enfermeria",
    sector_nombre: "Enfermería Institucional",
    role: "enfermera",
    acceso_clinico: true,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M10 20 Q40 45 80 20 T140 30 T170 15' fill='none' stroke='%230f172a' stroke-width='2' stroke-linecap='round'/></svg>",
    activo: true
  },
  {
    id: "prof-enf-2",
    nombre_completo: "Marisa Lorena Miro",
    dni: "31.277.543",
    profesion: "Enfermera / Cuidadora",
    especialidad: "Cuidados Integrales y Control Clínico",
    matricula_provincial: "M.P. 27709 - Entre Ríos",
    sector: "enfermeria",
    sector_nombre: "Enfermería Institucional",
    role: "enfermera",
    acceso_clinico: true,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M15 35 Q50 15 90 35 T145 15 T170 28' fill='none' stroke='%230f172a' stroke-width='2' stroke-linecap='round'/></svg>",
    activo: true
  },

  // 6. CUIDADORES Y AUXILIARES GERONTOLÓGICOS
  {
    id: "prof-cuid-1",
    nombre_completo: "Carla Rodríguez",
    dni: "40.990.189",
    profesion: "Enfermera / Cuidadora",
    especialidad: "Atención Continua y Cuidados Directos",
    matricula_provincial: "M.P. 28007 - Entre Ríos",
    sector: "cuidadores",
    sector_nombre: "Cuidadores y Auxiliares",
    role: "enfermera",
    acceso_clinico: true,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M10 30 Q45 10 85 30 T140 20' fill='none' stroke='%230f172a' stroke-width='2' stroke-linecap='round'/></svg>",
    activo: true
  },
  {
    id: "prof-cuid-2",
    nombre_completo: "Lucas Gabriel Gassmann",
    dni: "30.764.685",
    profesion: "Cuidador Gerontológico",
    especialidad: "Asistencia en AVDB y Movilización",
    matricula_provincial: "M.P. 22951 - Entre Ríos",
    sector: "cuidadores",
    sector_nombre: "Cuidadores y Auxiliares",
    role: "cuidador",
    acceso_clinico: false,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M10 35 Q50 5 95 30 T160 20' fill='none' stroke='%230f172a' stroke-width='2' stroke-linecap='round'/></svg>",
    activo: true
  },
  {
    id: "prof-cuid-3",
    nombre_completo: "Jésica María Laura Speranza",
    dni: "40.991.240",
    profesion: "Cuidadora Gerontológica",
    especialidad: "Acompañamiento, Higiene y Confort",
    matricula_provincial: "M.P. 27734 - Entre Ríos",
    sector: "cuidadores",
    sector_nombre: "Cuidadores y Auxiliares",
    role: "cuidador",
    acceso_clinico: false,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M15 30 Q55 10 95 35 T155 25' fill='none' stroke='%230f172a' stroke-width='2' stroke-linecap='round'/></svg>",
    activo: true
  },
  {
    id: "prof-cuid-4",
    nombre_completo: "Silvia Verónica Kerps",
    dni: "26.650.918",
    profesion: "Cuidadora Gerontológica",
    especialidad: "Atención Diaria y Confort del Residente",
    matricula_provincial: "Registro Municipal Hogar",
    sector: "cuidadores",
    sector_nombre: "Cuidadores y Auxiliares",
    role: "cuidador",
    acceso_clinico: false,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M10 25 Q45 40 85 15 T150 25' fill='none' stroke='%230f172a' stroke-width='2' stroke-linecap='round'/></svg>",
    activo: true
  },
  {
    id: "prof-cuid-5",
    nombre_completo: "María Gabriela Romero",
    dni: "30.393.551",
    profesion: "Auxiliar en Cuidados Gerontológicos",
    especialidad: "Higiene, Confort y Alimentación Asistida",
    matricula_provincial: "Auxiliar Certificada",
    sector: "cuidadores",
    sector_nombre: "Cuidadores y Auxiliares",
    role: "cuidador",
    acceso_clinico: false,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M15 35 Q50 15 90 35 T155 20' fill='none' stroke='%230f172a' stroke-width='2' stroke-linecap='round'/></svg>",
    activo: true
  },
  {
    id: "prof-cuid-6",
    nombre_completo: "Belén Rosario Ramírez Mora",
    dni: "42.069.320",
    profesion: "Enfermera / Cuidadora",
    especialidad: "Control de Signos Vitales y Medicación",
    matricula_provincial: "M.P. 25567 - Entre Ríos",
    sector: "cuidadores",
    sector_nombre: "Cuidadores y Auxiliares",
    role: "enfermera",
    acceso_clinico: true,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M10 25 Q45 10 80 35 T145 20' fill='none' stroke='%230f172a' stroke-width='2' stroke-linecap='round'/></svg>",
    activo: true
  },
  {
    id: "prof-cuid-7",
    nombre_completo: "Carla Desiré Saucedo",
    dni: "41.629.905",
    profesion: "Cuidadora Gerontológica",
    especialidad: "Cuidado y Acompañamiento al Adulto Mayor",
    matricula_provincial: "Registro Municipal Hogar",
    sector: "cuidadores",
    sector_nombre: "Cuidadores y Auxiliares",
    role: "cuidador",
    acceso_clinico: false,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M15 30 Q50 5 95 30 T150 20' fill='none' stroke='%230f172a' stroke-width='2' stroke-linecap='round'/></svg>",
    activo: true
  },
  {
    id: "prof-cuid-8",
    nombre_completo: "Micaela Ayelén Cornejo",
    dni: "39.576.431",
    profesion: "Cuidadora Gerontológica",
    especialidad: "Cuidado y Asistencia Integral",
    matricula_provincial: "Registro Municipal Hogar",
    sector: "cuidadores",
    sector_nombre: "Cuidadores y Auxiliares",
    role: "cuidador",
    acceso_clinico: false,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M10 30 Q50 15 85 35 T145 25' fill='none' stroke='%230f172a' stroke-width='2' stroke-linecap='round'/></svg>",
    activo: true
  },
  {
    id: "prof-cuid-9",
    nombre_completo: "Jésica Anahí Ramírez",
    dni: "38.053.376",
    profesion: "Cuidadora Gerontológica",
    especialidad: "Atención Continua y Asistencia Diaria",
    matricula_provincial: "Registro Municipal Hogar",
    sector: "cuidadores",
    sector_nombre: "Cuidadores y Auxiliares",
    role: "cuidador",
    acceso_clinico: false,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M15 25 Q55 5 95 35 T150 15' fill='none' stroke='%230f172a' stroke-width='2' stroke-linecap='round'/></svg>",
    activo: true
  },

  // 7. SERVICIO DE COCINA
  {
    id: "prof-coc-1",
    nombre_completo: "Francisco Leonel Martínez",
    dni: "34.464.612",
    profesion: "Personal de Cocina",
    especialidad: "Manipulación Higiénica de Alimentos y Menú",
    matricula_provincial: "Carnet Manipulador (Vence 26/09/2028)",
    fecha_vencimiento_carnet: "2028-09-26",
    sector: "cocina",
    sector_nombre: "Servicio de Cocina",
    role: "cocina",
    acceso_clinico: false,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M10 20 Q50 40 90 20 T150 30' fill='none' stroke='%230f172a' stroke-width='2' stroke-linecap='round'/></svg>",
    activo: true
  },
  {
    id: "prof-coc-2",
    nombre_completo: "Fabiola Verónica Bernhardt",
    dni: "29.634.939",
    profesion: "Personal de Cocina",
    especialidad: "Elaboración de Dietas Especiales y Procesadas",
    matricula_provincial: "Carnet Manipulador (Vence 13/06/2028)",
    fecha_vencimiento_carnet: "2028-06-13",
    sector: "cocina",
    sector_nombre: "Servicio de Cocina",
    role: "cocina",
    acceso_clinico: false,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M15 30 Q50 10 90 35 T155 25' fill='none' stroke='%230f172a' stroke-width='2' stroke-linecap='round'/></svg>",
    activo: true
  },

  // 8. ORDENANZA Y MANTENIMIENTO
  {
    id: "prof-ord-1",
    nombre_completo: "Lorena Raquel Salas",
    dni: "27.428.241",
    profesion: "Personal de Ordenanza",
    especialidad: "Higiene Ambiental y Desinfección Institucional",
    matricula_provincial: "Registro Municipal Hogar",
    sector: "mantenimiento",
    sector_nombre: "Ordenanza y Limpieza",
    role: "ordenanza",
    acceso_clinico: false,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M10 25 Q45 10 85 30 T145 20' fill='none' stroke='%230f172a' stroke-width='2' stroke-linecap='round'/></svg>",
    activo: true
  },
  {
    id: "prof-ord-2",
    nombre_completo: "Lidia Amalia Meier",
    dni: "28.665.810",
    profesion: "Personal de Ordenanza",
    especialidad: "Mantenimiento y Sanitización de Pabellones",
    matricula_provincial: "Registro Municipal Hogar",
    sector: "mantenimiento",
    sector_nombre: "Ordenanza y Limpieza",
    role: "ordenanza",
    acceso_clinico: false,
    firma_url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='50' viewBox='0 0 180 50'><path d='M15 35 Q55 15 95 35 T150 25' fill='none' stroke='%230f172a' stroke-width='2' stroke-linecap='round'/></svg>",
    activo: true
  }
];

export const INITIAL_RESIDENTES = [
  {
    id: "res-1",
    numero_legajo: "LUR-2024-001",
    nombre_completo: "Don Osvaldo Alcides Fontana",
    dni: "5.412.389",
    fecha_nacimiento: "1938-04-12",
    edad: 88,
    sexo: "Masculino",
    fecha_ingreso: "2024-02-15",
    obra_social: "PAMI",
    nro_afiliado: "150493820100",
    estado_habitacional: "Habitación 04 - Sector Varones",
    foto_url: "/assets/residente_modelo.jpg",
    referente_familiar: "Marta Fontana (Hija - Tel: 0343-154982314)",
    telefono_emergencia: "0343-4920112 (Hospital San Roque Viale)",
    estado: "ACTIVO",
    diagnosticos_principales: ["Hipertensión Arterial", "Deterioro Cognitivo Leve", "Gonartrosis bilateral"],
    polifarmacia: true,
    continente: "Incontinencia urinaria ocasional",
    movilidad: "Deambula con bastón trípode",
    medico_cabecera: {
      nombre_completo: "Dra. Emilia Montu",
      matricula_provincial: "M.P. 11686 - Entre Ríos",
      especialidad: "Geriatría / Medicina de Cabecera",
      ugl: "UGL XIV - Paraná (Agencia Viale)",
      telefono: "0343-4920112"
    },
    visitas_medico_cabecera: [
      {
        id: "vis-101",
        fecha_hora: "2026-10-18 10:00",
        profesional_id: "prof-1",
        medico_nombre: "Dra. Emilia Montu",
        matricula: "M.P. 5421 - Entre Ríos",
        tipo_visita: "Visita Mensual Institucional Obligatoria (Res. 284/05)",
        motivo: "Control evolutivo mensual regular en residencia de adultos mayores",
        diagnostico_cie10: "I10 - Hipertensión esencial (primaria)",
        hallazgos: "Paciente lúcido, afebril, hemodinámicamente estable. TA: 125/80 mmHg. Auscultación cardiorrespiratoria sin agregados. Buena tolerancia al tratamiento.",
        conducta: "Continuar con enalapril 10mg y amlodipina 5mg. Próximo control programado en 30 días.",
        proxima_visita_limite: "2026-11-18",
        bloqueado: true
      }
    ],
    referencias_contrarreferencias: [
      {
        id: "ref-101",
        tipo: "DERIVACION_INTERNACION",
        fecha_derivacion: "2026-08-10 14:30",
        efector_destino: "Hospital San Roque de Viale (Nivel II)",
        motivo_derivacion: "Cuadro febril agudo con tos productiva y desaturación (89%). Se deriva para antibioticoterapia endovenosa.",
        diagnostico_presuntivo_cie10: "J18.9 - Neumonía, no especificada",
        medio_traslado: "Ambulancia de Emergencia con Médico",
        profesional_derivante_id: "prof-1",
        estado: "CONTRARREFERIDO_CON_EPICRISIS",
        fecha_reingreso: "2026-08-18 11:00",
        epicrisis: {
          diagnostico_definitivo_cie10: "J15.9 - Neumonía bacteriana, no especificada",
          resumen_alta: "Evolución favorable con Ceftriaxona EV por 7 días. Afebril desde el 3er día de internación. Se otorga alta médica compensado.",
          indicaciones_reingreso: "Control de signos vitales cada 12 hs por enfermería. Kinesioterapia respiratoria. Reposo relativo 48 hs.",
          profesional_receptor_id: "prof-1",
          dispara_revision_vgi: false
        }
      }
    ],
    solicitudes_practicas_nivel1: [
      {
        id: "sol-101",
        fecha_solicitud: "2026-10-18",
        tipo_practica: "LABORATORIO_DOMICILIARIO",
        codigo_menu_pami: "660475 - Hemograma completo / 660481 - Hepatograma / 660192 - Creatinina / 660412 - Glucemia",
        diagnostico_cie10: "I10 - Hipertensión esencial (primaria)",
        justificacion_domiciliaria: "Residente de 88 años con gonartrosis bilateral y marcha asistida. Se solicita extracción de muestras biológicas en la residencia conforme al Menú de I Nivel de la Res. 284/05 PAMI.",
        profesional_solicitante_id: "prof-1",
        estado: "SOLICITADO"
      }
    ],
    historia_clinica: {
      antecedentes: "HTA diagnosticada hace 25 años. Artritis degenerativa en miembros inferiores. Sin antecedentes de ACV.",
      alergias: "Penicilina y derivados.",
      medicacion_actual: [
        { droga: "Enalapril 10mg", posologia: "1 comp cada 12 hs", horario: "08:00 / 20:00" },
        { droga: "Amlodipina 5mg", posologia: "1 comp por la mañana", horario: "08:00" },
        { droga: "Paracetamol 500mg", posologia: "Según dolor articular", horario: "SOS" },
        { droga: "Donepecilo 5mg", posologia: "1 comp al acostarse", horario: "21:30" }
      ],
      signos_vitales_ultimo: {
        fecha: "2026-10-18 09:30",
        tension_arterial: "125/80 mmHg",
        frecuencia_cardiaca: "72 lpm",
        temperatura: "36.4 °C",
        saturacion: "97%"
      },
      evoluciones: [
        {
          id: "evo-101",
          fecha_hora: "2026-10-18 09:30",
          profesional_id: "prof-1",
          tipo: "Evolución Médica General",
          nota: "Residente en buen estado general. Buen descanso nocturno. TA controlada. Se ajusta analgesia para dolor matinal en rodillas. Se solicita laboratorio semestral de control.",
          bloqueado: true
        },
        {
          id: "evo-102",
          fecha_hora: "2026-10-15 16:00",
          profesional_id: "prof-3",
          tipo: "Control de Enfermería",
          nota: "Se realiza control de signos vitales e hidratación. Piel íntegra, sin signos de UPP. Ingesta hídrica adecuada durante la merienda.",
          bloqueado: true
        }
      ]
    },
    historia_social: {
      trayectoria_vida: "Nacido y criado en la zona rural de Viale. Se desempeñó como productor agropecuario toda su vida. Persona muy vinculada al Club Atlético Arsenal de Viale.",
      red_apoyo: "Familia continente. Su hija Marta lo visita los martes y sábados. Sus nietos participan de los eventos festivos del Hogar.",
      situacion_previsional: "Jubilación ordinaria ANSES y beneficio de cobertura integral PAMI.",
      informes_sociales: [
        {
          id: "soc-1",
          fecha_hora: "2026-09-10 11:00",
          profesional_id: "prof-2",
          informe: "Entrevista semestral con la hija de referencia. Se evalúa adaptación institucional muy favorable. Se fomenta su participación en el taller de jardinería y huerta del Hogar.",
          bloqueado: true
        }
      ]
    },
    valoraciones_especialidades: [
      {
        id: "val-kin-1",
        fecha_hora: "2026-09-12 10:30",
        profesional_id: "prof-4",
        area: "Kinesiología y Fisiatría",
        nota: "Marcha con base de sustentación ampliada. Buen tono muscular proximal. Continúa ejercicios de reeducación de la marcha y fortalecimiento de cuádriceps 2 veces por semana.",
        bloqueado: true
      },
      {
        id: "val-psi-1",
        fecha_hora: "2026-09-14 15:00",
        profesional_id: "prof-5",
        area: "Psicología",
        nota: "Estado de ánimo reactivo y conservado. Buena interacción con pares en el comedor. Participa con entusiasmo en el Taller de la Memoria.",
        bloqueado: true
      }
    ],
    vgi_vigente: {
      id: "vgi-res-1",
      fecha_evaluacion: "2026-06-15",
      fecha_proxima_revision: "2026-12-15",
      estado_vigencia: "VIGENTE", // VIGENTE | PROXIMO_A_VENCER | VENCIDA
      profesional_id: "prof-1",
      barthel_puntaje: 75,
      barthel_clasificacion: "Dependencia Leve",
      lawton_puntaje: 5,
      tinetti_puntaje: 21,
      tinetti_riesgo: "Riesgo Bajo de Caídas",
      pfeiffer_errores: 2,
      pfeiffer_clasificacion: "Función Intelectual Intacta / Leve",
      yesavage_puntaje: 3,
      yesavage_clasificacion: "Normal (Sin Depresión)",
      gijon_puntaje: 8,
      gijon_clasificacion: "Buena / Aceptable Situación Social",
      sindromes_geriatricos: ["Caídas previas (hace 1 año)", "Incontinencia de urgencia leve"],
      bloqueado: true
    },
    pai_vigente: {
      id: "pai-res-1",
      fecha_elaboracion: "2026-06-20",
      fecha_revision_prevista: "2026-12-20",
      estado_cumplimiento: "EN_CURSO",
      objetivos_generales: "Preservar al máximo la autonomía motriz independiente y optimizar la función cognitiva mediante estimulación grupal.",
      objetivos_especificos: [
        { area: "Kinesiología", meta: "Mantener marcha independiente con bastón y evitar nuevas caídas", frecuencia: "2 veces por semana", responsable: "Lic. Julián Alarcón" },
        { area: "Psicología", meta: "Consolidar memoria de trabajo y orientación temporal en talleres", frecuencia: "Semanal", responsable: "Lic. Romina Schmidt" },
        { area: "Terapia Ocupacional", meta: "Autonomía en vestido y uso de cubiertos adaptados", frecuencia: "Semanal", responsable: "Lic. Andrea Müller" },
        { area: "Nutrición", meta: "Dieta normosódica con adecuada fibra para regular tránsito intestinal", frecuencia: "Diaria", responsable: "Lic. Luciana Kranevitter" }
      ],
      firmas_equipo: ["prof-1", "prof-2", "prof-4", "prof-5"],
      bloqueado: true
    }
  },
  {
    id: "res-2",
    numero_legajo: "LUR-2024-002",
    nombre_completo: "Doña Catalina Ermelinda Bähler",
    dni: "4.892.115",
    fecha_nacimiento: "1935-11-20",
    edad: 90,
    sexo: "Femenino",
    fecha_ingreso: "2024-03-01",
    obra_social: "IOSPER",
    nro_afiliado: "02-9938471-01",
    estado_habitacional: "Habitación 02 - Sector Mujeres",
    foto_url: "/assets/res-2_catalina.jpg",
    referente_familiar: "Héctor Bähler (Sobrino - Tel: 0343-155123984)",
    telefono_emergencia: "0343-4920112 (Hospital San Roque Viale)",
    estado: "ACTIVO",
    diagnosticos_principales: ["Demencia Tipo Alzheimer GDS 5", "Osteoporosis severa", "Insuficiencia Venosa"],
    polifarmacia: true,
    continente: "Incontinente (uso de pañal)",
    movilidad: "Silla de ruedas para traslados medios, transferencias con asistencia de 1 persona",
    medico_cabecera: {
      nombre_completo: "Dra. Emilia Montu",
      matricula_provincial: "M.P. 11686 - Entre Ríos",
      especialidad: "Geriatría / Medicina de Cabecera",
      ugl: "IOSPER Paraná Campaña",
      telefono: "0343-4920112"
    },
    visitas_medico_cabecera: [
      {
        id: "vis-201",
        fecha_hora: "2026-10-14 11:30",
        profesional_id: "prof-1",
        medico_nombre: "Dra. Emilia Montu",
        matricula: "M.P. 11686 - Entre Ríos",
        tipo_visita: "Visita Mensual Institucional Obligatoria (Res. 284/05)",
        motivo: "Control evolutivo mensual de demencia avanzada y soporte nutricional",
        diagnostico_cie10: "G30.9 - Enfermedad de Alzheimer, no especificada",
        hallazgos: "Residente tranquila, conectada parcialmente. Sin lesiones cutáneas activas en sacro ni talones. Piel hidratada.",
        conducta: "Mantener memantina y pautas de cambios posturales de enfermería.",
        proxima_visita_limite: "2026-11-14",
        bloqueado: true
      }
    ],
    referencias_contrarreferencias: [],
    solicitudes_practicas_nivel1: [
      {
        id: "sol-201",
        fecha_solicitud: "2026-10-14",
        tipo_practica: "FISIOKINESIOTERAPIA",
        codigo_menu_pami: "250106 - Kinesioterapia o fisiatría a domicilio / 250103 - Terapia ocupacional",
        diagnostico_cie10: "G30.9 - Enfermedad de Alzheimer, no especificada",
        justificacion_domiciliaria: "Movilizaciones pasivo-asistidas para prevención de retracciones y rigidez articular en silla de ruedas.",
        profesional_solicitante_id: "prof-1",
        estado: "SOLICITADO"
      }
    ],
    historia_clinica: {
      antecedentes: "Alzheimer de 6 años de evolución. Múltiples internaciones previas antes de su ingreso institucional.",
      alergias: "Sin alergias medicamentosas conocidas.",
      medicacion_actual: [
        { droga: "Memantina 20mg", posologia: "1 comp cada 24 hs", horario: "10:00" },
        { droga: "Quetiapina 25mg", posologia: "Medio comp por la noche", horario: "21:00" },
        { droga: "Calcio + Vit D", posologia: "1 sobre diario", horario: "12:00" }
      ],
      signos_vitales_ultimo: {
        fecha: "2026-10-19 10:15",
        tension_arterial: "115/70 mmHg",
        frecuencia_cardiaca: "68 lpm",
        temperatura: "36.2 °C",
        saturacion: "98%"
      },
      evoluciones: [
        {
          id: "evo-201",
          fecha_hora: "2026-10-19 10:15",
          profesional_id: "prof-1",
          tipo: "Evolución Médica Geriátrica",
          nota: "Paciente tranquila, conectada con el medio a predominio gestual y afectivo. Tolera alimentación asistida. Sin escaras de decúbito. Esquema de cambio postural estricto cada 3 horas.",
          bloqueado: true
        }
      ]
    },
    historia_social: {
      trayectoria_vida: "Ex docente rural de escuelas del departamento Paraná Campaña. Muy querida en la comunidad de Viale.",
      red_apoyo: "Sobrino tutor presente en compras de insumos personales y medicación de alto costo.",
      situacion_previsional: "Jubilación Docente Provincial Caja de Jubilaciones de Entre Ríos.",
      informes_sociales: []
    },
    valoraciones_especialidades: [],
    vgi_vigente: {
      id: "vgi-res-2",
      fecha_evaluacion: "2026-05-10",
      fecha_proxima_revision: "2026-11-10",
      estado_vigencia: "PROXIMO_A_VENCER", // Faltan menos de 30 días respecto al calendario institucional
      profesional_id: "prof-1",
      barthel_puntaje: 35,
      barthel_clasificacion: "Dependencia Grave",
      lawton_puntaje: 1,
      tinetti_puntaje: 11,
      tinetti_riesgo: "Alto Riesgo de Caídas",
      pfeiffer_errores: 7,
      pfeiffer_clasificacion: "Deterioro Intelectual Moderado/Severo",
      yesavage_puntaje: 4,
      yesavage_clasificacion: "No valorable completamente / Normal",
      gijon_puntaje: 11,
      gijon_clasificacion: "Riesgo Social Leve",
      sindromes_geriatricos: ["Inmovilidad relativa", "Incontinencia mixta", "Deterioro cognitivo severo", "Riesgo de UPP"],
      bloqueado: true
    },
    pai_vigente: {
      id: "pai-res-2",
      fecha_elaboracion: "2026-05-15",
      fecha_revision_prevista: "2026-11-15",
      estado_cumplimiento: "PROXIMO_A_REVISAR",
      objetivos_generales: "Prevención rigurosa de úlceras por presión, mantenimiento de rangos articulares y estimulación sensorial y musical.",
      objetivos_especificos: [
        { area: "Enfermería", meta: "Cambios posturales c/3hs y cuidados de piel con cremas con vitamina A", frecuencia: "Diaria / Turno", responsable: "Lic. Mariana Fontana" },
        { area: "Kinesiología", meta: "Movilizaciones pasivas de miembros inferiores y postura adecuada en silla", frecuencia: "3 veces por semana", responsable: "Lic. Julián Alarcón" },
        { area: "Terapia Ocupacional", meta: "Sesiones de musicoterapia y estimulación táctil agradable", frecuencia: "2 veces por semana", responsable: "Lic. Andrea Müller" }
      ],
      firmas_equipo: ["prof-1", "prof-3", "prof-4", "prof-6"],
      bloqueado: true
    }
  },
  {
    id: "res-3",
    numero_legajo: "LUR-2024-003",
    nombre_completo: "Don Juan Carlos Weiss",
    dni: "6.120.944",
    fecha_nacimiento: "1942-08-30",
    edad: 84,
    sexo: "Masculino",
    fecha_ingreso: "2024-05-10",
    obra_social: "PAMI",
    nro_afiliado: "150392817200",
    estado_habitacional: "Habitación 06 - Sector Varones",
    foto_url: "/assets/res-3_juan_carlos.jpg",
    referente_familiar: "Graciela Weiss (Sobrina - Tel: 0343-154778899)",
    telefono_emergencia: "0343-4920112 (Hospital San Roque Viale)",
    estado: "ACTIVO",
    diagnosticos_principales: ["Diabetes Mellitus Tipo 2", "Enfermedad Pulmonar Obstructiva Crónica (EPOC)", "Hipoacusia bilateral"],
    polifarmacia: true,
    continente: "Continente",
    movilidad: "Autoválido, deambula sin asistencia técnica",
    medico_cabecera: {
      nombre_completo: "Dra. Emilia Montu",
      matricula_provincial: "M.P. 11686 - Entre Ríos",
      especialidad: "Geriatría / Medicina de Cabecera",
      ugl: "UGL XIV - Paraná (Agencia Viale)",
      telefono: "0343-4920112"
    },
    visitas_medico_cabecera: [
      {
        id: "vis-301",
        fecha_hora: "2026-09-12 10:15",
        profesional_id: "prof-1",
        medico_nombre: "Dra. Emilia Montu",
        matricula: "M.P. 11686 - Entre Ríos",
        tipo_visita: "Visita Mensual Institucional Obligatoria (Res. 284/05)",
        motivo: "Control periódico de glucemias y espirometría",
        diagnostico_cie10: "E11.9 - Diabetes mellitus tipo 2 sin mención de complicación",
        hallazgos: "Buena tolerancia al plan nutricional y a la metformina. Sin signos de dificultad respiratoria en reposo.",
        conducta: "Control rutinario. Próximo control programado en 30 días.",
        proxima_visita_limite: "2026-10-12",
        bloqueado: true
      }
    ],
    referencias_contrarreferencias: [],
    solicitudes_practicas_nivel1: [
      {
        id: "sol-301",
        fecha_solicitud: "2026-09-15",
        tipo_practica: "LABORATORIO_DOMICILIARIO",
        codigo_menu_pami: "660412 - Glucemia / 661070 - Hemoglobina glicosilada (HbA1c) / 660711 - Orina completa",
        diagnostico_cie10: "E11.9 - Diabetes mellitus tipo 2 sin mención de complicación",
        justificacion_domiciliaria: "Monitoreo metabólico institucional en Hogar Madre Teresa para evitar descompensaciones hiperglucémicas.",
        profesional_solicitante_id: "prof-1",
        estado: "COMPLETADO"
      }
    ],
    historia_clinica: {
      antecedentes: "Ex tabaquista. Diabetes tratada con antidiabéticos orales. Buen control glucémico.",
      alergias: "Ninguna conocida.",
      medicacion_actual: [
        { droga: "Metformina 850mg", posologia: "1 comp con almuerzo y cena", horario: "12:30 / 20:30" },
        { droga: "Salmeterol + Fluticasona aerosol", posologia: "2 disparos cada 12 hs", horario: "08:00 / 20:00" },
        { droga: "Atorvastatina 20mg", posologia: "1 comp por la noche", horario: "21:00" }
      ],
      signos_vitales_ultimo: {
        fecha: "2026-10-20 08:30",
        tension_arterial: "120/75 mmHg",
        frecuencia_cardiaca: "74 lpm",
        temperatura: "36.5 °C",
        saturacion: "96%"
      },
      evoluciones: []
    },
    historia_social: {
      trayectoria_vida: "Carpintero y herrero de oficio en Viale. Le gusta leer el diario local y escuchar música litoraleña.",
      red_apoyo: "Mantiene visitas semanales de familiares y amigos de la parroquia.",
      situacion_previsional: "Jubilación nacional PAMI.",
      informes_sociales: []
    },
    valoraciones_especialidades: [],
    vgi_vigente: {
      id: "vgi-res-3",
      fecha_evaluacion: "2026-07-22",
      fecha_proxima_revision: "2027-01-22",
      estado_vigencia: "VIGENTE",
      profesional_id: "prof-1",
      barthel_puntaje: 90,
      barthel_clasificacion: "Independencia / Leve",
      lawton_puntaje: 7,
      tinetti_puntaje: 25,
      tinetti_riesgo: "Sin Riesgo Significativo",
      pfeiffer_errores: 1,
      pfeiffer_clasificacion: "Función Intelectual Intacta",
      yesavage_puntaje: 2,
      yesavage_clasificacion: "Normal",
      gijon_puntaje: 7,
      gijon_clasificacion: "Buena Situación Social",
      sindromes_geriatricos: ["Déficit sensorial (hipoacusia)"],
      bloqueado: true
    },
    pai_vigente: {
      id: "pai-res-3",
      fecha_elaboracion: "2026-07-25",
      fecha_revision_prevista: "2027-01-25",
      estado_cumplimiento: "EN_CURSO",
      objetivos_generales: "Fomentar el rol activo institucional, talleres recreativos de madera y control glucémico.",
      objetivos_especificos: [
        { area: "Nutrición", meta: "Plan hipohidrocarbonado equilibrado para DM2", frecuencia: "Diaria", responsable: "Lic. Luciana Kranevitter" },
        { area: "Terapia Ocupacional", meta: "Coordinación de taller de manualidades comunitarias", frecuencia: "2 veces por semana", responsable: "Lic. Andrea Müller" }
      ],
      firmas_equipo: ["prof-1", "prof-6", "prof-7"],
      bloqueado: true
    }
  },
  {
    id: "res-4",
    numero_legajo: "LUR-2024-004",
    nombre_completo: "Doña Nélida Rosa Barzola",
    dni: "5.199.302",
    fecha_nacimiento: "1940-02-18",
    edad: 86,
    sexo: "Femenino",
    fecha_ingreso: "2024-07-01",
    obra_social: "PAMI",
    nro_afiliado: "150893019201",
    estado_habitacional: "Habitación 08 - Sector Mujeres",
    foto_url: "/assets/res-4_nelida.jpg",
    referente_familiar: "Mirta Ledesma (Vecina apoderada - Tel: 0343-154332211)",
    telefono_emergencia: "0343-4920112 (Hospital San Roque Viale)",
    estado: "ACTIVO",
    diagnosticos_principales: ["Secuela de ACV Isquémico", "Hemiparesia Fascio-Braquio-Crural Izquierda", "Depresión Reactiva"],
    polifarmacia: true,
    continente: "Incontinencia urinaria",
    movilidad: "Requiere silla de ruedas y asistencia máxima",
    medico_cabecera: {
      nombre_completo: "Dra. Beatriz Elena Gómez",
      matricula_provincial: "M.P. 3840 - Entre Ríos",
      especialidad: "Clínica Médica / Dirección",
      ugl: "UGL XIV - Paraná (Agencia Viale)",
      telefono: "0343-4920112"
    },
    visitas_medico_cabecera: [
      {
        id: "vis-401",
        fecha_hora: "2026-10-20 16:30",
        profesional_id: "prof-8",
        medico_nombre: "Dra. Beatriz Elena Gómez",
        matricula: "M.P. 3840 - Entre Ríos",
        tipo_visita: "Visita Mensual Institucional Obligatoria (Res. 284/05)",
        motivo: "Evaluación mensual interdisciplinaria y ajuste de antidepresivo",
        diagnostico_cie10: "I69.3 - Secuelas de infarto cerebral (ACV)",
        hallazgos: "Piel íntegra, tono espástico en miembro superior izquierdo. Ánimo reactivo. Buen apetito.",
        conducta: "Mantener sertralina 50mg. Continuar plan kinésico y estimulación del lenguaje.",
        proxima_visita_limite: "2026-11-20",
        bloqueado: true
      }
    ],
    referencias_contrarreferencias: [],
    solicitudes_practicas_nivel1: [
      {
        id: "sol-401",
        fecha_solicitud: "2026-10-10",
        tipo_practica: "FISIOKINESIOTERAPIA",
        codigo_menu_pami: "250106 - Kinesioterapia motriz en domicilio / 250104 - Rehabilitación del lenguaje",
        diagnostico_cie10: "I69.3 - Secuelas de infarto cerebral (ACV)",
        justificacion_domiciliaria: "Secuela neurológica invalidante con hemiparesia. Se requiere terapia física y fonoaudiológica intensiva en la institución.",
        profesional_solicitante_id: "prof-1",
        estado: "SOLICITADO"
      }
    ],
    historia_clinica: {
      antecedentes: "ACV hace 18 meses. En tratamiento neurorehabilitador.",
      alergias: "Sin alergias declaradas.",
      medicacion_actual: [
        { droga: "Sertralina 50mg", posologia: "1 comp por la mañana", horario: "08:00" },
        { droga: "Clopidogrel 75mg", posologia: "1 comp con almuerzo", horario: "12:00" },
        { droga: "Rosuvastatina 10mg", posologia: "1 comp noche", horario: "21:00" }
      ],
      signos_vitales_ultimo: {
        fecha: "2026-10-18 11:00",
        tension_arterial: "130/85 mmHg",
        frecuencia_cardiaca: "76 lpm",
        temperatura: "36.6 °C",
        saturacion: "97%"
      },
      evoluciones: []
    },
    historia_social: {
      trayectoria_vida: "Vecina histórica del barrio San Cayetano de Viale. Se dedicó a las tareas del hogar y confección de tejidos.",
      red_apoyo: "Sin hijos directos. Red vincular sostenida por vecindad y grupo de voluntariado parroquial.",
      situacion_previsional: "Pensión no contributiva / PAMI.",
      informes_sociales: []
    },
    valoraciones_especialidades: [],
    vgi_vigente: {
      id: "vgi-res-4",
      fecha_evaluacion: "2026-04-10",
      fecha_proxima_revision: "2026-10-10",
      estado_vigencia: "VENCIDA", // VENCIDA: Demuestra la alerta en el semáforo institucional
      profesional_id: "prof-1",
      barthel_puntaje: 40,
      barthel_clasificacion: "Dependencia Grave",
      lawton_puntaje: 2,
      tinetti_puntaje: 12,
      tinetti_riesgo: "Alto Riesgo de Caídas",
      pfeiffer_errores: 3,
      pfeiffer_clasificacion: "Deterioro Leve",
      yesavage_puntaje: 9,
      yesavage_clasificacion: "Depresión Establecida",
      gijon_puntaje: 13,
      gijon_clasificacion: "Situación de Riesgo Social",
      sindromes_geriatricos: ["Inmovilidad", "Incontinencia urinaria", "Depresión"],
      bloqueado: true
    },
    pai_vigente: {
      id: "pai-res-4",
      fecha_elaboracion: "2026-04-15",
      fecha_revision_prevista: "2026-10-15",
      estado_cumplimiento: "VENCIDO",
      objetivos_generales: "Tratamiento intensivo de síntomas depresivos, movilización activa-asistida y fortalecimiento de red de voluntariado.",
      objetivos_especificos: [
        { area: "Psicología", meta: "Acompañamiento individual bisemanal para duelo y adaptación a secuela motriz", frecuencia: "2 veces por semana", responsable: "Lic. Romina Schmidt" },
        { area: "Kinesiología", meta: "Recuperación de tono y prevención de sinergias espásticas", frecuencia: "3 veces por semana", responsable: "Lic. Julián Alarcón" },
        { area: "Trabajo Social", meta: "Articulación con grupo parroquial de Viale para visitas y acompañamiento afectivo", frecuencia: "Semanal", responsable: "Lic. Carlos Benítez" }
      ],
      firmas_equipo: ["prof-1", "prof-2", "prof-4", "prof-5"],
      bloqueado: true
    }
  },
  {
    id: "res-5",
    numero_legajo: "LUR-2025-005",
    nombre_completo: "Don Mario Ernesto Ruhl",
    dni: "5.780.443",
    fecha_nacimiento: "1939-06-05",
    edad: 87,
    sexo: "Masculino",
    fecha_ingreso: "2025-01-10",
    obra_social: "IOSPER",
    nro_afiliado: "02-4412098-00",
    estado_habitacional: "Habitación 05 - Sector Varones",
    foto_url: "/assets/res-5_mario.jpg",
    referente_familiar: "Aníbal Ruhl (Hijo - Tel: 0343-156994411)",
    telefono_emergencia: "0343-4920112 (Hospital San Roque Viale)",
    estado: "ACTIVO",
    diagnosticos_principales: ["Cardiopatía Isquémica", "Fibrilación Auricular Crónica", "Artrosis Generalizada"],
    polifarmacia: true,
    continente: "Continente",
    movilidad: "Deambula con andador de 4 ruedas",
    medico_cabecera: {
      nombre_completo: "Dra. Emilia Montu",
      matricula_provincial: "M.P. 11686 - Entre Ríos",
      especialidad: "Geriatría / Medicina Interna",
      ugl: "IOSPER Paraná Campaña",
      telefono: "0343-4920112"
    },
    visitas_medico_cabecera: [
      {
        id: "vis-501",
        fecha_hora: "2026-10-19 11:00",
        profesional_id: "prof-1",
        medico_nombre: "Dra. Emilia Montu",
        matricula: "M.P. 11686 - Entre Ríos",
        tipo_visita: "Visita Programada de Seguimiento / Ajuste Terapéutico",
        motivo: "Control de anticoagulación oral por fibrilación auricular crónica",
        diagnostico_cie10: "I48 - Fibrilación y aleteo auricular",
        hallazgos: "Laboratorio de RIN en 2.4 (dentro de rango terapéutico 2.0-3.0). Sin sangrados ni hematomas espontáneos.",
        conducta: "Mantener Acenocumarol según esquema. Próximo control hematológico en 30 días.",
        proxima_visita_limite: "2026-11-19",
        bloqueado: true
      }
    ],
    referencias_contrarreferencias: [],
    solicitudes_practicas_nivel1: [
      {
        id: "sol-501",
        fecha_solicitud: "2026-10-15",
        tipo_practica: "LABORATORIO_DOMICILIARIO",
        codigo_menu_pami: "660771 - Tiempo de protrombina / RIN / 660192 - Creatinina",
        diagnostico_cie10: "I48 - Fibrilación y aleteo auricular",
        justificacion_domiciliaria: "Control de coagulograma mensual de paciente con cardiopatía en residencia geriátrica.",
        profesional_solicitante_id: "prof-1",
        estado: "COMPLETADO"
      }
    ],
    historia_clinica: {
      antecedentes: "Anticoagulado por FA crónica. Control mensual de RIN.",
      alergias: "Ninguna conocida.",
      medicacion_actual: [
        { droga: "Acenocumarol según RIN", posologia: "Según planilla hematológica", horario: "18:00" },
        { droga: "Bisoprolol 5mg", posologia: "1 comp por la mañana", horario: "08:00" },
        { droga: "Furosemida 40mg", posologia: "Medio comp por la mañana", horario: "08:00" }
      ],
      signos_vitales_ultimo: {
        fecha: "2026-10-17 09:00",
        tension_arterial: "110/70 mmHg",
        frecuencia_cardiaca: "66 lpm arrítmico",
        temperatura: "36.4 °C",
        saturacion: "97%"
      },
      evoluciones: []
    },
    historia_social: {
      trayectoria_vida: "Ex ferroviario y amante del tango. Participativo y cordial.",
      red_apoyo: "Familia muy presente en fines de semana.",
      situacion_previsional: "Jubilación Provincial.",
      informes_sociales: []
    },
    valoraciones_especialidades: [],
    vgi_vigente: {
      id: "vgi-res-5",
      fecha_evaluacion: "2026-08-01",
      fecha_proxima_revision: "2027-02-01",
      estado_vigencia: "VIGENTE",
      profesional_id: "prof-1",
      barthel_puntaje: 80,
      barthel_clasificacion: "Dependencia Leve",
      lawton_puntaje: 6,
      tinetti_puntaje: 22,
      tinetti_riesgo: "Riesgo Moderado de Caídas",
      pfeiffer_errores: 1,
      pfeiffer_clasificacion: "Función Intelectual Intacta",
      yesavage_puntaje: 3,
      yesavage_clasificacion: "Normal",
      gijon_puntaje: 8,
      gijon_clasificacion: "Buena Situación Social",
      sindromes_geriatricos: ["Riesgo de sangrado por anticoagulación", "Riesgo de caídas"],
      bloqueado: true
    },
    pai_vigente: {
      id: "pai-res-5",
      fecha_elaboracion: "2026-08-05",
      fecha_revision_prevista: "2027-02-05",
      estado_cumplimiento: "EN_CURSO",
      objetivos_generales: "Seguimiento riguroso de coagulación, entrenamiento en marcha segura y recreación musical.",
      objetivos_especificos: [
        { area: "Medicina", meta: "Control mensual estricto de hematología y RIN terapéutico (2.0 - 3.0)", frecuencia: "Mensual", responsable: "Dra. Emilia Montu" },
        { area: "Kinesiología", meta: "Ejercicios de marcha con andador y cambios de dirección", frecuencia: "2 veces por semana", responsable: "Lic. Julián Alarcón" }
      ],
      firmas_equipo: ["prof-1", "prof-4"],
      bloqueado: true
    }
  },
  {
    id: "res-6",
    numero_legajo: "LUR-2025-006",
    nombre_completo: "Doña Ester Clotilde Dalinger",
    dni: "4.678.901",
    fecha_nacimiento: "1936-09-14",
    edad: 90,
    sexo: "Femenino",
    fecha_ingreso: "2025-03-20",
    obra_social: "PAMI",
    nro_afiliado: "150772219901",
    estado_habitacional: "Habitación 03 - Sector Mujeres",
    foto_url: "/assets/res-6_ester.jpg",
    referente_familiar: "Claudia Dalinger (Hija - Tel: 0343-154228833)",
    telefono_emergencia: "0343-4920112 (Hospital San Roque Viale)",
    estado: "ACTIVO",
    diagnosticos_principales: ["Demencia Vascular", "Incontinencia Urinaria", "Deterioro Visual (Cataratas bilaterales operadas)"],
    polifarmacia: false,
    continente: "Incontinencia urinaria",
    movilidad: "Deambula asistida por personal",
    medico_cabecera: {
      nombre_completo: "Dra. Emilia Montu",
      matricula_provincial: "M.P. 11686 - Entre Ríos",
      especialidad: "Geriatría / Medicina de Cabecera",
      ugl: "UGL XIV - Paraná (Agencia Viale)",
      telefono: "0343-4920112"
    },
    visitas_medico_cabecera: [
      {
        id: "vis-601",
        fecha_hora: "2026-10-22 10:30",
        profesional_id: "prof-1",
        medico_nombre: "Dra. Emilia Montu",
        matricula: "M.P. 11686 - Entre Ríos",
        tipo_visita: "Visita Mensual Institucional Obligatoria (Res. 284/05)",
        motivo: "Control evolutivo mensual y seguimiento posoperatorio de cadera",
        diagnostico_cie10: "S72.0 - Fractura del cuello de fémur (cadera)",
        hallazgos: "Herida quirúrgica de cadera izquierda cerrada y limpia. Tolera bipedestación con asistencia de 2 enfermeros.",
        conducta: "Mantener anticoagulación profiláctica y continuar plan kinésico en habitación.",
        proxima_visita_limite: "2026-11-22",
        bloqueado: true
      }
    ],
    referencias_contrarreferencias: [
      {
        id: "ref-601",
        tipo: "DERIVACION_INTERNACION",
        fecha_derivacion: "2026-09-02 18:30",
        efector_destino: "Hospital San Martín de Paraná (Nivel III)",
        motivo_derivacion: "Caída en habitación con rotación externa dolorosa de miembro inferior izquierdo. Se sospecha fractura de cadera.",
        diagnostico_presuntivo_cie10: "S72.0 - Fractura del cuello de fémur (cadera)",
        medio_traslado: "Ambulancia de Emergencia con Médico",
        profesional_derivante_id: "prof-1",
        estado: "CONTRARREFERIDO_CON_EPICRISIS",
        fecha_reingreso: "2026-09-15 14:00",
        epicrisis: {
          diagnostico_definitivo_cie10: "S72.0 - Fractura del cuello de fémur (cadera)",
          resumen_alta: "Se efectuó artroplastia parcial de cadera izquierda con prótesis bipolar. Buena tolerancia quirúrgica. Criterio de alta médica cumplido.",
          indicaciones_reingreso: "Enoxaparina 40mg SC cada 24 hs por 20 días más. Cuidados de herida. Kinesiología motora sin carga total.",
          profesional_receptor_id: "prof-1",
          dispara_revision_vgi: true
        }
      }
    ],
    solicitudes_practicas_nivel1: [
      {
        id: "sol-601",
        fecha_solicitud: "2026-09-18",
        tipo_practica: "RX_PORTATIL",
        codigo_menu_pami: "340211 - Radiología de cadera y fémur portátil en cama",
        diagnostico_cie10: "S72.0 - Fractura del cuello de fémur (cadera)",
        justificacion_domiciliaria: "Control radiológico de control a los 30 días de reemplazo de cadera. Paciente imposibilitada de trasladarse en transporte regular.",
        profesional_solicitante_id: "prof-1",
        estado: "SOLICITADO"
      }
    ],
    historia_clinica: {
      antecedentes: "Varios infartos lacunares en TAC cerebral previa.",
      alergias: "Ninguna conocida.",
      medicacion_actual: [
        { droga: "Aspirina 100mg", posologia: "1 comp con almuerzo", horario: "12:30" },
        { droga: "Citicolina 500mg", posologia: "1 sobre por la mañana", horario: "08:30" }
      ],
      signos_vitales_ultimo: {
        fecha: "2026-10-18 10:00",
        tension_arterial: "135/85 mmHg",
        frecuencia_cardiaca: "70 lpm",
        temperatura: "36.3 °C",
        saturacion: "97%"
      },
      evoluciones: []
    },
    historia_social: {
      trayectoria_vida: "Nacida en Colonia Merou, afincada en Viale de joven. Muy laboriosa en huertas y confección de conservas.",
      red_apoyo: "Familia colaboradora y afectuosa.",
      situacion_previsional: "Pensión viudez ANSES / PAMI.",
      informes_sociales: []
    },
    valoraciones_especialidades: [],
    vgi_vigente: {
      id: "vgi-res-6",
      fecha_evaluacion: "2026-09-01",
      fecha_proxima_revision: "2027-03-01",
      estado_vigencia: "VIGENTE",
      profesional_id: "prof-1",
      barthel_puntaje: 55,
      barthel_clasificacion: "Dependencia Moderada",
      lawton_puntaje: 3,
      tinetti_puntaje: 16,
      tinetti_riesgo: "Riesgo Moderado de Caídas",
      pfeiffer_errores: 5,
      pfeiffer_clasificacion: "Deterioro Intelectual Moderado",
      yesavage_puntaje: 5,
      yesavage_clasificacion: "Sospecha de Depresión",
      gijon_puntaje: 9,
      gijon_clasificacion: "Situación Social Aceptable",
      sindromes_geriatricos: ["Incontinencia urinaria", "Deterioro cognitivo", "Riesgo de caídas"],
      bloqueado: true
    },
    pai_vigente: {
      id: "pai-res-6",
      fecha_elaboracion: "2026-09-05",
      fecha_revision_prevista: "2027-03-05",
      estado_cumplimiento: "EN_CURSO",
      objetivos_generales: "Preservación funcional en AVD básicas y estimulación cognitiva orientada a la realidad.",
      objetivos_especificos: [
        { area: "Psicología", meta: "Orientación en tiempo y espacio diaria y estimulación de reminiscencia", frecuencia: "Semanal", responsable: "Lic. Romina Schmidt" },
        { area: "Enfermería", meta: "Control de incontinencia con horario pautado al baño cada 2 horas", frecuencia: "Diaria", responsable: "Lic. Mariana Fontana" }
      ],
      firmas_equipo: ["prof-1", "prof-3", "prof-5"],
      bloqueado: true
    }
  }
];

export const INITIAL_PLANIFICACION_2026 = {
  anio_lectivo: 2026,
  institucion: "Hogar Gerontológico Madre Teresa - Municipalidad de Viale",
  mision: "Brindar una atención integral, interdisciplinaria y centrada en la persona para las personas mayores residentes, garantizando su dignidad, derechos, autonomía y participación comunitaria activa en la ciudad de Viale y la provincia de Entre Ríos.",
  ejes_estrategicos: [
    {
      id: "eje-1",
      nombre: "Eje 1: Calidad de Vida, Salud y Envejecimiento Activo",
      programas: [
        {
          nombre: "Programa de Prevención de Caídas y Movilidad Segura",
          objetivo: "Disminuir en un 30% la tasa de caídas mediante adecuación del entorno y kinesiología grupal.",
          meta: "100% de residentes valorados con escala Tinetti e integrados a plan kinésico.",
          responsable: "Lic. Julián Alarcón y Equipo Médico"
        },
        {
          nombre: "Programa de Estimulación Neurocognitiva y Reminiscencia",
          objetivo: "Mantener la reserva cognitiva y el bienestar afectivo a través del Taller de la Memoria.",
          meta: "Realización de 4 talleres semanales con asistencia mayor al 85%.",
          responsable: "Lic. Romina Schmidt"
        }
      ]
    },
    {
      id: "eje-2",
      nombre: "Eje 2: Integración Social, Familiar e Intergeneracional en Viale",
      programas: [
        {
          nombre: "Puentes de Encuentro: El Hogar y las Escuelas de Viale",
          objetivo: "Fomentar lazos intergeneracionales mediante visitas mensuales de escuelas primarias y secundarias locales.",
          meta: "8 jornadas intergeneracionales de intercambio de historias de vida y música.",
          responsable: "Lic. Carlos Benítez (Trabajo Social)"
        },
        {
          nombre: "Huerta Comunitaria y Jardinería Terapéutica 'Madre Teresa'",
          objetivo: "Recrear actividades tradicionales de la cultura del trabajo de Paraná Campaña.",
          meta: "Mantener huerta institucional activa con cosecha de aromáticas y verduras.",
          responsable: "Lic. Andrea Müller (Terapia Ocupacional)"
        }
      ]
    },
    {
      id: "eje-3",
      nombre: "Eje 3: Excelencia en Trazabilidad y Cumplimiento Normativo de Entre Ríos",
      programas: [
        {
          nombre: "Garantía de Legajo Único, VGI y PAI al 100%",
          objetivo: "Asegurar que ningún residente permanezca con VGI o PAI desactualizados por más de 180 días.",
          meta: "100% de cumplimiento en semáforo de vigencia y auditorías ministeriales.",
          responsable: "Dra. Beatriz Gómez y Equipo Interdisciplinario"
        }
      ]
    }
  ]
};

export const INITIAL_CRONOGRAMA_ACTIVIDADES = [
  {
    id: "act-1",
    taller_nombre: "Gimnasia Suave y Prevención de Caídas",
    dia_semana: "Lunes",
    horario: "09:30 - 10:30 hs",
    espacio: "Salón de Usos Múltiples (SUM)",
    profesional_responsable: "Lic. Julián Alarcón (Kinesiología)",
    tipo: "Físico / Terapéutico",
    asistentes_ids: ["res-1", "res-3", "res-5"]
  },
  {
    id: "act-2",
    taller_nombre: "Taller de la Memoria y Estimulación Cognitiva",
    dia_semana: "Martes",
    horario: "10:00 - 11:15 hs",
    espacio: "Comedor Principal / Biblioteca",
    profesional_responsable: "Lic. Romina Schmidt (Psicología)",
    tipo: "Cognitivo / Emocional",
    asistentes_ids: ["res-1", "res-3", "res-5", "res-6"]
  },
  {
    id: "act-3",
    taller_nombre: "Huerta Terapéutica y Jardinería",
    dia_semana: "Miércoles",
    horario: "16:00 - 17:15 hs",
    espacio: "Patio Arbolado y Canteros",
    profesional_responsable: "Lic. Andrea Müller (Terapia Ocupacional)",
    tipo: "Ocupacional / Naturaleza",
    asistentes_ids: ["res-1", "res-3"]
  },
  {
    id: "act-4",
    taller_nombre: "Musicoterapia, Tango y Reminiscencia Litoraleña",
    dia_semana: "Jueves",
    horario: "15:30 - 16:45 hs",
    espacio: "SUM",
    profesional_responsable: "Lic. Andrea Müller y Equipo de Enfermería",
    tipo: "Artístico / Recreativo",
    asistentes_ids: ["res-1", "res-2", "res-3", "res-5", "res-6"]
  },
  {
    id: "act-5",
    taller_nombre: "Cine Debate, Mateada Comunitaria y Encuentro Familiar",
    dia_semana: "Viernes",
    horario: "16:30 - 18:00 hs",
    espacio: "Galería Central y Salón",
    profesional_responsable: "Lic. Carlos Benítez (Trabajo Social)",
    tipo: "Social / Comunitario",
    asistentes_ids: ["res-1", "res-3", "res-4", "res-5"]
  }
];

export const INITIAL_INFORMES_PROFESIONALES = [
  {
    id: "inf-101",
    numero_informe: "INF-2026-001",
    profesional_id: "prof-3", // Lic. Mariana Fontana (Enfermería)
    tipo_informe: "DIARIO",
    fecha_emision: "2026-10-24",
    turno_horario: "Turno Mañana (07:00 a 14:00 hs)",
    periodo_semanal: "",
    area_disciplina: "Enfermería y Cuidados Generales",
    titulo: "Control Matinal de Signos Vitales, Curaciones Preventivas y Administración Farmacológica",
    resumen_ejecutivo: "Jornada matutina completada con estabilidad clínica en el 100% de la población. Buena tolerancia alimentaria e ingesta hídrica.",
    residentes_ids: ["res-1", "res-2", "res-5"],
    novedades_evolucion: "Relevo de guardia sin novedades de madrugada. Don Osvaldo Fontana despierta lúcido, deambula con bastón trípode. Doña Catalina Bähler con piel íntegra en prominencias óseas, sin signos de UPP. Don Mario Ruhl con TA controlada (120/75 mmHg).",
    intervenciones_realizadas: "Administración estricta de medicación cardiológica matinal. Higiene y cambio de decúbito de Doña Catalina. Curación preventiva en ambos talones con hidrocoloide. Control glucémico capilar a Don Juan Carlos Weiss (118 mg/dl en ayunas).",
    indicaciones_proximo_turno: "Reforzar hidratación en merienda para Doña Nélida Barzola. Realizar control tensional a Don Mario a las 18:00 hs previo a su anticoagulante.",
    fecha_creacion: "2026-10-24 13:45"
  },
  {
    id: "inf-102",
    numero_informe: "INF-2026-002",
    profesional_id: "prof-4", // Lic. Julián Alarcón (Kinesiología)
    tipo_informe: "SEMANAL",
    fecha_emision: "2026-10-23",
    turno_horario: "",
    periodo_semanal: "Semana del 19 al 23 de Octubre de 2026",
    area_disciplina: "Kinesiología y Fisioterapia Gerontológica",
    titulo: "Informe Semanal de Rehabilitación Motriz, Marcha Segura y Prevención de Caídas",
    resumen_ejecutivo: "Cumplimiento del 100% del cronograma de gimnasio adaptado. Progresión favorable en estabilidad dinámica y transferencias posturales.",
    residentes_ids: ["res-1", "res-3", "res-5"],
    novedades_evolucion: "Don Juan Carlos Weiss mantiene autonomía excelente para la marcha sin aditamentos (Índice Tinetti 25/28 pts). Don Mario Ruhl demostró gran motivación en circuito de marcha con andador de 4 ruedas alcanzando 60 metros sin fatiga. Don Osvaldo toleró ejercicios de flexoextensión de rodilla.",
    intervenciones_realizadas: "3 sesiones grupales de fortalecimiento de tren inferior. Ejercicios de propiocepción y equilibrio estático/dinámico. Reeducación de transferencias bipedestación-sedestación con Don Mario. Movilizaciones pasivas asistidas para residentes en silla de ruedas.",
    indicaciones_proximo_turno: "Mantener plan de marcha en galería soleada 15 minutos diarios con asistencia del personal de turno. Evaluar próximo control de Tinetti semestral en noviembre.",
    fecha_creacion: "2026-10-23 16:30"
  },
  {
    id: "inf-103",
    numero_informe: "INF-2026-003",
    profesional_id: "prof-1", // Dra. Emilia Montu
    tipo_informe: "DIARIO",
    fecha_emision: "2026-10-24",
    turno_horario: "Guardia / Ronda Médica Matinal (09:00 a 13:00 hs)",
    periodo_semanal: "",
    area_disciplina: "Clínica Médica y Geriatría",
    titulo: "Ronda Médica General, Evaluación Farmacológica y Seguimiento de Coagulación",
    resumen_ejecutivo: "Residentes en seguimiento clínico periódico con signos vitales dentro de parámetros normales. Sin procesos infecciosos agudos activos.",
    residentes_ids: ["res-1", "res-3", "res-5"],
    novedades_evolucion: "Don Mario Ruhl evaluado con laboratorio hematológico: RIN actual 2.4 (dentro de rango terapéutico 2.0-3.0 para su fibrilación auricular). Don Osvaldo Fontana refiere discreta gonalgia derecha matinal matizada con paracetamol SOS.",
    intervenciones_realizadas: "Auscultación cardiorrespiratoria en los 6 residentes. Control y ajuste de posología matinal. Se solicita analítica de control semestral para Don Osvaldo al laboratorio del Hospital San Roque de Viale.",
    indicaciones_proximo_turno: "Recepción de informe de laboratorio la próxima semana. Mantener pauta de protección gástrica matinal.",
    fecha_creacion: "2026-10-24 13:15"
  },
  {
    id: "inf-104",
    numero_informe: "INF-2026-004",
    profesional_id: "prof-2", // Lic. Gabriela Soledad Paul (Trabajo Social)
    tipo_informe: "SEMANAL",
    fecha_emision: "2026-10-22",
    turno_horario: "",
    periodo_semanal: "Semana del 16 al 22 de Octubre de 2026",
    area_disciplina: "Trabajo Social y Redes Comunitarias",
    titulo: "Informe Social Semanal: Vínculos Familiares, Acompañamiento Parroquial y Previsión",
    resumen_ejecutivo: "Sostenimiento activo de redes afectivas y vinculación con la comunidad de Viale. Asistencia a familias referentes y gestión previsional.",
    residentes_ids: ["res-2", "res-4"],
    novedades_evolucion: "Doña Catalina Bähler recibió visita de su sobrino tutor Héctor, coordinando compra de insumos de cuidado personal. Doña Nélida Barzola contó con acompañamiento afectivo de voluntarias de la Parroquia Santa Ana de Viale, evidenciando mejoría anímica notable.",
    intervenciones_realizadas: "2 entrevistas de orientación con referentes familiares. Articulación con el grupo de voluntariado parroquial para la mateada de fin de semana. Trámite de renovación de cobertura de pañales PAMI ante la agencia local.",
    indicaciones_proximo_turno: "Coordinar visita de alumnos de escuela secundaria de Viale para proyecto intergeneracional de lectura el próximo mes.",
    fecha_creacion: "2026-10-22 17:00"
  }
];

