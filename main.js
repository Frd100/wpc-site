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
        gsap.to(splitTitle.words, {
            y: "0%",
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: heroSection,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            }
        });

        // Animation de masque pour le sous-titre
        const subtitle = document.querySelector('.cmp-hero-fbv__subtitle');
        if (subtitle) {
            const splitSubtitle = new SplitText(subtitle, {
                type: "words,lines",
                wordsClass: "word",
                linesClass: "line"
            });

            // Masquer les lignes du sous-titre
            gsap.set(splitSubtitle.lines, {
                overflow: "hidden"
            });

            gsap.set(splitSubtitle.words, {
                y: "100%"
            });

            // Animation de révélation du sous-titre
            gsap.to(splitSubtitle.words, {
                y: "0%",
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
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
        fetch('nav.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
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
 * MOBILE MENU MANAGEMENT
 * Cette fonction est maintenant appelée après le chargement de la nav
 */
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;

    // Vérification que les éléments existent avant de continuer
    if (!mobileToggle || !mobileMenu) return;

    // Initialiser la position du menu (caché à gauche)
    mobileMenu.style.transform = 'translateX(-100%)';

    /**
     * Toggle du menu mobile
     * Gère l'ouverture/fermeture et l'animation du bouton hamburger
     */
    mobileToggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const isOpen = mobileMenu.classList.contains('active');

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Fermer au clic sur un lien
    const menuLinks = mobileMenu.querySelectorAll('.main-navigation__link');
    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Ne ferme pas immédiatement pour laisser le temps à la navigation de se faire
        });
    });

    // Fermer au clic sur le bouton de fermeture (pseudo-élément)
    mobileMenu.addEventListener('click', function (e) {
        // Vérifier si le clic est dans la zone du bouton de fermeture (haut gauche)
        const rect = mobileMenu.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        // Zone du bouton de fermeture (haut gauche, 60px x 60px)
        if (clickX <= 60 && clickY <= 60) {
            closeMenu();
        }
    });

    // Fermer au clic extérieur
    document.addEventListener('click', function (e) {
        if (mobileMenu.classList.contains('active') &&
            !mobileToggle.contains(e.target) &&
            !mobileMenu.contains(e.target)) {
            closeMenu();
        }
    });

    // Fermer avec Échap
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Fermer lors du redimensionnement vers desktop
    window.addEventListener('resize', WPCUtils.debounce(function () {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    }, 200));

    function openMenu() {
        mobileMenu.classList.add('active');
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        mobileToggle.setAttribute('aria-label', 'Fermer le menu de navigation');

        // Ajouter classe au body pour cacher le bouton toggle
        body.classList.add('mobile-menu-open');

        // Empêcher le scroll du body
        const scrollY = window.scrollY;
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.width = '100%';
        body.dataset.scrollY = scrollY;

        // Animation GSAP : glissement simple depuis la gauche
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(mobileMenu, 
                { x: "-100%" },
                { x: 0, duration: 0.3, ease: "power2.out" }
            );
        } else {
            // Fallback CSS si GSAP pas disponible
            mobileMenu.style.transform = 'translateX(0)';
        }
    }

    function closeMenu() {
        const scrollY = body.dataset.scrollY || '0';

        // Animation GSAP : glissement simple vers la gauche
        if (typeof gsap !== 'undefined') {
            gsap.to(mobileMenu, {
                x: "-100%",
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    mobileMenu.classList.remove('active');
                }
            });
        } else {
            // Fallback CSS si GSAP pas disponible
            mobileMenu.style.transform = 'translateX(-100%)';
            setTimeout(() => {
                mobileMenu.classList.remove('active');
            }, 300);
        }

        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');

        // Retirer classe du body pour réafficher le bouton toggle
        body.classList.remove('mobile-menu-open');

        // Restaurer le scroll
        body.style.overflow = '';
        body.style.position = '';
        body.style.top = '';
        body.style.width = '';

        // Restaurer la position de scroll
        window.scrollTo(0, parseInt(scrollY));
    }
}


// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WPCUtils, WPCClasses };
}
