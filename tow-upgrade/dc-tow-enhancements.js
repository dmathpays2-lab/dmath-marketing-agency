/**
 * DC Tow Directory - JavaScript Enhancements
 * Vanilla JS - No dependencies
 */

(function() {
  'use strict';

  // ============================================
  // 1. INTERSECTION OBSERVER - Scroll Animations
  // ============================================
  const ScrollAnimations = {
    observer: null,
    defaultOptions: {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    },

    init(selector = '[data-animate]') {
      const elements = document.querySelectorAll(selector);
      if (!elements.length) return;

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReducedMotion) {
        elements.forEach(el => {
          el.classList.add('animate-visible');
        });
        return;
      }

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            
            setTimeout(() => {
              entry.target.classList.add('animate-visible');
            }, delay);

            // Unobserve after animation
            if (!entry.target.dataset.repeat) {
              this.observer.unobserve(entry.target);
            }
          } else if (entry.target.dataset.repeat) {
            entry.target.classList.remove('animate-visible');
          }
        });
      }, this.defaultOptions);

      elements.forEach(el => this.observer.observe(el));
    },

    destroy() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
    }
  };

  // ============================================
  // 2. STATS COUNTER ANIMATION
  // ============================================
  const CounterAnimation = {
    observer: null,
    activeCounters: new Set(),

    init(selector = '[data-counter]') {
      const counters = document.querySelectorAll(selector);
      if (!counters.length) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.activeCounters.has(entry.target)) {
            this.activeCounters.add(entry.target);
            
            if (prefersReducedMotion) {
              this.setFinalValue(entry.target);
            } else {
              this.animate(entry.target);
            }
          }
        });
      }, { threshold: 0.5 });

      counters.forEach(counter => this.observer.observe(counter));
    },

    animate(element) {
      const target = parseInt(element.dataset.counter, 10) || 0;
      const duration = parseInt(element.dataset.duration, 10) || 2000;
      const suffix = element.dataset.suffix || '';
      const prefix = element.dataset.prefix || '';
      const decimals = parseInt(element.dataset.decimals, 10) || 0;
      
      const startTime = performance.now();
      const startValue = 0;

      const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        
        const currentValue = startValue + (target - startValue) * easedProgress;
        
        if (decimals > 0) {
          element.textContent = prefix + currentValue.toFixed(decimals) + suffix;
        } else {
          element.textContent = prefix + Math.floor(currentValue).toLocaleString() + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          // Ensure final value is exact
          if (decimals > 0) {
            element.textContent = prefix + target.toFixed(decimals) + suffix;
          } else {
            element.textContent = prefix + target.toLocaleString() + suffix;
          }
        }
      };

      requestAnimationFrame(updateCounter);
    },

    setFinalValue(element) {
      const target = parseInt(element.dataset.counter, 10) || 0;
      const suffix = element.dataset.suffix || '';
      const prefix = element.dataset.prefix || '';
      const decimals = parseInt(element.dataset.decimals, 10) || 0;

      if (decimals > 0) {
        element.textContent = prefix + target.toFixed(decimals) + suffix;
      } else {
        element.textContent = prefix + target.toLocaleString() + suffix;
      }
    },

    destroy() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
      this.activeCounters.clear();
    }
  };

  // ============================================
  // 3. SMOOTH SCROLL BEHAVIOR
  // ============================================
  const SmoothScroll = {
    init() {
      // Handle anchor links
      document.addEventListener('click', this.handleClick.bind(this));
      
      // Handle URL hash on page load
      if (window.location.hash) {
        setTimeout(() => this.scrollTo(window.location.hash), 100);
      }
    },

    handleClick(e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();
      this.scrollTo(targetId);
      
      // Update URL without jump
      if (history.pushState) {
        history.pushState(null, null, targetId);
      }
    },

    scrollTo(target) {
      const element = typeof target === 'string' 
        ? document.querySelector(target) 
        : target;
      
      if (!element) return;

      const headerOffset = parseInt(element.dataset.offset, 10) || 
        document.querySelector('[data-scroll-offset]')?.dataset.scrollOffset || 80;
      
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        window.scrollTo(0, offsetPosition);
      } else {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    },

    // Programmatic scroll method
    scrollToElement(selector, options = {}) {
      const element = document.querySelector(selector);
      if (!element) return;

      const headerOffset = options.offset || 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: options.behavior || 'smooth'
      });
    }
  };

  // ============================================
  // 4. MOBILE MENU TOGGLE
  // ============================================
  const MobileMenu = {
    menu: null,
    toggle: null,
    closeBtn: null,
    overlay: null,
    focusableElements: null,
    lastFocusedElement: null,
    isOpen: false,

    init(options = {}) {
      this.menu = document.querySelector(options.menuSelector || '[data-mobile-menu]');
      this.toggle = document.querySelector(options.toggleSelector || '[data-menu-toggle]');
      this.closeBtn = document.querySelector(options.closeSelector || '[data-menu-close]');
      
      if (!this.menu || !this.toggle) return;

      this.createOverlay();
      this.bindEvents();
      this.setupFocusTrap();
    },

    createOverlay() {
      this.overlay = document.createElement('div');
      this.overlay.className = 'mobile-menu-overlay';
      this.overlay.setAttribute('aria-hidden', 'true');
      this.overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0);
        visibility: hidden;
        transition: background 0.3s ease, visibility 0.3s ease;
        z-index: 998;
      `;
      document.body.appendChild(this.overlay);
    },

    bindEvents() {
      // Toggle button
      this.toggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMenu();
      });

      // Close button
      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.closeMenu();
        });
      }

      // Overlay click
      this.overlay.addEventListener('click', () => this.closeMenu());

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeMenu();
        }
      });

      // Handle menu links
      const links = this.menu.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', () => {
          if (link.getAttribute('href')?.startsWith('#')) {
            setTimeout(() => this.closeMenu(), 150);
          }
        });
      });

      // Window resize
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (window.innerWidth > 1024 && this.isOpen) {
            this.closeMenu();
          }
        }, 250);
      });
    },

    setupFocusTrap() {
      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
      ].join(', ');

      this.focusableElements = this.menu.querySelectorAll(focusableSelectors);
    },

    toggleMenu() {
      if (this.isOpen) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    },

    openMenu() {
      this.lastFocusedElement = document.activeElement;
      this.isOpen = true;

      // Menu styles
      this.menu.setAttribute('aria-hidden', 'false');
      this.menu.classList.add('is-open');
      document.body.classList.add('menu-open');
      document.body.style.overflow = 'hidden';

      // Overlay
      this.overlay.style.visibility = 'visible';
      this.overlay.style.background = 'rgba(0, 0, 0, 0.5)';

      // Toggle button
      this.toggle.setAttribute('aria-expanded', 'true');

      // Focus first element
      setTimeout(() => {
        const firstFocusable = this.focusableElements[0];
        if (firstFocusable) firstFocusable.focus();
      }, 100);

      // Dispatch event
      window.dispatchEvent(new CustomEvent('mobileMenu:open'));
    },

    closeMenu() {
      if (!this.isOpen) return;

      this.isOpen = false;

      // Menu styles
      this.menu.setAttribute('aria-hidden', 'true');
      this.menu.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';

      // Overlay
      this.overlay.style.background = 'rgba(0, 0, 0, 0)';
      setTimeout(() => {
        if (!this.isOpen) this.overlay.style.visibility = 'hidden';
      }, 300);

      // Toggle button
      this.toggle.setAttribute('aria-expanded', 'false');

      // Restore focus
      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus();
      }

      // Dispatch event
      window.dispatchEvent(new CustomEvent('mobileMenu:close'));
    },

    destroy() {
      this.closeMenu();
      if (this.overlay && this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
      }
    }
  };

  // ============================================
  // 5. LOADING SKELETON SCREENS
  // ============================================
  const SkeletonLoader = {
    templates: {
      card: `
        <div class="skeleton skeleton-card">
          <div class="skeleton-header"></div>
          <div class="skeleton-content">
            <div class="skeleton-line"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
          </div>
        </div>
      `,
      list: `
        <div class="skeleton skeleton-list">
          <div class="skeleton-item">
            <div class="skeleton-avatar"></div>
            <div class="skeleton-lines">
              <div class="skeleton-line"></div>
              <div class="skeleton-line short"></div>
            </div>
          </div>
        </div>
      `,
      text: `
        <div class="skeleton skeleton-text">
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
        </div>
      `,
      image: `
        <div class="skeleton skeleton-image">
          <div class="skeleton-img"></div>
          <div class="skeleton-content">
            <div class="skeleton-line"></div>
            <div class="skeleton-line short"></div>
          </div>
        </div>
      `,
      table: `
        <div class="skeleton skeleton-table">
          <div class="skeleton-row header">
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
          </div>
          <div class="skeleton-row">
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
            <div class="skeleton-cell"></div>
          </div>
        </div>
      `
    },

    show(container, type = 'card', count = 1) {
      const containerEl = typeof container === 'string' 
        ? document.querySelector(container) 
        : container;
      
      if (!containerEl) return;

      const template = this.templates[type] || this.templates.card;
      const skeletons = Array(count).fill(template).join('');
      
      const wrapper = document.createElement('div');
      wrapper.className = `skeleton-wrapper skeleton-${type}-wrapper`;
      wrapper.innerHTML = skeletons;
      wrapper.dataset.skeletonContainer = 'true';

      // Preserve container's min-height
      const computedStyle = window.getComputedStyle(containerEl);
      if (computedStyle.minHeight === '0px') {
        containerEl.style.minHeight = '200px';
      }

      containerEl.appendChild(wrapper);
      
      // Add loading class to container
      containerEl.classList.add('is-loading');

      return wrapper;
    },

    hide(container) {
      const containerEl = typeof container === 'string' 
        ? document.querySelector(container) 
        : container;
      
      if (!containerEl) return;

      const skeletons = containerEl.querySelectorAll('[data-skeleton-container]');
      skeletons.forEach(skeleton => {
        skeleton.style.opacity = '0';
        skeleton.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
          if (skeleton.parentNode) {
            skeleton.parentNode.removeChild(skeleton);
          }
        }, 300);
      });

      containerEl.classList.remove('is-loading');
    },

    // Auto-initialize skeletons on page load
    autoInit() {
      const skeletonContainers = document.querySelectorAll('[data-skeleton]');
      skeletonContainers.forEach(container => {
        const type = container.dataset.skeleton || 'card';
        const count = parseInt(container.dataset.skeletonCount, 10) || 1;
        this.show(container, type, count);
      });
    }
  };

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  const Utils = {
    // Throttle function
    throttle(func, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    // Debounce function
    debounce(func, wait) {
      let timeout;
      return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    },

    // Check if element is in viewport
    isInViewport(element, offset = 0) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= -offset &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    },

    // Prefers reduced motion
    prefersReducedMotion() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  };

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  const HeaderScroll = {
    header: null,
    scrollThreshold: 50,

    init(selector = '[data-header]') {
      this.header = document.querySelector(selector);
      if (!this.header) return;

      this.handleScroll = Utils.throttle(this.handleScroll.bind(this), 100);
      window.addEventListener('scroll', this.handleScroll);
      this.handleScroll();
    },

    handleScroll() {
      const scrollY = window.pageYOffset;
      
      if (scrollY > this.scrollThreshold) {
        this.header.classList.add('is-scrolled');
      } else {
        this.header.classList.remove('is-scrolled');
      }
    }
  };

  // ============================================
  // LAZY LOADING IMAGES
  // ============================================
  const LazyLoader = {
    observer: null,

    init(selector = '[data-lazy]') {
      const images = document.querySelectorAll(selector);
      if (!images.length) return;

      if ('IntersectionObserver' in window) {
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.loadImage(entry.target);
              this.observer.unobserve(entry.target);
            }
          });
        }, {
          rootMargin: '50px 0px'
        });

        images.forEach(img => this.observer.observe(img));
      } else {
        // Fallback
        images.forEach(img => this.loadImage(img));
      }
    },

    loadImage(img) {
      const src = img.dataset.src;
      const srcset = img.dataset.srcset;
      
      if (src) {
        img.src = src;
        img.removeAttribute('data-src');
      }
      
      if (srcset) {
        img.srcset = srcset;
        img.removeAttribute('data-srcset');
      }

      img.classList.add('is-loaded');
    }
  };

  // ============================================
  // ACCORDION COMPONENT
  // ============================================
  const Accordion = {
    init(container = document) {
      const triggers = container.querySelectorAll('[data-accordion-trigger]');
      
      triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = trigger.getAttribute('aria-controls');
          const content = document.getElementById(targetId);
          
          if (!content) return;

          const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
          
          // Close others if this is part of a group
          const group = trigger.closest('[data-accordion-group]');
          if (group) {
            group.querySelectorAll('[data-accordion-trigger]').forEach(otherTrigger => {
              if (otherTrigger !== trigger) {
                this.close(otherTrigger);
              }
            });
          }

          if (isExpanded) {
            this.close(trigger);
          } else {
            this.open(trigger);
          }
        });
      });
    },

    open(trigger) {
      const targetId = trigger.getAttribute('aria-controls');
      const content = document.getElementById(targetId);
      
      trigger.setAttribute('aria-expanded', 'true');
      content.setAttribute('aria-hidden', 'false');
      content.style.maxHeight = content.scrollHeight + 'px';
      content.classList.add('is-open');
    },

    close(trigger) {
      const targetId = trigger.getAttribute('aria-controls');
      const content = document.getElementById(targetId);
      
      trigger.setAttribute('aria-expanded', 'false');
      content.setAttribute('aria-hidden', 'true');
      content.style.maxHeight = '0px';
      content.classList.remove('is-open');
    }
  };

  // ============================================
  // TABS COMPONENT
  // ============================================
  const Tabs = {
    init(container = document) {
      const tabLists = container.querySelectorAll('[data-tabs]');
      
      tabLists.forEach(tabList => {
        const tabs = tabList.querySelectorAll('[data-tab]');
        const panels = tabList.querySelectorAll('[data-tab-panel]');

        tabs.forEach(tab => {
          tab.addEventListener('click', () => {
            const targetPanel = tab.dataset.tab;

            // Deactivate all tabs
            tabs.forEach(t => {
              t.setAttribute('aria-selected', 'false');
              t.classList.remove('is-active');
            });

            // Hide all panels
            panels.forEach(p => {
              p.setAttribute('aria-hidden', 'true');
              p.classList.remove('is-active');
            });

            // Activate selected tab
            tab.setAttribute('aria-selected', 'true');
            tab.classList.add('is-active');

            // Show target panel
            const panel = tabList.querySelector(`[data-tab-panel="${targetPanel}"]`);
            if (panel) {
              panel.setAttribute('aria-hidden', 'false');
              panel.classList.add('is-active');
            }
          });
        });
      });
    }
  };

  // ============================================
  // FORM VALIDATION
  // ============================================
  const FormValidation = {
    init(formSelector = 'form[data-validate]') {
      const forms = document.querySelectorAll(formSelector);
      
      forms.forEach(form => {
        form.addEventListener('submit', (e) => {
          if (!this.validateForm(form)) {
            e.preventDefault();
          }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          input.addEventListener('blur', () => this.validateField(input));
          input.addEventListener('input', () => this.clearError(input));
        });
      });
    },

    validateForm(form) {
      const inputs = form.querySelectorAll('[required], [data-validate]');
      let isValid = true;

      inputs.forEach(input => {
        if (!this.validateField(input)) {
          isValid = false;
        }
      });

      return isValid;
    },

    validateField(field) {
      const value = field.value.trim();
      const type = field.type;
      let isValid = true;
      let message = '';

      // Required check
      if (field.required && !value) {
        isValid = false;
        message = field.dataset.errorRequired || 'This field is required';
      }

      // Pattern validation
      if (isValid && field.dataset.pattern) {
        const pattern = new RegExp(field.dataset.pattern);
        if (!pattern.test(value)) {
          isValid = false;
          message = field.dataset.errorPattern || 'Please enter a valid value';
        }
      }

      // Email validation
      if (isValid && type === 'email' && value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          isValid = false;
          message = field.dataset.errorEmail || 'Please enter a valid email';
        }
      }

      // Min length
      if (isValid && field.minLength && value.length < field.minLength) {
        isValid = false;
        message = field.dataset.errorMinlength || `Minimum ${field.minLength} characters required`;
      }

      if (isValid) {
        this.clearError(field);
      } else {
        this.showError(field, message);
      }

      return isValid;
    },

    showError(field, message) {
      field.classList.add('has-error');
      field.setAttribute('aria-invalid', 'true');

      let errorEl = field.parentNode.querySelector('.error-message');
      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'error-message';
        errorEl.setAttribute('role', 'alert');
        field.parentNode.appendChild(errorEl);
      }
      errorEl.textContent = message;
    },

    clearError(field) {
      field.classList.remove('has-error');
      field.setAttribute('aria-invalid', 'false');

      const errorEl = field.parentNode.querySelector('.error-message');
      if (errorEl) {
        errorEl.remove();
      }
    }
  };

  // ============================================
  // MAIN INITIALIZATION
  // ============================================
  const DCTowDirectory = {
    init() {
      // Initialize all modules
      ScrollAnimations.init();
      CounterAnimation.init();
      SmoothScroll.init();
      MobileMenu.init();
      HeaderScroll.init();
      LazyLoader.init();
      Accordion.init();
      Tabs.init();
      FormValidation.init();
      
      // Auto-show skeletons where needed
      SkeletonLoader.autoInit();

      console.log('🚛 DC Tow Directory: All enhancements loaded');
    },

    // Expose modules for external access
    modules: {
      ScrollAnimations,
      CounterAnimation,
      SmoothScroll,
      MobileMenu,
      SkeletonLoader,
      HeaderScroll,
      LazyLoader,
      Accordion,
      Tabs,
      FormValidation,
      Utils
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => DCTowDirectory.init());
  } else {
    DCTowDirectory.init();
  }

  // Expose to global scope for debugging
  window.DCTowDirectory = DCTowDirectory;

})();
