import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  lengthCheck,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/styles.css';

const form = document.querySelector('form');
form.addEventListener('submit', handleGallery);

const loadMoreBtn = document.querySelector('#load-btn');

let page = 1;
let currentQuery = '';

async function handleGallery(event) {
  event.preventDefault();
  showLoader();
  hideLoadMoreButton();

  const searchQuery = event.target.elements['search-text'].value.trim();

  if (!searchQuery) {
    hideLoader();
    iziToast.show({
      message: 'Please, fill in the search field!',
      position: 'topCenter',
      color: '#ef4040',
      messageColor: '#fff',
      titleColor: '#fff',
    });
    return;
  }

  page = 1;
  currentQuery = searchQuery;
  clearGallery();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    if (!data.hits.length) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topCenter',
        color: '#ef4040',
        messageColor: '#fff',
        titleColor: '#fff',
      });
      return;
    }

    createGallery(data.hits);
    console.log(data.totalHits);
    lengthCheck(data.hits.length);
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    createGallery(data.hits);

    const firstCard = document.querySelector('.gallery-item');
    if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    if (data.hits.length < 12 || page * 12 >= data.totalHits) {
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }

    lengthCheck(data.hits.length);
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
});
