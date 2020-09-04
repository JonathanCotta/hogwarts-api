const {
  GetOne,
  GetAll,
} = require('../controllers/housesController');

module.exports = (app) => {
  app.get('/hogwarts/v1/house/:id', GetOne);
  app.get('/hogwarts/v1/houses', GetAll);
};
