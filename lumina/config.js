/**
 * CONFIGURACIÓN DE ENTORNO - LUMINA STORE
 * Aquí se gestionan las claves y configuraciones globales.
 */

window.CONFIG = {
    // Claves de API (Placeholders para el demo)
    RESEND_API_KEY: 're_1234567890abcdef', // Tu clave de resend.com
    UNSPLASH_ACCESS_KEY: '', // Opcional si se usa el Source API directo
    
    // Configuración de la tienda
    STORE_NAME: 'Lumina Premium',
    CONTACT_EMAIL: 'soporte@lumina-store.com',
    CURRENCY: '$',
    
    // Configuración de Faker
    PRODUCT_COUNT: 12,
    CATEGORIES: ['audio', 'wearables', 'gaming', 'tech'],
    
    // Imágenes (Keywords para Unsplash)
    IMAGE_KEYWORDS: {
        audio: 'luxury-headphones,studio-monitor,minimalist-audio',
        wearables: 'smartwatch-ultra,fitness-tracker-tech,cyberpunk-watch',
        gaming: 'mechanical-keyboard-rgb,gaming-mouse-pro,rgb-setup',
        tech: 'high-tech-laptop,drone-4k,smart-home-display'
    }
};
