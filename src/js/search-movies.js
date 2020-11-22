import MovieApiService from '../api/apiService';
import createMovieCardsTPL from '../templates/movie-card.hbs';
import refs from './refs';
import debounce from 'lodash.debounce';

const movieSearcher = new MovieApiService();

refs.searchMovieForm.addEventListener('submit', onFormChange);
refs.searchMovieForm.addEventListener('input', debounce(onFormChange, 700));

function onFormChange(e) {
  if (e.target.tagName === 'FORM') {
    e.preventDefault();
  }

  if (e.target.tagName === 'INPUT') {
    movieSearcher.query = e.target.value;
  }

  if (movieSearcher.query === '') return;

  movieSearcher.resetPage();
  clearContent();

  getMovies();
}

async function getMovies() {
  try {
    const movies = await movieSearcher.fetchMovies(
      movieSearcher.fetchMoviesByKeyWord.bind(movieSearcher),
      setPage,
    );

    console.log(movies);

    setMoviesMarkup(movies);
  } catch (error) {
    console.log(error);
  }
}

function setMoviesMarkup(movies) {
  const moviesMarkup = createMovieCardsTPL(movies);

  refs.mainContent.innerHTML = moviesMarkup;
}

function clearContent() {
  refs.mainContent.innerHTML = '';
}

function setPage(page, pages) {
  console.log(page);
  console.log(pages);
}
