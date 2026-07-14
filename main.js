const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');

const backToTop = document.createElement('div');

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80,
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  if (window.scrollY > 500) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #C8A45C;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');


const typingElement = document.querySelector('.info-home h3');
const words = ["Python Developer", "Data Analytics", "Web Enthusiast", "Excel Advanced"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  const currentWord = words[wordIndex];
  let displayedText = currentWord.substring(0, charIndex);

  typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, typingSpeed);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, typingSpeed / 2);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(type, 1000);
  }
}

document.addEventListener('DOMContentLoaded', type);

document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay = 0) {
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);
  showElement(mainIcon, 800);
  subIcons.forEach((icon, idx) => {
    showElement(icon, 1600 + idx * 400);
  });
  showElement(designerText, 2800);

  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => loadingScreen.style.display = 'none', 500);
    mainPage.classList.add("visible");
  }, 4000);
});

/* ===== STATS COUNTER ===== */

function animateStats() {
  document.querySelectorAll('.stat-number').forEach(num => {
    const target = parseInt(num.dataset.target);
    let current = 0;
    const increment = Math.ceil(target / 60);
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        num.textContent = target;
        clearInterval(interval);
      } else {
        num.textContent = current;
      }
    }, 25);
  });
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) statsObserver.observe(statsContainer);

/* ===== SKILLS ANIMATION ===== */

function animateSkills() {
  const fills = document.querySelectorAll('.skill-fill');
  const percents = document.querySelectorAll('.skill-percent');
  fills.forEach((fill, i) => {
    const w = fill.dataset.width;
    fill.style.width = w;
    if (percents[i]) {
      const target = parseInt(percents[i].dataset.target);
      let current = 0;
      const interval = setInterval(() => {
        current++;
        percents[i].textContent = current + '%';
        if (current >= target) clearInterval(interval);
      }, 20);
    }
  });
}

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkills();
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsContainer = document.querySelector('.skills-progress-container');
if (skillsContainer) skillsObserver.observe(skillsContainer);

/* ===== TESTIMONIALS CAROUSEL ===== */

let testimonialIndex = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
  testimonialCards.forEach((c, i) => {
    c.classList.toggle('active', i === index);
  });
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    testimonialIndex = i;
    showTestimonial(testimonialIndex);
  });
});

setInterval(() => {
  testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
  showTestimonial(testimonialIndex);
}, 4000);

/* ===== CONTACT FORM (EmailJS) ===== */

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.btn-send');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  if (typeof emailjs !== 'undefined') {
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
      .then(() => {
        btn.textContent = 'Message Sent!';
        this.reset();
        setTimeout(() => { btn.textContent = 'Send Message'; btn.disabled = false; }, 3000);
      })
      .catch(() => {
        btn.textContent = 'Failed! Try Again';
        setTimeout(() => { btn.textContent = 'Send Message'; btn.disabled = false; }, 3000);
      });
  } else {
    setTimeout(() => {
      btn.textContent = 'Message Sent!';
      this.reset();
      setTimeout(() => { btn.textContent = 'Send Message'; btn.disabled = false; }, 3000);
    }, 1500);
  }
});

/* ===== HIRE ME & DOWNLOAD CV ===== */

document.querySelector('.btn-home1').addEventListener('click', () => {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.btn-home2').addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = 'images/resume.pdf';
  link.download = 'Abdul_Raheman_CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

/* ===== SCROLL PROGRESS BAR ===== */

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  const bar = document.getElementById('progress-bar');
  if (bar) bar.style.width = scrollPercent + '%';
});

/* ===== 1. PARTICLE BACKGROUND ===== */

(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.3 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,245,240,${this.opacity})`;
      ctx.fill();
    }
  }

  const count = Math.min(80, Math.floor(w * h / 12000));
  for (let i = 0; i < count; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(245,245,240,${0.05 * (1 - dist / 120)})`;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ===== 3. GRADIENT GLOW ON CARDS ===== */

document.querySelectorAll('.service-card, .stat-item').forEach(el => {
  el.classList.add('glow-border');
});

/* ===== 4. BUTTON RIPPLE ===== */

