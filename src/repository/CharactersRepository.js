const {
  GetCharactersFromDB,
  GetOneCharacterFromDB,
  GetCharactersFromPotterAPI,
  GetOneCharacterFromPotterAPI,
} = require('../services/characterService');

const { GetOneHouseFromPotterAPI } = require('../services/houseService');

const Character = require('../models/character');

const { error } = console;

/**
 * Create a character in MongoDB
 * @param {object} characterObj character valid model object
 * @return {object} return an object containing error and data
 */
async function CreateOne(characterObj) {
  try {
    const newCharacter = await Character.create(characterObj);

    return { error: false, data: newCharacter };
  } catch (err) {
    error(err);
    return { error: true, data: err };
  }
}

/**
 * Remove from MongoDB a character matching id
 * @param {string} characterId character id
 * @return {object} return an object containing error and data
 */
async function RemoveOne(characterId) {
  try {
    const reuslt = await Character.deleteOne({ _id: characterId });

    if (reuslt.deletedCount === 0) return { error: false, data: 'No character was removed' };

    return { error: false, data: 'Character removed' };
  } catch (err) {
    error(err);
    return { error: true, data: err };
  }
}

/**
 * Update a character from MongoDB matching the id
 * @param {string} characterId character id
 * @param {object} characterObj character valid model object
 * @return {object} return an object containing error and data
 */
async function UpdateOne(characterId, characterObj) {
  try {
    const queryConfig = { new: true, lean: true };
    const updatedCharacter = await Character.findByIdAndUpdate(
      characterId,
      characterObj,
      queryConfig,
    );

    if (!updatedCharacter) return { error: false, data: 'No character was updated' };

    return { error: false, data: updatedCharacter };
  } catch (err) {
    error(err);
    return { error: true, data: err };
  }
}

/**
 * Get a character from MongoDB or PotterAPI matching the id
 * @param {string} characterId character id
 * @return {object} return an object containing error and data
 */
async function GetOne(characterId) {
  try {
    let data;

    const requests = await Promise.all([
      GetOneCharacterFromDB(characterId),
      GetOneCharacterFromPotterAPI(characterId),
    ]);

    if (requests[0]) [data] = requests;

    if (requests[1]) [data] = requests[1].data;

    return { error: false, data };
  } catch (err) {
    error(err);
    return { error: true, data: err };
  }
}

/**
 * Get all characters from MongoDB or PotterAPI matching filter
 * @param {object} queryObj filter query object
 * @return {object} return an object containing error and data
 */
async function GetAll(queryObj) {
  try {
    let totalResults = [];
    let promisesRequests = [];

    const isId = (value) => (value.length === 24 && /[0-9]/g.test(value));
    const isValidArray = (value) => value instanceof Array && value.length > 0;

    if (queryObj.house && isId(queryObj.house)) {
      const houseRequest = await GetOneHouseFromPotterAPI(queryObj.house);
      const { data: houseData } = houseRequest;

      if (houseData && houseData.members) {
        promisesRequests = houseData.members.map(
          // eslint-disable-next-line no-underscore-dangle
          (member) => GetOneCharacterFromPotterAPI(member._id),
        );
      }
    } else {
      promisesRequests.push(GetCharactersFromPotterAPI(queryObj));
    }

    promisesRequests.push(GetCharactersFromDB(queryObj));

    const requests = await Promise.all(promisesRequests);

    totalResults = requests.reduce((previous, current) => {
      if (isValidArray(current)) return [...previous, ...current];
      if (current.data && isValidArray(current.data)) return [...previous, ...current.data];
      if (current.data) return [...previous, current.data];

      return previous;
    }, []);

    const data = {
      total: totalResults.length,
      list: totalResults,
    };

    return { error: false, data };
  } catch (err) {
    error(err);
    return { error: true, data: err };
  }
}

module.exports = {
  CreateOne,
  RemoveOne,
  UpdateOne,
  GetOne,
  GetAll,
};
