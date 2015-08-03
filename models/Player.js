var Player = function(opts) {
  this.id = opts.id;
  this.name = opts.name || null;
  this.health = 100;
};

module.exports = Player;