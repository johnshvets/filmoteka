// !!!!!!обьект для примера после пула - удалить!!!!!!!!
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
//--------------------------------!!!!!!ПОМЕНЯТЬ НА АКТУАЛЬНЫЕ СЕЛЕКТОРЫ!!!!!!!
const addToQueueMovieBtn = document.querySelector('.add-queue-movie');
addToQueueMovieBtn.addEventListener('click', addToQueue);
const addToWatchedMovieBtn = document.querySelector('.add-watched-movie');
addToWatchedMovieBtn.addEventListener('click', addToWatched);

//--------------------------------
//функция добавления и удаления объекта фильма в localStorage для Queue
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
  changeAddQueueBtnTextContent();
}

//----------------------------------
//функция добавления и удаления объекта фильма в localStorage для Queue
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
  changeAddWatchedBtnTextContent();
}

// проверка актуальности текстконтента кнопок
//-----------Queued--------
let localStorageQueuedData = localStorage.getItem('queueMovieArr');
console.log(JSON.parse(localStorageQueuedData).length === 0);
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
  if (
    JSON.parse(localStorageQueueData).find(el => el.name === movieObj1.name)
  ) {
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
    JSON.parse(localStorageWatchedData).find(el => el.name === movieObj2.name)
  ) {
    addToWatchedMovieBtn.textContent = 'Delete from Watched';
    addToWatchedMovieBtn.classList.add('delete-movie');
  } else {
    addToWatchedMovieBtn.textContent = 'Add to Watched';
    addToWatchedMovieBtn.classList.remove('delete-movie');
  }
}
