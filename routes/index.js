const CoinPrice = require('../models/coin-price');
const express = require('express');
const router = express.Router();

router.route('/prices').get((req, res) => {
  CoinPrice.distinct('type')
    .then(types => {
      const promises = types.map(type => {
        return (
          CoinPrice.find({ type }, 'type price currency date')
            .limit(1)
            .sort('-date')
            .exec()
        );
      });
      return Promise.all(promises);
    })
    .then(prices => {
      res.json(prices.map(res => res[0]));
    });
});

module.exports = router;
