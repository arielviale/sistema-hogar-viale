// ============================================================
// COMPONENTE: VISTA PREVIA Y EXPORTACIÓN FORMAL A PDF
// Solicitud Médica de Práctica Domiciliaria de I Nivel
// Conforme a Resolución Nº 284/2005 INSSJP - PAMI
// Hogar Madre Teresa · Viale, Entre Ríos
// ============================================================

import { renderBloqueFirmaSello } from './BloqueFirmaSello.js';

export function openPrintPracticaDomiciliariaModal(solicitud, residente, profesional) {
  const existing = document.getElementById('print-practica-modal-container');
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.id = 'print-practica-modal-container';
  container.className = 'modal-backdrop animate-fade-in';

  const tipoLabel = solicitud.tipo_practica === 'LABORATORIO_DOMICILIARIO'
    ? 'Laboratorio Bioquímico con Extracción en Residencia'
    : solicitud.tipo_practica === 'RX_PORTATIL'
    ? 'Diagnóstico por Imágenes (Radiología Portátil en Residencia)'
    : 'Fisiokinesioterapia y Rehabilitación Motora en Residencia';

  container.innerHTML = `
    <div class="modal-content" style="max-width: 850px; max-height: 92vh; overflow-y: auto;">
      <div class="modal-header no-print" style="position: sticky; top: 0; background: #072517; color: white; z-index: 10; border-bottom: 2px solid #009640;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="background: rgba(0, 150, 64, 0.3); border: 1px solid #8dc63f; padding: 8px; border-radius: 8px; color: #86efac;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <div>
            <h3 style="font-size: 1.1rem; font-weight: 700; color: white; margin: 0;">
              Solicitud Médica Oficial - Prácticas de I Nivel Domiciliarias
            </h3>
            <p style="font-size: 0.78rem; color: #86efac; margin: 0;">
              Marco: <strong>Resolución N° 284/2005 INSSJP (PAMI)</strong> · Residencia Hogar Madre Teresa
            </p>
          </div>
        </div>

        <div style="display: flex; gap: 0.5rem;">
          <button id="btn-imprimir-solicitud-practica" class="btn btn-primary" style="background: #009640; border-color: #007a33; font-weight: 700;">
            🖨️ Imprimir / Guardar como PDF
          </button>
          <button id="btn-cerrar-print-practica" class="btn btn-secondary" style="background: rgba(255, 255, 255, 0.15); color: white; border: 1px solid rgba(255, 255, 255, 0.25);">
            Cerrar
          </button>
        </div>
      </div>

      <div class="modal-body" id="print-solicitud-body" style="background: white; padding: 2.75rem; color: #0f172a; font-size: 0.95rem; line-height: 1.6;">
        
        <!-- MEMBRETE FORMAL INSTITUCIONAL -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #009640; padding-bottom: 1.25rem; margin-bottom: 1.5rem;">
          <div>
            <div style="font-size: 0.78rem; font-weight: 800; color: #007030; text-transform: uppercase; letter-spacing: 0.06em;">
              Municipalidad de Viale · Entre Ríos
            </div>
            <div style="font-size: 1.35rem; font-weight: 800; color: #009640; font-family: var(--font-serif); margin-top: 2px;">
              RESIDENCIA GERONTOLÓGICA "HOGAR MADRE TERESA"
            </div>
            <div style="font-size: 0.8rem; color: #475569; font-weight: 600;">
              Atención y Gestión Integral para Personas Mayores · Res. Nº 284/05 INSSJP
            </div>
          </div>

          <div style="text-align: right; font-family: var(--font-mono); font-size: 0.82rem; background: #f0fdf4; padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid #bbf7d0;">
            <div style="font-weight: 800; color: #007030;">ORDEN MÉDICA DE I NIVEL</div>
            <div style="font-size: 1.05rem; font-weight: 800; color: #0f172a;">${solicitud.id}</div>
            <div style="font-size: 0.75rem; color: #007030;">Fecha: ${solicitud.fecha_solicitud}</div>
          </div>
        </div>

        <!-- CUADRO DE AFILIACIÓN Y DOMICILIO INSTITUCIONAL -->
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-left: 4px solid #009640; border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem;">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.85rem; font-size: 0.88rem;">
            <div><strong>Afiliado / Residente:</strong> ${residente.nombre_completo}</div>
            <div><strong>DNI:</strong> ${residente.dni} (Edad: ${residente.edad} años)</div>
            <div><strong>Obra Social:</strong> ${residente.obra_social}</div>
            <div><strong>Nº de Afiliación / Beneficio:</strong> <span style="font-family: var(--font-mono); font-weight: 700; color: #007030;">${residente.nro_afiliado}</span></div>
            <div><strong>UGL / Región:</strong> UGL XIV - Paraná (Agencia Viale)</div>
            <div><strong>Lugar de Realización:</strong> Residencia Hogar Madre Teresa (${residente.estado_habitacional}), Viale, E.R.</div>
          </div>
        </div>

        <!-- TIPO DE PRESTACIÓN SOLICITADA -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: #007030; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.35rem; margin-bottom: 0.75rem; text-transform: uppercase;">
            1. Prestación Requerida según Menú Prestacional de I Nivel (Res. 284/05)
          </h4>
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 1rem; margin-bottom: 0.75rem;">
            <div style="font-weight: 800; color: #007030; font-size: 1rem; margin-bottom: 0.25rem;">
              ${tipoLabel}
            </div>
            <div style="font-size: 0.88rem; color: #334155;">
              <strong>Códigos / Prácticas solicitadas:</strong>
              <div style="margin-top: 0.35rem; font-family: var(--font-mono); background: white; padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px solid #e2e8f0;">
                ${solicitud.codigo_menu_pami}
              </div>
            </div>
          </div>
        </div>

        <!-- DIAGNÓSTICO Y JUSTIFICACIÓN DE TOMA DOMICILIARIA -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: #007030; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.35rem; margin-bottom: 0.75rem; text-transform: uppercase;">
            2. Diagnóstico CIE-10 y Fundamentación Clínica Domiciliaria
          </h4>
          <div style="font-size: 0.9rem; margin-bottom: 0.75rem;">
            <strong>Diagnóstico de Certeza / Presuntivo (CIE-10):</strong>
            <span class="badge badge-neutral" style="font-size: 0.88rem; font-weight: 700; margin-left: 0.5rem; color: #0f172a;">
              ${solicitud.diagnostico_cie10}
            </span>
          </div>
          <div style="font-size: 0.88rem; color: #334155; background: #fafafa; border: 1px solid #e2e8f0; border-left: 3px solid #009640; padding: 0.75rem; border-radius: 6px;">
            <strong>Justificación de atención institucional / domiciliaria (Res. 284/05):</strong>
            <p style="margin-top: 0.3rem; margin-bottom: 0;">
              ${solicitud.justificacion_domiciliaria}
            </p>
          </div>
        </div>

        <!-- CONDICIONES DE OBLIGACIÓN PRESTACIONAL (RESOLUCIÓN 284/05) -->
        <div style="font-size: 0.75rem; color: #64748b; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 0.75rem; margin-bottom: 2rem;">
          <strong>Nota Regulatoria (Resolución INSSJP N° 284/2005 - Menú I Nivel):</strong>
          <ul style="margin: 0.25rem 0 0 1.2rem; padding: 0;">
            <li>El efector de laboratorio o radiología de I Nivel tiene a su cargo la extracción o toma de muestras biológicas e imágenes en la residencia cuando el beneficiario presente imposibilidad de deambular (Págs. 112 y 124).</li>
            <li>En caso de prácticas urgentes, los resultados de laboratorio no deberán exceder las 6 horas.</li>
            <li>Prohibido el cobro de copagos, aranceles o plus dinerario al afiliado bajo apercibimiento de sanción grave.</li>
          </ul>
        </div>

        <!-- BLOQUE DE FIRMA Y SELLO REGLAMENTARIO DE ENTRE RÍOS -->
        <div style="margin-top: 2rem; border-top: 1px dashed #cbd5e1; padding-top: 1.5rem;">
          <div style="font-size: 0.8rem; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 0.5rem;">
            Médico Solicitante / Médico de Cabecera Acreditado
          </div>
          ${renderBloqueFirmaSello(profesional, solicitud.fecha_solicitud, true, solicitud.id)}
        </div>

      </div>
    </div>
  `;

  document.body.appendChild(container);

  document.getElementById('btn-imprimir-solicitud-practica').onclick = () => {
    window.print();
  };

  document.getElementById('btn-cerrar-print-practica').onclick = () => {
    container.remove();
  };

  container.onclick = (e) => {
    if (e.target === container) container.remove();
  };
}

