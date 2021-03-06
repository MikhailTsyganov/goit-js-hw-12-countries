export default class ApiService {
    constructor() {
        this.searchQuery = ''
    }
    
    fetchCountry() {
        const url = `https://restcountries.eu/rest/v2/name/${this.searchQuery}`;

     return fetch(url).then(r => r.json()).then(data => {
        
        
         return data;
     })
         
    }


    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery
    }
}