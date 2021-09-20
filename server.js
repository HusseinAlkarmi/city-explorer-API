'use strict';
const { request, response } = require('express');
const express = require('express');
const server = express();
const PORT = 1999;

server.get('/test',(req,res)=>{

    res.status(200).send('home route')
})

server.get('/test',(request,response)=>{

    response.send('api server is working')
})

server.listen(PORT,()=>{
console.log(`listeneing on PORT ${PORT}`)
})

