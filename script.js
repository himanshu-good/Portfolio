/* ============================
   script.js — Portfolio Behavior
   ============================ */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- PRELOADER ---------- */
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    if (preloader) { preloader.classList.add('hidden'); preloader.style.display = 'none'; }
  }, 550);

  /* ---------- YEAR ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- THEME TOGGLE ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') document.body.classList.add('dark');
  themeToggle && themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  });

  /* ---------- MOBILE MENU ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!open));
      mobileMenu.style.display = open ? 'none' : 'flex';
      mobileMenu.setAttribute('aria-hidden', String(open));
    });
    document.querySelectorAll('.mobile-link').forEach(a => a.addEventListener('click', () => {
      mobileMenu.style.display = 'none';
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ---------- SMOOTH SCROLL for internal links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (mobileMenu && window.getComputedStyle(mobileMenu).display === 'flex') {
          mobileMenu.style.display = 'none';
        }
      }
    });
  });

  /* ---------- SAMPLE PROJECTS DATA ---------- */
  const projects = [
    {
      id: 'p1',
      title: 'Portfolio Website',
      subtitle: 'Personal branding & projects',
      desc: 'A modern portfolio built with performance and accessibility in mind. Responsive, fast and lightweight.',
      tags: ['web','ui'],
      images: [
        'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2023/03/How-to-Make-a-Portfolio-in-8-Steps-Tips-to-Attract-More-Clients-1536x894-1-1024x596.png', placeholderImg('UI')],
      live: '#',
      code: '#'
    },
    {
      id: 'p2',
      title: 'Landing-page-culture-website-',
      subtitle: 'Modern look and animation effects.',
      desc: 'modern landing page with 🔄 synced vertical & horizontal scrolling, built using 🏗️ HTML 🖌️ CSS ⚡ JavaScript. 🚀 Smooth, 🎭 interactive, and 🎨 creative!.',
      tags: ['web','tool'],
      images: ['https://i0.wp.com/www.authormedia.com/wp-content/uploads/2019/08/Depositphotos_87993688_xl-2015-scaled.jpg?fit=2560%2C1608&ssl=1', placeholderImg('Product')],
      live: 'https://himanshu-good.github.io/Landing-page-culture-website-/',
      code: '#'
    },
    {
      id: 'p3',
      title: 'my-portfolio',
      subtitle: '',
      desc: 'Made by using HTML, CSS and Javascript.',
      tags: ['tool','ui'],
      images: ['https://img.freepik.com/premium-vector/black-white-monoline-typedriven-portfolio-cover-page-template-design_525160-1341.jpg', placeholderImg('Players')],
      live: 'https://himanshu-good.github.io/my-portfolio/',
      code: '#'
    },
    {
      id: 'p4',
      title: 'Stone-Paper-Scissors-Dynamic-Game',
      subtitle: 'Playing with computer',
      desc: 'A fun Stone, Paper, Scissors game 🎮 built with HTML, CSS & JavaScript. Features ⏳ game timer, 📊 real-time score tracking, 🔄 dynamic updates, and 🎉 automatic result display. Play & enjoy! 🚀.',
      tags: ['tool','ui'],
      images: ['https://www.shutterstock.com/image-vector/rock-paper-scissors-hand-sign-260nw-1996509359.jpg', placeholderImg('Players')],
      live: 'https://himanshu-good.github.io/Stone-Paper-Scissors-Dynamic-Game/',
      code: '#'
    }
  ];

  function placeholderImg(text) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='700'><defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='#6ee7b7'/><stop offset='1' stop-color='#60a5fa'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)' /><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Inter, Arial' font-size='48' fill='rgba(255,255,255,0.95)'>${text}</text></svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  /* ---------- RENDER PROJECTS ---------- */
  const grid = document.getElementById('projectsGrid');
  function renderProjects(list) {
    if (!grid) return;
    grid.innerHTML = '';
    list.forEach((p, i) => {
      const card = document.createElement('article');
      card.className = 'project-card fade-in';
      card.setAttribute('tabindex','0');
      card.dataset.id = p.id;
      card.innerHTML = `
        <div class="project-media"><img src= "${p.images[0]}" alt="${p.title} preview" style="width:100%;height:100%;object-fit:cover;border-radius:8px" /></div>
        <div class="project-meta">
          <h3>${p.title}</h3>
          <div class="muted small">${p.subtitle}</div>
          <div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        </div>
      `;
      card.addEventListener('click', ()=> openModalById(p.id));
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') openModalById(p.id); });
      grid.appendChild(card);

      card.style.opacity = 0;
      card.style.transform = 'translateY(12px)';
      setTimeout(()=> {
        card.style.transition = 'opacity .45s ease, transform .45s ease';
        card.style.opacity = 1;
        card.style.transform = 'none';
      }, 80 * i);
    });
  }
  renderProjects(projects);

  /* ---------- FILTERS ---------- */
  document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      if (f === 'all') renderProjects(projects);
      else renderProjects(projects.filter(p => p.tags.includes(f)));
    });
  });

  /* ---------- MODAL ---------- */
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalGallery = document.getElementById('modalGallery');
  const modalLive = document.getElementById('modalLive');
  const modalCode = document.getElementById('modalCode');
  const modalClose = document.querySelector('.modal-close');

  function openModalById(id) {
    const p = projects.find(x => x.id === id);
    if (!p) return;
    modalTitle.textContent = p.title;
    modalSubtitle.textContent = p.subtitle + ' • ' + p.tags.join(', ');
    modalDesc.textContent = p.desc;
    modalLive.href = p.live || '#';
    modalCode.href = p.code || '#';
    modalGallery.innerHTML = '';
    p.images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${p.title} image`;
      img.addEventListener('click', ()=> window.open(src, '_blank'));
      modalGallery.appendChild(img);
    });
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(()=> modalClose && modalClose.focus(), 20);
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalClose && modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  /* ---------- COUNTERS (stats) ---------- */
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = Number(el.dataset.target) || 0;
    let start = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { el.textContent = String(target); clearInterval(timer); }
      else el.textContent = String(start);
    }, 20);
  });

  /* ---------- CONTACT FORM ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(contactForm);
      const name = fd.get('name') || '';
      const email = fd.get('email') || '';
      const message = fd.get('message') || '';
      if (!email || !message) { alert('Please fill required fields.'); return; }
      const subject = `Portfolio contact from ${name || email}`;
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const mailto = `mailto:himanshucode12@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    });
  }

  /* ---------- Accessibility ---------- */
  document.addEventListener('focus', (e) => {
    if (modal.classList.contains('open') && !modal.contains(e.target)) {
      e.stopPropagation();
      modalClose && modalClose.focus();
    }
  }, true);

  /* ---------- Utility ---------- */
  window.addProjects = function(json){
    try {
      const arr = (typeof json === 'string') ? JSON.parse(json) : json;
      if (!Array.isArray(arr)) { console.error('addProjects expects an array'); return; }
      arr.forEach(item => projects.push(item));
      renderProjects(projects);
    } catch (err) { console.error('Invalid JSON for addProjects', err); }
  };

});
