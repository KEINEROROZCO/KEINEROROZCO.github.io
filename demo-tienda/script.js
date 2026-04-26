/**
 * LUMINA STORE - Script & Logic
 * Professional Animations & Cart Management
 */

// 1. Initial Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        // Trigger initial animations
        document.querySelectorAll('.reveal-text, .hero-content .reveal-up').forEach(el => {
            el.classList.add('active');
        });
    }, 1200);
});

// 2. Intersection Observer (Scroll Animations)
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Play once
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-up, .reveal-left').forEach(el => observer.observe(el));

// 3. Magnetic Buttons (High-end interaction)
const magneticBtns = document.querySelectorAll('.magnetic-btn');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const position = btn.getBoundingClientRect();
        // Use clientX/clientY instead of pageX/pageY to avoid scroll jumps
        const x = e.clientX - position.left - position.width / 2;
        const y = e.clientY - position.top - position.height / 2;
        
        // Move button smoothly towards cursor with subtle multiplier
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
    });
});

// 4. Navbar Scroll State
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 5. Hero & Showcase 3D Parallax Effects
const heroImg = document.getElementById('hero-img');
document.addEventListener('mousemove', (e) => {
    if (!heroImg) return;
    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;
    heroImg.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

const showcaseImg = document.getElementById('showcase-img');
window.addEventListener('scroll', () => {
    if (!showcaseImg) return;
    // Simple scroll rotation effect for the sticky image
    const scrolled = window.scrollY;
    showcaseImg.style.transform = `translateY(${scrolled * 0.05}px) rotate(${scrolled * 0.02}deg)`;
});

// 6. Expanded Database (Color Collection using local transparent images)
const productDB = [
    { id: 1, title: "Lumina Air Max - Pearl White", price: 349.99, img: "img/headphones.png", cat: "audio", desc: "Acústica de vanguardia. Driver de titanio de 50mm para sonido Hi-Fi.", badge: "NEW", class: "" },
    { id: 2, title: "Lumina Air Max - Ocean Blue", price: 349.99, img: "img/headphones.png", cat: "audio", desc: "El mismo sonido impecable en un profundo color azul océano.", badge: "TOP", class: "hue-shift-1" },
    { id: 3, title: "Lumina Air Max - Neon Pink", price: 349.99, img: "img/headphones.png", cat: "audio", desc: "Destaca con nuestro vibrante acabado en rosa neón mate.", badge: "", class: "hue-shift-2" },
    { id: 4, title: "Lumina Air Max - Cyber Purple", price: 349.99, img: "img/headphones.png", cat: "audio", desc: "Estética cyberpunk con un púrpura profundo y reflejos metálicos.", badge: "PRO", class: "hue-shift-3" },
    { id: 5, title: "Lumina Air Max - Crimson Red", price: 349.99, img: "img/headphones.png", cat: "audio", desc: "Atrévete con el rojo carmesí. Edición limitada de la temporada.", badge: "LIMITADA", class: "hue-shift-4" },
    { id: 6, title: "Lumina Air Max - Mint Green", price: 349.99, img: "img/headphones.png", cat: "audio", desc: "Fresco y elegante. Verde menta con almohadillas viscoelásticas grises.", badge: "OFERTA", class: "hue-shift-5" },
    { id: 7, title: "Lumina Air Max - Sunset Orange", price: 349.99, img: "img/headphones.png", cat: "audio", desc: "Captura la energía del atardecer con este vibrante naranja.", badge: "", class: "hue-shift-6" },
    { id: 8, title: "Lumina Air Max - Space Gray", price: 349.99, img: "img/headphones.png", cat: "audio", desc: "El clásico reinventado. Gris espacial para un look profesional y sobrio.", badge: "NEW", class: "hue-shift-7" },
    { id: 9, title: "Lumina Air Max - Yellow Gold", price: 399.99, img: "img/headphones.png", cat: "audio", desc: "Acabado en aluminio anodizado color oro amarillo para máxima exclusividad.", badge: "LUJO", class: "hue-shift-8" },
    { id: 10, title: "Lumina Air Max - Rose Gold", price: 399.99, img: "img/headphones.png", cat: "audio", desc: "La elegancia del oro rosa combinada con la mejor ingeniería acústica.", badge: "", class: "hue-shift-9" },
    { id: 11, title: "Lumina Air Max - Aqua", price: 349.99, img: "img/headphones.png", cat: "audio", desc: "Inspirado en aguas cristalinas, un azul verdoso súper refrescante.", badge: "", class: "hue-shift-10" },
    { id: 12, title: "Lumina Air Max - Midnight Black", price: 349.99, img: "img/headphones.png", cat: "audio", desc: "El sigilo absoluto. Negro mate de pies a cabeza. Nuestro modelo más vendido.", badge: "TOP", class: "hue-shift-11" },
    { id: 13, title: "Lumina Pods Pro - White", price: 199.99, img: "img/headphones.png", cat: "wearables", desc: "Versión compacta intrauditiva con el mismo chip de audio cuántico.", badge: "PRO", class: "scale-down" },
    { id: 14, title: "Lumina Pods Pro - Black", price: 199.99, img: "img/headphones.png", cat: "wearables", desc: "Versión compacta en un elegante negro mate para mayor discreción.", badge: "", class: "scale-down hue-shift-11" },
    { id: 15, title: "Lumina Studio Setup", price: 899.99, img: "img/headphones.png", cat: "gaming", desc: "Combo para creadores: Auriculares Air Max + Amplificador DAC de alta impedancia.", badge: "BUNDLE", class: "hue-shift-1" },
    { id: 16, title: "Lumina Travel Case", price: 49.99, img: "img/headphones.png", cat: "tech", desc: "Funda de fibra de carbono para proteger tus Lumina Air Max a donde vayas.", badge: "", class: "hue-shift-3 scale-down" }
];

// 7. Render Catalog
const catalogGrid = document.getElementById('catalog-grid');
function renderCatalog() {
    catalogGrid.innerHTML = '';
    productDB.forEach((p, index) => {
        const delay = (index % 4) * 0.1;
        const badgeHtml = p.badge ? `<span class="badge ${p.badge==='OFERTA'?'sale':''}">${p.badge}</span>` : '';
        
        catalogGrid.innerHTML += `
            <div class="product-card reveal-up" data-category="${p.cat}" style="--delay: ${delay}s" onclick="quickView(${p.id})">
                <div class="prod-img-box">
                    <div class="prod-badges">${badgeHtml}</div>
                    <img src="${p.img}" alt="${p.title}" class="prod-img ${p.class}">
                    <div class="prod-actions-overlay">
                        <button class="icon-btn" onclick="event.stopPropagation(); addToCart(${p.id}, '${p.title}', ${p.price}, '${p.img}', '${p.class}')">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="prod-info">
                    <div class="prod-cat">${p.cat}</div>
                    <div class="prod-title">${p.title}</div>
                    <div class="prod-price">$${p.price.toFixed(2)}</div>
                </div>
            </div>
        `;
    });
    // Observer for new cards
    document.querySelectorAll('#catalog-grid .reveal-up').forEach(el => observer.observe(el));
}
renderCatalog();

// 8. Filtering System
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        
        document.querySelectorAll('.product-card').forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'flex';
                setTimeout(() => card.style.opacity = '1', 50);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
});

