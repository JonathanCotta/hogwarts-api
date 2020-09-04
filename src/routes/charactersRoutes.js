const {
  CreateOne,
  GetOne,
  UpdateOne,
  RemoveOne,
  GetAll,
} = require('../controllers/charactersController');

module.exports = (app) => {
  app.post('/hogwarts/v1/character', CreateOne);
  app.get('/hogwarts/v1/character/:id', GetOne);
  app.put('/hogwarts/v1/character/:id', UpdateOne);
  app.delete('/hogwarts/v1/character/:id', RemoveOne);
  app.get('/hogwarts/v1/characters', GetAll);
};
