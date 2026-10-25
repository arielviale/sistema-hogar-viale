// ============================================================
// COMPONENTE: VISTA PREVIA Y EXPORTACIÓN A PDF DE INFORME PROFESIONAL
// Formato Institucional Reglamentario para Todos los Profesionales
// Hogar Madre Teresa · Viale, Entre Ríos
// ============================================================

import { renderBloqueFirmaSello } from './BloqueFirmaSello.js';

export function openPrintInformeProfesionalModal(informe, profesional, residentes = []) {
  const existing = document.getElementById('print-informe-modal-container');
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.id = 'print-informe-modal-container';
  container.className = 'modal-backdrop animate-fade-in';

  // Buscar residentes mencionados
  const residentesMencionados = (informe.residentes_ids || []).map(id => residentes.find(r => r.id === id)).filter(Boolean);

  container.innerHTML = `
    <div class="modal-content" style="max-width: 900px; max-height: 92vh; overflow-y: auto;">
      <div class="modal-header no-print" style="position: sticky; top: 0; background: #072517; color: white; z-index: 10; border-bottom: 2px solid #009640;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="background: rgba(0, 150, 64, 0.3); border: 1px solid #8dc63f; padding: 8px; border-radius: 8px; color: #86efac;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <div>
            <h3 style="font-size: 1.1rem; font-weight: 700; color: white; margin: 0;">
              Vista de Impresión Oficial: Informe Profesional (${informe.tipo_informe})
            </h3>
            <p style="font-size: 0.78rem; color: #86efac; margin: 0;">
              Registro: <strong>${informe.numero_informe}</strong> · ${profesional.nombre_completo}
            </p>
          </div>
        </div>

        <div style="display: flex; gap: 0.5rem;">
          <button id="btn-imprimir-informe-prof" class="btn btn-primary" style="background: #009640; border-color: #007a33; font-weight: 700;">
            🖨️ Imprimir / Guardar como PDF
          </button>
          <button id="btn-cerrar-print-informe" class="btn btn-secondary" style="background: rgba(255, 255, 255, 0.15); color: white; border: 1px solid rgba(255, 255, 255, 0.25);">
            Cerrar
          </button>
        </div>
      </div>

      <div class="modal-body" id="print-informe-body" style="background: white; padding: 2.75rem; color: #0f172a; font-size: 0.95rem; line-height: 1.6;">
        
        <!-- MEMBRETE FORMAL INSTITUCIONAL MUNICIPAL -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #009640; padding-bottom: 1.25rem; margin-bottom: 1.75rem;">
          <div>
            <div style="font-size: 0.78rem; font-weight: 800; color: #007030; text-transform: uppercase; letter-spacing: 0.06em;">
              Municipalidad de Viale · Entre Ríos
            </div>
            <div style="font-size: 1.35rem; font-weight: 800; color: #009640; font-family: var(--font-serif); margin-top: 2px;">
              RESIDENCIA GERONTOLÓGICA "HOGAR MADRE TERESA"
            </div>
            <div style="font-size: 0.8rem; color: #475569; font-weight: 600;">
              Secretaría de Desarrollo Social, Salud y Acción Humana · Ley Prov. Nº 10.932
            </div>
          </div>

          <div style="text-align: right; font-family: var(--font-mono); font-size: 0.82rem; background: #f0fdf4; padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid #bbf7d0;">
            <div style="font-weight: 800; color: #009640;">INFORME PROFESIONAL ${informe.tipo_informe}</div>
            <div style="font-size: 1.05rem; font-weight: 800; color: #0f172a;">${informe.numero_informe}</div>
            <div style="font-size: 0.75rem; color: #007030;">Fecha: ${informe.fecha_emision}</div>
          </div>
        </div>

        <!-- ENCABEZADO CON DATOS DEL PROFESIONAL Y PERÍODO -->
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 4px solid #009640; border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem;">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.85rem; font-size: 0.88rem;">
            <div>
              <strong>Profesional Interviniente:</strong> ${profesional.nombre_completo}
            </div>
            <div>
              <strong>Matrícula Provincial:</strong> <span style="font-family: var(--font-mono); font-weight: 700; color: #007030;">${profesional.matricula_provincial}</span>
            </div>
            <div>
              <strong>Disciplina / Área:</strong> ${informe.area_disciplina}
            </div>
            <div>
              <strong>Periodicidad / Turno:</strong> 
              ${informe.tipo_informe === 'DIARIO' 
                ? (informe.turno_horario || 'Jornada Diaria') 
                : (informe.periodo_semanal || 'Informe Semanal')}
            </div>
          </div>
        </div>

        <!-- TÍTULO DEL INFORME -->
        <div style="margin-bottom: 1.25rem;">
          <h2 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin-bottom: 0.35rem;">
            ${informe.titulo}
          </h2>
          ${informe.resumen_ejecutivo ? `
            <p style="font-size: 0.9rem; color: #475569; font-style: italic; background: #f1f5f9; padding: 0.75rem 1rem; border-radius: 6px;">
              "${informe.resumen_ejecutivo}"
            </p>
          ` : ''}
        </div>

        <!-- RESIDENTES INVOLUCRADOS (SI APLICA) -->
        ${residentesMencionados.length > 0 ? `
          <div style="margin-bottom: 1.5rem;">
            <h4 style="font-size: 0.85rem; font-weight: 700; color: #007030; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.5rem;">
              Residentes Abordados / Evaluados en esta Intervención:
            </h4>
            <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
              ${residentesMencionados.map(r => `
                <div style="display: inline-flex; align-items: center; gap: 0.4rem; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 0.3rem 0.65rem; border-radius: 6px; font-size: 0.8rem;">
                  <strong style="color: #0f172a;">${r.nombre_completo}</strong>
                  <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #007030; font-weight: 700;">(${r.numero_legajo} - ${r.estado_habitacional})</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- CUERPO 1: NOVEDADES Y EVOLUCIÓN -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: #007030; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.35rem; margin-bottom: 0.6rem;">
            1. Novedades y Evolución Clínica / Funcional / Conductual
          </h4>
          <div style="font-size: 0.9rem; color: #1e293b; white-space: pre-line; background: #fafafa; padding: 1rem; border-radius: 6px; border: 1px solid #f1f5f9;">
            ${informe.novedades_evolucion || 'Sin novedades de relevancia consignadas.'}
          </div>
        </div>

        <!-- CUERPO 2: INTERVENCIONES REALIZADAS -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: #007030; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.35rem; margin-bottom: 0.6rem;">
            2. Intervenciones, Actividades y Procedimientos Ejecutados
          </h4>
          <div style="font-size: 0.9rem; color: #1e293b; white-space: pre-line; background: #fafafa; padding: 1rem; border-radius: 6px; border: 1px solid #f1f5f9;">
            ${informe.intervenciones_realizadas || 'Procedimientos habituales conforme a pautas de atención.'}
          </div>
        </div>

        <!-- CUERPO 3: INDICACIONES Y PAUTAS PARA EL PRÓXIMO TURNO O SEMANA -->
        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: #007030; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.35rem; margin-bottom: 0.6rem;">
            3. Indicaciones, Pautas de Alarma y Objetivos para el Próximo Relevo / Semana
          </h4>
          <div style="font-size: 0.9rem; color: #0f172a; white-space: pre-line; background: #f0fdf4; padding: 1rem; border-radius: 6px; border: 1px solid #bbf7d0; font-weight: 500;">
            ${informe.indicaciones_proximo_turno || 'Continuar con el esquema de cuidados previsto en el PAI.'}
          </div>
        </div>

        <!-- BLOQUE REGLAMENTARIO DE FECHA, FIRMA Y SELLO PROFESIONAL -->
        <div style="margin-top: 2.5rem; page-break-inside: avoid;">
          ${renderBloqueFirmaSello(profesional, informe.fecha_creacion, true, informe.numero_informe)}
        </div>

        <!-- PIE INSTITUCIONAL EXACTO -->
        <div style="margin-top: 2rem; border-top: 1px solid #cbd5e1; padding-top: 0.75rem; text-align: center; font-size: 0.75rem; color: #64748b;">
          Residencia Gerontológica Municipal "Hogar Madre Teresa" · San Martín y 25 de Mayo, Viale
        </div>

      </div>
    </div>
  `;

  document.body.appendChild(container);

  document.getElementById('btn-cerrar-print-informe').onclick = () => container.remove();
  document.getElementById('btn-imprimir-informe-prof').onclick = () => window.print();
}
