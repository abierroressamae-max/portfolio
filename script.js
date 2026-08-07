// ============================================
// MOBILE NAV TOGGLE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ============================================
// NAVBAR SCROLL SHADOW
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ============================================
// SCROLL REVEAL — subtle fade-in on scroll
// ============================================
function initReveal() {
  // Tag elements that should animate in
  const selectors = [
    '.about-card',
    '.skill-card',
    '.timeline-item',
    '.education-card',
    '.certificate-card',
    '.contact-card',
    '.section-header',
    '.hero-content',
    '.hero-visual'
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.classList.add('reveal');
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

// ============================================
// CERTIFICATE LIGHTBOX MODAL
// ============================================
function initCertModal() {
  const certCards    = document.querySelectorAll('.certificate-card');
  const certModal    = document.getElementById('certModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose   = document.getElementById('modalClose');
  const modalImg     = document.getElementById('modalImg');
  const modalTitle   = document.getElementById('modalTitle');
  const modalDesc    = document.getElementById('modalDesc');

  if (!certModal || !certCards.length) return;

  function openModal(card) {
    const title = card.getAttribute('data-title');
    const image = card.getAttribute('data-image');
    const desc  = card.getAttribute('data-desc');

    modalImg.src          = image;
    modalImg.alt          = title;
    modalTitle.textContent = title;
    modalDesc.textContent  = desc;

    certModal.classList.add('active');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    certModal.classList.remove('active');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  certCards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
  });

  if (modalClose)   modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal.classList.contains('active')) {
      closeModal();
    }
  });
}

// Run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initCertModal();
});
