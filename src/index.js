import './styles.css';
import './css/pagination.css';
import './js/local-storage';
import { onOpenModal } from './js/modal';
import { toShowTrailer } from './js/modal';
import './css/styles.css';
import './js/modal';
import './css/loader.css';
import './js/search-movies';
// import './js/library-watched-queue';
import MovieApiService from './api/apiService';
import createMovieCardsTPL from './templates/movie-card.hbs';
import filmCardTpl from './templates/modal.hbs';
import refs from './js/refs';
import loader from './js/loader';

const movieSearcher = new MovieApiService();

getMovies();
refs.mainContent.addEventListener('click', onOpenModal);

function setPage(page, pages) {
  // console.log(page);
  // console.log(pages);
}

// Рендер модалки
export function renderModal(movie, id) {
  
  const markup = filmCardTpl(movie);
  refs.filmInfo.innerHTML = markup;

  const trailerBtn = document.querySelector('[data-name="trailer"]');
  trailerBtn.addEventListener('click', () => {
    toShowTrailer(id);
  });

  console.log(trailerBtn);
}
// 
async function getMovies() {
  try {
    loader.loader.show();
    const movies = await movieSearcher.fetchMovies(
      movieSearcher.fetchTrendingMovies.bind(movieSearcher),
      setPage,
    );

    loader.loader.close();
    refs.mainContent.innerHTML = createMovieCardsTPL(movies);
  } catch (error) {
    console.log(error);
  }
}
