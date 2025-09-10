// KPMG Exact JavaScript - Clone Parfait

document.addEventListener('DOMContentLoaded', function() {
    
    // KPMG Exact Mobile Navigation
    const mobileToggle = document.querySelector('[data-cmp-mobile-toggle]');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle mobile menu visibility
            if (mobileMenu) {
                mobileMenu.classList.toggle('mobile-menu--open');
            }
            
            // Toggle body scroll
            document.body.classList.toggle('mobile-menu-open');
        });
    }
    
    // KPMG Exact Smooth Scrolling
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // KPMG Exact Header Scroll Effect
    const header = document.querySelector('.cmp-header');
    let lastScrollY = window.scrollY;
    
    function updateHeaderOnScroll() {
        const currentScrollY = window.scrollY;
        
        if (header) {
            if (currentScrollY > 100) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
            
            // Hide/show header on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.classList.add('header--hidden');
            } else {
                header.classList.remove('header--hidden');
            }
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttle scroll event
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeaderOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', function() {
        requestTick();
        ticking = false;
    });
    
    // KPMG Exact Language Selector
    const langSelector = document.querySelector('.cmp-lang-selector__toggle-btn');
    const langDropdown = document.querySelector('.language-selector__side-navbar');
    
    if (langSelector && langDropdown) {
        langSelector.addEventListener('click', function() {
            const isOpen = langDropdown.classList.contains('language-selector--open');
            
            if (isOpen) {
                langDropdown.classList.remove('language-selector--open');
                this.setAttribute('aria-expanded', 'false');
            } else {
                langDropdown.classList.add('language-selector--open');
                this.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Close language selector when clicking outside
        document.addEventListener('click', function(e) {
            if (!langSelector.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.remove('language-selector--open');
                langSelector.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // KPMG Exact Search Toggle
    const searchToggle = document.querySelector('.cmp-search-toggle__inner');
    const searchForm = document.querySelector('.cmp-search-form');
    
    if (searchToggle && searchForm) {
        searchToggle.addEventListener('click', function() {
            const isOpen = searchForm.classList.contains('search-form--open');
            
            if (isOpen) {
                searchForm.classList.remove('search-form--open');
                this.setAttribute('aria-expanded', 'false');
            } else {
                searchForm.classList.add('search-form--open');
                this.setAttribute('aria-expanded', 'true');
                // Focus on search input
                const searchInput = searchForm.querySelector('input[type="search"]');
                if (searchInput) {
                    setTimeout(() => searchInput.focus(), 100);
                }
            }
        });
    }
    
    // KPMG Exact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Envoi en cours...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                submitButton.textContent = 'Message envoyé !';
                submitButton.style.background = '#00B04F';
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.background = '';
                }, 3000);
            }, 2000);
        });
    }
    
    // KPMG Exact Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.cmp-expertise-item, .cmp-secteur-item, .cmp-about-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // KPMG Exact Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        // ESC key closes modals/dropdowns
        if (e.key === 'Escape') {
            // Close mobile menu
            if (mobileMenu && mobileMenu.classList.contains('mobile-menu--open')) {
                mobileToggle.click();
            }
            
            // Close language selector
            if (langDropdown && langDropdown.classList.contains('language-selector--open')) {
                langSelector.click();
            }
            
            // Close search form
            if (searchForm && searchForm.classList.contains('search-form--open')) {
                searchToggle.click();
            }
        }
    });
    
    // KPMG Exact Accessibility Enhancements
    const focusableElements = document.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    // Trap focus in mobile menu when open
    function trapFocus(element) {
        const focusableContent = element.querySelectorAll(focusableElements);
        const firstFocusableElement = focusableContent[0];
        const lastFocusableElement = focusableContent[focusableContent.length - 1];
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    if (mobileMenu) {
        trapFocus(mobileMenu);
    }
    
    // KPMG Exact Performance Optimizations
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // KPMG Exact Error Handling
    window.addEventListener('error', function(e) {
        console.error('KPMG Clone Error:', e.error);
    });
    
    // KPMG Exact Analytics (placeholder)
    function trackEvent(eventName, eventData) {
        // Placeholder for analytics tracking
        console.log('Analytics Event:', eventName, eventData);
    }
    
    // Track button clicks
    const trackableButtons = document.querySelectorAll('.cmp-button, .cmp-hero-fbv__action-link');
    trackableButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackEvent('button_click', {
                button_text: buttonText,
                button_href: this.href || '#',
                page: window.location.pathname
            });
        });
    });
    
    // KPMG Exact Console Welcome
    console.log('%c🎯 KPMG Clone Parfait - WPC', 'color: #00338D; font-size: 20px; font-weight: bold;');
    console.log('%cSite développé avec la structure exacte de KPMG', 'color: #00B04F; font-size: 14px;');
    console.log('%cToutes les classes et interactions reproduites à l\'identique', 'color: #6C757D; font-size: 12px;');
    
});

// KPMG Exact Utility Functions
const KPMGUtils = {
    // Debounce function for performance
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
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
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Get element offset
    getOffset: function(element) {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX
        };
    }
};

// KPMG Exact CSS Classes for JavaScript
const KPMGClasses = {
    mobileMenuOpen: 'mobile-menu-open',
    headerScrolled: 'header--scrolled',
    headerHidden: 'header--hidden',
    languageSelectorOpen: 'language-selector--open',
    searchFormOpen: 'search-form--open',
    animateIn: 'animate-in',
    lazy: 'lazy'
};

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KPMGUtils, KPMGClasses };
}