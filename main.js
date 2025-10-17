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
     * CONTACT FORM FEEDBACK
     * Affiche un état de chargement lors de la soumission du formulaire
     * Le formulaire utilise FormSubmit.co qui redirige l'utilisateur après soumission
     */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            // Affichage de l'état de chargement
            submitButton.textContent = 'Envoi en cours...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';

            // Réinitialisation après 3 secondes (le formulaire sera redirigé par FormSubmit)
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }, 3000);
        });
    }

    // WPC Console Welcome (development only)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('%c🎯 West Paris Consulting', 'color: #00338D; font-size: 20px; font-weight: bold;');
        console.log('%cSite développé pour West Paris Consulting', 'color: #00338D; font-size: 14px;');
    }

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
 * Gestion du menu mobile avec toggle du hamburger
 * Implémentation optimisée pour les performances
 * 
 * Fonctionnalités :
 * - Toggle du menu via le bouton hamburger
 * - Fermeture automatique lors du clic sur un lien
 * - Fermeture lors du clic en dehors du menu
 * - Gestion du scroll lors de l'ouverture/fermeture
 */
document.addEventListener('DOMContentLoaded', function () {
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
            closeMenu();
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
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    function openMenu() {
        mobileMenu.classList.add('active');
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        mobileToggle.setAttribute('aria-label', 'Fermer le menu de navigation');

        // Ajouter classe au body pour cacher le bouton toggle
        body.classList.add('mobile-menu-open');

        // Empêcher le scroll du body
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.top = `-${window.scrollY}px`;
        body.style.width = '100%';
    }

    function closeMenu() {
        const scrollY = body.style.top;

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
        if (scrollY) {
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WPCUtils, WPCClasses };
}