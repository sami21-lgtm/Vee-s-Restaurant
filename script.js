document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Existing Dynamic Intelligent Scroll Tracking and Menu Filtering (Updated with new categories)
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
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

    const tabButtons = document.querySelectorAll(".tab-btn");
    const menuCards = document.querySelectorAll(".menu-card");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const targetCategory = button.getAttribute("data-target");

            menuCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                if (targetCategory === "all" || cardCategory === targetCategory) {
                    card.style.display = "block";
                    card.style.animation = "fadeIn 0.4s ease forwards";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 2. New Portion and Quantity Calculation Logic Engine blocks for each Menu Item
    menuCards.forEach(card => {
        const portionInputs = card.querySelectorAll(".portion-group input[type='radio']");
        const qtyInput = card.querySelector(".qty-input");
        const qtyPlus = card.querySelector(".qty-plus");
        const qtyMinus = card.querySelector(".qty-minus");
        const totalDisplay = card.querySelector(".total-price");

        // Function to re-calculate and render unique item total nodes
        const updateItemTotal = () => {
            let selectedPortion = card.querySelector(".portion-group input[type='radio']:checked");
            let portionPrice = parseInt(selectedPortion.getAttribute("data-price"));
            let quantity = parseInt(qtyInput.value);
            let total = portionPrice * quantity;
            totalDisplay.innerHTML = `Tk ${total}`;
        }

        // Portion Change event listener
        portionInputs.forEach(input => {
            input.addEventListener("change", updateItemTotal);
        });

        // Quantity Plus event listener
        qtyPlus.addEventListener("click", () => {
            qtyInput.value = parseInt(qtyInput.value) + 1;
            updateItemTotal();
        });

        // Quantity Minus event listener
        qtyMinus.addEventListener("click", () => {
            if (parseInt(qtyInput.value) > 1) {
                qtyInput.value = parseInt(qtyInput.value) - 1;
                updateItemTotal();
            }
        });

        // Manual Quantity Input listener with bounds check logic
        qtyInput.addEventListener("input", () => {
            if (parseInt(qtyInput.value) < 1 || isNaN(parseInt(qtyInput.value))) {
                qtyInput.value = 1;
            }
            updateItemTotal();
        });

        // Initial setup execution block for default portion/quantity nodes
        updateItemTotal();
    });

    // 3. Existing Automated Glassmorphic Reservation Form System
    const reservationForm = document.getElementById("resForm");
    const formFeedback = document.getElementById("formFeedback");

    reservationForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const guests = document.getElementById("guests").value;
        const seating = document.querySelector('input[name="seating"]:checked').value;

        formFeedback.classList.remove("hidden");
        formFeedback.innerHTML = `
            <strong>Perfect!</strong> Table reservation request processed for <strong>${name}</strong>.<br>
            Allocated: ${guests} Guest(s) on ${date} at ${time} inside the <strong>${seating} Section</strong>.
        `;
        formFeedback.classList.add("success");

        reservationForm.reset();
    });
}); 
