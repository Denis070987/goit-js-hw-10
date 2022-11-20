import './css/styles.css';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');
// const DEBOUNCE_DELAY = 300;

const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')


const search = document.querySelector('#search-box')
search.addEventListener('input', debounce(onSearch, 300))

function onSearch(evt) {
   
    let searchValie = search.value.trim()
    
    fetchCountries(searchValie).then(data => creatMarkup(data))
}

function fetchCountries(name){

  return  fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`).then(resp => {
        // console.log(resp)
        if (!resp.ok) {
            throw new Error(resp.statusText)
    } return resp.json()
}).catch(err => Notiflix.Notify.failure('By this name, no country found')
)
}

function creatMarkup(arr) {
    if (arr.length > 10) {
        countryInfo.innerHTML = ''
        countryList.innerHTML = ''
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
          
    } else if (arr.length >= 2 && arr.length <= 10) {
        const markupList = arr.map(item => `<li><img src="${item.flags.svg}" width =170px alt=""><p>Name Countries: <span>${item.name}</span></p></li>`).join('')
        countryList.innerHTML = markupList
        countryInfo.innerHTML = ''
    }


    else {
        
        const markup = arr.map(item => `<img src="${item.flags.svg}" width =400px alt="" />
      <p>Name Countries: <span>${item.name}</span></p>
      <p>Capital: <span>${item.capital}</span></p>
      <p>Population: <span>${item.population}</span></p>
      <p>Languages: <span>${item.languages.map(({ name }) => `<span>${name}</span>`).join(', ')}</span></p> `).join('')
        countryInfo.innerHTML = markup
        countryList.innerHTML = ''
    }
    
}

