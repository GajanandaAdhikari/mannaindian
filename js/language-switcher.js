/**
 * Language switcher functionality
 * Handles toggling between English and Japanese
 */

document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const enToggle = document.getElementById('en-toggle');
  const jpToggle = document.getElementById('jp-toggle');
  
  // Language data storage (will be populated from JSON)
  let translations = {
    en: {},
    jp: {}
  };

  // Set default language
  let currentLanguage = 'en';

  // Try to get language preference from localStorage
  const savedLanguage = localStorage.getItem('preferredLanguage');
  if (savedLanguage && ['en', 'jp'].includes(savedLanguage)) {
    currentLanguage = savedLanguage;
  }

  // Load translations for the current page
  async function loadTranslations() {
    try {
      // Determine which page we're on by checking the URL
      const isMenuPage = window.location.pathname.includes('menu.html');
      const pageName = isMenuPage ? 'menu' : 'landing';
      
      // Load both language files for the current page
      const enResponse = await fetch(`/locales/en/${pageName}.json`);
      const jpResponse = await fetch(`/locales/jp/${pageName}.json`);
      
      if (!enResponse.ok || !jpResponse.ok) {
        throw new Error('Failed to load translation files');
      }
      
      translations.en = await enResponse.json();
      translations.jp = await jpResponse.json();
      
      // Apply the current language
      applyLanguage(currentLanguage);
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to hardcoded translations for key elements if files fail to load
      translations = {
        en: {
          restaurantName: "Restaurant Name",
          menuTitle: "Our Menu",
          viewFullMenu: "View Full Menu"
        },
        jp: {
          restaurantName: "レストラン名",
          menuTitle: "メニュー",
          viewFullMenu: "フルメニューを見る"
        }
      };
      applyLanguage(currentLanguage);
    }
  }

  // Apply language to all elements with data-lang-key attributes
  function applyLanguage(lang) {
    // Update toggle buttons
    enToggle.classList.toggle('active', lang === 'en');
    jpToggle.classList.toggle('active', lang === 'jp');
    
    // Update all text elements with translation keys
    document.querySelectorAll('[data-lang-key]').forEach(element => {
      const key = element.getAttribute('data-lang-key');
      if (translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });
    
    // Set language attribute on html tag
    document.documentElement.lang = lang === 'jp' ? 'ja' : 'en';
    
    // Save preference
    localStorage.setItem('preferredLanguage', lang);
    currentLanguage = lang;
  }

  // Add event listeners to language toggle buttons
  enToggle.addEventListener('click', () => {
    if (currentLanguage !== 'en') {
      applyLanguage('en');
    }
  });

  jpToggle.addEventListener('click', () => {
    if (currentLanguage !== 'jp') {
      applyLanguage('jp');
    }
  });

  // Initialize
  loadTranslations();
});
