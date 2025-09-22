const packages = [
  {
    id: 1, destination: "Goa", price: 8000, rating: 4.9,
    description: "Relax on the beautiful beaches of Goa, indulge in lively nightlife & explore Portuguese heritage."
  },
  {
    id: 2, destination: "Manali", price: 12000, rating: 4.8,
    description: "Enjoy the scenic beauty of Himachal Pradesh with snow-capped mountains and pristine rivers."
  },
  {
    id: 3, destination: "Jaipur", price: 7000, rating: 4.7,
    description: "Explore the royal heritage and colorful bazaars of the Pink City."
  },
  {
    id: 4, destination: "Kerala", price: 15000, rating: 4.8,
    description: "Experience the serenity of houseboats & backwaters amidst lush greenery."
  },
  {
    id: 5, destination: "Ladakh", price: 20000, rating: 4.9,
    description: "Adventure awaits in the high-altitude landscapes and Buddhist monasteries."
  },
  {
    id: 6, destination: "Andaman", price: 16000, rating: 4.8,
    description: "Crystal-clear waters, marine life, and tropical beauty of Indian islands await you."
  }
];

const testimonials = {
  Goa: [
    { text: "Goa's beaches rejuvenated my spirit! The sunsets were unforgettable.", author: "Anjali P., Mumbai" },
    { text: "Loved the party vibes and the food. Will book again!", author: "Vikram K., Pune" },
    { text: "The AI picks made our family trip seamless.", author: "Priya S., Bengaluru" }
  ],
  Manali: [
    { text: "Snowfall in Manali was a dream. The mountain views are breathtaking!", author: "Rahul T., Delhi" },
    { text: "Perfect blend of adventures and relaxation. Loved the AI recommendations.", author: "Sunita M., Indore" },
    { text: "My solo trip was flawless. Great hospitality!", author: "Ahmed N., Ahmedabad" }
  ],
  Jaipur: [
    { text: "Felt like royalty touring Jaipur. Fantastic AI-curated stay!", author: "Sneha L., Kolkata" },
    { text: "The city's culture and forts amazed us!", author: "Karthik S., Hyderabad" },
    { text: "Markets were a paradise for shopping. Will revisit!", author: "Rachel D., Kochi" }
  ],
  Kerala: [
    { text: "Backwaters and ayurvedic spa were highlights of my trip.", author: "Shruti J., Chennai" },
    { text: "AI suggestions for villages, food, and boat rides were on point.", author: "George P., Goa" },
    { text: "Houseboat experience was magical. Loved every bit!", author: "Manoj E., Coimbatore" }
  ],
  Ladakh: [
    { text: "Surreal landscapes and ancient monasteries took my breath away.", author: "Deepak V., Lucknow" },
    { text: "The AI-planned trip helped me acclimatize safely!", author: "Amrita G., Patna" },
    { text: "Trekking & star-gazing was a life-changing adventure.", author: "Pooja M., Bangalore" }
  ],
  Andaman: [
    { text: "Scuba diving here was a dream come true!", author: "Meera N., Delhi" },
    { text: "Turquoise waters & fresh seafood made the Andaman trip perfect.", author: "Sanjay R., Visakhapatnam" },
    { text: "Absolutely serene. The AI travel tips were excellent.", author: "Leena R., Nagpur" }
  ],
};

const packageListEl = document.getElementById('package-list');
const searchBtn = document.getElementById('search-btn');
const packageDetailsModal = document.getElementById('package-details');
const packageInfoEl = document.getElementById('package-info');
const testimonialsSection = document.getElementById('testimonials-section');
const bookingFormModal = document.getElementById('booking-form');
const bookFormEl = document.getElementById('book-form');

function displayPackages(packagesToDisplay) {
  packageListEl.innerHTML = '';
  packagesToDisplay.forEach(pkg => {
    const packageItem = document.createElement('div');
    packageItem.className = 'package-item';
    packageItem.innerHTML = `
      <h3>${pkg.destination}</h3>
      <p>Price: ₹${pkg.price}</p>
      <p>Rating: <span role="img" aria-label="Star">⭐</span> ${pkg.rating}</p>
      <button class="details-btn" data-id="${pkg.id}">View Details</button>
    `;
    packageListEl.appendChild(packageItem);
  });
}

