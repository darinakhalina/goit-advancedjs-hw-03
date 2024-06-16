import SlimSelect from 'slim-select';
import 'slim-select/styles';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const elements = {
  loaderComponent: document.querySelector('.loader'),
  catInfo: document.querySelector('.cat-info'),
  catsSelect: document.querySelector('.cat-breeds'),
};

function hideComponent(el) {
  if (!el.classList.contains('is-hidden')) {
    el.classList.add('is-hidden');
  }
}

function showComponent(el) {
  if (el.classList.contains('is-hidden')) {
    el.classList.remove('is-hidden');
  }
}

async function onCatSelected(options) {
  let catData;
  const breedId = options[0].value;
  const { loaderComponent, catInfo } = elements;
  hideComponent(catInfo);

  if (!breedId) {
    return;
  }

  try {
    showComponent(loaderComponent);
    hideComponent(catInfo);

    [catData] = await fetchCatByBreed(breedId);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Oops! Something went wrong! Try another option!',
      position: 'topRight',
    });
    return;
  } finally {
    hideComponent(loaderComponent);
  }

  if (!catData) {
    iziToast.error({
      title: 'Error',
      message: 'No data found for the Cat Breed.',
      position: 'topRight',
    });
    return;
  }

  const { url, breeds } = catData;
  const cat = breeds.find(breed => breed.id === breedId);

  if (!cat || !url) {
    iziToast.error({
      title: 'Error',
      message: 'No data found for the Cat Breed.',
      position: 'topRight',
    });
    return;
  }

  renderCatInfo(cat.name, cat.description, cat.temperament, url);
}

function renderCatInfo(name, description, temperament, url) {
  const { catInfo } = elements;
  const catInfoHTML = `
    <div class="cat-card">
      <div class="cat-card__image-holder">
        <img class="cat-card__image" src="${url}" alt="${name}" />
      </div>
      <div class="cat-card__info-holder">
        <h2 class="cat-card__name">${name}</h2>
        <p class="cat-card__description">${description}</p>
        <p class="cat-card__temperament">
          <span><b>Temperament:</b></span>
          <span>${temperament}</span>
        </p>
      </div>
    </div>
  `;

  catInfo.innerHTML = catInfoHTML;
  showComponent(catInfo);
}

(async () => {
  const { loaderComponent, catsSelect } = elements;
  try {
    showComponent(loaderComponent);
    const cats = await fetchBreeds();

    if (!cats) return;

    const catsOptions = ['<option value="">Select a cat breed</option>'].concat(
      cats.map(cat => `<option value="${cat.id}">${cat.name}</option>`)
    );
    catsSelect.innerHTML = catsOptions.join('');

    new SlimSelect({
      select: '.cat-breeds',
      settings: {
        allowDeselect: false,
      },
      events: {
        afterChange: onCatSelected,
      },
    });

    showComponent(catsSelect);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Oops! Something went wrong! Try reloading the page!',
      position: 'topRight',
    });
  } finally {
    hideComponent(loaderComponent);
  }
})();
