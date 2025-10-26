/**
 * WPC Site JavaScript
 * Main script for West Paris Consulting website
 * 
 * Features:
 * - Smooth scrolling for anchor links
 * - Contact form feedback
 * - Mobile menu management
 * - Utility functions for performance optimization
 */

document.addEventListener('DOMContentLoaded', function () {

    /**
     * ANIMATION TITRE "NOTRE ANCRAGE À NANTERRE" AVEC GSAP PREPARETEXT
     * Animation professionnelle avec GSAP sur mobile uniquement
     */
    function initTitleScrollAnimation() {
        // Vérifier si on est sur mobile
        if (window.innerWidth > 768) {
            console.log('Animation Nanterre: Desktop détecté, animation désactivée');
            return;
        }

        console.log('Animation Nanterre: Mobile détecté, initialisation...');

        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.error('GSAP ou ScrollTrigger non chargé');
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        // === NOUVELLE ANIMATION DU TITRE (SANS SPLITTEXT) ===
        const titleContainer = document.querySelector('.about-title-container');
        const titleElement = document.querySelector('.about-title-container .split');

        console.log('Animation Titre: Conteneur trouvé:', titleContainer);
        console.log('Animation Titre: Element trouvé:', titleElement);

        if (titleContainer && titleElement) {
            // Diviser le titre en lettres individuelles
            const originalText = titleElement.textContent;
            const letters = originalText.split('');
            titleElement.textContent = '';

            // Créer un span pour chaque lettre
            letters.forEach(letter => {
                const span = document.createElement('span');
                span.textContent = letter === ' ' ? '\u00A0' : letter; // Espace insécable
                span.style.display = 'inline-block';
                span.style.transform = 'translateY(100%)';
                span.style.opacity = '0';
                titleElement.appendChild(span);
            });

            // Animation de glissement des lettres vers le haut
            console.log('Animation Titre: Configuration de l\'animation...');
            gsap.to('.about-title-container .split span', {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.05,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: titleContainer,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none',
                    onStart: () => console.log('Animation Titre: Animation déclenchée!'),
                    onComplete: () => console.log('Animation Titre: Animation terminée!')
                }
            });
        }

        // === ANIMATION DU SOUS-TITRE (INDÉPENDANTE) ===
        const subtitleContainer = document.querySelector('.about-subtitle-container');
        const aboutSubtitle = document.querySelector('.about-subtitle');

        console.log('Animation Sous-titre: Conteneur trouvé:', subtitleContainer);
        console.log('Animation Sous-titre: Element trouvé:', aboutSubtitle);

        if (subtitleContainer && aboutSubtitle) {
            const originalAboutText = aboutSubtitle.textContent;

            // Vider le texte initialement
            aboutSubtitle.textContent = "";

            // Animation d'écriture lettre par lettre avec contrôle CSS
            let currentText = "";
            let index = 0;

            const typeWriter = () => {
                if (index < originalAboutText.length) {
                    currentText += originalAboutText[index];
                    aboutSubtitle.textContent = currentText;
                    index++;
                    setTimeout(typeWriter, 50); // Vitesse d'écriture
                }
            };

            // Déclencher l'animation avec ScrollTrigger INDÉPENDANT
            gsap.fromTo(aboutSubtitle, {
                opacity: 0,
                x: 0
            }, {
                opacity: 1,
                x: 0,
                duration: 0.1,
                onStart: typeWriter,
                scrollTrigger: {
                    trigger: subtitleContainer, // Trigger spécifique au sous-titre
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none",
                    onStart: () => console.log('Animation Sous-titre: Animation déclenchée!'),
                    onComplete: () => console.log('Animation Sous-titre: Animation terminée!')
                }
            });
        }

    }

    // Initialiser l'animation du titre
    initTitleScrollAnimation();

    /**
     * EFFET SPLIT POUR HERO SECTION
     * Animation de texte avec GSAP SplitText et masquage des lignes
     */
    function initHeroSplitText() {
        if (typeof gsap === 'undefined' || typeof SplitText === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.error('GSAP ou plugins non chargés');
            return;
        }

        gsap.registerPlugin(SplitText, ScrollTrigger);

        const heroSection = document.querySelector('.cmp-hero-fbv');
        const splitElement = document.querySelector('.cmp-hero-fbv .split');

        if (!heroSection || !splitElement) {
            return;
        }

        // Animation d'écriture pour le titre ligne par ligne
        const line1 = splitElement.querySelector('.line1');
        const line2 = splitElement.querySelector('.line2');

        if (line1 && line2) {
            const originalLine1 = line1.textContent;
            const originalLine2 = line2.textContent;

            // Vider les lignes initialement
            gsap.set(line1, { text: "" });
            gsap.set(line2, { text: "" });

            // Animation de la première ligne
            gsap.to(line1, {
                text: originalLine1,
                duration: 0.7,
                ease: "none",
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none"
                }
            });

            // Animation de la deuxième ligne avec délai
            gsap.to(line2, {
                text: originalLine2,
                duration: 0.7,
                ease: "none",
                delay: 0.7,
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none"
                }
            });
        }

        // Animation d'écriture pour le sous-titre
        const subtitle = document.querySelector('.cmp-hero-fbv__subtitle');
        if (subtitle) {
            const originalText = subtitle.textContent;

            // Vider le texte initialement
            gsap.set(subtitle, {
                text: ""
            });

            // Animation d'écriture lettre par lettre
            gsap.to(subtitle, {
                text: originalText,
                duration: 2,
                ease: "none",
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none"
                }
            });
        }

    }

    // Initialiser l'effet SplitText pour la hero section
    initHeroSplitText();

    /**
     * PARALLAX EFFECT FOR BUBBLE IMAGE
     * Effet de parallaxe subtil pour l'image bubble dans le conteneur
     * L'image reste dans le conteneur mais bouge légèrement pendant le scroll
     */
    const bubbleImage = document.querySelector('.cmp-hero-fbv__image');
    const heroSection = document.querySelector('.cmp-hero-fbv');

    if (bubbleImage && heroSection) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const heroRect = heroSection.getBoundingClientRect();

            // Effet de parallaxe seulement si la section est visible
            if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
                const rate = scrolled * 0.3; // Vitesse de parallaxe plus lente
                bubbleImage.style.transform = `translateX(-50%) translateY(${rate}px)`;
            }
        });
    }

    /**
     * SMOOTH SCROLLING
     * Gère le défilement fluide vers les ancres (#section)
     * Améliore l'expérience utilisateur lors de la navigation interne
     */
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Ignore les liens "#" seuls
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                // Défilement fluide vers la cible
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    /**
     * CENTRALIZED NAVIGATION LOADER
     * Fetches nav.html and injects it into the placeholder.
     * This ensures the navigation is consistent across all pages.
     */
    function loadNav() {
        // Check if navigation is already cached
        if (window.navCache) {
            const navPlaceholder = document.getElementById('nav-placeholder');
            if (navPlaceholder) {
                navPlaceholder.innerHTML = window.navCache;
                setActiveNavLink();
                initializeMobileMenu();
            }
            return;
        }

        fetch('nav.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // Cache the navigation HTML
                window.navCache = data;

                const navPlaceholder = document.getElementById('nav-placeholder');
                if (navPlaceholder) {
                    navPlaceholder.innerHTML = data;
                    setActiveNavLink();
                    initializeMobileMenu(); // Re-initialize menu logic
                }
            })
            .catch(error => {
                console.error('Error loading navigation:', error);
                // Optionally, display an error message to the user
            });
    }

    /**
     * Sets the 'active' class on the current page's navigation link.
     */
    function setActiveNavLink() {
        // Correctly handle root path for index.html
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.main-navigation__link');

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // Load the navigation as soon as the DOM is ready
    loadNav();


});

