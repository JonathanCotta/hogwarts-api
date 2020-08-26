const mongoose = require('mongoose');

const { log, error } = require('console');

const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => log(`Mongoose connected at ${MONGO_URI}`));
mongoose.connection.on('disconnected', () => log(`Mongoose disconnected from ${MONGO_URI}`));
mongoose.connection.on('error', (err) => error(err));

module.exports = mongoose;
