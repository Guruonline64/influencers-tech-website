// ==============================
// UrbanEdge Digital
// Basic Website Interactions
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    // Current year in footer
    const yearElement = document.querySelector("footer p:last-child");

    if (yearElement) {
        const currentYear = new Date().getFullYear();

        yearElement.textContent =
            `© ${currentYear} UrbanEdge Digital. Concept Portfolio Project.`;
    }


    // Add a subtle shadow to the header when scrolling
    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.25)";
        } else {
            header.style.boxShadow = "none";
        }
    });


    // Smooth navigation
    const navigationLinks = document.querySelectorAll('a[href^="#"]');

    navigationLinks.forEach(link => {
        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // Simple project interaction
    const workItems = document.querySelectorAll(".work-item");

    workItems.forEach(item => {
        item.addEventListener("click", () => {

            const projectName =
                item.querySelector("h3")?.textContent || "Project";

            console.log(`Selected project: ${projectName}`);
        });
    });
        // Mobile hamburger menu
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileNav = document.querySelector(".mobile-nav");

    if (menuToggle && mobileNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mobileNav.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });


        // Close menu after clicking a navigation link
        mobileNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });

        });
    }
});