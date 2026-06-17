// ===== Header blur on scroll =====
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== Generate ambient particles =====
const particleContainer = document.getElementById('particles');
const particleCount = window.innerWidth < 760 ? 12 : 26;
for (let i = 0; i < particleCount; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  const size = Math.random() * 3 + 1;
  p.style.width = size + 'px';
  p.style.height = size + 'px';
  p.style.left = Math.random() * 100 + '%';
  p.style.bottom = '-10px';
  p.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
  p.style.animationDuration = (Math.random() * 10 + 10) + 's';
  p.style.animationDelay = (Math.random() * 15) + 's';
  particleContainer.appendChild(p);
}

// ===== Mobile Nav =====
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
const navClose = document.getElementById('navClose');
const navBackdrop = document.getElementById('navBackdrop');

function openNav() {
  navList.classList.add('open');
  navBackdrop.classList.add('open');
  navToggle.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeNav() {
  navList.classList.remove('open');
  navBackdrop.classList.remove('open');
  navToggle.classList.remove('active');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  navList.classList.contains('open') ? closeNav() : openNav();
});
navClose.addEventListener('click', closeNav);
navBackdrop.addEventListener('click', closeNav);
navList.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

// ===== Scroll-triggered fade-up =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i % 5) * 0.08 + 's';
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ===== 3D tilt effect on cards =====
const cards = document.querySelectorAll('[data-tilt]');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
  });
});
