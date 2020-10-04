const {
  GetOneHouseFromPotterAPI,
  GetHousesFromPotterAPI,
} = require('../services/houseService');
const { asyncFunction } = require('../modules/safeExecution');

/**
 * Get a house from PotterAPI matching the id
 * @param {string} houseId house id
 * @return {object} return an object containing error and data
 */
async function GetOne(houseId) {
  return asyncFunction(async () => {
    const request = await GetOneHouseFromPotterAPI(houseId);

    return request.data[0];
  })(houseId);
}

/**
 * Get all houses from PotterAPI matching filter
 * @param {object} queryObj filter query object
 * @return {object} return an object containing error and data
 */
async function GetAll(queryObj) {
  return asyncFunction(async () => {
    const request = await GetHousesFromPotterAPI(queryObj);

    return {
      total: request.data ? request.data.length : 0,
      data: request.data,
    };
  })(queryObj);
}

module.exports = { GetOne, GetAll };
