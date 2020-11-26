import '../css/modal.css';
import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";
import Api from '../api/apiService';
import filmCardTpl from '../templates/modal.hbs';
import { renderModal } from '../index';

// подвязка к кнопке на боди просто для примера (удалить)
// let movie = {};
const refs = {
  modalClose: document.querySelector('.lightbox_button'),
  modalWindow: document.querySelector('.js-lightbox'),
  overlay: document.querySelector('.lightbox_overlay'),
  filmInfo: document.querySelector('.lightbox_content'),
  body: document.querySelector('body'),
};

// console.log(refs.mainFilmContainer);

// refs.mainFilmContainer.addEventListener('click', onOpenModal);

const instance = new Api();

export function onOpenModal(e) {

  if (e.target.tagName !== 'IMG') {
    return;
  }

  const id = e.target.id;
  getMovie(id);

  refs.modalWindow.classList.add('is-open');
  refs.modalClose.addEventListener('click', onCloseModal);
  refs.overlay.addEventListener('click', onCloseClickOverlay);
  window.addEventListener('keydown', onCloseEscPress);
  // const currentMovie = movie;
}

// let id;
//   const trailerBtn = document.querySelector('[data-name="trailer"]');
//   trailerBtn.addEventListener('click', () => {
//     toShowTrailer(id);
//   });

//   console.log(trailerBtn);



export function toShowTrailer(id) {
  const ApiKey = 'd3b4e2b6590fadf64c27140207cd1cc0';

  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${ApiKey}&language=en-US`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const id = data.results[0].key;
      const instanceTrailer = basicLightbox.create(`<iframe width="560" height="315" src='https://www.youtube.com/embed/${id}'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
      instanceTrailer.show();

    })
    .catch(() => {
      const instanceTrailer = basicLightbox.create(`<iframe width="560" height="315" src='https://www.youtube.com/embed/zwBpUdZ0lrQ'frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
      instanceTrailer.show();
    })
}


let currentId = 0;

//  export function renderModal(movie) {
  
//   const markup = filmCardTpl(movie);
//   refs.filmInfo.innerHTML = markup;
  // let addToWatching = 0;
  // let addToQueue = 0;
  // let arrW = JSON.parse(localStorage.getItem('watchedMovieArr')) || [];
  // let arrQ = JSON.parse(localStorage.getItem('queueMovieArr')) || [];

  // arrW.forEach(el => {
  //   if (JSON.stringify(el) === JSON.stringify(currentId)) {
  //     addToWatching++;
  //   } else {
  //     return;
  //   }
  // });

  // arrQ.forEach(el => {
  //   if (JSON.stringify(el) === JSON.stringify(currentId)) {
  //     addToQueue++;
  //   } else {
  //     return;
  //   }
  // });

  // if (addToWatching && addToQueue) {
  //   markup;
  // }
// }

  

export function onCloseModal() {
  window.removeEventListener('keydown', onCloseEscPress);
  refs.overlay.removeEventListener('click', onCloseClickOverlay);
  refs.modalWindow.classList.remove('is-open');
  refs.body.classList.remove('modal-open');
}

function onCloseEscPress(evt) {
  if (evt.code === 'Escape') {
    onCloseModal();
  }
}

function onCloseClickOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModal();
  }
}

async function getMovie(id) {
  const movie = await instance.fetchMovieByID(id);
  renderModal(movie, id);
}
