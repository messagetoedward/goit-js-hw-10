import './css/styles.css';
import { fetchCountries } from "./fetchCountries.1";
import { debounce, throttle } from 'lodash';

const searchBox = document.querySelector('#search-box');
const infoEl = document.querySelector('.country-info');
const countryEl = document.querySelector('.country-list')
const DEBOUNCE_DELAY = 300;

searchBox.addEventListener('input', debounce(event => {
    event.preventDefault();
    const name = searchBox.value.trim();
    fetchCountries(name).then(showCountries).catch(error);
}, DEBOUNCE_DELAY));

function showCountries(countries) {
    console.log(countries);
    countries.map(country => console.log(country.flags.svg))

    const markup =
        `<h1></h1>
    <li>Capital</li>
    <li>Population</li>
    <li>Languages</li>`;
}

function error(error) {
    console.log(error);
}

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

