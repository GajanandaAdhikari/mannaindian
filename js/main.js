/**
 * Common JavaScript functionality for the restaurant website
 */

document.addEventListener('DOMContentLoaded', function() {
  // Function to handle smooth scrolling for anchor links
  function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        // Skip if this is a menu page navigation
        if (this.classList.contains('menu-button') && document.getElementById('menu-book')) {
          return;
        }
        
        const targetId = this.getAttribute('href').split('#')[1];
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          e.preventDefault();
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Function to handle responsive navigation
  function handleResponsiveNav() {
    // This could be expanded if a mobile menu is added later
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    // Hide header on scroll down, show on scroll up
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        if (window.scrollY > lastScrollY) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
      }
    });
  }

  // Function to lazy load images for better performance
  function setupLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
      });
    } else {
      // Could implement a fallback lazy loading solution here
      // or use a small library like lozad.js
    }
  }

  // Initialize
  setupSmoothScrolling();
  handleResponsiveNav();
  setupLazyLoading();
});
