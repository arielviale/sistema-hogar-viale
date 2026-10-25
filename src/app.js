// ============================================================
// APLICACIÓN PRINCIPAL (APP.JS) - HOGAR MADRE TERESA
// Router y Orquestador de Interfaz
// ============================================================

import { store } from './state/store.js';
import { renderSidebar } from './components/Sidebar.js';
import { renderNavbar } from './components/Navbar.js';

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
      <div id="sidebar-mount"></div>
      <div class="main-content">
        <div id="navbar-mount"></div>
        <main class="page-container" id="page-container-mount"></main>
      </div>
    </div>
  `;

  const sidebarMount = document.getElementById('sidebar-mount');
  const navbarMount = document.getElementById('navbar-mount');
  const pageMount = document.getElementById('page-container-mount');

  const renderCurrentView = () => {
    renderSidebar(sidebarMount);
    renderNavbar(navbarMount);

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
