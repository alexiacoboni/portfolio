/* ==========================================================
   DOM REFERENCES
========================================================== */

const header = document.querySelector(".header");
const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");
const backToTop = document.getElementById("backToTop");
const profileImage = document.querySelector(".profile-image");
const floatingCard = document.querySelector(".floating-card");
const revealElements = document.querySelectorAll(
    ".about-card, .skill-card, .project-card, .contact-card, .highlight-card, .timeline-content"
);

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const menuOverlay = document.querySelector(".menu-overlay");

/* ==========================================================
   ACTIVE NAV LINK (multi-page)
   This is now a static, one-time check against the current
   page's URL instead of a scroll-driven section tracker.
   About/Projects/Contact are separate pages now, so there
   is no scroll position to track — a link is "active" if
   its href matches the current page.
========================================================== */

function setActiveNavLink() {

    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach(link => {

        const linkPath = link.getAttribute("href").split("/").pop();
        link.classList.toggle("active", linkPath === currentPath);

    });

}

setActiveNavLink();

/* ==========================================================
   UNIFIED SCROLL HANDLER
   Header shadow, back-to-top visibility and the hero
   parallax effects, combined into one listener and
   throttled with requestAnimationFrame.
========================================================== */

let ticking = false;

function updateOnScroll() {

    const scrollY = window.scrollY;

    if (header) {
        header.classList.toggle("scrolled", scrollY > 20);
    }

    if (backToTop) {
        backToTop.classList.toggle("show", scrollY > 500);
    }

    if (profileImage) {
        profileImage.style.transform = `translateY(${scrollY * 0.08}px)`;
    }

    if (floatingCard) {
        floatingCard.style.transform = `translateY(${scrollY * 0.05}px)`;
    }

    ticking = false;

}

function onScroll() {

    if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
    }

}

window.addEventListener("scroll", onScroll, { passive: true });

updateOnScroll();

/* ==========================================================
   BACK TO TOP BUTTON
========================================================== */

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

/* ==========================================================
   SCROLL REVEAL (IntersectionObserver)
========================================================== */

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("reveal", "active");
                observer.unobserve(entry.target);
            }

        });

    }, {
        rootMargin: "0px 0px -100px 0px"
    });

    revealElements.forEach(element => revealObserver.observe(element));

} else {

    revealElements.forEach(element => element.classList.add("reveal", "active"));

}

/* ==========================================================
   SMOOTH SCROLL FOR IN-PAGE ANCHORS
   Still relevant on pages like about.html, where a link
   points to a section on the same page (e.g. href="#experience").
========================================================== */

document.addEventListener("click", (e) => {

    const anchor = e.target.closest('a[href^="#"]');

    if (!anchor) return;

    const targetId = anchor.getAttribute("href");

    if (targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({ behavior: "smooth" });

    if (mobileMenu && mobileMenu.contains(anchor)) {
        closeMobileMenu();
    }

});

/* ==========================================================
   MOBILE MENU
========================================================== */

function openMobileMenu() {

    menuToggle.classList.add("active");
    mobileMenu.classList.add("active");
    menuOverlay.classList.add("active");
    document.body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");

}

function closeMobileMenu() {

    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");

}

if (menuToggle && mobileMenu && menuOverlay) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mobileMenu.classList.contains("active");

        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }

    });

    menuOverlay.addEventListener("click", closeMobileMenu);

    // Close on a normal (non-hash) mobile menu link too,
    // e.g. links to about.html — the click handler above
    // only closes it for same-page hash anchors.
    document.querySelectorAll(".mobile-menu a").forEach(link => {

        link.addEventListener("click", () => {

            if (!link.getAttribute("href").startsWith("#")) {
                closeMobileMenu();
            }

        });

    });

}

/* ==========================================================
   CONTACT FORM (Formspree)
   Progressive enhancement: the <form> has a real action/
   method, so it works even if this script fails to load.
   When JS is available, submission happens via fetch so
   the visitor gets an inline success/error message instead
   of leaving the page.
========================================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const statusEl = document.getElementById("formStatus");
    const submitBtn = contactForm.querySelector(".form-submit");

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        // Honeypot: if this hidden field has a value, a bot
        // filled it in — silently pretend to succeed.
        const honeypot = contactForm.querySelector('input[name="_gotcha"]');

        if (honeypot && honeypot.value) {
            statusEl.textContent = "Message sent — thank you!";
            statusEl.dataset.state = "success";
            contactForm.reset();
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        statusEl.textContent = "";
        statusEl.removeAttribute("data-state");

        try {

            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { Accept: "application/json" }
            });

            if (response.ok) {

                statusEl.textContent = "Message sent — thank you! I'll get back to you soon.";
                statusEl.dataset.state = "success";
                contactForm.reset();

            } else {

                statusEl.textContent = "Something went wrong. Please email me directly instead.";
                statusEl.dataset.state = "error";

            }

        } catch (error) {

            statusEl.textContent = "Something went wrong. Please email me directly instead.";
            statusEl.dataset.state = "error";

        } finally {

            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";

        }

    });

}
