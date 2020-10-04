const axios = require('axios');

const { convert: convertToParams } = require('../modules/objectToParams');
const { HOGWARTS_KEY } = require('../configuration/config');

/**
* Return one house matching the id from PotterAPI
*@param {string} houseId
*@returns {Promise} axios get request
*/
async function GetOneHouseFromPotterAPI(houseId) {
  const url = `https://www.potterapi.com/v1/houses/${houseId}?key=${HOGWARTS_KEY}`;
  return axios.get(url);
}

/**
* Return all houses matching the filter from PotterAPI
*@param {object} queryObj
*@returns {promise} axios get request
*/
async function GetHousesFromPotterAPI(queryObj) {
  const urlQuery = convertToParams(queryObj);

  const url = `https://www.potterapi.com/v1/characters?${urlQuery}key=${HOGWARTS_KEY}`;

  return axios.get(url);
}

module.exports = {
  GetOneHouseFromPotterAPI,
  GetHousesFromPotterAPI,
};