// 9. Shopping Cart Management
let cart = [];
const cartOverlay = document.getElementById('cart-overlay');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total-price');

document.getElementById('cart-toggle').addEventListener('click', toggleCart);
document.getElementById('close-cart').addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

function toggleCart() {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

window.addToCart = function(id, title, price, img, customClass = '') {
    const itemIndex = cart.findIndex(i => i.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].qty++;
    } else {
        cart.push({ id, title, price, img, class: customClass, qty: 1 });
    }
    updateCart();
    showToast(`${title} agregado.`);
    
    // Animate badge
    const badge = document.getElementById('cart-count');
    badge.style.transform = 'scale(1.5)';
    setTimeout(() => badge.style.transform = 'scale(1)', 200);
}

window.updateQty = function(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        updateCart();
    }
}

function updateCart() {
    const count = cart.reduce((acc, item) => acc + item.qty, 0);
    const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    
    cartCountElement.textContent = count;
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Tu carrito está vacío.</div>';
        return;
    }
    
    cart.forEach(item => {
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.title}" class="cart-item-img ${item.class}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="updateQty(${item.id}, -${item.qty})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
    });
}

// 10. Quick View Modal
const modalOverlay = document.getElementById('quick-view-modal');
const modalBody = document.getElementById('modal-body');
document.getElementById('close-modal').addEventListener('click', () => modalOverlay.classList.remove('active'));

window.quickView = function(id) {
    const p = productDB.find(prod => prod.id === id);
    if(!p) return;
    
    modalBody.innerHTML = `
        <div class="modal-img-col">
            <img src="${p.img}" class="${p.class}" alt="${p.title}">
        </div>
        <div class="modal-info-col">
            <div class="prod-cat" style="margin-bottom: 1rem;">${p.cat}</div>
            <h2>${p.title}</h2>
            <div class="modal-price">$${p.price.toFixed(2)}</div>
            <p class="modal-desc">${p.desc}</p>
            <div style="display:flex; gap: 1rem; margin-top: 2rem;">
                <button class="btn-primary" style="flex:1; padding: 1.2rem; border-radius: 100px;" onclick="addToCart(${p.id}, '${p.title}', ${p.price}, '${p.img}', '${p.class}'); document.getElementById('quick-view-modal').classList.remove('active');">
                    Agregar al carrito
                </button>
            </div>
        </div>
    `;
    modalOverlay.classList.add('active');
}

// 11. Toast System
const toastContainer = document.getElementById('toast-container');
window.showToast = function(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-check"></i> ${msg}`;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideUpToast 0.3s reverse forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
