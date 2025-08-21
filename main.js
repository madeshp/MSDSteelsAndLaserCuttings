// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initNavigation();
    initScrollEffects();
    initFormHandling();
    initGallery();
    initAnimations();
    initIntersectionObserver();
    initModernFeatures();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
            }
        });
    }

    // Active nav link highlighting
    highlightActiveNavLink();
    window.addEventListener('scroll', highlightActiveNavLink);
}

// Highlight active navigation link based on scroll position
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            current = sectionId;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scrolling for navigation links
function initScrollEffects() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to top functionality
    createScrollToTopButton();
}

// Create and handle scroll to top button
function createScrollToTopButton() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    // Add styles
    const styles = `
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3rem;
            height: 3rem;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            font-size: 1rem;
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            background: var(--dark-blue);
            transform: translateY(-2px);
        }
    `;
    
    // Add styles to head if not already added
    if (!document.querySelector('#scroll-to-top-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'scroll-to-top-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced Form handling
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });

        // Add real-time validation for all form inputs
        const formInputs = contactForm.querySelectorAll('.form-input');
        const checkbox = contactForm.querySelector('#agreement');
        
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
                if (this.classList.contains('success') || this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        // Handle checkbox validation
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                validateField(this);
            });
        }
        
        // Character counter for message field
        const messageField = contactForm.querySelector('#message');
        if (messageField) {
            addCharacterCounter(messageField);
        }
    }
}

// Enhanced form submission handler with email functionality
function handleFormSubmission(form) {
    const submitBtn = form.querySelector('#submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const formSuccess = form.querySelector('#formSuccess');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate all fields
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        // Scroll to first error
        const firstError = form.querySelector('.form-input.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'flex';
    
    // Send email via PHP backend
    fetch('send-email.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            // Hide form and show success message
            form.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Update success message with server response
            const successText = formSuccess.querySelector('p');
            if (successText) {
                successText.innerHTML = '<strong>Thank you!</strong> ' + result.message;
            }
            
            // Show success notification
            showNotification(result.message, 'success');
            
            // Reset form
            form.reset();
            
            // Clear all validation states
            const allInputs = form.querySelectorAll('.form-input');
            allInputs.forEach(input => {
                input.classList.remove('error', 'success');
            });
            
            console.log('Form submitted successfully:', data);
            
            // Optional: Hide success message and show form again after some time
            setTimeout(() => {
                formSuccess.style.display = 'none';
                form.style.display = 'block';
            }, 15000);
            
        } else {
            throw new Error(result.message || 'Failed to send email');
        }
    })
    .catch(error => {
        console.error('Form submission error:', error);
        
        // Show error notification
        showNotification('Sorry, there was an error sending your request. Please try again or contact us directly at info@msdsteel.com', 'error');
        
        // Show error message in form
        showFormError(form, error.message || 'There was an error sending your request. Please try again.');
    })
    .finally(() => {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'flex';
        btnLoader.style.display = 'none';
    });
}

// Show form-level error message
function showFormError(form, message) {
    // Remove any existing error message
    const existingError = form.querySelector('.form-error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message';
    errorDiv.style.cssText = `
        background: #fef2f2;
        border: 1px solid #fecaca;
        color: #dc2626;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        font-size: 0.875rem;
        line-height: 1.5;
    `;
    errorDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Insert at the top of the form
    const formHeader = form.querySelector('.form-header');
    if (formHeader) {
        formHeader.insertAdjacentElement('afterend', errorDiv);
    } else {
        form.insertAdjacentElement('afterbegin', errorDiv);
    }
    
    // Scroll error into view
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 10000);
}

