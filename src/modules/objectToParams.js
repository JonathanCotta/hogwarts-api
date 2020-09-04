/**
 * @param {object} queryObj query object
 * @returns {string} url query params
*/
module.exports = (queryObj) => (Object.keys(queryObj).reduce((previous, current) => {
  const newParam = `${current}=${queryObj[current]}`;

  if (!previous) return `${newParam}&`;

  return `${previous}${newParam}&`;
}, ''));
