/**
 * Menu page flipper functionality
 * Handles the booklet-style menu navigation
 */

document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const menuBook = document.getElementById('menu-book');
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  const pageIndicators = document.getElementById('page-indicators');
  
  // Menu pages
  const pages = Array.from(document.querySelectorAll('.menu-page'));
  let currentPageIndex = 0;

  // Check if URL has a hash and set initial page accordingly
  function initializeFromHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const targetPage = document.getElementById(hash);
      if (targetPage) {
        const targetIndex = pages.indexOf(targetPage);
        if (targetIndex !== -1) {
          currentPageIndex = targetIndex;
        }
      }
    }
    showPage(currentPageIndex);
    createPageIndicators();
  }

  // Create page indicators
  function createPageIndicators() {
    pageIndicators.innerHTML = '';
    pages.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.className = 'page-dot';
      if (index === currentPageIndex) {
        indicator.classList.add('active');
      }
      indicator.addEventListener('click', () => {
        flipToPage(index);
      });
      pageIndicators.appendChild(indicator);
    });
  }

  // Show specific page
  function showPage(index) {
    // Hide all pages
    pages.forEach(page => {
      page.classList.remove('active', 'previous', 'next');
    });
    
    // Update active page
    pages[index].classList.add('active');
    
    // Update indicators
    const indicators = document.querySelectorAll('.page-dot');
    indicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    // Update buttons visibility
    prevBtn.style.display = index > 0 ? 'block' : 'none';
    nextBtn.style.display = index < pages.length - 1 ? 'block' : 'none';
    
    // Update URL hash without scrolling (not at initialization)
    if (pages[index].id && document.readyState === 'complete') {
      history.replaceState(null, null, `#${pages[index].id}`);
    }
  }

  // Animate page flip
  function flipToPage(newIndex) {
    if (newIndex === currentPageIndex) return;
    
    const direction = newIndex > currentPageIndex ? 'next' : 'previous';
    const currentPage = pages[currentPageIndex];
    const targetPage = pages[newIndex];
    
    // Apply appropriate animation classes
    currentPage.classList.add('flipping-out', direction);
    targetPage.classList.add('flipping-in', direction);
    
    // Set timeout for animation duration
    setTimeout(() => {
      currentPageIndex = newIndex;
      showPage(currentPageIndex);
      pages.forEach(page => {
        page.classList.remove('flipping-in', 'flipping-out', 'previous', 'next');
      });
    }, 600); // Match this with the CSS animation duration
  }

  // Navigation event listeners
  prevBtn.addEventListener('click', () => {
    if (currentPageIndex > 0) {
      flipToPage(currentPageIndex - 1);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPageIndex < pages.length - 1) {
      flipToPage(currentPageIndex + 1);
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentPageIndex > 0) {
      flipToPage(currentPageIndex - 1);
    } else if (e.key === 'ArrowRight' && currentPageIndex < pages.length - 1) {
      flipToPage(currentPageIndex + 1);
    }
  });

  // Mouse wheel / touch swipe navigation
  let touchStartX = 0;
  let touchEndX = 0;
  
  // Wheel event for desktop
  menuBook.addEventListener('wheel', (e) => {
    // Prevent default scrolling
    e.preventDefault();
    
    // Throttle wheel events to prevent too many flips
    if (menuBook.isFlipping) return;
    menuBook.isFlipping = true;
    
    setTimeout(() => {
      menuBook.isFlipping = false;
    }, 800);
    
    if (e.deltaY > 0 && currentPageIndex < pages.length - 1) {
      flipToPage(currentPageIndex + 1);
    } else if (e.deltaY < 0 && currentPageIndex > 0) {
      flipToPage(currentPageIndex - 1);
    }
  }, { passive: false });
  
  // Touch events for mobile
  menuBook.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  menuBook.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a swipe
    
    if (touchEndX < touchStartX - swipeThreshold && currentPageIndex < pages.length - 1) {
      // Swipe left to go forward
      flipToPage(currentPageIndex + 1);
    } else if (touchEndX > touchStartX + swipeThreshold && currentPageIndex > 0) {
      // Swipe right to go back
      flipToPage(currentPageIndex - 1);
    }
  }

  // Handle menu section links from landing page
  document.querySelectorAll('.menu-button').forEach(button => {
    button.addEventListener('click', function(e) {
      // If on landing page, let the normal link navigation happen
      if (!menuBook) return;
      
      // If already on menu page, prevent default and handle in-page navigation
      e.preventDefault();
      const section = this.getAttribute('data-section');
      const targetElement = document.getElementById(section);
      if (targetElement) {
        const targetIndex = pages.indexOf(targetElement);
        if (targetIndex !== -1) {
          flipToPage(targetIndex);
        }
      }
    });
  });

  // Initialize
  if (menuBook) {
    initializeFromHash();
    
    // When hash changes (browser back/forward)
    window.addEventListener('hashchange', initializeFromHash);
  }
});
