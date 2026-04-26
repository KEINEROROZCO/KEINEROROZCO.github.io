// Loader Logic
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        document.querySelectorAll('.hero .reveal-left, .hero .reveal-right').forEach(el => {
            el.classList.add('active');
        });
    }, 1500); 
});

// Scroll Reveal
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

// Hero 3D Parallax
const hero3D = document.getElementById('hero-3d');
document.addEventListener('mousemove', e => {
    if (!hero3D) return;
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    hero3D.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Expanded Product Database (8 items)
const productDB = [
    { id: 1, title: "Lumina Air Max", price: 349.99, img: "img/headphones.png", cat: "audio", catLabel: "Audio Premium", desc: "Audífonos tope de gama con cancelación de ruido adaptativa, diseño en aluminio cepillado y 40 horas de autonomía.", badge: "NUEVO", oldPrice: null, class: "" },
    { id: 2, title: "Lumina Watch Series 5", price: 249.99, img: "img/headphones.png", cat: "wearables", catLabel: "Smartwatch", desc: "Monitorea tu salud con precisión milimétrica. Pantalla OLED sin bordes y resistencia al agua 50m.", badge: "TOP VENTAS", oldPrice: null, class: "hue-shift-1" },
    { id: 3, title: "Lumina Earbuds Pro", price: 129.99, img: "img/headphones.png", cat: "audio", catLabel: "Audio Portátil", desc: "Los audífonos intrauditivos más cómodos del mercado. Audio espacial envolvente y estuche de carga inalámbrica.", badge: "", oldPrice: null, class: "hue-shift-2" },
    { id: 4, title: "Lumina Mech K1", price: 159.99, img: "img/headphones.png", cat: "gaming", catLabel: "Gaming Setup", desc: "Teclado mecánico con switches ultra silenciosos, chasis de policarbonato translúcido e iluminación vibrante.", badge: "OFERTA", oldPrice: 199.99, class: "hue-shift-3" },
    { id: 5, title: "Lumina Pulse Speaker", price: 189.99, img: "img/headphones.png", cat: "audio", catLabel: "Altavoz Bluetooth", desc: "Lleva la fiesta a todas partes. Sonido 360° con bajos profundos y show de luces sincronizado.", badge: "", oldPrice: null, class: "hue-shift-2" },
    { id: 6, title: "Lumina Fit Band", price: 59.99, img: "img/headphones.png", cat: "wearables", catLabel: "Fitness", desc: "Tu compañero ideal para hacer ejercicio. Ultraligera, rastreo de sueño y más de 100 modos deportivos.", badge: "", oldPrice: null, class: "hue-shift-1" },
    { id: 7, title: "Lumina Mouse Pro", price: 89.99, img: "img/headphones.png", cat: "gaming", catLabel: "Gaming Mouse", desc: "Ratón ergonómico ultraligero (60g) con sensor óptico de 26K DPI. Precisión perfecta para esports.", badge: "OFERTA", oldPrice: 110.00, class: "hue-shift-3" },
    { id: 8, title: "Lumina Studio Mic", price: 149.99, img: "img/headphones.png", cat: "audio", catLabel: "Audio Profesional", desc: "Micrófono condensador USB ideal para podcasts y streaming. Captura de voz nítida con filtro pop integrado.", badge: "NUEVO", oldPrice: null, class: "" }
];

// Render Products
const productsGrid = document.getElementById('products-grid');
function renderProducts() {
    productsGrid.innerHTML = '';
    productDB.forEach((p, index) => {
        const delay = (index % 4) * 0.1;
        const oldPriceHtml = p.oldPrice ? `<span class="old-price">$${p.oldPrice.toFixed(2)}</span>` : '';
        const badgeHtml = p.badge ? `<div class="product-badge ${p.badge === 'OFERTA' ? 'sale' : ''}">${p.badge}</div>` : '';
        
        productsGrid.innerHTML += `
            <div class="product-card reveal-up" data-category="${p.cat}" style="--delay: ${delay}s">
                ${badgeHtml}
                <div class="product-img-wrapper">
                    <img src="${p.img}" alt="${p.title}" class="product-img ${p.class}">
                    <div class="product-actions">
                        <button class="icon-btn" onclick="quickView(${p.id})"><i class="fa-solid fa-eye"></i></button>
                        <button class="icon-btn" onclick="addToCart(${p.id}, '${p.title}', ${p.price}, '${p.img}')"><i class="fa-solid fa-cart-plus"></i></button>
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-cat">${p.catLabel}</span>
                    <h3 class="product-title">${p.title}</h3>
                    <div class="product-price-row">
                        <span class="product-price">$${p.price.toFixed(2)} ${oldPriceHtml}</span>
                        <div class="rating"><i class="fa-solid fa-star"></i> 4.9</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    // Re-observe new elements
    document.querySelectorAll('#products-grid .reveal-up').forEach(el => observer.observe(el));
}

renderProducts();

// Filters
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        filterCategory(filterValue);
    });
});

function filterCategory(cat) {
    // Update active button if called from elsewhere
    filterBtns.forEach(b => {
        if(b.getAttribute('data-filter') === cat) b.classList.add('active');
        else b.classList.remove('active');
    });

    document.querySelectorAll('.product-card').forEach(product => {
        if (cat === 'all' || product.getAttribute('data-category') === cat) {
            product.style.display = 'flex';
            setTimeout(() => product.style.opacity = '1', 50);
        } else {
            product.style.opacity = '0';
            setTimeout(() => product.style.display = 'none', 300);
        }
    });
}

// Shopping Cart Logic
let cart = [];
const cartToggle = document.getElementById('cart-toggle');
const closeCart = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');

function toggleCart() {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

cartToggle.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

function addToCart(id, title, price, img) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) existingItem.quantity += 1;
    else cart.push({ id, title, price, img, quantity: 1 });
    
    updateCartUI();
    showToast(`¡Agregado a la bolsa!`);
    
    cartToggle.style.transform = 'scale(1.2)';
    setTimeout(() => cartToggle.style.transform = 'scale(1)', 200);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) removeFromCart(id);
        else updateCartUI();
    }
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
    
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Tu bolsa está vacía. ¡Llénala de color!</div>';
        return;
    }
    
    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <img src="${item.img}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="quantity-ctrl" style="margin-top:0.5rem; display:inline-flex;">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
        `;
        cartItemsContainer.appendChild(itemEl);
    });
}

// Toast Notifications
const toastContainer = document.getElementById('toast-container');
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-check-circle" style="color: var(--primary); font-size:1.2rem;"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// Quick View Logic
const modalOverlay = document.getElementById('quick-view-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalBody = document.getElementById('modal-body');

function quickView(id) {
    const p = productDB.find(prod => prod.id === id);
    modalBody.innerHTML = `
        <div class="modal-img-col">
            <img src="${p.img}" class="modal-img ${p.class}" alt="${p.title}">
        </div>
        <div class="modal-info-col">
            <span class="product-cat">${p.catLabel}</span>
            <h2 class="modal-title">${p.title}</h2>
            <div class="rating" style="margin-bottom: 1.5rem; justify-content: flex-start; padding: 0; background:transparent;">
                <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i> (128 reviews)
            </div>
            <div class="modal-price">$${p.price.toFixed(2)}</div>
            <p class="modal-desc">${p.desc}</p>
            <ul style="color: var(--text-muted); margin-bottom: 2.5rem; padding-left: 1.5rem; line-height:1.8;">
                <li>Envío inmediato gratis a todo el país</li>
                <li>Devolución sin preguntas 30 días</li>
                <li>Materiales ecológicos y diseño premium</li>
            </ul>
            <button class="btn-primary modal-btn" onclick="addToCart(${id}, '${p.title}', ${p.price}, '${p.img}'); document.getElementById('quick-view-modal').classList.remove('active');">
                <i class="fa-solid fa-bag-shopping"></i> Añadir a la bolsa
            </button>
        </div>
    `;
    modalOverlay.classList.add('active');
}

closeModalBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('active');
});
