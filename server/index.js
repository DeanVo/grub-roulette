require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const fetch = require('node-fetch');

const app = express();

app.use(staticMiddleware);

app.use(express.json());

let restaurantList = [];
let selectedRestaurant = restaurantList;
const term = 'restaurants';
const location = 'orange county, ca';

app.get('/api/random', (req, res) => {
  fetch(`https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.BEARER
    }
  })
    .then(res => res.json())
    .then(data => {
      restaurantList = data.businesses;
      selectedRestaurant = restaurantList[Math.floor(Math.random() * restaurantList.length)];
      fetch(`https://api.yelp.com/v3/businesses/${selectedRestaurant.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.BEARER
        }
      })
        .then(res => res.json())
        .then(data => {
          selectedRestaurant.hours = data.hours[0];
          res.send(selectedRestaurant);
        });
    })
    .catch(err => {
      console.error(err);
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
