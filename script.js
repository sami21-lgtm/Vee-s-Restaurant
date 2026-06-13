document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll Tracking
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // 2. Menu Filtering Logic
    const tabButtons = document.querySelectorAll(".tab-btn");
    const menuCards = document.querySelectorAll(".menu-card");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const targetCategory = button.getAttribute("data-target");
            menuCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                card.style.display = (targetCategory === "all" || cardCategory === targetCategory) ? "block" : "none";
            });
        });
    });

    // 3. Menu Item Price/Qty Logic (With safety checks)
    menuCards.forEach(card => {
        const selectedPortion = card.querySelector(".portion-group input[type='radio']:checked");
        const qtyInput = card.querySelector(".qty-input");
        const qtyPlus = card.querySelector(".qty-plus");
        const qtyMinus = card.querySelector(".qty-minus");
        const totalDisplay = card.querySelector(".total-price");

        if (!qtyInput || !totalDisplay) return; // যদি এলিমেন্ট না থাকে তবে এরর দেবে না

        const updateItemTotal = () => {
            const currentPortion = card.querySelector(".portion-group input[type='radio']:checked");
            const portionPrice = currentPortion ? parseInt(currentPortion.getAttribute("data-price")) : 0;
            const quantity = parseInt(qtyInput.value) || 1;
            totalDisplay.innerHTML = `Tk ${portionPrice * quantity}`;
        }

        // Event Listeners
        card.querySelectorAll(".portion-group input").forEach(input => input.addEventListener("change", updateItemTotal));
        
        qtyPlus?.addEventListener("click", () => {
            qtyInput.value = parseInt(qtyInput.value) + 1;
            updateItemTotal();
        });

        qtyMinus?.addEventListener("click", () => {
            if (parseInt(qtyInput.value) > 1) {
                qtyInput.value = parseInt(qtyInput.value) - 1;
                updateItemTotal();
            }
        });

        qtyInput.addEventListener("input", updateItemTotal);
        updateItemTotal();
    });

    // 4. Reservation Form Logic (Adding safety for 'seating')
    const reservationForm = document.getElementById("resForm");
    if(reservationForm) {
        reservationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const seatingChecked = document.querySelector('input[name="seating"]:checked');
            const seatingValue = seatingChecked ? seatingChecked.value : "Standard";
            
           
            reservationForm.reset();
        });
    }
});
