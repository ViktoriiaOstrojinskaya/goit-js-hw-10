const URL = 'https://restcountries.com';

function fetchCountries(country) {
  return fetch(
    `${URL}/v3.1/name/${country}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}

export default { fetchCountries };
