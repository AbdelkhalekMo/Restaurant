// Global variables
let cart = [];
let currentCategory = 'menu'; // Changed default to menu
const WHATSAPP_NUMBER = '+201157299077'; // Same WhatsApp number as original

// Use separate localStorage for restaurant to avoid conflicts with shop
const RESTAURANT_CART_KEY = 'restaurant_cart';

// Menu PDFs data
const menuPDFs = [
    {
        id: 'menu1',
        name: 'Food Menu',
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=800&fit=crop',
        description: 'Complete food menu with all our delicious offerings'
    },
    {
        id: 'menu2',
        name: 'Beverages Menu',
        image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=800&fit=crop',
        description: 'Full beverages menu including hot and cold drinks'
    }
];

// Menu items data
const menuItems = {
    'main-meals': [
        {
            id: 1,
            name: 'Grilled Chicken Breast',
            description: 'Tender grilled chicken breast marinated in herbs and spices, served with seasoned vegetables.',
            price: 18.99,
            image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop',
            category: 'main-meals'
        },
        {
            id: 2,
            name: 'Beef Steak',
            description: 'Premium beef steak grilled to perfection, served with mashed potatoes and gravy.',
            price: 24.99,
            image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
            category: 'main-meals'
        },
        {
            id: 3,
            name: 'Salmon Fillet',
            description: 'Fresh Atlantic salmon fillet with lemon butter sauce and steamed broccoli.',
            price: 22.99,
            image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
            category: 'main-meals'
        },
        {
            id: 4,
            name: 'Pasta Carbonara',
            description: 'Creamy pasta with bacon, eggs, and parmesan cheese in a rich sauce.',
            price: 16.99,
            image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
            category: 'main-meals'
        }
    ],
    'smoking-meals': [
        {
            id: 5,
            name: 'BBQ Ribs',
            description: 'Slow-smoked pork ribs with our signature BBQ sauce and coleslaw.',
            price: 26.99,
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
            category: 'smoking-meals'
        },
        {
            id: 6,
            name: 'Smoked Brisket',
            description: 'Texas-style smoked beef brisket with smoky dry rub and BBQ sauce.',
            price: 28.99,
            image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
            category: 'smoking-meals'
        },
        {
            id: 7,
            name: 'Smoked Wings',
            description: 'Crispy smoked chicken wings with choice of buffalo, BBQ, or honey mustard sauce.',
            price: 14.99,
            image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop',
            category: 'smoking-meals'
        },
        {
            id: 8,
            name: 'Pulled Pork Sandwich',
            description: 'Slow-smoked pulled pork with tangy BBQ sauce on a brioche bun.',
            price: 15.99,
            image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop',
            category: 'smoking-meals'
        }
    ],
    'desserts': [
        {
            id: 9,
            name: 'Chocolate Lava Cake',
            description: 'Warm chocolate cake with molten center, served with vanilla ice cream.',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
            category: 'desserts'
        },
        {
            id: 10,
            name: 'Tiramisu',
            description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone.',
            price: 7.99,
            image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
            category: 'desserts'
        },
        {
            id: 11,
            name: 'Cheesecake',
            description: 'New York style cheesecake with fresh berry compote.',
            price: 6.99,
            image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop',
            category: 'desserts'
        },
        {
            id: 12,
            name: 'Ice Cream Sundae',
            description: 'Three scoops of premium ice cream with chocolate sauce, nuts, and cherry.',
            price: 5.99,
            image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop',
            category: 'desserts'
        }
    ]
};

// Initialize quantities for each menu item
const itemQuantities = {};
Object.values(menuItems).flat().forEach(item => {
    itemQuantities[item.id] = 1;
});

// Load cart from localStorage on page load
function loadRestaurantCart() {
    const savedCart = localStorage.getItem(RESTAURANT_CART_KEY);
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            console.error('Error loading restaurant cart from localStorage:', e);
            cart = [];
        }
    }
}

