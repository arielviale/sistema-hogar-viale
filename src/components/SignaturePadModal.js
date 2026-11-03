// ============================================================
// COMPONENTE: MODAL INTERACTIVO CANVAS SIGNATURE PAD
// Permite firmar con mouse o pantalla táctil en el Hogar Madre Teresa
// ============================================================

export function openSignaturePadModal(profesional, onSaveCallback) {
  // Eliminar modal previo si existiese
  const existing = document.getElementById('signature-modal-container');
  if (existing) existing.remove();

  const container = document.createElement('div');
  container.id = 'signature-modal-container';
  container.className = 'modal-backdrop animate-fade-in';

  container.innerHTML = `
    <div class="modal-content" style="max-width: 550px;">
      <div class="modal-header">
        <div>
          <h3 style="font-size: 1.15rem; font-weight: 700; color: #0f172a;">
            Pad de Firma Digitalizada
          </h3>
          <p style="font-size: 0.8rem; color: #64748b; margin-top: 2px;">
            Profesional: <strong>${profesional.nombre_completo}</strong> (${profesional.matricula_provincial})
          </p>
        </div>
        <button id="close-pad-btn" style="background: none; border: none; font-size: 1.3rem; cursor: pointer; color: #64748b;">✕</button>
      </div>

      <div class="modal-body" style="text-align: center;">
        <p style="font-size: 0.85rem; color: #475569; margin-bottom: 0.75rem;">
          Dibuje su firma con el ratón o directamente con el dedo en pantalla táctil:
        </p>

        <div style="border: 2px dashed #94a3b8; border-radius: 12px; background: #ffffff; padding: 4px; display: inline-block; max-width: 100%; box-shadow: inset 0 2px 4px rgba(0,0,0,0.04);">
          <canvas id="signature-canvas" width="480" height="180" style="touch-action: none; cursor: crosshair; display: block; border-radius: 8px; max-width: 100%; height: auto;"></canvas>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem;">
          <span style="font-size: 0.75rem; color: #64748b;">Línea base formal para auditorías ministeriales</span>
          <button id="clear-canvas-btn" class="btn btn-secondary btn-sm">
            Limpiar Trazo
          </button>
        </div>
      </div>

      <div class="modal-footer">
        <button id="cancel-pad-btn" class="btn btn-secondary">Cancelar</button>
        <button id="save-pad-btn" class="btn btn-primary">
          Guardar Firma en Perfil
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  const canvas = document.getElementById('signature-canvas');
  const ctx = canvas.getContext('2d');
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#0f172a';

  let drawing = false;

  const getCanvasCoordinates = (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDraw = (e) => {
    drawing = true;
    const { x, y } = getCanvasCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    if (e.touches) e.preventDefault();
  };

  const draw = (e) => {
    if (!drawing) return;
    const { x, y } = getCanvasCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    if (e.touches) e.preventDefault();
  };

  const endDraw = () => {
    drawing = false;
  };

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  window.addEventListener('mouseup', endDraw);

  canvas.addEventListener('touchstart', startDraw, { passive: false });
  canvas.addEventListener('touchmove', draw, { passive: false });
  canvas.addEventListener('touchend', endDraw);

  document.getElementById('clear-canvas-btn').onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const closeModal = () => {
    window.removeEventListener('mouseup', endDraw);
    container.remove();
  };

  document.getElementById('close-pad-btn').onclick = closeModal;
  document.getElementById('cancel-pad-btn').onclick = closeModal;

  document.getElementById('save-pad-btn').onclick = () => {
    const dataUrl = canvas.toDataURL('image/png');
    if (onSaveCallback) {
      onSaveCallback(dataUrl);
    }
    closeModal();
  };
}
