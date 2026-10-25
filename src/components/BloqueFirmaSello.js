// ============================================================
// COMPONENTE: BLOQUE OFICIAL DE FECHA, FIRMA Y SELLO PROFESIONAL
// Hogar Madre Teresa - Normativa de Trazabilidad de Entre Ríos
// ============================================================

export function renderBloqueFirmaSello(profesional, fechaHora = null, firmado = true, idRegistro = "REG-001") {
  const fechaEfectiva = fechaHora || new Date().toISOString().replace('T', ' ').slice(0, 16);
  
  if (!profesional) {
    return `
      <div class="bloque-firma-sello bloqueado">
        <div style="color: #64748b; font-size: 0.85rem;">
          <em>Pendiente de validación y firma profesional interdisciplinaria.</em>
        </div>
      </div>
    `;
  }

  return `
    <div class="bloque-firma-sello bloqueado">
      <!-- Columna 1: Fecha y Registro de Auditoría -->
      <div style="display: flex; flex-direction: column; gap: 0.35rem; min-width: 170px;">
        <span style="font-size: 0.72rem; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.05em;">
          Fecha y Hora Efectiva
        </span>
        <div style="display: flex; align-items: center; gap: 0.4rem; font-family: var(--font-mono); font-size: 0.88rem; font-weight: 600; color: #0f172a;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${fechaEfectiva} hs
        </div>
        <span style="font-size: 0.7rem; color: #007030; font-family: var(--font-mono); background: #f0fdf4; border: 1px solid #bbf7d0; padding: 2px 6px; border-radius: 4px; display: inline-block; width: fit-content;">
          ID Trazabilidad: ${idRegistro}
        </span>
      </div>

      <!-- Columna 2: Firma Digitalizada o Trazo -->
      <div class="firma-display-box">
        ${firmado && profesional.firma_url ? `
          <img src="${profesional.firma_url}" alt="Firma ${profesional.nombre_completo}" class="firma-canvas-img" />
        ` : `
          <div class="firma-placeholder-line">_____________________________</div>
        `}
        <span style="font-size: 0.72rem; color: #475569; font-weight: 600; text-align: center; margin-top: 2px;">
          Firma Profesional Validada
        </span>
        <span style="font-size: 0.65rem; color: #009640; font-weight: 700;">
          ✓ Registro Inmutable Cerrado
        </span>
      </div>

      <!-- Columna 3: Sello Profesional Reglamentario (Entre Ríos) -->
      <div class="sello-profesional-box">
        <div class="sello-nombre">${profesional.nombre_completo}</div>
        <div class="sello-profesion">${profesional.profesion}</div>
        <div class="sello-matricula">${profesional.matricula_provincial}</div>
        <div style="font-size: 0.62rem; color: #007030; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 700;">
          Hogar Madre Teresa · Viale
        </div>
      </div>
    </div>
  `;
}
