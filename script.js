// ============================================
//  LIBRERÍA PEREIRA — script.js
//  Supabase + CAPTCHA simulado + Sesión
// ============================================

const SUPABASE_URL = "https://ruyoguzvuoerkdwpgwfs.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1eW9ndXp2dW9lcmtkd3Bnd2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNjY2MzUsImV4cCI6MjA4ODc0MjYzNX0.WQtGk8KoaDDp_b8W_IpcKVqBKHel6N7GZNdhJ5AOMKI";
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ── UTILIDADES ────────────────────────────────────────────────────────────────

function showAlert(containerId, message, type = 'error') {
  const icons = { error: '⚠️', success: '✅', info: 'ℹ️' };
  let el = document.getElementById(containerId);
  if (!el) {
    el = document.createElement('div');
    el.id = containerId;
    const form = document.querySelector('form');
    if (form) form.before(el);
  }
  el.innerHTML = `<div class="alert alert-${type}">${icons[type]} ${message}</div>`;
  setTimeout(() => { if (el) el.innerHTML = ''; }, 5000);
}

function setLoading(btn, loading) {
  if (loading) {
    btn.disabled = true;
    btn.dataset.original = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span> Procesando...';
  } else {
    btn.disabled = false;
    btn.innerHTML = btn.dataset.original || btn.innerHTML;
  }
}

// ── CAPTCHA SIMULADO ──────────────────────────────────────────────────────────

function initCaptcha(boxId) {
  const box = document.getElementById(boxId);
  if (!box) return;
  let verified = false;

  box.addEventListener('click', () => {
    if (verified) return;
    const checkbox = box.querySelector('.captcha-checkbox');
    box.classList.add('loading');
    checkbox.textContent = '⟳';
    setTimeout(() => {
      box.classList.remove('loading');
      box.classList.add('verified');
      checkbox.textContent = '✓';
      box.dataset.verified = 'true';
      verified = true;
    }, 1200 + Math.random() * 800);
  });
}

function isCaptchaVerified(boxId) {
  const box = document.getElementById(boxId);
  return box && box.dataset.verified === 'true';
}

// ── VALIDACIÓN CONTRASEÑA FUERTE ──────────────────────────────────────────────

function initPasswordStrength(inputId, barId, hintId) {
  const input = document.getElementById(inputId);
  const bar   = document.getElementById(barId);
  const hint  = document.getElementById(hintId);
  if (!input || !bar) return;

  input.addEventListener('input', () => {
    const val   = input.value;
    const score = getPasswordScore(val);
    const configs = [
      { width: '0%',   color: '#e5e7eb', text: '' },
      { width: '25%',  color: '#ef4444', text: '🔴 Muy débil — agrega mayúsculas, números y símbolos' },
      { width: '50%',  color: '#f59e0b', text: '🟡 Débil — sigue mejorando' },
      { width: '75%',  color: '#3b82f6', text: '🔵 Aceptable — casi lista' },
      { width: '100%', color: '#22c55e', text: '🟢 Contraseña fuerte ✓' },
    ];
    const cfg = configs[score];
    bar.style.width      = cfg.width;
    bar.style.background = cfg.color;
    if (hint) hint.textContent = cfg.text;
  });
}

function getPasswordScore(pass) {
  if (!pass) return 0;
  let score = 0;
  if (pass.length >= 8)        score++;
  if (/[A-Z]/.test(pass))      score++;
  if (/[0-9]/.test(pass))      score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;
  return score;
}

function isPasswordStrong(pass) {
  return pass.length >= 8 &&
    /[A-Z]/.test(pass) &&
    /[0-9]/.test(pass) &&
    /[^A-Za-z0-9]/.test(pass);
}

// ── SESIÓN — BLOQUEO TRAS INACTIVIDAD ────────────────────────────────────────

let sessionTimer = null;
const SESSION_TIMEOUT = 60; 

function initSessionTimer() {
  const bar = document.getElementById('sessionBar');
  if (!bar) return;

  let remaining = SESSION_TIMEOUT;

  function resetTimer() {
    remaining = SESSION_TIMEOUT;
    bar.classList.remove('warn');
    updateBar();
  }

  function updateBar() {
    const el = bar.querySelector('#sessionCount');
    if (el) el.textContent = remaining + 's';
    if (remaining <= 30) bar.classList.add('warn');
    else bar.classList.remove('warn');
  }

  function tick() {
    remaining--;
    updateBar();
    if (remaining <= 0) {
      clearInterval(sessionTimer);
      forceLogout();
    }
  }

  ['mousemove','keydown','click','scroll','touchstart'].forEach(ev =>
    document.addEventListener(ev, resetTimer, { passive: true })
  );

  sessionTimer = setInterval(tick, 1000);
  updateBar();
}

