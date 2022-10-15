import './css/styles.css';

import debounce from 'lodash.debounce';

import API from './fetchCountries';
import countryCard from './countryCard.hbs';
import countryList from './countryList.hbs';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const listCountries = document.querySelector('.country-list');

input.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry() {
  const name = input.value.trim();
  API.fetchCountries(name)
    .then(showProfile)
    .catch(error => console.log(error));

  if (input.value === '') {
    listCountries.innerHTML = '';
  }
}

function showProfile(country) {
  if (country.length >= 10) {
    console.log('Too many matches found. Please enter a more specific name.');
  } else if (country.length >= 2 && country.length <= 9) {
    createCountryList(country);
  } else if (country.length === 1) {
    createCountryCard(country);
  }
}

function createCountryCard(country) {
  const markupCard = countryCard(country);
  listCountries.innerHTML = markupCard;
}

function createCountryList(country) {
  const markupList = countryList(country);
  listCountries.innerHTML = markupList;
}
