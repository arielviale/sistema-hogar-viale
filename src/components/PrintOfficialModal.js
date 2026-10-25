// ============================================================
// COMPONENTE: VISTA PREVIA Y EXPORTACIÓN FORMAL A PDF (A4)
// Formato Reglamentario Hogar Madre Teresa - Viale, Entre Ríos
// ============================================================

import { renderBloqueFirmaSello } from './BloqueFirmaSello.js';

export function openPrintOfficialModal(residente, profesionales) {
  const existing = document.getElementById('print-modal-container');
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.id = 'print-modal-container';
  container.className = 'modal-backdrop animate-fade-in';

  // Buscar profesional responsable
  const getProf = (id) => profesionales.find(p => p.id === id) || profesionales[0];

  container.innerHTML = `
    <div class="modal-content" style="max-width: 900px;">
      <div class="modal-header no-print">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="background: #e0f2fe; color: #0284c7; padding: 8px; border-radius: 8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          </div>
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 700;">Vista de Impresión / Exportación PDF Oficial</h3>
            <p style="font-size: 0.8rem; color: #64748b;">Legajo Único Digital: <strong>${residente.numero_legajo}</strong> · ${residente.nombre_completo}</p>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button id="do-print-btn" class="btn btn-primary">
            🖨️ Imprimir / Guardar como PDF
          </button>
          <button id="close-print-btn" class="btn btn-secondary">Cerrar</button>
        </div>
      </div>

      <div class="modal-body" id="print-sheet-body" style="background: white; padding: 2.5rem; color: #0f172a; font-size: 0.95rem;">
        
        <!-- Membrete Formal Municipal / Institucional -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #009640; padding-bottom: 1rem; margin-bottom: 1.5rem;">
          <div>
            <div style="font-size: 0.8rem; font-weight: 700; color: #007030; text-transform: uppercase; letter-spacing: 0.05em;">
              Municipalidad de Viale · Entre Ríos
            </div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #009640; font-family: var(--font-serif); margin-top: 2px;">
              HOGAR GERONTOLÓGICO "MADRE TERESA"
            </div>
            <div style="font-size: 0.75rem; color: #475569;">
              Registro de Residencia para Personas Mayores - Ley Provincial Nº 10.932
            </div>
          </div>
          <div style="text-align: right; font-family: var(--font-mono); font-size: 0.82rem;">
            <div style="font-weight: 700; color: #009640;">LEGAJO ÚNICO DIGITAL</div>
            <div style="font-size: 1rem; font-weight: 800; color: #0f172a;">${residente.numero_legajo}</div>
            <div style="font-size: 0.75rem; color: #64748b;">Fecha Emisión: ${new Date().toLocaleDateString('es-AR')}</div>
          </div>
        </div>

        <!-- Ficha Resumida del Residente -->
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem; display: flex; gap: 1.25rem; align-items: center;">
          ${residente.foto_url ? `
            <img src="${residente.foto_url}" alt="${residente.nombre_completo}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px; border: 2px solid #009640; flex-shrink: 0;" />
          ` : ''}
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.85rem; font-size: 0.85rem; flex: 1;">
            <div><strong>Residente:</strong> ${residente.nombre_completo}</div>
            <div><strong>DNI:</strong> ${residente.dni}</div>
            <div><strong>Edad / F. Nac:</strong> ${residente.edad} años (${residente.fecha_nacimiento})</div>
            <div><strong>Obra Social:</strong> ${residente.obra_social} (Nº ${residente.nro_afiliado})</div>
            <div><strong>Ubicación:</strong> ${residente.estado_habitacional}</div>
            <div><strong>Fecha Ingreso:</strong> ${residente.fecha_ingreso}</div>
            <div style="grid-column: span 3;"><strong>Referente Familiar de Contacto:</strong> ${residente.referente_familiar}</div>
          </div>
        </div>

        <!-- Sección 1: Historia Clínica Resumida -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: #007030; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.35rem; margin-bottom: 0.75rem;">
            1. Historia Clínica y Medicación Habitual
          </h4>
          <p style="font-size: 0.85rem; margin-bottom: 0.5rem;">
            <strong>Antecedentes:</strong> ${residente.historia_clinica.antecedentes}
          </p>
          <p style="font-size: 0.85rem; margin-bottom: 0.75rem;">
            <strong>Alergias:</strong> ${residente.historia_clinica.alergias}
          </p>
          <div style="font-size: 0.82rem; margin-bottom: 0.75rem;">
            <strong>Esquema Farmacológico Actual:</strong>
            <ul style="margin-left: 1.25rem; margin-top: 0.25rem;">
              ${residente.historia_clinica.medicacion_actual.map(m => `
                <li>${m.droga} - ${m.posologia} (${m.horario})</li>
              `).join('')}
            </ul>
          </div>
          ${residente.historia_clinica.evoluciones.length > 0 ? `
            <div style="margin-top: 0.75rem;">
              <span style="font-size: 0.82rem; font-weight: 700;">Última Evolución Registrada:</span>
              <p style="font-size: 0.85rem; font-style: italic; background: #fafafa; padding: 0.6rem; border-left: 3px solid #009640; margin-top: 0.3rem;">
                "${residente.historia_clinica.evoluciones[0].nota}"
              </p>
              ${renderBloqueFirmaSello(getProf(residente.historia_clinica.evoluciones[0].profesional_id), residente.historia_clinica.evoluciones[0].fecha_hora, true, residente.historia_clinica.evoluciones[0].id)}
            </div>
          ` : ''}
        </div>

        <!-- Sección 2: Valoración Gerontológica Integral (VGI) Vigente -->
        ${residente.vgi_vigente ? `
          <div style="margin-bottom: 1.5rem; page-break-inside: avoid;">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: #007030; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.35rem; margin-bottom: 0.75rem;">
              2. Valoración Gerontológica Integral (VGI) Oficial
            </h4>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; margin-bottom: 0.75rem; background: #f0fdf4; padding: 0.75rem; border-radius: 8px;">
              <div><strong>Índice Barthel:</strong> ${residente.vgi_vigente.barthel_puntaje}/100 (${residente.vgi_vigente.barthel_clasificacion})</div>
              <div><strong>Lawton y Brody:</strong> ${residente.vgi_vigente.lawton_puntaje}/8</div>
              <div><strong>Tinetti:</strong> ${residente.vgi_vigente.tinetti_puntaje}/28 (${residente.vgi_vigente.tinetti_riesgo})</div>
              <div><strong>Pfeiffer:</strong> ${residente.vgi_vigente.pfeiffer_errores} err (${residente.vgi_vigente.pfeiffer_clasificacion})</div>
            </div>
            <p style="font-size: 0.82rem; margin-bottom: 0.5rem;">
              <strong>Vigencia:</strong> Evaluado el ${residente.vgi_vigente.fecha_evaluacion} | Próxima revisión prevista: ${residente.vgi_vigente.fecha_proxima_revision}
            </p>
            ${renderBloqueFirmaSello(getProf(residente.vgi_vigente.profesional_id), residente.vgi_vigente.fecha_evaluacion + ' 10:00', true, residente.vgi_vigente.id)}
          </div>
        ` : ''}

        <!-- Sección 3: Plan de Atención Individualizado (PAI) -->
        ${residente.pai_vigente ? `
          <div style="margin-bottom: 1.5rem; page-break-inside: avoid;">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: #007030; border-bottom: 1px solid #cbd5e1; padding-bottom: 0.35rem; margin-bottom: 0.75rem;">
              3. Plan de Atención Individualizado (PAI) Vigente
            </h4>
            <p style="font-size: 0.85rem; margin-bottom: 0.5rem;">
              <strong>Objetivo Terapéutico General:</strong> ${residente.pai_vigente.objetivos_generales}
            </p>
            <div style="font-size: 0.82rem; margin-bottom: 0.75rem;">
              <strong>Metas Interdisciplinarias por Área:</strong>
              <ul style="margin-left: 1.25rem; margin-top: 0.25rem;">
                ${residente.pai_vigente.objetivos_especificos.map(o => `
                  <li><strong>${o.area}:</strong> ${o.meta} (${o.frecuencia} - Responsable: ${o.responsable})</li>
                `).join('')}
              </ul>
            </div>
            ${renderBloqueFirmaSello(getProf(residente.pai_vigente.firmas_equipo[0]), residente.pai_vigente.fecha_elaboracion + ' 12:00', true, residente.pai_vigente.id)}
          </div>
        ` : ''}

        <!-- Pie de Página Institucional -->
        <div style="margin-top: 2rem; border-top: 1px solid #94a3b8; padding-top: 0.75rem; display: flex; justify-content: space-between; font-size: 0.72rem; color: #64748b;">
          <span>Hogar Gerontológico Madre Teresa · San Martín y 25 de Mayo, Viale, Entre Ríos</span>
          <span>Documento Oficial Certificado con Firma y Sello Reglamentario</span>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  document.getElementById('close-print-btn').onclick = () => container.remove();
  document.getElementById('do-print-btn').onclick = () => {
    window.print();
  };
}
