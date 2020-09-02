const {
  GetOne,
  GetAll,
} = require('../controllers/HousesController');

module.exports = (app) => {
  app.get('/api/v1/house/:id', GetOne);
  app.get('/api/v1/houses', GetAll);
};
