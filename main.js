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

        if (typeof gsap === 'undefined' || typeof SplitText === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.error('GSAP ou plugins non chargés');
            return;
        }

        gsap.registerPlugin(SplitText, ScrollTrigger);

        const aboutSection = document.querySelector('.cmp-about-section');
        const splitElement = document.querySelector('.cmp-about-section .split');

        console.log('Animation Nanterre: Section trouvée:', aboutSection);
        console.log('Animation Nanterre: Split element trouvé:', splitElement);

        if (!aboutSection || !splitElement) {
            console.log('Animation Nanterre: Éléments non trouvés, arrêt');
            return;
        }

        // SplitText pour séparer les mots et lignes avec masquage
        const splitTitle = new SplitText(splitElement, {
            type: "words,lines",
            wordsClass: "word",
            linesClass: "line"
        });

        // Masquer les lignes initialement
        gsap.set(splitTitle.lines, {
            overflow: "hidden"
        });

        gsap.set(splitTitle.words, {
            y: "100%"
        });

        // Animation de révélation avec masquage des lignes pour le titre
        console.log('Animation Nanterre: Configuration de l\'animation...');
        gsap.to(splitTitle.words, {
            y: "0%",
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: aboutSection,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none none",
                onStart: () => console.log('Animation Nanterre: Animation déclenchée!'),
                onComplete: () => console.log('Animation Nanterre: Animation terminée!')
            }
        });

        // Animation de masquage pour les paragraphes
        const paragraphs = document.querySelectorAll('.cmp-about-section .about-paragraph');
        if (paragraphs.length > 0) {
            console.log('Animation Nanterre: Paragraphes trouvés:', paragraphs.length);

            // SplitText pour chaque paragraphe
            paragraphs.forEach((paragraph, index) => {
                const splitParagraph = new SplitText(paragraph, {
                    type: "words,lines",
                    wordsClass: "word",
                    linesClass: "line"
                });

                // Masquer les lignes initialement
                gsap.set(splitParagraph.lines, {
                    overflow: "hidden"
                });

                gsap.set(splitParagraph.words, {
                    y: "100%"
                });

                // Animation de révélation avec délai pour chaque paragraphe
                gsap.to(splitParagraph.words, {
                    y: "0%",
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 0.5 + (index * 0.3), // Délai progressif
                    scrollTrigger: {
                        trigger: aboutSection,
                        start: "top 70%",
                        end: "bottom 30%",
                        toggleActions: "play none none none"
                    }
                });
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

    // Variables pour les animations GSAP réversibles
    let menuTimeline = null;
    let buttonTimeline = null;

    /**
     * Initialisation de la timeline du menu (réversible)
     */
    function initMenuTimeline() {
        if (menuTimeline) return; // Déjà initialisée

        const menuLinks = mobileMenu.querySelectorAll('.main-navigation__link');

        menuTimeline = gsap.timeline({ paused: true });

        // Animation du conteneur du menu (slide depuis la gauche)
        menuTimeline.fromTo(mobileMenu, {
            x: "-100%",
            opacity: 0
        }, {
            x: "0%",
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
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
    }

    /**
     * Initialisation de la timeline du bouton (réversible)
     */
    function initButtonTimeline() {
        if (buttonTimeline) return; // Déjà initialisée

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
     * Contrôle de l'animation du bouton (play/reverse)
     */
    function toggleButtonAnimation() {
        initButtonTimeline();
        
        if (isMenuOpen) {
            buttonTimeline.play(); // Hamburger → X
        } else {
            buttonTimeline.reverse(); // X → Hamburger
        }
    }

    /**
     * Contrôle de l'animation du menu (play/reverse)
     */
    function toggleMenuAnimation() {
        initMenuTimeline();
        
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
    const menuLinks = mobileMenu.querySelectorAll('.main-navigation__link');
    menuLinks.forEach(link => {
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
