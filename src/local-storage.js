// обьект для примера
const movieObj1 = {
  name: 'film1',
  length: 120,
  genre: ['crime', 'drama'],
};
//--------------------------------

let queueMovieArr = [];

const addQueueMovieBtn = document.querySelector('.add-queue-movie');
addQueueMovieBtn.addEventListener('click', onQueueBtnClick);
let deleteMovieBtn = document.querySelector('.add-queue-movie');
// функция добавления фильма в очередь
function onQueueBtnClick() {
  // добавляем объект в массив
  queueMovieArr.push(movieObj1);
  // добавляем массив в локалСторэдж и делаем строкой
  localStorage.setItem('queueMovieArr', JSON.stringify(queueMovieArr));
  // добавляем класс на кнопку
  addQueueMovieBtn.classList.toggle('delete-movie');
  const deleteMovieBtn = document.querySelector('.delete-movie');
  // вешаем слушатель на кнопку удвления
  deleteMovieBtn.addEventListener('click', delQueueMovie);
  // снимаем слушатель с кнопки добавления
  addQueueMovieBtn.removeEventListener('click', onQueueBtnClick);
  // меняем текстКонтент
  addQueueMovieBtn.textContent = 'Delete movie';
}

const storageParsed = JSON.parse(localStorage.queueMovieArr);

// функция удаления фильма из очереди
function delQueueMovie() {
  // перебираем массив
  for (let i = 0; i < storageParsed.length; i += 1) {
    // ищем объект для удаления
    if (storageParsed[i].name === movieObj1.name) {
      // удаляем объект из массива
      storageParsed.splice(i, 1);
      // записываем строку в локалсторэдж
      localStorage.queueMovieArr = JSON.stringify(storageParsed);
    }
  }
  // вешаем слушатель на кнопку добавления
  addQueueMovieBtn.addEventListener('click', onQueueBtnClick);
  // снимаем слушатель с кнопки удаления
  deleteMovieBtn.removeEventListener('click', delQueueMovie);
  // меняем текстконтент кнопки добавления
  addQueueMovieBtn.textContent = 'Add to queue';
}
