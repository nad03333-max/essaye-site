// Données des produits étendues
const products = [
    {
        id: 1,
        name: "Ensemble Naissance Coral",
        price: 15000,
        oldPrice: 18000,
        image: "https://images.unsplash.com/photo-1544733231-6b5ce3e0dd8e?w=400&h=400&fit=crop",
        category: "nouveau",
        description: "Adorable ensemble 2 pièces en coton biologique doux pour nouveau-né",
        material: "100% Coton Biologique",
        sizes: ["0-3 mois", "3-6 mois"],
        colors: ["Coral", "Blanc"]
    },
    {
        id: 2,
        name: "Body Turquoise Premium",
        price: 8000,
        oldPrice: 10000,
        image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&h=400&fit=crop",
        category: "garcon",
        description: "Body confortable en coton 100% - parfait pour les petits garçons",
        material: "100% Coton Premium",
        sizes: ["0-3 mois", "3-6 mois", "6-12 mois"],
        colors: ["Turquoise", "Bleu ciel"]
    },
    {
        id: 3,
        name: "Pyjama Lavande Étoiles",
        price: 12000,
        oldPrice: 14000,
        image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400&h=400&fit=crop",
        category: "fille",
        description: "Pyjama doux avec motifs d'étoiles pour dodo douillet",
        material: "100% Coton",
        sizes: ["3-6 mois", "6-12 mois"],
        colors: ["Lavande", "Rose pâle"]
    },
    {
        id: 4,
        name: "Robe de Fête Sage Green",
        price: 25000,
        oldPrice: 32000,
        image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=400&h=400&fit=crop",
        category: "occasion",
        description: "Robe élégante en tulle avec finitions dentelle - parfaite pour les occasions",
        material: "Tulle et Dentelle",
        sizes: ["6-12 mois", "12-18 mois"],
        colors: ["Sage Green", "Blanc ivoire"]
    },
    {
        id: 5,
        name: "Cardigan Peach Doux",
        price: 18000,
        oldPrice: 22000,
        image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=400&h=400&fit=crop",
        category: "fille",
        description: "Cardigan chaud en tricot merino pour protéger bébé du froid",
        material: "Laine Merino",
        sizes: ["0-3 mois", "3-6 mois", "6-12 mois"],
        colors: ["Peach", "Rose bonbon"]
    },
    {
        id: 6,
        name: "Salopette Denim Vintage",
        price: 20000,
        oldPrice: 25000,
        image: "https://images.unsplash.com/photo-1503944168849-c1246463e59b?w=400&h=400&fit=crop",
        category: "unisexe",
        description: "Salopette décontractée en denim souple pour bébé actif",
        material: "Denim 100% Coton",
        sizes: ["3-6 mois", "6-12 mois", "12-18 mois"],
        colors: ["Bleu clair", "Bleu foncé"]
    },
    {
        id: 7,
        name: "Robe Dentelle Cream",
        price: 22000,
        oldPrice: 28000,
        image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop",
        category: "fille",
        description: "Robe sophistiquée en dentelle pour les petites princesses",
        material: "Dentelle Premium",
        sizes: ["6-12 mois", "12-18 mois"],
        colors: ["Cream", "Blanc"]
    },
    {
        id: 8,
        name: "T-shirt Graphique Turquoise",
        price: 7000,
        oldPrice: 9000,
        image: "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?w=400&h=400&fit=crop",
        category: "garcon",
        description: "T-shirt confortable avec dessin adorable",
        material: "100% Coton",
        sizes: ["0-3 mois", "3-6 mois", "6-12 mois"],
        colors: ["Turquoise", "Coral"]
    },
    {
        id: 9,
        name: "Bonnet Lavande Tricot",
        price: 5000,
        oldPrice: 6000,
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=400&fit=crop",
        category: "nouveau",
        description: "Bonnet doux et chaud en tricot premium",
        material: "Tricot Premium",
        sizes: ["0-3 mois", "3-6 mois"],
        colors: ["Lavande", "Sage"]
    }
];

