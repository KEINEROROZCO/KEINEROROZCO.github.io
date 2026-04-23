/* =====================================================
   KEYNER OROZCO — PORTFOLIO SCRIPTS
   Premium Visual Effects & Interactions
   ===================================================== */

// ===== LOADER =====
(function () {
    const loader = document.getElementById('loader');
    const fill = document.getElementById('loader-fill');
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = '';
                initHeroAnimations();
            }, 400);
        }
        fill.style.width = progress + '%';
    }, 150);
    document.body.style.overflow = 'hidden';
})();

// ===== CUSTOM CURSOR =====
const cursorDot = document.getElementById('cursor-dot');
const cursorGlow = document.getElementById('cursor-glow');
const trailCanvas = document.getElementById('cursor-trail-canvas');
const trailCtx = trailCanvas ? trailCanvas.getContext('2d') : null;
let mouseX = 0, mouseY = 0;
let dotX = 0, dotY = 0;
let glowX = 0, glowY = 0;

function resizeTrailCanvas() {
    if (!trailCanvas) return;
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
}
resizeTrailCanvas();
window.addEventListener('resize', resizeTrailCanvas);

const trailPoints = [];
const MAX_TRAIL = 20;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    trailPoints.push({ x: mouseX, y: mouseY, life: 1 });
    if (trailPoints.length > MAX_TRAIL) trailPoints.shift();
});

function animateCursor() {
    // Dot follows exactly
    dotX += (mouseX - dotX) * 0.35;
    dotY += (mouseY - dotY) * 0.35;
    if (cursorDot) {
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
    }

    // Glow follows with more delay
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    if (cursorGlow) {
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
    }

    // Trail
    if (trailCtx) {
        trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
        for (let i = 0; i < trailPoints.length; i++) {
            const p = trailPoints[i];
            p.life -= 0.03;
            if (p.life <= 0) {
                trailPoints.splice(i, 1);
                i--;
                continue;
            }
            const alpha = p.life * 0.4;
            const size = p.life * 4;
            trailCtx.beginPath();
            trailCtx.arc(p.x, p.y, size, 0, Math.PI * 2);
            trailCtx.fillStyle = `rgba(0, 245, 212, ${alpha})`;
            trailCtx.fill();
        }
    }

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover states for cursor
document.querySelectorAll('a, button, .project-card-v2, .service-card-v2, .skill-card, .contact-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorDot) cursorDot.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        if (cursorDot) cursorDot.classList.remove('hover');
    });
});

// ===== NOISE CANVAS =====
const noiseCanvas = document.getElementById('noise-canvas');
if (noiseCanvas) {
    const noiseCtx = noiseCanvas.getContext('2d');
    noiseCanvas.width = 256;
    noiseCanvas.height = 256;
    function generateNoise() {
        const imgData = noiseCtx.createImageData(256, 256);
        for (let i = 0; i < imgData.data.length; i += 4) {
            const v = Math.random() * 255;
            imgData.data[i] = imgData.data[i + 1] = imgData.data[i + 2] = v;
            imgData.data[i + 3] = 255;
        }
        noiseCtx.putImageData(imgData, 0, 0);
        setTimeout(generateNoise, 80);
    }
    generateNoise();
}

// ===== SCROLL PROGRESS =====
const scrollProgress = document.getElementById('scroll-progress');
const mainHeader = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    const scrollPct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (scrollProgress) scrollProgress.style.width = scrollPct + '%';
    if (mainHeader) mainHeader.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== HERO ANIMATIONS =====
function initHeroAnimations() {
    const heroItems = document.querySelectorAll('.anim-item');
    heroItems.forEach((item, i) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, i * 150 + 100);
    });
    animateStatNumbers();
}

// Stat counter animation
function animateStatNumbers() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = Math.round(target * eased);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

// ===== INTERSECTION OBSERVER FOR REVEAL =====
const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
);

