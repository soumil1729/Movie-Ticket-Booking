'use strict';
// global
const movieSeats = document.querySelector('.section-movie-seats');
const moviesContainer = document.getElementById('movies-contianer');

let goToseats;
const addMoviestoDom = function () {
  let m;
  const date = new Date();
  let [year, month, day] = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ];
  //0 index so
  month = month + 1;
  month = month > 9 ? month : '0' + month;
  const fromDate = `${year}-${+month > 1 ? '0' + (+month - 1) : month}-${
    '0' + 1
  }`;

  const currdate = `${year}-${month}-${'0' + day}`;

  const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=697a7d177fc38d7f49f014df954ecffa&primary_release_date.gtecl=${fromDate}&primary_release_date.lte=${currdate}`;
  const perPendImg = 'https://image.tmdb.org/t/p/w1280';
  const SEARCH_API =
    'https://api.themoviedb.org/3/search/movie?api_key=697a7d177fc38d7f49f014df954ecffa&query="';

  // popularity percentage
  const circle = document.querySelector('.progress-circle');
  const circumference = circle.getTotalLength();
  const calProgress = function (rating) {
    return circumference - (rating / 100) * circumference;
  };

  // ----updating dom movies---//
  const showMovies = function (movies) {
    moviesContainer.innerHTML = '';
    m = movies;
    const languageFullform = new Intl.DisplayNames(['en'], {
      type: 'language',
    });

    const getClassbyRate = (ratings) => {
      if (ratings >= 7) return 'green';
      else if (ratings >= 5) return 'yellow';
      else return 'red';
    };

    movies.forEach((movie) => {
      const {
        title,
        id,
        overview,
        poster_path,
        vote_average,
        popularity,
        release_date,
        original_language,
        backdrop_path,
      } = movie;
      const options = { month: 'short', day: 'numeric', year: 'numeric' };

      const dateRelease = new Date(release_date).toLocaleDateString(
        'en-US',
        options
      );

      const html = `
    <div class="movie-wrap">
        <div class="movie" id="${id}">
          <div class="movie-ratings ${getClassbyRate(
            vote_average
          )}">${vote_average}</div>
          <div class="movie-front">
            <img
              class="thumbnail"
              src="${perPendImg + poster_path}"
              alt="${title}"
            />
            <h3 class="movie-title">${title}</h3>

            <div class="movie-stats">
            <p class="move-release-date">${dateRelease}</p>

            <svg class="percentage" width="100" height="100">
              <circle
                class="progress-circle ${getClassbyRate(vote_average)}"
                cx="50"
                cy="50"
                r="20"
                stroke-dashoffset="${calProgress(vote_average * 10)}"
                fill="transparent"
              />
              <text
                class="percent-text"
                x="50"
                y="50"
                alignment-baseline="middle"
                text-anchor="middle"
              >
                ${vote_average * 10}%
              </text>
            </svg>
          </div>
          </div>

          <div class="movie-back">
            <div class="movie-info">
              <p class="overview">
                ${overview}
              </p>
            </div>
            <a class="btn" href="#">Book Ticket</a>
            <div class="movie-back-stats">
              <p class="language"><span>${languageFullform.of(
                original_language
              )}</span></p>
              <div class="movie-popularity">
                <ion-icon class="popularity-svg" name="happy-outline"></ion-icon
                ><span>${Math.round(popularity)}</span>
              </div>
            </div>
          </div>
          <div class="background"></div>
        </div>
        </div>
        `;
      moviesContainer.insertAdjacentHTML('beforeend', html);
    });
  };

  //rendering seats 3rd screen
  const gotoBookigSeats = function (movies) {
    goToseats = function (e) {
      e.preventDefault();

      if (!e.target.classList.contains('btn')) return;
      const Movieid = e.target.closest('.movie').id;
      // console.log(movies);
      let [{ backdrop_path, title, release_date, popularity }] = movies.filter(
        (movie) => movie.id === +Movieid
      );

      backdrop_path = perPendImg + backdrop_path;
      sectionMovies.classList.add('hidden');
      renderSeats(backdrop_path, title, release_date, popularity.toString());
      overlayUp();
      movieSeats.classList.remove('hidden');
    };

    moviesContainer.addEventListener('click', goToseats);
  };

  //loading API
  const fetchMovies = async function (url) {
    const res = await fetch(url);
    const data = await res.json();
    gotoBookigSeats(data.results);
    showMovies(data.results);
  };

  fetchMovies(API_URL);
};

// addMoviestoDom();
