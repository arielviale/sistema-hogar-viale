// ============================================================
// STORE CENTRAL DEL SISTEMA HOGAR MADRE TERESA
// Persistencia en LocalStorage y Eventos de Actualización
// ============================================================

import {
  INITIAL_PROFESIONALES,
  INITIAL_RESIDENTES,
  INITIAL_PLANIFICACION_2026,
  INITIAL_CRONOGRAMA_ACTIVIDADES,
  INITIAL_INFORMES_PROFESIONALES
} from '../data/initialData.js';

const STORAGE_KEY = 'hogar_madre_teresa_db_v2';

class Store {
  constructor() {
    this.listeners = [];
    this.data = this.loadData();
    this.activeView = 'dashboard'; // dashboard | legajos | vgi_pai | grilla | diagnostico | planificacion | equipo
    this.selectedResidentId = null;
    this.currentProfessionalId = 'prof-1'; // Dra. Silvina Rossi por defecto
  }

  loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const FOTOS_MAP = {
          'res-1': '/assets/residente_modelo.jpg',
          'res-2': '/assets/res-2_catalina.jpg',
          'res-3': '/assets/res-3_juan_carlos.jpg',
          'res-4': '/assets/res-4_nelida.jpg',
          'res-5': '/assets/res-5_mario.jpg',
          'res-6': '/assets/res-6_ester.jpg'
        };

        // Asignación de retratos reales a cada integrante
        if (parsed.residentes && Array.isArray(parsed.residentes)) {
          let updated = false;
          parsed.residentes.forEach(r => {
            if (FOTOS_MAP[r.id] && (!r.foto_url || r.foto_url !== FOTOS_MAP[r.id])) {
              r.foto_url = FOTOS_MAP[r.id];
              updated = true;
            }
          });
          if (updated) {
            this.saveData(parsed);
          }
        }

        // Normalización estricta: sólo 2 sectores válidos (Sector Varones y Sector Mujeres)
        if (parsed.residentes && Array.isArray(parsed.residentes)) {
          let updated = false;
          parsed.residentes.forEach(r => {
            if (r.estado_habitacional) {
              const sectorTarget = (r.sexo === 'Femenino' || (r.nombre_completo && r.nombre_completo.startsWith('Doña')))
                ? 'Sector Mujeres'
                : 'Sector Varones';

              if (!r.estado_habitacional.includes('Sector Varones') && !r.estado_habitacional.includes('Sector Mujeres')) {
                r.estado_habitacional = r.estado_habitacional.replace(/Sector\s+[\wáéíóúÁÉÍÓÚ]+/gi, sectorTarget);
                if (!r.estado_habitacional.includes('Sector')) {
                  r.estado_habitacional = `${r.estado_habitacional} - ${sectorTarget}`;
                }
                updated = true;
              }
            }
          });
          if (updated) {
            this.saveData(parsed);
          }
        }

        if (!parsed.informes_profesionales || !Array.isArray(parsed.informes_profesionales) || parsed.informes_profesionales.length === 0) {
          parsed.informes_profesionales = INITIAL_INFORMES_PROFESIONALES;
          this.saveData(parsed);
        }

