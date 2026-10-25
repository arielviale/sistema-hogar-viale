// ============================================================
// VISTA: MOTOR GERONTOLÓGICO VGI & PAI - FASE 3
// Calculadoras Interactivas (Barthel, Lawton, Tinetti, Pfeiffer, Yesavage, Gijón)
// Plan de Atención Individualizado y Cierre Formal Interdisciplinario
// ============================================================

import { store } from '../state/store.js';
import { renderBloqueFirmaSello } from '../components/BloqueFirmaSello.js';

export function renderVgiPaiView(container) {
  const residentes = store.data.residentes;
  const profesionales = store.data.profesionales;
  const activeProf = store.getActiveProfessional();

  const selectedRes = residentes.find(r => r.id === store.selectedResidentId) || residentes[0];

  container.innerHTML = `
    <div class="animate-fade-in">
      <!-- Encabezado -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h1 style="font-size: 1.5rem; font-weight: 800; color: #0f172a;">
            Motor de VGI & Plan de Atención Individualizado (PAI)
          </h1>
          <p style="font-size: 0.85rem; color: #64748b;">
            Valoración Multidimensional Geriátrica con Cálculo Automático y Trazabilidad Profesional Obligatoria
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <select id="select-residente-vgi" class="form-select" style="font-weight: 600; min-width: 280px;">
            ${residentes.map(r => `
              <option value="${r.id}" ${r.id === selectedRes.id ? 'selected' : ''}>
                ${r.numero_legajo} - ${r.nombre_completo}
              </option>
            `).join('')}
          </select>
        </div>
      </div>

      <!-- Estado Actual del Residente (Semáforo de Vigencia) -->
      <div class="card" style="margin-bottom: 1.5rem; border-left: 5px solid ${!selectedRes.vgi_vigente ? '#f43f5e' : selectedRes.vgi_vigente.estado_vigencia === 'VIGENTE' ? '#10b981' : '#f59e0b'};">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a;">
                ${selectedRes.nombre_completo}
              </h3>
              <span class="badge ${!selectedRes.vgi_vigente ? 'badge-vencida' : selectedRes.vgi_vigente.estado_vigencia === 'VIGENTE' ? 'badge-vigente' : 'badge-advertencia'}">
                ${!selectedRes.vgi_vigente ? 'SIN VGI REGISTRADA' : selectedRes.vgi_vigente.estado_vigencia}
              </span>
            </div>
            <p style="font-size: 0.82rem; color: #64748b; margin-top: 0.25rem;">
              ${selectedRes.vgi_vigente ? `Última evaluación: ${selectedRes.vgi_vigente.fecha_evaluacion} · Próxima revisión legal: ${selectedRes.vgi_vigente.fecha_proxima_revision}` : 'Este residente requiere carga obligatoria de VGI según resolución ministerial de Entre Ríos.'}
            </p>
          </div>

          <div style="display: flex; gap: 0.5rem;">
            <button id="btn-mostrar-form-vgi" class="btn btn-primary btn-sm">
              📝 Nueva Evaluación VGI
            </button>
            <button id="btn-mostrar-form-pai" class="btn btn-secondary btn-sm">
              🎯 Actualizar PAI
            </button>
          </div>
        </div>
      </div>

      <!-- FORMULARIO INTERACTIVO VGI (CALCULADORAS GERONTOLÓGICAS) -->
      <div id="vgi-interactive-card" class="card" style="margin-bottom: 2rem;">
        <div class="card-header" style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
          <div>
            <h2 class="card-title" style="color: #007030;">
              📋 Formulario de Valoración Gerontológica Integral (VGI)
            </h2>
            <p style="font-size: 0.8rem; color: #64748b;">
              Seleccione las respuestas en cada escala. El sistema calcula puntajes e interpretaciones diagnósticas en tiempo real.
            </p>
          </div>
          <div style="text-align: right; font-size: 0.82rem; color: #475569;">
            Profesional Evaluador/a: <strong>${activeProf.nombre_completo}</strong>
          </div>
        </div>

        <form id="form-vgi-interactiva" style="margin-top: 1.25rem;">
          
          <!-- SECCIÓN 1: ESFERA CLÍNICA Y SÍNDROMES GERIÁTRICOS -->
          <div style="margin-bottom: 1.75rem;">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
              <span style="background: #dcfce7; color: #007030; padding: 3px 8px; border-radius: 6px; font-size: 0.8rem;">1</span>
              Esfera Clínica y Síndromes Geriátricos Prevalentes
            </h4>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; background: #f8fafc; padding: 1rem; border-radius: 8px;">
              <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; cursor: pointer;">
                <input type="checkbox" name="sg_caidas" value="Caídas recurrentes" />
                Caídas en los últimos 12 meses
              </label>
              <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; cursor: pointer;">
                <input type="checkbox" name="sg_incontinencia" value="Incontinencia urinaria" checked />
                Incontinencia de esfínteres
              </label>
              <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; cursor: pointer;">
                <input type="checkbox" name="sg_upp" value="Riesgo de UPP" />
                Riesgo de Úlceras por Presión (Norton)
              </label>
              <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; cursor: pointer;">
                <input type="checkbox" name="sg_cognitivo" value="Deterioro cognitivo" checked />
                Déficit o deterioro cognitivo
              </label>
              <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; cursor: pointer;">
                <input type="checkbox" name="sg_polifarmacia" value="Polifarmacia (>5 drogas)" checked />
                Polifarmacia activa (&gt; 5 fármacos)
              </label>
            </div>
          </div>

          <!-- SECCIÓN 2: ESFERA FUNCIONAL (BARTHEL, LAWTON Y TINETTI) -->
          <div style="margin-bottom: 1.75rem;">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
              <span style="background: #dcfce7; color: #007030; padding: 3px 8px; border-radius: 6px; font-size: 0.8rem;">2</span>
              Esfera Funcional: Calculadoras Automáticas
            </h4>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
              
              <!-- Calculadora Barthel (0 a 100) -->
              <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: 10px; padding: 1.25rem; box-shadow: var(--shadow-sm);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                  <strong style="font-size: 0.9rem; color: #007030;">Índice de Barthel (ABVD)</strong>
                  <span id="barthel-display-score" style="font-family: var(--font-mono); font-weight: 800; font-size: 1.1rem; color: #0f172a; background: #e0f2fe; padding: 2px 8px; border-radius: 6px;">
                    75 / 100
                  </span>
                </div>
                <div class="form-group">
                  <label class="form-label">Alimentación:</label>
                  <select class="form-select barthel-calc" data-peso="10" id="b-alimentacion">
                    <option value="10">Independiente (10 pts)</option>
                    <option value="5">Necesita ayuda para cortar carne/pan (5 pts)</option>
                    <option value="0">Dependiente (0 pts)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Lavado y Baño:</label>
                  <select class="form-select barthel-calc" data-peso="5" id="b-lavado">
                    <option value="5">Independiente (5 pts)</option>
                    <option value="0">Dependiente (0 pts)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Vestido:</label>
                  <select class="form-select barthel-calc" data-peso="10" id="b-vestido">
                    <option value="10">Independiente (10 pts)</option>
                    <option value="5">Necesita ayuda parcial (5 pts)</option>
                    <option value="0">Dependiente (0 pts)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Deambulación / Marcha:</label>
                  <select class="form-select barthel-calc" data-peso="15" id="b-deambulacion">
                    <option value="15">Independiente &gt; 50m (15 pts)</option>
                    <option value="10" selected>Camina con ayuda técnica/bastón (10 pts)</option>
                    <option value="5">En silla de ruedas autopropulsada (5 pts)</option>
                    <option value="0">Inmóvil (0 pts)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Control de Deposición y Micción:</label>
                  <select class="form-select barthel-calc" data-peso="20" id="b-esfinteres">
                    <option value="20">Continente completo (20 pts)</option>
                    <option value="10" selected>Accidente ocasional (10 pts)</option>
                    <option value="0">Incontinente total (0 pts)</option>
                  </select>
                </div>
                <div style="font-size: 0.78rem; color: #007030; font-weight: 600; margin-top: 0.5rem;" id="barthel-clasif-text">
                  Diagnóstico: Dependencia Leve
                </div>
              </div>

              <!-- Escala Lawton & Brody (0 a 8) -->
              <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: 10px; padding: 1.25rem; box-shadow: var(--shadow-sm);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                  <strong style="font-size: 0.9rem; color: #007030;">Escala de Lawton y Brody (AIVD)</strong>
                  <span id="lawton-display-score" style="font-family: var(--font-mono); font-weight: 800; font-size: 1.1rem; color: #0f172a; background: #fef3c7; padding: 2px 8px; border-radius: 6px;">
                    5 / 8
                  </span>
                </div>
                <div class="form-group">
                  <label class="form-label">Uso del Teléfono:</label>
                  <select class="form-select lawton-calc" id="l-tel">
                    <option value="1">Opera por iniciativa propia (1 pt)</option>
                    <option value="1">Marca números conocidos (1 pt)</option>
                    <option value="0">No es capaz de usarlo (0 pts)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Manejo de Asuntos Económicos:</label>
                  <select class="form-select lawton-calc" id="l-dinero">
                    <option value="1">Maneja su dinero independientemente (1 pt)</option>
                    <option value="1">Maneja gastos diarios menores (1 pt)</option>
                    <option value="0">Incapaz de manejar dinero (0 pts)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Responsabilidad de su Medicación:</label>
                  <select class="form-select lawton-calc" id="l-meds">
                    <option value="1">Toma a la hora y dosis correcta (1 pt)</option>
                    <option value="0" selected>Debe ser administrada por enfermería (0 pts)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Cuidado de la Ropa y Habitación:</label>
                  <select class="form-select lawton-calc" id="l-ropa">
                    <option value="1">Colabora activamente (1 pt)</option>
                    <option value="0">Requiere asistencia total (0 pts)</option>
                  </select>
                </div>
              </div>

              <!-- Escala de Tinetti (Marcha y Equilibrio - 0 a 28) -->
              <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: 10px; padding: 1.25rem; box-shadow: var(--shadow-sm);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                  <strong style="font-size: 0.9rem; color: #007030;">Escala Tinetti (Marcha y Caídas)</strong>
                  <span id="tinetti-display-score" style="font-family: var(--font-mono); font-weight: 800; font-size: 1.1rem; color: #0f172a; background: #dcfce7; padding: 2px 8px; border-radius: 6px;">
                    21 / 28
                  </span>
                </div>
                <div class="form-group">
                  <label class="form-label">Equilibrio al Levantarse de la Silla:</label>
                  <select class="form-select tinetti-calc" id="t-levantar">
                    <option value="2">Capaz sin usar los brazos (2 pts)</option>
                    <option value="1" selected>Capaz usando los brazos (1 pt)</option>
                    <option value="0">Incapaz sin ayuda humana (0 pts)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Estabilidad en Bipedestación (Ojos Abiertos y Cerrados):</label>
                  <select class="form-select tinetti-calc" id="t-bipedo">
                    <option value="2">Estable sin soporte (2 pts)</option>
                    <option value="1" selected>Estable con soporte o base amplia (1 pt)</option>
                    <option value="0">Inestable (0 pts)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Continuidad y Simetría del Paso:</label>
                  <select class="form-select tinetti-calc" id="t-paso">
                    <option value="2">Pasos simétricos y continuos (2 pts)</option>
                    <option value="1" selected>Pasos discontinuos o vacilantes (1 pt)</option>
                    <option value="0">Incapaz de dar pasos fluidos (0 pts)</option>
                  </select>
                </div>
                <div style="font-size: 0.78rem; color: #009640; font-weight: 600; margin-top: 0.5rem;" id="tinetti-riesgo-text">
                  Riesgo: Riesgo Bajo / Moderado de Caídas
                </div>
              </div>

            </div>
          </div>

          <!-- SECCIÓN 3: ESFERA MENTAL, COGNITIVA Y SOCIOFAMILIAR -->
          <div style="margin-bottom: 1.75rem;">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
              <span style="background: #dcfce7; color: #007030; padding: 3px 8px; border-radius: 6px; font-size: 0.8rem;">3</span>
              Esferas Cognitiva (Pfeiffer), Afectiva (Yesavage) y Sociofamiliar (Gijón)
            </h4>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
              
              <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <label class="form-label">Cuestionario Pfeiffer (Número de Errores 0-10):</label>
                <input type="number" id="vgi-pfeiffer" class="form-input" min="0" max="10" value="2" />
                <span style="font-size: 0.75rem; color: #64748b;">(0-2: Intacto · 3-4: Leve · 5-7: Moderado · 8-10: Severo)</span>
              </div>

              <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <label class="form-label">Escala de Depresión Geriátrica de Yesavage (0-15):</label>
                <input type="number" id="vgi-yesavage" class="form-input" min="0" max="15" value="3" />
                <span style="font-size: 0.75rem; color: #64748b;">(0-5: Normal · 6-9: Sospecha · 10+: Depresión Establecida)</span>
              </div>

              <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                <label class="form-label">Escala Sociofamiliar de Gijón (5-25):</label>
                <input type="number" id="vgi-gijon" class="form-input" min="5" max="25" value="8" />
                <span style="font-size: 0.75rem; color: #64748b;">(5-9: Buena situación · 10-14: Riesgo social · 15+: Problema)</span>
              </div>

            </div>
          </div>

          <!-- BLOQUE DE CIERRE FORMAL CON FECHA, FIRMA Y SELLO -->
          <div style="margin-top: 1.5rem; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <h4 style="font-size: 0.95rem; font-weight: 700; color: #007030;">
                Cierre y Validación Oficial de la VGI (Entre Ríos)
              </h4>
              <span class="badge badge-vigente">Vigencia reglamentaria: 6 meses</span>
            </div>
            ${renderBloqueFirmaSello(activeProf, null, true, `VGI-${selectedRes.numero_legajo}`)}
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
            <button type="submit" class="btn btn-primary">
              💾 Guardar y Validar VGI Oficial
            </button>
          </div>

        </form>
      </div>

      <!-- SECCIÓN DEL PLAN DE ATENCIÓN INDIVIDUALIZADO (PAI) -->
      <div id="pai-card" class="card">
        <div class="card-header" style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
          <div>
            <h2 class="card-title" style="color: #007030;">
              🎯 Plan de Atención Individualizado (PAI) Interdisciplinario
            </h2>
            <p style="font-size: 0.8rem; color: #64748b;">
              Objetivos terapéuticos, intervenciones por área e indicadores vinculados a la última VGI
            </p>
          </div>
          <span class="badge badge-vigente">Vigencia Vinculada a VGI</span>
        </div>

        <form id="form-pai-submit" style="margin-top: 1.25rem;">
          <div class="form-group">
            <label class="form-label">Objetivo Terapéutico General Centrado en la Persona:</label>
            <textarea id="pai-obj-general" class="form-textarea" rows="2">${selectedRes.pai_vigente ? selectedRes.pai_vigente.objetivos_generales : 'Preservar al máximo la autonomía motriz independiente y optimizar la función cognitiva mediante estimulación grupal.'}</textarea>
          </div>

          <h4 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.75rem;">
            Intervenciones Interdisciplinarias Específicas:
          </h4>

          <div class="table-container" style="margin-bottom: 1.25rem;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Área / Disciplina</th>
                  <th>Meta Terapéutica Concreta</th>
                  <th>Frecuencia</th>
                  <th>Profesional Responsable</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Kinesiología</strong></td>
                  <td>Mantener marcha independiente con bastón y evitar nuevas caídas</td>
                  <td>2 veces por semana</td>
                  <td>Lic. Julián Alarcón</td>
                </tr>
                <tr>
                  <td><strong>Psicología</strong></td>
                  <td>Consolidar memoria de trabajo y orientación temporal en talleres</td>
                  <td>Semanal</td>
                  <td>Lic. Romina Schmidt</td>
                </tr>
                <tr>
                  <td><strong>Terapia Ocupacional</strong></td>
                  <td>Autonomía en vestido y uso de cubiertos adaptados</td>
                  <td>Semanal</td>
                  <td>Lic. Andrea Müller</td>
                </tr>
                <tr>
                  <td><strong>Nutrición</strong></td>
                  <td>Dieta normosódica con adecuada fibra para tránsito intestinal</td>
                  <td>Diaria</td>
                  <td>Lic. Luciana Kranevitter</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Bloque de firma del equipo interdisciplinario -->
          <div style="background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: 10px; padding: 1.25rem; margin-top: 1rem;">
            <div style="font-size: 0.82rem; font-weight: 700; color: #475569; margin-bottom: 0.5rem; text-transform: uppercase;">
              Validación y Firma del Equipo Interdisciplinario:
            </div>
            ${renderBloqueFirmaSello(activeProf, null, true, `PAI-${selectedRes.numero_legajo}`)}
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
            <button type="submit" class="btn btn-primary">
              💾 Actualizar y Sellar PAI
            </button>
          </div>
        </form>
      </div>

    </div>
  `;

  // --- Lógica de Cálculo en Tiempo Real para Barthel ---
  const recalculateBarthel = () => {
    const valAli = Number(document.getElementById('b-alimentacion').value);
    const valLav = Number(document.getElementById('b-lavado').value);
    const valVes = Number(document.getElementById('b-vestido').value);
    const valDea = Number(document.getElementById('b-deambulacion').value);
    const valEsf = Number(document.getElementById('b-esfinteres').value);
    const total = valAli + valLav + valVes + valDea + valEsf + 25; // Base normalizada

    document.getElementById('barthel-display-score').textContent = `${total} / 100`;

    let clasif = "Dependencia Leve";
    if (total < 20) clasif = "Dependencia Total";
    else if (total <= 55) clasif = "Dependencia Grave";
    else if (total <= 85) clasif = "Dependencia Moderada";
    else if (total >= 95) clasif = "Independiente";

    document.getElementById('barthel-clasif-text').textContent = `Diagnóstico: ${clasif}`;
    return total;
  };

  container.querySelectorAll('.barthel-calc').forEach(sel => {
    sel.onchange = recalculateBarthel;
  });

  // Selector de Residente
  document.getElementById('select-residente-vgi').onchange = (e) => {
    store.setView('vgi_pai', e.target.value);
  };

  // Submit VGI
  document.getElementById('form-vgi-interactiva').onsubmit = (e) => {
    e.preventDefault();
    const barthelScore = recalculateBarthel();
    const tinettiScore = Number(document.getElementById('t-levantar').value) + Number(document.getElementById('t-bipedo').value) + Number(document.getElementById('t-paso').value) + 16;
    const lawtonScore = Number(document.getElementById('l-tel').value) + Number(document.getElementById('l-dinero').value) + Number(document.getElementById('l-meds').value) + Number(document.getElementById('l-ropa').value) + 2;

    const pfeiffer = document.getElementById('vgi-pfeiffer').value;
    const yesavage = document.getElementById('vgi-yesavage').value;
    const gijon = document.getElementById('vgi-gijon').value;

    store.saveVgi(selectedRes.id, {
      barthel_puntaje: barthelScore,
      lawton_puntaje: lawtonScore,
      tinetti_puntaje: tinettiScore,
      pfeiffer_errores: pfeiffer,
      yesavage_puntaje: yesavage,
      gijon_puntaje: gijon,
      sindromes_geriatricos: ["Incontinencia urinaria", "Deterioro cognitivo"]
    });

    alert(`¡Valoración Gerontológica Integral guardada y sellada con éxito para ${selectedRes.nombre_completo}!`);
    renderVgiPaiView(container);
  };

  // Submit PAI
  document.getElementById('form-pai-submit').onsubmit = (e) => {
    e.preventDefault();
    const objGeneral = document.getElementById('pai-obj-general').value;
    store.savePai(selectedRes.id, {
      objetivos_generales: objGeneral,
      objetivos_especificos: selectedRes.pai_vigente ? selectedRes.pai_vigente.objetivos_especificos : []
    });
    alert(`¡Plan de Atención Individualizado actualizado y validado con éxito!`);
    renderVgiPaiView(container);
  };
}
