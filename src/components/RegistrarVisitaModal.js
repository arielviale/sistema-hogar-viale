// ============================================================
// COMPONENTE: MODAL DE REGISTRO DE VISITA MÉDICA INSTITUCIONAL
// Cumplimiento de Visita Mensual Obligatoria - Res. 284/05 PAMI
// Hogar Madre Teresa · Viale, Entre Ríos
// ============================================================

import { store } from '../state/store.js';
import { CATALOGO_CIE10, buscarCIE10 } from '../data/catalogoCIE10.js';

export function openRegistrarVisitaModal(residente, onGuardado = () => {}) {
  const existing = document.getElementById('registrar-visita-modal-container');
  if (existing) existing.remove();

  const activeProf = store.getActiveProfessional();

  const container = document.createElement('div');
  container.id = 'registrar-visita-modal-container';
  container.className = 'modal-backdrop animate-fade-in';

  const defaultDate = new Date().toISOString().replace('T', ' ').slice(0, 16);

  container.innerHTML = `
    <div class="modal-content" style="max-width: 680px; max-height: 90vh; overflow-y: auto;">
      <div class="modal-header" style="background: linear-gradient(135deg, #072517 0%, #009640 100%); color: white; border-bottom: 2px solid #8dc63f;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 8px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </div>
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 800; margin: 0; color: white;">
              Registrar Visita Mensual del Médico de Cabecera
            </h3>
            <p style="font-size: 0.78rem; color: #86efac; margin: 0;">
              Resolución N° 284/2005 INSSJP (PAMI) · Control Asistencial en Residencia
            </p>
          </div>
        </div>
        <button id="btn-cerrar-visita-modal" style="background: transparent; border: none; color: white; font-size: 1.25rem; cursor: pointer;">&times;</button>
      </div>

      <div class="modal-body" style="padding: 1.5rem;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.85rem 1rem; margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-weight: 800; color: #0f172a; font-size: 0.95rem;">${residente.nombre_completo}</div>
            <div style="font-size: 0.8rem; color: #64748b;">${residente.numero_legajo} · DNI: ${residente.dni} · ${residente.obra_social} (${residente.nro_afiliado})</div>
          </div>
          <span class="badge badge-neutral" style="font-family: var(--font-mono); font-weight: 700;">
            ${residente.estado_habitacional}
          </span>
        </div>

        <form id="form-registro-visita">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div class="form-group">
              <label class="form-label">Fecha y Hora de Atención *</label>
              <input type="datetime-local" id="visita-fecha" class="form-input" value="${defaultDate}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Médico Interviniente *</label>
              <input type="text" id="visita-medico" class="form-input" value="${activeProf.nombre_completo} (${activeProf.matricula_provincial})" readonly style="background: #f1f5f9; color: #334155;" />
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">Tipo de Visita Institucional (Res. 284/05)</label>
            <select id="visita-tipo" class="form-select">
              <option value="Visita Mensual Institucional Obligatoria (Res. 284/05)">Visita Mensual Institucional Obligatoria (Res. 284/05)</option>
              <option value="Visita Programada de Seguimiento / Ajuste Terapéutico">Visita Programada de Seguimiento / Ajuste Terapéutico</option>
              <option value="Evaluación por Cambio Clínico Intercurrente">Evaluación por Cambio Clínico Intercurrente</option>
            </select>
          </div>

          <!-- Selector de Diagnóstico CIE-10 -->
          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">Diagnóstico Principal (Codificación CIE-10 - Res. 284/05) *</label>
            <div style="display: flex; gap: 0.5rem; margin-bottom: 0.35rem;">
              <input type="text" id="cie10-filtro-input" class="form-input" placeholder="🔍 Filtrar diagnóstico (ej: HTA, Alzheimer, Neumonía, Artrosis)..." />
            </div>
            <select id="visita-cie10-select" class="form-select" required style="font-family: var(--font-mono); font-size: 0.85rem;">
              ${CATALOGO_CIE10.map(d => `
                <option value="${d.codigo} - ${d.nombre}">
                  [${d.codigo}] ${d.nombre} (${d.categoria})
                </option>
              `).join('')}
            </select>
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">Hallazgos Clínicos y Examen Físico *</label>
            <textarea id="visita-hallazgos" class="form-textarea" rows="3" required placeholder="Consigne estado de conciencia, parámetros de signos vitales, auscultación, estado de piel y mucosas..."></textarea>
          </div>

          <div class="form-group" style="margin-bottom: 1.25rem;">
            <label class="form-label">Conducta Terapéutica / Indicaciones</label>
            <textarea id="visita-conducta" class="form-textarea" rows="2" placeholder="Ajuste de dosis, pedido de laboratorio en cama, indicación kinésica..."></textarea>
          </div>

          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#009640" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <div style="font-size: 0.8rem; color: #007030;">
              <strong>Trazabilidad Automática:</strong> Esta visita se registrará con la firma y el sello profesional de <strong>${activeProf.nombre_completo}</strong> (${activeProf.matricula_provincial}) y renovará la vigencia mensual del residente por 30 días.
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
            <button type="button" id="btn-cancelar-visita" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary" style="background: #009640; border-color: #007a33; font-weight: 700;">
              ✓ Registrar Visita y Sellar
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  // Filtrado reactivo en selector CIE-10
  const filtroInput = document.getElementById('cie10-filtro-input');
  const selectCie10 = document.getElementById('visita-cie10-select');
  if (filtroInput && selectCie10) {
    filtroInput.oninput = () => {
      const resultados = buscarCIE10(filtroInput.value);
      selectCie10.innerHTML = resultados.map(d => `
        <option value="${d.codigo} - ${d.nombre}">
          [${d.codigo}] ${d.nombre} (${d.categoria})
        </option>
      `).join('');
    };
  }

  const cerrarModal = () => container.remove();
  document.getElementById('btn-cerrar-visita-modal').onclick = cerrarModal;
  document.getElementById('btn-cancelar-visita').onclick = cerrarModal;
  container.onclick = (e) => {
    if (e.target === container) cerrarModal();
  };

  document.getElementById('form-registro-visita').onsubmit = (e) => {
    e.preventDefault();
    const fechaHora = document.getElementById('visita-fecha').value.replace('T', ' ');
    const tipo = document.getElementById('visita-tipo').value;
    const cie10 = document.getElementById('visita-cie10-select').value;
    const hallazgos = document.getElementById('visita-hallazgos').value.trim();
    const conducta = document.getElementById('visita-conducta').value.trim();

    // Calcular fecha límite para la próxima visita (30 días)
    const nextLimit = new Date();
    nextLimit.setDate(nextLimit.getDate() + 30);
    const proximaLimite = nextLimit.toISOString().slice(0, 10);

    store.addVisitaMedicoCabecera(residente.id, {
      fecha_hora: fechaHora,
      tipo_visita: tipo,
      diagnostico_cie10: cie10,
      hallazgos,
      conducta: conducta || "Continuar con plan terapéutico integral.",
      proxima_visita_limite: proximaLimite
    });

    cerrarModal();
    onGuardado();
  };
}

