import './sass/main.scss';
import ApiService from './js/fetchCountries.js'
import countryListTemplate from './templates/country-list.hbs'
import countryTemplate from './templates/country.hbs'
import '@pnotify/core/dist/BrightTheme.css';
const debounce = require('lodash.debounce');
const { error, Stack } = require('@pnotify/core');


function myError() {
    error({
    text: 'Too many matches found. Please enter a more specific query!',
    width: '500px',
    delay: 2000,
    sticker: false,
    icon: false,
    closer: false,
    stack: new Stack({
    dir1: 'down', dir2: 'left', // Position from the top left corner.
    firstpos1: 190, firstpos2: 50 // 90px from the top, 90px from the left.
  })
        
})
}

function networkError() {
    error({
    text: 'Too many matches found. Please enter a more specific query!',
    width: '500px',
    delay: 2000,
    sticker: false,
    icon: false,
    closer: false,
    stack: new Stack({
    dir1: 'down', dir2: 'left', // Position from the top left corner.
    firstpos1: 190, firstpos2: 50 // 90px from the top, 90px from the left.
  })
        
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
    apiService.query = e.target.value.trim();
    console.log(e.target.value);
   if (!apiService.query) {
        return
   }
    
    
    
    apiService.fetchCountry()
        .then((data) => {
            if (data.length <= 10 && data.length >= 2) { countryListMarkUp(data) }
            if (data.length === 1) {
            countryMarkUp(data)
            } 
            if(data.length > 10) { myError() }
        })
        .catch(() => {
      error({text: 'Sorry, something went wrong', width: '500px',
    delay: 2000,
    sticker: false,
    icon: false,
    closer: false,
    stack: new Stack({
    dir1: 'down', dir2: 'left', 
    firstpos1: 190, firstpos2: 50,
  }) });
    })
    
}


function countryListMarkUp(data) {
    
        refs.containerEl.insertAdjacentHTML('beforeend', countryListTemplate(data))
    
    
}

function countryMarkUp(data) {
    
        refs.containerEl.insertAdjacentHTML('beforeend', countryTemplate(...data))
    
    
}