function showModal(modal) {
  modal.style.display = 'flex';
  modal.focus();
  document.body.style.overflow = 'hidden';
}
function hideModal(modal) {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

// Accessibility: Escape to close modals
document.addEventListener('keydown', (e) => {
  if ((packageDetailsModal.style.display === 'flex' && e.key === 'Escape') || (bookingFormModal.style.display === 'flex' && e.key === 'Escape')) {
    hideModal(packageDetailsModal);
    hideModal(bookingFormModal);
  }
});

packageListEl.addEventListener('click', e => {
  if (e.target.classList.contains('details-btn')) {
    const packageId = +e.target.getAttribute('data-id');
    const pkg = packages.find(p => p.id === packageId);

    packageInfoEl.innerHTML = `
      <h2 style="margin-top:0;">${pkg.destination}</h2>
      <p>Price: ₹${pkg.price}</p>
      <p>Rating: <span role="img" aria-label="Star">⭐</span> ${pkg.rating}</p>
      <p>${pkg.description}</p>
      <button id="book-btn">Book Now</button>
    `;
    // Show testimonials with carousel
    renderTestimonials(pkg.destination);
    showModal(packageDetailsModal);

    document.getElementById('book-btn').onclick = () => {
      hideModal(packageDetailsModal);
      showModal(bookingFormModal);
    };
  }
});

let currentTestimonialIndex = 0, currentTestimonialArray = [];
function renderTestimonials(destination) {
  currentTestimonialArray = testimonials[destination] || [];
  currentTestimonialIndex = 0;
  updateTestimonialCarousel();
}

function updateTestimonialCarousel() {
  if (!currentTestimonialArray.length) {
    testimonialsSection.innerHTML = '';
    return;
  }
  const testimonial = currentTestimonialArray[currentTestimonialIndex];
  testimonialsSection.innerHTML = `
    <div class="testimonial-carousel">
      <div class="testimonial">
        “${testimonial.text}”
        <span class="author">— ${testimonial.author}</span>
      </div>
      <div class="carousel-arrows">
        <span class="carousel-arrow${currentTestimonialIndex > 0 ? ' active':''}" id="prev-testi">&#8592;</span>
        <span class="carousel-arrow${currentTestimonialIndex < currentTestimonialArray.length - 1 ? ' active':''}" id="next-testi">&#8594;</span>
      </div>
      <div class="carousel-dots">
        ${currentTestimonialArray.map((_, i) => `
          <span class="carousel-dot${i === currentTestimonialIndex ? ' active' : ''}" data-index="${i}"></span>
        `).join('')}
      </div>
    </div>
  `;
  // Carousel events
  if(currentTestimonialIndex > 0)
    document.getElementById('prev-testi').onclick = () => { currentTestimonialIndex--; updateTestimonialCarousel();};
  if(currentTestimonialIndex < currentTestimonialArray.length-1)
    document.getElementById('next-testi').onclick = () => { currentTestimonialIndex++; updateTestimonialCarousel();};
  document.querySelectorAll('.carousel-dot').forEach(dot => {
    dot.onclick = () => { currentTestimonialIndex = +dot.dataset.index; updateTestimonialCarousel();};
  });
}

document.getElementById('close-modal').onclick = () => hideModal(packageDetailsModal);
document.getElementById('close-modal').onkeypress = (e) => { if(e.key==="Enter"||e.key===" ") hideModal(packageDetailsModal);}
document.getElementById('close-booking').onclick = () => hideModal(bookingFormModal);
document.getElementById('close-booking').onkeypress = (e) => { if(e.key==="Enter"||e.key===" ") hideModal(bookingFormModal)}

bookFormEl.onsubmit = (e) => {
  e.preventDefault();
  const name = document.getElementById('traveler-name').value.trim();
  const date = document.getElementById('trip-date').value;
  const travelers = document.getElementById('num-travelers').value;
  alert(`Booking confirmed for ${name} on ${date} with ${travelers} travelers!`);
  hideModal(bookingFormModal);
  bookFormEl.reset();
};

searchBtn.onclick = () => {
  const destination = document.getElementById('destination').value.toLowerCase();
  const budget = +document.getElementById('budget').value;
  const filteredPackages = packages.filter(pkg =>
    pkg.destination.toLowerCase().includes(destination) &&
    (!budget || pkg.price <= budget)
  );
  displayPackages(filteredPackages);
};

// Initial display
displayPackages(packages);

/* Accessibility: focus trap in modals */
function trapFocus(modal) {
  modal.addEventListener('keydown', function(e){
    const focusables = modal.querySelectorAll('a,button,input,[tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length-1];
    if(e.key === "Tab") {
      if(e.shiftKey) { if(document.activeElement===first){ last.focus(); e.preventDefault();}}
      else { if(document.activeElement===last){ first.focus(); e.preventDefault();}}
    }
  });
}
trapFocus(packageDetailsModal);
trapFocus(bookingFormModal);
