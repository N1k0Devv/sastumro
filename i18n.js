// Internationalization (i18n) Module
class I18n {
  constructor() {
    this.currentLang = localStorage.getItem('preferred-language') || 'en';
    this.translations = null;
    this.isRTL = false;
    
    // Initialize
    this.loadTranslations();
  }

  // Load translation data
  async loadTranslations() {
    try {
      const response = await fetch('./translations.json');
      this.translations = await response.json();
      
      // Update page based on stored language preference
      if (this.currentLang !== 'en') {
        this.updateLanguage(this.currentLang);
      }
      
      this.updateLanguageToggle();
    } catch (error) {
      console.error('Failed to load translations:', error);
      this.currentLang = 'en'; // Fallback to English
    }
  }

  // Switch between languages
  toggleLanguage() {
    const newLang = this.currentLang === 'en' ? 'ka' : 'en';
    
    // Add switching animation class
    document.body.classList.add('language-switching');
    const toggleBtn = document.getElementById('language-toggle');
    if (toggleBtn) {
      toggleBtn.classList.add('language-switching');
    }
    
    // Update language with slight delay for smooth transition
    setTimeout(() => {
      this.updateLanguage(newLang);
      
      // Remove animation class after transition
      setTimeout(() => {
        document.body.classList.remove('language-switching');
        if (toggleBtn) {
          toggleBtn.classList.remove('language-switching');
        }
      }, 300);
    }, 50);
  }

