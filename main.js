/* ============================================================
   SHAYANA J V — PORTFOLIO INTERACTIVITY
   ============================================================ */

// ---- Typing Animation ----
const typedPhrases = [
    'Full Stack Applications',
    'AI-Powered Systems',
    'Real-Time Solutions',
    'Computer Vision Apps',
    'Scalable Backends',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
    const current = typedPhrases[phraseIndex];

    if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 35 : 70;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000; // pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typedPhrases.length;
        speed = 400;
    }

    setTimeout(typeLoop, speed);
}

typeLoop();

// ---- Scroll Reveal (Intersection Observer) ----
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach((el) => observer.observe(el));

// ---- Navbar Scroll Effect ----
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ---- Active Nav Link ----
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ---- Mobile Nav Toggle ----
const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
});

// Close mobile nav on link click
navLinksContainer.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinksContainer.classList.remove('open');
    });
});

// ---- Smooth Scroll for all # links ----
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