function forceLogout() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" style="text-align:center;">
      <div style="font-size:2.5rem;margin-bottom:12px;">⏱️</div>
      <h3>Sesión expirada</h3>
      <p>Tu sesión se cerró automáticamente por inactividad.</p>
      <button onclick="window.location.href='login.html'"
              style="margin-top:4px;">
        Iniciar sesión nuevamente
      </button>
    </div>
  `;
  document.body.appendChild(overlay);
  sessionStorage.removeItem('sesion');
}

// ── LOGOUT CON CONFIRMACIÓN ───────────────────────────────────────────────────

function logout() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'logoutModal';
  overlay.innerHTML = `
    <div class="modal">
      <div style="font-size:2rem;margin-bottom:12px;text-align:center;">👋</div>
      <h3 style="text-align:center;">¿Cerrar sesión?</h3>
      <p style="text-align:center;">Deberás iniciar sesión nuevamente para acceder al sistema.</p>
      <div class="modal-actions">
        <button onclick="document.getElementById('logoutModal').remove()"
                style="background:transparent;color:var(--texto-suave);border:1.5px solid var(--borde);box-shadow:none;width:auto;flex:1;">
          Cancelar
        </button>
        <button onclick="confirmarLogout()"
                style="background:var(--primario);box-shadow:none;width:auto;flex:1;">
          Sí, cerrar sesión
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function confirmarLogout() {
  sessionStorage.removeItem('sesion');
  window.location.href = 'login.html';
}

// ── PROTEGER PÁGINAS ──────────────────────────────────────────────────────────

function requireSession() {
  const sesion = getSesion();
  if (!sesion) {
    window.location.href = 'login.html';
    return null;
  }
  return sesion;
}

function getSesion() {
  try { return JSON.parse(sessionStorage.getItem('sesion')); }
  catch { return null; }
}

// ── REGISTRO (HU #1) ─────────────────────────────────────────────────────────

async function simularRegistro(event) {
  event.preventDefault();

  if (!isCaptchaVerified('captchaReg')) {
    showAlert('alertReg', 'Por favor verifica el CAPTCHA antes de continuar.', 'error');
    return;
  }

  const password = document.getElementById('password').value;
  if (!isPasswordStrong(password)) {
    showAlert('alertReg', 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.', 'error');
    return;
  }

  const confirmPass = document.getElementById('confirmPassword')?.value;
  if (confirmPass !== undefined && password !== confirmPass) {
    showAlert('alertReg', 'Las contraseñas no coinciden.', 'error');
    return;
  }

  const nombre    = document.getElementById('nombre').value.trim();
  const apellidos = document.getElementById('apellidos')?.value.trim() || '';
  const nombreCompleto = (nombre + ' ' + apellidos).trim();

  const btn = event.submitter || document.querySelector('button[type="submit"]');
  setLoading(btn, true);

  const datosUsuario = {
    id_dni:           document.getElementById('dni').value.trim(),
    nombre:           nombre,
    nombre_completo:  nombreCompleto,
    apellidos:        apellidos,
    correo:           document.getElementById('correo').value.trim().toLowerCase(),
    fecha_nacimiento: document.getElementById('fecha_nacimiento').value,
    departamento:     document.getElementById('dep_residencia')?.value || '',
    ciudad:           document.getElementById('ciudad_residencia')?.value || '',
    genero:           document.getElementById('genero')?.value || '',
    telefono:         document.getElementById('telefono')?.value.trim() || '',
    direccion:        document.getElementById('direccion').value.trim() || 'Pereira, Colombia',
    username:         document.getElementById('usuario').value.trim(),
    password:         password,
    rol:              'cliente',
    suscripcion_noticias: true,
    notif_catalogo:   true,
    notif_cumple:     true,
  };

  const { data: insertData, error } = await client
    .from('usuarios')
    .insert([datosUsuario])
    .select('id')
    .single();

  if (error) {
    setLoading(btn, false);
    const msg = error.message.includes('duplicate') || error.message.includes('unique')
      ? 'Este correo o usuario ya está registrado.'
      : 'Error al registrar: ' + error.message;
    showAlert('alertReg', msg, 'error');
    return;
  }

  // Llamar Edge Function para enviar correo de verificación
  showAlert('alertReg', '✅ Cuenta creada. Enviando correo de verificación...', 'success');

  await fetch(`${SUPABASE_URL}/functions/v1/send-verification-email`, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'apikey':        SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
    },
    body: JSON.stringify({ usuario_id: insertData.id }),
  });

  setLoading(btn, false);

  // Guardar correo en sessionStorage para usarlo en verificar.html
  sessionStorage.setItem('pendiente_verificacion', JSON.stringify({
    id:     insertData.id,
    correo: datosUsuario.correo,
    nombre: datosUsuario.nombre_completo,
  }));

  setTimeout(() => { window.location.href = 'verificar.html'; }, 1200);
}

