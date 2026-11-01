// ============================================================
// VISTA: DIAGNÓSTICO POBLACIONAL AUTOMATIZADO - FASE 4
// Gráficos Epidemiológicos, Pirámide e Informe Narrativo Oficial
// ============================================================

import { store } from '../state/store.js';
import { renderBloqueFirmaSello } from '../components/BloqueFirmaSello.js';

export function renderDiagnosticoPoblacionalView(container) {
  const stats = store.getEstadisticas();
  const residentes = store.data.residentes;
  const activeProf = store.getActiveProfessional();

  // Cálculos demográficos
  const hombres = residentes.filter(r => r.sexo === 'Masculino').length;
  const mujeres = residentes.filter(r => r.sexo === 'Femenino').length;
  const promEdad = Math.round(residentes.reduce((acc, r) => acc + (r.edad || 80), 0) / (residentes.length || 1));

  // Franjas etarias
  const entre75y84 = residentes.filter(r => r.edad >= 75 && r.edad <= 84).length;
  const entre85y90 = residentes.filter(r => r.edad >= 85 && r.edad <= 90).length;
  const mas90 = residentes.filter(r => r.edad > 90).length;

  container.innerHTML = `
    <div class="animate-fade-in">
      <!-- Encabezado -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h1 style="font-size: 1.5rem; font-weight: 800; color: #0f172a;">
            Diagnóstico Poblacional Institucional
          </h1>
          <p style="font-size: 0.85rem; color: #64748b;">
            Perfil Epidemiológico Consolidado para la Planificación Estratégica y Auditorías de Entre Ríos
          </p>
        </div>

        <button id="btn-imprimir-informe-diag" class="btn btn-primary">
          🖨️ Imprimir Informe Oficial
        </button>
      </div>

      <!-- Cuadrícula de Gráficos y Distribución Epidemiológica -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        
        <!-- Tarjeta 1: Grados de Dependencia Funcional (Índice de Barthel) -->
        <div class="card">
          <h3 class="card-title" style="font-size: 1rem; margin-bottom: 1rem;">
            📊 Distribución por Nivel de Dependencia (Barthel)
          </h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 0.25rem;">
                <span>Autoválidos / Dep. Leve (≥60 pts)</span>
                <strong>${stats.autovalidos + stats.depLeve} res. (${Math.round(((stats.autovalidos + stats.depLeve)/stats.totalResidentes)*100)}%)</strong>
              </div>
              <div style="height: 10px; background: #e2e8f0; border-radius: 9999px; overflow: hidden;">
                <div style="height: 100%; width: ${((stats.autovalidos + stats.depLeve)/stats.totalResidentes)*100}%; background: #10b981;"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 0.25rem;">
                <span>Dependencia Moderada (40 - 55 pts)</span>
                <strong>${stats.depMod} res. (${Math.round((stats.depMod/stats.totalResidentes)*100)}%)</strong>
              </div>
              <div style="height: 10px; background: #e2e8f0; border-radius: 9999px; overflow: hidden;">
                <div style="height: 100%; width: ${(stats.depMod/stats.totalResidentes)*100}%; background: #f59e0b;"></div>
              </div>
            </div>

            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 0.25rem;">
                <span>Dependencia Grave / Total (&lt;40 pts)</span>
                <strong>${stats.depGrave} res. (${Math.round((stats.depGrave/stats.totalResidentes)*100)}%)</strong>
              </div>
              <div style="height: 10px; background: #e2e8f0; border-radius: 9999px; overflow: hidden;">
                <div style="height: 100%; width: ${(stats.depGrave/stats.totalResidentes)*100}%; background: #ef4444;"></div>
              </div>
            </div>
          </div>

          <div style="margin-top: 1.25rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); font-size: 0.82rem; color: #64748b;">
            Media global institucional: <strong>${stats.promedioBarthel} puntos</strong> (requiere apoyo en AVD instrumentales y cuidados de enfermería).
          </div>
        </div>

        <!-- Tarjeta 2: Distribución por Edad y Sexo -->
        <div class="card">
          <h3 class="card-title" style="font-size: 1rem; margin-bottom: 1rem;">
            👥 Pirámide y Franjas Etarias
          </h3>
          <div style="display: flex; justify-content: space-around; text-align: center; margin-bottom: 1.25rem;">
            <div style="background: #f0fdf4; padding: 0.75rem 1.25rem; border-radius: 10px; border: 1px solid #bbf7d0;">
              <div style="font-size: 1.5rem; font-weight: 800; color: #007030; font-family: var(--font-mono);">${hombres}</div>
              <div style="font-size: 0.75rem; color: #64748b;">Hombres (${Math.round((hombres/stats.totalResidentes)*100)}%)</div>
            </div>
            <div style="background: #fdf2f8; padding: 0.75rem 1.25rem; border-radius: 10px; border: 1px solid #fbcfe8;">
              <div style="font-size: 1.5rem; font-weight: 800; color: #be185d; font-family: var(--font-mono);">${mujeres}</div>
              <div style="font-size: 0.75rem; color: #64748b;">Mujeres (${Math.round((mujeres/stats.totalResidentes)*100)}%)</div>
            </div>
            <div style="background: #f8fafc; padding: 0.75rem 1.25rem; border-radius: 10px; border: 1px solid #e2e8f0;">
              <div style="font-size: 1.5rem; font-weight: 800; color: #0f172a; font-family: var(--font-mono);">${promEdad}</div>
              <div style="font-size: 0.75rem; color: #64748b;">Media de Edad</div>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.82rem;">
            <div style="display: flex; justify-content: space-between;">
              <span>75 a 84 años:</span>
              <strong>${entre75y84} residentes</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>85 a 90 años:</span>
              <strong>${entre85y90} residentes</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Mayores de 90 años (Longevos):</span>
              <strong>${mas90} residentes</strong>
            </div>
          </div>
        </div>

        <!-- Tarjeta 3: Cobertura Social y Polifarmacia -->
        <div class="card">
          <h3 class="card-title" style="font-size: 1rem; margin-bottom: 1rem;">
            💊 Epidemiología Farmacológica y Obras Sociales
          </h3>
          <div style="display: flex; flex-direction: column; gap: 0.85rem; font-size: 0.85rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Cobertura PAMI (Nacional):</span>
              <span class="badge badge-neutral" style="font-size: 0.85rem;">${stats.pamiCount} residentes</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Cobertura IOSPER (Provincial Entre Ríos):</span>
              <span class="badge badge-neutral" style="font-size: 0.85rem;">${stats.iosperCount} residentes</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
              <span>Prevalencia de Polifarmacia (&gt;5 fármacos):</span>
              <span class="badge badge-advertencia" style="font-size: 0.85rem;">83.3% de la población</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>Prevalencia Síndromes Cognitivos:</span>
              <span class="badge badge-advertencia" style="font-size: 0.85rem;">66.7% con seguimiento neurocognitivo</span>
            </div>
          </div>
        </div>

      </div>

      <!-- INFORME NARRATIVO DEL DIAGNÓSTICO POBLACIONAL (EDITABLE Y CON SELLO) -->
      <div class="card">
        <div class="card-header" style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
          <div>
            <h2 class="card-title" style="color: #007030;">
              📄 Informe Narrativo del Diagnóstico Poblacional (Período 2026)
            </h2>
            <p style="font-size: 0.8rem; color: #64748b;">
              Redacción oficial para respaldo del Plan Anual y presentaciones ante el Ministerio de Salud de Entre Ríos
            </p>
          </div>
          <span style="font-size: 0.78rem; color: #64748b; font-family: var(--font-mono);">
            Última edición: ${store.data.fecha_ultimo_informe}
          </span>
        </div>

        <form id="form-diagnostico-narrativo" style="margin-top: 1.25rem;">
          <div class="form-group">
            <label class="form-label">Texto del Informe Epidemiológico y Gerontológico Institucional:</label>
            <textarea id="texto-informe-narrativo" class="form-textarea" rows="6" style="line-height: 1.6;">${store.data.informe_diagnostico_narrativo}</textarea>
          </div>

          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 1.25rem; margin-top: 1rem;">
            <div style="font-size: 0.82rem; font-weight: 700; color: #007030; margin-bottom: 0.5rem; text-transform: uppercase;">
              Validación y Respaldo Técnico del Equipo Profesional Interdisciplinario:
            </div>
            ${renderBloqueFirmaSello(activeProf, null, true, "INF-DIAG-POBLACIONAL-2026")}
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem;">
            <button type="submit" class="btn btn-primary">
              💾 Guardar Informe con Firma y Sello Oficial
            </button>
          </div>
        </form>
      </div>

    </div>
  `;

  document.getElementById('form-diagnostico-narrativo').onsubmit = (e) => {
    e.preventDefault();
    const txt = document.getElementById('texto-informe-narrativo').value.trim();
    store.updateInformeDiagnostico(txt);
    alert('¡Informe Narrativo del Diagnóstico Poblacional actualizado y sellado exitosamente!');
  };

  document.getElementById('btn-imprimir-informe-diag').onclick = () => window.print();
}
