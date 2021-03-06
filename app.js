const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const CoinPrice = require('./models/coin-price.js');
const compression = require('compression');
const app = express();
const { DB_URI } = process.env;

mongoose.connect(DB_URI);
mongoose.Promise = global.Promise;

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);

module.exports = app;
