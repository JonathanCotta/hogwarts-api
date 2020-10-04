/* eslint-disable prefer-rest-params */
const sinon = require('sinon');
const mongoose = require('mongoose');

const MethodTypes = Object.freeze({
  aggregate: 'aggregate',
  populate: 'populate',
  query: 'query',
});

function getMethodType(method) {
  const methodType = MethodTypes[method];
  return methodType || MethodTypes.query;
}

function makeChainable(mockArg, object, mockTypeArg) {
  const mock = mockArg;
  const expectsMethod = mock.expects;

  // eslint-disable-next-line func-names
  mock.expects = function (method) {
    const mockType = mockTypeArg || getMethodType(method);
    const expectation = expectsMethod.apply(mock, arguments);
    expectation.owner = mock;
    // eslint-disable-next-line no-use-before-define
    expectation.chain = chainMethod(mockType, object).bind(expectation);
    return expectation;
  };
}

function makeChainableVerify(mockResultArg) {
  const mockResult = mockResultArg;
  const originalVerify = mockResult.verify;

  function chainedVerify() {
    originalVerify.call(mockResult);

    if (mockResult.chainedMock) {
      mockResult.chainedMock.verify();
    }
  }

  mockResult.verify = chainedVerify;
}

function chainMethod(type, object) {
  let mockType;
  switch (type) {
    case MethodTypes.aggregate:
      mockType = new mongoose.Aggregate();
      break;

    case MethodTypes.populate:
      mockType = object;
      break;

    default:
      mockType = new mongoose.Query();
      break;
  }

  return function chain(method) {
    const queryMock = sinon.mock(mockType);
    this.owner.chainedMock = queryMock;
    makeChainable(queryMock, object, type);
    makeChainableVerify(queryMock);
    this.returns(queryMock.object);

    return queryMock.expects(method);
  };
}

const oldMock = sinon.mock;
const newMock = function mock(object) {
  const mockResult = oldMock.apply(this, arguments);

  if (
    object
    && (object instanceof mongoose.Model
      || object.schema instanceof mongoose.Schema)
  ) {
    makeChainable(mockResult, object);
    makeChainableVerify(mockResult);
  }
  return mockResult;
};

sinon.mock = newMock;

function sandboxMock(object) {
  // eslint-disable-next-line prefer-spread
  const mockResult = oldMock.apply(null, arguments);

  if (
    object
    && (object instanceof mongoose.Model
      || object.schema instanceof mongoose.Schema)
  ) {
    makeChainable(mockResult, object);
    makeChainableVerify(mockResult);
  }

  return this.add(mockResult);
}

if (sinon.sandbox) {
  sinon.sandbox.mock = sandboxMock;
}
