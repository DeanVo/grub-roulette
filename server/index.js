require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const fetch = require('node-fetch');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

app.use(express.json());

let restaurantList = [];
let restaurantListByLocation = [];
let selectedRestaurant = restaurantList;
const term = 'restaurants';
const location = 'orange county, ca';

app.get('/api/random', (req, res, next) => {
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

          const { id, name, image_url, rating, review_count } = selectedRestaurant;
          const categories = selectedRestaurant.categories.map(category => category.title).join(' ');
          const userId = 1;

          const address = `${selectedRestaurant.location.address1}, ${selectedRestaurant.location.city} ${selectedRestaurant.location.state} ${selectedRestaurant.location.zip_code}`;

          const sql = `
            insert into "randomHistory" ("businessId", "restaurantName", "imageUrl", "rating", "totalReviews", "address", "categories", "userId")
            values ($1, $2, $3, $4, $5, $6, $7, $8)
            returning *
          `;

          const params = [id, name, image_url, rating, review_count, address, categories, userId];

          db.query(sql, params)
            .then(result => {
              res.status(201).json(selectedRestaurant);
            })
            .catch(err => next(err));
        });
    })
    .catch(err => next(err));
});

app.get('/api/random/selected', (req, res) => {
  res.status(201).json(selectedRestaurant);
});

app.post('/api/random/favorite', (req, res, next) => {

  const { id, name, image_url, rating, review_count } = selectedRestaurant;
  const categories = selectedRestaurant.categories.map(category => category.title).join(' ');
  const userId = 1;

  const address = `${selectedRestaurant.location.address1}, ${selectedRestaurant.location.city} ${selectedRestaurant.location.state} ${selectedRestaurant.location.zip_code}`;

  const sql = `
            insert into "favorites" ("businessId", "restaurantName", "imageUrl", "rating", "totalReviews", "address", "categories", "userId")
            values ($1, $2, $3, $4, $5, $6, $7, $8)
            returning *
          `;

  const params = [id, name, image_url, rating, review_count, address, categories, userId];

  db.query(sql, params)
    .then(result => {
      res.status(201).json(selectedRestaurant);
    })
    .catch(err => next(err));
});

app.get('/api/random/location', (req, res, next) => {
  const { userLocation } = req.query;

  if (!userLocation) {
    res.status(400).json({
      error: 'userLocation value is required.'
    });
  }

  fetch(`https://api.yelp.com/v3/businesses/search?term=${term}&location=${userLocation}&limit=50`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.BEARER
    }
  })
    .then(res => res.json())
    .then(data => {
      restaurantListByLocation = data.businesses;
      selectedRestaurant = restaurantListByLocation[Math.floor(Math.random() * restaurantListByLocation.length)];

      return fetch(`https://api.yelp.com/v3/businesses/${selectedRestaurant.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.BEARER
        }
      })
        .then(res => res.json())
        .then(data => {
          selectedRestaurant.hours = data.hours[0];

          const { id, name, image_url, rating, review_count } = selectedRestaurant;
          const categories = selectedRestaurant.categories.map(category => category.title).join(' ');
          const userId = 1;

          const address = `${selectedRestaurant.location.address1}, ${selectedRestaurant.location.city} ${selectedRestaurant.location.state} ${selectedRestaurant.location.zip_code}`;

          const sql = `
            insert into "randomHistory" ("businessId", "restaurantName", "imageUrl", "rating", "totalReviews", "address", "categories", "userId")
            values ($1, $2, $3, $4, $5, $6, $7, $8)
            returning *
          `;

          const params = [id, name, image_url, rating, review_count, address, categories, userId];

          db.query(sql, params)
            .then(result => {
              res.status(201).json(selectedRestaurant);
            })
            .catch(err => next(err));
        });
    })
    .catch(err => next(err));
});

app.delete('/api/random/favorite/:businessId', (req, res, next) => {
  const businessId = req.params.businessId;

  const sql = `
    delete from "favorites"
      where "businessId" = $1
    returning *
  `;

  const params = [businessId];

  db.query(sql, params)
    .then(result => {
      const business = result.rows[0];

      if (!business) {
        res.status(404).json({ error: `id ${businessId} does not exist.` });
      } else {
        res.status(204).send();
      }
    })
    .catch(err => next(err));
});

app.get('/api/random/history', (req, res, next) => {
  const sql = `
    select *
    from "randomHistory"
  `;

  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
