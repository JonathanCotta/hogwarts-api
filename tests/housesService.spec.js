const { expect } = require('chai');
const { describe, it } = require('mocha');

const HousesService = require('../src/services/houseService');

describe('Houses Repository Test', () => {
  describe('smoke tests', () => {
    it('shoud be an object', () => {
      expect(HousesService).to.be.a('object');
    });

    it('should have a method to return one house from API', () => {
      expect(HousesService).to.have.property('GetOneHouseFromPotterAPI');
      expect(HousesService.GetOneHouseFromPotterAPI).to.a('function');
    });

    it('should have a method to return various houses from API', () => {
      expect(HousesService).to.have.property('GetHousesFromPotterAPI');
      expect(HousesService.GetHousesFromPotterAPI).to.a('function');
    });
  });
});
