import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './css/styles.css';

const form = document.querySelector('form');
const loadMoreBtn = document.querySelector('#load-btn');

form.addEventListener('submit', handleGallery);
loadMoreBtn.addEventListener('click', handleLoadMore);

let page = 1;
let currentQuery = '';
const perPage = 15;

function lengthCheck(totalHits) {
  if (page * perPage >= totalHits) {
    iziToast.show({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topCenter',
      color: '#ef4040',
      messageColor: '#fff',
      titleColor: '#fff',
    });
    hideLoadMoreButton();
  } else {
    showLoadMoreButton();
  }
}

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
    lengthCheck(data.totalHits);
  } catch (error) {
    console.log(error);
    iziToast.show({
      message: 'Sorry, something went wrong.',
      position: 'topCenter',
      color: '#ef4040',
      messageColor: '#fff',
      titleColor: '#fff',
    });
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
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

    lengthCheck(data.totalHits);
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}