// Enhanced field validation
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    let isValid = true;
    let errorMessage = '';
    
    // Handle checkbox validation
    if (field.type === 'checkbox') {
        if (field.hasAttribute('required') && !field.checked) {
            errorMessage = 'You must agree to the terms and conditions.';
            isValid = false;
        }
    } else {
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            errorMessage = getRequiredMessage(fieldName);
            isValid = false;
        }
        
        // Specific field validations
        if (value && isValid) {
            switch (fieldName) {
                case 'name':
                    if (value.length < 2) {
                        errorMessage = 'Name must be at least 2 characters long.';
                        isValid = false;
                    } else if (!/^[a-zA-Z\s\-'\.]+$/.test(value)) {
                        errorMessage = 'Name can only contain letters, spaces, hyphens, and apostrophes.';
                        isValid = false;
                    }
                    break;
                    
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        errorMessage = 'Please enter a valid email address.';
                        isValid = false;
                    }
                    break;
                    
                case 'phone':
                    const phoneRegex = /^[\+]?[\d\s\-\(\)\.]{10,}$/;
                    if (!phoneRegex.test(value)) {
                        errorMessage = 'Please enter a valid phone number (minimum 10 digits).';
                        isValid = false;
                    }
                    break;
                    
                case 'message':
                    if (value.length < 20) {
                        errorMessage = 'Message must be at least 20 characters long.';
                        isValid = false;
                    }
                    break;
            }
        }
    }
    
    // Show/hide error and apply styling
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
        if (value || field.type === 'checkbox') {
            field.classList.add('success');
        }
    }
    
    return isValid;
}

// Get appropriate required message for field
function getRequiredMessage(fieldName) {
    const messages = {
        'name': 'Please enter your full name.',
        'email': 'Please enter your email address.',
        'service': 'Please select a service.',
        'message': 'Please describe your project.',
        'agreement': 'You must agree to the terms and conditions.'
    };
    return messages[fieldName] || 'This field is required.';
}

// Show field error with new structure
function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    field.classList.remove('success');
    
    const fieldName = field.getAttribute('name');
    const errorElement = document.getElementById(fieldName + 'Error');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// Clear field error with new structure
