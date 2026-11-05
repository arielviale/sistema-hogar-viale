// ============================================================
// VISTA: GESTIÓN DEL PERSONAL Y EQUIPO POR SECTORES
// Directorio Completo del Personal, División por Sectores y Sellos Digitales
// ============================================================

import { store } from '../state/store.js';
import { openSignaturePadModal } from '../components/SignaturePadModal.js';
import { renderBloqueFirmaSello } from '../components/BloqueFirmaSello.js';

export function renderEquipoProfesionalView(container, activeSectorFilter = 'todos') {
  const profesionales = store.data.profesionales;
  const activeProf = store.getActiveProfessional();
  const autoridad = store.data.autoridad_municipal || {
    nombre_completo: "Bibiana Rojas",
    cargo: "Secretaría de Desarrollo Social y Humano",
    organismo: "Municipalidad de Viale",
    foto_url: "assets/bibiana_rojas.png"
  };

  const SECTORES_LIST = [
    { id: 'todos', label: 'Todos', count: profesionales.length, icono: '👥' },
    { id: 'coordinacion', label: 'Coordinación', count: profesionales.filter(p => p.sector === 'coordinacion').length, icono: '👑' },
    { id: 'medica', label: 'Médica', count: profesionales.filter(p => p.sector === 'medica').length, icono: '🩺' },
    { id: 'interdisciplinario', label: 'Interdisciplinario', count: profesionales.filter(p => p.sector === 'interdisciplinario').length, icono: '🧩' },
    { id: 'enfermeria', label: 'Enfermería', count: profesionales.filter(p => p.sector === 'enfermeria').length, icono: '💉' },
    { id: 'cuidadores', label: 'Cuidadores y Auxiliares', count: profesionales.filter(p => p.sector === 'cuidadores').length, icono: '🤝' },
    { id: 'talleres', label: 'Talleres', count: profesionales.filter(p => p.sector === 'talleres').length, icono: '🎨' },
    { id: 'cocina', label: 'Cocina', count: profesionales.filter(p => p.sector === 'cocina').length, icono: '🍲' },
    { id: 'mantenimiento', label: 'Ordenanza', count: profesionales.filter(p => p.sector === 'mantenimiento').length, icono: '🧹' }
  ];

  const filteredProfs = activeSectorFilter === 'todos' 
    ? profesionales 
    : profesionales.filter(p => p.sector === activeSectorFilter);

  container.innerHTML = `
    <div class="animate-fade-in">
      <!-- Encabezado -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h1 style="font-size: 1.5rem; font-weight: 800; color: #0f172a;">
            Personal y Equipo Interdisciplinario
          </h1>
          <p style="font-size: 0.85rem; color: #64748b;">
            Nómina Institucional Oficial · ${profesionales.length} Integrantes clasificados por sector y niveles de acceso
          </p>
        </div>

        <button id="btn-alta-profesional" class="btn btn-primary">
          + Registrar Integrante
        </button>
      </div>

      <!-- Tarjeta Oficial: Representación Municipal a Cargo del Hogar Madre Teresa -->
      <div class="card" style="margin-bottom: 1.5rem; background: linear-gradient(135deg, #072517 0%, #009640 100%); color: white; border: none; box-shadow: 0 10px 25px -5px rgba(0, 150, 64, 0.35);">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap;">
            <img src="/assets/bibiana_rojas.png?v=3" alt="${autoridad.nombre_completo}" style="width: 82px; height: 82px; border-radius: 50%; object-fit: contain; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.35)); flex-shrink: 0;" />
            <div>
              <div style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(255, 255, 255, 0.18); padding: 0.2rem 0.75rem; border-radius: 9999px; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.3rem; border: 1px solid rgba(255, 255, 255, 0.25);">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4"/></svg>
                Institución Pública Municipal · Municipalidad de Viale
              </div>
              <h2 style="font-size: 1.35rem; font-weight: 800; color: white; margin: 0; line-height: 1.2;">
                ${autoridad.nombre_completo}
              </h2>
              <div style="font-size: 0.9rem; font-weight: 700; color: #86efac; margin-top: 2px;">
                ${autoridad.cargo}
              </div>
              <div style="font-size: 0.8rem; color: #e2e8f0; margin-top: 0.2rem; max-width: 600px; line-height: 1.35;">
                Representante y Autoridad Institucional a Cargo de la Residencia Gerontológica "Hogar Madre Teresa" por el Poder Ejecutivo Municipal de Viale.
              </div>
            </div>
          </div>

          <div style="background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.2); padding: 0.85rem 1.15rem; border-radius: 12px; text-align: center; min-width: 160px;">
            <div style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; color: #86efac; font-weight: 700;">Dependencia</div>
            <div style="font-size: 0.95rem; font-weight: 800; color: white; margin-top: 3px;">Poder Ejecutivo Municipal</div>
            <div style="font-size: 0.72rem; color: #cbd5e1; margin-top: 2px;">Viale, Entre Ríos</div>
          </div>
        </div>
      </div>

      <!-- Tarjeta informativa del usuario en sesión -->
      <div class="card" style="margin-bottom: 1.5rem; background: #f0fdf4; border: 1px solid #bbf7d0;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: #007030; letter-spacing: 0.05em;">
                Usuario Activo en Sesión:
              </span>
              <span style="font-size: 0.7rem; font-weight: 700; padding: 1px 7px; border-radius: 9999px; ${store.canAccessClinical() ? 'background: #dcfce7; color: #166534; border: 1px solid #86efac;' : 'background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1;'}">
                ${store.canAccessClinical() ? '✓ Acceso Clínico Total (Médicos y Enfermeros)' : '🔒 Personal Operativo (Restringido)'}
              </span>
            </div>
            <h2 style="font-size: 1.25rem; font-weight: 800; color: #0f172a; margin-top: 2px;">
              ${activeProf.nombre_completo}
            </h2>
            <div style="font-size: 0.85rem; color: #007030; font-weight: 600;">
              ${activeProf.profesion} · ${activeProf.matricula_provincial}
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <button id="btn-firmar-activo-pad" class="btn btn-secondary">
              ✍️ Actualizar Mi Firma Digital
            </button>
          </div>
        </div>
      </div>

      <!-- Píldoras de Filtro por Sector -->
      <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.75rem; margin-bottom: 1.5rem;">
        ${SECTORES_LIST.map(sec => `
          <button 
            class="btn-sector-pill ${activeSectorFilter === sec.id ? 'active' : ''}" 
            data-sector="${sec.id}"
            style="display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.45rem 0.95rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700; cursor: pointer; white-space: nowrap; border: 1px solid ${activeSectorFilter === sec.id ? '#009640' : '#e2e8f0'}; background: ${activeSectorFilter === sec.id ? '#009640' : '#ffffff'}; color: ${activeSectorFilter === sec.id ? '#ffffff' : '#475569'}; transition: all 0.15s ease;"
          >
            <span>${sec.icono}</span>
            <span>${sec.label}</span>
            <span style="font-size: 0.72rem; padding: 1px 6px; border-radius: 9999px; background: ${activeSectorFilter === sec.id ? 'rgba(255,255,255,0.25)' : '#f1f5f9'}; color: ${activeSectorFilter === sec.id ? '#ffffff' : '#64748b'}; font-family: var(--font-mono);">
              ${sec.count}
            </span>
          </button>
        `).join('')}
      </div>

      <!-- Formulario para dar de alta un nuevo integrante (oculto por defecto) -->
      <div id="form-nuevo-prof-card" class="card" style="display: none; margin-bottom: 2rem; background: #ffffff; border: 2px solid #009640;">
        <div class="card-header">
          <h3 class="card-title">Alta de Integrante en el Personal</h3>
          <button id="btn-cerrar-form-prof" class="btn btn-secondary btn-sm">Cancelar</button>
        </div>

        <form id="form-profesional-submit">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Nombre y Apellido Completo *</label>
              <input type="text" id="p-nombre" class="form-input" required placeholder="Ej. Lic. Valeria Morales" />
            </div>
            <div class="form-group">
              <label class="form-label">DNI *</label>
              <input type="text" id="p-dni" class="form-input" required placeholder="Ej. 33.456.789" />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Sector Institucional *</label>
              <select id="p-sector" class="form-select">
                <option value="coordinacion">Coordinación General</option>
                <option value="medica">Atención Médica</option>
                <option value="interdisciplinario">Equipo Interdisciplinario</option>
                <option value="enfermeria">Enfermería Institucional</option>
                <option value="cuidadores" selected>Cuidadores y Auxiliares</option>
                <option value="talleres">Estimulación y Talleres</option>
                <option value="cocina">Servicio de Cocina</option>
                <option value="mantenimiento">Ordenanza y Limpieza</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Función / Especialidad *</label>
              <input type="text" id="p-profesion" class="form-input" required placeholder="Ej. Cuidador Gerontológico / Enfermero" />
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Matrícula Provincial o Acreditación *</label>
              <input type="text" id="p-matricula" class="form-input" required placeholder="Ej. M.P. 28007 - Entre Ríos o Registro Municipal" />
            </div>
            <div class="form-group">
              <label class="form-label">Nivel de Acceso al Sistema *</label>
              <select id="p-acceso" class="form-select">
                <option value="restringido">Personal Operativo (Restringido - Solo Cuidados y Rutina)</option>
                <option value="total">Acceso Clínico Total (Médicos y Enfermeros)</option>
              </select>
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1rem;">
            <button type="submit" class="btn btn-primary">Registrar y Generar Ficha Oficial</button>
          </div>
        </form>
      </div>

      <!-- Directorio de Integrantes -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.25rem;">
        ${filteredProfs.map(prof => {
          const secInfo = store.getSectorInfo(prof.sector);
          const tieneClinico = prof.acceso_clinico || ['coordinacion', 'medica', 'interdisciplinario', 'enfermeria'].includes(prof.sector);

          return `
            <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; border-top: 4px solid ${tieneClinico ? '#009640' : '#64748b'};">
              <div>
                <!-- Cabecera de la tarjeta con sector y acceso -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.65rem; gap: 0.5rem;">
                  <div>
                    <div style="display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.72rem; font-weight: 700; color: #007030; background: #eefcf2; padding: 2px 7px; border-radius: 6px; margin-bottom: 0.3rem;">
                      <span>${secInfo.icono}</span>
                      <span>${secInfo.label}</span>
                    </div>
                    <h3 style="font-size: 1.1rem; font-weight: 800; color: #0f172a; line-height: 1.2;">
                      ${prof.nombre_completo}
                    </h3>
                    <div style="font-size: 0.78rem; color: #64748b; margin-top: 2px;">DNI: <strong>${prof.dni}</strong></div>
                  </div>

                  <div>
                    ${prof.id === activeProf.id ? `
                      <span class="badge badge-vigente" style="white-space: nowrap;">En Sesión</span>
                    ` : `
                      <button class="btn btn-secondary btn-sm btn-cambiar-sesion" data-prof-id="${prof.id}" style="font-size: 0.75rem; white-space: nowrap;">
                        Iniciar Sesión
                      </button>
                    `}
                  </div>
                </div>

                <div style="font-size: 0.85rem; color: #007030; font-weight: 600; margin-bottom: 0.25rem;">
                  ${prof.profesion}
                </div>
                <div style="font-size: 0.76rem; font-family: var(--font-mono); color: #475569; margin-bottom: 0.75rem;">
                  ${prof.matricula_provincial}
                </div>

                <!-- Insignia de Nivel de Acceso -->
                <div style="margin-bottom: 0.85rem;">
                  <span style="font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 9999px; ${tieneClinico ? 'background: #dcfce7; color: #166534; border: 1px solid #86efac;' : 'background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1;'}">
                    ${tieneClinico ? '✓ Acceso Clínico Total' : '🔒 Personal Operativo'}
                  </span>
                </div>

                <!-- Vista previa del Sello Oficial Digital -->
                <div style="margin-bottom: 0.85rem;">
                  <span style="font-size: 0.7rem; text-transform: uppercase; color: #64748b; font-weight: 700;">
                    Sello Institucional Reglamentario:
                  </span>
                  <div style="margin-top: 0.35rem;">
                    <div class="sello-profesional-box" style="width: 100%; padding: 0.65rem 0.85rem;">
                      <div class="sello-nombre">${prof.nombre_completo}</div>
                      <div class="sello-profesion">${prof.profesion}</div>
                      <div class="sello-matricula">${prof.matricula_provincial}</div>
                    </div>
                  </div>
                </div>

                <!-- Vista previa de la Firma Digital -->
                <div>
                  <span style="font-size: 0.7rem; text-transform: uppercase; color: #64748b; font-weight: 700;">
                    Firma Registrada:
                  </span>
                  <div style="margin-top: 0.35rem; display: flex; align-items: center; justify-content: space-between; background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: 8px; padding: 0.4rem 0.75rem;">
                    ${prof.firma_url ? `
                      <img src="${prof.firma_url}" alt="Firma" style="max-height: 38px; max-width: 150px;" />
                    ` : `
                      <span style="font-size: 0.75rem; color: #94a3b8; font-style: italic;">Sin firma registrada</span>
                    `}
                    <button class="btn btn-outline btn-sm btn-abrir-pad-prof" data-prof-id="${prof.id}" style="font-size: 0.72rem; padding: 0.25rem 0.5rem;">
                      ✍️ Pad
                    </button>
                  </div>
                </div>

              </div>
            </div>
          `;
        }).join('')}
      </div>

    </div>
  `;

  // --- Handlers de Eventos ---
  // Filtros de Sector
  container.querySelectorAll('.btn-sector-pill').forEach(btn => {
    btn.onclick = () => {
      const secId = btn.getAttribute('data-sector');
      renderEquipoProfesionalView(container, secId);
    };
  });

  const formCard = document.getElementById('form-nuevo-prof-card');
  document.getElementById('btn-alta-profesional').onclick = () => formCard.style.display = 'block';
  document.getElementById('btn-cerrar-form-prof').onclick = () => formCard.style.display = 'none';

  document.getElementById('form-profesional-submit').onsubmit = (e) => {
    e.preventDefault();
    const nombre = document.getElementById('p-nombre').value;
    const dni = document.getElementById('p-dni').value;
    const sector = document.getElementById('p-sector').value;
    const profesion = document.getElementById('p-profesion').value;
    const matricula = document.getElementById('p-matricula').value;
    const acceso = document.getElementById('p-acceso').value;

    store.addOrUpdateProfesional({
      nombre_completo: nombre,
      dni: dni,
      sector: sector,
      sector_nombre: store.getSectorInfo(sector).label,
      profesion: profesion,
      especialidad: profesion,
      matricula_provincial: matricula,
      acceso_clinico: (acceso === 'total'),
      firma_url: null
    });

    alert(`¡Integrante ${nombre} registrado exitosamente en el sector ${store.getSectorInfo(sector).label}!`);
    formCard.style.display = 'none';
    renderEquipoProfesionalView(container, sector);
  };

  // Botón firmar sesión activa
  document.getElementById('btn-firmar-activo-pad').onclick = () => {
    openSignaturePadModal(activeProf, (dataUrl) => {
      activeProf.firma_url = dataUrl;
      store.addOrUpdateProfesional(activeProf);
      renderEquipoProfesionalView(container, activeSectorFilter);
    });
  };

  // Botones de cambiar sesión
  container.querySelectorAll('.btn-cambiar-sesion').forEach(btn => {
    btn.onclick = () => {
      const pid = btn.getAttribute('data-prof-id');
      store.setActiveProfessional(pid);
      renderEquipoProfesionalView(container, activeSectorFilter);
    };
  });

  // Botones modificar firma por profesional
  container.querySelectorAll('.btn-abrir-pad-prof').forEach(btn => {
    btn.onclick = () => {
      const pid = btn.getAttribute('data-prof-id');
      const p = profesionales.find(x => x.id === pid);
      if (p) {
        openSignaturePadModal(p, (dataUrl) => {
          p.firma_url = dataUrl;
          store.addOrUpdateProfesional(p);
          renderEquipoProfesionalView(container, activeSectorFilter);
        });
      }
    };
  });
}
