var Game = function(opts) {
  this.io = opts.io;
  this.players = opts.players;
};

// each socket has a unique id and we set the player's id
// to be equal to the socket id so that we can get the corresponding
// player
Game.prototype.getPlayerById = function(id) {
  for (var i = 0; i < this.players.length; i++) {
    if ( this.players[i].id === id ) {
      return this.players[i];
    }
  }
  return false;
};

module.exports = Game;