function clearFieldError(field) {
    field.classList.remove('error');
    
    const fieldName = field.getAttribute('name');
    const errorElement = document.getElementById(fieldName + 'Error');
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

// Add character counter to textarea
function addCharacterCounter(textarea) {
    const minLength = 20;
    const maxLength = 1000;
    
    // Create counter element
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.style.cssText = `
        font-size: 0.75rem;
        color: var(--gray-500);
        text-align: right;
        margin-top: 0.25rem;
    `;
    
    textarea.parentNode.appendChild(counter);
    
    // Update counter
    function updateCounter() {
        const length = textarea.value.length;
        counter.textContent = `${length}/${maxLength} characters`;
        
        if (length < minLength) {
            counter.style.color = 'var(--error-color)';
        } else if (length > maxLength - 50) {
            counter.style.color = 'var(--warning-color)';
        } else {
            counter.style.color = 'var(--success-color)';
        }
    }
    
    textarea.addEventListener('input', updateCounter);
    textarea.setAttribute('maxlength', maxLength);
    updateCounter();
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const styles = `
        .notification {
            position: fixed;
            top: 2rem;
            right: 2rem;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 10000;
            max-width: 400px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification-success {
            background: #10b981;
        }
        
        .notification-error {
            background: #ef4444;
        }
        
        .notification-info {
            background: #3b82f6;
        }
        
        .notification.show {
            transform: translateX(0);
        }
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide and remove notification
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Modern Gallery with Lightbox functionality
function initGallery() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxBackdrop = document.getElementById('lightboxBackdrop');
    
    // Initialize gallery buttons
    const galleryButtons = document.querySelectorAll('.gallery-btn');
    
    galleryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const image = button.getAttribute('data-image');
            const title = button.getAttribute('data-title');
            const description = button.getAttribute('data-description');
            
            openLightbox(image, title, description);
        });
    });
    
    // Lightbox controls
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxBackdrop) {
        lightboxBackdrop.addEventListener('click', closeLightbox);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    function openLightbox(imageSrc, title, description) {
        if (lightbox && lightboxImage && lightboxTitle && lightboxDescription) {
            lightboxImage.src = imageSrc;
            lightboxImage.alt = title;
            lightboxTitle.textContent = title;
            lightboxDescription.textContent = description;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus management for accessibility
            if (lightboxClose) {
                lightboxClose.focus();
            }
        }
    }
    
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
            
            // Clear image src to stop loading
            if (lightboxImage) {
                lightboxImage.src = '';
            }
        }
    }
    
    // Add click handlers for placeholder items
    const placeholderItems = document.querySelectorAll('.gallery-placeholder');
    placeholderItems.forEach(item => {
        item.addEventListener('click', () => {
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Enhanced image loading with error handling
    const galleryImages = document.querySelectorAll('.gallery-img');
    galleryImages.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
            this.alt = 'Image not found';
        });
    });
}

// Legacy lightbox code removed - now using modern implementation

// Old lightbox code removed - using modern HTML-based lightbox

// Animation effects
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .gallery-item, .feature, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Counter animation for statistics (if you want to add them later)
    animateCounters();
}

// Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Utility functions
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

// Performance optimization
window.addEventListener('scroll', debounce(function() {
    // Optimized scroll handling
}, 10));

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Service Worker registration for future PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when implementing PWA features
        // navigator.serviceWorker.register('/sw.js');
    });
}


document.addEventListener("DOMContentLoaded", () => {
  const imageFilenames = [
    "82.png",
    "83.png",
    "84.png",
    "85.png",
    "86.png",
	"87.png",
	"88.png",
	"89.png",
	"artistic-design.jpg",
	"workshop.jpg",
	"intricate-pattern.jpg",
	"custom-fabrication.jpg",
	"architectural.JPG"
    // Add or remove filenames based on your /images folder
  ];

  const galleryContainer = document.getElementById("galleryContainer");
  const loadingIndicator = document.getElementById("galleryLoading");

  // Remove loading spinner
  if (loadingIndicator) {
    loadingIndicator.remove();
  }

  // Only proceed if gallery container exists
  if (galleryContainer) {
    imageFilenames.forEach((filename) => {
      const item = document.createElement("div");
      item.className = "gallery-item";

      const img = document.createElement("img");
      img.src = "images/" + filename;
      img.className = "gallery-img";
      img.alt = filename;

      const name = document.createElement("div");
      name.className = "gallery-name";
      name.textContent = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");

      item.appendChild(img);
      item.appendChild(name);
      galleryContainer.appendChild(item);
    });
  }

  // Optional: Scroll left/right buttons
  const scrollLeft = document.getElementById("scrollLeft");
  const scrollRight = document.getElementById("scrollRight");

  if (scrollLeft && scrollRight && galleryContainer) {
    scrollLeft.addEventListener("click", () => {
      galleryContainer.scrollBy({ left: -300, behavior: "smooth" });
    });

    scrollRight.addEventListener("click", () => {
      galleryContainer.scrollBy({ left: 300, behavior: "smooth" });
    });
  }
});

// Modern Intersection Observer for scroll animations
function initIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, parseInt(delay));
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Modern features initialization
function initModernFeatures() {
    // Initialize lazy loading for images
    initLazyLoading();
    
    // Initialize performance optimizations
    initPerformanceOptimizations();
    
    // Initialize accessibility features
    initAccessibilityFeatures();
    
    // Initialize smooth interactions
    initSmoothInteractions();
}

// Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Trigger any scroll-based calculations here
            updateScrollIndicators();
        }, 10);
    });
    
    // Optimize animations with requestAnimationFrame
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    if (animateElements.length > 0) {
        let rafId;
        const handleScroll = () => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                // Handle scroll animations
                rafId = null;
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
}

// Update scroll indicators
function updateScrollIndicators() {
    const scrollProgress = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = `${scrollProgress}%`;
    }
}

// Accessibility features
function initAccessibilityFeatures() {
    // Add focus indicators for keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add skip link for screen readers
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Smooth interactions
function initSmoothInteractions() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .service-card, .feature');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            // Add ripple animation if it doesn't exist
            if (!document.querySelector('#ripple-animation')) {
                const style = document.createElement('style');
                style.id = 'ripple-animation';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.nav-link, .btn, .service-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}
