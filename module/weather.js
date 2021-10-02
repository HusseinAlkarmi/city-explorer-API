'use strict';

const axios = require("axios");
let cache = require("./cache.js");

function getWeather (req, res){

    let searchQuery = req.query.searchQuery;

    let reqURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery},&key=${process.env.WEATHER_KEY}`;
    if (cache[searchQuery] !== undefined) {
      console.log("the cashe contain data ");
      console.log(cache);
      res.send(cache[searchQuery]);
    } else {
      console.log("cache memory is empty hit the api");
  
      console.log(reqURL);
      console.log(req.query);
      axios
        .get(reqURL)
        .then((weatherData) => {
          console.log(weatherData);
          console.log(weatherData.data);
                   

    let Array = weatherData.data.data.map(item=>
    {return new Forcast(item.weather.description, item.datetime)
    })

res.send(Array)
  }).catch(error => { res.send(error)
  });
  }



    class Forcast {
    constructor(description, date){
    this.description = description
    this.date=date
}
}
    
}
module.exports=getWeather;