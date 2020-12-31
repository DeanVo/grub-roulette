require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const fetch = require('node-fetch');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();

app.use(staticMiddleware);

app.use(express.json());

let restaurantList = [];
let selectedRestaurant = restaurantList;
const term = 'restaurants';
const location = 'orange county, ca';

app.get('/api/random', (req, res) => {
  fetch(`https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=50`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.BEARER
    }
  })
    .then(res => res.json())
    .then(data => {
      restaurantList = data.businesses;
      selectedRestaurant = restaurantList[Math.floor(Math.random() * restaurantList.length)];

      return fetch(`https://api.yelp.com/v3/businesses/${selectedRestaurant.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.BEARER
        }
      })
        .then(res => res.json())
        .then(data => {
          selectedRestaurant.hours = data.hours[0];

          // eslint-disable-next-line camelcase
          const { id, name, image_url, rating, review_count } = selectedRestaurant;
          const categories = selectedRestaurant.categories.map(category => category.title).join(' ');
          const userId = 1;

          const address = `${selectedRestaurant.location.address1}, ${selectedRestaurant.location.city} ${selectedRestaurant.location.state} ${selectedRestaurant.location.zip_code}`;

          const sql = `
        insert into "randomHistory" ("businessId", "restaurantName", "imageUrl", "rating", "totalReviews", "address", "categories", "userId")
        values ($1, $2, $3, $4, $5, $6, $7, $8)
        returning *
      `;
          // eslint-disable-next-line camelcase
          const params = [id, name, image_url, rating, review_count, address, categories, userId];

          db.query(sql, params)
            .then(result => {
              const [random] = result.rows;
              res.status(201).json(random);
            })
            .catch(err => {
              console.error(err);
              res.status(500).json({
                error: 'An unexpected error occurred.'
              });
            });
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
