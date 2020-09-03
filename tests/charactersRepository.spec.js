const { expect } = require('chai');
const { describe, it } = require('mocha');

require('dotenv/config');

const CharactersRepository = require('../src/repository/charactersRepository');

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
});
