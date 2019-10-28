'use strict';

//libraries:
const express = require('express');
const app = express();
require('dotenv').config();
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');
app.use(cors());

//imports:

const client = require('./modules/client.js');
const handleLocation = require('./modules/location.js')
const handleWeather = require('./modules/weather.js');
const handleTrails = require('./modules/trail.js')
const handleMovies = require('./modules/movies.js')
const handleYelp = require('./modules/yelp.js')


const PORT = process.env.PORT || 3003;


client.on('error', err => { throw err; });



//routes:
app.get('/location', handleLocation);
app.get('/weather', handleWeather);
app.get('/trails', handleTrails);
app.get('/movies', handleMovies);
app.get('/yelp', handleYelp);



//cached data:
let storedUrls = {};








client.connect()
  .then(() => {
    console.log('connected to db');
    app.listen(PORT, () => console.log(`app is listening on ${PORT}`));
  })
  .catch(err => {
    throw `PG Startup Error: ${err.message}`;
  });
