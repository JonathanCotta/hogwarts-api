const {
  describe,
  it,
  beforeEach,
  before,
  afterEach,
  after,
} = require('mocha');

const chai = require('chai');
const axios = require('axios');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

require('../src/modules/sinon-mongoose');

chai.use(sinonChai);
const { expect } = chai;

const CharactersRepository = require('../src/repository/charactersRepository');
const Character = require('../src/models/character');

const characterObject = {
  id: '5a0fa6bbae5bc100213c2334',
  name: 'Phineas Nigellus Black',
  role: '(Formerly) Headmaster of Hogwarts',
  house: 'Slytherin',
  bloodStatus: 'pure-blood',
  species: 'human',
};

describe('Characters Repository Test', () => {
  let stubGetRequest;
  let characterMock;

  before(() => {
    stubGetRequest = sinon.stub(axios, 'get').resolves({ data: [{}] });
  });

  beforeEach(() => {
    characterMock = sinon.mock(Character);
  });

  afterEach(() => {
    stubGetRequest.resetHistory();
    characterMock.restore();
  });

  after(() => {
    stubGetRequest.restore();
  });

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
    it('shoud be a promise', async () => {
      const result = CharactersRepository.GetOne();

      expect(result).to.be.a('promise');
    });

    it('should return an object', async () => {
      characterMock.expects('findById').chain('lean');

      const retunedValue = await CharactersRepository.GetOne(characterObject.id);

      expect(retunedValue).to.be.a('object');
      expect(retunedValue).to.have.property('error');
      expect(retunedValue.error).to.be.a('boolean');
      expect(retunedValue).to.have.property('data');
      expect(retunedValue.data).to.be.a('object');
    });
  });

  describe('CharactersRepository.GetAll tests', () => {
    it('shoud be a promise', async () => {
      const result = CharactersRepository.GetAll({ house: characterObject.house });

      expect(result).to.be.a('promise');
    });

    it('should return an object', async () => {
      characterMock.expects('find').chain('lean').resolves([]);

      const retunedValue = await CharactersRepository.GetAll({ house: characterObject.house });

      expect(retunedValue).to.be.a('object');
      expect(retunedValue).to.have.property('error');
      expect(retunedValue.error).to.be.a('boolean');
      expect(retunedValue).to.have.property('data');
      expect(retunedValue.data).to.be.a('object');
      expect(retunedValue.data).to.have.property('total');
      expect(retunedValue.data.total).to.be.a('number');
      expect(retunedValue.data).to.have.property('list');
      expect(retunedValue.data.list).to.be.a('array');
    });
  });

  describe('CharactersRepository.GetOne tests', () => {
    it('shoud be a promise', async () => {
      const result = CharactersRepository.GetOne(characterObject.id);

      expect(result).to.be.a('promise');
    });

    it('should return an object', async () => {
      characterMock.expects('findById').chain('lean');

      const retunedValue = await CharactersRepository.GetOne(characterObject.id);

      expect(retunedValue).to.be.a('object');
      expect(retunedValue).to.have.property('error');
      expect(retunedValue.error).to.be.a('boolean');
      expect(retunedValue).to.have.property('data');
      expect(retunedValue.data).to.be.a('object');
    });
  });

  describe('CharactersRepository.CreateOne tests', () => {
    it('shoud be a promise', async () => {
      const result = CharactersRepository.CreateOne(characterObject);

      expect(result).to.be.a('promise');
    });

    it('should return an object', async () => {
      characterMock.expects('create').resolves({});

      const retunedValue = await CharactersRepository.CreateOne(characterObject);

      expect(retunedValue).to.be.a('object');
      expect(retunedValue).to.have.property('error');
      expect(retunedValue.error).to.be.a('boolean');
      expect(retunedValue).to.have.property('data');
      expect(retunedValue.data).to.be.a('object');
    });
  });

  describe('CharactersRepository.RemoveOne tests', () => {
    it('shoud be a promise', async () => {
      const result = CharactersRepository.RemoveOne(characterObject.id);

      expect(result).to.be.a('promise');
    });

    it('should return an object', async () => {
      characterMock.expects('deleteOne').resolves({ deletedCount: 1 });

      const retunedValue = await CharactersRepository.RemoveOne(characterObject.id);

      expect(retunedValue).to.be.a('object');
      expect(retunedValue).to.have.property('error');
      expect(retunedValue.error).to.be.a('boolean');
      expect(retunedValue).to.have.property('data');
      expect(retunedValue.data).to.be.a('string');
    });
  });

  describe('CharactersRepository.UpdateOne tests', () => {
    it('shoud be a promise', async () => {
      const result = CharactersRepository.UpdateOne(characterObject.id);

      expect(result).to.be.a('promise');
    });

    it('should return an object', async () => {
      characterMock.expects('findByIdAndUpdate').resolves({});

      const retunedValue = await CharactersRepository.UpdateOne(characterObject.id);

      expect(retunedValue).to.be.a('object');
      expect(retunedValue).to.have.property('error');
      expect(retunedValue.error).to.be.a('boolean');
      expect(retunedValue).to.have.property('data');
      expect(retunedValue.data).to.be.a('object');
    });
  });
});
