// ============================================================
// STORE CENTRAL DEL SISTEMA HOGAR MADRE TERESA
// Persistencia en LocalStorage y Eventos de Actualización
// ============================================================

import {
  INITIAL_AUTORIDAD_MUNICIPAL,
  INITIAL_PROFESIONALES,
  INITIAL_RESIDENTES,
  INITIAL_PLANIFICACION_2026,
  INITIAL_CRONOGRAMA_ACTIVIDADES,
  INITIAL_INFORMES_PROFESIONALES
} from '../data/initialData.js';

const STORAGE_KEY = 'hogar_madre_teresa_db_v3';

class Store {
  constructor() {
    this.listeners = [];
    this.data = this.loadData();
    this.activeView = 'dashboard'; // dashboard | legajos | vgi_pai | grilla | diagnostico | planificacion | equipo
    this.selectedResidentId = null;
    this.currentProfessionalId = 'prof-3'; // Lic. María del Valle Rojas (Coordinadora) por defecto
  }

  loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const FOTOS_MAP = {
          'res-1': '/assets/residente_modelo.jpg',
          'res-2': '/assets/res-2_catalina.jpg',
          'res-3': '/assets/res-3_juan_carlos.jpg',
          'res-4': '/assets/res-4_nelida.jpg',
          'res-5': '/assets/res-5_mario.jpg',
          'res-6': '/assets/res-6_ester.jpg'
        };

        // Mantener nómina oficial actualizada siempre
        parsed.profesionales = INITIAL_PROFESIONALES;
        parsed.autoridad_municipal = INITIAL_AUTORIDAD_MUNICIPAL;

