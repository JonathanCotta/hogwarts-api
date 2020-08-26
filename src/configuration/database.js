const mongoose = require('mongoose');

const { log } = require('console');

const {
  MONGO_ADDR,
  MONGO_USER,
  MONGO_PWD,
  MONGO_DB,
} = process.env;

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_ADDR}/${MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => log(`Mongoose connected at ${uri}`));
mongoose.connection.on('disconnected', () => log(`Mongoose disconnected from ${uri}`));
mongoose.connection.on('error', (error) => log(error));

module.exports = mongoose;
