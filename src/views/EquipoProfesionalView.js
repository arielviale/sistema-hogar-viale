// ============================================================
// VISTA: GESTIÓN DEL EQUIPO PROFESIONAL INTERDISCIPLINARIO - FASE 1
// Directorio, Generador de Sello Digital y Pad de Firma Táctil
// ============================================================

import { store } from '../state/store.js';
import { openSignaturePadModal } from '../components/SignaturePadModal.js';
import { renderBloqueFirmaSello } from '../components/BloqueFirmaSello.js';

export function renderEquipoProfesionalView(container) {
  const profesionales = store.data.profesionales;
  const activeProf = store.getActiveProfessional();

  container.innerHTML = `
    <div class="animate-fade-in">
      <!-- Encabezado -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h1 style="font-size: 1.5rem; font-weight: 800; color: #0f172a;">
            Equipo Profesional Interdisciplinario
          </h1>
          <p style="font-size: 0.85rem; color: #64748b;">
            Matrículas de Entre Ríos, Sellos Oficiales Digitalizados y Trazabilidad de Firmas
          </p>
        </div>

        <button id="btn-alta-profesional" class="btn btn-primary">
          + Registrar Nuevo Profesional
        </button>
      </div>

      <!-- Tarjeta informativa del usuario en sesión -->
      <div class="card" style="margin-bottom: 2rem; background: #f0fdf4; border: 1px solid #bbf7d0;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 700; color: #007030; letter-spacing: 0.05em;">
              Profesional Interviniente Activo en Sesión
            </span>
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

      <!-- Formulario para dar de alta un nuevo profesional (oculto por defecto) -->
      <div id="form-nuevo-prof-card" class="card" style="display: none; margin-bottom: 2rem; background: #ffffff; border: 2px solid #009640;">
        <div class="card-header">
          <h3 class="card-title">Alta de Profesional en el Sistema</h3>
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
              <label class="form-label">Profesión / Especialidad *</label>
              <select id="p-profesion" class="form-select">
                <option value="Médico/a Geriatra / Clínico/a">Médico/a Geriatra / Clínico/a</option>
                <option value="Licenciado/a en Trabajo Social">Licenciado/a en Trabajo Social</option>
                <option value="Licenciado/a en Enfermería">Licenciado/a en Enfermería</option>
                <option value="Licenciado/a en Kinesiología y Fisiatría">Licenciado/a en Kinesiología y Fisiatría</option>
                <option value="Licenciado/a en Psicología">Licenciado/a en Psicología</option>
                <option value="Terapista Ocupacional">Terapista Ocupacional</option>
                <option value="Licenciado/a en Nutrición">Licenciado/a en Nutrición</option>
                <option value="Coordinación / Dirección Institucional">Coordinación / Dirección Institucional</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Matrícula Provincial (Entre Ríos) *</label>
              <input type="text" id="p-matricula" class="form-input" required placeholder="Ej. M.P. 4810 - Entre Ríos" />
            </div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1rem;">
            <button type="submit" class="btn btn-primary">Registrar Profesional y Generar Sello</button>
          </div>
        </form>
      </div>

      <!-- Directorio de Profesionales -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 1.5rem;">
        ${profesionales.map(prof => `
          <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; border-top: 4px solid #009640;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                <div>
                  <h3 style="font-size: 1.1rem; font-weight: 800; color: #0f172a;">
                    ${prof.nombre_completo}
                  </h3>
                  <div style="font-size: 0.8rem; color: #64748b;">DNI: ${prof.dni}</div>
                </div>
                ${prof.id === activeProf.id ? `
                  <span class="badge badge-vigente">Activo en Sesión</span>
                ` : `
                  <button class="btn btn-secondary btn-sm btn-cambiar-sesion" data-prof-id="${prof.id}" style="font-size: 0.75rem;">
                    Iniciar Sesión
                  </button>
                `}
              </div>

              <div style="font-size: 0.85rem; color: #007030; font-weight: 600; margin-bottom: 0.25rem;">
                ${prof.profesion}
              </div>
              <div style="font-size: 0.78rem; font-family: var(--font-mono); color: #475569; margin-bottom: 1rem;">
                ${prof.matricula_provincial}
              </div>

              <!-- Vista previa del Sello Oficial Digital -->
              <div style="margin-bottom: 1rem;">
                <span style="font-size: 0.72rem; text-transform: uppercase; color: #64748b; font-weight: 700;">
                  Sello Tipográfico Reglamentario:
                </span>
                <div style="margin-top: 0.35rem;">
                  <div class="sello-profesional-box" style="width: 100%;">
                    <div class="sello-nombre">${prof.nombre_completo}</div>
                    <div class="sello-profesion">${prof.profesion}</div>
                    <div class="sello-matricula">${prof.matricula_provincial}</div>
                  </div>
                </div>
              </div>

              <!-- Vista previa de la Firma Digital -->
              <div>
                <span style="font-size: 0.72rem; text-transform: uppercase; color: #64748b; font-weight: 700;">
                  Firma Digital Registrada:
                </span>
                <div style="margin-top: 0.35rem; display: flex; align-items: center; justify-content: space-between; background: #f8fafc; border: 1px solid var(--border-subtle); border-radius: 8px; padding: 0.5rem 0.75rem;">
                  ${prof.firma_url ? `
                    <img src="${prof.firma_url}" alt="Firma" style="max-height: 40px; max-width: 160px;" />
                  ` : `
                    <span style="font-size: 0.75rem; color: #94a3b8; font-style: italic;">Sin firma registrada</span>
                  `}
                  <button class="btn btn-outline btn-sm btn-abrir-pad-prof" data-prof-id="${prof.id}" style="font-size: 0.75rem;">
                    ✍️ Modificar
                  </button>
                </div>
              </div>

            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;

  // --- Handlers de Eventos ---
  const formCard = document.getElementById('form-nuevo-prof-card');
  document.getElementById('btn-alta-profesional').onclick = () => formCard.style.display = 'block';
  document.getElementById('btn-cerrar-form-prof').onclick = () => formCard.style.display = 'none';

  document.getElementById('form-profesional-submit').onsubmit = (e) => {
    e.preventDefault();
    const nombre = document.getElementById('p-nombre').value;
    const dni = document.getElementById('p-dni').value;
    const profesion = document.getElementById('p-profesion').value;
    const matricula = document.getElementById('p-matricula').value;

    store.addOrUpdateProfesional({
      nombre_completo: nombre,
      dni: dni,
      profesion: profesion,
      especialidad: profesion,
      matricula_provincial: matricula,
      firma_url: null
    });

    alert(`¡Profesional ${nombre} registrado exitosamente!`);
    formCard.style.display = 'none';
    renderEquipoProfesionalView(container);
  };

  // Botón firmar sesión activa
  document.getElementById('btn-firmar-activo-pad').onclick = () => {
    openSignaturePadModal(activeProf, (dataUrl) => {
      activeProf.firma_url = dataUrl;
      store.addOrUpdateProfesional(activeProf);
      renderEquipoProfesionalView(container);
    });
  };

  // Botones de cambiar sesión
  container.querySelectorAll('.btn-cambiar-sesion').forEach(btn => {
    btn.onclick = () => {
      const pid = btn.getAttribute('data-prof-id');
      store.setActiveProfessional(pid);
      renderEquipoProfesionalView(container);
    };
  });

  // Botones modificar firma por profesional
  container.querySelectorAll('.btn-abrir-pad-prof').forEach(btn => {
    btn.onclick = () => {
      const pid = btn.getAttribute('data-prof-id');
      const targetProf = profesionales.find(p => p.id === pid);
      if (targetProf) {
        openSignaturePadModal(targetProf, (dataUrl) => {
          targetProf.firma_url = dataUrl;
          store.addOrUpdateProfesional(targetProf);
          renderEquipoProfesionalView(container);
        });
      }
    };
  });
}
