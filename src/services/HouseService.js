const axios = require('axios');

const { HOGWARTS_KEY } = require('../configuration/config');

async function GetOneHouseFromPotterApi(houseId) {
  const url = `https://www.potterapi.com/v1/houses/${houseId}?key=${HOGWARTS_KEY}`;
  return axios.get(url);
}

module.exports = {
  GetOneHouseFromPotterApi,
};
