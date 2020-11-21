//--------------------------------!!!!!!ПОМЕНЯТЬ НА АКТУАЛЬНЫЕ СЕЛЕКТОРЫ!!!!!!!

const btnWatched = document.querySelector('.btn-watch');
const btnQueue = document.querySelector('.btn-queue');
const resultMessage = document.querySelector('.no-result');

btnWatched.addEventListener('click', checkWatchedList);
btnQueue.addEventListener('click', checkQueueList);

// ф-я  добавления фильмов в просмотренные
function checkWatchedList() {
  let localStorageWatchedData = localStorage.getItem('watchedMovieArr');

  if (JSON.parse(localStorageWatchedData).length === 0) {
    resultMessage.classList.remove('is-hidden');
    console.log('Пусто');
    return;
  } else {
    resultMessage.classList.add('is-hidden');
    console.log(localStorageWatchedData);
  }
}

function checkQueueList() {
  let localStorageQueuedData = localStorage.getItem('queueMovieArr');

  if (JSON.parse(localStorageQueuedData).length === 0) {
    resultMessage.classList.remove('is-hidden');
    console.log('Пусто');
    return;
  } else {
    resultMessage.classList.add('is-hidden');
    console.log(localStorageQueuedData);
  }
}

// resultMessage.classList.add('is-hidden'); добавить эту строчку
// в ф - ю changeAddWatchedBtnTextContent и changeAddQueueBtnTextContent
