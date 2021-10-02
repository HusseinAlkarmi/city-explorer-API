'use strict';
const axios = require('axios');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const server = express();
const PORT = process.env.PORT;
server.use(cors());

server.get('/', homeRouteHandler);
server.get('/movie', moviesHandler);
server.get('/weather', weatherHandler);
server.get('*', notFoundHandler);



function homeRouteHandler(req, res) {
  res.send('home route')
}
function weatherHandler(req, res){
let searchQuery= req.query.city;
let wURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery},&key=${process.env.WEATHER_KEY}`;

console.log(req.query);
console.log(wURL)

axios.get(wURL).then(weatherInfo => {
  console.log(weatherInfo)
  console.log(weatherInfo.data)
let array =  weatherInfo.data.data.map(item =>{ 
return new Forecast(item.weather.description,item.datetime)

})
res.send(array)
}).catch(error => { res.send(error)
});
}
function moviesHandler(req, res){

  let searchQuery= req.query.searchQuery;
  let mURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
  console.log(req.query);
  console.log(mURL)

  axios.get(mURL).then(movieResult => {
    console.log(movieResult)
    console.log(movieResult.results)
  let Array =  movieResult.data.results.map(item =>{ 
  return new Movie(item.title,item.poster_path)
  
  })
  res.send(Array)
  }).catch(error => { res.send(error)
  });
  }
  class Forecast{
    constructor(description , date){
      this.description =description
      this.date=date
    
    }
  }
  class Movie{
    constructor(title ,poster_path){
      this.title = title
      this.poster_path= 'https://image.tmdb.org/t/p/w500' + poster_path
      
    
  
  }
  }


function notFoundHandler(req, res) {
  res.status(404).send('route is not found')
}



server.listen(PORT, () => {
  console.log(`listeneing on PORT ${PORT}`);
});