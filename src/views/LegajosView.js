// ============================================================
// VISTA: LEGAJO ÚNICO DIGITAL DEL RESIDENTE (LUR) - FASE 2
// Hogar Madre Teresa · Trazabilidad Integral Interdisciplinaria
// ============================================================

import { store } from '../state/store.js';
import { renderBloqueFirmaSello } from '../components/BloqueFirmaSello.js';
import { openPrintOfficialModal } from '../components/PrintOfficialModal.js';

export function renderLegajosView(container) {
  const residentes = store.data.residentes;
  const profesionales = store.data.profesionales;
  const activeProf = store.getActiveProfessional();

  // Calcular porcentaje de completitud de cada legajo
  const getCompletitud = (r) => {
    let puntos = 0;
    if (r.nombre_completo && r.dni && r.obra_social) puntos += 25;
    if (r.historia_clinica && r.historia_clinica.antecedentes) puntos += 25;
    if (r.historia_social && r.historia_social.trayectoria_vida) puntos += 25;
    if (r.vgi_vigente && r.vgi_vigente.estado_vigencia === 'VIGENTE') puntos += 25;
    else if (r.vgi_vigente) puntos += 15;
    return puntos;
  };

  // Si se seleccionó "nuevo"
  if (store.selectedResidentId === 'nuevo') {
    renderFormularioNuevoResidente(container);
    return;
  }

  // Residente actualmente enfocado
  const selectedRes = residentes.find(r => r.id === store.selectedResidentId) || residentes[0];

  container.innerHTML = `
    <div class="animate-fade-in">
      <!-- Encabezado de Legajos Únicos -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h1 style="font-size: 1.5rem; font-weight: 800; color: #0f172a;">
            Legajo Único Digital del Residente (LUR)
          </h1>
          <p style="font-size: 0.85rem; color: #64748b;">
            Historia Clínica, Social y Valoraciones Interdisciplinarias con Trazabilidad Oficial de Entre Ríos
          </p>
        </div>

        <div style="display: flex; gap: 0.75rem;">
          <button id="btn-alta-nuevo-res" class="btn btn-primary">
            + Nuevo Residente
          </button>
          <button id="btn-exportar-pdf-legajo" class="btn btn-secondary">
            🖨️ Exportar Legajo Oficial (PDF)
          </button>
        </div>
      </div>

      <!-- Barra de Filtros y Selector Rápido de Residente -->
      <div class="card" style="margin-bottom: 1.5rem; padding: 1rem 1.25rem;">
        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <div style="min-width: 170px;">
            <label class="form-label">Filtrar por Sector:</label>
            <select id="filtro-sector-legajos" class="form-select">
              <option value="TODOS">Todos los sectores</option>
              <option value="Sector Varones">Sector Varones</option>
              <option value="Sector Mujeres">Sector Mujeres</option>
            </select>
          </div>
          <div style="flex: 1; min-width: 250px;">
            <label class="form-label">Seleccionar Residente Activo:</label>
            <select id="select-residente-activo" class="form-select" style="font-weight: 600;">
              ${residentes.map(r => {
                const comp = getCompletitud(r);
                return `
                  <option value="${r.id}" ${r.id === selectedRes.id ? 'selected' : ''}>
                    ${r.numero_legajo} - ${r.nombre_completo} (${r.estado_habitacional}) - Completitud: ${comp}%
                  </option>
                `;
              }).join('')}
            </select>
          </div>

          <div style="display: flex; gap: 0.5rem; align-items: flex-end;">
            <div style="text-align: right; padding-right: 0.5rem;">
              <span style="font-size: 0.72rem; color: #64748b; text-transform: uppercase; font-weight: 700;">Estado de VGI/PAI</span>
              <div>
                ${!selectedRes.vgi_vigente ? `
                  <span class="badge badge-vencida">Sin VGI</span>
                ` : selectedRes.vgi_vigente.estado_vigencia === 'VIGENTE' ? `
                  <span class="badge badge-vigente">Vigente (180 días)</span>
                ` : selectedRes.vgi_vigente.estado_vigencia === 'PROXIMO_A_VENCER' ? `
                  <span class="badge badge-advertencia">Próxima a vencer</span>
                ` : `
                  <span class="badge badge-vencida">Vencida</span>
                `}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tarjeta Principal del Legajo con Pestañas -->
      <div class="card" style="padding: 0; overflow: hidden;">
        <!-- Cabecera de la ficha del residente -->
        <div style="background: linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%); padding: 1.5rem 1.75rem; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 1.25rem;">
            ${selectedRes.foto_url ? `
              <img src="${selectedRes.foto_url}" alt="${selectedRes.nombre_completo}" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover; border: 3px solid #009640; box-shadow: 0 4px 10px rgba(0, 150, 64, 0.25); flex-shrink: 0;" />
            ` : `
              <div style="width: 60px; height: 60px; border-radius: 50%; background: #009640; color: white; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: 800; border: 3px solid #bbf7d0; flex-shrink: 0;">
                ${selectedRes.nombre_completo.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
            `}
            <div>
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <h2 style="font-size: 1.3rem; font-weight: 800; color: #0f172a;">
                  ${selectedRes.nombre_completo}
                </h2>
                <span class="badge badge-neutral" style="font-family: var(--font-mono); font-weight: 700;">
                  ${selectedRes.numero_legajo}
                </span>
              </div>
              <div style="font-size: 0.85rem; color: #64748b; margin-top: 0.2rem;">
                ${selectedRes.edad} años · DNI: ${selectedRes.dni} · ${selectedRes.obra_social} (${selectedRes.nro_afiliado}) · ${selectedRes.estado_habitacional}
              </div>
            </div>
          </div>

          <div style="text-align: right;">
            <div style="font-size: 0.75rem; color: #64748b; font-weight: 600;">Completitud del Legajo Único:</div>
            <div style="display: flex; align-items: center; gap: 0.5rem; justify-content: flex-end; margin-top: 0.2rem;">
              <div style="width: 120px; height: 8px; background: #e2e8f0; border-radius: 9999px; overflow: hidden;">
                <div style="width: ${getCompletitud(selectedRes)}%; height: 100%; background: #009640;"></div>
              </div>
              <span style="font-size: 0.85rem; font-weight: 800; font-family: var(--font-mono); color: #007030;">
                ${getCompletitud(selectedRes)}%
              </span>
            </div>
          </div>
        </div>

        <!-- Pestañas de Navegación del Legajo -->
        <div style="padding: 1.25rem 1.75rem 0;">
          <div class="tabs-header">
            <button class="tab-btn active" data-tab="filiatorios">
              📋 1. Datos Filiatorios y Admisión
            </button>
            <button class="tab-btn" data-tab="clinica">
              🩺 2. Historia Clínica y Medicación
            </button>
            <button class="tab-btn" data-tab="social">
              🤝 3. Historia Social y Vínculos
            </button>
            <button class="tab-btn" data-tab="especialidades">
              🧩 4. Valoraciones Interdisciplinarias
            </button>
          </div>
        </div>

        <!-- Contenido de las Pestañas -->
        <div style="padding: 0 1.75rem 1.75rem;">
          
          <!-- PESTAÑA 1: DATOS FILIATORIOS -->
          <div id="tab-content-filiatorios" class="tab-pane animate-fade-in">
            <div style="display: grid; grid-template-columns: ${selectedRes.foto_url ? '220px 1fr 1fr' : 'repeat(auto-fit, minmax(280px, 1fr))'}; gap: 1.5rem; margin-top: 1rem; align-items: start;">
              
              ${selectedRes.foto_url ? `
                <div style="background: #ffffff; padding: 1rem; border-radius: 10px; border: 1px solid var(--border-subtle); text-align: center; box-shadow: var(--shadow-sm);">
                  <div style="position: relative; display: inline-block;">
                    <img src="${selectedRes.foto_url}" alt="${selectedRes.nombre_completo}" style="width: 180px; height: 180px; object-fit: cover; border-radius: 12px; border: 2px solid #cbd5e1; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
                    <span style="position: absolute; bottom: 8px; right: 8px; background: #009640; color: white; font-size: 0.65rem; font-weight: 700; padding: 2px 6px; border-radius: 4px;">ACTIVO</span>
                  </div>
                  <div style="font-size: 0.75rem; color: #64748b; font-weight: 600; margin-top: 0.6rem;">
                    Identificación Fotográfica Institucional
                  </div>
                  <div style="font-size: 0.7rem; color: #007030; font-family: var(--font-mono); margin-top: 2px;">
                    Legajo: ${selectedRes.numero_legajo}
                  </div>
                </div>
              ` : ''}

              <div style="background: #f8fafc; padding: 1.25rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
                <h4 style="font-size: 0.9rem; font-weight: 700; color: #007030; margin-bottom: 0.75rem; text-transform: uppercase;">
                  Admisión e Identificación
                </h4>
                <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem;">
                  <div><strong>Nombre y Apellido:</strong> ${selectedRes.nombre_completo}</div>
                  <div><strong>DNI:</strong> ${selectedRes.dni}</div>
                  <div><strong>Fecha de Nacimiento:</strong> ${selectedRes.fecha_nacimiento} (${selectedRes.edad} años)</div>
                  <div><strong>Sexo:</strong> ${selectedRes.sexo}</div>
                  <div><strong>Fecha de Ingreso al Hogar:</strong> ${selectedRes.fecha_ingreso}</div>
                  <div><strong>Ubicación Habitacional:</strong> <span style="font-weight: 700; color: #007030;">${selectedRes.estado_habitacional}</span> <button id="btn-cambiar-sector-res" type="button" class="btn btn-secondary btn-sm" style="margin-left: 0.5rem; padding: 1px 7px; font-size: 0.72rem; vertical-align: middle;">✏️ Cambiar</button></div>
                  <div><strong>Obra Social:</strong> ${selectedRes.obra_social} (Afiliado: ${selectedRes.nro_afiliado})</div>
                  <div><strong>Estado Administrativo:</strong> <span class="badge badge-vigente">${selectedRes.estado}</span></div>
                </div>
              </div>

              <div style="background: #f8fafc; padding: 1.25rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
                <h4 style="font-size: 0.9rem; font-weight: 700; color: #007030; margin-bottom: 0.75rem; text-transform: uppercase;">
                  Red Vincular y Emergencias
                </h4>
                <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem;">
                  <div><strong>Referente Familiar Principal:</strong> ${selectedRes.referente_familiar}</div>
                  <div><strong>Teléfono Emergencias Sanitarias:</strong> ${selectedRes.telefono_emergencia}</div>
                  <div><strong>Movilidad Habitual:</strong> ${selectedRes.movilidad}</div>
                  <div><strong>Continencia de Esfínteres:</strong> ${selectedRes.continente}</div>
                  <div><strong>Polifarmacia:</strong> ${selectedRes.polifarmacia ? 'Sí (> 5 principios activos)' : 'No'}</div>
                  <div style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px dashed #cbd5e1; font-size: 0.78rem; color: #007030;">
                    ✓ Conforme a la Guía de Atención de Residencias Geriátricas de Entre Ríos
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- PESTAÑA 2: HISTORIA CLÍNICA INTEGRAL -->
          <div id="tab-content-clinica" class="tab-pane animate-fade-in" style="display: none; margin-top: 1rem;">
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
              <div style="background: #f8fafc; padding: 1.25rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
                <h4 style="font-size: 0.88rem; font-weight: 700; color: #007030; margin-bottom: 0.5rem;">
                  Antecedentes Patológicos y Alergias
                </h4>
                <p style="font-size: 0.85rem; margin-bottom: 0.5rem;">${selectedRes.historia_clinica.antecedentes}</p>
                <div style="font-size: 0.82rem; color: #b91c1c; font-weight: 600;">
                  ⚠️ Alergias: ${selectedRes.historia_clinica.alergias}
                </div>
              </div>

              <div style="background: #f8fafc; padding: 1.25rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
                <h4 style="font-size: 0.88rem; font-weight: 700; color: #007030; margin-bottom: 0.5rem;">
                  Último Control de Signos Vitales
                </h4>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; font-size: 0.85rem;">
                  <div>TA: <strong>${selectedRes.historia_clinica.signos_vitales_ultimo.tension_arterial}</strong></div>
                  <div>FC: <strong>${selectedRes.historia_clinica.signos_vitales_ultimo.frecuencia_cardiaca}</strong></div>
                  <div>Temp: <strong>${selectedRes.historia_clinica.signos_vitales_ultimo.temperatura}</strong></div>
                  <div>SatO2: <strong>${selectedRes.historia_clinica.signos_vitales_ultimo.saturacion}</strong></div>
                </div>
                <div style="font-size: 0.72rem; color: #64748b; margin-top: 0.4rem;">
                  Fecha de control: ${selectedRes.historia_clinica.signos_vitales_ultimo.fecha}
                </div>
              </div>
            </div>

            <!-- Esquema Farmacológico Actual -->
            <div style="margin-bottom: 1.5rem;">
              <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                💊 Esquema de Medicación y Farmacovigilancia (Polifarmacia: ${selectedRes.polifarmacia ? 'Sí' : 'No'})
              </h4>
              <div class="table-container">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Fármaco / Droga</th>
                      <th>Posología</th>
                      <th>Horario Pautado</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${selectedRes.historia_clinica.medicacion_actual.map(m => `
                      <tr>
                        <td><strong>${m.droga}</strong></td>
                        <td>${m.posologia}</td>
                        <td><span class="badge badge-neutral">${m.horario}</span></td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Evoluciones Médicas y de Enfermería -->
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h4 style="font-size: 0.95rem; font-weight: 700;">
                  Evoluciones Clínicas Registradas
                </h4>
                <button id="btn-nueva-evolucion" class="btn btn-primary btn-sm">
                  + Registrar Evolución Médica / Enfermería
                </button>
              </div>

              <!-- Formulario desplegable para nueva evolución -->
              <div id="form-nueva-evolucion" style="display: none; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 1.25rem; margin-bottom: 1.25rem;">
                <h5 style="font-size: 0.9rem; font-weight: 700; color: #007030; margin-bottom: 0.5rem;">
                  Nueva Evolución Clínica (Profesional Activo: ${activeProf.nombre_completo})
                </h5>
                <div class="form-group">
                  <label class="form-label">Tipo de Registro:</label>
                  <select id="tipo-evolucion-input" class="form-select">
                    <option value="Evolución Médica Geriátrica">Evolución Médica Geriátrica</option>
                    <option value="Control y Cuidados de Enfermería">Control y Cuidados de Enfermería</option>
                    <option value="Interconsulta Especializada">Interconsulta Especializada</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Nota de Evolución y Plan Terapéutico:</label>
                  <textarea id="nota-evolucion-input" class="form-textarea" rows="3" placeholder="Detalle estado general, síntomas, signos clínicos y conductas adoptadas..."></textarea>
                </div>
                <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
                  <button id="btn-cancelar-evolucion" class="btn btn-secondary btn-sm">Cancelar</button>
                  <button id="btn-guardar-evolucion" class="btn btn-primary btn-sm">Guardar con Fecha, Firma y Sello</button>
                </div>
              </div>

              ${selectedRes.historia_clinica.evoluciones.map(evo => {
                const prof = profesionales.find(p => p.id === evo.profesional_id) || activeProf;
                return `
                  <div style="background: white; border: 1px solid var(--border-subtle); border-radius: 10px; padding: 1.25rem; margin-bottom: 1rem; box-shadow: var(--shadow-sm);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                      <span style="font-weight: 700; color: #007030; font-size: 0.9rem;">${evo.tipo}</span>
                      <span style="font-size: 0.75rem; color: #64748b; font-family: var(--font-mono);">${evo.fecha_hora} hs</span>
                    </div>
                    <p style="font-size: 0.88rem; color: #334155; line-height: 1.6; margin-bottom: 0.75rem;">
                      ${evo.nota}
                    </p>
                    ${renderBloqueFirmaSello(prof, evo.fecha_hora, true, evo.id)}
                  </div>
                `;
              }).join('')}
            </div>

          </div>

          <!-- PESTAÑA 3: HISTORIA SOCIAL -->
          <div id="tab-content-social" class="tab-pane animate-fade-in" style="display: none; margin-top: 1rem;">
            <div style="background: #f8fafc; padding: 1.25rem; border-radius: 10px; border: 1px solid var(--border-subtle); margin-bottom: 1.5rem;">
              <h4 style="font-size: 0.9rem; font-weight: 700; color: #007030; margin-bottom: 0.5rem;">
                Trayectoria de Vida y Arraigo Comunitario en Viale
              </h4>
              <p style="font-size: 0.88rem; color: #334155; line-height: 1.6; margin-bottom: 0.75rem;">
                ${selectedRes.historia_social.trayectoria_vida}
              </p>
              <h4 style="font-size: 0.9rem; font-weight: 700; color: #007030; margin-bottom: 0.5rem;">
                Red de Apoyo Familiar e Institucional
              </h4>
              <p style="font-size: 0.88rem; color: #334155; line-height: 1.6;">
                ${selectedRes.historia_social.red_apoyo}
              </p>
            </div>

            <!-- Informes de Trabajo Social -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h4 style="font-size: 0.95rem; font-weight: 700;">Informes y Seguimiento de Trabajo Social</h4>
              <button id="btn-nuevo-informe-social" class="btn btn-primary btn-sm">+ Nuevo Informe Social</button>
            </div>

            <!-- Formulario para informe social -->
            <div id="form-nuevo-social" style="display: none; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 1.25rem; margin-bottom: 1.25rem;">
              <h5 style="font-size: 0.9rem; font-weight: 700; color: #007030; margin-bottom: 0.5rem;">
                Nuevo Informe de Trabajo Social
              </h5>
              <div class="form-group">
                <textarea id="texto-social-input" class="form-textarea" rows="3" placeholder="Describa entrevistas familiares, vinculación comunitaria, situación de derechos o previsional..."></textarea>
              </div>
              <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
                <button id="btn-cancelar-social" class="btn btn-secondary btn-sm">Cancelar</button>
                <button id="btn-guardar-social" class="btn btn-primary btn-sm">Firmar y Sellar Informe</button>
              </div>
            </div>

            ${selectedRes.historia_social.informes_sociales.length === 0 ? `
              <p style="font-size: 0.85rem; color: #64748b; font-style: italic;">No hay informes sociales adicionales registrados aún.</p>
            ` : selectedRes.historia_social.informes_sociales.map(inf => {
              const prof = profesionales.find(p => p.id === inf.profesional_id) || activeProf;
              return `
                <div style="background: white; border: 1px solid var(--border-subtle); border-radius: 10px; padding: 1.25rem; margin-bottom: 1rem;">
                  <p style="font-size: 0.88rem; color: #334155; line-height: 1.6; margin-bottom: 0.75rem;">
                    ${inf.informe}
                  </p>
                  ${renderBloqueFirmaSello(prof, inf.fecha_hora, true, inf.id)}
                </div>
              `;
            }).join('')}
          </div>

          <!-- PESTAÑA 4: VALORACIONES PROFESIONALES DE ESPECIALIDAD -->
          <div id="tab-content-especialidades" class="tab-pane animate-fade-in" style="display: none; margin-top: 1rem;">
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h4 style="font-size: 0.95rem; font-weight: 700;">
                Valoraciones de Kinesiología, Psicología, Nutrición y T. Ocupacional
              </h4>
              <button id="btn-nueva-valoracion-esp" class="btn btn-primary btn-sm">
                + Cargar Valoración de Especialidad
              </button>
            </div>

            <div id="form-nueva-esp" style="display: none; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 1.25rem; margin-bottom: 1.25rem;">
              <h5 style="font-size: 0.9rem; font-weight: 700; color: #007030; margin-bottom: 0.5rem;">
                Nueva Valoración Interdisciplinaria
              </h5>
              <div class="form-group">
                <label class="form-label">Área / Disciplina:</label>
                <select id="area-esp-input" class="form-select">
                  <option value="Kinesiología y Fisiatría">Kinesiología y Fisiatría</option>
                  <option value="Psicología Gerontológica">Psicología Gerontológica</option>
                  <option value="Terapia Ocupacional">Terapia Ocupacional</option>
                  <option value="Nutrición">Nutrición</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Informe / Hallazgos Técnicos:</label>
                <textarea id="nota-esp-input" class="form-textarea" rows="3" placeholder="Consigne valoración motora, cognitiva, adaptativa o nutricional..."></textarea>
              </div>
              <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
                <button id="btn-cancelar-esp" class="btn btn-secondary btn-sm">Cancelar</button>
                <button id="btn-guardar-esp" class="btn btn-primary btn-sm">Guardar y Sellar</button>
              </div>
            </div>

            ${selectedRes.valoraciones_especialidades.length === 0 ? `
              <p style="font-size: 0.85rem; color: #64748b; font-style: italic;">Sin valoraciones de especialidad asentadas aún.</p>
            ` : selectedRes.valoraciones_especialidades.map(val => {
              const prof = profesionales.find(p => p.id === val.profesional_id) || activeProf;
              return `
                <div style="background: white; border: 1px solid var(--border-subtle); border-radius: 10px; padding: 1.25rem; margin-bottom: 1rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <span style="font-weight: 700; color: #007030; font-size: 0.9rem;">${val.area}</span>
                    <span style="font-size: 0.75rem; color: #64748b; font-family: var(--font-mono);">${val.fecha_hora} hs</span>
                  </div>
                  <p style="font-size: 0.88rem; color: #334155; line-height: 1.6; margin-bottom: 0.75rem;">
                    ${val.nota}
                  </p>
                  ${renderBloqueFirmaSello(prof, val.fecha_hora, true, val.id)}
                </div>
              `;
            }).join('')}

          </div>

        </div>
      </div>
    </div>
  `;

  // --- Handlers de Pestañas ---
  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      container.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');

      btn.classList.add('active');
      const tabName = btn.getAttribute('data-tab');
      const pane = document.getElementById(`tab-content-${tabName}`);
      if (pane) pane.style.display = 'block';
    };
  });

  // Selector de Residente y Filtro de Sector
  const selectResEl = document.getElementById('select-residente-activo');
  const filtroSectorEl = document.getElementById('filtro-sector-legajos');

  if (selectResEl) {
    selectResEl.onchange = (e) => {
      store.setView('legajos', e.target.value);
    };
  }

  if (filtroSectorEl && selectResEl) {
    filtroSectorEl.onchange = () => {
      const sec = filtroSectorEl.value;
      const filtered = sec === 'TODOS' 
        ? residentes 
        : residentes.filter(r => r.estado_habitacional && r.estado_habitacional.includes(sec));
      
      selectResEl.innerHTML = filtered.map(r => `
        <option value="${r.id}" ${r.id === selectedRes.id ? 'selected' : ''}>
          ${r.numero_legajo} - ${r.nombre_completo} (${r.estado_habitacional}) - Completitud: ${getCompletitud(r)}%
        </option>
      `).join('');

      if (filtered.length > 0 && !filtered.some(r => r.id === selectedRes.id)) {
        store.setView('legajos', filtered[0].id);
      }
    };
  }

  // Botón Cambiar Habitación / Sector
  const btnCambiarSector = document.getElementById('btn-cambiar-sector-res');
  if (btnCambiarSector) {
    btnCambiarSector.onclick = () => {
      const currentHab = selectedRes.estado_habitacional || '';
      const isMujer = currentHab.includes('Mujeres') || selectedRes.sexo === 'Femenino';
      const parts = currentHab.split('-');
      const habName = parts[0] ? parts[0].trim() : 'Habitación 01';

      const modalHtml = `
        <div id="modal-cambiar-sector-backdrop" style="position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); display: flex; align-items: center; justify-content: center; z-index: 9999; backdrop-filter: blur(2px);">
          <div style="background: white; border-radius: 12px; width: 95%; max-width: 440px; padding: 1.5rem; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);">
            <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 0.25rem;">Reasignar Habitación y Sector</h3>
            <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1.25rem;">${selectedRes.nombre_completo} (${selectedRes.numero_legajo})</p>
            
            <div class="form-group" style="margin-bottom: 1rem;">
              <label class="form-label">Habitación (Nº)</label>
              <input type="text" id="modal-hab-input" class="form-input" value="${habName}" />
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
              <label class="form-label">Sector Autorizado (Varones / Mujeres)</label>
              <select id="modal-sector-select" class="form-select">
                <option value="Sector Varones" ${!isMujer ? 'selected' : ''}>Sector Varones</option>
                <option value="Sector Mujeres" ${isMujer ? 'selected' : ''}>Sector Mujeres</option>
              </select>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
              <button id="modal-cancelar-sector" class="btn btn-secondary">Cancelar</button>
              <button id="modal-guardar-sector" class="btn btn-primary">Guardar Ubicación</button>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHtml);

      document.getElementById('modal-cancelar-sector').onclick = () => {
        document.getElementById('modal-cambiar-sector-backdrop').remove();
      };

      document.getElementById('modal-guardar-sector').onclick = () => {
        const newHab = document.getElementById('modal-hab-input').value.trim() || 'Habitación 01';
        const newSec = document.getElementById('modal-sector-select').value;
        const finalHab = newHab.toLowerCase().startsWith('hab') ? newHab : `Habitación ${newHab}`;
        const nuevoEstado = `${finalHab} - ${newSec}`;

        store.updateResidente(selectedRes.id, { estado_habitacional: nuevoEstado });
        document.getElementById('modal-cambiar-sector-backdrop').remove();
        renderLegajosView(container);
      };
    };
  }

  // Botón Alta Nuevo Residente
  document.getElementById('btn-alta-nuevo-res').onclick = () => {
    store.setView('legajos', 'nuevo');
  };

  // Botón Exportar PDF
  document.getElementById('btn-exportar-pdf-legajo').onclick = () => {
    openPrintOfficialModal(selectedRes, profesionales);
  };

  // Formularios de Evolución, Social y Especialidad
  const formEvo = document.getElementById('form-nueva-evolucion');
  if (formEvo) {
    document.getElementById('btn-nueva-evolucion').onclick = () => formEvo.style.display = 'block';
    document.getElementById('btn-cancelar-evolucion').onclick = () => formEvo.style.display = 'none';
    document.getElementById('btn-guardar-evolucion').onclick = () => {
      const tipo = document.getElementById('tipo-evolucion-input').value;
      const nota = document.getElementById('nota-evolucion-input').value.trim();
      if (!nota) return alert('Por favor ingrese una nota de evolución.');
      store.addEvolucionMedica(selectedRes.id, { tipo, nota });
      formEvo.style.display = 'none';
      renderLegajosView(container);
    };
  }

  const formSoc = document.getElementById('form-nuevo-social');
  if (formSoc) {
    document.getElementById('btn-nuevo-informe-social').onclick = () => formSoc.style.display = 'block';
    document.getElementById('btn-cancelar-social').onclick = () => formSoc.style.display = 'none';
    document.getElementById('btn-guardar-social').onclick = () => {
      const informe = document.getElementById('texto-social-input').value.trim();
      if (!informe) return alert('Por favor ingrese el informe social.');
      store.addInformeSocial(selectedRes.id, { informe });
      formSoc.style.display = 'none';
      renderLegajosView(container);
    };
  }

  const formEsp = document.getElementById('form-nueva-esp');
  if (formEsp) {
    document.getElementById('btn-nueva-valoracion-esp').onclick = () => formEsp.style.display = 'block';
    document.getElementById('btn-cancelar-esp').onclick = () => formEsp.style.display = 'none';
    document.getElementById('btn-guardar-esp').onclick = () => {
      const area = document.getElementById('area-esp-input').value;
      const nota = document.getElementById('nota-esp-input').value.trim();
      if (!nota) return alert('Por favor ingrese la nota de especialidad.');
      store.addValoracionEspecialidad(selectedRes.id, { area, nota });
      formEsp.style.display = 'none';
      renderLegajosView(container);
    };
  }
}