  // Update page language
  updateLanguage(lang) {
    if (!this.translations || !this.translations[lang]) {
      console.error('Language not supported:', lang);
      return;
    }

    this.currentLang = lang;
    localStorage.setItem('preferred-language', lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update all elements with data-translate attributes
    this.updateAllTranslatableElements();
    
    // Update language toggle button
    this.updateLanguageToggle();

    // Update special elements that need custom handling
    this.updateSpecialElements();
  }

  // Update all elements with data-translate attributes
  updateAllTranslatableElements() {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-translate');
      const translation = this.translations[this.currentLang][key];
      
      if (translation) {
        // Handle different element types
        if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'email' || element.type === 'tel')) {
          element.placeholder = translation;
        } else if (element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else if (element.tagName === 'META') {
          element.content = translation;
        } else if (element.tagName === 'TITLE') {
          element.textContent = translation;
        } else {
          // For buttons with icons, preserve the icon
          if (element.querySelector('i')) {
            const icon = element.querySelector('i').outerHTML;
            element.innerHTML = icon + ' ' + translation;
          } else {
            element.textContent = translation;
          }
        }
      }
    });
  }

  // Update language toggle button
  updateLanguageToggle() {
    const toggleBtn = document.getElementById('language-toggle');
    const flagSpan = toggleBtn?.querySelector('.language-flag');
    const textSpan = toggleBtn?.querySelector('.language-text');
    
    if (toggleBtn && flagSpan && textSpan) {
      if (this.currentLang === 'en') {
        flagSpan.textContent = '🇬🇪';
        textSpan.textContent = 'ქართული';
        toggleBtn.setAttribute('title', 'Switch to Georgian');
      } else {
        flagSpan.textContent = '🇺🇸';
        textSpan.textContent = 'English';
        toggleBtn.setAttribute('title', 'Switch to English');
      }
    }
  }

  // Handle special elements that need custom logic
  updateSpecialElements() {
    // Update form placeholders that don't have data-translate yet
    this.updateFormPlaceholders();
    
    // Update dropdown options
    this.updateDropdownOptions();
    
    // Update any dynamic content
    this.updateDynamicContent();
  }

  // Update form placeholders
  updateFormPlaceholders() {
    const placeholderMappings = {
      'fullname': this.translations[this.currentLang]['full_name_placeholder'],
      'email': this.translations[this.currentLang]['email_placeholder'],
      'phone': this.translations[this.currentLang]['phone_placeholder'],
      'requests': this.translations[this.currentLang]['special_requests_placeholder'],
      'firstname': this.translations[this.currentLang]['first_name_placeholder'],
      'lastname': this.translations[this.currentLang]['last_name_placeholder'],
      'contact-email': this.translations[this.currentLang]['email_placeholder'],
      'contact-phone': this.translations[this.currentLang]['phone_placeholder'],
      'subject': this.translations[this.currentLang]['subject_placeholder'],
      'message': this.translations[this.currentLang]['message_placeholder']
    };

    Object.keys(placeholderMappings).forEach(id => {
      const element = document.getElementById(id);
      if (element && placeholderMappings[id]) {
        element.placeholder = placeholderMappings[id];
      }
    });
  }

  // Update dropdown options
  updateDropdownOptions() {
    // Update guests dropdown
    const guestsSelect = document.getElementById('guests');
    if (guestsSelect) {
      const options = guestsSelect.querySelectorAll('option');
      if (options.length > 0) {
        options[0].textContent = this.translations[this.currentLang]['select_guests'];
        if (options[1]) options[1].textContent = this.translations[this.currentLang]['guest_1'];
        if (options[2]) options[2].textContent = this.translations[this.currentLang]['guest_2'];
        if (options[3]) options[3].textContent = this.translations[this.currentLang]['guest_3'];
        if (options[4]) options[4].textContent = this.translations[this.currentLang]['guest_4'];
        if (options[5]) options[5].textContent = this.translations[this.currentLang]['guest_5_plus'];
      }
    }

    // Update room type dropdown
    const roomTypeSelect = document.getElementById('roomtype');
    if (roomTypeSelect) {
      const options = roomTypeSelect.querySelectorAll('option');
      if (options.length > 0) {
        options[0].textContent = this.translations[this.currentLang]['select_room'];
        if (options[1]) options[1].textContent = this.translations[this.currentLang]['deluxe_room'];
        if (options[2]) options[2].textContent = this.translations[this.currentLang]['executive_suite'];
        if (options[3]) options[3].textContent = this.translations[this.currentLang]['presidential_suite'];
        if (options[4]) options[4].textContent = this.translations[this.currentLang]['sports_package'];
      }
    }
  }

  // Update any dynamic content
  updateDynamicContent() {
    // Update stats labels
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels.length >= 3) {
      statLabels[0].textContent = this.translations[this.currentLang]['stat_happy_guests'];
      statLabels[1].textContent = this.translations[this.currentLang]['stat_years_experience'];
      statLabels[2].textContent = this.translations[this.currentLang]['stat_satisfaction'];
    }

    // Update gallery filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
      filterButtons[0].textContent = this.translations[this.currentLang]['all_photos'];
      if (filterButtons[1]) filterButtons[1].textContent = this.translations[this.currentLang]['football_field'];
      if (filterButtons[2]) filterButtons[2].textContent = this.translations[this.currentLang]['tennis_court'];
      if (filterButtons[3]) filterButtons[3].textContent = this.translations[this.currentLang]['fitness_center'];
      if (filterButtons[4]) filterButtons[4].textContent = this.translations[this.currentLang]['swimming_pool'];
    }

    // Update rating summary
    const ratingLabels = document.querySelectorAll('.rating-label');
    if (ratingLabels.length >= 3) {
      ratingLabels[0].textContent = this.translations[this.currentLang]['overall_rating'];
      ratingLabels[1].textContent = this.translations[this.currentLang]['happy_guests'];
      ratingLabels[2].textContent = this.translations[this.currentLang]['would_recommend'];
    }

    // Update amenity items
    this.updateAmenityItems();
    
    // Update contact details with HTML content
    this.updateContactDetails();
  }

  // Update amenity items
  updateAmenityItems() {
    const amenityMappings = [
      { selector: '.amenity-item:nth-child(1) span', key: 'free_wifi' },
      { selector: '.amenity-item:nth-child(2) span', key: 'gym_access' },
      { selector: '.amenity-item:nth-child(3) span', key: 'pool_access' },
      { selector: '.amenity-item:nth-child(4) span', key: 'parking' },
      { selector: '.amenity-item:nth-child(5) span', key: 'concierge' },
      { selector: '.amenity-item:nth-child(6) span', key: 'room_service' }
    ];

    amenityMappings.forEach(mapping => {
      const element = document.querySelector(mapping.selector);
      if (element && this.translations[this.currentLang][mapping.key]) {
        element.textContent = this.translations[this.currentLang][mapping.key];
      }
    });
  }

  // Update contact details with HTML content
  updateContactDetails() {
    const addressText = document.querySelector('.contact-text p');
    if (addressText && addressText.innerHTML.includes('Sports Boulevard')) {
      addressText.innerHTML = this.translations[this.currentLang]['address_text'];
    }

    const phoneText = document.querySelector('.contact-detail:nth-child(2) .contact-text p');
    if (phoneText && phoneText.innerHTML.includes('+995')) {
      phoneText.innerHTML = this.translations[this.currentLang]['phone_text'];
    }

    const hoursText = document.querySelector('.contact-detail:nth-child(4) .contact-text p');
    if (hoursText && hoursText.innerHTML.includes('Front Desk')) {
      hoursText.innerHTML = this.translations[this.currentLang]['hours_text'];
    }
  }

  // Get current language
  getCurrentLanguage() {
    return this.currentLang;
  }

  // Get translation for a specific key
  translate(key) {
    return this.translations?.[this.currentLang]?.[key] || key;
  }
}

// Initialize i18n system
const i18n = new I18n();

// Make toggleLanguage function globally available
function toggleLanguage() {
  i18n.toggleLanguage();
}

// Export for use in other modules
window.i18n = i18n;
window.toggleLanguage = toggleLanguage;
