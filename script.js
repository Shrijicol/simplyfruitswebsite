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
