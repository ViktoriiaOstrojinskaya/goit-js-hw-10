import './css/styles.css';

import debounce from 'lodash.debounce';

import API from './fetchCountries';
import countryCard from './countryCard.hbs';
import countryList from './countryList.hbs';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  listCountries: document.querySelector('.country-list'),
  infoCountry: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry(event) {
  const name = refs.input.value.trim();

  API.fetchCountries(name)
    .then(showProfile)
    .catch(error => console.log(error));

  if (refs.input.value === '') {
    refs.listCountries.innerHTML = '';
    refs.infoCountry.innerHTML = '';
  }
}

function showProfile(country) {
  if (country.length >= 10) {
    console.log('Too many matches found. Please enter a more specific name.');
  } else if (country.length >= 2 && country.length <= 9) {
    createCountryList(country);
    refs.infoCountry.innerHTML = '';
  } else if (country.length === 1) {
    createCountryCard(country);
    refs.listCountries.innerHTML = '';
  }
}

function createCountryList(country) {
  const markupList = countryList(country);
  refs.listCountries.innerHTML = markupList;
}

function createCountryCard(country) {
  const markupCard = countryCard(country);
  refs.infoCountry.innerHTML = markupCard;
}
