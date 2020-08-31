const axios = require('axios');

const Character = require('../models/Character');
const { HOGWARTS_KEY } = require('../configuration/config');

async function GetOneCharacterFromPotterAPI(characterId) {
  const url = `https://www.potterapi.com/v1/characters/${characterId}?key=${HOGWARTS_KEY}`;
  return axios.get(url);
}

async function GetOneCharacterFromDB(characterId) {
  return Character.findById(characterId).lean();
}

async function GetCharactersFromPotterAPI(queryObj) {
  const urlQuery = Object.keys(queryObj).reduce((previous, current) => {
    const newParam = `${current}=${queryObj[current]}`;

    if (!previous) return `${newParam}&`;

    return `${previous}${newParam}&`;
  }, '');

  const url = `https://www.potterapi.com/v1/characters?${urlQuery}key=${HOGWARTS_KEY}`;

  return axios.get(url);
}

async function GetCharactersFromDB(queryObj) {
  return Character.find(queryObj).lean();
}

module.exports = {
  GetCharactersFromDB,
  GetCharactersFromPotterAPI,
  GetOneCharacterFromDB,
  GetOneCharacterFromPotterAPI,
};
