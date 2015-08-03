var phaser = require('phaser');
var gameData = require('./states');

var createGame = function(opts) {

  var el = opts.el;
  var scope = opts.scope;
  var socket = opts.socket;
  var players = opts.players;
  var $injector = opts.$injector;

  var user  = $injector.get('User');
  var states  = gameData.States;

  var game = new Phaser.Game(800, 600, Phaser.AUTO, el[0].id);
  
  game.socket = socket;
  game.scope  = scope;

  game.state.add('Preloader', states.Preloader);
  game.state.add('Play', states.Play);

  gameData.socket = socket;
  gameData.currentPlayer = user.getCurrentUser();
  gameData.playerName = gameData.currentPlayer.userName;

  gameData.socket.emit('setPlayerName', { name: gameData.playerName });

  gameData.socket.on('playerDetailsReceived', function(data) {
    game.state.start('Preloader');
  });

};

module.exports = createGame;