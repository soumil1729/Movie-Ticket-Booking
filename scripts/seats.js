'use strict';
// global
const overlay = document.getElementById('overlay-effect');
const overlayUp = () => (overlay.className = 'animate-up');
const removeOverlay = () => (overlay.className = '');
const overlayDown = () => (overlay.className = 'animate-down');
let onClickcAddSeats;
const ticketContainer = document.querySelector('.ticket-container');

let totalBookingAmountPayable = 0;
const checkboxDonation = document.getElementById('donation__hunger');
const bookingAmountPayable = document.getElementById('booking__amount-payable');
const bookingButtonTotal = document.getElementById('booking_btn_total');

// 🪑🪑🪑
const payoutBtn = document.querySelector('.pay-out-container');
const contianer = document.querySelector('.seat-container');
const overlayseats = document.querySelector('.overlay');

function renderSeats(movieImg, title, release_date, dummyPrice = '3000') {
  const primeSeats = document.querySelectorAll(
    '.prime-seats .rows .seat:not(.unavailable)'
  );
  const classicSeats = document.querySelectorAll(
    '.classic-seats .rows .seat:not(.unavailable)'
  );
  const count = document.querySelector('.ticket-count');
  const total = document.querySelector('.total');
  const book = document.querySelector('.book-button');
  const movieBanner = document.querySelector('.movie-banner-img');
  const movieTitle = document.querySelector('.section-movie-seats-title');
  const primeSeatsPrices = document.querySelector('.prime__seats-prices');
  const classicSeatsPrices = document.querySelector('.classic__seats-prices');

  const classicPrice = dummyPrice.slice(0, 3);
  const primePrice = +classicPrice + 200;

  primeSeatsPrices.textContent = `(₹${primePrice})`;
  classicSeatsPrices.textContent = `(₹${classicPrice})`;

  // --adding movie banner--
  const movieTitleDate = document.createElement('span');
  movieTitleDate.classList.add('section-movie-seats-title-date');

  function addMoviebanner() {
    movieBanner.style.backgroundImage = `url(${movieImg})`;
    movieTitle.innerHTML = title;
    movieTitleDate.textContent = `(${new Date(release_date).getFullYear()})`;
    movieTitle.appendChild(movieTitleDate);
  }

  addMoviebanner(); //function call

  // update the total amount and ticket
  function updateCountTotal() {
    const selectedPrimeSeats = document.querySelectorAll(
      '.prime-seats .rows .seat.selected'
    ).length;
    const selectedClassicSeats = document.querySelectorAll(
      '.classic-seats .rows .seat.selected'
    ).length;

    const totalSeats = selectedPrimeSeats + selectedClassicSeats;
    const subTotal =
      selectedClassicSeats * classicPrice + selectedPrimeSeats * primePrice;

    if (totalSeats > 0) payoutBtn.classList.add('active');
    else payoutBtn.classList.remove('active');

    count.textContent = totalSeats;
    total.textContent = `₹${subTotal}`;

    book.addEventListener('click', () => {
      ticketContainer.classList.add('active');
      payoutBtn.classList.remove('active');
      overlayseats.classList.remove('hidden');

      bookingTickets(
        totalSeats,
        subTotal,
        selectedClassicSeats,
        selectedPrimeSeats
      ); //function call
    });
  }

  // 🎟️🎟️BOOKING ticket fuction
  function bookingTickets(
    totalSeats,
    subTotal,
    selectedClassicSeats,
    selectedPrimeSeats
  ) {
    const numberofTickets = document.getElementById('booking__ticket-numbers');
    const bookingTotalPrice = document.getElementById('booking__total-price');
    const smallTicketNumber = document.getElementById('number__of-tickets');
    const primeAndclassicTickets = document.getElementById(
      'prime__classic-tickets'
    );
    const convenienceFess = document.getElementById(
      'booking__convenience__fees'
    );
    const bookingSubtotal = document.getElementById('booking__Subtotal');

    numberofTickets.textContent = `Tickets x${totalSeats}`;
    smallTicketNumber.textContent = `${totalSeats} Tickets`;
    bookingTotalPrice.textContent = `₹${subTotal}`;
    primeAndclassicTickets.textContent = '';
    if (selectedPrimeSeats > 0) {
      const html = `<span> ₹${primePrice}x${selectedPrimeSeats} </span><br />`;
      primeAndclassicTickets.insertAdjacentHTML('beforeend', html);
    }

    if (selectedClassicSeats > 0) {
      const html = `<span> ₹${classicPrice}x${selectedClassicSeats} </span><br />`;
      primeAndclassicTickets.insertAdjacentHTML('beforeend', html);
    }

    let convenience = 62.79;
    convenienceFess.textContent = convenience;
    bookingSubtotal.textContent = subTotal + convenience;

    totalBookingAmountPayable = subTotal + convenience;
    bookingAmountPayable.textContent = totalBookingAmountPayable;

    bookingButtonTotal.textContent = totalBookingAmountPayable;
  }

  onClickcAddSeats = function (e) {
    if (
      e.target.classList.contains('seat') &&
      !e.target.classList.contains('unavailable')
    ) {
      e.target.classList.toggle('selected');
      payoutBtn.classList.add('active');
      updateCountTotal(); //function call
    }
    contianer.setAttribute('listener', 'true');
  };
  // selected items
  contianer.addEventListener('click', onClickcAddSeats);

  const ticketOverlayClose = document.querySelector('.ticket__close-svg');
  // overlay deactive
  ticketOverlayClose.addEventListener('click', function (e) {
    overlayseats.classList.add('hidden');
    payoutBtn.classList.add('active');
    ticketContainer.classList.remove('active');
  });
}

// renderSeats();

// onlick global checkbox function
function addtwo() {
  checkboxDonation.checked
    ? (totalBookingAmountPayable += 2)
    : (totalBookingAmountPayable -= 2);
  bookingAmountPayable.textContent = totalBookingAmountPayable;
  bookingButtonTotal.textContent = totalBookingAmountPayable;
}

// contianer.removeEventListener('click', onSeatClick);
