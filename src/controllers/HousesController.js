const { error } = console;

const repository = require('../repository/HousesRepository');

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
  GetOne,
  GetAll,
};
