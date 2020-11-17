import tamplate from './templates.hbs';
// обьект для примера
const movieObj1 = {
  name: 'film1',
  length: 120,
  genres: ['crime', 'drama'],
};
const movieObj2 = {
  name: 'film2',
  length: 122,
  genre: ['crime'],
};
//--------------------------------
const addToQueueMovieBtn = document.querySelector('.add-queue-movie');
addToQueueMovieBtn.addEventListener('click', addToQueue);
const addToWatchedMovieBtn = document.querySelector('.add-watched-movie');
addToWatchedMovieBtn.addEventListener('click', addToWatched);
function addToQueue() {
  let queueMovieArr = [];
  let localStorageData = localStorage.getItem('queueMovieArr');
  if (localStorageData) {
    queueMovieArr.push(...JSON.parse(localStorageData));
  }
  if (queueMovieArr.find(el => el.name === movieObj1.name)) {
    queueMovieArr = queueMovieArr.filter(el => el.name !== movieObj1.name);
  } else {
    queueMovieArr.push(movieObj1);
  }
  localStorage.setItem('queueMovieArr', JSON.stringify(queueMovieArr));
  changeAddBtnTextContent();
}
function addToWatched() {
  let watchedMovieArr = [];
  let localStorageData = localStorage.getItem('watchedMovieArr');
  if (localStorageData) {
    watchedMovieArr.push(...JSON.parse(localStorageData));
  }
  if (watchedMovieArr.find(el => el.name === movieObj2.name)) {
    watchedMovieArr = watchedMovieArr.filter(el => el.name !== movieObj2.name);
  } else {
    watchedMovieArr.push(movieObj2);
  }
  localStorage.setItem('watchedMovieArr', JSON.stringify(watchedMovieArr));
  changeAddBtnTextContent();
}
// функция изменения текстконтента кнопок
function changeAddBtnTextContent() {
  let localStorageQueueData = localStorage.getItem('queueMovieArr');

  if (localStorageQueueData === null) {
    addToQueueMovieBtn.textContent = 'Add to queue';
  }
  if (
    JSON.parse(localStorageQueueData).find(el => el.name === movieObj1.name)
  ) {
    addToQueueMovieBtn.textContent = 'Delete from queue';
  } else {
    addToQueueMovieBtn.textContent = 'Add to queue';
  }
  //--------------------------------------
  let localStorageWatchedData = localStorage.getItem('watchedMovieArr');

  if (localStorageWatchedData === null) {
    addToWatchedMovieBtn.textContent = 'Add to watched';
  }
  if (
    JSON.parse(localStorageWatchedData).find(el => el.name === movieObj2.name)
  ) {
    addToWatchedMovieBtn.textContent = 'Delete from watched';
  } else {
    addToWatchedMovieBtn.textContent = 'Add to watched';
  }
}
// функция примерного рендера библиотеки
function renderLibraryMarkup(data) {
  const localStorageData = JSON.parse(localStorage.getItem(data));
  localStorageData.map(el => {
    console.log(el);
    const body = document.querySelector('body');
    const movieCard = tamplate(el);
    body.insertAdjacentHTML('afterbegin', movieCard);
  });
}
renderLibraryMarkup('watchedMovieArr');
