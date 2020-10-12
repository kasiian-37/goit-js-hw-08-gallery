import gallery from './gallery-items.js';

const galleryEl = document.querySelector('.js-gallery');
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
const modalEl = document.querySelector('.lightbox');
const modalImgEl = document.querySelector('.lightbox__image');
const overlayEl = document.querySelector('.lightbox__overlay');

function createGalleryCardMarkup(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
            <a href="${original}" class="gallery__link">
                <img src="${preview}" alt="${description}" class="gallery__image"/>
            </a>
        </li>`;
    })
    .join('');
}

const itemsMarkup = createGalleryCardMarkup(gallery);
galleryEl.insertAdjacentHTML('beforeend', itemsMarkup);

galleryEl.addEventListener('click', onClickGallery);
function onClickGallery(event) {
  event.preventDefault();

  const targetItem = event.target;
  const IsElemGallery = targetItem.closest('.gallery__item');
  if (!IsElemGallery) {
    return;
  }

  IsElemGallery.classList.add('is-active');
  openModal();
  setAttributeSrc(IsElemGallery);
  setAttributeAlt(IsElemGallery);
}

function openModal() {
  modalEl.classList.add('is-open');
  closeBtn.addEventListener('click', closeModal);
  overlayEl.addEventListener('click', onClickOverlay);
  window.addEventListener('keydown', onPressKey);
}

function setAttributeSrc(elem) {
  modalImgEl.src = elem.querySelector('.gallery__link').href;
}

function setAttributeAlt(elem) {
  modalImgEl.alt = elem.querySelector('.gallery__image').alt;
}

function closeModal() {
  modalEl.classList.remove('is-open');
  clearAttribute();
  closeBtn.removeEventListener('click', closeModal);
  overlayEl.removeEventListener('click', onClickOverlay);
  window.removeEventListener('keydown', onPressKey);
  galleryEl.querySelector('.is-active').classList.remove('is-active');
}

function clearAttribute() {
  modalImgEl.src = '';
  modalImgEl.alt = '';
}

function onClickOverlay() {
  closeModal();
}

//переключение клавиатурой

function onPressKey(event) {
  onPressKeyEsc(event);
  onPressKeyLeft(event);
  onPressKeyRight(event);
}

function onPressKeyEsc(event) {
  if (event.code !== 'Escape') {
    return;
  }
  closeModal();
}

function onPressKeyLeft(event) {
  if (event.code !== 'ArrowLeft') {
    return;
  }
  const activeEl = galleryEl.querySelector('.is-active');
  const previousEl = activeEl.previousElementSibling;
  if (previousEl === null) {
    return;
  }
  previousEl.classList.add('is-active');
  activeEl.classList.remove('is-active');
  setAttributeSrc(previousEl);
}

function onPressKeyRight(event) {
  if (event.code !== 'ArrowRight') {
    return;
  }
  const activeEl = galleryEl.querySelector('.is-active');
  const nextEl = activeEl.nextElementSibling;
  if (nextEl === null) {
    return;
  }
  nextEl.classList.add('is-active');
  activeEl.classList.remove('is-active');
  setAttributeSrc(nextEl);
}
