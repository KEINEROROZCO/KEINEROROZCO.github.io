/* =====================================================
   KEYNER OROZCO — PORTFOLIO SCRIPTS
   Premium Visual Effects & Interactions v2.0
   ===================================================== */

// ===== LOADER =====
(function () {
    const loader = document.getElementById('loader');
    const fill = document.getElementById('loader-fill');
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 12 + 3;
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
    }, 120);
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
const MAX_TRAIL = 25;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    trailPoints.push({ x: mouseX, y: mouseY, life: 1 });
    if (trailPoints.length > MAX_TRAIL) trailPoints.shift();
});

function animateCursor() {
    dotX += (mouseX - dotX) * 0.3;
    dotY += (mouseY - dotY) * 0.3;
    if (cursorDot) {
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
    }

    glowX += (mouseX - glowX) * 0.07;
    glowY += (mouseY - glowY) * 0.07;
    if (cursorGlow) {
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
    }

    if (trailCtx) {
        trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
        for (let i = 0; i < trailPoints.length; i++) {
            const p = trailPoints[i];
            p.life -= 0.025;
            if (p.life <= 0) {
                trailPoints.splice(i, 1);
                i--;
                continue;
            }
            const alpha = p.life * 0.35;
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
document.querySelectorAll('a, button, .project-card-v2, .service-card-v2, .skill-card, .contact-card, .testimonial-card, .pricing-card, .faq-question').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorDot) cursorDot.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        if (cursorDot) cursorDot.classList.remove('hover');
    });
});

// ===== CONSTELLATION / PARTICLE BACKGROUND =====
(function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:0;pointer-events:none;opacity:0.6;';
    document.body.insertBefore(canvas, document.body.firstChild);
    const ctx = canvas.getContext('2d');

    let particles = [];
    const PARTICLE_COUNT = 60;
    const CONNECTION_DIST = 150;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.radius = Math.random() * 1.5 + 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 245, 212, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECTION_DIST) {
                    const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 245, 212, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    // Connect to mouse
    function drawMouseConnections() {
        for (const p of particles) {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
                const alpha = (1 - dist / 200) * 0.2;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouseX, mouseY);
                ctx.strokeStyle = `rgba(0, 245, 212, ${alpha})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        drawConnections();
        drawMouseConnections();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
})();

// ===== NOISE CANVAS =====
const noiseCanvas = document.getElementById('noise-canvas');
if (noiseCanvas) {
    const noiseCtx = noiseCanvas.getContext('2d');
    noiseCanvas.width = 128;
    noiseCanvas.height = 128;
    function generateNoise() {
        const imgData = noiseCtx.createImageData(128, 128);
        for (let i = 0; i < imgData.data.length; i += 4) {
            const v = Math.random() * 255;
            imgData.data[i] = imgData.data[i + 1] = imgData.data[i + 2] = v;
            imgData.data[i + 3] = 255;
        }
        noiseCtx.putImageData(imgData, 0, 0);
    }
    // Generate once, CSS animation handles the visual shift
    generateNoise();
    setInterval(generateNoise, 200);
}

// ===== SCROLL PROGRESS =====
const scrollProgress = document.getElementById('scroll-progress');
const mainHeader = document.getElementById('main-header');

window.addEventListener('scroll', () => {
    const scrollPct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (scrollProgress) scrollProgress.style.width = scrollPct + '%';
    if (mainHeader) mainHeader.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ===== HERO ANIMATIONS =====
function initHeroAnimations() {
    const heroItems = document.querySelectorAll('.anim-item');
    heroItems.forEach((item, i) => {
        setTimeout(() => {
            item.classList.add('animate');
        }, i * 150 + 100);
    });
    animateStatNumbers();

    // Text scramble effect on hero title
    const charWraps = document.querySelectorAll('.char-wrap');
    charWraps.forEach(el => {
        const originalText = el.dataset.text || el.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let iteration = 0;

        const scramble = setInterval(() => {
            el.textContent = originalText
                .split('')
                .map((char, idx) => {
                    if (idx < iteration) return originalText[idx];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            iteration += 1 / 2;
            if (iteration >= originalText.length) {
                clearInterval(scramble);
                el.textContent = originalText;
            }
        }, 40);
    });
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
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
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
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
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
            document.body.style.overflow = '';
        });
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== 3D TILT ON CARDS =====
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-12px) perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
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
        btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
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
        const textEl = btn.querySelector('.btn-magic-text');
        if (textEl) textEl.innerHTML = '<span>Enviando...</span><i class="fa-solid fa-spinner fa-spin"></i>';
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
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            const orbs = document.querySelectorAll('.orb');
            orbs.forEach((orb, i) => {
                const speed = (i + 1) * 0.03;
                orb.style.transform = `translateY(${scrollY * speed}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

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
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active-link');
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
        card.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(0,245,212,0.04), transparent 70%), rgba(255,255,255,0.02)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.background = '';
    });
});

