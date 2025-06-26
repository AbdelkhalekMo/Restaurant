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
        name: 'قائمة الطعام',
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=800&fit=crop',
        description: 'قائمة طعام شاملة تضم جميع أطباقنا اللذيذة'
    },
    {
        id: 'menu2',
        name: 'قائمة المشروبات',
        image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=800&fit=crop',
        description: 'قائمة مشروبات كاملة تشمل المشروبات الساخنة والباردة'
    }
];

// Menu items data
const menuItems = {
    'grilled': [
        {
            id: 201,
            name: 'فرخة شوايه',
            description: 'فرخة مشوية طازجة ومتبلة بالتوابل الشرقية',
            price: 170.00,
            image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop',
            category: 'grilled'
        },
        {
            id: 202,
            name: 'فرخة شيش',
            description: 'فرخة شيش طرية ومشوية على الفحم',
            price: 170.00,
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
            category: 'grilled'
        },
        {
            id: 203,
            name: 'كباب و كباب',
            description: 'مزيج من الكباب اللحم المفروم المشوي بالتوابل',
            price: 430.00,
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
            category: 'grilled'
        },
        {
            id: 204,
            name: 'كباب كباب متاكل',
            description: 'كباب لحم مفروم متبل ومشوي على الطريقة التركية',
            price: 400.00,
            image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
            category: 'grilled'
        },
        {
            id: 205,
            name: 'كباب حاكم ضاني',
            description: 'كباب لحم ضاني فاخر مشوي على الفحم',
            price: 260.00,
            image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop',
            category: 'grilled'
        },
        {
            id: 206,
            name: 'كباب طريق ضاني',
            description: 'كباب ضاني مشوي على الطريقة البلدية',
            price: 280.00,
            image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop',
            category: 'grilled'
        },
        {
            id: 207,
            name: 'كباب حاكم فراخ',
            description: 'كباب فراخ طري ومشوي بالتوابل الخاصة',
            price: 200.00,
            image: 'https://images.unsplash.com/photo-1607131760875-b5b3d5bd41e9?w=400&h=300&fit=crop',
            category: 'grilled'
        },
        {
            id: 208,
            name: 'كباب شيش حلاوقت',
            description: 'شيش كباب طازج مشوي مع الخضار',
            price: 200.00,
            image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&h=300&fit=crop',
            category: 'grilled'
        },
        {
            id: 209,
            name: 'نصف تكا مكاني عادي',
            description: 'نصف تكا لحم مكاني مشوي - عادي',
            price: 90.00,
            image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
            category: 'grilled'
        },
        {
            id: 210,
            name: 'نصف تكا مكاني سباستي',
            description: 'نصف تكا لحم مكاني مشوي - سباستي',
            price: 90.00,
            image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop',
            category: 'grilled'
        }
    ],
    'meals': [
        {
            id: 301,
            name: 'فرد حمام ملحي',
            description: 'حمام ملحي طازج محضر بالطريقة التقليدية',
            price: 65.00,
            image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop',
            category: 'meals'
        },
        {
            id: 302,
            name: 'ربع فرخة + سيد حنفية',
            description: 'ربع فرخة مع أرز وسلطة وعيش',
            price: 65.00,
            image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop',
            category: 'meals'
        },
        {
            id: 303,
            name: 'ربع فرخة شوايه أو شيش',
            description: 'ربع فرخة شوايه أو شيش مع أرز وسلطة وعيش',
            price: 50.00,
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
            category: 'meals'
        },
        {
            id: 304,
            name: 'نصف فرخة شوايه أو شيش',
            description: 'نصف فرخة شوايه أو شيش مع أرز وسلطة وعيش',
            price: 90.00,
            image: 'https://images.unsplash.com/photo-1607131760875-b5b3d5bd41e9?w=400&h=300&fit=crop',
            category: 'meals'
        }
    ],
    'cooking': [
        {
            id: 401,
            name: 'تسوية بحر',
            description: 'خدمة تسوية وطبخ المأكولات البحرية',
            price: 40.00,
            image: 'https://images.unsplash.com/photo-1559847844-d721426d6edc?w=400&h=300&fit=crop',
            category: 'cooking'
        },
        {
            id: 402,
            name: 'تسوية فرخة',
            description: 'خدمة تسوية وطبخ الفراخ',
            price: 25.00,
            image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop',
            category: 'cooking'
        },
        {
            id: 403,
            name: 'تسوية رومي',
            description: 'خدمة تسوية وطبخ الديك الرومي',
            price: 30.00,
            image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop',
            category: 'cooking'
        },
        {
            id: 404,
            name: 'تسوية كباب أحمر',
            description: 'خدمة تسوية وطبخ الكباب الأحمر',
            price: 25.00,
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
            category: 'cooking'
        },
        {
            id: 405,
            name: 'تسوية كباب حنفية',
            description: 'خدمة تسوية وطبخ كباب الحنفية',
            price: 25.00,
            image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
            category: 'cooking'
        },
        {
            id: 406,
            name: 'تسوية فرخة كبيرة',
            description: 'خدمة تسوية وطبخ الفراخ الكبيرة',
            price: 30.00,
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
            category: 'cooking'
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
        showToast('العنصر غير موجود!', 'error');
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
    showToast(`تم إضافة ${item.name} إلى السلة!`, 'success', 2000);
    
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
    const cartCountElement = document.getElementById('cart-count');
    
    if (!cartItemsContainer || !cartCountElement) return;
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    cartCountElement.style.display = totalItems > 0 ? 'inline' : 'none';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center text-muted py-4">
                <i class="fas fa-shopping-cart fa-3x mb-3 opacity-50"></i>
                <p class="mb-0">سلة التسوق فارغة</p>
                <small>تصفح قائمة طعامنا اللذيذة وأضف العناصر للبدء!</small>
            </div>
        `;
        updateCartTotal();
        updateOrderSummary();
        return;
    }
    
    // Generate cart items HTML
    let cartHTML = '';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        
        cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price.toFixed(2)} جنيه للقطعة</div>
                </div>
                <div class="cart-item-actions">
                    <div class="cart-item-quantity">
                        <button onclick="updateCartItemQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartItemQuantity(${index}, 1)">+</button>
                    </div>
                    <div class="fw-bold">${itemTotal.toFixed(2)} جنيه</div>
                    <button class="cart-item-delete-btn" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = cartHTML;
    updateCartTotal();
    updateOrderSummary();
}

// Update cart total with delivery fee
function updateCartTotal() {
    const cartSubtotalElement = document.getElementById('cartSubtotal');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartDeliveryFeeRow = document.getElementById('cartDeliveryFeeRow');
    const locationCheckContainer = document.getElementById('locationCheckContainer');
    
    if (!cartSubtotalElement || !cartTotalElement) return;
    
    // Calculate subtotal
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    // Check delivery option
    const deliveryCheckbox = document.getElementById('cartDeliveryOption');
    const isDelivery = deliveryCheckbox && deliveryCheckbox.checked;
    const deliveryFee = isDelivery ? 25 : 0;
    
    // Show/hide location option based on delivery selection
    if (locationCheckContainer) {
        locationCheckContainer.style.display = isDelivery ? 'block' : 'none';
    }
    
    // Update cart display
    cartSubtotalElement.textContent = `${subtotal.toFixed(2)} جنيه`;
    
    if (deliveryFee > 0) {
        cartDeliveryFeeRow.style.display = 'flex';
    } else {
        cartDeliveryFeeRow.style.display = 'none';
    }
    
    const total = subtotal + deliveryFee;
    cartTotalElement.textContent = `${total.toFixed(2)} جنيه`;
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
    showToast('تم حذف العنصر من السلة', 'info', 2000);
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
                                    <i class="fas fa-expand ms-2"></i>عرض بملء الشاشة
                                </button>
                                <button class="download-btn" onclick="downloadImage('${menu.image}', '${menu.name}')">
                                    <i class="fas fa-download ms-2"></i>تحميل
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
                <div class="col-sm-6 col-lg-6 col-xl-4 mb-4">
                    <div class="menu-item-card">
                        <img src="${item.image}" alt="${item.name}" class="menu-item-image">
                        <div class="menu-item-content">
                            <h3 class="menu-item-title">${item.name}</h3>
                            <p class="menu-item-description">${item.description}</p>
                            <div class="menu-item-price">${item.price.toFixed(2)} جنيه</div>
                            <div class="menu-item-actions">
                                <div class="quantity-control">
                                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                                    <span id="quantity-${item.id}">${itemQuantities[item.id]}</span>
                                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                                </div>
                                                        <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                            <i class="fas fa-plus ms-2"></i>أضف إلي طلبك
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

// Update order summary in the order form
function updateOrderSummary() {
    const orderSubtotalElement = document.getElementById('orderSubtotal');
    const orderTotalElement = document.getElementById('orderTotal');
    const deliveryFeeRow = document.getElementById('deliveryFeeRow');
    
    if (!orderSubtotalElement || !orderTotalElement) return;
    
    // Calculate cart subtotal
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    // Check if delivery is selected from cart
    const deliveryCheckbox = document.getElementById('cartDeliveryOption');
    const deliveryFee = deliveryCheckbox && deliveryCheckbox.checked ? 25 : 0;
    
    // Update display
    orderSubtotalElement.textContent = `${subtotal.toFixed(2)} جنيه`;
    
    if (deliveryFee > 0) {
        deliveryFeeRow.style.display = 'flex';
    } else {
        deliveryFeeRow.style.display = 'none';
    }
    
    const total = subtotal + deliveryFee;
    orderTotalElement.textContent = `${total.toFixed(2)} جنيه`;
}



// Proceed to order
function proceedToOrder() {
    const orderSection = document.getElementById('orderSection');
    if (!orderSection) return;
    
    if (cart.length > 0) {
        updateOrderSummary(); // Update the order summary when proceeding to order
        orderSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        showToast('سلة التسوق فارغة. أضف عناصر أولاً.', 'error');
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
    const maxDrops = 50; // Reduced from 100 to 50 (half the amount)
    
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
                speed: Math.random() * 2.5 + 1 // Reduced from (5 + 2) to (2.5 + 1) - half the speed
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
    
    // Initialize order summary
    updateOrderSummary();
    
    // Handle location checkbox
    const useLocationCheckbox = document.getElementById('useCurrentLocation');
    if (useLocationCheckbox) {
        useLocationCheckbox.addEventListener('change', function() {
            if (this.checked) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;
                        
                        // Store location data in a global variable for background use
                        window.customerLocation = {
                            lat: lat,
                            lng: lng,
                            mapLink: mapLink,
                            address: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`
                        };
                        
                        showToast('تم تحديد الموقع بنجاح!', 'success', 2000);
                    }, function() {
                        showToast('تعذر الحصول على موقعك. يرجى المحاولة مرة أخرى.', 'error');
                        useLocationCheckbox.checked = false;
                        window.customerLocation = null;
                    });
                } else {
                    showToast('خدمة تحديد الموقع غير مدعومة في هذا المتصفح.', 'error');
                    this.checked = false;
                    window.customerLocation = null;
                }
            } else {
                window.customerLocation = null;
            }
        });
    }
    
    // Handle name validation for WhatsApp button
    const customerNameInput = document.getElementById('customerName');
    const whatsappButton = orderForm.querySelector('button[type="submit"]');
    
    // Initially disable the WhatsApp button
    if (whatsappButton) {
        whatsappButton.disabled = true;
        whatsappButton.style.opacity = '0.6';
        whatsappButton.style.cursor = 'not-allowed';
    }
    
    // Add event listener for name validation
    if (customerNameInput && whatsappButton) {
        customerNameInput.addEventListener('input', function() {
            const nameValue = this.value.trim();
            if (nameValue.length > 0) {
                // Enable button
                whatsappButton.disabled = false;
                whatsappButton.style.opacity = '1';
                whatsappButton.style.cursor = 'pointer';
            } else {
                // Disable button
                whatsappButton.disabled = true;
                whatsappButton.style.opacity = '0.6';
                whatsappButton.style.cursor = 'not-allowed';
            }
        });
    }
    
    // Handle order form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (cart.length === 0) {
                showToast('سلة التسوق فارغة! أضف عناصر لتقديم طلب.', 'error');
                return;
            }

            const name = document.getElementById('customerName').value.trim();
            const phone = document.getElementById('customerPhone').value.trim();
            
            // Additional validation with Arabic messages
            if (!name) {
                showToast('يرجى ملء حقل الاسم', 'error');
                document.getElementById('customerName').focus();
                return;
            }
            
            if (!phone) {
                showToast('يرجى ملء حقل رقم الهاتف', 'error');
                document.getElementById('customerPhone').focus();
                return;
            }
            const customerNotes = document.getElementById('customerNotes').value;
            const deliveryOption = document.getElementById('cartDeliveryOption').checked;
            
            const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
            const paymentMethod = selectedPaymentMethod ? selectedPaymentMethod.value : 'Not specified';

            // Create order summary for restaurant
            let orderText = `🍽️ *طلب مطعم جديد* 🍽️\n\n`;
            orderText += `👤 *تفاصيل العميل:*\n`;
            orderText += `   - الاسم: ${name}\n`;
            orderText += `   - الهاتف: ${phone}\n`;
            orderText += `   - التوصيل: ${deliveryOption ? 'نعم (+25 جنيه)' : 'لا (استلام)'}\n`;
            
            // Add location information if available and delivery is selected
            if (deliveryOption && window.customerLocation) {
                orderText += `   - الموقع: ${window.customerLocation.address}\n`;
                orderText += `   - رابط الخريطة: ${window.customerLocation.mapLink}\n`;
            }
            
            if (customerNotes.trim()) {
                orderText += `   - ملاحظات خاصة: ${customerNotes}\n`;
            }
            orderText += `   - طريقة الدفع: ${paymentMethod}\n`;
            orderText += `\n🛒 *ملخص الطلب:*\n`;
            orderText += `-------------------------------------\n`;
            
            let subtotal = 0;
            let totalQuantity = 0;
            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                totalQuantity += item.quantity;
                orderText += `*العنصر ${index + 1}: ${item.name}*\n`;
                orderText += `   - الفئة: ${item.category.replace('-', ' ').toUpperCase()}\n`;
                orderText += `   - الكمية: ${item.quantity}\n`;
                orderText += `   - سعر القطعة: ${item.price.toFixed(2)} جنيه\n`;
                orderText += `   - المجموع الفرعي: ${itemTotal.toFixed(2)} جنيه\n`;
                orderText += `-------------------------------------\n`;
            });
            
            const deliveryFee = deliveryOption ? 25 : 0;
            const total = subtotal + deliveryFee;
            
            orderText += `\n📦 *إجمالي العناصر: ${totalQuantity}*\n`;
            orderText += `💰 *المجموع الفرعي: ${subtotal.toFixed(2)} جنيه*\n`;
            if (deliveryFee > 0) {
                orderText += `🚚 *رسوم التوصيل: ${deliveryFee.toFixed(2)} جنيه*\n`;
            }
            orderText += `💰 *الإجمالي الكلي: ${total.toFixed(2)} جنيه*\n\n`;
            orderText += `يرجى تأكيد هذا الطلب وتحديد وقت التوصيل المتوقع.\n`;
            orderText += `شكراً لاختياركم جنة الطعم! 🙏`;

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
                
                showToast('تم إرسال تفاصيل الطلب إلى الواتساب! سنتواصل معكم قريباً.', 'success', 5000);
            } catch (error) {
                console.error('Error opening WhatsApp:', error);
                showToast('خطأ في إرسال الطلب إلى الواتساب. يرجى المحاولة مرة أخرى.', 'error');
            }
        });
    }
    
    // Initialize cart display
    updateCartDisplay();
    
    // Enhanced WhatsApp hero button functionality
    const whatsappHeroButton = document.getElementById('whatsappHeroButton');
    if (whatsappHeroButton) {
        whatsappHeroButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a general contact message for hero WhatsApp button
            const restaurantName = "مطعم مشويات المنسي";
            const contactMessage = `مرحباً! 👋\n\nأريد الاستفسار عن خدمات ${restaurantName}.\n\nيرجى تزويدي بمعلومات حول:\n- أوقات العمل\n- طريقة الطلب\n- خدمة التوصيل\n- العروض المتاحة\n\nشكراً لكم! 🍽️`;
            
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(contactMessage)}`;
            
            try {
                window.open(whatsappUrl, '_blank');
                showToast('جاري فتح الواتساب للتواصل معنا!', 'success', 3000);
            } catch (error) {
                console.error('Error opening WhatsApp:', error);
                showToast('خطأ في فتح الواتساب. يرجى المحاولة مرة أخرى.', 'error');
            }
        });
    }
    
    // Call hero button functionality with feedback
    const callHeroButton = document.getElementById('callHeroButton');
    if (callHeroButton) {
        callHeroButton.addEventListener('click', function() {
            showToast('جاري فتح تطبيق الهاتف للاتصال...', 'info', 2000);
        });
    }
    
    // Facebook hero button functionality with feedback
    const facebookHeroButton = document.getElementById('facebookHeroButton');
    if (facebookHeroButton) {
        facebookHeroButton.addEventListener('click', function() {
            showToast('جاري فتح صفحة الفيسبوك...', 'info', 2000);
        });
    }
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
    
    showToast(`بدأ تحميل ${imageName}!`, 'success', 2000);
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
