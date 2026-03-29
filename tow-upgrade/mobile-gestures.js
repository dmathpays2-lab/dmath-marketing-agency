/**
 * DC Tow Directory - Mobile Gestures & Touch Interactions
 * Native app-like gesture support
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = {
    // Swipe detection
    swipeThreshold: 50,        // Minimum distance for swipe
    swipeTimeThreshold: 300,   // Maximum time for swipe (ms)
    
    // Double tap prevention
    doubleTapDelay: 300,       // Time window for double tap
    
    // Touch feedback
    touchFeedbackClass: 'touch-active',
    touchFeedbackDelay: 100,
    
    // Viewport height fix
    vhCheckInterval: 100,
    
    // Pull to refresh
    pullToRefreshThreshold: 80
  };

  // ============================================
  // VIEWPORT HEIGHT FIX (100vh mobile issue)
  // ============================================
  function fixViewportHeight() {
    // Set CSS custom property for real viewport height
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    // Initial set
    setVh();
    
    // Update on resize and orientation change
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', () => {
      setTimeout(setVh, 100);
    });
    
    // Use resize observer for more accurate updates
    if ('ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(() => setVh());
      resizeObserver.observe(document.documentElement);
    }
  }

  // ============================================
  // SWIPE DETECTION CLASS
  // ============================================
  class SwipeDetector {
    constructor(element, options = {}) {
      this.element = element;
      this.options = { ...CONFIG, ...options };
      
      this.startX = 0;
      this.startY = 0;
      this.startTime = 0;
      this.isTracking = false;
      
      this.bindEvents();
    }
    
    bindEvents() {
      // Touch events
      this.element.addEventListener('touchstart', this.handleStart.bind(this), { passive: true });
      this.element.addEventListener('touchmove', this.handleMove.bind(this), { passive: true });
      this.element.addEventListener('touchend', this.handleEnd.bind(this), { passive: true });
      this.element.addEventListener('touchcancel', this.handleCancel.bind(this), { passive: true });
      
      // Mouse events for desktop testing
      this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
      document.addEventListener('mousemove', this.handleMouseMove.bind(this));
      document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }
    
    handleStart(e) {
      const touch = e.touches[0];
      this.startX = touch.clientX;
      this.startY = touch.clientY;
      this.startTime = Date.now();
      this.isTracking = true;
      
      // Dispatch custom event
      this.element.dispatchEvent(new CustomEvent('swipestart', { 
        detail: { x: this.startX, y: this.startY }
      }));
    }
    
    handleMouseDown(e) {
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.startTime = Date.now();
      this.isTracking = true;
    }
    
    handleMove(e) {
      if (!this.isTracking) return;
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - this.startX;
      const deltaY = touch.clientY - this.startY;
      
      // Dispatch drag event for real-time tracking
      this.element.dispatchEvent(new CustomEvent('swipemove', {
        detail: { deltaX, deltaY, x: touch.clientX, y: touch.clientY }
      }));
    }
    
    handleMouseMove(e) {
      if (!this.isTracking) return;
      
      const deltaX = e.clientX - this.startX;
      const deltaY = e.clientY - this.startY;
      
      this.element.dispatchEvent(new CustomEvent('swipemove', {
        detail: { deltaX, deltaY, x: e.clientX, y: e.clientY }
      }));
    }
    
    handleEnd(e) {
      if (!this.isTracking) return;
      
      const touch = e.changedTouches[0];
      this.calculateSwipe(touch.clientX, touch.clientY);
      this.isTracking = false;
    }
    
    handleMouseUp(e) {
      if (!this.isTracking) return;
      
      this.calculateSwipe(e.clientX, e.clientY);
      this.isTracking = false;
    }
    
    handleCancel() {
      this.isTracking = false;
    }
    
    calculateSwipe(endX, endY) {
      const deltaX = endX - this.startX;
      const deltaY = endY - this.startY;
      const deltaTime = Date.now() - this.startTime;
      
      // Check if within time threshold
      if (deltaTime > this.options.swipeTimeThreshold) return;
      
      // Calculate absolute distances
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      
      // Determine swipe direction
      let direction = null;
      
      if (absX > absY && absX > this.options.swipeThreshold) {
        direction = deltaX > 0 ? 'right' : 'left';
      } else if (absY > absX && absY > this.options.swipeThreshold) {
        direction = deltaY > 0 ? 'down' : 'up';
      }
      
      if (direction) {
        this.element.dispatchEvent(new CustomEvent('swipe', {
          detail: { 
            direction, 
            deltaX, 
            deltaY, 
            distance: Math.max(absX, absY),
            duration: deltaTime
          }
        }));
        
        // Dispatch specific direction event
        this.element.dispatchEvent(new CustomEvent(`swipe${direction}`, {
          detail: { deltaX, deltaY, distance: Math.max(absX, absY) }
        }));
      }
    }
  }

  // ============================================
  // CAROUSEL SWIPE INTEGRATION
  // ============================================
  function initCarousels() {
    const carousels = document.querySelectorAll('.carousel, .testimonials-slider, .blog-slider');
    
    carousels.forEach(carousel => {
      const swipeDetector = new SwipeDetector(carousel);
      let currentSlide = 0;
      const slides = carousel.querySelectorAll('.carousel-slide, .testimonial-card, .blog-card');
      const totalSlides = slides.length;
      
      if (totalSlides <= 1) return;
      
      // Handle swipe left (next)
      carousel.addEventListener('swipeleft', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(carousel, currentSlide);
      });
      
      // Handle swipe right (previous)
      carousel.addEventListener('swiperight', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(carousel, currentSlide);
      });
      
      // Add drag visual feedback
      let isDragging = false;
      carousel.addEventListener('swipestart', () => { isDragging = true; });
      carousel.addEventListener('swipemove', (e) => {
        if (!isDragging) return;
        const { deltaX } = e.detail;
        carousel.style.transform = `translateX(${deltaX * 0.3}px)`;
      });
      carousel.addEventListener('touchend', () => {
        isDragging = false;
        carousel.style.transform = '';
      });
    });
  }
  
  function goToSlide(carousel, index) {
    const track = carousel.querySelector('.carousel-track') || carousel;
    const slideWidth = carousel.offsetWidth;
    
    track.style.transition = 'transform 0.3s ease';
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    
    // Update dots
    const dots = carousel.querySelectorAll('.carousel-dot, .slider-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    // Reset transition after animation
    setTimeout(() => {
      track.style.transition = '';
    }, 300);
  }

  // ============================================
  // DOUBLE-TAP PREVENTION
  // ============================================
  function preventDoubleTap() {
    let lastTap = 0;
    
    document.addEventListener('touchend', (e) => {
      const currentTime = Date.now();
      const tapLength = currentTime - lastTap;
      
      if (tapLength < CONFIG.doubleTapDelay && tapLength > 0) {
        e.preventDefault();
        e.stopPropagation();
      }
      
      lastTap = currentTime;
    }, { passive: false });
  }

  // ============================================
  // TOUCH FEEDBACK (ACTIVE STATES)
  // ============================================
  function initTouchFeedback() {
    const touchElements = document.querySelectorAll(
      'button, .btn, a, .card, .service-card, .location-card, .testimonial-card, .blog-card'
    );
    
    touchElements.forEach(el => {
      // Add touch start feedback
      el.addEventListener('touchstart', function() {
        this.classList.add(CONFIG.touchFeedbackClass);
      }, { passive: true });
      
      // Remove on touch end/cancel
      const removeFeedback = () => {
        setTimeout(() => {
          el.classList.remove(CONFIG.touchFeedbackClass);
        }, CONFIG.touchFeedbackDelay);
      };
      
      el.addEventListener('touchend', removeFeedback, { passive: true });
      el.addEventListener('touchcancel', removeFeedback, { passive: true });
      el.addEventListener('touchmove', removeFeedback, { passive: true });
    });
  }

  // ============================================
  // PULL-TO-REFRESH PREVENTION
  // ============================================
  function preventPullToRefresh() {
    let startY = 0;
    let startX = 0;
    
    document.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
      const y = e.touches[0].clientY;
      const x = e.touches[0].clientX;
      const deltaY = y - startY;
      const deltaX = x - startX;
      
      // Check if scrolling vertically at top of page
      const isAtTop = window.scrollY === 0;
      const isVertical = Math.abs(deltaY) > Math.abs(deltaX);
      
      // Prevent pull-to-refresh when at top and pulling down
      if (isAtTop && isVertical && deltaY > 0) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  // ============================================
  // HAMBURGER MENU TOGGLE
  // ============================================
  function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (!hamburger || !mobileNav) return;
    
    let isOpen = false;
    
    hamburger.addEventListener('click', () => {
      isOpen = !isOpen;
      hamburger.classList.toggle('active', isOpen);
      mobileNav.classList.toggle('active', isOpen);
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        isOpen = false;
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Close on swipe left
    const swipeDetector = new SwipeDetector(mobileNav);
    mobileNav.addEventListener('swipeleft', () => {
      if (isOpen) {
        isOpen = false;
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ============================================
  // HORIZONTAL SCROLL SNAP
  // ============================================
  function initScrollSnap() {
    const scrollContainers = document.querySelectorAll(
      '.services-grid, .locations-grid, .testimonials-grid, .blog-grid'
    );
    
    scrollContainers.forEach(container => {
      // Check if container is horizontally scrollable on mobile
      const isMobile = window.innerWidth < 640;
      
      if (isMobile) {
        container.style.display = 'flex';
        container.style.overflowX = 'auto';
        container.style.scrollSnapType = 'x mandatory';
        container.style.scrollbarWidth = 'none';
        container.style.msOverflowStyle = 'none';
        
        const cards = container.children;
        Array.from(cards).forEach(card => {
          card.style.flex = '0 0 85%';
          card.style.scrollSnapAlign = 'start';
        });
        
        // Hide scrollbar
        const style = document.createElement('style');
        style.textContent = `
          .services-grid::-webkit-scrollbar,
          .locations-grid::-webkit-scrollbar,
          .testimonials-grid::-webkit-scrollbar,
          .blog-grid::-webkit-scrollbar {
            display: none;
          }
        `;
        document.head.appendChild(style);
      }
    });
  }

  // ============================================
  // SCROLL VELOCITY DETECTION
  // ============================================
  function initScrollVelocity() {
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    let velocity = 0;
    let rafId = null;
    
    function updateVelocity() {
      const currentY = window.scrollY;
      const currentTime = Date.now();
      const deltaY = currentY - lastScrollY;
      const deltaTime = currentTime - lastTime;
      
      if (deltaTime > 0) {
        velocity = deltaY / deltaTime;
      }
      
      // Dispatch velocity event
      document.dispatchEvent(new CustomEvent('scrollvelocity', {
        detail: { velocity, direction: velocity > 0 ? 'down' : 'up' }
      }));
      
      lastScrollY = currentY;
      lastTime = currentTime;
      
      rafId = requestAnimationFrame(updateVelocity);
    }
    
    // Start/stop based on visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && rafId) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(updateVelocity);
      }
    });
    
    rafId = requestAnimationFrame(updateVelocity);
  }

  // ============================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ============================================
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll(
      '.service-card, .location-card, .testimonial-card, .blog-card'
    );
    
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
    
    // Add CSS for in-view state
    const style = document.createElement('style');
    style.textContent = `
      .in-view {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ============================================
  // INITIALIZE ALL
  // ============================================
  function init() {
    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    
    // Always run viewport fix
    fixViewportHeight();
    
    if (isTouchDevice) {
      preventDoubleTap();
      preventPullToRefresh();
      initTouchFeedback();
    }
    
    // Run on all devices
    initCarousels();
    initHamburgerMenu();
    initScrollSnap();
    initScrollVelocity();
    initScrollAnimations();
    
    // Expose SwipeDetector globally for custom use
    window.SwipeDetector = SwipeDetector;
    
    console.log('[DC Tow] Mobile gestures initialized');
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-init on dynamic content changes (optional)
  window.reinitMobileGestures = init;

})();
