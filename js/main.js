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

    // ============ THEME TOGGLE (SUN/RAIN MODE) ============
    const themeToggle = document.getElementById('themeToggle');
    const rainContainer = document.getElementById('rainContainer');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('harrylift_theme');
    if (savedTheme === 'rain') {
        document.body.classList.add('rain-mode');
        createRainDrops();
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            document.body.classList.toggle('rain-mode');

            if (document.body.classList.contains('rain-mode')) {
                localStorage.setItem('harrylift_theme', 'rain');
                createRainDrops();
                // Play thunder sound effect (optional)
                console.log('%c⚡ BOOOM! Il pleut à Lyon...', 'font-size: 16px; color: #74b9ff;');
            } else {
                localStorage.setItem('harrylift_theme', 'sun');
                clearRainDrops();
                console.log('%c☀️ Le soleil des Antilles est de retour !', 'font-size: 16px; color: #FFB347;');
            }
        });
    }

    // Create rain drops
    function createRainDrops() {
        if (!rainContainer) return;

        // Clear existing drops
        rainContainer.innerHTML = '';

        const dropCount = window.innerWidth < 768 ? 50 : 100;

        for (let i = 0; i < dropCount; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain-drop';

            // Random position
            drop.style.left = Math.random() * 100 + '%';

            // Random height
            drop.style.height = (Math.random() * 20 + 10) + 'px';

            // Random animation duration
            drop.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';

            // Random delay
            drop.style.animationDelay = (Math.random() * 2) + 's';

            rainContainer.appendChild(drop);
        }
    }

    // Clear rain drops
    function clearRainDrops() {
        if (rainContainer) {
            rainContainer.innerHTML = '';
        }
    }

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

    // ============ SAND CLICK EFFECT ============
    const sandContainer = document.getElementById('sandEffectContainer');

    function createSandEffect(x, y) {
        const particleCount = 15 + Math.floor(Math.random() * 10);

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'sand-particle';

            // Random direction and distance
            const angle = (Math.random() * 360) * (Math.PI / 180);
            const distance = 30 + Math.random() * 80;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance + 20; // Add some gravity

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.setProperty('--dx', dx + 'px');
            particle.style.setProperty('--dy', dy + 'px');

            // Random delay for staggered effect
            particle.style.animationDelay = (Math.random() * 0.1) + 's';

            sandContainer.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 1100);
        }
    }

    // Add click event to document
    document.addEventListener('click', function (e) {
        createSandEffect(e.clientX, e.clientY);
    });

    // ============ CHATBOT FUNCTIONALITY ============
    const chatbotWidget = document.getElementById('chatbotWidget');
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const quickBtns = document.querySelectorAll('.chatbot-quick-btn');

    // Toggle chatbot
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            chatbotWidget.classList.toggle('active');
        });
    }

    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function () {
            chatbotWidget.classList.remove('active');
        });
    }

    // Quick action buttons
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const action = this.dataset.action;

            if (action === 'bilan') {
                addUserMessage('Je veux réserver un bilan gratuit');
                setTimeout(() => {
                    addBotMessage('Super choix ! 🌴 Clique sur ce lien pour choisir ton créneau :');
                    setTimeout(() => {
                        addBotMessage('<a href="https://calendly.com/harrylift" target="_blank" style="color: #1E9B8F; text-decoration: underline;">📅 Réserver sur Calendly</a>');
                    }, 500);
                }, 800);
            } else if (action === 'tarifs') {
                addUserMessage('Je veux voir les tarifs');
                setTimeout(() => {
                    addBotMessage('Voici mes formules : 💪 Séance coaching : 60€ | 🎈 Suivi mensuel : 97€/mois | 🌴 Formule complète : 350€/mois');
                    setTimeout(() => {
                        addBotMessage('Le suivi mensuel est le plus populaire ! Tu veux qu\'on en discute ?');
                    }, 500);
                }, 800);
            } else if (action === 'whatsapp') {
                addUserMessage('Je préfère WhatsApp');
                setTimeout(() => {
                    addBotMessage('Pas de souci ! Écris-moi directement : ');
                    setTimeout(() => {
                        addBotMessage('<a href="https://wa.me/33695308817" target="_blank" style="color: #1E9B8F; text-decoration: underline;">📱 Ouvrir WhatsApp</a>');
                    }, 500);
                }, 800);
            }
        });
    });

    // Send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addUserMessage(message);
            chatbotInput.value = '';

            // Auto response
            setTimeout(() => {
                const responses = [
                    'Merci pour ton message ! 🌴 Pour une réponse personnalisée, réserve ton bilan gratuit ou écris-moi sur WhatsApp !',
                    'Je vois que tu es motivé(e) ! 💪 Le meilleur moyen d\'avancer, c\'est de réserver ton bilan gratuit.',
                    'Bonne question ! On pourra en discuter en détail pendant ton bilan gratuit. C\'est sans engagement ☀️'
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addBotMessage(randomResponse);
            }, 1000);
        }
    }

    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }

    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    function addUserMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'chatbot-message user';
        msg.textContent = text;
        chatbotMessages.appendChild(msg);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function addBotMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'chatbot-message bot';
        msg.innerHTML = text;
        chatbotMessages.appendChild(msg);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // ============ TROLL MODALS (LEAD MAGNET & CONTACT FORM) ============
    const leadMagnetForm = document.getElementById('leadMagnetForm');
    const contactForm = document.getElementById('contactForm');
    const trollModal = document.getElementById('trollModal');
    const trollModal2 = document.getElementById('trollModal2');
    const trollModalClose = document.getElementById('trollModalClose');
    const trollModal2Close = document.getElementById('trollModal2Close');
    const trollInsist = document.getElementById('trollInsist');
    const trollGiveUp = document.getElementById('trollGiveUp');
    const trollUserName = document.getElementById('trollUserName');
    const trollFinal = document.getElementById('trollFinal');

    let userName = 'champion';

    // Lead Magnet Form - TROLL
    if (leadMagnetForm) {
        leadMagnetForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameInput = document.getElementById('leadName');
            if (nameInput && nameInput.value) {
                userName = nameInput.value;
                trollUserName.textContent = userName;
            }
            trollModal.classList.add('active');
        });
    }

    // Contact Form - TROLL
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const nameInput = document.getElementById('contactName');
            if (nameInput && nameInput.value) {
                userName = nameInput.value;
                trollUserName.textContent = userName;
            }
            trollModal.classList.add('active');
        });
    }

    // Close modal 1
    if (trollModalClose) {
        trollModalClose.addEventListener('click', function () {
            trollModal.classList.remove('active');
        });
    }

    // Click outside modal to close
    if (trollModal) {
        trollModal.addEventListener('click', function (e) {
            if (e.target === trollModal) {
                trollModal.classList.remove('active');
            }
        });
    }

    // Insist on PDF - show second modal
    if (trollInsist) {
        trollInsist.addEventListener('click', function () {
            trollModal.classList.remove('active');
            setTimeout(() => {
                trollModal2.classList.add('active');
            }, 300);
        });
    }

    // Close modal 2
    if (trollModal2Close) {
        trollModal2Close.addEventListener('click', function () {
            trollModal2.classList.remove('active');
        });
    }

    // Click outside modal 2 to close
    if (trollModal2) {
        trollModal2.addEventListener('click', function (e) {
            if (e.target === trollModal2) {
                trollModal2.classList.remove('active');
            }
        });
    }

    // Give up - show final message
    if (trollGiveUp) {
        trollGiveUp.addEventListener('click', function () {
            trollFinal.style.display = 'block';
            trollGiveUp.textContent = '✅ C\'est noté !';
            trollGiveUp.disabled = true;

            // Log for fun
            console.log('%c📧 ' + userName + ' a vraiment voulu le PDF...', 'font-size: 14px; color: #FF6B6B;');
            console.log('%c💡 Mais on sait tous qu\'un call serait mieux !', 'font-size: 12px; color: #40E0D0;');
        });
    }

    // ============ CONSOLE WELCOME MESSAGE ============
    console.log('%c🌴 Harry Lift - Summer Body Edition 🏖️',
        'font-size: 20px; font-weight: bold; color: #1E9B8F;');
    console.log('%cBienvenue sur le site de coaching le plus ensoleillé de Lyon !',
        'font-size: 14px; color: #FFB347;');
    console.log('%cDéveloppé avec ☀️ par Loumrhari Agency',
        'font-size: 12px; color: #87CEEB;');
});

