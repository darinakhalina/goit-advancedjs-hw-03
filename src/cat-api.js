const API_KEY =
  'live_uHLyHJBkbU30E2eAbBnE4j4c91nwJJcb6QIQlzlRwKeysrBcyI8jqwkjXADjKRXJ';
const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  const params = new URLSearchParams({
    api_key: API_KEY,
  });

  const url = `${BASE_URL}/breeds?${params}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    breed_ids: breedId,
  });

  const url = `${BASE_URL}/images/search?${params}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
