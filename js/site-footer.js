(function () {
  'use strict';

  var LANG_KEY = 'lg_parent_lang';

  function getLang() {
    try {
      return localStorage.getItem(LANG_KEY) || 'es';
    } catch (e) {
      return 'es';
    }
  }

  function buildFooterMarkup() {
    return (
      '<footer class="site-footer" role="contentinfo">' +
        '<div class="foot-grid">' +
          '<div class="foot-brand">' +
            '<div class="b1">CRIAR</div>' +
            '<div class="b2">sin culpas</div>' +
            '<p data-i18n="foot_tag" data-es="Un espacio de apoyo emocional para padres que quieren criar con conexión, no con culpa." data-en="An emotional support space for parents who want to raise with connection, not guilt.">Un espacio de apoyo emocional para padres que quieren criar con conexión, no con culpa.</p>' +
          '</div>' +
          '<div class="foot-col">' +
            '<div class="h" data-i18n="foot_nav" data-es="Navegación" data-en="Navigation">Navegación</div>' +
            '<ul>' +
              '<li><a href="/" data-i18n="nav_inicio_f" data-es="Inicio" data-en="Home">Inicio</a></li>' +
              '<li><a href="/apoyo/" data-i18n="nav_guias_f" data-es="Guías" data-en="Guides">Guías</a></li>' +
              '<li><a href="/metodo/" data-i18n="nav_metodo_f" data-es="El Método" data-en="The Method">El Método</a></li>' +
              '<li><a href="/sobre-nari/" data-i18n="nav_nari_f" data-es="Sobre Nari" data-en="About Nari">Sobre Nari</a></li>' +
              '<li><a href="/aprende/" data-i18n="nav_aprende_f" data-es="Aprende" data-en="Learn">Aprende</a></li>' +
              '<li class="is-soon"><span class="foot-label" data-i18n="nav_comunidad_f" data-es="Comunidad" data-en="Community">Comunidad</span><span class="soon-tag" data-i18n="soon" data-es="Pronto" data-en="Soon">Pronto</span></li>' +
            '</ul>' +
          '</div>' +
          '<div class="foot-col">' +
            '<div class="h" data-i18n="foot_legal" data-es="Legal" data-en="Legal">Legal</div>' +
            '<ul>' +
              '<li><a href="/privacidad" data-i18n="foot_priv" data-es="Política de Privacidad" data-en="Privacy Policy">Política de Privacidad</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="foot-col foot-col-end">' +
            '<div class="h" data-i18n="foot_follow" data-es="Síguenos" data-en="Follow us">Síguenos</div>' +
            '<div class="foot-social">' +
              '<a href="https://instagram.com/criarsinculpas" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>' +
              '<a href="mailto:hola@criarsinculpas.com" aria-label="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg></a>' +
            '</div>' +
            '<p class="foot-credit"><span data-es="Fotografía" data-en="Photography">Fotografía</span> · <a href="https://www.instagram.com/sharnay_photography/" target="_blank" rel="noopener noreferrer">SHARNAY PHOTOGRAPHY</a></p>' +
          '</div>' +
        '</div>' +
        '<div class="foot-bottom">' +
          '<div class="foot-bottom-inner">' +
            '<span data-i18n="foot_copy" data-es="© 2026 Criar Sin Culpas. Todos los derechos reservados." data-en="© 2026 Criar Sin Culpas. All rights reserved.">© 2026 Criar Sin Culpas. Todos los derechos reservados.</span>' +
            '<span data-i18n="foot_med" data-es="Esto no reemplaza orientación médica o profesional." data-en="This does not replace medical or professional guidance.">Esto no reemplaza orientación médica o profesional.</span>' +
          '</div>' +
        '</div>' +
      '</footer>'
    );
  }

  function applyFooterLang(lang) {
    document.querySelectorAll('#site-footer [data-es]').forEach(function (el) {
      var v = el.getAttribute('data-' + lang);
      if (v !== null) el.innerHTML = v;
    });
  }

  function initLangToggle() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.lang button');
      if (!btn) return;
      applyFooterLang(btn.getAttribute('data-lang') || getLang());
    });
  }

  function injectFooter() {
    var mount = document.getElementById('site-footer');
    if (!mount) return false;
    if (mount.getAttribute('data-footer-injected') === '1') return true;

    mount.innerHTML = buildFooterMarkup();
    mount.setAttribute('data-footer-injected', '1');
    applyFooterLang(getLang());
    return true;
  }

  function boot() {
    injectFooter();
  }

  initLangToggle();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
