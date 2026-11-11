(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuButton && nav) {
    const closeMenu = () => { nav.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); };
    menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open); });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
    window.matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  }
  document.querySelectorAll('[data-language]').forEach(link => {
    link.addEventListener('click', () => { const url = new URL(link.href); url.hash = location.hash; link.href = url.href; });
  });
  const form = document.querySelector('#inquiry-form');
  if (!form) return;
  const es = document.documentElement.lang === 'es';
  const fallback = document.querySelector('#email-fallback');
  const copy = document.querySelector('#copy-inquiry');
  const status = document.querySelector('#inquiry-status');
  const openEmail = document.querySelector('#open-email');
  let prepared = '';
  document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => { form.elements.service.value = link.dataset.service; }));
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const labels = es ? ['Nombre', 'Email', 'Empresa / sitio web', 'Servicio', 'Presupuesto mensual de publicidad', 'Objetivo'] : ['Name', 'Email', 'Business / website', 'Service', 'Monthly advertising budget', 'Goal'];
    const keys = ['name', 'email', 'business', 'service', 'budget', 'goal'];
    prepared = (es ? 'Hola Aaron,\n\nMe gustaría conversar sobre mi negocio.\n\n' : 'Hi Aaron,\n\nI would like to discuss my business.\n\n') + keys.map((key, i) => `${labels[i]}: ${d.get(key) || (es ? 'Por definir' : 'To discuss')}`).join('\n');
    const subject = es ? 'Consulta sobre servicios de Keystone Growth' : 'Keystone Growth service inquiry';
    const href = `mailto:aaron@keystonegrowth.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(prepared)}`;
    openEmail.href = href;
    const submit = form.querySelector('[type=submit]');
    if (submit.disabled) return;
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    fallback.hidden = true;
    status.textContent = es ? 'Enviando tu consulta…' : 'Sending your inquiry…';
    try {
      const response = await fetch(form.action, {method: 'POST', body: d, headers: {'Accept': 'application/json'}, signal: AbortSignal.timeout(15000)});
      if (!response.ok) throw new Error('Submission was not accepted');
      status.textContent = es ? 'Tu consulta fue recibida. Gracias por escribir; Aaron te responderá por correo.' : 'Your inquiry was received. Thanks for reaching out; Aaron will reply by email.';
      form.reset();
    } catch {
      fallback.hidden = false;
      status.textContent = es ? 'No pudimos confirmar el envío. Podés enviarla por correo o copiarla. Si el envío falló por conexión, revisá antes de volver a intentarlo para evitar duplicados.' : 'We could not confirm delivery. You can email or copy your inquiry instead. If the connection timed out, check before retrying to avoid duplicates.';
      openEmail.focus();
    } finally {
      submit.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
  copy.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(prepared); status.textContent = es ? 'Texto copiado. Pegalo en un correo a aaron@keystonegrowth.org.' : 'Text copied. Paste it into an email to aaron@keystonegrowth.org.'; }
    catch { const area = document.querySelector('#inquiry-text'); area.value = prepared; area.hidden = false; area.focus(); area.select(); status.textContent = es ? 'Seleccioná y copiá el texto de abajo.' : 'Select and copy the text below.'; }
  });
})();
