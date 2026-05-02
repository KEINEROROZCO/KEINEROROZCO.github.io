/**
 * SABOR COLOMBIANO - Restaurant Interactive Engine
 */

// --- MENU DATA ---
const menuItems = [
    { id:1, title:"Empanadas de Carne", desc:"Crujientes empanadas rellenas de carne sazonada con comino y papa criolla. Acompañadas de ají casero.", price:12000, cat:"entradas", img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80", badge:"Popular" },
    { id:2, title:"Patacones con Hogao", desc:"Plátano verde frito y aplastado, cubierto con hogao de tomate y cebolla fresca. Clásico colombiano.", price:10000, cat:"entradas", img:"https://images.unsplash.com/photo-1562967916-eb82221dfb52?auto=format&fit=crop&w=600&q=80", badge:"" },
    { id:3, title:"Ceviche de Camarón", desc:"Camarones frescos marinados en limón con cilantro, cebolla morada y un toque de ají. Servido frío.", price:18000, cat:"entradas", img:"https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?auto=format&fit=crop&w=600&q=80", badge:"Chef" },
    { id:4, title:"Arepas Rellenas", desc:"Arepas de maíz rellenas de queso costeño derretido con hogao y suero. La tradición en cada mordida.", price:9000, cat:"entradas", img:"https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=600&q=80", badge:"" },
    { id:5, title:"Bandeja Paisa", desc:"El plato insignia: frijoles, arroz, chicharrón, carne molida, chorizo, huevo frito, plátano maduro, aguacate y arepa.", price:35000, cat:"fuertes", img:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80", badge:"⭐ Estrella" },
    { id:6, title:"Sancocho de Gallina", desc:"Sopa tradicional con gallina criolla, yuca, plátano, papa, mazorca y cilantro. Sabor de abuela.", price:28000, cat:"fuertes", img:"https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80", badge:"Tradición" },
    { id:7, title:"Lomo al Trapo", desc:"Lomo de res envuelto en sal y tela, cocinado al carbón. Tierno, jugoso y con sabor ahumado inigualable.", price:42000, cat:"fuertes", img:"https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80", badge:"Premium" },
    { id:8, title:"Mojarra Frita", desc:"Mojarra entera frita hasta quedar crujiente. Acompañada de arroz de coco, patacones y ensalada.", price:32000, cat:"fuertes", img:"https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=600&q=80", badge:"Costeño" },
    { id:9, title:"Ajiaco Bogotano", desc:"Sopa espesa de pollo con tres tipos de papa, guascas, mazorca y alcaparras. El abrazo bogotano.", price:26000, cat:"fuertes", img:"https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80", badge:"" },
    { id:10, title:"Churrasco Argentino", desc:"Corte premium de res a la parrilla con chimichurri casero, papa al horno y ensalada fresca.", price:45000, cat:"fuertes", img:"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80", badge:"Premium" },
    { id:11, title:"Limonada de Coco", desc:"Refrescante limonada con leche de coco y un toque de hierbabuena. Perfecta para el calor.", price:8000, cat:"bebidas", img:"https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=600&q=80", badge:"Refrescante" },
    { id:12, title:"Jugo de Lulo", desc:"Jugo natural de lulo colombiano, la fruta tropical por excelencia. Dulce, ácido y revitalizante.", price:7000, cat:"bebidas", img:"https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=600&q=80", badge:"Natural" },
    { id:13, title:"Aguapanela con Limón", desc:"Bebida tradicional de panela disuelta en agua, servida fría con limón fresco y mucho hielo.", price:5000, cat:"bebidas", img:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80", badge:"Clásico" },
    { id:14, title:"Cóctel Tropical", desc:"Mezcla exótica de ron colombiano con frutas tropicales, mango, maracuyá y un splash de limón.", price:18000, cat:"bebidas", img:"https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80", badge:"🍹" },
    { id:15, title:"Tres Leches", desc:"Bizcocho esponjoso bañado en tres leches: condensada, evaporada y crema. Corona de merengue tostado.", price:14000, cat:"postres", img:"https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=600&q=80", badge:"Favorito" },
    { id:16, title:"Arroz con Leche", desc:"Postre cremoso de arroz cocido en leche con canela, clavos y pasas. Receta de la abuela.", price:10000, cat:"postres", img:"https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80", badge:"Tradición" },
    { id:17, title:"Flan de Caramelo", desc:"Flan suave y sedoso con salsa de caramelo dorado. Textura perfecta que se derrite en la boca.", price:12000, cat:"postres", img:"https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=600&q=80", badge:"" },
    { id:18, title:"Cocada Artesanal", desc:"Dulce de coco rallado con panela, preparado artesanalmente. El dulce típico de la costa.", price:6000, cat:"postres", img:"https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80", badge:"Costeño" },
];

// --- FORMAT PRICE ---
function formatPrice(price) {
    return new Intl.NumberFormat('es-CO', { style:'currency', currency:'COP', minimumFractionDigits:0 }).format(price);
}

// --- RENDER MENU ---
function renderMenu(filter = 'all') {
    const grid = document.getElementById('menu-grid');
    const filtered = filter === 'all' ? menuItems : menuItems.filter(item => item.cat === filter);
    
    grid.innerHTML = filtered.map((item, i) => `
        <div class="menu-card reveal" style="transition-delay:${i * 0.05}s">
            <div style="overflow:hidden">
                <img src="${item.img}" alt="${item.title}" class="menu-card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80'">
            </div>
            <div class="menu-card-body">
                <div class="menu-card-cat">${getCatLabel(item.cat)}</div>
                <h3 class="menu-card-title">${item.title}</h3>
                <p class="menu-card-desc">${item.desc}</p>
                <div class="menu-card-footer">
                    <span class="menu-card-price">${formatPrice(item.price)}</span>
                    ${item.badge ? `<span class="menu-card-badge">${item.badge}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');

    // Trigger reveal
    requestAnimationFrame(() => {
        document.querySelectorAll('.menu-card.reveal').forEach(el => {
            setTimeout(() => el.classList.add('visible'), 100);
        });
    });
}

function getCatLabel(cat) {
    const labels = { entradas:'🥗 Entrada', fuertes:'🍖 Plato Fuerte', bebidas:'🥤 Bebida', postres:'🍰 Postre' };
    return labels[cat] || cat;
}

// --- MENU FILTERS ---
document.querySelectorAll('.menu-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.menu-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderMenu(btn.dataset.filter);
    });
});

// --- GALLERY LIGHTBOX ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentLightboxIndex = 0;

galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
        currentLightboxIndex = idx;
        openLightbox(item);
    });
});

