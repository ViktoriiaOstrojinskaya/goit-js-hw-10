import './css/styles.css';
import debounce from 'lodash.debounce';
import countryCard from './countryCard.hbs';

const DEBOUNCE_DELAY = 300;
const URL = 'https://restcountries.com';

const input = document.querySelector('#search-box');
const listCountries = document.querySelector('.country-list');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const country = input.value;
  console.log(country);
  fetchCountries(country).then(createCountryCard);
}

function fetchCountries(country) {
  return fetch(
    `${URL}/v3.1/name/${country}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error('fail');
    }
    return response.json();
  });
}

function createCountryCard(countyInform) {
  const markup = countryCard(countyInform);
  listCountries.innerHTML = markup;
}

// function createMarkup({ name, capital, population, flags, languages }) {
//   listCountries.innerHTML = `
//       <img src=${flags} alt="flag"/>
//       <h2 class="contry-name">${name}</h2>
//       <ul class="contry-name__list">
//       <li class="contry-name__item">Capital:${capital}</li>
//       <li class="contry-name__item">Population:${population}</li>
//       <li class="contry-name__item">Languages:${languages}</li>
//       </ul>`;
// }
