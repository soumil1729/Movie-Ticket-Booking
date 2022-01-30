'use strict';

const dummyData = {
  username: 'soumil',
  pin: '1111',
};

const demoLogin = function () {
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const login = document.getElementById('login');
  const form = document.querySelector('.admin-container');
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
const cover = document.querySelector('.loading-animation');
const sectionMovies = document.querySelector('.section-movies ');
const moviesContainer = document.getElementById('movies-contianer');
const loginform = document.querySelector('.login-form');
const movieSeats = document.querySelector('.section-movie-seats');

const animationTimeOut = () =>
  setTimeout(() => cover.classList.remove('active'), 1000);

function activeMovies() {
  loginform.classList.add('hidden');
  cover.classList.add('active');

  animationTimeOut();
  setTimeout(() => {
    sectionMovies.classList.remove('hidden');
    addMoviestoDom();
  }, 1100);

  moviesContainer.addEventListener('click', function (e) {
    e.preventDefault();
    if (!e.target.classList.contains('btn')) return;
    sectionMovies.classList.add('hidden');
    cover.classList.add('active');
    animationTimeOut();
    setTimeout(() => movieSeats.classList.remove('hidden'), 1100);
  });
}
