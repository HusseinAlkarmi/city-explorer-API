'use strict';
const axios = require('axios');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const server = express();
const PORT = process.env.PORT;
server.use(cors());

const getMovie = require('./module/movies.js');
const getWeather= require('./module/weather.js');



server.get('/',(request, response) =>{
  response.send("home route")
})
server.get('/movie', getMovie);
server.get('/weather', getWeather);

server.get('*',(request, response) =>{
  response.send("not found")
}
)
server.listen(PORT, () => {
  console.log(`listeneing on PORT ${PORT}`);
});