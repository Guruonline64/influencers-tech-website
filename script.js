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

    const portfolioSearch =
    document.getElementById("portfolioSearch");

const portfolioSearchClear =
    document.getElementById("portfolioSearchClear");


    // =====================================================
    // RENDER PORTFOLIO
    // =====================================================

    function renderPortfolio(
    filter = "all",
    searchTerm = ""
) {

        if (!portfolioGrid) {
            return;
        }


        portfolioGrid.innerHTML = "";


        // Make sure the project database exists

        if (
            !window.portfolioProjects ||
            !Array.isArray(window.portfolioProjects)
        ) {

            console.error(
                "Portfolio database not found."
            );

            if (portfolioEmpty) {

                portfolioEmpty.hidden =
                    false;

            }

            return;

        }


        // FILTER PROJECTS

const normalizedSearch =
    searchTerm.trim().toLowerCase();

const filteredProjects =
    window.portfolioProjects.filter(project => {

        // CATEGORY
        const matchesCategory =
            filter === "all" ||
            (
                Array.isArray(project.categories) &&
                project.categories.includes(filter)
            );

        // SEARCH
        if (!normalizedSearch) {
            return matchesCategory;
        }

        const searchableText = [

            project.title,
            project.description,
            project.challenge,
            project.solution,
            project.type,
            project.year,

            ...(project.categories || []),
            ...(project.tags || []),
            ...(project.tools || [])

        ]
        .join(" ")
        .toLowerCase();

        const matchesSearch =
            searchableText.includes(
                normalizedSearch
            );

        return (
            matchesCategory &&
            matchesSearch
        );

    });

        // =================================================
        // EMPTY STATE
        // =================================================

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


        // =================================================
        // CREATE PROJECT CARDS
        // =================================================

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
                    Array.isArray(project.tags)

                        ? project.tags
                            .map(
                                tag =>
                                    `<span>${tag}</span>`
                            )
                            .join("")

                        : "";


                // -----------------------------------------
                // PROJECT CARD
                // -----------------------------------------

                article.innerHTML = `

                    ${imageHTML}

                    <div class="portfolio-generated-category">

                        ${project.categoryLabel || ""}

                    </div>


                    <h3>
                        ${project.title}
                    </h3>


                    <p>
                        ${project.description || ""}
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


        // =================================================
        // VIEW PROJECT BUTTONS
        // =================================================

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


    let activePortfolioFilter = "all";
    
    portfolioFilters.forEach(
        filterButton => {

            filterButton.addEventListener(
                "click",
                () => {

                   const filter =
    filterButton.dataset.filter;


activePortfolioFilter =
    filter;


renderPortfolio(
    activePortfolioFilter,
    portfolioSearch
        ? portfolioSearch.value
        : ""
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
// PORTFOLIO SEARCH
// =====================================================

if (portfolioSearch) {

    portfolioSearch.addEventListener(
        "input",
        () => {

            const searchValue =
                portfolioSearch.value;


            if (portfolioSearchClear) {

                portfolioSearchClear.hidden =
                    searchValue.length === 0;

            }


            renderPortfolio(
                activePortfolioFilter,
                searchValue
            );

        }
    );

}


// =====================================================
// CLEAR SEARCH
// =====================================================

if (portfolioSearchClear) {

    portfolioSearchClear.addEventListener(
        "click",
        () => {

            if (portfolioSearch) {

                portfolioSearch.value = "";

            }


            portfolioSearchClear.hidden =
                true;


            renderPortfolio(
                activePortfolioFilter,
                ""
            );


            if (portfolioSearch) {

                portfolioSearch.focus();

            }

        }
    );

}

    // =====================================================
    // CASE STUDY MODAL ELEMENTS
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

        if (!window.portfolioProjects) {

            console.error(
                "Portfolio database not found."
            );

            return;

        }


        const project =
            window.portfolioProjects.find(
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


        // CATEGORY

        if (projectModalCategory) {

            projectModalCategory.textContent =
                project.categoryLabel || "";

        }


        // TITLE

        if (projectModalTitle) {

            projectModalTitle.textContent =
                project.title || "";

        }


        // INTRO

        if (projectModalIntro) {

            projectModalIntro.textContent =
                project.description || "";

        }


        // CHALLENGE

        if (projectModalChallenge) {

            projectModalChallenge.textContent =
                project.challenge || "";

        }


        // SOLUTION

        if (projectModalSolution) {

            projectModalSolution.textContent =
                project.solution || "";

        }


        // TYPE

        if (projectModalType) {

            projectModalType.textContent =
                project.type || "";

        }


        // =================================================
        // TAGS
        // =================================================

        if (projectModalTags) {

            projectModalTags.innerHTML = "";


            if (Array.isArray(project.tags)) {

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

            }

        }


        // =================================================
        // OPEN MODAL
        // =================================================

        if (projectModal) {

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

    }


    // =====================================================
    // CLOSE CASE STUDY
    // =====================================================

    function closeProjectCaseStudy() {

        if (!projectModal) {
            return;
        }


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


    // =====================================================
    // CLOSE BUTTON
    // =====================================================

    if (projectModalClose) {

        projectModalClose.addEventListener(
            "click",
            closeProjectCaseStudy
        );

    }


    // =====================================================
    // OVERLAY
    // =====================================================

    if (projectModalOverlay) {

        projectModalOverlay.addEventListener(
            "click",
            closeProjectCaseStudy
        );

    }


    // =====================================================
    // ESCAPE KEY
    // =====================================================

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                projectModal &&
                projectModal.classList.contains(
                    "active"
                )
            ) {

                closeProjectCaseStudy();

            }

        }
    );


    // =====================================================
    // INITIALIZE PORTFOLIO
    // =====================================================

    renderPortfolio("all");

});
