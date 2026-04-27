// --- ADVANCED JS MOCK DATABASE (20 Products) ---
// Using highly reliable Unsplash IDs + Fallback Error Logic
const storeDB = [
    // BEBIDAS
    { id: 1, title: "Coca-Cola Original 1.5L", price: 2.50, cat: "Bebidas", desc: "Refresco clásico familiar.", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80" },
    { id: 2, title: "Jugo de Naranja 1L", price: 1.80, cat: "Bebidas", desc: "Jugo 100% natural sin azúcar añadida.", img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=80" },
    { id: 3, title: "Agua Mineral 500ml", price: 0.80, cat: "Bebidas", desc: "Agua de manantial purificada.", img: "https://images.unsplash.com/photo-1559839914-11aabe54457c?auto=format&fit=crop&w=500&q=80" },
    { id: 4, title: "Cerveza Artesanal IPA", price: 3.50, cat: "Bebidas", desc: "Cerveza local con notas cítricas.", img: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=500&q=80" },
    { id: 5, title: "Café Molido Premium 500g", price: 5.50, cat: "Bebidas", desc: "Café de origen colombiano, tueste medio.", img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=500&q=80" },
    
    // SNACKS
    { id: 6, title: "Papas Fritas Clásicas", price: 1.20, cat: "Snacks", desc: "Papas crujientes con sal de mar.", img: "https://images.unsplash.com/photo-1599599810062-8d5152422b10?auto=format&fit=crop&w=500&q=80" },
    { id: 7, title: "Chocolate Amargo 70%", price: 2.00, cat: "Snacks", desc: "Chocolate oscuro artesanal.", img: "https://images.unsplash.com/photo-1548882583-11eb85c6c666?auto=format&fit=crop&w=500&q=80" },
    { id: 8, title: "Galletas de Chispas", price: 1.50, cat: "Snacks", desc: "Galletas horneadas recién hechas.", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=500&q=80" },
    { id: 9, title: "Almendras Tostadas", price: 4.00, cat: "Snacks", desc: "Almendras ricas en proteína.", img: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=500&q=80" },
    { id: 10, title: "Palomitas de Maíz", price: 1.00, cat: "Snacks", desc: "Listas para el microondas.", img: "https://images.unsplash.com/photo-1578849278019-dc524f739662?auto=format&fit=crop&w=500&q=80" },

    // DESPENSA
    { id: 11, title: "Pan de Molde Blanco", price: 1.50, cat: "Despensa", desc: "Pan suave ideal para sándwiches.", img: "https://images.unsplash.com/photo-1598373182133-d411572fce4d?auto=format&fit=crop&w=500&q=80" },
    { id: 12, title: "Huevos Frescos (Docena)", price: 2.80, cat: "Despensa", desc: "Huevos de granja locales.", img: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=500&q=80" },
    { id: 13, title: "Aceite de Oliva Extra Virgen", price: 6.50, cat: "Despensa", desc: "Aceite puro para ensaladas.", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80" },
    { id: 14, title: "Pasta Spaghetti 500g", price: 1.20, cat: "Despensa", desc: "Pasta de sémola de trigo duro.", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80" },
    { id: 15, title: "Salsa de Tomate Casera", price: 2.20, cat: "Despensa", desc: "Receta tradicional sin conservantes.", img: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?auto=format&fit=crop&w=500&q=80" },

    // LACTEOS & FRESCOS & LIMPIEZA
    { id: 16, title: "Leche Entera 1L", price: 1.40, cat: "Lacteos", desc: "Leche pasteurizada fresca.", img: "https://images.unsplash.com/photo-1563636916-2c5e5330cb10?auto=format&fit=crop&w=500&q=80" },
    { id: 17, title: "Queso Cheddar 250g", price: 3.50, cat: "Lacteos", desc: "Queso curado ideal para derretir.", img: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=500&q=80" },
    { id: 18, title: "Manzanas Rojas (1kg)", price: 3.00, cat: "Frescos", desc: "Manzanas dulces de temporada.", img: "https://images.unsplash.com/photo-1560806887-1e4cd0b9faa6?auto=format&fit=crop&w=500&q=80" },
    { id: 19, title: "Bananas Frescas", price: 1.10, cat: "Frescos", desc: "Ricas en potasio.", img: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=500&q=80" },
    { id: 20, title: "Jabón Líquido Antibacterial", price: 2.50, cat: "Limpieza", desc: "Protege a tu familia de bacterias.", img: "https://images.unsplash.com/photo-1584813470613-5b1c1cad3d69?auto=format&fit=crop&w=500&q=80" }
];

const FALLBACK_IMG = "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=500&q=80"; // Generic basket image

// --- STATE MANAGEMENT ---
let cart = JSON.parse(localStorage.getItem('tienda_barrio_cart_v2')) || [];
let currentCategory = 'all';
let currentSearch = '';

// --- DOM ELEMENTS ---
const grid = document.getElementById('product-grid');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTax = document.getElementById('cart-tax');
const cartShipping = document.getElementById('cart-shipping');
const cartTotal = document.getElementById('cart-total-price');
const toastContainer = document.getElementById('toast-container');

// --- RENDERING LOGIC ---
function renderProducts() {
    grid.innerHTML = '';
    
    const filtered = storeDB.filter(product => {
        const matchCategory = currentCategory === 'all' || product.cat === currentCategory;
        const matchSearch = product.title.toLowerCase().includes(currentSearch.toLowerCase());
        return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; padding: 40px; color: #777; font-size: 1.2rem;">No se encontraron productos en esta categoría.</p>';
        return;
    }

    filtered.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-tilt', ''); // Setup Vanilla Tilt
        card.setAttribute('data-tilt-scale', '1.02');
        card.setAttribute('data-tilt-glare', 'true');
        card.setAttribute('data-tilt-max-glare', '0.2');
        
        card.innerHTML = `
            <div class="prod-img-wrapper" onclick="openQuickView(${p.id})">
                <img src="${p.img}" alt="${p.title}" class="prod-img" onerror="this.src='${FALLBACK_IMG}'">
                <div class="quick-view-overlay">
                    <span class="quick-view-btn"><i class="fa-solid fa-eye"></i> Vista Rápida</span>
                </div>
            </div>
            <div class="prod-cat">${p.cat}</div>
            <div class="prod-title">${p.title}</div>
            <div class="prod-footer">
                <div class="prod-price">$${p.price.toFixed(2)}</div>
                <button class="add-btn" onclick="addToCart(${p.id}); event.stopPropagation();">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        `;
        grid.appendChild(card);
    });

    // Initialize Tilt
    VanillaTilt.init(document.querySelectorAll(".product-card"));

    // GSAP Staggered Entrance
    if (window.gsap) {
        gsap.fromTo(".product-card", 
            { opacity: 0, y: 40 }, 
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "back.out(1.2)" }
        );
    }
}

function renderCart() {
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align:center; color:#777; margin-top: 50px;">
                <i class="fa-solid fa-basket-shopping" style="font-size: 3rem; color: var(--gray); margin-bottom: 15px;"></i>
                <p>Tu canasta está vacía.</p>
            </div>`;
        cartSubtotal.textContent = "$0.00";
        cartTax.textContent = "$0.00";
        cartShipping.textContent = "$0.00";
        cartTotal.textContent = "$0.00";
        cartCount.textContent = 0;
        return;
    }

    cart.forEach(item => {
        subtotal += item.price * item.qty;
        count += item.qty;
        
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.title}" onerror="this.src='${FALLBACK_IMG}'">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div style="color: var(--primary); font-weight: 800;">$${item.price.toFixed(2)}</div>
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

    const tax = subtotal * 0.19; // 19% IVA
    const shipping = subtotal > 20 ? 0 : 2.50; // Free shipping over $20
    const finalTotal = subtotal + tax + shipping;

    cartCount.textContent = count;
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTax.textContent = `$${tax.toFixed(2)}`;
    cartShipping.textContent = shipping === 0 ? "¡Gratis!" : `$${shipping.toFixed(2)}`;
    cartTotal.textContent = `$${finalTotal.toFixed(2)}`;
    
    localStorage.setItem('tienda_barrio_cart_v2', JSON.stringify(cart));
}

// --- CART LOGIC ---
window.addToCart = (id) => {
    const product = storeDB.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    renderCart();
    showToast(`${product.title} añadido a la canasta`);
    
    // Animate cart icon
    if(window.gsap) {
        gsap.fromTo('#cart-toggle', {scale: 1.4, rotation: 10}, {scale: 1, rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)'});
    }
};

window.updateQty = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        renderCart();
    }
};

// --- TOAST NOTIFICATIONS ---
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-check-circle"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    if (window.gsap) {
        gsap.to(toast, { x: 0, duration: 0.4, ease: "power2.out" });
        setTimeout(() => {
            gsap.to(toast, { x: '120%', opacity: 0, duration: 0.4, onComplete: () => toast.remove() });
        }, 3000);
    }
}

// --- MODALS (QUICK VIEW & CHECKOUT) ---
window.openQuickView = (id) => {
    const p = storeDB.find(prod => prod.id === id);
    if(!p) return;
    
    const qvBody = document.getElementById('qv-body');
    qvBody.innerHTML = `
        <div class="qv-img-col">
            <img src="${p.img}" alt="${p.title}" onerror="this.src='${FALLBACK_IMG}'">
        </div>
        <div class="qv-info-col">
            <div class="prod-cat">${p.cat}</div>
            <h2>${p.title}</h2>
            <div class="qv-price">$${p.price.toFixed(2)}</div>
            <p class="qv-desc">${p.desc}</p>
            <button class="btn-primary magnetic-btn" style="margin-top:20px;" onclick="addToCart(${p.id}); closeModal('quick-view-modal')">
                Añadir al Carrito <i class="fa-solid fa-cart-plus"></i>
            </button>
        </div>
    `;
    
    document.getElementById('quick-view-modal').classList.add('active');
};

window.closeModal = (id) => {
    document.getElementById(id).classList.remove('active');
};

// --- EVENT LISTENERS ---
document.getElementById('cart-toggle').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.add('active');
    document.getElementById('cart-overlay').classList.add('active');
});

document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.remove('active');
    document.getElementById('cart-overlay').classList.remove('active');
});

document.getElementById('cart-overlay').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.remove('active');
    document.getElementById('cart-overlay').classList.remove('active');
});

// Category Filters
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentCategory = e.target.dataset.cat;
        renderProducts();
    });
});

// Search Filter
document.getElementById('search-input').addEventListener('input', (e) => {
    currentSearch = e.target.value;
    renderProducts();
});

// Checkout Flow
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) return alert("Agrega productos primero.");
    document.getElementById('checkout-modal').classList.add('active');
    document.getElementById('cart-sidebar').classList.remove('active');
    document.getElementById('cart-overlay').classList.remove('active');
});

document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerHTML = "<i class='fa-solid fa-spinner fa-spin'></i> Procesando...";
    
    setTimeout(() => {
        alert("¡Pedido realizado con éxito! Un repartidor se comunicará contigo.");
        cart = [];
        renderCart();
        closeModal('checkout-modal');
        btn.innerHTML = "Enviar Pedido por WhatsApp";
        e.target.reset();
    }, 2000);
});

// --- MAGNETIC BUTTON ANIMATION (Vanilla JS + GSAP) ---
const magneticBtns = document.querySelectorAll('.magnetic-btn');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const h = rect.width / 2;
        const v = rect.height / 2;
        const x = e.clientX - rect.left - h;
        const y = e.clientY - rect.top - v;
        
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
    });
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    });
});

// --- INIT ---
window.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCart();
    
    // Hero Animations
    if(window.gsap) {
        gsap.from(".hero-title", {opacity: 0, y: 30, duration: 1, delay: 0.2});
        gsap.from(".hero-subtitle", {opacity: 0, y: 30, duration: 1, delay: 0.4});
        gsap.from(".hero-btn", {opacity: 0, scale: 0.9, duration: 0.8, delay: 0.6, ease: "back.out(1.5)"});
    }
});
