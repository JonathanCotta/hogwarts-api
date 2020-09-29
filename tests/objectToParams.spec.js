const { expect } = require('chai');
const { describe, it, before } = require('mocha');

const util = require('../src/modules/objectToParams');

const queryObject = { name: 'harry' };

describe('objectToParams tests', () => {
  let result;

  before(() => {
    result = util.objectToParams(queryObject);
  });

  it('Should return a string', () => {
    expect(result).to.be.a('string');
  });

  it('should return a url query params', () => {
    expect(result).to.be.equal('name=harry&');
  });
});
