// 1. PAGE SWITCHING LOGIC (SPA)
const landingPage = document.getElementById('landing-page');
const galleryPage = document.getElementById('gallery-page');
const aboutPage = document.getElementById('about-page');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

function switchPage(page, sectionId = null) {
    if(window.innerWidth <= 850) {
        navLinks.style.display = 'none';
    }
    landingPage.style.display = 'none';
    galleryPage.style.display = 'none';
    aboutPage.style.display = 'none';

    if(page === 'gallery') {
        galleryPage.style.display = 'block';
        window.scrollTo(0, 0);
    } else if (page === 'about') {
        aboutPage.style.display = 'block';
        window.scrollTo(0, 0);
    } else {
        landingPage.style.display = 'block';
        if(sectionId) {
            const section = document.getElementById(sectionId);
            if(section) {
                setTimeout(() => section.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }
    refreshAnimations();
}

// 2. SLIDER
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}
setInterval(nextSlide, 5000);

// 3. ANIMATION OBSERVER
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

function refreshAnimations() {
    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));
}
refreshAnimations();

// 4. MOBILE MENU
menuToggle.addEventListener('click', () => {
    if(navLinks.style.display === 'flex'){
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '90px'; 
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(255, 255, 255, 0.95)';
        navLinks.style.backdropFilter = 'blur(20px)';
        navLinks.style.padding = '20px';
        navLinks.style.borderRadius = '20px';
        navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        navLinks.style.textAlign = 'center';
    }
});

// 5. FAQ LOGIC
const faqs = document.querySelectorAll('.faq-question');
faqs.forEach(faq => {
    faq.addEventListener('click', () => {
        const item = faq.parentElement;
        const answer = item.querySelector('.faq-answer');
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = "0";
        }
    });
});

// 6. LIVE COUNTDOWN 
const deadline = new Date(Date.now() + 24 * 60 * 60 * 1000).getTime();

function updateTimer() {
    const now = new Date().getTime();
    const t = deadline - now;

    if (t >= 0) {
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((t % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
    }
}
setInterval(updateTimer, 1000);

// 7. SHARE FUNCTION
function shareCourse() {
    const shareData = {
        title: 'Master Your Life Course',
        text: 'Join the Master Your Life course by Scale Up With RD! Huge discount available now.',
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log('Shared successfully'))
            .catch((err) => console.log('Error sharing', err));
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    }
}