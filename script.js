"use strict";

document.addEventListener("DOMContentLoaded", function () {
    initPageLoad();
    initStickyHeader();
    initMobileMenu();
    initSmoothScroll();
    initActiveNav();
    initBackToTop();
    initHeroBg();
    initMenuFilter();
    initGalleryFilter();
    initGalleryLightbox();
    initTestimonialSlider();
    initScrollReveal();
    initForms();
    initCounters();
    initRipple();
    initFooterYear();
});

/* ==============================
   PAGE LOAD FADE IN
============================== */
function initPageLoad() {
    window.addEventListener("load", function () {
        document.body.classList.add("loaded");
    });
}

/* ==============================
   HERO BG ANIMATION
============================== */
function initHeroBg() {
    const bg = document.querySelector(".hero-bg");
    if (!bg) return;
    setTimeout(() => bg.classList.add("ready"), 100);
}

/* ==============================
   STICKY HEADER
============================== */
function initStickyHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    window.addEventListener("scroll", function () {
        header.classList.toggle("sticky-active", window.scrollY > 50);
        header.classList.toggle("small-nav", window.scrollY > 100);
    });
}

/* ==============================
   MOBILE MENU
============================== */
function initMobileMenu() {
    const toggle = document.querySelector(".mobile-toggle");
    const nav = document.querySelector(".nav-menu");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
        const open = nav.classList.toggle("mobile-active");
        toggle.innerHTML = open
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", function () {
            nav.classList.remove("mobile-active");
            toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

/* ==============================
   SMOOTH SCROLL
============================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href === "#" || href === "") return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: "smooth" });
            }
        });
    });
}

/* ==============================
   ACTIVE NAV ON SCROLL
============================== */
function initActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-menu a");
    window.addEventListener("scroll", function () {
        let current = "";
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.getAttribute("id");
            }
        });
        links.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });
}

/* ==============================
   BACK TO TOP
============================== */
function initBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    window.addEventListener("scroll", () => {
        btn.classList.toggle("visible", window.scrollY > 400);
    });
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ==============================
   MENU FILTER
============================== */
function initMenuFilter() {
    const btns = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".dish-card");
    if (!btns.length) return;

    btns.forEach(btn => {
        btn.addEventListener("click", function () {
            btns.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            const filter = this.dataset.filter;
            cards.forEach(card => {
                const match = filter === "all" || card.dataset.category === filter;
                card.classList.toggle("hidden", !match);
                if (match) {
                    card.style.animation = "none";
                    card.offsetHeight; // reflow
                    card.style.animation = "";
                }
            });
        });
    });
}

/* ==============================
   GALLERY FILTER
============================== */
function initGalleryFilter() {
    const btns = document.querySelectorAll(".gfilter-btn");
    const items = document.querySelectorAll(".gallery-item");
    if (!btns.length) return;

    btns.forEach(btn => {
        btn.addEventListener("click", function () {
            btns.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            const filter = this.dataset.gfilter;
            items.forEach(item => {
                const match = filter === "all" || item.dataset.gcategory === filter;
                item.classList.toggle("hidden", !match);
            });
        });
    });
}

/* ==============================
   GALLERY LIGHTBOX
============================== */
function initGalleryLightbox() {
    const items = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lbImg = document.getElementById("lbImg");
    const lbClose = document.getElementById("lbClose");
    const lbPrev = document.getElementById("lbPrev");
    const lbNext = document.getElementById("lbNext");
    if (!items.length || !lightbox) return;

    let currentIndex = 0;

    function getVisible() {
        return [...items].filter(i => !i.classList.contains("hidden"));
    }

    function openLightbox(idx) {
        const visible = getVisible();
        currentIndex = idx;
        lbImg.src = visible[idx].querySelector("img").src;
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.classList.remove("open");
        document.body.style.overflow = "";
    }

    items.forEach((item, i) => {
        item.addEventListener("click", function () {
            const visible = getVisible();
            const idx = visible.indexOf(item);
            if (idx !== -1) openLightbox(idx);
        });
    });

    lbClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });

    lbPrev.addEventListener("click", function (e) {
        e.stopPropagation();
        const visible = getVisible();
        currentIndex = (currentIndex - 1 + visible.length) % visible.length;
        lbImg.src = visible[currentIndex].querySelector("img").src;
    });

    lbNext.addEventListener("click", function (e) {
        e.stopPropagation();
        const visible = getVisible();
        currentIndex = (currentIndex + 1) % visible.length;
        lbImg.src = visible[currentIndex].querySelector("img").src;
    });

    document.addEventListener("keydown", function (e) {
        if (!lightbox.classList.contains("open")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") lbPrev.click();
        if (e.key === "ArrowRight") lbNext.click();
    });
}

