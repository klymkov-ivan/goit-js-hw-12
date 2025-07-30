import axios from 'axios';

export async function getImagesByQuery(query, page) {
  const baseURL = 'https://pixabay.com/api/?';
  const searchParams = new URLSearchParams({
    key: '51454782-596154fd852b0fd151dc4a6b5',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    q: query,
    page: page,
    per_page: '15',
  });

  const response = await axios(`${baseURL}${searchParams}`);
  return response.data;
}
