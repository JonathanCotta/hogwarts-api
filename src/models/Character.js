const mongoose = require('mongoose');

const { Schema } = mongoose;

const characterSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  school: {
    type: String,
    default: 'Hogwarts School of Witchcraft and Wizardry',
  },
  species: { type: String, required: true },
  house: { type: String },
  patronus: { type: String, required: false },
  ministryOfMagic: { type: Boolean, default: false },
  orderOfThePhoenix: { type: Boolean, default: false },
  dumbledoresArmy: { type: Boolean, default: false },
  deathEater: { type: Boolean, default: false },
  bloodStatus: { type: String, default: 'unknown' },
});

module.exports = mongoose.model('Character', characterSchema, 'characters');
