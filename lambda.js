const fetch = require('node-fetch');
const { DB_API_KEY } = process.env;
const moment = require('moment');
const yesterday = moment().subtract(1, 'day').toISOString();
const host = 'https://api.mlab.com/api/1/databases/coinster/collections/prices';
const fields = JSON.stringify({
  _id: 0,
  price_raw: 0,
  currency: 0,
});

function getUrl(currency) {
  const query = JSON.stringify({
    type: currency,
    date: {
      $gt: {
        $date: yesterday,
      },
    },
  });
  return `${host}?f=${fields}&q=${query}&apiKey=${DB_API_KEY}`;
}

const promises = ['bitcoin', 'ethereum'].map(currency => (
  fetch(getUrl(currency)).then(res  => res.json())
));

Promise.all(promises)
  .then(([bitcoin, ethereum]) => console.log({ bitcoin, ethereum }));
