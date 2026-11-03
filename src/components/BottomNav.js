// ============================================================
// COMPONENTE: BARRA DE NAVEGACIÓN INFERIOR PARA MÓVILES (BOTTOM NAV)
// Acceso rápido táctil para tablets y smartphones en el Hogar
// ============================================================

import { store } from '../state/store.js';

export function renderBottomNav(container) {
  const activeView = store.activeView;

  container.innerHTML = `
    <nav class="mobile-bottom-nav no-print" aria-label="Navegación Móvil">
      <button class="bottom-nav-item ${activeView === 'dashboard' ? 'active' : ''}" data-view="dashboard">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
        </svg>
        <span>Panel</span>
      </button>

      <button class="bottom-nav-item ${activeView === 'legajos' ? 'active' : ''}" data-view="legajos">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>
        <span>Legajos</span>
      </button>

      <button class="bottom-nav-item ${activeView === 'vgi_pai' ? 'active' : ''}" data-view="vgi_pai">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
        <span>VGI/PAI</span>
      </button>

      <button class="bottom-nav-item ${activeView === 'informes' ? 'active' : ''}" data-view="informes">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
        <span>Informes</span>
      </button>

      <button class="bottom-nav-item" id="btn-bottom-menu-toggle" aria-label="Abrir Menú Completo">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <span>Menú</span>
      </button>
    </nav>
  `;

  // Handlers de cambio de vista
  container.querySelectorAll('.bottom-nav-item[data-view]').forEach(btn => {
    btn.onclick = () => {
      const view = btn.getAttribute('data-view');
      document.body.classList.remove('sidebar-open');
      store.setView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  });

  // Handler de toggle de menú lateral
  const btnMenu = container.querySelector('#btn-bottom-menu-toggle');
  if (btnMenu) {
    btnMenu.onclick = () => {
      document.body.classList.toggle('sidebar-open');
    };
  }
}
