'use strict';

const apiKey = 'eliteb9SVdaZCUGbOOkoBdpdEF5L0zBFkw3fv4Zm'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function showResults(responseJson){
    console.log(responseJson);
    $('.list-results').empty();
    if(responseJson.total === '0'){
        $('.list-results').append(`<li><h2 class='error'>No results found. Please Try again.</h2></li>`)
    } else {
        for(var i = 0; i < responseJson.data.length; i++){
            $('.list-results').append(
                `<li><h3>${responseJson.data[i].fullName} - ${responseJson.data[i].states}</h3><p>${responseJson.data[i].description}</p><a href='${responseJson.data[i].url}'> More Information </li>
            `)
        }
    }
}

function getParks(query, limit=10) {
    const params = {
      api_key: apiKey,
      stateCode: query,
      limit,
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
  
    console.log(url);

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => showResults(responseJson))
    .catch(err => {
      $('#js-results').append(`There was an error. Please try again`);
    });
}


function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const stateSearch = $('#js-state-search').val();
      const maxResults = $('#js-max-results').val();
      getParks(stateSearch, maxResults);
    });
  }

$(watchForm);