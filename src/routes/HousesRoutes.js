const {
  GetOne,
  GetAll,
} = require('../controllers/housesController');

module.exports = (app) => {
  app.get('/api/v1/house/:id', GetOne);
  app.get('/api/v1/houses', GetAll);
};
