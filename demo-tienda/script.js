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

// 6. Expanded Database (16 Products with HD Imagery)
const productDB = [
    { id: 1, title: "Lumina Air Max", price: 349.99, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80", cat: "audio", desc: "Acústica de vanguardia. Driver de titanio de 50mm para sonido Hi-Fi.", badge: "NEW", class: "" },
    { id: 2, title: "Lumina Watch Ultra", price: 499.99, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80", cat: "wearables", desc: "Caja de titanio aeroespacial. Cristal de zafiro inrayable. GPS precisión L1+L5.", badge: "TOP", class: "" },
    { id: 3, title: "Lumina Pods Pro", price: 199.99, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80", cat: "audio", desc: "Cancelación de ruido adaptativa que escanea tu oído interno para ajustar el sonido.", badge: "", class: "" },
    { id: 4, title: "Lumina Mech Board", price: 179.99, img: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80", cat: "gaming", desc: "Teclado mecánico custom de aluminio 60%. Switches magnéticos regulables.", badge: "PRO", class: "" },
    { id: 5, title: "Lumina Studio Mic", price: 149.99, img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80", cat: "audio", desc: "Micrófono de condensador con interfaz integrada y patrón polar ajustable.", badge: "", class: "" },
    { id: 6, title: "Lumina Soundbar", price: 399.99, img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80", cat: "audio", desc: "Dolby Atmos 7.1.2 en una barra ultra delgada con subwoofer inalámbrico invisible.", badge: "OFERTA", class: "" },
    { id: 7, title: "Lumina Apex Mouse", price: 119.99, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80", cat: "gaming", desc: "Ratón ultraligero de 45g con aleación de magnesio y polling rate de 8000Hz.", badge: "", class: "" },
    { id: 8, title: "Lumina Vision VR", price: 599.99, img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=800&q=80", cat: "gaming", desc: "Gafas de realidad mixta con pantallas Micro-OLED 4K por ojo.", badge: "NEW", class: "" },
    { id: 9, title: "Lumina Drone X", price: 899.99, img: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=800&q=80", cat: "tech", desc: "Dron compacto con cámara 8K, seguimiento de sujetos por IA y 45 min de vuelo.", badge: "TOP", class: "" },
    { id: 10, title: "Lumina Pro Camera", price: 1499.99, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80", cat: "tech", desc: "Cámara mirrorless full-frame ideal para creadores de contenido profesionales.", badge: "", class: "" },
    { id: 11, title: "Lumina Smart Display", price: 249.99, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80", cat: "tech", desc: "Centro de control inteligente para tu hogar con pantalla OLED de 10 pulgadas.", badge: "", class: "" },
    { id: 12, title: "Lumina Core Laptop", price: 1899.99, img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80", cat: "tech", desc: "Portátil ultrafino de aluminio con procesador neural M4 y batería de 22 horas.", badge: "PRO", class: "" },
    { id: 13, title: "Lumina Fit Band", price: 59.99, img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?auto=format&fit=crop&w=800&q=80", cat: "wearables", desc: "Tu compañero de actividad diaria, ultraligero y con medición de oxígeno en sangre.", badge: "", class: "" },
    { id: 14, title: "Lumina Boombox", price: 219.99, img: "https://images.unsplash.com/photo-1608223652643-b922d99d141e?auto=format&fit=crop&w=800&q=80", cat: "audio", desc: "Altavoz portátil resistente al agua IP67 con bajos contundentes y show de luces.", badge: "OFERTA", class: "" },
    { id: 15, title: "Lumina Gamepad", price: 79.99, img: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80", cat: "gaming", desc: "Mando inalámbrico multiplataforma con gatillos de efecto Hall magnético.", badge: "", class: "" },
    { id: 16, title: "Lumina Studio Light", price: 129.99, img: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80", cat: "tech", desc: "Panel LED bicolor inteligente para streaming y fotografía con control por app.", badge: "NEW", class: "" }
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