let cart = [];
let wishlist = [];
let currentProduct = null;
let currentFilter = 'all';
let currentSort = 'recent';

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    loadWishlist();
    displayProducts();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('cart-btn').addEventListener('click', scrollToCart);
    document.getElementById('wishlist-btn').addEventListener('click', toggleWishlistPanel);
}

// Afficher les produits
function displayProducts(productsToShow = products) {
    const grid = document.getElementById('products-grid');
    let filtered = productsToShow;

    if (currentFilter !== 'all') {
        filtered = filtered.filter(p => p.category === currentFilter);
    }

    // Tri
    if (currentSort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    }

    grid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <div class="product-badge">${product.category === 'nouveau' ? 'NOUVEAU' : 'PROMO'}</div>
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <button class="wishlist-btn-card ${wishlist.includes(product.id) ? 'active' : ''}" 
                    onclick="toggleWishlistItem(event, ${product.id})">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="rating">★★★★★ <span>(${Math.floor(Math.random() * 50) + 10})</span></div>
                <div class="price-tag">
                    <span class="price">${product.price.toLocaleString()} FCFA</span>
                    <span class="old-price">${product.oldPrice.toLocaleString()}</span>
                </div>
                <button class="btn btn-outline" onclick="openProductModal(${product.id})">
                    <i class="fas fa-eye"></i> Voir détails
                </button>
            </div>
        </div>
    `).join('');
}

// Filtrer produits
function filterProducts(category) {
    currentFilter = category;
    displayProducts();
    document.getElementById('produits').scrollIntoView({ behavior: 'smooth' });
}

// Trier produits
function sortProducts() {
    currentSort = document.getElementById('sort').value;
    displayProducts();
}

// Réinitialiser filtres
function resetFilters() {
    currentFilter = 'all';
    currentSort = 'recent';
    document.getElementById('sort').value = 'recent';
    displayProducts();
}

// Ouvrir modal produit
function openProductModal(productId) {
    currentProduct = products.find(p => p.id === productId);

    document.getElementById('modal-title').textContent = currentProduct.name;
    document.getElementById('modal-description').textContent = currentProduct.description;
    document.getElementById('modal-price').textContent = currentProduct.price.toLocaleString();
    document.getElementById('modal-old-price').textContent = currentProduct.oldPrice.toLocaleString();
    document.getElementById('modal-image').src = currentProduct.image;
    document.getElementById('modal-material').textContent = currentProduct.material;
    document.getElementById('quantity').value = 1;

    // Mettre à jour le bouton wishlist
    const wishlistToggle = document.getElementById('wishlist-toggle');
    if (wishlist.includes(currentProduct.id)) {
        wishlistToggle.classList.add('active');
    } else {
        wishlistToggle.classList.remove('active');
    }

    // Tailles
    const sizesDiv = document.getElementById('modal-sizes');
    sizesDiv.innerHTML = currentProduct.sizes.map(size =>
        `<button class="size-btn ${size === currentProduct.sizes[0] ? 'active' : ''}" 
            onclick="selectSize(this)">${size}</button>`
    ).join('');

    // Couleurs
    const colorsDiv = document.getElementById('modal-colors');
    colorsDiv.innerHTML = currentProduct.colors.map(color =>
        `<button class="color-btn ${color === currentProduct.colors[0] ? 'active' : ''}" 
            onclick="selectColor(this)">${color}</button>`
    ).join('');

    document.getElementById('product-modal').style.display = 'block';
}

// Fermer modal
function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

// Sélectionner taille
function selectSize(btn) {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// Sélectionner couleur
function selectColor(btn) {
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// Changer quantité
function changeQuantity(change) {
    const input = document.getElementById('quantity');
    let newValue = parseInt(input.value) + change;
    if (newValue > 0) input.value = newValue;
}

// Ajouter au panier
function addToCart() {
    const size = document.querySelector('.size-btn.active')?.textContent || currentProduct.sizes[0];
    const color = document.querySelector('.color-btn.active')?.textContent || currentProduct.colors[0];
    const quantity = parseInt(document.getElementById('quantity').value);

    const cartItem = {
        id: `${currentProduct.id}-${size}-${color}`,
        productId: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        size: size,
        color: color,
        quantity: quantity,
        image: currentProduct.image
    };

    const existing = cart.find(item => item.id === cartItem.id);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push(cartItem);
    }

    saveCart();
    updateCartUI();
    closeModal();
    showNotification('Produit ajouté au panier!');
}

// Acheter maintenant
function buyNow() {
    addToCart();
    setTimeout(() => scrollToCart(), 300);
}

// Ajouter/Retirer de la wishlist (produit)
function toggleProductWishlist() {
    if (wishlist.includes(currentProduct.id)) {
        wishlist = wishlist.filter(id => id !== currentProduct.id);
    } else {
        wishlist.push(currentProduct.id);
    }
    saveWishlist();
    document.getElementById('wishlist-toggle').classList.toggle('active');
    updateWishlistCount();
}

// Ajouter/Retirer de la wishlist (card)
function toggleWishlistItem(event, productId) {
    event.stopPropagation();
    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
    } else {
        wishlist.push(productId);
    }
    saveWishlist();
    event.target.closest('.wishlist-btn-card').classList.toggle('active');
    updateWishlistCount();
}

// Mettre à jour le panier
function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;

    const itemsList = document.getElementById('cart-items-list');
    if (cart.length === 0) {
        itemsList.innerHTML = '<div class="empty-state"><i class="fas fa-shopping-bag"></i><p>Votre panier est vide</p></div>';
    } else {
        itemsList.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p class="item-meta">Taille: <strong>${item.size}</strong> | Couleur: <strong>${item.color}</strong></p>
                </div>
                <div class="item-quantity">
                    <button onclick="updateCartQuantity('${item.id}', -1)"><i class="fas fa-minus"></i></button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartQuantity('${item.id}', 1)"><i class="fas fa-plus"></i></button>
                </div>
                <div class="item-price">${(item.price * item.quantity).toLocaleString()} FCFA</div>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
    }

    updateCartTotal();
}

// Modifier quantité au panier
function updateCartQuantity(itemId, change) {
    const item = cart.find(c => c.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

// Supprimer du panier
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartUI();
}

// Mettre à jour total panier
function updateCartTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50000 ? 0 : 2000;
    const discount = 0;
    const total = subtotal - discount + shipping;

    document.getElementById('subtotal').textContent = subtotal.toLocaleString() + ' FCFA';
    document.getElementById('shipping').textContent = shipping.toLocaleString() + ' FCFA';
    document.getElementById('discount').textContent = discount.toLocaleString() + ' FCFA';
    document.getElementById('total').textContent = total.toLocaleString() + ' FCFA';
}

// Aller au paiement
function goToCheckout() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide!', 'error');
        return;
    }
    document.getElementById('checkout').classList.remove('hidden');
    document.getElementById('checkout').scrollIntoView({ behavior: 'smooth' });
}

// Retour au panier
function backToCart() {
    document.getElementById('checkout').classList.add('hidden');
    document.getElementById('panier').scrollIntoView({ behavior: 'smooth' });
}

// Continuer les achats
function continueShopping() {
    document.getElementById('produits').scrollIntoView({ behavior: 'smooth' });
}

// Traiter le paiement
function processPayment() {
    const firstname = document.getElementById('firstname').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    if (!firstname || !lastname || !phone || !address || !city) {
        showNotification('Veuillez remplir tous les champs obligatoires!', 'error');
        return;
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50000 ? 0 : 2000;
    const total = subtotal + shipping;
    const orderSummary = generateOrderSummary();

    if (paymentMethod === 'wave') {
        handleWavePayment(total, orderSummary);
    } else if (paymentMethod === 'whatsapp') {
        handleWhatsAppOrder(firstname, lastname, phone, orderSummary, total);
    } else {
        handleBankTransfer(firstname, lastname, orderSummary, total);
    }
}

// Générer résumé commande
function generateOrderSummary() {
    let summary = "╔════════════════════════════╗\n";
    summary += "║    COMMANDE BABYSTYLE      ║\n";
    summary += "╚════════════════════════════╝\n\n";

    cart.forEach((item, index) => {
        summary += `${index + 1}. ${item.name}\n`;
        summary += `   Taille: ${item.size} | Couleur: ${item.color}\n`;
        summary += `   Quantité: ${item.quantity}\n`;
        summary += `   Prix: ${(item.price * item.quantity).toLocaleString()} FCFA\n\n`;
    });

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50000 ? 0 : 2000;
    const total = subtotal + shipping;

    summary += `─────────────────────────────\n`;
    summary += `Sous-total: ${subtotal.toLocaleString()} FCFA\n`;
    summary += `Livraison: ${shipping.toLocaleString()} FCFA\n`;
    summary += `TOTAL: ${total.toLocaleString()} FCFA`;
    return summary;
}

// Wave Payment
function handleWavePayment(total, orderSummary) {
    const message = `Bonjour, je souhaite payer ma commande de ${total.toLocaleString()} FCFA.\n\n${orderSummary}`;
    const whatsappLink = `https://wa.me/22777777777?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');

    showNotification('Redirection vers WhatsApp pour le paiement Wave...');
    setTimeout(clearCheckout, 1500);
}

