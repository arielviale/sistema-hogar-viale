// ============================================================
// COMPONENTE: BARRA SUPERIOR (TOP NAVBAR)
// Selector Rápido de Profesional y Sello de Auditoría
// ============================================================

import { store } from '../state/store.js';
import { openDossierMunicipalModal } from './DossierMunicipalModal.js';

export function renderNavbar(container) {
  const profesionales = store.data.profesionales;
  const activeProf = store.getActiveProfessional();

  const fechaHoy = new Date().toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  container.innerHTML = `
    <!-- Franja Superior Oficial viale.gob.ar -->
    <div class="viale-top-strip no-print">
      <span class="viale-top-hours">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        Horario de atención: Lunes a Viernes 6.30 hs a 12.00 hs
      </span>
      <div class="viale-top-brand" style="display: flex; align-items: center; gap: 1.25rem;">
        <span style="opacity: 0.95;">🏛️ Municipalidad de Viale · Entre Ríos</span>
        <span class="viale-pill-hogar" style="background: rgba(255, 255, 255, 0.2); padding: 1px 8px; border-radius: 9999px; font-size: 0.7rem; font-weight: 700;">Hogar Madre Teresa</span>
      </div>
    </div>

    <header class="top-navbar no-print">
      <div class="navbar-left" style="display: flex; align-items: center; gap: 0.75rem;">
        <!-- Botón Hamburguesa para Móviles -->
        <button id="btn-toggle-sidebar" class="mobile-hamburger-btn no-print" aria-label="Abrir Menú">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <div class="navbar-brand-badge" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #eefcf2; border: 1px solid #86efac; color: #007030; padding: 0.3rem 0.75rem; border-radius: 9999px; font-size: 0.78rem; font-weight: 700;">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #009640;"></span>
          Municipio de Viale
        </div>
        <span class="navbar-date-subtitle" style="font-size: 0.82rem; color: #475569; text-transform: capitalize; font-weight: 500;">
          ${fechaHoy} · Residencia Gerontológica
        </span>
      </div>

      <div class="navbar-actions" style="display: flex; align-items: center; gap: 0.65rem;">
        <!-- Botón Presentación Municipal -->
        <button id="btn-navbar-dossier" class="btn btn-viale btn-sm btn-dossier-nav">
          🏛️ <span class="btn-text">Dossier Municipal</span>
        </button>

        <!-- Selector rápido de usuario profesional -->
        <div class="navbar-session-box" style="display: flex; align-items: center; gap: 0.4rem;">
          <span class="navbar-session-label" style="font-size: 0.78rem; font-weight: 600; color: #475569;">Sesión:</span>
          <select id="navbar-switch-prof" class="form-select" style="font-size: 0.8rem; padding: 0.35rem 0.65rem; font-weight: 600; min-width: 160px; border-color: #86efac;">
            ${profesionales.map(p => `
              <option value="${p.id}" ${p.id === activeProf.id ? 'selected' : ''}>
                ${p.nombre_completo} (${p.especialidad.split('/')[0].trim()})
              </option>
            `).join('')}
          </select>
        </div>

        <button id="btn-navbar-reset-db" title="Reiniciar datos de prueba" class="btn btn-secondary btn-sm btn-reset-nav" style="font-size: 0.75rem; padding: 0.35rem 0.55rem;">
          🔄 <span class="btn-text">Reiniciar</span>
        </button>
      </div>
    </header>
  `;

  const btnToggle = document.getElementById('btn-toggle-sidebar');
  if (btnToggle) {
    btnToggle.onclick = () => {
      document.body.classList.toggle('sidebar-open');
    };
  }

  document.getElementById('btn-navbar-dossier').onclick = () => {
    openDossierMunicipalModal();
  };

  document.getElementById('navbar-switch-prof').onchange = (e) => {
    store.setActiveProfessional(e.target.value);
  };

  document.getElementById('btn-navbar-reset-db').onclick = () => {
    if (confirm("¿Desea restablecer todos los datos iniciales de prueba para el Hogar Madre Teresa?")) {
      store.resetToDefault();
      alert("Datos restablecidos correctamente.");
    }
  };
}