/* ==============================
   TESTIMONIAL SLIDER
============================== */
function initTestimonialSlider() {
    const track = document.querySelector(".testimonial-track");
    const cards = document.querySelectorAll(".testimonial-card");
    const dots = document.querySelectorAll(".dot");
    const prev = document.querySelector(".slider-prev");
    const next = document.querySelector(".slider-next");
    if (!track || !cards.length) return;

    let current = 0;
    let autoplay;

    function goTo(idx) {
        current = (idx + cards.length) % cards.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle("active", i === current));
    }

    function startAuto() {
        autoplay = setInterval(() => goTo(current + 1), 5000);
    }

    function stopAuto() { clearInterval(autoplay); }

    prev && prev.addEventListener("click", () => { stopAuto(); goTo(current - 1); startAuto(); });
    next && next.addEventListener("click", () => { stopAuto(); goTo(current + 1); startAuto(); });
    dots.forEach((dot, i) => dot.addEventListener("click", () => { stopAuto(); goTo(i); startAuto(); }));

    startAuto();
}

/* ==============================
   SCROLL REVEAL
============================== */
function initScrollReveal() {
    const targets = document.querySelectorAll(
        ".dish-card, .feature-box, .event-card, .gallery-item, .about-feat, .fs-item, .contact-info-item, .rscore"
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show-item");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    targets.forEach(el => {
        el.classList.add("hidden-item");
        observer.observe(el);
    });
}

/* ==============================
   COUNTER ANIMATION
============================== */
function initCounters() {
    const counters = document.querySelectorAll(".counter");
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target, 10);
                let count = 0;
                const step = Math.ceil(target / 60);
                const timer = setInterval(() => {
                    count += step;
                    if (count >= target) { el.textContent = target; clearInterval(timer); }
                    else { el.textContent = count; }
                }, 25);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

/* ==============================
   FORM HANDLING
============================== */
function initForms() {
    // Reservation
    const resForm = document.getElementById("resForm");
    const resSuccess = document.getElementById("resSuccess");
    if (resForm) {
        resForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = this.name.value.trim();
            const email = this.email.value.trim();
            const date = this.date.value;
            const time = this.time.value;
            if (!name || !email || !date || !time) {
                shakeForm(resForm);
                return;
            }
            resForm.querySelectorAll("input, select, textarea, button").forEach(el => el.disabled = true);
            if (resSuccess) resSuccess.classList.add("show");
            resForm.querySelector("button[type=submit]").textContent = "✓ Confirmed!";
        });
    }

    // Contact
    const contactForm = document.getElementById("contactForm");
    const contactSuccess = document.getElementById("contactSuccess");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = this.name.value.trim();
            const email = this.email.value.trim();
            const message = this.message.value.trim();
            if (!name || !email || !message) {
                shakeForm(contactForm);
                return;
            }
            if (contactSuccess) contactSuccess.classList.add("show");
            contactForm.reset();
        });
    }

    // Newsletter
    const nlForm = document.getElementById("nlForm");
    const nlSuccess = document.getElementById("nlSuccess");
    if (nlForm) {
        nlForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = this.email.value.trim();
            if (!email || !email.includes("@")) {
                shakeForm(nlForm);
                return;
            }
            if (nlSuccess) nlSuccess.classList.add("show");
            nlForm.style.display = "none";
        });
    }
}

function shakeForm(form) {
    form.style.animation = "shake .4s ease";
    setTimeout(() => form.style.animation = "", 400);
}

/* ==============================
   RIPPLE EFFECT
============================== */
function initRipple() {
    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.className = "ripple";
            ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/* ==============================
   FOOTER YEAR
============================== */
function initFooterYear() {
    const el = document.getElementById("footer-copy");
    if (el) {
        el.innerHTML = `&copy; ${new Date().getFullYear()} Yummy Yummy Restaurant. All Rights Reserved.`;
    }
}

/* ==============================
   SHAKE ANIMATION (CSS inject)
============================== */
(function injectShake() {
    const style = document.createElement("style");
    style.textContent = `@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}`;
    document.head.appendChild(style);
})();
