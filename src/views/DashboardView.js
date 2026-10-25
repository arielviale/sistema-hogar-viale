// ============================================================
// VISTA: PANEL DE CONTROL INSTITUCIONAL (DASHBOARD)
// Control de Vigencia 100% de VGI y PAI + Semáforo de Alertas
// ============================================================

import { store } from '../state/store.js';
import { openDossierMunicipalModal } from '../components/DossierMunicipalModal.js';

export function renderDashboardView(container) {
  const stats = store.getEstadisticas();
  const residentes = store.data.residentes;
  const hombresCount = residentes.filter(r => r.sexo === 'Masculino').length;
  const mujeresCount = residentes.filter(r => r.sexo === 'Femenino').length;

  // Filtrar los que requieren atención urgente en VGI o PAI
  const residentesEnAlerta = residentes.filter(r => 
    !r.vgi_vigente || 
    r.vgi_vigente.estado_vigencia === 'VENCIDA' || 
    r.vgi_vigente.estado_vigencia === 'PROXIMO_A_VENCER'
  );

  container.innerHTML = `
    <div class="animate-fade-in">
      <!-- Encabezado de Bienvenida y Meta Institucional -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h1 style="font-size: 1.6rem; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 0.6rem;">
            <span>Panel de Gestión Institucional</span>
            <span class="badge ${stats.porcentajeVigentes === 100 ? 'badge-vigente' : 'badge-advertencia'}" style="font-size: 0.8rem; padding: 0.35rem 0.85rem;">
              <span class="badge-pill-dot"></span>
              Meta VGI/PAI: ${stats.porcentajeVigentes}% al día
            </span>
          </h1>
          <p style="font-size: 0.9rem; color: #64748b; margin-top: 0.25rem;">
            Municipalidad de Viale · Residencia Gerontológica "Madre Teresa" · Entre Ríos
          </p>
        </div>

        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button id="btn-dossier-dash" class="btn btn-viale" style="font-weight: 700;">
            🏛️ Presentación Municipal (Dossier)
          </button>
          <button id="btn-nuevo-residente-dash" class="btn btn-secondary" style="font-weight: 600;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Nuevo Residente
          </button>
          <button id="btn-ir-informes-dash" class="btn btn-secondary" style="font-weight: 600;">
            📝 Informes Diarios / Semanales
          </button>
          <button id="btn-ir-grilla-dash" class="btn btn-secondary">
            Ver Grilla Maestra
          </button>
        </div>
      </div>

      <!-- Tarjeta Destacada: Semáforo de Garantía 100% VGI y PAI (Identidad Viale) -->
      <div class="card" style="background: linear-gradient(135deg, #009640 0%, #006029 100%); color: white; margin-bottom: 2rem; border: none; box-shadow: 0 10px 25px -5px rgba(0, 150, 64, 0.35);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
          <div style="max-width: 650px;">
            <div style="display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(255, 255, 255, 0.18); padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.6rem; border: 1px solid rgba(255, 255, 255, 0.25);">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Regla Inquebrantable de Calidad Ministerial
            </div>
            <h2 style="font-size: 1.35rem; font-weight: 800; line-height: 1.3; margin-bottom: 0.4rem;">
              Control Integral de Vigencia Semestral: VGI y PAI
            </h2>
            <p style="font-size: 0.88rem; opacity: 0.94; line-height: 1.5;">
              La normativa provincial exige que cada persona residente cuente con su Valoración Gerontológica Integral y Plan de Atención Individualizado debidamente evaluados, firmados y sellados por el equipo profesional cada 180 días.
            </p>
          </div>

          <div style="background: rgba(255, 255, 255, 0.15); padding: 1.25rem 1.75rem; border-radius: 14px; text-align: center; border: 1px solid rgba(255, 255, 255, 0.25); min-width: 190px;">
            <div style="font-size: 2.4rem; font-weight: 800; font-family: var(--font-mono); line-height: 1;">
              ${stats.porcentajeVigentes}%
            </div>
            <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 0.35rem; opacity: 0.95;">
              Cumplimiento Institucional
            </div>
            <div style="font-size: 0.72rem; opacity: 0.85; margin-top: 0.2rem;">
              ${stats.vigentes} de ${stats.totalResidentes} al día
            </div>
          </div>
        </div>

        <!-- Barra de Progreso Semafórica -->
        <div style="margin-top: 1.25rem;">
          <div style="height: 10px; width: 100%; background: rgba(0, 0, 0, 0.25); border-radius: 9999px; overflow: hidden; display: flex;">
            <div style="width: ${(stats.vigentes / stats.totalResidentes) * 100}%; background: #4ade80;" title="Vigentes: ${stats.vigentes}"></div>
            <div style="width: ${(stats.proximas / stats.totalResidentes) * 100}%; background: #facc15;" title="Próximas a vencer: ${stats.proximas}"></div>
            <div style="width: ${(stats.vencidas / stats.totalResidentes) * 100}%; background: #f87171;" title="Vencidas o incompletas: ${stats.vencidas}"></div>
          </div>
          <div style="display: flex; gap: 1.5rem; margin-top: 0.6rem; font-size: 0.78rem;">
            <span style="display: inline-flex; align-items: center; gap: 0.35rem;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: #4ade80;"></span>
              Vigentes: <strong>${stats.vigentes}</strong>
            </span>
            <span style="display: inline-flex; align-items: center; gap: 0.35rem;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: #facc15;"></span>
              Próximos a Vencer (&lt;30 días): <strong>${stats.proximas}</strong>
            </span>
            <span style="display: inline-flex; align-items: center; gap: 0.35rem;">
              <span style="width: 10px; height: 10px; border-radius: 50%; background: #f87171;"></span>
              Vencidas / Pendientes: <strong>${stats.vencidas}</strong>
            </span>
          </div>
        </div>
      </div>

      <!-- Métricas Clave en Cuadrícula -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
        
        <div class="card" style="border-left: 4px solid #009640;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Residentes y Sectores</span>
            <div style="background: #eefcf2; color: #009640; padding: 6px; border-radius: 8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
          </div>
          <div style="display: flex; align-items: baseline; gap: 0.65rem; margin-top: 0.5rem;">
            <div style="font-size: 2rem; font-weight: 800; color: #0f172a; font-family: var(--font-mono);">
              ${stats.totalResidentes}
            </div>
            <div style="font-size: 0.82rem; font-weight: 700; color: #007030;">
              ${hombresCount} Varones · ${mujeresCount} Mujeres
            </div>
          </div>
          <div style="font-size: 0.78rem; color: #64748b; margin-top: 0.25rem;">
            2 Sectores normativos con 100% ocupación
          </div>
        </div>

        <div class="card" style="border-left: 4px solid #059669;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Promedio Barthel</span>
            <div style="background: #dcfce7; color: #059669; padding: 6px; border-radius: 8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
          </div>
          <div style="font-size: 2rem; font-weight: 800; color: #0f172a; margin-top: 0.5rem; font-family: var(--font-mono);">
            ${stats.promedioBarthel} / 100
          </div>
          <div style="font-size: 0.78rem; color: #64748b; margin-top: 0.25rem;">
            Nivel funcional medio de la residencia
          </div>
        </div>

        <div class="card" style="border-left: 4px solid #d97706;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Cobertura Obra Social</span>
            <div style="background: #fef3c7; color: #d97706; padding: 6px; border-radius: 8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            </div>
          </div>
          <div style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-top: 0.7rem;">
            PAMI: ${stats.pamiCount} · IOSPER: ${stats.iosperCount}
          </div>
          <div style="font-size: 0.78rem; color: #64748b; margin-top: 0.4rem;">
            Gestión de medicación y convenios
          </div>
        </div>

        <div class="card" style="border-left: 4px solid #4f46e5;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Equipo Profesional</span>
            <div style="background: #ede9fe; color: #4f46e5; padding: 6px; border-radius: 8px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
          </div>
          <div style="font-size: 2rem; font-weight: 800; color: #0f172a; margin-top: 0.5rem; font-family: var(--font-mono);">
            ${stats.totalProfesionales}
          </div>
          <div style="font-size: 0.78rem; color: #64748b; margin-top: 0.25rem;">
            Matriculados en Entre Ríos con firma activa
          </div>
        </div>

      </div>

      <!-- Sección de Alertas Gerontológicas Urgentes -->
      <div class="card" style="margin-bottom: 2rem;">
        <div class="card-header">
          <h3 class="card-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Alertas de Vencimiento de VGI y PAI (Atención Prioritaria)
          </h3>
          <span style="font-size: 0.8rem; color: #64748b;">
            ${residentesEnAlerta.length} residente(s) requieren actualización inmediata
          </span>
        </div>

        ${residentesEnAlerta.length === 0 ? `
          <div style="text-align: center; padding: 2rem; color: #059669; font-weight: 600;">
            ✓ ¡Felicitaciones! El 100% de los residentes tienen su VGI y PAI al día.
          </div>
        ` : `
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Legajo</th>
                  <th>Residente</th>
                  <th>Sector</th>
                  <th>Estado VGI</th>
                  <th>Próxima Revisión</th>
                  <th>Acción Rápida</th>
                </tr>
              </thead>
              <tbody>
                ${residentesEnAlerta.map(r => `
                  <tr>
                    <td style="font-family: var(--font-mono); font-weight: 700; color: #007030;">
                      ${r.numero_legajo}
                    </td>
                    <td>
                      <strong>${r.nombre_completo}</strong>
                      <div style="font-size: 0.75rem; color: #64748b;">DNI: ${r.dni}</div>
                    </td>
                    <td>${r.estado_habitacional}</td>
                    <td>
                      ${!r.vgi_vigente ? `
                        <span class="badge badge-vencida">Sin VGI</span>
                      ` : r.vgi_vigente.estado_vigencia === 'VENCIDA' ? `
                        <span class="badge badge-vencida">Vencida (${r.vgi_vigente.fecha_proxima_revision})</span>
                      ` : `
                        <span class="badge badge-advertencia">Vence Pronto (${r.vgi_vigente.fecha_proxima_revision})</span>
                      `}
                    </td>
                    <td>${r.vgi_vigente ? r.vgi_vigente.fecha_proxima_revision : 'Pendiente'}</td>
                    <td>
                      <button class="btn btn-primary btn-sm btn-abrir-vgi-directo" data-residente-id="${r.id}">
                        Actualizar VGI / PAI
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `}
      </div>

    </div>
  `;

  // Event Listeners
  const btnDossier = document.getElementById('btn-dossier-dash');
  if (btnDossier) {
    btnDossier.onclick = () => openDossierMunicipalModal();
  }

  document.getElementById('btn-nuevo-residente-dash').onclick = () => {
    store.setView('legajos', 'nuevo');
  };

  const btnInformes = document.getElementById('btn-ir-informes-dash');
  if (btnInformes) {
    btnInformes.onclick = () => {
      store.setView('informes');
    };
  }

  document.getElementById('btn-ir-grilla-dash').onclick = () => {
    store.setView('grilla');
  };

  container.querySelectorAll('.btn-abrir-vgi-directo').forEach(btn => {
    btn.onclick = () => {
      const resId = btn.getAttribute('data-residente-id');
      store.setView('vgi_pai', resId);
    };
  });
}
