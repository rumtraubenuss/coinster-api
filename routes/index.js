const CoinPrice = require('../models/coin-price');
const express = require('express');
const router = express.Router();
const moment = require('moment');

router.route('/prices').get( async (req, res) => {
  try {
    const date = !!req.query.offset ? moment().subtract(1, 'day') : new Date();
    const types = await CoinPrice.distinct('type')
    const promises = types.sort().map(type => {
      return (
        CoinPrice.find({ type, date: { $lt: date } }, 'type price currency date')
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
