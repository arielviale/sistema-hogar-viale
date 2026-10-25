// ============================================================
// VISTA: INFORMES PERIÓDICOS DE PROFESIONALES (DIARIOS Y SEMANALES)
// Redacción, Trazabilidad, Firma Digital y Exportación Oficial a PDF
// ============================================================

import { store } from '../state/store.js';
import { openPrintInformeProfesionalModal } from '../components/PrintInformeProfesionalModal.js';
import { renderBloqueFirmaSello } from '../components/BloqueFirmaSello.js';

export function renderInformesProfesionalesView(container) {
  const informes = store.data.informes_profesionales || [];
  const profesionales = store.data.profesionales;
  const residentes = store.data.residentes;
  const activeProf = store.getActiveProfessional();

  const getProf = (id) => profesionales.find(p => p.id === id) || profesionales[0];

  container.innerHTML = `
    <div class="animate-fade-in">
      <!-- Encabezado de la Vista -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h1 style="font-size: 1.6rem; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 0.6rem;">
            <span>Informes Periódicos de Profesionales</span>
            <span class="badge badge-vigente" style="font-size: 0.8rem; padding: 0.35rem 0.85rem;">
              ${informes.length} Registros Activos
            </span>
          </h1>
          <p style="font-size: 0.88rem; color: #64748b; margin-top: 0.25rem;">
            Partes Diarios de Guardia y Reportes Semanales por Especialidad con Respaldo de Matrícula Provincial de Entre Ríos
          </p>
        </div>

        <button id="btn-nuevo-informe-modal" class="btn btn-primary" style="background: #009640; border-color: #007a33; font-weight: 700; box-shadow: 0 4px 10px rgba(0, 150, 64, 0.25);">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          + Redactar Nuevo Informe
        </button>
      </div>

      <!-- Barra de Filtros Rápidos -->
      <div class="card" style="margin-bottom: 1.5rem; padding: 1.25rem;">
        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 240px;">
            <label class="form-label">Buscar por título, contenido o residente:</label>
            <input type="text" id="filtro-busqueda-inf" class="form-input" placeholder="Escriba palabras clave..." />
          </div>

          <div style="min-width: 170px;">
            <label class="form-label">Periodicidad:</label>
            <select id="filtro-tipo-inf" class="form-select">
              <option value="TODOS">Todas las frecuencias</option>
              <option value="DIARIO">Informes Diarios (Turno)</option>
              <option value="SEMANAL">Informes Semanales</option>
            </select>
          </div>

          <div style="min-width: 220px;">
            <label class="form-label">Profesional Emisor:</label>
            <select id="filtro-prof-inf" class="form-select">
              <option value="TODOS">Todos los profesionales</option>
              ${profesionales.map(p => `
                <option value="${p.id}">${p.nombre_completo}</option>
              `).join('')}
            </select>
          </div>
        </div>
      </div>

      <!-- Contenedor de Informes -->
      <div id="lista-informes-cards" style="display: flex; flex-direction: column; gap: 1.25rem;">
        <!-- Se renderiza dinámicamente -->
      </div>
    </div>
  `;

  const renderLista = () => {
    const q = (document.getElementById('filtro-busqueda-inf').value || '').toLowerCase();
    const tipoFiltro = document.getElementById('filtro-tipo-inf').value;
    const profFiltro = document.getElementById('filtro-prof-inf').value;

    const filtrados = informes.filter(inf => {
      const matchTipo = tipoFiltro === 'TODOS' || inf.tipo_informe === tipoFiltro;
      const matchProf = profFiltro === 'TODOS' || inf.profesional_id === profFiltro;

      const textoCompleto = `${inf.titulo} ${inf.novedades_evolucion} ${inf.intervenciones_realizadas} ${inf.indicaciones_proximo_turno} ${inf.area_disciplina}`.toLowerCase();
      const matchQuery = !q || textoCompleto.includes(q);

      return matchTipo && matchProf && matchQuery;
    });

    const contenedor = document.getElementById('lista-informes-cards');

    if (filtrados.length === 0) {
      contenedor.innerHTML = `
        <div class="card" style="text-align: center; padding: 3rem; color: #64748b;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5" style="margin: 0 auto 1rem;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <h3 style="font-size: 1.1rem; font-weight: 700; color: #0f172a; margin-bottom: 0.25rem;">No se encontraron informes</h3>
          <p style="font-size: 0.85rem;">Intente ajustando los filtros de búsqueda o redacte un nuevo informe.</p>
        </div>
      `;
      return;
    }

    contenedor.innerHTML = filtrados.map(inf => {
      const prof = getProf(inf.profesional_id);
      const resMencionados = (inf.residentes_ids || []).map(id => residentes.find(r => r.id === id)).filter(Boolean);

      return `
        <div class="card" style="border-left: 4px solid ${inf.tipo_informe === 'DIARIO' ? '#009640' : '#0284c7'}; transition: transform 0.15s, box-shadow 0.15s;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.75rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem; flex-wrap: wrap;">
                <span class="badge ${inf.tipo_informe === 'DIARIO' ? 'badge-vigente' : 'badge-neutral'}" style="font-weight: 700;">
                  ${inf.tipo_informe === 'DIARIO' ? '☀️ INFORME DIARIO' : '📅 INFORME SEMANAL'}
                </span>
                <span style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 700; color: #007030; background: #f0fdf4; padding: 2px 8px; border-radius: 4px; border: 1px solid #bbf7d0;">
                  ${inf.numero_informe}
                </span>
                <span style="font-size: 0.8rem; color: #64748b;">
                  ${inf.tipo_informe === 'DIARIO' ? (inf.turno_horario || 'Turno Guardia') : (inf.periodo_semanal || 'Semana')}
                </span>
                <span style="font-size: 0.8rem; color: #94a3b8;">· ${inf.fecha_emision}</span>
              </div>

              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; line-height: 1.3;">
                ${inf.titulo}
              </h3>
            </div>

            <!-- Botones de Acción -->
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-primary btn-sm btn-imprimir-inf" data-id="${inf.id}" style="font-weight: 700;">
                🖨️ Imprimir / PDF
              </button>
              <button class="btn btn-secondary btn-sm btn-ver-detalle-inf" data-id="${inf.id}">
                👁️ Ver Detalle
              </button>
              <button class="btn btn-secondary btn-sm btn-eliminar-inf" data-id="${inf.id}" title="Eliminar registro" style="color: #ef4444; border-color: #fecaca;">
                🗑️
              </button>
            </div>
          </div>

          <!-- Datos del Profesional Emisor -->
          <div style="display: flex; align-items: center; gap: 0.65rem; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.65rem 1rem; margin-bottom: 1rem;">
            <div style="width: 34px; height: 34px; border-radius: 50%; background: #009640; color: white; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; flex-shrink: 0;">
              ${prof.nombre_completo.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div style="font-size: 0.85rem; font-weight: 700; color: #0f172a;">
                ${prof.nombre_completo} · <span style="font-weight: 600; color: #007030;">${inf.area_disciplina}</span>
              </div>
              <div style="font-size: 0.75rem; color: #64748b;">
                ${prof.especialidad} · Matrícula: <strong>${prof.matricula_provincial}</strong>
              </div>
            </div>
          </div>

          <!-- Resumen y Puntos Clave -->
          <div style="font-size: 0.88rem; color: #334155; margin-bottom: 0.85rem; line-height: 1.5;">
            <strong>Novedades Principales:</strong> ${inf.novedades_evolucion.slice(0, 220)}${inf.novedades_evolucion.length > 220 ? '...' : ''}
          </div>

          <!-- Residentes Involucrados -->
          ${resMencionados.length > 0 ? `
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; border-top: 1px dashed #e2e8f0; padding-top: 0.6rem;">
              <span style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Residentes:</span>
              ${resMencionados.map(r => `
                <span style="font-size: 0.75rem; background: #f1f5f9; color: #0f172a; padding: 1px 8px; border-radius: 9999px; font-weight: 600;">
                  ${r.nombre_completo} (${r.estado_habitacional})
                </span>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Conectar eventos de botones de informe
    contenedor.querySelectorAll('.btn-imprimir-inf').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        const inf = informes.find(i => i.id === id);
        if (inf) {
          openPrintInformeProfesionalModal(inf, getProf(inf.profesional_id), residentes);
        }
      };
    });

    contenedor.querySelectorAll('.btn-ver-detalle-inf').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        const inf = informes.find(i => i.id === id);
        if (inf) {
          openPrintInformeProfesionalModal(inf, getProf(inf.profesional_id), residentes);
        }
      };
    });

    contenedor.querySelectorAll('.btn-eliminar-inf').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        if (confirm("¿Desea eliminar este informe profesional? Esta acción no se puede deshacer.")) {
          store.deleteInformeProfesional(id);
          renderInformesProfesionalesView(container);
        }
      };
    });
  };

  renderLista();

  // Eventos de filtros
  document.getElementById('filtro-busqueda-inf').oninput = renderLista;
  document.getElementById('filtro-tipo-inf').onchange = renderLista;
  document.getElementById('filtro-prof-inf').onchange = renderLista;

  // Botón Redactar Nuevo Informe
  document.getElementById('btn-nuevo-informe-modal').onclick = () => {
    openModalCrearInforme(profesionales, residentes, activeProf, () => {
      renderInformesProfesionalesView(container);
    });
  };
}

// ============================================================
// MODAL PARA REDACTAR NUEVO INFORME PROFESIONAL
// ============================================================
function openModalCrearInforme(profesionales, residentes, activeProf, onSuccess) {
  const existing = document.getElementById('modal-crear-informe-container');
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.id = 'modal-crear-informe-container';
  container.className = 'modal-backdrop animate-fade-in';

  container.innerHTML = `
    <div class="modal-content" style="max-width: 820px; max-height: 92vh; overflow-y: auto;">
      <div class="modal-header" style="background: #0f172a; color: white;">
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          <div style="background: rgba(15, 118, 110, 0.4); padding: 6px; border-radius: 6px; color: #5eead4;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </div>
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 800; color: white; margin: 0;">
              Redacción de Informe Profesional Oficial
            </h3>
            <p style="font-size: 0.78rem; color: #94a3b8; margin: 0;">
              Residencia Gerontológica Municipal "Hogar Madre Teresa" · Viale
            </p>
          </div>
        </div>

        <button id="btn-cerrar-modal-crear" class="btn btn-secondary btn-sm" style="background: rgba(255,255,255,0.15); color: white; border: none;">
          ✕
        </button>
      </div>

      <form id="form-nuevo-informe-prof" style="padding: 1.75rem;">
        
        <!-- Fila 1: Profesional y Frecuencia -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem;">
          <div class="form-group">
            <label class="form-label">Profesional Interviniente *</label>
            <select id="inf-prof-select" class="form-select" required>
              ${profesionales.map(p => `
                <option value="${p.id}" ${p.id === activeProf.id ? 'selected' : ''}>
                  ${p.nombre_completo} (${p.especialidad.split('/')[0].trim()} - ${p.matricula_provincial})
                </option>
              `).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Tipo de Informe (Periodicidad) *</label>
            <select id="inf-tipo-select" class="form-select" required>
              <option value="DIARIO" selected>Informe Diario (Turno / Guardia)</option>
              <option value="SEMANAL">Informe Semanal (Evolución de Área)</option>
            </select>
          </div>
        </div>

        <!-- Fila 2 Dinámica: Fechas y Turno -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem;">
          <div class="form-group">
            <label class="form-label">Fecha de Emisión *</label>
            <input type="date" id="inf-fecha" class="form-input" value="${new Date().toISOString().slice(0, 10)}" required />
          </div>

          <!-- Campo dinámico para Diario -->
          <div class="form-group" id="grupo-turno-diario">
            <label class="form-label">Turno / Horario *</label>
            <select id="inf-turno" class="form-select">
              <option value="Turno Mañana (07:00 a 14:00 hs)">Turno Mañana (07:00 a 14:00 hs)</option>
              <option value="Turno Tarde (14:00 a 21:00 hs)">Turno Tarde (14:00 a 21:00 hs)</option>
              <option value="Turno Noche (21:00 a 07:00 hs)">Turno Noche (21:00 a 07:00 hs)</option>
              <option value="Guardia Completa 24 hs">Guardia Completa 24 hs</option>
              <option value="Ronda Médica Matinal">Ronda Médica Matinal</option>
            </select>
          </div>

          <!-- Campo dinámico para Semanal -->
          <div class="form-group" id="grupo-periodo-semanal" style="display: none;">
            <label class="form-label">Período Semanal Comprendido *</label>
            <input type="text" id="inf-periodo" class="form-input" placeholder="Ej. Semana del 19 al 25 de Octubre de 2026" />
          </div>
        </div>

        <!-- Fila 3: Disciplina y Título -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem;">
          <div class="form-group">
            <label class="form-label">Disciplina / Especialidad *</label>
            <input type="text" id="inf-area" class="form-input" value="Enfermería y Cuidados Generales" required />
          </div>

          <div class="form-group">
            <label class="form-label">Título o Asunto del Informe *</label>
            <input type="text" id="inf-titulo" class="form-input" placeholder="Ej. Parte Diario de Guardia y Medicación Matinal" required />
          </div>
        </div>

        <!-- Resumen Ejecutivo -->
        <div class="form-group" style="margin-bottom: 1.25rem;">
          <label class="form-label">Resumen Ejecutivo General</label>
          <input type="text" id="inf-resumen" class="form-input" placeholder="Breve síntesis de la jornada o semana para lectura rápida..." />
        </div>

        <!-- Residentes Abordados -->
        <div class="form-group" style="margin-bottom: 1.25rem;">
          <label class="form-label">Residentes Abordados / Involucrados (Opcional):</label>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.5rem; background: #f8fafc; padding: 0.75rem; border-radius: 8px; border: 1px solid #e2e8f0; max-height: 140px; overflow-y: auto;">
            ${residentes.map(r => `
              <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; cursor: pointer;">
                <input type="checkbox" name="inf-residente-check" value="${r.id}" />
                <span>${r.nombre_completo} (${r.estado_habitacional.split('-')[0].trim()})</span>
              </label>
            `).join('')}
          </div>
        </div>

        <!-- Campos de Texto Detallados -->
        <div class="form-group" style="margin-bottom: 1.25rem;">
          <label class="form-label">1. Novedades y Evolución Clínica / Conductual / Funcional *</label>
          <textarea id="inf-novedades" class="form-textarea" rows="3" placeholder="Detalle exhaustivo de signos vitales, eventos, descanso, alimentación, caídas, dolor, ánimo..." required></textarea>
        </div>

        <div class="form-group" style="margin-bottom: 1.25rem;">
          <label class="form-label">2. Intervenciones, Procedimientos y Talleres Realizados *</label>
          <textarea id="inf-intervenciones" class="form-textarea" rows="3" placeholder="Curaciones, suministro de fármacos, ejercicios de kinesiología, acompañamiento psicológico, entrevistas..." required></textarea>
        </div>

        <div class="form-group" style="margin-bottom: 1.5rem;">
          <label class="form-label">3. Indicaciones y Pautas para el Próximo Turno o Semana *</label>
          <textarea id="inf-indicaciones" class="form-textarea" rows="2" placeholder="Pautas de alarma, controles pendientes, recomendaciones para el relevo o la semana siguiente..." required></textarea>
        </div>

        <!-- Previsualización de Sello y Firma -->
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem;">
          <div style="font-size: 0.8rem; font-weight: 700; color: #007030; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.4rem;">
            <span>✓ Bloque de Validación y Firma Digital Registrada:</span>
          </div>
          <div id="preview-sello-prof" style="font-size: 0.82rem; color: #334155;">
            <!-- Dinámico -->
          </div>
        </div>

        <!-- Botones de Acción -->
        <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
          <button type="button" id="btn-cancelar-modal-crear" class="btn btn-secondary">Cancelar</button>
          <button type="submit" class="btn btn-primary" style="font-weight: 700;">
            ✓ Guardar y Firmar Informe Oficial
          </button>
        </div>

      </form>
    </div>
  `;

  document.body.appendChild(container);

  // Selector dinámico tipo de informe
  const tipoSelect = document.getElementById('inf-tipo-select');
  const grupoTurno = document.getElementById('grupo-turno-diario');
  const grupoPeriodo = document.getElementById('grupo-periodo-semanal');

  tipoSelect.onchange = () => {
    if (tipoSelect.value === 'DIARIO') {
      grupoTurno.style.display = 'block';
      grupoPeriodo.style.display = 'none';
    } else {
      grupoTurno.style.display = 'none';
      grupoPeriodo.style.display = 'block';
    }
  };

  // Previsualización del sello
  const profSelect = document.getElementById('inf-prof-select');
  const areaInput = document.getElementById('inf-area');
  const previewSello = document.getElementById('preview-sello-prof');

  const updateProfPreview = () => {
    const selectedP = profesionales.find(p => p.id === profSelect.value) || profesionales[0];
    areaInput.value = selectedP.especialidad.split('/')[0].trim();
    previewSello.innerHTML = `
      <strong>${selectedP.nombre_completo}</strong> · ${selectedP.profesion} · Matrícula Provincial: <strong>${selectedP.matricula_provincial}</strong>
      <div style="font-size: 0.75rem; color: #64748b; margin-top: 0.2rem;">Firma digital y sello reglamentario se insertarán automáticamente al guardar.</div>
    `;
  };

  profSelect.onchange = updateProfPreview;
  updateProfPreview();

  // Cerrar modal
  const closeModal = () => container.remove();
  document.getElementById('btn-cerrar-modal-crear').onclick = closeModal;
  document.getElementById('btn-cancelar-modal-crear').onclick = closeModal;

  // Submit del formulario
  document.getElementById('form-nuevo-informe-prof').onsubmit = (e) => {
    e.preventDefault();

    const selectedResidentes = Array.from(document.querySelectorAll('input[name="inf-residente-check"]:checked')).map(cb => cb.value);

    const nuevo = store.addInformeProfesional({
      profesional_id: profSelect.value,
      tipo_informe: tipoSelect.value,
      fecha_emision: document.getElementById('inf-fecha').value,
      turno_horario: tipoSelect.value === 'DIARIO' ? document.getElementById('inf-turno').value : '',
      periodo_semanal: tipoSelect.value === 'SEMANAL' ? document.getElementById('inf-periodo').value : '',
      area_disciplina: document.getElementById('inf-area').value,
      titulo: document.getElementById('inf-titulo').value,
      resumen_ejecutivo: document.getElementById('inf-resumen').value,
      residentes_ids: selectedResidentes,
      novedades_evolucion: document.getElementById('inf-novedades').value,
      intervenciones_realizadas: document.getElementById('inf-intervenciones').value,
      indicaciones_proximo_turno: document.getElementById('inf-indicaciones').value
    });

    alert(`¡Informe ${nuevo.numero_informe} guardado y firmado correctamente!`);
    closeModal();
    if (onSuccess) onSuccess();
  };
}
