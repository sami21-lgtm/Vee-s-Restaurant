document.addEventListener("DOMContentLoaded", () => {
    
    let cart = [];
    const deliveryCharge = 40;

    const menuTabs = document.querySelectorAll(".tab-btn");
    const menuCards = document.querySelectorAll(".menu-card");
    const cartItemsList = document.getElementById("cartItemsList");
    const cartSubtotal = document.getElementById("cartSubtotal");
    const cartDelivery = document.getElementById("cartDelivery");
    const cartGrandTotal = document.getElementById("cartGrandTotal");
    const checkoutBtn = document.getElementById("checkoutBtn");
    
    const cartCountBadges = document.querySelectorAll(".cart-count-badge, #mobileCartCount");
    const mobileCartBar = document.getElementById("mobileCartBar");
    const mobileCartPrice = document.getElementById("mobileCartPrice");
    const cartSidebar = document.getElementById("cartSidebar");
    
    const closeCartBtn = document.getElementById("closeCartBtn");
    const mobileViewCartBtn = document.getElementById("mobileViewCartBtn");
    const headerCartBtn = document.getElementById("headerCartBtn");

    // Category Tabs Logic
    menuTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            menuTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            
            const target = tab.getAttribute("data-target");
            menuCards.forEach(card => {
                if (target === "all" || card.getAttribute("data-category") === target) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // Add to Cart Logic
    const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".menu-card");
            const itemId = card.getAttribute("data-id");
            const itemName = card.getAttribute("data-name");
            
            const selectedRadio = card.querySelector("input[type='radio']:checked");
            const portionSize = selectedRadio.value;
            const itemPrice = parseInt(selectedRadio.getAttribute("data-price"));
            
            const cartProductUniqueKey = `${itemId}-${portionSize}`;
            const existingItem = cart.find(item => item.uniqueKey === cartProductUniqueKey);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    uniqueKey: cartProductUniqueKey,
                    id: itemId,
                    name: itemName,
                    portion: portionSize,
                    price: itemPrice,
                    quantity: 1
                });
            }

            renderGlobalCartState();
            
            button.innerText = "Added ✓";
            button.style.background = "#2ecc71";
            setTimeout(() => {
                button.innerText = "Add to Cart";
                button.style.background = "#e21b70";
            }, 800);
        });
    });

    // Render Cart Logic
    function renderGlobalCartState() {
        cartItemsList.innerHTML = "";
        
        if (cart.length === 0) {
            cartItemsList.innerHTML = `<div class="empty-cart-msg">Your basket is empty. Add items to start cooking!</div>`;
            cartSubtotal.innerText = "Tk 0";
            cartDelivery.innerText = "Tk 0";
            cartGrandTotal.innerText = "Tk 0";
            mobileCartPrice.innerText = "Tk 0";
            checkoutBtn.disabled = true;
            
            cartCountBadges.forEach(badge => badge.innerText = "0");
            return;
        }

        let subtotal = 0;
        let totalItemsCount = 0;

        cart.forEach(item => {
            const itemCost = item.price * item.quantity;
            subtotal += itemCost;
            totalItemsCount += item.quantity;

            const nodeRow = document.createElement("div");
            nodeRow.className = "cart-item-node";
            nodeRow.innerHTML = `
                <div class="node-meta">
                    <h4>${item.name}</h4>
                    <span>Size: ${item.portion}</span>
                </div>
                <div class="node-controls">
                    <button class="node-qty-btn decrease-qty" data-key="${item.uniqueKey}"><i class="fas fa-minus-circle"></i></button>
                    <span class="node-qty-val">${item.quantity}</span>
                    <button class="node-qty-btn increase-qty" data-key="${item.uniqueKey}"><i class="fas fa-plus-circle"></i></button>
                    <span class="node-price">Tk ${itemCost}</span>
                </div>
            `;
            cartItemsList.appendChild(nodeRow);
        });

        const finalGrandTotal = subtotal + deliveryCharge;

        cartSubtotal.innerText = `Tk ${subtotal}`;
        cartDelivery.innerText = `Tk ${deliveryCharge}`;
        cartGrandTotal.innerText = `Tk ${finalGrandTotal}`;
        mobileCartPrice.innerText = `Tk ${finalGrandTotal}`;
        checkoutBtn.disabled = false;

        cartCountBadges.forEach(badge => badge.innerText = totalItemsCount);
        bindCartActionControls();
    }

    // +/- Quantity Controllers
    function bindCartActionControls() {
        document.querySelectorAll(".increase-qty").forEach(btn => {
            btn.addEventListener("click", () => {
                const key = btn.getAttribute("data-key");
                const targetItem = cart.find(item => item.uniqueKey === key);
                if (targetItem) targetItem.quantity += 1;
                renderGlobalCartState();
            });
        });

        document.querySelectorAll(".decrease-qty").forEach(btn => {
            btn.addEventListener("click", () => {
                const key = btn.getAttribute("data-key");
                const targetItem = cart.find(item => item.uniqueKey === key);
                if (targetItem) {
                    targetItem.quantity -= 1;
                    if (targetItem.quantity === 0) {
                        cart = cart.filter(item => item.uniqueKey !== key);
                    }
                }
                renderGlobalCartState();
            });
        });
    }

    // Cart Sidebar Toggles
    if (mobileViewCartBtn) mobileViewCartBtn.addEventListener("click", () => cartSidebar.classList.add("open"));
    if (headerCartBtn) headerCartBtn.addEventListener("click", () => cartSidebar.classList.add("open"));
    if (closeCartBtn) closeCartBtn.addEventListener("click", () => cartSidebar.classList.remove("open"));

    // Reservation Form Simulation
    const reservationForm = document.getElementById("resForm");
    const formFeedback = document.getElementById("formFeedback");

    if (reservationForm) {
        reservationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            formFeedback.classList.remove("hidden");
            formFeedback.style.display = "block";
            formFeedback.style.marginTop = "15px";
            formFeedback.style.color = "#2ecc71";
            formFeedback.innerHTML = `<strong>Success!</strong> Table hold requested for ${name}.`;
            reservationForm.reset();
        });
    }
});
