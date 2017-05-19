const fetch = require('node-fetch');

const { DB_API_KEY } = process.env;

const moment = require('moment');

const yesterday = moment().subtract(1, 'day').toISOString();

const query = JSON.stringify({
  type: 'bitcoin',
  date: {
    $gt: {
      $date: yesterday,
    },
  },
});

const fields = JSON.stringify({
  _id: 0,
  price_raw: 0,
  currency: 0,
});

const host = 'https://api.mlab.com/api/1/databases/coinster/collections/prices';

const url = `${host}?f=${fields}&q=${query}&apiKey=${DB_API_KEY}`;

fetch(url).then(res => res.json()).then(json => console.log({ bitcoin: json }));
