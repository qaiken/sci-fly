module.exports = function(item) {
  if (item == null) {
    item = 'testing';
  }
  return console.log("" + item);
};
