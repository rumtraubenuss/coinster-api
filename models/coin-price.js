const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coinPriceSchema = new Schema({
  price_euro: Number,
  coin: String,
  date: Date,
})

module.exports = mongoose.model('Price', coinPriceSchema);
