// ============================================================
// COMPONENTE: MODAL DE REFERENCIA, TRASLADO Y EPICRISIS
// Gestión de Niveles I, II y III de Atención - Res. 284/05 PAMI
// Hogar Madre Teresa · Viale, Entre Ríos
// ============================================================

import { store } from '../state/store.js';
import { CATALOGO_CIE10, buscarCIE10 } from '../data/catalogoCIE10.js';

export function openRegistrarDerivacionModal(residente, derivacionExistente = null, onGuardado = () => {}) {
  const existing = document.getElementById('registrar-derivacion-modal-container');
  if (existing) existing.remove();

  const activeProf = store.getActiveProfessional();
  const esEpicrisis = Boolean(derivacionExistente);

  const container = document.createElement('div');
  container.id = 'registrar-derivacion-modal-container';
  container.className = 'modal-backdrop animate-fade-in';

  const defaultDate = new Date().toISOString().replace('T', ' ').slice(0, 16);

  container.innerHTML = `
    <div class="modal-content" style="max-width: 720px; max-height: 90vh; overflow-y: auto;">
      <div class="modal-header" style="background: linear-gradient(135deg, ${esEpicrisis ? '#1e3a8a 0%, #2563eb 100%' : '#991b1b 0%, #dc2626 100%'}); color: white; border-bottom: 2px solid ${esEpicrisis ? '#60a5fa' : '#fca5a5'};">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 8px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              ${esEpicrisis ? '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>' : '<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>'}
            </svg>
          </div>
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 800; margin: 0; color: white;">
              ${esEpicrisis ? 'Registrar Contrarreferencia y Epicrisis de Reingreso (Nivel II/III)' : 'Nueva Derivación / Traslado Sanitario (Nivel I ➔ II/III)'}
            </h3>
            <p style="font-size: 0.78rem; color: ${esEpicrisis ? '#bfdbfe' : '#fecaca'}; margin: 0;">
              Resolución N° 284/2005 INSSJP · Sistema de Referencia y Contrarreferencia
            </p>
          </div>
        </div>
        <button id="btn-cerrar-deriv-modal" style="background: transparent; border: none; color: white; font-size: 1.25rem; cursor: pointer;">&times;</button>
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

        ${!esEpicrisis ? `
          <!-- FORMULARIO DE NUEVA DERIVACIÓN -->
          <form id="form-registro-derivacion">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div class="form-group">
                <label class="form-label">Fecha y Hora de Salida / Traslado *</label>
                <input type="datetime-local" id="deriv-fecha" class="form-input" value="${defaultDate}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Efector de Destino *</label>
                <select id="deriv-efector" class="form-select" required>
                  <option value="Hospital San Roque de Viale (Nivel II)">Hospital San Roque de Viale (Nivel II)</option>
                  <option value="Hospital San Martín de Paraná (Nivel III)">Hospital San Martín de Paraná (Nivel III)</option>
                  <option value="Sanatorio La Entrerriana - Paraná (Nivel II/III)">Sanatorio La Entrerriana - Paraná (Nivel II/III)</option>
                  <option value="Clínica Modelo Paraná (Nivel II/III)">Clínica Modelo Paraná (Nivel II/III)</option>
                </select>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div class="form-group">
                <label class="form-label">Tipo de Derivación</label>
                <select id="deriv-tipo" class="form-select">
                  <option value="DERIVACION_INTERNACION">Internación de Agudos (Nivel II)</option>
                  <option value="INTERCONSULTA_EXTERNA">Interconsulta / Práctica Especializada (Nivel II/III)</option>
                  <option value="URGENCIA_GUARDIA">Atención de Urgencia en Guardia</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Medio de Traslado (Res. 284/05) *</label>
                <select id="deriv-medio" class="form-select" required>
                  <option value="Ambulancia de Emergencia con Médico">Ambulancia de Emergencia con Médico</option>
                  <option value="Unidad de Traslado Sanitario Programado (PAMI)">Unidad de Traslado Sanitario Programado (PAMI)</option>
                  <option value="Vehículo Institucional Adaptado">Vehículo Institucional Adaptado</option>
                </select>
              </div>
            </div>

            <!-- Selector CIE-10 Presuntivo -->
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">Diagnóstico Presuntivo / Motivo Clínico (CIE-10) *</label>
              <div style="display: flex; gap: 0.5rem; margin-bottom: 0.35rem;">
                <input type="text" id="cie10-filtro-deriv" class="form-input" placeholder="🔍 Filtrar diagnóstico (ej: Neumonía, Fractura, ACV)..." />
              </div>
              <select id="deriv-cie10-select" class="form-select" required style="font-family: var(--font-mono); font-size: 0.85rem;">
                ${CATALOGO_CIE10.map(d => `
                  <option value="${d.codigo} - ${d.nombre}">
                    [${d.codigo}] ${d.nombre} (${d.categoria})
                  </option>
                `).join('')}
              </select>
            </div>

            <div class="form-group" style="margin-bottom: 1.25rem;">
              <label class="form-label">Detalle Clínico de la Derivación y Cuadro Agudo *</label>
              <textarea id="deriv-motivo" class="form-textarea" rows="3" required placeholder="Describa descompensación aguda, signos de alarma, primeros auxilios suministrados..."></textarea>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
              <button type="button" id="btn-cancelar-deriv" class="btn btn-secondary">Cancelar</button>
              <button type="submit" class="btn btn-primary" style="background: #dc2626; border-color: #b91c1c; font-weight: 700;">
                🚑 Emitir Orden de Traslado y Derivación
              </button>
            </div>
          </form>
        ` : `
          <!-- FORMULARIO DE EPICRISIS Y CONTRARREFERENCIA -->
          <form id="form-registro-epicrisis">
            <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
              <div style="font-size: 0.85rem; color: #1e40af;">
                <strong>Derivación de Origen:</strong> ${derivacionExistente.efector_destino} (Salida: ${derivacionExistente.fecha_derivacion})<br>
                <strong>Motivo original:</strong> ${derivacionExistente.motivo_derivacion}
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div class="form-group">
                <label class="form-label">Fecha y Hora de Reingreso al Hogar *</label>
                <input type="datetime-local" id="epicrisis-fecha" class="form-input" value="${defaultDate}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Profesional Receptor en Residencia *</label>
                <input type="text" class="form-input" value="${activeProf.nombre_completo} (${activeProf.matricula_provincial})" readonly style="background: #f1f5f9;" />
              </div>
            </div>

            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">Diagnóstico de Egreso Hospitalario Definitivo (CIE-10) *</label>
              <div style="display: flex; gap: 0.5rem; margin-bottom: 0.35rem;">
                <input type="text" id="cie10-filtro-epicrisis" class="form-input" placeholder="🔍 Filtrar diagnóstico de egreso..." />
              </div>
              <select id="epicrisis-cie10-select" class="form-select" required style="font-family: var(--font-mono); font-size: 0.85rem;">
                ${CATALOGO_CIE10.map(d => `
                  <option value="${d.codigo} - ${d.nombre}">
                    [${d.codigo}] ${d.nombre} (${d.categoria})
                  </option>
                `).join('')}
              </select>
            </div>

            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">Resumen de la Epicrisis e Intervenciones Hospitalarias *</label>
              <textarea id="epicrisis-resumen" class="form-textarea" rows="3" required placeholder="Evolución durante internación, tratamientos efectuados, procedimientos, resultados relevantes..."></textarea>
            </div>

            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">Pautas Asistenciales y Nuevas Indicaciones Farmacológicas *</label>
              <textarea id="epicrisis-indicaciones" class="form-textarea" rows="2" required placeholder="Pautas de enfermería, signos de alarma, cambios en la medicación habitual..."></textarea>
            </div>

            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 0.85rem 1rem; margin-bottom: 1.25rem;">
              <label style="display: flex; align-items: flex-start; gap: 0.65rem; cursor: pointer;">
                <input type="checkbox" id="check-disparar-vgi" checked style="width: 18px; height: 18px; margin-top: 2px;" />
                <span style="font-size: 0.85rem; color: #991b1b; font-weight: 600;">
                  Disparar actualización obligatoria de VGI y PAI por "Cambio Clínico Abrupto" (Regla Inquebrantable Nº 2)
                  <span style="display: block; font-size: 0.75rem; color: #b91c1c; font-weight: normal; margin-top: 2px;">
                    La Resolución N° 284/05 y la normativa entrerriana exigen revaluar al residente tras una internación para ajustar objetivos de cuidados.
                  </span>
                </span>
              </label>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
              <button type="button" id="btn-cancelar-deriv" class="btn btn-secondary">Cancelar</button>
              <button type="submit" class="btn btn-primary" style="background: #2563eb; border-color: #1d4ed8; font-weight: 700;">
                📋 Incorporar Epicrisis al Legajo y Sellar
              </button>
            </div>
          </form>
        `}
      </div>
    </div>
  `;

  document.body.appendChild(container);

  // Filtrado CIE-10
  const filtroInput = document.getElementById(esEpicrisis ? 'cie10-filtro-epicrisis' : 'cie10-filtro-deriv');
  const selectCie10 = document.getElementById(esEpicrisis ? 'epicrisis-cie10-select' : 'deriv-cie10-select');
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
  document.getElementById('btn-cerrar-deriv-modal').onclick = cerrarModal;
  const btnCancel = document.getElementById('btn-cancelar-deriv');
  if (btnCancel) btnCancel.onclick = cerrarModal;
  container.onclick = (e) => {
    if (e.target === container) cerrarModal();
  };

  if (!esEpicrisis) {
    document.getElementById('form-registro-derivacion').onsubmit = (e) => {
      e.preventDefault();
      const fecha = document.getElementById('deriv-fecha').value.replace('T', ' ');
      const efector = document.getElementById('deriv-efector').value;
      const tipo = document.getElementById('deriv-tipo').value;
      const medio = document.getElementById('deriv-medio').value;
      const cie10 = document.getElementById('deriv-cie10-select').value;
      const motivo = document.getElementById('deriv-motivo').value.trim();

      store.addDerivacionNivel2(residente.id, {
        fecha_derivacion: fecha,
        efector_destino: efector,
        tipo,
        medio_traslado: medio,
        diagnostico_presuntivo_cie10: cie10,
        motivo_derivacion: motivo,
        estado: "EN_CURSO"
      });

      cerrarModal();
      onGuardado();
    };
  } else {
    document.getElementById('form-registro-epicrisis').onsubmit = (e) => {
      e.preventDefault();
      const fechaReingreso = document.getElementById('epicrisis-fecha').value.replace('T', ' ');
      const cie10 = document.getElementById('epicrisis-cie10-select').value;
      const resumen = document.getElementById('epicrisis-resumen').value.trim();
      const indicaciones = document.getElementById('epicrisis-indicaciones').value.trim();
      const disparaVgi = document.getElementById('check-disparar-vgi').checked;

      store.registrarEpicrisisReingreso(residente.id, derivacionExistente.id, {
        fecha_reingreso: fechaReingreso,
        diagnostico_definitivo_cie10: cie10,
        resumen_alta: resumen,
        indicaciones_reingreso: indicaciones,
        dispara_revision_vgi: disparaVgi
      });

      cerrarModal();
      onGuardado();
    };
  }
}

