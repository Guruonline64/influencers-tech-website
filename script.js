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
            `© ${currentYear} Influencer's Tech | Digital Solutions all right reserved.`;
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


// =========================
// PROJECT CASE STUDY MODAL
// =========================

const projectModal = document.getElementById("projectModal");
const projectModalClose = document.getElementById("projectModalClose");
const projectModalOverlay = document.getElementById("projectModalOverlay");

const projectModalCategory =
    document.getElementById("projectModalCategory");

const projectModalTitle =
    document.getElementById("projectModalTitle");

const projectModalIntro =
    document.getElementById("projectModalIntro");

const projectModalChallenge =
    document.getElementById("projectModalChallenge");

const projectModalSolution =
    document.getElementById("projectModalSolution");

const projectModalTags =
    document.getElementById("projectModalTags");

const projectModalType =
    document.getElementById("projectModalType");


const projectData = {

    urban: {
        category: "BRANDING • WEB DESIGN",
        title: "Urban Plate Restaurant Campaign",
        intro: "A modern restaurant brand concept combining visual identity, promotional design and a responsive digital experience.",
        challenge: "Create a memorable restaurant identity that feels modern, welcoming and suitable for both digital and physical marketing.",
        solution: "Developed a cohesive visual direction and responsive website experience designed to present the restaurant and its offerings clearly.",
        type: "Restaurant / Hospitality",
        tags: [
            "Branding",
            "Graphic Design",
            "Web Design"
        ]
    },

    tech: {
        category: "BRAND IDENTITY",
        title: "Influencer's Tech",
        intro: "A technology brand identity and digital presence designed around modern web development, creative design and digital services.",
        challenge: "Create a professional technology brand that can communicate its services clearly while maintaining a distinctive visual identity.",
        solution: "Built a clean digital identity and responsive portfolio website focused on credibility, usability and showcasing creative work.",
        type: "Technology / Creative Services",
        tags: [
            "Brand Identity",
            "Logo Design",
            "Web Design",
            "Graphics"
        ]
    },

    website: {
        category: "WEB DEVELOPMENT",
        title: "Influencer's Tech Website",
        intro: "A responsive business website designed to showcase services, projects and digital solutions across mobile and desktop devices.",
        challenge: "Build a professional online presence that is fast, responsive and easy for potential clients to navigate.",
        solution: "Created a responsive front-end experience using semantic HTML, modern CSS and JavaScript interactions.",
        type: "Business Website",
        tags: [
            "HTML",
            "CSS",
            "JavaScript",
            "Responsive Design"
        ]
    }

};


function openProjectModal(projectKey) {

    const project = projectData[projectKey];

    if (!project) {
        return;
    }

    projectModalCategory.textContent = project.category;

    projectModalTitle.textContent = project.title;

    projectModalIntro.textContent = project.intro;

    projectModalChallenge.textContent = project.challenge;

    projectModalSolution.textContent = project.solution;

    projectModalType.textContent = project.type;


    projectModalTags.innerHTML = "";

    project.tags.forEach(tag => {

        const tagElement = document.createElement("span");

        tagElement.textContent = tag;

        projectModalTags.appendChild(tagElement);

    });


    projectModal.classList.add("active");

    projectModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

}


function closeProjectModal() {

    projectModal.classList.remove("active");

    projectModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


document.querySelectorAll(".portfolio-project-link").forEach(button => {

    button.addEventListener("click", () => {

        const projectKey = button.dataset.project;

        openProjectModal(projectKey);

    });

});


projectModalClose.addEventListener(
    "click",
    closeProjectModal
);


projectModalOverlay.addEventListener(
    "click",
    closeProjectModal
);


document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        projectModal.classList.contains("active")
    ) {
        closeProjectModal();
    }

});
    