        // Asignación de retratos reales a cada integrante y sincronización de referentes familiares
        if (parsed.residentes && Array.isArray(parsed.residentes)) {
          let updated = false;
          parsed.residentes.forEach(r => {
            if (FOTOS_MAP[r.id] && (!r.foto_url || r.foto_url !== FOTOS_MAP[r.id])) {
              r.foto_url = FOTOS_MAP[r.id];
              updated = true;
            }

            // Inicializar array de múltiples referentes familiares si no existe
            if (!r.referentes_familiares || !Array.isArray(r.referentes_familiares) || r.referentes_familiares.length === 0) {
              const refNombre = r.referente_familiar ? r.referente_familiar.split('(')[0].trim() : "Familiar Referente";
              const refTel = r.referente_familiar && r.referente_familiar.includes('Tel:') 
                ? r.referente_familiar.split('Tel:')[1].replace(')', '').trim() 
                : '0343-154982314';
              const parentescoDetectado = r.referente_familiar && r.referente_familiar.toLowerCase().includes('hija') ? 'Hija'
                : (r.referente_familiar && r.referente_familiar.toLowerCase().includes('hijo') ? 'Hijo'
                : (r.referente_familiar && r.referente_familiar.toLowerCase().includes('esposa') ? 'Esposa' : 'Familiar Directo'));

              r.referentes_familiares = [
                {
                  id: `ref-fam-${r.id}-1`,
                  nombre_completo: refNombre,
                  parentesco: parentescoDetectado,
                  telefono: refTel,
                  direccion: "Viale, Entre Ríos",
                  es_principal: true,
                  recibe_informes: true
                }
              ];
              updated = true;
            }

            // Sincronizar campos PAMI Res. 284/05 si faltan en el cache
            const initRes = INITIAL_RESIDENTES.find(ir => ir.id === r.id);
            if (initRes) {
              if (!r.medico_cabecera && initRes.medico_cabecera) {
                r.medico_cabecera = initRes.medico_cabecera;
                updated = true;
              }
              if ((!r.visitas_medico_cabecera || r.visitas_medico_cabecera.length === 0) && initRes.visitas_medico_cabecera) {
                r.visitas_medico_cabecera = initRes.visitas_medico_cabecera;
                updated = true;
              }
              if ((!r.referencias_contrarreferencias || r.referencias_contrarreferencias.length === 0) && initRes.referencias_contrarreferencias) {
                r.referencias_contrarreferencias = initRes.referencias_contrarreferencias;
                updated = true;
              }
              if ((!r.solicitudes_practicas_nivel1 || r.solicitudes_practicas_nivel1.length === 0) && initRes.solicitudes_practicas_nivel1) {
                r.solicitudes_practicas_nivel1 = initRes.solicitudes_practicas_nivel1;
                updated = true;
              }
            } else {
              if (!r.visitas_medico_cabecera) r.visitas_medico_cabecera = [];
              if (!r.referencias_contrarreferencias) r.referencias_contrarreferencias = [];
              if (!r.solicitudes_practicas_nivel1) r.solicitudes_practicas_nivel1 = [];
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

        // Sincronizar autoridad municipal
        parsed.autoridad_municipal = INITIAL_AUTORIDAD_MUNICIPAL;
        if (parsed.profesionales && Array.isArray(parsed.profesionales)) {
          const p8 = parsed.profesionales.find(p => p.id === 'prof-8');
          if (p8 && p8.profesion && p8.profesion.includes('Dirección')) {
            p8.profesion = "Médica Especialista en Gerontología Clínica";
            p8.especialidad = "Salud Pública y Asesoría Gerontológica";
          }
        }

        return parsed;
      }
    } catch (e) {
      console.error('Error cargando LocalStorage:', e);
    }

    const defaultData = {
      autoridad_municipal: INITIAL_AUTORIDAD_MUNICIPAL,
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

  // --- Cálculos y Métricas Clave (VGI / PAI 100% y PAMI Res. 284/05) ---
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

    // Métricas específicas PAMI Res. 284/05
    let pamiVisitasAlDia = 0;
    let pamiVisitasPendientes = 0;
    const residentesVisitasAlerta = [];
    let derivacionesActivas = 0;
    let totalSolicitudesPracticas = 0;

    const hoy = new Date().toISOString().slice(0, 10);

    this.data.residentes.forEach(r => {
      // Obra Social
      const esPami = r.obra_social === 'PAMI';
      if (esPami) pamiCount++;
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

      // Control Visitas Médico de Cabecera (Res. 284/05 - mensual obligatoria)
      const visitas = r.visitas_medico_cabecera || [];
      if (visitas.length > 0) {
        const ultVisita = visitas[0];
        const limite = ultVisita.proxima_visita_limite || ultVisita.fecha_hora.slice(0, 10);
        // Verificar si la fecha límite ya expiró o si pasaron más de 30 días
        const diasDiff = Math.round((new Date(hoy) - new Date(ultVisita.fecha_hora.slice(0, 10))) / (1000 * 60 * 60 * 24));
        if (diasDiff <= 30) {
          if (esPami) pamiVisitasAlDia++;
        } else {
          if (esPami) {
            pamiVisitasPendientes++;
            residentesVisitasAlerta.push({
              ...r,
              dias_sin_visita: diasDiff,
              ultima_visita: ultVisita.fecha_hora.slice(0, 10)
            });
          }
        }
      } else {
        if (esPami) {
          pamiVisitasPendientes++;
          residentesVisitasAlerta.push({
            ...r,
            dias_sin_visita: 999,
            ultima_visita: 'Sin registro'
          });
        }
      }

      // Derivaciones activas
      const refs = r.referencias_contrarreferencias || [];
      refs.forEach(ref => {
        if (ref.estado === 'EN_CURSO') derivacionesActivas++;
      });

      // Solicitudes de prácticas de I Nivel
      const sols = r.solicitudes_practicas_nivel1 || [];
      totalSolicitudesPracticas += sols.length;
    });

    const porcentajeVigentes = totalResidentes > 0 ? Math.round((vigentes / totalResidentes) * 100) : 0;
    const promedioBarthel = totalResidentes > 0 ? Math.round(totalBarthel / totalResidentes) : 0;
    const porcentajeVisitasPami = pamiCount > 0 ? Math.round((pamiVisitasAlDia / pamiCount) * 100) : 100;

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
      pamiVisitasAlDia,
      pamiVisitasPendientes,
      porcentajeVisitasPami,
      residentesVisitasAlerta,
      derivacionesActivas,
      totalSolicitudesPracticas,
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
      referentes_familiares: resData.referentes_familiares && resData.referentes_familiares.length > 0 
        ? resData.referentes_familiares 
        : [
            {
              id: `ref-fam-${Date.now()}-1`,
              nombre_completo: resData.referente_familiar || "Familiar Referente",
              parentesco: "Referente Familiar",
              telefono: resData.telefono_emergencia || "0343-4920112",
              direccion: "Viale, Entre Ríos",
              es_principal: true,
              recibe_informes: true
            }
          ],
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
      medico_cabecera: resData.medico_cabecera || {
        nombre: "A Designar / UGL XIV",
        matricula: "Pendiente",
        ugl: "UGL XIV - Paraná",
        frecuencia_visita_exigida: "Mensual obligatoria (Res. 284/05)"
      },
      visitas_medico_cabecera: [],
      referencias_contrarreferencias: [],
      solicitudes_practicas_nivel1: [],
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
      this.saveData();
      this.notify();
      return this.data.residentes[idx];
    }
    return null;
  }

  // Operaciones con Red Vincular y Múltiples Referentes Familiares
  addReferenteFamiliar(residenteId, referenteData) {
    const res = this.data.residentes.find(r => r.id === residenteId);
    if (!res) return null;
    if (!res.referentes_familiares) res.referentes_familiares = [];

    // Si este se marca como principal, desmarcar anteriores
    if (referenteData.es_principal) {
      res.referentes_familiares.forEach(rf => rf.es_principal = false);
    }

    const newRef = {
      id: `ref-fam-${Date.now()}`,
      nombre_completo: referenteData.nombre_completo || "Familiar",
      parentesco: referenteData.parentesco || "Familiar",
      telefono: referenteData.telefono || "",
      direccion: referenteData.direccion || "Viale, Entre Ríos",
      es_principal: Boolean(referenteData.es_principal),
      recibe_informes: referenteData.recibe_informes !== false
    };

    res.referentes_familiares.push(newRef);
    // Sincronizar string legado para mantener compatibilidad
    if (newRef.es_principal || res.referentes_familiares.length === 1) {
      res.referente_familiar = `${newRef.nombre_completo} (${newRef.parentesco} - Tel: ${newRef.telefono})`;
    }

    this.saveData();
    this.notify();
    return newRef;
  }

  removeReferenteFamiliar(residenteId, refId) {
    const res = this.data.residentes.find(r => r.id === residenteId);
    if (!res || !res.referentes_familiares) return;

    res.referentes_familiares = res.referentes_familiares.filter(rf => rf.id !== refId);
    if (res.referentes_familiares.length > 0 && !res.referentes_familiares.some(rf => rf.es_principal)) {
      res.referentes_familiares[0].es_principal = true;
      res.referente_familiar = `${res.referentes_familiares[0].nombre_completo} (${res.referentes_familiares[0].parentesco} - Tel: ${res.referentes_familiares[0].telefono})`;
    }
    this.saveData();
    this.notify();
  }

  setReferentePrincipal(residenteId, refId) {
    const res = this.data.residentes.find(r => r.id === residenteId);
    if (!res || !res.referentes_familiares) return;

    res.referentes_familiares.forEach(rf => {
      rf.es_principal = (rf.id === refId);
      if (rf.es_principal) {
        res.referente_familiar = `${rf.nombre_completo} (${rf.parentesco} - Tel: ${rf.telefono})`;
      }
    });
    this.saveData();
    this.notify();
  }

  // --- Control de Acceso por Roles y Sectores (RBAC) ---
  canAccessClinical() {
    const prof = this.getActiveProfessional();
    if (!prof) return true;
    return prof.acceso_clinico === true || 
           ['coordinacion', 'medica', 'interdisciplinario', 'enfermeria'].includes(prof.sector) ||
           ['admin_clinico', 'medica', 'profesional_salud', 'enfermera'].includes(prof.role);
  }

  canEditVgiPai() {
    const prof = this.getActiveProfessional();
    if (!prof) return true;
    return ['coordinacion', 'medica', 'interdisciplinario'].includes(prof.sector) ||
           ['admin_clinico', 'medica', 'profesional_salud'].includes(prof.role);
  }

  canAccessCocina() {
    const prof = this.getActiveProfessional();
    if (!prof) return true;
    return prof.sector === 'cocina' || prof.sector === 'coordinacion' || prof.role === 'admin_clinico' || prof.role === 'nutricionista';
  }

  isCuidadorOrEnfermero() {
    const prof = this.getActiveProfessional();
    if (!prof) return true;
    return prof.sector === 'cuidadores' || prof.sector === 'enfermeria' || prof.role === 'cuidador' || prof.role === 'enfermera';
  }

  getSectorInfo(sectorKey) {
    const SECTORES = {
      coordinacion: { label: "Coordinación General", icono: "👑", badge: "badge-coordinacion", accesoTotal: true },
      medica: { label: "Atención Médica", icono: "🩺", badge: "badge-medica", accesoTotal: true },
      interdisciplinario: { label: "Equipo Interdisciplinario", icono: "🧩", badge: "badge-interdisciplinario", accesoTotal: true },
      enfermeria: { label: "Enfermería Institucional", icono: "💉", badge: "badge-enfermeria", accesoTotal: true },
      cuidadores: { label: "Cuidadores y Auxiliares", icono: "🤝", badge: "badge-cuidadores", accesoTotal: false },
      talleres: { label: "Talleres y Estimulación", icono: "🎨", badge: "badge-talleres", accesoTotal: false },
      cocina: { label: "Servicio de Cocina", icono: "🍲", badge: "badge-cocina", accesoTotal: false },
      mantenimiento: { label: "Ordenanza y Limpieza", icono: "🧹", badge: "badge-mantenimiento", accesoTotal: false }
    };
    return SECTORES[sectorKey] || { label: sectorKey || "General", icono: "👤", badge: "badge-secondary", accesoTotal: false };
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

  // --- PAMI Res. 284/05: Visitas Mensuales Obligatorias ---
  addVisitaMedicoCabecera(residenteId, visita) {
    const res = this.data.residentes.find(r => r.id === residenteId);
    if (!res) return null;
    if (!res.visitas_medico_cabecera) res.visitas_medico_cabecera = [];

    const now = new Date();
    const proxima = new Date();
    proxima.setDate(proxima.getDate() + 30);

    const newVisita = {
      id: `visita-${Date.now()}`,
      fecha_hora: visita.fecha_hora || now.toISOString().replace('T', ' ').slice(0, 16),
      profesional_id: visita.profesional_id || this.currentProfessionalId,
      medico_nombre: visita.medico_nombre || res.medico_cabecera?.nombre || "Médico de Cabecera PAMI",
      medico_matricula: visita.medico_matricula || res.medico_cabecera?.matricula || "M.P. Entre Ríos",
      diagnostico_cie10: visita.diagnostico_cie10 || "Z00.0 - Examen médico general",
      motivo_visita: visita.motivo_visita || "Control mensual reglamentario Res. 284/05 INSSJP",
      hallazgos_clinicos: visita.hallazgos_clinicos || "Examen físico sin alteraciones agudas.",
      ajuste_farmacologico: visita.ajuste_farmacologico || "Se mantiene esquema terapéutico habitual.",
      conducta_seguimiento: visita.conducta_seguimiento || "Próximo control programado a 30 días.",
      proxima_visita_limite: visita.proxima_visita_limite || proxima.toISOString().slice(0, 10),
      bloqueado: true
    };

    res.visitas_medico_cabecera.unshift(newVisita);
    this.notify();
    return newVisita;
  }

  // --- PAMI Res. 284/05: Referencia a Nivel II/III (Derivación) ---
  addDerivacionNivel2(residenteId, derivacion) {
    const res = this.data.residentes.find(r => r.id === residenteId);
    if (!res) return null;
    if (!res.referencias_contrarreferencias) res.referencias_contrarreferencias = [];

    const now = new Date();
    const newDerivacion = {
      id: `ref-${Date.now()}`,
      fecha_derivacion: derivacion.fecha_derivacion || now.toISOString().replace('T', ' ').slice(0, 16),
      efector_destino: derivacion.efector_destino || "Hospital Dr. Castilla Mira (Viale)",
      nivel_atencion_destino: derivacion.nivel_atencion_destino || "II Nivel",
      motivo_urgencia: derivacion.motivo_urgencia || "Descompensación aguda",
      diagnostico_cie10: derivacion.diagnostico_cie10 || "R68.8 - Otros síntomas generales",
      estado: "EN_CURSO",
      traslado_ambulancia: derivacion.traslado_ambulancia || "Ambulancia de Traslado UGL XIV",
      medico_derivante: derivacion.medico_derivante || "Médico de Guardia / Cabecera Hogar Madre Teresa",
      matricula_derivante: derivacion.matricula_derivante || "M.P. Entre Ríos",
      observaciones: derivacion.observaciones || "",
      epicrisis: null
    };

    res.referencias_contrarreferencias.unshift(newDerivacion);
    this.notify();
    return newDerivacion;
  }

  // --- PAMI Res. 284/05: Contrarreferencia y Epicrisis Hospitalaria ---
  registrarEpicrisisReingreso(residenteId, derivacionId, epicrisisData) {
    const res = this.data.residentes.find(r => r.id === residenteId);
    if (!res || !res.referencias_contrarreferencias) return null;

    const ref = res.referencias_contrarreferencias.find(d => d.id === derivacionId);
    if (!ref) return null;

    const now = new Date();
    ref.estado = "CONTRARREFERIDO_CON_EPICRISIS";
    ref.epicrisis = {
      id: `epi-${Date.now()}`,
      fecha_alta_hospitalaria: epicrisisData.fecha_alta_hospitalaria || now.toISOString().slice(0, 10),
      efector_emisor: epicrisisData.efector_emisor || ref.efector_destino,
      medico_tratante_hospital: epicrisisData.medico_tratante_hospital || "Servicio de Clínica Médica",
      matricula_hospital: epicrisisData.matricula_hospital || "M.P. Entre Ríos",
      diagnostico_ingreso_cie10: epicrisisData.diagnostico_ingreso_cie10 || ref.diagnostico_cie10,
      diagnostico_egreso_cie10: epicrisisData.diagnostico_egreso_cie10 || "Z54.0 - Convalecencia",
      resumen_tratamiento: epicrisisData.resumen_tratamiento || "Internación y estabilización clínica.",
      indicaciones_reingreso: epicrisisData.indicaciones_reingreso || "Reposo relativo y control de signos vitales.",
      ajustes_medicacion: epicrisisData.ajustes_medicacion || "Continuar medicación según indicación de alta.",
      dispara_revision_vgi: epicrisisData.dispara_revision_vgi !== false,
      bloqueado: true
    };

    // Regla Inquebrantable 2: Cambio clínico agudo exige revisión inmediata de VGI/PAI
    if (ref.epicrisis.dispara_revision_vgi && res.vgi_vigente) {
      res.vgi_vigente.estado_vigencia = "REQUERIMIENTO_POR_CAMBIO_CLINICO";
      res.vgi_vigente.motivo_alerta = `Reingreso hospitalario con epicrisis (${ref.epicrisis.diagnostico_egreso_cie10}). Exige nueva VGI.`;
    }

    this.notify();
    return ref;
  }

  // --- PAMI Res. 284/05: Solicitud de Prácticas de I Nivel Domiciliarias ---
  addSolicitudPracticaNivel1(residenteId, solicitud) {
    const res = this.data.residentes.find(r => r.id === residenteId);
    if (!res) return null;
    if (!res.solicitudes_practicas_nivel1) res.solicitudes_practicas_nivel1 = [];

    const now = new Date();
    const newSolicitud = {
      id: `prac-${Date.now()}`,
      fecha_solicitud: solicitud.fecha_solicitud || now.toISOString().slice(0, 10),
      tipo_practica: solicitud.tipo_practica || "Laboratorio Bioquímico (Extracción en Cama)",
      codigo_modulo: solicitud.codigo_modulo || "MÓDULO I - Extracción Domiciliaria Res. 284/05",
      justificacion_domiciliaria: solicitud.justificacion_domiciliaria || "Paciente no deambula / postrado en residencia.",
      diagnostico_cie10: solicitud.diagnostico_cie10 || "R54 - Senilidad y fragilidad del adulto mayor",
      profesional_solicitante: solicitud.profesional_solicitante || "Médico de Cabecera PAMI",
      matricula_solicitante: solicitud.matricula_solicitante || "M.P. Entre Ríos",
      estado: solicitud.estado || "SOLICITADA",
      resultado_informe: null,
      bloqueado: true
    };

    res.solicitudes_practicas_nivel1.unshift(newSolicitud);
    this.notify();
    return newSolicitud;
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
