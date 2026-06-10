/* ============================================
   LIBRERÍA PEREIRA — Sistema de Gestión
   Paleta: Rojo ladrillo + Naranja + Crema
   Tipografía: Playfair Display + DM Sans
   ============================================ */

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

:root {
  --primario:      #b83227;
  --primario-dark: #8e2118;
  --primario-glow: rgba(184, 50, 39, 0.18);
  --secundario:    #e07520;
  --secundario-dk: #c05e10;
  --acento:        #f5c842;
  --fondo:         #faf6f1;
  --fondo-card:    #ffffff;
  --fondo-input:   #fdf9f5;
  --texto:         #1e1a17;
  --texto-suave:   #6b5e55;
  --borde:         #e8ddd4;
  --borde-focus:   #e07520;
  --sombra:        0 8px 32px rgba(100,40,20,0.10);
  --sombra-card:   0 2px 12px rgba(100,40,20,0.08);
  --radio:         14px;
  --radio-btn:     10px;
  --transicion:    0.25s cubic-bezier(.4,0,.2,1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: 'DM Sans', sans-serif;
  background-color: var(--fondo);
  color: var(--texto);
  min-height: 100vh;
  line-height: 1.6;
  /* Subtle warm grain texture */
  background-image:
    radial-gradient(ellipse 80% 60% at 70% -10%, rgba(224,117,32,0.07) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 10% 100%, rgba(184,50,39,0.05) 0%, transparent 50%);
}

/* ── SCROLLBAR ───────────────────────────── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--fondo); }
::-webkit-scrollbar-thumb { background: var(--borde); border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: var(--secundario); }

/* ── NAVEGACIÓN ──────────────────────────── */
nav {
  background: linear-gradient(135deg, var(--primario) 0%, #9b2a1f 100%);
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 20px rgba(184,50,39,0.25);
  position: sticky;
  top: 0;
  z-index: 100;
  min-height: 64px;
}

.nav-brand {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: rgba(255,255,255,0.95);
  letter-spacing: 0.02em;
  margin-right: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.nav-brand::before {
  content: '📚';
  font-size: 1.1rem;
}

nav a {
  color: rgba(255,255,255,0.82);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  padding: 7px 16px;
  border-radius: 8px;
  transition: background var(--transicion), color var(--transicion);
  letter-spacing: 0.01em;
}

nav a:hover {
  background: rgba(255,255,255,0.15);
  color: #fff;
}

nav a.active {
  background: rgba(255,255,255,0.2);
  color: #fff;
  font-weight: 600;
}

nav a.nav-cta {
  background: var(--secundario);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(224,117,32,0.35);
}

nav a.nav-cta:hover {
  background: var(--secundario-dk);
  box-shadow: 0 4px 14px rgba(224,117,32,0.4);
}

/* ── HERO BANNER (index) ─────────────────── */
.hero {
  background: linear-gradient(135deg, var(--primario-dark) 0%, var(--primario) 50%, var(--secundario) 100%);
  color: #fff;
  padding: 72px 2rem 80px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 1;
}

.hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 900;
  margin-bottom: 12px;
  text-shadow: 0 2px 20px rgba(0,0,0,0.2);
  position: relative;
}

.hero p {
  font-size: 1.05rem;
  opacity: 0.88;
  max-width: 520px;
  margin: 0 auto 28px;
  position: relative;
}

/* ── CONTENEDOR PRINCIPAL ────────────────── */
.container {
  max-width: 560px;
  margin: 48px auto;
  background: var(--fondo-card);
  padding: 44px 48px;
  border-radius: 20px;
  box-shadow: var(--sombra);
  border: 1px solid var(--borde);
  position: relative;
  overflow: hidden;
}

.container::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primario), var(--secundario));
}

.container-wide {
  max-width: 740px;
}

.container-xl {
  max-width: 960px;
}

/* ── CABECERA DE FORMULARIO ──────────────── */
.form-header {
  text-align: center;
  margin-bottom: 32px;
}

.form-header .icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--primario), var(--secundario));
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 16px;
  box-shadow: 0 4px 14px var(--primario-glow);
}

