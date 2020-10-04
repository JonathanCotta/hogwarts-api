function report(err) {
  console.error(err);
  return { error: true, data: err };
}

module.exports = { report };
