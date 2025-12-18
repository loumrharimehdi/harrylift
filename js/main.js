/**
 * Harry Lift - Summer Body Edition
 * 🌴🏖️ Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
    // ============ NAVBAR SCROLL EFFECT ============
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Initial check

    // ============ MOBILE MENU TOGGLE ============
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    function toggleMenu() {
        navbarMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = navbarMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        navbarMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    navbarToggle.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking on a link
    const navLinks = navbarMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // ============ FAQ ACCORDION ============
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function () {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // ============ COUNTDOWN TIMER ============
    const countdownElement = document.getElementById('countdown');

    // Set countdown end time (48 hours from now or stored in localStorage)
    let endTime = localStorage.getItem('harrylift_countdown_end');

    if (!endTime) {
        endTime = new Date().getTime() + (48 * 60 * 60 * 1000); // 48 hours
        localStorage.setItem('harrylift_countdown_end', endTime);
    } else {
        endTime = parseInt(endTime);
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            // Reset countdown
            endTime = new Date().getTime() + (48 * 60 * 60 * 1000);
            localStorage.setItem('harrylift_countdown_end', endTime);
            return;
        }

        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.textContent =
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ============ SCROLL REVEAL ANIMATION ============
    const revealElements = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============ PARALLAX EFFECT FOR HERO EMOJIS ============
    const heroEmojis = document.querySelectorAll('.hero-emoji');

    function handleParallax() {
        const scrollY = window.scrollY;

        heroEmojis.forEach((emoji, index) => {
            const speed = 0.1 + (index * 0.02);
            const yPos = scrollY * speed;
            emoji.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Only enable parallax on desktop
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', handleParallax);
    }

    // ============ PRICING CARD HOVER EFFECT ============
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            pricingCards.forEach(c => {
                if (c !== card && !c.classList.contains('popular')) {
                    c.style.opacity = '0.7';
                }
            });
        });

        card.addEventListener('mouseleave', function () {
            pricingCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });

    // ============ LAZY LOADING FOR IMAGES ============
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('img-loading');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============ STATS COUNTER ANIMATION ============
    const statNumbers = document.querySelectorAll('.about-stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;

        const statsSection = document.querySelector('.about-stats');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();

        if (rect.top < window.innerHeight - 100) {
            statsAnimated = true;

            statNumbers.forEach(stat => {
                const target = stat.textContent;
                const isPercentage = target.includes('%');
                const isPlus = target.includes('+');
                const numericValue = parseInt(target.replace(/[^0-9]/g, ''));

                let current = 0;
                const increment = numericValue / 50;
                const duration = 1500;
                const stepTime = duration / 50;

                const counter = setInterval(() => {
                    current += increment;

                    if (current >= numericValue) {
                        current = numericValue;
                        clearInterval(counter);
                    }

                    let displayValue = Math.floor(current);
                    if (isPlus) displayValue = displayValue + '+';
                    if (isPercentage) displayValue = displayValue + '%';

                    stat.textContent = displayValue;
                }, stepTime);
            });
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats(); // Initial check

    // ============ BUTTON RIPPLE EFFECT ============
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        width: 100px;
        height: 100px;
        transform: translate(-50%, -50%) scale(0);
        animation: ripple 0.6s ease-out;
        left: ${x}px;
        top: ${y}px;
      `;

            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple keyframes
    const style = document.createElement('style');
    style.textContent = `
    @keyframes ripple {
      to {
        transform: translate(-50%, -50%) scale(4);
        opacity: 0;
      }
    }
  `;
    document.head.appendChild(style);

    // ============ CONSOLE WELCOME MESSAGE ============
    console.log('%c🌴 Harry Lift - Summer Body Edition 🏖️',
        'font-size: 20px; font-weight: bold; color: #40E0D0;');
    console.log('%cBienvenue sur le site de coaching le plus ensoleillé de Lyon !',
        'font-size: 14px; color: #FFB347;');
    console.log('%cDéveloppé avec ☀️ par Loumrhari Agency',
        'font-size: 12px; color: #87CEEB;');
});
