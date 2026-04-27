// --- JS MOCK DATABASE ---
const storeDB = [
    {
        id: 1,
        title: "Coca-Cola Original 1.5L",
        price: 2.50,
        cat: "Bebidas",
        img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        title: "Jugo de Naranja Natural",
        price: 1.80,
        cat: "Bebidas",
        img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        title: "Papas Fritas Clásicas",
        price: 1.20,
        cat: "Snacks",
        img: "https://images.unsplash.com/photo-1599599810062-8d5152422b10?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        title: "Barra de Chocolate Oscuro",
        price: 2.00,
        cat: "Snacks",
        img: "https://images.unsplash.com/photo-1548882583-11eb85c6c666?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        title: "Pan de Molde Blanco",
        price: 1.50,
        cat: "Despensa",
        img: "https://images.unsplash.com/photo-1598373182133-d411572fce4d?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        title: "Huevos Frescos (Docena)",
        price: 2.80,
        cat: "Despensa",
        img: "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        title: "Leche Entera 1L",
        price: 1.40,
        cat: "Despensa",
        img: "https://images.unsplash.com/photo-1563636916-2c5e5330cb10?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        title: "Manzanas Rojas (1kg)",
        price: 3.00,
        cat: "Frescos",
        img: "https://images.unsplash.com/photo-1582285549040-e14b1050e504?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 9,
        title: "Bananas Frescas",
        price: 1.10,
        cat: "Frescos",
        img: "https://images.unsplash.com/photo-1518977672816-2266a4f9103e?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 10,
        title: "Tomates Frescos",
        price: 1.60,
        cat: "Frescos",
        img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80"
    }
];

// --- STATE MANAGEMENT ---
let cart = JSON.parse(localStorage.getItem('tienda_barrio_cart')) || [];
let currentCategory = 'all';
let currentSearch = '';

// --- DOM ELEMENTS ---
const grid = document.getElementById('product-grid');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total-price');

// --- RENDERING LOGIC ---
function renderProducts() {
    grid.innerHTML = '';
    
    const filtered = storeDB.filter(product => {
        const matchCategory = currentCategory === 'all' || product.cat === currentCategory;
        const matchSearch = product.title.toLowerCase().includes(currentSearch.toLowerCase());
        return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; padding: 40px; color: #777;">No se encontraron productos.</p>';
        return;
    }

    filtered.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        // Basic animation delay
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        card.innerHTML = `
            <img src="${p.img}" alt="${p.title}" class="prod-img">
            <div class="prod-cat">${p.cat}</div>
            <div class="prod-title">${p.title}</div>
            <div class="prod-footer">
                <div class="prod-price">$${p.price.toFixed(2)}</div>
                <button class="add-btn" onclick="addToCart(${p.id})">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        `;
        grid.appendChild(card);
        
        // GSAP animate in
        if (window.gsap) {
            gsap.to(card, { opacity: 1, y: 0, duration: 0.5, delay: i * 0.05 });
        } else {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color:#777; margin-top: 20px;">Tu canasta está vacía.</p>';
    } else {
        cart.forEach(item => {
            total += item.price * item.qty;
            count += item.qty;
            
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.title}">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div style="color: var(--primary); font-weight: bold;">$${item.price.toFixed(2)}</div>
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

    cartCount.textContent = count;
    cartTotal.textContent = `$${total.toFixed(2)}`;
    localStorage.setItem('tienda_barrio_cart', JSON.stringify(cart));
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
    
    // Quick visual feedback on cart icon
    if(window.gsap) {
        gsap.fromTo('#cart-toggle', {scale: 1.3}, {scale: 1, duration: 0.3, ease: 'bounce.out'});
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
    document.getElementById('checkout-modal').classList.remove('active');
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

// Checkout Modal
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) return alert("Agrega productos primero.");
    document.getElementById('checkout-modal').classList.add('active');
    document.getElementById('cart-overlay').classList.add('active');
    document.getElementById('cart-sidebar').classList.remove('active');
});

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('checkout-modal').classList.remove('active');
    document.getElementById('cart-overlay').classList.remove('active');
});

// Checkout Form Submission
document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.textContent = "Procesando...";
    
    // Simular envío
    setTimeout(() => {
        alert("¡Pedido realizado con éxito! Nos comunicaremos por WhatsApp.");
        cart = [];
        renderCart();
        document.getElementById('checkout-modal').classList.remove('active');
        document.getElementById('cart-overlay').classList.remove('active');
        btn.textContent = "Enviar Pedido por WhatsApp";
        e.target.reset();
    }, 1500);
});

// --- INIT ---
renderProducts();
renderCart();
