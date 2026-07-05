(function () {
  'use strict';

  var STORAGE_KEY = 'lg_parent_lang';

  function getLanguage() {
    return document.documentElement.lang || localStorage.getItem(STORAGE_KEY) || 'es';
  }

  function slugFromPath(path) {
    if (!path) return '';
    var clean = path.split('?')[0].split('#')[0].replace(/\/+$/, '');
    var parts = clean.replace(/^\/+/, '').split('/');
    if (parts[0] === 'aprende' && parts.length > 1) return parts[parts.length - 1];
    if (parts[0] === 'apoyo' && parts.length > 1) {
      return parts[parts.length - 1].replace(/\.html$/, '');
    }
    return parts[parts.length - 1] || '';
  }

  function destinationType(url) {
    if (url.indexOf('/aprende/') === 0) return 'article';
    if (url.indexOf('/apoyo/') === 0) return 'protocol';
    return 'other';
  }

  function readBodyMeta() {
    var ds = document.body.dataset;
    return {
      channel: ds.channel || 'aprende',
      content_type: ds.contentType || 'article',
      page_role: ds.pageRole || ds.contentType || 'article',
      article_slug: ds.articleSlug || '',
      article_category: ds.articleCategory || '',
      language: getLanguage(),
      protocol: ds.protocol || 'general'
    };
  }

  function trackAprende(name, extra) {
    if (typeof window.track !== 'function') return;
    window.track(name, Object.assign({}, readBodyMeta(), extra || {}));
  }

  function initPageView() {
    trackAprende('aprende_page_view');
  }

  function initHubCards() {
    document.querySelectorAll('a.article-card[href]').forEach(function (card) {
      card.addEventListener('click', function () {
        var href = card.getAttribute('href') || '';
        trackAprende('aprende_hub_card_click', {
          destination_slug: slugFromPath(href),
          destination_url: href,
          article_category: card.getAttribute('data-category') || '',
          protocol: card.getAttribute('data-protocol') || readBodyMeta().protocol
        });
      });
    });
  }

  function initProtocolCta() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest('.cs-protocol-cta a, .cs-protocol-cta-btn');
      if (!el) return;
      trackAprende('aprende_protocol_cta_click', {
        destination_url: el.getAttribute('href') || '',
        placement: 'protocol_cta'
      });
    });
  }

  function initRelatedClicks() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest('a.rel-card');
      if (!el) return;
      var href = el.getAttribute('href') || '';
      trackAprende('aprende_related_click', {
        destination_slug: slugFromPath(href),
        destination_url: href,
        destination_type: destinationType(href)
      });
    });
  }

  function initArticleComplete() {
    if (readBodyMeta().page_role === 'hub') return;
    var root = document.querySelector('.article-shell');
    if (!root) return;

    var fired = false;

    function maybeFire() {
      if (fired) return;
      var rootHeight = root.scrollHeight;
      if (rootHeight <= 0) return;
      var rootTop = root.offsetTop;
      var scrollBottom = window.scrollY + window.innerHeight;
      var seen = scrollBottom - rootTop;
      if ((seen / rootHeight) * 100 >= 90) {
        fired = true;
        trackAprende('aprende_article_complete', { depth_pct: '90' });
        window.removeEventListener('scroll', maybeFire);
      }
    }

    window.addEventListener('scroll', maybeFire, { passive: true });
    maybeFire();
  }

  function initProtocolAprendeLinks() {
    var protocol = document.body.dataset.protocol || 'general';
    document.querySelectorAll('a.cp-aprende[href]').forEach(function (link) {
      link.addEventListener('click', function () {
        if (typeof window.track !== 'function') return;
        var href = link.getAttribute('href') || '';
        window.track('protocol_aprende_click', {
          channel: 'apoyo',
          destination_channel: 'aprende',
          protocol: protocol,
          destination_slug: slugFromPath(href),
          destination_url: href,
          language: getLanguage()
        });
      });
    });
  }

  function initShortVersionClick() {
    document.addEventListener('click', function (e) {
      var el = e.target.closest('a[href="#version-corta"]');
      if (!el) return;
      if (typeof window.track !== 'function') return;
      var meta = readBodyMeta();
      window.track('Aprende: Short Version Click', {
        article: meta.article_slug || 'rutinas-de-sueno-que-sostienen-la-noche',
        target: 'version-corta',
        location: 'article_meta',
        language: meta.language || getLanguage()
      });
    });
  }

  function initArticleProtocolCtaClicks() {
    document.addEventListener('click', function (e) {
      var crisis = e.target.closest('a.crisis-link[href="/apoyo/emotional-escalation"]');
      if (crisis) {
        if (typeof window.track !== 'function') return;
        var meta = readBodyMeta();
        window.track('Aprende: Crisis CTA Click', {
          article: meta.article_slug || 'que-hacer-en-un-berrinche',
          protocol: meta.protocol || 'emotional-escalation',
          location: 'crisis_block',
          language: meta.language || getLanguage()
        });
        return;
      }
      var cta = e.target.closest('a.cta-btn[href="/apoyo/emotional-escalation"]');
      if (!cta) return;
      if (typeof window.track !== 'function') return;
      var metaBtn = readBodyMeta();
      window.track('Aprende: Protocol CTA Click', {
        article: metaBtn.article_slug || 'que-hacer-en-un-berrinche',
        protocol: metaBtn.protocol || 'emotional-escalation',
        location: 'cta_card',
        language: metaBtn.language || getLanguage()
      });
    });
  }

  function initAprende() {
    initPageView();
    if (readBodyMeta().page_role === 'hub') initHubCards();
    initProtocolCta();
    initRelatedClicks();
    initShortVersionClick();
    initArticleProtocolCtaClicks();
    initArticleComplete();
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (document.body.dataset.channel === 'aprende') initAprende();
    if (document.querySelector('a.cp-aprende')) initProtocolAprendeLinks();
  });
})();
