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


    // =====================================================
// PORTFOLIO DATABASE + FILTER SYSTEM
// =====================================================

const portfolioGrid =
    document.getElementById("portfolioGrid");

const portfolioFilters =
    document.querySelectorAll(".portfolio-filter");

const portfolioEmpty =
    document.getElementById("portfolioEmpty");


// =====================================================
// RENDER PROJECTS
// =====================================================

function renderPortfolio(filter = "all") {

    if (!portfolioGrid) {
        return;
    }


    portfolioGrid.innerHTML = "";


    const filteredProjects =
        filter === "all"

            ? portfolioProjects

            : portfolioProjects.filter(
                project =>
                    project.category === filter
            );


    // EMPTY STATE

    if (filteredProjects.length === 0) {

        if (portfolioEmpty) {

            portfolioEmpty.hidden =
                false;

        }

        return;

    }


    if (portfolioEmpty) {

        portfolioEmpty.hidden =
            true;

    }


    // CREATE PROJECT CARDS

    filteredProjects.forEach(
        (project, index) => {

            const article =
                document.createElement("article");


            article.className =
                "work-item portfolio-card-generated";


            article.style.animationDelay =
                `${index * 0.08}s`;


            // -----------------------------------------
            // IMAGE
            // -----------------------------------------

            let imageHTML = "";


            if (project.image) {

                imageHTML = `
                    <div class="portfolio-image">

                        <img
                            src="${project.image}"
                            alt="${project.title}"
                            loading="lazy"
                        >

                    </div>
                `;

            } else {

                imageHTML = `
                    <div class="portfolio-image portfolio-placeholder">

                        <span>
                            ${project.type}
                        </span>

                    </div>
                `;

            }


            // -----------------------------------------
            // TAGS
            // -----------------------------------------

            const tagsHTML =
                project.tags
                    .map(
                        tag =>
                            `<span>${tag}</span>`
                    )
                    .join("");


            // -----------------------------------------
            // CARD
            // -----------------------------------------

            article.innerHTML = `

                ${imageHTML}

                <div class="portfolio-generated-category">

                    ${project.categoryLabel}

                </div>


                <h3>
                    ${project.title}
                </h3>


                <p>
                    ${project.description}
                </p>


                <div
                    class="portfolio-generated-tags"
                >

                    ${tagsHTML}

                </div>


                <button
                    type="button"
                    class="portfolio-generated-button"
                    data-project-id="${project.id}"
                >

                    View Project

                    <span>↗</span>

                </button>

            `;


            portfolioGrid.appendChild(
                article
            );

        }
    );


    // -----------------------------------------
    // BUTTON EVENTS
    // -----------------------------------------

    portfolioGrid
        .querySelectorAll(
            ".portfolio-generated-button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    const projectId =
                        button.dataset.projectId;


                    openProjectCaseStudy(
                        projectId
                    );

                }
            );

        });

}


// =====================================================
// FILTER BUTTONS
// =====================================================

portfolioFilters.forEach(
    filterButton => {

        filterButton.addEventListener(
            "click",
            () => {

                portfolioFilters.forEach(
                    button => {

                        button.classList.remove(
                            "active"
                        );

                    }
                );


                filterButton.classList.add(
                    "active"
                );


                const filter =
                    filterButton.dataset.filter;


                renderPortfolio(
                    filter
                );

            }
        );

    }
);


// =====================================================
// INITIAL LOAD
// =====================================================

renderPortfolio("all");


// =====================================================
// CASE STUDY
// =====================================================

const projectModal =
    document.getElementById(
        "projectModal"
    );

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


// =====================================================
// OPEN CASE STUDY
// =====================================================

function openProjectCaseStudy(projectId) {

    const project =
        portfolioProjects.find(
            item =>
                item.id === projectId
        );


    if (!project) {

        console.error(
            "Project not found:",
            projectId
        );

        return;

    }


    projectModalCategory.textContent =
        project.categoryLabel;


    projectModalTitle.textContent =
        project.title;


    projectModalIntro.textContent =
        project.description;


    projectModalChallenge.textContent =
        project.challenge;


    projectModalSolution.textContent =
        project.solution;


    projectModalType.textContent =
        project.type;


    // TAGS

    projectModalTags.innerHTML = "";


    project.tags.forEach(
        tag => {

            const tagElement =
                document.createElement(
                    "span"
                );


            tagElement.textContent =
                tag;


            projectModalTags.appendChild(
                tagElement
            );

        }
    );


    // OPEN

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


// =====================================================
// CLOSE CASE STUDY
// =====================================================

function closeProjectCaseStudy() {

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


// CLOSE BUTTON

if (projectModalClose) {

    projectModalClose.addEventListener(
        "click",
        closeProjectCaseStudy
    );

}


// OVERLAY

if (projectModalOverlay) {

    projectModalOverlay.addEventListener(
        "click",
        closeProjectCaseStudy
    );

}


// ESCAPE

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            projectModal.classList.contains(
                "active"
            )
        ) {

            closeProjectCaseStudy();

        }

    }
);
