var preloader = require('./preloader');
var play = require('./play');

var Game = {
  States: {}
};

preloader(Game);
play(Game);

module.exports = Game;