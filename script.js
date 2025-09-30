// Global Variables
let currentImageIndex = 0;
let filteredImages = [];
let mobileMenuOpen = false;

// DOM Elements
const header = document.getElementById("header");
const scrollProgress = document.getElementById("scroll-progress");
const backToTop = document.getElementById("back-to-top");
const mobileNav = document.getElementById("mobile-nav");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxDescription = document.getElementById("lightbox-description");
const galleryGrid = document.getElementById("gallery-grid");
const bookingForm = document.getElementById("booking-form");
const contactForm = document.getElementById("contact-form");

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeScrollEffects();
  initializeNavigation();
  initializeGallery();
  initializeForms();
  initializeAnimations();
  initializeCounters();
  initializeGSAP();
});

// GSAP Initialization
function initializeGSAP() {
  // Check if GSAP is loaded
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // Create ScrollSmoother only on desktop
    if (window.innerWidth > 768) {
      try {
        ScrollSmoother.create({
          smooth: 1,
          effects: true,
          smoothTouch: 0.1,
        });
      } catch (error) {
        console.log("ScrollSmoother not available, using regular scroll");
      }
    }

    // GSAP Animations
    gsap.from(".hero-content", {
      duration: 1.5,
      y: 50,
      opacity: 0,
      ease: "power3.out",
    });

    gsap.from(".hero-stars i", {
      duration: 0.8,
      scale: 0,
      stagger: 0.1,
      delay: 0.5,
      ease: "back.out(1.7)",
    });

    // Animate sections on scroll
    gsap.utils.toArray("section").forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => {
          gsap.from(
            section.querySelectorAll(
              ".facility-card, .review-card, .gallery-item, .feature-item"
            ),
            {
              duration: 0.8,
              y: 30,
              opacity: 0,
              stagger: 0.1,
              ease: "power2.out",
            }
          );
        },
      });
    });
  }
}

// Scroll Effects
function initializeScrollEffects() {
  window.addEventListener(
    "scroll",
    throttle(function () {
      updateScrollProgress();
      updateHeaderBackground();
      updateBackToTopVisibility();
      handleScrollAnimations();
    }, 16)
  );
}

function updateScrollProgress() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  if (scrollProgress) {
    scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
  }
}

function updateHeaderBackground() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

function updateBackToTopVisibility() {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
}

function handleScrollAnimations() {
  const elements = document.querySelectorAll(
    ".facility-card, .review-card, .gallery-item, .feature-item"
  );

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}

// Navigation
function initializeNavigation() {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  }

  // Back to top button
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (mobileMenuOpen && !e.target.closest(".header")) {
      closeMobileMenu();
    }
  });

  // Handle window resize
  window.addEventListener(
    "resize",
    debounce(function () {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        closeMobileMenu();
      }
    }, 250)
  );
}

function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen;
  if (mobileNav) {
    mobileNav.classList.toggle("active");
  }

  const menuBtn = document.getElementById("mobile-menu-btn");
  const menuIcon = menuBtn ? menuBtn.querySelector("i") : null;
  if (menuIcon) {
    menuIcon.className = mobileMenuOpen ? "fas fa-times" : "fas fa-bars";
  }
}

function closeMobileMenu() {
  mobileMenuOpen = false;
  if (mobileNav) {
    mobileNav.classList.remove("active");
  }
  const menuBtn = document.getElementById("mobile-menu-btn");
  const menuIcon = menuBtn ? menuBtn.querySelector("i") : null;
  if (menuIcon) {
    menuIcon.className = "fas fa-bars";
  }
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = header ? header.offsetHeight : 80;
    const elementPosition = element.offsetTop - headerHeight;

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
}

// Gallery
function initializeGallery() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  // Initialize filtered images array
  filteredImages = Array.from(galleryItems);

  // Filter button event listeners
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");
      filterGallery(filter);

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Gallery item click handlers
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      // Filter items based on current filter
      const activeFilter =
        document
          .querySelector(".filter-btn.active")
          ?.getAttribute("data-filter") || "all";

      if (activeFilter === "all") {
        filteredImages = Array.from(galleryItems);
      } else {
        filteredImages = Array.from(galleryItems).filter(
          (item) => item.getAttribute("data-category") === activeFilter
        );
      }

      currentImageIndex = filteredImages.indexOf(this);
      openLightbox();
    });
  });

  // Lightbox controls
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }
  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", previousImage);
  }
  if (lightboxNext) {
    lightboxNext.addEventListener("click", nextImage);
  }

  // Close lightbox on background click
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (lightbox && lightbox.classList.contains("active")) {
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          previousImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
      }
    }
  });
}

