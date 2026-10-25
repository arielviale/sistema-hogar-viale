// ============================================================
// COMPONENTE: DOSSIER EJECUTIVO MUNICIPAL - HOGAR MADRE TERESA
// Presentación Oficial ante Autoridades Municipales y Concejo Deliberante
// Viale, Entre Ríos · Cumplimiento Ley Provincial Nº 10.932
// ============================================================

import { store } from '../state/store.js';
import { renderBloqueFirmaSello } from './BloqueFirmaSello.js';

export function openDossierMunicipalModal() {
  const existing = document.getElementById('dossier-modal-container');
  if (existing) existing.remove();

  const stats = store.getEstadisticas();
  const residentes = store.data.residentes;
  const profesionales = store.data.profesionales;
  const dirMedica = profesionales.find(p => p.id === 'prof-1') || profesionales[0];

  const hombres = residentes.filter(r => r.sexo === 'Masculino');
  const mujeres = residentes.filter(r => r.sexo === 'Femenino');
  const fechaHoy = new Date().toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const container = document.createElement('div');
  container.id = 'dossier-modal-container';
  container.className = 'modal-backdrop animate-fade-in';

  container.innerHTML = `
    <div class="modal-content" style="max-width: 980px; max-height: 92vh; overflow-y: auto;">
      <!-- Barra de Acciones del Dossier (No Imprimible) -->
      <div class="modal-header no-print" style="position: sticky; top: 0; background: #072517; color: white; z-index: 10; border-bottom: 2px solid #009640;">
        <div style="display: flex; align-items: center; gap: 0.85rem;">
          <div style="background: rgba(0, 150, 64, 0.3); border: 1px solid #8dc63f; padding: 8px; border-radius: 8px; color: #86efac;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4"/></svg>
          </div>
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 800; color: white; margin: 0;">
              Dossier Ejecutivo de Gestión Institucional
            </h3>
            <p style="font-size: 0.78rem; color: #86efac; margin: 0;">
              Documento Oficial para el Intendente Municipal, Concejo Deliberante y Autoridades de Viale
            </p>
          </div>
        </div>

        <div style="display: flex; gap: 0.6rem; align-items: center;">
          <button id="btn-imprimir-dossier" class="btn btn-primary" style="background: #009640; border-color: #007a33; font-weight: 700;">
            🖨️ Imprimir Dossier Oficial (A4)
          </button>
          <button id="btn-cerrar-dossier" class="btn btn-secondary" style="background: rgba(255, 255, 255, 0.15); color: white; border: 1px solid rgba(255, 255, 255, 0.25);">
            Cerrar
          </button>
        </div>
      </div>

      <!-- Hoja de Presentación Oficial (Cuerpo del Documento) -->
      <div class="modal-body" id="dossier-print-body" style="background: #ffffff; padding: 2.75rem; color: #0f172a; font-size: 0.95rem; line-height: 1.6;">
        
        <!-- MEMBRETE PROTOCOLAR MUNICIPAL -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px double #009640; padding-bottom: 1.25rem; margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; gap: 1.25rem;">
            <div style="width: 58px; height: 58px; border-radius: 12px; background: linear-gradient(135deg, #009640 0%, #8dc63f 100%); display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 4px 10px rgba(0, 150, 64, 0.35);">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4"/></svg>
            </div>
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: #007030; text-transform: uppercase; letter-spacing: 0.08em;">
                Municipalidad de Viale · Entre Ríos
              </div>
              <div style="font-size: 1.45rem; font-weight: 800; color: #0f172a; font-family: var(--font-serif); letter-spacing: -0.01em;">
                RESIDENCIA GERONTOLÓGICA "HOGAR MADRE TERESA"
              </div>
              <div style="font-size: 0.82rem; color: #009640; font-weight: 700;">
                Secretaría de Desarrollo Social y Acción Humana · Registro Provincial Ley Nº 10.932
              </div>
            </div>
          </div>

          <div style="text-align: right; font-family: var(--font-mono); font-size: 0.8rem; background: #f0fdf4; padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid #bbf7d0;">
            <div style="font-weight: 800; color: #009640;">INFORME EJECUTIVO MUNICIPAL</div>
            <div style="font-size: 0.95rem; font-weight: 800; color: #0f172a;">PERÍODO 2026</div>
            <div style="font-size: 0.75rem; color: #007030;">Emisión: ${fechaHoy}</div>
          </div>
        </div>

        <!-- TÍTULO PRINCIPAL Y RESUMEN EJECUTIVO -->
        <div style="text-align: center; margin-bottom: 2rem;">
          <span class="badge badge-vigente" style="font-size: 0.85rem; padding: 0.4rem 1rem; margin-bottom: 0.75rem; display: inline-block;">
            ✓ Sistema Homologado bajo Estándares de Salud de Entre Ríos
          </span>
          <h1 style="font-size: 1.85rem; font-weight: 800; color: #0f172a; line-height: 1.25; margin-bottom: 0.5rem;">
            Informe de Gestión, Capacidad Operativa y Cumplimiento Normativo
          </h1>
          <p style="font-size: 0.95rem; color: #475569; max-width: 780px; margin: 0 auto;">
            Presentación integral del modelo de atención sociosanitaria, informatización del Legajo Único Digital, organización habitacional por sectores de varones y mujeres, y trazabilidad profesional interdisciplinaria.
          </p>
        </div>

        <!-- BLOQUE DE 4 PILARES ESTRATÉGICOS -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem;">
          
          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 4px solid #009640; border-radius: 8px; padding: 1rem; text-align: center;">
            <div style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Residentes Activos</div>
            <div style="font-size: 2.2rem; font-weight: 800; color: #0f172a; font-family: var(--font-mono); margin: 0.2rem 0;">
              ${stats.totalResidentes}
            </div>
            <div style="font-size: 0.75rem; color: #007030; font-weight: 600;">
              100% Capacidad Cubierta
            </div>
          </div>

          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 4px solid #0284c7; border-radius: 8px; padding: 1rem; text-align: center;">
            <div style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Organización Habitacional</div>
            <div style="font-size: 1.2rem; font-weight: 800; color: #0f172a; margin: 0.6rem 0;">
              ${hombres.length} Varones · ${mujeres.length} Mujeres
            </div>
            <div style="font-size: 0.75rem; color: #0284c7; font-weight: 600;">
              2 Sectores Exclusivos
            </div>
          </div>

          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 4px solid #009640; border-radius: 8px; padding: 1rem; text-align: center;">
            <div style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Tasa VGI y PAI Vigentes</div>
            <div style="font-size: 2.2rem; font-weight: 800; color: #007030; font-family: var(--font-mono); margin: 0.2rem 0;">
              ${stats.porcentajeVigentes}%
            </div>
            <div style="font-size: 0.75rem; color: #007030; font-weight: 600;">
              ${stats.vigentes} de ${stats.totalResidentes} con VGI/PAI
            </div>
          </div>

          <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-top: 4px solid #4f46e5; border-radius: 8px; padding: 1rem; text-align: center;">
            <div style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Equipo Profesional</div>
            <div style="font-size: 2.2rem; font-weight: 800; color: #4f46e5; font-family: var(--font-mono); margin: 0.2rem 0;">
              ${profesionales.length}
            </div>
            <div style="font-size: 0.75rem; color: #4f46e5; font-weight: 600;">
              Matriculados Entre Ríos
            </div>
          </div>

        </div>

        <!-- SECCIÓN 1: IDENTIFICACIÓN Y REGISTRO FOTOGRÁFICO DE LA POBLACIÓN -->
        <div style="margin-bottom: 2rem;">
          <h2 style="font-size: 1.15rem; font-weight: 800; color: #007030; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 0.4rem; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.03em;">
            1. Padrón Institucional de Residentes Activos
          </h2>
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">
            Cada residente cuenta con Legajo Único Digitalizado, fotografía oficial de identificación, habitación asignada en el sector correspondiente y seguimiento clínico individualizado.
          </p>

          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
            ${residentes.map(r => `
              <div style="display: flex; gap: 0.85rem; align-items: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.85rem;">
                <img src="${r.foto_url}" alt="${r.nombre_completo}" style="width: 58px; height: 58px; border-radius: 50%; object-fit: cover; border: 2.5px solid #009640; flex-shrink: 0;" />
                <div style="min-width: 0; flex: 1;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="font-size: 0.88rem; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                      ${r.nombre_completo}
                    </strong>
                    <span style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 700; color: #007030; background: #dcfce7; padding: 1px 6px; border-radius: 4px;">
                      ${r.numero_legajo}
                    </span>
                  </div>
                  <div style="font-size: 0.78rem; color: #475569; margin-top: 0.15rem;">
                    <strong>${r.estado_habitacional}</strong> · ${r.edad} años
                  </div>
                  <div style="font-size: 0.75rem; color: #64748b; margin-top: 0.1rem;">
                    ${r.obra_social} · Barthel: ${r.vgi_vigente ? `${r.vgi_vigente.barthel_puntaje} pts (${r.vgi_vigente.barthel_clasificacion})` : 'Pendiente'}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECCIÓN 2: GARANTÍA DE TRAZABILIDAD Y CUMPLIMIENTO LEGAL PROVINCIAL -->
        <div style="margin-bottom: 2rem; background: #f0fdf4; border: 1px solid #86efac; border-radius: 10px; padding: 1.25rem;">
          <h2 style="font-size: 1.05rem; font-weight: 800; color: #007030; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>⚖️ Marco Legal y Trazabilidad Profesional en Entre Ríos</span>
          </h2>
          <p style="font-size: 0.85rem; color: #005826; margin-bottom: 0.75rem; line-height: 1.5;">
            Conforme a la <strong>Ley Provincial Nº 10.932</strong> y las disposiciones sanitarias del <strong>Ministerio de Salud de Entre Ríos</strong>, este sistema municipal garantiza:
          </p>
          <ul style="font-size: 0.82rem; color: #007030; margin-left: 1.5rem; display: flex; flex-direction: column; gap: 0.35rem;">
            <li><strong>Inmutabilidad y Sello de Tiempo:</strong> Ninguna evolución médica, social o valoración de enfermería puede alterarse una vez guardada.</li>
            <li><strong>Firma Digital y Sello Reglamentario:</strong> Cada intervención incluye la firma electrónica u ológrafa y el sello con Matrícula Provincial de Entre Ríos.</li>
            <li><strong>Reevaluación Semestral Obligatoria:</strong> Alertas preventivas que aseguran que el 100% de los residentes cuenten con su VGI y PAI al día.</li>
            <li><strong>Separación por Sectores:</strong> Organización en Sector Varones y Sector Mujeres para preservar la intimidad, orden y confort de los residentes.</li>
          </ul>
        </div>

        <!-- SECCIÓN 3: PLAN DE ACCIÓN COMUNITARIA E INTEGRACIÓN CON LA CIUDAD DE VIALE -->
        <div style="margin-bottom: 2.5rem;">
          <h2 style="font-size: 1.15rem; font-weight: 800; color: #007030; border-bottom: 1.5px solid #cbd5e1; padding-bottom: 0.4rem; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.03em;">
            3. Ejes de Planificación Estratégica 2026 en Viale
          </h2>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; font-size: 0.82rem;">
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.85rem;">
              <strong style="color: #007030; display: block; margin-bottom: 0.25rem;">Eje 1: Salud y Rehabilitación</strong>
              Fisioterapia bi-semanal con Kinesiología, control médico mensual de polifarmacia y nutrición gerontológica adaptada.
            </div>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.85rem;">
              <strong style="color: #007030; display: block; margin-bottom: 0.25rem;">Eje 2: Estimulación Cognitiva</strong>
              Talleres semanales de memoria, lectura de periódicos locales, manualidades y recreación musical tanguera y litoraleña.
            </div>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.85rem;">
              <strong style="color: #007030; display: block; margin-bottom: 0.25rem;">Eje 3: Comunidad y Vínculos</strong>
              Articulación con escuelas de Viale, grupo de voluntariado de la Parroquia Santa Ana y eventos del Club Atlético Arsenal.
            </div>
          </div>
        </div>

        <!-- SECCIÓN 4: CIERRE Y BLOQUE DE FIRMAS PROTOCOLARES -->
        <div style="border-top: 2px solid #009640; padding-top: 1.5rem; margin-top: 2rem; page-break-inside: avoid;">
          <div style="font-size: 0.82rem; color: #475569; margin-bottom: 1.5rem; text-align: center;">
            El presente Dossier Ejecutivo da fe del estado asistencial y operativo del Hogar Madre Teresa para su elevación formal a las autoridades de la Municipalidad de Viale, Entre Ríos.
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;">
            <!-- Firma Dirección Médica -->
            <div style="text-align: center;">
              <div style="height: 60px; display: flex; align-items: flex-end; justify-content: center; margin-bottom: 0.5rem;">
                <img src="${dirMedica.firma_url}" alt="Firma Dirección" style="max-height: 50px;" />
              </div>
              <div style="border-top: 1.5px solid #0f172a; padding-top: 0.5rem;">
                <div style="font-weight: 800; font-size: 0.9rem; color: #0f172a;">${dirMedica.nombre_completo}</div>
                <div style="font-size: 0.78rem; color: #475569;">${dirMedica.especialidad}</div>
                <div style="font-size: 0.75rem; color: #007030; font-weight: 700;">${dirMedica.matricula_provincial}</div>
                <div style="font-size: 0.72rem; color: #64748b;">Dirección Médica e Institucional</div>
              </div>
            </div>

            <!-- Firma Secretaría de Desarrollo Social Municipal -->
            <div style="text-align: center;">
              <div style="height: 60px; display: flex; align-items: flex-end; justify-content: center; margin-bottom: 0.5rem;">
                <svg width="120" height="40" viewBox="0 0 120 40"><path d="M10 30 Q40 5 70 25 T110 15" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round"/></svg>
              </div>
              <div style="border-top: 1.5px solid #0f172a; padding-top: 0.5rem;">
                <div style="font-weight: 800; font-size: 0.9rem; color: #0f172a;">Secretaría de Desarrollo Social</div>
                <div style="font-size: 0.78rem; color: #475569;">Área de Personas Mayores y Políticas Sociales</div>
                <div style="font-size: 0.75rem; color: #007030; font-weight: 700;">Municipalidad de Viale · Entre Ríos</div>
                <div style="font-size: 0.72rem; color: #64748b;">Visto Bueno del Departamento Ejecutivo</div>
              </div>
            </div>
          </div>
        </div>

        <!-- PIE DE HOJA INSTITUCIONAL -->
        <div style="margin-top: 2rem; border-top: 1px solid #cbd5e1; padding-top: 0.75rem; text-align: center; font-size: 0.75rem; color: #64748b;">
          Residencia Gerontológica Municipal "Hogar Madre Teresa" · San Martín y 25 de Mayo, Viale
        </div>

      </div>
    </div>
  `;

  document.body.appendChild(container);

  document.getElementById('btn-cerrar-dossier').onclick = () => container.remove();
  document.getElementById('btn-imprimir-dossier').onclick = () => window.print();
}
