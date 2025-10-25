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
        // Vérifier si la navigation est déjà en cache
        if (window.navCache) {
            const navPlaceholder = document.getElementById('nav-placeholder');
            if (navPlaceholder) {
                navPlaceholder.innerHTML = window.navCache;
                setActiveNavLink();
                initializeMobileMenu();
            }
            return;
        }

        // Afficher un indicateur de chargement
        const navPlaceholder = document.getElementById('nav-placeholder');
        if (navPlaceholder) {
            navPlaceholder.innerHTML = '<div style="height: 60px; background: #f8f9fa; display: flex; align-items: center; justify-content: center;"><div style="width: 20px; height: 20px; border: 2px solid #ddd; border-top: 2px solid #1E4ADE; border-radius: 50%; animation: spin 1s linear infinite;"></div></div>';
        }

        fetch('nav.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // Mettre en cache la navigation
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
                // Afficher une navigation de fallback
                const navPlaceholder = document.getElementById('nav-placeholder');
                if (navPlaceholder) {
                    navPlaceholder.innerHTML = '<nav class="main-navigation"><div class="main-navigation__container"><div class="main-navigation__content"><div class="main-navigation__logo"><a href="index.html" class="main-navigation__logo-link"><img src="logo.svg" alt="WPC Logo" class="main-navigation__logo-image" loading="lazy"></a></div><div class="main-navigation__links"><a href="index.html" class="main-navigation__link"><span>Accueil</span></a><a href="domaines.html" class="main-navigation__link"><span>Nos Domaines</span></a><a href="equipe.html" class="main-navigation__link"><span>Notre Équipe</span></a><a href="actualites.html" class="main-navigation__link"><span>Actualités</span></a><a href="contact.html" class="main-navigation__link"><span>Contact</span></a></div></div></div></nav>';
                }
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

    // Pré-charger la navigation pour éviter les délais
    if (!window.navCache) {
        fetch('nav.html')
            .then(response => response.text())
            .then(data => {
                window.navCache = data;
            })
            .catch(error => console.error('Error pre-loading navigation:', error));
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
    }

    function closeMenu() {
        const scrollY = body.dataset.scrollY || '0';

        mobileMenu.classList.remove('active');
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

/**
 * VIDEO BACKGROUND POUR MOBILE
 * Charge une vidéo MP4 en arrière-plan du hero section sur mobile uniquement
 */
function initHeroVideoBackground() {
    // Vérifier si on est sur mobile
    if (window.innerWidth > 768) {
        console.log('Desktop détecté, vidéo background ignorée');
        return;
    }

    console.log('Mobile détecté, initialisation de la vidéo background');
    
    const videoContainer = document.getElementById('hero-video-bg');
    if (!videoContainer) {
        console.error('Conteneur hero-video-bg non trouvé');
        return;
    }

    console.log('Conteneur trouvé, création de la vidéo');

    // Créer l'élément vidéo WebP
    const video = document.createElement('video');
    video.src = 'herosectionvideo.webp';
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.style.objectPosition = 'center';
    video.style.backgroundColor = 'red'; // Debug: fond rouge pour voir si la vidéo est là

    // Ajouter des événements de debug
    video.addEventListener('loadstart', () => console.log('Vidéo: loadstart'));
    video.addEventListener('loadeddata', () => console.log('Vidéo: loadeddata'));
    video.addEventListener('canplay', () => console.log('Vidéo: canplay'));
    video.addEventListener('error', (e) => console.error('Erreur vidéo:', e));

    // Ajouter la vidéo au conteneur
    videoContainer.appendChild(video);
    console.log('Vidéo ajoutée au conteneur');
}

// Initialiser la vidéo background au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    // Charger directement la vidéo MP4 (plus besoin d'attendre l'API YouTube)
    initHeroVideoBackground();
});