/**
 * WPC UTILITY FUNCTIONS
 * Collection de fonctions utilitaires pour optimiser les performances
 * et améliorer l'expérience utilisateur
 */
const WPCUtils = {
    /**
     * DEBOUNCE
     * Limite l'exécution d'une fonction en attendant la fin d'une série d'appels
     * Utile pour les champs de recherche, les redimensionnements de fenêtre, etc.
     * 
     * @param {Function} func - La fonction à débouncer
     * @param {Number} wait - Délai d'attente en millisecondes
     * @param {Boolean} immediate - Si true, exécute immédiatement
     * @returns {Function} Fonction débouncée
     */
    debounce: function (func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },

    /**
     * THROTTLE
     * Limite le nombre d'exécutions d'une fonction dans un intervalle de temps
     * Idéal pour les événements de scroll, resize, etc.
     * 
     * @param {Function} func - La fonction à throttler
     * @param {Number} limit - Intervalle minimum entre deux exécutions (ms)
     * @returns {Function} Fonction throttlée
     */
    throttle: function (func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport: function (element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Get element offset
    getOffset: function (element) {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX
        };
    }
};

// WPC CSS Classes for JavaScript
const WPCClasses = {
    mobileMenuOpen: 'mobile-menu-open',
    headerScrolled: 'header--scrolled',
    headerHidden: 'header--hidden',
    languageSelectorOpen: 'language-selector--open',
    searchFormOpen: 'search-form--open',
    animateIn: 'animate-in',
    lazy: 'lazy'
};

/**
 * MOBILE MENU MANAGEMENT WITH GSAP ANIMATION
 * Cette fonction est maintenant appelée après le chargement de la nav
 */
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;
    const hamburgerLines = document.querySelectorAll('.hamburger-line');

    // Vérification que les éléments existent avant de continuer
    if (!mobileToggle || !mobileMenu || hamburgerLines.length === 0) return;

    let isMenuOpen = false;

    // Variables pour les animations GSAP Slide Reveal
    let menuTimeline = null;
    let buttonTimeline = null;

    /**
     * Initialisation des animations GSAP Slide Reveal
     */
    function initSlideRevealAnimations() {
        if (menuTimeline && buttonTimeline) return; // Déjà initialisées

        const menuLinks = mobileMenu.querySelectorAll('.main-navigation__link');

        // Définir l'état initial du menu
        gsap.set(mobileMenu, { x: "-100%", opacity: 0 });
        gsap.set(menuLinks, { x: -50, opacity: 0 });

        // Timeline du menu avec Slide Reveal
        menuTimeline = gsap.timeline({ paused: true });

        // Animation du conteneur du menu (slide depuis la gauche)
        menuTimeline.fromTo(mobileMenu, {
            x: "-100%",
            opacity: 0
        }, {
            x: "0%",
            opacity: 1,
            duration: 0.5,
            ease: "power3.out"
        }, 0);

        // Animation des liens du menu (révélation progressive)
        menuTimeline.fromTo(menuLinks, {
            x: -50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out"
        }, 0.2);

        // Timeline du bouton hamburger
        buttonTimeline = gsap.timeline({ paused: true });

        // Animation des lignes pour former un X
        buttonTimeline.to(hamburgerLines[0], {
            rotation: 45,
            y: 8.5,
            duration: 0.15,
            ease: "power2.out"
        }, 0);

        buttonTimeline.to(hamburgerLines[1], {
            opacity: 0,
            duration: 0.1,
            ease: "power2.out"
        }, 0);

        buttonTimeline.to(hamburgerLines[2], {
            rotation: -45,
            y: -8.5,
            duration: 0.15,
            ease: "power2.out"
        }, 0);
    }

    /**
     * Contrôle de l'animation du bouton Slide Reveal
     */
    function toggleButtonAnimation() {
        initSlideRevealAnimations();

        if (isMenuOpen) {
            buttonTimeline.play(); // Hamburger → X
        } else {
            buttonTimeline.reverse(); // X → Hamburger
        }
    }

    /**
     * Contrôle de l'animation du menu Slide Reveal
     */
    function toggleMenuAnimation() {
        initSlideRevealAnimations();

        if (isMenuOpen) {
            menuTimeline.play(); // Ouverture
        } else {
            menuTimeline.reverse(); // Fermeture
        }
    }

    /**
     * Toggle du menu mobile avec animation GSAP
     */
    mobileToggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Fermer au clic sur un lien
    const menuLinksElements = mobileMenu.querySelectorAll('.main-navigation__link');
    menuLinksElements.forEach(link => {
        link.addEventListener('click', function () {
            // Ne ferme pas immédiatement pour laisser le temps à la navigation de se faire
        });
    });

    // Fermer au clic extérieur
    document.addEventListener('click', function (e) {
        if (mobileMenu.classList.contains('active') &&
            !mobileToggle.contains(e.target) &&
            !mobileMenu.contains(e.target)) {
            toggleMenu();
        }
    });

    // Fermer avec Échap
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Fermer lors du redimensionnement vers desktop
    window.addEventListener('resize', WPCUtils.debounce(function () {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    }, 200));

    function toggleMenu() {
        // Basculer l'état
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            // Ouvrir le menu
            mobileMenu.classList.add('active');
            mobileToggle.classList.add('active');
            mobileToggle.setAttribute('aria-expanded', 'true');
            mobileToggle.setAttribute('aria-label', 'Fermer le menu de navigation');

            // Empêcher le scroll du body
            const scrollY = window.scrollY;
            body.style.overflow = 'hidden';
            body.style.position = 'fixed';
            body.style.top = `-${scrollY}px`;
            body.style.width = '100%';
            body.dataset.scrollY = scrollY;
        } else {
            // Fermer le menu
            mobileMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');

            // Restaurer le scroll
            const scrollY = body.dataset.scrollY || '0';
            body.style.overflow = '';
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
            window.scrollTo(0, parseInt(scrollY));
        }

        // Lancer les animations réversibles
        toggleButtonAnimation();
        toggleMenuAnimation();
    }
}


// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WPCUtils, WPCClasses };
}