// ── LOGIN (HU #2) ─────────────────────────────────────────────────────────────

async function simularLogin(event) {
  event.preventDefault();

  if (!isCaptchaVerified('captchaLogin')) {
    showAlert('alertLogin', 'Por favor verifica el CAPTCHA antes de continuar.', 'error');
    return;
  }

  const btn      = event.submitter || document.querySelector('button[type="submit"]');
  const userInput = document.getElementById('userLogin').value.trim();
  const pass      = document.getElementById('passLogin').value;

  setLoading(btn, true);

  const isEmail   = userInput.includes('@');
  const campo     = isEmail ? 'correo' : 'username';
  // Solo convertir a minúsculas si es correo — el username se guarda tal cual
  const valorBuscar = isEmail ? userInput.toLowerCase() : userInput;

  const { data, error } = await client
    .from('usuarios')
    .select('*')
    .eq(campo, valorBuscar)
    .single();

  setLoading(btn, false);

  if (error || !data) {
    showAlert('alertLogin', 'Usuario o correo no encontrado.', 'error');
    return;
  }

  if (data.password !== pass) {
    showAlert('alertLogin', 'Contraseña incorrecta.', 'error');
    return;
  }

  // Verificar que la cuenta esté verificada
  if (!data.verificado) {
    // Reenviar correo de verificación y redirigir
    sessionStorage.setItem('pendiente_verificacion', JSON.stringify({
      id:     data.id,
      correo: data.correo,
      nombre: data.nombre_completo,
    }));
    await fetch(`${SUPABASE_URL}/functions/v1/send-verification-email`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'apikey':        SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify({ usuario_id: data.id }),
    });
    showAlert('alertLogin',
      '⚠️ Tu cuenta no está verificada. Te reenviamos el código al correo.',
      'error'
    );
    setTimeout(() => { window.location.href = 'verificar.html'; }, 2000);
    return;
  }

  sessionStorage.setItem('sesion', JSON.stringify({
    id:              data.id,
    nombre_completo: data.nombre_completo,
    correo:          data.correo,
    username:        data.username,
    rol:             data.rol,
    id_dni:          data.id_dni,
  }));

  const destino = data.rol === 'root' ? 'root.html'
    : data.rol === 'administrador' ? 'admin.html'
    : 'index.html';
  showAlert('alertLogin', `¡Bienvenido, ${data.nombre_completo}! Redirigiendo...`, 'success');
  setTimeout(() => { window.location.href = destino; }, 1200);
}

// ============================================================
//  ITERACIÓN 3 — Carrito, Compras, Reservas, Historial
// ============================================================

// ── CARRITO (en sessionStorage) ──────────────────────────────

function getCarrito() {
  try { return JSON.parse(sessionStorage.getItem('carrito') || '[]'); }
  catch { return []; }
}

function saveCarrito(carrito) {
  sessionStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarBadgeCarrito();
}

function actualizarBadgeCarrito() {
  const carrito = getCarrito();
  const total = carrito.reduce((s, i) => s + i.cantidad, 0);
  document.querySelectorAll('.carrito-badge').forEach(b => {
    b.textContent = total > 0 ? total : '';
    b.style.display = total > 0 ? 'inline-flex' : 'none';
  });
}

function agregarAlCarrito(libro) {
  // libro: { id, titulo, autor, precio, imagen_url, stock }
  const sesion = getSesion();
  if (!sesion) { window.location.href = 'login.html'; return; }

  const carrito = getCarrito();
  const idx = carrito.findIndex(i => i.id === libro.id);

  if (idx >= 0) {
    if (carrito[idx].cantidad >= libro.stock) {
      alert('No hay más stock disponible para este título.');
      return;
    }
    carrito[idx].cantidad++;
  } else {
    if (libro.stock < 1) { alert('Este libro está agotado.'); return; }
    carrito.push({ ...libro, cantidad: 1 });
  }
  saveCarrito(carrito);
  mostrarToastCarrito(libro.titulo);
}