function renderFormularioNuevoResidente(container) {
  container.innerHTML = `
    <div class="animate-fade-in card" style="max-width: 800px; margin: 0 auto;">
      <div class="card-header">
        <h2 class="card-title">Admisión de Nuevo Residente - Hogar Madre Teresa</h2>
        <button id="btn-cancelar-nuevo-res" class="btn btn-secondary btn-sm">Volver al Listado</button>
      </div>

      <form id="form-nuevo-res-submit">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Nombre y Apellido Completo *</label>
            <input type="text" id="n-nombre" class="form-input" required placeholder="Ej. Don Antonio Schmidt" />
          </div>
          <div class="form-group">
            <label class="form-label">Número de DNI *</label>
            <input type="text" id="n-dni" class="form-input" required placeholder="Ej. 6.432.110" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Fecha de Nacimiento *</label>
            <input type="date" id="n-fnac" class="form-input" required />
          </div>
          <div class="form-group">
            <label class="form-label">Sexo</label>
            <select id="n-sexo" class="form-select">
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Fecha de Ingreso *</label>
            <input type="date" id="n-fingreso" class="form-input" value="${new Date().toISOString().slice(0, 10)}" required />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Obra Social *</label>
            <select id="n-obra-social" class="form-select">
              <option value="PAMI">PAMI</option>
              <option value="IOSPER">IOSPER (Entre Ríos)</option>
              <option value="Otra">Otra</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Número de Afiliado</label>
            <input type="text" id="n-afiliado" class="form-input" placeholder="Ej. 150993820100" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label class="form-label">Habitación (Nº) *</label>
            <input type="text" id="n-habitacion" class="form-input" required placeholder="Ej. Habitación 07" value="Habitación 07" />
          </div>
          <div class="form-group">
            <label class="form-label">Sector Autorizado *</label>
            <select id="n-sector" class="form-select" required>
              <option value="Sector Varones">Sector Varones</option>
              <option value="Sector Mujeres">Sector Mujeres</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Referente Familiar / Teléfono *</label>
            <input type="text" id="n-referente" class="form-input" required placeholder="Ej. Laura Schmidt (Hija - 0343-154...) " />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Antecedentes Médicos / Diagnósticos Previos</label>
          <textarea id="n-antecedentes" class="form-textarea" rows="2" placeholder="Hipertensión, artrosis, diabetes..."></textarea>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
          <button type="button" id="btn-cancelar-creacion" class="btn btn-secondary">Cancelar</button>
          <button type="submit" class="btn btn-primary">Crear Legajo Único Oficial</button>
        </div>
      </form>
    </div>
  `;

  document.getElementById('btn-cancelar-nuevo-res').onclick = () => store.setView('legajos', null);
  document.getElementById('btn-cancelar-creacion').onclick = () => store.setView('legajos', null);

  const nSexoEl = document.getElementById('n-sexo');
  const nSectorEl = document.getElementById('n-sector');
  if (nSexoEl && nSectorEl) {
    nSexoEl.onchange = () => {
      nSectorEl.value = nSexoEl.value === 'Femenino' ? 'Sector Mujeres' : 'Sector Varones';
    };
  }

  document.getElementById('form-nuevo-res-submit').onsubmit = (e) => {
    e.preventDefault();
    const fnac = document.getElementById('n-fnac').value;
    const birthYear = new Date(fnac).getFullYear();
    const currentYear = new Date().getFullYear();
    const edad = currentYear - birthYear;

    const habInput = document.getElementById('n-habitacion').value.trim() || 'Habitación 01';
    const sectorVal = document.getElementById('n-sector').value;
    const finalHab = habInput.toLowerCase().startsWith('hab') ? habInput : `Habitación ${habInput}`;

    const newRes = store.addResidente({
      nombre_completo: document.getElementById('n-nombre').value,
      dni: document.getElementById('n-dni').value,
      fecha_nacimiento: fnac,
      edad: isNaN(edad) ? 80 : edad,
      sexo: document.getElementById('n-sexo').value,
      fecha_ingreso: document.getElementById('n-fingreso').value,
      obra_social: document.getElementById('n-obra-social').value,
      nro_afiliado: document.getElementById('n-afiliado').value,
      estado_habitacional: `${finalHab} - ${sectorVal}`,
      referente_familiar: document.getElementById('n-referente').value,
      antecedentes: document.getElementById('n-antecedentes').value
    });

    alert(`¡Legajo Único ${newRes.numero_legajo} creado con éxito en ${newRes.estado_habitacional}!`);
    store.setView('legajos', newRes.id);
  };
}
