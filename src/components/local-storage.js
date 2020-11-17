// обьект для примера
const movieObj1 = {
  name: 'film1',
  length: 120,
  genre: ['crime', 'drama'],
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

//-----------------------------------
// let queueMovieArr = [];
// let deleteMovieBtn = document.querySelector('.add-queue-movie');
// // функция добавления фильма в очередь
// function onQueueBtnClick() {
//   // добавляем объект в массив
//   queueMovieArr.push(movieObj1);
//   // добавляем массив в локалСторэдж и делаем строкой
//   localStorage.setItem('queueMovieArr', JSON.stringify(queueMovieArr));
//   // добавляем класс на кнопку
//   addQueueMovieBtn.classList.toggle('delete-movie');
//   const deleteMovieBtn = document.querySelector('.delete-movie');
//   // вешаем слушатель на кнопку удвления
//   deleteMovieBtn.addEventListener('click', delQueueMovie);
//   // снимаем слушатель с кнопки добавления
//   addQueueMovieBtn.removeEventListener('click', onQueueBtnClick);
//   // меняем текстКонтент
//   addQueueMovieBtn.textContent = 'Delete movie';
// }

// const storageParsed = JSON.parse(localStorage.queueMovieArr);

// // функция удаления фильма из очереди
// function delQueueMovie() {
//   // перебираем массив
//   for (let i = 0; i < storageParsed.length; i += 1) {
//     // ищем объект для удаления
//     if (storageParsed[i].name === movieObj1.name) {
//       // удаляем объект из массива
//       storageParsed.splice(i, 1);
//       // записываем строку в локалсторэдж
//       localStorage.queueMovieArr = JSON.stringify(storageParsed);
//     }
//   }
//   // вешаем слушатель на кнопку добавления
//   addQueueMovieBtn.addEventListener('click', onQueueBtnClick);
//   // снимаем слушатель с кнопки удаления
//   deleteMovieBtn.removeEventListener('click', delQueueMovie);
//   // меняем текстконтент кнопки добавления
//   addQueueMovieBtn.textContent = 'Add to queue';
// }
// localStorageQueueData === null
//   ? (addToQueueMovieBtn.textContent = 'Add to queue')
//   : JSON.parse(localStorageQueueData).find(el => el.name === movieObj1.name)
//   ? (addToQueueMovieBtn.textContent = 'Delete from queue')
//   : (addToQueueMovieBtn.textContent = 'Add to queue');
//-------------------------------------------
// localStorageWatchedData === null
//   ? (addToWatchedMovieBtn.textContent = 'Add to watched')
//   : JSON.parse(localStorageWatchedData).find(el => el.name === movieObj2.name)
//   ? (addToWatchedMovieBtn.textContent = 'Delete from watched')
//   : (addToWatchedMovieBtn.textContent = 'Add to watched');
