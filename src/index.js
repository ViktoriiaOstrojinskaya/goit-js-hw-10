import './css/styles.css';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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

function onInputCountry() {
  const name = refs.input.value.trim();
  API.fetchCountries(name).then(showResult).catch(onFetchError);
}

function showResult(country) {
  if (country.length >= 10) {
    Notify.info('Too many matches found. Please enter a more specific name.', {
      timeout: 1000,
    });
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

function onFetchError(error) {
  Notify.failure('Oops, there is no country with that name', {
    timeout: 1000,
  });
  refs.listCountries.innerHTML = '';
  refs.infoCountry.innerHTML = '';
}
