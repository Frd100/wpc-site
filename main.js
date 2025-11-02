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

        // Utiliser le même effet que la section expertise: apparition par mots (y + opacity)
        const dataText = document.querySelectorAll('.hero-title .line .text');
        if (dataText.length === 0) return;

        const split = new SplitText(dataText, { type: 'words' });

        gsap.from(split.words, {
            duration: 0.6,
            opacity: 0,
            y: 40,
            ease: 'power3.out',
            stagger: 0.03
        });
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

        const subtitles = document.querySelectorAll('.cmp-expertise-subtitle');
        if (subtitles.length === 0) {
            return;
        }

        subtitles.forEach(subtitle => {
            // Animation simple par mots pour éviter toute coupure anormale
            const split = new SplitText(subtitle, { type: 'words' });

            // Pour le sous-titre de la section cartes, déclencher plus tard
            const isCardsSubtitle = subtitle.classList.contains('wpc-domaines-cards-subtitle');
            const startValue = isCardsSubtitle ? 'top 90%' : 'top 80%';

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: subtitle,
                    start: startValue,
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
        });
    }

    // Initialiser l'animation du sous-titre expertise
    initExpertiseSubtitleAnimation();

    /**
     * ANIMATION D'APPARITION POUR LE TEXTE INTRO ÉQUIPE
     * Animation slide-up simple avec fade-in pour le texte "Découvrez les membres..."
     */
    function initEquipeIntroTextAnimation() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP ou plugins non chargés - animation texte intro équipe ignorée');
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const introTexts = document.querySelectorAll('.cmp-equipe-intro-text, .nous-rejoindre-intro-text');
        if (introTexts.length === 0) {
            return;
        }

        introTexts.forEach(introText => {
            gsap.from(introText, {
                opacity: 0,
                x: 60,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: introText,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }

    initEquipeIntroTextAnimation();


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
    initStrokeButtons();
});


// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WPCUtils, WPCClasses };
}

