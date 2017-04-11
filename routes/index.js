const CoinPrice = require('../models/coin-price');
const express = require('express');
const router = express.Router();

router.route('/prices').get( async (req, res) => {
  try {
    const types = await CoinPrice.distinct('type')
    const promises = types.sort().map(type => {
      return (
        CoinPrice.find({ type }, 'type price currency date')
        .limit(1)
        .sort('-date')
        .exec()
      );
    });
    const prices = await Promise.all(promises);
    res.json(prices.map(res => res[0]));
  } catch(er) {
    res.send(er);
  }
});

module.exports = router;
