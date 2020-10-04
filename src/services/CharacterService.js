const axios = require('axios');

const Character = require('../models/character');
const { convert: convertToParams } = require('../modules/objectToParams');
const { HOGWARTS_KEY } = require('../configuration/config');

/**
* Return one character from PotterAPI matching the id
*@param {Object} characterId
*@returns {Promise} axios get request
*/
async function GetOneCharacterFromPotterAPI(characterId) {
  const url = `https://www.potterapi.com/v1/characters/${characterId}?key=${HOGWARTS_KEY}`;
  return axios.get(url);
}

/**
* Return one character from MongoDB matching the id
*@param {Object} characterId
*@returns {Promise} ongoose query
*/
async function GetOneCharacterFromDB(characterId) {
  return Character.findById(characterId).lean();
}

/**
* Return all characters from PotterAPI matching the filter
*@param {Object} queryObj
*@returns {Promise} axios get request
*/
async function GetCharactersFromPotterAPI(queryObj) {
  const urlQuery = convertToParams(queryObj);

  const url = `https://www.potterapi.com/v1/characters?${urlQuery}key=${HOGWARTS_KEY}`;

  return axios.get(url);
}

/**
* Return all characters from MongoDB matching the filter
*@param {Object} queryObj
*@returns {Promise} mongoose query
*/
async function GetCharactersFromDB(queryObj) {
  return Character.find(queryObj).lean();
}

module.exports = {
  GetCharactersFromDB,
  GetCharactersFromPotterAPI,
  GetOneCharacterFromDB,
  GetOneCharacterFromPotterAPI,
};
