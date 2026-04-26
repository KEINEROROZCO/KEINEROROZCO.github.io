// Loader Logic
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        // Trigger initial animations
        document.querySelectorAll('.hero .reveal-left, .hero .reveal-right').forEach(el => {
            el.classList.add('active');
        });
    }, 2000); // 2 second mock load for effect
});

// Scroll Reveal with Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .fade-in').forEach(el => {
    observer.observe(el);
});

// Advanced 3D Tilt Effect on Cards
const cards = document.querySelectorAll('.3d-tilt');

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element.
        const y = e.clientY - rect.top;  // y position within the element.
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        // Handle glow effect
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.opacity = '1';
            glow.style.transform = `translate(${x - 100}px, ${y - 100}px)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        const glow = card.querySelector('.card-glow');
        if (glow) glow.style.opacity = '0';
    });
});

// Hero 3D Mouse Parallax
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
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Shopping Cart Logic (Same as before but enhanced)
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
    showToast(`¡${title} añadido al carrito!`);
    
    cartToggle.classList.add('anim-pulse');
    setTimeout(() => cartToggle.classList.remove('anim-pulse'), 500);
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
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Tu carrito está vacío. Descubre el futuro.</div>';
        return;
    }
    
    cart.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.style.animation = `slideIn 0.3s ease forwards ${index * 0.1}s`;
        itemEl.style.opacity = '0';
        itemEl.innerHTML = `
            <img src="${item.img}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-actions">
                    <div class="quantity-ctrl">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemEl);
    });
}

// Toast Notifications
const toastContainer = document.getElementById('toast-container');
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-bolt" style="color: var(--accent);"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Quick View Logic
const modalOverlay = document.getElementById('quick-view-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalBody = document.getElementById('modal-body');

// Product DB Mock
const productDB = {
    1: { title: "Nexus Pro Headphones", price: 299.99, img: "img/headphones.png", cat: "Audio Premium", desc: "Auriculares inalámbricos con cancelación de ruido activa inteligente impulsada por IA y audio espacial holográfico. Batería de 40 horas.", class: "" },
    2: { title: "Nexus Watch Ultra", price: 199.99, img: "img/headphones.png", cat: "Wearables", desc: "Smartwatch futurista con monitoreo biométrico avanzado y proyector holográfico integrado en la pantalla de zafiro.", class: "hue-shift-1" },
    3: { title: "Nexus Earbuds Lite", price: 89.99, img: "img/headphones.png", cat: "Audio Portátil", desc: "Diseño ultracompacto con sonido Hi-Res y control por gestos en el aire. La máxima portabilidad sin comprometer calidad.", class: "hue-shift-2" },
    4: { title: "Nexus Mech Keyboard", price: 149.99, img: "img/headphones.png", cat: "Gaming Setup", desc: "Teclado mecánico con switches ópticos de 0.1ms de respuesta y teclas flotantes con iluminación RGB programable por tecla.", class: "hue-shift-3" }
};

function quickView(id) {
    const p = productDB[id];
    modalBody.innerHTML = `
        <div class="modal-img-col">
            <img src="${p.img}" class="modal-img ${p.class}" alt="${p.title}">
        </div>
        <div class="modal-info-col">
            <span class="product-cat">${p.cat}</span>
            <h2 class="modal-title">${p.title}</h2>
            <div class="rating" style="margin-bottom: 1rem; justify-content: flex-start; padding: 0;">
                <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i> (128 reviews)
            </div>
            <div class="modal-price">$${p.price.toFixed(2)}</div>
            <p class="modal-desc">${p.desc}</p>
            <ul style="color: var(--text-muted); margin-bottom: 2rem; padding-left: 1.5rem;">
                <li>Envío inmediato gratis</li>
                <li>Devolución sin preguntas 30 días</li>
                <li>Garantía Premium Nexus</li>
            </ul>
            <button class="btn-primary modal-btn glow-btn" onclick="addToCart(${id}, '${p.title}', ${p.price}, '${p.img}'); document.getElementById('quick-view-modal').classList.remove('active');">
                <i class="fa-solid fa-cart-plus"></i> Añadir al Carrito
            </button>
        </div>
    `;
    modalOverlay.classList.add('active');
}

closeModalBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('active');
});

// Filters
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        document.querySelectorAll('.product-card').forEach(product => {
            if (filterValue === 'all' || product.getAttribute('data-category') === filterValue) {
                product.style.display = 'block';
                setTimeout(() => product.style.opacity = '1', 50);
            } else {
                product.style.opacity = '0';
                setTimeout(() => product.style.display = 'none', 300);
            }
        });
    });
});
