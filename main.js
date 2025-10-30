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
     * ANIMATION TITRE "NOTRE ANCRAGE À NANTERRE" - VERSION SIMPLIFIÉE
     * Animation simple et fonctionnelle avec GSAP
     */
    function initTitleScrollAnimation() {
        console.log('Animation Titre: Initialisation...');

        if (typeof gsap === 'undefined' || typeof SplitText === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.error('GSAP ou plugins non chargés');
            return;
        }

        gsap.registerPlugin(SplitText, ScrollTrigger);

        // Sélectionner le titre
        const titleElement = document.querySelector('.about-title-container h1');

        if (!titleElement) {
            console.error('Titre non trouvé');
            return;
        }

        console.log('Animation Titre: Element trouvé:', titleElement);

        // Fonction protectedSplit pour protéger le span rouge
        function protectedSplit(target, vars) {
            let protected = gsap.utils.toArray(vars.protect || "").map(el => {
                return {
                    el: el,
                    innerHTML: el.innerHTML
                }
            });
            let split = new SplitText(target, vars);
            protected.forEach(data => {
                let appendTo;
                gsap.utils.toArray(data.el.children).forEach((word, i) => {
                    let index = split.words.indexOf(word);
                    if (index >= 0) {
                        split.words.splice(index, 1);
                        if (index > 0 && !appendTo) {
                            appendTo = split.words[index - 1];
                        }
                    }
                });
                data.el.innerHTML = data.innerHTML;
                if (appendTo) {
                    appendTo.appendChild(data.el)
                }
            });
            return split;
        }

        // Diviser manuellement le texte en mots pour contrôler chaque mot
        const originalText = titleElement.textContent;
        const words = originalText.split(/\s+/); // Diviser par espaces

        console.log('Animation Titre: Mots détectés:', words);

        // Créer manuellement la structure .line pour empiler les mots
        const lineDiv = document.createElement('div');
        lineDiv.className = 'line';

        // Créer une boîte pour chaque mot
        words.forEach((word, index) => {
            // Si c'est "à", créer une ligne avec "à" et "Nanterre" côte à côte
            if (word === 'à') {
                const wordRow = document.createElement('div');
                wordRow.className = 'word-row';

                // Boîte pour "à"
                const aSpan = document.createElement('span');
                aSpan.className = 'word';
                aSpan.textContent = word;
                wordRow.appendChild(aSpan);

                // Boîte pour "Nanterre"
                const nanterreSpan = document.createElement('span');
                nanterreSpan.className = 'word nanterre-red';
                nanterreSpan.textContent = 'Nanterre';
                wordRow.appendChild(nanterreSpan);

                lineDiv.appendChild(wordRow);
            } else if (word !== 'Nanterre') {
                // Créer une boîte normale pour les autres mots
                const wordSpan = document.createElement('span');
                wordSpan.className = 'word';
                wordSpan.textContent = word;
                lineDiv.appendChild(wordSpan);
            }
            // Ignorer "Nanterre" car il est déjà ajouté avec "à"
        });

        // Remplacer le contenu du h1 par la div .line
        titleElement.innerHTML = '';
        titleElement.appendChild(lineDiv);

        // Récupérer tous les éléments .word pour l'animation
        const wordElements = lineDiv.querySelectorAll('.word');

        // Rendre le titre visible
        gsap.set(titleElement, { opacity: 1 });

        // Animation avec ScrollTrigger - se déclenche au scroll
        gsap.from(wordElements, {
            y: -100,
            opacity: 0,
            rotation: "random(-80, 80)",
            stagger: 0.07,
            duration: 1,
            ease: "back",
            scrollTrigger: {
                trigger: titleElement,
                start: "top 60%",
                toggleActions: "play none none none"
            }
        });

        // === ANIMATION DU SOUS-TITRE (TYPEWRITER COMME HERO) ===
        const aboutSubtitle = document.querySelector('.about-subtitle');

        if (aboutSubtitle) {
            const originalText = aboutSubtitle.textContent;

            // Vider le texte initialement avec contrôle du positionnement
            gsap.set(aboutSubtitle, {
                text: "",
                transformOrigin: "left center" // Point d'origine des transformations
            });

            // Animation d'écriture lettre par lettre (identique à la hero)
            gsap.to(aboutSubtitle, {
                text: originalText,
                duration: 1.2, // Réduit de 2 à 1.2 secondes pour une animation plus rapide
                ease: "none",
                scrollTrigger: {
                    trigger: aboutSubtitle,
                    start: "top 70%",
                    toggleActions: "play none none none"
                }
            });
        }
    }

    // Initialiser l'animation du titre
    initTitleScrollAnimation();

    /**
     * ANIMATION SPLITTEXT POUR NOUVELLE HERO SECTION
     * Animation de mots qui tombent
     */
    function initNewHeroSplitText() {
        if (typeof gsap === 'undefined' || typeof SplitText === 'undefined') {
            console.error('GSAP ou SplitText non chargé');
            return;
        }

        gsap.registerPlugin(SplitText);

        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) {
            console.error('Element .hero-title non trouvé');
            return;
        }

        console.log('Animation SplitText nouvelle hero initialisée');

        // Animation des mots avec SplitText
        const dataText = document.querySelectorAll(".hero-title .line .text");
        if (dataText.length === 0) {
            console.error('Aucun élément .text trouvé');
            return;
        }

        let linesDataText = new SplitText(dataText, { type: "words" });

        // Ne pas appliquer de styles inline pour respecter le CSS
        linesDataText.words.forEach(word => {
            // Supprimer tous les styles inline que SplitText pourrait avoir ajoutés
            word.style.removeProperty('font-size');
            word.style.removeProperty('line-height');
            word.style.removeProperty('font-weight');
            word.style.removeProperty('text-transform');
            word.style.removeProperty('letter-spacing');
        });

        // Animation des mots qui tombent
        gsap.from(linesDataText.words, {
            duration: 1.5,
            yPercent: 105,
            ease: "power4",
            stagger: 0.04,
            delay: 0.3
        });

        console.log('Animation SplitText nouvelle hero lancée avec', linesDataText.words.length, 'mots');
    }

    // Initialiser l'animation de la nouvelle hero section
    initNewHeroSplitText();


    /**
     * TEXT COLOR REVEAL ON SCROLL POUR LE TITRE WPC
     * Effet de peinture progressive de bleu au scroll
     */
    function initWpcTitleColorReveal() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.error('GSAP ou ScrollTrigger non chargé');
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const titleElement = document.querySelector('.cmp-wpc-title');
        if (!titleElement) {
            console.error('Titre WPC non trouvé');
            return;
        }

        // Animer chaque ligne une par une avec des triggers différents
        const lines = titleElement.querySelectorAll('.wpc-line');

        lines.forEach((line, index) => {
            // Créer l'effet de peinture progressive pour chaque ligne avec des triggers décalés
            gsap.fromTo(line,
                {
                    "--reveal-width": "0%" // Commence avec 0% de largeur
                },
                {
                    "--reveal-width": "100%", // Se révèle complètement
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: titleElement,
                        start: `top ${50 - (index * 10)}%`, // Décalage progressif du start - commence plus tard
                        end: `bottom ${10 - (index * 3)}%`, // Décalage progressif du end
                        scrub: 1,
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        console.log('Effet Text Color Reveal on Scroll initialisé pour le titre WPC');
    }

    // Initialiser l'effet de révélation de couleur
    initWpcTitleColorReveal();

    /**
     * ANIMATION DU SOUS-TITRE DE LA SECTION EXPERTISE
     * Effet d'apparition au scroll inspiré de l'exemple (sans bouton ni changement de texte)
     */
    function initExpertiseSubtitleAnimation() {
        if (typeof gsap === 'undefined' || typeof SplitText === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.error('GSAP ou plugins non chargés (expertise subtitle)');
            return;
        }

        gsap.registerPlugin(SplitText, ScrollTrigger);

        const subtitle = document.querySelector('.cmp-expertise-subtitle');
        if (!subtitle) {
            return;
        }

        // Animation simple par mots pour éviter toute coupure anormale
        const split = new SplitText(subtitle, { type: 'words' });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: subtitle,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        tl.from(split.words, {
            duration: 0.5,
            opacity: 0,
            y: 40,
            ease: 'power3.out',
            stagger: 0.03
        });
    }

    // Initialiser l'animation du sous-titre expertise
    initExpertiseSubtitleAnimation();


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

    // Initialize navigation functions directly since nav is now in HTML
    setActiveNavLink();
    initializeMobileMenu();


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


// Scroll Animation pour les lettres
function initScrollAnimation() {
    const scrollElements = document.querySelectorAll('.scroll-animation');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animation--in-viewport');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    scrollElements.forEach(element => {
        observer.observe(element);
    });

    console.log('Scroll animation initialisée');
}

// Effet de baisse d'exposition sur l'image hero au scroll
function initHeroExposureEffect() {
    const heroSection = document.querySelector('.hero-minimal');
    if (!heroSection) return;

    function updateExposure() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const heroHeight = heroSection.offsetHeight;

        // Calculer la progression du scroll dans la section hero (0 à 1)
        // L'effet commence dès le début du scroll
        const scrollProgress = Math.min(scrollTop / heroHeight, 1);

        // Ajuster l'opacité de l'overlay (0 = pas d'overlay, 1 = complètement sombre)
        // Augmenter progressivement jusqu'à 1.0 (100% de darkening maximum)
        const opacity = scrollProgress * 1.0;

        heroSection.style.setProperty('--hero-overlay-opacity', opacity);
    }

    // Mettre à jour au scroll
    window.addEventListener('scroll', updateExposure, { passive: true });

    // Mettre à jour au chargement
    updateExposure();
}

// Initialiser les animations au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    initScrollAnimation();
    // Effet exposure désactivé
});


// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WPCUtils, WPCClasses };
}