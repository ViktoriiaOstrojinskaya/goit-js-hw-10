import './css/styles.css';
import debounce from 'lodash.debounce';
import countryCard from './countryCard.hbs';
import API from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const listCountries = document.querySelector('.country-list');

input.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry(event) {
  if (input.value === '') {
    listCountries.innerHTML = '';
  }
  const country = input.value.trim();
  console.log(country);

  API.fetchCountries(country).then(createCountryCard);
}

function createCountryCard(countyInform) {
  const markup = countryCard(countyInform);
  listCountries.innerHTML = markup;
}
