/* === Menü aç / kapa === */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

/* === Scroll’da aktif link vurgulama === */
const sections = document.querySelectorAll('section');
const navItems  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop) current = section.getAttribute('id');
  });

  navItems.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* === Typed.js === */
new Typed('.typed-text', {
  strings: ['Siber Güvenlik Uzmanı', 'Pentester', 'Backend Geliştirici'],
  typeSpeed: 60,
  backSpeed: 40,
  backDelay: 1500,
  loop: true,
  showCursor: true,
  cursorChar: '|',
});

/* === Arka plan videosunda fare ile scrub === */
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('bg-video');

  video.addEventListener('loadedmetadata', () => {
    const duration = video.duration;
    video.pause();              // Başlangıçta duraklat
    video.currentTime = 0;

    window.addEventListener('mousemove', (e) => {
      const ratio = e.clientX / window.innerWidth; // 0 – 1
      video.currentTime = ratio * duration;
    });
  });
});
