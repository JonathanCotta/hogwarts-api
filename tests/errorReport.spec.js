const {
  describe,
  it,
  before,
  after,
  afterEach,
} = require('mocha');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');

chai.use(sinonChai);
const { expect } = chai;

const errorReport = require('../src/modules/errorReport');

describe('Error report test', () => {
  let stubConsoleError;
  const errorMock = new Error('An error occur');

  before(() => {
    stubConsoleError = sinon.stub(console, 'error');
  });

  afterEach(() => {
    stubConsoleError.resetHistory();
  });

  after(() => {
    stubConsoleError.restore();
  });

  describe('smoke tests', () => {
    it('shoud be an object', () => {
      expect(errorReport).to.be.a('object');
    });

    it('should have a method to return an error object', () => {
      expect(errorReport).to.have.property('report');
      expect(errorReport.report).to.be.a('function');
    });
  });

  describe('Report method tests', () => {
    it('Should call console.error', () => {
      errorReport.report(errorMock);

      return expect(stubConsoleError).to.be.calledOnce;
    });

    it('Should return an object', () => {
      const result = errorReport.report(errorMock);

      expect(result).to.be.a('object');
      expect(result).to.have.property('error');
      expect(result.error).to.be.a('boolean');
      expect(result).to.have.property('data');
      expect(result.data).to.be.a('error');
    });
  });
});
