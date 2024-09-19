const packages = [
  { id: 1, destination: 'Goa', price: 8000, rating: 4.9, description: 'Relax on the beautiful beaches of Goa.' },
  { id: 2, destination: 'Manali', price: 12000, rating: 4.8, description: 'Enjoy the scenic beauty of Himachal Pradesh.' },
  { id: 3, destination: 'Jaipur', price: 7000, rating: 4.7, description: 'Explore the royal heritage of the Pink City.' },
  { id: 4, destination: 'Kerala', price: 15000, rating: 4.8, description: 'Experience the serenity of the backwaters.' },
  { id: 5, destination: 'Ladakh', price: 20000, rating: 4.9, description: 'Adventure awaits in the high altitudes of Ladakh.' },
];

const packageListEl = document.getElementById('package-list');
const searchBtn = document.getElementById('search-btn');
const packageDetailsModal = document.getElementById('package-details');
const packageInfoEl = document.getElementById('package-info');
const bookingFormModal = document.getElementById('booking-form');
const bookFormEl = document.getElementById('book-form');

function displayPackages(packagesToDisplay) {
  packageListEl.innerHTML = '';
  packagesToDisplay.forEach((pkg) => {
    const packageItem = document.createElement('div');
    packageItem.classList.add('package-item');
    packageItem.innerHTML = `
      <h3>${pkg.destination}</h3>
      <p>Price: ₹${pkg.price}</p>
      <p>Rating: ${pkg.rating}</p>
      <button class="details-btn" data-id="${pkg.id}">Details</button>
    `;
    packageListEl.appendChild(packageItem);
  });
}

searchBtn.addEventListener('click', () => {
  const destination = document.getElementById('destination').value.toLowerCase();
  const budget = document.getElementById('budget').value;

  const filteredPackages = packages.filter((pkg) => {
    return (
      pkg.destination.toLowerCase().includes(destination) &&
      (!budget || pkg.price <= budget)
    );
  });

  displayPackages(filteredPackages);
});

packageListEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('details-btn')) {
    const packageId = e.target.getAttribute('data-id');
    const pkg = packages.find((p) => p.id === parseInt(packageId));

    packageInfoEl.innerHTML = `
      <h2>${pkg.destination}</h2>
      <p>Price: ₹${pkg.price}</p>
      <p>Rating: ${pkg.rating}</p>
      <p>${pkg.description}</p>
      <button id="book-btn">Book Now</button>
    `;

    packageDetailsModal.style.display = 'block';

    document.getElementById('book-btn').addEventListener('click', () => {
      packageDetailsModal.style.display = 'none';
      bookingFormModal.style.display = 'block';
    });
  }
});

document.getElementById('close-modal').onclick = () => {
  packageDetailsModal.style.display = 'none';
};

document.getElementById('close-booking').onclick = () => {
  bookingFormModal.style.display = 'none';
};

bookFormEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('traveler-name').value;
  const date = document.getElementById('trip-date').value;
  const travelers = document.getElementById('num-travelers').value;

  alert(`Booking confirmed for ${name} on ${date} with ${travelers} travelers!`);
  bookingFormModal.style.display = 'none';
});

displayPackages(packages);
