import './css/styles.css';
import debounce from 'lodash.debounce';
//import cardCountry from './country-card.hbs';

const DEBOUNCE_DELAY = 300;
const URL = 'https://restcountries.com';

const input = document.querySelector('#search-box');
const listCountries = document.querySelector('.country-list');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const name = input.name.value;
  fetchCountries(name).then(createMarkup);
}

function fetchCountries(country) {
  fetch(
    'https://restcountries.com/v3.1/name/Italy?fields=name,capital,population,flags,languages'
  ).then(response => response.json());
}

function createMarkup({ name, capital, population, flags, languages }) {
  listCountries.innerHTML = `
        <img src=${flags} alt="flag"/>
        <h2 class="contry-name">${name}</h2>
     <ul class="contry-name__list">
      <li class="contry-name__item">Capital:${capital}</li>
    <li class="contry-name__item">Population:${population}</li>
     <li class="contry-name__item">Languages:${languages}</li>
    </ul>`;
}