// Stroke Button Flair animation (hover ripple)
function initStrokeButtons() {
    if (typeof gsap === 'undefined') return;

    class Button {
        constructor(buttonElement) {
            this.block = buttonElement;
            this.init();
            this.initEvents();
        }

        init() {
            const el = gsap.utils.selector(this.block);
            this.DOM = {
                button: this.block,
                flair: el('.button__flair')
            };
            this.xSet = gsap.quickSetter(this.DOM.flair, 'xPercent');
            this.ySet = gsap.quickSetter(this.DOM.flair, 'yPercent');
        }

        getXY(e) {
            const { left, top, width, height } = this.DOM.button.getBoundingClientRect();
            const xTransformer = gsap.utils.pipe(
                gsap.utils.mapRange(0, width, 0, 100),
                gsap.utils.clamp(0, 100)
            );
            const yTransformer = gsap.utils.pipe(
                gsap.utils.mapRange(0, height, 0, 100),
                gsap.utils.clamp(0, 100)
            );
            return { x: xTransformer(e.clientX - left), y: yTransformer(e.clientY - top) };
        }

        initEvents() {
            this.DOM.button.addEventListener('mouseenter', (e) => {
                const { x, y } = this.getXY(e);
                this.xSet(x);
                this.ySet(y);
                gsap.to(this.DOM.flair, { scale: 1, duration: 0.4, ease: 'power2.out' });
            });

            this.DOM.button.addEventListener('mouseleave', (e) => {
                const { x, y } = this.getXY(e);
                gsap.killTweensOf(this.DOM.flair);
                gsap.to(this.DOM.flair, {
                    xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
                    yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
                    scale: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            this.DOM.button.addEventListener('mousemove', (e) => {
                const { x, y } = this.getXY(e);
                gsap.to(this.DOM.flair, { xPercent: x, yPercent: y, duration: 0.4, ease: 'power2' });
            });
        }
    }

    document.querySelectorAll('[data-block="button"]').forEach((el) => new Button(el));

    /**
     * EFFET TYPEWRITER POUR LES TITRES HERO (pages non-index)
     * Animation "machine à écrire" inspirée de Bequant
     */
    function initTypewriterHeroTitles() {
        // Ne rien faire sur la page index
        if (document.body.id === 'page-wpc-main') {
            return;
        }

        // Vérifier que GSAP et SplitText sont chargés
        if (typeof gsap === 'undefined' || typeof SplitText === 'undefined') {
            console.warn('GSAP ou SplitText non chargés - effet typewriter ignoré');
            return;
        }

        gsap.registerPlugin(SplitText);

        // Sélectionner tous les titres hero des pages non-index
        const heroTitles = document.querySelectorAll('.hero-section .hero-title');

        if (heroTitles.length === 0) {
            return;
        }

        heroTitles.forEach((titleElement) => {
            // Découper le texte en caractères avec SplitText
            const split = new SplitText(titleElement, {
                type: 'chars,words,lines',
                charsClass: 'split-chars',
                wordsClass: 'split-words',
                linesClass: 'split-lines'
            });

            // Créer la timeline d'animation
            const tl = gsap.timeline({
                delay: 0.3 // Petit délai avant le début de l'animation
            });

            // Animer chaque caractère avec un effet stagger (un après l'autre)
            tl.from(split.chars, {
                duration: 0.002,
                opacity: 0,
                ease: 'power1.none',
                stagger: {
                    amount: 0.7, // Durée totale de l'animation (0.7s pour tous les caractères)
                    from: 'start'
                }
            });
        });
    }

    // Initialiser l'effet typewriter pour les titres hero - DÉSACTIVÉ
    // initTypewriterHeroTitles();

    /**
     * ANIMATION D'APPARITION PAR MOTS POUR LES TITRES HERO (pages non-index)
     * Même effet que pour les sous-titres expertise : apparition par mots avec scroll
     */
    function initHeroTitleWordAnimation() {
        if (typeof gsap === 'undefined' || typeof SplitText === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP ou plugins non chargés - animation titre hero ignorée');
            return;
        }

        // Ne rien faire sur la page index
        if (document.body.id === 'page-wpc-main') {
            return;
        }

        gsap.registerPlugin(SplitText, ScrollTrigger);

        const heroTitles = document.querySelectorAll('.hero-section .hero-title');
        if (heroTitles.length === 0) {
            return;
        }

        heroTitles.forEach(titleElement => {
            // Vérifier s'il y a des spans avec style (comme le gradient)
            const styledSpans = titleElement.querySelectorAll('span[style]');
            
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: titleElement,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            if (styledSpans.length > 0) {
                // Pour les titres avec spans stylés, utiliser SplitText pour animer mot par mot
                styledSpans.forEach((span, index) => {
                    // Récupérer le style du gradient du span original
                    const gradientStyle = span.getAttribute('style');
                    
                    // Utiliser SplitText sur le span pour animer mot par mot
                    const split = new SplitText(span, { type: 'words' });
                    if (split.words && split.words.length > 0) {
                        // Appliquer le gradient à chaque mot après le split
                        split.words.forEach(word => {
                            word.setAttribute('style', gradientStyle);
                        });
                        
                        tl.from(split.words, {
                            duration: 0.5,
                            opacity: 0,
                            y: 40,
                            ease: 'power3.out',
                            stagger: 0.03
                        }, index * 0.03);
                    } else {
                        // Si SplitText ne fonctionne pas, animer le span directement
                        gsap.set(span, { opacity: 0, y: 40 });
                        tl.to(span, {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            ease: 'power3.out'
                        }, index * 0.03);
                    }
                });

                // Pour le reste du texte, wrapper les text nodes et utiliser SplitText
                Array.from(titleElement.childNodes).forEach(node => {
                    if (node.nodeType === 3 && node.textContent.trim()) { // Text node
                        // Wrapper le texte dans un span temporaire pour SplitText
                        const wrapper = document.createElement('span');
                        wrapper.textContent = node.textContent;
                        node.parentNode.replaceChild(wrapper, node);
                        
                        // Utiliser SplitText sur le wrapper
                        const split = new SplitText(wrapper, { type: 'words' });
                        if (split.words && split.words.length > 0) {
                            tl.from(split.words, {
                                duration: 0.5,
                                opacity: 0,
                                y: 40,
                                ease: 'power3.out',
                                stagger: 0.03
                            }, '>'); // Débuter après l'animation du span
                        }
                    }
                });
            } else {
                // Animation normale si pas de spans stylés
                const split = new SplitText(titleElement, { type: 'words' });

                tl.from(split.words, {
                    duration: 0.5,
                    opacity: 0,
                    y: 40,
                    ease: 'power3.out',
                    stagger: 0.03
                });
            }
        });
    }

    // Initialiser l'animation des titres hero par mots - DÉSACTIVÉ
    // initHeroTitleWordAnimation();

    /**
     * EFFET TYPEWRITER POUR LES TITRES AVEC CLASSE .write-02
     * Animation "machine à écrire" inspirée de Bequant avec ScrollTrigger
     */
    function initWrite02Animation() {
        // Vérifier que GSAP et SplitText sont chargés
        if (typeof gsap === 'undefined' || typeof SplitText === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP ou plugins non chargés - effet .write-02 ignoré');
            return;
        }

        gsap.registerPlugin(SplitText, ScrollTrigger);

        // Sélectionner tous les éléments avec la classe .write-02
        const writeElements = document.querySelectorAll('.write-02');

        if (writeElements.length === 0) {
            return;
        }

        writeElements.forEach((element) => {
            // Découper le texte en caractères avec SplitText
            const split = new SplitText(element, {
                type: 'chars,words,lines',
                charsClass: 'split-chars',
                wordsClass: 'split-words',
                linesClass: 'split-lines'
            });

            // État initial : opacité réduite pour les caractères
            gsap.set(split.chars, {
                opacity: 0
            });

            // Créer la timeline d'animation avec ScrollTrigger
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            // Animer chaque caractère avec un effet stagger (un après l'autre)
            tl.from(split.chars, {
                duration: 0.002,
                opacity: 0,
                ease: 'power1.none',
                delay: 0.2,
                stagger: {
                    amount: 0.2, // Durée totale de l'animation (0.2s pour tous les caractères)
                    from: 'start'
                }
            });
        });
    }

    // Initialiser l'effet typewriter pour les titres .write-02
    initWrite02Animation();

    /**
     * ANIMATION FADE-IN POUR LES CARTES DOMAINES
     * Les 3 cartes apparaissent en même temps avec un effet fade
     */
    function initDomainesCardsAnimation() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP ou ScrollTrigger non chargés - animation cartes domaines ignorée');
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const cards = document.querySelectorAll('.wpc-domaine-card');

        if (cards.length === 0) {
            return;
        }

        // État initial : cartes invisibles
        gsap.set(cards, {
            opacity: 0,
            y: 40
        });

        // Animation : toutes les cartes apparaissent en même temps
        gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0,
            scrollTrigger: {
                trigger: '.wpc-domaines-cards-container',
                start: 'top 50%',
                toggleActions: 'play none none none'
            }
        });
    }

    // Initialiser l'animation fade-in des cartes domaines
    initDomainesCardsAnimation();

    /**
     * ANIMATION DES NOMS DE L'ÉQUIPE
     * Même effet que le titre hero (apparition par mots)
     * + Effet fade pour leurs rôles
     */
    function initTeamMembersAnimation() {
        if (typeof gsap === 'undefined' || typeof SplitText === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP ou plugins non chargés - animation équipe ignorée');
            return;
        }

        // Ne rien faire si on n'est pas sur la page équipe
        if (document.body.id !== 'page-wpc-equipe') {
            return;
        }

        gsap.registerPlugin(SplitText, ScrollTrigger);

        const teamItems = document.querySelectorAll('.cmp-membre-item.team-item');
        if (teamItems.length === 0) {
            return;
        }

        teamItems.forEach((item, index) => {
            const nameElement = item.querySelector('.cmp-membre-name.team-name');
            const roleElement = item.querySelector('.cmp-membre-role.team-role');

            if (!nameElement || !roleElement) {
                return;
            }

            // SplitText sur le nom par mots (comme le titre hero)
            const split = new SplitText(nameElement, { type: 'words' });
            
            if (!split.words || split.words.length === 0) {
                // Si SplitText ne fonctionne pas, afficher le nom normalement
                gsap.set(nameElement, { opacity: 1 });
                gsap.set(roleElement, { opacity: 1 });
                return;
            }
            
            // État initial : nom invisible avec déplacement, rôle invisible
            gsap.set(split.words, {
                opacity: 0,
                y: 40
            });
            
            gsap.set(roleElement, {
                opacity: 0
            });

            // Timeline pour chaque membre
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    onEnter: () => {
                        // S'assurer que l'animation se déclenche
                    }
                }
            });

            // Animation par mots pour le nom (comme le titre hero)
            tl.to(split.words, {
                duration: 0.5,
                opacity: 1,
                y: 0,
                ease: 'power3.out',
                stagger: 0.03
            });

            // Animation fade pour le rôle (après le nom)
            tl.to(roleElement, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
            }, '-=0.2'); // Commence légèrement avant la fin de l'animation du nom
        });
    }

    // Initialiser l'animation des membres de l'équipe
    initTeamMembersAnimation();

    /**
     * ANIMATION DES POINTS DE LA CARTE HEXAGONALE
     * Décale légèrement les animations pour que les points ne pulsent pas tous ensemble
     */
    function initAboutMapAnimation() {
        // Ne rien faire si on n'est pas sur la page index
        if (document.body.id !== 'page-wpc-main') {
            return;
        }

        const dots = document.querySelectorAll('.cmp-about-dot');
        dots.forEach((dot, i) => {
            const extra = Math.random() * 1.2;
            const currentDuration = dot.style.animationDuration || '2.2s';
            const baseDuration = parseFloat(currentDuration);
            dot.style.animationDuration = (baseDuration + extra).toFixed(2) + 's';
        });
    }

    // Initialiser l'animation de la carte hexagonale
    initAboutMapAnimation();

    /**
     * ANIMATION D'APPARITION DE L'IFRAME DU FORMULAIRE DE CANDIDATURE
     * L'iframe apparaît au scroll avec un effet fade-in + slide-up
     */
    function initCandidatureFormAnimation() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP ou ScrollTrigger non chargés - animation formulaire ignorée');
            return;
        }

        // Ne rien faire si on n'est pas sur la page nous-rejoindre
        if (document.body.id !== 'page-wpc-nous-rejoindre') {
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const formSection = document.querySelector('.contact-form-section');
        const formIframe = formSection?.querySelector('.contact-form-iframe-wrapper iframe');
        
        if (!formSection || !formIframe) {
            return;
        }

        // État initial : invisible et légèrement décalé vers le bas
        gsap.set(formIframe, {
            opacity: 0,
            y: 40
        });

        // Animation au scroll
        gsap.to(formIframe, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: formSection,
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    }

    // Initialiser l'animation du formulaire de candidature
    initCandidatureFormAnimation();

    /**
     * ANIMATION TIMELINE PROCESSUS
     * Animation progressive des étapes de la timeline avec effet stagger
     */
    function initTimelineAnimation() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.warn('GSAP ou ScrollTrigger non chargés - animation timeline ignorée');
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const timeline = document.querySelector('.cmp-timeline');
        if (!timeline) {
            return;
        }

        const timelineSteps = timeline.querySelectorAll('.cmp-timeline-step');
        if (timelineSteps.length === 0) {
            return;
        }

        // État initial : éléments invisibles et légèrement décalés
        timelineSteps.forEach(step => {
            const number = step.querySelector('.cmp-timeline-step__number');
            const title = step.querySelector('.cmp-timeline-step__title');
            const description = step.querySelector('.cmp-timeline-step__description');

            gsap.set([number, title, description], {
                opacity: 0
            });

            gsap.set(number, {
                scale: 0,
                rotation: -180
            });

            gsap.set([title, description], {
                y: 30,
                opacity: 0
            });
        });

        // Animation au scroll avec effet stagger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: timeline,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        timelineSteps.forEach((step, index) => {
            const number = step.querySelector('.cmp-timeline-step__number');
            const title = step.querySelector('.cmp-timeline-step__title');
            const description = step.querySelector('.cmp-timeline-step__description');

            // Animation du numéro avec scale et rotation
            tl.to(number, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.6,
                ease: 'back.out(1.7)'
            }, index * 0.15);

            // Animation du titre et description avec fade-in et slide-up
            tl.to([title, description], {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power3.out'
            }, index * 0.15 + 0.3);
        });
    }

    // Initialiser l'animation de la timeline
    initTimelineAnimation();
}