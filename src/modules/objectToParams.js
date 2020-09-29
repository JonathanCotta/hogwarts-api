/**
 * @param {object} queryObj query object
 * @returns {string} url query params
*/
function objectToParams(queryObj) {
  return (Object.keys(queryObj).reduce((previous, current) => {
    const newParam = `${current}=${queryObj[current]}`;

    if (!previous) return `${newParam}&`;

    return `${previous}${newParam}&`;
  }, ''));
}

module.exports = { objectToParams };
