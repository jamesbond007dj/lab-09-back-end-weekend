'use strict';

const superagent = require('superagent');
const client = require('./client.js');
require('dotenv').config();

function handleYelp(request, response) {
  const location = request.query.data.search_query;

  const url = `https://api.yelp.com/v3/businesses/search?location=${location}`;

  if (storedUrls[url]) {
    // console.log('using cached url', storedUrls[url]);
    response.send(storedUrls[url]);
  } else {
    console.log('making the api call to yelp');
    superagent.get(url)
      .set('Authorization', `Bearer ${process.env.YELP_API_KEY}`)
      .then(resultsFromSuperagent => {
        let yelpResults = resultsFromSuperagent.body.businesses;

        response.status(200).send(yelpResults);
        console.log('done calling the yelp API');
      })
      .catch((error) => {
        console.error(error);
        response.status(500).send('server error.');
      });
  }
}

//cached data:
let storedUrls = {};
module.exports = handleYelp;