h2 {
  font-family: 'Playfair Display', serif;
  color: var(--primario);
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.subtitle {
  color: var(--texto-suave);
  font-size: 0.9rem;
  margin-bottom: 0;
}

/* ── GRUPOS DE INPUT ─────────────────────── */
.input-group {
  margin-bottom: 20px;
}

.input-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.input-row .input-group {
  flex: 1;
  min-width: 180px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 0.85rem;
  color: var(--texto-suave);
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
input[type="date"],
input[type="tel"],
select,
textarea {
  width: 100%;
  padding: 11px 14px;
  background: var(--fondo-input);
  border: 1.5px solid var(--borde);
  border-radius: var(--radio);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  color: var(--texto);
  transition: border-color var(--transicion), box-shadow var(--transicion), background var(--transicion);
  outline: none;
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--borde-focus);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(224,117,32,0.12);
}

input::placeholder { color: #bbb; }

/* Password strength indicator */
.pass-strength {
  height: 3px;
  border-radius: 99px;
  margin-top: 6px;
  background: var(--borde);
  overflow: hidden;
  transition: all var(--transicion);
}
.pass-strength-bar {
  height: 100%;
  border-radius: 99px;
  transition: width 0.4s ease, background 0.4s ease;
  width: 0%;
}

.pass-hint {
  font-size: 0.75rem;
  margin-top: 4px;
  color: var(--texto-suave);
  min-height: 18px;
}

/* ── CAPTCHA ─────────────────────────────── */
.captcha-box {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--fondo-input);
  border: 1.5px solid var(--borde);
  border-radius: var(--radio);
  padding: 12px 16px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: border-color var(--transicion), box-shadow var(--transicion);
  user-select: none;
}

.captcha-box:hover { border-color: var(--borde-focus); }

.captcha-box.verified {
  border-color: #22c55e;
  background: #f0fdf4;
}

.captcha-checkbox {
  width: 22px;
  height: 22px;
  border: 2px solid var(--borde);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all var(--transicion);
  background: #fff;
}

.captcha-box.verified .captcha-checkbox {
  background: #22c55e;
  border-color: #22c55e;
  color: #fff;
  font-size: 13px;
}

.captcha-box.loading .captcha-checkbox {
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

.captcha-label { font-size: 0.88rem; color: var(--texto-suave); flex: 1; }
.captcha-logo { font-size: 1.2rem; opacity: 0.4; }

/* ── BOTONES ─────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 13px 24px;
  border: none;
  border-radius: var(--radio-btn);
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: all var(--transicion);
  text-decoration: none;
}

.btn-primary {
  width: 100%;
  background: linear-gradient(135deg, var(--primario) 0%, var(--secundario) 100%);
  color: #fff;
  box-shadow: 0 4px 14px rgba(184,50,39,0.30);
  position: relative;
  overflow: hidden;
}

.btn-primary::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.08), transparent);
  opacity: 0;
  transition: opacity var(--transicion);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(184,50,39,0.35);
}

.btn-primary:hover::after { opacity: 1; }
.btn-primary:active { transform: translateY(0); }

.btn-secondary {
  background: transparent;
  color: var(--primario);
  border: 1.5px solid var(--primario);
}

.btn-secondary:hover {
  background: var(--primario-glow);
}

.btn-danger {
  background: #dc2626;
  color: #fff;
  box-shadow: 0 4px 12px rgba(220,38,38,0.25);
}

.btn-danger:hover {
  background: #b91c1c;
  transform: translateY(-1px);
}

/* Legacy button for compatibility */
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 13px 24px;
  background: linear-gradient(135deg, var(--primario) 0%, var(--secundario) 100%);
  color: white;
  border: none;
  border-radius: var(--radio-btn);
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(184,50,39,0.28);
  transition: all var(--transicion);
  letter-spacing: 0.01em;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(184,50,39,0.35);
}

button:active { transform: translateY(0); }

/* ── DIVIDER ─────────────────────────────── */
.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
  color: var(--texto-suave);
  font-size: 0.8rem;
}
.divider::before, .divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--borde);
}

/* ── LINKS ───────────────────────────────── */
a { color: var(--secundario); text-decoration: none; transition: color var(--transicion); }
a:hover { color: var(--primario); }

.link-muted { color: var(--texto-suave); font-size: 0.88rem; }
.link-muted a { color: var(--secundario); font-weight: 500; }

/* ── CHECKBOX CUSTOM ─────────────────────── */
.check-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 0.875rem;
  color: var(--texto-suave);
  cursor: pointer;
  line-height: 1.5;
  font-weight: normal;
}

.check-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--primario);
  flex-shrink: 0;
  margin-top: 2px;
  cursor: pointer;
}

/* ── TOGGLE SWITCH ───────────────────────── */
.toggle-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toggle {
  position: relative;
  width: 44px;
  height: 24px;
  flex-shrink: 0;
}