// WhatsApp Order
function handleWhatsAppOrder(firstname, lastname, phone, orderSummary, total) {
    const message = `*Nouvelle Commande BabyStyle*\n\n👤 *Client:* ${firstname} ${lastname}\n📱 *Téléphone:* ${phone}\n\n${orderSummary}`;
    const whatsappLink = `https://wa.me/22699999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');

    showNotification('Commande envoyée via WhatsApp!');
    setTimeout(clearCheckout, 1500);
}

// Bank Transfer
function handleBankTransfer(firstname, lastname, orderSummary, total) {
    const message = `Bonjour ${firstname} ${lastname},\n\nVotre commande est prête. Veuillez effectuer un virement de ${total.toLocaleString()} FCFA.\n\n${orderSummary}`;
    const whatsappLink = `https://wa.me/22699999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');

    showNotification('Détails du virement envoyés!');
    setTimeout(clearCheckout, 1500);
}

// Appliquer code promo
function applyPromo() {
    const promo = document.getElementById('promo').value.toUpperCase();
    if (promo === 'BABYSTYLE10') {
        // Appliquer 10% de remise
        showNotification('Code promo appliqué! -10%');
    } else {
        showNotification('Code promo invalide', 'error');
    }
}

// Nettoyer checkout
function clearCheckout() {
    cart = [];
    saveCart();
    updateCartUI();
    document.getElementById('checkout-form').reset();
    document.getElementById('checkout').classList.add('hidden');
    document.getElementById('produits').scrollIntoView({ behavior: 'smooth' });
}

// S'inscrire newsletter
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    showNotification(`Merci! Vous recevrez les offres exclusives à ${email}`);
    event.target.reset();
}

// Basculer wishlist panel
function toggleWishlistPanel() {
    // TODO: Implement wishlist panel
    showNotification(`${wishlist.length} article(s) dans votre liste`);
}

// Scroll vers panier
function scrollToCart() {
    document.getElementById('panier').scrollIntoView({ behavior: 'smooth' });
}

// Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `<i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i> ${message}`;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 3000);
}

// LocalStorage
function saveCart() {
    localStorage.setItem('babystyle-cart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('babystyle-cart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartUI();
    }
}

function saveWishlist() {
    localStorage.setItem('babystyle-wishlist', JSON.stringify(wishlist));
}

function loadWishlist() {
    const saved = localStorage.getItem('babystyle-wishlist');
    if (saved) {
        wishlist = JSON.parse(saved);
        updateWishlistCount();
    }
}

function updateWishlistCount() {
    document.getElementById('wishlist-count').textContent = wishlist.length;
}

// Fermer modal au clic extérieur
window.onclick = function (event) {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        closeModal();
    }
}
