const { expect } = require('chai');
const { describe, it } = require('mocha');

require('dotenv/config');
require('../src/configuration/database');

const CharactersRepository = require('../src/repository/charactersRepository');

const characterId = '5a0fa6bbae5bc100213c2334';
const characterQueryParams = { house: 'Slytherin' };
const characterMock = {
  _id: '5a0fa6bbae5bc100213c2334',
  name: 'Phineas Nigellus Black',
  role: '(Formerly) Headmaster of Hogwarts',
  house: 'Slytherin',
  bloodStatus: 'pure-blood',
  species: 'human',
};

describe('Characters Repository Test', () => {
  describe('smoke tests', () => {
    it('shoud be an object', () => {
      expect(CharactersRepository).to.be.a('object');
    });

    it('should have a insert one character method', () => {
      expect(CharactersRepository).to.have.property('CreateOne');
      expect(CharactersRepository.CreateOne).to.a('function');
    });

    it('should have a update one character method', () => {
      expect(CharactersRepository).to.have.property('UpdateOne');
      expect(CharactersRepository.UpdateOne).to.a('function');
    });

    it('should have a get one character method', () => {
      expect(CharactersRepository).to.have.property('GetOne');
      expect(CharactersRepository.GetOne).to.a('function');
    });

    it('should have a method to get various characters', () => {
      expect(CharactersRepository).to.have.property('GetAll');
      expect(CharactersRepository.GetAll).to.a('function');
    });

    it('should have a method to remove one character', () => {
      expect(CharactersRepository).to.have.property('RemoveOne');
      expect(CharactersRepository.RemoveOne).to.a('function');
    });
  });

  describe('CharactersRepository.GetOne tests', () => {
    it('shoud return an object', async () => {
      const result = CharactersRepository.GetOne(characterId);

      expect(result).to.be.a('promise');
    });
  });

  describe('CharactersRepository.GetAll tests', () => {
    it('shoud return an object', async () => {
      const result = CharactersRepository.GetAll(characterQueryParams);

      expect(result).to.be.a('promise');
    });
  });

  describe('Expected return values', () => {
    it('should return a promise from GetOneCharacterFromPotterAPI', () => {
      const retunedValue = CharactersRepository.GetOne(characterId);
      expect(retunedValue).to.be.a('promise');
    });

    it('should return a promise from GetOneCharacterFromDB', () => {
      const retunedValue = CharactersRepository.GetAll(characterQueryParams);
      expect(retunedValue).to.be.a('promise');
    });

    it('should return a promise from GetCharactersFromPotterAPI', () => {
      const retunedValue = CharactersRepository.CreateOne(characterMock);
      expect(retunedValue).to.be.a('promise');
    });

    it('should return a promise from GetCharactersFromDB', () => {
      const retunedValue = CharactersRepository.RemoveOne(characterId);
      expect(retunedValue).to.be.a('promise');
    });

    it('should return a promise from GetCharactersFromDB', () => {
      const retunedValue = CharactersRepository.UpdateOne(characterId, characterMock);
      expect(retunedValue).to.be.a('promise');
    });
  });
});
