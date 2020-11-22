import '../css/modal.css';
import Api from '../api/apiService';
import filmCardTpl from '../templates/modal.hbs';

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
  // e.preventDefault();

  if (e.target.tagName !== 'IMG') {
    return;
  }

  const id = e.target.id;
  // console.log(id);
  getMovie(id);

  refs.modalWindow.classList.add('is-open');
  refs.modalClose.addEventListener('click', onCloseModal);
  refs.overlay.addEventListener('click', onCloseClickOverlay);
  window.addEventListener('keydown', onCloseEscPress);
  // const currentMovie = movie;
}

// function OnOpenModalbyImgClick(e) {

//     if (e.target.tagName === 'IMG') {
//         onOpenModal(e.target.dataset.id)
//     }

// }

function renderModal(movie) {
  //
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
  // console.log(addToWatching);
  // console.log(addToQueue);

  if (addToWatching && addToQueue) {
    markup;
  }
  //--------------------------жесть---------------------
  const addToQueueMovieBtn = document.querySelector('.film-buttons__queue');
  addToQueueMovieBtn.addEventListener('click', addToQueue1);
  const addToWatchedMovieBtn = document.querySelector('.film-buttons__watched');
  addToWatchedMovieBtn.addEventListener('click', addToWatched1);

  //--------------------------------
  //функция добавления и удаления объекта фильма в localStorage для Queue
  function addToQueue1() {
    let queueMovieArr = [];
    let localStorageData = localStorage.getItem('queueMovieArr');
    if (localStorageData) {
      queueMovieArr.push(...JSON.parse(localStorageData));
    }
    if (queueMovieArr.find(el => el.name === movie.name)) {
      queueMovieArr = queueMovieArr.filter(el => el.name !== movie.name);
    } else {
      queueMovieArr.push(movie);
    }
    localStorage.setItem('queueMovieArr', JSON.stringify(queueMovieArr));
    changeAddQueueBtnTextContent();
  }

  //----------------------------------
  //функция добавления и удаления объекта фильма в localStorage для Queue
  function addToWatched1() {
    let watchedMovieArr = [];
    let localStorageData = localStorage.getItem('watchedMovieArr');
    if (localStorageData) {
      watchedMovieArr.push(...JSON.parse(localStorageData));
    }
    if (watchedMovieArr.find(el => el.name === movie.name)) {
      watchedMovieArr = watchedMovieArr.filter(el => el.name !== movie.name);
    } else {
      watchedMovieArr.push(movie);
    }
    localStorage.setItem('watchedMovieArr', JSON.stringify(watchedMovieArr));
    changeAddWatchedBtnTextContent();
  }

  // проверка актуальности текстконтента кнопок
  //-----------Queued--------
  let localStorageQueuedData = localStorage.getItem('queueMovieArr');
  if (JSON.parse(localStorageQueuedData).length > 0) {
    addToQueueMovieBtn.textContent = 'Delete from Queue';
    addToQueueMovieBtn.classList.add('delete-movie');
  } else {
    addToQueueMovieBtn.textContent = 'Add to Queue';
    addToQueueMovieBtn.classList.remove('delete-movie');
  }

  //-----------Watched-------
  let localStorageWatchedData = localStorage.getItem('watchedMovieArr');
  if (JSON.parse(localStorageWatchedData).length > 0) {
    addToWatchedMovieBtn.textContent = 'Delete from Watched';
    addToWatchedMovieBtn.classList.add('delete-movie');
  } else {
    addToWatchedMovieBtn.textContent = 'Add to Watched';
    addToWatchedMovieBtn.classList.remove('delete-movie');
  }

  //-------------------------
  // функция изменения текстконтента и цсс класса кнопок Queue
  function changeAddQueueBtnTextContent() {
    let localStorageQueueData = localStorage.getItem('queueMovieArr');
    if (JSON.parse(localStorageQueueData).find(el => el.name === movie.name)) {
      addToQueueMovieBtn.textContent = 'Delete from Queue';
      addToQueueMovieBtn.classList.add('delete-movie');
    } else {
      addToQueueMovieBtn.textContent = 'Add to Queue';
      addToQueueMovieBtn.classList.remove('delete-movie');
    }
  }
  //--------------------------
  // функция изменения текстконтента и цсс класса кнопок Watched
  function changeAddWatchedBtnTextContent() {
    let localStorageWatchedData = localStorage.getItem('watchedMovieArr');
    if (
      JSON.parse(localStorageWatchedData).find(el => el.name === movie.name)
    ) {
      addToWatchedMovieBtn.textContent = 'Delete from Watched';
      addToWatchedMovieBtn.classList.add('delete-movie');
    } else {
      addToWatchedMovieBtn.textContent = 'Add to Watched';
      addToWatchedMovieBtn.classList.remove('delete-movie');
    }
  }

  //--------------------------жесть---------------------
}

function onCloseModal() {
  window.removeEventListener('keydown', onCloseEscPress);
  refs.overlay.removeEventListener('click', onCloseClickOverlay);
  refs.modalWindow.classList.remove('is-open');
  refs.body.classList.remove('modal-open');
  addToQueueMovieBtn.removeEventListener('click', addToQueue1);
  addToWatchedMovieBtn.removeEventListener('click', addToWatched1);
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
