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

function getCurrencies(currencies) {
  const promises = currencies.sort().map(currency => (
    fetch(getUrl(currency)).then(res  => res.json())
  ));

  Promise.all(promises)
    .then((prices) => {
      const pricesObj = currencies.reduce((acc, val, count) => {
        return Object.assign({}, acc, { [val]: prices[count] });
      }, {});
      console.log(pricesObj);
    });
}

const distinctInit = {
  method: 'post',
  body: JSON.stringify({ distinct: 'prices', key: 'type' }),
  headers: {
    'Content-Type': 'application/json',
  },
};
const distinctHost = 'https://api.mlab.com/api/1/databases/coinster/runCommand';

fetch(`${distinctHost}?apiKey=${DB_API_KEY}`, distinctInit)
  .then(res => res.json())
  .then(json => getCurrencies(json.values));
