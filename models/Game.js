var Game = function(opts) {
  this.io = opts.io;
  this.players = opts.players;
};

Game.prototype.getPlayerById = function(id) {
  for (var i = 0; i < this.players.length; i++) {
    if (this.players[i].id === id) {
      return this.players[i];
    }
  }
  return false;
};

module.exports = Game;
