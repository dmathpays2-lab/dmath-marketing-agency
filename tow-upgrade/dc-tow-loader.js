/**
 * DC Tow Directory - Loader Module
 * Skeleton loaders, loading states, and content transitions
 * Vanilla JavaScript, no dependencies
 */

(function() {
  'use strict';

  /**
   * ============================================
   * SKELETON LOADER SYSTEM
   * ============================================
   * CSS-injected skeleton screens with fade transitions
   */
  
  const SkeletonLoader = {
    // CSS styles for skeleton elements
    styles: `
      /* Skeleton Base Styles */
      .skeleton {
        background: linear-gradient(
          90deg,
          #f0f0f0 25%,
          #e0e0e0 50%,
          #f0f0f0 75%
        );
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s ease-in-out infinite;
        border-radius: 4px;
      }

      @keyframes skeleton-loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      /* Skeleton Variants */
      .skeleton-text {
        height: 1em;
        margin-bottom: 0.5em;
      }

      .skeleton-text--large {
        height: 1.5em;
        width: 75%;
      }

      .skeleton-text--small {
        height: 0.875em;
        width: 50%;
      }

      .skeleton-title {
        height: 2em;
        width: 60%;
        margin-bottom: 1em;
      }

      .skeleton-circle {
        border-radius: 50%;
        width: 60px;
        height: 60px;
      }

      .skeleton-image {
        width: 100%;
        padding-bottom: 56.25%; /* 16:9 aspect ratio */
        border-radius: 8px;
      }

      .skeleton-card {
        padding: 1.5rem;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      }

      .skeleton-card__header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .skeleton-card__content {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      /* Content Wrapper States */
      .content-wrapper {
        opacity: 0;
        transition: opacity 0.4s ease-out;
      }

      .content-wrapper.is-loaded {
        opacity: 1;
      }

      /* Skeleton Container */
      .skeleton-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        background: inherit;
      }

      .skeleton-wrapper {
        position: relative;
      }

      /* Fade out skeletons */
      .skeleton-fade-out {
        animation: skeleton-fade-out 0.4s ease-out forwards;
      }

      @keyframes skeleton-fade-out {
        to {
          opacity: 0;
          visibility: hidden;
        }
      }

      /* Service Card Skeleton */
      .skeleton-service-card {
        display: flex;
        flex-direction: column;
        padding: 1.5rem;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        min-height: 200px;
      }

      .skeleton-service-card__icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        margin-bottom: 1rem;
      }

      .skeleton-service-card__title {
        height: 1.5rem;
        width: 70%;
        margin-bottom: 0.75rem;
      }

      .skeleton-service-card__text {
        height: 1rem;
        width: 100%;
        margin-bottom: 0.5rem;
      }

      .skeleton-service-card__text:last-child {
        width: 60%;
      }

      /* Stat Card Skeleton */
      .skeleton-stat-card {
        text-align: center;
        padding: 1.5rem;
        background: #fff;
        border-radius: 12px;
      }

      .skeleton-stat-card__number {
        height: 3rem;
        width: 80%;
        margin: 0 auto 0.5rem;
      }

      .skeleton-stat-card__label {
        height: 1rem;
        width: 60%;
        margin: 0 auto;
      }

      /* Location Card Skeleton */
      .skeleton-location-card {
        background: #fff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      }

      .skeleton-location-card__image {
        width: 100%;
        padding-bottom: 60%;
      }

      .skeleton-location-card__content {
        padding: 1rem;
      }

      .skeleton-location-card__title {
        height: 1.25rem;
        width: 70%;
        margin-bottom: 0.5rem;
      }

      .skeleton-location-card__subtitle {
        height: 0.875rem;
        width: 50%;
      }
    `,

    // Inject CSS into document
    injectStyles() {
      if (document.getElementById('skeleton-styles')) return;
      
      const styleSheet = document.createElement('style');
      styleSheet.id = 'skeleton-styles';
      styleSheet.textContent = this.styles;
      document.head.appendChild(styleSheet);
    },

    // Create skeleton element
    create(type = 'text', count = 1) {
      const elements = [];
      
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = `skeleton skeleton-${type}`;
        elements.push(el);
      }
      
      return count === 1 ? elements[0] : elements;
    },

    // Create service card skeleton
    createServiceCard() {
      const card = document.createElement('div');
      card.className = 'skeleton-service-card';
      card.innerHTML = `
        <div class="skeleton skeleton-service-card__icon"></div>
        <div class="skeleton skeleton-service-card__title"></div>
        <div class="skeleton skeleton-service-card__text"></div>
        <div class="skeleton skeleton-service-card__text"></div>
        <div class="skeleton skeleton-service-card__text"></div>
      `;
      return card;
    },

    // Create stat card skeleton
    createStatCard() {
      const card = document.createElement('div');
      card.className = 'skeleton-stat-card';
      card.innerHTML = `
        <div class="skeleton skeleton-stat-card__number"></div>
        <div class="skeleton skeleton-stat-card__label"></div>
      `;
      return card;
    },

    // Create location card skeleton
    createLocationCard() {
      const card = document.createElement('div');
      card.className = 'skeleton-location-card';
      card.innerHTML = `
        <div class="skeleton skeleton-location-card__image"></div>
        <div class="skeleton-location-card__content">
          <div class="skeleton skeleton-location-card__title"></div>
          <div class="skeleton skeleton-location-card__subtitle"></div>
        </div>
      `;
      return card;
    },

    // Show skeletons in a container
    show(container, type = 'service', count = 6) {
      const wrapper = typeof container === 'string' 
        ? document.querySelector(container) 
        : container;
      
      if (!wrapper) return null;

      // Create skeleton container
      const skeletonContainer = document.createElement('div');
      skeletonContainer.className = 'skeleton-container';
      skeletonContainer.dataset.skeletonContainer = 'true';

      // Create grid for skeletons
      const grid = document.createElement('div');
      grid.className = 'skeleton-grid';
      grid.style.cssText = `
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      `;

      // Generate skeletons based on type
      for (let i = 0; i < count; i++) {
        let skeleton;
        switch (type) {
          case 'service':
            skeleton = this.createServiceCard();
            break;
          case 'stat':
            skeleton = this.createStatCard();
            break;
          case 'location':
            skeleton = this.createLocationCard();
            break;
          case 'card':
            skeleton = this.createServiceCard();
            break;
          default:
            skeleton = this.create('text');
        }
        grid.appendChild(skeleton);
      }

      skeletonContainer.appendChild(grid);
      
      // Make wrapper positioned if not already
      const wrapperStyle = window.getComputedStyle(wrapper);
      if (wrapperStyle.position === 'static') {
        wrapper.style.position = 'relative';
      }
      
      wrapper.appendChild(skeletonContainer);
      
      return skeletonContainer;
    },

    // Hide skeletons with fade out
    hide(container) {
      const wrapper = typeof container === 'string' 
        ? document.querySelector(container) 
        : container;
      
      if (!wrapper) return;

      const skeletonContainer = wrapper.querySelector('[data-skeleton-container]');
      if (!skeletonContainer) return;

      skeletonContainer.classList.add('skeleton-fade-out');
      
      setTimeout(() => {
        skeletonContainer.remove();
      }, 400);
    },

    // Remove all skeletons
    hideAll() {
      document.querySelectorAll('[data-skeleton-container]').forEach(el => {
        el.classList.add('skeleton-fade-out');
        setTimeout(() => el.remove(), 400);
      });
    }
  };

  /**
   * ============================================
   * CONTENT LOADER
   * ============================================
   * Manage loading states and content transitions
   */
  
  const ContentLoader = {
    // Track loading states
    loaders: new Map(),

    // Initialize loader for a container
    init(containerSelector, options = {}) {
      const container = document.querySelector(containerSelector);
      if (!container) return;

      const config = {
        skeletonType: 'service',
        skeletonCount: 6,
        simulateDelay: false,
        delayMin: 500,
        delayMax: 1500,
        ...options
      };

      // Inject styles if not already
      SkeletonLoader.injectStyles();

      // Show skeletons
      const skeletonContainer = SkeletonLoader.show(container, 
        config.skeletonType, 
        config.skeletonCount
      );

      // Store loader reference
      this.loaders.set(containerSelector, {
        container,
        skeletonContainer,
        config
      });

      // Simulate loading if enabled (for demo)
      if (config.simulateDelay) {
        const delay = Math.random() * (config.delayMax - config.delayMin) + config.delayMin;
        setTimeout(() => {
          this.complete(containerSelector);
        }, delay);
      }

      return {
        complete: () => this.complete(containerSelector),
        fail: () => this.fail(containerSelector)
      };
    },

    // Mark loading as complete
    complete(containerSelector) {
      const loader = this.loaders.get(containerSelector);
      if (!loader) return;

      const { container, skeletonContainer } = loader;

      // Fade out skeletons
      if (skeletonContainer) {
        skeletonContainer.classList.add('skeleton-fade-out');
        
        // Show actual content
        const content = container.querySelector('.content-wrapper') || container;
        content.classList.add('is-loaded');

        // Remove skeletons after animation
        setTimeout(() => {
          skeletonContainer.remove();
        }, 400);
      }

      this.loaders.delete(containerSelector);
      
      // Dispatch event
      container.dispatchEvent(new CustomEvent('contentLoaded', { bubbles: true }));
    },

    // Mark loading as failed
    fail(containerSelector, message = 'Failed to load content') {
      const loader = this.loaders.get(containerSelector);
      if (!loader) return;

      const { container, skeletonContainer } = loader;

      if (skeletonContainer) {
        skeletonContainer.innerHTML = `
          <div class="loading-error" style="
            text-align: center;
            padding: 2rem;
            color: #dc2626;
          ">
            <p>${message}</p>
            <button onclick="location.reload()" style="
              margin-top: 1rem;
              padding: 0.5rem 1rem;
              background: #dc2626;
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
            ">Retry</button>
          </div>
        `;
      }

      this.loaders.delete(containerSelector);
    },

    // Refresh/reload content
    refresh(containerSelector, options = {}) {
      this.loaders.delete(containerSelector);
      return this.init(containerSelector, options);
    }
  };

  /**
   * ============================================
   * DEMO SIMULATOR
   * ============================================
   * Simulated loading for demonstration purposes
   */
  
  const DemoSimulator = {
    // Configuration for DC Tow Directory demo
    config: {
      servicesSection: '[data-section="services"]',
      statsSection: '[data-section="stats"]',
      locationsSection: '[data-section="locations"]',
      providersSection: '[data-section="providers"]'
    },

    // Sample data matching the site structure
    sampleData: {
      stats: [
        { number: '15', label: 'Min', suffix: 'Min', subtext: 'Average Response' },
        { number: '4.9', label: 'Rating', suffix: '', subtext: 'Customer Rating' },
        { number: '50000', label: 'Customers', suffix: '+', subtext: 'Happy Customers' },
        { number: '500', label: 'Providers', suffix: '+', subtext: 'Local Providers' }
      ],
      services: [
        { name: 'Emergency Towing', description: '24/7 emergency towing services for all vehicle types' },
        { name: 'Flatbed Towing', description: 'Safe flatbed transport for luxury and damaged vehicles' },
        { name: 'Motorcycle Towing', description: 'Specialized motorcycle transport with secure tie-downs' },
        { name: 'Long-Distance Towing', description: 'Interstate and long-distance vehicle transportation' },
        { name: 'Heavy-Duty Towing', description: 'Commercial truck and heavy equipment towing' },
        { name: 'Roadside Assistance', description: 'Jump starts, tire changes, lockouts, and fuel delivery' }
      ],
      locations: [
        { name: 'Washington D.C.', subtitle: 'Capital Region' },
        { name: 'Alexandria', subtitle: 'Virginia' },
        { name: 'Arlington', subtitle: 'Virginia' },
        { name: 'Bethesda', subtitle: 'Maryland' },
        { name: 'Silver Spring', subtitle: 'Maryland' },
        { name: 'Fairfax', subtitle: 'Virginia' }
      ]
    },

    // Run full demo simulation
    run() {
      console.log('🚗 DC Tow Directory - Running demo simulation...');

      // Inject skeleton styles
      SkeletonLoader.injectStyles();

      // Simulate each section loading
      this.simulateSection(this.config.statsSection, 'stat', 4, 800);
      this.simulateSection(this.config.servicesSection, 'service', 6, 1200);
      this.simulateSection(this.config.locationsSection, 'location', 6, 1500);
    },

    // Simulate loading for a specific section
    simulateSection(selector, type, count, delay) {
      const section = document.querySelector(selector);
      if (!section) return;

      // Show skeletons
      const skeletonContainer = SkeletonLoader.show(section, type, count);

      // Hide after delay
      setTimeout(() => {
        SkeletonLoader.hide(section);
        
        // Populate with demo content if empty
        this.populateDemoContent(section, type);
        
        console.log(`✅ Demo: ${type} section loaded`);
      }, delay);
    },

    // Populate section with demo content
    populateDemoContent(section, type) {
      const content = section.querySelector('.content-wrapper') || section;
      
      if (type === 'stat' && !content.children.length) {
        // Populate stats
        this.sampleData.stats.forEach(stat => {
          const card = document.createElement('div');
          card.className = 'stat-card';
          card.innerHTML = `
            <div class="stat-number" data-counter>${stat.number}${stat.suffix}</div>
            <div class="stat-label">${stat.label}</div>
            <div class="stat-subtext">${stat.subtext}</div>
          `;
          content.appendChild(card);
        });
      }

      // Add loaded class
      content.classList.add('is-loaded');
    },

    // Quick load demo - loads everything at once
    quickLoad() {
      SkeletonLoader.injectStyles();
      
      const sections = [
        { selector: this.config.statsSection, type: 'stat', count: 4, delay: 600 },
        { selector: this.config.servicesSection, type: 'service', count: 6, delay: 800 },
        { selector: this.config.locationsSection, type: 'location', count: 6, delay: 1000 }
      ];

      sections.forEach(({ selector, type, count, delay }) => {
        const section = document.querySelector(selector);
        if (section) {
          SkeletonLoader.show(section, type, count);
          setTimeout(() => SkeletonLoader.hide(section), delay);
        }
      });
    }
  };

  /**
   * ============================================
   * PAGE LOADER
   * ============================================
   * Full page loading overlay
   */
  
  const PageLoader = {
    styles: `
      .page-loader {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fff;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
      }

      .page-loader.is-hidden {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }

      .page-loader__spinner {
        width: 60px;
        height: 60px;
        border: 4px solid #f0f0f0;
        border-top-color: #dc2626;
        border-radius: 50%;
        animation: page-loader-spin 1s linear infinite;
      }

      @keyframes page-loader-spin {
        to { transform: rotate(360deg); }
      }

      .page-loader__text {
        margin-top: 1rem;
        color: #666;
        font-size: 0.875rem;
      }

      .page-loader__progress {
        width: 200px;
        height: 4px;
        background: #f0f0f0;
        border-radius: 2px;
        margin-top: 1.5rem;
        overflow: hidden;
      }

      .page-loader__progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #dc2626, #f59e0b);
        width: 0%;
        transition: width 0.3s ease-out;
        animation: progress-animation 2s ease-out forwards;
      }

      @keyframes progress-animation {
        0% { width: 0%; }
        50% { width: 70%; }
        100% { width: 100%; }
      }
    `,

    init(options = {}) {
      const config = {
        duration: 1500,
        showProgress: true,
        text: 'Loading...',
        ...options
      };

      // Inject styles
      if (!document.getElementById('page-loader-styles')) {
        const style = document.createElement('style');
        style.id = 'page-loader-styles';
        style.textContent = this.styles;
        document.head.appendChild(style);
      }

      // Create loader element
      const loader = document.createElement('div');
      loader.className = 'page-loader';
      loader.id = 'page-loader';
      loader.innerHTML = `
        <div class="page-loader__spinner"></div>
        <div class="page-loader__text">${config.text}</div>
        ${config.showProgress ? `
          <div class="page-loader__progress">
            <div class="page-loader__progress-bar"></div>
          </div>
        ` : ''}
      `;

      document.body.appendChild(loader);

      // Hide after duration
      setTimeout(() => {
        this.hide();
      }, config.duration);

      // Also hide when page is fully loaded
      window.addEventListener('load', () => {
        this.hide();
      });
    },

    hide() {
      const loader = document.getElementById('page-loader');
      if (loader && !loader.classList.contains('is-hidden')) {
        loader.classList.add('is-hidden');
        setTimeout(() => loader.remove(), 500);
      }
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
    // Inject skeleton styles
    SkeletonLoader.injectStyles();

    // Auto-initialize skeletons for elements with data-skeleton attribute
    document.querySelectorAll('[data-skeleton]').forEach(el => {
      const type = el.dataset.skeleton || 'service';
      const count = parseInt(el.dataset.skeletonCount) || 6;
      SkeletonLoader.show(el, type, count);
    });

    console.log('🚗 DC Tow Directory - Loader initialized');
  }

  init();

  // Expose API
  window.DCTowLoader = {
    SkeletonLoader,
    ContentLoader,
    DemoSimulator,
    PageLoader,
    
    // Convenience methods
    showSkeletons: (container, type, count) => SkeletonLoader.show(container, type, count),
    hideSkeletons: (container) => SkeletonLoader.hide(container),
    runDemo: () => DemoSimulator.run(),
    quickDemo: () => DemoSimulator.quickLoad(),
    showPageLoader: (options) => PageLoader.init(options),
    loadContent: (selector, options) => ContentLoader.init(selector, options)
  };

})();