function mostrarToastCarrito(titulo) {
  let toast = document.getElementById('toastCarrito');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastCarrito';
    toast.style.cssText = 'position:fixed;bottom:80px;right:20px;background:var(--primario);color:#fff;padding:10px 18px;border-radius:10px;font-size:0.85rem;font-weight:600;z-index:9999;opacity:0;transition:opacity 0.3s;box-shadow:0 4px 16px rgba(184,50,39,0.3);';
    document.body.appendChild(toast);
  }
  toast.textContent = `📚 "${titulo.slice(0,30)}..." añadido al carrito`;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

// ── RESERVAS ──────────────────────────────────────────────────

async function crearReserva(items) {
  // items: [{ libro_id, cantidad }]
  const sesion = getSesion();
  if (!sesion) return { error: 'Sin sesión' };

  // Verificar límites HU-20: max 5 libros diferentes, max 3 del mismo
  const diferentesLibros = items.length;
  const excedeCantidad   = items.some(i => i.cantidad > 3);
  if (diferentesLibros > 5) return { error: 'Máximo 5 libros diferentes por reserva.' };
  if (excedeCantidad)       return { error: 'Máximo 3 ejemplares del mismo título por reserva.' };

  const expira = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await client
    .from('reservas')
    .insert([{
      usuario_id: sesion.id,
      items:      JSON.stringify(items),
      expira_en:  expira,
      estado:     'activa',
    }])
    .select('id')
    .single();

  if (error) return { error: error.message };

  // Descontar stock temporalmente (marcar como reservado)
  for (const item of items) {
    await client.rpc('decrementar_stock', { libro_id: item.libro_id, cantidad: item.cantidad });
  }

  return { reserva_id: data.id };
}

async function cancelarReserva(reservaId) {
  const { data: res, error } = await client
    .from('reservas')
    .select('items')
    .eq('id', reservaId)
    .single();

  if (error || !res) return { error: 'Reserva no encontrada.' };

  const items = JSON.parse(res.items);

  // Devolver stock
  for (const item of items) {
    await client.rpc('incrementar_stock', { libro_id: item.libro_id, cantidad: item.cantidad });
  }

  const { error: err2 } = await client
    .from('reservas')
    .update({ estado: 'cancelada' })
    .eq('id', reservaId);

  return err2 ? { error: err2.message } : { ok: true };
}

// ── COMPRAS ───────────────────────────────────────────────────

async function procesarCompra({ items, tarjeta_id, direccion_envio, costo_envio = 8500, tiempo_entrega = '3 a 5 días hábiles' }) {
  const sesion = getSesion();
  if (!sesion) return { error: 'Sin sesión' };

  // Calcular total
  let subtotal = 0;
  for (const item of items) {
    subtotal += item.precio * item.cantidad;
  }
  const total = subtotal + costo_envio;

  // Verificar saldo de tarjeta
  const { data: tarjeta, error: errT } = await client
    .from('tarjetas')
    .select('saldo, nombre_titular')
    .eq('id', tarjeta_id)
    .eq('usuario_id', sesion.id)
    .single();

  if (errT || !tarjeta) return { error: 'Tarjeta no encontrada.' };
  if (tarjeta.saldo < total) return { error: `Saldo insuficiente. Necesitas $${total.toLocaleString('es-CO')} y tienes $${tarjeta.saldo.toLocaleString('es-CO')}.` };

  // Descontar saldo
  const { error: errSaldo } = await client
    .from('tarjetas')
    .update({ saldo: tarjeta.saldo - total })
    .eq('id', tarjeta_id);

  if (errSaldo) return { error: 'Error al procesar el pago: ' + errSaldo.message };

  // Crear registro de compra
  const numero_factura = 'FAC-' + Date.now();
  const { data: compra, error: errC } = await client
    .from('compras')
    .insert([{
      usuario_id:      sesion.id,
      tarjeta_id,
      items:           JSON.stringify(items),
      subtotal,
      costo_envio,
      total,
      direccion_envio,
      numero_factura,
      estado:          'en_preparacion',
      tiempo_entrega,
    }])
    .select('id')
    .single();

  if (errC) return { error: 'Error al registrar la compra: ' + errC.message };

  // Descontar stock real
  for (const item of items) {
    await client.rpc('decrementar_stock', { libro_id: item.id, cantidad: item.cantidad });
  }

  return {
    ok: true,
    compra_id:     compra.id,
    numero_factura,
    subtotal,
    costo_envio,
    total,
    tiempo_entrega,
    titular:       tarjeta.nombre_titular,
    direccion_envio,
    items,
  };
}

