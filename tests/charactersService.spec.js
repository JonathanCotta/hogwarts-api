const { expect } = require('chai');
const { describe, it } = require('mocha');

const CharactersServices = require('../src/services/characterService');

describe('Characters Repository Test', () => {
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
});
