const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Scroll ile aktif link vurgulama
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Typed.js animasyonu
var typed = new Typed('.typed-text', {
  strings: ['Bilgisayar Mühendisliği Öğrencisi', 'Purple Team', 'Güvenlik Mühendisi'],
  typeSpeed: 60,
  backSpeed: 40,
  backDelay: 1500,
  loop: true,
  showCursor: true,
  cursorChar: '|',
});


closeIcon.addEventListener("click", function(){
    sideBar.classList.remove("open-sidebar");
    sideBar.classList.add("close-sidebar");
    
})


const form = document.getElementById('contactForm');

  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Sayfa yenilenmesini engelle

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        window.location.href = 'https://kapatalcs.github.io';
      } else {
        alert('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
      }
    })
    .catch(error => {
      alert('Bir hata oluştu: ' + error.message);
    });
  });
