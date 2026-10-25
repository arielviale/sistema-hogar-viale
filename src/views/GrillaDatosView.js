// ============================================================
// VISTA: GRILLA INSTITUCIONAL DE RECOLECCIÓN DE DATOS - FASE 4
// Matriz Poblacional Consolidada y Exportación a CSV / Excel
// ============================================================

import { store } from '../state/store.js';

export function renderGrillaDatosView(container) {
  const residentes = store.data.residentes;

  container.innerHTML = `
    <div class="animate-fade-in">
      <!-- Encabezado -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h1 style="font-size: 1.5rem; font-weight: 800; color: #0f172a;">
            Grilla Institucional de Recolección de Datos
          </h1>
          <p style="font-size: 0.85rem; color: #64748b;">
            Matriz epidemiológica y funcional alimentada automáticamente desde los Legajos Únicos y VGI
          </p>
        </div>

        <div style="display: flex; gap: 0.75rem;">
          <button id="btn-exportar-csv" class="btn btn-secondary">
            📥 Descargar CSV / Excel
          </button>
          <button id="btn-imprimir-grilla" class="btn btn-primary">
            🖨️ Imprimir Grilla Oficial
          </button>
        </div>
      </div>

      <!-- Filtros Rápidos -->
      <div class="card" style="margin-bottom: 1.5rem; padding: 1rem 1.25rem;">
        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 220px;">
            <label class="form-label">Buscar por Residente o DNI:</label>
            <input type="text" id="filtro-busqueda-grilla" class="form-input" placeholder="Escriba apellido, nombre o DNI..." />
          <div style="min-width: 170px;">
            <label class="form-label">Sector:</label>
            <select id="filtro-sector-grilla" class="form-select">
              <option value="TODOS">Todos los sectores</option>
              <option value="Sector Varones">Sector Varones</option>
              <option value="Sector Mujeres">Sector Mujeres</option>
            </select>
          </div>
          <div style="min-width: 180px;">
            <label class="form-label">Filtrar por Dependencia (Barthel):</label>
            <select id="filtro-dependencia-grilla" class="form-select">
              <option value="TODOS">Todas las clasificaciones</option>
              <option value="Autoválido">Autoválido / Leve</option>
              <option value="Moderada">Moderada</option>
              <option value="Grave">Grave / Total</option>
            </select>
          </div>
          <div style="min-width: 150px;">
            <label class="form-label">Obra Social:</label>
            <select id="filtro-os-grilla" class="form-select">
              <option value="TODOS">Todas</option>
              <option value="PAMI">PAMI</option>
              <option value="IOSPER">IOSPER</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Tabla Consolidada -->
      <div class="card" style="padding: 0; overflow: hidden;">
        <div class="table-container">
          <table class="data-table" id="tabla-grilla-maestra">
            <thead>
              <tr>
                <th>Legajo</th>
                <th>Nombre del Residente</th>
                <th>Edad / Sexo</th>
                <th>Obra Social</th>
                <th>Movilidad</th>
                <th>Continencia</th>
                <th>Índice Barthel</th>
                <th>Tinetti (Caídas)</th>
                <th>Cognitivo</th>
                <th>Vigencia VGI</th>
              </tr>
            </thead>
            <tbody id="grilla-body-rows">
              <!-- Renderizado dinámico -->
            </tbody>
          </table>
        </div>
      </div>

      <div style="margin-top: 1rem; font-size: 0.8rem; color: #64748b; text-align: right;">
        * Los datos son inmutables y se sincronizan en tiempo real con las últimas valoraciones interdisciplinarias registradas.
      </div>
    </div>
  `;

  const renderRows = () => {
    const q = document.getElementById('filtro-busqueda-grilla').value.toLowerCase();
    const sectorFilter = document.getElementById('filtro-sector-grilla').value;
    const depFilter = document.getElementById('filtro-dependencia-grilla').value;
    const osFilter = document.getElementById('filtro-os-grilla').value;

    const filtered = residentes.filter(r => {
      const matchText = r.nombre_completo.toLowerCase().includes(q) || r.dni.includes(q) || r.numero_legajo.toLowerCase().includes(q);
      const matchSector = sectorFilter === 'TODOS' || (r.estado_habitacional && r.estado_habitacional.includes(sectorFilter));
      const matchOs = osFilter === 'TODOS' || r.obra_social === osFilter;
      
      let matchDep = true;
      if (depFilter !== 'TODOS') {
        const b = r.vgi_vigente ? r.vgi_vigente.barthel_puntaje : 0;
        if (depFilter === 'Autoválido') matchDep = b >= 80;
        else if (depFilter === 'Moderada') matchDep = b >= 40 && b < 80;
        else if (depFilter === 'Grave') matchDep = b < 40;
      }

      return matchText && matchSector && matchOs && matchDep;
    });

    const tbody = document.getElementById('grilla-body-rows');
    tbody.innerHTML = filtered.map(r => `
      <tr>
        <td style="font-family: var(--font-mono); font-weight: 700; color: #007030;">
          ${r.numero_legajo}
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            ${r.foto_url ? `
              <img src="${r.foto_url}" alt="${r.nombre_completo}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover; border: 2px solid #009640; flex-shrink: 0;" />
            ` : `
              <div style="width: 36px; height: 36px; border-radius: 50%; background: #eefcf2; color: #007030; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; flex-shrink: 0;">
                ${r.nombre_completo.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
            `}
            <div>
              <strong>${r.nombre_completo}</strong>
              <div style="font-size: 0.75rem; color: #64748b;">${r.estado_habitacional}</div>
            </div>
          </div>
        </td>
        <td>${r.edad} años (${r.sexo === 'Masculino' ? 'M' : 'F'})</td>
        <td><span class="badge badge-neutral">${r.obra_social}</span></td>
        <td>${r.movilidad}</td>
        <td>${r.continente}</td>
        <td>
          <strong>${r.vgi_vigente ? r.vgi_vigente.barthel_puntaje : '-'}</strong> / 100
          <div style="font-size: 0.72rem; color: #007030;">${r.vgi_vigente ? r.vgi_vigente.barthel_clasificacion : 'Sin VGI'}</div>
        </td>
        <td>
          ${r.vgi_vigente ? `${r.vgi_vigente.tinetti_puntaje} pts (${r.vgi_vigente.tinetti_riesgo})` : '-'}
        </td>
        <td>
          ${r.vgi_vigente ? `${r.vgi_vigente.pfeiffer_clasificacion}` : '-'}
        </td>
        <td>
          ${!r.vgi_vigente ? `
            <span class="badge badge-vencida">Pendiente</span>
          ` : r.vgi_vigente.estado_vigencia === 'VIGENTE' ? `
            <span class="badge badge-vigente">Vigente</span>
          ` : `
            <span class="badge badge-advertencia">${r.vgi_vigente.estado_vigencia}</span>
          `}
        </td>
      </tr>
    `).join('');
  };

  renderRows();

  // Listeners de filtros
  document.getElementById('filtro-busqueda-grilla').oninput = renderRows;
  document.getElementById('filtro-sector-grilla').onchange = renderRows;
  document.getElementById('filtro-dependencia-grilla').onchange = renderRows;
  document.getElementById('filtro-os-grilla').onchange = renderRows;

  // Botón Imprimir
  document.getElementById('btn-imprimir-grilla').onclick = () => window.print();

  // Botón Exportar CSV
  document.getElementById('btn-exportar-csv').onclick = () => {
    let csv = "Legajo;Nombre;DNI;Edad;Sexo;Obra Social;Sector;Movilidad;Continencia;Barthel;Tinetti;Pfeiffer;Estado VGI\n";
    residentes.forEach(r => {
      const b = r.vgi_vigente ? r.vgi_vigente.barthel_puntaje : '';
      const t = r.vgi_vigente ? r.vgi_vigente.tinetti_puntaje : '';
      const p = r.vgi_vigente ? r.vgi_vigente.pfeiffer_clasificacion : '';
      const v = r.vgi_vigente ? r.vgi_vigente.estado_vigencia : 'SIN VGI';
      csv += `"${r.numero_legajo}";"${r.nombre_completo}";"${r.dni}";"${r.edad}";"${r.sexo}";"${r.obra_social}";"${r.estado_habitacional}";"${r.movilidad}";"${r.continente}";"${b}";"${t}";"${p}";"${v}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `grilla_recoleccion_datos_hogar_madre_teresa_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
}
