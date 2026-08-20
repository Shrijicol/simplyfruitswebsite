// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteHeader = document.getElementById('siteHeader');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteHeader.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// Location tabs
const tabs = document.querySelectorAll('.loc-tab');
const panels = document.querySelectorAll('.loc-panel');

function activateTab(name) {
  tabs.forEach(t => {
    const active = t.dataset.tab === name;
    t.setAttribute('aria-selected', active ? 'true' : 'false');
  });
  panels.forEach(p => {
    p.classList.toggle('is-active', p.id === `panel-${name}`);
  });
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    activateTab(tab.dataset.tab);
    history.replaceState(null, '', `#${tab.dataset.tab}`);
  });
});

// Support deep links: locations.html#yardley
if (tabs.length) {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'yardley' || hash === 'jenkintown') {
    activateTab(hash);
  }
}

// Scroll reveal (Apple-style fade/slide-up on scroll into view)
const revealEls = document.querySelectorAll('.reveal, .reveal-scale, .reveal-group');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -80px 0px' });

  revealEls.forEach(el => observer.observe(el));
}