// Save cart to localStorage
function saveRestaurantCart() {
    try {
        localStorage.setItem(RESTAURANT_CART_KEY, JSON.stringify(cart));
    } catch (e) {
        console.error('Error saving restaurant cart to localStorage:', e);
    }
}

// Toast Notification System
function showToast(message, type = 'error', duration = 4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        toast.addEventListener('transitionend', () => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
        });
    }, duration);
}

// Change quantity for menu items
function changeQuantity(itemId, change) {
    const currentQty = itemQuantities[itemId] || 1;
    const newQty = Math.max(1, currentQty + change);
    itemQuantities[itemId] = newQty;
    
    const quantitySpan = document.getElementById(`quantity-${itemId}`);
    if (quantitySpan) {
        quantitySpan.textContent = newQty;
    }
}

// Add item to cart
function addToCart(itemId) {
    const allItems = Object.values(menuItems).flat();
    const item = allItems.find(item => item.id === itemId);
    
    if (!item) {
        showToast('Item not found!', 'error');
        return;
    }

    const quantity = itemQuantities[itemId] || 1;
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === itemId);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: quantity,
            category: item.category
        });
    }
    
    saveRestaurantCart(); // Save to localStorage
    updateCartDisplay();
    showToast(`${item.name} added to cart!`, 'success', 2000);
    
    // Reset quantity to 1 after adding to cart
    itemQuantities[itemId] = 1;
    const quantitySpan = document.getElementById(`quantity-${itemId}`);
    if (quantitySpan) {
        quantitySpan.textContent = 1;
    }
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartCountElement = document.getElementById('cart-count');
    
    if (!cartItemsContainer || !cartTotalElement || !cartCountElement) return;
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    cartCountElement.style.display = totalItems > 0 ? 'inline' : 'none';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center text-muted py-4">
                <i class="fas fa-shopping-cart fa-3x mb-3 opacity-50"></i>
                <p class="mb-0">Your cart is empty</p>
                <small>Browse our delicious menu and add items to get started!</small>
            </div>
        `;
        cartTotalElement.textContent = '$0.00';
        return;
    }
    
    // Generate cart items HTML
    let cartHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-quantity">
                        <button onclick="updateCartItemQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartItemQuantity(${index}, 1)">+</button>
                    </div>
                    <div class="fw-bold">$${itemTotal.toFixed(2)}</div>
                    <button class="cart-item-delete-btn" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = cartHTML;
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Update cart item quantity
function updateCartItemQuantity(index, change) {
    if (index < 0 || index >= cart.length) return;
    
    cart[index].quantity = Math.max(1, cart[index].quantity + change);
    saveRestaurantCart(); // Save to localStorage
    updateCartDisplay();
}

// Remove item from cart
function removeFromCart(index) {
    if (index < 0 || index >= cart.length) return;
    
    cart.splice(index, 1);
    saveRestaurantCart(); // Save to localStorage
    updateCartDisplay();
    showToast('Item removed from cart', 'info', 2000);
}

// Toggle cart visibility
function toggleCart() {
    const cartSection = document.getElementById('cartSection');
    if (!cartSection) return;
    
    // Always scroll to cart section when button is clicked
    cartSection.scrollIntoView({ behavior: 'smooth' });
}

// Switch menu category
function switchCategory(category) {
    currentCategory = category;
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Show/hide menu categories
    document.querySelectorAll('.menu-category').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(category).style.display = 'block';
}

// Render menu items
function renderMenuItems() {
    // Render menu PDFs
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer) {
        let menuHTML = '';
        menuPDFs.forEach(menu => {
            menuHTML += `
                <div class="col-lg-6 mb-4">
                    <div class="menu-pdf-card">
                        <img src="${menu.image}" alt="${menu.name}" class="menu-pdf-image">
                        <div class="menu-pdf-content">
                            <h3 class="menu-pdf-title">${menu.name}</h3>
                            <p class="text-muted mb-3">${menu.description}</p>
                            <div class="menu-pdf-actions">
                                <button class="fullscreen-btn" onclick="openFullscreen('${menu.image}', '${menu.name}')">
                                    <i class="fas fa-expand me-2"></i>View Full Screen
                                </button>
                                <button class="download-btn" onclick="downloadImage('${menu.image}', '${menu.name}')">
                                    <i class="fas fa-download me-2"></i>Download
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        menuContainer.innerHTML = menuHTML;
    }

    // Render food items (5 per row)
    Object.keys(menuItems).forEach(category => {
        const container = document.getElementById(`${category}-container`);
        if (!container) return;
        
        let html = '';
        menuItems[category].forEach(item => {
            html += `
                <div class="col-lg-6 col-xl-4 mb-4">
                    <div class="menu-item-card">
                        <img src="${item.image}" alt="${item.name}" class="menu-item-image">
                        <div class="menu-item-content">
                            <h3 class="menu-item-title">${item.name}</h3>
                            <p class="menu-item-description">${item.description}</p>
                            <div class="menu-item-price">$${item.price.toFixed(2)}</div>
                            <div class="menu-item-actions">
                                <div class="quantity-control">
                                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                                    <span id="quantity-${item.id}">${itemQuantities[item.id]}</span>
                                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                                </div>
                                <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                                    <i class="fas fa-plus me-2"></i>Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    });
}

// Proceed to order
function proceedToOrder() {
    const orderSection = document.getElementById('orderSection');
    if (!orderSection) return;
    
    if (cart.length > 0) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        showToast('Your cart is empty. Add items first.', 'error');
        // Still scroll to show the form
        orderSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Rain effect (same as original)
function initRainEffect() {
    const canvas = document.getElementById('rainCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const drops = [];
    const maxDrops = 100;
    
    function resizeCanvas() {
        const heroSection = document.querySelector('.hero-section');
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }
    
    function createDrops() {
        for (let i = 0; i < maxDrops; i++) {
            drops.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: Math.random() * 15 + 5,
                speed: Math.random() * 5 + 2
            });
        }
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(174, 194, 224, 0.5)';
        ctx.lineWidth = 1;
        
        drops.forEach(drop => {
            ctx.beginPath();
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x, drop.y + drop.length);
            ctx.stroke();
            
            drop.y += drop.speed;
            if (drop.y > canvas.height) {
                drop.y = -drop.length;
                drop.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(draw);
    }
    
    resizeCanvas();
    createDrops();
    draw();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        drops.length = 0;
        createDrops();
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Load saved cart first
    loadRestaurantCart();
    
    // Render menu items
    renderMenuItems();
    
    // Initialize rain effect
    initRainEffect();
    
    // Set up category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchCategory(this.dataset.category);
        });
    });
    
    // Handle location checkbox
    const useLocationCheckbox = document.getElementById('useCurrentLocation');
    if (useLocationCheckbox) {
        useLocationCheckbox.addEventListener('change', function() {
            const deliveryAddressInput = document.getElementById('deliveryAddress');
            if (this.checked) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;
                        deliveryAddressInput.value = `Approx. Location: Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}. (Map: ${mapLink})`;
                        deliveryAddressInput.readOnly = true;
                    }, function() {
                        showToast('Unable to get your location. Please enter address manually.', 'info');
                        useLocationCheckbox.checked = false;
                        deliveryAddressInput.value = '';
                        deliveryAddressInput.readOnly = false;
                    });
                } else {
                    showToast('Geolocation is not supported by this browser.', 'info');
                    this.checked = false;
                    deliveryAddressInput.value = '';
                    deliveryAddressInput.readOnly = false;
                }
            } else {
                deliveryAddressInput.value = '';
                deliveryAddressInput.readOnly = false;
            }
        });
    }
    
    // Handle order form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (cart.length === 0) {
                showToast('Your cart is empty! Add items to place an order.', 'error');
                return;
            }

            const name = document.getElementById('customerName').value;
            const phone = document.getElementById('customerPhone').value;
            const address = document.getElementById('deliveryAddress').value;
            
            const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
            const paymentMethod = selectedPaymentMethod ? selectedPaymentMethod.value : 'Not specified';

            let plainAddress = address;
            if (address.includes("(Map:")) {
                plainAddress = address.substring(0, address.indexOf("(Map:")).trim();
            }

            // Create order summary for restaurant
            let orderText = `🍽️ *NEW RESTAURANT ORDER* 🍽️\n\n`;
            orderText += `👤 *Customer Details:*\n`;
            orderText += `   - Name: ${name}\n`;
            orderText += `   - Phone: ${phone}\n`;
            orderText += `   - Address: ${plainAddress}\n`;
            if (address.includes("https://www.google.com/maps?q=")) {
                const mapUrl = address.substring(address.indexOf("https://www.google.com/maps?q="), address.lastIndexOf(")")).trim();
                orderText += `   - Map Link: ${mapUrl}\n`;
            }
            orderText += `   - Payment Method: ${paymentMethod}\n`;
            orderText += `\n🛒 *Order Summary:*\n`;
            orderText += `-------------------------------------\n`;
            
            let total = 0;
            let totalQuantity = 0;
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                totalQuantity += item.quantity;
                orderText += `*Item ${index + 1}: ${item.name}*\n`;
                orderText += `   - Category: ${item.category.replace('-', ' ').toUpperCase()}\n`;
                orderText += `   - Quantity: ${item.quantity}\n`;
                orderText += `   - Price per item: $${item.price.toFixed(2)}\n`;
                orderText += `   - Subtotal: $${itemTotal.toFixed(2)}\n`;
                orderText += `-------------------------------------\n`;
            });
            
            orderText += `\n📦 *Total Items: ${totalQuantity}*\n`;
            orderText += `💰 *GRAND TOTAL: $${total.toFixed(2)}*\n\n`;
            orderText += `Please confirm this order and provide estimated delivery time.\n`;
            orderText += `Thank you for choosing Taste Heaven! 🙏`;

            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderText)}`;
            
            try {
                // Open WhatsApp
                window.open(whatsappUrl, '_blank');
                
                // Clear cart after order
                cart = [];
                localStorage.removeItem(RESTAURANT_CART_KEY); // Clear restaurant cart from localStorage
                updateCartDisplay();
                orderForm.reset();
                
                showToast('Order details sent to WhatsApp! We will contact you soon.', 'success', 5000);
            } catch (error) {
                console.error('Error opening WhatsApp:', error);
                showToast('Error sending order to WhatsApp. Please try again.', 'error');
            }
        });
    }
    
    // Initialize cart display
    updateCartDisplay();
});

// Full-screen modal functions
let currentImageUrl = '';
let currentImageName = '';

function openFullscreen(imageUrl, imageName) {
    currentImageUrl = imageUrl;
    currentImageName = imageName;
    
    const modal = document.getElementById('fullscreenModal');
    const img = document.getElementById('fullscreenImage');
    
    img.src = imageUrl;
    img.alt = imageName;
    modal.style.display = 'block';
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

function closeFullscreen() {
    const modal = document.getElementById('fullscreenModal');
    modal.style.display = 'none';
    
    // Restore body scrolling
    document.body.style.overflow = 'auto';
}

function downloadCurrentImage() {
    if (currentImageUrl && currentImageName) {
        downloadImage(currentImageUrl, currentImageName);
    }
}

function downloadImage(imageUrl, imageName) {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${imageName.replace(/\s+/g, '_')}_Menu.jpg`;
    link.target = '_blank';
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast(`${imageName} download started!`, 'success', 2000);
}

// Close modal when clicking outside the image
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('fullscreenModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeFullscreen();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeFullscreen();
        }
    });
});
