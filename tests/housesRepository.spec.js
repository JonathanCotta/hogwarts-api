const { expect } = require('chai');
const { describe, it } = require('mocha');

const HousesRepository = require('../src/repository/housesRepository');

const houseId = '5a05e2b252f721a3cf2ea33f';
const houseQueryParams = { name: 'Gryffindor' };

describe('Houses Repository Test', () => {
  describe('smoke tests', () => {
    it('shoud be an object', () => {
      expect(HousesRepository).to.be.a('object');
    });

    it('should have a get one character method', () => {
      expect(HousesRepository).to.have.property('GetOne');
      expect(HousesRepository.GetOne).to.a('function');
    });

    it('should have a method to get various characters', () => {
      expect(HousesRepository).to.have.property('GetAll');
      expect(HousesRepository.GetAll).to.a('function');
    });
  });

  describe('HousesRepository.GetOne tests', () => {
    it('shoud return an object', async () => {
      const result = await HousesRepository.GetOne(houseId);

      expect(result).to.be.a('object');
      expect(result).to.have.property('error');
      expect(result.error).to.be.a('boolean');
      expect(result).to.have.property('data');
      expect(result.data).to.be.a('object');
    });
  });

  describe('HousesRepository.GetAll tests', () => {
    it('shoud return an object', async () => {
      const result = await HousesRepository.GetAll(houseQueryParams);

      expect(result).to.be.a('object');
      expect(result).to.have.property('error');
      expect(result.error).to.be.a('boolean');
      expect(result).to.have.property('data');
      expect(result.data).to.be.a('array');
    });
  });
});
