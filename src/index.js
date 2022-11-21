import './css/styles.css';
import Notiflix from 'notiflix';
import {fetchCountries} from './fetchCountries'
var debounce = require('lodash.debounce');
// const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const search = document.querySelector('#search-box');
search.addEventListener('input', debounce(onSearch, 300));

function onSearch(evt) {
  let searchValie = search.value.trim();
  fetchCountries(searchValie).then(data => creatMarkup(data));
}

function creatMarkup(arr) {
  if (arr.length > 10) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (arr.length >= 2 && arr.length <= 10) {
    const markupList = arr.map(
        item =>
          `<li><img src="${item.flags.svg}" width =170px alt=""><p><span>${item.name}</span></p></li>`
      ).join('');
    countryInfo.innerHTML = '';
    countryList.innerHTML = markupList;
  } else {
    const markup = arr.map(
        item => `<img src="${item.flags.svg}" width =400px alt="" />
      <h2>${item.name}</h2>
      <p>Capital: <span>${item.capital}</span></p>
      <p>Population: <span>${item.population}</span></p>
      <p>Languages: <span>${item.languages
        .map(({ name }) => `<span>${name}</span>`)
        .join(', ')}</span></p> `
      ).join('');

    countryList.innerHTML = '';
    countryInfo.innerHTML = markup;
  }
}
