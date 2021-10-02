'use strict';

const axios = require("axios");

function getWeather (req, res){

    let searchQuery = req.query.searchQuery;

    let reqURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery},&key=${process.env.WEATHER_KEY}`;
    
    console.log(reqURL);
    console.log(req.query)
     axios.get(reqURL).then(weatherinfo=>{
    console.log(weatherinfo) 
    console.log(weatherinfo.data)                  
    
    let Array = weatherinfo.data.data.map(info=>
    {return new Forcast(info.weather.description, info.datetime)
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
    
 

module.exports=getWeather;