function openLightbox(item) {
    const img = item.querySelector('img');
    const caption = item.dataset.caption || '';
    lightboxImg.src = img.src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('lightbox-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(galleryItems[currentLightboxIndex]);
});

document.getElementById('lightbox-next').addEventListener('click', (e) => {
    e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryItems.length;
    openLightbox(galleryItems[currentLightboxIndex]);
});

// Keyboard nav
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') document.getElementById('lightbox-prev').click();
    if (e.key === 'ArrowRight') document.getElementById('lightbox-next').click();
});

// --- RESERVATION FORM ---
document.getElementById('reservation-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('res-name').value;
    const phone = document.getElementById('res-phone').value;
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;
    const guests = document.getElementById('res-guests').value;
    const occasion = document.getElementById('res-occasion').value;
    const notes = document.getElementById('res-notes').value;

    const msg = `🍽️ *RESERVA - Sabor Colombiano*%0A%0A` +
        `👤 *Nombre:* ${name}%0A📞 *Teléfono:* ${phone}%0A📅 *Fecha:* ${date}%0A🕐 *Hora:* ${time}%0A👥 *Personas:* ${guests}` +
        `${occasion ? '%0A🎉 *Ocasión:* ' + occasion : ''}` +
        `${notes ? '%0A📝 *Notas:* ' + notes : ''}`;

    window.open(`https://wa.me/573143748137?text=${msg}`, '_blank');
    showToast('✅ ¡Reserva enviada! Te contactaremos pronto.');
    e.target.reset();
});

// Set min date to today
const dateInput = document.getElementById('res-date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
}

// --- NAVBAR ---
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeMobileMenu();
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
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

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// --- SCROLL REVEAL ---
const revealElements = document.querySelectorAll('.reveal, .menu-card, .gallery-item, .testimonial-card, .info-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// --- STATS COUNTER ---
function animateCounters() {
    document.querySelectorAll('.stat-number[data-target]').forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const start = performance.now();
        
        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(target * eased).toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
            else counter.textContent = target >= 1000 ? target.toLocaleString() + '+' : target;
        }
        requestAnimationFrame(update);
    });
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const statsStrip = document.querySelector('.stats-strip');
if (statsStrip) statsObserver.observe(statsStrip);

// --- TOAST ---
function showToast(msg) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-check-circle"></i> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// --- LOADER ---
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => { loader.style.display = 'none'; }, 600);
    }, 1400);

    renderMenu();
});

// --- PARALLAX EFFECT ---
window.addEventListener('scroll', () => {
    const parallaxImg = document.querySelector('.parallax-img');
    if (parallaxImg) {
        const rect = parallaxImg.parentElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = 0.3;
            parallaxImg.style.transform = `translateY(${rect.top * speed}px)`;
        }
    }
});