.toggle input { opacity: 0; width: 0; height: 0; }

.toggle-slider {
  position: absolute;
  inset: 0;
  background: var(--borde);
  border-radius: 99px;
  cursor: pointer;
  transition: background var(--transicion);
}

.toggle-slider::before {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  left: 3px;
  top: 3px;
  background: #fff;
  border-radius: 50%;
  transition: transform var(--transicion);
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
}

.toggle input:checked + .toggle-slider { background: var(--primario); }
.toggle input:checked + .toggle-slider::before { transform: translateX(20px); }

/* ── BADGES ──────────────────────────────── */
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.badge-red { background: rgba(184,50,39,0.1); color: var(--primario); }
.badge-orange { background: rgba(224,117,32,0.12); color: var(--secundario-dk); }
.badge-green { background: rgba(34,197,94,0.1); color: #16a34a; }

/* ── CARD / PERFIL ───────────────────────── */
.profile-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: linear-gradient(135deg, var(--primario-dark), var(--primario));
  color: #fff;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 28px;
  box-shadow: 0 8px 24px var(--primario-glow);
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  flex-shrink: 0;
  border: 3px solid rgba(255,255,255,0.3);
}

.profile-info h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  margin-bottom: 2px;
}

.profile-info p {
  font-size: 0.85rem;
  opacity: 0.8;
}

/* ── SECTION TABS ────────────────────────── */
.tabs {
  display: flex;
  gap: 4px;
  background: var(--fondo);
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 28px;
  border: 1px solid var(--borde);
}

.tab-btn {
  flex: 1;
  padding: 9px 16px;
  border-radius: 9px;
  border: none;
  background: transparent;
  color: var(--texto-suave);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transicion);
  box-shadow: none;
  width: auto;
}

.tab-btn.active {
  background: #fff;
  color: var(--primario);
  font-weight: 600;
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
}

/* ── ALERT / TOAST ───────────────────────── */
.alert {
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.875rem;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.alert-error { background: #fef2f2; color: #dc2626; border-left: 3px solid #dc2626; }
.alert-success { background: #f0fdf4; color: #16a34a; border-left: 3px solid #22c55e; }
.alert-info { background: #eff6ff; color: #2563eb; border-left: 3px solid #3b82f6; }

/* ── MODAL ───────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(30,10,5,0.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.modal {
  background: #fff;
  border-radius: 20px;
  padding: 36px;
  max-width: 420px;
  width: 90%;
  box-shadow: 0 24px 60px rgba(0,0,0,0.2);
  animation: modalIn 0.3s cubic-bezier(.34,1.56,.64,1);
}

@keyframes modalIn {
  from { opacity: 0; transform: scale(0.9); }
  to   { opacity: 1; transform: scale(1); }
}

.modal h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: var(--primario);
  margin-bottom: 10px;
}

.modal p { color: var(--texto-suave); font-size: 0.9rem; margin-bottom: 24px; }

.modal-actions { display: flex; gap: 12px; }
.modal-actions button, .modal-actions .btn { flex: 1; width: auto; }

/* ── FOOTER ──────────────────────────────── */
footer {
  text-align: center;
  padding: 32px 2rem;
  color: var(--texto-suave);
  font-size: 0.8rem;
  border-top: 1px solid var(--borde);
  margin-top: 48px;
}

footer strong { color: var(--primario); }

/* ── LOADING SPINNER ─────────────────────── */
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}

/* ── SESSION TIMER ───────────────────────── */
.session-bar {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #fff;
  border: 1px solid var(--borde);
  border-radius: 12px;
  padding: 10px 16px;
  font-size: 0.78rem;
  color: var(--texto-suave);
  box-shadow: var(--sombra-card);
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 50;
  transition: all var(--transicion);
}

.session-bar.warn {
  border-color: #f59e0b;
  color: #d97706;
  background: #fffbeb;
}

.session-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  flex-shrink: 0;
}

.session-bar.warn .session-dot {
  background: #f59e0b;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

/* ── RESPONSIVE ──────────────────────────── */
@media (max-width: 600px) {
  .container { padding: 28px 20px; margin: 20px 12px; border-radius: 16px; }
  nav { padding: 0 1rem; gap: 4px; }
  .nav-brand { font-size: 1rem; }
  nav a { padding: 6px 10px; font-size: 0.8rem; }
  .input-row { flex-direction: column; gap: 0; }
}






















