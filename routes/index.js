const CoinPrice = require('../models/coin-price');
const express = require('express');
const router = express.Router();
const moment = require('moment');

router.route('/prices').get( async (req, res) => {
  try {
    const yesterday = moment().subtract(1, 'day');
    const types = await CoinPrice.distinct('type')
    const promises = types.sort().map(type => {
      return (
        CoinPrice.find({ type, date: { $gt: yesterday } }, 'type price currency date')
        .sort('-date')
        .exec()
      );
    });
    const prices = await Promise.all(promises);
    res.json({ bitcoin: prices[0], ethereum: prices[1] });
  } catch(er) {
    res.send(er);
  }
});

module.exports = router;
