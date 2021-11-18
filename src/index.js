import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import { debounce, throttle } from 'lodash';
import Notiflix from 'notiflix';

const searchBox = document.querySelector('#search-box');
const infoEl = document.querySelector('.country-info');
const countryEl = document.querySelector('.country-list')
const DEBOUNCE_DELAY = 300;

searchBox.addEventListener('input', debounce(event => {
    event.preventDefault();
    if (searchBox.value) {
    const name = searchBox.value.trim();
    return fetchCountries(name).then(showCountries).catch(error);
    } else {
        countryEl.innerHTML = '';
        infoEl.innerHTML = ''; }
    
}, DEBOUNCE_DELAY));

function showCountries(countries) {
        countryEl.innerHTML = '';
        infoEl.innerHTML = '';
    if (countries.length > 10) {
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.', {timeout: 1000})
    }
    if (countries.length >= 2) {
        markupTwoPlus(countries);
    }
    if (countries.length === 1) {
        markupOne(countries);
    }
};

function markupTwoPlus(countries) {
    const markupTwoPlus = countries.map(({ name, capital, population, flags, languages }) => {
              return `<li><img src="${flags.svg}" alt="Flag of ${name.official}" style="height: 1em; width: 1em"> ${name.official}</li>`
          }).join('');
        countryEl.innerHTML = markupTwoPlus;
};

function markupOne(countries) {
        countries.map(({ name, capital, population, flags, languages }) => {
            const markup =
            `<h1><img src="${flags.svg}" alt="Flag of ${name.official}" style="height: 1em; width: 1em"> ${name.official}</h1>
        <li>Capital: ${capital}</li>
        <li>Population: ${population}</li>
        <li>Languages: ${Object.values(languages)}</li>`;
            infoEl.innerHTML = markup;
        })
    
}

function error() {
    return Notiflix.Notify.failure('Oops, there is no country with that name', {timeout: 1000});
};

// [{"capital":["Lima"],"languages":{"aym":"Aymara","que":"Quechua","spa":"Spanish"},"flag":"🇵🇪","population":32971846}] 

// fetch("https://jsonplaceholder.typicode.com/users")
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Data handling
//   })
//   .catch(error => {
//     // Error handling
//   });

