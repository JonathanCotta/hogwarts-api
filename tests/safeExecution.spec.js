const {
  describe,
  it,
  before,
  after,
  afterEach,
} = require('mocha');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

const safeExecution = require('../src/modules/safeExecution');
const error = require('../src/modules/errorReport');

describe('Safe function tests', () => {
  let syncSumFunction;
  let asyncSumFunction;
  let errorReportStub;

  before(() => {
    syncSumFunction = safeExecution.syncFunction((n1, n2) => n1 + n2);
    asyncSumFunction = safeExecution.asyncFunction((n1, n2) => n1 + n2);
    errorReportStub = sinon.stub(error, 'report');
  });

  afterEach(() => {
    errorReportStub.resetHistory();
  });

  after(() => {
    errorReportStub.restore();
  });

  describe('safeFunctioModule smoke tests', () => {
    it('Should be a object', () => {
      expect(safeExecution).to.be.an('object');
    });

    it('Should have a syncFunction method', () => {
      expect(safeExecution).to.have.property('syncFunction');
    });

    it('Should have a asyncFunction method', () => {
      expect(safeExecution).to.have.property('asyncFunction');
    });
  });

  describe('syncFunction method smoke tests', () => {
    it('Should be a function', () => {
      expect(safeExecution.syncFunction).to.be.a('function');
    });

    it('Should return a function', () => {
      expect(safeExecution.syncFunction(() => {})).to.be.a('function');
    });

    it('Should return a function thats return a object', () => {
      const syncResult = syncSumFunction(2, 2);

      expect(syncResult).to.be.an('object');
      expect(syncResult).has.property('error');
      expect(syncResult.error).to.be.a('boolean');
      expect(syncResult).has.property('data');
      expect(syncResult.data).to.be.a('number');
    });
  });

  describe('asyncFunction method smoke tests', () => {
    it('Should be a function', () => {
      expect(safeExecution.asyncFunction).to.be.a('function');
    });

    it('Should return a function', () => {
      expect(safeExecution.asyncFunction(() => {})).to.be.a('function');
    });

    it('Should generate a promise', () => {
      const asyncFunc = safeExecution.asyncFunction(() => {});

      expect(asyncFunc()).to.be.a('promise');
    });

    it('Should return a function thats return a object', async () => {
      const asyncResult = await asyncSumFunction(2, 2);

      expect(asyncResult).to.be.an('object');
      expect(asyncResult).has.property('error');
      expect(asyncResult.error).to.be.a('boolean');
      expect(asyncResult).has.property('data');
      expect(asyncResult.data).to.be.a('number');
    });
  });

  describe('Error handling', () => {
    it('Should call a error function', () => {
      syncSumFunction();
      return expect(errorReportStub).to.have.been.calledOnce;
    });
  });
});
