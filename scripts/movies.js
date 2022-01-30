'use strict';

const addMoviestoDom = function () {
  const date = new Date();
  let [year, month, day] = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ];
  month = month + 1 > 9 ? month + 1 : '0' + (month + 1);
  const fromDate = `${year}-${+month > 2 ? +month - 1 : month}-${1}`;
  console.log(fromDate);
  const currdate = `${year}-${month}-${day}`;

  const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=697a7d177fc38d7f49f014df954ecffa&primary_release_date.gtecl=${fromDate}&primary_release_date.lte=${currdate}`;
  const perPendImg = 'https://image.tmdb.org/t/p/w1280';
  const SEARCH_API =
    'https://api.themoviedb.org/3/search/movie?api_key=697a7d177fc38d7f49f014df954ecffa&query="';

  // console.log(API_URL);
  const moviesContainer = document.getElementById('movies-contianer');

  // popularity percentage
  const circle = document.querySelector('.progress-circle');
  const circumference = circle.getTotalLength();
  console.log(circumference);
  const calProgress = function (rating) {
    return circumference - (rating / 100) * circumference;
  };

  // ----updating dom movies---
  const showMovies = function (movies) {
    moviesContainer.innerHTML = '';

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
        <div class="movie">
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

  //loading API
  const fetchMovies = async function (url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results);
    showMovies(data.results);
  };
  fetchMovies(API_URL);
};

// addMoviestoDom();
