const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coinPriceSchema = new Schema({
  price: Number,
  currency: String,
  type: String,
  date: Date,
})

module.exports = mongoose.model('Price', coinPriceSchema);
