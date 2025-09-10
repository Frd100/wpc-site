// KPMG Style Interactions

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.cmp-navigation__mobile-menu-btn');
const header = document.querySelector('.cmp-header');

if (mobileMenuBtn && header) {
    mobileMenuBtn.addEventListener('click', () => {
        header.classList.toggle('mobile-menu-open');
    });
}

// Smooth scrolling pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 120; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.cmp-header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 1)';
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

// Language selector toggle
const langSelector = document.querySelector('.cmp-lang-selector__toggle-btn');
if (langSelector) {
    langSelector.addEventListener('click', () => {
        // Toggle language dropdown (simplified for demo)
        console.log('Language selector clicked');
    });
}

// Search button functionality
const searchBtn = document.querySelector('.cmp-navigation__search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        // Toggle search functionality (simplified for demo)
        console.log('Search clicked');
    });
}

// Contact form handling (if exists)
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
            submitBtn.style.background = '#00A651';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                contactForm.reset();
            }, 2000);
        }, 1000);
    });
}

// Intersection Observer for animations
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
document.querySelectorAll('.cmp-expertise-item, .cmp-secteur-item, .cmp-about-content, .cmp-contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Button hover effects
document.querySelectorAll('.cmp-button').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0)';
    });
});

// Expertise items hover effects
document.querySelectorAll('.cmp-expertise-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-4px)';
        item.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = 'none';
    });
});

// Secteur items hover effects
document.querySelectorAll('.cmp-secteur-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-4px)';
        item.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('WPC KPMG-style site loaded successfully!');
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Responsive adjustments if needed
    const header = document.querySelector('.cmp-header');
    if (window.innerWidth <= 768) {
        header.classList.add('mobile');
    } else {
        header.classList.remove('mobile');
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const header = document.querySelector('.cmp-header');
        if (header.classList.contains('mobile-menu-open')) {
            header.classList.remove('mobile-menu-open');
        }
    }
});

// Add focus management for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounced scroll effect
const debouncedScrollEffect = debounce(() => {
    const header = document.querySelector('.cmp-header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 1)';
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollEffect);