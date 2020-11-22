import MovieApiService from '../api/apiService';
import createMovieCardsTPL from '../templates/movie-card.hbs';

const searchMovieForm = document.querySelector('.form-js');

console.log(form);

searchMovieForm.addEventListener('submit', onFormChange);
searchMovieForm.addEventListener('input', onFormChange);

function onFormChange(e) {
  e.preventDefault();
}
