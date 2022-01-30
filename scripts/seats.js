'use strict';

const primeSeats = document.querySelectorAll(
  '.prime-seats .rows .seat:not(.unavailable)'
);
const classicSeats = document.querySelectorAll(
  '.classic-seats .rows .seat:not(.unavailable)'
);
const contianer = document.querySelector('.seat-container');
const payoutBtn = document.querySelector('.pay-out-container');
const count = document.querySelector('.ticket-count');
const total = document.querySelector('.total');
const ticketContainer = document.querySelector('.ticket-container');
const book = document.querySelector('.book-button');
const overlay = document.querySelector('.overlay');

// update the total amount and ticket
function updateCountTotal() {
  const selectedPrimeSeats = document.querySelectorAll(
    '.prime-seats .rows .seat.selected'
  ).length;
  const selectedClassicSeats = document.querySelectorAll(
    '.classic-seats .rows .seat.selected'
  ).length;

  if (selectedPrimeSeats + selectedClassicSeats > 0) {
    payoutBtn.classList.add('active');
  } else {
    payoutBtn.classList.remove('active');
  }

  count.textContent = selectedPrimeSeats + selectedClassicSeats;

  total.textContent = `₹${
    (selectedClassicSeats + selectedPrimeSeats * 1.5) * 400
  }`;
}

// selected items
contianer.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('unavailable')
  ) {
    e.target.classList.toggle('selected');
    payoutBtn.classList.add('active');
    updateCountTotal();
  }
});

book.addEventListener('click', () => {
  ticketContainer.classList.add('active');
  payoutBtn.classList.remove('active');
  overlay.classList.remove('hidden');
});
