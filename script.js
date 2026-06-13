let totalCartItems = 0;
let totalCartPrice = 0;

// ================= MODERN PHOTO UPLOAD PREVIEW =================
function previewOwnerImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('owner-profile-img').src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// ================= CATEGORY FILTER TRIGGER =================
function filterMenu(categoryName) {
    const items = document.querySelectorAll('.product-item-card');
    const tabs = document.querySelectorAll('.filter-tab-btn');

    // Active tab styling highlight switch
    tabs.forEach(tab => tab.classList.remove('active'));
    if(event && event.target) { 
        event.target.classList.add('active'); 
    }

    // Show/Hide items based on category flags
    items.forEach(item => {
        if (categoryName === 'all') {
            item.style.display = 'block';
        } else {
            if (item.classList.contains(categoryName)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        }
    });
}

// ================= DYNAMIC PRICING ENGINE =================
function updateDynamicPricing(selectElement) {
    let cardBody = selectElement.closest('.product-card-body');
    let priceDisplay = cardBody.querySelector('.dynamic-render-price');
    let inputField = cardBody.querySelector('.qty-input');
    
    // Read variant rate value
    let newBasePrice = parseInt(selectElement.value);
    priceDisplay.setAttribute('data-base-price', newBasePrice);
    
    // Cross multiply counter with current selected variant price
    let currentQty = parseInt(inputField.value);
    let totalValue = newBasePrice * currentQty;
    
    priceDisplay.textContent = "৳" + totalValue;
}

function updateQty(buttonElement, change) {
    let cardBody = buttonElement.closest('.product-card-body');
    let inputField = cardBody.querySelector('.qty-input');
    let priceDisplay = cardBody.querySelector('.dynamic-render-price');
    
    let currentQty = parseInt(inputField.value);
    let newQty = currentQty + change;
    
    // Logic boundary check (Minimum quantity safe guard is 1)
    if (newQty >= 1) {
        inputField.value = newQty;
        let basePrice = parseInt(priceDisplay.getAttribute('data-base-price'));
        let totalValue = basePrice * newQty;
        priceDisplay.textContent = "৳" + totalValue;
    }
}

// ================= FOODPANDA FLOATING BASKET ACTION =================
function addToCart(buttonElement, itemName) {
    let cardBody = buttonElement.closest('.product-card-body');
    let quantity = parseInt(cardBody.querySelector('.qty-input').value);
    
    // Extract calculated text rate value
    let priceText = cardBody.querySelector('.dynamic-render-price').textContent;
    let itemTotalPrice = parseInt(priceText.replace('৳', ''));
    
    // Update global variables
    totalCartItems += quantity;
    totalCartPrice += itemTotalPrice;

    // Update Floating basket indicators
    document.getElementById('cart-item-count').textContent = totalCartItems;
    document.getElementById('cart-total-price').textContent = "৳" + totalCartPrice.toLocaleString();
    
    // Slide up animation wrapper for the floating foodpanda cart
    const floatingCart = document.getElementById('floating-cart');
    if (floatingCart) {
        floatingCart.classList.remove('hidden');
    }

    // Launch alert feedback toast notification
    const toast = document.getElementById("toast-notification");
    if (toast) {
        toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> Added <strong>${quantity}x ${itemName}</strong> to basket`;
        toast.className = "show";
        
        setTimeout(function(){ 
            toast.className = toast.className.replace("show", ""); 
        }, 2000);
    }
}

// ================= BOOKING MODAL CONTROLS =================
function openBooking() {
    document.getElementById('bookingModal').style.display = 'flex';
}

function closeBooking() {
    document.getElementById('bookingModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
