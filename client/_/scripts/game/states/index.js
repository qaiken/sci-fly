var preloader = require('./preloader');
var play = require('./play');

var Game = {
  States: {},
  currentPlayer: null,
  remotePlayers: []
};

preloader(Game);
play(Game);

module.exports = Game;