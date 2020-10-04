const error = require('./errorReport');

function syncFunction(func) {
  return (...args) => {
    try {
      if (args.length < 1) throw new Error('No arguments found!');

      return { error: false, data: func(...args) };
    } catch (err) {
      return error.report(err);
    }
  };
}

function asyncFunction(func) {
  return async (...args) => {
    try {
      if (args.length < 1) throw new Error('No arguments found!');

      return { error: false, data: await func(...args) };
    } catch (err) {
      return error.report(err);
    }
  };
}

module.exports = { syncFunction, asyncFunction };