function filterGallery(filter) {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    const category = item.getAttribute("data-category");

    if (filter === "all" || category === filter) {
      item.style.display = "block";
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "scale(1)";
      }, 100);
    } else {
      item.style.opacity = "0";
      item.style.transform = "scale(0.8)";
      setTimeout(() => {
        item.style.display = "none";
      }, 300);
    }
  });

  // Update filtered images array
  if (filter === "all") {
    filteredImages = Array.from(galleryItems);
  } else {
    filteredImages = Array.from(galleryItems).filter(
      (item) => item.getAttribute("data-category") === filter
    );
  }
}

function openLightbox() {
  if (currentImageIndex >= 0 && currentImageIndex < filteredImages.length) {
    const currentItem = filteredImages[currentImageIndex];
    const img = currentItem.querySelector("img");
    const title = currentItem.querySelector("h4")?.textContent || "";
    const description = currentItem.querySelector("p")?.textContent || "";

    if (lightboxImage && img) {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
    }
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxDescription) lightboxDescription.textContent = description;

    if (lightbox) {
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }
}

function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

function previousImage() {
  currentImageIndex =
    (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
  openLightbox();
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
  openLightbox();
}

// Forms
function initializeForms() {
  // Booking form
  if (bookingForm) {
    bookingForm.addEventListener("submit", handleBookingSubmit);

    // Date change handlers for price calculation
    const checkinInput = document.getElementById("checkin");
    const checkoutInput = document.getElementById("checkout");
    const roomTypeSelect = document.getElementById("roomtype");

    [checkinInput, checkoutInput, roomTypeSelect].forEach((input) => {
      if (input) {
        input.addEventListener("change", updateBookingSummary);
      }
    });

    // Set minimum date to today
    const today = new Date().toISOString().split("T")[0];
    if (checkinInput) checkinInput.min = today;
    if (checkoutInput) checkoutInput.min = today;
  }

  // Contact form
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactSubmit);
  }

  // Real-time validation
  const formInputs = document.querySelectorAll("input, select, textarea");
  formInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      clearFieldError(this);
    });
  });
}

function updateBookingSummary() {
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");
  const roomTypeSelect = document.getElementById("roomtype");

  if (!checkinInput || !checkoutInput || !roomTypeSelect) return;

  const checkin = checkinInput.value;
  const checkout = checkoutInput.value;
  const roomType = roomTypeSelect.value;
  const roomTypeOption = document.querySelector(
    `#roomtype option[value="${roomType}"]`
  );

  if (checkin && checkout && roomType && roomTypeOption) {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (nights > 0) {
      const pricePerNight =
        parseInt(roomTypeOption.getAttribute("data-price")) || 0;
      const totalPrice = nights * pricePerNight;

      const summary = document.getElementById("booking-summary");
      const nightsCount = document.getElementById("nights-count");
      const totalPriceElement = document.getElementById("total-price");

      if (nightsCount) {
        nightsCount.textContent = `${nights} night${nights > 1 ? "s" : ""}`;
      }

      if (totalPriceElement) {
        if (totalPrice > 0) {
          totalPriceElement.textContent = `$${totalPrice.toLocaleString()}`;
        } else {
          totalPriceElement.textContent = "Contact Us";
        }
      }

      if (summary) {
        summary.style.display = "block";
      }
    }
  }
}

function handleBookingSubmit(e) {
  e.preventDefault();

  if (validateBookingForm()) {
    const formData = {
      checkin: document.getElementById("checkin").value,
      checkout: document.getElementById("checkout").value,
      guests: document.getElementById("guests").value,
      roomtype: document.getElementById("roomtype").value,
      fullname: document.getElementById("fullname").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
    };

    emailjs
      .send("service_lf7y8uf", "template_87yzvfc", formData)
      .then(() => {
        alert("✅ Booking request sent successfully!");
        bookingForm.reset();
      })
      .catch((error) => {
        alert("❌ Failed to send booking request: " + error.text);
      });
  }
}