// ===== BACK TO TOP BUTTON =====
(function initBackToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Volver arriba');
    btn.style.cssText = `
        position: fixed; bottom: 100px; right: 28px; z-index: 99990;
        width: 44px; height: 44px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1);
        background: rgba(5,8,22,0.8); backdrop-filter: blur(10px);
        color: rgba(240,244,255,0.6); font-size: 0.8rem;
        cursor: pointer; display: flex; align-items: center; justify-content: center;
        opacity: 0; visibility: hidden; transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
        transform: translateY(20px);
    `;
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
            btn.style.transform = 'translateY(0)';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
            btn.style.transform = 'translateY(20px)';
        }
    }, { passive: true });

    btn.addEventListener('mouseenter', () => {
        btn.style.borderColor = 'rgba(0,245,212,0.4)';
        btn.style.color = '#00f5d4';
        btn.style.transform = 'translateY(-3px)';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.borderColor = 'rgba(255,255,255,0.1)';
        btn.style.color = 'rgba(240,244,255,0.6)';
        btn.style.transform = 'translateY(0)';
    });
})();

// ===== TYPING EFFECT ON CODE EDITOR =====
(function initTypingEffect() {
    const commentEl = document.querySelector('.code-editor .cm');
    if (!commentEl) return;

    const phrases = [
        '// Siempre aprendiendo...',
        '// Building the future...',
        '// Clean code matters...',
        '// Creando experiencias...',
        '// Full-Stack Developer...',
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const cursorSpan = commentEl.querySelector('.typing-cursor');

    function type() {
        const currentPhrase = phrases[phraseIdx];

        if (isDeleting) {
            charIdx--;
            commentEl.textContent = currentPhrase.substring(0, charIdx);
        } else {
            charIdx++;
            commentEl.textContent = currentPhrase.substring(0, charIdx);
        }

        if (cursorSpan) commentEl.appendChild(cursorSpan);

        let speed = isDeleting ? 30 : 60;

        if (!isDeleting && charIdx === currentPhrase.length) {
            speed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            speed = 300;
        }

        setTimeout(type, speed);
    }
    setTimeout(type, 2000);
})();

// ===== ACCESSIBILITY SKIP LINK =====
(function addSkipLink() {
    const skip = document.createElement('a');
    skip.href = '#inicio';
    skip.textContent = 'Ir al contenido principal';
    skip.className = 'skip-link';
    skip.style.cssText = `
        position: fixed; top: -100px; left: 50%; transform: translateX(-50%);
        z-index: 999999; padding: 12px 24px; background: var(--cyan, #00f5d4);
        color: #050816; font-weight: 700; border-radius: 0 0 8px 8px;
        text-decoration: none; font-size: 0.85rem; transition: top 0.3s ease;
    `;
    skip.addEventListener('focus', () => { skip.style.top = '0'; });
    skip.addEventListener('blur', () => { skip.style.top = '-100px'; });
    document.body.prepend(skip);
})();

console.log('%c🚀 Keyner Orozco Portfolio v2.0 — Loaded', 'color: #00f5d4; font-size: 14px; font-weight: bold;');