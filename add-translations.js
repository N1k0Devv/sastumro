// Script to add data-translate attributes to HTML elements
// This script will run once to update existing elements

document.addEventListener('DOMContentLoaded', function() {
  // Function to add data-translate attribute to elements
  function addTranslateAttribute(selector, key) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      if (!element.hasAttribute('data-translate')) {
        element.setAttribute('data-translate', key);
      }
    });
  }

  // Stats section
  addTranslateAttribute('.stat-label:nth-of-type(1)', 'stat_happy_guests');
  addTranslateAttribute('.stat-label:nth-of-type(2)', 'stat_years_experience');
  addTranslateAttribute('.stat-label:nth-of-type(3)', 'stat_satisfaction');

  // Facilities section
  addTranslateAttribute('.section-header .badge', 'facilities_badge');
  addTranslateAttribute('.facilities .section-header h2', 'facilities_title');
  addTranslateAttribute('.facilities .section-header p', 'facilities_description');

  // Facility cards
  const facilityCards = document.querySelectorAll('.facility-card');
  if (facilityCards.length >= 4) {
    // Football field
    const footballTitle = facilityCards[0].querySelector('h3');
    const footballDesc = facilityCards[0].querySelector('.facility-content p');
    if (footballTitle) footballTitle.setAttribute('data-translate', 'football_title');
    if (footballDesc) footballDesc.setAttribute('data-translate', 'football_description');

    // Tennis court
    const tennisTitle = facilityCards[1].querySelector('h3');
    const tennisDesc = facilityCards[1].querySelector('.facility-content p');
    if (tennisTitle) tennisTitle.setAttribute('data-translate', 'tennis_title');
    if (tennisDesc) tennisDesc.setAttribute('data-translate', 'tennis_description');

    // Gym
    const gymTitle = facilityCards[2].querySelector('h3');
    const gymDesc = facilityCards[2].querySelector('.facility-content p');
    if (gymTitle) gymTitle.setAttribute('data-translate', 'gym_title');
    if (gymDesc) gymDesc.setAttribute('data-translate', 'gym_description');

    // Pool
    const poolTitle = facilityCards[3].querySelector('h3');
    const poolDesc = facilityCards[3].querySelector('.facility-content p');
    if (poolTitle) poolTitle.setAttribute('data-translate', 'pool_title');
    if (poolDesc) poolDesc.setAttribute('data-translate', 'pool_description');
  }

  // Additional features
  const featureItems = document.querySelectorAll('.additional-features .feature-item');
  if (featureItems.length >= 3) {
    const accessTitle = featureItems[0].querySelector('h4');
    const accessDesc = featureItems[0].querySelector('p');
    if (accessTitle) accessTitle.setAttribute('data-translate', 'access_24_7');
    if (accessDesc) accessDesc.setAttribute('data-translate', 'access_description');

    const staffTitle = featureItems[1].querySelector('h4');
    const staffDesc = featureItems[1].querySelector('p');
    if (staffTitle) staffTitle.setAttribute('data-translate', 'expert_staff');
    if (staffDesc) staffDesc.setAttribute('data-translate', 'expert_description');

    const equipmentTitle = featureItems[2].querySelector('h4');
    const equipmentDesc = featureItems[2].querySelector('p');
    if (equipmentTitle) equipmentTitle.setAttribute('data-translate', 'premium_equipment');
    if (equipmentDesc) equipmentDesc.setAttribute('data-translate', 'premium_description');
  }

  // Gallery section
  addTranslateAttribute('.gallery .section-header .badge', 'gallery_badge');
  addTranslateAttribute('.gallery .section-header h2', 'gallery_title');
  addTranslateAttribute('.gallery .section-header p', 'gallery_description');

  // Gallery filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length >= 5) {
    if (!filterButtons[0].hasAttribute('data-translate')) filterButtons[0].setAttribute('data-translate', 'all_photos');
    if (!filterButtons[1].hasAttribute('data-translate')) filterButtons[1].setAttribute('data-translate', 'football_field');
    if (!filterButtons[2].hasAttribute('data-translate')) filterButtons[2].setAttribute('data-translate', 'tennis_court');
    if (!filterButtons[3].hasAttribute('data-translate')) filterButtons[3].setAttribute('data-translate', 'fitness_center');
    if (!filterButtons[4].hasAttribute('data-translate')) filterButtons[4].setAttribute('data-translate', 'swimming_pool');
  }

  // Reviews section
  addTranslateAttribute('.reviews .section-header .badge', 'reviews_badge');
  addTranslateAttribute('.reviews .section-header h2', 'reviews_title');
  addTranslateAttribute('.reviews .section-header p', 'reviews_description');

  // Rating summary
  const ratingLabels = document.querySelectorAll('.rating-label');
  if (ratingLabels.length >= 3) {
    if (!ratingLabels[0].hasAttribute('data-translate')) ratingLabels[0].setAttribute('data-translate', 'overall_rating');
    if (!ratingLabels[1].hasAttribute('data-translate')) ratingLabels[1].setAttribute('data-translate', 'happy_guests');
    if (!ratingLabels[2].hasAttribute('data-translate')) ratingLabels[2].setAttribute('data-translate', 'would_recommend');
  }

  // Ready to experience section
  addTranslateAttribute('.reviews-cta h3', 'ready_experience');
  addTranslateAttribute('.reviews-cta p', 'ready_description');

  // CTA buttons in reviews
  const reviewsCTAButtons = document.querySelectorAll('.reviews-cta .btn');
  if (reviewsCTAButtons.length >= 2) {
    if (!reviewsCTAButtons[0].hasAttribute('data-translate')) reviewsCTAButtons[0].setAttribute('data-translate', 'book_your_stay');
    if (!reviewsCTAButtons[1].hasAttribute('data-translate')) reviewsCTAButtons[1].setAttribute('data-translate', 'view_gallery');
  }

  // Booking section
  addTranslateAttribute('.booking .section-header .badge', 'booking_badge');
  addTranslateAttribute('.booking .section-header h2', 'booking_title');
  addTranslateAttribute('.booking .section-header p', 'booking_description');

  // Form labels and elements
  addTranslateAttribute('.form-card h3', 'reservation_details');
  addTranslateAttribute('.form-card p', 'reservation_subtitle');

  // Form labels
  const labels = document.querySelectorAll('.booking-form label');
  const labelKeys = ['checkin_date', 'checkout_date', 'number_guests', 'room_type', 'full_name', 'email_address', 'phone_number', 'special_requests'];
  labels.forEach((label, index) => {
    if (index < labelKeys.length && !label.hasAttribute('data-translate')) {
      label.setAttribute('data-translate', labelKeys[index]);
    }
  });

  // Submit button
  addTranslateAttribute('#submit-btn span', 'reserve_now');

  // Info cards
  addTranslateAttribute('.info-card h4:contains("Room Packages")', 'room_packages');
  addTranslateAttribute('.info-card h4:contains("Contact Information")', 'contact_information');
  addTranslateAttribute('.info-card h4:contains("Included Amenities")', 'included_amenities');

  // Contact section
  addTranslateAttribute('.contact .section-header .badge', 'contact_badge');
  addTranslateAttribute('.contact .section-header h2', 'contact_title');
  addTranslateAttribute('.contact .section-header p', 'contact_description');

  // Contact form
  addTranslateAttribute('.contact .form-card h3', 'send_message');

  // Contact labels
  const contactLabels = document.querySelectorAll('.contact-form label');
  const contactLabelKeys = ['first_name', 'last_name', 'email_address', 'phone_number', 'subject', 'message'];
  contactLabels.forEach((label, index) => {
    if (index < contactLabelKeys.length && !label.hasAttribute('data-translate')) {
      label.setAttribute('data-translate', contactLabelKeys[index]);
    }
  });

  // Contact submit button
  addTranslateAttribute('.contact-form .btn', 'send_message_btn');

  // Contact details
  const contactDetailTitles = document.querySelectorAll('.contact-detail h5');
  const detailKeys = ['address', 'phone', 'email', 'hours'];
  contactDetailTitles.forEach((title, index) => {
    if (index < detailKeys.length && !title.hasAttribute('data-translate')) {
      title.setAttribute('data-translate', detailKeys[index]);
    }
  });

  // Getting here section
  addTranslateAttribute('#Location-info h4', 'getting_here');

  // Transport items
  const transportItems = document.querySelectorAll('.transport-item strong');
  const transportKeys = ['airport', 'driving', 'public_transit'];
  transportItems.forEach((item, index) => {
    if (index < transportKeys.length && !item.hasAttribute('data-translate')) {
      item.setAttribute('data-translate', transportKeys[index]);
    }
  });

  // Emergency contact
  addTranslateAttribute('.emergency-card h3', 'emergency_contact');
  addTranslateAttribute('.emergency-card p', 'emergency_description');
  
  const emergencyButtons = document.querySelectorAll('.emergency-btn');
  if (emergencyButtons.length >= 2) {
    // Skip the first button (phone number) and translate the second one
    if (!emergencyButtons[1].hasAttribute('data-translate')) {
      emergencyButtons[1].setAttribute('data-translate', 'chat_support');
    }
  }

  console.log('Translation attributes added successfully!');
});

// Run the script immediately if DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', arguments.callee);
} else {
  arguments.callee();
}
