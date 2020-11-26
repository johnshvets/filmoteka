import '../css/loader.css';
import * as basicLightbox from 'basiclightbox';

const markup = `<div id="loader">
    <div>G</div>
    <div>N</div>
    <div>I</div>
    <div>D</div>
    <div>A</div>
    <div>O</div>
    <div>L</div>
  </div>`;

const loader = basicLightbox.create(markup);

export default { loader };
