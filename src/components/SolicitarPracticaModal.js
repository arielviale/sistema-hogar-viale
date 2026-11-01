// ============================================================
// COMPONENTE: MODAL DE SOLICITUD DE PRÁCTICAS DOMICILIARIAS (I NIVEL)
// Res. 284/05 INSSJP PAMI · Extracción en Cama, Rx Portátil y Fisiatría
// Hogar Madre Teresa · Viale, Entre Ríos
// ============================================================

import { store } from '../state/store.js';
import { CATALOGO_CIE10, buscarCIE10 } from '../data/catalogoCIE10.js';

export function openSolicitarPracticaModal(residente, onGuardado = () => { }) {
  const existing = document.getElementById('solicitar-practica-modal-container');
  if (existing) existing.remove();

  const activeProf = store.getActiveProfessional();
  const container = document.createElement('div');
  container.id = 'solicitar-practica-modal-container';
  container.className = 'modal-backdrop animate-fade-in';

  const defaultDate = new Date().toISOString().slice(0, 10);

  container.innerHTML = `
    <div class="modal-content" style="max-width: 650px; max-height: 90vh; overflow-y: auto;">
      <div class="modal-header" style="background: linear-gradient(135deg, #065f46 0%, #059669 100%); color: white; border-bottom: 2px solid #34d399;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 8px;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <line x1="9" y1="15" x2="15" y2="15"></line>
            </svg>
          </div>
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 800; margin: 0; color: white;">
              Solicitar Práctica de I Nivel Domiciliaria
            </h3>
            <p style="font-size: 0.78rem; color: #a7f3d0; margin: 0;">
              Resolución N° 284/2005 INSSJP · Módulo de Prestaciones en Residencia
            </p>
          </div>
        </div>
        <button id="btn-cerrar-solic-modal" style="background: transparent; border: none; color: white; font-size: 1.25rem; cursor: pointer;">&times;</button>
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

        <form id="form-solic-practica">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div class="form-group">
              <label class="form-label">Fecha de Solicitud *</label>
              <input type="date" id="solic-fecha" class="form-input" value="${defaultDate}" required />
            </div>

            <div class="form-group">
              <label class="form-label">Tipo de Práctica Reglamentada *</label>
              <select id="solic-tipo" class="form-select" required>
                <option value="Laboratorio Bioquímico (Toma en Cama / Domiciliaria)">Laboratorio Bioquímico (Toma en Cama)</option>
                <option value="Radiología Simple en Habitación (Rx Portátil)">Radiología Simple en Habitación (Rx Portátil)</option>
                <option value="Ecografía Abdominal / Partes Blandas en Cama">Ecografía en Cama (Portátil)</option>
                <option value="Kinesiología y Fisiatría Motora en Residencia">Kinesiología Motora en Residencia (10 sesiones)</option>
                <option value="Terapia Ocupacional y Adaptación Funcional">Terapia Ocupacional y Adaptación Funcional</option>
              </select>
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">Diagnóstico de Presunción (CIE-10 Oficial) *</label>
            <div style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem;">
              <input type="text" id="solic-cie10-search" class="form-input" placeholder="Buscar por código o patología (ej: R54, anemia, neumonía, fractura)..." />
              <button type="button" id="btn-buscar-cie10-solic" class="btn btn-secondary btn-sm">Buscar</button>
            </div>
            <select id="solic-cie10-select" class="form-select" size="4" style="height: 110px; font-size: 0.82rem;">
              ${CATALOGO_CIE10.slice(0, 15).map(c => `
                <option value="${c.codigo} - ${c.nombre}">${c.codigo} - ${c.nombre} (${c.categoria})</option>
              `).join('')}
            </select>
          </div>

          <div class="form-group" style="margin-bottom: 1rem;">
            <label class="form-label">Justificación Clínica de Prestación en Domicilio / Cama *</label>
            <textarea id="solic-justificacion" class="form-textarea" rows="2" required placeholder="Consigne por qué no puede trasladarse al efector ambulatorio (ej: Residentes con inmovilidad, postración, deterioro cognitivo severo o fragilidad extrema)...">${residente.movilidad.includes('Postrado') || residente.movilidad.includes('Silla') ? 'Paciente en condición de postración / movilidad restringida en residencia geriátrica. Riesgo de descompensación en traslado externo.' : 'Residente institucionalizado en RGLE con indicación médica de reposo en cama.'}</textarea>
          </div>

          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 0.85rem; margin-bottom: 1.25rem;">
            <div style="font-size: 0.82rem; font-weight: 700; color: #007030; margin-bottom: 0.25rem;">
              ✍️ Médico Solicitante Responsable (Trazabilidad Entre Ríos)
            </div>
            <div style="font-size: 0.85rem; color: #1e293b;">
              <strong>${activeProf ? activeProf.nombre_completo : residente.medico_cabecera?.nombre || 'Dr. Médico Asignado'}</strong>
              <span style="color: #64748b; margin-left: 0.5rem;">(${activeProf ? activeProf.matricula : residente.medico_cabecera?.matricula || 'M.P. Entre Ríos'})</span>
            </div>
            <div style="font-size: 0.72rem; color: #15803d; margin-top: 0.2rem;">
              ✓ Firma y Sello institucional registrados conformes a Resolución 284/2005 INSSJP
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
            <button type="button" id="btn-cancelar-solic-modal" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Registrar Solicitud Oficial</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  // Cerrar
  const cerrar = () => container.remove();
  document.getElementById('btn-cerrar-solic-modal').onclick = cerrar;
  document.getElementById('btn-cancelar-solic-modal').onclick = cerrar;

  // Búsqueda CIE-10
  const inputSearch = document.getElementById('solic-cie10-search');
  const selectCie10 = document.getElementById('solic-cie10-select');
  const doSearch = () => {
    const q = inputSearch.value.trim();
    const results = buscarCIE10(q);
    selectCie10.innerHTML = results.map(c => `
      <option value="${c.codigo} - ${c.nombre}">${c.codigo} - ${c.nombre} (${c.categoria})</option>
    `).join('');
    if (results.length > 0) selectCie10.selectedIndex = 0;
  };

  inputSearch.oninput = doSearch;
  document.getElementById('btn-buscar-cie10-solic').onclick = doSearch;

  // Enviar formulario
  document.getElementById('form-solic-practica').onsubmit = (e) => {
    e.preventDefault();
    const cie10Val = selectCie10.value || (CATALOGO_CIE10[0].codigo + ' - ' + CATALOGO_CIE10[0].nombre);
    const tipo = document.getElementById('solic-tipo').value;
    const modulo = tipo.includes('Laboratorio') ? 'MÓDULO I - Extracción Domiciliaria Res. 284/05' : (tipo.includes('Radiología') ? 'MÓDULO I - Radiología Móvil Res. 284/05' : 'PRESTACIÓN DOMICILIARIA I NIVEL');

    const nuevaSol = store.addSolicitudPracticaNivel1(residente.id, {
      fecha_solicitud: document.getElementById('solic-fecha').value,
      tipo_practica: tipo,
      codigo_modulo: modulo,
      justificacion_domiciliaria: document.getElementById('solic-justificacion').value.trim(),
      diagnostico_cie10: cie10Val,
      profesional_solicitante: activeProf ? activeProf.nombre_completo : (residente.medico_cabecera?.nombre || 'Dr. Médico PAMI'),
      matricula_solicitante: activeProf ? activeProf.matricula : (residente.medico_cabecera?.matricula || 'M.P. Entre Ríos'),
      estado: 'SOLICITADA'
    });

    cerrar();
    onGuardado(nuevaSol);
  };
}
