function getUpperCase(str) {
  return str.toUpperCase();
}

function getLowerCase(str) {
  return str.toLowerCase();
}

function getSentenceCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function getProperCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

module.exports = {
  getUpperCase,
  getLowerCase,
  getSentenceCase,
  getProperCase,
};