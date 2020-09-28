const {
  describe,
  it,
  before,
  afterEach,
  after,
} = require('mocha');
const chai = require('chai');
const axios = require('axios');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const CharactersServices = require('../src/services/characterService');

const characterId = '5a0fa6bbae5bc100213c2334';
const characterQueryParams = { house: 'Slytherin' };

describe('Characters service test', () => {
  let stubGetRequest;

  before(() => {
    stubGetRequest = sinon.stub(axios, 'get').resolves({ data: [{}] });
  });

  afterEach(() => {
    stubGetRequest.resetHistory();
  });

  after(() => {
    stubGetRequest.restore();
  });

  describe('smoke tests', () => {
    it('shoud be an object', () => {
      expect(CharactersServices).to.be.a('object');
    });

    it('should have a method to return one character from API', () => {
      expect(CharactersServices).to.have.property('GetOneCharacterFromPotterAPI');
      expect(CharactersServices.GetOneCharacterFromPotterAPI).to.a('function');
    });

    it('should have a method to return one character from Database', () => {
      expect(CharactersServices).to.have.property('GetOneCharacterFromDB');
      expect(CharactersServices.GetOneCharacterFromDB).to.a('function');
    });

    it('should have a method to return various characters from API', () => {
      expect(CharactersServices).to.have.property('GetCharactersFromPotterAPI');
      expect(CharactersServices.GetCharactersFromPotterAPI).to.a('function');
    });

    it('should have a method to return various characters from Database', () => {
      expect(CharactersServices).to.have.property('GetCharactersFromDB');
      expect(CharactersServices.GetCharactersFromDB).to.a('function');
    });
  });

  describe('Expected return values', () => {
    it('should return a promise from GetOneCharacterFromPotterAPI', () => {
      const retunedValue = CharactersServices.GetOneCharacterFromPotterAPI(characterId);
      expect(retunedValue).to.be.a('promise');
    });

    it('should return a promise from GetOneCharacterFromDB', () => {
      const retunedValue = CharactersServices.GetOneCharacterFromDB(characterId);
      expect(retunedValue).to.be.a('promise');
    });

    it('should return a promise from GetCharactersFromPotterAPI', () => {
      const retunedValue = CharactersServices.GetCharactersFromPotterAPI(characterQueryParams);
      expect(retunedValue).to.be.a('promise');
    });

    it('should return a promise from GetCharactersFromDB', () => {
      const retunedValue = CharactersServices.GetCharactersFromDB(characterQueryParams);
      expect(retunedValue).to.be.a('promise');
    });
  });
});
