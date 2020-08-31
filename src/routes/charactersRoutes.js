const {
  CreateOne,
  GetOne,
  UpdateOne,
  RemoveOne,
  GetAll,
} = require('../controllers/CharactersController');

module.exports = (app) => {
  app.post('/api/v1/character', CreateOne);
  app.get('/api/v1/character/:id', GetOne);
  app.put('/api/v1/character/:id', UpdateOne);
  app.delete('/api/v1/character/:id', RemoveOne);
  app.get('/api/v1/characters', GetAll);
};
