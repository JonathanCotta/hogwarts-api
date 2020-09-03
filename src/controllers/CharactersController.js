const repository = require('../repository/charactersRepository');

const { error } = console;

async function CreateOne(req, res) {
  const { body: { character } } = req;
  try {
    const result = await repository.CreateOne(character);

    if (result.error) {
      return res.status(500).json({
        ...result,
        message: 'Sorry, an error ocurred trying to create a new character',
      });
    }

    return res.status(200).json({ ...result, message: 'Character succefully created' });
  } catch (err) {
    error(err);
    return res.status(500).json({ error: true, data: err });
  }
}

async function UpdateOne(req, res) {
  const {
    body: { character },
    params: { id },
  } = req;

  try {
    const result = await repository.UpdateOne(id, character);

    if (result.error) {
      return res.status(500).json({
        ...result,
        message: 'Sorry, an error ocurred trying to update character',
      });
    }

    return res.status(200).json({ ...result, message: 'Character succefully updated' });
  } catch (err) {
    error(err);
    return res.status(500).json({ error: true, data: err });
  }
}

async function RemoveOne(req, res) {
  const { params: { id } } = req;
  try {
    const result = await repository.RemoveOne(id);

    if (result.error) {
      return res.status(500).json({
        ...result,
        message: 'Sorry, an error ocurred trying to remove character',
      });
    }

    return res.status(200).json({ ...result, message: 'Character succefully removed' });
  } catch (err) {
    error(err);
    return res.status(500).json({ error: true, data: err });
  }
}

async function GetOne(req, res) {
  const { params: { id } } = req;

  try {
    const result = await repository.GetOne(id);

    if (result.error) {
      return res.status(500).json({
        ...result,
        message: 'Sorry, an error ocurred trying to find character',
      });
    }

    return res.status(200).json({ ...result });
  } catch (err) {
    error(err);
    return res.status(500).json({ error: true, data: err });
  }
}

async function GetAll(req, res) {
  const { query } = req;

  try {
    const result = await repository.GetAll(query);

    if (result.error) {
      return res.status(500).json({
        ...result,
        message: 'Sorry, an error ocurred trying to list characters',
      });
    }

    return res.status(200).json({ ...result });
  } catch (err) {
    error(err);
    return res.status(500).json({ error: true, data: err });
  }
}

module.exports = {
  CreateOne,
  UpdateOne,
  RemoveOne,
  GetOne,
  GetAll,
};
