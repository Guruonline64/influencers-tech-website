// =====================================================
// INFLUENCER'S TECH
// MAIN JAVASCRIPT
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // =================================================
    // CURRENT YEAR
    // =================================================

    const yearElement =
        document.querySelector("footer p:last-child");

    if (yearElement) {

        yearElement.textContent =
            `© ${new Date().getFullYear()} Influencer's Tech | Digital Solutions.`;

    }


    // =================================================
    // HEADER SHADOW
    // =================================================

    const header =
        document.querySelector(".header");

    if (header) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 20) {

                header.style.boxShadow =
                    "0 8px 30px rgba(0, 0, 0, 0.25)";

            } else {

                header.style.boxShadow =
                    "none";

            }

        });

    }


    // =================================================
    // SMOOTH NAVIGATION
    // =================================================

    const navigationLinks =
        document.querySelectorAll('a[href^="#"]');

    navigationLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // =================================================
    // MOBILE MENU
    // =================================================

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileNav =
        document.querySelector(".mobile-nav");

    if (menuToggle && mobileNav) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileNav.classList.toggle("active");

                menuToggle.classList.toggle(
                    "active",
                    isOpen
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );

            }
        );


        mobileNav
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        mobileNav.classList.remove(
                            "active"
                        );

                        menuToggle.classList.remove(
                            "active"
                        );

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }


    // =================================================
    // PORTFOLIO CASE STUDY SYSTEM
    // =================================================

    const projectModal =
        document.getElementById("projectModal");

    const projectModalClose =
        document.getElementById(
            "projectModalClose"
        );

    const projectModalOverlay =
        document.getElementById(
            "projectModalOverlay"
        );

    const projectModalCategory =
        document.getElementById(
            "projectModalCategory"
        );

    const projectModalTitle =
        document.getElementById(
            "projectModalTitle"
        );

    const projectModalIntro =
        document.getElementById(
            "projectModalIntro"
        );

    const projectModalChallenge =
        document.getElementById(
            "projectModalChallenge"
        );

    const projectModalSolution =
        document.getElementById(
            "projectModalSolution"
        );

    const projectModalTags =
        document.getElementById(
            "projectModalTags"
        );

    const projectModalType =
        document.getElementById(
            "projectModalType"
        );


    // =================================================
    // CHECK MODAL
    // =================================================

    if (!projectModal) {

        console.error(
            "ERROR: #projectModal was not found."
        );

        return;

    }


    // =================================================
    // PROJECT DATA
    // =================================================

    const projects = {

        tech: {

            category:
                "BRAND IDENTITY • DIGITAL SERVICES",

            title:
                "Influencer's Tech",

            intro:
                "A modern technology brand identity and digital presence designed to showcase creative services, technology solutions and digital projects.",

            challenge:
                "Create a professional technology brand that feels modern, trustworthy and capable of serving businesses and individuals.",

            solution:
                "Developed a clean visual direction and responsive digital experience focused on credibility, clear communication and showcasing creative work.",

            type:
                "Technology / Creative Services",

            tags: [
                "Branding",
                "Graphic Design",
                "Web Design"
            ]

        },


        urban: {

            category:
                "BRANDING • WEB DESIGN",

            title:
                "Urban Plate Restaurant Campaign",

            intro:
                "A modern restaurant branding and digital campaign combining visual identity, promotional graphics and responsive web design.",

            challenge:
                "Create a memorable restaurant identity that feels modern, welcoming and suitable for both digital and physical marketing.",

            solution:
                "Developed a cohesive visual direction and responsive website experience designed to present the restaurant and its offerings clearly.",

            type:
                "Restaurant / Hospitality",

            tags: [
                "Branding",
                "Graphics",
                "Web Design"
            ]

        },


        website: {

            category:
                "WEB DEVELOPMENT • UI DESIGN",

            title:
                "Influencer's Tech Website",

            intro:
                "A responsive business website designed to present digital services, creative work and project information across mobile and desktop devices.",

            challenge:
                "Build a professional online presence that is fast, responsive and easy for potential clients to navigate.",

            solution:
                "Created a responsive front-end experience using semantic HTML, modern CSS and JavaScript interactions.",

            type:
                "Business Website",

            tags: [
                "HTML",
                "CSS",
                "JavaScript",
                "Responsive Design"
            ]

        }

    };


    // =================================================
    // OPEN PROJECT
    // =================================================

    function openProject(projectKey) {

        const project =
            projects[projectKey];

        if (!project) {

            console.error(
                "Project does not exist:",
                projectKey
            );

            return;

        }


        // ---------------------------------------------
        // CONTENT
        // ---------------------------------------------

        projectModalCategory.textContent =
            project.category;

        projectModalTitle.textContent =
            project.title;

        projectModalIntro.textContent =
            project.intro;

        projectModalChallenge.textContent =
            project.challenge;

        projectModalSolution.textContent =
            project.solution;

        projectModalType.textContent =
            project.type;


        // ---------------------------------------------
        // TAGS
        // ---------------------------------------------

        projectModalTags.innerHTML = "";

        project.tags.forEach(tag => {

            const tagElement =
                document.createElement("span");

            tagElement.textContent =
                tag;

            projectModalTags.appendChild(
                tagElement
            );

        });


        // ---------------------------------------------
        // SHOW
        // ---------------------------------------------

        projectModal.classList.add(
            "active"
        );

        projectModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

    }


    // =================================================
    // CLOSE PROJECT
    // =================================================

    function closeProject() {

        projectModal.classList.remove(
            "active"
        );

        projectModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

    }


    // =================================================
    // VIEW PROJECT BUTTONS
    // =================================================

    const projectButtons =
        document.querySelectorAll(
            ".portfolio-project-link"
        );


    console.log(
        "Influencer's Tech:",
        projectButtons.length,
        "portfolio buttons detected."
    );


    projectButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                const projectKey =
                    button.dataset.project;

                console.log(
                    "Opening:",
                    projectKey
                );

                openProject(
                    projectKey
                );

            }
        );

    });


    // =================================================
    // CLOSE BUTTON
    // =================================================

    if (projectModalClose) {

        projectModalClose.addEventListener(
            "click",
            closeProject
        );

    }


    // =================================================
    // OVERLAY
    // =================================================

    if (projectModalOverlay) {

        projectModalOverlay.addEventListener(
            "click",
            closeProject
        );

    }


    // =================================================
    // ESCAPE
    // =================================================

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                projectModal.classList.contains(
                    "active"
                )
            ) {

                closeProject();

            }

        }
    );


});
