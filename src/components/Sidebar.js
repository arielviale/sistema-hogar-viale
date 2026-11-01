// ============================================================
// COMPONENTE: BARRA LATERAL INSTITUCIONAL (SIDEBAR)
// Menú principal con las 7 vistas normativas
// ============================================================

import { store } from '../state/store.js';
import { openDossierMunicipalModal } from './DossierMunicipalModal.js';

export function renderSidebar(container) {
  const activeView = store.activeView;
  const activeProf = store.getActiveProfessional();
  const stats = store.getEstadisticas();
  const autoridad = store.data.autoridad_municipal || {
    nombre_completo: "Bibiana Rojas",
    cargo: "Secretaría de Desarrollo Social y Humano",
    organismo: "Municipalidad de Viale",
    foto_url: "assets/bibiana_rojas.png"
  };

  container.innerHTML = `
    <aside class="sidebar">
      <!-- Encabezado con Escudo / Logo Municipal -->
      <div class="sidebar-header">
        <div class="logo-badge" style="background: linear-gradient(135deg, #009640 0%, #8dc63f 100%);">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <div>
          <div class="sidebar-title">Hogar Madre Teresa</div>
          <div class="sidebar-subtitle" style="color: #86efac; font-weight: 700;">Municipalidad de Viale</div>
        </div>
      </div>

      <!-- Menú de Navegación -->
      <nav class="sidebar-nav">
        <div class="nav-section-label">Gestión Asistencial</div>
        
        <button class="nav-item ${activeView === 'dashboard' ? 'active' : ''}" data-view="dashboard">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Panel de Control
        </button>

        <button class="nav-item ${activeView === 'legajos' ? 'active' : ''}" data-view="legajos">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          Legajos Únicos (LUR)
        </button>

        <button class="nav-item ${activeView === 'vgi_pai' ? 'active' : ''}" data-view="vgi_pai">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          VGI & PAI
          ${stats.vencidas > 0 ? `
            <span style="margin-left: auto; background: #ef4444; color: white; font-size: 0.68rem; font-weight: 700; padding: 1px 6px; border-radius: 9999px;">
              ${stats.vencidas}
            </span>
          ` : ''}
        </button>

        <button class="nav-item ${activeView === 'informes' ? 'active' : ''}" data-view="informes">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          Informes Profesionales
        </button>

        <div class="nav-section-label">Epidemiología y Datos</div>

        <button class="nav-item ${activeView === 'grilla' ? 'active' : ''}" data-view="grilla">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          Grilla de Recolección
        </button>

        <button class="nav-item ${activeView === 'diagnostico' ? 'active' : ''}" data-view="diagnostico">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
          Diagnóstico Poblacional
        </button>

        <div class="nav-section-label">Institucional</div>

        <button class="nav-item ${activeView === 'planificacion' ? 'active' : ''}" data-view="planificacion">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Plan 2026 & Talleres
        </button>

        <button class="nav-item ${activeView === 'equipo' ? 'active' : ''}" data-view="equipo">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Equipo Profesional
        </button>

        <div style="margin-top: 1rem; padding: 0.75rem; background: rgba(0, 150, 64, 0.22); border: 1px solid rgba(141, 198, 63, 0.35); border-radius: 10px;">
          <div style="font-size: 0.7rem; font-weight: 800; color: #86efac; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.35rem;">
            Presentación de Gestión
          </div>
          <button id="btn-sidebar-dossier" style="width: 100%; display: flex; align-items: center; gap: 0.5rem; justify-content: center; background: #009640; color: white; border: 1px solid #8dc63f; border-radius: 6px; padding: 0.5rem 0.75rem; font-size: 0.78rem; font-weight: 700; cursor: pointer; transition: background 0.2s;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4"/></svg>
            Dossier Municipal
          </button>
        </div>
      </nav>

      <!-- Pie: Representante Municipal a Cargo del Hogar (Municipalidad de Viale) -->
      <div class="sidebar-footer" style="padding: 1rem 1.15rem; background: rgba(0, 0, 0, 0.32); border-top: 1px solid rgba(255, 255, 255, 0.12);">
        <div style="font-size: 0.65rem; text-transform: uppercase; color: #86efac; font-weight: 800; letter-spacing: 0.05em; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.35rem;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4"/></svg>
          Representación Municipal a Cargo
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="${autoridad.foto_url}" alt="${autoridad.nombre_completo}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2.5px solid #8dc63f; box-shadow: 0 3px 8px rgba(0,0,0,0.35); flex-shrink: 0;" />
          <div style="min-width: 0; flex: 1;">
            <div style="font-size: 0.9rem; font-weight: 800; color: white; line-height: 1.2;">
              ${autoridad.nombre_completo}
            </div>
            <div style="font-size: 0.72rem; color: #cbd5e1; line-height: 1.25; margin-top: 2px;">
              ${autoridad.cargo}
            </div>
            <div style="font-size: 0.68rem; color: #86efac; font-weight: 700; margin-top: 1px;">
              ${autoridad.organismo}
            </div>
          </div>
        </div>
      </div>
    </aside>
  `;

  const btnDossier = container.querySelector('#btn-sidebar-dossier');
  if (btnDossier) {
    btnDossier.onclick = () => openDossierMunicipalModal();
  }

  // Listeners de navegación
  container.querySelectorAll('.nav-item').forEach(btn => {
    btn.onclick = () => {
      const view = btn.getAttribute('data-view');
      store.setView(view);
    };
  });
}
