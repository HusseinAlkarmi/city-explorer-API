'use strict';

const axios = require("axios");

function getMovie (req, res){

    let searchQuery = req.query.searchQuery;

    let URLmovie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY }&language=en-US&query=${searchQuery}&page=1&include_adult=false`;
    
    console.log(URLmovie);
    console.log(req.query)
     axios.get(URLmovie).then(movieInfo=>{
    console.log(movieInfo) 
    console.log(movieInfo.results)                  
    
    let arrayMovie = movieInfo.data.results.map(data=>
    {return new Movie(data.title,data.poster_path)
    })

res.send(arrayMovie)
  }).catch(error => { res.send(error)
  });
  }


    class Movie {
    constructor(title, poster_path){
    this.title=title
    this.poster_path= "https://image.tmdb.org/t/p/w500" + poster_path 

   
}
}
    

module.exports=getMovie;