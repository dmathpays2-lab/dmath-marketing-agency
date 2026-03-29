/**
 * DC Tow Directory - Animations Module
 * Scroll reveal, counter animations, and smooth scroll functionality
 * Vanilla JavaScript, no dependencies
 */

(function() {
  'use strict';

  /**
   * ============================================
   * SCROLL REVEAL ANIMATIONS
   * ============================================
   */
  
  const ScrollReveal = {
    // Default configuration
    config: {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      animationClass: 'animate-fade-up',
      visibleClass: 'is-visible'
    },

    // Initialize scroll reveal
    init(selector = '[data-reveal]') {
      const elements = document.querySelectorAll(selector);
      
      if (!elements.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay;
            
            // Apply stagger delay if data-delay attribute exists
            if (delay) {
              entry.target.style.transitionDelay = `${delay}ms`;
            }
            
            // Add visible class to trigger animation
            entry.target.classList.add(this.config.visibleClass);
            
            // Stop observing once animated
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: this.config.threshold,
        rootMargin: this.config.rootMargin
      });

      elements.forEach(el => {
        el.classList.add(this.config.animationClass);
        observer.observe(el);
      });
    }
  };

  /**
   * ============================================
   * COUNTER ANIMATION
   * ============================================
   * Animates numbers counting up from 0 to target value
   */
  
  const CounterAnimation = {
    config: {
      duration: 2000, // Animation duration in ms
      easing: 'easeOutQuart'
    },

    // Easing functions
    easings: {
      easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
      easeOutExpo: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
      easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    },

    // Parse value from string (handles "15 Min", "4.9", "50,000+", etc.)
    parseValue(text) {
      const match = text.match(/[\d,.]+/);
      if (!match) return { value: 0, suffix: '', prefix: '' };
      
      const numStr = match[0].replace(/,/g, '');
      const isDecimal = numStr.includes('.');
      const value = parseFloat(numStr);
      
      // Extract prefix/suffix
      const prefix = text.substring(0, text.indexOf(match[0]));
      const suffix = text.substring(text.indexOf(match[0]) + match[0].length);
      
      return { value, prefix, suffix, isDecimal };
    },

    // Format number with commas
    formatNumber(num, isDecimal) {
      if (isDecimal) {
        return num.toFixed(1);
      }
      return Math.round(num).toLocaleString();
    },

    // Animate a single counter
    animate(element) {
      const originalText = element.textContent;
      const { value, prefix, suffix, isDecimal } = this.parseValue(originalText);
      
      if (value === 0) return;

      const startTime = performance.now();
      const duration = this.config.duration;
      const easeFn = this.easings[this.config.easing];

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeFn(progress);
        
        const currentValue = easedProgress * value;
        element.textContent = `${prefix}${this.formatNumber(currentValue, isDecimal)}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          // Ensure final value is exact
          element.textContent = originalText;
        }
      };

      requestAnimationFrame(updateCounter);
    },

    // Initialize counters
    init(selector = '[data-counter]') {
      const counters = document.querySelectorAll(selector);
      
      if (!counters.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      counters.forEach(counter => observer.observe(counter));
    }
  };

  /**
   * ============================================
   * SMOOTH SCROLL
   * ============================================
   * Smooth scrolling for anchor links
   */
  
  const SmoothScroll = {
    config: {
      duration: 800,
      offset: 80, // Offset for fixed header
      easing: 'easeInOutCubic'
    },

    easings: {
      easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    },

    // Scroll to element
    scrollTo(target, offset = this.config.offset) {
      const element = typeof target === 'string' 
        ? document.querySelector(target) 
        : target;
      
      if (!element) return;

      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = this.config.duration;
      const easeFn = this.easings[this.config.easing];
      const startTime = performance.now();

      const scroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeFn(progress);
        
        window.scrollTo(0, startPosition + distance * easedProgress);

        if (progress < 1) {
          requestAnimationFrame(scroll);
        }
      };

      requestAnimationFrame(scroll);
    },

    // Initialize smooth scroll for anchor links
    init() {
      document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;

        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          this.scrollTo(targetElement);
          
          // Update URL without jumping
          history.pushState(null, null, targetId);
        }
      });
    }
  };

  /**
   * ============================================
   * PARALLAX EFFECT
   * ============================================
   * Subtle parallax for hero sections
   */
  
  const ParallaxEffect = {
    init(selector = '[data-parallax]') {
      const elements = document.querySelectorAll(selector);
      if (!elements.length) return;

      let ticking = false;

      const updateParallax = () => {
        const scrollY = window.pageYOffset;
        
        elements.forEach(el => {
          const speed = parseFloat(el.dataset.parallax) || 0.5;
          const yPos = scrollY * speed;
          el.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
      };

      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      }, { passive: true });
    }
  };

  /**
   * ============================================
   * INITIALIZATION
   * ============================================
   */
  
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initialize);
    } else {
      initialize();
    }
  }

  function initialize() {
    // Initialize all animation modules
    ScrollReveal.init();
    CounterAnimation.init();
    SmoothScroll.init();
    ParallaxEffect.init();

    // Log initialization (remove in production)
    console.log('🚗 DC Tow Directory - Animations initialized');
  }

  // Auto-initialize
  init();

  // Expose API for manual control
  window.DCTowAnimations = {
    ScrollReveal,
    CounterAnimation,
    SmoothScroll,
    ParallaxEffect,
    refresh() {
      ScrollReveal.init();
      CounterAnimation.init();
    }
  };

})();
