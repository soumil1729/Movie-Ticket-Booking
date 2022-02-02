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

// activeMovies();
