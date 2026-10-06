document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky header ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('mainNav');
  burger.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  /* ---------- Hero shine sweeps ---------- */
  const shineLayer = document.getElementById('shineLayer');
  const shineCount = window.innerWidth < 700 ? 2 : 4;
  for (let i = 0; i < shineCount; i++) {
    const s = document.createElement('span');
    s.style.animationDuration = (4 + Math.random() * 3) + 's';
    s.style.animationDelay = (Math.random() * 6) + 's';
    shineLayer.appendChild(s);
  }

  /* ---------- Hero glass shards ---------- */
  const shardsLayer = document.getElementById('shardsLayer');
  const shardCount = window.innerWidth < 700 ? 14 : 26;
  for (let i = 0; i < shardCount; i++) {
    const s = document.createElement('span');
    const size = 3 + Math.random() * 6;
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.animationDuration = (2 + Math.random() * 3) + 's';
    s.style.animationDelay = (Math.random() * 4) + 's';
    shardsLayer.appendChild(s);
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.badge-num');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounter(entry.target); counterObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.6 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- Gallery lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose = document.getElementById('lightboxClose');
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const type = item.dataset.type;
      lightboxContent.innerHTML = '';
      if (type === 'video') {
        const video = document.createElement('video');
        video.src = item.dataset.src;
        video.poster = item.dataset.poster;
        video.controls = true;
        video.autoplay = true;
        lightboxContent.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.src = item.dataset.src;
        img.alt = '';
        lightboxContent.appendChild(img);
      }
      lightbox.classList.add('open');
    });
  });
  const closeLightbox = () => { lightbox.classList.remove('open'); lightboxContent.innerHTML = ''; };
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll('.service-card, .why-item, .process-step, .gallery-item');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.2 });
  revealTargets.forEach(t => revealObserver.observe(t));

  /* ---------- Process line fill ---------- */
  const processFill = document.getElementById('processFill');
  const processTrack = document.querySelector('.process-track');
  if (processTrack) {
    const fillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { processFill.style.width = '100%'; fillObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.3 });
    fillObserver.observe(processTrack);
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      item.classList.toggle('open', !isOpen);
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : null;
    });
  });

  /* ---------- Cursor glow (desktop only) ---------- */
  const glow = document.getElementById('cursorGlow');
  if (window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', (e) => {
      glow.classList.add('active');
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    });
    window.addEventListener('mouseleave', () => glow.classList.remove('active'));
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});