document.querySelectorAll('.btn-home1, .btn-home2, .btn-send').forEach(btn => {
  btn.classList.add('ripple-btn');
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

/* ===== 6. PARALLAX SCROLL ===== */

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('.parallax').forEach(el => {
    const speed = parseFloat(el.dataset.speed) || 0.3;
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

/* ===== 7. SKILL CIRCLE ANIMATION ===== */

document.querySelectorAll('.skill-circle-fill').forEach(circle => {
  const pct = parseFloat(circle.dataset.pct) || 0;
  const circumference = 2 * Math.PI * 45;
  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = circumference;
  const offset = circumference - (pct / 100) * circumference;
  circle.style.setProperty('--offset', offset + 'px');
});

const circleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-circle-fill').forEach(c => {
        setTimeout(() => c.classList.add('animated'), 300);
      });
      circleObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-circles-grid').forEach(grid => circleObserver.observe(grid));

/* ===== MOBILE NAV ===== */

const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileNavClose = document.getElementById('mobile-nav-close');

function toggleMobileNav(open) {
  hamburger.classList.toggle('active', open);
  mobileNav.classList.toggle('open', open);
  mobileOverlay.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

hamburger.addEventListener('click', () => toggleMobileNav(true));
mobileNavClose.addEventListener('click', () => toggleMobileNav(false));
mobileOverlay.addEventListener('click', () => toggleMobileNav(false));

document.querySelectorAll('.mobile-nav-links a').forEach(link => {
  link.addEventListener('click', () => toggleMobileNav(false));
});

/* ===== THEME TOGGLE ===== */

const themeToggleBtns = document.querySelectorAll('#theme-toggle, #theme-toggle-desktop');
const themeIcons = document.querySelectorAll('#theme-toggle i, #theme-toggle-desktop i, .theme-toggle i');

function getTheme() {
  return localStorage.getItem('theme') || 'dark';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : '');
  localStorage.setItem('theme', theme);
  themeIcons.forEach(icon => {
    icon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  });
}

setTheme(getTheme());

themeToggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    setTheme(getTheme() === 'light' ? 'dark' : 'light');
  });
});

/* ===== PER-ITEM SCROLL REVEAL ===== */

const revealItems = document.querySelectorAll('.service-card, .stat-item, .c1, .testimonial-card, .skill-item');
revealItems.forEach((el, i) => {
  el.classList.add('reveal-item');
  el.style.transitionDelay = `${i * 0.06}s`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active-reveal');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach(el => revealObserver.observe(el));

/* ===== PREMIUM STICKY CARD SCROLL ANIMATION ===== */

(function initPremiumCards() {
  const wrap = document.getElementById('premium-cards-wrap');
  if (!wrap) return;
  const stickyEls = wrap.querySelectorAll('.premium-card-sticky');
  const cards = wrap.querySelectorAll('.premium-card');
  const total = cards.length;
  if (total === 0) return;

  /* set sticky top offsets */
  stickyEls.forEach((el, i) => {
    el.style.top = `calc(6rem + ${i * 28}px)`;
  });

  /* ensure enough scroll space: each card needs room to reveal */
  wrap.style.minHeight = `calc(100vh + ${(total - 1) * 380}px)`;

  /* initial scale: card 0 (lowest on z) = 0.91, card 1 = 0.94, card 2 (top) = 0.97 */
  cards.forEach((card, i) => {
    const targetScale = 1 - (total - 1 - i) * 0.015;
    card.dataset.lastScale = targetScale;
    card.style.transform = `scale(${targetScale})`;
    card.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
  });

  /* scale to 1 when card scrolls into view */
  const scaleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const card = entry.target;
      if (entry.isIntersecting) {
        card.dataset.lastScale = 1;
        card.style.transform = 'scale(1)';
        scaleObserver.unobserve(card);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => scaleObserver.observe(card));

  /* 3D tilt (preserves scroll scale via lastScale) */
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -6;
      const ry = ((x - cx) / cx) * 6;
      const s = parseFloat(card.dataset.lastScale) || 1;
      card.style.transition = 'none';
      card.style.transform = `perspective(1000px) scale(${s}) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      const s = parseFloat(card.dataset.lastScale) || 1;
      card.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
      card.style.transform = `scale(${s})`;
    });
  });
})();

/* ===== CUSTOM CURSOR ===== */

(function initCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function smoothRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(smoothRing);
  }
  smoothRing();

  document.querySelectorAll('a, button, input, textarea, .premium-card, .service-card, .skill-card, .cursor-pointer').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
})();
