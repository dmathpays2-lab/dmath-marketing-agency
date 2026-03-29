/**
 * DC Tow Directory - Interactions Module
 * UI interactions: ripple effects, search, mobile menu, lazy loading
 * Vanilla JavaScript, no dependencies
 */

(function() {
  'use strict';

  /**
   * ============================================
   * BUTTON RIPPLE EFFECT
   * ============================================
   * Material Design style ripple on click
   */
  
  const RippleEffect = {
    config: {
      duration: 600,
      color: 'rgba(255, 255, 255, 0.3)'
    },

    createRipple(button, event) {
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      
      // Calculate ripple position
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Calculate ripple size (diagonal of button)
      const size = Math.max(rect.width, rect.height) * 2;
      
      // Apply styles
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: ${this.config.color};
        width: ${size}px;
        height: ${size}px;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
        pointer-events: none;
        transform: scale(0);
        opacity: 1;
        animation: ripple-animation ${this.config.duration}ms ease-out;
      `;
      
      // Ensure button has relative positioning
      const computedStyle = window.getComputedStyle(button);
      if (computedStyle.position === 'static') {
        button.style.position = 'relative';
      }
      
      button.style.overflow = 'hidden';
      button.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => ripple.remove(), this.config.duration);
    },

    init(selector = '[data-ripple]') {
      // Add ripple animation keyframes if not present
      if (!document.getElementById('ripple-keyframes')) {
        const style = document.createElement('style');
        style.id = 'ripple-keyframes';
        style.textContent = `
          @keyframes ripple-animation {
            to {
              transform: scale(1);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }

      // Attach click handlers
      document.addEventListener('click', (e) => {
        const button = e.target.closest(selector);
        if (button) {
          this.createRipple(button, e);
        }
      });
    }
  };

  /**
   * ============================================
   * SEARCH BAR FOCUS MANAGEMENT
   * ============================================
   */
  
  const SearchBar = {
    config: {
      focusedClass: 'is-focused',
      expandedClass: 'is-expanded'
    },

    init(selector = '[data-search]') {
      const searchBars = document.querySelectorAll(selector);
      
      searchBars.forEach(searchBar => {
        const input = searchBar.querySelector('input');
        const clearBtn = searchBar.querySelector('[data-search-clear]');
        
        if (!input) return;

        // Focus state
        input.addEventListener('focus', () => {
          searchBar.classList.add(this.config.focusedClass);
          document.body.classList.add('search-is-active');
        });

        input.addEventListener('blur', () => {
          // Small delay to allow click events on clear button
          setTimeout(() => {
            searchBar.classList.remove(this.config.focusedClass);
            document.body.classList.remove('search-is-active');
          }, 200);
        });

        // Clear button functionality
        if (clearBtn) {
          clearBtn.addEventListener('click', () => {
            input.value = '';
            input.focus();
            this.triggerSearch(searchBar, '');
          });
        }

        // Input event with debounce
        let debounceTimer;
        input.addEventListener('input', (e) => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            this.triggerSearch(searchBar, e.target.value);
          }, 300);
        });

        // Show/hide clear button based on input value
        input.addEventListener('input', () => {
          if (clearBtn) {
            clearBtn.style.display = input.value ? 'block' : 'none';
          }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
          // Cmd/Ctrl + K to focus search
          if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            input.focus();
          }
          // Escape to blur search
          if (e.key === 'Escape' && document.activeElement === input) {
            input.blur();
          }
        });
      });
    },

    triggerSearch(searchBar, value) {
      // Dispatch custom event for search handling
      const event = new CustomEvent('search', {
        detail: { value, searchBar },
        bubbles: true
      });
      searchBar.dispatchEvent(event);
    }
  };

  /**
   * ============================================
   * MOBILE MENU TOGGLE
   * ============================================
   */
  
  const MobileMenu = {
    config: {
      activeClass: 'is-open',
      animatingClass: 'is-animating',
      bodyClass: 'menu-is-open'
    },

    init(options = {}) {
      const toggleSelector = options.toggle || '[data-menu-toggle]';
      const menuSelector = options.menu || '[data-mobile-menu]';
      
      const toggles = document.querySelectorAll(toggleSelector);
      const menu = document.querySelector(menuSelector);
      
      if (!toggles.length || !menu) return;

      let isOpen = false;

      const openMenu = () => {
        if (isOpen) return;
        isOpen = true;
        
        menu.classList.add(this.config.animatingClass);
        document.body.classList.add(this.config.bodyClass);
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Small delay for animation
        requestAnimationFrame(() => {
          menu.classList.add(this.config.activeClass);
          toggles.forEach(t => t.setAttribute('aria-expanded', 'true'));
          
          setTimeout(() => {
            menu.classList.remove(this.config.animatingClass);
          }, 300);
        });
      };

      const closeMenu = () => {
        if (!isOpen) return;
        isOpen = false;
        
        menu.classList.add(this.config.animatingClass);
        menu.classList.remove(this.config.activeClass);
        toggles.forEach(t => t.setAttribute('aria-expanded', 'false'));
        
        setTimeout(() => {
          document.body.classList.remove(this.config.bodyClass);
          document.body.style.overflow = '';
          menu.classList.remove(this.config.animatingClass);
        }, 300);
      };

      const toggleMenu = () => {
        isOpen ? closeMenu() : openMenu();
      };

      // Toggle click handlers
      toggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          toggleMenu();
        });
      });

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) {
          closeMenu();
        }
      });

      // Close on backdrop click
      menu.addEventListener('click', (e) => {
        if (e.target === menu) {
          closeMenu();
        }
      });

      // Close on link click (for anchor links)
      const menuLinks = menu.querySelectorAll('a[href^="#"]');
      menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          closeMenu();
        });
      });

      // Handle resize
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isOpen) {
          closeMenu();
        }
      });
    }
  };

  /**
   * ============================================
   * CARD HOVER ENHANCEMENTS
   * ============================================
   * 3D tilt effect and hover state management
   */
  
  const CardHover = {
    config: {
      tiltClass: 'has-tilt',
      hoverClass: 'is-hovered',
      maxTilt: 10 // Maximum rotation in degrees
    },

    init(selector = '[data-card-hover]') {
      const cards = document.querySelectorAll(selector);
      if (!cards.length) return;

      // Check for touch device
      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
      if (isTouchDevice) return;

      cards.forEach(card => {
        const hasTilt = card.hasAttribute('data-tilt');
        
        // Standard hover effects
        card.addEventListener('mouseenter', () => {
          card.classList.add(this.config.hoverClass);
        });

        card.addEventListener('mouseleave', () => {
          card.classList.remove(this.config.hoverClass);
          if (hasTilt) {
            card.style.transform = '';
          }
        });

        // 3D tilt effect
        if (hasTilt) {
          card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -this.config.maxTilt;
            const rotateY = ((x - centerX) / centerX) * this.config.maxTilt;
            
            card.style.transform = `
              perspective(1000px) 
              rotateX(${rotateX}deg) 
              rotateY(${rotateY}deg) 
              scale3d(1.02, 1.02, 1.02)
            `;
          });
        }
      });
    }
  };

  /**
   * ============================================
   * LAZY LOADING FOR IMAGES
   * ============================================
   * IntersectionObserver-based lazy loading
   */
  
  const LazyLoader = {
    config: {
      rootMargin: '50px 0px',
      threshold: 0.01,
      placeholderColor: '#f0f0f0'
    },

    init(selector = '[data-lazy]') {
      const images = document.querySelectorAll(selector);
      if (!images.length) return;

      // Check for native lazy loading support
      const supportsNativeLazy = 'loading' in HTMLImageElement.prototype;

      if (supportsNativeLazy) {
        // Use native lazy loading
        images.forEach(img => {
          const src = img.dataset.src;
          const srcset = img.dataset.srcset;
          
          if (src) {
            img.src = src;
            img.loading = 'lazy';
          }
          if (srcset) {
            img.srcset = srcset;
          }
          
          img.classList.add('lazy-native');
        });
      } else {
        // Fallback to IntersectionObserver
        this.observerLoad(images);
      }

      // Handle background images
      this.loadBackgroundImages();
    },

    observerLoad(images) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            imageObserver.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: this.config.rootMargin,
        threshold: this.config.threshold
      });

      images.forEach(img => {
        // Add placeholder styling
        img.style.backgroundColor = this.config.placeholderColor;
        imageObserver.observe(img);
      });
    },

    loadImage(img) {
      const src = img.dataset.src;
      const srcset = img.dataset.srcset;
      const sizes = img.dataset.sizes;

      if (!src) return;

      // Create a new image to preload
      const preloadImg = new Image();
      
      preloadImg.onload = () => {
        img.src = src;
        if (srcset) img.srcset = srcset;
        if (sizes) img.sizes = sizes;
        
        img.classList.add('is-loaded');
        img.style.backgroundColor = '';
        
        // Trigger custom event
        img.dispatchEvent(new CustomEvent('lazyLoaded', { bubbles: true }));
      };

      preloadImg.onerror = () => {
        img.classList.add('is-error');
        img.dispatchEvent(new CustomEvent('lazyError', { bubbles: true }));
      };

      preloadImg.src = src;
    },

    loadBackgroundImages(selector = '[data-bg-lazy]') {
      const elements = document.querySelectorAll(selector);
      if (!elements.length) return;

      const bgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const bgUrl = el.dataset.bgLazy;
            
            if (bgUrl) {
              const img = new Image();
              img.onload = () => {
                el.style.backgroundImage = `url(${bgUrl})`;
                el.classList.add('bg-is-loaded');
              };
              img.src = bgUrl;
            }
            
            bgObserver.unobserve(el);
          }
        });
      }, {
        rootMargin: this.config.rootMargin
      });

      elements.forEach(el => bgObserver.observe(el));
    }
  };

  /**
   * ============================================
   * FORM VALIDATION ENHANCEMENTS
   * ============================================
   */
  
  const FormEnhancements = {
    init(selector = '[data-validate]') {
      const forms = document.querySelectorAll(selector);
      
      forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
          // Real-time validation on blur
          input.addEventListener('blur', () => {
            this.validateField(input);
          });

          // Clear error on input
          input.addEventListener('input', () => {
            this.clearError(input);
          });
        });

        // Form submission
        form.addEventListener('submit', (e) => {
          let isValid = true;
          
          inputs.forEach(input => {
            if (!this.validateField(input)) {
              isValid = false;
            }
          });

          if (!isValid) {
            e.preventDefault();
            // Focus first invalid field
            const firstInvalid = form.querySelector('.is-invalid');
            if (firstInvalid) {
              firstInvalid.focus();
            }
          }
        });
      });
    },

    validateField(input) {
      const isValid = input.checkValidity();
      const formGroup = input.closest('.form-group') || input.parentElement;
      
      if (!isValid && input.value) {
        formGroup.classList.add('is-invalid');
        formGroup.classList.remove('is-valid');
        
        // Show error message
        let errorMsg = formGroup.querySelector('.error-message');
        if (!errorMsg) {
          errorMsg = document.createElement('span');
          errorMsg.className = 'error-message';
          formGroup.appendChild(errorMsg);
        }
        errorMsg.textContent = input.validationMessage;
        
        return false;
      } else if (input.value) {
        formGroup.classList.remove('is-invalid');
        formGroup.classList.add('is-valid');
        
        const errorMsg = formGroup.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
        
        return true;
      }
      
      return true;
    },

    clearError(input) {
      const formGroup = input.closest('.form-group') || input.parentElement;
      formGroup.classList.remove('is-invalid');
      
      const errorMsg = formGroup.querySelector('.error-message');
      if (errorMsg) errorMsg.remove();
    }
  };

  /**
   * ============================================
   * INITIALIZATION
   * ============================================
   */
  
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initialize);
    } else {
      initialize();
    }
  }

  function initialize() {
    RippleEffect.init();
    SearchBar.init();
    MobileMenu.init();
    CardHover.init();
    LazyLoader.init();
    FormEnhancements.init();

    console.log('🚗 DC Tow Directory - Interactions initialized');
  }

  init();

  // Expose API
  window.DCTowInteractions = {
    RippleEffect,
    SearchBar,
    MobileMenu,
    CardHover,
    LazyLoader,
    FormEnhancements,
    refresh() {
      LazyLoader.init();
      CardHover.init();
    }
  };

})();