function handleContactSubmit(e) {
  e.preventDefault();

  if (validateContactForm()) {
    const formData = {
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      email: document.getElementById("contact-email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    emailjs
      .send("service_lf7y8uf", "template_87yzvfc", formData)
      .then(() => {
        alert("✅ Message sent! We will reply within 24 hours.");
        contactForm.reset();
      })
      .catch((error) => {
        alert("❌ Failed to send message: " + error.text);
      });
  }
}


function validateBookingForm() {
  let isValid = true;
  const requiredFields = [
    "checkin",
    "checkout",
    "guests",
    "roomtype",
    "fullname",
    "email",
    "phone",
  ];

  requiredFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (field && !validateField(field)) {
      isValid = false;
    }
  });

  // Additional date validation
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");

  if (checkinInput && checkoutInput) {
    const checkin = checkinInput.value;
    const checkout = checkoutInput.value;

    if (checkin && checkout) {
      const checkinDate = new Date(checkin);
      const checkoutDate = new Date(checkout);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (checkinDate < today) {
        showFieldError(checkinInput, "Check-in date cannot be in the past");
        isValid = false;
      }

      if (checkoutDate <= checkinDate) {
        showFieldError(
          checkoutInput,
          "Check-out date must be after check-in date"
        );
        isValid = false;
      }
    }
  }

  return isValid;
}

function validateContactForm() {
  let isValid = true;
  const requiredFields = [
    "firstname",
    "lastname",
    "contact-email",
    "subject",
    "message",
  ];

  requiredFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (field && !validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

function validateField(field) {
  if (!field) return true;

  const value = field.value.trim();
  let isValid = true;
  let errorMessage = "";

  // Required field validation
  if (field.hasAttribute("required") && !value) {
    errorMessage = `${getFieldLabel(field)} is required`;
    isValid = false;
  }

  // Email validation
  if (field.type === "email" && value && !isValidEmail(value)) {
    errorMessage = "Please enter a valid email address";
    isValid = false;
  }

  // Phone validation
  if (field.type === "tel" && value && !isValidPhone(value)) {
    errorMessage = "Please enter a valid phone number";
    isValid = false;
  }

  if (!isValid) {
    showFieldError(field, errorMessage);
  } else {
    clearFieldError(field);
  }

  return isValid;
}

function showFieldError(field, message) {
  const errorElement = document.getElementById(field.id + "-error");
  if (errorElement) {
    errorElement.textContent = message;
  }
  field.style.borderColor = "#ef4444";
}

function clearFieldError(field) {
  const errorElement = document.getElementById(field.id + "-error");
  if (errorElement) {
    errorElement.textContent = "";
  }
  field.style.borderColor = "#e5e7eb";
}

function getFieldLabel(field) {
  const label = document.querySelector(`label[for="${field.id}"]`);
  return label ? label.textContent : field.name || field.id;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
}

// Animations
function initializeAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        // Stagger animation for child elements
        const children = entry.target.querySelectorAll(
          ".facility-card, .review-card, .gallery-item, .feature-item"
        );
        children.forEach((child, index) => {
          setTimeout(() => {
            child.style.opacity = "1";
            child.style.transform = "translateY(0)";
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  // Observe sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Initial state for animated elements
  const animatedElements = document.querySelectorAll(
    ".facility-card, .review-card, .gallery-item, .feature-item"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });
}

// Counter Animation
function initializeCounters() {
  const counters = document.querySelectorAll(".stat-number");
  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    if (target >= 100) {
      element.textContent = Math.floor(current) + "%";
    } else if (target >= 15) {
      element.textContent = Math.floor(current) + " Years";
    } else {
      element.textContent = Math.floor(current) + "+";
    }
  }, 16);
}

// Utility Functions
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

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Smooth scrolling polyfill for older browsers
if (!("scrollBehavior" in document.documentElement.style)) {
  const smoothScrollPolyfill = function (target) {
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  };

  // Override scrollToSection for older browsers
  window.scrollToSection = function (sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      smoothScrollPolyfill(element);
    }
  };
}

// Performance optimization
window.addEventListener("load", function () {
  // Preload critical images
  const criticalImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  ];

  criticalImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
});

// Error handling
window.addEventListener("error", function (e) {
  console.error("JavaScript error:", e.error);
});

// Accessibility improvements
document.addEventListener("keydown", function (e) {
  // Skip to main content
  if (e.key === "Tab" && e.target === document.body) {
    const mainContent = document.getElementById("home");
    if (mainContent) {
      mainContent.focus();
    }
  }
});

// Service Worker registration (if available)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("ServiceWorker registration successful");
      })
      .catch(function (err) {
        console.log("ServiceWorker registration failed");
      });
  });
}

// Make functions globally available
window.scrollToSection = scrollToSection;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
