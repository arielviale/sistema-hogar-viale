// ============================================================
// APLICACIÓN PRINCIPAL (APP.JS) - HOGAR MADRE TERESA
// Router y Orquestador de Interfaz
// ============================================================

import { store } from './state/store.js';
import { renderSidebar } from './components/Sidebar.js';
import { renderNavbar } from './components/Navbar.js';
import { renderBottomNav } from './components/BottomNav.js';

import { renderDashboardView } from './views/DashboardView.js';
import { renderLegajosView } from './views/LegajosView.js';
import { renderVgiPaiView } from './views/VgiPaiView.js';
import { renderGrillaDatosView } from './views/GrillaDatosView.js';
import { renderDiagnosticoPoblacionalView } from './views/DiagnosticoPoblacionalView.js';
import { renderPlanificacionCronogramaView } from './views/PlanificacionCronogramaView.js';
import { renderEquipoProfesionalView } from './views/EquipoProfesionalView.js';
import { renderInformesProfesionalesView } from './views/InformesProfesionalesView.js';

export function initApp() {
  const root = document.getElementById('root');
  if (!root) return;

  root.innerHTML = `
    <div class="app-layout">
      <!-- Fondo oscuro táctil para cerrar el menú en móviles -->
      <div id="sidebar-backdrop" class="sidebar-backdrop no-print"></div>

      <!-- Menú Lateral Institucional -->
      <div id="sidebar-mount"></div>

      <div class="main-content">
        <div id="navbar-mount"></div>
        <main class="page-container" id="page-container-mount"></main>
      </div>

      <!-- Barra de Navegación Inferior para Celulares y Tablets -->
      <div id="bottom-nav-mount" class="no-print"></div>
    </div>
  `;

  const sidebarMount = document.getElementById('sidebar-mount');
  const navbarMount = document.getElementById('navbar-mount');
  const pageMount = document.getElementById('page-container-mount');
  const bottomNavMount = document.getElementById('bottom-nav-mount');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');

  if (sidebarBackdrop) {
    sidebarBackdrop.onclick = () => {
      document.body.classList.remove('sidebar-open');
    };
  }

  const renderCurrentView = () => {
    renderSidebar(sidebarMount);
    renderNavbar(navbarMount);
    if (bottomNavMount) {
      renderBottomNav(bottomNavMount);
    }

    switch (store.activeView) {
      case 'dashboard':
        renderDashboardView(pageMount);
        break;
      case 'legajos':
        renderLegajosView(pageMount);
        break;
      case 'vgi_pai':
        renderVgiPaiView(pageMount);
        break;
      case 'informes':
        renderInformesProfesionalesView(pageMount);
        break;
      case 'grilla':
        renderGrillaDatosView(pageMount);
        break;
      case 'diagnostico':
        renderDiagnosticoPoblacionalView(pageMount);
        break;
      case 'planificacion':
        renderPlanificacionCronogramaView(pageMount);
        break;
      case 'equipo':
        renderEquipoProfesionalView(pageMount);
        break;
      default:
        renderDashboardView(pageMount);
    }
  };

  // Suscribirse a cambios del store
  store.subscribe(() => {
    renderCurrentView();
  });

  // Render inicial
  renderCurrentView();
}
