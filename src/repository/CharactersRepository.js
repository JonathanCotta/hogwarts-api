const {
  GetCharactersFromDB,
  GetOneCharacterFromDB,
  GetCharactersFromPotterAPI,
  GetOneCharacterFromPotterAPI,
} = require('../services/CharacterService');

const Character = require('../models/Character');

const { error } = console;

async function CreateOne(characterObj) {
  try {
    const newCharacter = await Character.create(characterObj);

    return { error: false, data: newCharacter };
  } catch (err) {
    error(err);
    return { error: true, data: err };
  }
}

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

async function GetOne(characterId) {
  try {
    let data;

    const requests = await Promise.all([
      GetOneCharacterFromDB(characterId),
      GetOneCharacterFromPotterAPI(characterId),
    ]);

    if (requests[0]) [data] = requests;

    if (requests[1]) data = requests[1].data;

    return { error: false, data };
  } catch (err) {
    error(err);
    return { error: true, data: err };
  }
}

async function GetAll(queryObj) {
  try {
    let totalResults = [];

    const requests = await Promise.all([
      GetCharactersFromDB(queryObj),
      GetCharactersFromPotterAPI(queryObj),
    ]);

    if (requests[0]) {
      totalResults = [...requests[0]];
    }

    if (requests[1] && requests[1].data) {
      totalResults = [...totalResults, ...requests[1].data];
    }

    const data = {
      total: totalResults.length,
      data: totalResults,
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
