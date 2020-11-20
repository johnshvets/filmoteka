import './styles.css';
import './js/modal';
import './css/loader.css';
import './css/styles.css';
import MovieApiService from './api/apiService';
import createMovieCardsTPL from './templates/movie-card.hbs';

const mainContent = document.querySelector('main');
const movieSearcher = new MovieApiService();

getMovies();

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

    mainContent.innerHTML = createMovieCardsTPL(movies);
  } catch (error) {
    console.log(error);
  }
}
