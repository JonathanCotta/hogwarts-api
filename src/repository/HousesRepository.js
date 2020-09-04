const { error } = console;

const {
  GetOneHouseFromPotterAPI,
  GetHousesFromPotterAPI,
} = require('../services/houseService');

/**
 * Get a house from PotterAPI matching the id
 * @param {string} houseId house id
 * @return {object} return an object containing error and data
 */
async function GetOne(houseId) {
  try {
    const request = await GetOneHouseFromPotterAPI(houseId);

    return { error: false, data: request.data[0] };
  } catch (err) {
    error(err);
    return { error: true, data: err };
  }
}

/**
 * Get all houses from PotterAPI matching filter
 * @param {object} queryObj filter query object
 * @return {object} return an object containing error and data
 */
async function GetAll(queryObj) {
  try {
    const request = await GetHousesFromPotterAPI(queryObj);

    return {
      error: false,
      total: request.data ? request.data.length : 0,
      data: request.data,
    };
  } catch (err) {
    error(err);
    return { error: true, data: err };
  }
}

module.exports = {
  GetOne,
  GetAll,
};
