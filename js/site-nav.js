(function () {
  'use strict';

  var LANG_KEY = 'lg_parent_lang';
  var LOGO_URL = 'https://res.cloudinary.com/dogtoagya/image/upload/v1779932690/csc-logo_gbsmxq.svg';

  var NAV_LINKS = [
    { id: 'inicio', href: '/', i18n: 'nav_inicio', i18nM: 'nav_inicio_m', es: 'Inicio', en: 'Home' },
    { id: 'guias', href: '/apoyo/', i18n: 'nav_guias', i18nM: 'nav_guias_m', es: 'Guías', en: 'Guides' },
    { id: 'metodo', href: '/metodo/', i18n: 'nav_metodo', i18nM: 'nav_metodo_m', es: 'El Método', en: 'The Method' },
    { id: 'inscripcion', href: '/inscripcion/', i18n: 'nav_inscripcion', i18nM: 'nav_inscripcion_m', es: 'Inscripciones', en: 'Early Access' },
    { id: 'sobre-nari', href: '/sobre-nari/', i18n: 'nav_nari', i18nM: 'nav_nari_m', es: 'Sobre Nari', en: 'About Nari' }
  ];

  var SOON_LINKS = [
    { i18n: 'nav_aprende', i18nM: 'nav_aprende_m', es: 'Aprende', en: 'Learn' },
    { i18n: 'nav_comunidad', i18nM: 'nav_comunidad_m', es: 'Comunidad', en: 'Community' }
  ];

  var HAM_SVG =
    '<svg class="bars" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>' +
    '<svg class="x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  function getLang() {
    try {
      return localStorage.getItem(LANG_KEY) || 'es';
    } catch (e) {
      return 'es';
    }
  }

  function applyNavLang(lang) {
    document.querySelectorAll('#site-nav [data-es]').forEach(function (el) {
      var v = el.getAttribute('data-' + lang);
      if (v !== null) el.innerHTML = v;
    });
    document.querySelectorAll('#site-nav .lang button').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
  }

  function buildDesktopLink(item, activeId) {
    var active = item.id === activeId ? ' class="active" aria-current="page"' : '';
    return (
      '<li><a href="' + item.href + '" data-nav="' + item.id + '"' + active +
      ' data-i18n="' + item.i18n + '" data-es="' + item.es + '" data-en="' + item.en + '">' +
      item.es + '</a></li>'
    );
  }

  function buildSoonDesktopLink(item) {
    return (
      '<li><a href="#" aria-disabled="true" data-nav="' + item.i18n + '">' +
      '<span data-i18n="' + item.i18n + '" data-es="' + item.es + '" data-en="' + item.en + '">' + item.es + '</span>' +
      '<span class="soon-tag" data-i18n="soon" data-es="Pronto" data-en="Soon">Pronto</span></a></li>'
    );
  }

  function buildMobileLink(item, activeId, mobile) {
    var active = item.id === activeId ? ' class="active" aria-current="page"' : '';
    var i18nKey = mobile ? item.i18nM : item.i18n;
    return (
      '<a href="' + item.href + '" data-nav="' + item.id + '"' + active +
      ' data-i18n="' + i18nKey + '" data-es="' + item.es + '" data-en="' + item.en + '">' +
      item.es + '</a>'
    );
  }

  function buildSoonMobileLink(item, mobile) {
    var i18nKey = mobile ? item.i18nM : item.i18n;
    return (
      '<a href="#" aria-disabled="true" data-nav="' + i18nKey + '">' +
      '<span data-i18n="' + i18nKey + '" data-es="' + item.es + '" data-en="' + item.en + '">' + item.es + '</span>' +
      '<span class="soon-tag" data-i18n="soon" data-es="Pronto" data-en="Soon">Pronto</span></a>'
    );
  }

  function buildLangPill() {
    return (
      '<div class="lang" role="group" aria-label="Idioma">' +
      '<button data-lang="es" aria-pressed="true">ES</button>' +
      '<button data-lang="en" aria-pressed="false">EN</button>' +
      '</div>'
    );
  }

  function buildNavMarkup(activeId) {
    var desktopLinks = NAV_LINKS.map(function (item) {
      return buildDesktopLink(item, activeId);
    }).join('');
    SOON_LINKS.forEach(function (item) {
      desktopLinks += buildSoonDesktopLink(item);
    });

    var mobileLinks = NAV_LINKS.map(function (item) {
      return buildMobileLink(item, activeId, true);
    }).join('');
    SOON_LINKS.forEach(function (item) {
      mobileLinks += buildSoonMobileLink(item, true);
    });

    return (
      '<header class="nav">' +
      '<nav class="nav-inner" role="navigation" aria-label="Navegación principal">' +
      '<a href="/" class="nav-logo" aria-label="Criar Sin Culpas">' +
      '<img src="' + LOGO_URL + '" alt="Criar Sin Culpas"></a>' +
      '<ul class="nav-links">' + desktopLinks + '</ul>' +
      '<div class="nav-right">' + buildLangPill() +
      '<button class="ham" id="ham" aria-label="Menú" aria-expanded="false">' + HAM_SVG + '</button>' +
      '</div></nav></header>' +
      '<div class="mobile-nav" id="mobileNav" role="dialog" aria-modal="true" aria-label="Menú">' +
      mobileLinks + buildLangPill() +
      '</div>'
    );
  }

  var drawerBound = false;

  function initDrawer() {
    var ham = document.getElementById('ham');
    var mobileNav = document.getElementById('mobileNav');
    if (!ham || !mobileNav || drawerBound) return;
    drawerBound = true;

    ham.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      ham.classList.toggle('open', isOpen);
      ham.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        ham.classList.remove('open');
        ham.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  function initLangToggle() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('#site-nav .lang button');
      if (!btn) return;
      var lang = btn.getAttribute('data-lang');
      try {
        localStorage.setItem(LANG_KEY, lang);
      } catch (err) {}
      document.documentElement.lang = lang;
      applyNavLang(lang);
    });
  }

  function injectNav() {
    var mount = document.getElementById('site-nav');
    if (!mount) {
      initDrawer();
      return false;
    }
    if (mount.getAttribute('data-nav-injected') === '1') {
      initDrawer();
      return true;
    }

    var activeId = mount.getAttribute('data-active') || '';
    mount.innerHTML = buildNavMarkup(activeId);
    mount.setAttribute('data-nav-injected', '1');
    applyNavLang(getLang());
    initDrawer();
    return true;
  }

  function boot() {
    injectNav();
  }

  initLangToggle();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

try {
  console.log('%cCriar Sin Culpas', 'font:600 22px Georgia,serif;color:#243246');
  console.log('%cDisenado y construido por LG Studio · Luis Gilberto\nhttps://luis-gilberto.com', 'color:#9E5F53;font-size:13px;line-height:1.6');
} catch (e) {}
