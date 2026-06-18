"use strict";

document.addEventListener("DOMContentLoaded", function () {

    initStickyHeader();
    initSmoothScroll();
    initBackToTop();
    initActiveNav();

});

/*=====================
STICKY HEADER
=====================*/

function initStickyHeader() {

    const header = document.querySelector(".site-header");

    if (!header) return;

    window.addEventListener("scroll", function () {

        if (window.scrollY > 50) {

            header.classList.add("sticky-active");

        } else {

            header.classList.remove("sticky-active");

        }

    });

}

/*=====================
SMOOTH SCROLL
=====================*/

function initSmoothScroll() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {

        link.addEventListener("click", function (e) {

            const href = this.getAttribute("href");

            if (href === "#" || href === "") {

                return;

            }

            const target = document.querySelector(href);

            if (target) {

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

}

/*=====================
BACK TO TOP
=====================*/

function initBackToTop() {

    const btn = document.createElement("button");

    btn.innerHTML = "↑";

    btn.className = "back-to-top";

    document.body.appendChild(btn);

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {

            btn.style.display = "block";

        } else {

            btn.style.display = "none";

        }

    });

    btn.addEventListener("click", function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/*=====================
ACTIVE NAV
=====================*/

function initActiveNav() {

    const sections = document.querySelectorAll("section");

    const links = document.querySelectorAll(".nav-menu a");

    window.addEventListener("scroll", function () {

        let current = "";

        sections.forEach(function (section) {

            const top = section.offsetTop - 150;

            if (window.scrollY >= top) {

                current = section.getAttribute("id");

            }

        });

        links.forEach(function (link) {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

}
/*=====================
MOBILE MENU
=====================*/

function initMobileMenu(){

const nav=document.querySelector(".nav-menu");

const container=document.querySelector(".site-header .container");

if(!nav||!container)return;

const btn=document.createElement("button");

btn.innerHTML="☰";

btn.className="mobile-toggle";

container.prepend(btn);

btn.addEventListener("click",function(){

nav.classList.toggle("mobile-active");

});

document.querySelectorAll(".nav-menu a").forEach(link=>{

link.addEventListener("click",function(){

nav.classList.remove("mobile-active");

});

});

}

initMobileMenu();


/*=====================
GALLERY LIGHTBOX
=====================*/

function initGallery(){

const images=document.querySelectorAll(".gallery-grid img");

if(images.length===0)return;

const overlay=document.createElement("div");

overlay.className="lightbox";

overlay.innerHTML="<img>";

document.body.appendChild(overlay);

const img=overlay.querySelector("img");

images.forEach(image=>{

image.addEventListener("click",function(){

overlay.style.display="flex";

img.src=this.src;

});

});

overlay.addEventListener("click",function(){

overlay.style.display="none";

});

}

initGallery();


/*=====================
FOOTER YEAR
=====================*/

function initFooter(){

const p=document.querySelector(".footer-bottom p");

if(!p)return;

p.innerHTML="© "+new Date().getFullYear()+" Restaurant Name. All Rights Reserved.";

}

initFooter();
/*=====================
TESTIMONIAL SLIDER
=====================*/

function initTestimonials() {

    const cards = document.querySelectorAll(".testimonial-card");

    if (cards.length === 0) return;

    let index = 0;

    function showCard() {

        cards.forEach(card => {
            card.style.display = "none";
        });

        cards[index].style.display = "block";

    }

    showCard();

    setInterval(() => {

        index++;

        if (index >= cards.length) {

            index = 0;

        }

        showCard();

    }, 4000);

}

initTestimonials();


/*=====================
RESERVATION FORM
=====================*/

function initReservationForm() {

    const form = document.querySelector(".reservation-form");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();

        if (name === "" || email === "") {

            alert("Please fill all required fields.");

            return;

        }

        alert("Table Reserved Successfully!");

        form.reset();

    });

}

initReservationForm();


/*=====================
CONTACT FORM
=====================*/

function initContactForm() {

    const form = document.querySelector(".contact-form");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (name === "" || email === "" || message === "") {

            alert("Please fill all fields.");

            return;

        }

        alert("Message Sent Successfully!");

        form.reset();

    });

}

initContactForm();


/*=====================
NEWSLETTER
=====================*/

function initNewsletter() {

    const form = document.querySelector(".newsletter-form");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = form.querySelector("input").value.trim();

        if (email === "" || !email.includes("@")) {

            alert("Enter a valid email.");

            return;

        }

        alert("Subscribed Successfully!");

        form.reset();

    });

}

initNewsletter();
/*=====================
SCROLL REVEAL
=====================*/

function initReveal() {

    const items = document.querySelectorAll(
        ".dish-card,.feature-box,.event-card,.testimonial-card,.gallery-grid img"
    );

    if (items.length === 0) return;

    const observer = new IntersectionObserver(function(entries){

        entries.forEach(function(entry){

            if(entry.isIntersecting){

                entry.target.classList.add("show-item");

            }

        });

    },{

        threshold:0.2

    });

    items.forEach(function(item){

        item.classList.add("hidden-item");

        observer.observe(item);

    });

}

initReveal();


/*=====================
LAZY IMAGE LOADING
=====================*/

function initLazyImages(){

    const images=document.querySelectorAll("img");

    images.forEach(function(img){

        img.loading="lazy";

    });

}

initLazyImages();


/*=====================
ESC CLOSE LIGHTBOX
=====================*/

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        const lightbox=document.querySelector(".lightbox");

        if(lightbox){

            lightbox.style.display="none";

        }

    }

});


/*=====================
PAGE LOADED
=====================*/

window.addEventListener("load",function(){

    document.body.classList.add("loaded");

});
/*=====================
COUNTER ANIMATION
=====================*/

function initCounters(){

const counters=document.querySelectorAll(".counter");

if(counters.length===0)return;

counters.forEach(counter=>{

const target=+counter.getAttribute("data-target");

let count=0;

const update=()=>{

const increment=target/100;

if(count<target){

count+=increment;

counter.innerText=Math.ceil(count);

setTimeout(update,20);

}else{

counter.innerText=target;

}

};

update();

});

}

initCounters();


/*=====================
BUTTON RIPPLE EFFECT
=====================*/

document.querySelectorAll(".btn").forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

const rect=this.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.style.width=size+"px";
ripple.style.height=size+"px";

ripple.style.left=e.clientX-rect.left-size/2+"px";
ripple.style.top=e.clientY-rect.top-size/2+"px";

ripple.className="ripple";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});


/*=====================
NAVBAR SHRINK
=====================*/

window.addEventListener("scroll",()=>{

const nav=document.querySelector(".site-header");

if(!nav)return;

if(window.scrollY>100){

nav.classList.add("small-nav");

}else{

nav.classList.remove("small-nav");

}

});