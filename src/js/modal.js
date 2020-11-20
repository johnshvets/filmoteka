import '../css/modal.css';
import filmCardTpl from "../templates/modal.hbs";
// подвязка к кнопке на боди просто для примера (удалить)

const refs = {
    modalOpen: document.querySelector('.show-modal'),
    modalClose: document.querySelector('.lightbox_button'),
    modalWindow: document.querySelector('.js-lightbox'),
    overlay: document.querySelector('.lightbox_overlay'),
    filmInfo: document.querySelector('.lightbox_content'),
    body: document.querySelector('body')
}

refs.modalOpen.addEventListener('click', onOpenModal);

// let currentId = 1;
// let idForLocalStorage = 1;


function fetchFilms(id) {
    const API_KEY = 'd3b4e2b6590fadf64c27140207cd1cc0';

    return fetch(` https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,)
        .then(r => r.json());
}

    

export function onOpenModal(id) {
    // refs.body.classList.add('modal-open');
    refs.modalWindow.classList.add('is-open');
    refs.modalClose.addEventListener('click', onCloseModal);
    refs.overlay.addEventListener('click', onCloseClickOverlay);
    window.addEventListener("keydown", onCloseEscPress);
    
    // renderModal();
}

// function getCurrentId(id) {
//     const getFilmInfo = pullData();
//     currentId;
//     getFilmInfo.forEach((el) => {
//         if (el.id === Number(id)) {
//             currentId = el;
//         }
//     });
//     showModal(currentId);
// }

function renderModal(film) {
    const markup = filmCardTpl(film);
    refs.filmInfo.innerHTML = markup;
    let addToWatching = 0;
    let addToQueue = 0;
    let arrW = JSON.parse(localStorage.getItem('watchedMovieArr')) || [];
    let arrQ = JSON.parse(localStorage.getItem('queueMovieArr')) || [];

    arrW.forEach((el) => {
        if (JSON.stringify(el) === JSON.stringify(currentId)) {
            addToWatching++;
        } else {
            return;
        }
    });

    arrQ.forEach((el) => {
        if (JSON.stringify(el) === JSON.stringify(currentId)) {
            addToQueue++;
        } else {
            return
        }
    });
    console.log(addToWatching);
    console.log(addToQueue);

    if (addToWatching && addToQueue) {
        markup;
    }

    console.log(markup)
    
}

function onCloseModal() {
    window.removeEventListener("keydown", onCloseEscPress);
    refs.overlay.removeEventListener('click', onCloseClickOverlay);
    refs.modalWindow.classList.remove('is-open');
    refs.body.classList.remove('modal-open');

}

function onCloseEscPress(evt) {
    if (evt.code === "Escape") {
        onCloseModal();
    }
}

function onCloseClickOverlay(evt) {
    if (evt.currentTarget === evt.target) {
        onCloseModal();
    }
}