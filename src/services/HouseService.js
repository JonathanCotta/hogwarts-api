const axios = require('axios');

const objectToParams = require('../modules/objectToParams');
const { HOGWARTS_KEY } = require('../configuration/config');

async function GetOneHouseFromPotterAPI(houseId) {
  const url = `https://www.potterapi.com/v1/houses/${houseId}?key=${HOGWARTS_KEY}`;
  return axios.get(url);
}

async function GetHousesFromPotterAPI(queryObj) {
  const urlQuery = objectToParams(queryObj);

  const url = `https://www.potterapi.com/v1/characters?${urlQuery}key=${HOGWARTS_KEY}`;

  return axios.get(url);
}

module.exports = {
  GetOneHouseFromPotterAPI,
  GetHousesFromPotterAPI,
};
