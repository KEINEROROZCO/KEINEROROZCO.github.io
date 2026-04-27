/**
 * LUMINA STORE - Expert Engineer Edition
 * Architecture: Module-based Service Layer
 */

// --- 1. CONFIGURATION & STATE ---
const state = {
    products: [],
    cart: JSON.parse(localStorage.getItem('lumina_cart')) || [],
    filters: {
        category: 'all',
        search: ''
    }
};

// --- 2. PRODUCT SERVICE (Faker.js & Unsplash) ---
const ProductService = {
    generateInitialProducts() {
        const { faker } = window;
        const products = [];
        const categories = window.CONFIG.CATEGORIES;

        const brands = ['Apex', 'Nova', 'Titan', 'Zenith', 'Echo', 'Vector', 'Lumina', 'Cyber', 'Aura', 'Quantum'];
        
        for (let i = 1; i <= window.CONFIG.PRODUCT_COUNT; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const brand = brands[Math.floor(Math.random() * brands.length)];
            const keywords = window.CONFIG.IMAGE_KEYWORDS[category];
            const randomKeyword = keywords.split(',')[Math.floor(Math.random() * 3)];
            
            products.push({
                id: i,
                title: `${brand} ${faker.commerce.productName()}`,
                price: parseFloat(faker.commerce.price({ min: 49, max: 2499 })),
                cat: category,
                desc: faker.commerce.productDescription(),
                img: `https://images.unsplash.com/photo-${faker.number.int({min: 1500000000000, max: 1700000000000})}?auto=format&fit=crop&w=800&q=80&sig=${i}&keywords=${randomKeyword}`,
                badge: i % 4 === 0 ? 'NEW' : (i % 7 === 0 ? 'TOP' : ''),
                class: ''
            });
        }
        // Override Unsplash with more curated logic if seeds fail to look "tech"
        products.forEach((p, idx) => {
            const techSeeds = [
                '1503926359681-285023f0a62d', // Headphones
                '1523275335684-37898b6baf30', // Watch
                '1590658268037-6bf12165a8df', // Mouse
                '1595225476474-87563907a212', // Phone
                '1590602847861-f357a9332bbc', // Speaker
                '1608043152269-423dbba4e7e1', // Laptop
                '1527864550417-7fd91fc51a46', // Tablet
                '1622979135225-d2ba269cf1ac', // VR
                '1507582020474-9a35b7d455d9', // Camera
                '1516035069371-29a1b244cc32', // Lens
                '1511707171634-5f897ff02aa9', // Mobile
                '1496181133206-80ce9b88a853'  // Desk
            ];
            p.img = `https://images.unsplash.com/photo-${techSeeds[idx % techSeeds.length]}?auto=format&fit=crop&w=800&q=80`;
        });
        
        state.products = products;
    }
};

// --- 3. CART SERVICE (Persistence & Logic) ---
const CartService = {
    add(productId) {
        const product = state.products.find(p => p.id === productId);
        if (!product) return;

        const existing = state.cart.find(item => item.id === productId);
        if (existing) {
            existing.qty++;
        } else {
            state.cart.push({ ...product, qty: 1 });
        }
        this.save();
        UIService.renderCart();
        UIService.showToast(`${product.title} añadido.`);
    },

    updateQty(productId, delta) {
        const item = state.cart.find(i => i.id === productId);
        if (item) {
            item.qty += delta;
            if (item.qty <= 0) {
                state.cart = state.cart.filter(i => i.id !== productId);
            }
            this.save();
            UIService.renderCart();
        }
    },

    save() {
        localStorage.setItem('lumina_cart', JSON.stringify(state.cart));
    },

    getTotal() {
        return state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    },

    getCount() {
        return state.cart.reduce((sum, item) => sum + item.qty, 0);
    }
};

// --- 4. EMAIL SERVICE (Resend Structure) ---
const EmailService = {
    async sendConfirmation(customerData, orderDetails) {
        console.log("Preparing Resend payload...");
        
        // Estructura oficial requerida por la API de Resend
        const payload = {
            from: `Lumina Store <${window.CONFIG.CONTACT_EMAIL}>`,
            to: [customerData.email],
            subject: `Confirmación de Pedido #${Math.floor(Math.random() * 1000000)}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
                    <h1 style="color: #1a1a1a;">¡Gracias por tu compra, ${customerData.name}!</h1>
                    <p>Hemos recibido tu pedido y lo estamos procesando.</p>
                    <hr>
                    <h3>Resumen del Pedido</h3>
                    <ul>
                        ${orderDetails.items.map(i => `<li>${i.title} (x${i.qty}) - $${(i.price * i.qty).toFixed(2)}</li>`).join('')}
                    </ul>
                    <p><strong>Total: $${orderDetails.total.toFixed(2)}</strong></p>
                    <p>Dirección de envío: ${customerData.address}</p>
                    <hr>
                    <p style="font-size: 12px; color: #888;">Lumina Store Demo - No es una tienda real.</p>
                </div>
            `,
            headers: {
                'X-Entity-Ref-ID': '123456789'
            }
        };

        console.log("Resend API Simulation:", payload);
        
        // Simulación de fetch a Resend
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Email enviado exitosamente vía Resend.");
                resolve({ success: true, messageId: 'resend_msg_' + Date.now() });
            }, 1500);
        });
    }
};

