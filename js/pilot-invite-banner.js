(function () {
  'use strict';

  /* Test A2 only — contextual discovery on apoyo guides. Default OFF during Test A. */
  var PILOT_BANNER_ENABLED = false;

  var DISMISS_KEY = 'csc_pilot_01_banner_dismissed';
  var PILOT_PATH = '/portal/piloto/pantallas-desbordes/';

  var COPY = {
    es: {
      eyebrow: 'El Estudio · Prueba privada',
      text: '¿Apagar la pantalla se está volviendo una batalla? Estamos probando una experiencia breve para acompañarte mejor.',
      note: 'Prueba privada. No es terapia.',
      cta: 'Probar (5–8 min)',
      dismiss: 'Cerrar aviso'
    },
    en: {
      eyebrow: 'El Estudio · Private test',
      text: 'Is turning off the screen becoming a battle? We are testing a short experience to support you better.',
      note: 'Private test. Not therapy.',
      cta: 'Try it (5–8 min)',
      dismiss: 'Dismiss notice'
    }
  };

  function getLang() {
    try {
      var stored = localStorage.getItem('lg_parent_lang');
      if (stored === 'en' || stored === 'es') return stored;
    } catch (e) {}
    try {
      var nav = (navigator.language || 'es').toLowerCase();
      return nav.indexOf('en') === 0 ? 'en' : 'es';
    } catch (e2) {
      return 'es';
    }
  }

  function isDismissed() {
    try {
      return localStorage.getItem(DISMISS_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch (e) {}
  }

  function track(name, props) {
    if (typeof window.track === 'function') {
      window.track(name, props || {});
    } else if (window.plausible) {
      window.plausible(name, { props: props || {} });
    }
  }

  function isBannerEnabled(host) {
    if (PILOT_BANNER_ENABLED) return true;
    if (host && host.getAttribute('data-pilot-banner-enabled') === '1') return true;
    try {
      return new URLSearchParams(location.search).get('pilot_banner') === '1';
    } catch (e) {
      return false;
    }
  }

  function mount() {
    var host = document.getElementById('pilot-invite-banner-host');
    if (!host || !isBannerEnabled(host) || isDismissed()) return;

    var src = host.getAttribute('data-src') || 'pantallas';
    var lang = getLang();
    var t = COPY[lang] || COPY.es;
    var href = PILOT_PATH + '?src=' + encodeURIComponent(src);

    var banner = document.createElement('aside');
    banner.className = 'pilot-invite-banner';
    banner.id = 'pilot-invite-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', t.eyebrow);
    banner.innerHTML =
      '<div class="pilot-invite-banner__inner">' +
        '<div class="pilot-invite-banner__copy">' +
          '<p class="pilot-invite-banner__eyebrow">' + t.eyebrow + '</p>' +
          '<p class="pilot-invite-banner__text">' + t.text +
            '<span class="pilot-invite-banner__note">' + t.note + '</span>' +
          '</p>' +
        '</div>' +
        '<div class="pilot-invite-banner__actions">' +
          '<a class="pilot-invite-banner__cta" href="' + href + '" data-pilot-banner-cta="1">' + t.cta + '</a>' +
          '<button type="button" class="pilot-invite-banner__dismiss" aria-label="' + t.dismiss + '" data-pilot-banner-dismiss="1">×</button>' +
        '</div>' +
      '</div>';

    host.appendChild(banner);
    track('pilot_banner_view', { pilot: 'pantallas-desbordes', source: src, placement: host.getAttribute('data-placement') || 'apoyo' });

    banner.querySelector('[data-pilot-banner-cta]').addEventListener('click', function () {
      track('pilot_banner_click', { pilot: 'pantallas-desbordes', source: src, placement: host.getAttribute('data-placement') || 'apoyo' });
    });

    banner.querySelector('[data-pilot-banner-dismiss]').addEventListener('click', function () {
      dismiss();
      track('pilot_banner_dismiss', { pilot: 'pantallas-desbordes', source: src, placement: host.getAttribute('data-placement') || 'apoyo' });
      banner.hidden = true;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
