document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Scroll Active State Navbar Links
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 120) {
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

    // 2. Menu Category Filter
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
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 3. Form Submission Handler
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
            <strong>Perfect!</strong> Booking request processed for <strong>${name}</strong>.<br>
            ${guests} Person(s) on ${date} at ${time} (${seating} Section).
        `;
        formFeedback.classList.add("success");

        reservationForm.reset();
    });
});
