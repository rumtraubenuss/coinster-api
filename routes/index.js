const CoinPrice = require('../models/coin-price');
const express = require('express');
const router = express.Router();

router.route('/prices').get((req, res) => {
  CoinPrice.find({}, 'price_euro date', (err, prices) => {
    if (err) { res.send(err) }
    else {
      res.json(prices);
    }
  });
});

module.exports = router;