async function cancelarCompra(compraId) {
  const { data: compra, error } = await client
    .from('compras')
    .select('items, total, tarjeta_id, estado')
    .eq('id', compraId)
    .single();

  if (error || !compra) return { error: 'Compra no encontrada.' };
  if (compra.estado === 'entregado') return { error: 'No se puede cancelar una compra ya entregada.' };
  if (compra.estado === 'cancelada') return { error: 'Esta compra ya fue cancelada.' };

  // Reembolsar a tarjeta
  const { data: tarjeta } = await client.from('tarjetas').select('saldo').eq('id', compra.tarjeta_id).single();
  if (tarjeta) {
    await client.from('tarjetas').update({ saldo: tarjeta.saldo + compra.total }).eq('id', compra.tarjeta_id);
  }

  // Devolver stock
  const items = JSON.parse(compra.items);
  for (const item of items) {
    await client.rpc('incrementar_stock', { libro_id: item.id, cantidad: item.cantidad });
  }

  const { error: err2 } = await client
    .from('compras')
    .update({ estado: 'cancelada' })
    .eq('id', compraId);

  return err2 ? { error: err2.message } : { ok: true };
}

// ── GENERAR FACTURA HTML (para imprimir / descargar) ──────────

function generarFacturaHTML(datos) {
  const fecha = new Date().toLocaleDateString('es-CO', { year:'numeric', month:'long', day:'numeric' });
  const filas = datos.items.map(i =>
    `<tr>
      <td style="padding:8px 12px;">${i.titulo}</td>
      <td style="padding:8px 12px;text-align:center;">${i.cantidad}</td>
      <td style="padding:8px 12px;text-align:right;">$${(i.precio * i.cantidad).toLocaleString('es-CO')}</td>
    </tr>`
  ).join('');

  return `
<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
<title>Factura ${datos.numero_factura}</title>
<style>
  body { font-family: Arial, sans-serif; max-width: 680px; margin: 40px auto; color: #1e1a17; }
  .head { background: #b83227; color: #fff; padding: 24px 32px; border-radius: 12px 12px 0 0; }
  .head h1 { margin:0; font-size:1.4rem; }
  .head p  { margin:4px 0 0; opacity:.8; font-size:.85rem; }
  .body { border: 1px solid #e8ddd4; border-top:none; padding: 28px 32px; border-radius: 0 0 12px 12px; }
  table { width:100%; border-collapse:collapse; margin-bottom:20px; }
  thead { background:#faf6f1; }
  th { padding:10px 12px; text-align:left; font-size:.78rem; text-transform:uppercase; color:#6b5e55; }
  td { border-top: 1px solid #f0e8de; font-size:.9rem; }
  .totals td { border:none; font-size:.9rem; }
  .grand { font-size:1.1rem; font-weight:700; color:#b83227; }
  .info { background:#faf6f1; border-radius:10px; padding:16px 20px; margin-bottom:20px; font-size:.88rem; line-height:1.7; }
  .footer { text-align:center; font-size:.75rem; color:#6b5e55; margin-top:24px; }
</style></head><body>
<div class="head">
  <h1>📚 Librería Pereira</h1>
  <p>Factura de venta electrónica · ${datos.numero_factura}</p>
</div>
<div class="body">
  <div class="info">
    <strong>Fecha:</strong> ${fecha}<br>
    <strong>Titular:</strong> ${datos.titular}<br>
    <strong>Dirección de entrega:</strong> ${datos.direccion_envio}<br>
    <strong>Tiempo estimado de entrega:</strong> ${datos.tiempo_entrega}
  </div>
  <table>
    <thead><tr><th>Libro</th><th style="text-align:center;">Cant.</th><th style="text-align:right;">Subtotal</th></tr></thead>
    <tbody>${filas}</tbody>
  </table>
  <table class="totals">
    <tr><td>Subtotal</td><td style="text-align:right;">$${datos.subtotal.toLocaleString('es-CO')}</td></tr>
    <tr><td>Costo de envío</td><td style="text-align:right;">$${datos.costo_envio.toLocaleString('es-CO')}</td></tr>
    <tr class="grand"><td>TOTAL</td><td style="text-align:right;">$${datos.total.toLocaleString('es-CO')}</td></tr>
  </table>
  <p class="footer">Librería Pereira &copy; 2026 · Ley 1581 de 2012 · Política de devoluciones: 8 días hábiles</p>
</div>
</body></html>`;
}

function imprimirFactura(datos) {
  const win = window.open('', '_blank');
  win.document.write(generarFacturaHTML(datos));
  win.document.close();
  win.print();
}