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
const SESSION_TIMEOUT = 300; // 5 minutos — cómodo para demos

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

  showAlert('alertLogin', `¡Bienvenido, ${data.nombre_completo}! Redirigiendo...`, 'success');
  setTimeout(() => { window.location.href = 'index.html'; }, 1200);
}
