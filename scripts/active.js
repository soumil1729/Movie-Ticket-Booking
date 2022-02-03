'use strict';

const dummyData = {
  username: 'soumil',
  pin: '1111',
};

const demoLogin = function () {
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const login = document.getElementById('login');
  const error = document.querySelector('.error');
  login.addEventListener('click', function (e) {
    e.preventDefault();
    const user = username.value.toLowerCase().trim();
    const pin = password.value.trim();

    if (user === dummyData.username && pin === dummyData.pin) {
      activeMovies();
      error.classList.remove('active');
      username.value = password.value = '';
    } else error.classList.add('active');
  });
};

demoLogin();
const sectionMovies = document.querySelector('.section-movies ');
const loginform = document.querySelector('.login-form');

function activeMovies() {
  loginform.classList.add('hidden');
  overlayUp();
  sectionMovies.classList.remove('hidden');
  addMoviestoDom();
  setTimeout(removeOverlay, 1010);
}

const goBack = () => {
  sectionMovies.classList.remove('hidden');
  movieSeats.classList.add('hidden');

  document
    .querySelectorAll('.prime-seats .rows .seat.selected')
    .forEach((el) => el.classList.remove('selected'));
  document
    .querySelectorAll('.classic-seats .rows .seat.selected')
    .forEach((el) => el.classList.remove('selected'));
  payoutBtn.classList.remove('active');
  contianer.removeEventListener('click', onClickcAddSeats);
  // moviesContainer.removeEventListener('click', goToseats);
  ticketContainer.classList.remove('active');
  overlayseats.classList.add('hidden');
  overlayDown();
};
const bookingBtn = document.getElementById('booking-button');
// booking btn in seats js
bookingBtn.addEventListener('click', function (e) {
  bookingBtn.classList.add('button-loading');

  setTimeout(() => {
    bookingBtn.classList.remove('button-loading');
    bookingBtn.classList.add('button-done');
  }, 2500);

  setTimeout(() => {
    // overlayDown();
    bookingBtn.classList.remove('button-done');
    goBack();
  }, 4000);
});

// activeMovies();

//back to movies
const backtoMovies = document.querySelector('.section__seats-back-icon');
backtoMovies.addEventListener('click', function () {
  if (!confirm('All your progress will be lost')) return;
  goBack();
});
