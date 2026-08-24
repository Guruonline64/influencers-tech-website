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


// =====================================================
// PORTFOLIO CASE STUDY SYSTEM
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const projectModal = document.getElementById("projectModal");
    const projectModalClose = document.getElementById("projectModalClose");
    const projectModalOverlay = document.getElementById("projectModalOverlay");

    const projectModalImage = document.getElementById("projectModalImage");

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

    const projectModalLink =
        document.getElementById("projectModalLink");


    // -----------------------------------------
    // SAFETY CHECK
    // -----------------------------------------

    if (!projectModal) {
        console.error("Project modal not found.");
        return;
    }


    // -----------------------------------------
    // PROJECT DATA
    // -----------------------------------------

    const projectData = {

        tech: {
            category: "BRAND IDENTITY • DIGITAL SERVICES",

            title: "Influencer's Tech",

            intro:
                "A modern technology brand identity and digital presence designed to showcase creative services, technology solutions and digital projects.",

            challenge:
                "Create a professional technology brand that feels modern, trustworthy and capable of serving businesses and individuals.",

            solution:
                "Developed a clean visual direction and responsive digital experience focused on credibility, clear communication and showcasing creative work.",

            type:
                "Technology / Creative Services",

            image:
                "Images/influencers-tech-flyer.png",

            link:
                "#",

            tags: [
                "Branding",
                "Graphic Design",
                "Web Design"
            ]
        },


        urban: {
            category: "BRANDING • WEB DESIGN",

            title: "Urban Plate Restaurant",

            intro:
                "A modern restaurant branding and digital campaign combining visual identity, promotional graphics and responsive web design.",

            challenge:
                "Create a memorable restaurant identity that feels modern, welcoming and suitable for both digital and physical marketing.",

            solution:
                "Developed a cohesive visual direction and responsive website experience designed to present the restaurant and its offerings clearly.",

            type:
                "Restaurant / Hospitality",

            image:
                "Images/urban-plate-campaign.png",

            link:
                "#",

            tags: [
                "Branding",
                "Graphics",
                "Web Design"
            ]
        },


        website: {
            category: "WEB DEVELOPMENT • UI DESIGN",

            title: "Influencer's Tech Website",

            intro:
                "A responsive business website designed to present digital services, creative work and project information across mobile and desktop devices.",

            challenge:
                "Build a professional online presence that is fast, responsive and easy for potential clients to navigate.",

            solution:
                "Created a responsive front-end experience using semantic HTML, modern CSS and JavaScript interactions.",

            type:
                "Business Website",

            image:
                null,

            link:
                "https://guruonline64.github.io/influencers-tech-website/",

            tags: [
                "HTML",
                "CSS",
                "JavaScript",
                "Responsive Design"
            ]
        }

    };


    // -----------------------------------------
    // OPEN PROJECT
    // -----------------------------------------

    function openProject(projectKey) {

        const project = projectData[projectKey];

        if (!project) {
            console.error("Project not found:", projectKey);
            return;
        }


        // Text

        if (projectModalCategory) {
            projectModalCategory.textContent = project.category;
        }

        if (projectModalTitle) {
            projectModalTitle.textContent = project.title;
        }

        if (projectModalIntro) {
            projectModalIntro.textContent = project.intro;
        }

        if (projectModalChallenge) {
            projectModalChallenge.textContent = project.challenge;
        }

        if (projectModalSolution) {
            projectModalSolution.textContent = project.solution;
        }

        if (projectModalType) {
            projectModalType.textContent = project.type;
        }


        // -----------------------------------------
        // IMAGE
        // -----------------------------------------

        if (projectModalImage) {

            const oldImage =
                projectModalImage.querySelector("img");

            if (oldImage) {
                oldImage.remove();
            }


            const placeholder =
                projectModalImage.querySelector(
                    ".project-modal-image-placeholder"
                );


            if (project.image) {

                const image =
                    document.createElement("img");

                image.src = project.image;

                image.alt = project.title;

                image.onerror = function () {

                    console.warn(
                        "Project image could not be loaded:",
                        project.image
                    );

                    if (placeholder) {
                        placeholder.style.display = "grid";
                        placeholder.textContent =
                            project.title;
                    }

                    image.remove();
                };


                if (placeholder) {
                    placeholder.style.display = "none";
                }

                projectModalImage.appendChild(image);

            } else {

                if (placeholder) {

                    placeholder.style.display = "grid";

                    placeholder.textContent =
                        "WEB DESIGN";
                }

            }

        }


        // -----------------------------------------
        // TAGS
        // -----------------------------------------

        if (projectModalTags) {

            projectModalTags.innerHTML = "";

            project.tags.forEach(tag => {

                const tagElement =
                    document.createElement("span");

                tagElement.textContent = tag;

                projectModalTags.appendChild(
                    tagElement
                );

            });

        }


        // -----------------------------------------
        // LIVE PROJECT LINK
        // -----------------------------------------

        if (projectModalLink) {

            if (
                project.link &&
                project.link !== "#"
            ) {

                projectModalLink.href =
                    project.link;

                projectModalLink.style.display =
                    "inline-flex";

            } else {

                projectModalLink.removeAttribute(
                    "href"
                );

                projectModalLink.style.display =
                    "none";

            }

        }


        // -----------------------------------------
        // SHOW MODAL
        // -----------------------------------------

        projectModal.classList.add("active");

        projectModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

    }


    // -----------------------------------------
    // CLOSE PROJECT
    // -----------------------------------------

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


    // -----------------------------------------
    // VIEW PROJECT BUTTONS
    // -----------------------------------------

    const projectButtons =
        document.querySelectorAll(
            ".portfolio-project-link"
        );


    console.log(
        "Portfolio buttons found:",
        projectButtons.length
    );


    projectButtons.forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const projectKey =
                    this.getAttribute(
                        "data-project"
                    );

                console.log(
                    "Opening project:",
                    projectKey
                );

                openProject(projectKey);

            }
        );

    });


    // -----------------------------------------
    // CLOSE BUTTON
    // -----------------------------------------

    if (projectModalClose) {

        projectModalClose.addEventListener(
            "click",
            closeProject
        );

    }


    // -----------------------------------------
    // CLICK OUTSIDE
    // -----------------------------------------

    if (projectModalOverlay) {

        projectModalOverlay.addEventListener(
            "click",
            closeProject
        );

    }


    // -----------------------------------------
    // ESCAPE KEY
    // -----------------------------------------

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
    });


// =====================================================
// CLOSE EVENTS
// =====================================================

projectModalClose.addEventListener(
    "click",
    closeProjectModal
);


projectModalOverlay.addEventListener(
    "click",
    closeProjectModal
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            projectModal.classList.contains(
                "active"
            )
        ) {

            closeProjectModal();

        }

    }
);
    
