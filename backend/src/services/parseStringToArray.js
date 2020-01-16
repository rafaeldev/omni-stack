module.exports = function parse(str, delimiter = ',') {
  return str.split(delimiter).map(tech => tech.trim());
}