// Skills staggered
document.querySelectorAll('.skill-card.reveal-item').forEach((card, i) => {
    card.style.transitionDelay = (i * 0.08) + 's';
    revealObserver.observe(card);
});

// Projects staggered
document.querySelectorAll('.project-card-v2.reveal-item').forEach((card, i) => {
    card.style.transitionDelay = (i * 0.12) + 's';
    revealObserver.observe(card);
});

// Services staggered
document.querySelectorAll('.service-card-v2.reveal-item').forEach((card, i) => {
    card.style.transitionDelay = (i * 0.12) + 's';
    revealObserver.observe(card);
});

// Generic
document.querySelectorAll('.reveal-item:not(.skill-card):not(.project-card-v2):not(.service-card-v2)').forEach(el => {
    revealObserver.observe(el);
});

// ===== SKILL RING SVG GRADIENT (inject once) =====
(function () {
    const svgNS = "http://www.w3.org/2000/svg";
    const defs = document.createElementNS(svgNS, "svg");
    defs.setAttribute("width", "0");
    defs.setAttribute("height", "0");
    defs.style.position = "absolute";
    defs.innerHTML = `
        <defs>
            <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#00f5d4"/>
                <stop offset="50%" stop-color="#a855f7"/>
                <stop offset="100%" stop-color="#ff2d78"/>
            </linearGradient>
        </defs>
    `;
    document.body.prepend(defs);
})();

// ===== HAMBURGER / MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        mobileMenu.querySelectorAll('.mobile-menu-content a').forEach((a, i) => {
            a.style.transitionDelay = mobileMenu.classList.contains('open')
                ? (i * 0.06 + 0.15) + 's'
                : '0s';
        });
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== 3D TILT ON CARDS =====
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-12px) perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== MAGNETIC EFFECT ON BUTTONS =====
document.querySelectorAll('.btn-magic, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ===== CONTACT FORM (FormSubmit.co) =====
const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-message');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalContent = btn.innerHTML;
        btn.querySelector('.btn-magic-text').innerHTML = '<span>Enviando...</span><i class="fa-solid fa-spinner fa-spin"></i>';
        btn.disabled = true;

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
            .then(r => {
                if (r.ok) {
                    formMsg.className = 'success';
                    formMsg.textContent = '¡Mensaje enviado con éxito! Te responderé pronto 🚀';
                    formMsg.style.display = 'block';
                    form.reset();
                } else {
                    throw new Error('Error en el envío');
                }
            })
            .catch(() => {
                formMsg.className = 'error';
                formMsg.textContent = 'Hubo un error al enviar el mensaje. Intenta por WhatsApp o email directo.';
                formMsg.style.display = 'block';
            })
            .finally(() => {
                btn.innerHTML = originalContent;
                btn.disabled = false;
                setTimeout(() => {
                    if (formMsg) formMsg.style.display = 'none';
                }, 6000);
            });
    });
}

// ===== PARALLAX EFFECT ON ORBS =====
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, i) => {
        const speed = (i + 1) * 0.05;
        orb.style.transform += '';
        orb.style.top = orb.style.top; // Keep CSS animation
    });
});

// ===== PAGE VISIBILITY (pause animations when hidden) =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.classList.add('paused');
    } else {
        document.body.classList.remove('paused');
    }
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

const navObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + id) {
                        link.style.color = 'var(--cyan)';
                    }
                });
            }
        });
    },
    { threshold: 0.3 }
);

sections.forEach(section => navObserver.observe(section));

// ===== ENHANCED CARD GLOW FOLLOW =====
document.querySelectorAll('.project-card-v2, .service-card-v2').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--glow-x', x + 'px');
        card.style.setProperty('--glow-y', y + 'px');
        // Apply a subtle radial gradient at cursor position
        card.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(0,245,212,0.04), transparent 70%), rgba(255,255,255,0.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.background = '';
    });
});

console.log('%c🚀 Keyner Orozco Portfolio — Loaded', 'color: #00f5d4; font-size: 14px; font-weight: bold;');