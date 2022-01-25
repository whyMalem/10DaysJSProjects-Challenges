const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector("#main");
const form = document.querySelector(".form");
const search = document.querySelector(".search");

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const resData = await res.json();

  //   console.log(resData);

  showAllMovies(resData.results);
}

function showAllMovies(results) {
  main.innerHTML = "";

  results.forEach((result) => {
    const { poster_path, title, vote_average, overview } = result;

    const movie = document.createElement("div");
    movie.classList.add("movie");

    movie.innerHTML = `
        <img
          src=${IMG_PATH + poster_path}
          alt="movie poster"
        />

        <div class="movie-info">
          <h3>${title}</h3>
          <span class=${getClassByRate(vote_average)} >${vote_average}</span>
        </div>

        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
    `;

    main.appendChild(movie);
  });
}

function getClassByRate(rating) {
  if (rating >= 8) {
    return "green";
  } else if (rating >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = search.value;
  if (searchValue) {
    getMovies(SEARCH_API + searchValue);

    search.value = "";
  }
});
