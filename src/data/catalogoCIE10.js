// ============================================================
// CATÁLOGO DIAGNÓSTICO CIE-10 GERONTOLÓGICO (PAMI RES. 284/05)
// Clasificación Internacional de Enfermedades - Décima Revisión
// ============================================================

export const CATALOGO_CIE10 = [
  { codigo: "I10", nombre: "Hipertensión esencial (primaria)", categoria: "Cardiovascular" },
  { codigo: "I50.9", nombre: "Insuficiencia cardíaca, no especificada", categoria: "Cardiovascular" },
  { codigo: "I25.1", nombre: "Enfermedad aterosclerótica del corazón (Cardiopatía isquémica)", categoria: "Cardiovascular" },
  { codigo: "I48", nombre: "Fibrilación y aleteo auricular", categoria: "Cardiovascular" },
  { codigo: "I69.3", nombre: "Secuelas de infarto cerebral (ACV)", categoria: "Neurología" },
  { codigo: "G30.9", nombre: "Enfermedad de Alzheimer, no especificada", categoria: "Neurología / Salud Mental" },
  { codigo: "F01.9", nombre: "Demencia vascular, no especificada", categoria: "Neurología / Salud Mental" },
  { codigo: "F03", nombre: "Demencia senil no especificada", categoria: "Neurología / Salud Mental" },
  { codigo: "G20", nombre: "Enfermedad de Parkinson", categoria: "Neurología" },
  { codigo: "F32.9", nombre: "Episodio depresivo, no especificado (Depresión en la vejez)", categoria: "Salud Mental" },
  { codigo: "F05.9", nombre: "Delirio no especificado / Síndrome confusional agudo", categoria: "Salud Mental" },
  { codigo: "E11.9", nombre: "Diabetes mellitus tipo 2 sin mención de complicación", categoria: "Endocrino / Metabólico" },
  { codigo: "E03.9", nombre: "Hipotiroidismo, no especificado", categoria: "Endocrino / Metabólico" },
  { codigo: "J44.9", nombre: "Enfermedad pulmonar obstructiva crónica (EPOC), no especificada", categoria: "Respiratorio" },
  { codigo: "J18.9", nombre: "Neumonía, no especificada", categoria: "Respiratorio" },
  { codigo: "M15.9", nombre: "Poliartrosis, no especificada", categoria: "Osteoarticular" },
  { codigo: "M17.9", nombre: "Gonartrosis (artrosis de rodilla), no especificada", categoria: "Osteoarticular" },
  { codigo: "M16.9", nombre: "Coxartrosis (artrosis de cadera), no especificada", categoria: "Osteoarticular" },
  { codigo: "M81.9", nombre: "Osteoporosis no especificada, sin fractura", categoria: "Osteoarticular" },
  { codigo: "S72.0", nombre: "Fractura del cuello de fémur (cadera)", categoria: "Traumatología" },
  { codigo: "N39.0", nombre: "Infección de vías urinarias, sitio no especificado", categoria: "Urología / Renal" },
  { codigo: "N18.9", nombre: "Enfermedad renal crónica, no especificada", categoria: "Urología / Renal" },
  { codigo: "N40", nombre: "Hiperplasia de la próstata", categoria: "Urología / Renal" },
  { codigo: "L89.9", nombre: "Úlcera por decúbito y área de presión, no especificada", categoria: "Dermatología" },
  { codigo: "R54", nombre: "Senilidad / Fragilidad del adulto mayor", categoria: "Geriatría General" },
  { codigo: "R26.8", nombre: "Otras anomalías de la marcha y de la movilidad / Caídas frecuentes", categoria: "Geriatría General" },
  { codigo: "R32", nombre: "Incontinencia urinaria, no especificada", categoria: "Geriatría General" },
  { codigo: "R13", nombre: "Disfagia (dificultad para deglutir)", categoria: "Digestivo" },
  { codigo: "K59.0", nombre: "Constipación / Estreñimiento crónico", categoria: "Digestivo" },
  { codigo: "H54.2", nombre: "Baja visión en ambos ojos / Déficit visual severo", categoria: "Oftalmología" },
  { codigo: "H91.9", nombre: "Hipoacusia senil (presbiacusia)", categoria: "Otorrinolaringología" }
];

export function buscarCIE10(texto) {
  if (!texto) return CATALOGO_CIE10.slice(0, 10);
  const q = texto.toLowerCase().trim();
  return CATALOGO_CIE10.filter(item => 
    item.codigo.toLowerCase().includes(q) || 
    item.nombre.toLowerCase().includes(q) || 
    item.categoria.toLowerCase().includes(q)
  );
}

