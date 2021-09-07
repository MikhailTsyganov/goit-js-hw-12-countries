import './sass/main.scss';
import ApiService from './js/fetchCountries.js'
import countryListTemplate from './templates/country-list.hbs'
import countryTemplate from './templates/country.hbs'
import '@pnotify/core/dist/BrightTheme.css';
const debounce = require('lodash.debounce');
const { error } = require('@pnotify/core');


function myError() {
    error({
    text: 'Too many matches found. Please enter a more specific query!',
    width: '560px',
        delay: 3000,
        sticker: false,
        
    
})
} 

const refs = {
    inputEl: document.querySelector('.input-country'),
    containerEl: document.querySelector('.js-country-list')
}

const apiService = new ApiService()

refs.inputEl.addEventListener('input', debounce(onSearchCountry, 500));



function onSearchCountry(e) {
    refs.containerEl.innerHTML = ''
    apiService.query = e.target.value;
    console.log(e.target.value);
   
    
    apiService.fetchCountry()
        .then((data) => { if (data.length <= 10) { return data } })
        .then(countryListMarkUp)
        .catch(err => myError(err))
}


function countryListMarkUp(data) {
    if (data.length === 1) {
        refs.containerEl.insertAdjacentHTML('beforeend', countryTemplate(...data))
    } else {
        refs.containerEl.insertAdjacentHTML('beforeend', countryListTemplate(data))
    }
    
}
