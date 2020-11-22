import '../css/modal.css';
import Api from '../api/apiService';
import filmCardTpl from '../templates/modal.hbs';
// подвязка к кнопке на боди просто для примера (удалить)

const refs = {
  // modalOpen: document.querySelector('.show-modal'),
  modalClose: document.querySelector('.lightbox_button'),
  modalWindow: document.querySelector('.js-lightbox'),
  overlay: document.querySelector('.lightbox_overlay'),
  filmInfo: document.querySelector('.lightbox_content'),
  body: document.querySelector('body'),
  // mainFilmContainer: document.getElementsByClassName('.movie-picture')
};

// console.log(refs.mainFilmContainer);

// refs.mainFilmContainer.addEventListener('click', onOpenModal);

const instance = new Api();

export function onOpenModal(e) {
  // e.preventDefault();

  if (e.target.tagName !== 'IMG') {
    return;
  }

  const id = e.target.id;
  console.log(id);
  getMovie(id);

  refs.modalWindow.classList.add('is-open');
  refs.modalClose.addEventListener('click', onCloseModal);
  refs.overlay.addEventListener('click', onCloseClickOverlay);
  window.addEventListener('keydown', onCloseEscPress);
}

// function OnOpenModalbyImgClick(e) {

//     if (e.target.tagName === 'IMG') {
//         onOpenModal(e.target.dataset.id)
//     }

// }

function renderModal(movie) {
  const markup = filmCardTpl(movie);
  refs.filmInfo.innerHTML = markup;
  let addToWatching = 0;
  let addToQueue = 0;
  let arrW = JSON.parse(localStorage.getItem('watchedMovieArr')) || [];
  let arrQ = JSON.parse(localStorage.getItem('queueMovieArr')) || [];

  arrW.forEach(el => {
    if (JSON.stringify(el) === JSON.stringify(currentId)) {
      addToWatching++;
    } else {
      return;
    }
  });

  arrQ.forEach(el => {
    if (JSON.stringify(el) === JSON.stringify(currentId)) {
      addToQueue++;
    } else {
      return;
    }
  });
  console.log(addToWatching);
  console.log(addToQueue);

  if (addToWatching && addToQueue) {
    markup;
  }

  console.log(markup);
}

function onCloseModal() {
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
  renderModal(movie);
}
