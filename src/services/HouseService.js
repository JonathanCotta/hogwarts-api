const axios = require('axios');

const { HOGWARTS_KEY } = require('../configuration/config');

async function GetOneHouseFromPotterAPI(houseId) {
  const url = `https://www.potterapi.com/v1/houses/${houseId}?key=${HOGWARTS_KEY}`;
  return axios.get(url);
}

async function GetHousesFromPotterAPI(queryObj) {
  const urlQuery = Object.keys(queryObj).reduce((previous, current) => {
    const newParam = `${current}=${queryObj[current]}`;

    if (!previous) return `${newParam}&`;

    return `${previous}${newParam}&`;
  }, '');

  const url = `https://www.potterapi.com/v1/characters?${urlQuery}key=${HOGWARTS_KEY}`;

  return axios.get(url);
}

module.exports = {
  GetOneHouseFromPotterAPI,
  GetHousesFromPotterAPI,
};
