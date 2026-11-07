const gate = document.getElementById('access-gate');
const shell = document.getElementById('site-shell');
const form = document.getElementById('access-form');
const password = document.getElementById('access-password');
const error = document.getElementById('access-error');
const toggle = document.getElementById('access-toggle');
const loader = document.getElementById('access-loader');

function openSite() {
  gate.remove();
  shell.hidden = false;
  const app = document.createElement('script');
  app.type = 'module';
  app.src = loader.dataset.app;
  app.onerror = () => {
    try { localStorage.removeItem('bamaire-site-access'); } catch {}
    shell.hidden = true;
    window.location.reload();
  };
  document.body.append(app);
}

try {
  if (localStorage.getItem('bamaire-site-access') === 'granted') openSite();
} catch {}

toggle.addEventListener('click', () => {
  const visible = password.type === 'password';
  password.type = visible ? 'text' : 'password';
  toggle.setAttribute('aria-pressed', String(visible));
  toggle.setAttribute('aria-label', visible ? 'Ocultar contraseña' : 'Mostrar contraseña');
  password.focus();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (password.value === 'bamaire') {
    try { localStorage.setItem('bamaire-site-access', 'granted'); } catch {}
    openSite();
    return;
  }
  error.hidden = false;
  password.setAttribute('aria-invalid', 'true');
  password.select();
});

password.addEventListener('input', () => {
  error.hidden = true;
  password.removeAttribute('aria-invalid');
});