// --- 5. UI SERVICE (GSAP & Rendering) ---
const UIService = {
    init() {
        this.setupEventListeners();
        this.renderCatalog();
        this.renderCart();
        this.initAnimations();
    },

    setupEventListeners() {
        // Navigation & Scroll
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            navbar.classList.toggle('scrolled', window.scrollY > 20);
        });

        // Cart Toggle
        document.getElementById('cart-toggle').addEventListener('click', () => this.toggleCart(true));
        document.getElementById('close-cart').addEventListener('click', () => this.toggleCart(false));
        document.getElementById('cart-overlay').addEventListener('click', () => this.toggleCart(false));

        // Filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                state.filters.category = e.target.dataset.filter;
                this.renderCatalog();
            });
        });

        // Search Logic
        const searchToggle = document.getElementById('search-toggle');
        const searchBox = document.getElementById('search-box');
        const searchInput = document.getElementById('search-input');

        searchToggle.addEventListener('click', () => {
            searchBox.classList.toggle('active');
            if (searchBox.classList.contains('active')) {
                searchInput.focus();
            }
        });

        searchInput.addEventListener('input', (e) => {
            state.filters.search = e.target.value;
            this.renderCatalog();
        });

        // Checkout
        document.getElementById('checkout-main-btn').addEventListener('click', () => this.toggleCheckoutModal(true));
        document.getElementById('close-checkout').addEventListener('click', () => this.toggleCheckoutModal(false));
        document.getElementById('checkout-form').addEventListener('submit', (e) => CheckoutService.handleOrder(e));

        // Quick View Modal
        document.getElementById('close-modal').addEventListener('click', () => {
            document.getElementById('quick-view-modal').classList.remove('active');
        });
    },

    renderCatalog() {
        const grid = document.getElementById('catalog-grid');
        const filtered = state.products.filter(p => {
            const catMatch = state.filters.category === 'all' || p.cat === state.filters.category;
            const searchMatch = p.title.toLowerCase().includes(state.filters.search.toLowerCase());
            return catMatch && searchMatch;
        });

        grid.innerHTML = filtered.map((p, i) => `
            <div class="product-card reveal-up" style="--delay: ${(i % 4) * 0.1}s" onclick="UIService.quickView(${p.id})">
                <div class="prod-img-box">
                    ${p.badge ? `<span class="badge ${p.badge === 'OFERTA' ? 'sale' : ''}">${p.badge}</span>` : ''}
                    <img src="${p.img}" alt="${p.title}" class="prod-img">
                    <div class="prod-actions-overlay">
                        <button class="icon-btn" onclick="event.stopPropagation(); CartService.add(${p.id})">
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
        `).join('');

        // Trigger GSAP entrance for items
        gsap.from('#catalog-grid .product-card', {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out"
        });
    },

    renderCart() {
        const itemsContainer = document.getElementById('cart-items');
        const countElement = document.getElementById('cart-count');
        const totalElement = document.getElementById('cart-total-price');

        countElement.textContent = CartService.getCount();
        totalElement.textContent = `$${CartService.getTotal().toFixed(2)}`;

        if (state.cart.length === 0) {
            itemsContainer.innerHTML = '<div class="empty-cart-msg">Tu carrito está vacío.</div>';
            return;
        }

        itemsContainer.innerHTML = state.cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="CartService.updateQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="CartService.updateQty(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="CartService.updateQty(${item.id}, -${item.qty})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    toggleCart(open) {
        const sidebar = document.getElementById('cart-sidebar');
        const overlay = document.getElementById('cart-overlay');
        
        if (open) {
            sidebar.classList.add('active');
            overlay.classList.add('active');
            gsap.from(sidebar, { x: 400, duration: 0.5, ease: "power3.out" });
        } else {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    },

    toggleCheckoutModal(open) {
        const modal = document.getElementById('checkout-modal');
        if (open) {
            if (state.cart.length === 0) {
                this.showToast("Agrega productos primero", "warning");
                return;
            }
            this.renderCheckoutSummary();
            modal.classList.add('active');
            gsap.from(".checkout-content", { scale: 0.9, opacity: 0, duration: 0.4, ease: "back.out(1.7)" });
        } else {
            modal.classList.remove('active');
        }
    },

    renderCheckoutSummary() {
        const summaryList = document.getElementById('checkout-summary-list');
        const total = document.getElementById('summary-total-price');
        
        summaryList.innerHTML = state.cart.map(i => `
            <div class="summary-item">
                <span>${i.title} x${i.qty}</span>
                <span>$${(i.price * i.qty).toFixed(2)}</span>
            </div>
        `).join('');
        
        total.textContent = `$${CartService.getTotal().toFixed(2)}`;
    },

    quickView(id) {
        const p = state.products.find(prod => prod.id === id);
        if (!p) return;

        const modal = document.getElementById('quick-view-modal');
        const body = document.getElementById('modal-body');

        body.innerHTML = `
            <div class="modal-img-col">
                <img src="${p.img}" alt="${p.title}">
            </div>
            <div class="modal-info-col">
                <div class="prod-cat">${p.cat}</div>
                <h2>${p.title}</h2>
                <div class="modal-price">$${p.price.toFixed(2)}</div>
                <p class="modal-desc">${p.desc}</p>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="CartService.add(${p.id}); UIService.toggleModal('quick-view-modal', false)">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;
        modal.classList.add('active');
        gsap.from(".modal-content", { y: 50, opacity: 0, duration: 0.4 });
    },

    toggleModal(id, open) {
        document.getElementById(id).classList.toggle('active', open);
    },

    showToast(msg, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-check' : 'fa-triangle-exclamation'}"></i> ${msg}`;
        container.appendChild(toast);

        gsap.from(toast, { x: 100, opacity: 0, duration: 0.4 });
        
        setTimeout(() => {
            gsap.to(toast, { x: 100, opacity: 0, duration: 0.4, onComplete: () => toast.remove() });
        }, 3000);
    },

    initAnimations() {
        // Hero entrance
        gsap.from(".hero-title", { opacity: 0, y: 50, duration: 1, delay: 1.5 });
        gsap.from(".hero-subtitle", { opacity: 0, y: 30, duration: 1, delay: 1.7 });
        gsap.from(".hero-actions", { opacity: 0, y: 20, duration: 1, delay: 1.9 });
    }
};

// --- 6. CHECKOUT SERVICE (Logic & Validation) ---
const CheckoutService = {
    async handleOrder(event) {
        event.preventDefault();
        const btn = event.target.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Procesando...';

        const customerData = {
            name: document.getElementById('cust-name').value,
            email: document.getElementById('cust-email').value,
            address: document.getElementById('cust-address').value
        };

        const orderDetails = {
            items: state.cart,
            total: CartService.getTotal()
        };

        try {
            // Llamada al servicio de Email (Resend)
            await EmailService.sendConfirmation(customerData, orderDetails);
            
            UIService.showToast("¡Pedido confirmado! Revisa tu email.");
            state.cart = [];
            CartService.save();
            UIService.renderCart();
            UIService.toggleCheckoutModal(false);
            
            // Éxito visual
            this.showSuccessAnimation();
        } catch (error) {
            UIService.showToast("Error al procesar el pedido.", "error");
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    },

    showSuccessAnimation() {
        const successOverlay = document.createElement('div');
        successOverlay.className = 'order-success-overlay';
        successOverlay.innerHTML = `
            <div class="success-card">
                <i class="fa-solid fa-circle-check"></i>
                <h2>¡Compra Exitosa!</h2>
                <p>Tu orden ha sido enviada vía Resend.</p>
                <button class="btn-primary" onclick="this.parentElement.parentElement.remove()">Volver a la tienda</button>
            </div>
        `;
        document.body.appendChild(successOverlay);
        gsap.from(".success-card", { scale: 0.5, opacity: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
    }
};

// --- INITIALIZATION ---
window.addEventListener('load', () => {
    // 1. Loader Logic
    setTimeout(() => {
        const loader = document.getElementById('loader');
        gsap.to(loader, { opacity: 0, duration: 0.5, onComplete: () => loader.style.display = 'none' });
    }, 1200);

    // 2. Data Generation
    ProductService.generateInitialProducts();

    // 3. 3D Spline Fallback check
    setTimeout(() => {
        const viewers = document.querySelectorAll('spline-viewer');
        viewers.forEach(v => {
            const shadow = v.shadowRoot;
            if (!shadow || shadow.childElementCount === 0) {
                console.warn("Spline viewer failed to load. Showing fallback image.");
                const fallback = v.parentElement.querySelector('.fallback-img');
                if (fallback) fallback.style.display = 'block';
                v.style.display = 'none';
            }
        });
    }, 5000); // Wait 5s for Spline to load

    // 4. UI Start
    UIService.init();
});

// Export references for inline onclicks
window.UIService = UIService;
window.CartService = CartService;
