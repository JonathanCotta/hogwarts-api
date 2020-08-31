const mongoose = require('mongoose');

const { Schema } = mongoose;

const characterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    default: 'Hogwarts School of Witchcraft and Wizardry',
  },
  house: {
    type: String,
    required: true,
  },
  patronus: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Character', characterSchema, 'characters');
