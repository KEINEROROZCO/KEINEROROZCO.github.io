/**
 * ESTILO & ARTE - Salon Interactive Engine
 */

// --- PRICING DATA ---
const pricingData = [
    { title:"Cortes", icon:"fa-scissors", items:[
        {name:"Corte Mujer",price:"$35.000"},{name:"Corte Hombre",price:"$25.000"},{name:"Corte Niño/a",price:"$18.000"},
        {name:"Corte + Peinado",price:"$55.000"},{name:"Flequillo",price:"$12.000"}
    ]},
    { title:"Color & Mechas", icon:"fa-palette", items:[
        {name:"Tinte Completo",price:"$80.000"},{name:"Balayage",price:"$120.000"},{name:"Mechas Californianas",price:"$100.000"},
        {name:"Corrección de Color",price:"$150.000"},{name:"Retoque de Raíz",price:"$50.000"}
    ]},
    { title:"Tratamientos", icon:"fa-spa", items:[
        {name:"Keratina Brasileña",price:"$120.000"},{name:"Botox Capilar",price:"$90.000"},{name:"Hidratación Profunda",price:"$60.000"},
        {name:"Reconstrucción",price:"$80.000"},{name:"Cauterización",price:"$70.000"}
    ]},
    { title:"Barbería", icon:"fa-user", items:[
        {name:"Corte Clásico",price:"$20.000"},{name:"Fade / Degradado",price:"$25.000"},{name:"Diseño de Barba",price:"$15.000"},
        {name:"Afeitado Clásico",price:"$20.000"},{name:"Combo Corte + Barba",price:"$35.000"}
    ]},
    { title:"Manos & Pies", icon:"fa-hand-sparkles", items:[
        {name:"Manicure Básico",price:"$20.000"},{name:"Semipermanente",price:"$35.000"},{name:"Uñas Acrílicas",price:"$50.000"},
        {name:"Pedicure Spa",price:"$30.000"},{name:"Nail Art (por uña)",price:"$5.000"}
    ]},
    { title:"Maquillaje", icon:"fa-wand-magic-sparkles", items:[
        {name:"Maquillaje Social",price:"$50.000"},{name:"Maquillaje de Novia",price:"$120.000"},{name:"Quinceañera",price:"$80.000"},
        {name:"Sesión Fotográfica",price:"$70.000"},{name:"Clase de Automaquillaje",price:"$60.000"}
    ]}
];

// --- RENDER PRICING ---
function renderPricing() {
    const grid = document.getElementById('pricing-grid');
    grid.innerHTML = pricingData.map(cat => `
        <div class="pricing-card reveal">
            <h3><i class="fa-solid ${cat.icon}"></i> ${cat.title}</h3>
            ${cat.items.map(item => `
                <div class="price-item">
                    <span class="price-name">${item.name}</span>
                    <span class="price-value">${item.price}</span>
                </div>
            `).join('')}
        </div>
    `).join('');
}

// --- APPOINTMENT FORM ---
document.getElementById('appointment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('apt-name').value;
    const phone = document.getElementById('apt-phone').value;
    const service = document.getElementById('apt-service').value;
    const stylist = document.getElementById('apt-stylist').value;
    const date = document.getElementById('apt-date').value;
    const time = document.getElementById('apt-time').value;
    const notes = document.getElementById('apt-notes').value;

    const msg = `✂️ *CITA - Estilo %26 Arte*%0A%0A` +
        `👤 *Nombre:* ${name}%0A📞 *Tel:* ${phone}%0A💇 *Servicio:* ${service}` +
        `${stylist ? '%0A🧑‍🎨 *Estilista:* ' + stylist : ''}` +
        `%0A📅 *Fecha:* ${date}%0A🕐 *Hora:* ${time}` +
        `${notes ? '%0A📝 *Notas:* ' + notes : ''}`;

    window.open(`https://wa.me/573143748137?text=${msg}`, '_blank');
    showToast('✅ ¡Cita enviada! Te confirmaremos pronto.');
    e.target.reset();
});

// Set min date
const dateInput = document.getElementById('apt-date');
if (dateInput) { const t = new Date().toISOString().split('T')[0]; dateInput.min = t; dateInput.value = t; }

// --- NAVBAR ---
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) { target.scrollIntoView({ behavior:'smooth', block:'start' }); closeMobileMenu(); }
    });
});

// Active nav
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop, height = section.offsetHeight, id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});

// --- MOBILE MENU ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => { mobileMenu.classList.toggle('active'); hamburger.classList.toggle('active'); });
function closeMobileMenu() { mobileMenu.classList.remove('active'); hamburger.classList.remove('active'); }
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMobileMenu));

// --- SCROLL REVEAL ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold:0.1, rootMargin:'0px 0px -50px 0px' });

function observeAll() {
    document.querySelectorAll('.reveal, .service-card, .portfolio-item, .team-card, .pricing-card').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// --- TOAST ---
function showToast(msg) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-check-circle"></i> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity='0'; toast.style.transform='translateY(20px)'; setTimeout(()=>toast.remove(),400); }, 4000);
}

// --- TESTIMONIALS AUTO-SCROLL ---
function autoScrollTestimonials() {
    const track = document.getElementById('testimonial-track');
    if (!track) return;
    let scrollAmount = 0;
    const speed = 1;
    function scroll() {
        scrollAmount += speed;
        if (scrollAmount >= track.scrollWidth / 2) scrollAmount = 0;
        track.parentElement.scrollLeft = scrollAmount;
        requestAnimationFrame(scroll);
    }
    // Duplicate cards for infinite loop
    track.innerHTML += track.innerHTML;
    scroll();
}

// --- LOADER ---
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; }, 600);
    }, 1400);
    renderPricing();
    observeAll();
    autoScrollTestimonials();
});
