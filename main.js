// BCG Style Interactions

// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const headerNav = document.querySelector('.header-nav');

if (hamburger && headerNav) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        headerNav.classList.toggle('active');
    });
}

// Smooth scrolling pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// BCG Style Carousel
class BCGCarousel {
    constructor(container) {
        this.container = container;
        this.items = container.querySelectorAll('.List12_item');
        this.currentIndex = 0;
        this.isAutoPlaying = true;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000;
        
        this.init();
    }
    
    init() {
        this.setupAutoPlay();
        this.addTouchSupport();
        this.addKeyboardSupport();
        this.addHoverPause();
    }
    
    setupAutoPlay() {
        if (this.isAutoPlaying) {
            this.autoPlayInterval = setInterval(() => {
                this.next();
            }, this.autoPlayDelay);
        }
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.scrollToItem(this.currentIndex);
    }
    
    prev() {
        this.currentIndex = this.currentIndex === 0 ? this.items.length - 1 : this.currentIndex - 1;
        this.scrollToItem(this.currentIndex);
    }
    
    scrollToItem(index) {
        const item = this.items[index];
        if (item) {
            item.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }
    
    addTouchSupport() {
        let startX = 0;
        let startY = 0;
        let isScrolling = false;
        
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isScrolling = false;
        });
        
        this.container.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            const diffX = startX - e.touches[0].clientX;
            const diffY = startY - e.touches[0].clientY;
            
            if (Math.abs(diffX) > Math.abs(diffY)) {
                isScrolling = true;
                e.preventDefault();
            }
        });
        
        this.container.addEventListener('touchend', (e) => {
            if (!isScrolling) return;
            
            const diffX = startX - e.changedTouches[0].clientX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
            
            startX = 0;
            startY = 0;
            isScrolling = false;
        });
    }
    
    addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prev();
            } else if (e.key === 'ArrowRight') {
                this.next();
            }
        });
    }
    
    addHoverPause() {
        this.container.addEventListener('mouseenter', () => {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
            }
        });
        
        this.container.addEventListener('mouseleave', () => {
            if (this.isAutoPlaying) {
                this.setupAutoPlay();
            }
        });
    }
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.List12_items');
    if (carousel) {
        new BCGCarousel(carousel);
    }
});

// BCG Style Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.Promo20, .expertise-card, .team-card, .service-feature, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Animation des barres de graphique
const chartBars = document.querySelectorAll('.chart-bar');
chartBars.forEach((bar, index) => {
    bar.style.animationDelay = `${index * 0.2}s`;
});

// BCG Style Hover Effects
document.querySelectorAll('.Promo20, .expertise-card, .team-card, .info-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Animation des boutons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
    });
});

// BCG Style Form Handling
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animation de soumission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Envoi en cours...</span>';
        submitBtn.disabled = true;
        
        // Simuler l'envoi
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Message envoyé !</span>';
            submitBtn.style.background = '#10b981';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 2000);
        }, 1000);
    });
}

// BCG Style Search Functionality
const searchButton = document.querySelector('.header-search-button');
if (searchButton) {
    searchButton.addEventListener('click', () => {
        // Toggle search overlay
        const searchOverlay = document.createElement('div');
        searchOverlay.className = 'search-overlay';
        searchOverlay.innerHTML = `
            <div class="search-modal">
                <div class="search-header">
                    <h3>Rechercher</h3>
                    <button class="search-close">&times;</button>
                </div>
                <div class="search-content">
                    <input type="text" placeholder="Rechercher sur le site..." class="search-input">
                    <div class="search-results"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(searchOverlay);
        
        // Close search
        const closeBtn = searchOverlay.querySelector('.search-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(searchOverlay);
        });
        
        // Close on overlay click
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                document.body.removeChild(searchOverlay);
            }
        });
    });
}

// BCG Style Scroll Reveal
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(section);
    });
};

// Initialize scroll reveal
revealSections();

// BCG Style Performance Optimizations
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// BCG Style Smooth Reveal Animation
const addRevealAnimation = () => {
    const revealElements = document.querySelectorAll('.Promo20, .expertise-card, .team-card, .service-feature, .info-card');
    
    revealElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
};

// Initialize reveal animations
addRevealAnimation();

// BCG Style ModuleHeader Animation
const animateModuleHeaders = () => {
    const moduleHeaders = document.querySelectorAll('.ModuleHeader');
    
    moduleHeaders.forEach(header => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const eyebrow = entry.target.querySelector('.ModuleHeader-eyebrow');
                    const title = entry.target.querySelector('.ModuleHeader-title');
                    const content = entry.target.querySelector('.ModuleHeader-content');
                    
                    if (eyebrow) {
                        eyebrow.style.opacity = '1';
                        eyebrow.style.transform = 'translateY(0)';
                    }
                    
                    setTimeout(() => {
                        if (title) {
                            title.style.opacity = '1';
                            title.style.transform = 'translateY(0)';
                        }
                    }, 200);
                    
                    setTimeout(() => {
                        if (content) {
                            content.style.opacity = '1';
                            content.style.transform = 'translateY(0)';
                        }
                    }, 400);
                }
            });
        }, { threshold: 0.3 });
        
        // Set initial styles
        const eyebrow = header.querySelector('.ModuleHeader-eyebrow');
        const title = header.querySelector('.ModuleHeader-title');
        const content = header.querySelector('.ModuleHeader-content');
        
        if (eyebrow) {
            eyebrow.style.opacity = '0';
            eyebrow.style.transform = 'translateY(30px)';
            eyebrow.style.transition = 'all 0.6s ease';
        }
        
        if (title) {
            title.style.opacity = '0';
            title.style.transform = 'translateY(30px)';
            title.style.transition = 'all 0.6s ease';
        }
        
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(30px)';
            content.style.transition = 'all 0.6s ease';
        }
        
        observer.observe(header);
    });
};

// Initialize ModuleHeader animations
document.addEventListener('DOMContentLoaded', () => {
    animateModuleHeaders();
});