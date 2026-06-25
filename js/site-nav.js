(function () {
  'use strict';

  var ham = document.getElementById('ham');
  var mobileNav = document.getElementById('mobileNav');
  if (!ham || !mobileNav) return;

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
})();
