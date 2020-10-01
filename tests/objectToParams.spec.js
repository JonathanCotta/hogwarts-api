const { expect } = require('chai');
const { describe, it, before } = require('mocha');

const objectToParams = require('../src/modules/objectToParams');

const queryObject = { name: 'harry' };

describe('convert tests', () => {
  let result;

  before(() => {
    result = objectToParams.convert(queryObject);
  });

  describe('smoke tests', () => {
    it('should be an object', () => {
      expect(objectToParams).to.be.an('object');
    });

    it('should have a object', () => {
      expect(objectToParams).has.property('convert');
      expect(objectToParams.convert).to.be.a('function');
    });
  });

  describe('output test', () => {
    it('Should return a string', () => {
      expect(result).to.be.a('string');
    });

    it('should return a url query params', () => {
      expect(result).to.be.equal('name=harry&');
    });
  });
});
