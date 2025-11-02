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
     * ANIMATION SPLITTEXT POUR NOUVELLE HERO SECTION
     * Animation de mots qui tombent
     */
    function initNewHeroSplitText() {
        if (typeof gsap === 'undefined' || typeof SplitText === 'undefined') {
            return;
        }

        gsap.registerPlugin(SplitText);

        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) {
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
     * EFFETS POUR L'IMAGE BANNER HERO
     * Parallaxe, zoom au scroll, et animations d'apparition
     */
    function initBannerEffects() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const bannerImage = document.querySelector('.hero-banner-image');
        const heroSection = document.querySelector('.hero-minimal');

        if (!bannerImage || !heroSection) {
            return;
        }

        // Animation d'apparition initiale
        gsap.fromTo(bannerImage,
            {
                opacity: 0,
                scale: 1.15,
                filter: 'blur(10px)'
            },
            {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                duration: 1.5,
                ease: 'power3.out',
                delay: 0.2
            }
        );

        // Effet de parallaxe et zoom léger au scroll
        gsap.to(bannerImage, {
            yPercent: 30,
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
                trigger: heroSection,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // Effet de lumière animée subtile
        const lightEffect = document.createElement('div');
        lightEffect.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(
                ellipse 800px 600px at 50% 50%,
                rgba(255, 255, 255, 0.1) 0%,
                transparent 70%
            );
            pointer-events: none;
            z-index: 1;
            opacity: 0;
        `;
        document.querySelector('.hero-banner-container').appendChild(lightEffect);

        // Animation de la lumière
        gsap.to(lightEffect, {
            opacity: 0.6,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        // Effet de mouvement léger au hover (si desktop)
        if (window.innerWidth >= 769) {
            heroSection.addEventListener('mousemove', (e) => {
                const rect = heroSection.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

                gsap.to(bannerImage, {
                    x: x,
                    y: y,
                    duration: 1,
                    ease: 'power2.out'
                });
            });

            heroSection.addEventListener('mouseleave', () => {
                gsap.to(bannerImage, {
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out'
                });
            });
        }
    }

    initBannerEffects();



    /**
     * TEXT COLOR REVEAL ON SCROLL POUR LE TITRE WPC
     * Effet de peinture progressive de bleu au scroll
     */

    /**
     * ANIMATION DU SOUS-TITRE DE LA SECTION EXPERTISE
     * Effet d'apparition au scroll inspiré de l'exemple (sans bouton ni changement de texte)
     */
    function initExpertiseSubtitleAnimation() {
        if (typeof gsap === 'undefined' || typeof SplitText === 'undefined' || typeof ScrollTrigger === 'undefined') {
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

}

// Initialiser les animations au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    initScrollAnimation();
    initStrokeButtons();
});

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
     * ANIMATION FADE-IN POUR LES CARTES DOMAINES
     * Les 3 cartes apparaissent en même temps avec un effet fade
     */
    function initDomainesCardsAnimation() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
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
     * ANIMATION FORMULAIRE DE CONTACT
     * Même effet d'apparition que le formulaire de candidature
     */
    function initContactFormAnimation() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            return;
        }

        // Ne rien faire si on n'est pas sur la page contact
        if (document.body.id !== 'page-wpc-contact') {
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

    // Initialiser l'animation du formulaire de contact
    initContactFormAnimation();

    /**
     * ANIMATION TIMELINE PROCESSUS
     * Animation progressive des étapes de la timeline avec effet stagger
     */
    function initTimelineAnimation() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
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