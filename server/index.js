require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const fetch = require('node-fetch');
const bearer = 'Bearer B1XbbiONAEXMh09juCgQnS7hTTLqKGirNftAINUWcPV8y_7UP4j2Jj94OaAicf5J35SJFwIjOsp_3o5-Up-udxeWGrF95IkSfLNBN20QwU1B5Gnt788NtKmxDEThX3Yx';
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const term = 'restaurants';
const location = 'orange county, ca';

const app = express();

app.use(staticMiddleware);

app.use(express.json());

let restaurantList = [];
let selectedRestaurant = restaurantList;

fetch(`https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`, {
  headers: {
    Authorization: bearer
  }
})
  .then(res => res.json())
  .then(data => {
    restaurantList = data.businesses;
  });

app.get('/api/random', (req, res) => {
  selectedRestaurant = restaurantList[Math.floor(Math.random() * restaurantList.length)];

  res.send(selectedRestaurant);
});

app.patch('/api/random', (req, res) => {
  const sql = `
    update "randomRestaurant"
      set "name" = $1,
        "image" = $2
    where "restaurantId" = 1
    returning *
  `;

  const params = [selectedRestaurant.name, selectedRestaurant.image_url];
  db.query(sql, params)
    .then(result => {
      const [random] = result.rows;
      res.status(201).json(random);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error ocurred.'
      });
    });

});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
