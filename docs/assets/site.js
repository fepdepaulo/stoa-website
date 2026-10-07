(function () {
  'use strict';
  var menu = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  var english = document.documentElement.lang === 'en';
  if (menu && nav) {
    nav.id = 'main-navigation';
    menu.setAttribute('aria-controls', nav.id);
    menu.addEventListener('click', function () {
      var opened = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(opened));
      menu.setAttribute('aria-label', english ? (opened ? 'Close menu' : 'Open menu') : (opened ? 'Fechar menu' : 'Abrir menu'));
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        var wasOpen = nav.classList.contains('open');
        nav.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
        nav.querySelectorAll('details[open]').forEach(function (item) { item.open = false; });
        if (wasOpen) menu.focus();
      }
    });
  }
  document.querySelectorAll('.language-switch a').forEach(function (link) {
    link.addEventListener('click', function () {
      try { localStorage.setItem('stoa-language', link.dataset.lang); } catch (_) {}
    });
  });
  if (document.body.dataset.route === '/' && !english && !document.referrer) {
    try {
      if (localStorage.getItem('stoa-language') === 'en') {
        window.location.replace('/stoa-website/en/');
      }
    } catch (_) {}
  }
}());