        return parsed;
      }
    } catch (e) {
      console.error('Error cargando LocalStorage:', e);
    }

    const defaultData = {
      profesionales: INITIAL_PROFESIONALES,
      residentes: INITIAL_RESIDENTES,
      planificacion: INITIAL_PLANIFICACION_2026,
      cronograma: INITIAL_CRONOGRAMA_ACTIVIDADES,
      informes_profesionales: INITIAL_INFORMES_PROFESIONALES,
      informe_diagnostico_narrativo: "En el presente período 2026, la población del Hogar Madre Teresa de Viale mantiene una media de edad de 87.5 años con predominio de patologías cardiovasculares y neurocognitivas. Se observa un 83% de cobertura con VGI y PAI vigentes, con una meta institucional obligatoria de alcanzar y sostener el 100% de vigencia continua.",
      fecha_ultimo_informe: "2026-10-15"
    };
    this.saveData(defaultData);
    return defaultData;
  }

  saveData(dataToSave = this.data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('Error guardando en LocalStorage:', e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.saveData();
    this.listeners.forEach(l => l(this.data));
  }

  // --- Navegación y Sesión ---
  setView(viewName, residentId = null) {
    this.activeView = viewName;
    if (residentId !== null) {
      this.selectedResidentId = residentId;
    }
    this.notify();
  }

  setActiveProfessional(profId) {
    this.currentProfessionalId = profId;
    this.notify();
  }

  getActiveProfessional() {
    return this.data.profesionales.find(p => p.id === this.currentProfessionalId) || this.data.profesionales[0];
  }

  // --- Cálculos y Métricas Clave (VGI / PAI 100%) ---
  getEstadisticas() {
    const totalResidentes = this.data.residentes.length;
    let vigentes = 0;
    let proximas = 0;
    let vencidas = 0;

    let totalBarthel = 0;
    let autovalidos = 0;
    let depLeve = 0;
    let depMod = 0;
    let depGrave = 0;

    let pamiCount = 0;
    let iosperCount = 0;

    this.data.residentes.forEach(r => {
      // Obra Social
      if (r.obra_social === 'PAMI') pamiCount++;
      else if (r.obra_social === 'IOSPER') iosperCount++;

      // VGI Vigencia
      if (r.vgi_vigente) {
        if (r.vgi_vigente.estado_vigencia === 'VIGENTE') vigentes++;
        else if (r.vgi_vigente.estado_vigencia === 'PROXIMO_A_VENCER') proximas++;
        else vencidas++;

        // Barthel
        const b = r.vgi_vigente.barthel_puntaje || 0;
        totalBarthel += b;
        if (b >= 90) autovalidos++;
        else if (b >= 60) depLeve++;
        else if (b >= 40) depMod++;
        else depGrave++;
      } else {
        vencidas++;
      }
    });

    const porcentajeVigentes = totalResidentes > 0 ? Math.round((vigentes / totalResidentes) * 100) : 0;
    const promedioBarthel = totalResidentes > 0 ? Math.round(totalBarthel / totalResidentes) : 0;

    return {
      totalResidentes,
      vigentes,
      proximas,
      vencidas,
      porcentajeVigentes,
      promedioBarthel,
      autovalidos,
      depLeve,
      depMod,
      depGrave,
      pamiCount,
      iosperCount,
      totalProfesionales: this.data.profesionales.filter(p => p.activo).length
    };
  }

  // --- Operaciones Profesionales ---
  addOrUpdateProfesional(prof) {
    if (prof.id) {
      const idx = this.data.profesionales.findIndex(p => p.id === prof.id);
      if (idx !== -1) {
        this.data.profesionales[idx] = { ...this.data.profesionales[idx], ...prof };
      }
    } else {
      const newProf = {
        ...prof,
        id: `prof-${Date.now()}`,
        activo: true
      };
      this.data.profesionales.push(newProf);
    }
    this.notify();
  }

  // --- Operaciones Residentes y Legajo ---
  addResidente(resData) {
    const nextNumber = this.data.residentes.length + 1;
    const year = new Date().getFullYear();
    const formattedLegajo = `LUR-${year}-${String(nextNumber).padStart(3, '0')}`;

    const newRes = {
      id: `res-${Date.now()}`,
      numero_legajo: formattedLegajo,
      estado: "ACTIVO",
      polifarmacia: false,
      continente: "Continente",
      movilidad: "Autoválido",
      historia_clinica: {
        antecedentes: resData.antecedentes || "Sin antecedentes patológicos consignados.",
        alergias: resData.alergias || "No refiere alergias.",
        medicacion_actual: [],
        signos_vitales_ultimo: {
          fecha: new Date().toISOString().replace('T', ' ').slice(0, 16),
          tension_arterial: "120/80 mmHg",
          frecuencia_cardiaca: "72 lpm",
          temperatura: "36.5 °C",
          saturacion: "98%"
        },
        evoluciones: []
      },
      historia_social: {
        trayectoria_vida: resData.trayectoria_vida || "Ingresante a la institución.",
        red_apoyo: resData.red_apoyo || "Familia referente en Viale.",
        situacion_previsional: resData.obra_social || "En trámite",
        informes_sociales: []
      },
      valoraciones_especialidades: [],
      vgi_vigente: null,
      pai_vigente: null,
      ...resData
    };

    this.data.residentes.unshift(newRes);
    this.selectedResidentId = newRes.id;
    this.notify();
    return newRes;
  }

  updateResidente(residenteId, updatedFields) {
    const idx = this.data.residentes.findIndex(r => r.id === residenteId);
    if (idx !== -1) {
      this.data.residentes[idx] = { ...this.data.residentes[idx], ...updatedFields };
      this.notify();
      return this.data.residentes[idx];
    }
    return null;
  }

  addEvolucionMedica(residenteId, evolucion) {
    const res = this.data.residentes.find(r => r.id === residenteId);
    if (!res) return;
    if (!res.historia_clinica.evoluciones) res.historia_clinica.evoluciones = [];

    const newEvo = {
      id: `evo-${Date.now()}`,
      fecha_hora: new Date().toISOString().replace('T', ' ').slice(0, 16),
      profesional_id: this.currentProfessionalId,
      bloqueado: true,
      ...evolucion
    };

    res.historia_clinica.evoluciones.unshift(newEvo);
    this.notify();
  }

  addInformeSocial(residenteId, informe) {
    const res = this.data.residentes.find(r => r.id === residenteId);
    if (!res) return;
    if (!res.historia_social.informes_sociales) res.historia_social.informes_sociales = [];

    const newInf = {
      id: `soc-${Date.now()}`,
      fecha_hora: new Date().toISOString().replace('T', ' ').slice(0, 16),
      profesional_id: this.currentProfessionalId,
      bloqueado: true,
      ...informe
    };

    res.historia_social.informes_sociales.unshift(newInf);
    this.notify();
  }

  addValoracionEspecialidad(residenteId, val) {
    const res = this.data.residentes.find(r => r.id === residenteId);
    if (!res) return;
    if (!res.valoraciones_especialidades) res.valoraciones_especialidades = [];

    const newVal = {
      id: `val-${Date.now()}`,
      fecha_hora: new Date().toISOString().replace('T', ' ').slice(0, 16),
      profesional_id: this.currentProfessionalId,
      bloqueado: true,
      ...val
    };

    res.valoraciones_especialidades.unshift(newVal);
    this.notify();
  }

  // --- Guardado Integral de VGI ---
  saveVgi(residenteId, vgiFormData) {
    const res = this.data.residentes.find(r => r.id === residenteId);
    if (!res) return;

    // Calcular clasificación Barthel
    const barthel = Number(vgiFormData.barthel_puntaje) || 0;
    let barthelClass = "Independiente / Autoválido";
    if (barthel < 20) barthelClass = "Dependencia Total";
    else if (barthel <= 55) barthelClass = "Dependencia Grave";
    else if (barthel <= 85) barthelClass = "Dependencia Moderada";
    else if (barthel <= 95) barthelClass = "Dependencia Leve";

    // Calcular fecha revisión a 6 meses
    const fechaEval = new Date();
    const fechaRev = new Date();
    fechaRev.setMonth(fechaRev.getMonth() + 6);

    const vgiFinal = {
      id: `vgi-${Date.now()}`,
      fecha_evaluacion: fechaEval.toISOString().slice(0, 10),
      fecha_proxima_revision: fechaRev.toISOString().slice(0, 10),
      estado_vigencia: "VIGENTE",
      profesional_id: this.currentProfessionalId,
      barthel_puntaje: barthel,
      barthel_clasificacion: barthelClass,
      lawton_puntaje: Number(vgiFormData.lawton_puntaje) || 0,
      tinetti_puntaje: Number(vgiFormData.tinetti_puntaje) || 0,
      tinetti_riesgo: (Number(vgiFormData.tinetti_puntaje) < 19) ? "Alto Riesgo de Caídas" : ((Number(vgiFormData.tinetti_puntaje) <= 24) ? "Riesgo Moderado" : "Bajo Riesgo"),
      pfeiffer_errores: Number(vgiFormData.pfeiffer_errores) || 0,
      pfeiffer_clasificacion: (Number(vgiFormData.pfeiffer_errores) <= 2) ? "Función Intelectual Intacta" : ((Number(vgiFormData.pfeiffer_errores) <= 4) ? "Deterioro Leve" : "Deterioro Moderado/Severo"),
      yesavage_puntaje: Number(vgiFormData.yesavage_puntaje) || 0,
      yesavage_clasificacion: (Number(vgiFormData.yesavage_puntaje) >= 6) ? "Sospecha de Depresión" : "Normal",
      gijon_puntaje: Number(vgiFormData.gijon_puntaje) || 0,
      gijon_clasificacion: (Number(vgiFormData.gijon_puntaje) > 10) ? "Riesgo Social" : "Buena Situación",
      sindromes_geriatricos: vgiFormData.sindromes_geriatricos || [],
      bloqueado: true
    };

    res.vgi_vigente = vgiFinal;
    this.notify();
  }

  // --- Guardado Integral de PAI ---
  savePai(residenteId, paiFormData) {
    const res = this.data.residentes.find(r => r.id === residenteId);
    if (!res) return;

    const fechaElab = new Date();
    const fechaRev = new Date();
    fechaRev.setMonth(fechaRev.getMonth() + 6);

    const paiFinal = {
      id: `pai-${Date.now()}`,
      fecha_elaboracion: fechaElab.toISOString().slice(0, 10),
      fecha_revision_prevista: fechaRev.toISOString().slice(0, 10),
      estado_cumplimiento: "EN_CURSO",
      objetivos_generales: paiFormData.objetivos_generales || "Optimización de calidad de vida y mantenimiento funcional.",
      objetivos_especificos: paiFormData.objetivos_especificos || [],
      firmas_equipo: [this.currentProfessionalId],
      bloqueado: true
    };

    res.pai_vigente = paiFinal;
    this.notify();
  }

  // --- Cronograma y Asistencia ---
  toggleAsistenciaActividad(actividadId, residenteId) {
    const act = this.data.cronograma.find(a => a.id === actividadId);
    if (!act) return;

    if (!act.asistentes_ids) act.asistentes_ids = [];
    const index = act.asistentes_ids.indexOf(residenteId);
    if (index === -1) {
      act.asistentes_ids.push(residenteId);
    } else {
      act.asistentes_ids.splice(index, 1);
    }
    this.notify();
  }

  // --- Gestión de Informes Profesionales (Diarios y Semanales) ---
  addInformeProfesional(informeData) {
    if (!this.data.informes_profesionales) {
      this.data.informes_profesionales = [];
    }

    const year = new Date().getFullYear();
    const nextNum = this.data.informes_profesionales.length + 1;
    const numero_informe = `INF-${year}-${String(nextNum).padStart(3, '0')}`;

    const newInforme = {
      id: `inf-${Date.now()}`,
      numero_informe,
      profesional_id: this.currentProfessionalId,
      fecha_emision: new Date().toISOString().slice(0, 10),
      fecha_creacion: new Date().toISOString().replace('T', ' ').slice(0, 16),
      tipo_informe: "DIARIO",
      turno_horario: "",
      periodo_semanal: "",
      area_disciplina: "General",
      titulo: "Informe Profesional de Guardia / Área",
      resumen_ejecutivo: "",
      residentes_ids: [],
      novedades_evolucion: "",
      intervenciones_realizadas: "",
      indicaciones_proximo_turno: "",
      ...informeData
    };

    this.data.informes_profesionales.unshift(newInforme);
    this.notify();
    return newInforme;
  }

  deleteInformeProfesional(id) {
    if (!this.data.informes_profesionales) return;
    this.data.informes_profesionales = this.data.informes_profesionales.filter(i => i.id !== id);
    this.notify();
  }

  resetToDefault() {
    localStorage.removeItem(STORAGE_KEY);
    this.data = this.loadData();
    this.notify();
  }
}

export const store = new Store();
