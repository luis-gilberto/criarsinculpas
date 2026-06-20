(function () {
  'use strict';

  window.plausible = window.plausible || function () {
    (window.plausible.q = window.plausible.q || []).push(arguments);
  };

  function getProtocol() {
    return (document.body && document.body.dataset.protocol) || 'general';
  }

  window.track = function (name, props) {
    if (!window.plausible) return;
    window.plausible(name, {
      props: Object.assign(
        { protocol: getProtocol() },
        props || {}
      )
    });
  };

  function mergeInitOptions(existing) {
    var base = existing || {};
    var prev = base.customProperties;
    return Object.assign({}, base, {
      customProperties: function (eventName) {
        var merged = { protocol: getProtocol() };
        if (typeof prev === 'function') {
          Object.assign(merged, prev(eventName) || {});
        }
        return merged;
      }
    });
  }

  function tryInit() {
    if (typeof window.plausible.init !== 'function') return false;
    var prior = window.plausible._trackInitOptions || {};
    window.plausible.init(mergeInitOptions(prior));
    window.plausible._trackInitOptions = mergeInitOptions(prior);
    return true;
  }

  if (!tryInit()) {
    var attempts = 0;
    var timer = setInterval(function () {
      if (tryInit() || ++attempts > 50) clearInterval(timer);
    }, 100);
  }
})();
