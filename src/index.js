import './styles.css';
// import './js/local-storage';
import { onOpenModal } from './js/modal';
import './css/styles.css';
import './js/modal';
import './css/loader.css';
import './js/search-movies';
// import './js/library-watched-queue';
import MovieApiService from './api/apiService';
import createMovieCardsTPL from './templates/movie-card.hbs';
import refs from './js/refs';

const movieSearcher = new MovieApiService();

getMovies();
refs.mainContent.addEventListener('click', onOpenModal);

function setPage(page, pages) {
  console.log(page);
  console.log(pages);
}

async function getMovies() {
  try {
    const movies = await movieSearcher.fetchMovies(
      movieSearcher.fetchTrendingMovies.bind(movieSearcher),
      setPage,
    );

    refs.mainContent.innerHTML = createMovieCardsTPL(movies);
  } catch (error) {
    console.log(error);
  }
}
