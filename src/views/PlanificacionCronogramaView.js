// ============================================================
// VISTA: PLANIFICACIÓN ANUAL & CRONOGRAMA DE ACTIVIDADES - FASE 4
// Ejes Estratégicos 2026, Talleres, Asistencia Rápida y Cartelera
// ============================================================

import { store } from '../state/store.js';

export function renderPlanificacionCronogramaView(container) {
  const plan = store.data.planificacion;
  const cronograma = store.data.cronograma;
  const residentes = store.data.residentes;

  container.innerHTML = `
    <div class="animate-fade-in">
      <!-- Encabezado -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h1 style="font-size: 1.5rem; font-weight: 800; color: #0f172a;">
            Planificación Anual 2026 & Cronograma de Actividades
          </h1>
          <p style="font-size: 0.85rem; color: #64748b;">
            Programas Institucionales, Talleres Terapéuticos y Control de Asistencia para Cartelera
          </p>
        </div>

        <div style="display: flex; gap: 0.75rem;">
          <button id="btn-imprimir-cartelera" class="btn btn-primary">
            🖨️ Imprimir Cartelera Semanal
          </button>
        </div>
      </div>

      <!-- Pestañas internas: Cronograma Semanal vs Plan Anual -->
      <div class="tabs-header" style="margin-bottom: 1.5rem;">
        <button class="tab-btn active" id="tab-btn-cronograma">
          📅 Cronograma Semanal de Talleres & Asistencia
        </button>
        <button class="tab-btn" id="tab-btn-plan">
          🎯 Plan Institucional Anual 2026 (Ejes y Metas)
        </button>
      </div>

      <!-- SECCIÓN 1: CRONOGRAMA SEMANAL Y TOMA DE ASISTENCIA RÁPIDA -->
      <div id="section-cronograma" class="animate-fade-in">
        
        <div class="card" style="margin-bottom: 1.5rem; background: linear-gradient(135deg, #f0fdf4 0%, #eefcf2 100%); border: 1px solid #bbf7d0;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <h3 style="font-size: 1.1rem; font-weight: 800; color: #007030;">
                Grilla Operativa de Actividades Semanales
              </h3>
              <p style="font-size: 0.82rem; color: #475569; margin-top: 0.2rem;">
                Haga clic sobre los residentes para registrar su participación y asistencia en tiempo real.
              </p>
            </div>
            <span class="badge badge-vigente">Cartelera Vigente: Octubre 2026</span>
          </div>
        </div>

        <!-- Lista de Talleres / Actividades -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 1.5rem;">
          ${cronograma.map(act => `
            <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                  <span class="badge badge-neutral" style="font-weight: 700; font-size: 0.8rem;">
                    ${act.dia_semana} · ${act.horario}
                  </span>
                  <span class="badge badge-vigente">${act.tipo}</span>
                </div>

                <h3 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 0.35rem;">
                  ${act.taller_nombre}
                </h3>

                <div style="font-size: 0.82rem; color: #64748b; margin-bottom: 0.5rem;">
                  📍 <strong>Espacio:</strong> ${act.espacio}
                </div>
                <div style="font-size: 0.82rem; color: #007030; font-weight: 600; margin-bottom: 1rem;">
                  👤 <strong>A cargo:</strong> ${act.profesional_responsable}
                </div>

                <div style="border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
                  <div style="font-size: 0.8rem; font-weight: 700; color: #334155; margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
                    <span>Registro Rápido de Asistencia:</span>
                    <span style="color: #007030;">${act.asistentes_ids ? act.asistentes_ids.length : 0} de ${residentes.length}</span>
                  </div>

                  <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                    ${residentes.map(r => {
                      const isAsistiendo = act.asistentes_ids && act.asistentes_ids.includes(r.id);
                      return `
                        <button class="btn btn-sm btn-asistencia-toggle ${isAsistiendo ? 'btn-success' : 'btn-secondary'}" 
                                data-act-id="${act.id}" 
                                data-res-id="${r.id}"
                                style="font-size: 0.75rem; padding: 0.25rem 0.55rem;">
                          ${isAsistiendo ? '✓' : '+'} ${r.nombre_completo.split(' ').slice(1, 3).join(' ')}
                        </button>
                      `;
                    }).join('')}
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

      </div>

      <!-- SECCIÓN 2: PLAN INSTITUCIONAL ANUAL 2026 -->
      <div id="section-plan" class="animate-fade-in" style="display: none;">
        
        <div class="card" style="margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.25rem; font-weight: 800; color: #007030; margin-bottom: 0.5rem;">
            ${plan.institucion}
          </h2>
          <p style="font-size: 0.9rem; color: #334155; line-height: 1.6; font-style: italic; background: #f8fafc; padding: 1rem; border-left: 4px solid #009640; border-radius: 6px;">
            "${plan.mision}"
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          ${plan.ejes_estrategicos.map(eje => `
            <div class="card">
              <h3 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                <span style="background: #e0f2fe; color: #0284c7; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem;">Eje</span>
                ${eje.nombre}
              </h3>

              <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${eje.programas.map(prog => `
                  <div style="background: #f8fafc; padding: 1.1rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
                    <h4 style="font-size: 0.95rem; font-weight: 700; color: #007030; margin-bottom: 0.35rem;">
                      ${prog.nombre}
                    </h4>
                    <p style="font-size: 0.85rem; color: #475569; margin-bottom: 0.5rem;">
                      <strong>Objetivo:</strong> ${prog.objetivo}
                    </p>
                    <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; font-size: 0.82rem; border-top: 1px dashed #cbd5e1; padding-top: 0.5rem;">
                      <span>🎯 <strong>Meta Cuantitativa:</strong> ${prog.meta}</span>
                      <span>👤 <strong>Responsable:</strong> ${prog.responsable}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>

      </div>

    </div>
  `;

  // --- Handlers de Pestañas ---
  const tabCronograma = document.getElementById('tab-btn-cronograma');
  const tabPlan = document.getElementById('tab-btn-plan');
  const secCronograma = document.getElementById('section-cronograma');
  const secPlan = document.getElementById('section-plan');

  tabCronograma.onclick = () => {
    tabCronograma.classList.add('active');
    tabPlan.classList.remove('active');
    secCronograma.style.display = 'block';
    secPlan.style.display = 'none';
  };

  tabPlan.onclick = () => {
    tabPlan.classList.add('active');
    tabCronograma.classList.remove('active');
    secPlan.style.display = 'block';
    secCronograma.style.display = 'none';
  };

  // Botones de Asistencia
  container.querySelectorAll('.btn-asistencia-toggle').forEach(btn => {
    btn.onclick = () => {
      const actId = btn.getAttribute('data-act-id');
      const resId = btn.getAttribute('data-res-id');
      store.toggleAsistenciaActividad(actId, resId);
      renderPlanificacionCronogramaView(container);
    };
  });

  // Imprimir Cartelera
  document.getElementById('btn-imprimir-cartelera').onclick = () => window.print();
}
